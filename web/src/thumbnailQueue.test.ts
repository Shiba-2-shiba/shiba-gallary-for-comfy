import { it, expect } from "vitest";
import { ThumbnailQueue } from "./thumbnailQueue";
const flush = async () => { await Promise.resolve(); await Promise.resolve(); await Promise.resolve(); };
it("caps active thumbnail fetches and cancels obsolete queued jobs", async () => {
  const queue = new ThumbnailQueue(2);
  const finish: Array<() => void> = [];
  let active = 0;
  let peak = 0;
  const work = () => new Promise<void>((resolve) => {
    active++; peak = Math.max(peak, active);
    finish.push(() => { active--; resolve(); });
  });
  const a = queue.add(work); const b = queue.add(work); const c = queue.add(work);
  c.cancel(); expect(peak).toBe(2);
  finish.shift()!(); finish.shift()!();
  await Promise.all([a.done, b.done, c.done]);
  expect(peak).toBe(2); expect(finish).toHaveLength(0);
});
it("reserves foreground capacity while slow candidates or neighbors occupy the background lane", async () => {
  const queue = new ThumbnailQueue(4);
  const started: string[] = [];
  const finish: Array<() => void> = [];
  const job = (name: string, priority: "high" | "normal" | "low") => queue.add(() => {
    started.push(name);
    return new Promise<void>((resolve) => finish.push(resolve));
  }, priority);
  job("candidate-a", "low"); job("candidate-b", "low"); job("neighbor-a", "low");
  const obsolete = job("obsolete-neighbor", "low");
  job("current", "high"); job("queued-current", "high");
  expect(started).toEqual(["candidate-a", "candidate-b", "neighbor-a", "current"]);
  obsolete.cancel(); finish.shift()!(); await flush();
  expect(started).toEqual(["candidate-a", "candidate-b", "neighbor-a", "current", "queued-current"]);
  finish.splice(0).forEach((resolve) => resolve());
});
it("prioritizes visible thumbnails ahead of queued prefetches and promotes a queued neighbor", async () => {
  const queue = new ThumbnailQueue(2);
  const started: string[] = [];
  const finish: Array<() => void> = [];
  const active = () => new Promise<void>((resolve) => finish.push(resolve));
  queue.add(active); queue.add(active);
  queue.add(async () => { started.push("neighbor"); }, "low");
  queue.add(async () => { started.push("visible"); });
  const promoted = queue.add(async () => { started.push("current"); }, "low");
  promoted.promote("high");
  finish.shift()!(); await flush();
  expect(started[0]).toBe("current");
  finish.shift()!(); await flush(); await flush();
  expect(started).toEqual(["current", "visible", "neighbor"]);
});
