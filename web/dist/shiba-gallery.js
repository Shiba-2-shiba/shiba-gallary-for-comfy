// @__NO_SIDE_EFFECTS__
function cn(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const s of e.split(",")) t[s] = 1;
  return (s) => s in t;
}
const re = {}, bt = [], wt = () => {
}, di = () => !1, Ss = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Cs = (e) => e.startsWith("onUpdate:"), Ce = Object.assign, hi = (e, t) => {
  const s = e.indexOf(t);
  s > -1 && e.splice(s, 1);
}, br = Object.prototype.hasOwnProperty, Q = (e, t) => br.call(e, t), V = Array.isArray, at = (e) => ns(e) === "[object Map]", St = (e) => ns(e) === "[object Set]", Tn = (e) => ns(e) === "[object Date]", Z = (e) => typeof e == "function", ce = (e) => typeof e == "string", Ve = (e) => typeof e == "symbol", le = (e) => e !== null && typeof e == "object", pi = (e) => (le(e) || Z(e)) && Z(e.then) && Z(e.catch), gi = Object.prototype.toString, ns = (e) => gi.call(e), _r = (e) => ns(e).slice(8, -1), mi = (e) => ns(e) === "[object Object]", un = (e) => ce(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Vt = /* @__PURE__ */ cn(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Is = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((s) => t[s] || (t[s] = e(s)));
}, wr = /-\w/g, Pe = /* @__PURE__ */ Is((e) => e.replace(wr, (t) => t.slice(1).toUpperCase())), xr = /\B([A-Z])/g, Ct = /* @__PURE__ */ Is(
  (e) => e.replace(xr, "-$1").toLowerCase()
), yi = /* @__PURE__ */ Is((e) => e.charAt(0).toUpperCase() + e.slice(1)), Ns = /* @__PURE__ */ Is((e) => e ? `on${yi(e)}` : ""), He = (e, t) => !Object.is(e, t), fs = (e, ...t) => {
  for (let s = 0; s < e.length; s++)
    e[s](...t);
}, vi = (e, t, s, n = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: n,
    value: s
  });
}, fn = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let An;
const Ms = () => An || (An = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function ct(e) {
  if (V(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++) {
      const n = e[s], i = ce(n) ? Ir(n) : ct(n);
      if (i)
        for (const r in i)
          t[r] = i[r];
    }
    return t;
  } else if (ce(e) || le(e))
    return e;
}
const kr = /;(?![^(]*\))/g, Sr = /:([^]+)/, Cr = /"(?:[^"\\]|\\[^])*"|'(?:[^'\\]|\\[^])*'|\\[^]|\/\*[^]*?\*\//g;
function Ir(e) {
  const t = {};
  return e.replace(Cr, (s) => s.startsWith("/*") ? "" : s).split(kr).forEach((s) => {
    if (s) {
      const n = s.split(Sr);
      n.length > 1 && (t[n[0].trim()] = n[1].trim());
    }
  }), t;
}
function et(e) {
  let t = "";
  if (ce(e))
    t = e;
  else if (V(e))
    for (let s = 0; s < e.length; s++) {
      const n = et(e[s]);
      n && (t += n + " ");
    }
  else if (le(e))
    for (const s in e)
      e[s] && (t += s + " ");
  return t.trim();
}
const Mr = "itemscope,allowfullscreen,disablepictureinpicture,disableremoteplayback,formnovalidate,ismap,nomodule,novalidate,playsinline,readonly", $r = /* @__PURE__ */ cn(Mr);
function bi(e) {
  return !!e || e === "";
}
function Tr(e, t, s) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let i = 0; n && i < e.length; i++)
    n = ft(e[i], t[i], s);
  return n;
}
function En(e, t, s) {
  if (e.size !== t.size) return !1;
  const n = Array.from(t), i = new Uint8Array(n.length);
  for (const r of e) {
    let l = -1;
    for (let o = 0; o < n.length; o++)
      if (!i[o] && ft(r, n[o], s)) {
        l = o;
        break;
      }
    if (l < 0) return !1;
    i[l] = 1;
  }
  return !0;
}
function Ar(e, t, s) {
  let n = at(e), i = at(t);
  if (n || i || (n = St(e), i = St(t), n || i))
    return n && i ? En(e, t, s) : !1;
  const r = Object.keys(e).length, l = Object.keys(t).length;
  if (r !== l)
    return !1;
  for (const o in e) {
    const a = e.hasOwnProperty(o), f = t.hasOwnProperty(o);
    if (a && !f || !a && f || !ft(e[o], t[o], s))
      return !1;
  }
  return String(e) === String(t);
}
function On(e, t, s, n) {
  s || (s = [/* @__PURE__ */ new Map(), /* @__PURE__ */ new Map()]);
  const [i, r] = s;
  if (i.has(e) || r.has(t))
    return i.get(e) === t && r.get(t) === e;
  i.set(e, t), r.set(t, e);
  const l = n(e, t, s);
  return i.delete(e), r.delete(t), l;
}
function ft(e, t, s) {
  if (e === t) return !0;
  let n = Tn(e), i = Tn(t);
  return n || i ? n && i ? e.getTime() === t.getTime() : !1 : (n = Ve(e), i = Ve(t), n || i ? e === t : (n = V(e), i = V(t), n || i ? n && i ? On(e, t, s, Tr) : !1 : (n = le(e), i = le(t), n || i ? !n || !i ? !1 : On(e, t, s, Ar) : String(e) === String(t))));
}
function Er(e, t) {
  return e.findIndex((s) => ft(s, t));
}
const _i = (e) => !!(e && e.__v_isRef === !0), j = (e) => ce(e) ? e : e == null ? "" : V(e) || le(e) && (e.toString === gi || !Z(e.toString)) ? _i(e) ? j(e.value) : JSON.stringify(e, wi, 2) : String(e), wi = (e, t) => _i(t) ? wi(e, t.value) : at(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (s, [n, i], r) => (s[js(n, r) + " =>"] = i, s),
    {}
  )
} : St(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((s) => js(s))
} : Ve(t) ? js(t) : le(t) && !V(t) && !mi(t) ? String(t) : t, js = (e, t = "") => {
  var s;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    Ve(e) ? `Symbol(${(s = e.description) != null ? s : t})` : e
  );
};
let he;
class Or {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !t && he && (he.active ? (this.parent = he, this.index = (he.scopes || (he.scopes = [])).push(
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
      const s = he;
      try {
        return he = this, t();
      } finally {
        he = s;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = he, he = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (he === this)
        he = this.prevScope;
      else {
        let t = he;
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
function Rr() {
  return he;
}
let te;
const Ds = /* @__PURE__ */ new WeakSet();
class xi {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, he && (he.active ? he.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Ds.has(this) && (Ds.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Si(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Rn(this), Ci(this);
    const t = te, s = Le;
    te = this, Le = !0;
    try {
      return this.fn();
    } finally {
      Ii(this), te = t, Le = s, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        pn(t);
      this.deps = this.depsTail = void 0, Rn(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Ds.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Qs(this) && this.run();
  }
  get dirty() {
    return Qs(this);
  }
}
let ki = 0, Bt, Wt;
function Si(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Wt, Wt = e;
    return;
  }
  e.next = Bt, Bt = e;
}
function dn() {
  ki++;
}
function hn() {
  if (--ki > 0)
    return;
  if (Wt) {
    let t = Wt;
    for (Wt = void 0; t; ) {
      const s = t.next;
      t.next = void 0, t.flags &= -9, t = s;
    }
  }
  let e;
  for (; Bt; ) {
    let t = Bt;
    for (Bt = void 0; t; ) {
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
function Ci(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Ii(e) {
  let t, s = e.depsTail, n = s;
  for (; n; ) {
    const i = n.prevDep;
    n.version === -1 ? (n === s && (s = i), pn(n), Pr(n)) : t = n, n.dep.activeLink = n.prevActiveLink, n.prevActiveLink = void 0, n = i;
  }
  e.deps = t, e.depsTail = s;
}
function Qs(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Mi(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Mi(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Xt) || (e.globalVersion = Xt, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Qs(e))))
    return;
  e.flags |= 2;
  const t = e.dep, s = te, n = Le;
  te = e, Le = !0;
  try {
    Ci(e);
    const i = e.fn(e._value);
    (t.version === 0 || He(i, e._value)) && (e.flags |= 128, e._value = i, t.version++);
  } catch (i) {
    throw t.version++, i;
  } finally {
    te = s, Le = n, Ii(e), e.flags &= -3;
  }
}
function pn(e, t = !1) {
  const { dep: s, prevSub: n, nextSub: i } = e;
  if (n && (n.nextSub = i, e.prevSub = void 0), i && (i.prevSub = n, e.nextSub = void 0), s.subs === e && (s.subs = n, !n && s.computed)) {
    s.computed.flags &= -5;
    for (let r = s.computed.deps; r; r = r.nextDep)
      pn(r, !0);
  }
  !t && !--s.sc && s.map && s.map.delete(s.key);
}
function Pr(e) {
  const { prevDep: t, nextDep: s } = e;
  t && (t.nextDep = s, e.prevDep = void 0), s && (s.prevDep = t, e.nextDep = void 0);
}
let Le = !0;
const $i = [];
function tt() {
  $i.push(Le), Le = !1;
}
function st() {
  const e = $i.pop();
  Le = e === void 0 ? !0 : e;
}
function Rn(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const s = te;
    te = void 0;
    try {
      t();
    } finally {
      te = s;
    }
  }
}
let Xt = 0;
class Lr {
  constructor(t, s) {
    this.sub = t, this.dep = s, this.version = s.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class gn {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!te || !Le || te === this.computed)
      return;
    let s = this.activeLink;
    if (s === void 0 || s.sub !== te)
      s = this.activeLink = new Lr(te, this), te.deps ? (s.prevDep = te.depsTail, te.depsTail.nextDep = s, te.depsTail = s) : te.deps = te.depsTail = s, Ti(s);
    else if (s.version === -1 && (s.version = this.version, s.nextDep)) {
      const n = s.nextDep;
      n.prevDep = s.prevDep, s.prevDep && (s.prevDep.nextDep = n), s.prevDep = te.depsTail, s.nextDep = void 0, te.depsTail.nextDep = s, te.depsTail = s, te.deps === s && (te.deps = n);
    }
    return s;
  }
  trigger(t) {
    this.version++, Xt++, this.notify(t);
  }
  notify(t) {
    dn();
    try {
      for (let s = this.subs; s; s = s.prevSub)
        s.sub.notify() && s.sub.dep.notify();
    } finally {
      hn();
    }
  }
}
function Ti(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let n = t.deps; n; n = n.nextDep)
        Ti(n);
    }
    const s = e.dep.subs;
    s !== e && (e.prevSub = s, s && (s.nextSub = e)), e.dep.subs = e;
  }
}
const Zs = /* @__PURE__ */ new WeakMap(), xt = /* @__PURE__ */ Symbol(
  ""
), en = /* @__PURE__ */ Symbol(
  ""
), Qt = /* @__PURE__ */ Symbol(
  ""
);
function pe(e, t, s) {
  if (Le && te) {
    let n = Zs.get(e);
    n || Zs.set(e, n = /* @__PURE__ */ new Map());
    let i = n.get(s);
    i || (n.set(s, i = new gn()), i.map = n, i.key = s), i.track();
  }
}
function Qe(e, t, s, n, i, r) {
  const l = Zs.get(e);
  if (!l) {
    Xt++;
    return;
  }
  const o = (a) => {
    a && a.trigger();
  };
  if (dn(), t === "clear")
    l.forEach(o);
  else {
    const a = V(e), f = a && un(s);
    if (a && s === "length") {
      const u = Number(n);
      l.forEach((h, g) => {
        (g === "length" || g === Qt || !Ve(g) && g >= u) && o(h);
      });
    } else
      switch ((s !== void 0 || l.has(void 0)) && o(l.get(s)), f && o(l.get(Qt)), t) {
        case "add":
          a ? f && o(l.get("length")) : (o(l.get(xt)), at(e) && o(l.get(en)));
          break;
        case "delete":
          a || (o(l.get(xt)), at(e) && o(l.get(en)));
          break;
        case "set":
          at(e) && o(l.get(xt));
          break;
      }
  }
  hn();
}
function $t(e) {
  const t = /* @__PURE__ */ J(e);
  return t === e || (pe(t, "iterate", Qt), /* @__PURE__ */ Te(e)) ? t : /* @__PURE__ */ Be(e) ? /* @__PURE__ */ ut(e) ? t.map((s) => dt(Ae(s))) : t.map(dt) : t.map(Ae);
}
function $s(e) {
  return pe(e = /* @__PURE__ */ J(e), "iterate", Qt), e;
}
function De(e, t) {
  return /* @__PURE__ */ Be(e) ? dt(/* @__PURE__ */ ut(e) ? Ae(t) : t) : Ae(t);
}
const Fr = {
  __proto__: null,
  [Symbol.iterator]() {
    return Us(this, Symbol.iterator, (e) => De(this, e));
  },
  concat(...e) {
    return $t(this).concat(
      ...e.map((t) => V(t) ? $t(t) : t)
    );
  },
  entries() {
    return Us(this, "entries", (e) => (e[1] = De(this, e[1]), e));
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
      (s) => s.map((n) => De(this, n)),
      arguments
    );
  },
  find(e, t) {
    return Ge(
      this,
      "find",
      e,
      t,
      (s) => De(this, s),
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
      (s) => De(this, s),
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
    return $t(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return Ks(this, "lastIndexOf", e);
  },
  map(e, t) {
    return Ge(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return jt(this, "pop");
  },
  push(...e) {
    return jt(this, "push", e);
  },
  reduce(e, ...t) {
    return Ln(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return Ln(this, "reduceRight", e, t);
  },
  shift() {
    return jt(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return Ge(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return jt(this, "splice", e);
  },
  toReversed() {
    return $t(this).toReversed();
  },
  toSorted(e) {
    return $t(this).toSorted(e);
  },
  toSpliced(...e) {
    return $t(this).toSpliced(...e);
  },
  unshift(...e) {
    return jt(this, "unshift", e);
  },
  values() {
    return Us(this, "values", (e) => De(this, e));
  }
};
function Us(e, t, s) {
  const n = $s(e), i = n[t], r = i.call(n);
  if (n !== e && !/* @__PURE__ */ Te(e)) {
    if (r[Symbol.toStringTag] === "Array Iterator") {
      const l = Object.create(Object.getPrototypeOf(r));
      return l.next = () => Pn(r.next(), s), i !== Ai[t] && Object.defineProperties(l, {
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
    r._next = r.next, r.next = () => Pn(r._next(), s);
  }
  return r;
}
function Pn(e, t) {
  return e.done || (e.value = t(e.value)), e;
}
const Ai = Array.prototype;
function Ge(e, t, s, n, i, r) {
  const l = $s(e), o = l !== e && !/* @__PURE__ */ Te(e), a = l[t];
  if (a !== Ai[t]) {
    const h = a.apply(e, r);
    return o ? Ae(h) : h;
  }
  let f = s;
  l !== e && (o ? f = function(h, g) {
    return s.call(this, De(e, h), g, e);
  } : s.length > 2 && (f = function(h, g) {
    return s.call(this, h, g, e);
  }));
  const u = a.call(l, f, n);
  return o && i ? i(u) : u;
}
function Ln(e, t, s, n) {
  const i = $s(e), r = i !== e && !/* @__PURE__ */ Te(e);
  let l = s, o = !1;
  i !== e && (r ? (o = n.length === 0, l = function(f, u, h) {
    return o && (o = !1, f = De(e, f)), s.call(this, f, De(e, u), h, e);
  }) : s.length > 3 && (l = function(f, u, h) {
    return s.call(this, f, u, h, e);
  }));
  const a = i[t](l, ...n);
  return o ? De(e, a) : a;
}
function Ks(e, t, s) {
  const n = /* @__PURE__ */ J(e);
  pe(n, "iterate", Qt);
  const i = n[t](...s);
  return (i === -1 || i === !1) && /* @__PURE__ */ vn(s[0]) ? (s[0] = /* @__PURE__ */ J(s[0]), n[t](...s)) : i;
}
function jt(e, t, s = []) {
  tt(), dn();
  const n = (/* @__PURE__ */ J(e))[t].apply(e, s);
  return hn(), st(), n;
}
const Nr = /* @__PURE__ */ cn("__proto__,__v_isRef,__isVue"), Ei = /* @__PURE__ */ new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Ve)
);
function jr(e) {
  Ve(e) || (e = String(e));
  const t = /* @__PURE__ */ J(this);
  return pe(t, "has", e), t.hasOwnProperty(e);
}
class Oi {
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
      return n === (i ? r ? zr : Fi : r ? Li : Pi).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(n) ? t : void 0;
    const l = V(t);
    if (!i) {
      let a;
      if (l && (a = Fr[s]))
        return a;
      if (s === "hasOwnProperty")
        return jr;
    }
    const o = Reflect.get(
      t,
      s,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ de(t) ? t : n
    );
    if ((Ve(s) ? Ei.has(s) : Nr(s)) || (i || pe(t, "get", s), r))
      return o;
    if (/* @__PURE__ */ de(o)) {
      const a = l && un(s) ? o : o.value;
      return i && le(a) ? /* @__PURE__ */ sn(a) : a;
    }
    return le(o) ? i ? /* @__PURE__ */ sn(o) : /* @__PURE__ */ gs(o) : o;
  }
}
class Ri extends Oi {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, s, n, i) {
    let r = t[s];
    const l = V(t) && un(s);
    if (!this._isShallow) {
      const f = /* @__PURE__ */ Be(r);
      if (!/* @__PURE__ */ Te(n) && !/* @__PURE__ */ Be(n) && (r = /* @__PURE__ */ J(r), n = /* @__PURE__ */ J(n)), !l && /* @__PURE__ */ de(r) && !/* @__PURE__ */ de(n))
        return f || (r.value = n), !0;
    }
    const o = l ? Number(s) < t.length : Q(t, s), a = Reflect.set(
      t,
      s,
      n,
      /* @__PURE__ */ de(t) ? t : i
    );
    return t === /* @__PURE__ */ J(i) && a && (o ? He(n, r) && Qe(t, "set", s, n) : Qe(t, "add", s, n)), a;
  }
  deleteProperty(t, s) {
    const n = Q(t, s);
    t[s];
    const i = Reflect.deleteProperty(t, s);
    return i && n && Qe(t, "delete", s, void 0), i;
  }
  has(t, s) {
    const n = Reflect.has(t, s);
    return (!Ve(s) || !Ei.has(s)) && pe(t, "has", s), n;
  }
  ownKeys(t) {
    return pe(
      t,
      "iterate",
      V(t) ? "length" : xt
    ), Reflect.ownKeys(t);
  }
}
class Dr extends Oi {
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
const Ur = /* @__PURE__ */ new Ri(), Kr = /* @__PURE__ */ new Dr(), Hr = /* @__PURE__ */ new Ri(!0);
const tn = (e) => e, ls = (e) => Reflect.getPrototypeOf(e);
function Vr(e, t, s) {
  return function(...n) {
    const i = this.__v_raw, r = /* @__PURE__ */ J(i), l = at(r), o = e === "entries" || e === Symbol.iterator && l, a = e === "keys" && l, f = i[e](...n), u = s ? tn : t ? dt : Ae;
    return !t && pe(
      r,
      "iterate",
      a ? en : xt
    ), Ce(
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
function os(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Br(e, t) {
  const s = {
    get(i) {
      const r = this.__v_raw, l = /* @__PURE__ */ J(r), o = /* @__PURE__ */ J(i);
      e || (He(i, o) && pe(l, "get", i), pe(l, "get", o));
      const { has: a } = ls(l), f = t ? tn : e ? dt : Ae;
      if (a.call(l, i))
        return f(r.get(i));
      if (a.call(l, o))
        return f(r.get(o));
      r !== l && r.get(i);
    },
    get size() {
      const i = this.__v_raw;
      return !e && pe(/* @__PURE__ */ J(i), "iterate", xt), i.size;
    },
    has(i) {
      const r = this.__v_raw, l = /* @__PURE__ */ J(r), o = /* @__PURE__ */ J(i);
      return e || (He(i, o) && pe(l, "has", i), pe(l, "has", o)), i === o ? r.has(i) : r.has(i) || r.has(o);
    },
    forEach(i, r) {
      const l = this, o = l.__v_raw, a = /* @__PURE__ */ J(o), f = t ? tn : e ? dt : Ae;
      return !e && pe(a, "iterate", xt), o.forEach((u, h) => i.call(r, f(u), f(h), l));
    }
  };
  return Ce(
    s,
    e ? {
      add: os("add"),
      set: os("set"),
      delete: os("delete"),
      clear: os("clear")
    } : {
      add(i) {
        const r = /* @__PURE__ */ J(this), l = ls(r), o = /* @__PURE__ */ J(i), a = !t && !/* @__PURE__ */ Te(i) && !/* @__PURE__ */ Be(i) ? o : i;
        return l.has.call(r, a) || He(i, a) && l.has.call(r, i) || He(o, a) && l.has.call(r, o) || (r.add(a), Qe(r, "add", a, a)), this;
      },
      set(i, r) {
        !t && !/* @__PURE__ */ Te(r) && !/* @__PURE__ */ Be(r) && (r = /* @__PURE__ */ J(r));
        const l = /* @__PURE__ */ J(this), { has: o, get: a } = ls(l);
        let f = o.call(l, i);
        f || (i = /* @__PURE__ */ J(i), f = o.call(l, i));
        const u = a.call(l, i);
        return l.set(i, r), f ? He(r, u) && Qe(l, "set", i, r) : Qe(l, "add", i, r), this;
      },
      delete(i) {
        const r = /* @__PURE__ */ J(this), { has: l, get: o } = ls(r);
        let a = l.call(r, i);
        a || (i = /* @__PURE__ */ J(i), a = l.call(r, i)), o && o.call(r, i);
        const f = r.delete(i);
        return a && Qe(r, "delete", i, void 0), f;
      },
      clear() {
        const i = /* @__PURE__ */ J(this), r = i.size !== 0, l = i.clear();
        return r && Qe(
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
    s[i] = Vr(i, e, t);
  }), s;
}
function mn(e, t) {
  const s = Br(e, t);
  return (n, i, r) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_isShallow" ? t : i === "__v_raw" ? n : Reflect.get(
    Q(s, i) && i in n ? s : n,
    i,
    r
  );
}
const Wr = {
  get: /* @__PURE__ */ mn(!1, !1)
}, qr = {
  get: /* @__PURE__ */ mn(!1, !0)
}, Gr = {
  get: /* @__PURE__ */ mn(!0, !1)
};
const Pi = /* @__PURE__ */ new WeakMap(), Li = /* @__PURE__ */ new WeakMap(), Fi = /* @__PURE__ */ new WeakMap(), zr = /* @__PURE__ */ new WeakMap();
function Jr(e) {
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
function gs(e) {
  return /* @__PURE__ */ Be(e) ? e : yn(
    e,
    !1,
    Ur,
    Wr,
    Pi
  );
}
// @__NO_SIDE_EFFECTS__
function Yr(e) {
  return yn(
    e,
    !1,
    Hr,
    qr,
    Li
  );
}
// @__NO_SIDE_EFFECTS__
function sn(e) {
  return yn(
    e,
    !0,
    Kr,
    Gr,
    Fi
  );
}
function yn(e, t, s, n, i) {
  if (!le(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e))
    return e;
  const r = i.get(e);
  if (r)
    return r;
  const l = Jr(_r(e));
  if (l === 0)
    return e;
  const o = new Proxy(
    e,
    l === 2 ? n : s
  );
  return i.set(e, o), o;
}
// @__NO_SIDE_EFFECTS__
function ut(e) {
  return /* @__PURE__ */ Be(e) ? /* @__PURE__ */ ut(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function Be(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Te(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function vn(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function J(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ J(t) : e;
}
function Xr(e) {
  return !Q(e, "__v_skip") && Object.isExtensible(e) && vi(e, "__v_skip", !0), e;
}
const Ae = (e) => le(e) ? /* @__PURE__ */ gs(e) : e, dt = (e) => le(e) ? /* @__PURE__ */ sn(e) : e;
// @__NO_SIDE_EFFECTS__
function de(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function Y(e) {
  return Qr(e, !1);
}
function Qr(e, t) {
  return /* @__PURE__ */ de(e) ? e : new Zr(e, t);
}
class Zr {
  constructor(t, s) {
    this.dep = new gn(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = s ? t : /* @__PURE__ */ J(t), this._value = s ? t : Ae(t), this.__v_isShallow = s;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const s = this._rawValue, n = this.__v_isShallow || /* @__PURE__ */ Te(t) || /* @__PURE__ */ Be(t);
    t = n ? t : /* @__PURE__ */ J(t), He(t, s) && (this._rawValue = t, this._value = n ? t : Ae(t), this.dep.trigger());
  }
}
function _e(e) {
  return /* @__PURE__ */ de(e) ? e.value : e;
}
const el = {
  get: (e, t, s) => t === "__v_raw" ? e : _e(Reflect.get(e, t, s)),
  set: (e, t, s, n) => {
    const i = e[t];
    return /* @__PURE__ */ de(i) && !/* @__PURE__ */ de(s) ? (i.value = s, !0) : Reflect.set(e, t, s, n);
  }
};
function Ni(e) {
  return /* @__PURE__ */ ut(e) ? e : new Proxy(e, el);
}
class tl {
  constructor(t, s, n) {
    this.fn = t, this.setter = s, this._value = void 0, this.dep = new gn(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Xt - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !s, this.isSSR = n;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    te !== this)
      return Si(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return Mi(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function sl(e, t, s = !1) {
  let n, i;
  return Z(e) ? n = e : (n = e.get, i = e.set), new tl(n, i, s);
}
const as = {}, ms = /* @__PURE__ */ new WeakMap();
let vt;
function nl(e, t = !1, s = vt) {
  if (s) {
    let n = ms.get(s);
    n || ms.set(s, n = []), n.push(e);
  }
}
function il(e, t, s = re) {
  const { immediate: n, deep: i, once: r, scheduler: l, augmentJob: o, call: a } = s, f = (T) => i ? T : /* @__PURE__ */ Te(T) || i === !1 || i === 0 ? Ze(T, 1) : Ze(T);
  let u, h, g, y, R = !1, I = !1;
  if (/* @__PURE__ */ de(e) ? (h = () => e.value, R = /* @__PURE__ */ Te(e)) : /* @__PURE__ */ ut(e) ? (h = () => f(e), R = !0) : V(e) ? (I = !0, R = e.some((T) => /* @__PURE__ */ ut(T) || /* @__PURE__ */ Te(T)), h = () => e.map((T) => {
    if (/* @__PURE__ */ de(T))
      return T.value;
    if (/* @__PURE__ */ ut(T))
      return f(T);
    if (Z(T))
      return a ? a(T, 2) : T();
  })) : Z(e) ? t ? h = a ? () => a(e, 2) : e : h = () => {
    if (g) {
      tt();
      try {
        g();
      } finally {
        st();
      }
    }
    const T = vt;
    vt = u;
    try {
      return a ? a(e, 3, [y]) : e(y);
    } finally {
      vt = T;
    }
  } : h = wt, t && i) {
    const T = h, H = i === !0 ? 1 / 0 : i;
    h = () => Ze(T(), H);
  }
  const P = Rr(), O = () => {
    u.stop(), P && P.active && hi(P.effects, u);
  };
  if (r && t) {
    const T = t;
    t = (...H) => {
      try {
        return T(...H);
      } finally {
        O();
      }
    };
  }
  let M = I ? new Array(e.length).fill(as) : as;
  const C = (T) => {
    if (!(!(u.flags & 1) || !u.dirty && !T))
      if (t) {
        const H = u.run();
        if (T || i || R || (I ? H.some((z, q) => He(z, M[q])) : He(H, M))) {
          const z = vt;
          tt();
          try {
            g && g(), vt = u;
            const q = [
              H,
              // pass undefined as the old value when it's changed for the first time
              M === as ? void 0 : I && M[0] === as ? [] : M,
              y
            ];
            M = H, a ? a(t, 3, q) : (
              // @ts-expect-error
              t(...q)
            );
          } finally {
            vt = z, st();
          }
        }
      } else
        u.run();
  };
  return o && o(C), u = new xi(h), u.scheduler = l ? () => l(C, !1) : C, y = (T) => nl(T, !1, u), g = u.onStop = () => {
    const T = ms.get(u);
    if (T) {
      if (a)
        a(T, 4);
      else
        for (const H of T) H();
      ms.delete(u);
    }
  }, t ? n ? C(!0) : M = u.run() : l ? l(C.bind(null, !0), !0) : u.run(), O.pause = u.pause.bind(u), O.resume = u.resume.bind(u), O.stop = O, O;
}
function Ze(e, t = 1 / 0, s) {
  if (t <= 0 || !le(e) || e.__v_skip || (s = s || /* @__PURE__ */ new Map(), (s.get(e) || 0) >= t))
    return e;
  if (s.set(e, t), t--, /* @__PURE__ */ de(e))
    Ze(e.value, t, s);
  else if (V(e))
    for (let n = 0; n < e.length; n++)
      Ze(e[n], t, s);
  else if (St(e) || at(e))
    e.forEach((n) => {
      Ze(n, t, s);
    });
  else if (mi(e)) {
    for (const n in e)
      Ze(e[n], t, s);
    for (const n of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, n) && Ze(e[n], t, s);
  }
  return e;
}
function is(e, t, s, n) {
  try {
    return n ? e(...n) : e();
  } catch (i) {
    Ts(i, t, s);
  }
}
function We(e, t, s, n) {
  if (Z(e)) {
    const i = is(e, t, s, n);
    return i && pi(i) && i.catch((r) => {
      Ts(r, t, s, void 0, !0);
    }), i;
  }
  if (V(e)) {
    const i = [];
    for (let r = 0; r < e.length; r++)
      i.push(We(e[r], t, s, n));
    return i;
  }
}
function Ts(e, t, s, n = !0, i = !1) {
  const r = t ? t.vnode : null, { errorHandler: l, throwUnhandledErrorInProduction: o } = t && t.appContext.config || re;
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
      tt(), is(l, null, 10, [
        e,
        f,
        u
      ]), st();
      return;
    }
  }
  rl(e, s, r, n, o);
}
function rl(e, t, s, n = !0, i = !1) {
  if (i)
    throw e;
  console.error(e);
}
const me = [];
let Re = -1;
const Ue = [];
let lt = null, Tt = 0;
const ji = /* @__PURE__ */ Promise.resolve();
let ys = null;
function At(e) {
  const t = ys || ji;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function ll(e) {
  let t = Re + 1, s = me.length;
  for (; t < s; ) {
    const n = t + s >>> 1, i = me[n], r = Zt(i);
    r < e || r === e && i.flags & 2 ? t = n + 1 : s = n;
  }
  return t;
}
function bn(e) {
  if (!(e.flags & 1)) {
    const t = Zt(e), s = me[me.length - 1];
    !s || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= Zt(s) ? me.push(e) : me.splice(ll(t), 0, e), e.flags |= 1, Di();
  }
}
function Di() {
  ys || (ys = ji.then(Hi));
}
function ol(e) {
  if (!V(e))
    lt && e.id === -1 ? lt.splice(Tt + 1, 0, e) : e.flags & 1 || (Ue.push(e), e.flags |= 1);
  else
    for (let t = 0; t < e.length; t++)
      Ue.push(e[t]);
  Di();
}
function Ui(e, t, s, n = Re + 1) {
  for (; n < me.length; n++) {
    const i = me[n];
    if (i && i.flags & 2) {
      if (e && i.id !== e.uid || t !== void 0 && !(i.id >= t))
        continue;
      me.splice(n, 1), n = e ? n - 1 : Re, i.flags & 4 && (i.flags &= -2), i(), i.flags & 4 || (i.flags &= -2);
    }
  }
}
function Ki(e, t, s = 0) {
  if (Ue.length) {
    let n = Ue, i = 0;
    if (t) {
      n = [];
      for (let l = 0; l < Ue.length; l++) {
        const o = Ue[l];
        (o.i !== void 0 ? !o.i || o.i.uid < s : t.has(o)) ? Ue[i++] = o : n.push(o);
      }
    }
    const r = [...new Set(n)].sort((l, o) => Zt(l) - Zt(o));
    if (Ue.length = i, lt) {
      for (let l = 0; l < r.length; l++)
        lt.push(r[l]);
      return;
    }
    for (lt = r, Tt = 0; Tt < lt.length; Tt++) {
      const l = lt[Tt];
      l.flags & 4 && (l.flags &= -2), l.flags & 8 || l(), l.flags &= -2;
    }
    lt = null, Tt = 0;
  }
}
let Hs = !1;
function al(e, t) {
  if (Hs) {
    e();
    return;
  }
  const s = t === void 0 ? void 0 : new Set(Ue);
  e(), Hs = !0;
  try {
    Ui(void 0, t), Ki(void 0, s, t);
  } finally {
    Hs = !1;
  }
}
const Zt = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Hi(e) {
  try {
    for (Re = 0; Re < me.length; Re++) {
      const t = me[Re];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), is(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; Re < me.length; Re++) {
      const t = me[Re];
      t && (t.flags &= -2);
    }
    Re = -1, me.length = 0, Ki(), ys = null, (me.length || Ue.length) && Hi();
  }
}
let $e = null, Vi = null;
function vs(e) {
  const t = $e;
  return $e = e, Vi = e && e.type.__scopeId || null, t;
}
function cl(e, t = $e, s) {
  if (!t || e._n)
    return e;
  const n = (...i) => {
    n._d && Hn(-1);
    const r = vs(t), l = kt.length;
    let o;
    try {
      o = e(...i);
    } finally {
      for (let a = kt.length; a > l; a--) lr();
      vs(r), n._d && Hn(1);
    }
    return o;
  };
  return n._n = !0, n._c = !0, n._d = !0, n;
}
function ul(e, t) {
  if ($e === null)
    return e;
  const s = Ps($e), n = e.dirs || (e.dirs = []);
  for (let i = 0; i < t.length; i++) {
    let [r, l, o, a = re] = t[i];
    r && (Z(r) && (r = {
      mounted: r,
      updated: r
    }), r.deep && Ze(l), n.push({
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
function mt(e, t, s, n) {
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
    l ? a.oldValue = l[o].value : n === "mounted" && a.oldValue !== void 0 && (a = Ce({}, a, { oldValue: void 0 }));
    let f = a.dir[n];
    f && (tt(), We(f, s, 8, [
      e.el,
      a,
      i,
      t
    ]), st());
  }
}
function fl(e, t, s = !1) {
  const n = zl();
  if (n || Et) {
    let i = Et ? Et._context.provides : n ? n.parent == null || n.ce ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides : void 0;
    if (i && e in i)
      return i[e];
    if (arguments.length > 1)
      return s && Z(t) ? t.call(n && n.proxy) : t;
  }
}
const dl = /* @__PURE__ */ Symbol.for("v-scx"), hl = () => fl(dl);
function _t(e, t, s) {
  return pl(e, t, s);
}
function pl(e, t, s = re) {
  const { immediate: n, deep: i, flush: r, once: l } = s, o = Ce({}, s), a = t && n || !t && r !== "post";
  let f;
  if (ss) {
    if (r === "sync") {
      const y = hl();
      f = y.__watcherHandles || (y.__watcherHandles = []);
    } else if (!a) {
      const y = () => {
      };
      return y.stop = wt, y.resume = wt, y.pause = wt, y;
    }
  }
  const u = ht;
  o.call = (y, R, I) => We(y, u, R, I);
  let h = !1;
  r === "post" ? o.scheduler = (y) => {
    y.i = u, ge(y, u && u.suspense);
  } : r !== "sync" && (h = !0, o.scheduler = (y, R) => {
    R ? y() : bn(y);
  }), o.augmentJob = (y) => {
    t && (y.flags |= 4), h && (y.flags |= 2, u && (y.id = u.uid, y.i = u));
  };
  const g = il(e, t, o);
  return ss && (f ? f.push(g) : a && g()), g;
}
const gl = /* @__PURE__ */ Symbol("_vte"), As = (e) => e.__isTeleport, Vs = /* @__PURE__ */ Symbol("_leaveCb");
function ml(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const s of e)
      if (s.type !== Fe) {
        t = s;
        break;
      }
  }
  return t;
}
function Bi(e) {
  if (!Wi(e))
    return As(e.type) && e.children ? ml(e.children) : e;
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
function qt(e, t) {
  if (e.shapeFlag & 6 && e.component) {
    e.transition = t;
    const s = e.component.subTree;
    qt(
      As(s.type) && Bi(s) || s,
      t
    );
  } else if (e.shapeFlag & 128) {
    const s = e.suspense;
    if (s) {
      const n = s.isHydrating ? s.pendingBranch : s.activeBranch;
      n && qt(n, t.clone(n));
    } else
      e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback);
  } else if (e.transition = t, e.type === X && V(e.children)) {
    const s = zi(e.children, !1);
    s && qt(s, t);
  }
}
function nn(e) {
  if (e.component)
    return nn(e.component.subTree);
  if (e.type === X) {
    const t = V(e.children) && zi(e.children, !1);
    return t ? nn(t) : void 0;
  }
  if (e.type !== Fe)
    return e;
}
// @__NO_SIDE_EFFECTS__
function rs(e, t) {
  return Z(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    Ce({ name: e.name }, t, { setup: e })
  ) : e;
}
function yl(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function Fn(e, t) {
  let s;
  return !!((s = Object.getOwnPropertyDescriptor(e, t)) && !s.configurable);
}
const bs = /* @__PURE__ */ new WeakMap();
function Gt(e, t, s, n, i = !1) {
  if (V(e)) {
    e.forEach(
      (I, P) => Gt(
        I,
        t && (V(t) ? t[P] : t),
        s,
        n,
        i
      )
    );
    return;
  }
  if (zt(n) && !i) {
    n.shapeFlag & 512 && n.type.__asyncResolved && n.component.subTree.component && Gt(e, t, s, n.component.subTree);
    return;
  }
  const r = n.shapeFlag & 4 ? Ps(n.component) : n.el, l = i ? null : r, { i: o, r: a } = e, f = t && t.r, u = o.refs === re ? o.refs = {} : o.refs, h = o.setupState, g = /* @__PURE__ */ J(h), y = h === re ? di : (I) => Fn(u, I) ? !1 : Q(g, I), R = (I, P) => !(P && Fn(u, P));
  if (f != null && f !== a) {
    if (Nn(t), ce(f))
      u[f] = null, y(f) && (h[f] = null);
    else if (/* @__PURE__ */ de(f)) {
      const I = t;
      R(f, I.k) && (f.value = null), I.k && (u[I.k] = null);
    }
  }
  if (Z(a))
    is(a, o, 12, [l, u]);
  else {
    const I = ce(a), P = /* @__PURE__ */ de(a);
    if (I || P) {
      const O = () => {
        if (e.f) {
          const M = I ? y(a) ? h[a] : u[a] : R() || !e.k ? a.value : u[e.k];
          if (i)
            V(M) && hi(M, r);
          else if (V(M))
            M.includes(r) || M.push(r);
          else if (I)
            u[a] = [r], y(a) && (h[a] = u[a]);
          else {
            const C = [r];
            R(a, e.k) && (a.value = C), e.k && (u[e.k] = C);
          }
        } else I ? (u[a] = l, y(a) && (h[a] = l)) : P && (R(a, e.k) && (a.value = l), e.k && (u[e.k] = l));
      };
      if (l) {
        const M = () => {
          O(), bs.delete(e);
        };
        M.id = -1, bs.set(e, M), ge(M, s);
      } else
        Nn(e), O();
    }
  }
}
function Nn(e) {
  const t = bs.get(e);
  t && (t.flags |= 8, bs.delete(e));
}
Ms().requestIdleCallback;
Ms().cancelIdleCallback;
const zt = (e) => !!e.type.__asyncLoader, Wi = (e) => e.type.__isKeepAlive;
function vl(e, t, s = ht, n = !1) {
  if (s) {
    const i = s[e] || (s[e] = []), r = t.__weh || (t.__weh = (...l) => {
      tt();
      const o = Sn(s), a = We(t, s, e, l);
      return o(), st(), a;
    });
    return n ? i.unshift(r) : i.push(r), r;
  }
}
const qi = (e) => (t, s = ht) => {
  (!ss || e === "sp") && vl(e, (...n) => t(...n), s);
}, _n = qi("m"), Es = qi(
  "bum"
), bl = /* @__PURE__ */ Symbol.for("v-ndc");
function xe(e, t, s, n) {
  let i;
  const r = s, l = V(e);
  if (l || ce(e)) {
    const o = l && /* @__PURE__ */ ut(e);
    let a = !1, f = !1;
    o && (a = !/* @__PURE__ */ Te(e), f = /* @__PURE__ */ Be(e), e = $s(e)), i = new Array(e.length);
    for (let u = 0, h = e.length; u < h; u++)
      i[u] = t(
        a ? f ? dt(Ae(e[u])) : Ae(e[u]) : e[u],
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
  else if (le(e))
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
const rn = (e) => e ? ur(e) ? Ps(e) : rn(e.parent) : null, Jt = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Ce(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => rn(e.parent),
    $root: (e) => rn(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => e.type,
    $forceUpdate: (e) => e.f || (e.f = () => {
      bn(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = At.bind(e.proxy)),
    $watch: (e) => wt
  })
), Bs = (e, t) => e !== re && !e.__isScriptSetup && Q(e, t), _l = {
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
        if (Bs(n, t))
          return l[t] = 1, n[t];
        if (Q(r, t))
          return l[t] = 3, r[t];
        if (s !== re && Q(s, t))
          return l[t] = 4, s[t];
        l[t] = 0;
      }
    }
    const f = Jt[t];
    let u, h;
    if (f)
      return t === "$attrs" && pe(e.attrs, "get", ""), f(e);
    if (
      // css module (injected by vue-loader)
      (u = o.__cssModules) && (u = u[t])
    )
      return u;
    if (s !== re && Q(s, t))
      return l[t] = 4, s[t];
    if (
      // global properties
      h = a.config.globalProperties, Q(h, t)
    )
      return h[t];
  },
  set({ _: e }, t, s) {
    const { data: n, setupState: i, ctx: r } = e;
    return Bs(i, t) ? (i[t] = s, !0) : Q(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (r[t] = s, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: s, ctx: n, appContext: i, props: r, type: l }
  }, o) {
    let a;
    return !!(s[o] || Bs(t, o) || Q(r, o) || Q(n, o) || Q(Jt, o) || Q(i.config.globalProperties, o) || (a = l.__cssModules) && a[o]);
  },
  defineProperty(e, t, s) {
    return s.get != null ? e._.accessCache[t] = 0 : Q(s, "value") && this.set(e, t, s.value, null), Reflect.defineProperty(e, t, s);
  }
};
function Gi() {
  return {
    app: null,
    config: {
      isNativeTag: di,
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
let wl = 0;
function xl(e, t) {
  return function(n, i = null) {
    Z(n) || (n = Ce({}, n)), i != null && !le(i) && (i = null);
    const r = Gi(), l = /* @__PURE__ */ new WeakSet(), o = [];
    let a = !1;
    const f = r.app = {
      _uid: wl++,
      _component: n,
      _props: i,
      _container: null,
      _context: r,
      _instance: null,
      version: eo,
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
          const y = f._ceVNode || Se(n, i);
          return y.appContext = r, g === !0 ? g = "svg" : g === !1 && (g = void 0), e(y, u, g), a = !0, f._container = u, u.__vue_app__ = f, Ps(y.component);
        }
      },
      onUnmount(u) {
        o.push(u);
      },
      unmount() {
        a && (We(
          o,
          f._instance,
          16
        ), e(null, f._container), delete f._container.__vue_app__);
      },
      provide(u, h) {
        return r.provides[u] = h, f;
      },
      runWithContext(u) {
        const h = Et;
        Et = f;
        try {
          return u();
        } finally {
          Et = h;
        }
      }
    };
    return f;
  };
}
let Et = null;
const kl = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Pe(t)}Modifiers`] || e[`${Ct(t)}Modifiers`];
function Sl(e, t, ...s) {
  if (e.isUnmounted) return;
  const n = e.vnode.props || re;
  let i = s;
  const r = t.startsWith("update:"), l = r && kl(n, t.slice(7));
  l && (l.trim && (i = s.map((u) => ce(u) ? u.trim() : u)), l.number && (i = i.map(fn)));
  let o, a = n[o = Ns(t)] || // also try camelCase event handler (#2249)
  n[o = Ns(Pe(t))];
  !a && r && (a = n[o = Ns(Ct(t))]), a && We(
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
    e.emitted[o] = !0, We(
      f,
      e,
      6,
      i
    );
  }
}
function Cl(e, t, s = !1) {
  const n = t.emitsCache, i = n.get(e);
  if (i !== void 0)
    return i;
  const r = e.emits;
  let l = {};
  return r ? (V(r) ? r.forEach((o) => l[o] = null) : Ce(l, r), le(e) && n.set(e, l), l) : (le(e) && n.set(e, null), null);
}
function Os(e, t) {
  return !e || !Ss(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), Q(e, t[0].toLowerCase() + t.slice(1)) || Q(e, Ct(t)) || Q(e, t));
}
function jn(e) {
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
    setupState: y,
    ctx: R,
    inheritAttrs: I
  } = e, P = vs(e);
  let O, M;
  try {
    if (s.shapeFlag & 4) {
      const T = i || n, H = T;
      O = Ke(
        f.call(
          H,
          T,
          u,
          h,
          y,
          g,
          R
        )
      ), M = o;
    } else {
      const T = t;
      O = Ke(
        T.length > 1 ? T(
          h,
          { attrs: o, slots: l, emit: a }
        ) : T(
          h,
          null
        )
      ), M = t.props ? o : Il(o);
    }
  } catch (T) {
    kt.length = 0, Ts(T, e, 1), O = Se(Fe);
  }
  let C = O;
  if (M && I !== !1) {
    const T = Object.keys(M), { shapeFlag: H } = C;
    T.length && H & 7 && (r && T.some(Cs) && (M = Ml(
      M,
      r
    )), C = Ot(C, M, !1, !0));
  }
  if (s.dirs && (C = Ot(C, null, !1, !0), C.dirs = C.dirs ? C.dirs.concat(s.dirs) : s.dirs), s.transition) {
    const T = As(C.type) && Bi(C) || C;
    qt(T, s.transition);
  }
  return O = C, vs(P), O;
}
function zi(e, t = !0) {
  let s;
  for (let n = 0; n < e.length; n++) {
    const i = e[n];
    if (kn(i)) {
      if (i.type !== Fe || i.children === "v-if") {
        if (s)
          return;
        s = i;
      }
    } else
      return;
  }
  return s;
}
const Il = (e) => {
  let t;
  for (const s in e)
    (s === "class" || s === "style" || Ss(s)) && ((t || (t = {}))[s] = e[s]);
  return t;
}, Ml = (e, t) => {
  const s = {};
  for (const n in e)
    (!Cs(n) || !(n.slice(9) in t)) && (s[n] = e[n]);
  return s;
};
function $l(e, t, s) {
  const { props: n, children: i, component: r } = e, { props: l, children: o, patchFlag: a } = t, f = r.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (s && a >= 0) {
    if (a & 1024)
      return !0;
    if (a & 16)
      return n ? Dn(n, l, f) : !!l;
    if (a & 8) {
      const u = t.dynamicProps;
      for (let h = 0; h < u.length; h++) {
        const g = u[h];
        if (Ji(l, n, g) && !Os(f, g))
          return !0;
      }
    }
  } else
    return (i || o) && (!o || !o.$stable) ? !0 : n === l ? !1 : n ? l ? Dn(n, l, f) : !0 : !!l;
  return !1;
}
function Dn(e, t, s) {
  const n = Object.keys(t);
  if (n.length !== Object.keys(e).length)
    return !0;
  for (let i = 0; i < n.length; i++) {
    const r = n[i];
    if (!Q(e, r) || Ji(t, e, r) && !Os(s, r))
      return !0;
  }
  return !1;
}
function Ji(e, t, s) {
  const n = e[s], i = t[s];
  return s === "style" && le(n) && le(i) ? !ft(n, i) : n !== i;
}
function Tl({ vnode: e, parent: t, suspense: s }, n) {
  for (; t; ) {
    const i = t.subTree;
    if (i.suspense && i.suspense.activeBranch === e && (i.suspense.vnode.el = i.el = n, e = i), i === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
  s && s.activeBranch === e && (s.vnode.el = n);
}
const Yi = {}, Xi = () => Object.create(Yi), Qi = (e) => Object.getPrototypeOf(e) === Yi;
function Al(e, t, s, n = !1) {
  const i = {}, r = Xi();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Zi(e, t, i, r);
  for (const l in e.propsOptions[0])
    l in i || (i[l] = void 0);
  s ? e.props = n ? i : /* @__PURE__ */ Yr(i) : e.type.props ? e.props = i : e.props = r, e.attrs = r;
}
function El(e, t, s, n) {
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
        if (Os(e.emitsOptions, g))
          continue;
        const y = t[g];
        if (a)
          if (Q(r, g))
            y !== r[g] && (r[g] = y, f = !0);
          else {
            const R = Pe(g);
            i[R] = ln(
              a,
              o,
              R,
              y,
              e,
              !1
            );
          }
        else
          y !== r[g] && (r[g] = y, f = !0);
      }
    }
  } else {
    Zi(e, t, i, r) && (f = !0);
    let u;
    for (const h in o)
      (!t || // for camelCase
      !Q(t, h) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((u = Ct(h)) === h || !Q(t, u))) && (a ? s && // for camelCase
      (s[h] !== void 0 || // for kebab-case
      s[u] !== void 0) && (i[h] = ln(
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
  f && Qe(e.attrs, "set", "");
}
function Zi(e, t, s, n) {
  const [i, r] = e.propsOptions;
  let l = !1, o;
  if (t)
    for (let a in t) {
      if (Vt(a))
        continue;
      const f = t[a];
      let u;
      i && Q(i, u = Pe(a)) ? !r || !r.includes(u) ? s[u] = f : (o || (o = {}))[u] = f : Os(e.emitsOptions, a) || (!(a in n) || f !== n[a]) && (n[a] = f, l = !0);
    }
  if (r) {
    const a = /* @__PURE__ */ J(s), f = o || re;
    for (let u = 0; u < r.length; u++) {
      const h = r[u];
      s[h] = ln(
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
function ln(e, t, s, n, i, r) {
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
          const u = Sn(i);
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
function Ol(e, t, s = !1) {
  const n = t.propsCache, i = n.get(e);
  if (i)
    return i;
  const r = e.props, l = {}, o = [];
  if (!r)
    return le(e) && n.set(e, bt), bt;
  if (V(r))
    for (let f = 0; f < r.length; f++) {
      const u = Pe(r[f]);
      Un(u) && (l[u] = re);
    }
  else if (r)
    for (const f in r) {
      const u = Pe(f);
      if (Un(u)) {
        const h = r[f], g = l[u] = V(h) || Z(h) ? { type: h } : Ce({}, h), y = g.type;
        let R = !1, I = !0;
        if (V(y))
          for (let P = 0; P < y.length; ++P) {
            const O = y[P], M = Z(O) && O.name;
            if (M === "Boolean") {
              R = !0;
              break;
            } else M === "String" && (I = !1);
          }
        else
          R = Z(y) && y.name === "Boolean";
        g[
          0
          /* shouldCast */
        ] = R, g[
          1
          /* shouldCastTrue */
        ] = I, (R || Q(g, "default")) && o.push(u);
      }
    }
  const a = [l, o];
  return le(e) && n.set(e, a), a;
}
function Un(e) {
  return e[0] !== "$" && !Vt(e);
}
const wn = (e) => e === "_" || e === "_ctx" || e === "$stable", xn = (e) => V(e) ? e.map(Ke) : [Ke(e)], Rl = (e, t, s) => {
  if (t._n)
    return t;
  const n = cl((...i) => xn(t(...i)), s);
  return n._c = !1, n;
}, er = (e, t, s) => {
  const n = e._ctx;
  for (const i in e) {
    if (wn(i)) continue;
    const r = e[i];
    if (Z(r))
      t[i] = Rl(i, r, n);
    else if (r != null) {
      const l = xn(r);
      t[i] = () => l;
    }
  }
}, tr = (e, t) => {
  const s = xn(t);
  e.slots.default = () => s;
}, sr = (e, t, s) => {
  for (const n in t)
    (s || !wn(n)) && (e[n] = t[n]);
}, Pl = (e, t, s) => {
  const n = e.slots = Xi();
  if (e.vnode.shapeFlag & 32) {
    const i = t._;
    i ? (sr(n, t, s), s && vi(n, "_", i, !0)) : er(t, n);
  } else t && tr(e, t);
}, Ll = (e, t, s) => {
  const { vnode: n, slots: i } = e;
  let r = !0, l = re;
  if (n.shapeFlag & 32) {
    const o = t._;
    o ? s && o === 1 ? r = !1 : sr(i, t, s) : (r = !t.$stable, er(t, i)), l = t;
  } else t && (tr(e, t), l = { default: 1 });
  if (r)
    for (const o in i)
      !wn(o) && l[o] == null && delete i[o];
}, ge = Kl;
function Fl(e) {
  return Nl(e);
}
function Nl(e, t) {
  const s = Ms();
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
    setScopeId: y = wt,
    insertStaticContent: R
  } = e, I = (c, d, v, S = null, b = null, w = null, E = void 0, A = null, $ = !!d.dynamicChildren) => {
    if (c === d)
      return;
    c && !Dt(c, d) && (S = It(c), Ie(c, b, w, !0), c = null), d.patchFlag === -2 && ($ = !1, d.dynamicChildren = null), d.dynamicChildren && c && c.dynamicChildren && c.dynamicChildren.hasOnce && (d.dynamicChildren === bt && (d.dynamicChildren = []), d.dynamicChildren.hasOnce = !0);
    const { type: _, ref: F, shapeFlag: m } = d;
    switch (_) {
      case Rs:
        P(c, d, v, S);
        break;
      case Fe:
        O(c, d, v, S);
        break;
      case qs:
        c == null && M(d, v, S, E);
        break;
      case X:
        oe(
          c,
          d,
          v,
          S,
          b,
          w,
          E,
          A,
          $
        );
        break;
      default:
        m & 1 ? H(
          c,
          d,
          v,
          S,
          b,
          w,
          E,
          A,
          $
        ) : m & 6 ? ue(
          c,
          d,
          v,
          S,
          b,
          w,
          E,
          A,
          $
        ) : (m & 64 || m & 128) && _.process(
          c,
          d,
          v,
          S,
          b,
          w,
          E,
          A,
          $,
          gt
        );
    }
    F != null && b ? Gt(F, c && c.ref, w, d || c, !d) : F == null && c && c.ref != null && Gt(c.ref, null, w, c, !0);
  }, P = (c, d, v, S) => {
    if (c == null)
      n(
        d.el = o(d.children),
        v,
        S
      );
    else {
      const b = d.el = c.el;
      d.children !== c.children && f(b, d.children);
    }
  }, O = (c, d, v, S) => {
    c == null ? n(
      d.el = a(d.children || ""),
      v,
      S
    ) : d.el = c.el;
  }, M = (c, d, v, S) => {
    [c.el, c.anchor] = R(
      c.children,
      d,
      v,
      S,
      c.el,
      c.anchor
    );
  }, C = ({ el: c, anchor: d }, v, S) => {
    let b;
    for (; c && c !== d; )
      b = g(c), n(c, v, S), c = b;
    n(d, v, S);
  }, T = ({ el: c, anchor: d }) => {
    let v;
    for (; c && c !== d; )
      v = g(c), i(c), c = v;
    i(d);
  }, H = (c, d, v, S, b, w, E, A, $) => {
    if (d.type === "svg" ? E = "svg" : d.type === "math" && (E = "mathml"), c == null)
      z(
        d,
        v,
        S,
        b,
        w,
        E,
        A,
        $
      );
    else {
      const _ = c.el && c.el._isVueCE ? c.el : null;
      try {
        _ && _._beginPatch(), ee(
          c,
          d,
          b,
          w,
          E,
          A,
          $
        );
      } finally {
        _ && _._endPatch();
      }
    }
  }, z = (c, d, v, S, b, w, E, A) => {
    let $, _;
    const { props: F, shapeFlag: m, transition: p, dirs: k } = c;
    if ($ = c.el = l(
      c.type,
      w,
      F && F.is,
      F
    ), m & 8 ? u($, c.children) : m & 16 && D(
      c.children,
      $,
      null,
      S,
      b,
      Ws(c, w),
      E,
      A
    ), k && mt(c, null, S, "created"), q($, c, c.scopeId, E, S), F) {
      for (const G in F)
        G !== "value" && !Vt(G) && r($, G, null, F[G], w, S);
      "value" in F && r($, "value", null, F.value, w), (_ = F.onVnodeBeforeMount) && je(_, S, c);
    }
    k && mt(c, null, S, "beforeMount");
    const K = jl(b, p);
    K ? p.beforeEnter($) : p && !p.persisted && ($[Ul] = !0), n($, d, v), ((_ = F && F.onVnodeMounted) || K || k) && ge(() => {
      _ && je(_, S, c), K && p.enter($), k && mt(c, null, S, "mounted");
    }, b);
  }, q = (c, d, v, S, b) => {
    if (v && y(c, v), S)
      for (let w = 0; w < S.length; w++)
        y(c, S[w]);
    if (b) {
      let w = b.subTree;
      if (d === w || rr(w.type) && (w.ssContent === d || w.ssFallback === d)) {
        const E = b.vnode;
        q(
          c,
          E,
          E.scopeId,
          E.slotScopeIds,
          b.parent
        );
      }
    }
  }, D = (c, d, v, S, b, w, E, A, $ = 0) => {
    for (let _ = $; _ < c.length; _++) {
      const F = c[_] = A ? Ye(c[_]) : Ke(c[_]);
      I(
        null,
        F,
        d,
        v,
        S,
        b,
        w,
        E,
        A
      );
    }
  }, ee = (c, d, v, S, b, w, E) => {
    const A = d.el = c.el;
    let { patchFlag: $, dynamicChildren: _, dirs: F } = d;
    $ |= c.patchFlag & 16;
    const m = c.props || re, p = d.props || re;
    let k;
    if (v && yt(v, !1), (k = p.onVnodeBeforeUpdate) && je(k, v, d, c), F && mt(d, c, v, "beforeUpdate"), v && yt(v, !0), // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    _ && (!c.dynamicChildren || c.dynamicChildren.length !== _.length) && ($ = 0, E = !1, _ = null), (m.innerHTML && p.innerHTML == null || m.textContent && p.textContent == null) && u(A, ""), _ ? B(
      c.dynamicChildren,
      _,
      A,
      v,
      S,
      Ws(d, b),
      w
    ) : E || Lt(
      c,
      d,
      A,
      null,
      v,
      S,
      Ws(d, b),
      w,
      !1
    ), $ > 0) {
      if ($ & 16)
        U(A, m, p, v, b);
      else if ($ & 2 && m.class !== p.class && r(A, "class", null, p.class, b), $ & 4 && r(A, "style", m.style, p.style, b), $ & 8) {
        const K = d.dynamicProps;
        for (let G = 0; G < K.length; G++) {
          const W = K[G], se = m[W], ne = p[W];
          (ne !== se || W === "value") && r(A, W, se, ne, b, v);
        }
      }
      $ & 1 && c.children !== d.children && u(A, d.children);
    } else !E && _ == null && U(A, m, p, v, b);
    ((k = p.onVnodeUpdated) || F) && ge(() => {
      k && je(k, v, d, c), F && mt(d, c, v, "updated");
    }, S);
  }, B = (c, d, v, S, b, w, E) => {
    for (let A = 0; A < d.length; A++) {
      const $ = c[A], _ = d[A], F = $.el || Yt($), m = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        F && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        ($.type === X || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Dt($, _) || // - In the case of a component, it could contain anything.
        $.shapeFlag & 198) ? h(F) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          v
        )
      );
      I(
        $,
        _,
        m,
        null,
        S,
        b,
        w,
        E,
        !0
      );
    }
  }, U = (c, d, v, S, b) => {
    if (d !== v) {
      if (d !== re)
        for (const w in d)
          !Vt(w) && !(w in v) && r(
            c,
            w,
            d[w],
            null,
            b,
            S
          );
      for (const w in v) {
        if (Vt(w)) continue;
        const E = v[w], A = d[w];
        E !== A && w !== "value" && r(c, w, A, E, b, S);
      }
      "value" in v && r(c, "value", d.value, v.value, b);
    }
  }, oe = (c, d, v, S, b, w, E, A, $) => {
    const _ = d.el = c ? c.el : o(""), F = d.anchor = c ? c.anchor : o("");
    let { patchFlag: m, dynamicChildren: p, slotScopeIds: k } = d;
    k && (A = A ? A.concat(k) : k), c == null ? (n(_, v, S), n(F, v, S), D(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      d.children || [],
      v,
      F,
      b,
      w,
      E,
      A,
      $
    )) : m > 0 && m & 64 && p && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    c.dynamicChildren && c.dynamicChildren.length === p.length ? (B(
      c.dynamicChildren,
      p,
      v,
      b,
      w,
      E,
      A
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (d.key != null || b && d === b.subTree) && nr(
      c,
      d,
      !0
      /* shallow */
    )) : Lt(
      c,
      d,
      v,
      F,
      b,
      w,
      E,
      A,
      $
    );
  }, ue = (c, d, v, S, b, w, E, A, $) => {
    d.slotScopeIds = A, c == null ? d.shapeFlag & 512 ? b.ctx.activate(
      d,
      v,
      S,
      E,
      $
    ) : Ee(
      d,
      v,
      S,
      b,
      w,
      E,
      $
    ) : qe(c, d, $);
  }, Ee = (c, d, v, S, b, w, E) => {
    const A = c.component = Gl(
      c,
      S,
      b
    );
    if (Wi(c) && (A.ctx.renderer = gt), Jl(A, !1, E), A.asyncDep) {
      if (b && b.registerDep(
        A,
        nt,
        E,
        w
      ), !c.el) {
        const $ = A.subTree = Se(Fe);
        O(null, $, d, v), c.placeholder = $.el;
      }
    } else
      nt(
        A,
        c,
        d,
        v,
        b,
        w,
        E
      );
  }, qe = (c, d, v) => {
    const S = d.component = c.component;
    if ($l(c, d, v))
      if (S.asyncDep && !S.asyncResolved) {
        d.el = c.el, d.placeholder = c.placeholder, Pt(S, d, v);
        return;
      } else
        S.next = d, S.update();
    else
      d.el = c.el, d.placeholder = c.placeholder, S.vnode = d;
  }, nt = (c, d, v, S, b, w, E) => {
    const A = () => {
      if (c.isMounted) {
        let { next: m, bu: p, u: k, parent: K, vnode: G } = c;
        {
          const ve = ir(c);
          if (ve) {
            m && (m.el = G.el, Pt(c, m, E)), ve.asyncDep.then(() => {
              const Me = () => {
                c.job.flags & 8 || (b && b.pendingBranch ? ge(Me, b) : _());
              };
              Me.flags = 48, ge(Me, b);
            });
            return;
          }
        }
        let W = m, se;
        yt(c, !1), m ? (m.el = G.el, Pt(c, m, E)) : m = G, p && fs(p), (se = m.props && m.props.onVnodeBeforeUpdate) && je(se, K, m, G), yt(c, !0);
        const ne = jn(c), ye = c.subTree;
        c.subTree = ne, I(
          ye,
          ne,
          // parent may have changed if it's in a teleport. a root that is a
          // pending async component only has its placeholder comment
          h(
            ye.el || Yt(ye)
          ),
          // anchor may have changed if it's in a fragment
          It(ye),
          c,
          b,
          w
        ), m.el = ne.el, W === null && Tl(c, ne.el), k && ge(k, b), (se = m.props && m.props.onVnodeUpdated) && ge(
          () => je(se, K, m, G),
          b
        );
      } else {
        let m;
        const { el: p, props: k } = d, { bm: K, m: G, parent: W, root: se, type: ne } = c, ye = zt(d);
        yt(c, !1), K && fs(K), !ye && (m = k && k.onVnodeBeforeMount) && je(m, W, d), yt(c, !0);
        {
          se.ce && se.ce._hasShadowRoot() && se.ce._injectChildStyle(
            ne,
            c.parent ? c.parent.type : void 0
          );
          const ve = c.subTree = jn(c);
          I(
            null,
            ve,
            v,
            S,
            c,
            b,
            w
          ), d.el = ve.el;
        }
        if (G && ge(G, b), !ye && (m = k && k.onVnodeMounted)) {
          const ve = d;
          ge(
            () => je(m, W, ve),
            b
          );
        }
        (d.shapeFlag & 256 || W && zt(W.vnode) && W.vnode.shapeFlag & 256) && c.a && ge(c.a, b), c.isMounted = !0, d = v = S = null;
      }
    };
    c.scope.on();
    const $ = c.effect = new xi(A);
    c.scope.off();
    const _ = c.update = $.run.bind($), F = c.job = $.runIfDirty.bind($);
    F.i = c, F.id = c.uid, $.scheduler = () => bn(F), yt(c, !0), _();
  }, Pt = (c, d, v) => {
    d.component = c;
    const S = c.vnode.props;
    c.vnode = d, c.next = null, El(c, d.props, S, v), Ll(c, d.children, v), tt(), Ui(c), st();
  }, Lt = (c, d, v, S, b, w, E, A, $ = !1) => {
    const _ = c && c.children, F = c ? c.shapeFlag : 0, m = d.children, { patchFlag: p, shapeFlag: k } = d;
    if (p > 0) {
      if (p & 128) {
        pt(
          _,
          m,
          v,
          S,
          b,
          w,
          E,
          A,
          $
        );
        return;
      } else if (p & 256) {
        Ls(
          _,
          m,
          v,
          S,
          b,
          w,
          E,
          A,
          $
        );
        return;
      }
    }
    k & 8 ? (F & 16 && rt(_, b, w), m !== _ && u(v, m)) : F & 16 ? k & 16 ? pt(
      _,
      m,
      v,
      S,
      b,
      w,
      E,
      A,
      $
    ) : rt(_, b, w, !0) : (F & 8 && u(v, ""), k & 16 && D(
      m,
      v,
      S,
      b,
      w,
      E,
      A,
      $
    ));
  }, Ls = (c, d, v, S, b, w, E, A, $) => {
    c = c || bt, d = d || bt;
    const _ = c.length, F = d.length, m = Math.min(_, F);
    let p;
    for (p = 0; p < m; p++) {
      const k = d[p] = $ ? Ye(d[p]) : Ke(d[p]);
      I(
        c[p],
        k,
        v,
        null,
        b,
        w,
        E,
        A,
        $
      );
    }
    _ > F ? rt(
      c,
      b,
      w,
      !0,
      !1,
      m
    ) : D(
      d,
      v,
      S,
      b,
      w,
      E,
      A,
      $,
      m
    );
  }, pt = (c, d, v, S, b, w, E, A, $) => {
    let _ = 0;
    const F = d.length;
    let m = c.length - 1, p = F - 1;
    for (; _ <= m && _ <= p; ) {
      const k = c[_], K = d[_] = $ ? Ye(d[_]) : Ke(d[_]);
      if (Dt(k, K))
        I(
          k,
          K,
          v,
          null,
          b,
          w,
          E,
          A,
          $
        );
      else
        break;
      _++;
    }
    for (; _ <= m && _ <= p; ) {
      const k = c[m], K = d[p] = $ ? Ye(d[p]) : Ke(d[p]);
      if (Dt(k, K))
        I(
          k,
          K,
          v,
          null,
          b,
          w,
          E,
          A,
          $
        );
      else
        break;
      m--, p--;
    }
    if (_ > m) {
      if (_ <= p) {
        const k = p + 1, K = k < F ? d[k].el : S;
        for (; _ <= p; )
          I(
            null,
            d[_] = $ ? Ye(d[_]) : Ke(d[_]),
            v,
            K,
            b,
            w,
            E,
            A,
            $
          ), _++;
      }
    } else if (_ > p)
      for (; _ <= m; )
        Ie(c[_], b, w, !0), _++;
    else {
      const k = _, K = _, G = /* @__PURE__ */ new Map();
      for (_ = K; _ <= p; _++) {
        const we = d[_] = $ ? Ye(d[_]) : Ke(d[_]);
        we.key != null && G.set(we.key, _);
      }
      let W, se = 0;
      const ne = p - K + 1;
      let ye = !1, ve = 0;
      const Me = new Array(ne);
      for (_ = 0; _ < ne; _++) Me[_] = 0;
      for (_ = k; _ <= m; _++) {
        const we = c[_];
        if (se >= ne) {
          Ie(we, b, w, !0);
          continue;
        }
        let Ne;
        if (we.key != null)
          Ne = G.get(we.key);
        else
          for (W = K; W <= p; W++)
            if (Me[W - K] === 0 && Dt(we, d[W])) {
              Ne = W;
              break;
            }
        Ne === void 0 ? Ie(we, b, w, !0) : (Me[Ne - K] = _ + 1, Ne >= ve ? ve = Ne : ye = !0, I(
          we,
          d[Ne],
          v,
          null,
          b,
          w,
          E,
          A,
          $
        ), se++);
      }
      const Nt = ye ? Dl(Me) : bt;
      for (W = Nt.length - 1, _ = ne - 1; _ >= 0; _--) {
        const we = K + _, Ne = d[we], Mn = d[we + 1], $n = we + 1 < F ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          Mn.el || Yt(Mn)
        ) : S;
        Me[_] === 0 ? I(
          null,
          Ne,
          v,
          $n,
          b,
          w,
          E,
          A,
          $
        ) : ye && (W < 0 || _ !== Nt[W] ? Oe(Ne, v, $n, 2) : W--);
      }
    }
  }, Oe = (c, d, v, S, b = null) => {
    const { el: w, type: E, transition: A, children: $, shapeFlag: _ } = c;
    if (_ & 6) {
      Oe(c.component.subTree, d, v, S);
      return;
    }
    if (_ & 128) {
      c.suspense.move(d, v, S);
      return;
    }
    if (_ & 64) {
      E.move(c, d, v, gt);
      return;
    }
    if (E === X) {
      n(w, d, v);
      for (let m = 0; m < $.length; m++)
        Oe($[m], d, v, S);
      n(c.anchor, d, v);
      return;
    }
    if (E === qs) {
      C(c, d, v);
      return;
    }
    if (S !== 2 && _ & 1 && A)
      if (S === 0)
        A.persisted && !w[Vs] ? n(w, d, v) : (A.beforeEnter(w), n(w, d, v), ge(() => A.enter(w), b));
      else {
        const { leave: m, delayLeave: p, afterLeave: k } = A, K = () => {
          c.ctx.isUnmounted ? i(w) : n(w, d, v);
        }, G = () => {
          const W = w._isLeaving || !!w[Vs];
          w._isLeaving && w[Vs](
            !0
            /* cancelled */
          ), A.persisted && !W ? K() : m(w, () => {
            K(), k && k();
          });
        };
        p ? p(w, K, G) : G();
      }
    else
      n(w, d, v);
  }, Ie = (c, d, v, S = !1, b = !1) => {
    const {
      type: w,
      props: E,
      ref: A,
      children: $,
      dynamicChildren: _,
      shapeFlag: F,
      patchFlag: m,
      dirs: p,
      cacheIndex: k,
      memo: K
    } = c;
    if ((m === -2 || _ && _.hasOnce) && (b = !1), A != null && (tt(), Gt(A, null, v, c, !0), st()), k != null && (!c.ctx || c.ctx === d) && (d.renderCache[k] = void 0), F & 256 && d.ctx.deactivate(c))
      return;
    const G = F & 1 && p, W = !zt(c);
    let se;
    if (W && (se = E && E.onVnodeBeforeUnmount) && je(se, d, c), F & 6)
      Fs(c.component, v, S);
    else {
      if (F & 128) {
        c.suspense.unmount(v, S);
        return;
      }
      G && mt(c, null, d, "beforeUnmount"), F & 64 ? c.type.remove(
        c,
        d,
        v,
        gt,
        S
      ) : _ && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !_.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (w !== X || m > 0 && m & 64) ? rt(
        _,
        d,
        v,
        !1,
        !0
      ) : (w === X && m & 384 || !b && F & 16) && rt($, d, v), S && Ft(c);
    }
    const ne = K != null && k == null;
    (W && (se = E && E.onVnodeUnmounted) || G || ne) && ge(() => {
      se && je(se, d, c), G && mt(c, null, d, "unmounted"), ne && (c.el = null);
    }, v);
  }, Ft = (c) => {
    const { type: d, el: v, anchor: S, transition: b } = c, w = d === X;
    if (w && !b) {
      it(v, S);
      return;
    }
    if (d === qs) {
      T(c), b && !b.persisted && b.afterLeave && b.afterLeave();
      return;
    }
    const E = w ? nn(c) : c, A = () => {
      w ? h(v) && it(v, S) : i(v), b && !b.persisted && b.afterLeave && b.afterLeave();
    };
    if (E && E.shapeFlag & 1 && b && !b.persisted) {
      const { leave: $, delayLeave: _ } = b, F = E.el, m = () => $(F, A);
      _ ? _(F, A, m) : m();
    } else
      A();
  }, it = (c, d) => {
    let v;
    for (; c !== d; )
      v = g(c), i(c), c = v;
    i(d);
  }, Fs = (c, d, v) => {
    const { bum: S, scope: b, job: w, subTree: E, um: A, m: $, a: _ } = c;
    Kn($), Kn(_), S && fs(S), b.stop(), w ? (w.flags |= 8, Ie(E, c, d, v)) : E && (E.transition = c.vnode.transition, Ie(E, c, d, v)), A && ge(A, d);
    const F = () => {
      c.isUnmounted = !0;
    };
    F.flags = 16, ge(F, d);
  }, rt = (c, d, v, S = !1, b = !1, w = 0) => {
    for (let E = w; E < c.length; E++)
      Ie(c[E], d, v, S, b);
  }, It = (c) => {
    if (c.shapeFlag & 6)
      return It(c.component.subTree);
    if (c.shapeFlag & 128)
      return c.suspense.next();
    const d = g(c.anchor || c.el), v = d && d[gl];
    return v ? g(v) : d;
  }, Mt = (c, d, v) => {
    const S = c && d._vnode ? void 0 : c && c.component ? c.component.uid : ql();
    al(() => {
      c == null ? d._vnode && Ie(d._vnode, null, null, !0) : I(
        d._vnode || null,
        c,
        d,
        null,
        null,
        null,
        v
      ), d._vnode = c;
    }, S);
  }, gt = {
    p: I,
    um: Ie,
    m: Oe,
    r: Ft,
    mt: Ee,
    mc: D,
    pc: Lt,
    pbc: B,
    n: It,
    o: e
  };
  return {
    render: Mt,
    hydrate: void 0,
    createApp: xl(Mt)
  };
}
function Ws({ type: e, props: t }, s) {
  return s === "svg" && e === "foreignObject" || s === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : s;
}
function yt({ effect: e, job: t }, s) {
  s ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function jl(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function nr(e, t, s = !1) {
  const n = e.children, i = t.children;
  if (V(n) && V(i))
    for (let r = 0; r < n.length; r++) {
      const l = n[r];
      let o = i[r];
      o.shapeFlag & 1 && !o.dynamicChildren && ((o.patchFlag <= 0 || o.patchFlag === 32) && (o = i[r] = Ye(i[r]), o.el = l.el), !s && o.patchFlag !== -2 && nr(l, o)), o.type === Rs && (o.patchFlag === -1 && (o = i[r] = Ye(o)), o.el = l.el), o.type === Fe && !o.el && (o.el = l.el);
    }
}
function Dl(e) {
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
function ir(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : ir(t);
}
function Kn(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function Yt(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  if (t)
    return Yt(t.subTree);
  const s = e.suspense;
  return s && s.activeBranch ? Yt(s.activeBranch) : null;
}
const rr = (e) => e.__isSuspense, Ul = /* @__PURE__ */ Symbol("_deferredEnter");
function Kl(e, t) {
  t && t.pendingBranch ? V(e) ? t.effects.push(...e) : t.effects.push(e) : ol(e);
}
const X = /* @__PURE__ */ Symbol.for("v-fgt"), Rs = /* @__PURE__ */ Symbol.for("v-txt"), Fe = /* @__PURE__ */ Symbol.for("v-cmt"), qs = /* @__PURE__ */ Symbol.for("v-stc"), kt = [];
let ke = null;
function L(e = !1) {
  kt.push(ke = e ? null : []);
}
function lr() {
  kt.pop(), ke = kt[kt.length - 1] || null;
}
let es = 1;
function Hn(e, t = !1) {
  es += e, e < 0 && ke && t && (ke.hasOnce = !0);
}
function or(e) {
  return e.dynamicChildren = es > 0 ? ke || bt : null, lr(), es > 0 && ke && ke.push(e), e;
}
function N(e, t, s, n, i, r) {
  return or(
    x(
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
function ds(e, t, s, n, i) {
  return or(
    Se(
      e,
      t,
      s,
      n,
      i,
      !0
    )
  );
}
function kn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Dt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const ar = ({ key: e }) => e ?? null, hs = ({
  ref: e,
  ref_key: t,
  ref_for: s
}) => (typeof e == "number" && (e = "" + e), e != null ? ce(e) || /* @__PURE__ */ de(e) || Z(e) ? { i: $e, r: e, k: t, f: !!s } : e : null);
function x(e, t = null, s = null, n = 0, i = null, r = e === X ? 0 : 1, l = !1, o = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && ar(t),
    ref: t && hs(t),
    scopeId: Vi,
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
    ctx: $e
  };
  return o ? (_s(a, s), r & 128 && e.normalize(a)) : s && (a.shapeFlag |= ce(s) ? 8 : 16), es > 0 && // avoid a block node from tracking itself
  !l && // has current parent block
  ke && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || r & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && ke.push(a), a;
}
const Se = Hl;
function Hl(e, t = null, s = null, n = 0, i = null, r = !1) {
  if ((!e || e === bl) && (e = Fe), kn(e)) {
    const o = Ot(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return s && _s(o, s), es > 0 && !r && ke && (o.shapeFlag & 6 ? ke[ke.indexOf(e)] = o : ke.push(o)), o.patchFlag = -2, o;
  }
  if (Zl(e) && (e = e.__vccOpts), t) {
    t = Vl(t);
    let { class: o, style: a } = t;
    o && !ce(o) && (t.class = et(o)), le(a) && (/* @__PURE__ */ vn(a) && !V(a) && (a = Ce({}, a)), t.style = ct(a));
  }
  const l = ce(e) ? 1 : rr(e) ? 128 : As(e) ? 64 : le(e) ? 4 : Z(e) ? 2 : 0;
  return x(
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
function Vl(e) {
  return e ? /* @__PURE__ */ vn(e) ? Ce({}, e) : Qi(e) ? Ce({}, e[dr] || e) : e : null;
}
function Ot(e, t, s = !1, n = !1) {
  const { props: i, ref: r, patchFlag: l, children: o, transition: a } = e, f = t ? Bl(i || {}, t) : i, u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: f,
    key: f && ar(f),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      s && r ? V(r) ? r.concat(hs(t)) : [r, hs(t)] : hs(t)
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
    patchFlag: t && e.type !== X ? l === -1 ? 16 : l | 16 : l,
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
    ssContent: e.ssContent && Ot(e.ssContent),
    ssFallback: e.ssFallback && Ot(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce,
    cacheIndex: e.cacheIndex
  };
  return a && n && qt(
    u,
    a.clone(u)
  ), u;
}
function be(e = " ", t = 0) {
  return Se(Rs, null, e, t);
}
function ie(e = "", t = !1) {
  return t ? (L(), ds(Fe, null, e)) : Se(Fe, null, e);
}
function Ke(e) {
  return e == null || typeof e == "boolean" ? Se(Fe) : V(e) ? Se(
    X,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : kn(e) ? Ye(e) : Se(Rs, null, String(e));
}
function Ye(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Ot(e);
}
function _s(e, t) {
  let s = 0;
  const { shapeFlag: n } = e;
  if (t == null)
    t = null;
  else if (V(t))
    s = 16;
  else if (typeof t == "object")
    if (n & 65) {
      const i = t.default;
      i && (i._c && (i._d = !1), _s(e, i()), i._c && (i._d = !0));
      return;
    } else {
      s = 32;
      const i = t._;
      !i && !Qi(t) ? t._ctx = $e : i === 3 && $e && ($e.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else if (Z(t)) {
    if (n & 65) {
      _s(e, { default: t });
      return;
    }
    t = { default: t, _ctx: $e }, s = 32;
  } else
    t = String(t), n & 64 ? (s = 16, t = [be(t)]) : s = 8;
  e.children = t, e.shapeFlag |= s;
}
function Bl(...e) {
  const t = {};
  for (let s = 0; s < e.length; s++) {
    const n = e[s];
    for (const i in n)
      if (i === "class")
        t.class !== n.class && (t.class = et([t.class, n.class]));
      else if (i === "style")
        t.style = ct([t.style, n.style]);
      else if (Ss(i)) {
        const r = t[i], l = n[i];
        l && r !== l && !(V(r) && r.includes(l)) ? t[i] = r ? [].concat(r, l) : l : l == null && r == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !Cs(i) && (t[i] = l);
      } else i !== "" && (t[i] = n[i]);
  }
  return t;
}
function je(e, t, s, n = null) {
  We(e, t, 7, [
    s,
    n
  ]);
}
const Wl = /* @__PURE__ */ Gi();
let cr = 0;
function ql() {
  return cr;
}
function Gl(e, t, s) {
  const n = e.type, i = (t ? t.appContext : e.appContext) || Wl, r = {
    uid: cr++,
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
    scope: new Or(
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
    propsOptions: Ol(n, i),
    emitsOptions: Cl(n, i),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: re,
    // inheritAttrs
    inheritAttrs: n.inheritAttrs,
    // state
    ctx: re,
    data: re,
    props: re,
    attrs: re,
    slots: re,
    refs: re,
    setupState: re,
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
  return r.ctx = { _: r }, r.root = t ? t.root : r, r.emit = Sl.bind(null, r), e.ce && e.ce(r), r;
}
let ht = null;
const zl = () => ht || $e;
let ws, ts;
{
  const e = Ms(), t = (s, n) => {
    let i;
    return (i = e[s]) || (i = e[s] = []), i.push(n), (r) => {
      i.length > 1 ? i.forEach((l) => l(r)) : i[0](r);
    };
  };
  ws = t(
    "__VUE_INSTANCE_SETTERS__",
    (s) => ht = s
  ), ts = t(
    "__VUE_SSR_SETTERS__",
    (s) => ss = s
  );
}
const Sn = (e) => {
  const t = ht;
  return ws(e), e.scope.on(), () => {
    e.scope.off(), ws(t);
  };
}, Vn = () => {
  ht && ht.scope.off(), ws(null);
};
function ur(e) {
  return e.vnode.shapeFlag & 4;
}
let ss = !1;
function Jl(e, t = !1, s = !1) {
  t && ts(t);
  const { props: n, children: i } = e.vnode, r = ur(e);
  Al(e, n, r, t), Pl(e, i, s || t);
  const l = r ? Yl(e, t) : void 0;
  return t && ts(!1), l;
}
function Yl(e, t) {
  const s = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, _l);
  const { setup: n } = s;
  if (n) {
    tt();
    const i = e.setupContext = n.length > 1 ? Ql(e) : null, r = Sn(e), l = is(
      n,
      e,
      0,
      [
        e.props,
        i
      ]
    ), o = pi(l);
    if (st(), r(), (o || e.sp) && !zt(e) && yl(e), o) {
      if (l.then(Vn, Vn), t)
        return l.then((a) => {
          ts(!0);
          try {
            Bn(e, a, t);
          } finally {
            ts(!1);
          }
        }).catch((a) => {
          Ts(a, e, 0, void 0, !0), e.ssrRender = (f, u) => u("<!---->");
        });
      e.asyncDep = l;
    } else
      Bn(e, l);
  } else
    fr(e);
}
function Bn(e, t, s) {
  Z(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : le(t) && (e.setupState = Ni(t)), fr(e);
}
function fr(e, t, s) {
  const n = e.type;
  e.render || (e.render = n.render || wt);
}
const dr = /* @__PURE__ */ Symbol(), Xl = {
  get(e, t) {
    return pe(e, "get", ""), t === dr ? e : e[t];
  }
};
function Ql(e) {
  const t = (s) => {
    e.exposed = s || {};
  };
  return {
    attrs: new Proxy(e.attrs, Xl),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Ps(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Ni(Xr(e.exposed)), {
    get(t, s) {
      if (s in t)
        return t[s];
      if (s in Jt)
        return Jt[s](e);
    },
    has(t, s) {
      return s in t || s in Jt;
    }
  })) : e.proxy;
}
function Zl(e) {
  return Z(e) && "__vccOpts" in e;
}
const ae = (e, t) => /* @__PURE__ */ sl(e, t, ss), eo = "3.5.45";
let on;
const Wn = typeof window < "u" && window.trustedTypes;
if (Wn)
  try {
    on = /* @__PURE__ */ Wn.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const hr = on ? (e) => on.createHTML(e) : (e) => e, to = "http://www.w3.org/2000/svg", so = "http://www.w3.org/1998/Math/MathML", Je = typeof document < "u" ? document : null, qn = Je && /* @__PURE__ */ Je.createElement("template"), no = {
  insert: (e, t, s) => {
    t.insertBefore(e, s || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, s, n) => {
    const i = t === "svg" ? Je.createElementNS(to, e) : t === "mathml" ? Je.createElementNS(so, e) : s ? Je.createElement(e, { is: s }) : Je.createElement(e);
    return e === "select" && n && n.multiple != null && i.setAttribute("multiple", n.multiple), i;
  },
  createText: (e) => Je.createTextNode(e),
  createComment: (e) => Je.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Je.querySelector(e),
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
      qn.innerHTML = hr(
        n === "svg" ? `<svg>${e}</svg>` : n === "mathml" ? `<math>${e}</math>` : e
      );
      const o = qn.content;
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
}, io = /* @__PURE__ */ Symbol("_vtc");
function ro(e, t, s) {
  const n = e[io];
  n && (t = (t ? [t, ...n] : [...n]).join(" ")), t == null ? e.removeAttribute("class") : s ? e.setAttribute("class", t) : e.className = t;
}
const Gn = /* @__PURE__ */ Symbol("_vod"), lo = /* @__PURE__ */ Symbol("_vsh"), oo = /* @__PURE__ */ Symbol(""), ao = /(?:^|;)\s*display\s*:/;
function co(e, t, s) {
  const n = e.style, i = ce(s);
  let r = !1;
  if (s && !i) {
    if (t)
      if (ce(t))
        for (const l of t.split(";")) {
          const o = l.slice(0, l.indexOf(":")).trim();
          s[o] == null && Kt(n, o, "");
        }
      else
        for (const l in t)
          s[l] == null && Kt(n, l, "");
    for (const l in s) {
      l === "display" && (r = !0);
      const o = s[l];
      o != null ? fo(
        e,
        l,
        !ce(t) && t ? t[l] : void 0,
        o
      ) || Kt(n, l, o) : Kt(n, l, "");
    }
  } else if (i) {
    if (t !== s) {
      const l = n[oo];
      l && (s += ";" + l), n.cssText = s, r = ao.test(s);
    }
  } else t && e.removeAttribute("style");
  Gn in e && ((!i || t !== s) && (e[Gn] = r ? n.display : ""), e[lo] && (n.display = "none"));
}
const cs = /\s*!important$/;
function Kt(e, t, s) {
  if (V(s))
    s.forEach((n) => Kt(e, t, n));
  else if (s == null && (s = ""), t.startsWith("--"))
    cs.test(s) ? e.setProperty(t, s.replace(cs, ""), "important") : e.setProperty(t, s);
  else {
    const n = uo(e, t);
    cs.test(s) ? e.setProperty(
      Ct(n),
      s.replace(cs, ""),
      "important"
    ) : e[n] = s;
  }
}
const zn = ["Webkit", "Moz", "ms"], Gs = {};
function uo(e, t) {
  const s = Gs[t];
  if (s)
    return s;
  let n = Pe(t);
  if (n !== "filter" && n in e)
    return Gs[t] = n;
  n = yi(n);
  for (let i = 0; i < zn.length; i++) {
    const r = zn[i] + n;
    if (r in e)
      return Gs[t] = r;
  }
  return t;
}
function fo(e, t, s, n) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && ce(n) && s === n;
}
const Jn = "http://www.w3.org/1999/xlink";
function Yn(e, t, s, n, i, r = $r(t)) {
  n && t.startsWith("xlink:") ? s == null ? e.removeAttributeNS(Jn, t.slice(6, t.length)) : e.setAttributeNS(Jn, t, s) : s == null || r && !bi(s) ? e.removeAttribute(t) : e.setAttribute(
    t,
    r ? "" : Ve(s) ? String(s) : s
  );
}
function Xn(e, t, s, n, i) {
  if (t === "innerHTML" || t === "textContent") {
    s != null && (e[t] = t === "innerHTML" ? hr(s) : s);
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
    o === "boolean" ? s = bi(s) : s == null && o === "string" ? (s = "", l = !0) : o === "number" && (s = 0, l = !0);
  }
  try {
    e[t] = s;
  } catch {
  }
  l && e.removeAttribute(i || t);
}
function pr(e, t, s, n) {
  e.addEventListener(t, s, n);
}
function ho(e, t, s, n) {
  e.removeEventListener(t, s, n);
}
const Qn = /* @__PURE__ */ Symbol("_vei");
function po(e, t, s, n, i = null) {
  const r = e[Qn] || (e[Qn] = {}), l = r[t];
  if (n && l)
    l.value = n;
  else {
    const [o, a] = yo(t);
    if (n) {
      const f = r[t] = _o(
        n,
        i
      );
      pr(e, o, f, a);
    } else l && (ho(e, o, l, a), r[t] = void 0);
  }
}
const go = /(Once|Passive|Capture)$/, mo = /^on:?(?:Once|Passive|Capture)$/;
function yo(e) {
  let t, s;
  for (; (s = e.match(go)) && !mo.test(e); )
    t || (t = {}), e = e.slice(0, e.length - s[1].length), t[s[1].toLowerCase()] = !0;
  return [e[2] === ":" ? e.slice(3) : Ct(e.slice(2)), t];
}
let zs = 0;
const vo = /* @__PURE__ */ Promise.resolve(), bo = () => zs || (vo.then(() => zs = 0), zs = Date.now());
function _o(e, t) {
  const s = (n) => {
    if (!n._vts)
      n._vts = Date.now();
    else if (n._vts <= s.attached)
      return;
    const i = s.value;
    if (V(i)) {
      const r = n.stopImmediatePropagation;
      n.stopImmediatePropagation = () => {
        r.call(n), n._stopped = !0;
      };
      const l = i.slice(), o = [n];
      for (let a = 0; a < l.length && !n._stopped; a++) {
        const f = l[a];
        f && We(
          f,
          t,
          5,
          o
        );
      }
    } else
      We(
        i,
        t,
        5,
        [n]
      );
  };
  return s.value = e, s.attached = bo(), s;
}
const Zn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, wo = (e, t, s, n, i, r) => {
  const l = i === "svg";
  t === "class" ? ro(e, n, l) : t === "style" ? co(e, s, n) : Ss(t) ? Cs(t) || po(e, t, s, n, r) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : xo(e, t, n, l)) ? (Xn(e, t, n), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Yn(e, t, n, l, r, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (ko(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !ce(n))) ? Xn(e, Pe(t), n, r, t) : (t === "true-value" ? e._trueValue = n : t === "false-value" && (e._falseValue = n), Yn(e, t, n, l));
};
function xo(e, t, s, n) {
  if (n)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Zn(t) && Z(s));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const i = e.tagName;
    if (i === "IMG" || i === "VIDEO" || i === "CANVAS" || i === "SOURCE")
      return !1;
  }
  return Zn(t) && ce(s) ? !1 : t in e;
}
function ko(e, t) {
  const s = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!s)
    return !1;
  const n = Pe(t);
  return Array.isArray(s) ? s.some((i) => Pe(i) === n) : Object.keys(s).some((i) => Pe(i) === n);
}
const ei = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return V(t) ? (s) => fs(t, s) : t;
}, Js = /* @__PURE__ */ Symbol("_assign"), So = {
  // <select multiple> value need to be deep traversed
  deep: !0,
  created(e, { value: t, modifiers: { number: s } }, n) {
    e._modelValue = t, pr(e, "change", () => {
      const i = Array.prototype.filter.call(e.options, (a) => a.selected).map(
        (a) => s ? fn(xs(a)) : xs(a)
      ), r = e.multiple, l = r ? St(e._modelValue) ? new Set(i) : i : i[0], o = e._pendingValue = [
        r,
        r ? V(l) ? i.slice() : i : l
      ];
      try {
        e[Js](l);
      } finally {
        At(() => {
          e._pendingValue === o && (e._pendingValue = void 0);
        });
      }
    }), e[Js] = ei(n);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(e, { value: t, modifiers: { number: s } }) {
    ti(e, t, s);
  },
  beforeUpdate(e, { value: t }, s) {
    e._modelValue = t, e[Js] = ei(s);
  },
  updated(e, { value: t, modifiers: { number: s } }) {
    const n = e._pendingValue;
    e._pendingValue = void 0, (!n || n[0] !== e.multiple || !Co(t, n[1], n[0])) && ti(e, t, s);
  }
};
function Co(e, t, s) {
  if (!s || V(e)) return ft(e, t);
  if (St(e)) {
    if (e.size !== t.length) return !1;
    for (const n of t)
      if (!e.has(n)) return !1;
    return !0;
  }
  return !1;
}
function ti(e, t, s = !1) {
  const n = e.multiple, i = V(t);
  if (!(n && !i && !St(t))) {
    for (let r = 0, l = e.options.length; r < l; r++) {
      const o = e.options[r], a = xs(o);
      if (n)
        if (i) {
          const f = typeof a;
          f === "string" || f === "number" ? o.selected = t.some((u) => String(u) === String(a)) : o.selected = Er(t, a) > -1;
        } else
          o.selected = t.has(a) || s && typeof a == "string" && t.has(fn(a));
      else if (ft(xs(o), t)) {
        e.selectedIndex !== r && (e.selectedIndex = r);
        return;
      }
    }
    !n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
  }
}
function xs(e) {
  return "_value" in e ? e._value : e.value;
}
const Io = ["ctrl", "shift", "alt", "meta"], Mo = {
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
  exact: (e, t) => Io.some((s) => e[`${s}Key`] && !t.includes(s))
}, gr = (e, t) => {
  if (!e) return e;
  const s = e._withMods || (e._withMods = {}), n = t.join(".");
  return s[n] || (s[n] = ((i, ...r) => {
    for (let l = 0; l < t.length; l++) {
      const o = Mo[t[l]];
      if (o && o(i, t)) return;
    }
    return e(i, ...r);
  }));
}, $o = /* @__PURE__ */ Ce({ patchProp: wo }, no);
let si;
function To() {
  return si || (si = Fl($o));
}
const Ao = ((...e) => {
  const t = To().createApp(...e), { mount: s } = t;
  return t.mount = (n) => {
    const i = Oo(n);
    if (!i) return;
    const r = t._component;
    !Z(r) && !r.render && !r.template && (r.template = i.innerHTML), i.nodeType === 1 && (i.textContent = "");
    const l = s(i, !1, Eo(i));
    return i instanceof Element && (i.removeAttribute("v-cloak"), i.setAttribute("data-v-app", "")), l;
  }, t;
});
function Eo(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Oo(e) {
  return ce(e) ? document.querySelector(e) : e;
}
const ks = () => ({ scale: 1, x: 0, y: 0 });
function Ro() {
  return {
    open: !1,
    folderId: "",
    images: [],
    records: /* @__PURE__ */ new Map(),
    checked: /* @__PURE__ */ new Set(),
    pinned: /* @__PURE__ */ new Set(),
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
    transforms: { left: ks(), right: ks() }
  };
}
function ni(e, t, s = !1) {
  const n = /* @__PURE__ */ new Set([
    ...t.map((r) => r.id),
    ...e.checked,
    ...e.pinned,
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
function ps(e) {
  return e.images.filter(
    (t) => t.id === e.leftId || e.scope === "folder" || (e.scope === "checked" ? e.checked : e.promptIds).has(t.id)
  );
}
function Ys(e, t) {
  const s = e.mode === "single" ? e.images : ps(e), n = e.mode === "single" ? "currentId" : "rightId", r = s.findIndex((l) => l.id === e[n]) + t;
  r >= 0 && r < s.length && (e[n] = s[r].id);
}
function Po(e) {
  e.open = !1, e.checked.clear(), e.pinned.clear(), e.unavailable.clear(), e.currentId = null, e.leftId = null, e.rightId = null, e.manualMatches = {}, e.panel = !1, e.mode = "grid", e.scope = "folder", e.promptIds.clear(), e.transforms = { left: ks(), right: ks() }, e.records.clear(), e.images = [];
}
function Lo(e, t) {
  e.linked = t, t && (e.transforms.right = { ...e.transforms.left });
}
function Ut(e, t, s) {
  e.transforms[t] = { ...s }, e.linked && (e.transforms[t === "left" ? "right" : "left"] = { ...s });
}
function Fo(e, t, s, n, i) {
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
function mr(e, t, s, n, i, r) {
  const l = Math.max(1, Math.floor(n / i)), o = Math.floor(s / i) * l, a = e[o]?.id, f = t.findIndex((u) => u.id === a);
  return f < 0 ? s : Math.floor(f / Math.max(1, Math.floor(n / r))) * r + Math.min(s % i, r - 1);
}
function No(e, t, s, n) {
  return s < t ? s : s + n > t + e ? Math.max(0, s + n - e) : t;
}
class jo {
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
  firstCursor = null;
  cursor = null;
  error = "";
  loading = !1;
  version = "";
  async selectFolder(t) {
    this.abort.abort(), this.abort = new AbortController(), this.epoch++, this.working = !1, this.session.folderId = t, this.session.images = [], this.session.records.clear(), this.session.checked.clear(), this.session.pinned.clear(), this.session.unavailable.clear(), this.session.currentId = null, this.session.leftId = null, this.session.rightId = null, this.session.mode = "grid", this.session.panel = !1, this.session.manualMatches = {}, this.session.scope = "folder", this.session.promptIds.clear(), this.cursor = null, this.version = "", this.firstCursor = null, this.error = "", await this.refresh();
  }
  async refresh() {
    if (this.working || !this.session.folderId) return;
    this.working = !0, this.loading = !0, this.changed();
    const t = this.epoch;
    try {
      const s = Math.max(1, this.session.images.length), n = [];
      let i = null, r = this.version, l = null;
      do {
        const o = await this.api.images(
          this.session.folderId,
          i,
          this.abort.signal
        );
        if (t !== this.epoch) return;
        if (i === null && this.session.images.length > 0 && o.version === this.version && o.next_cursor === this.firstCursor && o.images.every((a, f) => this.session.images[f]?.id === a.id && this.session.images[f]?.revision === a.revision)) {
          this.error = "";
          return;
        }
        i === null && (l = o.next_cursor), n.push(...o.images), i = o.next_cursor, r = o.version;
      } while (i && n.length < s);
      ni(this.session, n, i === null), this.cursor = i, this.version = r, this.firstCursor = l, this.error = "";
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
      ni(this.session, [
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
const yr = ["prompt", "workflow"], ii = 500, Do = 5e3, Uo = 1e3, Ko = /* @__PURE__ */ new Set(["seed", "noise_seed", "random_seed"]), Ho = /* @__PURE__ */ new Set(["ckpt_name", "checkpoint_name", "model_name", "unet_name", "diffusion_model_name"]), ri = {
  CLIPTextEncode: ["text"],
  CLIPTextEncodeSDXL: ["text_g", "text_l"],
  CLIPTextEncodeSDXLRefiner: ["text"]
};
function fe(e) {
  return e !== null && typeof e == "object" && !Array.isArray(e);
}
function Xe(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function Ht(e) {
  return Xe(ri, e) ? ri[e] : void 0;
}
function Vo(e) {
  return typeof e == "string" ? e.trim().length > 0 : typeof e == "number" && Number.isSafeInteger(e);
}
function an(e) {
  if (!fe(e) || Object.keys(e).length !== 1 || typeof e.__shiba_number__ != "string" || !/^-?(?:0|[1-9]\d*)$/.test(e.__shiba_number__)) return;
  const t = e.__shiba_number__, s = BigInt(t);
  return s > BigInt(Number.MAX_SAFE_INTEGER) || s < BigInt(Number.MIN_SAFE_INTEGER) ? t : void 0;
}
function Bo(e) {
  const t = [e];
  for (; t.length; ) {
    const s = t.pop();
    if (typeof s == "number" && (!Number.isFinite(s) || Number.isInteger(s) && !Number.isSafeInteger(s))) return !0;
    if (Array.isArray(s)) for (const n of s) t.push(n);
    else if (fe(s)) for (const n of Object.values(s)) t.push(n);
  }
  return !1;
}
function us(e, t, s, n = !1) {
  const i = Ht(e)?.includes(t) === !0 && typeof s == "string", r = n ? "reference" : i ? "prompt" : Ho.has(t) && typeof s == "string" ? "model" : t === "lora_name" && typeof s == "string" ? "lora-name" : /lora/i.test(e) && ["strength_model", "strength_clip", "strength", "lora_strength"].includes(t) ? "lora-strength" : "value";
  return { key: t, label: t, value: s, kind: r, promptText: i };
}
function Rt(e, t) {
  if (Object.is(e, t)) return !0;
  if (Array.isArray(e) && Array.isArray(t))
    return e.length === t.length && e.every((s, n) => Rt(s, t[n]));
  if (fe(e) && fe(t)) {
    const s = Object.keys(e);
    return s.length === Object.keys(t).length && s.every((n) => Xe(t, n) && Rt(e[n], t[n]));
  }
  return !1;
}
function li(e, t, s) {
  if (t == null) return { state: "missing", nodes: [] };
  if (!fe(t) || e === "workflow" && !Array.isArray(t.nodes))
    return s.push(`${e}: 保存形式を解析できません。`), { state: "invalid", nodes: [] };
  const n = e === "prompt" ? Object.entries(t) : t.nodes.map((a, f) => [fe(a) && (typeof a.id == "string" || typeof a.id == "number") ? String(a.id) : `不明[${f}]`, a]), i = [];
  let r = n.length > ii;
  r && s.push(`${e}: ノード数が表示上限を超えています。一部のみ比較します。元 JSON は保持しています。`);
  let l = 0;
  const o = /* @__PURE__ */ new Set();
  for (const [a, f] of n.slice(0, ii)) {
    const u = fe(f) ? f[e === "prompt" ? "class_type" : "type"] : void 0;
    if (!fe(f) || typeof u != "string" || !u || o.has(a) || e === "workflow" && !Vo(f.id)) {
      s.push(`${e}: ノード ${a} の形式が不正、または ID が重複しています。`), r = !0;
      continue;
    }
    o.add(a);
    const h = e === "prompt" && fe(f._meta) && typeof f._meta.title == "string" ? f._meta.title : typeof f.title == "string" ? f.title : "", g = [];
    let y = !0;
    if (e === "prompt")
      if (!fe(f.inputs)) y = !1;
      else
        for (const [P, O] of Object.entries(f.inputs)) {
          const M = Array.isArray(O) && O.length === 2 && typeof O[0] == "string" && Number.isInteger(O[1]) && O[1] >= 0 && Xe(t, O[0]);
          g.push(us(u, P, O, M));
        }
    else {
      if (Array.isArray(f.widgets_values))
        f.widgets_values.forEach((P, O) => g.push({ key: `widgets_values[${O}]`, label: `保存値[${O}]（名称不明）`, value: P, kind: "value", promptText: !1 }));
      else if (fe(f.widgets_values))
        for (const [P, O] of Object.entries(f.widgets_values)) {
          const M = us(u, P, O);
          g.push({ ...M, key: `widgets_values.${P}` });
        }
      else f.widgets_values != null && (y = !1);
      if (fe(f.inputs))
        for (const [P, O] of Object.entries(f.inputs)) g.push(us(u, P, O));
      else if (Array.isArray(f.inputs))
        for (const [P, O] of f.inputs.entries()) {
          if (!fe(O)) {
            y = !1;
            continue;
          }
          const M = typeof O.name == "string" ? O.name : `入力[${P}]（名称不明）`;
          if (Xe(O, "value") && g.push(us(u, M, O.value)), O.link != null) {
            const C = Array.isArray(t.links) ? t.links.find((H) => Array.isArray(H) ? H[0] === O.link : fe(H) && H.id === O.link) : void 0, T = Array.isArray(C) ? [String(C[1]), C[2]] : fe(C) && Xe(C, "origin_id") ? [String(C.origin_id), C.origin_slot] : { link_id: O.link };
            C || (y = !1), g.push({ key: `inputs.${M}`, label: M, value: T, kind: "reference", promptText: !1 });
          }
        }
      else f.inputs != null && (y = !1);
      Xe(f, "mode") && g.push({ key: "mode", label: "保存された実行モード", value: f.mode, kind: "value", promptText: !1 }), !Xe(f, "widgets_values") && !Xe(f, "inputs") && (y = !1);
    }
    const R = g.filter((P) => !Ko.has(P.key.replace(/^(?:widgets_values|inputs)\./, ""))), I = R.slice(0, Math.max(0, Do - l));
    l += I.length, I.length < R.length && (y = !1, s.push(`${e}: 保存項目数が表示上限を超えています。元 JSON は保持しています。`)), I.some((P) => Bo(P.value)) && (y = !1, s.push(`${e}: ノード ${a} の数値がブラウザーの正確な整数精度を超えています。値の一致や正確なコピーを保証できません。`)), y || (r = !0, s.push(`${e}: ノード ${a} (${u}) の一部情報を正確に確認できません。`)), i.push({ key: `${e}:${a}`, id: a, type: u, title: h, source: e, fields: I, complete: y });
  }
  return i.length === 0 ? (s.push(`${e}: 比較できる保存ノードがありません。`), { state: n.length ? "invalid" : "partial", nodes: i }) : { state: r ? "partial" : "ok", nodes: i };
}
function oi(e) {
  const t = Array.isArray(e.warnings) ? e.warnings.filter((o) => typeof o == "string") : [], s = li("prompt", e.prompt, t), n = li("workflow", e.workflow, t), i = [...s.nodes, ...n.nodes];
  for (const o of s.nodes) {
    const a = n.nodes.find((f) => f.id === o.id && f.type === o.type);
    if (a)
      for (const f of o.fields) {
        const u = a.fields.find((h) => h.key === f.key || h.key === `widgets_values.${f.key}`);
        u && !Rt(f.value, u.value) && t.push(`ノード ${o.id} / ${f.label}: prompt と workflow の保存値が異なります。情報源を分けて表示します。`);
      }
  }
  const r = [s.state, n.state];
  let l = r.every((o) => o === "missing") ? "missing" : i.length === 0 && r.includes("invalid") ? "invalid" : r.includes("invalid") || r.includes("partial") ? "partial" : "ok";
  return ["invalid", "unsupported"].includes(e.status) ? l = i.length ? "partial" : "invalid" : e.status === "partial" && (l = "partial"), l === "missing" && t.push("設定情報なし。保存された生成条件の一致は確認できません。"), l === "invalid" && t.push("保存データを解析できません。画像の比較は継続できます。"), { status: l, nodes: i, warnings: [...new Set(t)], raw: { prompt: e.prompt, workflow: e.workflow }, rawText: { prompt: typeof e.raw_prompt == "string" ? e.raw_prompt : null, workflow: typeof e.raw_workflow == "string" ? e.raw_workflow : null }, sources: { prompt: s.state, workflow: n.state } };
}
function ai(e) {
  return [...new Set(e.nodes.flatMap((t) => t.fields.filter((s) => s.kind === "model" && typeof s.value == "string").map((s) => s.value)))];
}
function vr(e, t, s, n) {
  const i = [], r = /* @__PURE__ */ new Set(), l = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Set(), a = new Map(t.map((h) => [h.key, h])), f = Object.values(s).filter((h) => h !== null);
  for (const h of Object.keys(s))
    e.some((g) => g.key === h) || (o.add(h), n.push(`${h}: 手動対応の左ノードが現在の画像にありません。対応を選び直してください。`));
  for (const h of e) {
    if (!Xe(s, h.key)) continue;
    const g = s[h.key];
    if (g === null) {
      o.add(h.key);
      continue;
    }
    const y = a.get(g);
    if (!y || y.source !== h.source || f.filter((R) => R === g).length > 1) {
      o.add(h.key), n.push(`${h.key}: 手動対応が不正、または右ノードが重複しています。対応を選び直してください。`);
      continue;
    }
    i.push({ leftKey: h.key, rightKey: y.key, reason: "manual" }), r.add(h.key), l.add(y.key);
  }
  function u(h, g, y) {
    i.push({ leftKey: h.key, rightKey: g.key, reason: y }), r.add(h.key), l.add(g.key);
  }
  for (const h of yr) {
    const g = e.filter((I) => I.source === h), y = t.filter((I) => I.source === h);
    if (g.length === y.length && g.every((I) => y.some((P) => P.id === I.id && P.type === I.type)))
      for (const I of g) {
        const P = y.find((O) => O.id === I.id && O.type === I.type);
        P && !r.has(I.key) && !o.has(I.key) && !l.has(P.key) && u(I, P, "id-type");
      }
    for (const I of g) {
      if (r.has(I.key) || o.has(I.key)) continue;
      const P = y.filter((M) => M.type === I.type && !l.has(M.key)), O = g.filter((M) => M.type === I.type && !r.has(M.key));
      if (P.length === 1 && O.length === 1) u(I, P[0], "type");
      else if (I.title) {
        const M = P.filter((C) => C.title === I.title);
        M.length === 1 && O.filter((C) => C.title === I.title).length === 1 && u(I, M[0], "type-title");
      }
    }
  }
  return { matches: i, blocked: o };
}
function Wo(e, t, s = {}) {
  const n = [...e.warnings.map((C) => `左: ${C}`), ...t.warnings.map((C) => `右: ${C}`)], i = [], r = s.manualMatches ?? {};
  let l = e.status !== "ok" || t.status !== "ok", o = 0, a = !1;
  for (const C of yr)
    e.sources[C] !== t.sources[C] && (l = !0, n.push(`${C}: 左右で保存情報の範囲が異なります。欠落を追加・削除と断定しません。`));
  const { matches: f, blocked: u } = vr(e.nodes, t.nodes, r, n);
  u.size && (l = !0), f.some((C) => C.reason === "id-type") && n.push("ID・型による自動対応は保存グラフに基づく候補です。別 workflow の同一性や、モデルファイル・コード版の一致を保証しません。");
  const h = new Map(e.nodes.map((C) => [C.key, C])), g = new Map(t.nodes.map((C) => [C.key, C])), y = new Set(f.map((C) => C.leftKey)), R = new Set(f.map((C) => C.rightKey));
  function I(C, T, H, z, q, D, ee) {
    if (i.length >= Uo) {
      l = !0, a || n.push("差分数が表示上限を超えています。一部のみ表示します。元 JSON から全保存値を確認できます。"), a = !0;
      return;
    }
    i.push({ id: `${C?.key ?? ""}|${T?.key ?? ""}|${H}|${ee}`, kind: ee, source: (C ?? T).source, ...C ? { leftNode: C } : {}, ...T ? { rightNode: T } : {}, path: H, label: z, ...C ? { left: q } : {}, ...T ? { right: D } : {} });
  }
  function P(C, T, H, z, q, D, ee, B = 0) {
    if (!Rt(q, D))
      if (an(q) !== void 0 || an(D) !== void 0) I(C, T, H, z, q, D, ee);
      else if (ee !== "connection" && B < 64 && Array.isArray(q) && Array.isArray(D))
        for (let U = 0; U < Math.max(q.length, D.length); U++) P(C, T, `${H}[${U}]`, `${z}[${U}]`, q[U], D[U], ee, B + 1);
      else if (ee !== "connection" && B < 64 && fe(q) && fe(D))
        for (const U of /* @__PURE__ */ new Set([...Object.keys(q), ...Object.keys(D)])) P(C, T, `${H}.${U}`, `${z}.${U}`, q[U], D[U], ee, B + 1);
      else I(C, T, H, z, q, D, ee);
  }
  for (const C of f) {
    const T = h.get(C.leftKey), H = g.get(C.rightKey);
    T.type !== H.type && I(T, H, "class_type", "ノード型", T.type, H.type, "changed");
    const z = new Map(T.fields.map((D) => [D.key, D])), q = new Map(H.fields.map((D) => [D.key, D]));
    for (const D of /* @__PURE__ */ new Set([...z.keys(), ...q.keys()])) {
      const ee = z.get(D), B = q.get(D);
      if (ee?.promptText && B?.promptText) {
        o++;
        continue;
      }
      if (!ee || !B) {
        l = !0, n.push(`${T.source}: ${T.id} ↔ ${H.id} / ${D}: 片方に保存値がありません。設定の削除とは断定できません。`);
        continue;
      }
      P(T, H, D, ee.label, ee.value, B.value, ee.kind === "reference" || B.kind === "reference" ? "connection" : "changed");
    }
  }
  const O = [], M = [];
  for (const [C, T, H, z, q] of [
    ["left", e.nodes, t.nodes, y, O],
    ["right", t.nodes, e.nodes, R, M]
  ])
    for (const D of T) {
      if (z.has(D.key)) continue;
      const ee = H.filter((U) => U.source === D.source && U.type === D.type), B = e.status === "ok" && t.status === "ok" && e.sources[D.source] === "ok" && t.sources[D.source] === "ok";
      ee.length === 0 && B && !u.has(D.key) ? I(C === "left" ? D : void 0, C === "right" ? D : void 0, "", C === "left" ? "右で削除（左にのみ保存）" : "右で追加（右にのみ保存）", C === "left" ? D.fields : void 0, C === "right" ? D.fields : void 0, C === "left" ? "removed" : "added") : (l = !0, q.push({ node: D, candidateKeys: ee.map((U) => U.key) }));
    }
  return (O.length || M.length) && n.push("対応未確定のノードがあります。候補を確認し、必要に応じて手動で対応付けてください。"), { status: l ? "incomplete" : i.length ? "different" : "same", differences: i, matches: f, unmatchedLeft: O, unmatchedRight: M, warnings: [...new Set(n)], excludedPromptFields: o };
}
function ci(e, t) {
  if (e.status !== "ok" || t.status !== "ok") return null;
  const s = e.sources.prompt === "ok" && t.sources.prompt === "ok" ? "prompt" : "workflow";
  if (e.sources[s] !== "ok" || t.sources[s] !== "ok") return null;
  for (const o of [e, t]) {
    const a = o.nodes.filter((f) => f.source === s);
    if (a.some((f) => !Ht(f.type) && f.fields.some((u) => /^(?:widgets_values\.)?(?:text|prompt|positive|negative)$/.test(u.key) && typeof u.value == "string"))) return null;
    for (const f of a) {
      const u = o.nodes.find((h) => h.source !== s && h.id === f.id && h.type === f.type);
      if (u)
        for (const h of f.fields.filter((g) => g.promptText)) {
          const g = h.key.replace(/^widgets_values\./, ""), y = u.fields.find((R) => R.key.replace(/^widgets_values\./, "") === g && R.promptText);
          if (y && !Rt(h.value, y.value)) return null;
        }
    }
  }
  const n = e.nodes.filter((o) => o.source === s && Ht(o.type)), i = t.nodes.filter((o) => o.source === s && Ht(o.type));
  if (!n.length || n.length !== i.length) return null;
  const { matches: r } = vr(n, i, {}, []);
  if (r.length !== n.length) return null;
  for (const o of r) {
    const a = n.find((u) => u.key === o.leftKey), f = i.find((u) => u.key === o.rightKey);
    if (a.type !== f.type) return null;
    for (const u of Ht(a.type)) {
      const h = a.fields.find((y) => y.key === u || y.key === `widgets_values.${u}`), g = f.fields.find((y) => y.key === u || y.key === `widgets_values.${u}`);
      if (!h?.promptText || !g?.promptText) return null;
      if (h.value !== g.value) return !1;
    }
  }
  const l = (o) => o.nodes.filter((a) => a.source === s).flatMap((a) => a.fields.filter((f) => /^(?:inputs\.)?(?:positive|negative)$/.test(f.key) && f.kind === "reference").map((f) => ({ node: a.key, input: f.key, reference: f.value })));
  return Rt(l(e), l(t)) ? !0 : null;
}
function ze(e) {
  if (e === void 0) return "保存情報なし";
  if (typeof e == "string") return e;
  function t(s, n) {
    if (n > 128) throw new Error("Metadata nesting limit");
    const i = an(s);
    if (i !== void 0) return i;
    const r = "  ".repeat(n + 1), l = "  ".repeat(n);
    if (Array.isArray(s)) return s.length ? `[
${s.map((o) => r + t(o, n + 1)).join(`,
`)}
${l}]` : "[]";
    if (fe(s)) {
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
class qo {
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
const Go = new qo(4);
class zo {
  constructor(t = 128, s = 32 * 1024 * 1024) {
    this.maxEntries = t, this.maxBytes = s;
  }
  maxEntries;
  maxBytes;
  blobs = /* @__PURE__ */ new Map();
  bytes = 0;
  generation = 0;
  get epoch() {
    return this.generation;
  }
  get(t) {
    const s = this.blobs.get(t);
    return s && (this.blobs.delete(t), this.blobs.set(t, s)), s;
  }
  set(t, s, n = this.generation) {
    if (n === this.generation && (this.delete(t), !(s.size > this.maxBytes)))
      for (this.blobs.set(t, s), this.bytes += s.size; this.blobs.size > this.maxEntries || this.bytes > this.maxBytes; ) {
        const i = this.blobs.keys().next().value;
        if (i === void 0) break;
        this.delete(i);
      }
  }
  delete(t) {
    const s = this.blobs.get(t);
    s && (this.bytes -= s.size, this.blobs.delete(t));
  }
  clear() {
    this.generation++, this.blobs.clear(), this.bytes = 0;
  }
}
const ot = new zo(), Jo = ["src", "alt"], Yo = {
  key: 1,
  class: "sg-thumb-placeholder"
}, Cn = /* @__PURE__ */ rs({
  __name: "Thumbnail",
  props: {
    url: {},
    alt: {},
    cachedFallbackUrl: {},
    quiet: { type: Boolean }
  },
  emits: ["ready"],
  setup(e, { emit: t }) {
    const s = e, n = t, i = /* @__PURE__ */ Y(""), r = /* @__PURE__ */ Y(), l = /* @__PURE__ */ Y(!1);
    let o, a, f = 0;
    function u() {
      o?.abort(), a?.(), i.value && URL.revokeObjectURL(i.value), i.value = "";
    }
    _t(
      () => s.url,
      (y) => {
        u();
        const R = ++f, I = ot.epoch;
        l.value = !1;
        const P = ot.get(y) ?? (s.cachedFallbackUrl && ot.get(s.cachedFallbackUrl));
        if (P) {
          i.value = URL.createObjectURL(P);
          return;
        }
        o = new AbortController();
        const O = o.signal;
        a = Go.add(async () => {
          try {
            const C = await fetch(y, { signal: O, credentials: "same-origin" });
            if (!C.ok) throw new Error();
            const T = await C.blob();
            R === f && !O.aborted && (ot.set(y, T, I), i.value = URL.createObjectURL(T));
          } catch {
            !O.aborted && R === f && (l.value = !0);
          }
        }).cancel;
      },
      { immediate: !0 }
    );
    function h(y) {
      if (y.target !== r.value) return;
      const R = y.target;
      n("ready", { width: R.naturalWidth, height: R.naturalHeight });
    }
    function g(y) {
      y.target === r.value && (i.value && URL.revokeObjectURL(i.value), i.value = "", l.value = !0, ot.delete(s.url), s.cachedFallbackUrl && ot.delete(s.cachedFallbackUrl));
    }
    return Es(() => {
      f++, u();
    }), (y, R) => i.value ? (L(), N("img", {
      ref_key: "currentImage",
      ref: r,
      key: i.value,
      src: i.value,
      alt: e.alt,
      decoding: "async",
      onError: g,
      onLoad: h
    }, null, 40, Jo)) : e.quiet ? ie("", !0) : (L(), N("span", Yo, j(l.value ? "Image unavailable" : "Loading preview…"), 1));
  }
}), Xo = ["aria-label", "onClick"], Qo = { class: "sg-card-tools" }, Zo = ["title"], ea = ["aria-label", "checked", "onChange"], ta = ["aria-label", "onClick"], sa = /* @__PURE__ */ rs({
  __name: "VirtualGrid",
  props: {
    images: {},
    checked: {},
    pinned: {},
    large: { type: Boolean },
    api: {},
    hasMore: { type: Boolean },
    initialScroll: {}
  },
  emits: ["view", "pin", "check", "more", "position"],
  setup(e, { expose: t, emit: s }) {
    const n = e, i = s, r = /* @__PURE__ */ Y(), l = /* @__PURE__ */ Y(1e3), o = /* @__PURE__ */ Y(600), a = /* @__PURE__ */ Y(n.initialScroll), f = ae(() => n.large ? 284 : 164), u = ae(
      () => Fo(
        n.images.length,
        l.value,
        o.value,
        a.value,
        f.value
      )
    ), h = ae(
      () => n.images.slice(u.value.start, u.value.end)
    );
    let g;
    function y() {
      r.value && (l.value = r.value.clientWidth || 1e3, o.value = r.value.clientHeight || 600);
    }
    function R() {
      i("position", {
        scroll: a.value,
        width: l.value,
        cell: f.value
      });
    }
    function I() {
      a.value = r.value?.scrollTop ?? 0, R(), u.value.end >= n.images.length && n.hasMore && i("more");
    }
    return _t(
      () => [n.images, n.large],
      async ([P, O], [M, C]) => {
        const T = mr(
          M,
          P,
          a.value,
          l.value,
          C ? 284 : 164,
          O ? 284 : 164
        );
        await At(), r.value && (r.value.scrollTop = T, a.value = T, R());
      },
      { flush: "pre" }
    ), _n(() => {
      y(), r.value && (r.value.scrollTop = a.value), g = new ResizeObserver(y), r.value && g.observe(r.value);
    }), Es(() => g?.disconnect()), t({
      top: () => {
        r.value && (r.value.scrollTop = 0, a.value = 0, R());
      }
    }), (P, O) => (L(), N("div", {
      ref_key: "el",
      ref: r,
      class: "sg-grid-scroll",
      "data-testid": "image-grid",
      onScrollPassive: I
    }, [
      x("div", {
        class: "sg-grid-space",
        style: ct({ height: u.value.totalHeight + "px" })
      }, [
        x("div", {
          class: "sg-grid",
          style: ct({
            gridTemplateColumns: `repeat(${u.value.columns}, minmax(0,1fr))`,
            transform: `translateY(${u.value.offset}px)`
          })
        }, [
          (L(!0), N(X, null, xe(h.value, (M) => (L(), N("article", {
            key: M.id,
            class: et(["sg-card", { "sg-checked": e.checked.has(M.id) }]),
            style: ct({ height: f.value + "px" })
          }, [
            x("button", {
              class: "sg-thumb-button",
              "data-action": "view",
              "aria-label": "View " + M.name,
              onClick: (C) => i("view", M.id)
            }, [
              Se(Cn, {
                url: e.api.imageURL(M, "thumbnail", e.large ? 512 : 256),
                alt: M.name
              }, null, 8, ["url", "alt"])
            ], 8, Xo),
            x("div", Qo, [
              x("label", {
                title: "Select " + M.name
              }, [
                x("input", {
                  type: "checkbox",
                  "aria-label": "Select " + M.name,
                  checked: e.checked.has(M.id),
                  onChange: (C) => i("check", M.id)
                }, null, 40, ea),
                O[1] || (O[1] = be(" Compare", -1))
              ], 8, Zo),
              x("button", {
                class: et(["sg-pin", { "sg-pinned": e.pinned.has(M.id) }]),
                "aria-label": "Pin " + M.name + " as reference",
                onClick: (C) => i("pin", M.id)
              }, j(e.pinned.has(M.id) ? "Pinned" : "Pin"), 11, ta)
            ])
          ], 6))), 128))
        ], 4)
      ], 4),
      e.hasMore ? (L(), N("button", {
        key: 0,
        class: "sg-load",
        onClick: O[0] || (O[0] = (M) => i("more"))
      }, " Load more images ")) : ie("", !0)
    ], 544));
  }
}), na = ["data-side", "data-image"], ia = { class: "sg-pane-caption" }, ra = ["aria-label", "disabled"], la = {
  key: 0,
  class: "sg-unavailable",
  role: "status"
}, oa = ["src", "alt"], aa = {
  key: 2,
  class: "sg-surface-status"
}, ca = ["title"], ua = { class: "sg-zoom-status" }, fa = {
  class: "sg-quality-status",
  role: "status"
}, ui = /* @__PURE__ */ rs({
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
    const n = e, i = s, r = /* @__PURE__ */ Y(), l = /* @__PURE__ */ Y(), o = /* @__PURE__ */ Y(640), a = /* @__PURE__ */ Y(600), f = /* @__PURE__ */ Y({ width: 0, height: 0 }), u = /* @__PURE__ */ Y(!1), h = /* @__PURE__ */ Y(!1), g = /* @__PURE__ */ Y(!1);
    let y, R = null;
    const I = ae(
      () => Math.min(
        o.value / (f.value.width || n.image?.width || 1024),
        a.value / (f.value.height || n.image?.height || 1024)
      )
    ), P = ae(
      () => (f.value.width || n.image?.width || 1024) * I.value
    ), O = ae(
      () => (f.value.height || n.image?.height || 1024) * I.value
    ), M = ae(() => ({
      width: P.value + "px",
      height: O.value + "px",
      transform: `translate(-50%,-50%) translate(${n.transform.x * P.value * n.transform.scale}px,${n.transform.y * O.value * n.transform.scale}px) scale(${n.transform.scale})`
    }));
    _t(
      () => [n.image?.id, n.image?.revision],
      () => {
        u.value = !1, h.value = !1, g.value = !1, f.value = { width: 0, height: 0 };
      }
    );
    async function C(B) {
      if (B.target !== r.value) return;
      const U = B.target;
      if (U.decode)
        try {
          await U.decode();
        } catch {
          U === r.value && (h.value = !0);
          return;
        }
      U === r.value && (f.value = { width: U.naturalWidth, height: U.naturalHeight }, u.value = !0);
    }
    function T(B) {
      u.value || (g.value = !0, !n.image?.width && B.width && B.height && (f.value = B));
    }
    function H(B) {
      B.target === r.value && (h.value = !0);
    }
    t({ originalScale: ae(() => 1 / I.value) });
    function z(B) {
      const U = n.transform.scale, oe = Math.min(
        32,
        Math.max(0.25, U * Math.exp(-B.deltaY * 15e-4))
      ), ue = l.value.getBoundingClientRect(), Ee = (B.clientX - ue.left - ue.width / 2) / P.value, qe = (B.clientY - ue.top - ue.height / 2) / O.value;
      i("transform", {
        scale: oe,
        x: n.transform.x + Ee * (1 / oe - 1 / U),
        y: n.transform.y + qe * (1 / oe - 1 / U)
      });
    }
    function q(B) {
      B.button === 0 && (R = { x: B.clientX, y: B.clientY, start: { ...n.transform } }, l.value?.setPointerCapture(B.pointerId));
    }
    function D(B) {
      R && i("transform", {
        ...R.start,
        x: R.start.x + (B.clientX - R.x) / (P.value * R.start.scale),
        y: R.start.y + (B.clientY - R.y) / (O.value * R.start.scale)
      });
    }
    function ee() {
      l.value && (o.value = l.value.clientWidth || 640, a.value = l.value.clientHeight || 600);
    }
    return _n(() => {
      ee(), y = new ResizeObserver(ee), l.value && y.observe(l.value);
    }), Es(() => y?.disconnect()), (B, U) => (L(), N("section", {
      class: "sg-image-pane",
      "data-side": e.side,
      "data-image": e.image?.id
    }, [
      x("div", ia, [
        x("strong", null, j(e.side === "left" ? "Reference · pinned" : "Image"), 1),
        x("span", null, j(e.image?.name ?? "No candidate"), 1),
        x("button", {
          "aria-label": "Show " + e.side + " original pixels",
          disabled: !u.value,
          onClick: U[0] || (U[0] = (oe) => i("original"))
        }, " 1:1 ", 8, ra)
      ]),
      e.unavailable ? (L(), N("p", la, " No longer present in this folder. The selected image is kept in place; the displayed image may be cached. ")) : ie("", !0),
      x("div", {
        ref_key: "surface",
        ref: l,
        class: "sg-image-surface",
        onWheel: gr(z, ["prevent"]),
        onPointerdown: q,
        onPointermove: D,
        onPointerup: U[1] || (U[1] = (oe) => /* @__PURE__ */ de(R) ? R.value = null : R = null),
        onPointercancel: U[2] || (U[2] = (oe) => /* @__PURE__ */ de(R) ? R.value = null : R = null),
        onLostpointercapture: U[3] || (U[3] = (oe) => /* @__PURE__ */ de(R) ? R.value = null : R = null),
        onDblclick: U[4] || (U[4] = (oe) => i("transform", { scale: 1, x: 0, y: 0 }))
      }, [
        e.image && !u.value ? (L(), N("div", {
          key: e.image.id + e.image.revision + "preview",
          class: "sg-image-preview",
          style: ct(M.value)
        }, [
          Se(Cn, {
            url: e.api.imageURL(e.image, "thumbnail", 512),
            "cached-fallback-url": e.api.imageURL(e.image, "thumbnail", 256),
            alt: e.image.name + " · preview",
            quiet: "",
            onReady: T
          }, null, 8, ["url", "cached-fallback-url", "alt"])
        ], 4)) : ie("", !0),
        e.image && !h.value ? (L(), N("img", {
          class: "sg-original",
          ref_key: "currentImage",
          ref: r,
          key: e.image.id + e.image.revision,
          src: e.api.imageURL(e.image, "original"),
          alt: e.image.name,
          style: ct({ ...M.value, opacity: u.value ? 1 : 0 }),
          fetchpriority: "high",
          loading: "eager",
          draggable: "false",
          decoding: "async",
          onLoad: C,
          onError: H
        }, null, 44, oa)) : ie("", !0),
        e.image ? ie("", !0) : (L(), N("p", aa, j(h.value ? "Image unavailable. It may have been moved or overwritten." : "No comparison candidate. Select more images or change the candidate range."), 1))
      ], 544),
      x("div", {
        class: "sg-models",
        title: e.models.join(", ")
      }, [
        x("span", null, j(e.models.length ? "Model: " + e.models.join(" · ") : e.modelStatus), 1),
        x("span", ua, j(Math.round(e.transform.scale * 100)) + "% of fit", 1),
        x("span", fa, j(u.value ? "Original" : h.value ? "Original unavailable" : g.value ? "Preview · Loading original…" : "Loading original…"), 1)
      ], 8, ca)
    ], 8, na));
  }
}), da = {
  class: "sg-metadata",
  "aria-label": "Saved settings"
}, ha = { class: "sg-panel-heading" }, pa = { key: 0 }, ga = {
  key: 2,
  role: "status"
}, ma = { class: "sg-muted" }, ya = { class: "sg-node-mapping" }, va = ["aria-label", "value", "onChange"], ba = { value: "__auto__" }, _a = ["value"], wa = { key: 0 }, xa = ["onClick"], ka = ["onClick"], Sa = ["onClick"], Ca = { key: 5 }, Ia = /* @__PURE__ */ rs({
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
    const s = e, n = t, i = /* @__PURE__ */ Y(""), r = ae(
      () => s.compare && s.left && s.right ? Wo(s.left, s.right, {
        manualMatches: s.manualMatches
      }) : null
    );
    async function l(u) {
      try {
        await navigator.clipboard.writeText(
          typeof u == "string" ? u : ze(u)
        ), i.value = "Copied";
      } catch {
        i.value = "Clipboard unavailable. Select the displayed text to copy.";
      }
    }
    function o(u) {
      const h = s.manualMatches[u], g = h === void 0 ? r.value?.matches.find((y) => y.leftKey === u)?.rightKey : h;
      return s.right?.nodes.find((y) => y.key === g);
    }
    function a(u) {
      return `{
  "prompt": ` + (u.rawText.prompt ?? ze(u.raw.prompt)) + `,
  "workflow": ` + (u.rawText.workflow ?? ze(u.raw.workflow)) + `
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
    return (u, h) => (L(), N("aside", da, [
      x("div", ha, [
        x("h2", null, j(e.compare ? "Saved setting differences" : "Saved settings"), 1),
        x("button", {
          "aria-label": "Close settings",
          onClick: h[0] || (h[0] = (g) => n("close"))
        }, "×")
      ]),
      h[14] || (h[14] = x("p", { class: "sg-muted" }, " Saved values only. Prompt text is excluded from identified differences. Unknown widget values keep their saved positions. ", -1)),
      e.loading ? (L(), N("p", pa, "Loading saved metadata…")) : ie("", !0),
      e.left?.status === "invalid" || e.right?.status === "invalid" ? (L(), N("button", {
        key: 1,
        onClick: h[1] || (h[1] = (g) => n("retry"))
      }, " Reload saved settings ")) : ie("", !0),
      i.value ? (L(), N("p", ga, j(i.value), 1)) : ie("", !0),
      r.value ? (L(), N(X, { key: 3 }, [
        x("p", {
          class: et(["sg-result", { "sg-warning": r.value.status === "incomplete" }])
        }, j(r.value.status === "same" ? "No differences in comparable saved settings." : r.value.status === "different" ? r.value.differences.length + " saved differences" : "Incomplete comparison. Missing or ambiguous settings are not equal."), 3),
        x("p", ma, j(r.value.excludedPromptFields) + " identified prompt fields excluded. ", 1),
        (L(!0), N(X, null, xe(r.value.warnings, (g, y) => (L(), N("p", {
          key: y,
          class: "sg-warning"
        }, j(g), 1))), 128)),
        x("button", {
          onClick: h[2] || (h[2] = (g) => l(r.value.differences))
        }, " Copy differences (left → right) "),
        x("details", ya, [
          h[8] || (h[8] = x("summary", null, "Review / change node matching", -1)),
          h[9] || (h[9] = x("p", { class: "sg-muted" }, " One-to-one within the same saved source. Auto matches are candidates, not proof of workflow identity. ", -1)),
          (L(!0), N(X, null, xe(e.left?.nodes, (g) => (L(), N("label", {
            key: g.key,
            class: "sg-match-row"
          }, [
            x("span", null, j(g.source) + " · " + j(g.id) + " · " + j(g.title || g.type), 1),
            x("select", {
              "aria-label": "Match " + g.key,
              value: e.manualMatches[g.key] === null ? "__none__" : e.manualMatches[g.key] ?? "__auto__",
              onChange: (y) => f(y, g.key)
            }, [
              x("option", ba, " Auto: " + j(r.value.matches.find((y) => y.leftKey === g.key)?.rightKey ?? "unmatched"), 1),
              h[5] || (h[5] = x("option", { value: "__none__" }, "Leave unmatched", -1)),
              (L(!0), N(X, null, xe(e.right?.nodes.filter(
                (y) => y.source === g.source
              ), (y) => (L(), N("option", {
                key: y.key,
                value: y.key
              }, j(y.id) + " · " + j(y.title || y.type), 9, _a))), 128))
            ], 40, va),
            x("details", null, [
              h[6] || (h[6] = x("summary", null, "Left saved values", -1)),
              x("pre", null, j(_e(ze)(
                g.fields.map((y) => ({ name: y.label, value: y.value }))
              )), 1)
            ]),
            o(g.key) ? (L(), N("details", wa, [
              h[7] || (h[7] = x("summary", null, "Right candidate saved values", -1)),
              x("pre", null, j(_e(ze)(
                o(g.key)?.fields.map((y) => ({
                  name: y.label,
                  value: y.value
                }))
              )), 1)
            ])) : ie("", !0)
          ]))), 128)),
          (L(!0), N(X, null, xe(r.value.unmatchedLeft, (g) => (L(), N("p", {
            key: g.node.key,
            class: "sg-warning"
          }, " Unmatched left " + j(g.node.key) + " · candidates: " + j(g.candidateKeys.join(", ") || "none"), 1))), 128)),
          (L(!0), N(X, null, xe(r.value.unmatchedRight, (g) => (L(), N("p", {
            key: g.node.key,
            class: "sg-warning"
          }, " Unmatched right " + j(g.node.key), 1))), 128))
        ]),
        (L(!0), N(X, null, xe(r.value.differences, (g) => (L(), N("article", {
          key: g.id,
          class: "sg-difference"
        }, [
          x("strong", null, j(g.leftNode?.title || g.rightNode?.title || g.leftNode?.type || g.rightNode?.type), 1),
          x("small", null, j(g.source) + " · " + j(g.leftNode?.id ?? "—") + " → " + j(g.rightNode?.id ?? "—") + " · " + j(g.kind), 1),
          x("h3", null, j(g.label), 1),
          x("label", null, [
            h[10] || (h[10] = be("Left reference ", -1)),
            x("button", {
              onClick: (y) => l(g.left)
            }, "Copy left", 8, xa)
          ]),
          x("pre", null, j(_e(ze)(g.left)), 1),
          x("label", null, [
            h[11] || (h[11] = be("Right image ", -1)),
            x("button", {
              onClick: (y) => l(g.right)
            }, "Copy right", 8, ka)
          ]),
          x("pre", null, j(_e(ze)(g.right)), 1)
        ]))), 128))
      ], 64)) : e.right ? (L(), N(X, { key: 4 }, [
        x("p", null, "Status: " + j(e.right.status), 1),
        (L(!0), N(X, null, xe(e.right.warnings, (g) => (L(), N("p", {
          key: g,
          class: "sg-warning"
        }, j(g), 1))), 128)),
        (L(!0), N(X, null, xe(e.right.nodes, (g) => (L(), N("details", {
          key: g.key
        }, [
          x("summary", null, j(g.source) + " · " + j(g.id) + " · " + j(g.title || g.type), 1),
          (L(!0), N(X, null, xe(g.fields, (y) => (L(), N("div", {
            key: y.key,
            class: "sg-field"
          }, [
            x("label", null, [
              be(j(y.label) + " ", 1),
              x("button", {
                onClick: (R) => l(y.value)
              }, "Copy value", 8, Sa)
            ]),
            x("pre", null, j(_e(ze)(y.value)), 1)
          ]))), 128))
        ]))), 128))
      ], 64)) : ie("", !0),
      e.right ? (L(), N("details", Ca, [
        h[12] || (h[12] = x("summary", null, "Original saved JSON (may include prompts)", -1)),
        h[13] || (h[13] = x("p", { class: "sg-muted" }, " Copied JSON may contain prompt text. Nothing is sent outside this ComfyUI server. ", -1)),
        e.left && e.compare ? (L(), N("button", {
          key: 0,
          onClick: h[3] || (h[3] = (g) => l(a(e.left)))
        }, " Copy original left JSON")) : ie("", !0),
        x("button", {
          onClick: h[4] || (h[4] = (g) => l(a(e.right)))
        }, " Copy original " + j(e.compare ? "right " : "") + "JSON ", 1),
        x("pre", null, j(_e(ze)(e.right.raw)), 1)
      ])) : ie("", !0)
    ]));
  }
}), Ma = { class: "sg-header" }, $a = { class: "sg-folder" }, Ta = ["value", "disabled"], Aa = ["value"], Ea = {
  key: 0,
  class: "sg-error",
  role: "alert"
}, Oa = { class: "sg-toolbar" }, Ra = { class: "sg-size" }, Pa = ["aria-pressed"], La = ["aria-pressed"], Fa = ["disabled"], Na = {
  key: 1,
  class: "sg-empty"
}, ja = { class: "sg-grid-footer" }, Da = { class: "sg-toolbar sg-view-toolbar" }, Ua = { class: "sg-reference-select" }, Ka = ["value"], Ha = ["value"], Va = {
  key: 0,
  value: "prompt"
}, Ba = ["disabled"], Wa = { class: "sg-position" }, qa = ["disabled"], Ga = { key: 2 }, za = ["checked"], Ja = ["aria-pressed"], Ya = { class: "sg-view-body" }, Xa = { class: "sg-candidate-bar" }, Qa = ["aria-label", "aria-pressed", "onClick"], Za = ["disabled"], ec = {
  key: 0,
  class: "sg-helper",
  role: "status"
}, tc = { class: "sg-view-footer" }, sc = { key: 0 }, nc = /* @__PURE__ */ rs({
  __name: "Gallery",
  props: {
    api: {}
  },
  setup(e) {
    const t = e, s = /* @__PURE__ */ gs(Ro()), n = /* @__PURE__ */ Y([]), i = /* @__PURE__ */ Y(!0), r = /* @__PURE__ */ Y(), l = /* @__PURE__ */ Y(), o = /* @__PURE__ */ Y(), a = /* @__PURE__ */ Y(), f = /* @__PURE__ */ Y(), u = /* @__PURE__ */ Y({ scroll: 0, width: 1e3, cell: 284 }), h = /* @__PURE__ */ Y(), g = /* @__PURE__ */ Y(0), y = new jo(t.api, s, () => g.value++), R = /* @__PURE__ */ Y(""), I = /* @__PURE__ */ Y(""), P = /* @__PURE__ */ Y(!1), O = /* @__PURE__ */ Y(!1), M = /* @__PURE__ */ gs(/* @__PURE__ */ new Map()), C = /* @__PURE__ */ new Map();
    let T = new AbortController(), H = new AbortController(), z = 0, q = 0, D;
    const ee = ae(() => (g.value, y.loading)), B = ae(() => (g.value, y.error)), U = ae(() => (g.value, y.cursor !== null)), oe = ae(() => s.leftId ? s.records.get(s.leftId) : void 0), ue = ae(() => {
      const m = s.mode === "single" ? s.currentId : s.rightId;
      return m ? s.records.get(m) : void 0;
    }), Ee = (m) => m.id + ":" + m.revision, qe = ae(
      () => oe.value ? M.get(Ee(oe.value)) : void 0
    ), nt = ae(
      () => ue.value ? M.get(Ee(ue.value)) : void 0
    ), Pt = ae(
      () => qe.value ? ai(qe.value) : []
    ), Lt = ae(
      () => nt.value ? ai(nt.value) : []
    ), Ls = ae(() => {
      const m = /* @__PURE__ */ new Set([...s.pinned, ...s.checked]);
      return s.leftId && m.add(s.leftId), [...m].map((p) => s.records.get(p)).filter((p) => !!p);
    }), pt = ae(
      () => s.mode === "single" ? s.images : ps(s)
    ), Oe = ae(
      () => pt.value.findIndex(
        (m) => m.id === (s.mode === "single" ? s.currentId : s.rightId)
      )
    ), Ie = ae(() => {
      const m = Math.max(0, Oe.value);
      return pt.value.slice(Math.max(0, m - 7), m + 8);
    });
    _t(
      () => s.images,
      (m, p) => {
        s.mode !== "grid" && (u.value.scroll = mr(
          p,
          m,
          u.value.scroll,
          u.value.width,
          u.value.cell,
          u.value.cell
        ));
      }
    ), _t(
      () => [
        s.mode,
        s.rightId,
        s.currentId,
        Ie.value.map((m) => m.id).join(",")
      ],
      async () => {
        await At();
        const m = h.value, p = m?.querySelector("[aria-pressed=true]");
        m && p && (m.scrollLeft = No(
          m.clientWidth,
          m.scrollLeft,
          p.offsetLeft,
          p.offsetWidth
        ));
      }
    );
    function Ft(m) {
      return m ? "No identifiable saved model information" : "Loading saved model information…";
    }
    async function it(m) {
      if (!m) return;
      const p = Ee(m);
      if (M.has(p)) return M.get(p);
      if (C.has(p)) return C.get(p);
      const k = z, K = T.signal, G = t.api.metadata(m, K).then(oi).catch(
        (W) => K.aborted ? void 0 : oi({
          status: "invalid",
          prompt: null,
          workflow: null,
          warnings: [W instanceof Error ? W.message : "Metadata unavailable"]
        })
      ).then((W) => {
        if (W && k === z && (M.set(p, W), M.size > 200)) {
          const se = /* @__PURE__ */ new Set([
            oe.value && Ee(oe.value),
            ue.value && Ee(ue.value),
            p
          ]);
          for (const ne of M.keys())
            if (!se.has(ne)) {
              M.delete(ne);
              break;
            }
        }
        return W;
      }).finally(() => {
        C.get(p) === G && C.delete(p);
      });
      return C.set(p, G), G;
    }
    _t(
      () => [
        oe.value?.id,
        oe.value?.revision,
        ue.value?.id,
        ue.value?.revision
      ],
      () => {
        it(oe.value), it(ue.value), s.manualMatches = {};
      },
      { flush: "post" }
    );
    async function Fs() {
      if (s.open) return;
      z++, T = new AbortController(), H = new AbortController(), s.open = !0, u.value.scroll = 0, R.value = "", I.value = "", await At(), r.value?.showModal(), O.value = !0;
      const m = z;
      try {
        const p = await t.api.folders(H.signal);
        if (m !== z) return;
        n.value = p.folders;
        const k = p.folders.find((K) => K.id === s.folderId) ?? p.folders[0];
        k ? await y.selectFolder(k.id) : R.value = "No output folders are available.";
      } catch (p) {
        m === z && (R.value = p instanceof Error ? p.message : "Folders unavailable");
      } finally {
        m === z && (O.value = !1);
      }
      m === z && (D = setInterval(() => {
        document.hidden || Mt();
      }, 5e3));
    }
    function rt() {
      z++, q++, P.value = !1, H.abort(), T.abort(), y.dispose(), clearInterval(D), C.clear(), M.clear(), ot.clear(), r.value?.close(), Po(s), I.value = "", At(() => a.value?.focus());
    }
    async function It(m) {
      u.value.scroll = 0, q++, P.value = !1, I.value = "", await y.selectFolder(m.target.value);
    }
    async function Mt() {
      s.open && await y.refresh();
    }
    function gt(m) {
      s.currentId = m, s.mode = "single", s.panel = !1, Ut(s, "right", { scale: 1, x: 0, y: 0 });
    }
    function In(m) {
      s.checked.has(m) ? s.checked.delete(m) : s.checked.add(m);
    }
    function c() {
      q++, P.value = !1, I.value = "";
    }
    _t(() => [oe.value?.id, oe.value?.revision], c, {
      flush: "sync"
    });
    function d(m) {
      c(), s.pinned.add(m), s.leftId = m, s.mode = "compare", s.scope = s.checked.size > 1 ? "checked" : "folder", s.rightId = m, s.manualMatches = {}, s.panel = !1, I.value = "", s.transforms = {
        left: { scale: 1, x: 0, y: 0 },
        right: { scale: 1, x: 0, y: 0 }
      };
    }
    function v() {
      const m = s.images.find((p) => s.checked.has(p.id))?.id ?? s.currentId ?? s.images[0]?.id;
      m && d(m);
    }
    function S() {
      P.value && c(), ps(s).some((m) => m.id === s.rightId) || (s.rightId = ps(s)[0]?.id ?? null);
    }
    function b(m) {
      const p = {
        left: { scale: l.value?.originalScale ?? 1, x: 0, y: 0 },
        right: { scale: o.value?.originalScale ?? 1, x: 0, y: 0 }
      };
      s.linked ? s.transforms = p : s.transforms[m] = p[m];
    }
    function w() {
      Ut(s, "left", { scale: 1, x: 0, y: 0 }), Ut(s, "right", { scale: 1, x: 0, y: 0 });
    }
    function E() {
      for (const m of [oe.value, ue.value])
        m && (M.delete(Ee(m)), it(m));
    }
    function A(m, p) {
      if (p === void 0) delete s.manualMatches[m];
      else {
        if (p !== null)
          for (const [k, K] of Object.entries(s.manualMatches))
            k !== m && K === p && (s.manualMatches[k] = null);
        s.manualMatches[m] = p;
      }
    }
    async function $() {
      const m = oe.value;
      if (!m || P.value) return;
      const p = ++q;
      P.value = !0, I.value = "Checking saved text in " + s.images.length + " loaded images…";
      const k = await it(m);
      if (p !== q) return;
      if (!k || ci(k, k) === null) {
        I.value = "Saved prompt text cannot be identified. Normal comparison remains available.", P.value = !1;
        return;
      }
      const K = s.images.slice();
      let G = 0, W = 0, se = 0;
      const ne = /* @__PURE__ */ new Set();
      async function ye() {
        for (; G < K.length && p === q; ) {
          const ve = K[G++];
          if (ve.id === m.id) continue;
          const Me = await it(ve);
          if (p !== q) return;
          const Nt = Me ? ci(k, Me) : null;
          Nt === !0 && ne.add(ve.id), Nt === null && W++, se++, I.value = `Checking saved text… ${se}/${K.length - 1}`;
        }
      }
      await Promise.all([ye(), ye()]), p === q && (P.value = !1, s.promptIds = ne, s.scope = "prompt", S(), I.value = `${ne.size} exact saved-text matches; ${W} unknown. Checked ${K.length} loaded images${U.value ? " only. Load more in the grid to search further" : ""}. Saved text does not prove the final generated prompt.`, P.value = !1);
    }
    function _(m) {
      if (!s.open) return;
      m.stopPropagation();
      const p = m.target;
      if (m.key === "Escape") {
        m.preventDefault(), s.panel ? s.panel = !1 : s.mode !== "grid" ? s.mode = "grid" : rt();
        return;
      }
      ["INPUT", "SELECT", "TEXTAREA"].includes(p.tagName) || s.mode !== "grid" && (m.key === "ArrowLeft" || m.key === "ArrowRight") && (m.preventDefault(), Ys(s, m.key === "ArrowLeft" ? -1 : 1));
    }
    const F = () => {
      Mt();
    };
    return _n(() => {
      t.api.comfy.addEventListener?.("executed", F), document.addEventListener("visibilitychange", F);
    }), Es(() => {
      ot.clear(), clearInterval(D), H.abort(), T.abort(), y.dispose(), t.api.comfy.removeEventListener?.("executed", F), document.removeEventListener("visibilitychange", F);
    }), (m, p) => (L(), N(X, null, [
      x("button", {
        ref_key: "launcher",
        ref: a,
        "data-action": "open",
        "data-testid": "gallery-launcher",
        class: "sg-launcher",
        "aria-label": "Open Gallery",
        onClick: Fs
      }, [...p[20] || (p[20] = [
        x("span", { "aria-hidden": "true" }, "▧", -1),
        be(" Gallery ", -1)
      ])], 512),
      s.open ? (L(), N("dialog", {
        key: 0,
        ref_key: "dialog",
        ref: r,
        class: "sg-dialog",
        "aria-label": "Shiba Gallery",
        onKeydown: _,
        onCancel: p[19] || (p[19] = gr(() => {
        }, ["prevent"]))
      }, [
        x("header", Ma, [
          p[23] || (p[23] = x("div", { class: "sg-brand" }, [
            x("span", { class: "sg-mark" }, "▧"),
            x("div", null, [
              x("strong", null, "Gallery"),
              x("small", null, "SHIBA · READ ONLY")
            ])
          ], -1)),
          s.mode !== "grid" ? (L(), N("button", {
            key: 0,
            "data-action": "grid",
            onClick: p[0] || (p[0] = (k) => s.mode = "grid")
          }, " ← Grid")) : ie("", !0),
          x("label", $a, [
            p[21] || (p[21] = be("Folder ", -1)),
            x("select", {
              "data-testid": "folder-select",
              "aria-label": "Output folder",
              value: s.folderId,
              disabled: O.value,
              onChange: It
            }, [
              (L(!0), N(X, null, xe(n.value, (k) => (L(), N("option", {
                key: k.id,
                value: k.id
              }, j(k.name), 9, Aa))), 128))
            ], 40, Ta)
          ]),
          p[24] || (p[24] = x("span", { class: "sg-header-spacer" }, null, -1)),
          x("span", {
            class: et(["sg-live", { "sg-working": ee.value }])
          }, [
            p[22] || (p[22] = x("i", null, null, -1)),
            be(j(ee.value ? "Syncing" : "Auto refresh"), 1)
          ], 2),
          x("button", {
            "data-action": "close",
            class: "sg-close",
            "aria-label": "Close Gallery",
            onClick: rt
          }, " Close × ")
        ]),
        R.value || B.value ? (L(), N("div", Ea, [
          be(j(R.value || B.value) + " ", 1),
          x("button", { onClick: Mt }, "Retry")
        ])) : ie("", !0),
        s.mode === "grid" ? (L(), N(X, { key: 1 }, [
          x("div", Oa, [
            x("span", null, [
              be(j(s.images.length) + j(U.value ? "+" : "") + " images ", 1),
              p[25] || (p[25] = x("small", null, "· newest file modification first", -1))
            ]),
            x("div", Ra, [
              x("button", {
                "aria-pressed": !i.value,
                onClick: p[1] || (p[1] = (k) => i.value = !1)
              }, "Small", 8, Pa),
              x("button", {
                "aria-pressed": i.value,
                onClick: p[2] || (p[2] = (k) => i.value = !0)
              }, "Large", 8, La)
            ]),
            p[26] || (p[26] = x("span", { class: "sg-header-spacer" }, null, -1)),
            x("span", null, j(s.checked.size) + " selected", 1),
            x("button", {
              class: "sg-primary",
              disabled: s.images.length < 2,
              "data-action": "compare",
              onClick: v
            }, " Compare selected ", 8, Fa)
          ]),
          s.images.length ? (L(), ds(sa, {
            key: 0,
            ref_key: "grid",
            ref: f,
            images: s.images,
            checked: s.checked,
            pinned: s.pinned,
            large: i.value,
            api: e.api,
            "has-more": U.value,
            "initial-scroll": u.value.scroll,
            onPosition: p[3] || (p[3] = (k) => u.value = k),
            onView: gt,
            onPin: d,
            onCheck: In,
            onMore: p[4] || (p[4] = (k) => _e(y).loadMore())
          }, null, 8, ["images", "checked", "pinned", "large", "api", "has-more", "initial-scroll"])) : (L(), N("div", Na, [
            p[27] || (p[27] = x("span", { class: "sg-empty-icon" }, "▧", -1)),
            x("h2", null, j(ee.value || O.value ? "Opening your output…" : "No images in this folder"), 1),
            p[28] || (p[28] = x("p", null, " Images stay in their original folder. Gallery never deletes or changes them. ", -1))
          ])),
          x("footer", ja, [
            p[29] || (p[29] = x("span", null, "Click an image to inspect · check images to compare · Pin keeps the left image fixed", -1)),
            x("button", {
              onClick: p[5] || (p[5] = (k) => f.value?.top())
            }, "↑ Newest")
          ])
        ], 64)) : (L(), N(X, { key: 2 }, [
          x("div", Da, [
            s.mode === "compare" ? (L(), N(X, { key: 0 }, [
              x("label", Ua, [
                p[30] || (p[30] = be("Reference ", -1)),
                x("select", {
                  "aria-label": "Reference image",
                  value: s.leftId,
                  onChange: p[6] || (p[6] = (k) => d(k.target.value))
                }, [
                  (L(!0), N(X, null, xe(Ls.value, (k) => (L(), N("option", {
                    key: k.id,
                    value: k.id
                  }, j(k.name) + j(s.pinned.has(k.id) ? " · pinned" : " · checked"), 9, Ha))), 128))
                ], 40, Ka)
              ]),
              x("label", null, [
                p[33] || (p[33] = be("Candidates ", -1)),
                ul(x("select", {
                  "onUpdate:modelValue": p[7] || (p[7] = (k) => s.scope = k),
                  "aria-label": "Candidate range",
                  onChange: S
                }, [
                  p[31] || (p[31] = x("option", { value: "folder" }, "This folder", -1)),
                  p[32] || (p[32] = x("option", { value: "checked" }, "Checked images", -1)),
                  s.scope === "prompt" ? (L(), N("option", Va, " Matching saved text ")) : ie("", !0)
                ], 544), [
                  [So, s.scope]
                ])
              ])
            ], 64)) : (L(), N("button", {
              key: 1,
              "data-action": "pin",
              class: "sg-primary",
              onClick: p[8] || (p[8] = (k) => s.currentId && d(s.currentId))
            }, " Pin as reference")),
            x("button", {
              "data-action": "previous",
              "aria-label": "Previous image",
              disabled: Oe.value <= 0,
              onClick: p[9] || (p[9] = (k) => _e(Ys)(s, -1))
            }, " ← Previous", 8, Ba),
            x("span", Wa, j(Oe.value < 0 ? "—" : Oe.value + 1) + " / " + j(pt.value.length) + j(U.value ? "+" : ""), 1),
            x("button", {
              "data-action": "next",
              "aria-label": "Next image",
              disabled: Oe.value < 0 || Oe.value >= pt.value.length - 1,
              onClick: p[10] || (p[10] = (k) => _e(Ys)(s, 1))
            }, " Next →", 8, qa),
            p[35] || (p[35] = x("span", { class: "sg-header-spacer" }, null, -1)),
            s.mode === "compare" ? (L(), N("label", Ga, [
              x("input", {
                type: "checkbox",
                "aria-label": "Link zoom and pan",
                checked: s.linked,
                onChange: p[11] || (p[11] = (k) => _e(Lo)(s, k.target.checked))
              }, null, 40, za),
              p[34] || (p[34] = be(" Link zoom / pan", -1))
            ])) : ie("", !0),
            x("button", { onClick: w }, "Fit"),
            x("button", {
              "aria-pressed": s.panel,
              "data-action": "settings",
              onClick: p[12] || (p[12] = (k) => s.panel = !s.panel)
            }, j(s.mode === "compare" ? "Differences" : "Settings"), 9, Ja)
          ]),
          x("div", Ya, [
            x("div", {
              class: et(["sg-image-pair", { "sg-single": s.mode === "single" }])
            }, [
              s.mode === "compare" ? (L(), ds(ui, {
                key: 0,
                ref_key: "leftPane",
                ref: l,
                image: oe.value,
                unavailable: !!s.leftId && s.unavailable.has(s.leftId),
                api: e.api,
                side: "left",
                transform: s.transforms.left,
                models: Pt.value,
                "model-status": Ft(qe.value),
                onOriginal: p[13] || (p[13] = (k) => b("left")),
                onTransform: p[14] || (p[14] = (k) => _e(Ut)(s, "left", k))
              }, null, 8, ["image", "unavailable", "api", "transform", "models", "model-status"])) : ie("", !0),
              Se(ui, {
                ref_key: "rightPane",
                ref: o,
                image: ue.value,
                unavailable: !!ue.value && s.unavailable.has(ue.value.id),
                api: e.api,
                side: "right",
                transform: s.transforms.right,
                models: Lt.value,
                "model-status": Ft(nt.value),
                onOriginal: p[15] || (p[15] = (k) => b("right")),
                onTransform: p[16] || (p[16] = (k) => _e(Ut)(s, "right", k))
              }, null, 8, ["image", "unavailable", "api", "transform", "models", "model-status"])
            ], 2),
            s.panel ? (L(), ds(Ia, {
              key: 0,
              left: qe.value,
              right: nt.value,
              compare: s.mode === "compare",
              "manual-matches": s.manualMatches,
              loading: !nt.value || s.mode === "compare" && !qe.value,
              onClose: p[17] || (p[17] = (k) => s.panel = !1),
              onMatch: A,
              onRetry: E
            }, null, 8, ["left", "right", "compare", "manual-matches", "loading"])) : ie("", !0)
          ]),
          x("div", Xa, [
            x("div", {
              ref_key: "candidateRow",
              ref: h,
              class: "sg-candidates",
              "aria-label": "Image candidates"
            }, [
              (L(!0), N(X, null, xe(Ie.value, (k) => (L(), N("button", {
                key: k.id,
                class: et(["sg-candidate", {
                  "sg-current": k.id === (s.mode === "single" ? s.currentId : s.rightId)
                }]),
                "aria-label": "Choose " + k.name,
                "aria-pressed": k.id === (s.mode === "single" ? s.currentId : s.rightId),
                onClick: (K) => s.mode === "single" ? s.currentId = k.id : s.rightId = k.id
              }, [
                Se(Cn, {
                  url: e.api.imageURL(k, "thumbnail", 256),
                  alt: k.name
                }, null, 8, ["url", "alt"])
              ], 10, Qa))), 128))
            ], 512),
            U.value ? (L(), N("button", {
              key: 0,
              onClick: p[18] || (p[18] = (k) => _e(y).loadMore())
            }, "Load more")) : ie("", !0),
            s.mode === "compare" ? (L(), N("button", {
              key: 1,
              disabled: P.value,
              onClick: $
            }, j(P.value ? "Checking text…" : "Find matching saved text"), 9, Za)) : ie("", !0)
          ]),
          I.value ? (L(), N("p", ec, j(I.value), 1)) : ie("", !0),
          x("footer", tc, [
            p[36] || (p[36] = be(" Wheel to zoom · drag to pan · double-click to fit · ← → to navigate ", -1)),
            s.mode === "compare" ? (L(), N("span", sc, "· Linking copies the left view; different sizes use normalized image positions.")) : ie("", !0)
          ])
        ], 64))
      ], 544)) : ie("", !0)
    ], 64));
  }
});
function fi(e, t) {
  const s = new URL(e), n = s.pathname.lastIndexOf("/extensions/");
  if (n < 0)
    throw new Error("Gallery must load from the ComfyUI extensions directory.");
  return s.pathname = s.pathname.slice(0, n) + "/scripts/" + t + ".js", s.search = "", s.hash = "", s.href;
}
class ic {
  constructor(t) {
    this.comfy = t;
  }
  comfy;
  async get(t, s, n = "auto") {
    const i = await fetch(this.comfy.apiURL("/shiba-gallery" + t), {
      signal: s,
      credentials: "same-origin",
      priority: n
    });
    if (!i.ok) {
      let r = "Request failed (" + i.status + ")";
      try {
        const l = await i.json();
        r = l.error?.message ?? l.message ?? (typeof l.error == "string" ? l.error : r);
      } catch {
      }
      throw new Error(r);
    }
    return i.json();
  }
  folders(t) {
    return this.get("/folders", t);
  }
  images(t, s = null, n) {
    const i = new URLSearchParams({ folder_id: t, limit: "60" });
    return s && i.set("cursor", s), this.get("/images?" + i, n);
  }
  metadata(t, s) {
    return this.get(
      "/image/" + encodeURIComponent(t.id) + "/metadata?" + new URLSearchParams({ revision: t.revision }),
      s,
      "low"
    );
  }
  imageURL(t, s, n) {
    const i = new URLSearchParams({ revision: t.revision });
    return n && i.set("size", String(n)), this.comfy.apiURL(
      "/shiba-gallery/image/" + encodeURIComponent(t.id) + "/" + s + "?" + i
    );
  }
}
const Xs = import.meta.url;
async function rc() {
  const [{ app: e }, { api: t }] = await Promise.all([
    import(
      /* @vite-ignore */
      fi(Xs, "app")
    ),
    import(
      /* @vite-ignore */
      fi(Xs, "api")
    )
  ]);
  e.registerExtension({
    name: "shiba.gallery",
    setup() {
      if (document.getElementById("shiba-gallery-root")) return;
      const s = document.createElement("link");
      s.rel = "stylesheet", s.href = new URL("./shiba-gallery.css", Xs).href, s.dataset.shibaGallery = "true", document.head.append(s);
      const n = document.createElement("div");
      n.id = "shiba-gallery-root", document.body.append(n), Ao(nc, { api: new ic(t) }).mount(n);
    }
  });
}
rc().catch(
  () => console.error(
    "[Shiba Gallery] Could not register the gallery extension. Check ComfyUI extension loading and proxy paths."
  )
);
