export interface ImageRecord {
  id: string;
  folder_id: string;
  name: string;
  revision: string;
  mtime_ns: number;
  width: number | null;
  height: number | null;
}
export interface Transform {
  scale: number;
  x: number;
  y: number;
}
export interface Session {
  open: boolean;
  folderId: string;
  images: ImageRecord[];
  records: Map<string, ImageRecord>;
  checked: Set<string>;
  unavailable: Set<string>;
  mode: "grid" | "single" | "compare";
  currentId: string | null;
  leftId: string | null;
  rightId: string | null;
  scope: "folder" | "checked" | "prompt";
  promptIds: Set<string>;
  panel: boolean;
  manualMatches: Record<string, string | null>;
  linked: boolean;
  transforms: { left: Transform; right: Transform };
}
const fit = (): Transform => ({ scale: 1, x: 0, y: 0 });
export function createSession(): Session {
  return {
    open: false,
    folderId: "",
    images: [],
    records: new Map(),
    checked: new Set(),
    unavailable: new Set(),
    mode: "grid",
    currentId: null,
    leftId: null,
    rightId: null,
    scope: "folder",
    promptIds: new Set(),
    panel: false,
    manualMatches: {},
    linked: true,
    transforms: { left: fit(), right: fit() },
  };
}
export function reconcileImages(
  s: Session,
  images: ImageRecord[],
  complete = false,
) {
  const keep = new Set([
    ...images.map((i) => i.id),
    ...s.checked,
    s.currentId,
    s.leftId,
    s.rightId,
  ]);
  for (const image of [...s.images, ...images])
    if (keep.has(image.id)) s.records.set(image.id, image);
  for (const id of s.records.keys()) if (!keep.has(id)) s.records.delete(id);
  const available = new Set(images.map((i) => i.id));
  for (const id of s.records.keys()) {
    if (available.has(id)) s.unavailable.delete(id);
    else if (complete) s.unavailable.add(id);
  }
  for (const id of s.unavailable) if (!keep.has(id)) s.unavailable.delete(id);
  s.images = images;
}
export function candidates(s: Session): ImageRecord[] {
  return s.images.filter(
    (i) =>
      i.id !== s.leftId &&
      (s.scope === "folder" ||
        (s.scope === "checked" ? s.checked : s.promptIds).has(i.id)),
  );
}
export function stepCandidate(s: Session, delta: number) {
  const list = s.mode === "single" ? s.images : candidates(s);
  const key = s.mode === "single" ? "currentId" : "rightId";
  const index = list.findIndex((i) => i.id === s[key]);
  const next = index + delta;
  if (next >= 0 && next < list.length) s[key] = list[next].id;
}
export function closeSession(s: Session) {
  s.open = false;
  s.checked.clear();
  s.unavailable.clear();
  s.currentId = null;
  s.leftId = null;
  s.rightId = null;
  s.manualMatches = {};
  s.panel = false;
  s.mode = "grid";
  s.scope = "folder";
  s.promptIds.clear();
  s.transforms = { left: fit(), right: fit() };
  s.records.clear();
  s.images = [];
}
export function setLinked(s: Session, value: boolean) {
  s.linked = value;
  if (value) s.transforms.right = { ...s.transforms.left };
}
export function updateTransform(
  s: Session,
  side: "left" | "right",
  transform: Transform,
) {
  s.transforms[side] = { ...transform };
  if (s.linked)
    s.transforms[side === "left" ? "right" : "left"] = { ...transform };
}
export function viewport(
  count: number,
  width: number,
  height: number,
  scroll: number,
  cell: number,
) {
  const columns = Math.max(1, Math.floor(width / cell));
  const first = Math.max(0, Math.floor(scroll / cell) - 2);
  const last = Math.min(
    Math.ceil(count / columns),
    Math.ceil((scroll + height) / cell) + 2,
  );
  return {
    columns,
    start: first * columns,
    end: Math.min(count, last * columns),
    offset: first * cell,
    totalHeight: Math.ceil(count / columns) * cell,
  };
}
export function anchorScroll(
  before: ImageRecord[],
  after: ImageRecord[],
  scroll: number,
  width: number,
  oldCell: number,
  newCell: number,
) {
  const oldColumns = Math.max(1, Math.floor(width / oldCell));
  const index = Math.floor(scroll / oldCell) * oldColumns;
  const anchor = before[index]?.id;
  const newIndex = after.findIndex((i) => i.id === anchor);
  if (newIndex < 0) return scroll;
  return (
    Math.floor(newIndex / Math.max(1, Math.floor(width / newCell))) * newCell +
    Math.min(scroll % oldCell, newCell - 1)
  );
}
export function revealHorizontal(
  width: number,
  scroll: number,
  left: number,
  itemWidth: number,
) {
  if (left < scroll) return left;
  if (left + itemWidth > scroll + width)
    return Math.max(0, left + itemWidth - width);
  return scroll;
}
