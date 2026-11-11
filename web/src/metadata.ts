/** Saved image values only. No current node definitions or defaults are consulted. */
export type MetadataSource = 'prompt' | 'workflow'
export type SourceState = 'ok' | 'partial' | 'missing' | 'invalid'
export interface MetadataResponse {
  status: string
  prompt: unknown
  workflow: unknown
  warnings: string[]
  raw_prompt?: string | null
  raw_workflow?: string | null
}
export interface StoredField {
  key: string
  label: string
  value: unknown
  kind: 'value' | 'reference' | 'model' | 'lora-name' | 'lora-strength' | 'prompt'
  promptText: boolean
}
export interface NormalizedNode {
  key: string
  id: string
  type: string
  title: string
  source: MetadataSource
  fields: StoredField[]
  complete: boolean
}
export interface NormalizedMetadata {
  status: SourceState
  nodes: NormalizedNode[]
  warnings: string[]
  raw: { prompt: unknown; workflow: unknown }
  rawText: { prompt: string | null; workflow: string | null }
  sources: Record<MetadataSource, SourceState>
}
export interface NodeMatch {
  leftKey: string
  rightKey: string
  reason: 'id-type' | 'type-title' | 'type' | 'manual'
}
export interface UnmatchedNode { node: NormalizedNode; candidateKeys: string[] }
export interface MetadataDifference {
  id: string
  kind: 'changed' | 'connection' | 'added' | 'removed'
  source: MetadataSource
  leftNode?: NormalizedNode
  rightNode?: NormalizedNode
  path: string
  label: string
  left?: unknown
  right?: unknown
}
export interface MetadataComparison {
  status: 'same' | 'different' | 'incomplete'
  differences: MetadataDifference[]
  matches: NodeMatch[]
  unmatchedLeft: UnmatchedNode[]
  unmatchedRight: UnmatchedNode[]
  warnings: string[]
  excludedPromptFields: number
}
export interface SavedLora {
  nodeKey: string
  source: MetadataSource
  name: string
  strengthModel?: unknown
  strengthClip?: unknown
  strength?: unknown
}

const SOURCES: MetadataSource[] = ['prompt', 'workflow']
const MAX_NODES_PER_SOURCE = 500
const MAX_FIELDS_PER_SOURCE = 5000
const MAX_DIFFERENCES = 1000
const HIDDEN_SEED_FIELDS = new Set(['seed', 'noise_seed', 'random_seed'])
const MODEL_FIELDS = new Set(['ckpt_name', 'checkpoint_name', 'model_name', 'unet_name', 'diffusion_model_name'])
// Deliberately small, documented adapters for named inputs. Unknown widgets and
// unknown/custom text nodes are never assigned semantic names or hidden.
const PROMPT_FIELDS: Record<string, readonly string[]> = {
  CLIPTextEncode: ['text'],
  CLIPTextEncodeSDXL: ['text_g', 'text_l'],
  CLIPTextEncodeSDXLRefiner: ['text'],
}

function record(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}
function owns(value: object, key: string): boolean { return Object.prototype.hasOwnProperty.call(value, key) }
function promptFields(type: string): readonly string[] | undefined { return owns(PROMPT_FIELDS, type) ? PROMPT_FIELDS[type] : undefined }
function validNodeId(value: unknown): boolean { return typeof value === 'string' ? value.trim().length > 0 : typeof value === 'number' && Number.isSafeInteger(value) }
function exactInteger(value: unknown): string | undefined {
  if (!record(value) || Object.keys(value).length !== 1 || typeof value.__shiba_number__ !== 'string' || !/^-?(?:0|[1-9]\d*)$/.test(value.__shiba_number__)) return undefined
  const decimal = value.__shiba_number__
  const integer = BigInt(decimal)
  return integer > BigInt(Number.MAX_SAFE_INTEGER) || integer < BigInt(Number.MIN_SAFE_INTEGER) ? decimal : undefined
}
function unsafeNumber(value: unknown): boolean {
  const pending = [value]
  while (pending.length) {
    const current = pending.pop()
    if (typeof current === 'number' && (!Number.isFinite(current) || (Number.isInteger(current) && !Number.isSafeInteger(current)))) return true
    if (Array.isArray(current)) for (const item of current) pending.push(item)
    else if (record(current)) for (const item of Object.values(current)) pending.push(item)
  }
  return false
}
function namedField(type: string, name: string, value: unknown, reference = false): StoredField {
  const promptText = promptFields(type)?.includes(name) === true && typeof value === 'string'
  const kind: StoredField['kind'] = reference ? 'reference' : promptText ? 'prompt'
    : MODEL_FIELDS.has(name) && typeof value === 'string' ? 'model'
      : name === 'lora_name' && typeof value === 'string' ? 'lora-name'
        : /lora/i.test(type) && ['strength_model', 'strength_clip', 'strength', 'lora_strength'].includes(name)
          ? 'lora-strength' : 'value'
  return { key: name, label: name, value, kind, promptText }
}
function equal(left: unknown, right: unknown): boolean {
  if (Object.is(left, right)) return true
  if (Array.isArray(left) && Array.isArray(right)) {
    return left.length === right.length && left.every((value, index) => equal(value, right[index]))
  }
  if (record(left) && record(right)) {
    const keys = Object.keys(left)
    return keys.length === Object.keys(right).length && keys.every(key => owns(right, key) && equal(left[key], right[key]))
  }
  return false
}

