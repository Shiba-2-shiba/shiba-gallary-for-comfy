<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from "vue";
import { requestThumbnail } from "./thumbnailRequests";
import type { ThumbnailPriority } from "./thumbnailQueue";
import { thumbnailCache } from "./thumbnailCache";
const props = defineProps<{
  url: string;
  alt: string;
  cachedFallbackUrl?: string;
  quiet?: boolean;
  priority?: ThumbnailPriority;
}>();
const emit = defineEmits<{
  ready: [size: { width: number; height: number }];
}>();
const source = ref("");
const currentImage = ref<HTMLImageElement>();
const error = ref(false);
let cancel: (() => void) | undefined;
let revision = 0;
function cleanup() {
  cancel?.();
  if (source.value) URL.revokeObjectURL(source.value);
  source.value = "";
}
watch(
  () => props.url,
  (url) => {
    const token = ++revision;
    cleanup();
    error.value = false;
    const cached =
      thumbnailCache.get(url) ??
      (props.cachedFallbackUrl && thumbnailCache.get(props.cachedFallbackUrl));
    if (cached) {
      source.value = URL.createObjectURL(cached);
      return;
    }
    const request = requestThumbnail(url, props.priority);
    cancel = request.cancel;
    void request.done.then((blob) => {
      if (token !== revision) return;
      if (blob) source.value = URL.createObjectURL(blob);
      else error.value = true;
    });
  },
  { immediate: true },
);
function loaded(event: Event) {
  if (event.target !== currentImage.value) return;
  const image = event.target as HTMLImageElement;
  emit("ready", { width: image.naturalWidth, height: image.naturalHeight });
}
function failed(event: Event) {
  if (event.target !== currentImage.value) return;
  if (source.value) URL.revokeObjectURL(source.value);
  source.value = "";
  error.value = true;
  thumbnailCache.delete(props.url);
  if (props.cachedFallbackUrl) thumbnailCache.delete(props.cachedFallbackUrl);
}
onBeforeUnmount(() => {
  revision++;
  cleanup();
});
</script>
<template>
  <img
    ref="currentImage"
    :key="source"
    v-if="source"
    :src="source"
    :alt="alt"
    decoding="async"
    @error="failed"
    @load="loaded"
  /><span v-else-if="!quiet" class="sg-thumb-placeholder">{{
    error ? "Image unavailable" : "Loading preview…"
  }}</span>
</template>
