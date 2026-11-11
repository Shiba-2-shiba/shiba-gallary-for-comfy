<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref, watch } from "vue";
import type { GalleryApi } from "./api";
import type { ImageRecord, Transform } from "./state";
import Thumbnail from "./Thumbnail.vue";
const props = defineProps<{
  image: ImageRecord | undefined;
  api: GalleryApi;
  side: "left" | "right";
  transform: Transform;
  models: string[];
  modelStatus: string;
  unavailable?: boolean;
}>();
const emit = defineEmits<{ transform: [value: Transform]; original: [] }>();
const currentImage = ref<HTMLImageElement>();
const surface = ref<HTMLElement>();
const width = ref(640);
const height = ref(600);
const natural = ref({ width: 0, height: 0 });
const loaded = ref(false);
const failed = ref(false);
const previewReady = ref(false);
let observer: ResizeObserver;
let drag: { x: number; y: number; pointerId: number } | null = null;
let pending: Transform | null = null;
let lastEmitted: Transform | null = null;
let frameId: number | null = null;
let frameBox: DOMRect | null = null;
function sameTransform(a: Transform, b: Transform) {
  return a.scale === b.scale && a.x === b.x && a.y === b.y;
}
function cancelInput() {
  if (frameId !== null) cancelAnimationFrame(frameId);
  frameId = null;
  frameBox = null;
  pending = null;
  lastEmitted = null;
  drag = null;
}
function flushInput() {
  if (frameId !== null) cancelAnimationFrame(frameId);
  frameId = null;
  frameBox = null;
  const value = pending;
  pending = null;
  if (value) {
    lastEmitted = value;
    emit("transform", value);
  }
}
function queueTransform(value: Transform) {
  pending = value;
  if (frameId === null) frameId = requestAnimationFrame(flushInput);
}
function inputTransform() {
  return pending ?? lastEmitted ?? props.transform;
}
watch(
  () => props.transform,
  value => {
    // A parent echo of our emitted value must not discard newer queued input.
    if (lastEmitted && sameTransform(value, lastEmitted)) lastEmitted = null;
    else cancelInput();
  },
  { deep: true, flush: "sync" },
);
const fit = computed(() =>
  Math.min(
    width.value / (natural.value.width || props.image?.width || 1024),
    height.value / (natural.value.height || props.image?.height || 1024),
  ),
);
const baseWidth = computed(
  () => (natural.value.width || props.image?.width || 1024) * fit.value,
);
const baseHeight = computed(
  () => (natural.value.height || props.image?.height || 1024) * fit.value,
);
const style = computed(() => ({
  width: baseWidth.value + "px",
  height: baseHeight.value + "px",
  transform: `translate(-50%,-50%) translate(${props.transform.x * baseWidth.value * props.transform.scale}px,${props.transform.y * baseHeight.value * props.transform.scale}px) scale(${props.transform.scale})`,
}));
watch(
  [() => props.image?.id, () => props.image?.revision],
  () => {
    cancelInput();
    // Removing a node alone may leave its native image request in flight.
    currentImage.value?.removeAttribute("src");
    loaded.value = false;
    failed.value = false;
    previewReady.value = false;
    natural.value = { width: 0, height: 0 };
  },
);
async function imageLoaded(event: Event) {
  if (event.target !== currentImage.value) return;
  const image = event.target as HTMLImageElement;
  if (image.decode) {
    try {
      await image.decode();
    } catch {
      if (image === currentImage.value) failed.value = true;
      return;
    }
  }
  if (image !== currentImage.value) return;
  natural.value = { width: image.naturalWidth, height: image.naturalHeight };
  loaded.value = true;
}
function previewLoaded(size: { width: number; height: number }) {
  if (loaded.value) return;
  previewReady.value = true;
  if (!props.image?.width && size.width && size.height) natural.value = size;
}
function imageFailed(event: Event) {
  if (event.target === currentImage.value) failed.value = true;
}
defineExpose({ originalScale: computed(() => 1 / fit.value) });
function wheel(event: WheelEvent) {
  const current = inputTransform();
  const old = current.scale;
  const scale = Math.min(
    32,
    Math.max(0.25, old * Math.exp(-event.deltaY * 0.0015)),
  );
  const box = frameBox ??= surface.value!.getBoundingClientRect();
  const qx = (event.clientX - box.left - box.width / 2) / baseWidth.value;
  const qy = (event.clientY - box.top - box.height / 2) / baseHeight.value;
  queueTransform({
    scale,
    x: current.x + qx * (1 / scale - 1 / old),
    y: current.y + qy * (1 / scale - 1 / old),
  });
}
function down(event: PointerEvent) {
  if (event.button !== 0 || drag) return;
  drag = { x: event.clientX, y: event.clientY, pointerId: event.pointerId };
  surface.value?.setPointerCapture(event.pointerId);
}
function move(event: PointerEvent) {
  if (!drag || drag.pointerId !== event.pointerId) return;
  const current = inputTransform();
  queueTransform({
    ...current,
    x: current.x + (event.clientX - drag.x) / (baseWidth.value * current.scale),
    y: current.y + (event.clientY - drag.y) / (baseHeight.value * current.scale),
  });
  drag.x = event.clientX;
  drag.y = event.clientY;
}
function up(event: PointerEvent) {
  if (!drag || drag.pointerId !== event.pointerId) return;
  move(event);
  drag = null;
  flushInput();
}
function stopDrag(event: PointerEvent) {
  if (!drag || drag.pointerId !== event.pointerId) return;
  drag = null;
  // Cancel/lost-capture coordinates need not be valid. Keep the last move.
  flushInput();
}
function resetTransform() {
  cancelInput();
  emit("transform", { scale: 1, x: 0, y: 0 });
}
function originalPixels() {
  cancelInput();
  emit("original");
}
function measure() {
  if (surface.value) {
    width.value = surface.value.clientWidth || 640;
    height.value = surface.value.clientHeight || 600;
  }
}
onMounted(() => {
  measure();
  observer = new ResizeObserver(measure);
  if (surface.value) observer.observe(surface.value);
});
onBeforeUnmount(() => {
  cancelInput();
  currentImage.value?.removeAttribute("src");
  observer?.disconnect();
});
</script>
<template>
  <section class="sg-image-pane" :data-side="side" :data-image="image?.id">
    <div class="sg-pane-caption">
      <strong>{{ side === "left" ? "Reference · pinned" : "Image" }}</strong
      ><span>{{ image?.name ?? "No candidate" }}</span
      ><button
        :aria-label="'Show ' + side + ' original pixels'"
        :disabled="!loaded"
        @click="originalPixels"
      >
        1:1
      </button>
    </div>
    <p v-if="unavailable" class="sg-unavailable" role="status">
      No longer present in this folder. The selected image is kept in place; the
      displayed image may be cached.
    </p>
    <div
      ref="surface"
      class="sg-image-surface"
      @wheel.prevent="wheel"
      @pointerdown="down"
      @pointermove="move"
      @pointerup="up"
      @pointercancel="stopDrag"
      @lostpointercapture="stopDrag"
      @dblclick="resetTransform"
    >
      <div
        v-if="image && !loaded"
        :key="image.id + image.revision + 'preview'"
        class="sg-image-preview"
        :style="style"
      >
        <Thumbnail
          :url="api.imageURL(image, 'thumbnail', 512)"
          :cached-fallback-url="api.imageURL(image, 'thumbnail', 256)"
          :alt="image.name + ' · preview'"
          quiet
          priority="high"
          @ready="previewLoaded"
        />
      </div>
      <img
        class="sg-original"
        ref="currentImage"
        v-if="image && !failed"
        :key="image.id + image.revision"
        :src="api.imageURL(image, 'original')"
        :alt="image.name"
        :style="{ ...style, opacity: loaded ? 1 : 0 }"
        fetchpriority="high"
        loading="eager"
        draggable="false"
        decoding="async"
        @load="imageLoaded"
        @error="imageFailed"
      />
      <p v-if="!image" class="sg-surface-status">
        {{
          failed
            ? "Image unavailable. It may have been moved or overwritten."
            : "No comparison candidate. Select more images or change the candidate range."
        }}
      </p>
    </div>
    <div class="sg-models" :title="models.join(', ')">
      <span>{{
        models.length ? "Model: " + models.join(" · ") : modelStatus
      }}</span
      ><span class="sg-zoom-status"
        >{{ Math.round(transform.scale * 100) }}% of fit</span
      >
      <span class="sg-quality-status" role="status">{{
        loaded
          ? "Original"
          : failed
            ? "Original unavailable"
            : previewReady
              ? "Preview · Loading original…"
              : "Loading original…"
      }}</span>
    </div>
  </section>
</template>
