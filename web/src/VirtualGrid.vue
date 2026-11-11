<script setup lang="ts">
import {
  computed,
  nextTick,
  onMounted,
  onBeforeUnmount,
  ref,
  watch,
} from "vue";
import type { GalleryApi } from "./api";
import { viewport, anchorScroll, type ImageRecord } from "./state";
import Thumbnail from "./Thumbnail.vue";
const props = defineProps<{
  images: ImageRecord[];
  checked: Set<string>;
  large: boolean;
  api: GalleryApi;
  hasMore: boolean;
  initialScroll: number;
}>();
const emit = defineEmits<{
  view: [id: string];
  pin: [id: string];
  check: [id: string];
  more: [];
  position: [value: { scroll: number; width: number; cell: number }];
}>();
const el = ref<HTMLElement>();
const width = ref(1000);
const height = ref(600);
const scroll = ref(props.initialScroll);
const cell = computed(() => (props.large ? 284 : 164));
const range = computed(() =>
  viewport(
    props.images.length,
    width.value,
    height.value,
    scroll.value,
    cell.value,
  ),
);
const visible = computed(() =>
  props.images.slice(range.value.start, range.value.end),
);
let observer: ResizeObserver;
function measure() {
  if (el.value) {
    width.value = el.value.clientWidth || 1000;
    height.value = el.value.clientHeight || 600;
  }
}
function reportPosition() {
  emit("position", {
    scroll: scroll.value,
    width: width.value,
    cell: cell.value,
  });
}
function onScroll() {
  scroll.value = el.value?.scrollTop ?? 0;
  reportPosition();
  if (range.value.end >= props.images.length && props.hasMore) emit("more");
}
watch(
  () => [props.images, props.large] as const,
  async ([images, large], [oldImages, oldLarge]) => {
    const top = anchorScroll(
      oldImages,
      images,
      scroll.value,
      width.value,
      oldLarge ? 284 : 164,
      large ? 284 : 164,
    );
    await nextTick();
    if (el.value) {
      el.value.scrollTop = top;
      scroll.value = top;
      reportPosition();
    }
  },
  { flush: "pre" },
);
onMounted(() => {
  measure();
  if (el.value) el.value.scrollTop = scroll.value;
  observer = new ResizeObserver(measure);
  if (el.value) observer.observe(el.value);
});
onBeforeUnmount(() => observer?.disconnect());
defineExpose({
  top: () => {
    if (el.value) {
      el.value.scrollTop = 0;
      scroll.value = 0;
      reportPosition();
    }
  },
});
</script>
<template>
  <div
    ref="el"
    class="sg-grid-scroll"
    data-testid="image-grid"
    @scroll.passive="onScroll"
  >
    <div class="sg-grid-space" :style="{ height: range.totalHeight + 'px' }">
      <div
        class="sg-grid"
        :style="{
          gridTemplateColumns: `repeat(${range.columns}, minmax(0,1fr))`,
          transform: `translateY(${range.offset}px)`,
        }"
      >
        <article
          v-for="image in visible"
          :key="image.id"
          class="sg-card"
          :class="{ 'sg-checked': checked.has(image.id) }"
          :style="{ height: cell + 'px' }"
        >
          <button
            class="sg-thumb-button"
            data-action="view"
            :aria-label="'View ' + image.name"
            @click="emit('view', image.id)"
          >
            <Thumbnail
              :url="api.imageURL(image, 'thumbnail', large ? 512 : 256)"
              :alt="image.name"
            />
          </button>
          <div class="sg-card-tools">
            <label :title="'Select ' + image.name"
              ><input
                type="checkbox"
                :aria-label="'Select ' + image.name"
                :checked="checked.has(image.id)"
                @change="emit('check', image.id)"
              />
              Compare</label
            ><button
              class="sg-pin"
              :aria-label="'Pin ' + image.name + ' as reference'"
              @click="emit('pin', image.id)"
            >
              Pin
            </button>
          </div>
        </article>
      </div>
    </div>
    <button v-if="hasMore" class="sg-load" @click="emit('more')">
      Load more images
    </button>
  </div>
</template>
