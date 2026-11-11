import { describe, expect, it } from 'vitest'
import {
  compareMetadata, displayValue, getLoras, getModelNames,
  normalizeMetadata, samePrompt,
} from './metadata'

const metadata = (prompt: unknown = null, workflow: unknown = null, status = 'ok') =>
  normalizeMetadata({ status, prompt, workflow, warnings: [] })
const node = (type: string, inputs: Record<string, unknown>, title?: string) =>
  ({ class_type: type, inputs, ...(title ? { _meta: { title } } : {}) })

describe('saved metadata normalization', () => {
  it('keeps named AFM inputs and unparsed strings without inventing block names', () => {
    const result = metadata({ '1': node('AFM', { blocks: [1, 0.5], config: '1,2,3' }) })
    expect(result.status).toBe('ok')
    expect(result.nodes[0].fields).toEqual(expect.arrayContaining([
      expect.objectContaining({ key: 'blocks', value: [1, 0.5], promptText: false }),
      expect.objectContaining({ key: 'config', value: '1,2,3', promptText: false }),
    ]))
  })

  it('labels workflow widget arrays by saved position and retains original values', () => {
    const result = metadata(null, { nodes: [{ id: 4, type: 'AFM', widgets_values: [1, '0.5,0.8'] }] })
    expect(result.nodes[0].fields).toEqual([
      expect.objectContaining({ key: 'widgets_values[0]', label: '保存値[0]（名称不明）', value: 1 }),
      expect.objectContaining({ key: 'widgets_values[1]', label: '保存値[1]（名称不明）', value: '0.5,0.8' }),
    ])
  })

  it('does not merge contradictory prompt and workflow saved values', () => {
    const result = metadata({ '4': node('AFM', { multiplier: 0.5 }) }, {
      nodes: [{ id: 4, type: 'AFM', widgets_values: { multiplier: 0.9 } }],
    })
    expect(result.nodes.map(n => n.key)).toEqual(['prompt:4', 'workflow:4'])
    expect(result.nodes.map(n => n.fields[0].value)).toEqual([0.5, 0.9])
    expect(result.warnings.length).toBeGreaterThan(0)
  })

  it.each([
    [null, null, 'absent', 'missing'],
    [null, null, 'invalid', 'invalid'],
    [null, null, 'unsupported', 'invalid'],
    [{ '1': { class_type: 'AFM' } }, null, 'ok', 'partial'],
    [{ '1': node('AFM', { scale: 1 }) }, null, 'partial', 'partial'],
    [[], null, 'ok', 'invalid'],
  ])('distinguishes absent, partial, and invalid metadata (%s, %s, %s)', (prompt, workflow, status, expected) => {
    expect(metadata(prompt, workflow, status as string).status).toBe(expected)
  })

  it('extracts stored model identifiers and distinct LoRA names and strengths', () => {
    const result = metadata({
      '1': node('CheckpointLoaderSimple', { ckpt_name: 'base.safetensors' }),
      '2': node('LoraLoader', { lora_name: 'detail.safetensors', strength_model: 0.6, strength_clip: 0.7 }),
      '3': node('LoraLoader', { lora_name: 'style.safetensors', strength_model: 0.8, strength_clip: 0.9 }),
    })
    expect(getModelNames(result)).toEqual(['base.safetensors'])
    expect(getLoras(result)).toEqual([
      { nodeKey: 'prompt:2', source: 'prompt', name: 'detail.safetensors', strengthModel: 0.6, strengthClip: 0.7 },
      { nodeKey: 'prompt:3', source: 'prompt', name: 'style.safetensors', strengthModel: 0.8, strengthClip: 0.9 },
    ])
  })

  it('retains malicious-looking text as inert strings rather than HTML transformation', () => {
    const text = '<img src=x onerror=alert(1)>'
    const result = metadata({ '1': node('AFM', { setting: text }, text) })
    expect(displayValue(result.nodes[0].fields[0].value)).toBe(text)
    expect(result.nodes[0].title).toBe(text)
    expect(displayValue({ value: text })).toContain(text)
  })

  it('does not treat object prototype names as known prompt node adapters', () => {
    for (const type of ['__proto__', 'constructor', 'toString']) {
      const result = metadata({ '1': node(type, { text: 'preserve me' }) })
      expect(result.nodes[0].fields[0].promptText).toBe(false)
      expect(samePrompt(result, result)).toBeNull()
    }
  })

  it('keeps valid nodes available while rejecting malformed and duplicate workflow nodes', () => {
    const result = metadata(null, { nodes: [
      { id: 1, type: 'AFM', widgets_values: [0.4] },
      { id: 1, type: 'AFM', widgets_values: [0.8] },
      { id: 2, type: 42, widgets_values: [] },
    ] })
    expect(result.status).toBe('partial')
    expect(result.nodes).toHaveLength(1)
    expect(result.nodes[0].fields[0].value).toBe(0.4)
  })

  it('never calls rounded unsafe numeric inputs an exact metadata match', () => {
    const result = metadata({ '1': node('KSampler', { large_count: 9007199254740992 }) })
    expect(result.status).toBe('partial')
    expect(compareMetadata(result, result).status).toBe('incomplete')
    expect(result.warnings.some(warning => warning.includes('精度'))).toBe(true)
  })

  it('preserves exact tagged integers and does not equate them with strings or adjacent integers', () => {
    const left = metadata({ '1': node('KSampler', { large_count: { __shiba_number__: '9007199254740992' } }) })
    const right = metadata({ '1': node('KSampler', { large_count: { __shiba_number__: '9007199254740993' } }) })
    const result = compareMetadata(left, right)
    expect(result.status).toBe('different')
    expect(result.differences).toHaveLength(1)
    expect(result.differences[0].path).toBe('large_count')
    expect(displayValue(result.differences[0].left)).toBe('9007199254740992')
    expect(displayValue(result.differences[0].right)).toBe('9007199254740993')
    expect(displayValue({ nested: [{ __shiba_number__: '18446744073709551615' }] })).toBe('{\n  "nested": [\n    18446744073709551615\n  ]\n}')
    expect(compareMetadata(right, metadata({ '1': node('KSampler', { large_count: '9007199254740993' }) })).status).toBe('different')
  })

  it('retains original source JSON for lossless copying rather than reconstructing rounded values', () => {
    const raw = '{"1":{"class_type":"KSampler","inputs":{"large_count":18446744073709551615}}}'
    const result = normalizeMetadata({ status: 'ok', warnings: [], prompt: { '1': node('KSampler', { large_count: { __shiba_number__: '18446744073709551615' } }) }, workflow: null, raw_prompt: raw, raw_workflow: null })
    expect(result.rawText.prompt).toBe(raw)
    expect(result.rawText.workflow).toBeNull()
  })

  it('omits identified seed fields from normal settings and diffs but keeps original data', () => {
    const prompt = { '1': node('KSampler', { seed: { __shiba_number__: '18446744073709551615' }, noise_seed: 1, random_seed: 2, steps: 20 }) }
    const workflow = { nodes: [{ id: 1, type: 'KSampler', widgets_values: { seed: 42, steps: 20 } }] }
    const left = metadata(prompt, workflow)
    const right = metadata({ '1': node('KSampler', { seed: 3, noise_seed: 4, random_seed: 5, steps: 20 }) }, { nodes: [{ id: 1, type: 'KSampler', widgets_values: { seed: 43, steps: 20 } }] })
    expect(left.nodes.flatMap(node => node.fields.map(field => field.key))).toEqual(['steps', 'widgets_values.steps'])
    expect(compareMetadata(left, right).differences).toEqual([])
    expect(compareMetadata(left, right).status).toBe('same')
    expect(left.raw.prompt).toEqual(prompt)
    expect(left.raw.workflow).toEqual(workflow)
  })

  it('never guesses that an unknown widget index is a seed', () => {
    const left = metadata(null, { nodes: [{ id: 1, type: 'CustomSampler', widgets_values: [123, 'randomize'] }] })
    const right = metadata(null, { nodes: [{ id: 1, type: 'CustomSampler', widgets_values: [456, 'randomize'] }] })
    expect(left.nodes[0].fields[0].value).toBe(123)
    expect(compareMetadata(left, right).differences[0].path).toBe('widgets_values[0]')
  })

  it.each([null, true, {}, '', 1.2, Number.POSITIVE_INFINITY])('does not fabricate an identity for invalid workflow ID %s', id => {
    const value = metadata(null, { nodes: [{ id, type: 'AFM', widgets_values: [1] }] })
    expect(value.status).toBe('invalid')
    expect(value.nodes).toEqual([])
    expect(compareMetadata(value, value).status).toBe('incomplete')
  })

  it('bounds oversized node lists while preserving raw data and marking the comparison incomplete', () => {
    const prompt = Object.fromEntries(Array.from({ length: 3000 }, (_, index) => [String(index), node('AFM', { value: index })]))
    const value = metadata(prompt)
    expect(value.nodes.length).toBeLessThan(3000)
    expect(value.status).toBe('partial')
    expect(value.raw.prompt).toEqual(prompt)
    expect(compareMetadata(value, value).status).toBe('incomplete')
  })
})

