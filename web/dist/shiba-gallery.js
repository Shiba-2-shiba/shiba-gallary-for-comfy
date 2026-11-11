// @__NO_SIDE_EFFECTS__
function bn(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const s of e.split(",")) t[s] = 1;
  return (s) => s in t;
}
const ae = {}, Tt = [], At = () => {
}, _i = () => !1, Ls = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Fs = (e) => e.startsWith("onUpdate:"), Oe = Object.assign, xi = (e, t) => {
  const s = e.indexOf(t);
  s > -1 && e.splice(s, 1);
}, $r = Object.prototype.hasOwnProperty, ne = (e, t) => $r.call(e, t), q = Array.isArray, mt = (e) => fs(e) === "[object Map]", Rt = (e) => fs(e) === "[object Set]", Nn = (e) => fs(e) === "[object Date]", ie = (e) => typeof e == "function", de = (e) => typeof e == "string", Qe = (e) => typeof e == "symbol", ce = (e) => e !== null && typeof e == "object", ki = (e) => (ce(e) || ie(e)) && ie(e.then) && ie(e.catch), Si = Object.prototype.toString, fs = (e) => Si.call(e), Ar = (e) => fs(e).slice(8, -1), Ci = (e) => fs(e) === "[object Object]", wn = (e) => de(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Xt = /* @__PURE__ */ bn(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Ns = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((s) => t[s] || (t[s] = e(s)));
}, Er = /-\w/g, De = /* @__PURE__ */ Ns((e) => e.replace(Er, (t) => t.slice(1).toUpperCase())), Or = /\B([A-Z])/g, Pt = /* @__PURE__ */ Ns(
  (e) => e.replace(Or, "-$1").toLowerCase()
), Ii = /* @__PURE__ */ Ns((e) => e.charAt(0).toUpperCase() + e.slice(1)), zs = /* @__PURE__ */ Ns((e) => e ? `on${Ii(e)}` : ""), Je = (e, t) => !Object.is(e, t), xs = (e, ...t) => {
  for (let s = 0; s < e.length; s++)
    e[s](...t);
}, Mi = (e, t, s, n = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: n,
    value: s
  });
}, _n = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let jn;
const js = () => jn || (jn = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function vt(e) {
  if (q(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++) {
      const n = e[s], i = de(n) ? Fr(n) : vt(n);
      if (i)
        for (const r in i)
          t[r] = i[r];
    }
    return t;
  } else if (de(e) || ce(e))
    return e;
}
const Rr = /;(?![^(]*\))/g, Pr = /:([^]+)/, Lr = /"(?:[^"\\]|\\[^])*"|'(?:[^'\\]|\\[^])*'|\\[^]|\/\*[^]*?\*\//g;
function Fr(e) {
  const t = {};
  return e.replace(Lr, (s) => s.startsWith("/*") ? "" : s).split(Rr).forEach((s) => {
    if (s) {
      const n = s.split(Pr);
      n.length > 1 && (t[n[0].trim()] = n[1].trim());
    }
  }), t;
}
function Ye(e) {
  let t = "";
  if (de(e))
    t = e;
  else if (q(e))
    for (let s = 0; s < e.length; s++) {
      const n = Ye(e[s]);
      n && (t += n + " ");
    }
  else if (ce(e))
    for (const s in e)
      e[s] && (t += s + " ");
  return t.trim();
}
const Nr = "itemscope,allowfullscreen,disablepictureinpicture,disableremoteplayback,formnovalidate,ismap,nomodule,novalidate,playsinline,readonly", jr = /* @__PURE__ */ bn(Nr);
function Ti(e) {
  return !!e || e === "";
}
function Dr(e, t, s) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let i = 0; n && i < e.length; i++)
    n = bt(e[i], t[i], s);
  return n;
}
function Dn(e, t, s) {
  if (e.size !== t.size) return !1;
  const n = Array.from(t), i = new Uint8Array(n.length);
  for (const r of e) {
    let l = -1;
    for (let o = 0; o < n.length; o++)
      if (!i[o] && bt(r, n[o], s)) {
        l = o;
        break;
      }
    if (l < 0) return !1;
    i[l] = 1;
  }
  return !0;
}
function Ur(e, t, s) {
  let n = mt(e), i = mt(t);
  if (n || i || (n = Rt(e), i = Rt(t), n || i))
    return n && i ? Dn(e, t, s) : !1;
  const r = Object.keys(e).length, l = Object.keys(t).length;
  if (r !== l)
    return !1;
  for (const o in e) {
    const a = e.hasOwnProperty(o), u = t.hasOwnProperty(o);
    if (a && !u || !a && u || !bt(e[o], t[o], s))
      return !1;
  }
  return String(e) === String(t);
}
function Un(e, t, s, n) {
  s || (s = [/* @__PURE__ */ new Map(), /* @__PURE__ */ new Map()]);
  const [i, r] = s;
  if (i.has(e) || r.has(t))
    return i.get(e) === t && r.get(t) === e;
  i.set(e, t), r.set(t, e);
  const l = n(e, t, s);
  return i.delete(e), r.delete(t), l;
}
function bt(e, t, s) {
  if (e === t) return !0;
  let n = Nn(e), i = Nn(t);
  return n || i ? n && i ? e.getTime() === t.getTime() : !1 : (n = Qe(e), i = Qe(t), n || i ? e === t : (n = q(e), i = q(t), n || i ? n && i ? Un(e, t, s, Dr) : !1 : (n = ce(e), i = ce(t), n || i ? !n || !i ? !1 : Un(e, t, s, Ur) : String(e) === String(t))));
}
function Kr(e, t) {
  return e.findIndex((s) => bt(s, t));
}
const $i = (e) => !!(e && e.__v_isRef === !0), D = (e) => de(e) ? e : e == null ? "" : q(e) || ce(e) && (e.toString === Si || !ie(e.toString)) ? $i(e) ? D(e.value) : JSON.stringify(e, Ai, 2) : String(e), Ai = (e, t) => $i(t) ? Ai(e, t.value) : mt(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (s, [n, i], r) => (s[Gs(n, r) + " =>"] = i, s),
    {}
  )
} : Rt(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((s) => Gs(s))
} : Qe(t) ? Gs(t) : ce(t) && !q(t) && !Ci(t) ? String(t) : t, Gs = (e, t = "") => {
  var s;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    Qe(e) ? `Symbol(${(s = e.description) != null ? s : t})` : e
  );
};
let me;
class Hr {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !t && me && (me.active ? (this.parent = me, this.index = (me.scopes || (me.scopes = [])).push(
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
      const s = me;
      try {
        return me = this, t();
      } finally {
        me = s;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = me, me = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (me === this)
        me = this.prevScope;
      else {
        let t = me;
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
function Vr() {
  return me;
}
let le;
const Js = /* @__PURE__ */ new WeakSet();
class Ei {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, me && (me.active ? me.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Js.has(this) && (Js.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Ri(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Kn(this), Pi(this);
    const t = le, s = Ue;
    le = this, Ue = !0;
    try {
      return this.fn();
    } finally {
      Li(this), le = t, Ue = s, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        Sn(t);
      this.deps = this.depsTail = void 0, Kn(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Js.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    cn(this) && this.run();
  }
  get dirty() {
    return cn(this);
  }
}
let Oi = 0, Qt, Zt;
function Ri(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Zt, Zt = e;
    return;
  }
  e.next = Qt, Qt = e;
}
function xn() {
  Oi++;
}
function kn() {
  if (--Oi > 0)
    return;
  if (Zt) {
    let t = Zt;
    for (Zt = void 0; t; ) {
      const s = t.next;
      t.next = void 0, t.flags &= -9, t = s;
    }
  }
  let e;
  for (; Qt; ) {
    let t = Qt;
    for (Qt = void 0; t; ) {
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
function Pi(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Li(e) {
  let t, s = e.depsTail, n = s;
  for (; n; ) {
    const i = n.prevDep;
    n.version === -1 ? (n === s && (s = i), Sn(n), Br(n)) : t = n, n.dep.activeLink = n.prevActiveLink, n.prevActiveLink = void 0, n = i;
  }
  e.deps = t, e.depsTail = s;
}
function cn(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Fi(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Fi(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === rs) || (e.globalVersion = rs, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !cn(e))))
    return;
  e.flags |= 2;
  const t = e.dep, s = le, n = Ue;
  le = e, Ue = !0;
  try {
    Pi(e);
    const i = e.fn(e._value);
    (t.version === 0 || Je(i, e._value)) && (e.flags |= 128, e._value = i, t.version++);
  } catch (i) {
    throw t.version++, i;
  } finally {
    le = s, Ue = n, Li(e), e.flags &= -3;
  }
}
function Sn(e, t = !1) {
  const { dep: s, prevSub: n, nextSub: i } = e;
  if (n && (n.nextSub = i, e.prevSub = void 0), i && (i.prevSub = n, e.nextSub = void 0), s.subs === e && (s.subs = n, !n && s.computed)) {
    s.computed.flags &= -5;
    for (let r = s.computed.deps; r; r = r.nextDep)
      Sn(r, !0);
  }
  !t && !--s.sc && s.map && s.map.delete(s.key);
}
function Br(e) {
  const { prevDep: t, nextDep: s } = e;
  t && (t.nextDep = s, e.prevDep = void 0), s && (s.prevDep = t, e.nextDep = void 0);
}
let Ue = !0;
const Ni = [];
function ct() {
  Ni.push(Ue), Ue = !1;
}
function ut() {
  const e = Ni.pop();
  Ue = e === void 0 ? !0 : e;
}
function Kn(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const s = le;
    le = void 0;
    try {
      t();
    } finally {
      le = s;
    }
  }
}
let rs = 0;
class Wr {
  constructor(t, s) {
    this.sub = t, this.dep = s, this.version = s.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Cn {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!le || !Ue || le === this.computed)
      return;
    let s = this.activeLink;
    if (s === void 0 || s.sub !== le)
      s = this.activeLink = new Wr(le, this), le.deps ? (s.prevDep = le.depsTail, le.depsTail.nextDep = s, le.depsTail = s) : le.deps = le.depsTail = s, ji(s);
    else if (s.version === -1 && (s.version = this.version, s.nextDep)) {
      const n = s.nextDep;
      n.prevDep = s.prevDep, s.prevDep && (s.prevDep.nextDep = n), s.prevDep = le.depsTail, s.nextDep = void 0, le.depsTail.nextDep = s, le.depsTail = s, le.deps === s && (le.deps = n);
    }
    return s;
  }
  trigger(t) {
    this.version++, rs++, this.notify(t);
  }
  notify(t) {
    xn();
    try {
      for (let s = this.subs; s; s = s.prevSub)
        s.sub.notify() && s.sub.dep.notify();
    } finally {
      kn();
    }
  }
}
function ji(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let n = t.deps; n; n = n.nextDep)
        ji(n);
    }
    const s = e.dep.subs;
    s !== e && (e.prevSub = s, s && (s.nextSub = e)), e.dep.subs = e;
  }
}
const un = /* @__PURE__ */ new WeakMap(), Et = /* @__PURE__ */ Symbol(
  ""
), fn = /* @__PURE__ */ Symbol(
  ""
), ls = /* @__PURE__ */ Symbol(
  ""
);
function be(e, t, s) {
  if (Ue && le) {
    let n = un.get(e);
    n || un.set(e, n = /* @__PURE__ */ new Map());
    let i = n.get(s);
    i || (n.set(s, i = new Cn()), i.map = n, i.key = s), i.track();
  }
}
function ot(e, t, s, n, i, r) {
  const l = un.get(e);
  if (!l) {
    rs++;
    return;
  }
  const o = (a) => {
    a && a.trigger();
  };
  if (xn(), t === "clear")
    l.forEach(o);
  else {
    const a = q(e), u = a && wn(s);
    if (a && s === "length") {
      const f = Number(n);
      l.forEach((h, p) => {
        (p === "length" || p === ls || !Qe(p) && p >= f) && o(h);
      });
    } else
      switch ((s !== void 0 || l.has(void 0)) && o(l.get(s)), u && o(l.get(ls)), t) {
        case "add":
          a ? u && o(l.get("length")) : (o(l.get(Et)), mt(e) && o(l.get(fn)));
          break;
        case "delete":
          a || (o(l.get(Et)), mt(e) && o(l.get(fn)));
          break;
        case "set":
          mt(e) && o(l.get(Et));
          break;
      }
  }
  kn();
}
function Ft(e) {
  const t = /* @__PURE__ */ Z(e);
  return t === e || (be(t, "iterate", ls), /* @__PURE__ */ Le(e)) ? t : /* @__PURE__ */ Ze(e) ? /* @__PURE__ */ yt(e) ? t.map((s) => wt(Fe(s))) : t.map(wt) : t.map(Fe);
}
function Ds(e) {
  return be(e = /* @__PURE__ */ Z(e), "iterate", ls), e;
}
function qe(e, t) {
  return /* @__PURE__ */ Ze(e) ? wt(/* @__PURE__ */ yt(e) ? Fe(t) : t) : Fe(t);
}
const qr = {
  __proto__: null,
  [Symbol.iterator]() {
    return Ys(this, Symbol.iterator, (e) => qe(this, e));
  },
  concat(...e) {
    return Ft(this).concat(
      ...e.map((t) => q(t) ? Ft(t) : t)
    );
  },
  entries() {
    return Ys(this, "entries", (e) => (e[1] = qe(this, e[1]), e));
  },
  every(e, t) {
    return st(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return st(
      this,
      "filter",
      e,
      t,
      (s) => s.map((n) => qe(this, n)),
      arguments
    );
  },
  find(e, t) {
    return st(
      this,
      "find",
      e,
      t,
      (s) => qe(this, s),
      arguments
    );
  },
  findIndex(e, t) {
    return st(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return st(
      this,
      "findLast",
      e,
      t,
      (s) => qe(this, s),
      arguments
    );
  },
  findLastIndex(e, t) {
    return st(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return st(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return Xs(this, "includes", e);
  },
  indexOf(...e) {
    return Xs(this, "indexOf", e);
  },
  join(e) {
    return Ft(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return Xs(this, "lastIndexOf", e);
  },
  map(e, t) {
    return st(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return qt(this, "pop");
  },
  push(...e) {
    return qt(this, "push", e);
  },
  reduce(e, ...t) {
    return Vn(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return Vn(this, "reduceRight", e, t);
  },
  shift() {
    return qt(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return st(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return qt(this, "splice", e);
  },
  toReversed() {
    return Ft(this).toReversed();
  },
  toSorted(e) {
    return Ft(this).toSorted(e);
  },
  toSpliced(...e) {
    return Ft(this).toSpliced(...e);
  },
  unshift(...e) {
    return qt(this, "unshift", e);
  },
  values() {
    return Ys(this, "values", (e) => qe(this, e));
  }
};
function Ys(e, t, s) {
  const n = Ds(e), i = n[t], r = i.call(n);
  if (n !== e && !/* @__PURE__ */ Le(e)) {
    if (r[Symbol.toStringTag] === "Array Iterator") {
      const l = Object.create(Object.getPrototypeOf(r));
      return l.next = () => Hn(r.next(), s), i !== Di[t] && Object.defineProperties(l, {
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
    r._next = r.next, r.next = () => Hn(r._next(), s);
  }
  return r;
}
function Hn(e, t) {
  return e.done || (e.value = t(e.value)), e;
}
const Di = Array.prototype;
function st(e, t, s, n, i, r) {
  const l = Ds(e), o = l !== e && !/* @__PURE__ */ Le(e), a = l[t];
  if (a !== Di[t]) {
    const h = a.apply(e, r);
    return o ? Fe(h) : h;
  }
  let u = s;
  l !== e && (o ? u = function(h, p) {
    return s.call(this, qe(e, h), p, e);
  } : s.length > 2 && (u = function(h, p) {
    return s.call(this, h, p, e);
  }));
  const f = a.call(l, u, n);
  return o && i ? i(f) : f;
}
function Vn(e, t, s, n) {
  const i = Ds(e), r = i !== e && !/* @__PURE__ */ Le(e);
  let l = s, o = !1;
  i !== e && (r ? (o = n.length === 0, l = function(u, f, h) {
    return o && (o = !1, u = qe(e, u)), s.call(this, u, qe(e, f), h, e);
  }) : s.length > 3 && (l = function(u, f, h) {
    return s.call(this, u, f, h, e);
  }));
  const a = i[t](l, ...n);
  return o ? qe(e, a) : a;
}
function Xs(e, t, s) {
  const n = /* @__PURE__ */ Z(e);
  be(n, "iterate", ls);
  const i = n[t](...s);
  return (i === -1 || i === !1) && /* @__PURE__ */ Tn(s[0]) ? (s[0] = /* @__PURE__ */ Z(s[0]), n[t](...s)) : i;
}
function qt(e, t, s = []) {
  ct(), xn();
  const n = (/* @__PURE__ */ Z(e))[t].apply(e, s);
  return kn(), ut(), n;
}
const zr = /* @__PURE__ */ bn("__proto__,__v_isRef,__isVue"), Ui = /* @__PURE__ */ new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Qe)
);
function Gr(e) {
  Qe(e) || (e = String(e));
  const t = /* @__PURE__ */ Z(this);
  return be(t, "has", e), t.hasOwnProperty(e);
}
class Ki {
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
      return n === (i ? r ? il : Wi : r ? Bi : Vi).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(n) ? t : void 0;
    const l = q(t);
    if (!i) {
      let a;
      if (l && (a = qr[s]))
        return a;
      if (s === "hasOwnProperty")
        return Gr;
    }
    const o = Reflect.get(
      t,
      s,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ ge(t) ? t : n
    );
    if ((Qe(s) ? Ui.has(s) : zr(s)) || (i || be(t, "get", s), r))
      return o;
    if (/* @__PURE__ */ ge(o)) {
      const a = l && wn(s) ? o : o.value;
      return i && ce(a) ? /* @__PURE__ */ hn(a) : a;
    }
    return ce(o) ? i ? /* @__PURE__ */ hn(o) : /* @__PURE__ */ Is(o) : o;
  }
}
class Hi extends Ki {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, s, n, i) {
    let r = t[s];
    const l = q(t) && wn(s);
    if (!this._isShallow) {
      const u = /* @__PURE__ */ Ze(r);
      if (!/* @__PURE__ */ Le(n) && !/* @__PURE__ */ Ze(n) && (r = /* @__PURE__ */ Z(r), n = /* @__PURE__ */ Z(n)), !l && /* @__PURE__ */ ge(r) && !/* @__PURE__ */ ge(n))
        return u || (r.value = n), !0;
    }
    const o = l ? Number(s) < t.length : ne(t, s), a = Reflect.set(
      t,
      s,
      n,
      /* @__PURE__ */ ge(t) ? t : i
    );
    return t === /* @__PURE__ */ Z(i) && a && (o ? Je(n, r) && ot(t, "set", s, n) : ot(t, "add", s, n)), a;
  }
  deleteProperty(t, s) {
    const n = ne(t, s);
    t[s];
    const i = Reflect.deleteProperty(t, s);
    return i && n && ot(t, "delete", s, void 0), i;
  }
  has(t, s) {
    const n = Reflect.has(t, s);
    return (!Qe(s) || !Ui.has(s)) && be(t, "has", s), n;
  }
  ownKeys(t) {
    return be(
      t,
      "iterate",
      q(t) ? "length" : Et
    ), Reflect.ownKeys(t);
  }
}
class Jr extends Ki {
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
const Yr = /* @__PURE__ */ new Hi(), Xr = /* @__PURE__ */ new Jr(), Qr = /* @__PURE__ */ new Hi(!0);
const dn = (e) => e, ms = (e) => Reflect.getPrototypeOf(e);
function Zr(e, t, s) {
  return function(...n) {
    const i = this.__v_raw, r = /* @__PURE__ */ Z(i), l = mt(r), o = e === "entries" || e === Symbol.iterator && l, a = e === "keys" && l, u = i[e](...n), f = s ? dn : t ? wt : Fe;
    return !t && be(
      r,
      "iterate",
      a ? fn : Et
    ), Oe(
      // inheriting all iterator properties
      Object.create(u),
      {
        // iterator protocol
        next() {
          const { value: h, done: p } = u.next();
          return p ? { value: h, done: p } : {
            value: o ? [f(h[0]), f(h[1])] : f(h),
            done: p
          };
        }
      }
    );
  };
}
function vs(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function el(e, t) {
  const s = {
    get(i) {
      const r = this.__v_raw, l = /* @__PURE__ */ Z(r), o = /* @__PURE__ */ Z(i);
      e || (Je(i, o) && be(l, "get", i), be(l, "get", o));
      const { has: a } = ms(l), u = t ? dn : e ? wt : Fe;
      if (a.call(l, i))
        return u(r.get(i));
      if (a.call(l, o))
        return u(r.get(o));
      r !== l && r.get(i);
    },
    get size() {
      const i = this.__v_raw;
      return !e && be(/* @__PURE__ */ Z(i), "iterate", Et), i.size;
    },
    has(i) {
      const r = this.__v_raw, l = /* @__PURE__ */ Z(r), o = /* @__PURE__ */ Z(i);
      return e || (Je(i, o) && be(l, "has", i), be(l, "has", o)), i === o ? r.has(i) : r.has(i) || r.has(o);
    },
    forEach(i, r) {
      const l = this, o = l.__v_raw, a = /* @__PURE__ */ Z(o), u = t ? dn : e ? wt : Fe;
      return !e && be(a, "iterate", Et), o.forEach((f, h) => i.call(r, u(f), u(h), l));
    }
  };
  return Oe(
    s,
    e ? {
      add: vs("add"),
      set: vs("set"),
      delete: vs("delete"),
      clear: vs("clear")
    } : {
      add(i) {
        const r = /* @__PURE__ */ Z(this), l = ms(r), o = /* @__PURE__ */ Z(i), a = !t && !/* @__PURE__ */ Le(i) && !/* @__PURE__ */ Ze(i) ? o : i;
        return l.has.call(r, a) || Je(i, a) && l.has.call(r, i) || Je(o, a) && l.has.call(r, o) || (r.add(a), ot(r, "add", a, a)), this;
      },
      set(i, r) {
        !t && !/* @__PURE__ */ Le(r) && !/* @__PURE__ */ Ze(r) && (r = /* @__PURE__ */ Z(r));
        const l = /* @__PURE__ */ Z(this), { has: o, get: a } = ms(l);
        let u = o.call(l, i);
        u || (i = /* @__PURE__ */ Z(i), u = o.call(l, i));
        const f = a.call(l, i);
        return l.set(i, r), u ? Je(r, f) && ot(l, "set", i, r) : ot(l, "add", i, r), this;
      },
      delete(i) {
        const r = /* @__PURE__ */ Z(this), { has: l, get: o } = ms(r);
        let a = l.call(r, i);
        a || (i = /* @__PURE__ */ Z(i), a = l.call(r, i)), o && o.call(r, i);
        const u = r.delete(i);
        return a && ot(r, "delete", i, void 0), u;
      },
      clear() {
        const i = /* @__PURE__ */ Z(this), r = i.size !== 0, l = i.clear();
        return r && ot(
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
    s[i] = Zr(i, e, t);
  }), s;
}
function In(e, t) {
  const s = el(e, t);
  return (n, i, r) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_isShallow" ? t : i === "__v_raw" ? n : Reflect.get(
    ne(s, i) && i in n ? s : n,
    i,
    r
  );
}
const tl = {
  get: /* @__PURE__ */ In(!1, !1)
}, sl = {
  get: /* @__PURE__ */ In(!1, !0)
}, nl = {
  get: /* @__PURE__ */ In(!0, !1)
};
const Vi = /* @__PURE__ */ new WeakMap(), Bi = /* @__PURE__ */ new WeakMap(), Wi = /* @__PURE__ */ new WeakMap(), il = /* @__PURE__ */ new WeakMap();
function rl(e) {
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
function Is(e) {
  return /* @__PURE__ */ Ze(e) ? e : Mn(
    e,
    !1,
    Yr,
    tl,
    Vi
  );
}
// @__NO_SIDE_EFFECTS__
function ll(e) {
  return Mn(
    e,
    !1,
    Qr,
    sl,
    Bi
  );
}
// @__NO_SIDE_EFFECTS__
function hn(e) {
  return Mn(
    e,
    !0,
    Xr,
    nl,
    Wi
  );
}
function Mn(e, t, s, n, i) {
  if (!ce(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e))
    return e;
  const r = i.get(e);
  if (r)
    return r;
  const l = rl(Ar(e));
  if (l === 0)
    return e;
  const o = new Proxy(
    e,
    l === 2 ? n : s
  );
  return i.set(e, o), o;
}
// @__NO_SIDE_EFFECTS__
function yt(e) {
  return /* @__PURE__ */ Ze(e) ? /* @__PURE__ */ yt(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function Ze(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Le(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function Tn(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function Z(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ Z(t) : e;
}
function ol(e) {
  return !ne(e, "__v_skip") && Object.isExtensible(e) && Mi(e, "__v_skip", !0), e;
}
const Fe = (e) => ce(e) ? /* @__PURE__ */ Is(e) : e, wt = (e) => ce(e) ? /* @__PURE__ */ hn(e) : e;
// @__NO_SIDE_EFFECTS__
function ge(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function Y(e) {
  return al(e, !1);
}
function al(e, t) {
  return /* @__PURE__ */ ge(e) ? e : new cl(e, t);
}
class cl {
  constructor(t, s) {
    this.dep = new Cn(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = s ? t : /* @__PURE__ */ Z(t), this._value = s ? t : Fe(t), this.__v_isShallow = s;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const s = this._rawValue, n = this.__v_isShallow || /* @__PURE__ */ Le(t) || /* @__PURE__ */ Ze(t);
    t = n ? t : /* @__PURE__ */ Z(t), Je(t, s) && (this._rawValue = t, this._value = n ? t : Fe(t), this.dep.trigger());
  }
}
function ke(e) {
  return /* @__PURE__ */ ge(e) ? e.value : e;
}
const ul = {
  get: (e, t, s) => t === "__v_raw" ? e : ke(Reflect.get(e, t, s)),
  set: (e, t, s, n) => {
    const i = e[t];
    return /* @__PURE__ */ ge(i) && !/* @__PURE__ */ ge(s) ? (i.value = s, !0) : Reflect.set(e, t, s, n);
  }
};
function qi(e) {
  return /* @__PURE__ */ yt(e) ? e : new Proxy(e, ul);
}
class fl {
  constructor(t, s, n) {
    this.fn = t, this.setter = s, this._value = void 0, this.dep = new Cn(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = rs - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !s, this.isSSR = n;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    le !== this)
      return Ri(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return Fi(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function dl(e, t, s = !1) {
  let n, i;
  return ie(e) ? n = e : (n = e.get, i = e.set), new fl(n, i, s);
}
const ys = {}, Ms = /* @__PURE__ */ new WeakMap();
let Mt;
function hl(e, t = !1, s = Mt) {
  if (s) {
    let n = Ms.get(s);
    n || Ms.set(s, n = []), n.push(e);
  }
}
function pl(e, t, s = ae) {
  const { immediate: n, deep: i, once: r, scheduler: l, augmentJob: o, call: a } = s, u = (A) => i ? A : /* @__PURE__ */ Le(A) || i === !1 || i === 0 ? at(A, 1) : at(A);
  let f, h, p, g, L = !1, I = !1;
  if (/* @__PURE__ */ ge(e) ? (h = () => e.value, L = /* @__PURE__ */ Le(e)) : /* @__PURE__ */ yt(e) ? (h = () => u(e), L = !0) : q(e) ? (I = !0, L = e.some((A) => /* @__PURE__ */ yt(A) || /* @__PURE__ */ Le(A)), h = () => e.map((A) => {
    if (/* @__PURE__ */ ge(A))
      return A.value;
    if (/* @__PURE__ */ yt(A))
      return u(A);
    if (ie(A))
      return a ? a(A, 2) : A();
  })) : ie(e) ? t ? h = a ? () => a(e, 2) : e : h = () => {
    if (p) {
      ct();
      try {
        p();
      } finally {
        ut();
      }
    }
    const A = Mt;
    Mt = f;
    try {
      return a ? a(e, 3, [g]) : e(g);
    } finally {
      Mt = A;
    }
  } : h = At, t && i) {
    const A = h, H = i === !0 ? 1 / 0 : i;
    h = () => at(A(), H);
  }
  const P = Vr(), R = () => {
    f.stop(), P && P.active && xi(P.effects, f);
  };
  if (r && t) {
    const A = t;
    t = (...H) => {
      try {
        return A(...H);
      } finally {
        R();
      }
    };
  }
  let O = I ? new Array(e.length).fill(ys) : ys;
  const S = (A) => {
    if (!(!(f.flags & 1) || !f.dirty && !A))
      if (t) {
        const H = f.run();
        if (A || i || L || (I ? H.some((J, G) => Je(J, O[G])) : Je(H, O))) {
          const J = Mt;
          ct();
          try {
            p && p(), Mt = f;
            const G = [
              H,
              // pass undefined as the old value when it's changed for the first time
              O === ys ? void 0 : I && O[0] === ys ? [] : O,
              g
            ];
            O = H, a ? a(t, 3, G) : (
              // @ts-expect-error
              t(...G)
            );
          } finally {
            Mt = J, ut();
          }
        }
      } else
        f.run();
  };
  return o && o(S), f = new Ei(h), f.scheduler = l ? () => l(S, !1) : S, g = (A) => hl(A, !1, f), p = f.onStop = () => {
    const A = Ms.get(f);
    if (A) {
      if (a)
        a(A, 4);
      else
        for (const H of A) H();
      Ms.delete(f);
    }
  }, t ? n ? S(!0) : O = f.run() : l ? l(S.bind(null, !0), !0) : f.run(), R.pause = f.pause.bind(f), R.resume = f.resume.bind(f), R.stop = R, R;
}
function at(e, t = 1 / 0, s) {
  if (t <= 0 || !ce(e) || e.__v_skip || (s = s || /* @__PURE__ */ new Map(), (s.get(e) || 0) >= t))
    return e;
  if (s.set(e, t), t--, /* @__PURE__ */ ge(e))
    at(e.value, t, s);
  else if (q(e))
    for (let n = 0; n < e.length; n++)
      at(e[n], t, s);
  else if (Rt(e) || mt(e))
    e.forEach((n) => {
      at(n, t, s);
    });
  else if (Ci(e)) {
    for (const n in e)
      at(e[n], t, s);
    for (const n of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, n) && at(e[n], t, s);
  }
  return e;
}
function ds(e, t, s, n) {
  try {
    return n ? e(...n) : e();
  } catch (i) {
    Us(i, t, s);
  }
}
function et(e, t, s, n) {
  if (ie(e)) {
    const i = ds(e, t, s, n);
    return i && ki(i) && i.catch((r) => {
      Us(r, t, s, void 0, !0);
    }), i;
  }
  if (q(e)) {
    const i = [];
    for (let r = 0; r < e.length; r++)
      i.push(et(e[r], t, s, n));
    return i;
  }
}
function Us(e, t, s, n = !0, i = !1) {
  const r = t ? t.vnode : null, { errorHandler: l, throwUnhandledErrorInProduction: o } = t && t.appContext.config || ae;
  if (t) {
    let a = t.parent;
    const u = t.proxy, f = `https://vuejs.org/error-reference/#runtime-${s}`;
    for (; a; ) {
      const h = a.ec;
      if (h && !a.isUnmounted && // Async failures may outlive stopped scopes whose unmount effects
      // are deferred or discarded by Suspense.
      (!i || a.scope.active)) {
        for (let p = 0; p < h.length; p++)
          if (h[p](e, u, f) === !1)
            return;
      }
      a = a.parent;
    }
    if (l) {
      ct(), ds(l, null, 10, [
        e,
        u,
        f
      ]), ut();
      return;
    }
  }
  gl(e, s, r, n, o);
}
function gl(e, t, s, n = !0, i = !1) {
  if (i)
    throw e;
  console.error(e);
}
const Se = [];
let je = -1;
const ze = [];
let gt = null, jt = 0;
const zi = /* @__PURE__ */ Promise.resolve();
let Ts = null;
function $t(e) {
  const t = Ts || zi;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function ml(e) {
  let t = je + 1, s = Se.length;
  for (; t < s; ) {
    const n = t + s >>> 1, i = Se[n], r = os(i);
    r < e || r === e && i.flags & 2 ? t = n + 1 : s = n;
  }
  return t;
}
function $n(e) {
  if (!(e.flags & 1)) {
    const t = os(e), s = Se[Se.length - 1];
    !s || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= os(s) ? Se.push(e) : Se.splice(ml(t), 0, e), e.flags |= 1, Gi();
  }
}
function Gi() {
  Ts || (Ts = zi.then(Xi));
}
function vl(e) {
  if (!q(e))
    gt && e.id === -1 ? gt.splice(jt + 1, 0, e) : e.flags & 1 || (ze.push(e), e.flags |= 1);
  else
    for (let t = 0; t < e.length; t++)
      ze.push(e[t]);
  Gi();
}
function Ji(e, t, s, n = je + 1) {
  for (; n < Se.length; n++) {
    const i = Se[n];
    if (i && i.flags & 2) {
      if (e && i.id !== e.uid || t !== void 0 && !(i.id >= t))
        continue;
      Se.splice(n, 1), n = e ? n - 1 : je, i.flags & 4 && (i.flags &= -2), i(), i.flags & 4 || (i.flags &= -2);
    }
  }
}
function Yi(e, t, s = 0) {
  if (ze.length) {
    let n = ze, i = 0;
    if (t) {
      n = [];
      for (let l = 0; l < ze.length; l++) {
        const o = ze[l];
        (o.i !== void 0 ? !o.i || o.i.uid < s : t.has(o)) ? ze[i++] = o : n.push(o);
      }
    }
    const r = [...new Set(n)].sort((l, o) => os(l) - os(o));
    if (ze.length = i, gt) {
      for (let l = 0; l < r.length; l++)
        gt.push(r[l]);
      return;
    }
    for (gt = r, jt = 0; jt < gt.length; jt++) {
      const l = gt[jt];
      l.flags & 4 && (l.flags &= -2), l.flags & 8 || l(), l.flags &= -2;
    }
    gt = null, jt = 0;
  }
}
let Qs = !1;
function yl(e, t) {
  if (Qs) {
    e();
    return;
  }
  const s = t === void 0 ? void 0 : new Set(ze);
  e(), Qs = !0;
  try {
    Ji(void 0, t), Yi(void 0, s, t);
  } finally {
    Qs = !1;
  }
}
const os = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Xi(e) {
  try {
    for (je = 0; je < Se.length; je++) {
      const t = Se[je];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), ds(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; je < Se.length; je++) {
      const t = Se[je];
      t && (t.flags &= -2);
    }
    je = -1, Se.length = 0, Yi(), Ts = null, (Se.length || ze.length) && Xi();
  }
}
let Pe = null, Qi = null;
function $s(e) {
  const t = Pe;
  return Pe = e, Qi = e && e.type.__scopeId || null, t;
}
function bl(e, t = Pe, s) {
  if (!t || e._n)
    return e;
  const n = (...i) => {
    n._d && Yn(-1);
    const r = $s(t), l = Ot.length;
    let o;
    try {
      o = e(...i);
    } finally {
      for (let a = Ot.length; a > l; a--) gr();
      $s(r), n._d && Yn(1);
    }
    return o;
  };
  return n._n = !0, n._c = !0, n._d = !0, n;
}
function wl(e, t) {
  if (Pe === null)
    return e;
  const s = Ws(Pe), n = e.dirs || (e.dirs = []);
  for (let i = 0; i < t.length; i++) {
    let [r, l, o, a = ae] = t[i];
    r && (ie(r) && (r = {
      mounted: r,
      updated: r
    }), r.deep && at(l), n.push({
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
function Ct(e, t, s, n) {
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
    l ? a.oldValue = l[o].value : n === "mounted" && a.oldValue !== void 0 && (a = Oe({}, a, { oldValue: void 0 }));
    let u = a.dir[n];
    u && (ct(), et(u, s, 8, [
      e.el,
      a,
      i,
      t
    ]), ut());
  }
}
function _l(e, t, s = !1) {
  const n = io();
  if (n || Dt) {
    let i = Dt ? Dt._context.provides : n ? n.parent == null || n.ce ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides : void 0;
    if (i && e in i)
      return i[e];
    if (arguments.length > 1)
      return s && ie(t) ? t.call(n && n.proxy) : t;
  }
}
const xl = /* @__PURE__ */ Symbol.for("v-scx"), kl = () => _l(xl);
function We(e, t, s) {
  return Sl(e, t, s);
}
function Sl(e, t, s = ae) {
  const { immediate: n, deep: i, flush: r, once: l } = s, o = Oe({}, s), a = t && n || !t && r !== "post";
  let u;
  if (us) {
    if (r === "sync") {
      const g = kl();
      u = g.__watcherHandles || (g.__watcherHandles = []);
    } else if (!a) {
      const g = () => {
      };
      return g.stop = At, g.resume = At, g.pause = At, g;
    }
  }
  const f = _t;
  o.call = (g, L, I) => et(g, f, L, I);
  let h = !1;
  r === "post" ? o.scheduler = (g) => {
    g.i = f, xe(g, f && f.suspense);
  } : r !== "sync" && (h = !0, o.scheduler = (g, L) => {
    L ? g() : $n(g);
  }), o.augmentJob = (g) => {
    t && (g.flags |= 4), h && (g.flags |= 2, f && (g.id = f.uid, g.i = f));
  };
  const p = pl(e, t, o);
  return us && (u ? u.push(p) : a && p()), p;
}
const Cl = /* @__PURE__ */ Symbol("_vte"), Ks = (e) => e.__isTeleport, Zs = /* @__PURE__ */ Symbol("_leaveCb");
function Il(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const s of e)
      if (s.type !== Ke) {
        t = s;
        break;
      }
  }
  return t;
}
function Zi(e) {
  if (!er(e))
    return Ks(e.type) && e.children ? Il(e.children) : e;
  if (e.component)
    return e.component.subTree;
  const { shapeFlag: t, children: s } = e;
  if (s) {
    if (t & 16)
      return s[0];
    if (t & 32 && ie(s.default))
      return s.default();
  }
}
function es(e, t) {
  if (e.shapeFlag & 6 && e.component) {
    e.transition = t;
    const s = e.component.subTree;
    es(
      Ks(s.type) && Zi(s) || s,
      t
    );
  } else if (e.shapeFlag & 128) {
    const s = e.suspense;
    if (s) {
      const n = s.isHydrating ? s.pendingBranch : s.activeBranch;
      n && es(n, t.clone(n));
    } else
      e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback);
  } else if (e.transition = t, e.type === ee && q(e.children)) {
    const s = nr(e.children, !1);
    s && es(s, t);
  }
}
function pn(e) {
  if (e.component)
    return pn(e.component.subTree);
  if (e.type === ee) {
    const t = q(e.children) && nr(e.children, !1);
    return t ? pn(t) : void 0;
  }
  if (e.type !== Ke)
    return e;
}
// @__NO_SIDE_EFFECTS__
function hs(e, t) {
  return ie(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    Oe({ name: e.name }, t, { setup: e })
  ) : e;
}
function Ml(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function Bn(e, t) {
  let s;
  return !!((s = Object.getOwnPropertyDescriptor(e, t)) && !s.configurable);
}
const As = /* @__PURE__ */ new WeakMap();
function ts(e, t, s, n, i = !1) {
  if (q(e)) {
    e.forEach(
      (I, P) => ts(
        I,
        t && (q(t) ? t[P] : t),
        s,
        n,
        i
      )
    );
    return;
  }
  if (ss(n) && !i) {
    n.shapeFlag & 512 && n.type.__asyncResolved && n.component.subTree.component && ts(e, t, s, n.component.subTree);
    return;
  }
  const r = n.shapeFlag & 4 ? Ws(n.component) : n.el, l = i ? null : r, { i: o, r: a } = e, u = t && t.r, f = o.refs === ae ? o.refs = {} : o.refs, h = o.setupState, p = /* @__PURE__ */ Z(h), g = h === ae ? _i : (I) => Bn(f, I) ? !1 : ne(p, I), L = (I, P) => !(P && Bn(f, P));
  if (u != null && u !== a) {
    if (Wn(t), de(u))
      f[u] = null, g(u) && (h[u] = null);
    else if (/* @__PURE__ */ ge(u)) {
      const I = t;
      L(u, I.k) && (u.value = null), I.k && (f[I.k] = null);
    }
  }
  if (ie(a))
    ds(a, o, 12, [l, f]);
  else {
    const I = de(a), P = /* @__PURE__ */ ge(a);
    if (I || P) {
      const R = () => {
        if (e.f) {
          const O = I ? g(a) ? h[a] : f[a] : L() || !e.k ? a.value : f[e.k];
          if (i)
            q(O) && xi(O, r);
          else if (q(O))
            O.includes(r) || O.push(r);
          else if (I)
            f[a] = [r], g(a) && (h[a] = f[a]);
          else {
            const S = [r];
            L(a, e.k) && (a.value = S), e.k && (f[e.k] = S);
          }
        } else I ? (f[a] = l, g(a) && (h[a] = l)) : P && (L(a, e.k) && (a.value = l), e.k && (f[e.k] = l));
      };
      if (l) {
        const O = () => {
          R(), As.delete(e);
        };
        O.id = -1, As.set(e, O), xe(O, s);
      } else
        Wn(e), R();
    }
  }
}
function Wn(e) {
  const t = As.get(e);
  t && (t.flags |= 8, As.delete(e));
}
js().requestIdleCallback;
js().cancelIdleCallback;
const ss = (e) => !!e.type.__asyncLoader, er = (e) => e.type.__isKeepAlive;
function Tl(e, t, s = _t, n = !1) {
  if (s) {
    const i = s[e] || (s[e] = []), r = t.__weh || (t.__weh = (...l) => {
      ct();
      const o = Pn(s), a = et(t, s, e, l);
      return o(), ut(), a;
    });
    return n ? i.unshift(r) : i.push(r), r;
  }
}
const tr = (e) => (t, s = _t) => {
  (!us || e === "sp") && Tl(e, (...n) => t(...n), s);
}, An = tr("m"), Hs = tr(
  "bum"
), $l = /* @__PURE__ */ Symbol.for("v-ndc");
function $e(e, t, s, n) {
  let i;
  const r = s, l = q(e);
  if (l || de(e)) {
    const o = l && /* @__PURE__ */ yt(e);
    let a = !1, u = !1;
    o && (a = !/* @__PURE__ */ Le(e), u = /* @__PURE__ */ Ze(e), e = Ds(e)), i = new Array(e.length);
    for (let f = 0, h = e.length; f < h; f++)
      i[f] = t(
        a ? u ? wt(Fe(e[f])) : Fe(e[f]) : e[f],
        f,
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
  else if (ce(e))
    if (e[Symbol.iterator])
      i = Array.from(
        e,
        (o, a) => t(o, a, void 0, r)
      );
    else {
      const o = Object.keys(e);
      i = new Array(o.length);
      for (let a = 0, u = o.length; a < u; a++) {
        const f = o[a];
        i[a] = t(e[f], f, a, r);
      }
    }
  else
    i = [];
  return i;
}
const gn = (e) => e ? br(e) ? Ws(e) : gn(e.parent) : null, ns = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Oe(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => gn(e.parent),
    $root: (e) => gn(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => e.type,
    $forceUpdate: (e) => e.f || (e.f = () => {
      $n(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = $t.bind(e.proxy)),
    $watch: (e) => At
  })
), en = (e, t) => e !== ae && !e.__isScriptSetup && ne(e, t), Al = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: s, setupState: n, data: i, props: r, accessCache: l, type: o, appContext: a } = e;
    if (t[0] !== "$") {
      const p = l[t];
      if (p !== void 0)
        switch (p) {
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
        if (en(n, t))
          return l[t] = 1, n[t];
        if (ne(r, t))
          return l[t] = 3, r[t];
        if (s !== ae && ne(s, t))
          return l[t] = 4, s[t];
        l[t] = 0;
      }
    }
    const u = ns[t];
    let f, h;
    if (u)
      return t === "$attrs" && be(e.attrs, "get", ""), u(e);
    if (
      // css module (injected by vue-loader)
      (f = o.__cssModules) && (f = f[t])
    )
      return f;
    if (s !== ae && ne(s, t))
      return l[t] = 4, s[t];
    if (
      // global properties
      h = a.config.globalProperties, ne(h, t)
    )
      return h[t];
  },
  set({ _: e }, t, s) {
    const { data: n, setupState: i, ctx: r } = e;
    return en(i, t) ? (i[t] = s, !0) : ne(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (r[t] = s, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: s, ctx: n, appContext: i, props: r, type: l }
  }, o) {
    let a;
    return !!(s[o] || en(t, o) || ne(r, o) || ne(n, o) || ne(ns, o) || ne(i.config.globalProperties, o) || (a = l.__cssModules) && a[o]);
  },
  defineProperty(e, t, s) {
    return s.get != null ? e._.accessCache[t] = 0 : ne(s, "value") && this.set(e, t, s.value, null), Reflect.defineProperty(e, t, s);
  }
};
function sr() {
  return {
    app: null,
    config: {
      isNativeTag: _i,
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
let El = 0;
function Ol(e, t) {
  return function(n, i = null) {
    ie(n) || (n = Oe({}, n)), i != null && !ce(i) && (i = null);
    const r = sr(), l = /* @__PURE__ */ new WeakSet(), o = [];
    let a = !1;
    const u = r.app = {
      _uid: El++,
      _component: n,
      _props: i,
      _container: null,
      _context: r,
      _instance: null,
      version: uo,
      get config() {
        return r.config;
      },
      set config(f) {
      },
      use(f, ...h) {
        return l.has(f) || (f && ie(f.install) ? (l.add(f), f.install(u, ...h)) : ie(f) && (l.add(f), f(u, ...h))), u;
      },
      mixin(f) {
        return u;
      },
      component(f, h) {
        return h ? (r.components[f] = h, u) : r.components[f];
      },
      directive(f, h) {
        return h ? (r.directives[f] = h, u) : r.directives[f];
      },
      mount(f, h, p) {
        if (!a) {
          const g = u._ceVNode || Ee(n, i);
          return g.appContext = r, p === !0 ? p = "svg" : p === !1 && (p = void 0), e(g, f, p), a = !0, u._container = f, f.__vue_app__ = u, Ws(g.component);
        }
      },
      onUnmount(f) {
        o.push(f);
      },
      unmount() {
        a && (et(
          o,
          u._instance,
          16
        ), e(null, u._container), delete u._container.__vue_app__);
      },
      provide(f, h) {
        return r.provides[f] = h, u;
      },
      runWithContext(f) {
        const h = Dt;
        Dt = u;
        try {
          return f();
        } finally {
          Dt = h;
        }
      }
    };
    return u;
  };
}
let Dt = null;
const Rl = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${De(t)}Modifiers`] || e[`${Pt(t)}Modifiers`];
function Pl(e, t, ...s) {
  if (e.isUnmounted) return;
  const n = e.vnode.props || ae;
  let i = s;
  const r = t.startsWith("update:"), l = r && Rl(n, t.slice(7));
  l && (l.trim && (i = s.map((f) => de(f) ? f.trim() : f)), l.number && (i = i.map(_n)));
  let o, a = n[o = zs(t)] || // also try camelCase event handler (#2249)
  n[o = zs(De(t))];
  !a && r && (a = n[o = zs(Pt(t))]), a && et(
    a,
    e,
    6,
    i
  );
  const u = n[o + "Once"];
  if (u) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[o])
      return;
    e.emitted[o] = !0, et(
      u,
      e,
      6,
      i
    );
  }
}
function Ll(e, t, s = !1) {
  const n = t.emitsCache, i = n.get(e);
  if (i !== void 0)
    return i;
  const r = e.emits;
  let l = {};
  return r ? (q(r) ? r.forEach((o) => l[o] = null) : Oe(l, r), ce(e) && n.set(e, l), l) : (ce(e) && n.set(e, null), null);
}
function Vs(e, t) {
  return !e || !Ls(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), ne(e, t[0].toLowerCase() + t.slice(1)) || ne(e, Pt(t)) || ne(e, t));
}
function qn(e) {
  const {
    type: t,
    vnode: s,
    proxy: n,
    withProxy: i,
    propsOptions: [r],
    slots: l,
    attrs: o,
    emit: a,
    render: u,
    renderCache: f,
    props: h,
    data: p,
    setupState: g,
    ctx: L,
    inheritAttrs: I
  } = e, P = $s(e);
  let R, O;
  try {
    if (s.shapeFlag & 4) {
      const A = i || n, H = A;
      R = Ge(
        u.call(
          H,
          A,
          f,
          h,
          g,
          p,
          L
        )
      ), O = o;
    } else {
      const A = t;
      R = Ge(
        A.length > 1 ? A(
          h,
          { attrs: o, slots: l, emit: a }
        ) : A(
          h,
          null
        )
      ), O = t.props ? o : Fl(o);
    }
  } catch (A) {
    Ot.length = 0, Us(A, e, 1), R = Ee(Ke);
  }
  let S = R;
  if (O && I !== !1) {
    const A = Object.keys(O), { shapeFlag: H } = S;
    A.length && H & 7 && (r && A.some(Fs) && (O = Nl(
      O,
      r
    )), S = Ut(S, O, !1, !0));
  }
  if (s.dirs && (S = Ut(S, null, !1, !0), S.dirs = S.dirs ? S.dirs.concat(s.dirs) : s.dirs), s.transition) {
    const A = Ks(S.type) && Zi(S) || S;
    es(A, s.transition);
  }
  return R = S, $s(P), R;
}
function nr(e, t = !0) {
  let s;
  for (let n = 0; n < e.length; n++) {
    const i = e[n];
    if (Rn(i)) {
      if (i.type !== Ke || i.children === "v-if") {
        if (s)
          return;
        s = i;
      }
    } else
      return;
  }
  return s;
}
const Fl = (e) => {
  let t;
  for (const s in e)
    (s === "class" || s === "style" || Ls(s)) && ((t || (t = {}))[s] = e[s]);
  return t;
}, Nl = (e, t) => {
  const s = {};
  for (const n in e)
    (!Fs(n) || !(n.slice(9) in t)) && (s[n] = e[n]);
  return s;
};
function jl(e, t, s) {
  const { props: n, children: i, component: r } = e, { props: l, children: o, patchFlag: a } = t, u = r.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (s && a >= 0) {
    if (a & 1024)
      return !0;
    if (a & 16)
      return n ? zn(n, l, u) : !!l;
    if (a & 8) {
      const f = t.dynamicProps;
      for (let h = 0; h < f.length; h++) {
        const p = f[h];
        if (ir(l, n, p) && !Vs(u, p))
          return !0;
      }
    }
  } else
    return (i || o) && (!o || !o.$stable) ? !0 : n === l ? !1 : n ? l ? zn(n, l, u) : !0 : !!l;
  return !1;
}
function zn(e, t, s) {
  const n = Object.keys(t);
  if (n.length !== Object.keys(e).length)
    return !0;
  for (let i = 0; i < n.length; i++) {
    const r = n[i];
    if (!ne(e, r) || ir(t, e, r) && !Vs(s, r))
      return !0;
  }
  return !1;
}
function ir(e, t, s) {
  const n = e[s], i = t[s];
  return s === "style" && ce(n) && ce(i) ? !bt(n, i) : n !== i;
}
function Dl({ vnode: e, parent: t, suspense: s }, n) {
  for (; t; ) {
    const i = t.subTree;
    if (i.suspense && i.suspense.activeBranch === e && (i.suspense.vnode.el = i.el = n, e = i), i === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
  s && s.activeBranch === e && (s.vnode.el = n);
}
const rr = {}, lr = () => Object.create(rr), or = (e) => Object.getPrototypeOf(e) === rr;
function Ul(e, t, s, n = !1) {
  const i = {}, r = lr();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), ar(e, t, i, r);
  for (const l in e.propsOptions[0])
    l in i || (i[l] = void 0);
  s ? e.props = n ? i : /* @__PURE__ */ ll(i) : e.type.props ? e.props = i : e.props = r, e.attrs = r;
}
function Kl(e, t, s, n) {
  const {
    props: i,
    attrs: r,
    vnode: { patchFlag: l }
  } = e, o = /* @__PURE__ */ Z(i), [a] = e.propsOptions;
  let u = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (n || l > 0) && !(l & 16)
  ) {
    if (l & 8) {
      const f = e.vnode.dynamicProps;
      for (let h = 0; h < f.length; h++) {
        let p = f[h];
        if (Vs(e.emitsOptions, p))
          continue;
        const g = t[p];
        if (a)
          if (ne(r, p))
            g !== r[p] && (r[p] = g, u = !0);
          else {
            const L = De(p);
            i[L] = mn(
              a,
              o,
              L,
              g,
              e,
              !1
            );
          }
        else
          g !== r[p] && (r[p] = g, u = !0);
      }
    }
  } else {
    ar(e, t, i, r) && (u = !0);
    let f;
    for (const h in o)
      (!t || // for camelCase
      !ne(t, h) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((f = Pt(h)) === h || !ne(t, f))) && (a ? s && // for camelCase
      (s[h] !== void 0 || // for kebab-case
      s[f] !== void 0) && (i[h] = mn(
        a,
        o,
        h,
        void 0,
        e,
        !0
      )) : delete i[h]);
    if (r !== o)
      for (const h in r)
        (!t || !ne(t, h)) && (delete r[h], u = !0);
  }
  u && ot(e.attrs, "set", "");
}
function ar(e, t, s, n) {
  const [i, r] = e.propsOptions;
  let l = !1, o;
  if (t)
    for (let a in t) {
      if (Xt(a))
        continue;
      const u = t[a];
      let f;
      i && ne(i, f = De(a)) ? !r || !r.includes(f) ? s[f] = u : (o || (o = {}))[f] = u : Vs(e.emitsOptions, a) || (!(a in n) || u !== n[a]) && (n[a] = u, l = !0);
    }
  if (r) {
    const a = /* @__PURE__ */ Z(s), u = o || ae;
    for (let f = 0; f < r.length; f++) {
      const h = r[f];
      s[h] = mn(
        i,
        a,
        h,
        u[h],
        e,
        !ne(u, h)
      );
    }
  }
  return l;
}
function mn(e, t, s, n, i, r) {
  const l = e[s];
  if (l != null) {
    const o = ne(l, "default");
    if (o && n === void 0) {
      const a = l.default;
      if (l.type !== Function && !l.skipFactory && ie(a)) {
        const { propsDefaults: u } = i;
        if (s in u)
          n = u[s];
        else {
          const f = Pn(i);
          n = u[s] = a.call(
            null,
            t
          ), f();
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
    ] && (n === "" || n === Pt(s)) && (n = !0));
  }
  return n;
}
function Hl(e, t, s = !1) {
  const n = t.propsCache, i = n.get(e);
  if (i)
    return i;
  const r = e.props, l = {}, o = [];
  if (!r)
    return ce(e) && n.set(e, Tt), Tt;
  if (q(r))
    for (let u = 0; u < r.length; u++) {
      const f = De(r[u]);
      Gn(f) && (l[f] = ae);
    }
  else if (r)
    for (const u in r) {
      const f = De(u);
      if (Gn(f)) {
        const h = r[u], p = l[f] = q(h) || ie(h) ? { type: h } : Oe({}, h), g = p.type;
        let L = !1, I = !0;
        if (q(g))
          for (let P = 0; P < g.length; ++P) {
            const R = g[P], O = ie(R) && R.name;
            if (O === "Boolean") {
              L = !0;
              break;
            } else O === "String" && (I = !1);
          }
        else
          L = ie(g) && g.name === "Boolean";
        p[
          0
          /* shouldCast */
        ] = L, p[
          1
          /* shouldCastTrue */
        ] = I, (L || ne(p, "default")) && o.push(f);
      }
    }
  const a = [l, o];
  return ce(e) && n.set(e, a), a;
}
function Gn(e) {
  return e[0] !== "$" && !Xt(e);
}
const En = (e) => e === "_" || e === "_ctx" || e === "$stable", On = (e) => q(e) ? e.map(Ge) : [Ge(e)], Vl = (e, t, s) => {
  if (t._n)
    return t;
  const n = bl((...i) => On(t(...i)), s);
  return n._c = !1, n;
}, cr = (e, t, s) => {
  const n = e._ctx;
  for (const i in e) {
    if (En(i)) continue;
    const r = e[i];
    if (ie(r))
      t[i] = Vl(i, r, n);
    else if (r != null) {
      const l = On(r);
      t[i] = () => l;
    }
  }
}, ur = (e, t) => {
  const s = On(t);
  e.slots.default = () => s;
}, fr = (e, t, s) => {
  for (const n in t)
    (s || !En(n)) && (e[n] = t[n]);
}, Bl = (e, t, s) => {
  const n = e.slots = lr();
  if (e.vnode.shapeFlag & 32) {
    const i = t._;
    i ? (fr(n, t, s), s && Mi(n, "_", i, !0)) : cr(t, n);
  } else t && ur(e, t);
}, Wl = (e, t, s) => {
  const { vnode: n, slots: i } = e;
  let r = !0, l = ae;
  if (n.shapeFlag & 32) {
    const o = t._;
    o ? s && o === 1 ? r = !1 : fr(i, t, s) : (r = !t.$stable, cr(t, i)), l = t;
  } else t && (ur(e, t), l = { default: 1 });
  if (r)
    for (const o in i)
      !En(o) && l[o] == null && delete i[o];
}, xe = Xl;
function ql(e) {
  return zl(e);
}
function zl(e, t) {
  const s = js();
  s.__VUE__ = !0;
  const {
    insert: n,
    remove: i,
    patchProp: r,
    createElement: l,
    createText: o,
    createComment: a,
    setText: u,
    setElementText: f,
    parentNode: h,
    nextSibling: p,
    setScopeId: g = At,
    insertStaticContent: L
  } = e, I = (c, d, m, k = null, y = null, w = null, $ = void 0, M = null, T = !!d.dynamicChildren) => {
    if (c === d)
      return;
    c && !zt(c, d) && (k = Me(c), we(c, y, w, !0), c = null), d.patchFlag === -2 && (T = !1, d.dynamicChildren = null), d.dynamicChildren && c && c.dynamicChildren && c.dynamicChildren.hasOnce && (d.dynamicChildren === Tt && (d.dynamicChildren = []), d.dynamicChildren.hasOnce = !0);
    const { type: b, ref: j, shapeFlag: E } = d;
    switch (b) {
      case Bs:
        P(c, d, m, k);
        break;
      case Ke:
        R(c, d, m, k);
        break;
      case sn:
        c == null && O(d, m, k, $);
        break;
      case ee:
        oe(
          c,
          d,
          m,
          k,
          y,
          w,
          $,
          M,
          T
        );
        break;
      default:
        E & 1 ? H(
          c,
          d,
          m,
          k,
          y,
          w,
          $,
          M,
          T
        ) : E & 6 ? ve(
          c,
          d,
          m,
          k,
          y,
          w,
          $,
          M,
          T
        ) : (E & 64 || E & 128) && b.process(
          c,
          d,
          m,
          k,
          y,
          w,
          $,
          M,
          T,
          dt
        );
    }
    j != null && y ? ts(j, c && c.ref, w, d || c, !d) : j == null && c && c.ref != null && ts(c.ref, null, w, c, !0);
  }, P = (c, d, m, k) => {
    if (c == null)
      n(
        d.el = o(d.children),
        m,
        k
      );
    else {
      const y = d.el = c.el;
      d.children !== c.children && u(y, d.children);
    }
  }, R = (c, d, m, k) => {
    c == null ? n(
      d.el = a(d.children || ""),
      m,
      k
    ) : d.el = c.el;
  }, O = (c, d, m, k) => {
    [c.el, c.anchor] = L(
      c.children,
      d,
      m,
      k,
      c.el,
      c.anchor
    );
  }, S = ({ el: c, anchor: d }, m, k) => {
    let y;
    for (; c && c !== d; )
      y = p(c), n(c, m, k), c = y;
    n(d, m, k);
  }, A = ({ el: c, anchor: d }) => {
    let m;
    for (; c && c !== d; )
      m = p(c), i(c), c = m;
    i(d);
  }, H = (c, d, m, k, y, w, $, M, T) => {
    if (d.type === "svg" ? $ = "svg" : d.type === "math" && ($ = "mathml"), c == null)
      J(
        d,
        m,
        k,
        y,
        w,
        $,
        M,
        T
      );
    else {
      const b = c.el && c.el._isVueCE ? c.el : null;
      try {
        b && b._beginPatch(), X(
          c,
          d,
          y,
          w,
          $,
          M,
          T
        );
      } finally {
        b && b._endPatch();
      }
    }
  }, J = (c, d, m, k, y, w, $, M) => {
    let T, b;
    const { props: j, shapeFlag: E, transition: U, dirs: V } = c;
    if (T = c.el = l(
      c.type,
      w,
      j && j.is,
      j
    ), E & 8 ? f(T, c.children) : E & 16 && K(
      c.children,
      T,
      null,
      k,
      y,
      tn(c, w),
      $,
      M
    ), V && Ct(c, null, k, "created"), G(T, c, c.scopeId, $, k), j) {
      for (const te in j)
        te !== "value" && !Xt(te) && r(T, te, null, j[te], w, k);
      "value" in j && r(T, "value", null, j.value, w), (b = j.onVnodeBeforeMount) && Be(b, k, c);
    }
    V && Ct(c, null, k, "beforeMount");
    const z = Gl(y, U);
    z ? U.beforeEnter(T) : U && !U.persisted && (T[Yl] = !0), n(T, d, m), ((b = j && j.onVnodeMounted) || z || V) && xe(() => {
      b && Be(b, k, c), z && U.enter(T), V && Ct(c, null, k, "mounted");
    }, y);
  }, G = (c, d, m, k, y) => {
    if (m && g(c, m), k)
      for (let w = 0; w < k.length; w++)
        g(c, k[w]);
    if (y) {
      let w = y.subTree;
      if (d === w || pr(w.type) && (w.ssContent === d || w.ssFallback === d)) {
        const $ = y.vnode;
        G(
          c,
          $,
          $.scopeId,
          $.slotScopeIds,
          y.parent
        );
      }
    }
  }, K = (c, d, m, k, y, w, $, M, T = 0) => {
    for (let b = T; b < c.length; b++) {
      const j = c[b] = M ? rt(c[b]) : Ge(c[b]);
      I(
        null,
        j,
        d,
        m,
        k,
        y,
        w,
        $,
        M
      );
    }
  }, X = (c, d, m, k, y, w, $) => {
    const M = d.el = c.el;
    let { patchFlag: T, dynamicChildren: b, dirs: j } = d;
    T |= c.patchFlag & 16;
    const E = c.props || ae, U = d.props || ae;
    let V;
    if (m && It(m, !1), (V = U.onVnodeBeforeUpdate) && Be(V, m, d, c), j && Ct(d, c, m, "beforeUpdate"), m && It(m, !0), // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    b && (!c.dynamicChildren || c.dynamicChildren.length !== b.length) && (T = 0, $ = !1, b = null), (E.innerHTML && U.innerHTML == null || E.textContent && U.textContent == null) && f(M, ""), b ? W(
      c.dynamicChildren,
      b,
      M,
      m,
      k,
      tn(d, y),
      w
    ) : $ || ye(
      c,
      d,
      M,
      null,
      m,
      k,
      tn(d, y),
      w,
      !1
    ), T > 0) {
      if (T & 16)
        B(M, E, U, m, y);
      else if (T & 2 && E.class !== U.class && r(M, "class", null, U.class, y), T & 4 && r(M, "style", E.style, U.style, y), T & 8) {
        const z = d.dynamicProps;
        for (let te = 0; te < z.length; te++) {
          const Q = z[te], ue = E[Q], he = U[Q];
          (he !== ue || Q === "value") && r(M, Q, ue, he, y, m);
        }
      }
      T & 1 && c.children !== d.children && f(M, d.children);
    } else !$ && b == null && B(M, E, U, m, y);
    ((V = U.onVnodeUpdated) || j) && xe(() => {
      V && Be(V, m, d, c), j && Ct(d, c, m, "updated");
    }, k);
  }, W = (c, d, m, k, y, w, $) => {
    for (let M = 0; M < d.length; M++) {
      const T = c[M], b = d[M], j = T.el || is(T), E = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        j && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (T.type === ee || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !zt(T, b) || // - In the case of a component, it could contain anything.
        T.shapeFlag & 198) ? h(j) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          m
        )
      );
      I(
        T,
        b,
        E,
        null,
        k,
        y,
        w,
        $,
        !0
      );
    }
  }, B = (c, d, m, k, y) => {
    if (d !== m) {
      if (d !== ae)
        for (const w in d)
          !Xt(w) && !(w in m) && r(
            c,
            w,
            d[w],
            null,
            y,
            k
          );
      for (const w in m) {
        if (Xt(w)) continue;
        const $ = m[w], M = d[w];
        $ !== M && w !== "value" && r(c, w, M, $, y, k);
      }
      "value" in m && r(c, "value", d.value, m.value, y);
    }
  }, oe = (c, d, m, k, y, w, $, M, T) => {
    const b = d.el = c ? c.el : o(""), j = d.anchor = c ? c.anchor : o("");
    let { patchFlag: E, dynamicChildren: U, slotScopeIds: V } = d;
    V && (M = M ? M.concat(V) : V), c == null ? (n(b, m, k), n(j, m, k), K(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      d.children || [],
      m,
      j,
      y,
      w,
      $,
      M,
      T
    )) : E > 0 && E & 64 && U && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    c.dynamicChildren && c.dynamicChildren.length === U.length ? (W(
      c.dynamicChildren,
      U,
      m,
      y,
      w,
      $,
      M
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (d.key != null || y && d === y.subTree) && dr(
      c,
      d,
      !0
      /* shallow */
    )) : ye(
      c,
      d,
      m,
      j,
      y,
      w,
      $,
      M,
      T
    );
  }, ve = (c, d, m, k, y, w, $, M, T) => {
    d.slotScopeIds = M, c == null ? d.shapeFlag & 512 ? y.ctx.activate(
      d,
      m,
      k,
      $,
      T
    ) : ft(
      d,
      m,
      k,
      y,
      w,
      $,
      T
    ) : xt(c, d, T);
  }, ft = (c, d, m, k, y, w, $) => {
    const M = c.component = no(
      c,
      k,
      y
    );
    if (er(c) && (M.ctx.renderer = dt), ro(M, !1, $), M.asyncDep) {
      if (y && y.registerDep(
        M,
        Ht,
        $,
        w
      ), !c.el) {
        const T = M.subTree = Ee(Ke);
        R(null, T, d, m), c.placeholder = T.el;
      }
    } else
      Ht(
        M,
        c,
        d,
        m,
        y,
        w,
        $
      );
  }, xt = (c, d, m) => {
    const k = d.component = c.component;
    if (jl(c, d, m))
      if (k.asyncDep && !k.asyncResolved) {
        d.el = c.el, d.placeholder = c.placeholder, He(k, d, m);
        return;
      } else
        k.next = d, k.update();
    else
      d.el = c.el, d.placeholder = c.placeholder, k.vnode = d;
  }, Ht = (c, d, m, k, y, w, $) => {
    const M = () => {
      if (c.isMounted) {
        let { next: E, bu: U, u: V, parent: z, vnode: te } = c;
        {
          const _e = hr(c);
          if (_e) {
            E && (E.el = te.el, He(c, E, $)), _e.asyncDep.then(() => {
              const _ = () => {
                c.job.flags & 8 || (y && y.pendingBranch ? xe(_, y) : b());
              };
              _.flags = 48, xe(_, y);
            });
            return;
          }
        }
        let Q = E, ue;
        It(c, !1), E ? (E.el = te.el, He(c, E, $)) : E = te, U && xs(U), (ue = E.props && E.props.onVnodeBeforeUpdate) && Be(ue, z, E, te), It(c, !0);
        const he = qn(c), Te = c.subTree;
        c.subTree = he, I(
          Te,
          he,
          // parent may have changed if it's in a teleport. a root that is a
          // pending async component only has its placeholder comment
          h(
            Te.el || is(Te)
          ),
          // anchor may have changed if it's in a fragment
          Me(Te),
          c,
          y,
          w
        ), E.el = he.el, Q === null && Dl(c, he.el), V && xe(V, y), (ue = E.props && E.props.onVnodeUpdated) && xe(
          () => Be(ue, z, E, te),
          y
        );
      } else {
        let E;
        const { el: U, props: V } = d, { bm: z, m: te, parent: Q, root: ue, type: he } = c, Te = ss(d);
        It(c, !1), z && xs(z), !Te && (E = V && V.onVnodeBeforeMount) && Be(E, Q, d), It(c, !0);
        {
          ue.ce && ue.ce._hasShadowRoot() && ue.ce._injectChildStyle(
            he,
            c.parent ? c.parent.type : void 0
          );
          const _e = c.subTree = qn(c);
          I(
            null,
            _e,
            m,
            k,
            c,
            y,
            w
          ), d.el = _e.el;
        }
        if (te && xe(te, y), !Te && (E = V && V.onVnodeMounted)) {
          const _e = d;
          xe(
            () => Be(E, Q, _e),
            y
          );
        }
        (d.shapeFlag & 256 || Q && ss(Q.vnode) && Q.vnode.shapeFlag & 256) && c.a && xe(c.a, y), c.isMounted = !0, d = m = k = null;
      }
    };
    c.scope.on();
    const T = c.effect = new Ei(M);
    c.scope.off();
    const b = c.update = T.run.bind(T), j = c.job = T.runIfDirty.bind(T);
    j.i = c, j.id = c.uid, T.scheduler = () => $n(j), It(c, !0), b();
  }, He = (c, d, m) => {
    d.component = c;
    const k = c.vnode.props;
    c.vnode = d, c.next = null, Kl(c, d.props, k, m), Wl(c, d.children, m), ct(), Ji(c), ut();
  }, ye = (c, d, m, k, y, w, $, M, T = !1) => {
    const b = c && c.children, j = c ? c.shapeFlag : 0, E = d.children, { patchFlag: U, shapeFlag: V } = d;
    if (U > 0) {
      if (U & 128) {
        Ne(
          b,
          E,
          m,
          k,
          y,
          w,
          $,
          M,
          T
        );
        return;
      } else if (U & 256) {
        Ce(
          b,
          E,
          m,
          k,
          y,
          w,
          $,
          M,
          T
        );
        return;
      }
    }
    V & 8 ? (j & 16 && Re(b, y, w), E !== b && f(m, E)) : j & 16 ? V & 16 ? Ne(
      b,
      E,
      m,
      k,
      y,
      w,
      $,
      M,
      T
    ) : Re(b, y, w, !0) : (j & 8 && f(m, ""), V & 16 && K(
      E,
      m,
      k,
      y,
      w,
      $,
      M,
      T
    ));
  }, Ce = (c, d, m, k, y, w, $, M, T) => {
    c = c || Tt, d = d || Tt;
    const b = c.length, j = d.length, E = Math.min(b, j);
    let U;
    for (U = 0; U < E; U++) {
      const V = d[U] = T ? rt(d[U]) : Ge(d[U]);
      I(
        c[U],
        V,
        m,
        null,
        y,
        w,
        $,
        M,
        T
      );
    }
    b > j ? Re(
      c,
      y,
      w,
      !0,
      !1,
      E
    ) : K(
      d,
      m,
      k,
      y,
      w,
      $,
      M,
      T,
      E
    );
  }, Ne = (c, d, m, k, y, w, $, M, T) => {
    let b = 0;
    const j = d.length;
    let E = c.length - 1, U = j - 1;
    for (; b <= E && b <= U; ) {
      const V = c[b], z = d[b] = T ? rt(d[b]) : Ge(d[b]);
      if (zt(V, z))
        I(
          V,
          z,
          m,
          null,
          y,
          w,
          $,
          M,
          T
        );
      else
        break;
      b++;
    }
    for (; b <= E && b <= U; ) {
      const V = c[E], z = d[U] = T ? rt(d[U]) : Ge(d[U]);
      if (zt(V, z))
        I(
          V,
          z,
          m,
          null,
          y,
          w,
          $,
          M,
          T
        );
      else
        break;
      E--, U--;
    }
    if (b > E) {
      if (b <= U) {
        const V = U + 1, z = V < j ? d[V].el : k;
        for (; b <= U; )
          I(
            null,
            d[b] = T ? rt(d[b]) : Ge(d[b]),
            m,
            z,
            y,
            w,
            $,
            M,
            T
          ), b++;
      }
    } else if (b > U)
      for (; b <= E; )
        we(c[b], y, w, !0), b++;
    else {
      const V = b, z = b, te = /* @__PURE__ */ new Map();
      for (b = z; b <= U; b++) {
        const C = d[b] = T ? rt(d[b]) : Ge(d[b]);
        C.key != null && te.set(C.key, b);
      }
      let Q, ue = 0;
      const he = U - z + 1;
      let Te = !1, _e = 0;
      const _ = new Array(he);
      for (b = 0; b < he; b++) _[b] = 0;
      for (b = V; b <= E; b++) {
        const C = c[b];
        if (ue >= he) {
          we(C, y, w, !0);
          continue;
        }
        let se;
        if (C.key != null)
          se = te.get(C.key);
        else
          for (Q = z; Q <= U; Q++)
            if (_[Q - z] === 0 && zt(C, d[Q])) {
              se = Q;
              break;
            }
        se === void 0 ? we(C, y, w, !0) : (_[se - z] = b + 1, se >= _e ? _e = se : Te = !0, I(
          C,
          d[se],
          m,
          null,
          y,
          w,
          $,
          M,
          T
        ), ue++);
      }
      const v = Te ? Jl(_) : Tt;
      for (Q = v.length - 1, b = he - 1; b >= 0; b--) {
        const C = z + b, se = d[C], ht = d[C + 1], pt = C + 1 < j ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          ht.el || is(ht)
        ) : k;
        _[b] === 0 ? I(
          null,
          se,
          m,
          pt,
          y,
          w,
          $,
          M,
          T
        ) : Te && (Q < 0 || b !== v[Q] ? Ve(se, m, pt, 2) : Q--);
      }
    }
  }, Ve = (c, d, m, k, y = null) => {
    const { el: w, type: $, transition: M, children: T, shapeFlag: b } = c;
    if (b & 6) {
      Ve(c.component.subTree, d, m, k);
      return;
    }
    if (b & 128) {
      c.suspense.move(d, m, k);
      return;
    }
    if (b & 64) {
      $.move(c, d, m, dt);
      return;
    }
    if ($ === ee) {
      n(w, d, m);
      for (let E = 0; E < T.length; E++)
        Ve(T[E], d, m, k);
      n(c.anchor, d, m);
      return;
    }
    if ($ === sn) {
      S(c, d, m);
      return;
    }
    if (k !== 2 && b & 1 && M)
      if (k === 0)
        M.persisted && !w[Zs] ? n(w, d, m) : (M.beforeEnter(w), n(w, d, m), xe(() => M.enter(w), y));
      else {
        const { leave: E, delayLeave: U, afterLeave: V } = M, z = () => {
          c.ctx.isUnmounted ? i(w) : n(w, d, m);
        }, te = () => {
          const Q = w._isLeaving || !!w[Zs];
          w._isLeaving && w[Zs](
            !0
            /* cancelled */
          ), M.persisted && !Q ? z() : E(w, () => {
            z(), V && V();
          });
        };
        U ? U(w, z, te) : te();
      }
    else
      n(w, d, m);
  }, we = (c, d, m, k = !1, y = !1) => {
    const {
      type: w,
      props: $,
      ref: M,
      children: T,
      dynamicChildren: b,
      shapeFlag: j,
      patchFlag: E,
      dirs: U,
      cacheIndex: V,
      memo: z
    } = c;
    if ((E === -2 || b && b.hasOnce) && (y = !1), M != null && (ct(), ts(M, null, m, c, !0), ut()), V != null && (!c.ctx || c.ctx === d) && (d.renderCache[V] = void 0), j & 256 && d.ctx.deactivate(c))
      return;
    const te = j & 1 && U, Q = !ss(c);
    let ue;
    if (Q && (ue = $ && $.onVnodeBeforeUnmount) && Be(ue, d, c), j & 6)
      qs(c.component, m, k);
    else {
      if (j & 128) {
        c.suspense.unmount(m, k);
        return;
      }
      te && Ct(c, null, d, "beforeUnmount"), j & 64 ? c.type.remove(
        c,
        d,
        m,
        dt,
        k
      ) : b && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !b.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (w !== ee || E > 0 && E & 64) ? Re(
        b,
        d,
        m,
        !1,
        !0
      ) : (w === ee && E & 384 || !y && j & 16) && Re(T, d, m), k && ps(c);
    }
    const he = z != null && V == null;
    (Q && (ue = $ && $.onVnodeUnmounted) || te || he) && xe(() => {
      ue && Be(ue, d, c), te && Ct(c, null, d, "unmounted"), he && (c.el = null);
    }, m);
  }, ps = (c) => {
    const { type: d, el: m, anchor: k, transition: y } = c, w = d === ee;
    if (w && !y) {
      gs(m, k);
      return;
    }
    if (d === sn) {
      A(c), y && !y.persisted && y.afterLeave && y.afterLeave();
      return;
    }
    const $ = w ? pn(c) : c, M = () => {
      w ? h(m) && gs(m, k) : i(m), y && !y.persisted && y.afterLeave && y.afterLeave();
    };
    if ($ && $.shapeFlag & 1 && y && !y.persisted) {
      const { leave: T, delayLeave: b } = y, j = $.el, E = () => T(j, M);
      b ? b(j, M, E) : E();
    } else
      M();
  }, gs = (c, d) => {
    let m;
    for (; c !== d; )
      m = p(c), i(c), c = m;
    i(d);
  }, qs = (c, d, m) => {
    const { bum: k, scope: y, job: w, subTree: $, um: M, m: T, a: b } = c;
    Jn(T), Jn(b), k && xs(k), y.stop(), w ? (w.flags |= 8, we($, c, d, m)) : $ && ($.transition = c.vnode.transition, we($, c, d, m)), M && xe(M, d);
    const j = () => {
      c.isUnmounted = !0;
    };
    j.flags = 16, xe(j, d);
  }, Re = (c, d, m, k = !1, y = !1, w = 0) => {
    for (let $ = w; $ < c.length; $++)
      we(c[$], d, m, k, y);
  }, Me = (c) => {
    if (c.shapeFlag & 6)
      return Me(c.component.subTree);
    if (c.shapeFlag & 128)
      return c.suspense.next();
    const d = p(c.anchor || c.el), m = d && d[Cl];
    return m ? p(m) : d;
  }, Lt = (c, d, m) => {
    const k = c && d._vnode ? void 0 : c && c.component ? c.component.uid : so();
    yl(() => {
      c == null ? d._vnode && we(d._vnode, null, null, !0) : I(
        d._vnode || null,
        c,
        d,
        null,
        null,
        null,
        m
      ), d._vnode = c;
    }, k);
  }, dt = {
    p: I,
    um: we,
    m: Ve,
    r: ps,
    mt: ft,
    mc: K,
    pc: ye,
    pbc: W,
    n: Me,
    o: e
  };
  return {
    render: Lt,
    hydrate: void 0,
    createApp: Ol(Lt)
  };
}
function tn({ type: e, props: t }, s) {
  return s === "svg" && e === "foreignObject" || s === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : s;
}
function It({ effect: e, job: t }, s) {
  s ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Gl(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function dr(e, t, s = !1) {
  const n = e.children, i = t.children;
  if (q(n) && q(i))
    for (let r = 0; r < n.length; r++) {
      const l = n[r];
      let o = i[r];
      o.shapeFlag & 1 && !o.dynamicChildren && ((o.patchFlag <= 0 || o.patchFlag === 32) && (o = i[r] = rt(i[r]), o.el = l.el), !s && o.patchFlag !== -2 && dr(l, o)), o.type === Bs && (o.patchFlag === -1 && (o = i[r] = rt(o)), o.el = l.el), o.type === Ke && !o.el && (o.el = l.el);
    }
}
function Jl(e) {
  const t = e.slice(), s = [0];
  let n, i, r, l, o;
  const a = e.length;
  for (n = 0; n < a; n++) {
    const u = e[n];
    if (u !== 0) {
      if (i = s[s.length - 1], e[i] < u) {
        t[n] = i, s.push(n);
        continue;
      }
      for (r = 0, l = s.length - 1; r < l; )
        o = r + l >> 1, e[s[o]] < u ? r = o + 1 : l = o;
      u < e[s[r]] && (r > 0 && (t[n] = s[r - 1]), s[r] = n);
    }
  }
  for (r = s.length, l = s[r - 1]; r-- > 0; )
    s[r] = l, l = t[l];
  return s;
}
function hr(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : hr(t);
}
function Jn(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function is(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  if (t)
    return is(t.subTree);
  const s = e.suspense;
  return s && s.activeBranch ? is(s.activeBranch) : null;
}
const pr = (e) => e.__isSuspense, Yl = /* @__PURE__ */ Symbol("_deferredEnter");
function Xl(e, t) {
  t && t.pendingBranch ? q(e) ? t.effects.push(...e) : t.effects.push(e) : vl(e);
}
const ee = /* @__PURE__ */ Symbol.for("v-fgt"), Bs = /* @__PURE__ */ Symbol.for("v-txt"), Ke = /* @__PURE__ */ Symbol.for("v-cmt"), sn = /* @__PURE__ */ Symbol.for("v-stc"), Ot = [];
let Ae = null;
function F(e = !1) {
  Ot.push(Ae = e ? null : []);
}
function gr() {
  Ot.pop(), Ae = Ot[Ot.length - 1] || null;
}
let as = 1;
function Yn(e, t = !1) {
  as += e, e < 0 && Ae && t && (Ae.hasOnce = !0);
}
function mr(e) {
  return e.dynamicChildren = as > 0 ? Ae || Tt : null, gr(), as > 0 && Ae && Ae.push(e), e;
}
function N(e, t, s, n, i, r) {
  return mr(
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
function ks(e, t, s, n, i) {
  return mr(
    Ee(
      e,
      t,
      s,
      n,
      i,
      !0
    )
  );
}
function Rn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function zt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const vr = ({ key: e }) => e ?? null, Ss = ({
  ref: e,
  ref_key: t,
  ref_for: s
}) => (typeof e == "number" && (e = "" + e), e != null ? de(e) || /* @__PURE__ */ ge(e) || ie(e) ? { i: Pe, r: e, k: t, f: !!s } : e : null);
function x(e, t = null, s = null, n = 0, i = null, r = e === ee ? 0 : 1, l = !1, o = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && vr(t),
    ref: t && Ss(t),
    scopeId: Qi,
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
    ctx: Pe
  };
  return o ? (Es(a, s), r & 128 && e.normalize(a)) : s && (a.shapeFlag |= de(s) ? 8 : 16), as > 0 && // avoid a block node from tracking itself
  !l && // has current parent block
  Ae && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || r & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && Ae.push(a), a;
}
const Ee = Ql;
function Ql(e, t = null, s = null, n = 0, i = null, r = !1) {
  if ((!e || e === $l) && (e = Ke), Rn(e)) {
    const o = Ut(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return s && Es(o, s), as > 0 && !r && Ae && (o.shapeFlag & 6 ? Ae[Ae.indexOf(e)] = o : Ae.push(o)), o.patchFlag = -2, o;
  }
  if (co(e) && (e = e.__vccOpts), t) {
    t = Zl(t);
    let { class: o, style: a } = t;
    o && !de(o) && (t.class = Ye(o)), ce(a) && (/* @__PURE__ */ Tn(a) && !q(a) && (a = Oe({}, a)), t.style = vt(a));
  }
  const l = de(e) ? 1 : pr(e) ? 128 : Ks(e) ? 64 : ce(e) ? 4 : ie(e) ? 2 : 0;
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
function Zl(e) {
  return e ? /* @__PURE__ */ Tn(e) ? Oe({}, e) : or(e) ? Oe({}, e[_r] || e) : e : null;
}
function Ut(e, t, s = !1, n = !1) {
  const { props: i, ref: r, patchFlag: l, children: o, transition: a } = e, u = t ? eo(i || {}, t) : i, f = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: u,
    key: u && vr(u),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      s && r ? q(r) ? r.concat(Ss(t)) : [r, Ss(t)] : Ss(t)
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
    patchFlag: t && e.type !== ee ? l === -1 ? 16 : l | 16 : l,
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
    ssContent: e.ssContent && Ut(e.ssContent),
    ssFallback: e.ssFallback && Ut(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce,
    cacheIndex: e.cacheIndex
  };
  return a && n && es(
    f,
    a.clone(f)
  ), f;
}
function Ie(e = " ", t = 0) {
  return Ee(Bs, null, e, t);
}
function re(e = "", t = !1) {
  return t ? (F(), ks(Ke, null, e)) : Ee(Ke, null, e);
}
function Ge(e) {
  return e == null || typeof e == "boolean" ? Ee(Ke) : q(e) ? Ee(
    ee,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : Rn(e) ? rt(e) : Ee(Bs, null, String(e));
}
function rt(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Ut(e);
}
function Es(e, t) {
  let s = 0;
  const { shapeFlag: n } = e;
  if (t == null)
    t = null;
  else if (q(t))
    s = 16;
  else if (typeof t == "object")
    if (n & 65) {
      const i = t.default;
      i && (i._c && (i._d = !1), Es(e, i()), i._c && (i._d = !0));
      return;
    } else {
      s = 32;
      const i = t._;
      !i && !or(t) ? t._ctx = Pe : i === 3 && Pe && (Pe.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else if (ie(t)) {
    if (n & 65) {
      Es(e, { default: t });
      return;
    }
    t = { default: t, _ctx: Pe }, s = 32;
  } else
    t = String(t), n & 64 ? (s = 16, t = [Ie(t)]) : s = 8;
  e.children = t, e.shapeFlag |= s;
}
function eo(...e) {
  const t = {};
  for (let s = 0; s < e.length; s++) {
    const n = e[s];
    for (const i in n)
      if (i === "class")
        t.class !== n.class && (t.class = Ye([t.class, n.class]));
      else if (i === "style")
        t.style = vt([t.style, n.style]);
      else if (Ls(i)) {
        const r = t[i], l = n[i];
        l && r !== l && !(q(r) && r.includes(l)) ? t[i] = r ? [].concat(r, l) : l : l == null && r == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !Fs(i) && (t[i] = l);
      } else i !== "" && (t[i] = n[i]);
  }
  return t;
}
function Be(e, t, s, n = null) {
  et(e, t, 7, [
    s,
    n
  ]);
}
const to = /* @__PURE__ */ sr();
let yr = 0;
function so() {
  return yr;
}
function no(e, t, s) {
  const n = e.type, i = (t ? t.appContext : e.appContext) || to, r = {
    uid: yr++,
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
    scope: new Hr(
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
    propsOptions: Hl(n, i),
    emitsOptions: Ll(n, i),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: ae,
    // inheritAttrs
    inheritAttrs: n.inheritAttrs,
    // state
    ctx: ae,
    data: ae,
    props: ae,
    attrs: ae,
    slots: ae,
    refs: ae,
    setupState: ae,
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
  return r.ctx = { _: r }, r.root = t ? t.root : r, r.emit = Pl.bind(null, r), e.ce && e.ce(r), r;
}
let _t = null;
const io = () => _t || Pe;
let Os, cs;
{
  const e = js(), t = (s, n) => {
    let i;
    return (i = e[s]) || (i = e[s] = []), i.push(n), (r) => {
      i.length > 1 ? i.forEach((l) => l(r)) : i[0](r);
    };
  };
  Os = t(
    "__VUE_INSTANCE_SETTERS__",
    (s) => _t = s
  ), cs = t(
    "__VUE_SSR_SETTERS__",
    (s) => us = s
  );
}
const Pn = (e) => {
  const t = _t;
  return Os(e), e.scope.on(), () => {
    e.scope.off(), Os(t);
  };
}, Xn = () => {
  _t && _t.scope.off(), Os(null);
};
function br(e) {
  return e.vnode.shapeFlag & 4;
}
let us = !1;
function ro(e, t = !1, s = !1) {
  t && cs(t);
  const { props: n, children: i } = e.vnode, r = br(e);
  Ul(e, n, r, t), Bl(e, i, s || t);
  const l = r ? lo(e, t) : void 0;
  return t && cs(!1), l;
}
function lo(e, t) {
  const s = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Al);
  const { setup: n } = s;
  if (n) {
    ct();
    const i = e.setupContext = n.length > 1 ? ao(e) : null, r = Pn(e), l = ds(
      n,
      e,
      0,
      [
        e.props,
        i
      ]
    ), o = ki(l);
    if (ut(), r(), (o || e.sp) && !ss(e) && Ml(e), o) {
      if (l.then(Xn, Xn), t)
        return l.then((a) => {
          cs(!0);
          try {
            Qn(e, a, t);
          } finally {
            cs(!1);
          }
        }).catch((a) => {
          Us(a, e, 0, void 0, !0), e.ssrRender = (u, f) => f("<!---->");
        });
      e.asyncDep = l;
    } else
      Qn(e, l);
  } else
    wr(e);
}
function Qn(e, t, s) {
  ie(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : ce(t) && (e.setupState = qi(t)), wr(e);
}
function wr(e, t, s) {
  const n = e.type;
  e.render || (e.render = n.render || At);
}
const _r = /* @__PURE__ */ Symbol(), oo = {
  get(e, t) {
    return be(e, "get", ""), t === _r ? e : e[t];
  }
};
function ao(e) {
  const t = (s) => {
    e.exposed = s || {};
  };
  return {
    attrs: new Proxy(e.attrs, oo),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Ws(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(qi(ol(e.exposed)), {
    get(t, s) {
      if (s in t)
        return t[s];
      if (s in ns)
        return ns[s](e);
    },
    has(t, s) {
      return s in t || s in ns;
    }
  })) : e.proxy;
}
function co(e) {
  return ie(e) && "__vccOpts" in e;
}
const fe = (e, t) => /* @__PURE__ */ dl(e, t, us), uo = "3.5.45";
let vn;
const Zn = typeof window < "u" && window.trustedTypes;
if (Zn)
  try {
    vn = /* @__PURE__ */ Zn.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const xr = vn ? (e) => vn.createHTML(e) : (e) => e, fo = "http://www.w3.org/2000/svg", ho = "http://www.w3.org/1998/Math/MathML", it = typeof document < "u" ? document : null, ei = it && /* @__PURE__ */ it.createElement("template"), po = {
  insert: (e, t, s) => {
    t.insertBefore(e, s || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, s, n) => {
    const i = t === "svg" ? it.createElementNS(fo, e) : t === "mathml" ? it.createElementNS(ho, e) : s ? it.createElement(e, { is: s }) : it.createElement(e);
    return e === "select" && n && n.multiple != null && i.setAttribute("multiple", n.multiple), i;
  },
  createText: (e) => it.createTextNode(e),
  createComment: (e) => it.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => it.querySelector(e),
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
      ei.innerHTML = xr(
        n === "svg" ? `<svg>${e}</svg>` : n === "mathml" ? `<math>${e}</math>` : e
      );
      const o = ei.content;
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
}, go = /* @__PURE__ */ Symbol("_vtc");
function mo(e, t, s) {
  const n = e[go];
  n && (t = (t ? [t, ...n] : [...n]).join(" ")), t == null ? e.removeAttribute("class") : s ? e.setAttribute("class", t) : e.className = t;
}
const ti = /* @__PURE__ */ Symbol("_vod"), vo = /* @__PURE__ */ Symbol("_vsh"), yo = /* @__PURE__ */ Symbol(""), bo = /(?:^|;)\s*display\s*:/;
function wo(e, t, s) {
  const n = e.style, i = de(s);
  let r = !1;
  if (s && !i) {
    if (t)
      if (de(t))
        for (const l of t.split(";")) {
          const o = l.slice(0, l.indexOf(":")).trim();
          s[o] == null && Jt(n, o, "");
        }
      else
        for (const l in t)
          s[l] == null && Jt(n, l, "");
    for (const l in s) {
      l === "display" && (r = !0);
      const o = s[l];
      o != null ? xo(
        e,
        l,
        !de(t) && t ? t[l] : void 0,
        o
      ) || Jt(n, l, o) : Jt(n, l, "");
    }
  } else if (i) {
    if (t !== s) {
      const l = n[yo];
      l && (s += ";" + l), n.cssText = s, r = bo.test(s);
    }
  } else t && e.removeAttribute("style");
  ti in e && ((!i || t !== s) && (e[ti] = r ? n.display : ""), e[vo] && (n.display = "none"));
}
const bs = /\s*!important$/;
function Jt(e, t, s) {
  if (q(s))
    s.forEach((n) => Jt(e, t, n));
  else if (s == null && (s = ""), t.startsWith("--"))
    bs.test(s) ? e.setProperty(t, s.replace(bs, ""), "important") : e.setProperty(t, s);
  else {
    const n = _o(e, t);
    bs.test(s) ? e.setProperty(
      Pt(n),
      s.replace(bs, ""),
      "important"
    ) : e[n] = s;
  }
}
const si = ["Webkit", "Moz", "ms"], nn = {};
function _o(e, t) {
  const s = nn[t];
  if (s)
    return s;
  let n = De(t);
  if (n !== "filter" && n in e)
    return nn[t] = n;
  n = Ii(n);
  for (let i = 0; i < si.length; i++) {
    const r = si[i] + n;
    if (r in e)
      return nn[t] = r;
  }
  return t;
}
function xo(e, t, s, n) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && de(n) && s === n;
}
const ni = "http://www.w3.org/1999/xlink";
function ii(e, t, s, n, i, r = jr(t)) {
  n && t.startsWith("xlink:") ? s == null ? e.removeAttributeNS(ni, t.slice(6, t.length)) : e.setAttributeNS(ni, t, s) : s == null || r && !Ti(s) ? e.removeAttribute(t) : e.setAttribute(
    t,
    r ? "" : Qe(s) ? String(s) : s
  );
}
function ri(e, t, s, n, i) {
  if (t === "innerHTML" || t === "textContent") {
    s != null && (e[t] = t === "innerHTML" ? xr(s) : s);
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
    o === "boolean" ? s = Ti(s) : s == null && o === "string" ? (s = "", l = !0) : o === "number" && (s = 0, l = !0);
  }
  try {
    e[t] = s;
  } catch {
  }
  l && e.removeAttribute(i || t);
}
function kr(e, t, s, n) {
  e.addEventListener(t, s, n);
}
function ko(e, t, s, n) {
  e.removeEventListener(t, s, n);
}
const li = /* @__PURE__ */ Symbol("_vei");
function So(e, t, s, n, i = null) {
  const r = e[li] || (e[li] = {}), l = r[t];
  if (n && l)
    l.value = n;
  else {
    const [o, a] = Mo(t);
    if (n) {
      const u = r[t] = Ao(
        n,
        i
      );
      kr(e, o, u, a);
    } else l && (ko(e, o, l, a), r[t] = void 0);
  }
}
const Co = /(Once|Passive|Capture)$/, Io = /^on:?(?:Once|Passive|Capture)$/;
function Mo(e) {
  let t, s;
  for (; (s = e.match(Co)) && !Io.test(e); )
    t || (t = {}), e = e.slice(0, e.length - s[1].length), t[s[1].toLowerCase()] = !0;
  return [e[2] === ":" ? e.slice(3) : Pt(e.slice(2)), t];
}
let rn = 0;
const To = /* @__PURE__ */ Promise.resolve(), $o = () => rn || (To.then(() => rn = 0), rn = Date.now());
function Ao(e, t) {
  const s = (n) => {
    if (!n._vts)
      n._vts = Date.now();
    else if (n._vts <= s.attached)
      return;
    const i = s.value;
    if (q(i)) {
      const r = n.stopImmediatePropagation;
      n.stopImmediatePropagation = () => {
        r.call(n), n._stopped = !0;
      };
      const l = i.slice(), o = [n];
      for (let a = 0; a < l.length && !n._stopped; a++) {
        const u = l[a];
        u && et(
          u,
          t,
          5,
          o
        );
      }
    } else
      et(
        i,
        t,
        5,
        [n]
      );
  };
  return s.value = e, s.attached = $o(), s;
}
const oi = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Eo = (e, t, s, n, i, r) => {
  const l = i === "svg";
  t === "class" ? mo(e, n, l) : t === "style" ? wo(e, s, n) : Ls(t) ? Fs(t) || So(e, t, s, n, r) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Oo(e, t, n, l)) ? (ri(e, t, n), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && ii(e, t, n, l, r, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (Ro(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !de(n))) ? ri(e, De(t), n, r, t) : (t === "true-value" ? e._trueValue = n : t === "false-value" && (e._falseValue = n), ii(e, t, n, l));
};
function Oo(e, t, s, n) {
  if (n)
    return !!(t === "innerHTML" || t === "textContent" || t in e && oi(t) && ie(s));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const i = e.tagName;
    if (i === "IMG" || i === "VIDEO" || i === "CANVAS" || i === "SOURCE")
      return !1;
  }
  return oi(t) && de(s) ? !1 : t in e;
}
function Ro(e, t) {
  const s = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!s)
    return !1;
  const n = De(t);
  return Array.isArray(s) ? s.some((i) => De(i) === n) : Object.keys(s).some((i) => De(i) === n);
}
const ai = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return q(t) ? (s) => xs(t, s) : t;
}, ln = /* @__PURE__ */ Symbol("_assign"), Po = {
  // <select multiple> value need to be deep traversed
  deep: !0,
  created(e, { value: t, modifiers: { number: s } }, n) {
    e._modelValue = t, kr(e, "change", () => {
      const i = Array.prototype.filter.call(e.options, (a) => a.selected).map(
        (a) => s ? _n(Rs(a)) : Rs(a)
      ), r = e.multiple, l = r ? Rt(e._modelValue) ? new Set(i) : i : i[0], o = e._pendingValue = [
        r,
        r ? q(l) ? i.slice() : i : l
      ];
      try {
        e[ln](l);
      } finally {
        $t(() => {
          e._pendingValue === o && (e._pendingValue = void 0);
        });
      }
    }), e[ln] = ai(n);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(e, { value: t, modifiers: { number: s } }) {
    ci(e, t, s);
  },
  beforeUpdate(e, { value: t }, s) {
    e._modelValue = t, e[ln] = ai(s);
  },
  updated(e, { value: t, modifiers: { number: s } }) {
    const n = e._pendingValue;
    e._pendingValue = void 0, (!n || n[0] !== e.multiple || !Lo(t, n[1], n[0])) && ci(e, t, s);
  }
};
function Lo(e, t, s) {
  if (!s || q(e)) return bt(e, t);
  if (Rt(e)) {
    if (e.size !== t.length) return !1;
    for (const n of t)
      if (!e.has(n)) return !1;
    return !0;
  }
  return !1;
}
function ci(e, t, s = !1) {
  const n = e.multiple, i = q(t);
  if (!(n && !i && !Rt(t))) {
    for (let r = 0, l = e.options.length; r < l; r++) {
      const o = e.options[r], a = Rs(o);
      if (n)
        if (i) {
          const u = typeof a;
          u === "string" || u === "number" ? o.selected = t.some((f) => String(f) === String(a)) : o.selected = Kr(t, a) > -1;
        } else
          o.selected = t.has(a) || s && typeof a == "string" && t.has(_n(a));
      else if (bt(Rs(o), t)) {
        e.selectedIndex !== r && (e.selectedIndex = r);
        return;
      }
    }
    !n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
  }
}
function Rs(e) {
  return "_value" in e ? e._value : e.value;
}
const Fo = ["ctrl", "shift", "alt", "meta"], No = {
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
  exact: (e, t) => Fo.some((s) => e[`${s}Key`] && !t.includes(s))
}, Sr = (e, t) => {
  if (!e) return e;
  const s = e._withMods || (e._withMods = {}), n = t.join(".");
  return s[n] || (s[n] = ((i, ...r) => {
    for (let l = 0; l < t.length; l++) {
      const o = No[t[l]];
      if (o && o(i, t)) return;
    }
    return e(i, ...r);
  }));
}, jo = /* @__PURE__ */ Oe({ patchProp: Eo }, po);
let ui;
function Do() {
  return ui || (ui = ql(jo));
}
const Uo = ((...e) => {
  const t = Do().createApp(...e), { mount: s } = t;
  return t.mount = (n) => {
    const i = Ho(n);
    if (!i) return;
    const r = t._component;
    !ie(r) && !r.render && !r.template && (r.template = i.innerHTML), i.nodeType === 1 && (i.textContent = "");
    const l = s(i, !1, Ko(i));
    return i instanceof Element && (i.removeAttribute("v-cloak"), i.setAttribute("data-v-app", "")), l;
  }, t;
});
function Ko(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Ho(e) {
  return de(e) ? document.querySelector(e) : e;
}
const Ps = () => ({ scale: 1, x: 0, y: 0 });
function Vo() {
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
    transforms: { left: Ps(), right: Ps() }
  };
}
function fi(e, t, s = !1) {
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
function Cs(e) {
  return e.images.filter(
    (t) => t.id === e.leftId || e.scope === "folder" || (e.scope === "checked" ? e.checked : e.promptIds).has(t.id)
  );
}
function on(e, t) {
  const s = e.mode === "single" ? e.images : Cs(e), n = e.mode === "single" ? "currentId" : "rightId", r = s.findIndex((l) => l.id === e[n]) + t;
  r >= 0 && r < s.length && (e[n] = s[r].id);
}
function Bo(e) {
  e.open = !1, e.checked.clear(), e.pinned.clear(), e.unavailable.clear(), e.currentId = null, e.leftId = null, e.rightId = null, e.manualMatches = {}, e.panel = !1, e.mode = "grid", e.scope = "folder", e.promptIds.clear(), e.transforms = { left: Ps(), right: Ps() }, e.records.clear(), e.images = [];
}
function Wo(e, t) {
  e.linked = t, t && (e.transforms.right = { ...e.transforms.left });
}
function Gt(e, t, s) {
  e.transforms[t] = { ...s }, e.linked && (e.transforms[t === "left" ? "right" : "left"] = { ...s });
}
function qo(e, t, s, n, i) {
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
function Cr(e, t, s, n, i, r) {
  const l = Math.max(1, Math.floor(n / i)), o = Math.floor(s / i) * l, a = e[o]?.id, u = t.findIndex((f) => f.id === a);
  return u < 0 ? s : Math.floor(u / Math.max(1, Math.floor(n / r))) * r + Math.min(s % i, r - 1);
}
function zo(e, t, s, n) {
  return s < t ? s : s + n > t + e ? Math.max(0, s + n - e) : t;
}
class Go {
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
        if (i === null && this.session.images.length > 0 && o.version === this.version && o.next_cursor === this.firstCursor && o.images.every((a, u) => this.session.images[u]?.id === a.id && this.session.images[u]?.revision === a.revision)) {
          this.error = "";
          return;
        }
        i === null && (l = o.next_cursor), n.push(...o.images), i = o.next_cursor, r = o.version;
      } while (i && n.length < s);
      fi(this.session, n, i === null), this.cursor = i, this.version = r, this.firstCursor = l, this.error = "";
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
      fi(this.session, [
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
const Ir = ["prompt", "workflow"], di = 500, Jo = 5e3, Yo = 1e3, Xo = /* @__PURE__ */ new Set(["seed", "noise_seed", "random_seed"]), Qo = /* @__PURE__ */ new Set(["ckpt_name", "checkpoint_name", "model_name", "unet_name", "diffusion_model_name"]), hi = {
  CLIPTextEncode: ["text"],
  CLIPTextEncodeSDXL: ["text_g", "text_l"],
  CLIPTextEncodeSDXLRefiner: ["text"]
};
function pe(e) {
  return e !== null && typeof e == "object" && !Array.isArray(e);
}
function lt(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function Yt(e) {
  return lt(hi, e) ? hi[e] : void 0;
}
function Zo(e) {
  return typeof e == "string" ? e.trim().length > 0 : typeof e == "number" && Number.isSafeInteger(e);
}
function yn(e) {
  if (!pe(e) || Object.keys(e).length !== 1 || typeof e.__shiba_number__ != "string" || !/^-?(?:0|[1-9]\d*)$/.test(e.__shiba_number__)) return;
  const t = e.__shiba_number__, s = BigInt(t);
  return s > BigInt(Number.MAX_SAFE_INTEGER) || s < BigInt(Number.MIN_SAFE_INTEGER) ? t : void 0;
}
function ea(e) {
  const t = [e];
  for (; t.length; ) {
    const s = t.pop();
    if (typeof s == "number" && (!Number.isFinite(s) || Number.isInteger(s) && !Number.isSafeInteger(s))) return !0;
    if (Array.isArray(s)) for (const n of s) t.push(n);
    else if (pe(s)) for (const n of Object.values(s)) t.push(n);
  }
  return !1;
}
function ws(e, t, s, n = !1) {
  const i = Yt(e)?.includes(t) === !0 && typeof s == "string", r = n ? "reference" : i ? "prompt" : Qo.has(t) && typeof s == "string" ? "model" : t === "lora_name" && typeof s == "string" ? "lora-name" : /lora/i.test(e) && ["strength_model", "strength_clip", "strength", "lora_strength"].includes(t) ? "lora-strength" : "value";
  return { key: t, label: t, value: s, kind: r, promptText: i };
}
function Kt(e, t) {
  if (Object.is(e, t)) return !0;
  if (Array.isArray(e) && Array.isArray(t))
    return e.length === t.length && e.every((s, n) => Kt(s, t[n]));
  if (pe(e) && pe(t)) {
    const s = Object.keys(e);
    return s.length === Object.keys(t).length && s.every((n) => lt(t, n) && Kt(e[n], t[n]));
  }
  return !1;
}
function pi(e, t, s) {
  if (t == null) return { state: "missing", nodes: [] };
  if (!pe(t) || e === "workflow" && !Array.isArray(t.nodes))
    return s.push(`${e}: 保存形式を解析できません。`), { state: "invalid", nodes: [] };
  const n = e === "prompt" ? Object.entries(t) : t.nodes.map((a, u) => [pe(a) && (typeof a.id == "string" || typeof a.id == "number") ? String(a.id) : `不明[${u}]`, a]), i = [];
  let r = n.length > di;
  r && s.push(`${e}: ノード数が表示上限を超えています。一部のみ比較します。元 JSON は保持しています。`);
  let l = 0;
  const o = /* @__PURE__ */ new Set();
  for (const [a, u] of n.slice(0, di)) {
    const f = pe(u) ? u[e === "prompt" ? "class_type" : "type"] : void 0;
    if (!pe(u) || typeof f != "string" || !f || o.has(a) || e === "workflow" && !Zo(u.id)) {
      s.push(`${e}: ノード ${a} の形式が不正、または ID が重複しています。`), r = !0;
      continue;
    }
    o.add(a);
    const h = e === "prompt" && pe(u._meta) && typeof u._meta.title == "string" ? u._meta.title : typeof u.title == "string" ? u.title : "", p = [];
    let g = !0;
    if (e === "prompt")
      if (!pe(u.inputs)) g = !1;
      else
        for (const [P, R] of Object.entries(u.inputs)) {
          const O = Array.isArray(R) && R.length === 2 && typeof R[0] == "string" && Number.isInteger(R[1]) && R[1] >= 0 && lt(t, R[0]);
          p.push(ws(f, P, R, O));
        }
    else {
      if (Array.isArray(u.widgets_values))
        u.widgets_values.forEach((P, R) => p.push({ key: `widgets_values[${R}]`, label: `保存値[${R}]（名称不明）`, value: P, kind: "value", promptText: !1 }));
      else if (pe(u.widgets_values))
        for (const [P, R] of Object.entries(u.widgets_values)) {
          const O = ws(f, P, R);
          p.push({ ...O, key: `widgets_values.${P}` });
        }
      else u.widgets_values != null && (g = !1);
      if (pe(u.inputs))
        for (const [P, R] of Object.entries(u.inputs)) p.push(ws(f, P, R));
      else if (Array.isArray(u.inputs))
        for (const [P, R] of u.inputs.entries()) {
          if (!pe(R)) {
            g = !1;
            continue;
          }
          const O = typeof R.name == "string" ? R.name : `入力[${P}]（名称不明）`;
          if (lt(R, "value") && p.push(ws(f, O, R.value)), R.link != null) {
            const S = Array.isArray(t.links) ? t.links.find((H) => Array.isArray(H) ? H[0] === R.link : pe(H) && H.id === R.link) : void 0, A = Array.isArray(S) ? [String(S[1]), S[2]] : pe(S) && lt(S, "origin_id") ? [String(S.origin_id), S.origin_slot] : { link_id: R.link };
            S || (g = !1), p.push({ key: `inputs.${O}`, label: O, value: A, kind: "reference", promptText: !1 });
          }
        }
      else u.inputs != null && (g = !1);
      lt(u, "mode") && p.push({ key: "mode", label: "保存された実行モード", value: u.mode, kind: "value", promptText: !1 }), !lt(u, "widgets_values") && !lt(u, "inputs") && (g = !1);
    }
    const L = p.filter((P) => !Xo.has(P.key.replace(/^(?:widgets_values|inputs)\./, ""))), I = L.slice(0, Math.max(0, Jo - l));
    l += I.length, I.length < L.length && (g = !1, s.push(`${e}: 保存項目数が表示上限を超えています。元 JSON は保持しています。`)), I.some((P) => ea(P.value)) && (g = !1, s.push(`${e}: ノード ${a} の数値がブラウザーの正確な整数精度を超えています。値の一致や正確なコピーを保証できません。`)), g || (r = !0, s.push(`${e}: ノード ${a} (${f}) の一部情報を正確に確認できません。`)), i.push({ key: `${e}:${a}`, id: a, type: f, title: h, source: e, fields: I, complete: g });
  }
  return i.length === 0 ? (s.push(`${e}: 比較できる保存ノードがありません。`), { state: n.length ? "invalid" : "partial", nodes: i }) : { state: r ? "partial" : "ok", nodes: i };
}
function gi(e) {
  const t = Array.isArray(e.warnings) ? e.warnings.filter((o) => typeof o == "string") : [], s = pi("prompt", e.prompt, t), n = pi("workflow", e.workflow, t), i = [...s.nodes, ...n.nodes];
  for (const o of s.nodes) {
    const a = n.nodes.find((u) => u.id === o.id && u.type === o.type);
    if (a)
      for (const u of o.fields) {
        const f = a.fields.find((h) => h.key === u.key || h.key === `widgets_values.${u.key}`);
        f && !Kt(u.value, f.value) && t.push(`ノード ${o.id} / ${u.label}: prompt と workflow の保存値が異なります。情報源を分けて表示します。`);
      }
  }
  const r = [s.state, n.state];
  let l = r.every((o) => o === "missing") ? "missing" : i.length === 0 && r.includes("invalid") ? "invalid" : r.includes("invalid") || r.includes("partial") ? "partial" : "ok";
  return ["invalid", "unsupported"].includes(e.status) ? l = i.length ? "partial" : "invalid" : e.status === "partial" && (l = "partial"), l === "missing" && t.push("設定情報なし。保存された生成条件の一致は確認できません。"), l === "invalid" && t.push("保存データを解析できません。画像の比較は継続できます。"), { status: l, nodes: i, warnings: [...new Set(t)], raw: { prompt: e.prompt, workflow: e.workflow }, rawText: { prompt: typeof e.raw_prompt == "string" ? e.raw_prompt : null, workflow: typeof e.raw_workflow == "string" ? e.raw_workflow : null }, sources: { prompt: s.state, workflow: n.state } };
}
function mi(e) {
  return [...new Set(e.nodes.flatMap((t) => t.fields.filter((s) => s.kind === "model" && typeof s.value == "string").map((s) => s.value)))];
}
function Mr(e, t, s, n) {
  const i = [], r = /* @__PURE__ */ new Set(), l = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Set(), a = new Map(t.map((h) => [h.key, h])), u = Object.values(s).filter((h) => h !== null);
  for (const h of Object.keys(s))
    e.some((p) => p.key === h) || (o.add(h), n.push(`${h}: 手動対応の左ノードが現在の画像にありません。対応を選び直してください。`));
  for (const h of e) {
    if (!lt(s, h.key)) continue;
    const p = s[h.key];
    if (p === null) {
      o.add(h.key);
      continue;
    }
    const g = a.get(p);
    if (!g || g.source !== h.source || u.filter((L) => L === p).length > 1) {
      o.add(h.key), n.push(`${h.key}: 手動対応が不正、または右ノードが重複しています。対応を選び直してください。`);
      continue;
    }
    i.push({ leftKey: h.key, rightKey: g.key, reason: "manual" }), r.add(h.key), l.add(g.key);
  }
  function f(h, p, g) {
    i.push({ leftKey: h.key, rightKey: p.key, reason: g }), r.add(h.key), l.add(p.key);
  }
  for (const h of Ir) {
    const p = e.filter((I) => I.source === h), g = t.filter((I) => I.source === h);
    if (p.length === g.length && p.every((I) => g.some((P) => P.id === I.id && P.type === I.type)))
      for (const I of p) {
        const P = g.find((R) => R.id === I.id && R.type === I.type);
        P && !r.has(I.key) && !o.has(I.key) && !l.has(P.key) && f(I, P, "id-type");
      }
    for (const I of p) {
      if (r.has(I.key) || o.has(I.key)) continue;
      const P = g.filter((O) => O.type === I.type && !l.has(O.key)), R = p.filter((O) => O.type === I.type && !r.has(O.key));
      if (P.length === 1 && R.length === 1) f(I, P[0], "type");
      else if (I.title) {
        const O = P.filter((S) => S.title === I.title);
        O.length === 1 && R.filter((S) => S.title === I.title).length === 1 && f(I, O[0], "type-title");
      }
    }
  }
  return { matches: i, blocked: o };
}
function ta(e, t, s = {}) {
  const n = [...e.warnings.map((S) => `左: ${S}`), ...t.warnings.map((S) => `右: ${S}`)], i = [], r = s.manualMatches ?? {};
  let l = e.status !== "ok" || t.status !== "ok", o = 0, a = !1;
  for (const S of Ir)
    e.sources[S] !== t.sources[S] && (l = !0, n.push(`${S}: 左右で保存情報の範囲が異なります。欠落を追加・削除と断定しません。`));
  const { matches: u, blocked: f } = Mr(e.nodes, t.nodes, r, n);
  f.size && (l = !0), u.some((S) => S.reason === "id-type") && n.push("ID・型による自動対応は保存グラフに基づく候補です。別 workflow の同一性や、モデルファイル・コード版の一致を保証しません。");
  const h = new Map(e.nodes.map((S) => [S.key, S])), p = new Map(t.nodes.map((S) => [S.key, S])), g = new Set(u.map((S) => S.leftKey)), L = new Set(u.map((S) => S.rightKey));
  function I(S, A, H, J, G, K, X) {
    if (i.length >= Yo) {
      l = !0, a || n.push("差分数が表示上限を超えています。一部のみ表示します。元 JSON から全保存値を確認できます。"), a = !0;
      return;
    }
    i.push({ id: `${S?.key ?? ""}|${A?.key ?? ""}|${H}|${X}`, kind: X, source: (S ?? A).source, ...S ? { leftNode: S } : {}, ...A ? { rightNode: A } : {}, path: H, label: J, ...S ? { left: G } : {}, ...A ? { right: K } : {} });
  }
  function P(S, A, H, J, G, K, X, W = 0) {
    if (!Kt(G, K))
      if (yn(G) !== void 0 || yn(K) !== void 0) I(S, A, H, J, G, K, X);
      else if (X !== "connection" && W < 64 && Array.isArray(G) && Array.isArray(K))
        for (let B = 0; B < Math.max(G.length, K.length); B++) P(S, A, `${H}[${B}]`, `${J}[${B}]`, G[B], K[B], X, W + 1);
      else if (X !== "connection" && W < 64 && pe(G) && pe(K))
        for (const B of /* @__PURE__ */ new Set([...Object.keys(G), ...Object.keys(K)])) P(S, A, `${H}.${B}`, `${J}.${B}`, G[B], K[B], X, W + 1);
      else I(S, A, H, J, G, K, X);
  }
  for (const S of u) {
    const A = h.get(S.leftKey), H = p.get(S.rightKey);
    A.type !== H.type && I(A, H, "class_type", "ノード型", A.type, H.type, "changed");
    const J = new Map(A.fields.map((K) => [K.key, K])), G = new Map(H.fields.map((K) => [K.key, K]));
    for (const K of /* @__PURE__ */ new Set([...J.keys(), ...G.keys()])) {
      const X = J.get(K), W = G.get(K);
      if (X?.promptText && W?.promptText) {
        o++;
        continue;
      }
      if (!X || !W) {
        l = !0, n.push(`${A.source}: ${A.id} ↔ ${H.id} / ${K}: 片方に保存値がありません。設定の削除とは断定できません。`);
        continue;
      }
      P(A, H, K, X.label, X.value, W.value, X.kind === "reference" || W.kind === "reference" ? "connection" : "changed");
    }
  }
  const R = [], O = [];
  for (const [S, A, H, J, G] of [
    ["left", e.nodes, t.nodes, g, R],
    ["right", t.nodes, e.nodes, L, O]
  ])
    for (const K of A) {
      if (J.has(K.key)) continue;
      const X = H.filter((B) => B.source === K.source && B.type === K.type), W = e.status === "ok" && t.status === "ok" && e.sources[K.source] === "ok" && t.sources[K.source] === "ok";
      X.length === 0 && W && !f.has(K.key) ? I(S === "left" ? K : void 0, S === "right" ? K : void 0, "", S === "left" ? "右で削除（左にのみ保存）" : "右で追加（右にのみ保存）", S === "left" ? K.fields : void 0, S === "right" ? K.fields : void 0, S === "left" ? "removed" : "added") : (l = !0, G.push({ node: K, candidateKeys: X.map((B) => B.key) }));
    }
  return (R.length || O.length) && n.push("対応未確定のノードがあります。候補を確認し、必要に応じて手動で対応付けてください。"), { status: l ? "incomplete" : i.length ? "different" : "same", differences: i, matches: u, unmatchedLeft: R, unmatchedRight: O, warnings: [...new Set(n)], excludedPromptFields: o };
}
function vi(e, t) {
  if (e.status !== "ok" || t.status !== "ok") return null;
  const s = e.sources.prompt === "ok" && t.sources.prompt === "ok" ? "prompt" : "workflow";
  if (e.sources[s] !== "ok" || t.sources[s] !== "ok") return null;
  for (const o of [e, t]) {
    const a = o.nodes.filter((u) => u.source === s);
    if (a.some((u) => !Yt(u.type) && u.fields.some((f) => /^(?:widgets_values\.)?(?:text|prompt|positive|negative)$/.test(f.key) && typeof f.value == "string"))) return null;
    for (const u of a) {
      const f = o.nodes.find((h) => h.source !== s && h.id === u.id && h.type === u.type);
      if (f)
        for (const h of u.fields.filter((p) => p.promptText)) {
          const p = h.key.replace(/^widgets_values\./, ""), g = f.fields.find((L) => L.key.replace(/^widgets_values\./, "") === p && L.promptText);
          if (g && !Kt(h.value, g.value)) return null;
        }
    }
  }
  const n = e.nodes.filter((o) => o.source === s && Yt(o.type)), i = t.nodes.filter((o) => o.source === s && Yt(o.type));
  if (!n.length || n.length !== i.length) return null;
  const { matches: r } = Mr(n, i, {}, []);
  if (r.length !== n.length) return null;
  for (const o of r) {
    const a = n.find((f) => f.key === o.leftKey), u = i.find((f) => f.key === o.rightKey);
    if (a.type !== u.type) return null;
    for (const f of Yt(a.type)) {
      const h = a.fields.find((g) => g.key === f || g.key === `widgets_values.${f}`), p = u.fields.find((g) => g.key === f || g.key === `widgets_values.${f}`);
      if (!h?.promptText || !p?.promptText) return null;
      if (h.value !== p.value) return !1;
    }
  }
  const l = (o) => o.nodes.filter((a) => a.source === s).flatMap((a) => a.fields.filter((u) => /^(?:inputs\.)?(?:positive|negative)$/.test(u.key) && u.kind === "reference").map((u) => ({ node: a.key, input: u.key, reference: u.value })));
  return Kt(l(e), l(t)) ? !0 : null;
}
function nt(e) {
  if (e === void 0) return "保存情報なし";
  if (typeof e == "string") return e;
  function t(s, n) {
    if (n > 128) throw new Error("Metadata nesting limit");
    const i = yn(s);
    if (i !== void 0) return i;
    const r = "  ".repeat(n + 1), l = "  ".repeat(n);
    if (Array.isArray(s)) return s.length ? `[
${s.map((o) => r + t(o, n + 1)).join(`,
`)}
${l}]` : "[]";
    if (pe(s)) {
      const o = Object.entries(s).filter(([, a]) => a !== void 0);
      return o.length ? `{
${o.map(([a, u]) => `${r}${JSON.stringify(a)}: ${t(u, n + 1)}`).join(`,
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
class sa {
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
const Xe = new sa(), _s = { high: 2, normal: 1, low: 0 };
class na {
  constructor(t = 4) {
    this.limit = t;
  }
  limit;
  active = 0;
  jobs = [];
  add(t, s = "normal") {
    let n;
    const i = new Promise((l) => n = l), r = { run: t, resolve: n, cancelled: !1, started: !1, priority: s };
    return this.jobs.push(r), this.drain(), {
      done: i,
      promote: (l) => {
        _s[l] > _s[r.priority] && (r.priority = l, this.drain());
      },
      cancel: () => {
        r.cancelled = !0, r.started || (this.jobs = this.jobs.filter((l) => l !== r), n());
      }
    };
  }
  drain() {
    for (this.jobs.sort((t, s) => _s[s.priority] - _s[t.priority]); this.active < this.limit && this.jobs.length && !(this.jobs[0].priority === "low" && this.active >= Math.max(1, this.limit - 1)); ) {
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
const ia = new na(4), Nt = /* @__PURE__ */ new Map(), yi = { high: 2, normal: 1, low: 0 };
function Tr(e, t = "normal") {
  const s = Xe.get(e);
  if (s) return { done: Promise.resolve(s), cancel: () => {
  } };
  let n = Nt.get(e);
  if (n)
    yi[t] > yi[n.priority] && (n.priority = t, n.job?.promote(t));
  else {
    const l = new AbortController(), o = Xe.epoch;
    let a;
    n = { abort: l, users: 0, priority: t, done: new Promise((f) => {
      a = f;
    }) };
    const u = n;
    Nt.set(e, u), u.job = ia.add(async () => {
      let f;
      try {
        const h = await fetch(e, {
          signal: l.signal,
          credentials: "same-origin",
          priority: u.priority === "normal" ? "auto" : u.priority
        });
        if (!h.ok) throw new Error("Preview unavailable");
        const p = await h.blob();
        !l.signal.aborted && o === Xe.epoch && (f = p, Xe.set(e, p, o));
      } catch {
      } finally {
        Nt.get(e) === u && Nt.delete(e), a(f);
      }
    }, t), u.job.done.then(() => a(void 0));
  }
  const i = n;
  i.users++;
  let r = !1;
  return {
    done: i.done,
    cancel: () => {
      r || (r = !0, --i.users === 0 && (i.abort.abort(), i.job?.cancel(), Nt.get(e) === i && Nt.delete(e)));
    }
  };
}
const ra = ["src", "alt"], la = {
  key: 1,
  class: "sg-thumb-placeholder"
}, Ln = /* @__PURE__ */ hs({
  __name: "Thumbnail",
  props: {
    url: {},
    alt: {},
    cachedFallbackUrl: {},
    quiet: { type: Boolean },
    priority: {}
  },
  emits: ["ready"],
  setup(e, { emit: t }) {
    const s = e, n = t, i = /* @__PURE__ */ Y(""), r = /* @__PURE__ */ Y(), l = /* @__PURE__ */ Y(!1);
    let o, a = 0;
    function u() {
      o?.(), i.value && URL.revokeObjectURL(i.value), i.value = "";
    }
    We(
      () => s.url,
      (p) => {
        const g = ++a;
        u(), l.value = !1;
        const L = Xe.get(p) ?? (s.cachedFallbackUrl && Xe.get(s.cachedFallbackUrl));
        if (L) {
          i.value = URL.createObjectURL(L);
          return;
        }
        const I = Tr(p, s.priority);
        o = I.cancel, I.done.then((P) => {
          g === a && (P ? i.value = URL.createObjectURL(P) : l.value = !0);
        });
      },
      { immediate: !0 }
    );
    function f(p) {
      if (p.target !== r.value) return;
      const g = p.target;
      n("ready", { width: g.naturalWidth, height: g.naturalHeight });
    }
    function h(p) {
      p.target === r.value && (i.value && URL.revokeObjectURL(i.value), i.value = "", l.value = !0, Xe.delete(s.url), s.cachedFallbackUrl && Xe.delete(s.cachedFallbackUrl));
    }
    return Hs(() => {
      a++, u();
    }), (p, g) => i.value ? (F(), N("img", {
      ref_key: "currentImage",
      ref: r,
      key: i.value,
      src: i.value,
      alt: e.alt,
      decoding: "async",
      onError: h,
      onLoad: f
    }, null, 40, ra)) : e.quiet ? re("", !0) : (F(), N("span", la, D(l.value ? "Image unavailable" : "Loading preview…"), 1));
  }
}), oa = ["aria-label", "onClick"], aa = { class: "sg-card-tools" }, ca = ["title"], ua = ["aria-label", "checked", "onChange"], fa = ["aria-label", "onClick"], da = /* @__PURE__ */ hs({
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
    const n = e, i = s, r = /* @__PURE__ */ Y(), l = /* @__PURE__ */ Y(1e3), o = /* @__PURE__ */ Y(600), a = /* @__PURE__ */ Y(n.initialScroll), u = fe(() => n.large ? 284 : 164), f = fe(
      () => qo(
        n.images.length,
        l.value,
        o.value,
        a.value,
        u.value
      )
    ), h = fe(
      () => n.images.slice(f.value.start, f.value.end)
    );
    let p;
    function g() {
      r.value && (l.value = r.value.clientWidth || 1e3, o.value = r.value.clientHeight || 600);
    }
    function L() {
      i("position", {
        scroll: a.value,
        width: l.value,
        cell: u.value
      });
    }
    function I() {
      a.value = r.value?.scrollTop ?? 0, L(), f.value.end >= n.images.length && n.hasMore && i("more");
    }
    return We(
      () => [n.images, n.large],
      async ([P, R], [O, S]) => {
        const A = Cr(
          O,
          P,
          a.value,
          l.value,
          S ? 284 : 164,
          R ? 284 : 164
        );
        await $t(), r.value && (r.value.scrollTop = A, a.value = A, L());
      },
      { flush: "pre" }
    ), An(() => {
      g(), r.value && (r.value.scrollTop = a.value), p = new ResizeObserver(g), r.value && p.observe(r.value);
    }), Hs(() => p?.disconnect()), t({
      top: () => {
        r.value && (r.value.scrollTop = 0, a.value = 0, L());
      }
    }), (P, R) => (F(), N("div", {
      ref_key: "el",
      ref: r,
      class: "sg-grid-scroll",
      "data-testid": "image-grid",
      onScrollPassive: I
    }, [
      x("div", {
        class: "sg-grid-space",
        style: vt({ height: f.value.totalHeight + "px" })
      }, [
        x("div", {
          class: "sg-grid",
          style: vt({
            gridTemplateColumns: `repeat(${f.value.columns}, minmax(0,1fr))`,
            transform: `translateY(${f.value.offset}px)`
          })
        }, [
          (F(!0), N(ee, null, $e(h.value, (O) => (F(), N("article", {
            key: O.id,
            class: Ye(["sg-card", { "sg-checked": e.checked.has(O.id) }]),
            style: vt({ height: u.value + "px" })
          }, [
            x("button", {
              class: "sg-thumb-button",
              "data-action": "view",
              "aria-label": "View " + O.name,
              onClick: (S) => i("view", O.id)
            }, [
              Ee(Ln, {
                url: e.api.imageURL(O, "thumbnail", e.large ? 512 : 256),
                alt: O.name
              }, null, 8, ["url", "alt"])
            ], 8, oa),
            x("div", aa, [
              x("label", {
                title: "Select " + O.name
              }, [
                x("input", {
                  type: "checkbox",
                  "aria-label": "Select " + O.name,
                  checked: e.checked.has(O.id),
                  onChange: (S) => i("check", O.id)
                }, null, 40, ua),
                R[1] || (R[1] = Ie(" Compare", -1))
              ], 8, ca),
              x("button", {
                class: Ye(["sg-pin", { "sg-pinned": e.pinned.has(O.id) }]),
                "aria-label": "Pin " + O.name + " as reference",
                onClick: (S) => i("pin", O.id)
              }, D(e.pinned.has(O.id) ? "Pinned" : "Pin"), 11, fa)
            ])
          ], 6))), 128))
        ], 4)
      ], 4),
      e.hasMore ? (F(), N("button", {
        key: 0,
        class: "sg-load",
        onClick: R[0] || (R[0] = (O) => i("more"))
      }, " Load more images ")) : re("", !0)
    ], 544));
  }
}), ha = ["data-side", "data-image"], pa = { class: "sg-pane-caption" }, ga = ["aria-label", "disabled"], ma = {
  key: 0,
  class: "sg-unavailable",
  role: "status"
}, va = ["src", "alt"], ya = {
  key: 2,
  class: "sg-surface-status"
}, ba = ["title"], wa = { class: "sg-zoom-status" }, _a = {
  class: "sg-quality-status",
  role: "status"
}, bi = /* @__PURE__ */ hs({
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
    const n = e, i = s, r = /* @__PURE__ */ Y(), l = /* @__PURE__ */ Y(), o = /* @__PURE__ */ Y(640), a = /* @__PURE__ */ Y(600), u = /* @__PURE__ */ Y({ width: 0, height: 0 }), f = /* @__PURE__ */ Y(!1), h = /* @__PURE__ */ Y(!1), p = /* @__PURE__ */ Y(!1);
    let g, L = null;
    const I = fe(
      () => Math.min(
        o.value / (u.value.width || n.image?.width || 1024),
        a.value / (u.value.height || n.image?.height || 1024)
      )
    ), P = fe(
      () => (u.value.width || n.image?.width || 1024) * I.value
    ), R = fe(
      () => (u.value.height || n.image?.height || 1024) * I.value
    ), O = fe(() => ({
      width: P.value + "px",
      height: R.value + "px",
      transform: `translate(-50%,-50%) translate(${n.transform.x * P.value * n.transform.scale}px,${n.transform.y * R.value * n.transform.scale}px) scale(${n.transform.scale})`
    }));
    We(
      () => [n.image?.id, n.image?.revision],
      () => {
        r.value?.removeAttribute("src"), f.value = !1, h.value = !1, p.value = !1, u.value = { width: 0, height: 0 };
      }
    );
    async function S(W) {
      if (W.target !== r.value) return;
      const B = W.target;
      if (B.decode)
        try {
          await B.decode();
        } catch {
          B === r.value && (h.value = !0);
          return;
        }
      B === r.value && (u.value = { width: B.naturalWidth, height: B.naturalHeight }, f.value = !0);
    }
    function A(W) {
      f.value || (p.value = !0, !n.image?.width && W.width && W.height && (u.value = W));
    }
    function H(W) {
      W.target === r.value && (h.value = !0);
    }
    t({ originalScale: fe(() => 1 / I.value) });
    function J(W) {
      const B = n.transform.scale, oe = Math.min(
        32,
        Math.max(0.25, B * Math.exp(-W.deltaY * 15e-4))
      ), ve = l.value.getBoundingClientRect(), ft = (W.clientX - ve.left - ve.width / 2) / P.value, xt = (W.clientY - ve.top - ve.height / 2) / R.value;
      i("transform", {
        scale: oe,
        x: n.transform.x + ft * (1 / oe - 1 / B),
        y: n.transform.y + xt * (1 / oe - 1 / B)
      });
    }
    function G(W) {
      W.button === 0 && (L = { x: W.clientX, y: W.clientY, start: { ...n.transform } }, l.value?.setPointerCapture(W.pointerId));
    }
    function K(W) {
      L && i("transform", {
        ...L.start,
        x: L.start.x + (W.clientX - L.x) / (P.value * L.start.scale),
        y: L.start.y + (W.clientY - L.y) / (R.value * L.start.scale)
      });
    }
    function X() {
      l.value && (o.value = l.value.clientWidth || 640, a.value = l.value.clientHeight || 600);
    }
    return An(() => {
      X(), g = new ResizeObserver(X), l.value && g.observe(l.value);
    }), Hs(() => {
      r.value?.removeAttribute("src"), g?.disconnect();
    }), (W, B) => (F(), N("section", {
      class: "sg-image-pane",
      "data-side": e.side,
      "data-image": e.image?.id
    }, [
      x("div", pa, [
        x("strong", null, D(e.side === "left" ? "Reference · pinned" : "Image"), 1),
        x("span", null, D(e.image?.name ?? "No candidate"), 1),
        x("button", {
          "aria-label": "Show " + e.side + " original pixels",
          disabled: !f.value,
          onClick: B[0] || (B[0] = (oe) => i("original"))
        }, " 1:1 ", 8, ga)
      ]),
      e.unavailable ? (F(), N("p", ma, " No longer present in this folder. The selected image is kept in place; the displayed image may be cached. ")) : re("", !0),
      x("div", {
        ref_key: "surface",
        ref: l,
        class: "sg-image-surface",
        onWheel: Sr(J, ["prevent"]),
        onPointerdown: G,
        onPointermove: K,
        onPointerup: B[1] || (B[1] = (oe) => /* @__PURE__ */ ge(L) ? L.value = null : L = null),
        onPointercancel: B[2] || (B[2] = (oe) => /* @__PURE__ */ ge(L) ? L.value = null : L = null),
        onLostpointercapture: B[3] || (B[3] = (oe) => /* @__PURE__ */ ge(L) ? L.value = null : L = null),
        onDblclick: B[4] || (B[4] = (oe) => i("transform", { scale: 1, x: 0, y: 0 }))
      }, [
        e.image && !f.value ? (F(), N("div", {
          key: e.image.id + e.image.revision + "preview",
          class: "sg-image-preview",
          style: vt(O.value)
        }, [
          Ee(Ln, {
            url: e.api.imageURL(e.image, "thumbnail", 512),
            "cached-fallback-url": e.api.imageURL(e.image, "thumbnail", 256),
            alt: e.image.name + " · preview",
            quiet: "",
            priority: "high",
            onReady: A
          }, null, 8, ["url", "cached-fallback-url", "alt"])
        ], 4)) : re("", !0),
        e.image && !h.value ? (F(), N("img", {
          class: "sg-original",
          ref_key: "currentImage",
          ref: r,
          key: e.image.id + e.image.revision,
          src: e.api.imageURL(e.image, "original"),
          alt: e.image.name,
          style: vt({ ...O.value, opacity: f.value ? 1 : 0 }),
          fetchpriority: "high",
          loading: "eager",
          draggable: "false",
          decoding: "async",
          onLoad: S,
          onError: H
        }, null, 44, va)) : re("", !0),
        e.image ? re("", !0) : (F(), N("p", ya, D(h.value ? "Image unavailable. It may have been moved or overwritten." : "No comparison candidate. Select more images or change the candidate range."), 1))
      ], 544),
      x("div", {
        class: "sg-models",
        title: e.models.join(", ")
      }, [
        x("span", null, D(e.models.length ? "Model: " + e.models.join(" · ") : e.modelStatus), 1),
        x("span", wa, D(Math.round(e.transform.scale * 100)) + "% of fit", 1),
        x("span", _a, D(f.value ? "Original" : h.value ? "Original unavailable" : p.value ? "Preview · Loading original…" : "Loading original…"), 1)
      ], 8, ba)
    ], 8, ha));
  }
}), xa = {
  class: "sg-metadata",
  "aria-label": "Saved settings"
}, ka = { class: "sg-panel-heading" }, Sa = { key: 0 }, Ca = {
  key: 2,
  role: "status"
}, Ia = { class: "sg-muted" }, Ma = { class: "sg-node-mapping" }, Ta = ["aria-label", "value", "onChange"], $a = { value: "__auto__" }, Aa = ["value"], Ea = { key: 0 }, Oa = ["onClick"], Ra = ["onClick"], Pa = ["onClick"], La = { key: 5 }, Fa = /* @__PURE__ */ hs({
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
    const s = e, n = t, i = /* @__PURE__ */ Y(""), r = fe(
      () => s.compare && s.left && s.right ? ta(s.left, s.right, {
        manualMatches: s.manualMatches
      }) : null
    );
    async function l(f) {
      try {
        await navigator.clipboard.writeText(
          typeof f == "string" ? f : nt(f)
        ), i.value = "Copied";
      } catch {
        i.value = "Clipboard unavailable. Select the displayed text to copy.";
      }
    }
    function o(f) {
      const h = s.manualMatches[f], p = h === void 0 ? r.value?.matches.find((g) => g.leftKey === f)?.rightKey : h;
      return s.right?.nodes.find((g) => g.key === p);
    }
    function a(f) {
      return `{
  "prompt": ` + (f.rawText.prompt ?? nt(f.raw.prompt)) + `,
  "workflow": ` + (f.rawText.workflow ?? nt(f.raw.workflow)) + `
}`;
    }
    function u(f, h) {
      const p = f.target.value;
      n(
        "match",
        h,
        p === "__auto__" ? void 0 : p === "__none__" ? null : p
      );
    }
    return (f, h) => (F(), N("aside", xa, [
      x("div", ka, [
        x("h2", null, D(e.compare ? "Saved setting differences" : "Saved settings"), 1),
        x("button", {
          "aria-label": "Close settings",
          onClick: h[0] || (h[0] = (p) => n("close"))
        }, "×")
      ]),
      h[14] || (h[14] = x("p", { class: "sg-muted" }, " Saved values only. Prompt text is excluded from identified differences. Unknown widget values keep their saved positions. ", -1)),
      e.loading ? (F(), N("p", Sa, "Loading saved metadata…")) : re("", !0),
      e.left?.status === "invalid" || e.right?.status === "invalid" ? (F(), N("button", {
        key: 1,
        onClick: h[1] || (h[1] = (p) => n("retry"))
      }, " Reload saved settings ")) : re("", !0),
      i.value ? (F(), N("p", Ca, D(i.value), 1)) : re("", !0),
      r.value ? (F(), N(ee, { key: 3 }, [
        x("p", {
          class: Ye(["sg-result", { "sg-warning": r.value.status === "incomplete" }])
        }, D(r.value.status === "same" ? "No differences in comparable saved settings." : r.value.status === "different" ? r.value.differences.length + " saved differences" : "Incomplete comparison. Missing or ambiguous settings are not equal."), 3),
        x("p", Ia, D(r.value.excludedPromptFields) + " identified prompt fields excluded. ", 1),
        (F(!0), N(ee, null, $e(r.value.warnings, (p, g) => (F(), N("p", {
          key: g,
          class: "sg-warning"
        }, D(p), 1))), 128)),
        x("button", {
          onClick: h[2] || (h[2] = (p) => l(r.value.differences))
        }, " Copy differences (left → right) "),
        x("details", Ma, [
          h[8] || (h[8] = x("summary", null, "Review / change node matching", -1)),
          h[9] || (h[9] = x("p", { class: "sg-muted" }, " One-to-one within the same saved source. Auto matches are candidates, not proof of workflow identity. ", -1)),
          (F(!0), N(ee, null, $e(e.left?.nodes, (p) => (F(), N("label", {
            key: p.key,
            class: "sg-match-row"
          }, [
            x("span", null, D(p.source) + " · " + D(p.id) + " · " + D(p.title || p.type), 1),
            x("select", {
              "aria-label": "Match " + p.key,
              value: e.manualMatches[p.key] === null ? "__none__" : e.manualMatches[p.key] ?? "__auto__",
              onChange: (g) => u(g, p.key)
            }, [
              x("option", $a, " Auto: " + D(r.value.matches.find((g) => g.leftKey === p.key)?.rightKey ?? "unmatched"), 1),
              h[5] || (h[5] = x("option", { value: "__none__" }, "Leave unmatched", -1)),
              (F(!0), N(ee, null, $e(e.right?.nodes.filter(
                (g) => g.source === p.source
              ), (g) => (F(), N("option", {
                key: g.key,
                value: g.key
              }, D(g.id) + " · " + D(g.title || g.type), 9, Aa))), 128))
            ], 40, Ta),
            x("details", null, [
              h[6] || (h[6] = x("summary", null, "Left saved values", -1)),
              x("pre", null, D(ke(nt)(
                p.fields.map((g) => ({ name: g.label, value: g.value }))
              )), 1)
            ]),
            o(p.key) ? (F(), N("details", Ea, [
              h[7] || (h[7] = x("summary", null, "Right candidate saved values", -1)),
              x("pre", null, D(ke(nt)(
                o(p.key)?.fields.map((g) => ({
                  name: g.label,
                  value: g.value
                }))
              )), 1)
            ])) : re("", !0)
          ]))), 128)),
          (F(!0), N(ee, null, $e(r.value.unmatchedLeft, (p) => (F(), N("p", {
            key: p.node.key,
            class: "sg-warning"
          }, " Unmatched left " + D(p.node.key) + " · candidates: " + D(p.candidateKeys.join(", ") || "none"), 1))), 128)),
          (F(!0), N(ee, null, $e(r.value.unmatchedRight, (p) => (F(), N("p", {
            key: p.node.key,
            class: "sg-warning"
          }, " Unmatched right " + D(p.node.key), 1))), 128))
        ]),
        (F(!0), N(ee, null, $e(r.value.differences, (p) => (F(), N("article", {
          key: p.id,
          class: "sg-difference"
        }, [
          x("strong", null, D(p.leftNode?.title || p.rightNode?.title || p.leftNode?.type || p.rightNode?.type), 1),
          x("small", null, D(p.source) + " · " + D(p.leftNode?.id ?? "—") + " → " + D(p.rightNode?.id ?? "—") + " · " + D(p.kind), 1),
          x("h3", null, D(p.label), 1),
          x("label", null, [
            h[10] || (h[10] = Ie("Left reference ", -1)),
            x("button", {
              onClick: (g) => l(p.left)
            }, "Copy left", 8, Oa)
          ]),
          x("pre", null, D(ke(nt)(p.left)), 1),
          x("label", null, [
            h[11] || (h[11] = Ie("Right image ", -1)),
            x("button", {
              onClick: (g) => l(p.right)
            }, "Copy right", 8, Ra)
          ]),
          x("pre", null, D(ke(nt)(p.right)), 1)
        ]))), 128))
      ], 64)) : e.right ? (F(), N(ee, { key: 4 }, [
        x("p", null, "Status: " + D(e.right.status), 1),
        (F(!0), N(ee, null, $e(e.right.warnings, (p) => (F(), N("p", {
          key: p,
          class: "sg-warning"
        }, D(p), 1))), 128)),
        (F(!0), N(ee, null, $e(e.right.nodes, (p) => (F(), N("details", {
          key: p.key
        }, [
          x("summary", null, D(p.source) + " · " + D(p.id) + " · " + D(p.title || p.type), 1),
          (F(!0), N(ee, null, $e(p.fields, (g) => (F(), N("div", {
            key: g.key,
            class: "sg-field"
          }, [
            x("label", null, [
              Ie(D(g.label) + " ", 1),
              x("button", {
                onClick: (L) => l(g.value)
              }, "Copy value", 8, Pa)
            ]),
            x("pre", null, D(ke(nt)(g.value)), 1)
          ]))), 128))
        ]))), 128))
      ], 64)) : re("", !0),
      e.right ? (F(), N("details", La, [
        h[12] || (h[12] = x("summary", null, "Original saved JSON (may include prompts)", -1)),
        h[13] || (h[13] = x("p", { class: "sg-muted" }, " Copied JSON may contain prompt text. Nothing is sent outside this ComfyUI server. ", -1)),
        e.left && e.compare ? (F(), N("button", {
          key: 0,
          onClick: h[3] || (h[3] = (p) => l(a(e.left)))
        }, " Copy original left JSON")) : re("", !0),
        x("button", {
          onClick: h[4] || (h[4] = (p) => l(a(e.right)))
        }, " Copy original " + D(e.compare ? "right " : "") + "JSON ", 1),
        x("pre", null, D(ke(nt)(e.right.raw)), 1)
      ])) : re("", !0)
    ]));
  }
});
function Na(e, t, s) {
  return t < 0 || t >= e ? [] : [s, 2 * s, 3 * s, -s].map((n) => t + n).filter((n) => n >= 0 && n < e);
}
class ja {
  requests = /* @__PURE__ */ new Map();
  update(t) {
    const s = new Set(t.slice(0, 4));
    for (const [n, i] of this.requests)
      s.has(n) || (i.cancel(), this.requests.delete(n));
    for (const n of s)
      this.requests.has(n) || this.requests.set(n, Tr(n, "low"));
  }
  clear() {
    for (const t of this.requests.values()) t.cancel();
    this.requests.clear();
  }
}
const Da = { class: "sg-header" }, Ua = { class: "sg-folder" }, Ka = ["value", "disabled"], Ha = ["value"], Va = {
  key: 0,
  class: "sg-error",
  role: "alert"
}, Ba = { class: "sg-toolbar" }, Wa = { class: "sg-size" }, qa = ["aria-pressed"], za = ["aria-pressed"], Ga = ["disabled"], Ja = {
  key: 1,
  class: "sg-empty"
}, Ya = { class: "sg-grid-footer" }, Xa = { class: "sg-toolbar sg-view-toolbar" }, Qa = { class: "sg-reference-select" }, Za = ["value"], ec = ["value"], tc = {
  key: 0,
  value: "prompt"
}, sc = ["disabled"], nc = { class: "sg-position" }, ic = ["disabled"], rc = { key: 2 }, lc = ["checked"], oc = ["aria-expanded"], ac = ["aria-pressed"], cc = ["aria-label"], uc = {
  key: 0,
  class: "sg-candidate-bar"
}, fc = ["aria-label", "aria-pressed", "onClick"], dc = ["disabled"], hc = {
  key: 1,
  class: "sg-helper",
  role: "status"
}, pc = { class: "sg-view-footer" }, gc = { key: 0 }, mc = /* @__PURE__ */ hs({
  __name: "Gallery",
  props: {
    api: {}
  },
  setup(e) {
    const t = e, s = /* @__PURE__ */ Is(Vo()), n = /* @__PURE__ */ Y([]), i = /* @__PURE__ */ Y(!0), r = /* @__PURE__ */ Y(!1), l = new ja();
    let o = -1, a = "grid", u = 1;
    const f = /* @__PURE__ */ Y(), h = /* @__PURE__ */ Y(), p = /* @__PURE__ */ Y(), g = /* @__PURE__ */ Y(), L = /* @__PURE__ */ Y(), I = /* @__PURE__ */ Y(), P = /* @__PURE__ */ Y({ scroll: 0, width: 1e3, cell: 284 }), R = /* @__PURE__ */ Y(), O = /* @__PURE__ */ Y(0), S = new Go(t.api, s, () => O.value++), A = /* @__PURE__ */ Y(""), H = /* @__PURE__ */ Y(""), J = /* @__PURE__ */ Y(!1), G = /* @__PURE__ */ Y(!1), K = /* @__PURE__ */ Is(/* @__PURE__ */ new Map()), X = /* @__PURE__ */ new Map();
    let W, B = new AbortController(), oe = 0, ve = 0, ft;
    const xt = fe(() => (O.value, S.loading)), Ht = fe(() => (O.value, S.error)), He = fe(() => (O.value, S.cursor !== null)), ye = fe(() => s.leftId ? s.records.get(s.leftId) : void 0), Ce = fe(() => {
      const _ = s.mode === "single" ? s.currentId : s.rightId;
      return _ ? s.records.get(_) : void 0;
    }), Ne = (_) => _.id + ":" + _.revision, Ve = fe(
      () => ye.value ? K.get(Ne(ye.value)) : void 0
    ), we = fe(
      () => Ce.value ? K.get(Ne(Ce.value)) : void 0
    ), ps = fe(
      () => Ve.value ? mi(Ve.value) : []
    ), gs = fe(
      () => we.value ? mi(we.value) : []
    ), qs = fe(() => {
      const _ = /* @__PURE__ */ new Set([...s.pinned, ...s.checked]);
      return s.leftId && _.add(s.leftId), [..._].map((v) => s.records.get(v)).filter((v) => !!v);
    }), Re = fe(
      () => s.mode === "single" ? s.images : Cs(s)
    ), Me = fe(
      () => Re.value.findIndex(
        (_) => _.id === (s.mode === "single" ? s.currentId : s.rightId)
      )
    ), Lt = fe(() => {
      const _ = Math.max(0, Me.value);
      return Re.value.slice(Math.max(0, _ - 7), _ + 8);
    });
    We(
      () => [s.mode, Me.value, Lt.value.map(Ne).join(",")],
      () => {
        const _ = Me.value;
        s.mode === a && o >= 0 && _ !== o ? u = _ < o ? -1 : 1 : s.mode !== a && (u = 1), o = _, a = s.mode, l.update(s.mode === "grid" ? [] : Na(Re.value.length, _, u).map((v) => t.api.imageURL(Re.value[v], "thumbnail", 512)));
      },
      { flush: "post" }
    ), We(
      () => s.images,
      (_, v) => {
        s.mode !== "grid" && (P.value.scroll = Cr(
          v,
          _,
          P.value.scroll,
          P.value.width,
          P.value.cell,
          P.value.cell
        ));
      }
    ), We(
      () => [
        s.mode,
        s.rightId,
        s.currentId,
        r.value,
        Lt.value.map((_) => _.id).join(",")
      ],
      async () => {
        await $t();
        const _ = R.value, v = _?.querySelector("[aria-pressed=true]");
        _ && v && (_.scrollLeft = zo(
          _.clientWidth,
          _.scrollLeft,
          v.offsetLeft,
          v.offsetWidth
        ));
      }
    ), We(
      () => s.mode,
      async (_) => {
        const v = oe;
        await $t();
        const C = f.value;
        if (!s.open || v !== oe || _ !== s.mode || !C || C.contains(document.activeElement)) return;
        ((_ === "grid" ? C.querySelector("[data-action=view]") : h.value) ?? C.querySelector("[data-action=close]"))?.focus({ preventScroll: !0 });
      }
    );
    function dt(_) {
      return _ ? "No identifiable saved model information" : "Loading saved model information…";
    }
    async function Vt(_, v = "view") {
      if (!_) return;
      const C = Ne(_);
      if (K.has(C)) return K.get(C);
      const se = X.get(C);
      if (se)
        return se.owners.add(v), se.promise;
      const ht = oe, pt = new AbortController(), kt = pt.signal, St = t.api.metadata(_, kt).then(gi).catch(
        (tt) => kt.aborted ? void 0 : gi({
          status: "invalid",
          prompt: null,
          workflow: null,
          warnings: [tt instanceof Error ? tt.message : "Metadata unavailable"]
        })
      ).then((tt) => {
        if (tt && ht === oe && !kt.aborted && (K.set(C, tt), K.size > 200)) {
          const Bt = /* @__PURE__ */ new Set([
            ye.value && Ne(ye.value),
            Ce.value && Ne(Ce.value),
            C
          ]);
          for (const Wt of K.keys())
            if (!Bt.has(Wt)) {
              K.delete(Wt);
              break;
            }
        }
        return ht === oe && !kt.aborted ? tt : void 0;
      }).finally(() => {
        X.get(C)?.promise === St && X.delete(C);
      });
      return X.set(C, { promise: St, abort: pt, owners: /* @__PURE__ */ new Set([v]) }), St;
    }
    function c(_, v = /* @__PURE__ */ new Set()) {
      for (const [C, se] of X)
        v.has(C) || (se.owners.delete(_), se.owners.size || (se.abort.abort(), X.delete(C)));
    }
    function d() {
      clearTimeout(W), c("view"), c("search");
    }
    function m() {
      return (s.mode === "grid" ? [] : s.mode === "compare" ? [ye.value, Ce.value] : [Ce.value]).filter((_) => !!_);
    }
    function k() {
      clearTimeout(W);
      for (const _ of m()) Vt(_);
    }
    We(
      () => [s.mode, ye.value?.id, ye.value?.revision, Ce.value?.id, Ce.value?.revision],
      () => {
        clearTimeout(W);
        const _ = m();
        c("view", new Set(_.map(Ne))), _.length && (W = setTimeout(k, 120)), s.manualMatches = {};
      },
      { flush: "post" }
    ), We(() => s.panel, (_) => {
      _ && k();
    });
    async function y() {
      if (s.open) return;
      oe++, B = new AbortController(), s.open = !0, P.value.scroll = 0, A.value = "", H.value = "", await $t(), f.value?.showModal(), G.value = !0;
      const _ = oe;
      try {
        const v = await t.api.folders(B.signal);
        if (_ !== oe) return;
        n.value = v.folders;
        const C = v.folders.find((se) => se.id === s.folderId) ?? v.folders[0];
        C ? await S.selectFolder(C.id) : A.value = "No output folders are available.";
      } catch (v) {
        _ === oe && (A.value = v instanceof Error ? v.message : "Folders unavailable");
      } finally {
        _ === oe && (G.value = !1);
      }
      _ === oe && (ft = setInterval(() => {
        document.hidden || M();
      }, 5e3));
    }
    function w() {
      l.clear(), oe++, ve++, J.value = !1, B.abort(), d(), S.dispose(), clearInterval(ft), X.clear(), K.clear(), Xe.clear(), f.value?.close(), Bo(s), H.value = "", $t(() => L.value?.focus());
    }
    async function $(_) {
      d(), l.clear(), P.value.scroll = 0, ve++, J.value = !1, H.value = "", await S.selectFolder(_.target.value);
    }
    async function M() {
      s.open && await S.refresh();
    }
    function T(_) {
      r.value = !1, s.currentId = _, s.mode = "single", s.panel = !1, Gt(s, "right", { scale: 1, x: 0, y: 0 });
    }
    function b(_) {
      s.checked.has(_) ? s.checked.delete(_) : s.checked.add(_);
    }
    function j() {
      c("search"), ve++, J.value = !1, H.value = "";
    }
    We(() => [ye.value?.id, ye.value?.revision], j, {
      flush: "sync"
    });
    function E(_) {
      j(), s.pinned.add(_), s.leftId = _, s.mode = "compare", s.scope = s.checked.size > 1 ? "checked" : "folder", s.rightId = _, s.manualMatches = {}, s.panel = !1, H.value = "", s.transforms = {
        left: { scale: 1, x: 0, y: 0 },
        right: { scale: 1, x: 0, y: 0 }
      };
    }
    function U() {
      const _ = s.images.find((v) => s.checked.has(v.id))?.id ?? s.currentId ?? s.images[0]?.id;
      _ && E(_);
    }
    function V() {
      J.value && j(), Cs(s).some((_) => _.id === s.rightId) || (s.rightId = Cs(s)[0]?.id ?? null);
    }
    function z(_) {
      const v = {
        left: { scale: p.value?.originalScale ?? 1, x: 0, y: 0 },
        right: { scale: g.value?.originalScale ?? 1, x: 0, y: 0 }
      };
      s.linked ? s.transforms = v : s.transforms[_] = v[_];
    }
    function te() {
      Gt(s, "left", { scale: 1, x: 0, y: 0 }), Gt(s, "right", { scale: 1, x: 0, y: 0 });
    }
    function Q() {
      for (const _ of [ye.value, Ce.value])
        _ && (K.delete(Ne(_)), Vt(_));
    }
    function ue(_, v) {
      if (v === void 0) delete s.manualMatches[_];
      else {
        if (v !== null)
          for (const [C, se] of Object.entries(s.manualMatches))
            C !== _ && se === v && (s.manualMatches[C] = null);
        s.manualMatches[_] = v;
      }
    }
    async function he() {
      const _ = ye.value;
      if (!_ || J.value) return;
      const v = ++ve;
      J.value = !0, H.value = "Checking saved text in " + s.images.length + " loaded images…";
      const C = await Vt(_, "search");
      if (v !== ve) return;
      if (!C || vi(C, C) === null) {
        H.value = "Saved prompt text cannot be identified. Normal comparison remains available.", J.value = !1;
        return;
      }
      const se = s.images.slice();
      let ht = 0, pt = 0, kt = 0;
      const St = /* @__PURE__ */ new Set();
      async function tt() {
        for (; ht < se.length && v === ve; ) {
          const Bt = se[ht++];
          if (Bt.id === _.id) continue;
          const Wt = await Vt(Bt, "search");
          if (v !== ve) return;
          const Fn = Wt ? vi(C, Wt) : null;
          Fn === !0 && St.add(Bt.id), Fn === null && pt++, kt++, H.value = `Checking saved text… ${kt}/${se.length - 1}`;
        }
      }
      await Promise.all([tt(), tt()]), v === ve && (J.value = !1, s.promptIds = St, s.scope = "prompt", V(), H.value = `${St.size} exact saved-text matches; ${pt} unknown. Checked ${se.length} loaded images${He.value ? " only. Load more in the grid to search further" : ""}. Saved text does not prove the final generated prompt.`, J.value = !1);
    }
    function Te(_) {
      if (!s.open) return;
      _.stopPropagation();
      const v = _.target;
      if (_.key === "Escape") {
        _.preventDefault(), s.panel ? s.panel = !1 : s.mode !== "grid" ? s.mode = "grid" : w();
        return;
      }
      ["INPUT", "SELECT", "TEXTAREA"].includes(v.tagName) || s.mode !== "grid" && (_.key === "ArrowLeft" || _.key === "ArrowRight") && (_.preventDefault(), on(s, _.key === "ArrowLeft" ? -1 : 1));
    }
    const _e = () => {
      M();
    };
    return An(() => {
      t.api.comfy.addEventListener?.("executed", _e), document.addEventListener("visibilitychange", _e);
    }), Hs(() => {
      oe++, ve++, l.clear(), Xe.clear(), clearInterval(ft), B.abort(), d(), S.dispose(), t.api.comfy.removeEventListener?.("executed", _e), document.removeEventListener("visibilitychange", _e);
    }), (_, v) => (F(), N(ee, null, [
      x("button", {
        ref_key: "launcher",
        ref: L,
        "data-action": "open",
        "data-testid": "gallery-launcher",
        class: "sg-launcher",
        "aria-label": "Open Gallery",
        onClick: y
      }, [...v[22] || (v[22] = [
        x("span", { "aria-hidden": "true" }, "▧", -1),
        Ie(" Gallery ", -1)
      ])], 512),
      s.open ? (F(), N("dialog", {
        key: 0,
        ref_key: "dialog",
        ref: f,
        class: Ye(["sg-dialog", { "sg-single-view": s.mode === "single" }]),
        "aria-label": "Shiba Gallery",
        onKeydown: Te,
        onCancel: v[21] || (v[21] = Sr(() => {
        }, ["prevent"]))
      }, [
        x("header", Da, [
          v[25] || (v[25] = x("div", { class: "sg-brand" }, [
            x("span", { class: "sg-mark" }, "▧"),
            x("div", null, [
              x("strong", null, "Gallery"),
              x("small", null, "SHIBA · READ ONLY")
            ])
          ], -1)),
          s.mode !== "grid" ? (F(), N("button", {
            key: 0,
            "data-action": "grid",
            onClick: v[0] || (v[0] = (C) => s.mode = "grid")
          }, " ← Grid")) : re("", !0),
          x("label", Ua, [
            v[23] || (v[23] = Ie("Folder ", -1)),
            x("select", {
              "data-testid": "folder-select",
              "aria-label": "Output folder",
              value: s.folderId,
              disabled: G.value,
              onChange: $
            }, [
              (F(!0), N(ee, null, $e(n.value, (C) => (F(), N("option", {
                key: C.id,
                value: C.id
              }, D(C.name), 9, Ha))), 128))
            ], 40, Ka)
          ]),
          v[26] || (v[26] = x("span", { class: "sg-header-spacer" }, null, -1)),
          x("span", {
            class: Ye(["sg-live", { "sg-working": xt.value }])
          }, [
            v[24] || (v[24] = x("i", null, null, -1)),
            Ie(D(xt.value ? "Syncing" : "Auto refresh"), 1)
          ], 2),
          x("button", {
            "data-action": "close",
            class: "sg-close",
            "aria-label": "Close Gallery",
            onClick: w
          }, " Close × ")
        ]),
        A.value || Ht.value ? (F(), N("div", Va, [
          Ie(D(A.value || Ht.value) + " ", 1),
          x("button", { onClick: M }, "Retry")
        ])) : re("", !0),
        s.mode === "grid" ? (F(), N(ee, { key: 1 }, [
          x("div", Ba, [
            x("span", null, [
              Ie(D(s.images.length) + D(He.value ? "+" : "") + " images ", 1),
              v[27] || (v[27] = x("small", null, "· newest file modification first", -1))
            ]),
            x("div", Wa, [
              x("button", {
                "aria-pressed": !i.value,
                onClick: v[1] || (v[1] = (C) => i.value = !1)
              }, "Small", 8, qa),
              x("button", {
                "aria-pressed": i.value,
                onClick: v[2] || (v[2] = (C) => i.value = !0)
              }, "Large", 8, za)
            ]),
            v[28] || (v[28] = x("span", { class: "sg-header-spacer" }, null, -1)),
            x("span", null, D(s.checked.size) + " selected", 1),
            x("button", {
              class: "sg-primary",
              disabled: s.images.length < 2,
              "data-action": "compare",
              onClick: U
            }, " Compare selected ", 8, Ga)
          ]),
          s.images.length ? (F(), ks(da, {
            key: 0,
            ref_key: "grid",
            ref: I,
            images: s.images,
            checked: s.checked,
            pinned: s.pinned,
            large: i.value,
            api: e.api,
            "has-more": He.value,
            "initial-scroll": P.value.scroll,
            onPosition: v[3] || (v[3] = (C) => P.value = C),
            onView: T,
            onPin: E,
            onCheck: b,
            onMore: v[4] || (v[4] = (C) => ke(S).loadMore())
          }, null, 8, ["images", "checked", "pinned", "large", "api", "has-more", "initial-scroll"])) : (F(), N("div", Ja, [
            v[29] || (v[29] = x("span", { class: "sg-empty-icon" }, "▧", -1)),
            x("h2", null, D(xt.value || G.value ? "Opening your output…" : "No images in this folder"), 1),
            v[30] || (v[30] = x("p", null, " Images stay in their original folder. Gallery never deletes or changes them. ", -1))
          ])),
          x("footer", Ya, [
            v[31] || (v[31] = x("span", null, "Click an image to inspect · check images to compare · Pin keeps the left image fixed", -1)),
            x("button", {
              onClick: v[5] || (v[5] = (C) => I.value?.top())
            }, "↑ Newest")
          ])
        ], 64)) : (F(), N(ee, { key: 2 }, [
          x("div", Xa, [
            s.mode === "compare" ? (F(), N(ee, { key: 0 }, [
              x("label", Qa, [
                v[32] || (v[32] = Ie("Reference ", -1)),
                x("select", {
                  "aria-label": "Reference image",
                  value: s.leftId,
                  onChange: v[6] || (v[6] = (C) => E(C.target.value))
                }, [
                  (F(!0), N(ee, null, $e(qs.value, (C) => (F(), N("option", {
                    key: C.id,
                    value: C.id
                  }, D(C.name) + D(s.pinned.has(C.id) ? " · pinned" : " · checked"), 9, ec))), 128))
                ], 40, Za)
              ]),
              x("label", null, [
                v[35] || (v[35] = Ie("Candidates ", -1)),
                wl(x("select", {
                  "onUpdate:modelValue": v[7] || (v[7] = (C) => s.scope = C),
                  "aria-label": "Candidate range",
                  onChange: V
                }, [
                  v[33] || (v[33] = x("option", { value: "folder" }, "This folder", -1)),
                  v[34] || (v[34] = x("option", { value: "checked" }, "Checked images", -1)),
                  s.scope === "prompt" ? (F(), N("option", tc, " Matching saved text ")) : re("", !0)
                ], 544), [
                  [Po, s.scope]
                ])
              ])
            ], 64)) : (F(), N("button", {
              key: 1,
              "data-action": "pin",
              class: "sg-primary",
              onClick: v[8] || (v[8] = (C) => s.currentId && E(s.currentId))
            }, " Pin as reference")),
            x("button", {
              "data-action": "previous",
              "aria-label": "Previous image",
              disabled: Me.value <= 0,
              onClick: v[9] || (v[9] = (C) => ke(on)(s, -1))
            }, " ← Previous", 8, sc),
            x("span", nc, D(Me.value < 0 ? "—" : Me.value + 1) + " / " + D(Re.value.length) + D(He.value ? "+" : ""), 1),
            x("button", {
              "data-action": "next",
              "aria-label": "Next image",
              disabled: Me.value < 0 || Me.value >= Re.value.length - 1,
              onClick: v[10] || (v[10] = (C) => ke(on)(s, 1))
            }, " Next →", 8, ic),
            v[37] || (v[37] = x("span", { class: "sg-header-spacer" }, null, -1)),
            s.mode === "compare" ? (F(), N("label", rc, [
              x("input", {
                type: "checkbox",
                "aria-label": "Link zoom and pan",
                checked: s.linked,
                onChange: v[11] || (v[11] = (C) => ke(Wo)(s, C.target.checked))
              }, null, 40, lc),
              v[36] || (v[36] = Ie(" Link zoom / pan", -1))
            ])) : re("", !0),
            s.mode === "single" ? (F(), N("button", {
              key: 3,
              "data-action": "candidates",
              "aria-expanded": r.value,
              onClick: v[12] || (v[12] = (C) => r.value = !r.value)
            }, D(r.value ? "Hide candidates" : "Show candidates"), 9, oc)) : re("", !0),
            s.mode === "single" && !r.value && He.value ? (F(), N("button", {
              key: 4,
              onClick: v[13] || (v[13] = (C) => ke(S).loadMore())
            }, "Load more")) : re("", !0),
            x("button", { onClick: te }, "Fit"),
            x("button", {
              "aria-pressed": s.panel,
              "data-action": "settings",
              onClick: v[14] || (v[14] = (C) => s.panel = !s.panel)
            }, D(s.mode === "compare" ? "Differences" : "Settings"), 9, ac)
          ]),
          x("div", {
            ref_key: "viewer",
            ref: h,
            class: "sg-view-body",
            role: "region",
            "aria-label": s.mode === "compare" ? "Image comparison" : "Image viewer",
            tabindex: "-1"
          }, [
            x("div", {
              class: Ye(["sg-image-pair", { "sg-single": s.mode === "single" }])
            }, [
              s.mode === "compare" ? (F(), ks(bi, {
                key: 0,
                ref_key: "leftPane",
                ref: p,
                image: ye.value,
                unavailable: !!s.leftId && s.unavailable.has(s.leftId),
                api: e.api,
                side: "left",
                transform: s.transforms.left,
                models: ps.value,
                "model-status": dt(Ve.value),
                onOriginal: v[15] || (v[15] = (C) => z("left")),
                onTransform: v[16] || (v[16] = (C) => ke(Gt)(s, "left", C))
              }, null, 8, ["image", "unavailable", "api", "transform", "models", "model-status"])) : re("", !0),
              Ee(bi, {
                ref_key: "rightPane",
                ref: g,
                image: Ce.value,
                unavailable: !!Ce.value && s.unavailable.has(Ce.value.id),
                api: e.api,
                side: "right",
                transform: s.transforms.right,
                models: gs.value,
                "model-status": dt(we.value),
                onOriginal: v[17] || (v[17] = (C) => z("right")),
                onTransform: v[18] || (v[18] = (C) => ke(Gt)(s, "right", C))
              }, null, 8, ["image", "unavailable", "api", "transform", "models", "model-status"])
            ], 2),
            s.panel ? (F(), ks(Fa, {
              key: 0,
              left: Ve.value,
              right: we.value,
              compare: s.mode === "compare",
              "manual-matches": s.manualMatches,
              loading: !we.value || s.mode === "compare" && !Ve.value,
              onClose: v[19] || (v[19] = (C) => s.panel = !1),
              onMatch: ue,
              onRetry: Q
            }, null, 8, ["left", "right", "compare", "manual-matches", "loading"])) : re("", !0)
          ], 8, cc),
          s.mode === "compare" || r.value ? (F(), N("div", uc, [
            x("div", {
              ref_key: "candidateRow",
              ref: R,
              class: "sg-candidates",
              "aria-label": "Image candidates"
            }, [
              (F(!0), N(ee, null, $e(Lt.value, (C) => (F(), N("button", {
                key: C.id,
                class: Ye(["sg-candidate", {
                  "sg-current": C.id === (s.mode === "single" ? s.currentId : s.rightId)
                }]),
                "aria-label": "Choose " + C.name,
                "aria-pressed": C.id === (s.mode === "single" ? s.currentId : s.rightId),
                onClick: (se) => s.mode === "single" ? s.currentId = C.id : s.rightId = C.id
              }, [
                Ee(Ln, {
                  url: e.api.imageURL(C, "thumbnail", 256),
                  alt: C.name,
                  priority: "low"
                }, null, 8, ["url", "alt"])
              ], 10, fc))), 128))
            ], 512),
            He.value ? (F(), N("button", {
              key: 0,
              onClick: v[20] || (v[20] = (C) => ke(S).loadMore())
            }, "Load more")) : re("", !0),
            s.mode === "compare" ? (F(), N("button", {
              key: 1,
              disabled: J.value,
              onClick: he
            }, D(J.value ? "Checking text…" : "Find matching saved text"), 9, dc)) : re("", !0)
          ])) : re("", !0),
          H.value ? (F(), N("p", hc, D(H.value), 1)) : re("", !0),
          x("footer", pc, [
            v[38] || (v[38] = Ie(" Wheel to zoom · drag to pan · double-click to fit · ← → to navigate ", -1)),
            s.mode === "compare" ? (F(), N("span", gc, "· Linking copies the left view; different sizes use normalized image positions.")) : re("", !0)
          ])
        ], 64))
      ], 34)) : re("", !0)
    ], 64));
  }
});
function wi(e, t) {
  const s = new URL(e), n = s.pathname.lastIndexOf("/extensions/");
  if (n < 0)
    throw new Error("Gallery must load from the ComfyUI extensions directory.");
  return s.pathname = s.pathname.slice(0, n) + "/scripts/" + t + ".js", s.search = "", s.hash = "", s.href;
}
class vc {
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
const an = import.meta.url;
async function yc() {
  const [{ app: e }, { api: t }] = await Promise.all([
    import(
      /* @vite-ignore */
      wi(an, "app")
    ),
    import(
      /* @vite-ignore */
      wi(an, "api")
    )
  ]);
  e.registerExtension({
    name: "shiba.gallery",
    setup() {
      if (document.getElementById("shiba-gallery-root")) return;
      const s = document.createElement("link");
      s.rel = "stylesheet", s.href = new URL("./shiba-gallery.css", an).href, s.dataset.shibaGallery = "true", document.head.append(s);
      const n = document.createElement("div");
      n.id = "shiba-gallery-root", document.body.append(n), Uo(mc, { api: new vc(t) }).mount(n);
    }
  });
}
yc().catch(
  () => console.error(
    "[Shiba Gallery] Could not register the gallery extension. Check ComfyUI extension loading and proxy paths."
  )
);
