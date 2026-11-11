<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from "vue";
import { thumbnails } from "./thumbnailQueue";
const props = defineProps<{ url: string; alt: string }>();
const source = ref("");
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
    error.value = false;
    abort = new AbortController();
    const signal = abort.signal;
    const job = thumbnails.add(async () => {
      try {
        const result = await fetch(url, { signal, credentials: "same-origin" });
        if (!result.ok) throw new Error();
        const blob = await result.blob();
        if (token === revision && !signal.aborted)
          source.value = URL.createObjectURL(blob);
      } catch {
        if (!signal.aborted && token === revision) error.value = true;
      }
    });
    cancel = job.cancel;
  },
  { immediate: true },
);
function failed() {
  if (source.value) URL.revokeObjectURL(source.value);
  source.value = "";
  error.value = true;
}
onBeforeUnmount(() => {
  revision++;
  cleanup();
});
</script>
<template>
  <img
    v-if="source"
    :src="source"
    :alt="alt"
    decoding="async"
    @error="failed"
  /><span v-else class="sg-thumb-placeholder">{{
    error ? "Image unavailable" : "Loading preview…"
  }}</span>
</template>