describe('saved setting comparison', () => {
  it('reports only the exact changed nested input and keeps numeric types and precision', () => {
    const left = metadata({ '1': node('AFM', { blocks: { middle: [1, 0.5] }, unchanged: 3 }) })
    const right = metadata({ '1': node('AFM', { blocks: { middle: [1, 0.5000000001] }, unchanged: 3 }) })
    const result = compareMetadata(left, right)
    expect(result.status).toBe('different')
    expect(result.differences).toHaveLength(1)
    expect(result.differences[0]).toMatchObject({ path: 'blocks.middle[1]', left: 0.5, right: 0.5000000001, source: 'prompt', kind: 'changed' })
    expect(compareMetadata(metadata({ '1': node('AFM', { scale: 1 }) }), metadata({ '1': node('AFM', { scale: '1' }) })).differences).toHaveLength(1)
  })

  it('excludes identified prompt text, not model names or arbitrary custom strings', () => {
    const left = metadata({ '1': node('CLIPTextEncode', { text: 'cat' }), '2': node('AFM', { prompt: 'configuration A', config: 'x' }), '3': node('CheckpointLoaderSimple', { ckpt_name: 'a' }) })
    const right = metadata({ '1': node('CLIPTextEncode', { text: 'dog' }), '2': node('AFM', { prompt: 'configuration B', config: 'y' }), '3': node('CheckpointLoaderSimple', { ckpt_name: 'b' }) })
    const result = compareMetadata(left, right)
    expect(result.differences.map(d => d.path)).toEqual(['prompt', 'config', 'ckpt_name'])
    expect(result.excludedPromptFields).toBe(1)
  })

  it('keeps LoRA name and strength changes distinct for multiple loaders', () => {
    const left = metadata({ '1': node('LoraLoader', { lora_name: 'a', strength_model: 0.5 }), '2': node('LoraLoader', { lora_name: 'b', strength_model: 1 }) })
    const right = metadata({ '1': node('LoraLoader', { lora_name: 'c', strength_model: 0.8 }), '2': node('LoraLoader', { lora_name: 'b', strength_model: 0.9 }) })
    const result = compareMetadata(left, right)
    expect(result.matches.map(m => [m.leftKey, m.rightKey])).toEqual([['prompt:1', 'prompt:1'], ['prompt:2', 'prompt:2']])
    expect(result.differences.map(d => [d.leftNode?.id, d.path])).toEqual([['1', 'lora_name'], ['1', 'strength_model'], ['2', 'strength_model']])
  })

  it('leaves multiple same-type candidates unresolved when graph identities do not align', () => {
    const left = metadata({ '1': node('AFM', { strength: 1 }), '2': node('AFM', { strength: 2 }) })
    const right = metadata({ '10': node('AFM', { strength: 3 }), '20': node('AFM', { strength: 4 }) })
    const result = compareMetadata(left, right)
    expect(result.status).toBe('incomplete')
    expect(result.matches).toHaveLength(0)
    expect(result.differences).toHaveLength(0)
    expect(result.unmatchedLeft[0].candidateKeys).toEqual(['prompt:10', 'prompt:20'])
  })

  it('does not use an overlapping ID alone to claim a match between incompatible graphs', () => {
    const left = metadata({ '1': node('AFM', { strength: 1 }), '2': node('AFM', { strength: 2 }) })
    const right = metadata({ '1': node('AFM', { strength: 3 }), '20': node('AFM', { strength: 4 }) })
    expect(compareMetadata(left, right).matches).toHaveLength(0)
  })

  it('honors manual matching and rejects many-to-one assignments', () => {
    const left = metadata({ '1': node('AFM', { scale: 1 }), '2': node('AFM', { scale: 2 }) })
    const right = metadata({ '10': node('AFM', { scale: 3 }), '20': node('AFM', { scale: 4 }) })
    const result = compareMetadata(left, right, { manualMatches: { 'prompt:1': 'prompt:20', 'prompt:2': 'prompt:10' } })
    expect(result.matches.map(m => [m.leftKey, m.rightKey, m.reason])).toEqual([['prompt:1', 'prompt:20', 'manual'], ['prompt:2', 'prompt:10', 'manual']])
    expect(result.differences.map(d => [d.left, d.right])).toEqual([[1, 4], [2, 3]])
    const invalid = compareMetadata(left, right, { manualMatches: { 'prompt:1': 'prompt:10', 'prompt:2': 'prompt:10' } })
    expect(new Set(invalid.matches.map(m => m.rightKey)).size).toBe(invalid.matches.length)
    expect(invalid.warnings.length).toBeGreaterThan(0)
    expect(invalid.status).toBe('incomplete')
  })

  it('distinguishes right additions from right deletions without guessing ambiguous nodes', () => {
    const result = compareMetadata(
      metadata({ '1': node('AFM', { scale: 1 }), '2': node('OldNode', { value: 1 }) }),
      metadata({ '1': node('AFM', { scale: 1 }), '3': node('NewNode', { value: 2 }) }),
    )
    expect(result.differences.map(d => [d.kind, d.leftNode?.id, d.rightNode?.id])).toEqual([['removed', '2', undefined], ['added', undefined, '3']])
  })

  it('never reports missing, partial, or invalid information as identical or node deletion', () => {
    const complete = metadata({ '1': node('AFM', { scale: 1 }) })
    for (const absent of [metadata(null, null, 'absent'), metadata(null, null, 'invalid'), metadata({ '1': { class_type: 'AFM' } })]) {
      const result = compareMetadata(complete, absent)
      expect(result.status).toBe('incomplete')
      expect(result.differences.filter(d => d.kind === 'removed')).toHaveLength(0)
    }
    expect(compareMetadata(metadata(null, null, 'absent'), metadata(null, null, 'absent')).status).toBe('incomplete')
  })

  it('compares each source independently and warns when source coverage differs', () => {
    const both = metadata({ '1': node('AFM', { scale: 1 }) }, { nodes: [{ id: 1, type: 'AFM', widgets_values: [1] }] })
    const promptOnly = metadata({ '1': node('AFM', { scale: 1 }) })
    const result = compareMetadata(both, promptOnly)
    expect(result.status).toBe('incomplete')
    expect(result.differences).toEqual([])
  })

  it('reports reference changes as connections and ignores layout/title-only changes', () => {
    const left = metadata({ '1': node('AFM', {}), '2': node('AFM', {}), '3': node('Consumer', { model: ['1', 0] }) }, { nodes: [{ id: 3, type: 'Consumer', title: 'Before', pos: [1, 2], color: 'red', widgets_values: [1] }] })
    const right = metadata({ '1': node('AFM', {}), '2': node('AFM', {}), '3': node('Consumer', { model: ['2', 0] }) }, { nodes: [{ id: 3, type: 'Consumer', title: 'After', pos: [8, 9], color: 'blue', widgets_values: [1] }] })
    const result = compareMetadata(left, right)
    expect(result.differences).toHaveLength(1)
    expect(result.differences[0]).toMatchObject({ kind: 'connection', path: 'model', left: ['1', 0], right: ['2', 0] })
  })

  it('reports saved workflow connections and execution modes without comparing layout', () => {
    const left = metadata(null, { nodes: [{ id: 2, type: 'Consumer', inputs: [{ name: 'model', link: 9 }], widgets_values: [], mode: 0 }], links: [[9, 1, 0, 2, 0, 'MODEL']] })
    const right = metadata(null, { nodes: [{ id: 2, type: 'Consumer', inputs: [{ name: 'model', link: 10 }], widgets_values: [], mode: 4 }], links: [[10, 3, 1, 2, 0, 'MODEL']] })
    expect(compareMetadata(left, right).differences).toEqual([
      expect.objectContaining({ kind: 'connection', path: 'inputs.model', left: ['1', 0], right: ['3', 1] }),
      expect.objectContaining({ kind: 'changed', path: 'mode', left: 0, right: 4 }),
    ])
  })

  it('treats a missing input as incomplete, including when the other value is null', () => {
    const result = compareMetadata(metadata({ '1': node('AFM', { optional: null }) }), metadata({ '1': node('AFM', {}) }))
    expect(result.status).toBe('incomplete')
    expect(result.warnings.some(warning => warning.includes('optional'))).toBe(true)
  })

  it('honors explicit unmatching and detects stale manual selections', () => {
    const value = metadata({ '1': node('AFM', { scale: 1 }) })
    const result = compareMetadata(value, value, { manualMatches: { 'prompt:1': null } })
    expect(result.matches).toEqual([])
    expect(result.status).toBe('incomplete')
    const stale = compareMetadata(value, value, { manualMatches: { 'prompt:99': 'prompt:1' } })
    expect(stale.status).toBe('incomplete')
    expect(stale.warnings.length).toBeGreaterThan(0)
  })

  it('does not infer node deletion when the backend reports partial metadata', () => {
    const left = metadata({ '1': node('AFM', { scale: 1 }), '2': node('Other', {}) })
    const right = metadata({ '1': node('AFM', { scale: 1 }) }, null, 'partial')
    const result = compareMetadata(left, right)
    expect(result.status).toBe('incomplete')
    expect(result.differences).toEqual([])
    expect(result.unmatchedLeft.map(item => item.node.id)).toEqual(['2'])
  })

  it('bounds very large difference lists and reports that the result is incomplete', () => {
    const left = metadata({ '1': node('AFM', { values: Array(3000).fill(1) }) })
    const right = metadata({ '1': node('AFM', { values: Array(3000).fill(2) }) })
    const result = compareMetadata(left, right)
    expect(result.differences.length).toBeGreaterThan(0)
    expect(result.differences.length).toBeLessThan(3000)
    expect(result.status).toBe('incomplete')
    expect(result.warnings.some(warning => warning.includes('上限'))).toBe(true)
  })
})