function normalizeSource(source: MetadataSource, raw: unknown, warnings: string[]): { state: SourceState; nodes: NormalizedNode[] } {
  if (raw == null) return { state: 'missing', nodes: [] }
  if (!record(raw) || (source === 'workflow' && !Array.isArray(raw.nodes))) {
    warnings.push(`${source}: 保存形式を解析できません。`)
    return { state: 'invalid', nodes: [] }
  }
  const entries: [string, unknown][] = source === 'prompt' ? Object.entries(raw)
    : (raw.nodes as unknown[]).map((value, index) => [record(value) && (typeof value.id === 'string' || typeof value.id === 'number') ? String(value.id) : `不明[${index}]`, value])
  const nodes: NormalizedNode[] = []
  let partial = entries.length > MAX_NODES_PER_SOURCE
  if (partial) warnings.push(`${source}: ノード数が表示上限を超えています。一部のみ比較します。元 JSON は保持しています。`)
  let fieldCount = 0
  const ids = new Set<string>()
  for (const [id, data] of entries.slice(0, MAX_NODES_PER_SOURCE)) {
    const type = record(data) ? data[source === 'prompt' ? 'class_type' : 'type'] : undefined
    if (!record(data) || typeof type !== 'string' || !type || ids.has(id) || (source === 'workflow' && !validNodeId(data.id))) {
      warnings.push(`${source}: ノード ${id} の形式が不正、または ID が重複しています。`)
      partial = true
      continue
    }
    ids.add(id)
    const title = source === 'prompt' && record(data._meta) && typeof data._meta.title === 'string'
      ? data._meta.title : typeof data.title === 'string' ? data.title : ''
    const fields: StoredField[] = []
    let complete = true
    if (source === 'prompt') {
      if (!record(data.inputs)) complete = false
      else {
        for (const [name, value] of Object.entries(data.inputs)) {
          const reference = Array.isArray(value) && value.length === 2 && typeof value[0] === 'string'
            && Number.isInteger(value[1]) && (value[1] as number) >= 0 && owns(raw, value[0])
          fields.push(namedField(type, name, value, reference))
        }
      }
    } else {
      if (Array.isArray(data.widgets_values)) {
        data.widgets_values.forEach((value, index) => fields.push({ key: `widgets_values[${index}]`, label: `保存値[${index}]（名称不明）`, value, kind: 'value', promptText: false }))
      } else if (record(data.widgets_values)) {
        for (const [name, value] of Object.entries(data.widgets_values)) {
          const field = namedField(type, name, value)
          fields.push({ ...field, key: `widgets_values.${name}` })
        }
      } else if (data.widgets_values != null) complete = false

      if (record(data.inputs)) {
        for (const [name, value] of Object.entries(data.inputs)) fields.push(namedField(type, name, value))
      } else if (Array.isArray(data.inputs)) {
        for (const [index, input] of data.inputs.entries()) {
          if (!record(input)) { complete = false; continue }
          const name = typeof input.name === 'string' ? input.name : `入力[${index}]（名称不明）`
          if (owns(input, 'value')) fields.push(namedField(type, name, input.value))
          if (input.link != null) {
            const link = Array.isArray(raw.links) ? raw.links.find(item => Array.isArray(item) ? item[0] === input.link : record(item) && item.id === input.link) : undefined
            const value = Array.isArray(link) ? [String(link[1]), link[2]]
              : record(link) && owns(link, 'origin_id') ? [String(link.origin_id), link.origin_slot]
                : { link_id: input.link }
            if (!link) complete = false
            fields.push({ key: `inputs.${name}`, label: name, value, kind: 'reference', promptText: false })
          }
        }
      } else if (data.inputs != null) complete = false
      if (owns(data, 'mode')) fields.push({ key: 'mode', label: '保存された実行モード', value: data.mode, kind: 'value', promptText: false })
      if (!owns(data, 'widgets_values') && !owns(data, 'inputs')) complete = false
    }
    const visibleFields = fields.filter(field => !HIDDEN_SEED_FIELDS.has(field.key.replace(/^(?:widgets_values|inputs)\./, '')))
    const savedFields = visibleFields.slice(0, Math.max(0, MAX_FIELDS_PER_SOURCE - fieldCount))
    fieldCount += savedFields.length
    if (savedFields.length < visibleFields.length) {
      complete = false
      warnings.push(`${source}: 保存項目数が表示上限を超えています。元 JSON は保持しています。`)
    }
    if (savedFields.some(field => unsafeNumber(field.value))) {
      complete = false
      warnings.push(`${source}: ノード ${id} の数値がブラウザーの正確な整数精度を超えています。値の一致や正確なコピーを保証できません。`)
    }
    if (!complete) { partial = true; warnings.push(`${source}: ノード ${id} (${type}) の一部情報を正確に確認できません。`) }
    nodes.push({ key: `${source}:${id}`, id, type, title, source, fields: savedFields, complete })
  }
  if (nodes.length === 0) {
    warnings.push(`${source}: 比較できる保存ノードがありません。`)
    return { state: entries.length ? 'invalid' : 'partial', nodes }
  }
  return { state: partial ? 'partial' : 'ok', nodes }
}

