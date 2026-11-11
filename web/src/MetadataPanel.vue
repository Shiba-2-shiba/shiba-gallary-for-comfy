<script setup lang="ts">
import { computed, ref } from "vue";
import LazyDetails from "./LazyDetails.vue";
import {
  compareMetadata,
  displayValue,
  type NormalizedMetadata,
} from "./metadata";
const props = defineProps<{
  left?: NormalizedMetadata;
  right?: NormalizedMetadata;
  compare: boolean;
  manualMatches: Record<string, string | null>;
  loading: boolean;
}>();
const emit = defineEmits<{
  close: [];
  retry: [];
  match: [left: string, right: string | null | undefined];
}>();
const copied = ref("");
const result = computed(() =>
  props.compare && props.left && props.right
    ? compareMetadata(props.left, props.right, {
        manualMatches: props.manualMatches,
      })
    : null,
);
async function copy(value: unknown) {
  try {
    await navigator.clipboard.writeText(
      typeof value === "string" ? value : displayValue(value),
    );
    copied.value = "Copied";
  } catch {
    copied.value = "Clipboard unavailable. Select the displayed text to copy.";
  }
}
function rightNode(key: string) {
  const manual = props.manualMatches[key];
  const id =
    manual === undefined
      ? result.value?.matches.find((m) => m.leftKey === key)?.rightKey
      : manual;
  return props.right?.nodes.find((node) => node.key === id);
}
function originalJSON(value: NormalizedMetadata) {
  return (
    '{\n  \"prompt\": ' +
    (value.rawText.prompt ?? displayValue(value.raw.prompt)) +
    ',\n  \"workflow\": ' +
    (value.rawText.workflow ?? displayValue(value.raw.workflow)) +
    "\n}"
  );
}
function match(event: Event, key: string) {
  const value = (event.target as HTMLSelectElement).value;
  emit(
    "match",
    key,
    value === "__auto__" ? undefined : value === "__none__" ? null : value,
  );
}
</script>
<template>
  <aside class="sg-metadata" aria-label="Saved settings">
    <div class="sg-panel-heading">
      <h2>{{ compare ? "Saved setting differences" : "Saved settings" }}</h2>
      <button aria-label="Close settings" @click="emit('close')">×</button>
    </div>
    <p class="sg-muted">
      Saved values only. Prompt text is excluded from identified differences.
      Unknown widget values keep their saved positions.
    </p>
    <p v-if="loading">Loading saved metadata…</p>
    <button
      v-if="left?.status === 'invalid' || right?.status === 'invalid'"
      @click="emit('retry')"
    >
      Reload saved settings
    </button>
    <p v-if="copied" role="status">{{ copied }}</p>
    <template v-if="result">
      <p
        class="sg-result"
        :class="{ 'sg-warning': result.status === 'incomplete' }"
      >
        {{
          result.status === "same"
            ? "No differences in comparable saved settings."
            : result.status === "different"
              ? result.differences.length + " saved differences"
              : "Incomplete comparison. Missing or ambiguous settings are not equal."
        }}
      </p>
      <p class="sg-muted">
        {{ result.excludedPromptFields }} identified prompt fields excluded.
      </p>
      <p v-for="(warning, i) in result.warnings" :key="i" class="sg-warning">
        {{ warning }}
      </p>
      <button @click="copy(result.differences)">
        Copy differences (left → right)
      </button>
      <LazyDetails class="sg-node-mapping">
        <template #summary>Review / change node matching</template>
        <p class="sg-muted">
          One-to-one within the same saved source. Auto matches are candidates,
          not proof of workflow identity.
        </p>
        <label v-for="node in left?.nodes" :key="node.key" class="sg-match-row"
          ><span
            >{{ node.source }} · {{ node.id }} ·
            {{ node.title || node.type }}</span
          >
          <select
            :aria-label="'Match ' + node.key"
            :value="
              manualMatches[node.key] === null
                ? '__none__'
                : (manualMatches[node.key] ?? '__auto__')
            "
            @change="match($event, node.key)"
          >
            <option value="__auto__">
              Auto:
              {{
                result.matches.find((m) => m.leftKey === node.key)?.rightKey ??
                "unmatched"
              }}
            </option>
            <option value="__none__">Leave unmatched</option>
            <option
              v-for="candidate in right?.nodes.filter(
                (n) => n.source === node.source,
              )"
              :key="candidate.key"
              :value="candidate.key"
            >
              {{ candidate.id }} · {{ candidate.title || candidate.type }}
            </option>
          </select>
          <LazyDetails>
            <template #summary>Left saved values</template>
            <pre>{{
              displayValue(
                node.fields.map((f) => ({ name: f.label, value: f.value })),
              )
            }}</pre>
          </LazyDetails>
          <LazyDetails v-if="rightNode(node.key)">
            <template #summary>Right candidate saved values</template>
            <pre>{{
              displayValue(
                rightNode(node.key)?.fields.map((f) => ({
                  name: f.label,
                  value: f.value,
                })),
              )
            }}</pre>
          </LazyDetails>
        </label>
        <p
          v-for="item in result.unmatchedLeft"
          :key="item.node.key"
          class="sg-warning"
        >
          Unmatched left {{ item.node.key }} · candidates:
          {{ item.candidateKeys.join(", ") || "none" }}
        </p>
        <p
          v-for="item in result.unmatchedRight"
          :key="item.node.key"
          class="sg-warning"
        >
          Unmatched right {{ item.node.key }}
        </p>
      </LazyDetails>
      <article
        v-for="difference in result.differences"
        :key="difference.id"
        class="sg-difference"
      >
        <strong>{{
          difference.leftNode?.title ||
          difference.rightNode?.title ||
          difference.leftNode?.type ||
          difference.rightNode?.type
        }}</strong
        ><small
          >{{ difference.source }} · {{ difference.leftNode?.id ?? "—" }} →
          {{ difference.rightNode?.id ?? "—" }} · {{ difference.kind }}</small
        >
        <h3>{{ difference.label }}</h3>
        <label
          >Left reference
          <button @click="copy(difference.left)">Copy left</button></label
        >
        <pre>{{ displayValue(difference.left) }}</pre>
        <label
          >Right image
          <button @click="copy(difference.right)">Copy right</button></label
        >
        <pre>{{ displayValue(difference.right) }}</pre>
      </article>
    </template>
    <template v-else-if="right"
      ><p>Status: {{ right.status }}</p>
      <p v-for="warning in right.warnings" :key="warning" class="sg-warning">
        {{ warning }}
      </p>
      <LazyDetails v-for="node in right.nodes" :key="node.key">
        <template #summary>
          {{ node.source }} · {{ node.id }} · {{ node.title || node.type }}
        </template>
        <div v-for="field in node.fields" :key="field.key" class="sg-field">
          <label
            >{{ field.label }}
            <button @click="copy(field.value)">Copy value</button></label
          >
          <pre>{{ displayValue(field.value) }}</pre>
        </div>
      </LazyDetails></template
    >
    <LazyDetails v-if="right">
      <template #summary>Original saved JSON (may include prompts)</template>
      <p class="sg-muted">
        Copied JSON may contain prompt text. Nothing is sent outside this
        ComfyUI server.
      </p>
      <button v-if="left && compare" @click="copy(originalJSON(left))">
        Copy original left JSON</button
      ><button @click="copy(originalJSON(right))">
        Copy original {{ compare ? "right " : "" }}JSON
      </button>
      <pre>{{ displayValue(right.raw) }}</pre>
    </LazyDetails>
  </aside>
</template>
