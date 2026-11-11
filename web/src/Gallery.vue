<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";
import { GalleryApi, type Folder } from "./api";
import {
  createSession,
  closeSession,
  anchorScroll,
  revealHorizontal,
  candidates,
  stepCandidate,
  setLinked,
  updateTransform,
  type ImageRecord,
} from "./state";
import { GalleryController } from "./controller";
import {
  normalizeMetadata,
  getModelNames,
  samePrompt,
  type NormalizedMetadata,
} from "./metadata";
import VirtualGrid from "./VirtualGrid.vue";
import ImagePane from "./ImagePane.vue";
import MetadataPanel from "./MetadataPanel.vue";
import Thumbnail from "./Thumbnail.vue";
import { thumbnailCache } from "./thumbnailCache";
const props = defineProps<{ api: GalleryApi }>();
const s = reactive(createSession());
const folders = ref<Folder[]>([]);
const large = ref(true);
const dialog = ref<HTMLDialogElement>();
const leftPane = ref<InstanceType<typeof ImagePane>>();
const rightPane = ref<InstanceType<typeof ImagePane>>();
const launcher = ref<HTMLButtonElement>();
const grid = ref<InstanceType<typeof VirtualGrid>>();
const gridPosition = ref({ scroll: 0, width: 1000, cell: 284 });
const candidateRow = ref<HTMLElement>();
const tick = ref(0);
const c = new GalleryController(props.api, s, () => tick.value++);
const error = ref("");
const helper = ref("");
const searching = ref(false);
const folderLoading = ref(false);
const meta = reactive(new Map<string, NormalizedMetadata>());
const pending = new Map<string, Promise<NormalizedMetadata | undefined>>();
let metadataAbort = new AbortController();
let folderAbort = new AbortController();
let life = 0;
let searchToken = 0;
let interval: ReturnType<typeof setInterval> | undefined;
const loading = computed(() => {
  void tick.value;
  return c.loading;
});
const loadError = computed(() => {
  void tick.value;
  return c.error;
});
const hasMore = computed(() => {
  void tick.value;
  return c.cursor !== null;
});
const left = computed(() => (s.leftId ? s.records.get(s.leftId) : undefined));
const right = computed(() => {
  const id = s.mode === "single" ? s.currentId : s.rightId;
  return id ? s.records.get(id) : undefined;
});
const cacheKey = (image: ImageRecord) => image.id + ":" + image.revision;
const leftMeta = computed(() =>
  left.value ? meta.get(cacheKey(left.value)) : undefined,
);
const rightMeta = computed(() =>
  right.value ? meta.get(cacheKey(right.value)) : undefined,
);
const leftModels = computed(() =>
  leftMeta.value ? getModelNames(leftMeta.value) : [],
);
const rightModels = computed(() =>
  rightMeta.value ? getModelNames(rightMeta.value) : [],
);
const references = computed(() => {
  const ids = new Set([...s.pinned, ...s.checked]);
  if (s.leftId) ids.add(s.leftId);
  return [...ids]
    .map((id) => s.records.get(id))
    .filter((image): image is ImageRecord => !!image);
});
const choices = computed(() =>
  s.mode === "single" ? s.images : candidates(s),
);
const choiceIndex = computed(() =>
  choices.value.findIndex(
    (i) => i.id === (s.mode === "single" ? s.currentId : s.rightId),
  ),
);
const candidateStrip = computed(() => {
  const index = Math.max(0, choiceIndex.value);
  return choices.value.slice(Math.max(0, index - 7), index + 8);
});
watch(
  () => s.images,
  (images, previous) => {
    if (s.mode !== "grid")
      gridPosition.value.scroll = anchorScroll(
        previous,
        images,
        gridPosition.value.scroll,
        gridPosition.value.width,
        gridPosition.value.cell,
        gridPosition.value.cell,
      );
  },
);
watch(
  () => [
    s.mode,
    s.rightId,
    s.currentId,
    candidateStrip.value.map((i) => i.id).join(","),
  ],
  async () => {
    await nextTick();
    const row = candidateRow.value;
    const selected = row?.querySelector<HTMLElement>("[aria-pressed=true]");
    if (row && selected)
      row.scrollLeft = revealHorizontal(
        row.clientWidth,
        row.scrollLeft,
        selected.offsetLeft,
        selected.offsetWidth,
      );
  },
);
function modelStatus(value: NormalizedMetadata | undefined) {
  return value
    ? "No identifiable saved model information"
    : "Loading saved model information…";
}
async function metadata(
  image: ImageRecord | undefined,
): Promise<NormalizedMetadata | undefined> {
  if (!image) return;
  const key = cacheKey(image);
  if (meta.has(key)) return meta.get(key);
  if (pending.has(key)) return pending.get(key);
  const epoch = life;
  const signal = metadataAbort.signal;
  const request = props.api
    .metadata(image, signal)
    .then(normalizeMetadata)
    .catch((e) =>
      signal.aborted
        ? undefined
        : normalizeMetadata({
            status: "invalid",
            prompt: null,
            workflow: null,
            warnings: [e instanceof Error ? e.message : "Metadata unavailable"],
          }),
    )
    .then((value) => {
      if (value && epoch === life) {
        meta.set(key, value);
        if (meta.size > 200) {
          const protectedKeys = new Set([
            left.value && cacheKey(left.value),
            right.value && cacheKey(right.value),
            key,
          ]);
          for (const old of meta.keys()) {
            if (!protectedKeys.has(old)) {
              meta.delete(old);
              break;
            }
          }
        }
      }
      return value;
    })
    .finally(() => {
      if (pending.get(key) === request) pending.delete(key);
    });
  pending.set(key, request);
  return request;
}
watch(
  () => [
    left.value?.id,
    left.value?.revision,
    right.value?.id,
    right.value?.revision,
  ],
  () => {
    void metadata(left.value);
    void metadata(right.value);
    s.manualMatches = {};
  },
  { flush: "post" },
);
async function open() {
  if (s.open) return;
  life++;
  metadataAbort = new AbortController();
  folderAbort = new AbortController();
  s.open = true;
  gridPosition.value.scroll = 0;
  error.value = "";
  helper.value = "";
  await nextTick();
  dialog.value?.showModal();
  folderLoading.value = true;
  const epoch = life;
  try {
    const response = await props.api.folders(folderAbort.signal);
    if (epoch !== life) return;
    folders.value = response.folders;
    const folder =
      response.folders.find((f) => f.id === s.folderId) ?? response.folders[0];
    if (folder) await c.selectFolder(folder.id);
    else error.value = "No output folders are available.";
  } catch (e) {
    if (epoch === life)
      error.value = e instanceof Error ? e.message : "Folders unavailable";
  } finally {
    if (epoch === life) folderLoading.value = false;
  }
  if (epoch === life)
    interval = setInterval(() => {
      if (!document.hidden) void refresh();
    }, 5000);
}
function close() {
  life++;
  searchToken++;
  searching.value = false;
  folderAbort.abort();
  metadataAbort.abort();
  c.dispose();
  clearInterval(interval);
  pending.clear();
  meta.clear();
  thumbnailCache.clear();
  dialog.value?.close();
  closeSession(s);
  helper.value = "";
  void nextTick(() => launcher.value?.focus());
}
async function chooseFolder(event: Event) {
  gridPosition.value.scroll = 0;
  searchToken++;
  searching.value = false;
  helper.value = "";
  await c.selectFolder((event.target as HTMLSelectElement).value);
}
async function refresh() {
  if (s.open) await c.refresh();
}
function view(id: string) {
  s.currentId = id;
  s.mode = "single";
  s.panel = false;
  updateTransform(s, "right", { scale: 1, x: 0, y: 0 });
}
function check(id: string) {
  if (s.checked.has(id)) s.checked.delete(id);
  else s.checked.add(id);
}
function cancelSearch() {
  searchToken++;
  searching.value = false;
  helper.value = "";
}
watch(() => [left.value?.id, left.value?.revision], cancelSearch, {
  flush: "sync",
});
function pin(id: string) {
  cancelSearch();
  s.pinned.add(id);
  s.leftId = id;
  s.mode = "compare";
  s.scope = s.checked.size > 1 ? "checked" : "folder";
  s.rightId = id;
  s.manualMatches = {};
  s.panel = false;
  helper.value = "";
  s.transforms = {
    left: { scale: 1, x: 0, y: 0 },
    right: { scale: 1, x: 0, y: 0 },
  };
}
function startCompare() {
  const id =
    s.images.find((i) => s.checked.has(i.id))?.id ??
    s.currentId ??
    s.images[0]?.id;
  if (id) pin(id);
}
function changeScope() {
  if (searching.value) cancelSearch();
  if (!candidates(s).some((i) => i.id === s.rightId))
    s.rightId = candidates(s)[0]?.id ?? null;
}
function original(side: "left" | "right") {
  const transforms = {
    left: { scale: leftPane.value?.originalScale ?? 1, x: 0, y: 0 },
    right: { scale: rightPane.value?.originalScale ?? 1, x: 0, y: 0 },
  };
  if (s.linked) s.transforms = transforms;
  else s.transforms[side] = transforms[side];
}
function fit() {
  updateTransform(s, "left", { scale: 1, x: 0, y: 0 });
  updateTransform(s, "right", { scale: 1, x: 0, y: 0 });
}
function reloadMetadata() {
  for (const image of [left.value, right.value])
    if (image) {
      meta.delete(cacheKey(image));
      void metadata(image);
    }
}
function nodeMatch(left: string, right: string | null | undefined) {
  if (right === undefined) delete s.manualMatches[left];
  else {
    if (right !== null)
      for (const [key, value] of Object.entries(s.manualMatches))
        if (key !== left && value === right) s.manualMatches[key] = null;
    s.manualMatches[left] = right;
  }
}
async function findPrompt() {
  const reference = left.value;
  if (!reference || searching.value) return;
  const token = ++searchToken;
  searching.value = true;
  helper.value =
    "Checking saved text in " + s.images.length + " loaded images…";
  const base = await metadata(reference);
  if (token !== searchToken) return;
  if (!base || samePrompt(base, base) === null) {
    helper.value =
      "Saved prompt text cannot be identified. Normal comparison remains available.";
    searching.value = false;
    return;
  }
  const snapshot = s.images.slice();
  let offset = 0;
  let unknown = 0;
  let done = 0;
  const found = new Set<string>();
  async function worker() {
    while (offset < snapshot.length && token === searchToken) {
      const item = snapshot[offset++];
      if (item.id === reference!.id) continue;
      const value = await metadata(item);
      if (token !== searchToken) return;
      const match = value ? samePrompt(base!, value) : null;
      if (match === true) found.add(item.id);
      if (match === null) unknown++;
      done++;
      helper.value = `Checking saved text… ${done}/${snapshot.length - 1}`;
    }
  }
  await Promise.all([worker(), worker()]);
  if (token !== searchToken) return;
  searching.value = false;
  s.promptIds = found;
  s.scope = "prompt";
  changeScope();
  helper.value = `${found.size} exact saved-text matches; ${unknown} unknown. Checked ${snapshot.length} loaded images${hasMore.value ? " only. Load more in the grid to search further" : ""}. Saved text does not prove the final generated prompt.`;
  searching.value = false;
}
function keydown(event: KeyboardEvent) {
  if (!s.open) return;
  event.stopPropagation();
  const target = event.target as HTMLElement;
  if (event.key === "Escape") {
    event.preventDefault();
    if (s.panel) s.panel = false;
    else if (s.mode !== "grid") s.mode = "grid";
    else close();
    return;
  }
  if (["INPUT", "SELECT", "TEXTAREA"].includes(target.tagName)) return;
  if (
    s.mode !== "grid" &&
    (event.key === "ArrowLeft" || event.key === "ArrowRight")
  ) {
    event.preventDefault();
    stepCandidate(s, event.key === "ArrowLeft" ? -1 : 1);
  }
}
const eventRefresh: EventListener = () => {
  void refresh();
};
onMounted(() => {
  props.api.comfy.addEventListener?.("executed", eventRefresh);
  document.addEventListener("visibilitychange", eventRefresh);
});
onBeforeUnmount(() => {
  thumbnailCache.clear();
  clearInterval(interval);
  folderAbort.abort();
  metadataAbort.abort();
  c.dispose();
  props.api.comfy.removeEventListener?.("executed", eventRefresh);
  document.removeEventListener("visibilitychange", eventRefresh);
});
</script>
<template>
  <button
    ref="launcher"
    data-action="open"
    data-testid="gallery-launcher"
    class="sg-launcher"
    aria-label="Open Gallery"
    @click="open"
  >
    <span aria-hidden="true">▧</span> Gallery
  </button>
  <dialog
    v-if="s.open"
    ref="dialog"
    class="sg-dialog"
    aria-label="Shiba Gallery"
    @keydown="keydown"
    @cancel.prevent
  >
    <header class="sg-header">
      <div class="sg-brand">
        <span class="sg-mark">▧</span>
        <div><strong>Gallery</strong><small>SHIBA · READ ONLY</small></div>
      </div>
      <button
        v-if="s.mode !== 'grid'"
        data-action="grid"
        @click="s.mode = 'grid'"
      >
        ← Grid</button
      ><label class="sg-folder"
        >Folder
        <select
          data-testid="folder-select"
          aria-label="Output folder"
          :value="s.folderId"
          :disabled="folderLoading"
          @change="chooseFolder"
        >
          <option v-for="folder in folders" :key="folder.id" :value="folder.id">
            {{ folder.name }}
          </option>
        </select></label
      ><span class="sg-header-spacer"></span
      ><span class="sg-live" :class="{ 'sg-working': loading }"
        ><i></i>{{ loading ? "Syncing" : "Auto refresh" }}</span
      ><button
        data-action="close"
        class="sg-close"
        aria-label="Close Gallery"
        @click="close"
      >
        Close ×
      </button>
    </header>
    <div v-if="error || loadError" class="sg-error" role="alert">
      {{ error || loadError }} <button @click="refresh">Retry</button>
    </div>
    <template v-if="s.mode === 'grid'">
      <div class="sg-toolbar">
        <span
          >{{ s.images.length }}{{ hasMore ? "+" : "" }} images
          <small>· newest file modification first</small></span
        >
        <div class="sg-size">
          <button :aria-pressed="!large" @click="large = false">Small</button
          ><button :aria-pressed="large" @click="large = true">Large</button>
        </div>
        <span class="sg-header-spacer"></span
        ><span>{{ s.checked.size }} selected</span
        ><button
          class="sg-primary"
          :disabled="s.images.length < 2"
          data-action="compare"
          @click="startCompare"
        >
          Compare selected
        </button>
      </div>
      <VirtualGrid
        v-if="s.images.length"
        ref="grid"
        :images="s.images"
        :checked="s.checked"
        :pinned="s.pinned"
        :large="large"
        :api="api"
        :has-more="hasMore"
        :initial-scroll="gridPosition.scroll"
        @position="gridPosition = $event"
        @view="view"
        @pin="pin"
        @check="check"
        @more="c.loadMore()"
      />
      <div v-else class="sg-empty">
        <span class="sg-empty-icon">▧</span>
        <h2>
          {{
            loading || folderLoading
              ? "Opening your output…"
              : "No images in this folder"
          }}
        </h2>
        <p>
          Images stay in their original folder. Gallery never deletes or changes
          them.
        </p>
      </div>
      <footer class="sg-grid-footer">
        <span
          >Click an image to inspect · check images to compare · Pin keeps the
          left image fixed</span
        ><button @click="grid?.top()">↑ Newest</button>
      </footer>
    </template>
    <template v-else>
      <div class="sg-toolbar sg-view-toolbar">
        <template v-if="s.mode === 'compare'"
          ><label class="sg-reference-select"
            >Reference
            <select
              aria-label="Reference image"
              :value="s.leftId"
              @change="pin(($event.target as HTMLSelectElement).value)"
            >
              <option
                v-for="image in references"
                :key="image.id"
                :value="image.id"
              >
                {{ image.name
                }}{{ s.pinned.has(image.id) ? " · pinned" : " · checked" }}
              </option>
            </select> </label
          ><label
            >Candidates
            <select
              v-model="s.scope"
              aria-label="Candidate range"
              @change="changeScope"
            >
              <option value="folder">This folder</option>
              <option value="checked">Checked images</option>
              <option v-if="s.scope === 'prompt'" value="prompt">
                Matching saved text
              </option>
            </select></label
          ></template
        ><button
          v-else
          data-action="pin"
          class="sg-primary"
          @click="s.currentId && pin(s.currentId)"
        >
          Pin as reference</button
        ><button
          data-action="previous"
          aria-label="Previous image"
          :disabled="choiceIndex <= 0"
          @click="stepCandidate(s, -1)"
        >
          ← Previous</button
        ><span class="sg-position"
          >{{ choiceIndex < 0 ? "—" : choiceIndex + 1 }} / {{ choices.length
          }}{{ hasMore ? "+" : "" }}</span
        ><button
          data-action="next"
          aria-label="Next image"
          :disabled="choiceIndex < 0 || choiceIndex >= choices.length - 1"
          @click="stepCandidate(s, 1)"
        >
          Next →</button
        ><span class="sg-header-spacer"></span
        ><label v-if="s.mode === 'compare'"
          ><input
            type="checkbox"
            aria-label="Link zoom and pan"
            :checked="s.linked"
            @change="setLinked(s, ($event.target as HTMLInputElement).checked)"
          />
          Link zoom / pan</label
        ><button @click="fit">Fit</button
        ><button
          :aria-pressed="s.panel"
          data-action="settings"
          @click="s.panel = !s.panel"
        >
          {{ s.mode === "compare" ? "Differences" : "Settings" }}
        </button>
      </div>
      <div class="sg-view-body">
        <div
          class="sg-image-pair"
          :class="{ 'sg-single': s.mode === 'single' }"
        >
          <ImagePane
            ref="leftPane"
            v-if="s.mode === 'compare'"
            :image="left"
            :unavailable="!!s.leftId && s.unavailable.has(s.leftId)"
            :api="api"
            side="left"
            :transform="s.transforms.left"
            :models="leftModels"
            :model-status="modelStatus(leftMeta)"
            @original="original('left')"
            @transform="updateTransform(s, 'left', $event)"
          /><ImagePane
            ref="rightPane"
            :image="right"
            :unavailable="!!right && s.unavailable.has(right.id)"
            :api="api"
            side="right"
            :transform="s.transforms.right"
            :models="rightModels"
            :model-status="modelStatus(rightMeta)"
            @original="original('right')"
            @transform="updateTransform(s, 'right', $event)"
          />
        </div>
        <MetadataPanel
          v-if="s.panel"
          :left="leftMeta"
          :right="rightMeta"
          :compare="s.mode === 'compare'"
          :manual-matches="s.manualMatches"
          :loading="!rightMeta || (s.mode === 'compare' && !leftMeta)"
          @close="s.panel = false"
          @match="nodeMatch"
          @retry="reloadMetadata"
        />
      </div>
      <div class="sg-candidate-bar">
        <div
          ref="candidateRow"
          class="sg-candidates"
          aria-label="Image candidates"
        >
          <button
            v-for="image in candidateStrip"
            :key="image.id"
            class="sg-candidate"
            :class="{
              'sg-current':
                image.id === (s.mode === 'single' ? s.currentId : s.rightId),
            }"
            :aria-label="'Choose ' + image.name"
            :aria-pressed="
              image.id === (s.mode === 'single' ? s.currentId : s.rightId)
            "
            @click="
              s.mode === 'single'
                ? (s.currentId = image.id)
                : (s.rightId = image.id)
            "
          >
            <Thumbnail
              :url="api.imageURL(image, 'thumbnail', 256)"
              :alt="image.name"
            />
          </button>
        </div>
        <button v-if="hasMore" @click="c.loadMore()">Load more</button
        ><button
          v-if="s.mode === 'compare'"
          :disabled="searching"
          @click="findPrompt"
        >
          {{ searching ? "Checking text…" : "Find matching saved text" }}
        </button>
      </div>
      <p v-if="helper" class="sg-helper" role="status">{{ helper }}</p>
      <footer class="sg-view-footer">
        Wheel to zoom · drag to pan · double-click to fit · ← → to navigate
        <span v-if="s.mode === 'compare'"
          >· Linking copies the left view; different sizes use normalized image
          positions.</span
        >
      </footer>
    </template>
  </dialog>
</template>