export function normalizeMetadata(response: MetadataResponse): NormalizedMetadata {
  const warnings = Array.isArray(response.warnings) ? response.warnings.filter((value): value is string => typeof value === 'string') : []
  const prompt = normalizeSource('prompt', response.prompt, warnings)
  const workflow = normalizeSource('workflow', response.workflow, warnings)
  const nodes = [...prompt.nodes, ...workflow.nodes]
  for (const p of prompt.nodes) {
    const w = workflow.nodes.find(node => node.id === p.id && node.type === p.type)
    if (!w) continue
    for (const field of p.fields) {
      const other = w.fields.find(candidate => candidate.key === field.key || candidate.key === `widgets_values.${field.key}`)
      if (other && !equal(field.value, other.value)) warnings.push(`ノード ${p.id} / ${field.label}: prompt と workflow の保存値が異なります。情報源を分けて表示します。`)
    }
  }
  const states = [prompt.state, workflow.state]
  let status: SourceState = states.every(state => state === 'missing') ? 'missing'
    : nodes.length === 0 && states.includes('invalid') ? 'invalid'
      : states.includes('invalid') || states.includes('partial') ? 'partial' : 'ok'
  if (['invalid', 'unsupported'].includes(response.status)) status = nodes.length ? 'partial' : 'invalid'
  else if (response.status === 'partial') status = 'partial'
  if (status === 'missing') warnings.push('設定情報なし。保存された生成条件の一致は確認できません。')
  if (status === 'invalid') warnings.push('保存データを解析できません。画像の比較は継続できます。')
  return { status, nodes, warnings: [...new Set(warnings)], raw: { prompt: response.prompt, workflow: response.workflow }, rawText: { prompt: typeof response.raw_prompt === 'string' ? response.raw_prompt : null, workflow: typeof response.raw_workflow === 'string' ? response.raw_workflow : null }, sources: { prompt: prompt.state, workflow: workflow.state } }
}

export function getModelNames(metadata: NormalizedMetadata): string[] {
  return [...new Set(metadata.nodes.flatMap(node => node.fields.filter(field => field.kind === 'model' && typeof field.value === 'string').map(field => field.value as string)))]
}

