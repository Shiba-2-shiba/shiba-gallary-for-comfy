export type ThumbnailPriority = "high" | "normal" | "low";
const rank: Record<ThumbnailPriority, number> = { high: 2, normal: 1, low: 0 };
interface Job {
  run: () => Promise<void>;
  resolve: () => void;
  cancelled: boolean;
  started: boolean;
  priority: ThumbnailPriority;
}
export class ThumbnailQueue {
  private active = 0;
  private jobs: Job[] = [];
  constructor(private limit = 4) {}
  add(run: () => Promise<void>, priority: ThumbnailPriority = "normal") {
    let resolve!: () => void;
    const done = new Promise<void>((r) => (resolve = r));
    const job: Job = { run, resolve, cancelled: false, started: false, priority };
    this.jobs.push(job);
    this.drain();
    return {
      done,
      promote: (priority: ThumbnailPriority) => {
        if (rank[priority] > rank[job.priority]) {
          job.priority = priority;
          this.drain();
        }
      },
      cancel: () => {
        job.cancelled = true;
        if (!job.started) {
          this.jobs = this.jobs.filter((j) => j !== job);
          resolve();
        }
      },
    };
  }
  private drain() {
    this.jobs.sort((a, b) => rank[b.priority] - rank[a.priority]);
    while (this.active < this.limit && this.jobs.length) {
      // The grid keeps all four slots. Speculative/candidate work leaves one
      // free for a foreground preview, even if its network response is slow.
      if (this.jobs[0].priority === "low" && this.active >= Math.max(1, this.limit - 1)) break;
      const job = this.jobs.shift()!;
      if (job.cancelled) { job.resolve(); continue; }
      job.started = true;
      this.active++;
      job.run().catch(() => {}).finally(() => {
        this.active--;
        job.resolve();
        this.drain();
      });
    }
  }
}
export const thumbnails = new ThumbnailQueue(4);
