import { mount, flushPromises } from '@vue/test-utils';
import { beforeAll, expect, it } from 'vitest';
import ImagePane from '../src/ImagePane.vue';
import { GalleryApi } from '../src/api';
beforeAll(() => { globalThis.ResizeObserver = class { observe() {} disconnect() {} } as any; });
const image = (id='a') => ({id,name:id+'.png',folder_id:'out',revision:'v1',mtime_ns:1,width:2048,height:1024});
function pane(deferHeavy=false) { return mount(ImagePane,{props:{image:image(),api:new GalleryApi({apiURL:r=>r}),side:'right',transform:{scale:1,x:0,y:0},models:[],modelStatus:'',deferHeavy},global:{stubs:{Thumbnail:true}}}); }
it('uses high-quality WebP by default and links downloads to the original endpoint', async()=>{
 const w=pane();
 expect(w.get('.sg-original').attributes('src')).toContain('/display?');
 expect(w.get('a[download]').attributes('href')).toContain('/download?');
 expect(w.get('a[download]').attributes('download')).toBe('a.png');
 const img=w.get('.sg-original').element;
 Object.defineProperties(img,{naturalWidth:{value:1024},naturalHeight:{value:512}});
 await w.get('.sg-original').trigger('load');await flushPromises();
 expect(w.get('.sg-quality-status').text()).toBe('High quality WebP');
 expect(w.vm.originalScale).toBeCloseTo(2048/640);
 w.unmount();
});
it('defers display while rapidly navigating but explicit 1:1 immediately requests original',async()=>{
 const w=pane(true);
 expect(w.find('.sg-original').exists()).toBe(false);
 expect(w.find('.sg-image-preview').exists()).toBe(true);
 await w.get('button').trigger('click');
 expect(w.get('.sg-original').attributes('src')).toContain('/original?');
 expect(w.emitted('original')).toHaveLength(1);
 await w.setProps({image:image('b')});
 expect(w.find('.sg-original').exists()).toBe(false);
 await w.setProps({deferHeavy:false});
 expect(w.get('.sg-original').attributes('src')).toContain('/b/display?');
 w.unmount();
});
it('ignores display decode completing after explicit original selection',async()=>{
 const w=pane();const old=w.get('.sg-original').element as HTMLImageElement;
 let finish!:()=>void;Object.defineProperty(old,'decode',{value:()=>new Promise<void>(r=>finish=r)});
 old.dispatchEvent(new Event('load'));await w.vm.$nextTick();
 (w.vm as any).requestOriginal();await w.vm.$nextTick();
 expect(old.getAttribute('src')).toBeNull();finish();await flushPromises();
 expect(w.get('.sg-quality-status').text()).not.toBe('Original');
 const current=w.get('.sg-original').element as HTMLImageElement;
 Object.defineProperties(current,{naturalWidth:{value:2048},naturalHeight:{value:1024}});
 await w.get('.sg-original').trigger('load');await flushPromises();
 expect(w.get('.sg-quality-status').text()).toBe('Original');w.unmount();
});
it('keeps original pixel dimensions when a resized display has EXIF-rotated orientation',async()=>{
 const w=pane();await w.setProps({image:{...image(),width:1248,height:832}});
 const display=w.get('.sg-original').element;
 Object.defineProperties(display,{naturalWidth:{value:683},naturalHeight:{value:1024}});
 await w.get('.sg-original').trigger('load');await flushPromises();
 expect(w.vm.originalScale).toBeCloseTo(1248/600);
 expect(w.get('.sg-original').attributes('style')).toContain('width: 400px');
 (w.vm as any).requestOriginal();await w.vm.$nextTick();
 expect(w.vm.originalScale).toBeCloseTo(1248/600);
 w.unmount();
});
it('refreshes explicit 1:1 after an early original request discovers oriented dimensions',async()=>{
 const w=pane(true);await w.setProps({image:{...image(),width:1248,height:832}});
 await w.get('button').trigger('click');expect(w.emitted('original')).toHaveLength(1);
 const original=w.get('.sg-original').element;
 Object.defineProperties(original,{naturalWidth:{value:832},naturalHeight:{value:1248}});
 await w.get('.sg-original').trigger('load');await flushPromises();
 expect(w.vm.originalScale).toBeCloseTo(1248/600);
 expect(w.emitted('originalReady')).toHaveLength(1);
 w.unmount();
});

it('does not restore pending 1:1 after the user double clicks to fit',async()=>{
 const w=pane(true);await w.get('button').trigger('click');
 await w.get('.sg-image-surface').trigger('dblclick');
 const original=w.get('.sg-original').element;
 Object.defineProperties(original,{naturalWidth:{value:2048},naturalHeight:{value:1024}});
 await w.get('.sg-original').trigger('load');await flushPromises();
 expect(w.emitted('originalReady')).toBeUndefined();w.unmount();
});
