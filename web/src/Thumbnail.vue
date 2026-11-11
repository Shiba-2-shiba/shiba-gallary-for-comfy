<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from "vue";
import { thumbnails } from "./thumbnailQueue";
import { thumbnailCache } from "./thumbnailCache";
const props = defineProps<{
  url: string;
  alt: string;
  cachedFallbackUrl?: string;
  quiet?: boolean;
}>();
const emit = defineEmits<{
  ready: [size: { width: number; height: number }];
}>();
const source = ref("");
const currentImage = ref<HTMLImageElement>();
const error = ref(false);
let abort: AbortController | undefined;
let cancel: (() => void) | undefined;
let revision = 0;
function cleanup() {
  abort?.abort();
  cancel?.();
  if (source.value) URL.revokeObjectURL(source.value);
  source.value = "";
}
watch(
  () => props.url,
  (url) => {
    cleanup();
    const token = ++revision;
    const cacheEpoch = thumbnailCache.epoch;
    error.value = false;
    const cached =
      thumbnailCache.get(url) ??
      (props.cachedFallbackUrl && thumbnailCache.get(props.cachedFallbackUrl));
    if (cached) {
      source.value = URL.createObjectURL(cached);
      return;
    }
    abort = new AbortController();
    const signal = abort.signal;
    const job = thumbnails.add(async () => {
      try {
        const result = await fetch(url, { signal, credentials: "same-origin" });
        if (!result.ok) throw new Error();
        const blob = await result.blob();
        if (token === revision && !signal.aborted) {
          thumbnailCache.set(url, blob, cacheEpoch);
          source.value = URL.createObjectURL(blob);
        }
      } catch {
        if (!signal.aborted && token === revision) error.value = true;
      }
    });
    cancel = job.cancel;
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
