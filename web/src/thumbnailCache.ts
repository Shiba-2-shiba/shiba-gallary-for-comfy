/** Session-only compressed previews. URLs include the image revision and size. */
export class ThumbnailCache {
  private blobs = new Map<string, Blob>();
  private bytes = 0;
  private generation = 0;
  get epoch() {
    return this.generation;
  }
  constructor(
    private maxEntries = 128,
    private maxBytes = 32 * 1024 * 1024,
  ) {}
  get(url: string) {
    const blob = this.blobs.get(url);
    if (blob) {
      this.blobs.delete(url);
      this.blobs.set(url, blob);
    }
    return blob;
  }
  set(url: string, blob: Blob, generation = this.generation) {
    if (generation !== this.generation) return;
    this.delete(url);
    if (blob.size > this.maxBytes) return;
    this.blobs.set(url, blob);
    this.bytes += blob.size;
    while (this.blobs.size > this.maxEntries || this.bytes > this.maxBytes) {
      const oldest = this.blobs.keys().next().value;
      if (oldest === undefined) break;
      this.delete(oldest);
    }
  }
  delete(url: string) {
    const blob = this.blobs.get(url);
    if (blob) {
      this.bytes -= blob.size;
      this.blobs.delete(url);
    }
  }
  clear() {
    this.generation++;
    this.blobs.clear();
    this.bytes = 0;
  }
}
export const thumbnailCache = new ThumbnailCache();
