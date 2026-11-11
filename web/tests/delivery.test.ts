import { mount, flushPromises } from '@vue/test-utils';
import { beforeAll, afterEach, it, expect, vi } from 'vitest';
import Gallery from '../src/Gallery.vue';
import { GalleryApi } from '../src/api';
const image = (id: string) => ({ id, folder_id:'out', name:id+'.png', revision:'1', mtime_ns:1, width:1024,height:1024 });
const page = { images:['a','b','c','d'].map(image), next_cursor:null,version:'v1' };
beforeAll(() => {
 URL.createObjectURL = () => 'blob:preview'; URL.revokeObjectURL = () => {};
 globalThis.ResizeObserver = class { observe(){} unobserve(){} disconnect(){} } as any;
 HTMLDialogElement.prototype.showModal = function(){this.open=true;};
 HTMLDialogElement.prototype.close = function(){this.open=false;};
});
afterEach(() => { vi.unstubAllGlobals(); vi.useRealTimers(); });
function fixture(folders?: Promise<Response>) {
 const calls:string[]=[];
 vi.stubGlobal('fetch', (input:RequestInfo|URL) => {
  const url=String(input);calls.push(url);
  if(url.includes('/folders') && folders) return folders;
  return Promise.resolve(new Response(JSON.stringify(url.includes('/bootstrap') ? {folder:{id:'out',name:'output'},page} : url.includes('/folders') ? {folders:[{id:'out',name:'output'}]} : url.includes('/metadata') ? {status:'absent',prompt:null,workflow:null,warnings:[]} : page)));
 });
 return { w:mount(Gallery,{props:{api:new GalleryApi({apiURL:r=>r})},attachTo:document.body}),calls };
}
it('shows the bootstrap page while folder discovery remains pending, without an initial images roundtrip',async()=>{
 let finish!:(r:Response)=>void;
 const {w,calls}=fixture(new Promise(r=>finish=r));
 try { await w.get('[data-action=open]').trigger('click'); await flushPromises();
 expect(w.findAll('[data-action=view]')).toHaveLength(4);
 expect(calls.filter(u=>u.includes('/images?'))).toHaveLength(0);
 expect(calls[0]).toContain('/bootstrap?');
 finish(new Response(JSON.stringify({folders:[{id:'out',name:'output'}]})));await flushPromises();
 } finally {w.unmount();}
});
it('does not adopt a stale bootstrap result after close',async()=>{
 let finish!:(r:Response)=>void; const {w}=fixture();
 vi.stubGlobal('fetch',()=>new Promise<Response>(r=>finish=r));
 try {await w.get('[data-action=open]').trigger('click');await w.get('[data-action=close]').trigger('click');
 finish(new Response(JSON.stringify({folder:{id:'out',name:'output'},page})));await flushPromises();
 expect(w.find('dialog').exists()).toBe(false);expect((w.vm as any).s.images).toHaveLength(0);
 } finally{w.unmount();}
});
it('suppresses intermediate display and metadata requests during arrow stepping but explicit settings loads immediately',async()=>{
 vi.useFakeTimers({toFake:['setTimeout','clearTimeout']});
 const {w,calls}=fixture();
 try {await w.get('[data-action=open]').trigger('click');await flushPromises();
 await w.findAll('[data-action=view]')[0].trigger('click');await flushPromises();
 expect(w.get('.sg-original').attributes('src')).toContain('/a/display?');
 calls.length=0;
 await w.get('[data-action=next]').trigger('click');await vi.advanceTimersByTimeAsync(180);
 expect(w.find('.sg-original').exists()).toBe(false);expect(calls.some(u=>u.includes('/b/metadata'))).toBe(false);
 await w.get('[data-action=next]').trigger('click');await vi.advanceTimersByTimeAsync(180);
 expect(w.find('.sg-original').exists()).toBe(false);expect(calls.some(u=>u.includes('/c/metadata'))).toBe(false);
 await w.get('[data-action=settings]').trigger('click');await flushPromises();
 expect(calls.some(u=>u.includes('/c/metadata'))).toBe(true);
 await vi.advanceTimersByTimeAsync(100);await flushPromises();
 expect(w.get('.sg-original').attributes('src')).toContain('/c/display?');
 expect(w.findAll('img').some(i=>i.attributes('src')?.includes('/original?'))).toBe(false);
 }finally{w.unmount();}
});
it('does not defer pinned left pane when right navigation waits to settle',async()=>{
 const {w}=fixture();
 try {await w.get('[data-action=open]').trigger('click');await flushPromises();
 await w.findAll('.sg-pin')[0].trigger('click');await flushPromises();
 const src=w.get('[data-side=left] .sg-original').attributes('src');
 await w.get('[data-action=next]').trigger('click');
 expect(w.get('[data-side=left] .sg-original').attributes('src')).toBe(src);
 expect(w.find('[data-side=right] .sg-original').exists()).toBe(false);
 }finally{w.unmount();}
});
it('retries bootstrap after a failed reopen even when the previous folder id is retained', async()=>{
 const {w}=fixture(); const previous=fetch; let rejectBootstrap=false;
 vi.stubGlobal('fetch',(input:RequestInfo|URL,options?:RequestInit)=>String(input).includes('/bootstrap?')&&rejectBootstrap ? Promise.reject(new Error('offline')):previous(input,options));
 try {await w.get('[data-action=open]').trigger('click');await flushPromises();
 await w.get('[data-action=close]').trigger('click');rejectBootstrap=true;
 await w.get('[data-action=open]').trigger('click');await flushPromises();expect(w.text()).toContain('offline');
 rejectBootstrap=false;await w.findAll('button').find(b=>b.text()==='Retry')!.trigger('click');await flushPromises();
 expect(w.findAll('[data-action=view]')).toHaveLength(4);expect(w.text()).not.toContain('offline');
 }finally{w.unmount();}
});
it('an already open settings panel does not request each intermediate image during a burst',async()=>{
 vi.useFakeTimers({toFake:['setTimeout','clearTimeout']});const {w,calls}=fixture();
 try {await w.get('[data-action=open]').trigger('click');await flushPromises();
 await w.findAll('[data-action=view]')[0].trigger('click');
 await w.get('[data-action=settings]').trigger('click');await flushPromises();calls.length=0;
 await w.get('[data-action=next]').trigger('click');await vi.advanceTimersByTimeAsync(180);
 await w.get('[data-action=next]').trigger('click');await vi.advanceTimersByTimeAsync(180);
 expect(calls.filter(u=>u.includes('/metadata'))).toHaveLength(0);
 await vi.advanceTimersByTimeAsync(100);expect(calls.filter(u=>u.includes('/metadata'))).toHaveLength(1);
 expect(calls.find(u=>u.includes('/metadata'))).toContain('/c/metadata');
 }finally{w.unmount();}
});