export function getLoras(metadata: NormalizedMetadata): SavedLora[] {
  return metadata.nodes.flatMap(node => {
    const name = node.fields.find(field => field.kind === 'lora-name')
    if (!name || typeof name.value !== 'string') return []
    const result: SavedLora = { nodeKey: node.key, source: node.source, name: name.value }
    for (const [fieldName, property] of [['strength_model', 'strengthModel'], ['strength_clip', 'strengthClip'], ['strength', 'strength'], ['lora_strength', 'strength']] as const) {
      const field = node.fields.find(candidate => candidate.key === fieldName || candidate.key === `widgets_values.${fieldName}`)
      if (field) result[property] = field.value
    }
    return [result]
  })
}

function nodePairs(left: NormalizedNode[], right: NormalizedNode[], manual: Record<string, string | null>, warnings: string[]): { matches: NodeMatch[]; blocked: Set<string> } {
  const matches: NodeMatch[] = []
  const usedLeft = new Set<string>()
  const usedRight = new Set<string>()
  const blocked = new Set<string>()
  const rightByKey = new Map(right.map(node => [node.key, node]))
  const requestedTargets = Object.values(manual).filter(value => value !== null)
  for (const key of Object.keys(manual)) {
    if (!left.some(node => node.key === key)) {
      blocked.add(key)
      warnings.push(`${key}: 手動対応の左ノードが現在の画像にありません。対応を選び直してください。`)
    }
  }
  for (const node of left) {
    if (!owns(manual, node.key)) continue
    const target = manual[node.key]
    if (target === null) { blocked.add(node.key); continue }
    const partner = rightByKey.get(target!)
    if (!partner || partner.source !== node.source || requestedTargets.filter(key => key === target).length > 1) {
      blocked.add(node.key)
      warnings.push(`${node.key}: 手動対応が不正、または右ノードが重複しています。対応を選び直してください。`)
      continue
    }
    matches.push({ leftKey: node.key, rightKey: partner.key, reason: 'manual' })
    usedLeft.add(node.key); usedRight.add(partner.key)
  }
  function pair(a: NormalizedNode, b: NormalizedNode, reason: NodeMatch['reason']) {
    matches.push({ leftKey: a.key, rightKey: b.key, reason })
    usedLeft.add(a.key); usedRight.add(b.key)
  }
  for (const source of SOURCES) {
    const ls = left.filter(node => node.source === source)
    const rs = right.filter(node => node.source === source)
    // A shared ID is evidence only with a consistent saved graph identity set.
    // It is still a rule-based candidate, not proof of common model/code versions.
    const sameIdentitySet = ls.length === rs.length && ls.every(a => rs.some(b => b.id === a.id && b.type === a.type))
    if (sameIdentitySet) {
      for (const a of ls) {
        const b = rs.find(node => node.id === a.id && node.type === a.type)
        if (b && !usedLeft.has(a.key) && !blocked.has(a.key) && !usedRight.has(b.key)) pair(a, b, 'id-type')
      }
    }
    for (const a of ls) {
      if (usedLeft.has(a.key) || blocked.has(a.key)) continue
      const candidates = rs.filter(b => b.type === a.type && !usedRight.has(b.key))
      const sameTypeLeft = ls.filter(node => node.type === a.type && !usedLeft.has(node.key))
      if (candidates.length === 1 && sameTypeLeft.length === 1) pair(a, candidates[0]!, 'type')
      else if (a.title) {
        const titled = candidates.filter(b => b.title === a.title)
        if (titled.length === 1 && sameTypeLeft.filter(node => node.title === a.title).length === 1) pair(a, titled[0]!, 'type-title')
      }
    }
  }
  return { matches, blocked }
}

