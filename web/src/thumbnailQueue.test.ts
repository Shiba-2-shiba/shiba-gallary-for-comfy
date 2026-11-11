import { it, expect } from "vitest";
import { ThumbnailQueue } from "./thumbnailQueue";
it("caps active thumbnail fetches and cancels obsolete queued jobs", async () => {
  const queue = new ThumbnailQueue(2);
  const finish: Array<() => void> = [];
  let active = 0;
  let peak = 0;
  const work = () =>
    new Promise<void>((resolve) => {
      active++;
      peak = Math.max(peak, active);
      finish.push(() => {
        active--;
        resolve();
      });
    });
  const a = queue.add(work);
  const b = queue.add(work);
  const c = queue.add(work);
  c.cancel();
  expect(peak).toBe(2);
  finish.shift()!();
  finish.shift()!();
  await Promise.all([a.done, b.done, c.done]);
  expect(peak).toBe(2);
  expect(finish).toHaveLength(0);
});
