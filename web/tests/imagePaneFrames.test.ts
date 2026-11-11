import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { defineComponent, h, reactive, nextTick } from 'vue';
import ImagePane from '../src/ImagePane.vue';
import { GalleryApi } from '../src/api';
import type { Transform } from '../src/state';
let frames: Map<number, FrameRequestCallback>;
let sequence: number;
const wrappers: ReturnType<typeof mount>[] = [];
beforeEach(() => {
  frames = new Map(); sequence = 0;
  vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => { frames.set(++sequence, callback); return sequence; });
  vi.stubGlobal('cancelAnimationFrame', (id: number) => frames.delete(id));
  vi.stubGlobal('ResizeObserver', class { observe() {} disconnect() {} });
});
afterEach(() => { wrappers.forEach(w => w.unmount()); wrappers.length = 0; vi.unstubAllGlobals(); });
const image = (id = 'a') => ({ id, name: id, folder_id: 'out', revision: 'v1', mtime_ns: 1, width: 1024, height: 1024 });
function pane() {
  const w = mount(ImagePane, { props: { image: image(), api: new GalleryApi({apiURL: r => r}), side: 'right', transform: {scale: 1, x: 0, y: 0}, models: [], modelStatus: '' }, global: { stubs: { Thumbnail: true } } });
  wrappers.push(w);
  const surface = w.get('.sg-image-surface').element as HTMLElement;
  surface.setPointerCapture = vi.fn();
  const rect = vi.spyOn(surface, 'getBoundingClientRect').mockReturnValue({left: 0, top: 0, width: 640, height: 600} as DOMRect);
  return { w, surface, rect };
}
function event(surface: HTMLElement, type: string, properties: Record<string, number> = {}) {
  const e = new Event(type, { bubbles: true, cancelable: true });
  Object.assign(e, { clientX: 320, clientY: 300, button: 0, pointerId: 1 }, properties);
  surface.dispatchEvent(e);
}
function frame() { const queued = [...frames.values()]; frames.clear(); queued.forEach(fn => fn(16)); }
function transforms(w: ReturnType<typeof mount>) { return (w.emitted('transform') ?? []).map(args => args[0] as Transform); }
it('coalesces 100 pointer moves into one update without losing the final position', () => {
  const {w, surface} = pane();
  event(surface, 'pointerdown');
  for (let i=1;i<=100;i++) event(surface, 'pointermove', {clientX:320+i, clientY:300+i/2});
  expect(transforms(w)).toHaveLength(0);
  expect(frames.size).toBe(1);
  frame();
  expect(transforms(w)).toHaveLength(1);
  expect(transforms(w)[0].x).toBeCloseTo(100/600);
  expect(transforms(w)[0].y).toBeCloseTo(50/600);
});
it('accumulates wheel events at their cursor anchors and reads geometry once per frame', () => {
  const {w, surface, rect} = pane();
  let expected = {scale:1,x:0,y:0};
  for (let i=0;i<20;i++) {
    const x=340+i, y=280+i, deltaY=-5;
    const scale=expected.scale*Math.exp(-deltaY*0.0015);
    expected={scale,x:expected.x+(x-320)/600*(1/scale-1/expected.scale),y:expected.y+(y-300)/600*(1/scale-1/expected.scale)};
    event(surface,'wheel',{clientX:x,clientY:y,deltaY});
  }
  expect(transforms(w)).toHaveLength(0);
  frame();
  expect(transforms(w)).toHaveLength(1);
  for (const key of ['scale','x','y'] as const) expect(transforms(w)[0][key]).toBeCloseTo(expected[key]);
  expect(rect).toHaveBeenCalledTimes(1);
});
it('flushes the pointerup position and leaves no delayed update', () => {
  const {w,surface}=pane(); event(surface,'pointerdown');
  event(surface,'pointermove',{clientX:340});
  event(surface,'pointerup',{clientX:380});
  expect(transforms(w)).toHaveLength(1);
  expect(transforms(w)[0].x).toBeCloseTo(60/600);
  expect(frames.size).toBe(0); frame(); expect(transforms(w)).toHaveLength(1);
});
it.each(['pointercancel','lostpointercapture'])('preserves the last valid position on %s without using missing coordinates', type => {
  const {w,surface}=pane();event(surface,'pointerdown');event(surface,'pointermove',{clientX:360});event(surface,type,{clientX:0,clientY:0});
  expect(transforms(w)).toHaveLength(1);expect(transforms(w)[0].x).toBeCloseTo(40/600);expect(frames.size).toBe(0);
  event(surface,'pointermove',{clientX:500});frame();expect(transforms(w)).toHaveLength(1);
});
it('cancels queued changes when an external reset arrives', async () => {
  const {w,surface}=pane();event(surface,'wheel',{deltaY:-20});
  await w.setProps({transform:{scale:1,x:0,y:0}});frame();expect(transforms(w)).toHaveLength(0);
});
it('cancels queued changes on navigation and unmount', async () => {
  const {w,surface}=pane();event(surface,'wheel',{deltaY:-20});
  await w.setProps({image:image('b')});frame();expect(transforms(w)).toHaveLength(0);
  event(surface,'wheel',{deltaY:-20});w.unmount();expect(frames.size).toBe(0);frame();expect(transforms(w)).toHaveLength(0);
});
it('double click resets immediately instead of applying an older queued wheel', () => {
  const {w,surface}=pane();event(surface,'wheel',{deltaY:-20});event(surface,'dblclick');frame();
  expect(transforms(w)).toEqual([{scale:1,x:0,y:0}]);
});
it('retains cumulative transforms across frames and updates linked panes through the parent', async () => {
  const state=reactive({value:{scale:1,x:0,y:0}});
  const w=mount(defineComponent({setup:()=>()=>h('div', ['left','right'].map(side=>h(ImagePane,{image:image(),api:new GalleryApi({apiURL:r=>r}),side:side as 'left'|'right',transform:state.value,models:[],modelStatus:'',onTransform:(value:Transform)=>state.value=value})))}),{global:{stubs:{Thumbnail:true}}});wrappers.push(w);
  const surface=w.findAll('.sg-image-surface')[0].element as HTMLElement;
  vi.spyOn(surface,'getBoundingClientRect').mockReturnValue({left:0,top:0,width:640,height:600} as DOMRect);
  event(surface,'wheel',{deltaY:-20});frame();
  // A second event may arrive before Vue has propagated the first emitted props.
  event(surface,'wheel',{deltaY:-20});await nextTick();frame();await nextTick();
  expect(state.value.scale).toBeCloseTo(Math.exp(40*0.0015));
  const images=w.findAll('.sg-original');expect(images[0].attributes('style')).toBe(images[1].attributes('style'));
});