export function compareMetadata(left: NormalizedMetadata, right: NormalizedMetadata, options: { manualMatches?: Record<string, string | null> } = {}): MetadataComparison {
  const warnings = [...left.warnings.map(warning => `左: ${warning}`), ...right.warnings.map(warning => `右: ${warning}`)]
  const differences: MetadataDifference[] = []
  const manual = options.manualMatches ?? {}
  let incomplete = left.status !== 'ok' || right.status !== 'ok'
  let excludedPromptFields = 0
  let differenceLimitReached = false
  for (const source of SOURCES) {
    if (left.sources[source] !== right.sources[source]) {
      incomplete = true
      warnings.push(`${source}: 左右で保存情報の範囲が異なります。欠落を追加・削除と断定しません。`)
    }
  }
  const { matches, blocked } = nodePairs(left.nodes, right.nodes, manual, warnings)
  if (blocked.size) incomplete = true
  if (matches.some(match => match.reason === 'id-type')) warnings.push('ID・型による自動対応は保存グラフに基づく候補です。別 workflow の同一性や、モデルファイル・コード版の一致を保証しません。')
  const leftByKey = new Map(left.nodes.map(node => [node.key, node]))
  const rightByKey = new Map(right.nodes.map(node => [node.key, node]))
  const matchedLeft = new Set(matches.map(match => match.leftKey))
  const matchedRight = new Set(matches.map(match => match.rightKey))
  function difference(a: NormalizedNode | undefined, b: NormalizedNode | undefined, path: string, label: string, l: unknown, r: unknown, kind: MetadataDifference['kind']) {
    if (differences.length >= MAX_DIFFERENCES) {
      incomplete = true
      if (!differenceLimitReached) warnings.push('差分数が表示上限を超えています。一部のみ表示します。元 JSON から全保存値を確認できます。')
      differenceLimitReached = true
      return
    }
    differences.push({ id: `${a?.key ?? ''}|${b?.key ?? ''}|${path}|${kind}`, kind, source: (a ?? b)!.source, ...(a ? { leftNode: a } : {}), ...(b ? { rightNode: b } : {}), path, label, ...(a ? { left: l } : {}), ...(b ? { right: r } : {}) })
  }
  function compareValue(a: NormalizedNode, b: NormalizedNode, path: string, label: string, l: unknown, r: unknown, kind: 'changed' | 'connection', depth = 0) {
    if (equal(l, r)) return
    if (exactInteger(l) !== undefined || exactInteger(r) !== undefined) difference(a, b, path, label, l, r, kind)
    else if (kind !== 'connection' && depth < 64 && Array.isArray(l) && Array.isArray(r)) {
      for (let index = 0; index < Math.max(l.length, r.length); index++) compareValue(a, b, `${path}[${index}]`, `${label}[${index}]`, l[index], r[index], kind, depth + 1)
    } else if (kind !== 'connection' && depth < 64 && record(l) && record(r)) {
      for (const key of new Set([...Object.keys(l), ...Object.keys(r)])) compareValue(a, b, `${path}.${key}`, `${label}.${key}`, l[key], r[key], kind, depth + 1)
    } else difference(a, b, path, label, l, r, kind)
  }
  for (const match of matches) {
    const a = leftByKey.get(match.leftKey)!
    const b = rightByKey.get(match.rightKey)!
    if (a.type !== b.type) difference(a, b, 'class_type', 'ノード型', a.type, b.type, 'changed')
    const af = new Map(a.fields.map(field => [field.key, field]))
    const bf = new Map(b.fields.map(field => [field.key, field]))
    for (const key of new Set([...af.keys(), ...bf.keys()])) {
      const l = af.get(key), r = bf.get(key)
      if (l?.promptText && r?.promptText) { excludedPromptFields++; continue }
      if (!l || !r) {
        incomplete = true
        warnings.push(`${a.source}: ${a.id} ↔ ${b.id} / ${key}: 片方に保存値がありません。設定の削除とは断定できません。`)
        continue
      }
      compareValue(a, b, key, l.label, l.value, r.value, l.kind === 'reference' || r.kind === 'reference' ? 'connection' : 'changed')
    }
  }
  const unmatchedLeft: UnmatchedNode[] = []
  const unmatchedRight: UnmatchedNode[] = []
  for (const [side, nodes, other, matched, target] of [
    ['left', left.nodes, right.nodes, matchedLeft, unmatchedLeft],
    ['right', right.nodes, left.nodes, matchedRight, unmatchedRight],
  ] as const) {
    for (const node of nodes) {
      if (matched.has(node.key)) continue
      // Include same-type nodes already used by other matches. A possible extra
      // instance remains ambiguous until the user establishes its identity.
      const candidates = other.filter(candidate => candidate.source === node.source && candidate.type === node.type)
      const sourceComplete = left.status === 'ok' && right.status === 'ok' && left.sources[node.source] === 'ok' && right.sources[node.source] === 'ok'
      if (candidates.length === 0 && sourceComplete && !blocked.has(node.key)) {
        difference(side === 'left' ? node : undefined, side === 'right' ? node : undefined, '', side === 'left' ? '右で削除（左にのみ保存）' : '右で追加（右にのみ保存）', side === 'left' ? node.fields : undefined, side === 'right' ? node.fields : undefined, side === 'left' ? 'removed' : 'added')
      } else {
        incomplete = true
        target.push({ node, candidateKeys: candidates.map(candidate => candidate.key) })
      }
    }
  }
  if (unmatchedLeft.length || unmatchedRight.length) warnings.push('対応未確定のノードがあります。候補を確認し、必要に応じて手動で対応付けてください。')
  return { status: incomplete ? 'incomplete' : differences.length ? 'different' : 'same', differences, matches, unmatchedLeft, unmatchedRight, warnings: [...new Set(warnings)], excludedPromptFields }
}

