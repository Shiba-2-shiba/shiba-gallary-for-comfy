<script setup lang="ts">
import { ref } from "vue";

// Native <details> hides its descendants visually, but Vue still evaluates
// their render expressions. A conditional slot also defers their preparation.
const expanded = ref(false);
function toggle(event: Event) {
  expanded.value = (event.currentTarget as HTMLDetailsElement).open;
}
</script>
<template>
  <details @toggle="toggle">
    <summary><slot name="summary" /></summary>
    <slot v-if="expanded" />
  </details>
</template>
