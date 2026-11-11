// @__NO_SIDE_EFFECTS__
function an(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const s of e.split(",")) t[s] = 1;
  return (s) => s in t;
}
const ne = {}, vt = [], _t = () => {
}, ui = () => !1, Cs = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Is = (e) => e.startsWith("onUpdate:"), ke = Object.assign, fi = (e, t) => {
  const s = e.indexOf(t);
  s > -1 && e.splice(s, 1);
}, vr = Object.prototype.hasOwnProperty, Q = (e, t) => vr.call(e, t), H = Array.isArray, rt = (e) => ts(e) === "[object Map]", St = (e) => ts(e) === "[object Set]", Mn = (e) => ts(e) === "[object Date]", Z = (e) => typeof e == "function", ae = (e) => typeof e == "string", Ue = (e) => typeof e == "symbol", ie = (e) => e !== null && typeof e == "object", di = (e) => (ie(e) || Z(e)) && Z(e.then) && Z(e.catch), hi = Object.prototype.toString, ts = (e) => hi.call(e), br = (e) => ts(e).slice(8, -1), pi = (e) => ts(e) === "[object Object]", cn = (e) => ae(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Ut = /* @__PURE__ */ an(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Ms = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((s) => t[s] || (t[s] = e(s)));
}, _r = /-\w/g, Oe = /* @__PURE__ */ Ms((e) => e.replace(_r, (t) => t.slice(1).toUpperCase())), wr = /\B([A-Z])/g, Ct = /* @__PURE__ */ Ms(
  (e) => e.replace(wr, "-$1").toLowerCase()
), gi = /* @__PURE__ */ Ms((e) => e.charAt(0).toUpperCase() + e.slice(1)), Ns = /* @__PURE__ */ Ms((e) => e ? `on${gi(e)}` : ""), Ke = (e, t) => !Object.is(e, t), hs = (e, ...t) => {
  for (let s = 0; s < e.length; s++)
    e[s](...t);
}, mi = (e, t, s, n = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: n,
    value: s
  });
}, un = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let $n;
const $s = () => $n || ($n = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function wt(e) {
  if (H(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++) {
      const n = e[s], i = ae(n) ? Cr(n) : wt(n);
      if (i)
        for (const r in i)
          t[r] = i[r];
    }
    return t;
  } else if (ae(e) || ie(e))
    return e;
}
const xr = /;(?![^(]*\))/g, kr = /:([^]+)/, Sr = /"(?:[^"\\]|\\[^])*"|'(?:[^'\\]|\\[^])*'|\\[^]|\/\*[^]*?\*\//g;
function Cr(e) {
  const t = {};
  return e.replace(Sr, (s) => s.startsWith("/*") ? "" : s).split(xr).forEach((s) => {
    if (s) {
      const n = s.split(kr);
      n.length > 1 && (t[n[0].trim()] = n[1].trim());
    }
  }), t;
}
function lt(e) {
  let t = "";
  if (ae(e))
    t = e;
  else if (H(e))
    for (let s = 0; s < e.length; s++) {
      const n = lt(e[s]);
      n && (t += n + " ");
    }
  else if (ie(e))
    for (const s in e)
      e[s] && (t += s + " ");
  return t.trim();
}
const Ir = "itemscope,allowfullscreen,disablepictureinpicture,disableremoteplayback,formnovalidate,ismap,nomodule,novalidate,playsinline,readonly", Mr = /* @__PURE__ */ an(Ir);
function yi(e) {
  return !!e || e === "";
}
function $r(e, t, s) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let i = 0; n && i < e.length; i++)
    n = at(e[i], t[i], s);
  return n;
}
function Tn(e, t, s) {
  if (e.size !== t.size) return !1;
  const n = Array.from(t), i = new Uint8Array(n.length);
  for (const r of e) {
    let l = -1;
    for (let o = 0; o < n.length; o++)
      if (!i[o] && at(r, n[o], s)) {
        l = o;
        break;
      }
    if (l < 0) return !1;
    i[l] = 1;
  }
  return !0;
}
function Tr(e, t, s) {
  let n = rt(e), i = rt(t);
  if (n || i || (n = St(e), i = St(t), n || i))
    return n && i ? Tn(e, t, s) : !1;
  const r = Object.keys(e).length, l = Object.keys(t).length;
  if (r !== l)
    return !1;
  for (const o in e) {
    const a = e.hasOwnProperty(o), f = t.hasOwnProperty(o);
    if (a && !f || !a && f || !at(e[o], t[o], s))
      return !1;
  }
  return String(e) === String(t);
}
function An(e, t, s, n) {
  s || (s = [/* @__PURE__ */ new Map(), /* @__PURE__ */ new Map()]);
  const [i, r] = s;
  if (i.has(e) || r.has(t))
    return i.get(e) === t && r.get(t) === e;
  i.set(e, t), r.set(t, e);
  const l = n(e, t, s);
  return i.delete(e), r.delete(t), l;
}
function at(e, t, s) {
  if (e === t) return !0;
  let n = Mn(e), i = Mn(t);
  return n || i ? n && i ? e.getTime() === t.getTime() : !1 : (n = Ue(e), i = Ue(t), n || i ? e === t : (n = H(e), i = H(t), n || i ? n && i ? An(e, t, s, $r) : !1 : (n = ie(e), i = ie(t), n || i ? !n || !i ? !1 : An(e, t, s, Tr) : String(e) === String(t))));
}
function Ar(e, t) {
  return e.findIndex((s) => at(s, t));
}
const vi = (e) => !!(e && e.__v_isRef === !0), j = (e) => ae(e) ? e : e == null ? "" : H(e) || ie(e) && (e.toString === hi || !Z(e.toString)) ? vi(e) ? j(e.value) : JSON.stringify(e, bi, 2) : String(e), bi = (e, t) => vi(t) ? bi(e, t.value) : rt(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (s, [n, i], r) => (s[Fs(n, r) + " =>"] = i, s),
    {}
  )
} : St(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((s) => Fs(s))
} : Ue(t) ? Fs(t) : ie(t) && !H(t) && !pi(t) ? String(t) : t, Fs = (e, t = "") => {
  var s;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    Ue(e) ? `Symbol(${(s = e.description) != null ? s : t})` : e
  );
};
let fe;
class Er {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !t && fe && (fe.active ? (this.parent = fe, this.index = (fe.scopes || (fe.scopes = [])).push(
      this
    ) - 1) : (this._active = !1, this._warnOnRun = !1));
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let t, s;
      if (this.scopes) {
        const n = this.scopes.slice();
        for (t = 0, s = n.length; t < s; t++)
          n[t].pause();
      }
      for (t = 0, s = this.effects.length; t < s; t++)
        this.effects[t].pause();
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let t, s;
      if (this.scopes) {
        const i = this.scopes.slice();
        for (t = 0, s = i.length; t < s; t++)
          i[t].resume();
      }
      const n = this.effects.slice();
      for (t = 0, s = n.length; t < s; t++)
        n[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const s = fe;
      try {
        return fe = this, t();
      } finally {
        fe = s;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = fe, fe = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (fe === this)
        fe = this.prevScope;
      else {
        let t = fe;
        for (; t; ) {
          if (t.prevScope === this) {
            t.prevScope = this.prevScope;
            break;
          }
          t = t.prevScope;
        }
      }
      this.prevScope = void 0;
    }
  }
  stop(t) {
    if (this._active) {
      this._active = !1;
      let s, n;
      for (s = 0, n = this.effects.length; s < n; s++)
        this.effects[s].stop();
      for (this.effects.length = 0, s = 0, n = this.cleanups.length; s < n; s++)
        this.cleanups[s]();
      if (this.cleanups.length = 0, this.scopes) {
        const i = this.scopes.slice();
        for (s = 0, n = i.length; s < n; s++)
          i[s].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !t) {
        const i = this.parent.scopes.pop();
        i && i !== this && (this.parent.scopes[this.index] = i, i.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function Or() {
  return fe;
}
let se;
const js = /* @__PURE__ */ new WeakSet();
class _i {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, fe && (fe.active ? fe.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, js.has(this) && (js.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || xi(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, En(this), ki(this);
    const t = se, s = Re;
    se = this, Re = !0;
    try {
      return this.fn();
    } finally {
      Si(this), se = t, Re = s, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        hn(t);
      this.deps = this.depsTail = void 0, En(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? js.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Xs(this) && this.run();
  }
  get dirty() {
    return Xs(this);
  }
}
let wi = 0, Ht, Vt;
function xi(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Vt, Vt = e;
    return;
  }
  e.next = Ht, Ht = e;
}
function fn() {
  wi++;
}
function dn() {
  if (--wi > 0)
    return;
  if (Vt) {
    let t = Vt;
    for (Vt = void 0; t; ) {
      const s = t.next;
      t.next = void 0, t.flags &= -9, t = s;
    }
  }
  let e;
  for (; Ht; ) {
    let t = Ht;
    for (Ht = void 0; t; ) {
      const s = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1)
        try {
          t.trigger();
        } catch (n) {
          e || (e = n);
        }
      t = s;
    }
  }
  if (e) throw e;
}
function ki(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Si(e) {
  let t, s = e.depsTail, n = s;
  for (; n; ) {
    const i = n.prevDep;
    n.version === -1 ? (n === s && (s = i), hn(n), Rr(n)) : t = n, n.dep.activeLink = n.prevActiveLink, n.prevActiveLink = void 0, n = i;
  }
  e.deps = t, e.depsTail = s;
}
function Xs(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Ci(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Ci(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Jt) || (e.globalVersion = Jt, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Xs(e))))
    return;
  e.flags |= 2;
  const t = e.dep, s = se, n = Re;
  se = e, Re = !0;
  try {
    ki(e);
    const i = e.fn(e._value);
    (t.version === 0 || Ke(i, e._value)) && (e.flags |= 128, e._value = i, t.version++);
  } catch (i) {
    throw t.version++, i;
  } finally {
    se = s, Re = n, Si(e), e.flags &= -3;
  }
}
function hn(e, t = !1) {
  const { dep: s, prevSub: n, nextSub: i } = e;
  if (n && (n.nextSub = i, e.prevSub = void 0), i && (i.prevSub = n, e.nextSub = void 0), s.subs === e && (s.subs = n, !n && s.computed)) {
    s.computed.flags &= -5;
    for (let r = s.computed.deps; r; r = r.nextDep)
      hn(r, !0);
  }
  !t && !--s.sc && s.map && s.map.delete(s.key);
}
function Rr(e) {
  const { prevDep: t, nextDep: s } = e;
  t && (t.nextDep = s, e.prevDep = void 0), s && (s.prevDep = t, e.nextDep = void 0);
}
let Re = !0;
const Ii = [];
function Ze() {
  Ii.push(Re), Re = !1;
}
function et() {
  const e = Ii.pop();
  Re = e === void 0 ? !0 : e;
}
function En(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const s = se;
    se = void 0;
    try {
      t();
    } finally {
      se = s;
    }
  }
}
let Jt = 0;
class Pr {
  constructor(t, s) {
    this.sub = t, this.dep = s, this.version = s.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class pn {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!se || !Re || se === this.computed)
      return;
    let s = this.activeLink;
    if (s === void 0 || s.sub !== se)
      s = this.activeLink = new Pr(se, this), se.deps ? (s.prevDep = se.depsTail, se.depsTail.nextDep = s, se.depsTail = s) : se.deps = se.depsTail = s, Mi(s);
    else if (s.version === -1 && (s.version = this.version, s.nextDep)) {
      const n = s.nextDep;
      n.prevDep = s.prevDep, s.prevDep && (s.prevDep.nextDep = n), s.prevDep = se.depsTail, s.nextDep = void 0, se.depsTail.nextDep = s, se.depsTail = s, se.deps === s && (se.deps = n);
    }
    return s;
  }
  trigger(t) {
    this.version++, Jt++, this.notify(t);
  }
  notify(t) {
    fn();
    try {
      for (let s = this.subs; s; s = s.prevSub)
        s.sub.notify() && s.sub.dep.notify();
    } finally {
      dn();
    }
  }
}
function Mi(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let n = t.deps; n; n = n.nextDep)
        Mi(n);
    }
    const s = e.dep.subs;
    s !== e && (e.prevSub = s, s && (s.nextSub = e)), e.dep.subs = e;
  }
}
const Qs = /* @__PURE__ */ new WeakMap(), xt = /* @__PURE__ */ Symbol(
  ""
), Zs = /* @__PURE__ */ Symbol(
  ""
), Yt = /* @__PURE__ */ Symbol(
  ""
);
function he(e, t, s) {
  if (Re && se) {
    let n = Qs.get(e);
    n || Qs.set(e, n = /* @__PURE__ */ new Map());
    let i = n.get(s);
    i || (n.set(s, i = new pn()), i.map = n, i.key = s), i.track();
  }
}
function Xe(e, t, s, n, i, r) {
  const l = Qs.get(e);
  if (!l) {
    Jt++;
    return;
  }
  const o = (a) => {
    a && a.trigger();
  };
  if (fn(), t === "clear")
    l.forEach(o);
  else {
    const a = H(e), f = a && cn(s);
    if (a && s === "length") {
      const u = Number(n);
      l.forEach((h, g) => {
        (g === "length" || g === Yt || !Ue(g) && g >= u) && o(h);
      });
    } else
      switch ((s !== void 0 || l.has(void 0)) && o(l.get(s)), f && o(l.get(Yt)), t) {
        case "add":
          a ? f && o(l.get("length")) : (o(l.get(xt)), rt(e) && o(l.get(Zs)));
          break;
        case "delete":
          a || (o(l.get(xt)), rt(e) && o(l.get(Zs)));
          break;
        case "set":
          rt(e) && o(l.get(xt));
          break;
      }
  }
  dn();
}
function Mt(e) {
  const t = /* @__PURE__ */ J(e);
  return t === e || (he(t, "iterate", Yt), /* @__PURE__ */ $e(e)) ? t : /* @__PURE__ */ He(e) ? /* @__PURE__ */ ot(e) ? t.map((s) => ct(Ae(s))) : t.map(ct) : t.map(Ae);
}
function Ts(e) {
  return he(e = /* @__PURE__ */ J(e), "iterate", Yt), e;
}
function Fe(e, t) {
  return /* @__PURE__ */ He(e) ? ct(/* @__PURE__ */ ot(e) ? Ae(t) : t) : Ae(t);
}
const Lr = {
  __proto__: null,
  [Symbol.iterator]() {
    return Ds(this, Symbol.iterator, (e) => Fe(this, e));
  },
  concat(...e) {
    return Mt(this).concat(
      ...e.map((t) => H(t) ? Mt(t) : t)
    );
  },
  entries() {
    return Ds(this, "entries", (e) => (e[1] = Fe(this, e[1]), e));
  },
  every(e, t) {
    return Ge(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return Ge(
      this,
      "filter",
      e,
      t,
      (s) => s.map((n) => Fe(this, n)),
      arguments
    );
  },
  find(e, t) {
    return Ge(
      this,
      "find",
      e,
      t,
      (s) => Fe(this, s),
      arguments
    );
  },
  findIndex(e, t) {
    return Ge(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return Ge(
      this,
      "findLast",
      e,
      t,
      (s) => Fe(this, s),
      arguments
    );
  },
  findLastIndex(e, t) {
    return Ge(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return Ge(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return Ks(this, "includes", e);
  },
  indexOf(...e) {
    return Ks(this, "indexOf", e);
  },
  join(e) {
    return Mt(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return Ks(this, "lastIndexOf", e);
  },
  map(e, t) {
    return Ge(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Lt(this, "pop");
  },
  push(...e) {
    return Lt(this, "push", e);
  },
  reduce(e, ...t) {
    return Rn(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return Rn(this, "reduceRight", e, t);
  },
  shift() {
    return Lt(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return Ge(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Lt(this, "splice", e);
  },
  toReversed() {
    return Mt(this).toReversed();
  },
  toSorted(e) {
    return Mt(this).toSorted(e);
  },
  toSpliced(...e) {
    return Mt(this).toSpliced(...e);
  },
  unshift(...e) {
    return Lt(this, "unshift", e);
  },
  values() {
    return Ds(this, "values", (e) => Fe(this, e));
  }
};
function Ds(e, t, s) {
  const n = Ts(e), i = n[t], r = i.call(n);
  if (n !== e && !/* @__PURE__ */ $e(e)) {
    if (r[Symbol.toStringTag] === "Array Iterator") {
      const l = Object.create(Object.getPrototypeOf(r));
      return l.next = () => On(r.next(), s), i !== $i[t] && Object.defineProperties(l, {
        return: {
          get() {
            const o = r.return;
            return typeof o == "function" ? o.bind(r) : o;
          }
        },
        throw: {
          get() {
            const o = r.throw;
            return typeof o == "function" ? o.bind(r) : o;
          }
        }
      }), l;
    }
    r._next = r.next, r.next = () => On(r._next(), s);
  }
  return r;
}
function On(e, t) {
  return e.done || (e.value = t(e.value)), e;
}
const $i = Array.prototype;
function Ge(e, t, s, n, i, r) {
  const l = Ts(e), o = l !== e && !/* @__PURE__ */ $e(e), a = l[t];
  if (a !== $i[t]) {
    const h = a.apply(e, r);
    return o ? Ae(h) : h;
  }
  let f = s;
  l !== e && (o ? f = function(h, g) {
    return s.call(this, Fe(e, h), g, e);
  } : s.length > 2 && (f = function(h, g) {
    return s.call(this, h, g, e);
  }));
  const u = a.call(l, f, n);
  return o && i ? i(u) : u;
}
function Rn(e, t, s, n) {
  const i = Ts(e), r = i !== e && !/* @__PURE__ */ $e(e);
  let l = s, o = !1;
  i !== e && (r ? (o = n.length === 0, l = function(f, u, h) {
    return o && (o = !1, f = Fe(e, f)), s.call(this, f, Fe(e, u), h, e);
  }) : s.length > 3 && (l = function(f, u, h) {
    return s.call(this, f, u, h, e);
  }));
  const a = i[t](l, ...n);
  return o ? Fe(e, a) : a;
}
function Ks(e, t, s) {
  const n = /* @__PURE__ */ J(e);
  he(n, "iterate", Yt);
  const i = n[t](...s);
  return (i === -1 || i === !1) && /* @__PURE__ */ yn(s[0]) ? (s[0] = /* @__PURE__ */ J(s[0]), n[t](...s)) : i;
}
function Lt(e, t, s = []) {
  Ze(), fn();
  const n = (/* @__PURE__ */ J(e))[t].apply(e, s);
  return dn(), et(), n;
}
const Nr = /* @__PURE__ */ an("__proto__,__v_isRef,__isVue"), Ti = /* @__PURE__ */ new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Ue)
);
function Fr(e) {
  Ue(e) || (e = String(e));
  const t = /* @__PURE__ */ J(this);
  return he(t, "has", e), t.hasOwnProperty(e);
}
class Ai {
  constructor(t = !1, s = !1) {
    this._isReadonly = t, this._isShallow = s;
  }
  get(t, s, n) {
    if (s === "__v_skip") return t.__v_skip;
    const i = this._isReadonly, r = this._isShallow;
    if (s === "__v_isReactive")
      return !i;
    if (s === "__v_isReadonly")
      return i;
    if (s === "__v_isShallow")
      return r;
    if (s === "__v_raw")
      return n === (i ? r ? qr : Pi : r ? Ri : Oi).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(n) ? t : void 0;
    const l = H(t);
    if (!i) {
      let a;
      if (l && (a = Lr[s]))
        return a;
      if (s === "hasOwnProperty")
        return Fr;
    }
    const o = Reflect.get(
      t,
      s,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ ue(t) ? t : n
    );
    if ((Ue(s) ? Ti.has(s) : Nr(s)) || (i || he(t, "get", s), r))
      return o;
    if (/* @__PURE__ */ ue(o)) {
      const a = l && cn(s) ? o : o.value;
      return i && ie(a) ? /* @__PURE__ */ tn(a) : a;
    }
    return ie(o) ? i ? /* @__PURE__ */ tn(o) : /* @__PURE__ */ ms(o) : o;
  }
}
class Ei extends Ai {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, s, n, i) {
    let r = t[s];
    const l = H(t) && cn(s);
    if (!this._isShallow) {
      const f = /* @__PURE__ */ He(r);
      if (!/* @__PURE__ */ $e(n) && !/* @__PURE__ */ He(n) && (r = /* @__PURE__ */ J(r), n = /* @__PURE__ */ J(n)), !l && /* @__PURE__ */ ue(r) && !/* @__PURE__ */ ue(n))
        return f || (r.value = n), !0;
    }
    const o = l ? Number(s) < t.length : Q(t, s), a = Reflect.set(
      t,
      s,
      n,
      /* @__PURE__ */ ue(t) ? t : i
    );
    return t === /* @__PURE__ */ J(i) && a && (o ? Ke(n, r) && Xe(t, "set", s, n) : Xe(t, "add", s, n)), a;
  }
  deleteProperty(t, s) {
    const n = Q(t, s);
    t[s];
    const i = Reflect.deleteProperty(t, s);
    return i && n && Xe(t, "delete", s, void 0), i;
  }
  has(t, s) {
    const n = Reflect.has(t, s);
    return (!Ue(s) || !Ti.has(s)) && he(t, "has", s), n;
  }
  ownKeys(t) {
    return he(
      t,
      "iterate",
      H(t) ? "length" : xt
    ), Reflect.ownKeys(t);
  }
}
class jr extends Ai {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, s) {
    return !0;
  }
  deleteProperty(t, s) {
    return !0;
  }
}
const Dr = /* @__PURE__ */ new Ei(), Kr = /* @__PURE__ */ new jr(), Ur = /* @__PURE__ */ new Ei(!0);
const en = (e) => e, as = (e) => Reflect.getPrototypeOf(e);
function Hr(e, t, s) {
  return function(...n) {
    const i = this.__v_raw, r = /* @__PURE__ */ J(i), l = rt(r), o = e === "entries" || e === Symbol.iterator && l, a = e === "keys" && l, f = i[e](...n), u = s ? en : t ? ct : Ae;
    return !t && he(
      r,
      "iterate",
      a ? Zs : xt
    ), ke(
      // inheriting all iterator properties
      Object.create(f),
      {
        // iterator protocol
        next() {
          const { value: h, done: g } = f.next();
          return g ? { value: h, done: g } : {
            value: o ? [u(h[0]), u(h[1])] : u(h),
            done: g
          };
        }
      }
    );
  };
}
function cs(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Vr(e, t) {
  const s = {
    get(i) {
      const r = this.__v_raw, l = /* @__PURE__ */ J(r), o = /* @__PURE__ */ J(i);
      e || (Ke(i, o) && he(l, "get", i), he(l, "get", o));
      const { has: a } = as(l), f = t ? en : e ? ct : Ae;
      if (a.call(l, i))
        return f(r.get(i));
      if (a.call(l, o))
        return f(r.get(o));
      r !== l && r.get(i);
    },
    get size() {
      const i = this.__v_raw;
      return !e && he(/* @__PURE__ */ J(i), "iterate", xt), i.size;
    },
    has(i) {
      const r = this.__v_raw, l = /* @__PURE__ */ J(r), o = /* @__PURE__ */ J(i);
      return e || (Ke(i, o) && he(l, "has", i), he(l, "has", o)), i === o ? r.has(i) : r.has(i) || r.has(o);
    },
    forEach(i, r) {
      const l = this, o = l.__v_raw, a = /* @__PURE__ */ J(o), f = t ? en : e ? ct : Ae;
      return !e && he(a, "iterate", xt), o.forEach((u, h) => i.call(r, f(u), f(h), l));
    }
  };
  return ke(
    s,
    e ? {
      add: cs("add"),
      set: cs("set"),
      delete: cs("delete"),
      clear: cs("clear")
    } : {
      add(i) {
        const r = /* @__PURE__ */ J(this), l = as(r), o = /* @__PURE__ */ J(i), a = !t && !/* @__PURE__ */ $e(i) && !/* @__PURE__ */ He(i) ? o : i;
        return l.has.call(r, a) || Ke(i, a) && l.has.call(r, i) || Ke(o, a) && l.has.call(r, o) || (r.add(a), Xe(r, "add", a, a)), this;
      },
      set(i, r) {
        !t && !/* @__PURE__ */ $e(r) && !/* @__PURE__ */ He(r) && (r = /* @__PURE__ */ J(r));
        const l = /* @__PURE__ */ J(this), { has: o, get: a } = as(l);
        let f = o.call(l, i);
        f || (i = /* @__PURE__ */ J(i), f = o.call(l, i));
        const u = a.call(l, i);
        return l.set(i, r), f ? Ke(r, u) && Xe(l, "set", i, r) : Xe(l, "add", i, r), this;
      },
      delete(i) {
        const r = /* @__PURE__ */ J(this), { has: l, get: o } = as(r);
        let a = l.call(r, i);
        a || (i = /* @__PURE__ */ J(i), a = l.call(r, i)), o && o.call(r, i);
        const f = r.delete(i);
        return a && Xe(r, "delete", i, void 0), f;
      },
      clear() {
        const i = /* @__PURE__ */ J(this), r = i.size !== 0, l = i.clear();
        return r && Xe(
          i,
          "clear",
          void 0,
          void 0
        ), l;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((i) => {
    s[i] = Hr(i, e, t);
  }), s;
}
function gn(e, t) {
  const s = Vr(e, t);
  return (n, i, r) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_isShallow" ? t : i === "__v_raw" ? n : Reflect.get(
    Q(s, i) && i in n ? s : n,
    i,
    r
  );
}
const Br = {
  get: /* @__PURE__ */ gn(!1, !1)
}, Wr = {
  get: /* @__PURE__ */ gn(!1, !0)
}, Gr = {
  get: /* @__PURE__ */ gn(!0, !1)
};
const Oi = /* @__PURE__ */ new WeakMap(), Ri = /* @__PURE__ */ new WeakMap(), Pi = /* @__PURE__ */ new WeakMap(), qr = /* @__PURE__ */ new WeakMap();
function zr(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
// @__NO_SIDE_EFFECTS__
function ms(e) {
  return /* @__PURE__ */ He(e) ? e : mn(
    e,
    !1,
    Dr,
    Br,
    Oi
  );
}
// @__NO_SIDE_EFFECTS__
function Jr(e) {
  return mn(
    e,
    !1,
    Ur,
    Wr,
    Ri
  );
}
// @__NO_SIDE_EFFECTS__
function tn(e) {
  return mn(
    e,
    !0,
    Kr,
    Gr,
    Pi
  );
}
function mn(e, t, s, n, i) {
  if (!ie(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e))
    return e;
  const r = i.get(e);
  if (r)
    return r;
  const l = zr(br(e));
  if (l === 0)
    return e;
  const o = new Proxy(
    e,
    l === 2 ? n : s
  );
  return i.set(e, o), o;
}
// @__NO_SIDE_EFFECTS__
function ot(e) {
  return /* @__PURE__ */ He(e) ? /* @__PURE__ */ ot(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function He(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function $e(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function yn(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function J(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ J(t) : e;
}
function Yr(e) {
  return !Q(e, "__v_skip") && Object.isExtensible(e) && mi(e, "__v_skip", !0), e;
}
const Ae = (e) => ie(e) ? /* @__PURE__ */ ms(e) : e, ct = (e) => ie(e) ? /* @__PURE__ */ tn(e) : e;
// @__NO_SIDE_EFFECTS__
function ue(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function X(e) {
  return Xr(e, !1);
}
function Xr(e, t) {
  return /* @__PURE__ */ ue(e) ? e : new Qr(e, t);
}
class Qr {
  constructor(t, s) {
    this.dep = new pn(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = s ? t : /* @__PURE__ */ J(t), this._value = s ? t : Ae(t), this.__v_isShallow = s;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const s = this._rawValue, n = this.__v_isShallow || /* @__PURE__ */ $e(t) || /* @__PURE__ */ He(t);
    t = n ? t : /* @__PURE__ */ J(t), Ke(t, s) && (this._rawValue = t, this._value = n ? t : Ae(t), this.dep.trigger());
  }
}
function ve(e) {
  return /* @__PURE__ */ ue(e) ? e.value : e;
}
const Zr = {
  get: (e, t, s) => t === "__v_raw" ? e : ve(Reflect.get(e, t, s)),
  set: (e, t, s, n) => {
    const i = e[t];
    return /* @__PURE__ */ ue(i) && !/* @__PURE__ */ ue(s) ? (i.value = s, !0) : Reflect.set(e, t, s, n);
  }
};
function Li(e) {
  return /* @__PURE__ */ ot(e) ? e : new Proxy(e, Zr);
}
class el {
  constructor(t, s, n) {
    this.fn = t, this.setter = s, this._value = void 0, this.dep = new pn(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Jt - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !s, this.isSSR = n;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    se !== this)
      return xi(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return Ci(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function tl(e, t, s = !1) {
  let n, i;
  return Z(e) ? n = e : (n = e.get, i = e.set), new el(n, i, s);
}
const us = {}, ys = /* @__PURE__ */ new WeakMap();
let yt;
function sl(e, t = !1, s = yt) {
  if (s) {
    let n = ys.get(s);
    n || ys.set(s, n = []), n.push(e);
  }
}
function nl(e, t, s = ne) {
  const { immediate: n, deep: i, once: r, scheduler: l, augmentJob: o, call: a } = s, f = (E) => i ? E : /* @__PURE__ */ $e(E) || i === !1 || i === 0 ? Qe(E, 1) : Qe(E);
  let u, h, g, m, D = !1, I = !1;
  if (/* @__PURE__ */ ue(e) ? (h = () => e.value, D = /* @__PURE__ */ $e(e)) : /* @__PURE__ */ ot(e) ? (h = () => f(e), D = !0) : H(e) ? (I = !0, D = e.some((E) => /* @__PURE__ */ ot(E) || /* @__PURE__ */ $e(E)), h = () => e.map((E) => {
    if (/* @__PURE__ */ ue(E))
      return E.value;
    if (/* @__PURE__ */ ot(E))
      return f(E);
    if (Z(E))
      return a ? a(E, 2) : E();
  })) : Z(e) ? t ? h = a ? () => a(e, 2) : e : h = () => {
    if (g) {
      Ze();
      try {
        g();
      } finally {
        et();
      }
    }
    const E = yt;
    yt = u;
    try {
      return a ? a(e, 3, [m]) : e(m);
    } finally {
      yt = E;
    }
  } : h = _t, t && i) {
    const E = h, K = i === !0 ? 1 / 0 : i;
    h = () => Qe(E(), K);
  }
  const R = Or(), O = () => {
    u.stop(), R && R.active && fi(R.effects, u);
  };
  if (r && t) {
    const E = t;
    t = (...K) => {
      try {
        return E(...K);
      } finally {
        O();
      }
    };
  }
  let A = I ? new Array(e.length).fill(us) : us;
  const C = (E) => {
    if (!(!(u.flags & 1) || !u.dirty && !E))
      if (t) {
        const K = u.run();
        if (E || i || D || (I ? K.some((q, B) => Ke(q, A[B])) : Ke(K, A))) {
          const q = yt;
          Ze();
          try {
            g && g(), yt = u;
            const B = [
              K,
              // pass undefined as the old value when it's changed for the first time
              A === us ? void 0 : I && A[0] === us ? [] : A,
              m
            ];
            A = K, a ? a(t, 3, B) : (
              // @ts-expect-error
              t(...B)
            );
          } finally {
            yt = q, et();
          }
        }
      } else
        u.run();
  };
  return o && o(C), u = new _i(h), u.scheduler = l ? () => l(C, !1) : C, m = (E) => sl(E, !1, u), g = u.onStop = () => {
    const E = ys.get(u);
    if (E) {
      if (a)
        a(E, 4);
      else
        for (const K of E) K();
      ys.delete(u);
    }
  }, t ? n ? C(!0) : A = u.run() : l ? l(C.bind(null, !0), !0) : u.run(), O.pause = u.pause.bind(u), O.resume = u.resume.bind(u), O.stop = O, O;
}
function Qe(e, t = 1 / 0, s) {
  if (t <= 0 || !ie(e) || e.__v_skip || (s = s || /* @__PURE__ */ new Map(), (s.get(e) || 0) >= t))
    return e;
  if (s.set(e, t), t--, /* @__PURE__ */ ue(e))
    Qe(e.value, t, s);
  else if (H(e))
    for (let n = 0; n < e.length; n++)
      Qe(e[n], t, s);
  else if (St(e) || rt(e))
    e.forEach((n) => {
      Qe(n, t, s);
    });
  else if (pi(e)) {
    for (const n in e)
      Qe(e[n], t, s);
    for (const n of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, n) && Qe(e[n], t, s);
  }
  return e;
}
function ss(e, t, s, n) {
  try {
    return n ? e(...n) : e();
  } catch (i) {
    As(i, t, s);
  }
}
function Ve(e, t, s, n) {
  if (Z(e)) {
    const i = ss(e, t, s, n);
    return i && di(i) && i.catch((r) => {
      As(r, t, s, void 0, !0);
    }), i;
  }
  if (H(e)) {
    const i = [];
    for (let r = 0; r < e.length; r++)
      i.push(Ve(e[r], t, s, n));
    return i;
  }
}
function As(e, t, s, n = !0, i = !1) {
  const r = t ? t.vnode : null, { errorHandler: l, throwUnhandledErrorInProduction: o } = t && t.appContext.config || ne;
  if (t) {
    let a = t.parent;
    const f = t.proxy, u = `https://vuejs.org/error-reference/#runtime-${s}`;
    for (; a; ) {
      const h = a.ec;
      if (h && !a.isUnmounted && // Async failures may outlive stopped scopes whose unmount effects
      // are deferred or discarded by Suspense.
      (!i || a.scope.active)) {
        for (let g = 0; g < h.length; g++)
          if (h[g](e, f, u) === !1)
            return;
      }
      a = a.parent;
    }
    if (l) {
      Ze(), ss(l, null, 10, [
        e,
        f,
        u
      ]), et();
      return;
    }
  }
  il(e, s, r, n, o);
}
function il(e, t, s, n = !0, i = !1) {
  if (i)
    throw e;
  console.error(e);
}
const ye = [];
let Ee = -1;
const je = [];
let it = null, $t = 0;
const Ni = /* @__PURE__ */ Promise.resolve();
let vs = null;
function Tt(e) {
  const t = vs || Ni;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function rl(e) {
  let t = Ee + 1, s = ye.length;
  for (; t < s; ) {
    const n = t + s >>> 1, i = ye[n], r = Xt(i);
    r < e || r === e && i.flags & 2 ? t = n + 1 : s = n;
  }
  return t;
}
function vn(e) {
  if (!(e.flags & 1)) {
    const t = Xt(e), s = ye[ye.length - 1];
    !s || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= Xt(s) ? ye.push(e) : ye.splice(rl(t), 0, e), e.flags |= 1, Fi();
  }
}
function Fi() {
  vs || (vs = Ni.then(Ki));
}
function ll(e) {
  if (!H(e))
    it && e.id === -1 ? it.splice($t + 1, 0, e) : e.flags & 1 || (je.push(e), e.flags |= 1);
  else
    for (let t = 0; t < e.length; t++)
      je.push(e[t]);
  Fi();
}
function ji(e, t, s, n = Ee + 1) {
  for (; n < ye.length; n++) {
    const i = ye[n];
    if (i && i.flags & 2) {
      if (e && i.id !== e.uid || t !== void 0 && !(i.id >= t))
        continue;
      ye.splice(n, 1), n = e ? n - 1 : Ee, i.flags & 4 && (i.flags &= -2), i(), i.flags & 4 || (i.flags &= -2);
    }
  }
}
function Di(e, t, s = 0) {
  if (je.length) {
    let n = je, i = 0;
    if (t) {
      n = [];
      for (let l = 0; l < je.length; l++) {
        const o = je[l];
        (o.i !== void 0 ? !o.i || o.i.uid < s : t.has(o)) ? je[i++] = o : n.push(o);
      }
    }
    const r = [...new Set(n)].sort((l, o) => Xt(l) - Xt(o));
    if (je.length = i, it) {
      for (let l = 0; l < r.length; l++)
        it.push(r[l]);
      return;
    }
    for (it = r, $t = 0; $t < it.length; $t++) {
      const l = it[$t];
      l.flags & 4 && (l.flags &= -2), l.flags & 8 || l(), l.flags &= -2;
    }
    it = null, $t = 0;
  }
}
let Us = !1;
function ol(e, t) {
  if (Us) {
    e();
    return;
  }
  const s = t === void 0 ? void 0 : new Set(je);
  e(), Us = !0;
  try {
    ji(void 0, t), Di(void 0, s, t);
  } finally {
    Us = !1;
  }
}
const Xt = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Ki(e) {
  try {
    for (Ee = 0; Ee < ye.length; Ee++) {
      const t = ye[Ee];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), ss(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; Ee < ye.length; Ee++) {
      const t = ye[Ee];
      t && (t.flags &= -2);
    }
    Ee = -1, ye.length = 0, Di(), vs = null, (ye.length || je.length) && Ki();
  }
}
let Me = null, Ui = null;
function bs(e) {
  const t = Me;
  return Me = e, Ui = e && e.type.__scopeId || null, t;
}
function al(e, t = Me, s) {
  if (!t || e._n)
    return e;
  const n = (...i) => {
    n._d && Kn(-1);
    const r = bs(t), l = kt.length;
    let o;
    try {
      o = e(...i);
    } finally {
      for (let a = kt.length; a > l; a--) ir();
      bs(r), n._d && Kn(1);
    }
    return o;
  };
  return n._n = !0, n._c = !0, n._d = !0, n;
}
function cl(e, t) {
  if (Me === null)
    return e;
  const s = Ls(Me), n = e.dirs || (e.dirs = []);
  for (let i = 0; i < t.length; i++) {
    let [r, l, o, a = ne] = t[i];
    r && (Z(r) && (r = {
      mounted: r,
      updated: r
    }), r.deep && Qe(l), n.push({
      dir: r,
      instance: s,
      value: l,
      oldValue: void 0,
      arg: o,
      modifiers: a
    }));
  }
  return e;
}
function gt(e, t, s, n) {
  let i = e;
  if (n === "beforeMount")
    e._mount = e;
  else if (n === "beforeUpdate") {
    const o = t && t._mount;
    o && (o._latest = e, e._mount = o);
  } else if (n === "mounted") {
    const o = e._latest;
    e._mount = e._latest = void 0, o && (i = o, o._mount = void 0);
  }
  const r = i.dirs, l = t && t.dirs;
  for (let o = 0; o < r.length; o++) {
    let a = r[o];
    l ? a.oldValue = l[o].value : n === "mounted" && a.oldValue !== void 0 && (a = ke({}, a, { oldValue: void 0 }));
    let f = a.dir[n];
    f && (Ze(), Ve(f, s, 8, [
      e.el,
      a,
      i,
      t
    ]), et());
  }
}
function ul(e, t, s = !1) {
  const n = ql();
  if (n || At) {
    let i = At ? At._context.provides : n ? n.parent == null || n.ce ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides : void 0;
    if (i && e in i)
      return i[e];
    if (arguments.length > 1)
      return s && Z(t) ? t.call(n && n.proxy) : t;
  }
}
const fl = /* @__PURE__ */ Symbol.for("v-scx"), dl = () => ul(fl);
function bt(e, t, s) {
  return hl(e, t, s);
}
function hl(e, t, s = ne) {
  const { immediate: n, deep: i, flush: r, once: l } = s, o = ke({}, s), a = t && n || !t && r !== "post";
  let f;
  if (es) {
    if (r === "sync") {
      const m = dl();
      f = m.__watcherHandles || (m.__watcherHandles = []);
    } else if (!a) {
      const m = () => {
      };
      return m.stop = _t, m.resume = _t, m.pause = _t, m;
    }
  }
  const u = ut;
  o.call = (m, D, I) => Ve(m, u, D, I);
  let h = !1;
  r === "post" ? o.scheduler = (m) => {
    m.i = u, me(m, u && u.suspense);
  } : r !== "sync" && (h = !0, o.scheduler = (m, D) => {
    D ? m() : vn(m);
  }), o.augmentJob = (m) => {
    t && (m.flags |= 4), h && (m.flags |= 2, u && (m.id = u.uid, m.i = u));
  };
  const g = nl(e, t, o);
  return es && (f ? f.push(g) : a && g()), g;
}
const pl = /* @__PURE__ */ Symbol("_vte"), Es = (e) => e.__isTeleport, Hs = /* @__PURE__ */ Symbol("_leaveCb");
function gl(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const s of e)
      if (s.type !== Pe) {
        t = s;
        break;
      }
  }
  return t;
}
function Hi(e) {
  if (!Vi(e))
    return Es(e.type) && e.children ? gl(e.children) : e;
  if (e.component)
    return e.component.subTree;
  const { shapeFlag: t, children: s } = e;
  if (s) {
    if (t & 16)
      return s[0];
    if (t & 32 && Z(s.default))
      return s.default();
  }
}
function Bt(e, t) {
  if (e.shapeFlag & 6 && e.component) {
    e.transition = t;
    const s = e.component.subTree;
    Bt(
      Es(s.type) && Hi(s) || s,
      t
    );
  } else if (e.shapeFlag & 128) {
    const s = e.suspense;
    if (s) {
      const n = s.isHydrating ? s.pendingBranch : s.activeBranch;
      n && Bt(n, t.clone(n));
    } else
      e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback);
  } else if (e.transition = t, e.type === Y && H(e.children)) {
    const s = Gi(e.children, !1);
    s && Bt(s, t);
  }
}
function sn(e) {
  if (e.component)
    return sn(e.component.subTree);
  if (e.type === Y) {
    const t = H(e.children) && Gi(e.children, !1);
    return t ? sn(t) : void 0;
  }
  if (e.type !== Pe)
    return e;
}
// @__NO_SIDE_EFFECTS__
function ns(e, t) {
  return Z(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    ke({ name: e.name }, t, { setup: e })
  ) : e;
}
function ml(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function Pn(e, t) {
  let s;
  return !!((s = Object.getOwnPropertyDescriptor(e, t)) && !s.configurable);
}
const _s = /* @__PURE__ */ new WeakMap();
function Wt(e, t, s, n, i = !1) {
  if (H(e)) {
    e.forEach(
      (I, R) => Wt(
        I,
        t && (H(t) ? t[R] : t),
        s,
        n,
        i
      )
    );
    return;
  }
  if (Gt(n) && !i) {
    n.shapeFlag & 512 && n.type.__asyncResolved && n.component.subTree.component && Wt(e, t, s, n.component.subTree);
    return;
  }
  const r = n.shapeFlag & 4 ? Ls(n.component) : n.el, l = i ? null : r, { i: o, r: a } = e, f = t && t.r, u = o.refs === ne ? o.refs = {} : o.refs, h = o.setupState, g = /* @__PURE__ */ J(h), m = h === ne ? ui : (I) => Pn(u, I) ? !1 : Q(g, I), D = (I, R) => !(R && Pn(u, R));
  if (f != null && f !== a) {
    if (Ln(t), ae(f))
      u[f] = null, m(f) && (h[f] = null);
    else if (/* @__PURE__ */ ue(f)) {
      const I = t;
      D(f, I.k) && (f.value = null), I.k && (u[I.k] = null);
    }
  }
  if (Z(a))
    ss(a, o, 12, [l, u]);
  else {
    const I = ae(a), R = /* @__PURE__ */ ue(a);
    if (I || R) {
      const O = () => {
        if (e.f) {
          const A = I ? m(a) ? h[a] : u[a] : D() || !e.k ? a.value : u[e.k];
          if (i)
            H(A) && fi(A, r);
          else if (H(A))
            A.includes(r) || A.push(r);
          else if (I)
            u[a] = [r], m(a) && (h[a] = u[a]);
          else {
            const C = [r];
            D(a, e.k) && (a.value = C), e.k && (u[e.k] = C);
          }
        } else I ? (u[a] = l, m(a) && (h[a] = l)) : R && (D(a, e.k) && (a.value = l), e.k && (u[e.k] = l));
      };
      if (l) {
        const A = () => {
          O(), _s.delete(e);
        };
        A.id = -1, _s.set(e, A), me(A, s);
      } else
        Ln(e), O();
    }
  }
}
function Ln(e) {
  const t = _s.get(e);
  t && (t.flags |= 8, _s.delete(e));
}
$s().requestIdleCallback;
$s().cancelIdleCallback;
const Gt = (e) => !!e.type.__asyncLoader, Vi = (e) => e.type.__isKeepAlive;
function yl(e, t, s = ut, n = !1) {
  if (s) {
    const i = s[e] || (s[e] = []), r = t.__weh || (t.__weh = (...l) => {
      Ze();
      const o = kn(s), a = Ve(t, s, e, l);
      return o(), et(), a;
    });
    return n ? i.unshift(r) : i.push(r), r;
  }
}
const Bi = (e) => (t, s = ut) => {
  (!es || e === "sp") && yl(e, (...n) => t(...n), s);
}, bn = Bi("m"), Os = Bi(
  "bum"
), vl = /* @__PURE__ */ Symbol.for("v-ndc");
function Ie(e, t, s, n) {
  let i;
  const r = s, l = H(e);
  if (l || ae(e)) {
    const o = l && /* @__PURE__ */ ot(e);
    let a = !1, f = !1;
    o && (a = !/* @__PURE__ */ $e(e), f = /* @__PURE__ */ He(e), e = Ts(e)), i = new Array(e.length);
    for (let u = 0, h = e.length; u < h; u++)
      i[u] = t(
        a ? f ? ct(Ae(e[u])) : Ae(e[u]) : e[u],
        u,
        void 0,
        r
      );
  } else if (typeof e == "number")
    if (!Number.isInteger(e) || e < 0)
      i = [];
    else {
      i = new Array(e);
      for (let o = 0; o < e; o++)
        i[o] = t(o + 1, o, void 0, r);
    }
  else if (ie(e))
    if (e[Symbol.iterator])
      i = Array.from(
        e,
        (o, a) => t(o, a, void 0, r)
      );
    else {
      const o = Object.keys(e);
      i = new Array(o.length);
      for (let a = 0, f = o.length; a < f; a++) {
        const u = o[a];
        i[a] = t(e[u], u, a, r);
      }
    }
  else
    i = [];
  return i;
}
const nn = (e) => e ? ar(e) ? Ls(e) : nn(e.parent) : null, qt = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ ke(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => nn(e.parent),
    $root: (e) => nn(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => e.type,
    $forceUpdate: (e) => e.f || (e.f = () => {
      vn(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Tt.bind(e.proxy)),
    $watch: (e) => _t
  })
), Vs = (e, t) => e !== ne && !e.__isScriptSetup && Q(e, t), bl = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: s, setupState: n, data: i, props: r, accessCache: l, type: o, appContext: a } = e;
    if (t[0] !== "$") {
      const g = l[t];
      if (g !== void 0)
        switch (g) {
          case 1:
            return n[t];
          case 2:
            return i[t];
          case 4:
            return s[t];
          case 3:
            return r[t];
        }
      else {
        if (Vs(n, t))
          return l[t] = 1, n[t];
        if (Q(r, t))
          return l[t] = 3, r[t];
        if (s !== ne && Q(s, t))
          return l[t] = 4, s[t];
        l[t] = 0;
      }
    }
    const f = qt[t];
    let u, h;
    if (f)
      return t === "$attrs" && he(e.attrs, "get", ""), f(e);
    if (
      // css module (injected by vue-loader)
      (u = o.__cssModules) && (u = u[t])
    )
      return u;
    if (s !== ne && Q(s, t))
      return l[t] = 4, s[t];
    if (
      // global properties
      h = a.config.globalProperties, Q(h, t)
    )
      return h[t];
  },
  set({ _: e }, t, s) {
    const { data: n, setupState: i, ctx: r } = e;
    return Vs(i, t) ? (i[t] = s, !0) : Q(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (r[t] = s, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: s, ctx: n, appContext: i, props: r, type: l }
  }, o) {
    let a;
    return !!(s[o] || Vs(t, o) || Q(r, o) || Q(n, o) || Q(qt, o) || Q(i.config.globalProperties, o) || (a = l.__cssModules) && a[o]);
  },
  defineProperty(e, t, s) {
    return s.get != null ? e._.accessCache[t] = 0 : Q(s, "value") && this.set(e, t, s.value, null), Reflect.defineProperty(e, t, s);
  }
};
function Wi() {
  return {
    app: null,
    config: {
      isNativeTag: ui,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let _l = 0;
function wl(e, t) {
  return function(n, i = null) {
    Z(n) || (n = ke({}, n)), i != null && !ie(i) && (i = null);
    const r = Wi(), l = /* @__PURE__ */ new WeakSet(), o = [];
    let a = !1;
    const f = r.app = {
      _uid: _l++,
      _component: n,
      _props: i,
      _container: null,
      _context: r,
      _instance: null,
      version: Zl,
      get config() {
        return r.config;
      },
      set config(u) {
      },
      use(u, ...h) {
        return l.has(u) || (u && Z(u.install) ? (l.add(u), u.install(f, ...h)) : Z(u) && (l.add(u), u(f, ...h))), f;
      },
      mixin(u) {
        return f;
      },
      component(u, h) {
        return h ? (r.components[u] = h, f) : r.components[u];
      },
      directive(u, h) {
        return h ? (r.directives[u] = h, f) : r.directives[u];
      },
      mount(u, h, g) {
        if (!a) {
          const m = f._ceVNode || Te(n, i);
          return m.appContext = r, g === !0 ? g = "svg" : g === !1 && (g = void 0), e(m, u, g), a = !0, f._container = u, u.__vue_app__ = f, Ls(m.component);
        }
      },
      onUnmount(u) {
        o.push(u);
      },
      unmount() {
        a && (Ve(
          o,
          f._instance,
          16
        ), e(null, f._container), delete f._container.__vue_app__);
      },
      provide(u, h) {
        return r.provides[u] = h, f;
      },
      runWithContext(u) {
        const h = At;
        At = f;
        try {
          return u();
        } finally {
          At = h;
        }
      }
    };
    return f;
  };
}
let At = null;
const xl = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Oe(t)}Modifiers`] || e[`${Ct(t)}Modifiers`];
function kl(e, t, ...s) {
  if (e.isUnmounted) return;
  const n = e.vnode.props || ne;
  let i = s;
  const r = t.startsWith("update:"), l = r && xl(n, t.slice(7));
  l && (l.trim && (i = s.map((u) => ae(u) ? u.trim() : u)), l.number && (i = i.map(un)));
  let o, a = n[o = Ns(t)] || // also try camelCase event handler (#2249)
  n[o = Ns(Oe(t))];
  !a && r && (a = n[o = Ns(Ct(t))]), a && Ve(
    a,
    e,
    6,
    i
  );
  const f = n[o + "Once"];
  if (f) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[o])
      return;
    e.emitted[o] = !0, Ve(
      f,
      e,
      6,
      i
    );
  }
}
function Sl(e, t, s = !1) {
  const n = t.emitsCache, i = n.get(e);
  if (i !== void 0)
    return i;
  const r = e.emits;
  let l = {};
  return r ? (H(r) ? r.forEach((o) => l[o] = null) : ke(l, r), ie(e) && n.set(e, l), l) : (ie(e) && n.set(e, null), null);
}
function Rs(e, t) {
  return !e || !Cs(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), Q(e, t[0].toLowerCase() + t.slice(1)) || Q(e, Ct(t)) || Q(e, t));
}
function Nn(e) {
  const {
    type: t,
    vnode: s,
    proxy: n,
    withProxy: i,
    propsOptions: [r],
    slots: l,
    attrs: o,
    emit: a,
    render: f,
    renderCache: u,
    props: h,
    data: g,
    setupState: m,
    ctx: D,
    inheritAttrs: I
  } = e, R = bs(e);
  let O, A;
  try {
    if (s.shapeFlag & 4) {
      const E = i || n, K = E;
      O = De(
        f.call(
          K,
          E,
          u,
          h,
          m,
          g,
          D
        )
      ), A = o;
    } else {
      const E = t;
      O = De(
        E.length > 1 ? E(
          h,
          { attrs: o, slots: l, emit: a }
        ) : E(
          h,
          null
        )
      ), A = t.props ? o : Cl(o);
    }
  } catch (E) {
    kt.length = 0, As(E, e, 1), O = Te(Pe);
  }
  let C = O;
  if (A && I !== !1) {
    const E = Object.keys(A), { shapeFlag: K } = C;
    E.length && K & 7 && (r && E.some(Is) && (A = Il(
      A,
      r
    )), C = Et(C, A, !1, !0));
  }
  if (s.dirs && (C = Et(C, null, !1, !0), C.dirs = C.dirs ? C.dirs.concat(s.dirs) : s.dirs), s.transition) {
    const E = Es(C.type) && Hi(C) || C;
    Bt(E, s.transition);
  }
  return O = C, bs(R), O;
}
function Gi(e, t = !0) {
  let s;
  for (let n = 0; n < e.length; n++) {
    const i = e[n];
    if (xn(i)) {
      if (i.type !== Pe || i.children === "v-if") {
        if (s)
          return;
        s = i;
      }
    } else
      return;
  }
  return s;
}
const Cl = (e) => {
  let t;
  for (const s in e)
    (s === "class" || s === "style" || Cs(s)) && ((t || (t = {}))[s] = e[s]);
  return t;
}, Il = (e, t) => {
  const s = {};
  for (const n in e)
    (!Is(n) || !(n.slice(9) in t)) && (s[n] = e[n]);
  return s;
};
function Ml(e, t, s) {
  const { props: n, children: i, component: r } = e, { props: l, children: o, patchFlag: a } = t, f = r.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (s && a >= 0) {
    if (a & 1024)
      return !0;
    if (a & 16)
      return n ? Fn(n, l, f) : !!l;
    if (a & 8) {
      const u = t.dynamicProps;
      for (let h = 0; h < u.length; h++) {
        const g = u[h];
        if (qi(l, n, g) && !Rs(f, g))
          return !0;
      }
    }
  } else
    return (i || o) && (!o || !o.$stable) ? !0 : n === l ? !1 : n ? l ? Fn(n, l, f) : !0 : !!l;
  return !1;
}
function Fn(e, t, s) {
  const n = Object.keys(t);
  if (n.length !== Object.keys(e).length)
    return !0;
  for (let i = 0; i < n.length; i++) {
    const r = n[i];
    if (!Q(e, r) || qi(t, e, r) && !Rs(s, r))
      return !0;
  }
  return !1;
}
function qi(e, t, s) {
  const n = e[s], i = t[s];
  return s === "style" && ie(n) && ie(i) ? !at(n, i) : n !== i;
}
function $l({ vnode: e, parent: t, suspense: s }, n) {
  for (; t; ) {
    const i = t.subTree;
    if (i.suspense && i.suspense.activeBranch === e && (i.suspense.vnode.el = i.el = n, e = i), i === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
  s && s.activeBranch === e && (s.vnode.el = n);
}
const zi = {}, Ji = () => Object.create(zi), Yi = (e) => Object.getPrototypeOf(e) === zi;
function Tl(e, t, s, n = !1) {
  const i = {}, r = Ji();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Xi(e, t, i, r);
  for (const l in e.propsOptions[0])
    l in i || (i[l] = void 0);
  s ? e.props = n ? i : /* @__PURE__ */ Jr(i) : e.type.props ? e.props = i : e.props = r, e.attrs = r;
}
function Al(e, t, s, n) {
  const {
    props: i,
    attrs: r,
    vnode: { patchFlag: l }
  } = e, o = /* @__PURE__ */ J(i), [a] = e.propsOptions;
  let f = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (n || l > 0) && !(l & 16)
  ) {
    if (l & 8) {
      const u = e.vnode.dynamicProps;
      for (let h = 0; h < u.length; h++) {
        let g = u[h];
        if (Rs(e.emitsOptions, g))
          continue;
        const m = t[g];
        if (a)
          if (Q(r, g))
            m !== r[g] && (r[g] = m, f = !0);
          else {
            const D = Oe(g);
            i[D] = rn(
              a,
              o,
              D,
              m,
              e,
              !1
            );
          }
        else
          m !== r[g] && (r[g] = m, f = !0);
      }
    }
  } else {
    Xi(e, t, i, r) && (f = !0);
    let u;
    for (const h in o)
      (!t || // for camelCase
      !Q(t, h) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((u = Ct(h)) === h || !Q(t, u))) && (a ? s && // for camelCase
      (s[h] !== void 0 || // for kebab-case
      s[u] !== void 0) && (i[h] = rn(
        a,
        o,
        h,
        void 0,
        e,
        !0
      )) : delete i[h]);
    if (r !== o)
      for (const h in r)
        (!t || !Q(t, h)) && (delete r[h], f = !0);
  }
  f && Xe(e.attrs, "set", "");
}
function Xi(e, t, s, n) {
  const [i, r] = e.propsOptions;
  let l = !1, o;
  if (t)
    for (let a in t) {
      if (Ut(a))
        continue;
      const f = t[a];
      let u;
      i && Q(i, u = Oe(a)) ? !r || !r.includes(u) ? s[u] = f : (o || (o = {}))[u] = f : Rs(e.emitsOptions, a) || (!(a in n) || f !== n[a]) && (n[a] = f, l = !0);
    }
  if (r) {
    const a = /* @__PURE__ */ J(s), f = o || ne;
    for (let u = 0; u < r.length; u++) {
      const h = r[u];
      s[h] = rn(
        i,
        a,
        h,
        f[h],
        e,
        !Q(f, h)
      );
    }
  }
  return l;
}
function rn(e, t, s, n, i, r) {
  const l = e[s];
  if (l != null) {
    const o = Q(l, "default");
    if (o && n === void 0) {
      const a = l.default;
      if (l.type !== Function && !l.skipFactory && Z(a)) {
        const { propsDefaults: f } = i;
        if (s in f)
          n = f[s];
        else {
          const u = kn(i);
          n = f[s] = a.call(
            null,
            t
          ), u();
        }
      } else
        n = a;
      i.ce && i.ce._setProp(s, n);
    }
    l[
      0
      /* shouldCast */
    ] && (r && !o ? n = !1 : l[
      1
      /* shouldCastTrue */
    ] && (n === "" || n === Ct(s)) && (n = !0));
  }
  return n;
}
function El(e, t, s = !1) {
  const n = t.propsCache, i = n.get(e);
  if (i)
    return i;
  const r = e.props, l = {}, o = [];
  if (!r)
    return ie(e) && n.set(e, vt), vt;
  if (H(r))
    for (let f = 0; f < r.length; f++) {
      const u = Oe(r[f]);
      jn(u) && (l[u] = ne);
    }
  else if (r)
    for (const f in r) {
      const u = Oe(f);
      if (jn(u)) {
        const h = r[f], g = l[u] = H(h) || Z(h) ? { type: h } : ke({}, h), m = g.type;
        let D = !1, I = !0;
        if (H(m))
          for (let R = 0; R < m.length; ++R) {
            const O = m[R], A = Z(O) && O.name;
            if (A === "Boolean") {
              D = !0;
              break;
            } else A === "String" && (I = !1);
          }
        else
          D = Z(m) && m.name === "Boolean";
        g[
          0
          /* shouldCast */
        ] = D, g[
          1
          /* shouldCastTrue */
        ] = I, (D || Q(g, "default")) && o.push(u);
      }
    }
  const a = [l, o];
  return ie(e) && n.set(e, a), a;
}
function jn(e) {
  return e[0] !== "$" && !Ut(e);
}
const _n = (e) => e === "_" || e === "_ctx" || e === "$stable", wn = (e) => H(e) ? e.map(De) : [De(e)], Ol = (e, t, s) => {
  if (t._n)
    return t;
  const n = al((...i) => wn(t(...i)), s);
  return n._c = !1, n;
}, Qi = (e, t, s) => {
  const n = e._ctx;
  for (const i in e) {
    if (_n(i)) continue;
    const r = e[i];
    if (Z(r))
      t[i] = Ol(i, r, n);
    else if (r != null) {
      const l = wn(r);
      t[i] = () => l;
    }
  }
}, Zi = (e, t) => {
  const s = wn(t);
  e.slots.default = () => s;
}, er = (e, t, s) => {
  for (const n in t)
    (s || !_n(n)) && (e[n] = t[n]);
}, Rl = (e, t, s) => {
  const n = e.slots = Ji();
  if (e.vnode.shapeFlag & 32) {
    const i = t._;
    i ? (er(n, t, s), s && mi(n, "_", i, !0)) : Qi(t, n);
  } else t && Zi(e, t);
}, Pl = (e, t, s) => {
  const { vnode: n, slots: i } = e;
  let r = !0, l = ne;
  if (n.shapeFlag & 32) {
    const o = t._;
    o ? s && o === 1 ? r = !1 : er(i, t, s) : (r = !t.$stable, Qi(t, i)), l = t;
  } else t && (Zi(e, t), l = { default: 1 });
  if (r)
    for (const o in i)
      !_n(o) && l[o] == null && delete i[o];
}, me = Kl;
function Ll(e) {
  return Nl(e);
}
function Nl(e, t) {
  const s = $s();
  s.__VUE__ = !0;
  const {
    insert: n,
    remove: i,
    patchProp: r,
    createElement: l,
    createText: o,
    createComment: a,
    setText: f,
    setElementText: u,
    parentNode: h,
    nextSibling: g,
    setScopeId: m = _t,
    insertStaticContent: D
  } = e, I = (c, d, y, S = null, _ = null, w = null, T = void 0, $ = null, M = !!d.dynamicChildren) => {
    if (c === d)
      return;
    c && !Nt(c, d) && (S = nt(c), Se(c, _, w, !0), c = null), d.patchFlag === -2 && (M = !1, d.dynamicChildren = null), d.dynamicChildren && c && c.dynamicChildren && c.dynamicChildren.hasOnce && (d.dynamicChildren === vt && (d.dynamicChildren = []), d.dynamicChildren.hasOnce = !0);
    const { type: b, ref: v, shapeFlag: p } = d;
    switch (b) {
      case Ps:
        R(c, d, y, S);
        break;
      case Pe:
        O(c, d, y, S);
        break;
      case Ws:
        c == null && A(d, y, S, T);
        break;
      case Y:
        de(
          c,
          d,
          y,
          S,
          _,
          w,
          T,
          $,
          M
        );
        break;
      default:
        p & 1 ? K(
          c,
          d,
          y,
          S,
          _,
          w,
          T,
          $,
          M
        ) : p & 6 ? pe(
          c,
          d,
          y,
          S,
          _,
          w,
          T,
          $,
          M
        ) : (p & 64 || p & 128) && b.process(
          c,
          d,
          y,
          S,
          _,
          w,
          T,
          $,
          M,
          pt
        );
    }
    v != null && _ ? Wt(v, c && c.ref, w, d || c, !d) : v == null && c && c.ref != null && Wt(c.ref, null, w, c, !0);
  }, R = (c, d, y, S) => {
    if (c == null)
      n(
        d.el = o(d.children),
        y,
        S
      );
    else {
      const _ = d.el = c.el;
      d.children !== c.children && f(_, d.children);
    }
  }, O = (c, d, y, S) => {
    c == null ? n(
      d.el = a(d.children || ""),
      y,
      S
    ) : d.el = c.el;
  }, A = (c, d, y, S) => {
    [c.el, c.anchor] = D(
      c.children,
      d,
      y,
      S,
      c.el,
      c.anchor
    );
  }, C = ({ el: c, anchor: d }, y, S) => {
    let _;
    for (; c && c !== d; )
      _ = g(c), n(c, y, S), c = _;
    n(d, y, S);
  }, E = ({ el: c, anchor: d }) => {
    let y;
    for (; c && c !== d; )
      y = g(c), i(c), c = y;
    i(d);
  }, K = (c, d, y, S, _, w, T, $, M) => {
    if (d.type === "svg" ? T = "svg" : d.type === "math" && (T = "mathml"), c == null)
      q(
        d,
        y,
        S,
        _,
        w,
        T,
        $,
        M
      );
    else {
      const b = c.el && c.el._isVueCE ? c.el : null;
      try {
        b && b._beginPatch(), U(
          c,
          d,
          _,
          w,
          T,
          $,
          M
        );
      } finally {
        b && b._endPatch();
      }
    }
  }, q = (c, d, y, S, _, w, T, $) => {
    let M, b;
    const { props: v, shapeFlag: p, transition: x, dirs: N } = c;
    if (M = c.el = l(
      c.type,
      w,
      v && v.is,
      v
    ), p & 8 ? u(M, c.children) : p & 16 && P(
      c.children,
      M,
      null,
      S,
      _,
      Bs(c, w),
      T,
      $
    ), N && gt(c, null, S, "created"), B(M, c, c.scopeId, T, S), v) {
      for (const W in v)
        W !== "value" && !Ut(W) && r(M, W, null, v[W], w, S);
      "value" in v && r(M, "value", null, v.value, w), (b = v.onVnodeBeforeMount) && Ne(b, S, c);
    }
    N && gt(c, null, S, "beforeMount");
    const V = Fl(_, x);
    V ? x.beforeEnter(M) : x && !x.persisted && (M[Dl] = !0), n(M, d, y), ((b = v && v.onVnodeMounted) || V || N) && me(() => {
      b && Ne(b, S, c), V && x.enter(M), N && gt(c, null, S, "mounted");
    }, _);
  }, B = (c, d, y, S, _) => {
    if (y && m(c, y), S)
      for (let w = 0; w < S.length; w++)
        m(c, S[w]);
    if (_) {
      let w = _.subTree;
      if (d === w || nr(w.type) && (w.ssContent === d || w.ssFallback === d)) {
        const T = _.vnode;
        B(
          c,
          T,
          T.scopeId,
          T.slotScopeIds,
          _.parent
        );
      }
    }
  }, P = (c, d, y, S, _, w, T, $, M = 0) => {
    for (let b = M; b < c.length; b++) {
      const v = c[b] = $ ? Je(c[b]) : De(c[b]);
      I(
        null,
        v,
        d,
        y,
        S,
        _,
        w,
        T,
        $
      );
    }
  }, U = (c, d, y, S, _, w, T) => {
    const $ = d.el = c.el;
    let { patchFlag: M, dynamicChildren: b, dirs: v } = d;
    M |= c.patchFlag & 16;
    const p = c.props || ne, x = d.props || ne;
    let N;
    if (y && mt(y, !1), (N = x.onVnodeBeforeUpdate) && Ne(N, y, d, c), v && gt(d, c, y, "beforeUpdate"), y && mt(y, !0), // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    b && (!c.dynamicChildren || c.dynamicChildren.length !== b.length) && (M = 0, T = !1, b = null), (p.innerHTML && x.innerHTML == null || p.textContent && x.textContent == null) && u($, ""), b ? ee(
      c.dynamicChildren,
      b,
      $,
      y,
      S,
      Bs(d, _),
      w
    ) : T || Pt(
      c,
      d,
      $,
      null,
      y,
      S,
      Bs(d, _),
      w,
      !1
    ), M > 0) {
      if (M & 16)
        z($, p, x, y, _);
      else if (M & 2 && p.class !== x.class && r($, "class", null, x.class, _), M & 4 && r($, "style", p.style, x.style, _), M & 8) {
        const V = d.dynamicProps;
        for (let W = 0; W < V.length; W++) {
          const G = V[W], te = p[G], oe = x[G];
          (oe !== te || G === "value") && r($, G, te, oe, _, y);
        }
      }
      M & 1 && c.children !== d.children && u($, d.children);
    } else !T && b == null && z($, p, x, y, _);
    ((N = x.onVnodeUpdated) || v) && me(() => {
      N && Ne(N, y, d, c), v && gt(d, c, y, "updated");
    }, S);
  }, ee = (c, d, y, S, _, w, T) => {
    for (let $ = 0; $ < d.length; $++) {
      const M = c[$], b = d[$], v = M.el || zt(M), p = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        v && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (M.type === Y || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Nt(M, b) || // - In the case of a component, it could contain anything.
        M.shapeFlag & 198) ? h(v) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          y
        )
      );
      I(
        M,
        b,
        p,
        null,
        S,
        _,
        w,
        T,
        !0
      );
    }
  }, z = (c, d, y, S, _) => {
    if (d !== y) {
      if (d !== ne)
        for (const w in d)
          !Ut(w) && !(w in y) && r(
            c,
            w,
            d[w],
            null,
            _,
            S
          );
      for (const w in y) {
        if (Ut(w)) continue;
        const T = y[w], $ = d[w];
        T !== $ && w !== "value" && r(c, w, $, T, _, S);
      }
      "value" in y && r(c, "value", d.value, y.value, _);
    }
  }, de = (c, d, y, S, _, w, T, $, M) => {
    const b = d.el = c ? c.el : o(""), v = d.anchor = c ? c.anchor : o("");
    let { patchFlag: p, dynamicChildren: x, slotScopeIds: N } = d;
    N && ($ = $ ? $.concat(N) : N), c == null ? (n(b, y, S), n(v, y, S), P(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      d.children || [],
      y,
      v,
      _,
      w,
      T,
      $,
      M
    )) : p > 0 && p & 64 && x && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    c.dynamicChildren && c.dynamicChildren.length === x.length ? (ee(
      c.dynamicChildren,
      x,
      y,
      _,
      w,
      T,
      $
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (d.key != null || _ && d === _.subTree) && tr(
      c,
      d,
      !0
      /* shallow */
    )) : Pt(
      c,
      d,
      y,
      v,
      _,
      w,
      T,
      $,
      M
    );
  }, pe = (c, d, y, S, _, w, T, $, M) => {
    d.slotScopeIds = $, c == null ? d.shapeFlag & 512 ? _.ctx.activate(
      d,
      y,
      S,
      T,
      M
    ) : Be(
      d,
      y,
      S,
      _,
      w,
      T,
      M
    ) : ft(c, d, M);
  }, Be = (c, d, y, S, _, w, T) => {
    const $ = c.component = Gl(
      c,
      S,
      _
    );
    if (Vi(c) && ($.ctx.renderer = pt), zl($, !1, T), $.asyncDep) {
      if (_ && _.registerDep(
        $,
        tt,
        T,
        w
      ), !c.el) {
        const M = $.subTree = Te(Pe);
        O(null, M, d, y), c.placeholder = M.el;
      }
    } else
      tt(
        $,
        c,
        d,
        y,
        _,
        w,
        T
      );
  }, ft = (c, d, y) => {
    const S = d.component = c.component;
    if (Ml(c, d, y))
      if (S.asyncDep && !S.asyncResolved) {
        d.el = c.el, d.placeholder = c.placeholder, Rt(S, d, y);
        return;
      } else
        S.next = d, S.update();
    else
      d.el = c.el, d.placeholder = c.placeholder, S.vnode = d;
  }, tt = (c, d, y, S, _, w, T) => {
    const $ = () => {
      if (c.isMounted) {
        let { next: p, bu: x, u: N, parent: V, vnode: W } = c;
        {
          const be = sr(c);
          if (be) {
            p && (p.el = W.el, Rt(c, p, T)), be.asyncDep.then(() => {
              const Ce = () => {
                c.job.flags & 8 || (_ && _.pendingBranch ? me(Ce, _) : b());
              };
              Ce.flags = 48, me(Ce, _);
            });
            return;
          }
        }
        let G = p, te;
        mt(c, !1), p ? (p.el = W.el, Rt(c, p, T)) : p = W, x && hs(x), (te = p.props && p.props.onVnodeBeforeUpdate) && Ne(te, V, p, W), mt(c, !0);
        const oe = Nn(c), ge = c.subTree;
        c.subTree = oe, I(
          ge,
          oe,
          // parent may have changed if it's in a teleport. a root that is a
          // pending async component only has its placeholder comment
          h(
            ge.el || zt(ge)
          ),
          // anchor may have changed if it's in a fragment
          nt(ge),
          c,
          _,
          w
        ), p.el = oe.el, G === null && $l(c, oe.el), N && me(N, _), (te = p.props && p.props.onVnodeUpdated) && me(
          () => Ne(te, V, p, W),
          _
        );
      } else {
        let p;
        const { el: x, props: N } = d, { bm: V, m: W, parent: G, root: te, type: oe } = c, ge = Gt(d);
        mt(c, !1), V && hs(V), !ge && (p = N && N.onVnodeBeforeMount) && Ne(p, G, d), mt(c, !0);
        {
          te.ce && te.ce._hasShadowRoot() && te.ce._injectChildStyle(
            oe,
            c.parent ? c.parent.type : void 0
          );
          const be = c.subTree = Nn(c);
          I(
            null,
            be,
            y,
            S,
            c,
            _,
            w
          ), d.el = be.el;
        }
        if (W && me(W, _), !ge && (p = N && N.onVnodeMounted)) {
          const be = d;
          me(
            () => Ne(p, G, be),
            _
          );
        }
        (d.shapeFlag & 256 || G && Gt(G.vnode) && G.vnode.shapeFlag & 256) && c.a && me(c.a, _), c.isMounted = !0, d = y = S = null;
      }
    };
    c.scope.on();
    const M = c.effect = new _i($);
    c.scope.off();
    const b = c.update = M.run.bind(M), v = c.job = M.runIfDirty.bind(M);
    v.i = c, v.id = c.uid, M.scheduler = () => vn(v), mt(c, !0), b();
  }, Rt = (c, d, y) => {
    d.component = c;
    const S = c.vnode.props;
    c.vnode = d, c.next = null, Al(c, d.props, S, y), Pl(c, d.children, y), Ze(), ji(c), et();
  }, Pt = (c, d, y, S, _, w, T, $, M = !1) => {
    const b = c && c.children, v = c ? c.shapeFlag : 0, p = d.children, { patchFlag: x, shapeFlag: N } = d;
    if (x > 0) {
      if (x & 128) {
        We(
          b,
          p,
          y,
          S,
          _,
          w,
          T,
          $,
          M
        );
        return;
      } else if (x & 256) {
        It(
          b,
          p,
          y,
          S,
          _,
          w,
          T,
          $,
          M
        );
        return;
      }
    }
    N & 8 ? (v & 16 && ht(b, _, w), p !== b && u(y, p)) : v & 16 ? N & 16 ? We(
      b,
      p,
      y,
      S,
      _,
      w,
      T,
      $,
      M
    ) : ht(b, _, w, !0) : (v & 8 && u(y, ""), N & 16 && P(
      p,
      y,
      S,
      _,
      w,
      T,
      $,
      M
    ));
  }, It = (c, d, y, S, _, w, T, $, M) => {
    c = c || vt, d = d || vt;
    const b = c.length, v = d.length, p = Math.min(b, v);
    let x;
    for (x = 0; x < p; x++) {
      const N = d[x] = M ? Je(d[x]) : De(d[x]);
      I(
        c[x],
        N,
        y,
        null,
        _,
        w,
        T,
        $,
        M
      );
    }
    b > v ? ht(
      c,
      _,
      w,
      !0,
      !1,
      p
    ) : P(
      d,
      y,
      S,
      _,
      w,
      T,
      $,
      M,
      p
    );
  }, We = (c, d, y, S, _, w, T, $, M) => {
    let b = 0;
    const v = d.length;
    let p = c.length - 1, x = v - 1;
    for (; b <= p && b <= x; ) {
      const N = c[b], V = d[b] = M ? Je(d[b]) : De(d[b]);
      if (Nt(N, V))
        I(
          N,
          V,
          y,
          null,
          _,
          w,
          T,
          $,
          M
        );
      else
        break;
      b++;
    }
    for (; b <= p && b <= x; ) {
      const N = c[p], V = d[x] = M ? Je(d[x]) : De(d[x]);
      if (Nt(N, V))
        I(
          N,
          V,
          y,
          null,
          _,
          w,
          T,
          $,
          M
        );
      else
        break;
      p--, x--;
    }
    if (b > p) {
      if (b <= x) {
        const N = x + 1, V = N < v ? d[N].el : S;
        for (; b <= x; )
          I(
            null,
            d[b] = M ? Je(d[b]) : De(d[b]),
            y,
            V,
            _,
            w,
            T,
            $,
            M
          ), b++;
      }
    } else if (b > x)
      for (; b <= p; )
        Se(c[b], _, w, !0), b++;
    else {
      const N = b, V = b, W = /* @__PURE__ */ new Map();
      for (b = V; b <= x; b++) {
        const _e = d[b] = M ? Je(d[b]) : De(d[b]);
        _e.key != null && W.set(_e.key, b);
      }
      let G, te = 0;
      const oe = x - V + 1;
      let ge = !1, be = 0;
      const Ce = new Array(oe);
      for (b = 0; b < oe; b++) Ce[b] = 0;
      for (b = N; b <= p; b++) {
        const _e = c[b];
        if (te >= oe) {
          Se(_e, _, w, !0);
          continue;
        }
        let Le;
        if (_e.key != null)
          Le = W.get(_e.key);
        else
          for (G = V; G <= x; G++)
            if (Ce[G - V] === 0 && Nt(_e, d[G])) {
              Le = G;
              break;
            }
        Le === void 0 ? Se(_e, _, w, !0) : (Ce[Le - V] = b + 1, Le >= be ? be = Le : ge = !0, I(
          _e,
          d[Le],
          y,
          null,
          _,
          w,
          T,
          $,
          M
        ), te++);
      }
      const Sn = ge ? jl(Ce) : vt;
      for (G = Sn.length - 1, b = oe - 1; b >= 0; b--) {
        const _e = V + b, Le = d[_e], Cn = d[_e + 1], In = _e + 1 < v ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          Cn.el || zt(Cn)
        ) : S;
        Ce[b] === 0 ? I(
          null,
          Le,
          y,
          In,
          _,
          w,
          T,
          $,
          M
        ) : ge && (G < 0 || b !== Sn[G] ? dt(Le, y, In, 2) : G--);
      }
    }
  }, dt = (c, d, y, S, _ = null) => {
    const { el: w, type: T, transition: $, children: M, shapeFlag: b } = c;
    if (b & 6) {
      dt(c.component.subTree, d, y, S);
      return;
    }
    if (b & 128) {
      c.suspense.move(d, y, S);
      return;
    }
    if (b & 64) {
      T.move(c, d, y, pt);
      return;
    }
    if (T === Y) {
      n(w, d, y);
      for (let p = 0; p < M.length; p++)
        dt(M[p], d, y, S);
      n(c.anchor, d, y);
      return;
    }
    if (T === Ws) {
      C(c, d, y);
      return;
    }
    if (S !== 2 && b & 1 && $)
      if (S === 0)
        $.persisted && !w[Hs] ? n(w, d, y) : ($.beforeEnter(w), n(w, d, y), me(() => $.enter(w), _));
      else {
        const { leave: p, delayLeave: x, afterLeave: N } = $, V = () => {
          c.ctx.isUnmounted ? i(w) : n(w, d, y);
        }, W = () => {
          const G = w._isLeaving || !!w[Hs];
          w._isLeaving && w[Hs](
            !0
            /* cancelled */
          ), $.persisted && !G ? V() : p(w, () => {
            V(), N && N();
          });
        };
        x ? x(w, V, W) : W();
      }
    else
      n(w, d, y);
  }, Se = (c, d, y, S = !1, _ = !1) => {
    const {
      type: w,
      props: T,
      ref: $,
      children: M,
      dynamicChildren: b,
      shapeFlag: v,
      patchFlag: p,
      dirs: x,
      cacheIndex: N,
      memo: V
    } = c;
    if ((p === -2 || b && b.hasOnce) && (_ = !1), $ != null && (Ze(), Wt($, null, y, c, !0), et()), N != null && (!c.ctx || c.ctx === d) && (d.renderCache[N] = void 0), v & 256 && d.ctx.deactivate(c))
      return;
    const W = v & 1 && x, G = !Gt(c);
    let te;
    if (G && (te = T && T.onVnodeBeforeUnmount) && Ne(te, d, c), v & 6)
      rs(c.component, y, S);
    else {
      if (v & 128) {
        c.suspense.unmount(y, S);
        return;
      }
      W && gt(c, null, d, "beforeUnmount"), v & 64 ? c.type.remove(
        c,
        d,
        y,
        pt,
        S
      ) : b && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !b.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (w !== Y || p > 0 && p & 64) ? ht(
        b,
        d,
        y,
        !1,
        !0
      ) : (w === Y && p & 384 || !_ && v & 16) && ht(M, d, y), S && st(c);
    }
    const oe = V != null && N == null;
    (G && (te = T && T.onVnodeUnmounted) || W || oe) && me(() => {
      te && Ne(te, d, c), W && gt(c, null, d, "unmounted"), oe && (c.el = null);
    }, y);
  }, st = (c) => {
    const { type: d, el: y, anchor: S, transition: _ } = c, w = d === Y;
    if (w && !_) {
      is(y, S);
      return;
    }
    if (d === Ws) {
      E(c), _ && !_.persisted && _.afterLeave && _.afterLeave();
      return;
    }
    const T = w ? sn(c) : c, $ = () => {
      w ? h(y) && is(y, S) : i(y), _ && !_.persisted && _.afterLeave && _.afterLeave();
    };
    if (T && T.shapeFlag & 1 && _ && !_.persisted) {
      const { leave: M, delayLeave: b } = _, v = T.el, p = () => M(v, $);
      b ? b(v, $, p) : p();
    } else
      $();
  }, is = (c, d) => {
    let y;
    for (; c !== d; )
      y = g(c), i(c), c = y;
    i(d);
  }, rs = (c, d, y) => {
    const { bum: S, scope: _, job: w, subTree: T, um: $, m: M, a: b } = c;
    Dn(M), Dn(b), S && hs(S), _.stop(), w ? (w.flags |= 8, Se(T, c, d, y)) : T && (T.transition = c.vnode.transition, Se(T, c, d, y)), $ && me($, d);
    const v = () => {
      c.isUnmounted = !0;
    };
    v.flags = 16, me(v, d);
  }, ht = (c, d, y, S = !1, _ = !1, w = 0) => {
    for (let T = w; T < c.length; T++)
      Se(c[T], d, y, S, _);
  }, nt = (c) => {
    if (c.shapeFlag & 6)
      return nt(c.component.subTree);
    if (c.shapeFlag & 128)
      return c.suspense.next();
    const d = g(c.anchor || c.el), y = d && d[pl];
    return y ? g(y) : d;
  }, ls = (c, d, y) => {
    const S = c && d._vnode ? void 0 : c && c.component ? c.component.uid : Wl();
    ol(() => {
      c == null ? d._vnode && Se(d._vnode, null, null, !0) : I(
        d._vnode || null,
        c,
        d,
        null,
        null,
        null,
        y
      ), d._vnode = c;
    }, S);
  }, pt = {
    p: I,
    um: Se,
    m: dt,
    r: st,
    mt: Be,
    mc: P,
    pc: Pt,
    pbc: ee,
    n: nt,
    o: e
  };
  return {
    render: ls,
    hydrate: void 0,
    createApp: wl(ls)
  };
}
function Bs({ type: e, props: t }, s) {
  return s === "svg" && e === "foreignObject" || s === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : s;
}
function mt({ effect: e, job: t }, s) {
  s ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Fl(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function tr(e, t, s = !1) {
  const n = e.children, i = t.children;
  if (H(n) && H(i))
    for (let r = 0; r < n.length; r++) {
      const l = n[r];
      let o = i[r];
      o.shapeFlag & 1 && !o.dynamicChildren && ((o.patchFlag <= 0 || o.patchFlag === 32) && (o = i[r] = Je(i[r]), o.el = l.el), !s && o.patchFlag !== -2 && tr(l, o)), o.type === Ps && (o.patchFlag === -1 && (o = i[r] = Je(o)), o.el = l.el), o.type === Pe && !o.el && (o.el = l.el);
    }
}
function jl(e) {
  const t = e.slice(), s = [0];
  let n, i, r, l, o;
  const a = e.length;
  for (n = 0; n < a; n++) {
    const f = e[n];
    if (f !== 0) {
      if (i = s[s.length - 1], e[i] < f) {
        t[n] = i, s.push(n);
        continue;
      }
      for (r = 0, l = s.length - 1; r < l; )
        o = r + l >> 1, e[s[o]] < f ? r = o + 1 : l = o;
      f < e[s[r]] && (r > 0 && (t[n] = s[r - 1]), s[r] = n);
    }
  }
  for (r = s.length, l = s[r - 1]; r-- > 0; )
    s[r] = l, l = t[l];
  return s;
}
function sr(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : sr(t);
}
function Dn(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function zt(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  if (t)
    return zt(t.subTree);
  const s = e.suspense;
  return s && s.activeBranch ? zt(s.activeBranch) : null;
}
const nr = (e) => e.__isSuspense, Dl = /* @__PURE__ */ Symbol("_deferredEnter");
function Kl(e, t) {
  t && t.pendingBranch ? H(e) ? t.effects.push(...e) : t.effects.push(e) : ll(e);
}
const Y = /* @__PURE__ */ Symbol.for("v-fgt"), Ps = /* @__PURE__ */ Symbol.for("v-txt"), Pe = /* @__PURE__ */ Symbol.for("v-cmt"), Ws = /* @__PURE__ */ Symbol.for("v-stc"), kt = [];
let xe = null;
function L(e = !1) {
  kt.push(xe = e ? null : []);
}
function ir() {
  kt.pop(), xe = kt[kt.length - 1] || null;
}
let Qt = 1;
function Kn(e, t = !1) {
  Qt += e, e < 0 && xe && t && (xe.hasOnce = !0);
}
function rr(e) {
  return e.dynamicChildren = Qt > 0 ? xe || vt : null, ir(), Qt > 0 && xe && xe.push(e), e;
}
function F(e, t, s, n, i, r) {
  return rr(
    k(
      e,
      t,
      s,
      n,
      i,
      r,
      !0
    )
  );
}
function ps(e, t, s, n, i) {
  return rr(
    Te(
      e,
      t,
      s,
      n,
      i,
      !0
    )
  );
}
function xn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Nt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const lr = ({ key: e }) => e ?? null, gs = ({
  ref: e,
  ref_key: t,
  ref_for: s
}) => (typeof e == "number" && (e = "" + e), e != null ? ae(e) || /* @__PURE__ */ ue(e) || Z(e) ? { i: Me, r: e, k: t, f: !!s } : e : null);
function k(e, t = null, s = null, n = 0, i = null, r = e === Y ? 0 : 1, l = !1, o = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && lr(t),
    ref: t && gs(t),
    scopeId: Ui,
    slotScopeIds: null,
    children: s,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: r,
    patchFlag: n,
    dynamicProps: i,
    dynamicChildren: null,
    appContext: null,
    ctx: Me
  };
  return o ? (ws(a, s), r & 128 && e.normalize(a)) : s && (a.shapeFlag |= ae(s) ? 8 : 16), Qt > 0 && // avoid a block node from tracking itself
  !l && // has current parent block
  xe && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || r & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && xe.push(a), a;
}
const Te = Ul;
function Ul(e, t = null, s = null, n = 0, i = null, r = !1) {
  if ((!e || e === vl) && (e = Pe), xn(e)) {
    const o = Et(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return s && ws(o, s), Qt > 0 && !r && xe && (o.shapeFlag & 6 ? xe[xe.indexOf(e)] = o : xe.push(o)), o.patchFlag = -2, o;
  }
  if (Ql(e) && (e = e.__vccOpts), t) {
    t = Hl(t);
    let { class: o, style: a } = t;
    o && !ae(o) && (t.class = lt(o)), ie(a) && (/* @__PURE__ */ yn(a) && !H(a) && (a = ke({}, a)), t.style = wt(a));
  }
  const l = ae(e) ? 1 : nr(e) ? 128 : Es(e) ? 64 : ie(e) ? 4 : Z(e) ? 2 : 0;
  return k(
    e,
    t,
    s,
    n,
    i,
    l,
    r,
    !0
  );
}
function Hl(e) {
  return e ? /* @__PURE__ */ yn(e) ? ke({}, e) : Yi(e) ? ke({}, e[ur] || e) : e : null;
}
function Et(e, t, s = !1, n = !1) {
  const { props: i, ref: r, patchFlag: l, children: o, transition: a } = e, f = t ? Vl(i || {}, t) : i, u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: f,
    key: f && lr(f),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      s && r ? H(r) ? r.concat(gs(t)) : [r, gs(t)] : gs(t)
    ) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: o,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== Y ? l === -1 ? 16 : l | 16 : l,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: a,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Et(e.ssContent),
    ssFallback: e.ssFallback && Et(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce,
    cacheIndex: e.cacheIndex
  };
  return a && n && Bt(
    u,
    a.clone(u)
  ), u;
}
function we(e = " ", t = 0) {
  return Te(Ps, null, e, t);
}
function re(e = "", t = !1) {
  return t ? (L(), ps(Pe, null, e)) : Te(Pe, null, e);
}
function De(e) {
  return e == null || typeof e == "boolean" ? Te(Pe) : H(e) ? Te(
    Y,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : xn(e) ? Je(e) : Te(Ps, null, String(e));
}
function Je(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Et(e);
}
function ws(e, t) {
  let s = 0;
  const { shapeFlag: n } = e;
  if (t == null)
    t = null;
  else if (H(t))
    s = 16;
  else if (typeof t == "object")
    if (n & 65) {
      const i = t.default;
      i && (i._c && (i._d = !1), ws(e, i()), i._c && (i._d = !0));
      return;
    } else {
      s = 32;
      const i = t._;
      !i && !Yi(t) ? t._ctx = Me : i === 3 && Me && (Me.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else if (Z(t)) {
    if (n & 65) {
      ws(e, { default: t });
      return;
    }
    t = { default: t, _ctx: Me }, s = 32;
  } else
    t = String(t), n & 64 ? (s = 16, t = [we(t)]) : s = 8;
  e.children = t, e.shapeFlag |= s;
}
function Vl(...e) {
  const t = {};
  for (let s = 0; s < e.length; s++) {
    const n = e[s];
    for (const i in n)
      if (i === "class")
        t.class !== n.class && (t.class = lt([t.class, n.class]));
      else if (i === "style")
        t.style = wt([t.style, n.style]);
      else if (Cs(i)) {
        const r = t[i], l = n[i];
        l && r !== l && !(H(r) && r.includes(l)) ? t[i] = r ? [].concat(r, l) : l : l == null && r == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !Is(i) && (t[i] = l);
      } else i !== "" && (t[i] = n[i]);
  }
  return t;
}
function Ne(e, t, s, n = null) {
  Ve(e, t, 7, [
    s,
    n
  ]);
}
const Bl = /* @__PURE__ */ Wi();
let or = 0;
function Wl() {
  return or;
}
function Gl(e, t, s) {
  const n = e.type, i = (t ? t.appContext : e.appContext) || Bl, r = {
    uid: or++,
    vnode: e,
    type: n,
    parent: t,
    appContext: i,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new Er(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(i.provides),
    ids: t ? t.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: El(n, i),
    emitsOptions: Sl(n, i),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: ne,
    // inheritAttrs
    inheritAttrs: n.inheritAttrs,
    // state
    ctx: ne,
    data: ne,
    props: ne,
    attrs: ne,
    slots: ne,
    refs: ne,
    setupState: ne,
    setupContext: null,
    // suspense related
    suspense: s,
    suspenseId: s ? s.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return r.ctx = { _: r }, r.root = t ? t.root : r, r.emit = kl.bind(null, r), e.ce && e.ce(r), r;
}
let ut = null;
const ql = () => ut || Me;
let xs, Zt;
{
  const e = $s(), t = (s, n) => {
    let i;
    return (i = e[s]) || (i = e[s] = []), i.push(n), (r) => {
      i.length > 1 ? i.forEach((l) => l(r)) : i[0](r);
    };
  };
  xs = t(
    "__VUE_INSTANCE_SETTERS__",
    (s) => ut = s
  ), Zt = t(
    "__VUE_SSR_SETTERS__",
    (s) => es = s
  );
}
const kn = (e) => {
  const t = ut;
  return xs(e), e.scope.on(), () => {
    e.scope.off(), xs(t);
  };
}, Un = () => {
  ut && ut.scope.off(), xs(null);
};
function ar(e) {
  return e.vnode.shapeFlag & 4;
}
let es = !1;
function zl(e, t = !1, s = !1) {
  t && Zt(t);
  const { props: n, children: i } = e.vnode, r = ar(e);
  Tl(e, n, r, t), Rl(e, i, s || t);
  const l = r ? Jl(e, t) : void 0;
  return t && Zt(!1), l;
}
function Jl(e, t) {
  const s = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, bl);
  const { setup: n } = s;
  if (n) {
    Ze();
    const i = e.setupContext = n.length > 1 ? Xl(e) : null, r = kn(e), l = ss(
      n,
      e,
      0,
      [
        e.props,
        i
      ]
    ), o = di(l);
    if (et(), r(), (o || e.sp) && !Gt(e) && ml(e), o) {
      if (l.then(Un, Un), t)
        return l.then((a) => {
          Zt(!0);
          try {
            Hn(e, a, t);
          } finally {
            Zt(!1);
          }
        }).catch((a) => {
          As(a, e, 0, void 0, !0), e.ssrRender = (f, u) => u("<!---->");
        });
      e.asyncDep = l;
    } else
      Hn(e, l);
  } else
    cr(e);
}
function Hn(e, t, s) {
  Z(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : ie(t) && (e.setupState = Li(t)), cr(e);
}
function cr(e, t, s) {
  const n = e.type;
  e.render || (e.render = n.render || _t);
}
const ur = /* @__PURE__ */ Symbol(), Yl = {
  get(e, t) {
    return he(e, "get", ""), t === ur ? e : e[t];
  }
};
function Xl(e) {
  const t = (s) => {
    e.exposed = s || {};
  };
  return {
    attrs: new Proxy(e.attrs, Yl),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Ls(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Li(Yr(e.exposed)), {
    get(t, s) {
      if (s in t)
        return t[s];
      if (s in qt)
        return qt[s](e);
    },
    has(t, s) {
      return s in t || s in qt;
    }
  })) : e.proxy;
}
function Ql(e) {
  return Z(e) && "__vccOpts" in e;
}
const le = (e, t) => /* @__PURE__ */ tl(e, t, es), Zl = "3.5.45";
let ln;
const Vn = typeof window < "u" && window.trustedTypes;
if (Vn)
  try {
    ln = /* @__PURE__ */ Vn.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const fr = ln ? (e) => ln.createHTML(e) : (e) => e, eo = "http://www.w3.org/2000/svg", to = "http://www.w3.org/1998/Math/MathML", ze = typeof document < "u" ? document : null, Bn = ze && /* @__PURE__ */ ze.createElement("template"), so = {
  insert: (e, t, s) => {
    t.insertBefore(e, s || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, s, n) => {
    const i = t === "svg" ? ze.createElementNS(eo, e) : t === "mathml" ? ze.createElementNS(to, e) : s ? ze.createElement(e, { is: s }) : ze.createElement(e);
    return e === "select" && n && n.multiple != null && i.setAttribute("multiple", n.multiple), i;
  },
  createText: (e) => ze.createTextNode(e),
  createComment: (e) => ze.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => ze.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, s, n, i, r) {
    const l = s ? s.previousSibling : t.lastChild;
    if (i && (i === r || i.nextSibling))
      for (; t.insertBefore(i.cloneNode(!0), s), !(i === r || !(i = i.nextSibling)); )
        ;
    else {
      Bn.innerHTML = fr(
        n === "svg" ? `<svg>${e}</svg>` : n === "mathml" ? `<math>${e}</math>` : e
      );
      const o = Bn.content;
      if (n === "svg" || n === "mathml") {
        const a = o.firstChild;
        for (; a.firstChild; )
          o.appendChild(a.firstChild);
        o.removeChild(a);
      }
      t.insertBefore(o, s);
    }
    return [
      // first
      l ? l.nextSibling : t.firstChild,
      // last
      s ? s.previousSibling : t.lastChild
    ];
  }
}, no = /* @__PURE__ */ Symbol("_vtc");
function io(e, t, s) {
  const n = e[no];
  n && (t = (t ? [t, ...n] : [...n]).join(" ")), t == null ? e.removeAttribute("class") : s ? e.setAttribute("class", t) : e.className = t;
}
const Wn = /* @__PURE__ */ Symbol("_vod"), ro = /* @__PURE__ */ Symbol("_vsh"), lo = /* @__PURE__ */ Symbol(""), oo = /(?:^|;)\s*display\s*:/;
function ao(e, t, s) {
  const n = e.style, i = ae(s);
  let r = !1;
  if (s && !i) {
    if (t)
      if (ae(t))
        for (const l of t.split(";")) {
          const o = l.slice(0, l.indexOf(":")).trim();
          s[o] == null && jt(n, o, "");
        }
      else
        for (const l in t)
          s[l] == null && jt(n, l, "");
    for (const l in s) {
      l === "display" && (r = !0);
      const o = s[l];
      o != null ? uo(
        e,
        l,
        !ae(t) && t ? t[l] : void 0,
        o
      ) || jt(n, l, o) : jt(n, l, "");
    }
  } else if (i) {
    if (t !== s) {
      const l = n[lo];
      l && (s += ";" + l), n.cssText = s, r = oo.test(s);
    }
  } else t && e.removeAttribute("style");
  Wn in e && ((!i || t !== s) && (e[Wn] = r ? n.display : ""), e[ro] && (n.display = "none"));
}
const fs = /\s*!important$/;
function jt(e, t, s) {
  if (H(s))
    s.forEach((n) => jt(e, t, n));
  else if (s == null && (s = ""), t.startsWith("--"))
    fs.test(s) ? e.setProperty(t, s.replace(fs, ""), "important") : e.setProperty(t, s);
  else {
    const n = co(e, t);
    fs.test(s) ? e.setProperty(
      Ct(n),
      s.replace(fs, ""),
      "important"
    ) : e[n] = s;
  }
}
const Gn = ["Webkit", "Moz", "ms"], Gs = {};
function co(e, t) {
  const s = Gs[t];
  if (s)
    return s;
  let n = Oe(t);
  if (n !== "filter" && n in e)
    return Gs[t] = n;
  n = gi(n);
  for (let i = 0; i < Gn.length; i++) {
    const r = Gn[i] + n;
    if (r in e)
      return Gs[t] = r;
  }
  return t;
}
function uo(e, t, s, n) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && ae(n) && s === n;
}
const qn = "http://www.w3.org/1999/xlink";
function zn(e, t, s, n, i, r = Mr(t)) {
  n && t.startsWith("xlink:") ? s == null ? e.removeAttributeNS(qn, t.slice(6, t.length)) : e.setAttributeNS(qn, t, s) : s == null || r && !yi(s) ? e.removeAttribute(t) : e.setAttribute(
    t,
    r ? "" : Ue(s) ? String(s) : s
  );
}
function Jn(e, t, s, n, i) {
  if (t === "innerHTML" || t === "textContent") {
    s != null && (e[t] = t === "innerHTML" ? fr(s) : s);
    return;
  }
  const r = e.tagName;
  if (t === "value" && r !== "PROGRESS" && // custom elements may use _value internally
  !r.includes("-")) {
    const o = r === "OPTION" ? e.getAttribute("value") || "" : e.value, a = s == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(s);
    (o !== a || !("_value" in e)) && (e.value = a), s == null && e.removeAttribute(t), e._value = s;
    return;
  }
  let l = !1;
  if (s === "" || s == null) {
    const o = typeof e[t];
    o === "boolean" ? s = yi(s) : s == null && o === "string" ? (s = "", l = !0) : o === "number" && (s = 0, l = !0);
  }
  try {
    e[t] = s;
  } catch {
  }
  l && e.removeAttribute(i || t);
}
function dr(e, t, s, n) {
  e.addEventListener(t, s, n);
}
function fo(e, t, s, n) {
  e.removeEventListener(t, s, n);
}
const Yn = /* @__PURE__ */ Symbol("_vei");
function ho(e, t, s, n, i = null) {
  const r = e[Yn] || (e[Yn] = {}), l = r[t];
  if (n && l)
    l.value = n;
  else {
    const [o, a] = mo(t);
    if (n) {
      const f = r[t] = bo(
        n,
        i
      );
      dr(e, o, f, a);
    } else l && (fo(e, o, l, a), r[t] = void 0);
  }
}
const po = /(Once|Passive|Capture)$/, go = /^on:?(?:Once|Passive|Capture)$/;
function mo(e) {
  let t, s;
  for (; (s = e.match(po)) && !go.test(e); )
    t || (t = {}), e = e.slice(0, e.length - s[1].length), t[s[1].toLowerCase()] = !0;
  return [e[2] === ":" ? e.slice(3) : Ct(e.slice(2)), t];
}
let qs = 0;
const yo = /* @__PURE__ */ Promise.resolve(), vo = () => qs || (yo.then(() => qs = 0), qs = Date.now());
function bo(e, t) {
  const s = (n) => {
    if (!n._vts)
      n._vts = Date.now();
    else if (n._vts <= s.attached)
      return;
    const i = s.value;
    if (H(i)) {
      const r = n.stopImmediatePropagation;
      n.stopImmediatePropagation = () => {
        r.call(n), n._stopped = !0;
      };
      const l = i.slice(), o = [n];
      for (let a = 0; a < l.length && !n._stopped; a++) {
        const f = l[a];
        f && Ve(
          f,
          t,
          5,
          o
        );
      }
    } else
      Ve(
        i,
        t,
        5,
        [n]
      );
  };
  return s.value = e, s.attached = vo(), s;
}
const Xn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, _o = (e, t, s, n, i, r) => {
  const l = i === "svg";
  t === "class" ? io(e, n, l) : t === "style" ? ao(e, s, n) : Cs(t) ? Is(t) || ho(e, t, s, n, r) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : wo(e, t, n, l)) ? (Jn(e, t, n), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && zn(e, t, n, l, r, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (xo(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !ae(n))) ? Jn(e, Oe(t), n, r, t) : (t === "true-value" ? e._trueValue = n : t === "false-value" && (e._falseValue = n), zn(e, t, n, l));
};
function wo(e, t, s, n) {
  if (n)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Xn(t) && Z(s));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const i = e.tagName;
    if (i === "IMG" || i === "VIDEO" || i === "CANVAS" || i === "SOURCE")
      return !1;
  }
  return Xn(t) && ae(s) ? !1 : t in e;
}
function xo(e, t) {
  const s = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!s)
    return !1;
  const n = Oe(t);
  return Array.isArray(s) ? s.some((i) => Oe(i) === n) : Object.keys(s).some((i) => Oe(i) === n);
}
const Qn = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return H(t) ? (s) => hs(t, s) : t;
}, zs = /* @__PURE__ */ Symbol("_assign"), ko = {
  // <select multiple> value need to be deep traversed
  deep: !0,
  created(e, { value: t, modifiers: { number: s } }, n) {
    e._modelValue = t, dr(e, "change", () => {
      const i = Array.prototype.filter.call(e.options, (a) => a.selected).map(
        (a) => s ? un(ks(a)) : ks(a)
      ), r = e.multiple, l = r ? St(e._modelValue) ? new Set(i) : i : i[0], o = e._pendingValue = [
        r,
        r ? H(l) ? i.slice() : i : l
      ];
      try {
        e[zs](l);
      } finally {
        Tt(() => {
          e._pendingValue === o && (e._pendingValue = void 0);
        });
      }
    }), e[zs] = Qn(n);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(e, { value: t, modifiers: { number: s } }) {
    Zn(e, t, s);
  },
  beforeUpdate(e, { value: t }, s) {
    e._modelValue = t, e[zs] = Qn(s);
  },
  updated(e, { value: t, modifiers: { number: s } }) {
    const n = e._pendingValue;
    e._pendingValue = void 0, (!n || n[0] !== e.multiple || !So(t, n[1], n[0])) && Zn(e, t, s);
  }
};
function So(e, t, s) {
  if (!s || H(e)) return at(e, t);
  if (St(e)) {
    if (e.size !== t.length) return !1;
    for (const n of t)
      if (!e.has(n)) return !1;
    return !0;
  }
  return !1;
}
function Zn(e, t, s = !1) {
  const n = e.multiple, i = H(t);
  if (!(n && !i && !St(t))) {
    for (let r = 0, l = e.options.length; r < l; r++) {
      const o = e.options[r], a = ks(o);
      if (n)
        if (i) {
          const f = typeof a;
          f === "string" || f === "number" ? o.selected = t.some((u) => String(u) === String(a)) : o.selected = Ar(t, a) > -1;
        } else
          o.selected = t.has(a) || s && typeof a == "string" && t.has(un(a));
      else if (at(ks(o), t)) {
        e.selectedIndex !== r && (e.selectedIndex = r);
        return;
      }
    }
    !n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
  }
}
function ks(e) {
  return "_value" in e ? e._value : e.value;
}
const Co = ["ctrl", "shift", "alt", "meta"], Io = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, t) => Co.some((s) => e[`${s}Key`] && !t.includes(s))
}, hr = (e, t) => {
  if (!e) return e;
  const s = e._withMods || (e._withMods = {}), n = t.join(".");
  return s[n] || (s[n] = ((i, ...r) => {
    for (let l = 0; l < t.length; l++) {
      const o = Io[t[l]];
      if (o && o(i, t)) return;
    }
    return e(i, ...r);
  }));
}, Mo = /* @__PURE__ */ ke({ patchProp: _o }, so);
let ei;
function $o() {
  return ei || (ei = Ll(Mo));
}
const To = ((...e) => {
  const t = $o().createApp(...e), { mount: s } = t;
  return t.mount = (n) => {
    const i = Eo(n);
    if (!i) return;
    const r = t._component;
    !Z(r) && !r.render && !r.template && (r.template = i.innerHTML), i.nodeType === 1 && (i.textContent = "");
    const l = s(i, !1, Ao(i));
    return i instanceof Element && (i.removeAttribute("v-cloak"), i.setAttribute("data-v-app", "")), l;
  }, t;
});
function Ao(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Eo(e) {
  return ae(e) ? document.querySelector(e) : e;
}
const Ss = () => ({ scale: 1, x: 0, y: 0 });
function Oo() {
  return {
    open: !1,
    folderId: "",
    images: [],
    records: /* @__PURE__ */ new Map(),
    checked: /* @__PURE__ */ new Set(),
    unavailable: /* @__PURE__ */ new Set(),
    mode: "grid",
    currentId: null,
    leftId: null,
    rightId: null,
    scope: "folder",
    promptIds: /* @__PURE__ */ new Set(),
    panel: !1,
    manualMatches: {},
    linked: !0,
    transforms: { left: Ss(), right: Ss() }
  };
}
function ti(e, t, s = !1) {
  const n = /* @__PURE__ */ new Set([
    ...t.map((r) => r.id),
    ...e.checked,
    e.currentId,
    e.leftId,
    e.rightId
  ]);
  for (const r of [...e.images, ...t])
    n.has(r.id) && e.records.set(r.id, r);
  for (const r of e.records.keys()) n.has(r) || e.records.delete(r);
  const i = new Set(t.map((r) => r.id));
  for (const r of e.records.keys())
    i.has(r) ? e.unavailable.delete(r) : s && e.unavailable.add(r);
  for (const r of e.unavailable) n.has(r) || e.unavailable.delete(r);
  e.images = t;
}
function Dt(e) {
  return e.images.filter(
    (t) => t.id !== e.leftId && (e.scope === "folder" || (e.scope === "checked" ? e.checked : e.promptIds).has(t.id))
  );
}
function Js(e, t) {
  const s = e.mode === "single" ? e.images : Dt(e), n = e.mode === "single" ? "currentId" : "rightId", r = s.findIndex((l) => l.id === e[n]) + t;
  r >= 0 && r < s.length && (e[n] = s[r].id);
}
function Ro(e) {
  e.open = !1, e.checked.clear(), e.unavailable.clear(), e.currentId = null, e.leftId = null, e.rightId = null, e.manualMatches = {}, e.panel = !1, e.mode = "grid", e.scope = "folder", e.promptIds.clear(), e.transforms = { left: Ss(), right: Ss() }, e.records.clear(), e.images = [];
}
function Po(e, t) {
  e.linked = t, t && (e.transforms.right = { ...e.transforms.left });
}
function Ft(e, t, s) {
  e.transforms[t] = { ...s }, e.linked && (e.transforms[t === "left" ? "right" : "left"] = { ...s });
}
function Lo(e, t, s, n, i) {
  const r = Math.max(1, Math.floor(t / i)), l = Math.max(0, Math.floor(n / i) - 2), o = Math.min(
    Math.ceil(e / r),
    Math.ceil((n + s) / i) + 2
  );
  return {
    columns: r,
    start: l * r,
    end: Math.min(e, o * r),
    offset: l * i,
    totalHeight: Math.ceil(e / r) * i
  };
}
function pr(e, t, s, n, i, r) {
  const l = Math.max(1, Math.floor(n / i)), o = Math.floor(s / i) * l, a = e[o]?.id, f = t.findIndex((u) => u.id === a);
  return f < 0 ? s : Math.floor(f / Math.max(1, Math.floor(n / r))) * r + Math.min(s % i, r - 1);
}
function No(e, t, s, n) {
  return s < t ? s : s + n > t + e ? Math.max(0, s + n - e) : t;
}
class Fo {
  constructor(t, s, n = () => {
  }) {
    this.api = t, this.session = s, this.changed = n;
  }
  api;
  session;
  changed;
  epoch = 0;
  abort = new AbortController();
  working = !1;
  cursor = null;
  error = "";
  loading = !1;
  version = "";
  async selectFolder(t) {
    this.abort.abort(), this.abort = new AbortController(), this.epoch++, this.working = !1, this.session.folderId = t, this.session.images = [], this.session.records.clear(), this.session.checked.clear(), this.session.unavailable.clear(), this.session.currentId = null, this.session.leftId = null, this.session.rightId = null, this.session.mode = "grid", this.session.panel = !1, this.session.manualMatches = {}, this.session.scope = "folder", this.session.promptIds.clear(), this.cursor = null, this.error = "", await this.refresh();
  }
  async refresh() {
    if (this.working || !this.session.folderId) return;
    this.working = !0, this.loading = !0, this.changed();
    const t = this.epoch;
    try {
      const s = Math.max(1, this.session.images.length), n = [];
      let i = null;
      do {
        const r = await this.api.images(
          this.session.folderId,
          i,
          this.abort.signal
        );
        if (t !== this.epoch) return;
        n.push(...r.images), i = r.next_cursor, this.version = r.version;
      } while (i && n.length < s);
      ti(this.session, n, i === null), this.cursor = i, this.error = "";
    } catch (s) {
      t === this.epoch && !this.abort.signal.aborted && (this.error = s instanceof Error ? s.message : "Could not load images");
    } finally {
      t === this.epoch && (this.working = !1, this.loading = !1, this.changed());
    }
  }
  async loadMore() {
    if (this.working || !this.cursor) return;
    this.working = !0, this.loading = !0, this.changed();
    const t = this.epoch;
    try {
      const s = await this.api.images(
        this.session.folderId,
        this.cursor,
        this.abort.signal
      );
      if (t !== this.epoch) return;
      const n = new Set(this.session.images.map((i) => i.id));
      ti(this.session, [
        ...this.session.images,
        ...s.images.filter((i) => !n.has(i.id))
      ]), this.cursor = s.next_cursor, this.error = "";
    } catch (s) {
      t === this.epoch && !this.abort.signal.aborted && (this.error = s instanceof Error ? s.message : "Could not load more images");
    } finally {
      t === this.epoch && (this.working = !1, this.loading = !1, this.changed());
    }
  }
  dispose() {
    this.epoch++, this.abort.abort();
  }
}
const gr = ["prompt", "workflow"], si = 500, jo = 5e3, Do = 1e3, Ko = /* @__PURE__ */ new Set(["seed", "noise_seed", "random_seed"]), Uo = /* @__PURE__ */ new Set(["ckpt_name", "checkpoint_name", "model_name", "unet_name", "diffusion_model_name"]), ni = {
  CLIPTextEncode: ["text"],
  CLIPTextEncodeSDXL: ["text_g", "text_l"],
  CLIPTextEncodeSDXLRefiner: ["text"]
};
function ce(e) {
  return e !== null && typeof e == "object" && !Array.isArray(e);
}
function Ye(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function Kt(e) {
  return Ye(ni, e) ? ni[e] : void 0;
}
function Ho(e) {
  return typeof e == "string" ? e.trim().length > 0 : typeof e == "number" && Number.isSafeInteger(e);
}
function on(e) {
  if (!ce(e) || Object.keys(e).length !== 1 || typeof e.__shiba_number__ != "string" || !/^-?(?:0|[1-9]\d*)$/.test(e.__shiba_number__)) return;
  const t = e.__shiba_number__, s = BigInt(t);
  return s > BigInt(Number.MAX_SAFE_INTEGER) || s < BigInt(Number.MIN_SAFE_INTEGER) ? t : void 0;
}
function Vo(e) {
  const t = [e];
  for (; t.length; ) {
    const s = t.pop();
    if (typeof s == "number" && (!Number.isFinite(s) || Number.isInteger(s) && !Number.isSafeInteger(s))) return !0;
    if (Array.isArray(s)) for (const n of s) t.push(n);
    else if (ce(s)) for (const n of Object.values(s)) t.push(n);
  }
  return !1;
}
function ds(e, t, s, n = !1) {
  const i = Kt(e)?.includes(t) === !0 && typeof s == "string", r = n ? "reference" : i ? "prompt" : Uo.has(t) && typeof s == "string" ? "model" : t === "lora_name" && typeof s == "string" ? "lora-name" : /lora/i.test(e) && ["strength_model", "strength_clip", "strength", "lora_strength"].includes(t) ? "lora-strength" : "value";
  return { key: t, label: t, value: s, kind: r, promptText: i };
}
function Ot(e, t) {
  if (Object.is(e, t)) return !0;
  if (Array.isArray(e) && Array.isArray(t))
    return e.length === t.length && e.every((s, n) => Ot(s, t[n]));
  if (ce(e) && ce(t)) {
    const s = Object.keys(e);
    return s.length === Object.keys(t).length && s.every((n) => Ye(t, n) && Ot(e[n], t[n]));
  }
  return !1;
}
function ii(e, t, s) {
  if (t == null) return { state: "missing", nodes: [] };
  if (!ce(t) || e === "workflow" && !Array.isArray(t.nodes))
    return s.push(`${e}: 保存形式を解析できません。`), { state: "invalid", nodes: [] };
  const n = e === "prompt" ? Object.entries(t) : t.nodes.map((a, f) => [ce(a) && (typeof a.id == "string" || typeof a.id == "number") ? String(a.id) : `不明[${f}]`, a]), i = [];
  let r = n.length > si;
  r && s.push(`${e}: ノード数が表示上限を超えています。一部のみ比較します。元 JSON は保持しています。`);
  let l = 0;
  const o = /* @__PURE__ */ new Set();
  for (const [a, f] of n.slice(0, si)) {
    const u = ce(f) ? f[e === "prompt" ? "class_type" : "type"] : void 0;
    if (!ce(f) || typeof u != "string" || !u || o.has(a) || e === "workflow" && !Ho(f.id)) {
      s.push(`${e}: ノード ${a} の形式が不正、または ID が重複しています。`), r = !0;
      continue;
    }
    o.add(a);
    const h = e === "prompt" && ce(f._meta) && typeof f._meta.title == "string" ? f._meta.title : typeof f.title == "string" ? f.title : "", g = [];
    let m = !0;
    if (e === "prompt")
      if (!ce(f.inputs)) m = !1;
      else
        for (const [R, O] of Object.entries(f.inputs)) {
          const A = Array.isArray(O) && O.length === 2 && typeof O[0] == "string" && Number.isInteger(O[1]) && O[1] >= 0 && Ye(t, O[0]);
          g.push(ds(u, R, O, A));
        }
    else {
      if (Array.isArray(f.widgets_values))
        f.widgets_values.forEach((R, O) => g.push({ key: `widgets_values[${O}]`, label: `保存値[${O}]（名称不明）`, value: R, kind: "value", promptText: !1 }));
      else if (ce(f.widgets_values))
        for (const [R, O] of Object.entries(f.widgets_values)) {
          const A = ds(u, R, O);
          g.push({ ...A, key: `widgets_values.${R}` });
        }
      else f.widgets_values != null && (m = !1);
      if (ce(f.inputs))
        for (const [R, O] of Object.entries(f.inputs)) g.push(ds(u, R, O));
      else if (Array.isArray(f.inputs))
        for (const [R, O] of f.inputs.entries()) {
          if (!ce(O)) {
            m = !1;
            continue;
          }
          const A = typeof O.name == "string" ? O.name : `入力[${R}]（名称不明）`;
          if (Ye(O, "value") && g.push(ds(u, A, O.value)), O.link != null) {
            const C = Array.isArray(t.links) ? t.links.find((K) => Array.isArray(K) ? K[0] === O.link : ce(K) && K.id === O.link) : void 0, E = Array.isArray(C) ? [String(C[1]), C[2]] : ce(C) && Ye(C, "origin_id") ? [String(C.origin_id), C.origin_slot] : { link_id: O.link };
            C || (m = !1), g.push({ key: `inputs.${A}`, label: A, value: E, kind: "reference", promptText: !1 });
          }
        }
      else f.inputs != null && (m = !1);
      Ye(f, "mode") && g.push({ key: "mode", label: "保存された実行モード", value: f.mode, kind: "value", promptText: !1 }), !Ye(f, "widgets_values") && !Ye(f, "inputs") && (m = !1);
    }
    const D = g.filter((R) => !Ko.has(R.key.replace(/^(?:widgets_values|inputs)\./, ""))), I = D.slice(0, Math.max(0, jo - l));
    l += I.length, I.length < D.length && (m = !1, s.push(`${e}: 保存項目数が表示上限を超えています。元 JSON は保持しています。`)), I.some((R) => Vo(R.value)) && (m = !1, s.push(`${e}: ノード ${a} の数値がブラウザーの正確な整数精度を超えています。値の一致や正確なコピーを保証できません。`)), m || (r = !0, s.push(`${e}: ノード ${a} (${u}) の一部情報を正確に確認できません。`)), i.push({ key: `${e}:${a}`, id: a, type: u, title: h, source: e, fields: I, complete: m });
  }
  return i.length === 0 ? (s.push(`${e}: 比較できる保存ノードがありません。`), { state: n.length ? "invalid" : "partial", nodes: i }) : { state: r ? "partial" : "ok", nodes: i };
}
function ri(e) {
  const t = Array.isArray(e.warnings) ? e.warnings.filter((o) => typeof o == "string") : [], s = ii("prompt", e.prompt, t), n = ii("workflow", e.workflow, t), i = [...s.nodes, ...n.nodes];
  for (const o of s.nodes) {
    const a = n.nodes.find((f) => f.id === o.id && f.type === o.type);
    if (a)
      for (const f of o.fields) {
        const u = a.fields.find((h) => h.key === f.key || h.key === `widgets_values.${f.key}`);
        u && !Ot(f.value, u.value) && t.push(`ノード ${o.id} / ${f.label}: prompt と workflow の保存値が異なります。情報源を分けて表示します。`);
      }
  }
  const r = [s.state, n.state];
  let l = r.every((o) => o === "missing") ? "missing" : i.length === 0 && r.includes("invalid") ? "invalid" : r.includes("invalid") || r.includes("partial") ? "partial" : "ok";
  return ["invalid", "unsupported"].includes(e.status) ? l = i.length ? "partial" : "invalid" : e.status === "partial" && (l = "partial"), l === "missing" && t.push("設定情報なし。保存された生成条件の一致は確認できません。"), l === "invalid" && t.push("保存データを解析できません。画像の比較は継続できます。"), { status: l, nodes: i, warnings: [...new Set(t)], raw: { prompt: e.prompt, workflow: e.workflow }, rawText: { prompt: typeof e.raw_prompt == "string" ? e.raw_prompt : null, workflow: typeof e.raw_workflow == "string" ? e.raw_workflow : null }, sources: { prompt: s.state, workflow: n.state } };
}
function li(e) {
  return [...new Set(e.nodes.flatMap((t) => t.fields.filter((s) => s.kind === "model" && typeof s.value == "string").map((s) => s.value)))];
}
function mr(e, t, s, n) {
  const i = [], r = /* @__PURE__ */ new Set(), l = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Set(), a = new Map(t.map((h) => [h.key, h])), f = Object.values(s).filter((h) => h !== null);
  for (const h of Object.keys(s))
    e.some((g) => g.key === h) || (o.add(h), n.push(`${h}: 手動対応の左ノードが現在の画像にありません。対応を選び直してください。`));
  for (const h of e) {
    if (!Ye(s, h.key)) continue;
    const g = s[h.key];
    if (g === null) {
      o.add(h.key);
      continue;
    }
    const m = a.get(g);
    if (!m || m.source !== h.source || f.filter((D) => D === g).length > 1) {
      o.add(h.key), n.push(`${h.key}: 手動対応が不正、または右ノードが重複しています。対応を選び直してください。`);
      continue;
    }
    i.push({ leftKey: h.key, rightKey: m.key, reason: "manual" }), r.add(h.key), l.add(m.key);
  }
  function u(h, g, m) {
    i.push({ leftKey: h.key, rightKey: g.key, reason: m }), r.add(h.key), l.add(g.key);
  }
  for (const h of gr) {
    const g = e.filter((I) => I.source === h), m = t.filter((I) => I.source === h);
    if (g.length === m.length && g.every((I) => m.some((R) => R.id === I.id && R.type === I.type)))
      for (const I of g) {
        const R = m.find((O) => O.id === I.id && O.type === I.type);
        R && !r.has(I.key) && !o.has(I.key) && !l.has(R.key) && u(I, R, "id-type");
      }
    for (const I of g) {
      if (r.has(I.key) || o.has(I.key)) continue;
      const R = m.filter((A) => A.type === I.type && !l.has(A.key)), O = g.filter((A) => A.type === I.type && !r.has(A.key));
      if (R.length === 1 && O.length === 1) u(I, R[0], "type");
      else if (I.title) {
        const A = R.filter((C) => C.title === I.title);
        A.length === 1 && O.filter((C) => C.title === I.title).length === 1 && u(I, A[0], "type-title");
      }
    }
  }
  return { matches: i, blocked: o };
}
function Bo(e, t, s = {}) {
  const n = [...e.warnings.map((C) => `左: ${C}`), ...t.warnings.map((C) => `右: ${C}`)], i = [], r = s.manualMatches ?? {};
  let l = e.status !== "ok" || t.status !== "ok", o = 0, a = !1;
  for (const C of gr)
    e.sources[C] !== t.sources[C] && (l = !0, n.push(`${C}: 左右で保存情報の範囲が異なります。欠落を追加・削除と断定しません。`));
  const { matches: f, blocked: u } = mr(e.nodes, t.nodes, r, n);
  u.size && (l = !0), f.some((C) => C.reason === "id-type") && n.push("ID・型による自動対応は保存グラフに基づく候補です。別 workflow の同一性や、モデルファイル・コード版の一致を保証しません。");
  const h = new Map(e.nodes.map((C) => [C.key, C])), g = new Map(t.nodes.map((C) => [C.key, C])), m = new Set(f.map((C) => C.leftKey)), D = new Set(f.map((C) => C.rightKey));
  function I(C, E, K, q, B, P, U) {
    if (i.length >= Do) {
      l = !0, a || n.push("差分数が表示上限を超えています。一部のみ表示します。元 JSON から全保存値を確認できます。"), a = !0;
      return;
    }
    i.push({ id: `${C?.key ?? ""}|${E?.key ?? ""}|${K}|${U}`, kind: U, source: (C ?? E).source, ...C ? { leftNode: C } : {}, ...E ? { rightNode: E } : {}, path: K, label: q, ...C ? { left: B } : {}, ...E ? { right: P } : {} });
  }
  function R(C, E, K, q, B, P, U, ee = 0) {
    if (!Ot(B, P))
      if (on(B) !== void 0 || on(P) !== void 0) I(C, E, K, q, B, P, U);
      else if (U !== "connection" && ee < 64 && Array.isArray(B) && Array.isArray(P))
        for (let z = 0; z < Math.max(B.length, P.length); z++) R(C, E, `${K}[${z}]`, `${q}[${z}]`, B[z], P[z], U, ee + 1);
      else if (U !== "connection" && ee < 64 && ce(B) && ce(P))
        for (const z of /* @__PURE__ */ new Set([...Object.keys(B), ...Object.keys(P)])) R(C, E, `${K}.${z}`, `${q}.${z}`, B[z], P[z], U, ee + 1);
      else I(C, E, K, q, B, P, U);
  }
  for (const C of f) {
    const E = h.get(C.leftKey), K = g.get(C.rightKey);
    E.type !== K.type && I(E, K, "class_type", "ノード型", E.type, K.type, "changed");
    const q = new Map(E.fields.map((P) => [P.key, P])), B = new Map(K.fields.map((P) => [P.key, P]));
    for (const P of /* @__PURE__ */ new Set([...q.keys(), ...B.keys()])) {
      const U = q.get(P), ee = B.get(P);
      if (U?.promptText && ee?.promptText) {
        o++;
        continue;
      }
      if (!U || !ee) {
        l = !0, n.push(`${E.source}: ${E.id} ↔ ${K.id} / ${P}: 片方に保存値がありません。設定の削除とは断定できません。`);
        continue;
      }
      R(E, K, P, U.label, U.value, ee.value, U.kind === "reference" || ee.kind === "reference" ? "connection" : "changed");
    }
  }
  const O = [], A = [];
  for (const [C, E, K, q, B] of [
    ["left", e.nodes, t.nodes, m, O],
    ["right", t.nodes, e.nodes, D, A]
  ])
    for (const P of E) {
      if (q.has(P.key)) continue;
      const U = K.filter((z) => z.source === P.source && z.type === P.type), ee = e.status === "ok" && t.status === "ok" && e.sources[P.source] === "ok" && t.sources[P.source] === "ok";
      U.length === 0 && ee && !u.has(P.key) ? I(C === "left" ? P : void 0, C === "right" ? P : void 0, "", C === "left" ? "右で削除（左にのみ保存）" : "右で追加（右にのみ保存）", C === "left" ? P.fields : void 0, C === "right" ? P.fields : void 0, C === "left" ? "removed" : "added") : (l = !0, B.push({ node: P, candidateKeys: U.map((z) => z.key) }));
    }
  return (O.length || A.length) && n.push("対応未確定のノードがあります。候補を確認し、必要に応じて手動で対応付けてください。"), { status: l ? "incomplete" : i.length ? "different" : "same", differences: i, matches: f, unmatchedLeft: O, unmatchedRight: A, warnings: [...new Set(n)], excludedPromptFields: o };
}
function oi(e, t) {
  if (e.status !== "ok" || t.status !== "ok") return null;
  const s = e.sources.prompt === "ok" && t.sources.prompt === "ok" ? "prompt" : "workflow";
  if (e.sources[s] !== "ok" || t.sources[s] !== "ok") return null;
  for (const o of [e, t]) {
    const a = o.nodes.filter((f) => f.source === s);
    if (a.some((f) => !Kt(f.type) && f.fields.some((u) => /^(?:widgets_values\.)?(?:text|prompt|positive|negative)$/.test(u.key) && typeof u.value == "string"))) return null;
    for (const f of a) {
      const u = o.nodes.find((h) => h.source !== s && h.id === f.id && h.type === f.type);
      if (u)
        for (const h of f.fields.filter((g) => g.promptText)) {
          const g = h.key.replace(/^widgets_values\./, ""), m = u.fields.find((D) => D.key.replace(/^widgets_values\./, "") === g && D.promptText);
          if (m && !Ot(h.value, m.value)) return null;
        }
    }
  }
  const n = e.nodes.filter((o) => o.source === s && Kt(o.type)), i = t.nodes.filter((o) => o.source === s && Kt(o.type));
  if (!n.length || n.length !== i.length) return null;
  const { matches: r } = mr(n, i, {}, []);
  if (r.length !== n.length) return null;
  for (const o of r) {
    const a = n.find((u) => u.key === o.leftKey), f = i.find((u) => u.key === o.rightKey);
    if (a.type !== f.type) return null;
    for (const u of Kt(a.type)) {
      const h = a.fields.find((m) => m.key === u || m.key === `widgets_values.${u}`), g = f.fields.find((m) => m.key === u || m.key === `widgets_values.${u}`);
      if (!h?.promptText || !g?.promptText) return null;
      if (h.value !== g.value) return !1;
    }
  }
  const l = (o) => o.nodes.filter((a) => a.source === s).flatMap((a) => a.fields.filter((f) => /^(?:inputs\.)?(?:positive|negative)$/.test(f.key) && f.kind === "reference").map((f) => ({ node: a.key, input: f.key, reference: f.value })));
  return Ot(l(e), l(t)) ? !0 : null;
}
function qe(e) {
  if (e === void 0) return "保存情報なし";
  if (typeof e == "string") return e;
  function t(s, n) {
    if (n > 128) throw new Error("Metadata nesting limit");
    const i = on(s);
    if (i !== void 0) return i;
    const r = "  ".repeat(n + 1), l = "  ".repeat(n);
    if (Array.isArray(s)) return s.length ? `[
${s.map((o) => r + t(o, n + 1)).join(`,
`)}
${l}]` : "[]";
    if (ce(s)) {
      const o = Object.entries(s).filter(([, a]) => a !== void 0);
      return o.length ? `{
${o.map(([a, f]) => `${r}${JSON.stringify(a)}: ${t(f, n + 1)}`).join(`,
`)}
${l}}` : "{}";
    }
    return typeof s == "number" && !Number.isFinite(s) ? String(s) : JSON.stringify(s) ?? "null";
  }
  try {
    return t(e, 0);
  } catch {
    return "表示できない値";
  }
}
class Wo {
  constructor(t = 4) {
    this.limit = t;
  }
  limit;
  active = 0;
  jobs = [];
  add(t) {
    let s;
    const n = new Promise((r) => s = r), i = { run: t, resolve: s, cancelled: !1, started: !1 };
    return this.jobs.push(i), this.drain(), {
      done: n,
      cancel: () => {
        i.cancelled = !0, i.started || (this.jobs = this.jobs.filter((r) => r !== i), s());
      }
    };
  }
  drain() {
    for (; this.active < this.limit && this.jobs.length; ) {
      const t = this.jobs.shift();
      if (t.cancelled) {
        t.resolve();
        continue;
      }
      t.started = !0, this.active++, t.run().catch(() => {
      }).finally(() => {
        this.active--, t.resolve(), this.drain();
      });
    }
  }
}
const Go = new Wo(4), qo = ["src", "alt"], zo = {
  key: 1,
  class: "sg-thumb-placeholder"
}, yr = /* @__PURE__ */ ns({
  __name: "Thumbnail",
  props: {
    url: {},
    alt: {}
  },
  setup(e) {
    const t = e, s = /* @__PURE__ */ X(""), n = /* @__PURE__ */ X(!1);
    let i, r, l = 0;
    function o() {
      i?.abort(), r?.(), s.value && URL.revokeObjectURL(s.value), s.value = "";
    }
    bt(
      () => t.url,
      (f) => {
        o();
        const u = ++l;
        n.value = !1, i = new AbortController();
        const h = i.signal;
        r = Go.add(async () => {
          try {
            const m = await fetch(f, { signal: h, credentials: "same-origin" });
            if (!m.ok) throw new Error();
            const D = await m.blob();
            u === l && !h.aborted && (s.value = URL.createObjectURL(D));
          } catch {
            !h.aborted && u === l && (n.value = !0);
          }
        }).cancel;
      },
      { immediate: !0 }
    );
    function a() {
      s.value && URL.revokeObjectURL(s.value), s.value = "", n.value = !0;
    }
    return Os(() => {
      l++, o();
    }), (f, u) => s.value ? (L(), F("img", {
      key: 0,
      src: s.value,
      alt: e.alt,
      decoding: "async",
      onError: a
    }, null, 40, qo)) : (L(), F("span", zo, j(n.value ? "Image unavailable" : "Loading preview…"), 1));
  }
}), Jo = ["aria-label", "onClick"], Yo = { class: "sg-card-tools" }, Xo = ["title"], Qo = ["aria-label", "checked", "onChange"], Zo = ["aria-label", "onClick"], ea = /* @__PURE__ */ ns({
  __name: "VirtualGrid",
  props: {
    images: {},
    checked: {},
    large: { type: Boolean },
    api: {},
    hasMore: { type: Boolean },
    initialScroll: {}
  },
  emits: ["view", "pin", "check", "more", "position"],
  setup(e, { expose: t, emit: s }) {
    const n = e, i = s, r = /* @__PURE__ */ X(), l = /* @__PURE__ */ X(1e3), o = /* @__PURE__ */ X(600), a = /* @__PURE__ */ X(n.initialScroll), f = le(() => n.large ? 284 : 164), u = le(
      () => Lo(
        n.images.length,
        l.value,
        o.value,
        a.value,
        f.value
      )
    ), h = le(
      () => n.images.slice(u.value.start, u.value.end)
    );
    let g;
    function m() {
      r.value && (l.value = r.value.clientWidth || 1e3, o.value = r.value.clientHeight || 600);
    }
    function D() {
      i("position", {
        scroll: a.value,
        width: l.value,
        cell: f.value
      });
    }
    function I() {
      a.value = r.value?.scrollTop ?? 0, D(), u.value.end >= n.images.length && n.hasMore && i("more");
    }
    return bt(
      () => [n.images, n.large],
      async ([R, O], [A, C]) => {
        const E = pr(
          A,
          R,
          a.value,
          l.value,
          C ? 284 : 164,
          O ? 284 : 164
        );
        await Tt(), r.value && (r.value.scrollTop = E, a.value = E, D());
      },
      { flush: "pre" }
    ), bn(() => {
      m(), r.value && (r.value.scrollTop = a.value), g = new ResizeObserver(m), r.value && g.observe(r.value);
    }), Os(() => g?.disconnect()), t({
      top: () => {
        r.value && (r.value.scrollTop = 0, a.value = 0, D());
      }
    }), (R, O) => (L(), F("div", {
      ref_key: "el",
      ref: r,
      class: "sg-grid-scroll",
      "data-testid": "image-grid",
      onScrollPassive: I
    }, [
      k("div", {
        class: "sg-grid-space",
        style: wt({ height: u.value.totalHeight + "px" })
      }, [
        k("div", {
          class: "sg-grid",
          style: wt({
            gridTemplateColumns: `repeat(${u.value.columns}, minmax(0,1fr))`,
            transform: `translateY(${u.value.offset}px)`
          })
        }, [
          (L(!0), F(Y, null, Ie(h.value, (A) => (L(), F("article", {
            key: A.id,
            class: lt(["sg-card", { "sg-checked": e.checked.has(A.id) }]),
            style: wt({ height: f.value + "px" })
          }, [
            k("button", {
              class: "sg-thumb-button",
              "data-action": "view",
              "aria-label": "View " + A.name,
              onClick: (C) => i("view", A.id)
            }, [
              Te(yr, {
                url: e.api.imageURL(A, "thumbnail", e.large ? 512 : 256),
                alt: A.name
              }, null, 8, ["url", "alt"])
            ], 8, Jo),
            k("div", Yo, [
              k("label", {
                title: "Select " + A.name
              }, [
                k("input", {
                  type: "checkbox",
                  "aria-label": "Select " + A.name,
                  checked: e.checked.has(A.id),
                  onChange: (C) => i("check", A.id)
                }, null, 40, Qo),
                O[1] || (O[1] = we(" Compare", -1))
              ], 8, Xo),
              k("button", {
                class: "sg-pin",
                "aria-label": "Pin " + A.name + " as reference",
                onClick: (C) => i("pin", A.id)
              }, " Pin ", 8, Zo)
            ])
          ], 6))), 128))
        ], 4)
      ], 4),
      e.hasMore ? (L(), F("button", {
        key: 0,
        class: "sg-load",
        onClick: O[0] || (O[0] = (A) => i("more"))
      }, " Load more images ")) : re("", !0)
    ], 544));
  }
}), ta = ["data-side", "data-image"], sa = { class: "sg-pane-caption" }, na = ["aria-label"], ia = {
  key: 0,
  class: "sg-unavailable",
  role: "status"
}, ra = ["src", "alt"], la = {
  key: 1,
  class: "sg-surface-status"
}, oa = {
  key: 2,
  class: "sg-surface-status"
}, aa = ["title"], ai = /* @__PURE__ */ ns({
  __name: "ImagePane",
  props: {
    image: {},
    api: {},
    side: {},
    transform: {},
    models: {},
    modelStatus: {},
    unavailable: { type: Boolean }
  },
  emits: ["transform", "original"],
  setup(e, { expose: t, emit: s }) {
    const n = e, i = s, r = /* @__PURE__ */ X(), l = /* @__PURE__ */ X(), o = /* @__PURE__ */ X(640), a = /* @__PURE__ */ X(600), f = /* @__PURE__ */ X({ width: 0, height: 0 }), u = /* @__PURE__ */ X(!1), h = /* @__PURE__ */ X(!1);
    let g, m = null;
    const D = le(
      () => Math.min(
        o.value / (f.value.width || n.image?.width || 1024),
        a.value / (f.value.height || n.image?.height || 1024)
      )
    ), I = le(
      () => (f.value.width || n.image?.width || 1024) * D.value
    ), R = le(
      () => (f.value.height || n.image?.height || 1024) * D.value
    ), O = le(() => ({
      width: I.value + "px",
      height: R.value + "px",
      transform: `translate(-50%,-50%) translate(${n.transform.x * I.value * n.transform.scale}px,${n.transform.y * R.value * n.transform.scale}px) scale(${n.transform.scale})`
    }));
    bt(
      () => [n.image?.id, n.image?.revision],
      () => {
        u.value = !1, h.value = !1, f.value = { width: 0, height: 0 };
      }
    );
    function A(P) {
      if (P.target !== r.value) return;
      const U = P.target;
      f.value = { width: U.naturalWidth, height: U.naturalHeight }, u.value = !0;
    }
    function C(P) {
      P.target === r.value && (h.value = !0);
    }
    t({ originalScale: le(() => 1 / D.value) });
    function E(P) {
      const U = n.transform.scale, ee = Math.min(
        32,
        Math.max(0.25, U * Math.exp(-P.deltaY * 15e-4))
      ), z = l.value.getBoundingClientRect(), de = (P.clientX - z.left - z.width / 2) / I.value, pe = (P.clientY - z.top - z.height / 2) / R.value;
      i("transform", {
        scale: ee,
        x: n.transform.x + de * (1 / ee - 1 / U),
        y: n.transform.y + pe * (1 / ee - 1 / U)
      });
    }
    function K(P) {
      P.button === 0 && (m = { x: P.clientX, y: P.clientY, start: { ...n.transform } }, l.value?.setPointerCapture(P.pointerId));
    }
    function q(P) {
      m && i("transform", {
        ...m.start,
        x: m.start.x + (P.clientX - m.x) / (I.value * m.start.scale),
        y: m.start.y + (P.clientY - m.y) / (R.value * m.start.scale)
      });
    }
    function B() {
      l.value && (o.value = l.value.clientWidth || 640, a.value = l.value.clientHeight || 600);
    }
    return bn(() => {
      B(), g = new ResizeObserver(B), l.value && g.observe(l.value);
    }), Os(() => g?.disconnect()), (P, U) => (L(), F("section", {
      class: "sg-image-pane",
      "data-side": e.side,
      "data-image": e.image?.id
    }, [
      k("div", sa, [
        k("strong", null, j(e.side === "left" ? "Reference · pinned" : "Image"), 1),
        k("span", null, j(e.image?.name ?? "No candidate"), 1),
        k("button", {
          "aria-label": "Show " + e.side + " original pixels",
          onClick: U[0] || (U[0] = (ee) => i("original"))
        }, " 1:1 ", 8, na)
      ]),
      e.unavailable ? (L(), F("p", ia, " No longer present in this folder. The selected image is kept in place; the displayed image may be cached. ")) : re("", !0),
      k("div", {
        ref_key: "surface",
        ref: l,
        class: "sg-image-surface",
        onWheel: hr(E, ["prevent"]),
        onPointerdown: K,
        onPointermove: q,
        onPointerup: U[1] || (U[1] = (ee) => /* @__PURE__ */ ue(m) ? m.value = null : m = null),
        onPointercancel: U[2] || (U[2] = (ee) => /* @__PURE__ */ ue(m) ? m.value = null : m = null),
        onLostpointercapture: U[3] || (U[3] = (ee) => /* @__PURE__ */ ue(m) ? m.value = null : m = null),
        onDblclick: U[4] || (U[4] = (ee) => i("transform", { scale: 1, x: 0, y: 0 }))
      }, [
        e.image && !h.value ? (L(), F("img", {
          ref_key: "currentImage",
          ref: r,
          key: e.image.id + e.image.revision,
          src: e.api.imageURL(e.image, "original"),
          alt: e.image.name,
          style: wt(O.value),
          draggable: "false",
          decoding: "async",
          onLoad: A,
          onError: C
        }, null, 44, ra)) : re("", !0),
        !e.image || h.value ? (L(), F("p", la, j(h.value ? "Image unavailable. It may have been moved or overwritten." : "No comparison candidate. Select more images or change the candidate range."), 1)) : u.value ? re("", !0) : (L(), F("p", oa, "Loading original…"))
      ], 544),
      k("div", {
        class: "sg-models",
        title: e.models.join(", ")
      }, [
        k("span", null, j(e.models.length ? "Model: " + e.models.join(" · ") : e.modelStatus), 1),
        k("span", null, j(Math.round(e.transform.scale * 100)) + "% of fit " + j(u.value ? "· Original" : ""), 1)
      ], 8, aa)
    ], 8, ta));
  }
}), ca = {
  class: "sg-metadata",
  "aria-label": "Saved settings"
}, ua = { class: "sg-panel-heading" }, fa = { key: 0 }, da = {
  key: 2,
  role: "status"
}, ha = { class: "sg-muted" }, pa = { class: "sg-node-mapping" }, ga = ["aria-label", "value", "onChange"], ma = { value: "__auto__" }, ya = ["value"], va = { key: 0 }, ba = ["onClick"], _a = ["onClick"], wa = ["onClick"], xa = { key: 5 }, ka = /* @__PURE__ */ ns({
  __name: "MetadataPanel",
  props: {
    left: {},
    right: {},
    compare: { type: Boolean },
    manualMatches: {},
    loading: { type: Boolean }
  },
  emits: ["close", "retry", "match"],
  setup(e, { emit: t }) {
    const s = e, n = t, i = /* @__PURE__ */ X(""), r = le(
      () => s.compare && s.left && s.right ? Bo(s.left, s.right, {
        manualMatches: s.manualMatches
      }) : null
    );
    async function l(u) {
      try {
        await navigator.clipboard.writeText(
          typeof u == "string" ? u : qe(u)
        ), i.value = "Copied";
      } catch {
        i.value = "Clipboard unavailable. Select the displayed text to copy.";
      }
    }
    function o(u) {
      const h = s.manualMatches[u], g = h === void 0 ? r.value?.matches.find((m) => m.leftKey === u)?.rightKey : h;
      return s.right?.nodes.find((m) => m.key === g);
    }
    function a(u) {
      return `{
  "prompt": ` + (u.rawText.prompt ?? qe(u.raw.prompt)) + `,
  "workflow": ` + (u.rawText.workflow ?? qe(u.raw.workflow)) + `
}`;
    }
    function f(u, h) {
      const g = u.target.value;
      n(
        "match",
        h,
        g === "__auto__" ? void 0 : g === "__none__" ? null : g
      );
    }
    return (u, h) => (L(), F("aside", ca, [
      k("div", ua, [
        k("h2", null, j(e.compare ? "Saved setting differences" : "Saved settings"), 1),
        k("button", {
          "aria-label": "Close settings",
          onClick: h[0] || (h[0] = (g) => n("close"))
        }, "×")
      ]),
      h[14] || (h[14] = k("p", { class: "sg-muted" }, " Saved values only. Prompt text is excluded from identified differences. Unknown widget values keep their saved positions. ", -1)),
      e.loading ? (L(), F("p", fa, "Loading saved metadata…")) : re("", !0),
      e.left?.status === "invalid" || e.right?.status === "invalid" ? (L(), F("button", {
        key: 1,
        onClick: h[1] || (h[1] = (g) => n("retry"))
      }, " Reload saved settings ")) : re("", !0),
      i.value ? (L(), F("p", da, j(i.value), 1)) : re("", !0),
      r.value ? (L(), F(Y, { key: 3 }, [
        k("p", {
          class: lt(["sg-result", { "sg-warning": r.value.status === "incomplete" }])
        }, j(r.value.status === "same" ? "No differences in comparable saved settings." : r.value.status === "different" ? r.value.differences.length + " saved differences" : "Incomplete comparison. Missing or ambiguous settings are not equal."), 3),
        k("p", ha, j(r.value.excludedPromptFields) + " identified prompt fields excluded. ", 1),
        (L(!0), F(Y, null, Ie(r.value.warnings, (g, m) => (L(), F("p", {
          key: m,
          class: "sg-warning"
        }, j(g), 1))), 128)),
        k("button", {
          onClick: h[2] || (h[2] = (g) => l(r.value.differences))
        }, " Copy differences (left → right) "),
        k("details", pa, [
          h[8] || (h[8] = k("summary", null, "Review / change node matching", -1)),
          h[9] || (h[9] = k("p", { class: "sg-muted" }, " One-to-one within the same saved source. Auto matches are candidates, not proof of workflow identity. ", -1)),
          (L(!0), F(Y, null, Ie(e.left?.nodes, (g) => (L(), F("label", {
            key: g.key,
            class: "sg-match-row"
          }, [
            k("span", null, j(g.source) + " · " + j(g.id) + " · " + j(g.title || g.type), 1),
            k("select", {
              "aria-label": "Match " + g.key,
              value: e.manualMatches[g.key] === null ? "__none__" : e.manualMatches[g.key] ?? "__auto__",
              onChange: (m) => f(m, g.key)
            }, [
              k("option", ma, " Auto: " + j(r.value.matches.find((m) => m.leftKey === g.key)?.rightKey ?? "unmatched"), 1),
              h[5] || (h[5] = k("option", { value: "__none__" }, "Leave unmatched", -1)),
              (L(!0), F(Y, null, Ie(e.right?.nodes.filter(
                (m) => m.source === g.source
              ), (m) => (L(), F("option", {
                key: m.key,
                value: m.key
              }, j(m.id) + " · " + j(m.title || m.type), 9, ya))), 128))
            ], 40, ga),
            k("details", null, [
              h[6] || (h[6] = k("summary", null, "Left saved values", -1)),
              k("pre", null, j(ve(qe)(
                g.fields.map((m) => ({ name: m.label, value: m.value }))
              )), 1)
            ]),
            o(g.key) ? (L(), F("details", va, [
              h[7] || (h[7] = k("summary", null, "Right candidate saved values", -1)),
              k("pre", null, j(ve(qe)(
                o(g.key)?.fields.map((m) => ({
                  name: m.label,
                  value: m.value
                }))
              )), 1)
            ])) : re("", !0)
          ]))), 128)),
          (L(!0), F(Y, null, Ie(r.value.unmatchedLeft, (g) => (L(), F("p", {
            key: g.node.key,
            class: "sg-warning"
          }, " Unmatched left " + j(g.node.key) + " · candidates: " + j(g.candidateKeys.join(", ") || "none"), 1))), 128)),
          (L(!0), F(Y, null, Ie(r.value.unmatchedRight, (g) => (L(), F("p", {
            key: g.node.key,
            class: "sg-warning"
          }, " Unmatched right " + j(g.node.key), 1))), 128))
        ]),
        (L(!0), F(Y, null, Ie(r.value.differences, (g) => (L(), F("article", {
          key: g.id,
          class: "sg-difference"
        }, [
          k("strong", null, j(g.leftNode?.title || g.rightNode?.title || g.leftNode?.type || g.rightNode?.type), 1),
          k("small", null, j(g.source) + " · " + j(g.leftNode?.id ?? "—") + " → " + j(g.rightNode?.id ?? "—") + " · " + j(g.kind), 1),
          k("h3", null, j(g.label), 1),
          k("label", null, [
            h[10] || (h[10] = we("Left reference ", -1)),
            k("button", {
              onClick: (m) => l(g.left)
            }, "Copy left", 8, ba)
          ]),
          k("pre", null, j(ve(qe)(g.left)), 1),
          k("label", null, [
            h[11] || (h[11] = we("Right image ", -1)),
            k("button", {
              onClick: (m) => l(g.right)
            }, "Copy right", 8, _a)
          ]),
          k("pre", null, j(ve(qe)(g.right)), 1)
        ]))), 128))
      ], 64)) : e.right ? (L(), F(Y, { key: 4 }, [
        k("p", null, "Status: " + j(e.right.status), 1),
        (L(!0), F(Y, null, Ie(e.right.warnings, (g) => (L(), F("p", {
          key: g,
          class: "sg-warning"
        }, j(g), 1))), 128)),
        (L(!0), F(Y, null, Ie(e.right.nodes, (g) => (L(), F("details", {
          key: g.key
        }, [
          k("summary", null, j(g.source) + " · " + j(g.id) + " · " + j(g.title || g.type), 1),
          (L(!0), F(Y, null, Ie(g.fields, (m) => (L(), F("div", {
            key: m.key,
            class: "sg-field"
          }, [
            k("label", null, [
              we(j(m.label) + " ", 1),
              k("button", {
                onClick: (D) => l(m.value)
              }, "Copy value", 8, wa)
            ]),
            k("pre", null, j(ve(qe)(m.value)), 1)
          ]))), 128))
        ]))), 128))
      ], 64)) : re("", !0),
      e.right ? (L(), F("details", xa, [
        h[12] || (h[12] = k("summary", null, "Original saved JSON (may include prompts)", -1)),
        h[13] || (h[13] = k("p", { class: "sg-muted" }, " Copied JSON may contain prompt text. Nothing is sent outside this ComfyUI server. ", -1)),
        e.left && e.compare ? (L(), F("button", {
          key: 0,
          onClick: h[3] || (h[3] = (g) => l(a(e.left)))
        }, " Copy original left JSON")) : re("", !0),
        k("button", {
          onClick: h[4] || (h[4] = (g) => l(a(e.right)))
        }, " Copy original " + j(e.compare ? "right " : "") + "JSON ", 1),
        k("pre", null, j(ve(qe)(e.right.raw)), 1)
      ])) : re("", !0)
    ]));
  }
}), Sa = { class: "sg-header" }, Ca = { class: "sg-folder" }, Ia = ["value", "disabled"], Ma = ["value"], $a = {
  key: 0,
  class: "sg-error",
  role: "alert"
}, Ta = { class: "sg-toolbar" }, Aa = { class: "sg-size" }, Ea = ["aria-pressed"], Oa = ["aria-pressed"], Ra = ["disabled"], Pa = {
  key: 1,
  class: "sg-empty"
}, La = { class: "sg-grid-footer" }, Na = { class: "sg-toolbar sg-view-toolbar" }, Fa = {
  key: 0,
  value: "prompt"
}, ja = ["disabled"], Da = { class: "sg-position" }, Ka = ["disabled"], Ua = { key: 2 }, Ha = ["checked"], Va = ["aria-pressed"], Ba = { class: "sg-view-body" }, Wa = { class: "sg-candidate-bar" }, Ga = ["aria-label", "aria-pressed", "onClick"], qa = ["disabled"], za = {
  key: 0,
  class: "sg-helper",
  role: "status"
}, Ja = { class: "sg-view-footer" }, Ya = { key: 0 }, Xa = /* @__PURE__ */ ns({
  __name: "Gallery",
  props: {
    api: {}
  },
  setup(e) {
    const t = e, s = /* @__PURE__ */ ms(Oo()), n = /* @__PURE__ */ X([]), i = /* @__PURE__ */ X(!1), r = /* @__PURE__ */ X(), l = /* @__PURE__ */ X(), o = /* @__PURE__ */ X(), a = /* @__PURE__ */ X(), f = /* @__PURE__ */ X(), u = /* @__PURE__ */ X({ scroll: 0, width: 1e3, cell: 164 }), h = /* @__PURE__ */ X(), g = /* @__PURE__ */ X(0), m = new Fo(t.api, s, () => g.value++), D = /* @__PURE__ */ X(""), I = /* @__PURE__ */ X(""), R = /* @__PURE__ */ X(!1), O = /* @__PURE__ */ X(!1), A = /* @__PURE__ */ ms(/* @__PURE__ */ new Map()), C = /* @__PURE__ */ new Map();
    let E = new AbortController(), K = new AbortController(), q = 0, B = 0, P;
    const U = le(() => (g.value, m.loading)), ee = le(() => (g.value, m.error)), z = le(() => (g.value, m.cursor !== null)), de = le(() => s.leftId ? s.records.get(s.leftId) : void 0), pe = le(() => {
      const v = s.mode === "single" ? s.currentId : s.rightId;
      return v ? s.records.get(v) : void 0;
    }), Be = (v) => v.id + ":" + v.revision, ft = le(
      () => de.value ? A.get(Be(de.value)) : void 0
    ), tt = le(
      () => pe.value ? A.get(Be(pe.value)) : void 0
    ), Rt = le(
      () => ft.value ? li(ft.value) : []
    ), Pt = le(
      () => tt.value ? li(tt.value) : []
    ), It = le(
      () => s.mode === "single" ? s.images : Dt(s)
    ), We = le(
      () => It.value.findIndex(
        (v) => v.id === (s.mode === "single" ? s.currentId : s.rightId)
      )
    ), dt = le(() => {
      const v = Math.max(0, We.value);
      return It.value.slice(Math.max(0, v - 7), v + 8);
    });
    bt(
      () => s.images,
      (v, p) => {
        s.mode !== "grid" && (u.value.scroll = pr(
          p,
          v,
          u.value.scroll,
          u.value.width,
          u.value.cell,
          u.value.cell
        ));
      }
    ), bt(
      () => [
        s.mode,
        s.rightId,
        s.currentId,
        dt.value.map((v) => v.id).join(",")
      ],
      async () => {
        await Tt();
        const v = h.value, p = v?.querySelector("[aria-pressed=true]");
        v && p && (v.scrollLeft = No(
          v.clientWidth,
          v.scrollLeft,
          p.offsetLeft,
          p.offsetWidth
        ));
      }
    );
    function Se(v) {
      return v ? "No identifiable saved model information" : "Loading saved model information…";
    }
    async function st(v) {
      if (!v) return;
      const p = Be(v);
      if (A.has(p)) return A.get(p);
      if (C.has(p)) return C.get(p);
      const x = q, N = E.signal, V = t.api.metadata(v, N).then(ri).catch(
        (W) => N.aborted ? void 0 : ri({
          status: "invalid",
          prompt: null,
          workflow: null,
          warnings: [W instanceof Error ? W.message : "Metadata unavailable"]
        })
      ).then((W) => {
        if (W && x === q && (A.set(p, W), A.size > 200)) {
          const G = /* @__PURE__ */ new Set([
            de.value && Be(de.value),
            pe.value && Be(pe.value),
            p
          ]);
          for (const te of A.keys())
            if (!G.has(te)) {
              A.delete(te);
              break;
            }
        }
        return W;
      }).finally(() => {
        C.get(p) === V && C.delete(p);
      });
      return C.set(p, V), V;
    }
    bt(
      () => [
        de.value?.id,
        de.value?.revision,
        pe.value?.id,
        pe.value?.revision
      ],
      () => {
        st(de.value), st(pe.value), s.manualMatches = {};
      }
    );
    async function is() {
      if (s.open) return;
      q++, E = new AbortController(), K = new AbortController(), s.open = !0, u.value.scroll = 0, D.value = "", I.value = "", await Tt(), r.value?.showModal(), O.value = !0;
      const v = q;
      try {
        const p = await t.api.folders(K.signal);
        if (v !== q) return;
        n.value = p.folders;
        const x = p.folders.find((N) => N.id === s.folderId) ?? p.folders[0];
        x ? await m.selectFolder(x.id) : D.value = "No output folders are available.";
      } catch (p) {
        v === q && (D.value = p instanceof Error ? p.message : "Folders unavailable");
      } finally {
        v === q && (O.value = !1);
      }
      v === q && (P = setInterval(() => {
        document.hidden || nt();
      }, 5e3));
    }
    function rs() {
      q++, B++, R.value = !1, K.abort(), E.abort(), m.dispose(), clearInterval(P), C.clear(), A.clear(), r.value?.close(), Ro(s), I.value = "", Tt(() => a.value?.focus());
    }
    async function ht(v) {
      u.value.scroll = 0, B++, R.value = !1, I.value = "", await m.selectFolder(v.target.value);
    }
    async function nt() {
      s.open && await m.refresh();
    }
    function ls(v) {
      s.currentId = v, s.mode = "single", s.panel = !1, Ft(s, "right", { scale: 1, x: 0, y: 0 });
    }
    function pt(v) {
      s.checked.has(v) ? s.checked.delete(v) : s.checked.add(v);
    }
    function os() {
      B++, R.value = !1, I.value = "";
    }
    bt(() => [de.value?.id, de.value?.revision], os, {
      flush: "sync"
    });
    function c(v) {
      os(), s.leftId = v, s.mode = "compare", s.scope = s.checked.size > 1 ? "checked" : "folder", s.rightId = Dt(s)[0]?.id ?? null, s.manualMatches = {}, s.panel = !1, I.value = "", s.transforms = {
        left: { scale: 1, x: 0, y: 0 },
        right: { scale: 1, x: 0, y: 0 }
      };
    }
    function d() {
      const v = s.images.find((p) => s.checked.has(p.id))?.id ?? s.currentId ?? s.images[0]?.id;
      v && c(v);
    }
    function y() {
      R.value && os(), Dt(s).some((v) => v.id === s.rightId) || (s.rightId = Dt(s)[0]?.id ?? null);
    }
    function S(v) {
      const p = {
        left: { scale: l.value?.originalScale ?? 1, x: 0, y: 0 },
        right: { scale: o.value?.originalScale ?? 1, x: 0, y: 0 }
      };
      s.linked ? s.transforms = p : s.transforms[v] = p[v];
    }
    function _() {
      Ft(s, "left", { scale: 1, x: 0, y: 0 }), Ft(s, "right", { scale: 1, x: 0, y: 0 });
    }
    function w() {
      for (const v of [de.value, pe.value])
        v && (A.delete(Be(v)), st(v));
    }
    function T(v, p) {
      if (p === void 0) delete s.manualMatches[v];
      else {
        if (p !== null)
          for (const [x, N] of Object.entries(s.manualMatches))
            x !== v && N === p && (s.manualMatches[x] = null);
        s.manualMatches[v] = p;
      }
    }
    async function $() {
      const v = de.value;
      if (!v || R.value) return;
      const p = ++B;
      R.value = !0, I.value = "Checking saved text in " + s.images.length + " loaded images…";
      const x = await st(v);
      if (p !== B) return;
      if (!x || oi(x, x) === null) {
        I.value = "Saved prompt text cannot be identified. Normal comparison remains available.", R.value = !1;
        return;
      }
      const N = s.images.slice();
      let V = 0, W = 0, G = 0;
      const te = /* @__PURE__ */ new Set();
      async function oe() {
        for (; V < N.length && p === B; ) {
          const ge = N[V++];
          if (ge.id === v.id) continue;
          const be = await st(ge);
          if (p !== B) return;
          const Ce = be ? oi(x, be) : null;
          Ce === !0 && te.add(ge.id), Ce === null && W++, G++, I.value = `Checking saved text… ${G}/${N.length - 1}`;
        }
      }
      await Promise.all([oe(), oe()]), p === B && (R.value = !1, s.promptIds = te, s.scope = "prompt", y(), I.value = `${te.size} exact saved-text matches; ${W} unknown. Checked ${N.length} loaded images${z.value ? " only. Load more in the grid to search further" : ""}. Saved text does not prove the final generated prompt.`, R.value = !1);
    }
    function M(v) {
      if (!s.open) return;
      v.stopPropagation();
      const p = v.target;
      if (v.key === "Escape") {
        v.preventDefault(), s.panel ? s.panel = !1 : s.mode !== "grid" ? s.mode = "grid" : rs();
        return;
      }
      ["INPUT", "SELECT", "TEXTAREA"].includes(p.tagName) || s.mode !== "grid" && (v.key === "ArrowLeft" || v.key === "ArrowRight") && (v.preventDefault(), Js(s, v.key === "ArrowLeft" ? -1 : 1));
    }
    const b = () => {
      nt();
    };
    return bn(() => {
      t.api.comfy.addEventListener?.("executed", b), document.addEventListener("visibilitychange", b);
    }), Os(() => {
      clearInterval(P), K.abort(), E.abort(), m.dispose(), t.api.comfy.removeEventListener?.("executed", b), document.removeEventListener("visibilitychange", b);
    }), (v, p) => (L(), F(Y, null, [
      k("button", {
        ref_key: "launcher",
        ref: a,
        "data-action": "open",
        "data-testid": "gallery-launcher",
        class: "sg-launcher",
        "aria-label": "Open Gallery",
        onClick: is
      }, [...p[19] || (p[19] = [
        k("span", { "aria-hidden": "true" }, "▧", -1),
        we(" Gallery ", -1)
      ])], 512),
      s.open ? (L(), F("dialog", {
        key: 0,
        ref_key: "dialog",
        ref: r,
        class: "sg-dialog",
        "aria-label": "Shiba Gallery",
        onKeydown: M,
        onCancel: p[18] || (p[18] = hr(() => {
        }, ["prevent"]))
      }, [
        k("header", Sa, [
          p[22] || (p[22] = k("div", { class: "sg-brand" }, [
            k("span", { class: "sg-mark" }, "▧"),
            k("div", null, [
              k("strong", null, "Gallery"),
              k("small", null, "SHIBA · READ ONLY")
            ])
          ], -1)),
          s.mode !== "grid" ? (L(), F("button", {
            key: 0,
            "data-action": "grid",
            onClick: p[0] || (p[0] = (x) => s.mode = "grid")
          }, " ← Grid")) : re("", !0),
          k("label", Ca, [
            p[20] || (p[20] = we("Folder ", -1)),
            k("select", {
              "data-testid": "folder-select",
              "aria-label": "Output folder",
              value: s.folderId,
              disabled: O.value,
              onChange: ht
            }, [
              (L(!0), F(Y, null, Ie(n.value, (x) => (L(), F("option", {
                key: x.id,
                value: x.id
              }, j(x.name), 9, Ma))), 128))
            ], 40, Ia)
          ]),
          p[23] || (p[23] = k("span", { class: "sg-header-spacer" }, null, -1)),
          k("span", {
            class: lt(["sg-live", { "sg-working": U.value }])
          }, [
            p[21] || (p[21] = k("i", null, null, -1)),
            we(j(U.value ? "Syncing" : "Auto refresh"), 1)
          ], 2),
          k("button", {
            "data-action": "close",
            class: "sg-close",
            "aria-label": "Close Gallery",
            onClick: rs
          }, " Close × ")
        ]),
        D.value || ee.value ? (L(), F("div", $a, [
          we(j(D.value || ee.value) + " ", 1),
          k("button", { onClick: nt }, "Retry")
        ])) : re("", !0),
        s.mode === "grid" ? (L(), F(Y, { key: 1 }, [
          k("div", Ta, [
            k("span", null, [
              we(j(s.images.length) + j(z.value ? "+" : "") + " images ", 1),
              p[24] || (p[24] = k("small", null, "· newest file modification first", -1))
            ]),
            k("div", Aa, [
              k("button", {
                "aria-pressed": !i.value,
                onClick: p[1] || (p[1] = (x) => i.value = !1)
              }, "Small", 8, Ea),
              k("button", {
                "aria-pressed": i.value,
                onClick: p[2] || (p[2] = (x) => i.value = !0)
              }, "Large", 8, Oa)
            ]),
            p[25] || (p[25] = k("span", { class: "sg-header-spacer" }, null, -1)),
            k("span", null, j(s.checked.size) + " selected", 1),
            k("button", {
              class: "sg-primary",
              disabled: s.images.length < 2,
              "data-action": "compare",
              onClick: d
            }, " Compare selected ", 8, Ra)
          ]),
          s.images.length ? (L(), ps(ea, {
            key: 0,
            ref_key: "grid",
            ref: f,
            images: s.images,
            checked: s.checked,
            large: i.value,
            api: e.api,
            "has-more": z.value,
            "initial-scroll": u.value.scroll,
            onPosition: p[3] || (p[3] = (x) => u.value = x),
            onView: ls,
            onPin: c,
            onCheck: pt,
            onMore: p[4] || (p[4] = (x) => ve(m).loadMore())
          }, null, 8, ["images", "checked", "large", "api", "has-more", "initial-scroll"])) : (L(), F("div", Pa, [
            p[26] || (p[26] = k("span", { class: "sg-empty-icon" }, "▧", -1)),
            k("h2", null, j(U.value || O.value ? "Opening your output…" : "No images in this folder"), 1),
            p[27] || (p[27] = k("p", null, " Images stay in their original folder. Gallery never deletes or changes them. ", -1))
          ])),
          k("footer", La, [
            p[28] || (p[28] = k("span", null, "Click an image to inspect · check images to compare · Pin keeps the left image fixed", -1)),
            k("button", {
              onClick: p[5] || (p[5] = (x) => f.value?.top())
            }, "↑ Newest")
          ])
        ], 64)) : (L(), F(Y, { key: 2 }, [
          k("div", Na, [
            s.mode === "compare" ? (L(), F(Y, { key: 0 }, [
              p[32] || (p[32] = k("span", { class: "sg-reference-label" }, "LEFT PINNED", -1)),
              k("label", null, [
                p[31] || (p[31] = we("Candidates ", -1)),
                cl(k("select", {
                  "onUpdate:modelValue": p[6] || (p[6] = (x) => s.scope = x),
                  "aria-label": "Candidate range",
                  onChange: y
                }, [
                  p[29] || (p[29] = k("option", { value: "folder" }, "This folder", -1)),
                  p[30] || (p[30] = k("option", { value: "checked" }, "Checked images", -1)),
                  s.scope === "prompt" ? (L(), F("option", Fa, " Matching saved text ")) : re("", !0)
                ], 544), [
                  [ko, s.scope]
                ])
              ])
            ], 64)) : (L(), F("button", {
              key: 1,
              "data-action": "pin",
              class: "sg-primary",
              onClick: p[7] || (p[7] = (x) => s.currentId && c(s.currentId))
            }, " Pin as reference")),
            k("button", {
              "data-action": "previous",
              "aria-label": "Previous image",
              disabled: We.value <= 0,
              onClick: p[8] || (p[8] = (x) => ve(Js)(s, -1))
            }, " ← Previous", 8, ja),
            k("span", Da, j(We.value < 0 ? "—" : We.value + 1) + " / " + j(It.value.length) + j(z.value ? "+" : ""), 1),
            k("button", {
              "data-action": "next",
              "aria-label": "Next image",
              disabled: We.value < 0 || We.value >= It.value.length - 1,
              onClick: p[9] || (p[9] = (x) => ve(Js)(s, 1))
            }, " Next →", 8, Ka),
            p[34] || (p[34] = k("span", { class: "sg-header-spacer" }, null, -1)),
            s.mode === "compare" ? (L(), F("label", Ua, [
              k("input", {
                type: "checkbox",
                "aria-label": "Link zoom and pan",
                checked: s.linked,
                onChange: p[10] || (p[10] = (x) => ve(Po)(s, x.target.checked))
              }, null, 40, Ha),
              p[33] || (p[33] = we(" Link zoom / pan", -1))
            ])) : re("", !0),
            k("button", { onClick: _ }, "Fit"),
            k("button", {
              "aria-pressed": s.panel,
              "data-action": "settings",
              onClick: p[11] || (p[11] = (x) => s.panel = !s.panel)
            }, j(s.mode === "compare" ? "Differences" : "Settings"), 9, Va)
          ]),
          k("div", Ba, [
            k("div", {
              class: lt(["sg-image-pair", { "sg-single": s.mode === "single" }])
            }, [
              s.mode === "compare" ? (L(), ps(ai, {
                key: 0,
                ref_key: "leftPane",
                ref: l,
                image: de.value,
                unavailable: !!s.leftId && s.unavailable.has(s.leftId),
                api: e.api,
                side: "left",
                transform: s.transforms.left,
                models: Rt.value,
                "model-status": Se(ft.value),
                onOriginal: p[12] || (p[12] = (x) => S("left")),
                onTransform: p[13] || (p[13] = (x) => ve(Ft)(s, "left", x))
              }, null, 8, ["image", "unavailable", "api", "transform", "models", "model-status"])) : re("", !0),
              Te(ai, {
                ref_key: "rightPane",
                ref: o,
                image: pe.value,
                unavailable: !!pe.value && s.unavailable.has(pe.value.id),
                api: e.api,
                side: "right",
                transform: s.transforms.right,
                models: Pt.value,
                "model-status": Se(tt.value),
                onOriginal: p[14] || (p[14] = (x) => S("right")),
                onTransform: p[15] || (p[15] = (x) => ve(Ft)(s, "right", x))
              }, null, 8, ["image", "unavailable", "api", "transform", "models", "model-status"])
            ], 2),
            s.panel ? (L(), ps(ka, {
              key: 0,
              left: ft.value,
              right: tt.value,
              compare: s.mode === "compare",
              "manual-matches": s.manualMatches,
              loading: !tt.value || s.mode === "compare" && !ft.value,
              onClose: p[16] || (p[16] = (x) => s.panel = !1),
              onMatch: T,
              onRetry: w
            }, null, 8, ["left", "right", "compare", "manual-matches", "loading"])) : re("", !0)
          ]),
          k("div", Wa, [
            k("div", {
              ref_key: "candidateRow",
              ref: h,
              class: "sg-candidates",
              "aria-label": "Image candidates"
            }, [
              (L(!0), F(Y, null, Ie(dt.value, (x) => (L(), F("button", {
                key: x.id,
                class: lt(["sg-candidate", {
                  "sg-current": x.id === (s.mode === "single" ? s.currentId : s.rightId)
                }]),
                "aria-label": "Choose " + x.name,
                "aria-pressed": x.id === (s.mode === "single" ? s.currentId : s.rightId),
                onClick: (N) => s.mode === "single" ? s.currentId = x.id : s.rightId = x.id
              }, [
                Te(yr, {
                  url: e.api.imageURL(x, "thumbnail", 256),
                  alt: x.name
                }, null, 8, ["url", "alt"])
              ], 10, Ga))), 128))
            ], 512),
            z.value ? (L(), F("button", {
              key: 0,
              onClick: p[17] || (p[17] = (x) => ve(m).loadMore())
            }, "Load more")) : re("", !0),
            s.mode === "compare" ? (L(), F("button", {
              key: 1,
              disabled: R.value,
              onClick: $
            }, j(R.value ? "Checking text…" : "Find matching saved text"), 9, qa)) : re("", !0)
          ]),
          I.value ? (L(), F("p", za, j(I.value), 1)) : re("", !0),
          k("footer", Ja, [
            p[35] || (p[35] = we(" Wheel to zoom · drag to pan · double-click to fit · ← → to navigate ", -1)),
            s.mode === "compare" ? (L(), F("span", Ya, "· Linking copies the left view; different sizes use normalized image positions.")) : re("", !0)
          ])
        ], 64))
      ], 544)) : re("", !0)
    ], 64));
  }
});
function ci(e, t) {
  const s = new URL(e), n = s.pathname.lastIndexOf("/extensions/");
  if (n < 0)
    throw new Error("Gallery must load from the ComfyUI extensions directory.");
  return s.pathname = s.pathname.slice(0, n) + "/scripts/" + t + ".js", s.search = "", s.hash = "", s.href;
}
class Qa {
  constructor(t) {
    this.comfy = t;
  }
  comfy;
  async get(t, s) {
    const n = await fetch(this.comfy.apiURL("/shiba-gallery" + t), {
      signal: s,
      credentials: "same-origin"
    });
    if (!n.ok) {
      let i = "Request failed (" + n.status + ")";
      try {
        const r = await n.json();
        i = r.error?.message ?? r.message ?? (typeof r.error == "string" ? r.error : i);
      } catch {
      }
      throw new Error(i);
    }
    return n.json();
  }
  folders(t) {
    return this.get("/folders", t);
  }
  images(t, s = null, n) {
    const i = new URLSearchParams({ folder_id: t, limit: "160" });
    return s && i.set("cursor", s), this.get("/images?" + i, n);
  }
  metadata(t, s) {
    return this.get(
      "/image/" + encodeURIComponent(t.id) + "/metadata?" + new URLSearchParams({ revision: t.revision }),
      s
    );
  }
  imageURL(t, s, n) {
    const i = new URLSearchParams({ revision: t.revision });
    return n && i.set("size", String(n)), this.comfy.apiURL(
      "/shiba-gallery/image/" + encodeURIComponent(t.id) + "/" + s + "?" + i
    );
  }
}
const Ys = import.meta.url;
async function Za() {
  const [{ app: e }, { api: t }] = await Promise.all([
    import(
      /* @vite-ignore */
      ci(Ys, "app")
    ),
    import(
      /* @vite-ignore */
      ci(Ys, "api")
    )
  ]);
  e.registerExtension({
    name: "shiba.gallery",
    setup() {
      if (document.getElementById("shiba-gallery-root")) return;
      const s = document.createElement("link");
      s.rel = "stylesheet", s.href = new URL("./shiba-gallery.css", Ys).href, s.dataset.shibaGallery = "true", document.head.append(s);
      const n = document.createElement("div");
      n.id = "shiba-gallery-root", document.body.append(n), To(Xa, { api: new Qa(t) }).mount(n);
    }
  });
}
Za().catch(
  () => console.error(
    "[Shiba Gallery] Could not register the gallery extension. Check ComfyUI extension loading and proxy paths."
  )
);