describe('stored prompt text helper', () => {
  it('finds exact saved text matches across different settings and excludes unknown prompts', () => {
    const left = metadata({ '1': node('CLIPTextEncode', { text: 'a cat' }), '2': node('AFM', { scale: 1 }) })
    const right = metadata({ '1': node('CLIPTextEncode', { text: 'a cat' }), '2': node('AFM', { scale: 2 }) })
    expect(samePrompt(left, right)).toBe(true)
    expect(samePrompt(left, metadata({ '1': node('CLIPTextEncode', { text: 'a dog' }) }))).toBe(false)
    expect(samePrompt(left, metadata(null, null, 'absent'))).toBeNull()
    expect(samePrompt(metadata({ '1': node('CustomText', { text: 'a cat' }) }), metadata({ '1': node('CustomText', { text: 'a cat' }) }))).toBeNull()
    expect(samePrompt(metadata(null, { nodes: [{ id: 1, type: 'CLIPTextEncode', widgets_values: ['a cat'] }] }), right)).toBeNull()
  })

  it('does not match swapped positive/negative text or incomplete saved text', () => {
    const left = metadata({ '1': node('CLIPTextEncode', { text: 'cat' }), '2': node('CLIPTextEncode', { text: 'dog' }) })
    const right = metadata({ '1': node('CLIPTextEncode', { text: 'dog' }), '2': node('CLIPTextEncode', { text: 'cat' }) })
    expect(samePrompt(left, right)).toBe(false)
    expect(samePrompt(left, metadata({ '1': node('CLIPTextEncode', { text: 'cat' }) }))).toBeNull()
    expect(samePrompt(left, metadata({ '1': node('CLIPTextEncode', { text: ['20', 0] }), '20': node('DynamicPrompt', {}) }))).toBeNull()
  })

  it('does not claim a prompt match when sources disagree about known saved text', () => {
    const left = metadata({ '1': node('CLIPTextEncode', { text: 'cat' }) }, { nodes: [{ id: 1, type: 'CLIPTextEncode', widgets_values: { text: 'dog' } }] })
    expect(samePrompt(left, metadata({ '1': node('CLIPTextEncode', { text: 'cat' }) }))).toBeNull()
  })

  it('keeps unknown custom prompt-like fields out of confirmed same-prompt results', () => {
    const value = metadata({ '1': node('CLIPTextEncode', { text: 'cat' }), '2': node('DynamicText', { text: 'choose a word' }) })
    expect(samePrompt(value, value)).toBeNull()
  })

  it('does not claim a match when saved positive and negative conditioning references swap', () => {
    const left = metadata({ '1': node('CLIPTextEncode', { text: 'cat' }), '2': node('CLIPTextEncode', { text: 'dog' }), '3': node('KSampler', { positive: ['1', 0], negative: ['2', 0] }) })
    const right = metadata({ '1': node('CLIPTextEncode', { text: 'cat' }), '2': node('CLIPTextEncode', { text: 'dog' }), '3': node('KSampler', { positive: ['2', 0], negative: ['1', 0] }) })
    expect(samePrompt(left, right)).not.toBe(true)
  })
})