export function samePrompt(left: NormalizedMetadata, right: NormalizedMetadata): boolean | null {
  if (left.status !== 'ok' || right.status !== 'ok') return null
  // Compare only named, saved text from the same source. An execution reference
  // or an unnamed widget is not evidence of the text produced at runtime.
  const source: MetadataSource = left.sources.prompt === 'ok' && right.sources.prompt === 'ok' ? 'prompt' : 'workflow'
  if (left.sources[source] !== 'ok' || right.sources[source] !== 'ok') return null
  for (const metadata of [left, right]) {
    const selected = metadata.nodes.filter(node => node.source === source)
    if (selected.some(node => !promptFields(node.type) && node.fields.some(field =>
      /^(?:widgets_values\.)?(?:text|prompt|positive|negative)$/.test(field.key) && typeof field.value === 'string'))) return null
    for (const node of selected) {
      const counterpart = metadata.nodes.find(other => other.source !== source && other.id === node.id && other.type === node.type)
      if (!counterpart) continue
      for (const field of node.fields.filter(field => field.promptText)) {
        const name = field.key.replace(/^widgets_values\./, '')
        const other = counterpart.fields.find(candidate => candidate.key.replace(/^widgets_values\./, '') === name && candidate.promptText)
        if (other && !equal(field.value, other.value)) return null
      }
    }
  }
  const a = left.nodes.filter(node => node.source === source && promptFields(node.type))
  const b = right.nodes.filter(node => node.source === source && promptFields(node.type))
  if (!a.length || a.length !== b.length) return null
  const { matches } = nodePairs(a, b, {}, [])
  if (matches.length !== a.length) return null
  for (const match of matches) {
    const l = a.find(node => node.key === match.leftKey)!
    const r = b.find(node => node.key === match.rightKey)!
    if (l.type !== r.type) return null
    for (const name of promptFields(l.type)!) {
      const lf = l.fields.find(field => field.key === name || field.key === `widgets_values.${name}`)
      const rf = r.fields.find(field => field.key === name || field.key === `widgets_values.${name}`)
      if (!lf?.promptText || !rf?.promptText) return null
      if (lf.value !== rf.value) return false
    }
  }
  // A matching collection of text is insufficient if its saved positive/negative
  // destinations changed. Without a full execution trace, return unknown.
  const conditioning = (metadata: NormalizedMetadata) => metadata.nodes.filter(node => node.source === source).flatMap(node =>
    node.fields.filter(field => /^(?:inputs\.)?(?:positive|negative)$/.test(field.key) && field.kind === 'reference')
      .map(field => ({ node: node.key, input: field.key, reference: field.value })))
  if (!equal(conditioning(left), conditioning(right))) return null
  return true
}

/** Return text, not trusted HTML. Consumers must use textContent/interpolation. */
export function displayValue(value: unknown): string {
  if (value === undefined) return '保存情報なし'
  if (typeof value === 'string') return value
  function serialize(current: unknown, depth: number): string {
    if (depth > 128) throw new Error('Metadata nesting limit')
    const integer = exactInteger(current)
    if (integer !== undefined) return integer
    const indent = '  '.repeat(depth + 1)
    const closeIndent = '  '.repeat(depth)
    if (Array.isArray(current)) return current.length ? `[\n${current.map(item => indent + serialize(item, depth + 1)).join(',\n')}\n${closeIndent}]` : '[]'
    if (record(current)) {
      const entries = Object.entries(current).filter(([, item]) => item !== undefined)
      return entries.length ? `{\n${entries.map(([key, item]) => `${indent}${JSON.stringify(key)}: ${serialize(item, depth + 1)}`).join(',\n')}\n${closeIndent}}` : '{}'
    }
    if (typeof current === 'number' && !Number.isFinite(current)) return String(current)
    return JSON.stringify(current) ?? 'null'
  }
  try { return serialize(value, 0) } catch { return '表示できない値' }
}
