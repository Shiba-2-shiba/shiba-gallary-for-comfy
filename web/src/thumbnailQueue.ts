interface Job {
  run: () => Promise<void>;
  resolve: () => void;
  cancelled: boolean;
  started: boolean;
}
export class ThumbnailQueue {
  private active = 0;
  private jobs: Job[] = [];
  constructor(private limit = 4) {}
  add(run: () => Promise<void>) {
    let resolve!: () => void;
    const done = new Promise<void>((r) => (resolve = r));
    const job = { run, resolve, cancelled: false, started: false };
    this.jobs.push(job);
    this.drain();
    return {
      done,
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
    while (this.active < this.limit && this.jobs.length) {
      const job = this.jobs.shift()!;
      if (job.cancelled) {
        job.resolve();
        continue;
      }
      job.started = true;
      this.active++;
      job
        .run()
        .catch(() => {})
        .finally(() => {
          this.active--;
          job.resolve();
          this.drain();
        });
    }
  }
}
export const thumbnails = new ThumbnailQueue(4);
