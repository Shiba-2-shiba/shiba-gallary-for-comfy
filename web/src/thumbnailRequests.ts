import { thumbnailCache } from "./thumbnailCache";
import { thumbnails, type ThumbnailPriority } from "./thumbnailQueue";
type Job = ReturnType<typeof thumbnails.add>;
interface Request {
  abort: AbortController;
  users: number;
  priority: ThumbnailPriority;
  job?: Job;
  done: Promise<Blob | undefined>;
}
const pending = new Map<string, Request>();
const rank: Record<ThumbnailPriority, number> = { high: 2, normal: 1, low: 0 };

/** Share compressed previews, not originals. Only the bounded LRU retains data. */
export function requestThumbnail(url: string, priority: ThumbnailPriority = "normal") {
  const cached = thumbnailCache.get(url);
  if (cached) return { done: Promise.resolve(cached), cancel: () => {} };
  let request = pending.get(url);
  if (!request) {
    const abort = new AbortController();
    const epoch = thumbnailCache.epoch;
    let resolve!: (blob: Blob | undefined) => void;
    request = { abort, users: 0, priority, done: new Promise((r) => { resolve = r; }) };
    const entry = request;
    pending.set(url, entry);
    entry.job = thumbnails.add(async () => {
      let blob: Blob | undefined;
      try {
        const response = await fetch(url, {
          signal: abort.signal,
          credentials: "same-origin",
          priority: entry.priority === "normal" ? "auto" : entry.priority,
        });
        if (!response.ok) throw new Error("Preview unavailable");
        const result = await response.blob();
        if (!abort.signal.aborted && epoch === thumbnailCache.epoch) {
          blob = result;
          thumbnailCache.set(url, result, epoch);
        }
      } catch { /* Cancelled or failed previews are not cached. */ }
      finally {
        if (pending.get(url) === entry) pending.delete(url);
        resolve(blob);
      }
    }, priority);
    // Cancelled queued jobs never enter run(). Settle their consumers as well.
    void entry.job.done.then(() => resolve(undefined));
  } else if (rank[priority] > rank[request.priority]) {
    request.priority = priority;
    request.job?.promote(priority);
  }
  const entry = request;
  entry.users++;
  let cancelled = false;
  return {
    done: entry.done,
    cancel: () => {
      if (cancelled) return;
      cancelled = true;
      if (--entry.users === 0) {
        entry.abort.abort();
        entry.job?.cancel();
        if (pending.get(url) === entry) pending.delete(url);
      }
    },
  };
}
