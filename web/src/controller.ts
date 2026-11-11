import { GalleryApi } from "./api";
import { reconcileImages, type Session } from "./state";
export class GalleryController {
  private epoch = 0;
  private abort = new AbortController();
  private working = false;
  private firstCursor: string | null = null;
  cursor: string | null = null;
  error = "";
  loading = false;
  version = "";
  constructor(
    readonly api: GalleryApi,
    readonly session: Session,
    readonly changed: () => void = () => {},
  ) {}
  async selectFolder(id: string) {
    this.abort.abort();
    this.abort = new AbortController();
    this.epoch++;
    this.working = false;
    this.session.folderId = id;
    this.session.images = [];
    this.session.records.clear();
    this.session.checked.clear();
    this.session.pinned.clear();
    this.session.unavailable.clear();
    this.session.currentId = null;
    this.session.leftId = null;
    this.session.rightId = null;
    this.session.mode = "grid";
    this.session.panel = false;
    this.session.manualMatches = {};
    this.session.scope = "folder";
    this.session.promptIds.clear();
    this.cursor = null;
    this.version = "";
    this.firstCursor = null;
    this.error = "";
    await this.refresh();
  }
  async refresh() {
    if (this.working || !this.session.folderId) return;
    this.working = true;
    this.loading = true;
    this.changed();
    const epoch = this.epoch;
    try {
      const count = Math.max(1, this.session.images.length);
      const list = [];
      let cursor: string | null = null;
      let nextVersion = this.version;
      let nextFirstCursor: string | null = null;
      do {
        const page = await this.api.images(
          this.session.folderId,
          cursor,
          this.abort.signal,
        );
        if (epoch !== this.epoch) return;
        if (cursor === null && this.session.images.length > 0 &&
            page.version === this.version && page.next_cursor === this.firstCursor &&
            page.images.every((image, index) =>
              this.session.images[index]?.id === image.id &&
              this.session.images[index]?.revision === image.revision)) {
          // The backend renews the unchanged snapshot. Keep the loaded range,
          // continuation cursor and object identity instead of refetching it.
          this.error = "";
          return;
        }
        if (cursor === null) nextFirstCursor = page.next_cursor;
        list.push(...page.images);
        cursor = page.next_cursor;
        nextVersion = page.version;
      } while (cursor && list.length < count);
      reconcileImages(this.session, list, cursor === null);
      this.cursor = cursor;
      this.version = nextVersion;
      this.firstCursor = nextFirstCursor;
      this.error = "";
    } catch (error) {
      if (epoch === this.epoch && !this.abort.signal.aborted)
        this.error =
          error instanceof Error ? error.message : "Could not load images";
    } finally {
      if (epoch === this.epoch) {
        this.working = false;
        this.loading = false;
        this.changed();
      }
    }
  }
  async loadMore() {
    if (this.working || !this.cursor) return;
    this.working = true;
    this.loading = true;
    this.changed();
    const epoch = this.epoch;
    try {
      const page = await this.api.images(
        this.session.folderId,
        this.cursor,
        this.abort.signal,
      );
      if (epoch !== this.epoch) return;
      const existing = new Set(this.session.images.map((i) => i.id));
      reconcileImages(this.session, [
        ...this.session.images,
        ...page.images.filter((i) => !existing.has(i.id)),
      ]);
      this.cursor = page.next_cursor;
      this.error = "";
    } catch (error) {
      if (epoch === this.epoch && !this.abort.signal.aborted)
        this.error =
          error instanceof Error ? error.message : "Could not load more images";
    } finally {
      if (epoch === this.epoch) {
        this.working = false;
        this.loading = false;
        this.changed();
      }
    }
  }
  dispose() {
    this.epoch++;
    this.abort.abort();
  }
}
