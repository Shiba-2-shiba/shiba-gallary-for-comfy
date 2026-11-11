import { mount, flushPromises, type DOMWrapper } from '@vue/test-utils';
import { beforeEach, afterEach, describe, it, expect, vi } from 'vitest';
import MetadataPanel from '../src/MetadataPanel.vue';
import { normalizeMetadata, displayValue, type NormalizedMetadata } from '../src/metadata';

vi.mock('../src/metadata', async (original) => {
  const actual = await original<typeof import('../src/metadata')>();
  return { ...actual, displayValue: vi.fn(actual.displayValue) };
});
const wrappers: ReturnType<typeof mount>[] = [];
const writeText = vi.fn().mockResolvedValue(undefined);
function metadata(value = 1, count = 1): NormalizedMetadata {
  const prompt = Object.fromEntries(Array.from({ length: count }, (_, i) => [String(i + 1), {
    class_type: 'AFM', inputs: { strength: value, values: [1, 2, 3] },
  }]));
  return normalizeMetadata({ status: 'ok', prompt, workflow: null, warnings: [] });
}
function panel(right = metadata(), left?: NormalizedMetadata) {
  const wrapper = mount(MetadataPanel, { props: {
    right, left, compare: Boolean(left), manualMatches: {}, loading: false,
  }});
  wrappers.push(wrapper); return wrapper;
}
function detail(wrapper: ReturnType<typeof panel>, title: string) {
  return wrapper.findAll('details').find(d => d.get('summary').text().includes(title))!;
}
async function toggle(wrapper: DOMWrapper<Element>, open: boolean) {
  (wrapper.element as HTMLDetailsElement).open = open;
  await wrapper.trigger('toggle');
}
beforeEach(() => {
  vi.mocked(displayValue).mockClear(); writeText.mockClear();
  Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } });
});
afterEach(() => { for (const w of wrappers.splice(0)) w.unmount(); });

describe('metadata details are prepared only while expanded', () => {
  it('does not create or serialize any hidden node fields or original JSON', async () => {
    const w = panel(metadata(1, 100));
    expect(w.findAll('details')).toHaveLength(101);
    expect(w.findAll('pre')).toHaveLength(0);
    expect(w.findAll('.sg-field')).toHaveLength(0);
    expect(displayValue).not.toHaveBeenCalled();
    const first = w.findAll('details')[0];
    await toggle(first, true);
    expect(first.findAll('.sg-field')).toHaveLength(2);
    expect(first.findAll('pre').map(p => p.text())).toEqual(['1', '[\n  1,\n  2,\n  3\n]']);
    expect(displayValue).toHaveBeenCalledTimes(2);
    await toggle(first, false);
    expect(w.findAll('pre')).toHaveLength(0);
  });

  it('copies the opened field and renders changed props on expand and while expanded', async () => {
    const w = panel();
    await toggle(w.findAll('details')[0], true);
    await w.findAll('.sg-field button')[0].trigger('click');
    await flushPromises();
    expect(writeText).toHaveBeenLastCalledWith('1');
    await w.setProps({ right: metadata(2) });
    expect(w.findAll('.sg-field pre')[0].text()).toBe('2');
    await toggle(w.findAll('details')[0], false);
    await w.setProps({ right: metadata(3) });
    await toggle(w.findAll('details')[0], true);
    expect(w.findAll('.sg-field pre')[0].text()).toBe('3');
  });

  it('keeps raw JSON lazy and copies the exact saved numeric text', async () => {
    const raw = metadata();
    raw.rawText.prompt = '{"seed":18446744073709551615}';
    const w = panel(raw);
    const original = detail(w, 'Original saved JSON');
    expect(original.find('pre').exists()).toBe(false);
    await toggle(original, true);
    expect(original.find('pre').exists()).toBe(true);
    await original.get('button').trigger('click'); await flushPromises();
    expect(writeText).toHaveBeenLastCalledWith('{\n  "prompt": {"seed":18446744073709551615},\n  "workflow": null\n}');
  });

  it('builds mapping controls only on opening and keeps manual match behavior and nested values', async () => {
    const w = panel(metadata(1, 2), metadata(1, 2));
    const mapping = detail(w, 'Review / change node matching');
    expect(w.findAll('select')).toHaveLength(0);
    expect(w.findAll('pre')).toHaveLength(0);
    expect(displayValue).not.toHaveBeenCalled();
    await toggle(mapping, true);
    expect(mapping.findAll('select')).toHaveLength(2);
    expect(mapping.findAll('pre')).toHaveLength(0);
    expect(displayValue).not.toHaveBeenCalled();
    await mapping.findAll('select')[0].setValue('prompt:2');
    expect(w.emitted('match')?.at(-1)).toEqual(['prompt:1', 'prompt:2']);
    await w.setProps({ manualMatches: { 'prompt:1': 'prompt:2' } });
    const left = detail(w, 'Left saved values');
    await toggle(left, true);
    expect(left.get('pre').text()).toContain('strength');
    await toggle(mapping, false);
    expect(w.findAll('select')).toHaveLength(0);
    await toggle(mapping, true);
    expect(mapping.findAll('select')[0].element.value).toBe('prompt:2');
    expect(mapping.findAll('pre')).toHaveLength(0);
  });

  it('still renders and copies differences immediately', async () => {
    const w = panel(metadata(2), metadata(1));
    expect(w.get('.sg-difference h3').text()).toBe('strength');
    expect(w.findAll('.sg-difference pre').map(p => p.text())).toEqual(['1', '2']);
    await w.findAll('.sg-difference button')[1].trigger('click'); await flushPromises();
    expect(writeText).toHaveBeenLastCalledWith('2');
  });
});
