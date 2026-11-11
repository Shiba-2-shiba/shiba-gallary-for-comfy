import { describe, it, expect } from "vitest";
import {
  createSession,
  reconcileImages,
  candidates,
  stepCandidate,
  closeSession,
  viewport,
  anchorScroll,
  setLinked,
  updateTransform,
} from "./state";
const img = (id: string, mtime_ns = 1) => ({
  id,
  folder_id: "out",
  name: id + ".png",
  revision: "v1",
  mtime_ns,
  width: 1024,
  height: 1024,
});
describe("gallery session", () => {
  it("retains pinned/current/check identities and an unavailable selected record during refresh", () => {
    const s = createSession();
    s.images = [img("b", 2), img("a")];
    s.currentId = "a";
    s.leftId = "b";
    s.rightId = "a";
    s.checked.add("a");
    reconcileImages(s, [img("c", 3), img("b", 2)]);
    expect(s.images.map((x) => x.id)).toEqual(["c", "b"]);
    expect(s.currentId).toBe("a");
    expect(s.leftId).toBe("b");
    expect(s.rightId).toBe("a");
    expect([...s.checked]).toEqual(["a"]);
    expect(s.records.get("a")?.name).toBe("a.png");
  });
  it("candidate navigation includes the reference and does not wrap", () => {
    const s = createSession();
    s.images = [img("a"), img("b"), img("c")];
    s.leftId = "a";
    s.rightId = "b";
    s.scope = "checked";
    s.checked = new Set(["a", "b", "c"]);
    expect(candidates(s).map((x) => x.id)).toEqual(["a", "b", "c"]);
    stepCandidate(s, 1);
    expect(s.rightId).toBe("c");
    stepCandidate(s, 1);
    expect(s.rightId).toBe("c");
    stepCandidate(s, -1);
    expect(s.rightId).toBe("b");
  });
  it("close discards all check, comparison and manual matching state", () => {
    const s = createSession();
    s.checked.add("a");
    s.leftId = "a";
    s.rightId = "b";
    s.manualMatches = { "1": "2" };
    s.panel = true;
    s.open = true;
    closeSession(s);
    expect(s.open).toBe(false);
    expect(s.checked.size).toBe(0);
    expect(s.leftId).toBe(null);
    expect(s.rightId).toBe(null);
    expect(s.manualMatches).toEqual({});
    expect(s.panel).toBe(false);
  });
  it("keeps linked normalized zoom/pan and takes left transform when relinking", () => {
    const s = createSession();
    updateTransform(s, "left", { scale: 2, x: 0.2, y: -0.1 });
    expect(s.transforms.right).toEqual({ scale: 2, x: 0.2, y: -0.1 });
    setLinked(s, false);
    updateTransform(s, "right", { scale: 3, x: 0, y: 0 });
    expect(s.transforms.left.scale).toBe(2);
    setLinked(s, true);
    expect(s.transforms.right).toEqual(s.transforms.left);
  });
});
describe("bounded virtual grid", () => {
  it("bounds mounted cards to visible rows plus overscan, even at 100000 images", () => {
    const v = viewport(100000, 1000, 600, 5000, 160);
    expect(v.end - v.start).toBeLessThan(80);
    expect(v.start).toBeGreaterThan(0);
    expect(v.totalHeight).toBeGreaterThan(1000000);
  });
  it("preserves the visible image and row offset after insertion and size change", () => {
    const before = Array.from({ length: 40 }, (_, n) => img("i" + n));
    const after = [img("new"), ...before];
    expect(anchorScroll(before, after, 330, 640, 160, 320)).toBe(1290);
  });
});
it("discards removed unselected image records to bound session memory", () => {
  const s = createSession();
  reconcileImages(s, [img("old"), img("pinned")]);
  s.leftId = "pinned";
  reconcileImages(s, [img("new")]);
  expect([...s.records.keys()].sort()).toEqual(["new", "pinned"]);
});
it("keeps the anchor row visible when changing from large to small cells", () => {
  const images = Array.from({ length: 30 }, (_, n) => img("i" + n));
  expect(anchorScroll(images, images, 250, 640, 284, 164)).toBeLessThan(164);
});
it("marks pinned missing images unavailable only when a complete refresh proves absence", () => {
  const s = createSession();
  reconcileImages(s, [img("left"), img("right")]);
  s.leftId = "left";
  reconcileImages(s, [img("right")], false);
  expect(s.unavailable.has("left")).toBe(false);
  reconcileImages(s, [img("right")], true);
  expect(s.leftId).toBe("left");
  expect(s.unavailable.has("left")).toBe(true);
  reconcileImages(s, [img("left"), img("right")], true);
  expect(s.unavailable.has("left")).toBe(false);
});
it("reveals the selected horizontal candidate without changing unrelated scroll axes", async () => {
  const { revealHorizontal } = await import("./state");
  expect(revealHorizontal(300, 0, 455, 58)).toBe(213);
  expect(revealHorizontal(300, 300, 100, 58)).toBe(100);
  expect(revealHorizontal(300, 50, 100, 58)).toBe(50);
});

it("keeps the current reference available outside the checked range", () => {
  const s = createSession();
  s.images = [img("a"), img("b"), img("c")];
  s.leftId = "b";
  s.rightId = "b";
  s.scope = "checked";
  s.checked.add("c");
  expect(candidates(s).map((i) => i.id)).toEqual(["b", "c"]);
  stepCandidate(s, 1);
  expect(s.rightId).toBe("c");
  stepCandidate(s, -1);
  expect(s.rightId).toBe("b");
});
it("keeps pinned references through refresh and resets them on close", () => {
  const s = createSession();
  reconcileImages(s, [img("a"), img("b")]);
  s.pinned.add("b");
  reconcileImages(s, [img("a")], true);
  expect(s.records.get("b")?.id).toBe("b");
  closeSession(s);
  expect(s.pinned.size).toBe(0);
});
