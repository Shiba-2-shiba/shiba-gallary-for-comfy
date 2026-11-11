// @__NO_SIDE_EFFECTS__
function yn(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const s of e.split(",")) t[s] = 1;
  return (s) => s in t;
}
const oe = {}, Tt = [], $t = () => {
}, wi = () => !1, Ls = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Fs = (e) => e.startsWith("onUpdate:"), Ae = Object.assign, _i = (e, t) => {
  const s = e.indexOf(t);
  s > -1 && e.splice(s, 1);
}, Tr = Object.prototype.hasOwnProperty, se = (e, t) => Tr.call(e, t), q = Array.isArray, yt = (e) => fs(e) === "[object Map]", Ot = (e) => fs(e) === "[object Set]", Fn = (e) => fs(e) === "[object Date]", ne = (e) => typeof e == "function", de = (e) => typeof e == "string", Xe = (e) => typeof e == "symbol", ae = (e) => e !== null && typeof e == "object", xi = (e) => (ae(e) || ne(e)) && ne(e.then) && ne(e.catch), ki = Object.prototype.toString, fs = (e) => ki.call(e), $r = (e) => fs(e).slice(8, -1), Si = (e) => fs(e) === "[object Object]", bn = (e) => de(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Xt = /* @__PURE__ */ yn(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Ns = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((s) => t[s] || (t[s] = e(s)));
}, Ar = /-\w/g, Fe = /* @__PURE__ */ Ns((e) => e.replace(Ar, (t) => t.slice(1).toUpperCase())), Er = /\B([A-Z])/g, Rt = /* @__PURE__ */ Ns(
  (e) => e.replace(Er, "-$1").toLowerCase()
), Ci = /* @__PURE__ */ Ns((e) => e.charAt(0).toUpperCase() + e.slice(1)), qs = /* @__PURE__ */ Ns((e) => e ? `on${Ci(e)}` : ""), Ge = (e, t) => !Object.is(e, t), xs = (e, ...t) => {
  for (let s = 0; s < e.length; s++)
    e[s](...t);
}, Ii = (e, t, s, n = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: n,
    value: s
  });
}, wn = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let Nn;
const js = () => Nn || (Nn = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function bt(e) {
  if (q(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++) {
      const n = e[s], i = de(n) ? Lr(n) : bt(n);
      if (i)
        for (const r in i)
          t[r] = i[r];
    }
    return t;
  } else if (de(e) || ae(e))
    return e;
}
const Or = /;(?![^(]*\))/g, Rr = /:([^]+)/, Pr = /"(?:[^"\\]|\\[^])*"|'(?:[^'\\]|\\[^])*'|\\[^]|\/\*[^]*?\*\//g;
function Lr(e) {
  const t = {};
  return e.replace(Pr, (s) => s.startsWith("/*") ? "" : s).split(Or).forEach((s) => {
    if (s) {
      const n = s.split(Rr);
      n.length > 1 && (t[n[0].trim()] = n[1].trim());
    }
  }), t;
}
function Je(e) {
  let t = "";
  if (de(e))
    t = e;
  else if (q(e))
    for (let s = 0; s < e.length; s++) {
      const n = Je(e[s]);
      n && (t += n + " ");
    }
  else if (ae(e))
    for (const s in e)
      e[s] && (t += s + " ");
  return t.trim();
}
const Fr = "itemscope,allowfullscreen,disablepictureinpicture,disableremoteplayback,formnovalidate,ismap,nomodule,novalidate,playsinline,readonly", Nr = /* @__PURE__ */ yn(Fr);
function Mi(e) {
  return !!e || e === "";
}
function jr(e, t, s) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let i = 0; n && i < e.length; i++)
    n = _t(e[i], t[i], s);
  return n;
}
function jn(e, t, s) {
  if (e.size !== t.size) return !1;
  const n = Array.from(t), i = new Uint8Array(n.length);
  for (const r of e) {
    let l = -1;
    for (let o = 0; o < n.length; o++)
      if (!i[o] && _t(r, n[o], s)) {
        l = o;
        break;
      }
    if (l < 0) return !1;
    i[l] = 1;
  }
  return !0;
}
function Dr(e, t, s) {
  let n = yt(e), i = yt(t);
  if (n || i || (n = Ot(e), i = Ot(t), n || i))
    return n && i ? jn(e, t, s) : !1;
  const r = Object.keys(e).length, l = Object.keys(t).length;
  if (r !== l)
    return !1;
  for (const o in e) {
    const a = e.hasOwnProperty(o), u = t.hasOwnProperty(o);
    if (a && !u || !a && u || !_t(e[o], t[o], s))
      return !1;
  }
  return String(e) === String(t);
}
function Dn(e, t, s, n) {
  s || (s = [/* @__PURE__ */ new Map(), /* @__PURE__ */ new Map()]);
  const [i, r] = s;
  if (i.has(e) || r.has(t))
    return i.get(e) === t && r.get(t) === e;
  i.set(e, t), r.set(t, e);
  const l = n(e, t, s);
  return i.delete(e), r.delete(t), l;
}
function _t(e, t, s) {
  if (e === t) return !0;
  let n = Fn(e), i = Fn(t);
  return n || i ? n && i ? e.getTime() === t.getTime() : !1 : (n = Xe(e), i = Xe(t), n || i ? e === t : (n = q(e), i = q(t), n || i ? n && i ? Dn(e, t, s, jr) : !1 : (n = ae(e), i = ae(t), n || i ? !n || !i ? !1 : Dn(e, t, s, Dr) : String(e) === String(t))));
}
function Ur(e, t) {
  return e.findIndex((s) => _t(s, t));
}
const Ti = (e) => !!(e && e.__v_isRef === !0), U = (e) => de(e) ? e : e == null ? "" : q(e) || ae(e) && (e.toString === ki || !ne(e.toString)) ? Ti(e) ? U(e.value) : JSON.stringify(e, $i, 2) : String(e), $i = (e, t) => Ti(t) ? $i(e, t.value) : yt(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (s, [n, i], r) => (s[zs(n, r) + " =>"] = i, s),
    {}
  )
} : Ot(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((s) => zs(s))
} : Xe(t) ? zs(t) : ae(t) && !q(t) && !Si(t) ? String(t) : t, zs = (e, t = "") => {
  var s;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    Xe(e) ? `Symbol(${(s = e.description) != null ? s : t})` : e
  );
};
let me;
class Kr {
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
function Hr() {
  return me;
}
let re;
const Gs = /* @__PURE__ */ new WeakSet();
class Ai {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, me && (me.active ? me.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Gs.has(this) && (Gs.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Oi(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Un(this), Ri(this);
    const t = re, s = Ne;
    re = this, Ne = !0;
    try {
      return this.fn();
    } finally {
      Pi(this), re = t, Ne = s, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        kn(t);
      this.deps = this.depsTail = void 0, Un(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Gs.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    an(this) && this.run();
  }
  get dirty() {
    return an(this);
  }
}
let Ei = 0, Qt, Zt;
function Oi(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Zt, Zt = e;
    return;
  }
  e.next = Qt, Qt = e;
}
function _n() {
  Ei++;
}
function xn() {
  if (--Ei > 0)
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
function Ri(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Pi(e) {
  let t, s = e.depsTail, n = s;
  for (; n; ) {
    const i = n.prevDep;
    n.version === -1 ? (n === s && (s = i), kn(n), Vr(n)) : t = n, n.dep.activeLink = n.prevActiveLink, n.prevActiveLink = void 0, n = i;
  }
  e.deps = t, e.depsTail = s;
}
function an(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Li(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Li(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === rs) || (e.globalVersion = rs, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !an(e))))
    return;
  e.flags |= 2;
  const t = e.dep, s = re, n = Ne;
  re = e, Ne = !0;
  try {
    Ri(e);
    const i = e.fn(e._value);
    (t.version === 0 || Ge(i, e._value)) && (e.flags |= 128, e._value = i, t.version++);
  } catch (i) {
    throw t.version++, i;
  } finally {
    re = s, Ne = n, Pi(e), e.flags &= -3;
  }
}
function kn(e, t = !1) {
  const { dep: s, prevSub: n, nextSub: i } = e;
  if (n && (n.nextSub = i, e.prevSub = void 0), i && (i.prevSub = n, e.nextSub = void 0), s.subs === e && (s.subs = n, !n && s.computed)) {
    s.computed.flags &= -5;
    for (let r = s.computed.deps; r; r = r.nextDep)
      kn(r, !0);
  }
  !t && !--s.sc && s.map && s.map.delete(s.key);
}
function Vr(e) {
  const { prevDep: t, nextDep: s } = e;
  t && (t.nextDep = s, e.prevDep = void 0), s && (s.prevDep = t, e.nextDep = void 0);
}
let Ne = !0;
const Fi = [];
function ut() {
  Fi.push(Ne), Ne = !1;
}
function ft() {
  const e = Fi.pop();
  Ne = e === void 0 ? !0 : e;
}
function Un(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const s = re;
    re = void 0;
    try {
      t();
    } finally {
      re = s;
    }
  }
}
let rs = 0;
class Br {
  constructor(t, s) {
    this.sub = t, this.dep = s, this.version = s.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Sn {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!re || !Ne || re === this.computed)
      return;
    let s = this.activeLink;
    if (s === void 0 || s.sub !== re)
      s = this.activeLink = new Br(re, this), re.deps ? (s.prevDep = re.depsTail, re.depsTail.nextDep = s, re.depsTail = s) : re.deps = re.depsTail = s, Ni(s);
    else if (s.version === -1 && (s.version = this.version, s.nextDep)) {
      const n = s.nextDep;
      n.prevDep = s.prevDep, s.prevDep && (s.prevDep.nextDep = n), s.prevDep = re.depsTail, s.nextDep = void 0, re.depsTail.nextDep = s, re.depsTail = s, re.deps === s && (re.deps = n);
    }
    return s;
  }
  trigger(t) {
    this.version++, rs++, this.notify(t);
  }
  notify(t) {
    _n();
    try {
      for (let s = this.subs; s; s = s.prevSub)
        s.sub.notify() && s.sub.dep.notify();
    } finally {
      xn();
    }
  }
}
function Ni(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let n = t.deps; n; n = n.nextDep)
        Ni(n);
    }
    const s = e.dep.subs;
    s !== e && (e.prevSub = s, s && (s.nextSub = e)), e.dep.subs = e;
  }
}
const cn = /* @__PURE__ */ new WeakMap(), At = /* @__PURE__ */ Symbol(
  ""
), un = /* @__PURE__ */ Symbol(
  ""
), ls = /* @__PURE__ */ Symbol(
  ""
);
function _e(e, t, s) {
  if (Ne && re) {
    let n = cn.get(e);
    n || cn.set(e, n = /* @__PURE__ */ new Map());
    let i = n.get(s);
    i || (n.set(s, i = new Sn()), i.map = n, i.key = s), i.track();
  }
}
function at(e, t, s, n, i, r) {
  const l = cn.get(e);
  if (!l) {
    rs++;
    return;
  }
  const o = (a) => {
    a && a.trigger();
  };
  if (_n(), t === "clear")
    l.forEach(o);
  else {
    const a = q(e), u = a && bn(s);
    if (a && s === "length") {
      const f = Number(n);
      l.forEach((h, p) => {
        (p === "length" || p === ls || !Xe(p) && p >= f) && o(h);
      });
    } else
      switch ((s !== void 0 || l.has(void 0)) && o(l.get(s)), u && o(l.get(ls)), t) {
        case "add":
          a ? u && o(l.get("length")) : (o(l.get(At)), yt(e) && o(l.get(un)));
          break;
        case "delete":
          a || (o(l.get(At)), yt(e) && o(l.get(un)));
          break;
        case "set":
          yt(e) && o(l.get(At));
          break;
      }
  }
  xn();
}
function Lt(e) {
  const t = /* @__PURE__ */ Q(e);
  return t === e || (_e(t, "iterate", ls), /* @__PURE__ */ Oe(e)) ? t : /* @__PURE__ */ Qe(e) ? /* @__PURE__ */ wt(e) ? t.map((s) => xt(Re(s))) : t.map(xt) : t.map(Re);
}
function Ds(e) {
  return _e(e = /* @__PURE__ */ Q(e), "iterate", ls), e;
}
function We(e, t) {
  return /* @__PURE__ */ Qe(e) ? xt(/* @__PURE__ */ wt(e) ? Re(t) : t) : Re(t);
}
const Wr = {
  __proto__: null,
  [Symbol.iterator]() {
    return Js(this, Symbol.iterator, (e) => We(this, e));
  },
  concat(...e) {
    return Lt(this).concat(
      ...e.map((t) => q(t) ? Lt(t) : t)
    );
  },
  entries() {
    return Js(this, "entries", (e) => (e[1] = We(this, e[1]), e));
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
      (s) => s.map((n) => We(this, n)),
      arguments
    );
  },
  find(e, t) {
    return st(
      this,
      "find",
      e,
      t,
      (s) => We(this, s),
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
      (s) => We(this, s),
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
    return Ys(this, "includes", e);
  },
  indexOf(...e) {
    return Ys(this, "indexOf", e);
  },
  join(e) {
    return Lt(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return Ys(this, "lastIndexOf", e);
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
    return Hn(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return Hn(this, "reduceRight", e, t);
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
    return Lt(this).toReversed();
  },
  toSorted(e) {
    return Lt(this).toSorted(e);
  },
  toSpliced(...e) {
    return Lt(this).toSpliced(...e);
  },
  unshift(...e) {
    return qt(this, "unshift", e);
  },
  values() {
    return Js(this, "values", (e) => We(this, e));
  }
};
function Js(e, t, s) {
  const n = Ds(e), i = n[t], r = i.call(n);
  if (n !== e && !/* @__PURE__ */ Oe(e)) {
    if (r[Symbol.toStringTag] === "Array Iterator") {
      const l = Object.create(Object.getPrototypeOf(r));
      return l.next = () => Kn(r.next(), s), i !== ji[t] && Object.defineProperties(l, {
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
    r._next = r.next, r.next = () => Kn(r._next(), s);
  }
  return r;
}
function Kn(e, t) {
  return e.done || (e.value = t(e.value)), e;
}
const ji = Array.prototype;
function st(e, t, s, n, i, r) {
  const l = Ds(e), o = l !== e && !/* @__PURE__ */ Oe(e), a = l[t];
  if (a !== ji[t]) {
    const h = a.apply(e, r);
    return o ? Re(h) : h;
  }
  let u = s;
  l !== e && (o ? u = function(h, p) {
    return s.call(this, We(e, h), p, e);
  } : s.length > 2 && (u = function(h, p) {
    return s.call(this, h, p, e);
  }));
  const f = a.call(l, u, n);
  return o && i ? i(f) : f;
}
function Hn(e, t, s, n) {
  const i = Ds(e), r = i !== e && !/* @__PURE__ */ Oe(e);
  let l = s, o = !1;
  i !== e && (r ? (o = n.length === 0, l = function(u, f, h) {
    return o && (o = !1, u = We(e, u)), s.call(this, u, We(e, f), h, e);
  }) : s.length > 3 && (l = function(u, f, h) {
    return s.call(this, u, f, h, e);
  }));
  const a = i[t](l, ...n);
  return o ? We(e, a) : a;
}
function Ys(e, t, s) {
  const n = /* @__PURE__ */ Q(e);
  _e(n, "iterate", ls);
  const i = n[t](...s);
  return (i === -1 || i === !1) && /* @__PURE__ */ Mn(s[0]) ? (s[0] = /* @__PURE__ */ Q(s[0]), n[t](...s)) : i;
}
function qt(e, t, s = []) {
  ut(), _n();
  const n = (/* @__PURE__ */ Q(e))[t].apply(e, s);
  return xn(), ft(), n;
}
const qr = /* @__PURE__ */ yn("__proto__,__v_isRef,__isVue"), Di = /* @__PURE__ */ new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Xe)
);
function zr(e) {
  Xe(e) || (e = String(e));
  const t = /* @__PURE__ */ Q(this);
  return _e(t, "has", e), t.hasOwnProperty(e);
}
class Ui {
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
      return n === (i ? r ? nl : Bi : r ? Vi : Hi).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(n) ? t : void 0;
    const l = q(t);
    if (!i) {
      let a;
      if (l && (a = Wr[s]))
        return a;
      if (s === "hasOwnProperty")
        return zr;
    }
    const o = Reflect.get(
      t,
      s,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ ge(t) ? t : n
    );
    if ((Xe(s) ? Di.has(s) : qr(s)) || (i || _e(t, "get", s), r))
      return o;
    if (/* @__PURE__ */ ge(o)) {
      const a = l && bn(s) ? o : o.value;
      return i && ae(a) ? /* @__PURE__ */ dn(a) : a;
    }
    return ae(o) ? i ? /* @__PURE__ */ dn(o) : /* @__PURE__ */ Is(o) : o;
  }
}
class Ki extends Ui {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, s, n, i) {
    let r = t[s];
    const l = q(t) && bn(s);
    if (!this._isShallow) {
      const u = /* @__PURE__ */ Qe(r);
      if (!/* @__PURE__ */ Oe(n) && !/* @__PURE__ */ Qe(n) && (r = /* @__PURE__ */ Q(r), n = /* @__PURE__ */ Q(n)), !l && /* @__PURE__ */ ge(r) && !/* @__PURE__ */ ge(n))
        return u || (r.value = n), !0;
    }
    const o = l ? Number(s) < t.length : se(t, s), a = Reflect.set(
      t,
      s,
      n,
      /* @__PURE__ */ ge(t) ? t : i
    );
    return t === /* @__PURE__ */ Q(i) && a && (o ? Ge(n, r) && at(t, "set", s, n) : at(t, "add", s, n)), a;
  }
  deleteProperty(t, s) {
    const n = se(t, s);
    t[s];
    const i = Reflect.deleteProperty(t, s);
    return i && n && at(t, "delete", s, void 0), i;
  }
  has(t, s) {
    const n = Reflect.has(t, s);
    return (!Xe(s) || !Di.has(s)) && _e(t, "has", s), n;
  }
  ownKeys(t) {
    return _e(
      t,
      "iterate",
      q(t) ? "length" : At
    ), Reflect.ownKeys(t);
  }
}
class Gr extends Ui {
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
const Jr = /* @__PURE__ */ new Ki(), Yr = /* @__PURE__ */ new Gr(), Xr = /* @__PURE__ */ new Ki(!0);
const fn = (e) => e, ms = (e) => Reflect.getPrototypeOf(e);
function Qr(e, t, s) {
  return function(...n) {
    const i = this.__v_raw, r = /* @__PURE__ */ Q(i), l = yt(r), o = e === "entries" || e === Symbol.iterator && l, a = e === "keys" && l, u = i[e](...n), f = s ? fn : t ? xt : Re;
    return !t && _e(
      r,
      "iterate",
      a ? un : At
    ), Ae(
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
function Zr(e, t) {
  const s = {
    get(i) {
      const r = this.__v_raw, l = /* @__PURE__ */ Q(r), o = /* @__PURE__ */ Q(i);
      e || (Ge(i, o) && _e(l, "get", i), _e(l, "get", o));
      const { has: a } = ms(l), u = t ? fn : e ? xt : Re;
      if (a.call(l, i))
        return u(r.get(i));
      if (a.call(l, o))
        return u(r.get(o));
      r !== l && r.get(i);
    },
    get size() {
      const i = this.__v_raw;
      return !e && _e(/* @__PURE__ */ Q(i), "iterate", At), i.size;
    },
    has(i) {
      const r = this.__v_raw, l = /* @__PURE__ */ Q(r), o = /* @__PURE__ */ Q(i);
      return e || (Ge(i, o) && _e(l, "has", i), _e(l, "has", o)), i === o ? r.has(i) : r.has(i) || r.has(o);
    },
    forEach(i, r) {
      const l = this, o = l.__v_raw, a = /* @__PURE__ */ Q(o), u = t ? fn : e ? xt : Re;
      return !e && _e(a, "iterate", At), o.forEach((f, h) => i.call(r, u(f), u(h), l));
    }
  };
  return Ae(
    s,
    e ? {
      add: vs("add"),
      set: vs("set"),
      delete: vs("delete"),
      clear: vs("clear")
    } : {
      add(i) {
        const r = /* @__PURE__ */ Q(this), l = ms(r), o = /* @__PURE__ */ Q(i), a = !t && !/* @__PURE__ */ Oe(i) && !/* @__PURE__ */ Qe(i) ? o : i;
        return l.has.call(r, a) || Ge(i, a) && l.has.call(r, i) || Ge(o, a) && l.has.call(r, o) || (r.add(a), at(r, "add", a, a)), this;
      },
      set(i, r) {
        !t && !/* @__PURE__ */ Oe(r) && !/* @__PURE__ */ Qe(r) && (r = /* @__PURE__ */ Q(r));
        const l = /* @__PURE__ */ Q(this), { has: o, get: a } = ms(l);
        let u = o.call(l, i);
        u || (i = /* @__PURE__ */ Q(i), u = o.call(l, i));
        const f = a.call(l, i);
        return l.set(i, r), u ? Ge(r, f) && at(l, "set", i, r) : at(l, "add", i, r), this;
      },
      delete(i) {
        const r = /* @__PURE__ */ Q(this), { has: l, get: o } = ms(r);
        let a = l.call(r, i);
        a || (i = /* @__PURE__ */ Q(i), a = l.call(r, i)), o && o.call(r, i);
        const u = r.delete(i);
        return a && at(r, "delete", i, void 0), u;
      },
      clear() {
        const i = /* @__PURE__ */ Q(this), r = i.size !== 0, l = i.clear();
        return r && at(
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
    s[i] = Qr(i, e, t);
  }), s;
}
function Cn(e, t) {
  const s = Zr(e, t);
  return (n, i, r) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_isShallow" ? t : i === "__v_raw" ? n : Reflect.get(
    se(s, i) && i in n ? s : n,
    i,
    r
  );
}
const el = {
  get: /* @__PURE__ */ Cn(!1, !1)
}, tl = {
  get: /* @__PURE__ */ Cn(!1, !0)
}, sl = {
  get: /* @__PURE__ */ Cn(!0, !1)
};
const Hi = /* @__PURE__ */ new WeakMap(), Vi = /* @__PURE__ */ new WeakMap(), Bi = /* @__PURE__ */ new WeakMap(), nl = /* @__PURE__ */ new WeakMap();
function il(e) {
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
  return /* @__PURE__ */ Qe(e) ? e : In(
    e,
    !1,
    Jr,
    el,
    Hi
  );
}
// @__NO_SIDE_EFFECTS__
function rl(e) {
  return In(
    e,
    !1,
    Xr,
    tl,
    Vi
  );
}
// @__NO_SIDE_EFFECTS__
function dn(e) {
  return In(
    e,
    !0,
    Yr,
    sl,
    Bi
  );
}
function In(e, t, s, n, i) {
  if (!ae(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e))
    return e;
  const r = i.get(e);
  if (r)
    return r;
  const l = il($r(e));
  if (l === 0)
    return e;
  const o = new Proxy(
    e,
    l === 2 ? n : s
  );
  return i.set(e, o), o;
}
// @__NO_SIDE_EFFECTS__
function wt(e) {
  return /* @__PURE__ */ Qe(e) ? /* @__PURE__ */ wt(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function Qe(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Oe(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function Mn(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function Q(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ Q(t) : e;
}
function ll(e) {
  return !se(e, "__v_skip") && Object.isExtensible(e) && Ii(e, "__v_skip", !0), e;
}
const Re = (e) => ae(e) ? /* @__PURE__ */ Is(e) : e, xt = (e) => ae(e) ? /* @__PURE__ */ dn(e) : e;
// @__NO_SIDE_EFFECTS__
function ge(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function Y(e) {
  return ol(e, !1);
}
function ol(e, t) {
  return /* @__PURE__ */ ge(e) ? e : new al(e, t);
}
class al {
  constructor(t, s) {
    this.dep = new Sn(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = s ? t : /* @__PURE__ */ Q(t), this._value = s ? t : Re(t), this.__v_isShallow = s;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const s = this._rawValue, n = this.__v_isShallow || /* @__PURE__ */ Oe(t) || /* @__PURE__ */ Qe(t);
    t = n ? t : /* @__PURE__ */ Q(t), Ge(t, s) && (this._rawValue = t, this._value = n ? t : Re(t), this.dep.trigger());
  }
}
function ke(e) {
  return /* @__PURE__ */ ge(e) ? e.value : e;
}
const cl = {
  get: (e, t, s) => t === "__v_raw" ? e : ke(Reflect.get(e, t, s)),
  set: (e, t, s, n) => {
    const i = e[t];
    return /* @__PURE__ */ ge(i) && !/* @__PURE__ */ ge(s) ? (i.value = s, !0) : Reflect.set(e, t, s, n);
  }
};
function Wi(e) {
  return /* @__PURE__ */ wt(e) ? e : new Proxy(e, cl);
}
class ul {
  constructor(t, s, n) {
    this.fn = t, this.setter = s, this._value = void 0, this.dep = new Sn(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = rs - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !s, this.isSSR = n;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    re !== this)
      return Oi(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return Li(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function fl(e, t, s = !1) {
  let n, i;
  return ne(e) ? n = e : (n = e.get, i = e.set), new ul(n, i, s);
}
const ys = {}, Ms = /* @__PURE__ */ new WeakMap();
let Mt;
function dl(e, t = !1, s = Mt) {
  if (s) {
    let n = Ms.get(s);
    n || Ms.set(s, n = []), n.push(e);
  }
}
function hl(e, t, s = oe) {
  const { immediate: n, deep: i, once: r, scheduler: l, augmentJob: o, call: a } = s, u = (I) => i ? I : /* @__PURE__ */ Oe(I) || i === !1 || i === 0 ? ct(I, 1) : ct(I);
  let f, h, p, g, P = !1, S = !1;
  if (/* @__PURE__ */ ge(e) ? (h = () => e.value, P = /* @__PURE__ */ Oe(e)) : /* @__PURE__ */ wt(e) ? (h = () => u(e), P = !0) : q(e) ? (S = !0, P = e.some((I) => /* @__PURE__ */ wt(I) || /* @__PURE__ */ Oe(I)), h = () => e.map((I) => {
    if (/* @__PURE__ */ ge(I))
      return I.value;
    if (/* @__PURE__ */ wt(I))
      return u(I);
    if (ne(I))
      return a ? a(I, 2) : I();
  })) : ne(e) ? t ? h = a ? () => a(e, 2) : e : h = () => {
    if (p) {
      ut();
      try {
        p();
      } finally {
        ft();
      }
    }
    const I = Mt;
    Mt = f;
    try {
      return a ? a(e, 3, [g]) : e(g);
    } finally {
      Mt = I;
    }
  } : h = $t, t && i) {
    const I = h, H = i === !0 ? 1 / 0 : i;
    h = () => ct(I(), H);
  }
  const F = Hr(), O = () => {
    f.stop(), F && F.active && _i(F.effects, f);
  };
  if (r && t) {
    const I = t;
    t = (...H) => {
      try {
        return I(...H);
      } finally {
        O();
      }
    };
  }
  let M = S ? new Array(e.length).fill(ys) : ys;
  const C = (I) => {
    if (!(!(f.flags & 1) || !f.dirty && !I))
      if (t) {
        const H = f.run();
        if (I || i || P || (S ? H.some((le, z) => Ge(le, M[z])) : Ge(H, M))) {
          const le = Mt;
          ut();
          try {
            p && p(), Mt = f;
            const z = [
              H,
              // pass undefined as the old value when it's changed for the first time
              M === ys ? void 0 : S && M[0] === ys ? [] : M,
              g
            ];
            M = H, a ? a(t, 3, z) : (
              // @ts-expect-error
              t(...z)
            );
          } finally {
            Mt = le, ft();
          }
        }
      } else
        f.run();
  };
  return o && o(C), f = new Ai(h), f.scheduler = l ? () => l(C, !1) : C, g = (I) => dl(I, !1, f), p = f.onStop = () => {
    const I = Ms.get(f);
    if (I) {
      if (a)
        a(I, 4);
      else
        for (const H of I) H();
      Ms.delete(f);
    }
  }, t ? n ? C(!0) : M = f.run() : l ? l(C.bind(null, !0), !0) : f.run(), O.pause = f.pause.bind(f), O.resume = f.resume.bind(f), O.stop = O, O;
}
function ct(e, t = 1 / 0, s) {
  if (t <= 0 || !ae(e) || e.__v_skip || (s = s || /* @__PURE__ */ new Map(), (s.get(e) || 0) >= t))
    return e;
  if (s.set(e, t), t--, /* @__PURE__ */ ge(e))
    ct(e.value, t, s);
  else if (q(e))
    for (let n = 0; n < e.length; n++)
      ct(e[n], t, s);
  else if (Ot(e) || yt(e))
    e.forEach((n) => {
      ct(n, t, s);
    });
  else if (Si(e)) {
    for (const n in e)
      ct(e[n], t, s);
    for (const n of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, n) && ct(e[n], t, s);
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
function Ze(e, t, s, n) {
  if (ne(e)) {
    const i = ds(e, t, s, n);
    return i && xi(i) && i.catch((r) => {
      Us(r, t, s, void 0, !0);
    }), i;
  }
  if (q(e)) {
    const i = [];
    for (let r = 0; r < e.length; r++)
      i.push(Ze(e[r], t, s, n));
    return i;
  }
}
function Us(e, t, s, n = !0, i = !1) {
  const r = t ? t.vnode : null, { errorHandler: l, throwUnhandledErrorInProduction: o } = t && t.appContext.config || oe;
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
      ut(), ds(l, null, 10, [
        e,
        u,
        f
      ]), ft();
      return;
    }
  }
  pl(e, s, r, n, o);
}
function pl(e, t, s, n = !0, i = !1) {
  if (i)
    throw e;
  console.error(e);
}
const Se = [];
let Le = -1;
const qe = [];
let vt = null, Nt = 0;
const qi = /* @__PURE__ */ Promise.resolve();
let Ts = null;
function jt(e) {
  const t = Ts || qi;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function gl(e) {
  let t = Le + 1, s = Se.length;
  for (; t < s; ) {
    const n = t + s >>> 1, i = Se[n], r = os(i);
    r < e || r === e && i.flags & 2 ? t = n + 1 : s = n;
  }
  return t;
}
function Tn(e) {
  if (!(e.flags & 1)) {
    const t = os(e), s = Se[Se.length - 1];
    !s || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= os(s) ? Se.push(e) : Se.splice(gl(t), 0, e), e.flags |= 1, zi();
  }
}
function zi() {
  Ts || (Ts = qi.then(Yi));
}
function ml(e) {
  if (!q(e))
    vt && e.id === -1 ? vt.splice(Nt + 1, 0, e) : e.flags & 1 || (qe.push(e), e.flags |= 1);
  else
    for (let t = 0; t < e.length; t++)
      qe.push(e[t]);
  zi();
}
function Gi(e, t, s, n = Le + 1) {
  for (; n < Se.length; n++) {
    const i = Se[n];
    if (i && i.flags & 2) {
      if (e && i.id !== e.uid || t !== void 0 && !(i.id >= t))
        continue;
      Se.splice(n, 1), n = e ? n - 1 : Le, i.flags & 4 && (i.flags &= -2), i(), i.flags & 4 || (i.flags &= -2);
    }
  }
}
function Ji(e, t, s = 0) {
  if (qe.length) {
    let n = qe, i = 0;
    if (t) {
      n = [];
      for (let l = 0; l < qe.length; l++) {
        const o = qe[l];
        (o.i !== void 0 ? !o.i || o.i.uid < s : t.has(o)) ? qe[i++] = o : n.push(o);
      }
    }
    const r = [...new Set(n)].sort((l, o) => os(l) - os(o));
    if (qe.length = i, vt) {
      for (let l = 0; l < r.length; l++)
        vt.push(r[l]);
      return;
    }
    for (vt = r, Nt = 0; Nt < vt.length; Nt++) {
      const l = vt[Nt];
      l.flags & 4 && (l.flags &= -2), l.flags & 8 || l(), l.flags &= -2;
    }
    vt = null, Nt = 0;
  }
}
let Xs = !1;
function vl(e, t) {
  if (Xs) {
    e();
    return;
  }
  const s = t === void 0 ? void 0 : new Set(qe);
  e(), Xs = !0;
  try {
    Gi(void 0, t), Ji(void 0, s, t);
  } finally {
    Xs = !1;
  }
}
const os = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Yi(e) {
  try {
    for (Le = 0; Le < Se.length; Le++) {
      const t = Se[Le];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), ds(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; Le < Se.length; Le++) {
      const t = Se[Le];
      t && (t.flags &= -2);
    }
    Le = -1, Se.length = 0, Ji(), Ts = null, (Se.length || qe.length) && Yi();
  }
}
let Ee = null, Xi = null;
function $s(e) {
  const t = Ee;
  return Ee = e, Xi = e && e.type.__scopeId || null, t;
}
function yl(e, t = Ee, s) {
  if (!t || e._n)
    return e;
  const n = (...i) => {
    n._d && Jn(-1);
    const r = $s(t), l = Et.length;
    let o;
    try {
      o = e(...i);
    } finally {
      for (let a = Et.length; a > l; a--) pr();
      $s(r), n._d && Jn(1);
    }
    return o;
  };
  return n._n = !0, n._c = !0, n._d = !0, n;
}
function bl(e, t) {
  if (Ee === null)
    return e;
  const s = Ws(Ee), n = e.dirs || (e.dirs = []);
  for (let i = 0; i < t.length; i++) {
    let [r, l, o, a = oe] = t[i];
    r && (ne(r) && (r = {
      mounted: r,
      updated: r
    }), r.deep && ct(l), n.push({
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
    l ? a.oldValue = l[o].value : n === "mounted" && a.oldValue !== void 0 && (a = Ae({}, a, { oldValue: void 0 }));
    let u = a.dir[n];
    u && (ut(), Ze(u, s, 8, [
      e.el,
      a,
      i,
      t
    ]), ft());
  }
}
function wl(e, t, s = !1) {
  const n = no();
  if (n || Dt) {
    let i = Dt ? Dt._context.provides : n ? n.parent == null || n.ce ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides : void 0;
    if (i && e in i)
      return i[e];
    if (arguments.length > 1)
      return s && ne(t) ? t.call(n && n.proxy) : t;
  }
}
const _l = /* @__PURE__ */ Symbol.for("v-scx"), xl = () => wl(_l);
function rt(e, t, s) {
  return kl(e, t, s);
}
function kl(e, t, s = oe) {
  const { immediate: n, deep: i, flush: r, once: l } = s, o = Ae({}, s), a = t && n || !t && r !== "post";
  let u;
  if (us) {
    if (r === "sync") {
      const g = xl();
      u = g.__watcherHandles || (g.__watcherHandles = []);
    } else if (!a) {
      const g = () => {
      };
      return g.stop = $t, g.resume = $t, g.pause = $t, g;
    }
  }
  const f = kt;
  o.call = (g, P, S) => Ze(g, f, P, S);
  let h = !1;
  r === "post" ? o.scheduler = (g) => {
    g.i = f, xe(g, f && f.suspense);
  } : r !== "sync" && (h = !0, o.scheduler = (g, P) => {
    P ? g() : Tn(g);
  }), o.augmentJob = (g) => {
    t && (g.flags |= 4), h && (g.flags |= 2, f && (g.id = f.uid, g.i = f));
  };
  const p = hl(e, t, o);
  return us && (u ? u.push(p) : a && p()), p;
}
const Sl = /* @__PURE__ */ Symbol("_vte"), Ks = (e) => e.__isTeleport, Qs = /* @__PURE__ */ Symbol("_leaveCb");
function Cl(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const s of e)
      if (s.type !== je) {
        t = s;
        break;
      }
  }
  return t;
}
function Qi(e) {
  if (!Zi(e))
    return Ks(e.type) && e.children ? Cl(e.children) : e;
  if (e.component)
    return e.component.subTree;
  const { shapeFlag: t, children: s } = e;
  if (s) {
    if (t & 16)
      return s[0];
    if (t & 32 && ne(s.default))
      return s.default();
  }
}
function es(e, t) {
  if (e.shapeFlag & 6 && e.component) {
    e.transition = t;
    const s = e.component.subTree;
    es(
      Ks(s.type) && Qi(s) || s,
      t
    );
  } else if (e.shapeFlag & 128) {
    const s = e.suspense;
    if (s) {
      const n = s.isHydrating ? s.pendingBranch : s.activeBranch;
      n && es(n, t.clone(n));
    } else
      e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback);
  } else if (e.transition = t, e.type === Z && q(e.children)) {
    const s = sr(e.children, !1);
    s && es(s, t);
  }
}
function hn(e) {
  if (e.component)
    return hn(e.component.subTree);
  if (e.type === Z) {
    const t = q(e.children) && sr(e.children, !1);
    return t ? hn(t) : void 0;
  }
  if (e.type !== je)
    return e;
}
// @__NO_SIDE_EFFECTS__
function hs(e, t) {
  return ne(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    Ae({ name: e.name }, t, { setup: e })
  ) : e;
}
function Il(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function Vn(e, t) {
  let s;
  return !!((s = Object.getOwnPropertyDescriptor(e, t)) && !s.configurable);
}
const As = /* @__PURE__ */ new WeakMap();
function ts(e, t, s, n, i = !1) {
  if (q(e)) {
    e.forEach(
      (S, F) => ts(
        S,
        t && (q(t) ? t[F] : t),
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
  const r = n.shapeFlag & 4 ? Ws(n.component) : n.el, l = i ? null : r, { i: o, r: a } = e, u = t && t.r, f = o.refs === oe ? o.refs = {} : o.refs, h = o.setupState, p = /* @__PURE__ */ Q(h), g = h === oe ? wi : (S) => Vn(f, S) ? !1 : se(p, S), P = (S, F) => !(F && Vn(f, F));
  if (u != null && u !== a) {
    if (Bn(t), de(u))
      f[u] = null, g(u) && (h[u] = null);
    else if (/* @__PURE__ */ ge(u)) {
      const S = t;
      P(u, S.k) && (u.value = null), S.k && (f[S.k] = null);
    }
  }
  if (ne(a))
    ds(a, o, 12, [l, f]);
  else {
    const S = de(a), F = /* @__PURE__ */ ge(a);
    if (S || F) {
      const O = () => {
        if (e.f) {
          const M = S ? g(a) ? h[a] : f[a] : P() || !e.k ? a.value : f[e.k];
          if (i)
            q(M) && _i(M, r);
          else if (q(M))
            M.includes(r) || M.push(r);
          else if (S)
            f[a] = [r], g(a) && (h[a] = f[a]);
          else {
            const C = [r];
            P(a, e.k) && (a.value = C), e.k && (f[e.k] = C);
          }
        } else S ? (f[a] = l, g(a) && (h[a] = l)) : F && (P(a, e.k) && (a.value = l), e.k && (f[e.k] = l));
      };
      if (l) {
        const M = () => {
          O(), As.delete(e);
        };
        M.id = -1, As.set(e, M), xe(M, s);
      } else
        Bn(e), O();
    }
  }
}
function Bn(e) {
  const t = As.get(e);
  t && (t.flags |= 8, As.delete(e));
}
js().requestIdleCallback;
js().cancelIdleCallback;
const ss = (e) => !!e.type.__asyncLoader, Zi = (e) => e.type.__isKeepAlive;
function Ml(e, t, s = kt, n = !1) {
  if (s) {
    const i = s[e] || (s[e] = []), r = t.__weh || (t.__weh = (...l) => {
      ut();
      const o = Rn(s), a = Ze(t, s, e, l);
      return o(), ft(), a;
    });
    return n ? i.unshift(r) : i.push(r), r;
  }
}
const er = (e) => (t, s = kt) => {
  (!us || e === "sp") && Ml(e, (...n) => t(...n), s);
}, $n = er("m"), Hs = er(
  "bum"
), Tl = /* @__PURE__ */ Symbol.for("v-ndc");
function Me(e, t, s, n) {
  let i;
  const r = s, l = q(e);
  if (l || de(e)) {
    const o = l && /* @__PURE__ */ wt(e);
    let a = !1, u = !1;
    o && (a = !/* @__PURE__ */ Oe(e), u = /* @__PURE__ */ Qe(e), e = Ds(e)), i = new Array(e.length);
    for (let f = 0, h = e.length; f < h; f++)
      i[f] = t(
        a ? u ? xt(Re(e[f])) : Re(e[f]) : e[f],
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
  else if (ae(e))
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
const pn = (e) => e ? yr(e) ? Ws(e) : pn(e.parent) : null, ns = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Ae(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => pn(e.parent),
    $root: (e) => pn(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => e.type,
    $forceUpdate: (e) => e.f || (e.f = () => {
      Tn(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = jt.bind(e.proxy)),
    $watch: (e) => $t
  })
), Zs = (e, t) => e !== oe && !e.__isScriptSetup && se(e, t), $l = {
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
        if (Zs(n, t))
          return l[t] = 1, n[t];
        if (se(r, t))
          return l[t] = 3, r[t];
        if (s !== oe && se(s, t))
          return l[t] = 4, s[t];
        l[t] = 0;
      }
    }
    const u = ns[t];
    let f, h;
    if (u)
      return t === "$attrs" && _e(e.attrs, "get", ""), u(e);
    if (
      // css module (injected by vue-loader)
      (f = o.__cssModules) && (f = f[t])
    )
      return f;
    if (s !== oe && se(s, t))
      return l[t] = 4, s[t];
    if (
      // global properties
      h = a.config.globalProperties, se(h, t)
    )
      return h[t];
  },
  set({ _: e }, t, s) {
    const { data: n, setupState: i, ctx: r } = e;
    return Zs(i, t) ? (i[t] = s, !0) : se(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (r[t] = s, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: s, ctx: n, appContext: i, props: r, type: l }
  }, o) {
    let a;
    return !!(s[o] || Zs(t, o) || se(r, o) || se(n, o) || se(ns, o) || se(i.config.globalProperties, o) || (a = l.__cssModules) && a[o]);
  },
  defineProperty(e, t, s) {
    return s.get != null ? e._.accessCache[t] = 0 : se(s, "value") && this.set(e, t, s.value, null), Reflect.defineProperty(e, t, s);
  }
};
function tr() {
  return {
    app: null,
    config: {
      isNativeTag: wi,
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
let Al = 0;
function El(e, t) {
  return function(n, i = null) {
    ne(n) || (n = Ae({}, n)), i != null && !ae(i) && (i = null);
    const r = tr(), l = /* @__PURE__ */ new WeakSet(), o = [];
    let a = !1;
    const u = r.app = {
      _uid: Al++,
      _component: n,
      _props: i,
      _container: null,
      _context: r,
      _instance: null,
      version: co,
      get config() {
        return r.config;
      },
      set config(f) {
      },
      use(f, ...h) {
        return l.has(f) || (f && ne(f.install) ? (l.add(f), f.install(u, ...h)) : ne(f) && (l.add(f), f(u, ...h))), u;
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
          const g = u._ceVNode || $e(n, i);
          return g.appContext = r, p === !0 ? p = "svg" : p === !1 && (p = void 0), e(g, f, p), a = !0, u._container = f, f.__vue_app__ = u, Ws(g.component);
        }
      },
      onUnmount(f) {
        o.push(f);
      },
      unmount() {
        a && (Ze(
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
const Ol = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Fe(t)}Modifiers`] || e[`${Rt(t)}Modifiers`];
function Rl(e, t, ...s) {
  if (e.isUnmounted) return;
  const n = e.vnode.props || oe;
  let i = s;
  const r = t.startsWith("update:"), l = r && Ol(n, t.slice(7));
  l && (l.trim && (i = s.map((f) => de(f) ? f.trim() : f)), l.number && (i = i.map(wn)));
  let o, a = n[o = qs(t)] || // also try camelCase event handler (#2249)
  n[o = qs(Fe(t))];
  !a && r && (a = n[o = qs(Rt(t))]), a && Ze(
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
    e.emitted[o] = !0, Ze(
      u,
      e,
      6,
      i
    );
  }
}
function Pl(e, t, s = !1) {
  const n = t.emitsCache, i = n.get(e);
  if (i !== void 0)
    return i;
  const r = e.emits;
  let l = {};
  return r ? (q(r) ? r.forEach((o) => l[o] = null) : Ae(l, r), ae(e) && n.set(e, l), l) : (ae(e) && n.set(e, null), null);
}
function Vs(e, t) {
  return !e || !Ls(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), se(e, t[0].toLowerCase() + t.slice(1)) || se(e, Rt(t)) || se(e, t));
}
function Wn(e) {
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
    ctx: P,
    inheritAttrs: S
  } = e, F = $s(e);
  let O, M;
  try {
    if (s.shapeFlag & 4) {
      const I = i || n, H = I;
      O = ze(
        u.call(
          H,
          I,
          f,
          h,
          g,
          p,
          P
        )
      ), M = o;
    } else {
      const I = t;
      O = ze(
        I.length > 1 ? I(
          h,
          { attrs: o, slots: l, emit: a }
        ) : I(
          h,
          null
        )
      ), M = t.props ? o : Ll(o);
    }
  } catch (I) {
    Et.length = 0, Us(I, e, 1), O = $e(je);
  }
  let C = O;
  if (M && S !== !1) {
    const I = Object.keys(M), { shapeFlag: H } = C;
    I.length && H & 7 && (r && I.some(Fs) && (M = Fl(
      M,
      r
    )), C = Ut(C, M, !1, !0));
  }
  if (s.dirs && (C = Ut(C, null, !1, !0), C.dirs = C.dirs ? C.dirs.concat(s.dirs) : s.dirs), s.transition) {
    const I = Ks(C.type) && Qi(C) || C;
    es(I, s.transition);
  }
  return O = C, $s(F), O;
}
function sr(e, t = !0) {
  let s;
  for (let n = 0; n < e.length; n++) {
    const i = e[n];
    if (On(i)) {
      if (i.type !== je || i.children === "v-if") {
        if (s)
          return;
        s = i;
      }
    } else
      return;
  }
  return s;
}
const Ll = (e) => {
  let t;
  for (const s in e)
    (s === "class" || s === "style" || Ls(s)) && ((t || (t = {}))[s] = e[s]);
  return t;
}, Fl = (e, t) => {
  const s = {};
  for (const n in e)
    (!Fs(n) || !(n.slice(9) in t)) && (s[n] = e[n]);
  return s;
};
function Nl(e, t, s) {
  const { props: n, children: i, component: r } = e, { props: l, children: o, patchFlag: a } = t, u = r.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (s && a >= 0) {
    if (a & 1024)
      return !0;
    if (a & 16)
      return n ? qn(n, l, u) : !!l;
    if (a & 8) {
      const f = t.dynamicProps;
      for (let h = 0; h < f.length; h++) {
        const p = f[h];
        if (nr(l, n, p) && !Vs(u, p))
          return !0;
      }
    }
  } else
    return (i || o) && (!o || !o.$stable) ? !0 : n === l ? !1 : n ? l ? qn(n, l, u) : !0 : !!l;
  return !1;
}
function qn(e, t, s) {
  const n = Object.keys(t);
  if (n.length !== Object.keys(e).length)
    return !0;
  for (let i = 0; i < n.length; i++) {
    const r = n[i];
    if (!se(e, r) || nr(t, e, r) && !Vs(s, r))
      return !0;
  }
  return !1;
}
function nr(e, t, s) {
  const n = e[s], i = t[s];
  return s === "style" && ae(n) && ae(i) ? !_t(n, i) : n !== i;
}
function jl({ vnode: e, parent: t, suspense: s }, n) {
  for (; t; ) {
    const i = t.subTree;
    if (i.suspense && i.suspense.activeBranch === e && (i.suspense.vnode.el = i.el = n, e = i), i === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
  s && s.activeBranch === e && (s.vnode.el = n);
}
const ir = {}, rr = () => Object.create(ir), lr = (e) => Object.getPrototypeOf(e) === ir;
function Dl(e, t, s, n = !1) {
  const i = {}, r = rr();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), or(e, t, i, r);
  for (const l in e.propsOptions[0])
    l in i || (i[l] = void 0);
  s ? e.props = n ? i : /* @__PURE__ */ rl(i) : e.type.props ? e.props = i : e.props = r, e.attrs = r;
}
function Ul(e, t, s, n) {
  const {
    props: i,
    attrs: r,
    vnode: { patchFlag: l }
  } = e, o = /* @__PURE__ */ Q(i), [a] = e.propsOptions;
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
          if (se(r, p))
            g !== r[p] && (r[p] = g, u = !0);
          else {
            const P = Fe(p);
            i[P] = gn(
              a,
              o,
              P,
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
    or(e, t, i, r) && (u = !0);
    let f;
    for (const h in o)
      (!t || // for camelCase
      !se(t, h) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((f = Rt(h)) === h || !se(t, f))) && (a ? s && // for camelCase
      (s[h] !== void 0 || // for kebab-case
      s[f] !== void 0) && (i[h] = gn(
        a,
        o,
        h,
        void 0,
        e,
        !0
      )) : delete i[h]);
    if (r !== o)
      for (const h in r)
        (!t || !se(t, h)) && (delete r[h], u = !0);
  }
  u && at(e.attrs, "set", "");
}
function or(e, t, s, n) {
  const [i, r] = e.propsOptions;
  let l = !1, o;
  if (t)
    for (let a in t) {
      if (Xt(a))
        continue;
      const u = t[a];
      let f;
      i && se(i, f = Fe(a)) ? !r || !r.includes(f) ? s[f] = u : (o || (o = {}))[f] = u : Vs(e.emitsOptions, a) || (!(a in n) || u !== n[a]) && (n[a] = u, l = !0);
    }
  if (r) {
    const a = /* @__PURE__ */ Q(s), u = o || oe;
    for (let f = 0; f < r.length; f++) {
      const h = r[f];
      s[h] = gn(
        i,
        a,
        h,
        u[h],
        e,
        !se(u, h)
      );
    }
  }
  return l;
}
function gn(e, t, s, n, i, r) {
  const l = e[s];
  if (l != null) {
    const o = se(l, "default");
    if (o && n === void 0) {
      const a = l.default;
      if (l.type !== Function && !l.skipFactory && ne(a)) {
        const { propsDefaults: u } = i;
        if (s in u)
          n = u[s];
        else {
          const f = Rn(i);
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
    ] && (n === "" || n === Rt(s)) && (n = !0));
  }
  return n;
}
function Kl(e, t, s = !1) {
  const n = t.propsCache, i = n.get(e);
  if (i)
    return i;
  const r = e.props, l = {}, o = [];
  if (!r)
    return ae(e) && n.set(e, Tt), Tt;
  if (q(r))
    for (let u = 0; u < r.length; u++) {
      const f = Fe(r[u]);
      zn(f) && (l[f] = oe);
    }
  else if (r)
    for (const u in r) {
      const f = Fe(u);
      if (zn(f)) {
        const h = r[u], p = l[f] = q(h) || ne(h) ? { type: h } : Ae({}, h), g = p.type;
        let P = !1, S = !0;
        if (q(g))
          for (let F = 0; F < g.length; ++F) {
            const O = g[F], M = ne(O) && O.name;
            if (M === "Boolean") {
              P = !0;
              break;
            } else M === "String" && (S = !1);
          }
        else
          P = ne(g) && g.name === "Boolean";
        p[
          0
          /* shouldCast */
        ] = P, p[
          1
          /* shouldCastTrue */
        ] = S, (P || se(p, "default")) && o.push(f);
      }
    }
  const a = [l, o];
  return ae(e) && n.set(e, a), a;
}
function zn(e) {
  return e[0] !== "$" && !Xt(e);
}
const An = (e) => e === "_" || e === "_ctx" || e === "$stable", En = (e) => q(e) ? e.map(ze) : [ze(e)], Hl = (e, t, s) => {
  if (t._n)
    return t;
  const n = yl((...i) => En(t(...i)), s);
  return n._c = !1, n;
}, ar = (e, t, s) => {
  const n = e._ctx;
  for (const i in e) {
    if (An(i)) continue;
    const r = e[i];
    if (ne(r))
      t[i] = Hl(i, r, n);
    else if (r != null) {
      const l = En(r);
      t[i] = () => l;
    }
  }
}, cr = (e, t) => {
  const s = En(t);
  e.slots.default = () => s;
}, ur = (e, t, s) => {
  for (const n in t)
    (s || !An(n)) && (e[n] = t[n]);
}, Vl = (e, t, s) => {
  const n = e.slots = rr();
  if (e.vnode.shapeFlag & 32) {
    const i = t._;
    i ? (ur(n, t, s), s && Ii(n, "_", i, !0)) : ar(t, n);
  } else t && cr(e, t);
}, Bl = (e, t, s) => {
  const { vnode: n, slots: i } = e;
  let r = !0, l = oe;
  if (n.shapeFlag & 32) {
    const o = t._;
    o ? s && o === 1 ? r = !1 : ur(i, t, s) : (r = !t.$stable, ar(t, i)), l = t;
  } else t && (cr(e, t), l = { default: 1 });
  if (r)
    for (const o in i)
      !An(o) && l[o] == null && delete i[o];
}, xe = Yl;
function Wl(e) {
  return ql(e);
}
function ql(e, t) {
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
    setScopeId: g = $t,
    insertStaticContent: P
  } = e, S = (c, d, m, k = null, y = null, w = null, $ = void 0, A = null, T = !!d.dynamicChildren) => {
    if (c === d)
      return;
    c && !zt(c, d) && (k = gt(c), Pe(c, y, w, !0), c = null), d.patchFlag === -2 && (T = !1, d.dynamicChildren = null), d.dynamicChildren && c && c.dynamicChildren && c.dynamicChildren.hasOnce && (d.dynamicChildren === Tt && (d.dynamicChildren = []), d.dynamicChildren.hasOnce = !0);
    const { type: b, ref: N, shapeFlag: E } = d;
    switch (b) {
      case Bs:
        F(c, d, m, k);
        break;
      case je:
        O(c, d, m, k);
        break;
      case tn:
        c == null && M(d, m, k, $);
        break;
      case Z:
        fe(
          c,
          d,
          m,
          k,
          y,
          w,
          $,
          A,
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
          A,
          T
        ) : E & 6 ? De(
          c,
          d,
          m,
          k,
          y,
          w,
          $,
          A,
          T
        ) : (E & 64 || E & 128) && b.process(
          c,
          d,
          m,
          k,
          y,
          w,
          $,
          A,
          T,
          He
        );
    }
    N != null && y ? ts(N, c && c.ref, w, d || c, !d) : N == null && c && c.ref != null && ts(c.ref, null, w, c, !0);
  }, F = (c, d, m, k) => {
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
  }, O = (c, d, m, k) => {
    c == null ? n(
      d.el = a(d.children || ""),
      m,
      k
    ) : d.el = c.el;
  }, M = (c, d, m, k) => {
    [c.el, c.anchor] = P(
      c.children,
      d,
      m,
      k,
      c.el,
      c.anchor
    );
  }, C = ({ el: c, anchor: d }, m, k) => {
    let y;
    for (; c && c !== d; )
      y = p(c), n(c, m, k), c = y;
    n(d, m, k);
  }, I = ({ el: c, anchor: d }) => {
    let m;
    for (; c && c !== d; )
      m = p(c), i(c), c = m;
    i(d);
  }, H = (c, d, m, k, y, w, $, A, T) => {
    if (d.type === "svg" ? $ = "svg" : d.type === "math" && ($ = "mathml"), c == null)
      le(
        d,
        m,
        k,
        y,
        w,
        $,
        A,
        T
      );
    else {
      const b = c.el && c.el._isVueCE ? c.el : null;
      try {
        b && b._beginPatch(), te(
          c,
          d,
          y,
          w,
          $,
          A,
          T
        );
      } finally {
        b && b._endPatch();
      }
    }
  }, le = (c, d, m, k, y, w, $, A) => {
    let T, b;
    const { props: N, shapeFlag: E, transition: D, dirs: B } = c;
    if (T = c.el = l(
      c.type,
      w,
      N && N.is,
      N
    ), E & 8 ? f(T, c.children) : E & 16 && V(
      c.children,
      T,
      null,
      k,
      y,
      en(c, w),
      $,
      A
    ), B && Ct(c, null, k, "created"), z(T, c, c.scopeId, $, k), N) {
      for (const ee in N)
        ee !== "value" && !Xt(ee) && r(T, ee, null, N[ee], w, k);
      "value" in N && r(T, "value", null, N.value, w), (b = N.onVnodeBeforeMount) && Be(b, k, c);
    }
    B && Ct(c, null, k, "beforeMount");
    const G = zl(y, D);
    G ? D.beforeEnter(T) : D && !D.persisted && (T[Jl] = !0), n(T, d, m), ((b = N && N.onVnodeMounted) || G || B) && xe(() => {
      b && Be(b, k, c), G && D.enter(T), B && Ct(c, null, k, "mounted");
    }, y);
  }, z = (c, d, m, k, y) => {
    if (m && g(c, m), k)
      for (let w = 0; w < k.length; w++)
        g(c, k[w]);
    if (y) {
      let w = y.subTree;
      if (d === w || hr(w.type) && (w.ssContent === d || w.ssFallback === d)) {
        const $ = y.vnode;
        z(
          c,
          $,
          $.scopeId,
          $.slotScopeIds,
          y.parent
        );
      }
    }
  }, V = (c, d, m, k, y, w, $, A, T = 0) => {
    for (let b = T; b < c.length; b++) {
      const N = c[b] = A ? lt(c[b]) : ze(c[b]);
      S(
        null,
        N,
        d,
        m,
        k,
        y,
        w,
        $,
        A
      );
    }
  }, te = (c, d, m, k, y, w, $) => {
    const A = d.el = c.el;
    let { patchFlag: T, dynamicChildren: b, dirs: N } = d;
    T |= c.patchFlag & 16;
    const E = c.props || oe, D = d.props || oe;
    let B;
    if (m && It(m, !1), (B = D.onVnodeBeforeUpdate) && Be(B, m, d, c), N && Ct(d, c, m, "beforeUpdate"), m && It(m, !0), // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    b && (!c.dynamicChildren || c.dynamicChildren.length !== b.length) && (T = 0, $ = !1, b = null), (E.innerHTML && D.innerHTML == null || E.textContent && D.textContent == null) && f(A, ""), b ? W(
      c.dynamicChildren,
      b,
      A,
      m,
      k,
      en(d, y),
      w
    ) : $ || ye(
      c,
      d,
      A,
      null,
      m,
      k,
      en(d, y),
      w,
      !1
    ), T > 0) {
      if (T & 16)
        K(A, E, D, m, y);
      else if (T & 2 && E.class !== D.class && r(A, "class", null, D.class, y), T & 4 && r(A, "style", E.style, D.style, y), T & 8) {
        const G = d.dynamicProps;
        for (let ee = 0; ee < G.length; ee++) {
          const X = G[ee], ce = E[X], he = D[X];
          (he !== ce || X === "value") && r(A, X, ce, he, y, m);
        }
      }
      T & 1 && c.children !== d.children && f(A, d.children);
    } else !$ && b == null && K(A, E, D, m, y);
    ((B = D.onVnodeUpdated) || N) && xe(() => {
      B && Be(B, m, d, c), N && Ct(d, c, m, "updated");
    }, k);
  }, W = (c, d, m, k, y, w, $) => {
    for (let A = 0; A < d.length; A++) {
      const T = c[A], b = d[A], N = T.el || is(T), E = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        N && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (T.type === Z || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !zt(T, b) || // - In the case of a component, it could contain anything.
        T.shapeFlag & 198) ? h(N) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          m
        )
      );
      S(
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
  }, K = (c, d, m, k, y) => {
    if (d !== m) {
      if (d !== oe)
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
        const $ = m[w], A = d[w];
        $ !== A && w !== "value" && r(c, w, A, $, y, k);
      }
      "value" in m && r(c, "value", d.value, m.value, y);
    }
  }, fe = (c, d, m, k, y, w, $, A, T) => {
    const b = d.el = c ? c.el : o(""), N = d.anchor = c ? c.anchor : o("");
    let { patchFlag: E, dynamicChildren: D, slotScopeIds: B } = d;
    B && (A = A ? A.concat(B) : B), c == null ? (n(b, m, k), n(N, m, k), V(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      d.children || [],
      m,
      N,
      y,
      w,
      $,
      A,
      T
    )) : E > 0 && E & 64 && D && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    c.dynamicChildren && c.dynamicChildren.length === D.length ? (W(
      c.dynamicChildren,
      D,
      m,
      y,
      w,
      $,
      A
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (d.key != null || y && d === y.subTree) && fr(
      c,
      d,
      !0
      /* shallow */
    )) : ye(
      c,
      d,
      m,
      N,
      y,
      w,
      $,
      A,
      T
    );
  }, De = (c, d, m, k, y, w, $, A, T) => {
    d.slotScopeIds = A, c == null ? d.shapeFlag & 512 ? y.ctx.activate(
      d,
      m,
      k,
      $,
      T
    ) : dt(
      d,
      m,
      k,
      y,
      w,
      $,
      T
    ) : Pt(c, d, T);
  }, dt = (c, d, m, k, y, w, $) => {
    const A = c.component = so(
      c,
      k,
      y
    );
    if (Zi(c) && (A.ctx.renderer = He), io(A, !1, $), A.asyncDep) {
      if (y && y.registerDep(
        A,
        et,
        $,
        w
      ), !c.el) {
        const T = A.subTree = $e(je);
        O(null, T, d, m), c.placeholder = T.el;
      }
    } else
      et(
        A,
        c,
        d,
        m,
        y,
        w,
        $
      );
  }, Pt = (c, d, m) => {
    const k = d.component = c.component;
    if (Nl(c, d, m))
      if (k.asyncDep && !k.asyncResolved) {
        d.el = c.el, d.placeholder = c.placeholder, ve(k, d, m);
        return;
      } else
        k.next = d, k.update();
    else
      d.el = c.el, d.placeholder = c.placeholder, k.vnode = d;
  }, et = (c, d, m, k, y, w, $) => {
    const A = () => {
      if (c.isMounted) {
        let { next: E, bu: D, u: B, parent: G, vnode: ee } = c;
        {
          const _ = dr(c);
          if (_) {
            E && (E.el = ee.el, ve(c, E, $)), _.asyncDep.then(() => {
              const v = () => {
                c.job.flags & 8 || (y && y.pendingBranch ? xe(v, y) : b());
              };
              v.flags = 48, xe(v, y);
            });
            return;
          }
        }
        let X = E, ce;
        It(c, !1), E ? (E.el = ee.el, ve(c, E, $)) : E = ee, D && xs(D), (ce = E.props && E.props.onVnodeBeforeUpdate) && Be(ce, G, E, ee), It(c, !0);
        const he = Wn(c), be = c.subTree;
        c.subTree = he, S(
          be,
          he,
          // parent may have changed if it's in a teleport. a root that is a
          // pending async component only has its placeholder comment
          h(
            be.el || is(be)
          ),
          // anchor may have changed if it's in a fragment
          gt(be),
          c,
          y,
          w
        ), E.el = he.el, X === null && jl(c, he.el), B && xe(B, y), (ce = E.props && E.props.onVnodeUpdated) && xe(
          () => Be(ce, G, E, ee),
          y
        );
      } else {
        let E;
        const { el: D, props: B } = d, { bm: G, m: ee, parent: X, root: ce, type: he } = c, be = ss(d);
        It(c, !1), G && xs(G), !be && (E = B && B.onVnodeBeforeMount) && Be(E, X, d), It(c, !0);
        {
          ce.ce && ce.ce._hasShadowRoot() && ce.ce._injectChildStyle(
            he,
            c.parent ? c.parent.type : void 0
          );
          const _ = c.subTree = Wn(c);
          S(
            null,
            _,
            m,
            k,
            c,
            y,
            w
          ), d.el = _.el;
        }
        if (ee && xe(ee, y), !be && (E = B && B.onVnodeMounted)) {
          const _ = d;
          xe(
            () => Be(E, X, _),
            y
          );
        }
        (d.shapeFlag & 256 || X && ss(X.vnode) && X.vnode.shapeFlag & 256) && c.a && xe(c.a, y), c.isMounted = !0, d = m = k = null;
      }
    };
    c.scope.on();
    const T = c.effect = new Ai(A);
    c.scope.off();
    const b = c.update = T.run.bind(T), N = c.job = T.runIfDirty.bind(T);
    N.i = c, N.id = c.uid, T.scheduler = () => Tn(N), It(c, !0), b();
  }, ve = (c, d, m) => {
    d.component = c;
    const k = c.vnode.props;
    c.vnode = d, c.next = null, Ul(c, d.props, k, m), Bl(c, d.children, m), ut(), Gi(c), ft();
  }, ye = (c, d, m, k, y, w, $, A, T = !1) => {
    const b = c && c.children, N = c ? c.shapeFlag : 0, E = d.children, { patchFlag: D, shapeFlag: B } = d;
    if (D > 0) {
      if (D & 128) {
        ht(
          b,
          E,
          m,
          k,
          y,
          w,
          $,
          A,
          T
        );
        return;
      } else if (D & 256) {
        Ue(
          b,
          E,
          m,
          k,
          y,
          w,
          $,
          A,
          T
        );
        return;
      }
    }
    B & 8 ? (N & 16 && Ce(b, y, w), E !== b && f(m, E)) : N & 16 ? B & 16 ? ht(
      b,
      E,
      m,
      k,
      y,
      w,
      $,
      A,
      T
    ) : Ce(b, y, w, !0) : (N & 8 && f(m, ""), B & 16 && V(
      E,
      m,
      k,
      y,
      w,
      $,
      A,
      T
    ));
  }, Ue = (c, d, m, k, y, w, $, A, T) => {
    c = c || Tt, d = d || Tt;
    const b = c.length, N = d.length, E = Math.min(b, N);
    let D;
    for (D = 0; D < E; D++) {
      const B = d[D] = T ? lt(d[D]) : ze(d[D]);
      S(
        c[D],
        B,
        m,
        null,
        y,
        w,
        $,
        A,
        T
      );
    }
    b > N ? Ce(
      c,
      y,
      w,
      !0,
      !1,
      E
    ) : V(
      d,
      m,
      k,
      y,
      w,
      $,
      A,
      T,
      E
    );
  }, ht = (c, d, m, k, y, w, $, A, T) => {
    let b = 0;
    const N = d.length;
    let E = c.length - 1, D = N - 1;
    for (; b <= E && b <= D; ) {
      const B = c[b], G = d[b] = T ? lt(d[b]) : ze(d[b]);
      if (zt(B, G))
        S(
          B,
          G,
          m,
          null,
          y,
          w,
          $,
          A,
          T
        );
      else
        break;
      b++;
    }
    for (; b <= E && b <= D; ) {
      const B = c[E], G = d[D] = T ? lt(d[D]) : ze(d[D]);
      if (zt(B, G))
        S(
          B,
          G,
          m,
          null,
          y,
          w,
          $,
          A,
          T
        );
      else
        break;
      E--, D--;
    }
    if (b > E) {
      if (b <= D) {
        const B = D + 1, G = B < N ? d[B].el : k;
        for (; b <= D; )
          S(
            null,
            d[b] = T ? lt(d[b]) : ze(d[b]),
            m,
            G,
            y,
            w,
            $,
            A,
            T
          ), b++;
      }
    } else if (b > D)
      for (; b <= E; )
        Pe(c[b], y, w, !0), b++;
    else {
      const B = b, G = b, ee = /* @__PURE__ */ new Map();
      for (b = G; b <= D; b++) {
        const J = d[b] = T ? lt(d[b]) : ze(d[b]);
        J.key != null && ee.set(J.key, b);
      }
      let X, ce = 0;
      const he = D - G + 1;
      let be = !1, _ = 0;
      const v = new Array(he);
      for (b = 0; b < he; b++) v[b] = 0;
      for (b = B; b <= E; b++) {
        const J = c[b];
        if (ce >= he) {
          Pe(J, y, w, !0);
          continue;
        }
        let we;
        if (J.key != null)
          we = ee.get(J.key);
        else
          for (X = G; X <= D; X++)
            if (v[X - G] === 0 && zt(J, d[X])) {
              we = X;
              break;
            }
        we === void 0 ? Pe(J, y, w, !0) : (v[we - G] = b + 1, we >= _ ? _ = we : be = !0, S(
          J,
          d[we],
          m,
          null,
          y,
          w,
          $,
          A,
          T
        ), ce++);
      }
      const R = be ? Gl(v) : Tt;
      for (X = R.length - 1, b = he - 1; b >= 0; b--) {
        const J = G + b, we = d[J], mt = d[J + 1], Ve = J + 1 < N ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          mt.el || is(mt)
        ) : k;
        v[b] === 0 ? S(
          null,
          we,
          m,
          Ve,
          y,
          w,
          $,
          A,
          T
        ) : be && (X < 0 || b !== R[X] ? Ke(we, m, Ve, 2) : X--);
      }
    }
  }, Ke = (c, d, m, k, y = null) => {
    const { el: w, type: $, transition: A, children: T, shapeFlag: b } = c;
    if (b & 6) {
      Ke(c.component.subTree, d, m, k);
      return;
    }
    if (b & 128) {
      c.suspense.move(d, m, k);
      return;
    }
    if (b & 64) {
      $.move(c, d, m, He);
      return;
    }
    if ($ === Z) {
      n(w, d, m);
      for (let E = 0; E < T.length; E++)
        Ke(T[E], d, m, k);
      n(c.anchor, d, m);
      return;
    }
    if ($ === tn) {
      C(c, d, m);
      return;
    }
    if (k !== 2 && b & 1 && A)
      if (k === 0)
        A.persisted && !w[Qs] ? n(w, d, m) : (A.beforeEnter(w), n(w, d, m), xe(() => A.enter(w), y));
      else {
        const { leave: E, delayLeave: D, afterLeave: B } = A, G = () => {
          c.ctx.isUnmounted ? i(w) : n(w, d, m);
        }, ee = () => {
          const X = w._isLeaving || !!w[Qs];
          w._isLeaving && w[Qs](
            !0
            /* cancelled */
          ), A.persisted && !X ? G() : E(w, () => {
            G(), B && B();
          });
        };
        D ? D(w, G, ee) : ee();
      }
    else
      n(w, d, m);
  }, Pe = (c, d, m, k = !1, y = !1) => {
    const {
      type: w,
      props: $,
      ref: A,
      children: T,
      dynamicChildren: b,
      shapeFlag: N,
      patchFlag: E,
      dirs: D,
      cacheIndex: B,
      memo: G
    } = c;
    if ((E === -2 || b && b.hasOnce) && (y = !1), A != null && (ut(), ts(A, null, m, c, !0), ft()), B != null && (!c.ctx || c.ctx === d) && (d.renderCache[B] = void 0), N & 256 && d.ctx.deactivate(c))
      return;
    const ee = N & 1 && D, X = !ss(c);
    let ce;
    if (X && (ce = $ && $.onVnodeBeforeUnmount) && Be(ce, d, c), N & 6)
      pt(c.component, m, k);
    else {
      if (N & 128) {
        c.suspense.unmount(m, k);
        return;
      }
      ee && Ct(c, null, d, "beforeUnmount"), N & 64 ? c.type.remove(
        c,
        d,
        m,
        He,
        k
      ) : b && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !b.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (w !== Z || E > 0 && E & 64) ? Ce(
        b,
        d,
        m,
        !1,
        !0
      ) : (w === Z && E & 384 || !y && N & 16) && Ce(T, d, m), k && ps(c);
    }
    const he = G != null && B == null;
    (X && (ce = $ && $.onVnodeUnmounted) || ee || he) && xe(() => {
      ce && Be(ce, d, c), ee && Ct(c, null, d, "unmounted"), he && (c.el = null);
    }, m);
  }, ps = (c) => {
    const { type: d, el: m, anchor: k, transition: y } = c, w = d === Z;
    if (w && !y) {
      gs(m, k);
      return;
    }
    if (d === tn) {
      I(c), y && !y.persisted && y.afterLeave && y.afterLeave();
      return;
    }
    const $ = w ? hn(c) : c, A = () => {
      w ? h(m) && gs(m, k) : i(m), y && !y.persisted && y.afterLeave && y.afterLeave();
    };
    if ($ && $.shapeFlag & 1 && y && !y.persisted) {
      const { leave: T, delayLeave: b } = y, N = $.el, E = () => T(N, A);
      b ? b(N, A, E) : E();
    } else
      A();
  }, gs = (c, d) => {
    let m;
    for (; c !== d; )
      m = p(c), i(c), c = m;
    i(d);
  }, pt = (c, d, m) => {
    const { bum: k, scope: y, job: w, subTree: $, um: A, m: T, a: b } = c;
    Gn(T), Gn(b), k && xs(k), y.stop(), w ? (w.flags |= 8, Pe($, c, d, m)) : $ && ($.transition = c.vnode.transition, Pe($, c, d, m)), A && xe(A, d);
    const N = () => {
      c.isUnmounted = !0;
    };
    N.flags = 16, xe(N, d);
  }, Ce = (c, d, m, k = !1, y = !1, w = 0) => {
    for (let $ = w; $ < c.length; $++)
      Pe(c[$], d, m, k, y);
  }, gt = (c) => {
    if (c.shapeFlag & 6)
      return gt(c.component.subTree);
    if (c.shapeFlag & 128)
      return c.suspense.next();
    const d = p(c.anchor || c.el), m = d && d[Sl];
    return m ? p(m) : d;
  }, Ht = (c, d, m) => {
    const k = c && d._vnode ? void 0 : c && c.component ? c.component.uid : to();
    vl(() => {
      c == null ? d._vnode && Pe(d._vnode, null, null, !0) : S(
        d._vnode || null,
        c,
        d,
        null,
        null,
        null,
        m
      ), d._vnode = c;
    }, k);
  }, He = {
    p: S,
    um: Pe,
    m: Ke,
    r: ps,
    mt: dt,
    mc: V,
    pc: ye,
    pbc: W,
    n: gt,
    o: e
  };
  return {
    render: Ht,
    hydrate: void 0,
    createApp: El(Ht)
  };
}
function en({ type: e, props: t }, s) {
  return s === "svg" && e === "foreignObject" || s === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : s;
}
function It({ effect: e, job: t }, s) {
  s ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function zl(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function fr(e, t, s = !1) {
  const n = e.children, i = t.children;
  if (q(n) && q(i))
    for (let r = 0; r < n.length; r++) {
      const l = n[r];
      let o = i[r];
      o.shapeFlag & 1 && !o.dynamicChildren && ((o.patchFlag <= 0 || o.patchFlag === 32) && (o = i[r] = lt(i[r]), o.el = l.el), !s && o.patchFlag !== -2 && fr(l, o)), o.type === Bs && (o.patchFlag === -1 && (o = i[r] = lt(o)), o.el = l.el), o.type === je && !o.el && (o.el = l.el);
    }
}
function Gl(e) {
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
function dr(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : dr(t);
}
function Gn(e) {
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
const hr = (e) => e.__isSuspense, Jl = /* @__PURE__ */ Symbol("_deferredEnter");
function Yl(e, t) {
  t && t.pendingBranch ? q(e) ? t.effects.push(...e) : t.effects.push(e) : ml(e);
}
const Z = /* @__PURE__ */ Symbol.for("v-fgt"), Bs = /* @__PURE__ */ Symbol.for("v-txt"), je = /* @__PURE__ */ Symbol.for("v-cmt"), tn = /* @__PURE__ */ Symbol.for("v-stc"), Et = [];
let Te = null;
function L(e = !1) {
  Et.push(Te = e ? null : []);
}
function pr() {
  Et.pop(), Te = Et[Et.length - 1] || null;
}
let as = 1;
function Jn(e, t = !1) {
  as += e, e < 0 && Te && t && (Te.hasOnce = !0);
}
function gr(e) {
  return e.dynamicChildren = as > 0 ? Te || Tt : null, pr(), as > 0 && Te && Te.push(e), e;
}
function j(e, t, s, n, i, r) {
  return gr(
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
  return gr(
    $e(
      e,
      t,
      s,
      n,
      i,
      !0
    )
  );
}
function On(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function zt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const mr = ({ key: e }) => e ?? null, Ss = ({
  ref: e,
  ref_key: t,
  ref_for: s
}) => (typeof e == "number" && (e = "" + e), e != null ? de(e) || /* @__PURE__ */ ge(e) || ne(e) ? { i: Ee, r: e, k: t, f: !!s } : e : null);
function x(e, t = null, s = null, n = 0, i = null, r = e === Z ? 0 : 1, l = !1, o = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && mr(t),
    ref: t && Ss(t),
    scopeId: Xi,
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
    ctx: Ee
  };
  return o ? (Es(a, s), r & 128 && e.normalize(a)) : s && (a.shapeFlag |= de(s) ? 8 : 16), as > 0 && // avoid a block node from tracking itself
  !l && // has current parent block
  Te && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || r & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && Te.push(a), a;
}
const $e = Xl;
function Xl(e, t = null, s = null, n = 0, i = null, r = !1) {
  if ((!e || e === Tl) && (e = je), On(e)) {
    const o = Ut(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return s && Es(o, s), as > 0 && !r && Te && (o.shapeFlag & 6 ? Te[Te.indexOf(e)] = o : Te.push(o)), o.patchFlag = -2, o;
  }
  if (ao(e) && (e = e.__vccOpts), t) {
    t = Ql(t);
    let { class: o, style: a } = t;
    o && !de(o) && (t.class = Je(o)), ae(a) && (/* @__PURE__ */ Mn(a) && !q(a) && (a = Ae({}, a)), t.style = bt(a));
  }
  const l = de(e) ? 1 : hr(e) ? 128 : Ks(e) ? 64 : ae(e) ? 4 : ne(e) ? 2 : 0;
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
function Ql(e) {
  return e ? /* @__PURE__ */ Mn(e) ? Ae({}, e) : lr(e) ? Ae({}, e[wr] || e) : e : null;
}
function Ut(e, t, s = !1, n = !1) {
  const { props: i, ref: r, patchFlag: l, children: o, transition: a } = e, u = t ? Zl(i || {}, t) : i, f = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: u,
    key: u && mr(u),
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
    patchFlag: t && e.type !== Z ? l === -1 ? 16 : l | 16 : l,
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
  return $e(Bs, null, e, t);
}
function ie(e = "", t = !1) {
  return t ? (L(), ks(je, null, e)) : $e(je, null, e);
}
function ze(e) {
  return e == null || typeof e == "boolean" ? $e(je) : q(e) ? $e(
    Z,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : On(e) ? lt(e) : $e(Bs, null, String(e));
}
function lt(e) {
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
      !i && !lr(t) ? t._ctx = Ee : i === 3 && Ee && (Ee.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else if (ne(t)) {
    if (n & 65) {
      Es(e, { default: t });
      return;
    }
    t = { default: t, _ctx: Ee }, s = 32;
  } else
    t = String(t), n & 64 ? (s = 16, t = [Ie(t)]) : s = 8;
  e.children = t, e.shapeFlag |= s;
}
function Zl(...e) {
  const t = {};
  for (let s = 0; s < e.length; s++) {
    const n = e[s];
    for (const i in n)
      if (i === "class")
        t.class !== n.class && (t.class = Je([t.class, n.class]));
      else if (i === "style")
        t.style = bt([t.style, n.style]);
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
  Ze(e, t, 7, [
    s,
    n
  ]);
}
const eo = /* @__PURE__ */ tr();
let vr = 0;
function to() {
  return vr;
}
function so(e, t, s) {
  const n = e.type, i = (t ? t.appContext : e.appContext) || eo, r = {
    uid: vr++,
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
    scope: new Kr(
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
    propsOptions: Kl(n, i),
    emitsOptions: Pl(n, i),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: oe,
    // inheritAttrs
    inheritAttrs: n.inheritAttrs,
    // state
    ctx: oe,
    data: oe,
    props: oe,
    attrs: oe,
    slots: oe,
    refs: oe,
    setupState: oe,
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
  return r.ctx = { _: r }, r.root = t ? t.root : r, r.emit = Rl.bind(null, r), e.ce && e.ce(r), r;
}
let kt = null;
const no = () => kt || Ee;
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
    (s) => kt = s
  ), cs = t(
    "__VUE_SSR_SETTERS__",
    (s) => us = s
  );
}
const Rn = (e) => {
  const t = kt;
  return Os(e), e.scope.on(), () => {
    e.scope.off(), Os(t);
  };
}, Yn = () => {
  kt && kt.scope.off(), Os(null);
};
function yr(e) {
  return e.vnode.shapeFlag & 4;
}
let us = !1;
function io(e, t = !1, s = !1) {
  t && cs(t);
  const { props: n, children: i } = e.vnode, r = yr(e);
  Dl(e, n, r, t), Vl(e, i, s || t);
  const l = r ? ro(e, t) : void 0;
  return t && cs(!1), l;
}
function ro(e, t) {
  const s = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, $l);
  const { setup: n } = s;
  if (n) {
    ut();
    const i = e.setupContext = n.length > 1 ? oo(e) : null, r = Rn(e), l = ds(
      n,
      e,
      0,
      [
        e.props,
        i
      ]
    ), o = xi(l);
    if (ft(), r(), (o || e.sp) && !ss(e) && Il(e), o) {
      if (l.then(Yn, Yn), t)
        return l.then((a) => {
          cs(!0);
          try {
            Xn(e, a, t);
          } finally {
            cs(!1);
          }
        }).catch((a) => {
          Us(a, e, 0, void 0, !0), e.ssrRender = (u, f) => f("<!---->");
        });
      e.asyncDep = l;
    } else
      Xn(e, l);
  } else
    br(e);
}
function Xn(e, t, s) {
  ne(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : ae(t) && (e.setupState = Wi(t)), br(e);
}
function br(e, t, s) {
  const n = e.type;
  e.render || (e.render = n.render || $t);
}
const wr = /* @__PURE__ */ Symbol(), lo = {
  get(e, t) {
    return _e(e, "get", ""), t === wr ? e : e[t];
  }
};
function oo(e) {
  const t = (s) => {
    e.exposed = s || {};
  };
  return {
    attrs: new Proxy(e.attrs, lo),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Ws(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Wi(ll(e.exposed)), {
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
function ao(e) {
  return ne(e) && "__vccOpts" in e;
}
const ue = (e, t) => /* @__PURE__ */ fl(e, t, us), co = "3.5.45";
let mn;
const Qn = typeof window < "u" && window.trustedTypes;
if (Qn)
  try {
    mn = /* @__PURE__ */ Qn.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const _r = mn ? (e) => mn.createHTML(e) : (e) => e, uo = "http://www.w3.org/2000/svg", fo = "http://www.w3.org/1998/Math/MathML", it = typeof document < "u" ? document : null, Zn = it && /* @__PURE__ */ it.createElement("template"), ho = {
  insert: (e, t, s) => {
    t.insertBefore(e, s || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, s, n) => {
    const i = t === "svg" ? it.createElementNS(uo, e) : t === "mathml" ? it.createElementNS(fo, e) : s ? it.createElement(e, { is: s }) : it.createElement(e);
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
      Zn.innerHTML = _r(
        n === "svg" ? `<svg>${e}</svg>` : n === "mathml" ? `<math>${e}</math>` : e
      );
      const o = Zn.content;
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
}, po = /* @__PURE__ */ Symbol("_vtc");
function go(e, t, s) {
  const n = e[po];
  n && (t = (t ? [t, ...n] : [...n]).join(" ")), t == null ? e.removeAttribute("class") : s ? e.setAttribute("class", t) : e.className = t;
}
const ei = /* @__PURE__ */ Symbol("_vod"), mo = /* @__PURE__ */ Symbol("_vsh"), vo = /* @__PURE__ */ Symbol(""), yo = /(?:^|;)\s*display\s*:/;
function bo(e, t, s) {
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
      o != null ? _o(
        e,
        l,
        !de(t) && t ? t[l] : void 0,
        o
      ) || Jt(n, l, o) : Jt(n, l, "");
    }
  } else if (i) {
    if (t !== s) {
      const l = n[vo];
      l && (s += ";" + l), n.cssText = s, r = yo.test(s);
    }
  } else t && e.removeAttribute("style");
  ei in e && ((!i || t !== s) && (e[ei] = r ? n.display : ""), e[mo] && (n.display = "none"));
}
const bs = /\s*!important$/;
function Jt(e, t, s) {
  if (q(s))
    s.forEach((n) => Jt(e, t, n));
  else if (s == null && (s = ""), t.startsWith("--"))
    bs.test(s) ? e.setProperty(t, s.replace(bs, ""), "important") : e.setProperty(t, s);
  else {
    const n = wo(e, t);
    bs.test(s) ? e.setProperty(
      Rt(n),
      s.replace(bs, ""),
      "important"
    ) : e[n] = s;
  }
}
const ti = ["Webkit", "Moz", "ms"], sn = {};
function wo(e, t) {
  const s = sn[t];
  if (s)
    return s;
  let n = Fe(t);
  if (n !== "filter" && n in e)
    return sn[t] = n;
  n = Ci(n);
  for (let i = 0; i < ti.length; i++) {
    const r = ti[i] + n;
    if (r in e)
      return sn[t] = r;
  }
  return t;
}
function _o(e, t, s, n) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && de(n) && s === n;
}
const si = "http://www.w3.org/1999/xlink";
function ni(e, t, s, n, i, r = Nr(t)) {
  n && t.startsWith("xlink:") ? s == null ? e.removeAttributeNS(si, t.slice(6, t.length)) : e.setAttributeNS(si, t, s) : s == null || r && !Mi(s) ? e.removeAttribute(t) : e.setAttribute(
    t,
    r ? "" : Xe(s) ? String(s) : s
  );
}
function ii(e, t, s, n, i) {
  if (t === "innerHTML" || t === "textContent") {
    s != null && (e[t] = t === "innerHTML" ? _r(s) : s);
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
    o === "boolean" ? s = Mi(s) : s == null && o === "string" ? (s = "", l = !0) : o === "number" && (s = 0, l = !0);
  }
  try {
    e[t] = s;
  } catch {
  }
  l && e.removeAttribute(i || t);
}
function xr(e, t, s, n) {
  e.addEventListener(t, s, n);
}
function xo(e, t, s, n) {
  e.removeEventListener(t, s, n);
}
const ri = /* @__PURE__ */ Symbol("_vei");
function ko(e, t, s, n, i = null) {
  const r = e[ri] || (e[ri] = {}), l = r[t];
  if (n && l)
    l.value = n;
  else {
    const [o, a] = Io(t);
    if (n) {
      const u = r[t] = $o(
        n,
        i
      );
      xr(e, o, u, a);
    } else l && (xo(e, o, l, a), r[t] = void 0);
  }
}
const So = /(Once|Passive|Capture)$/, Co = /^on:?(?:Once|Passive|Capture)$/;
function Io(e) {
  let t, s;
  for (; (s = e.match(So)) && !Co.test(e); )
    t || (t = {}), e = e.slice(0, e.length - s[1].length), t[s[1].toLowerCase()] = !0;
  return [e[2] === ":" ? e.slice(3) : Rt(e.slice(2)), t];
}
let nn = 0;
const Mo = /* @__PURE__ */ Promise.resolve(), To = () => nn || (Mo.then(() => nn = 0), nn = Date.now());
function $o(e, t) {
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
        u && Ze(
          u,
          t,
          5,
          o
        );
      }
    } else
      Ze(
        i,
        t,
        5,
        [n]
      );
  };
  return s.value = e, s.attached = To(), s;
}
const li = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Ao = (e, t, s, n, i, r) => {
  const l = i === "svg";
  t === "class" ? go(e, n, l) : t === "style" ? bo(e, s, n) : Ls(t) ? Fs(t) || ko(e, t, s, n, r) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Eo(e, t, n, l)) ? (ii(e, t, n), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && ni(e, t, n, l, r, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (Oo(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !de(n))) ? ii(e, Fe(t), n, r, t) : (t === "true-value" ? e._trueValue = n : t === "false-value" && (e._falseValue = n), ni(e, t, n, l));
};
function Eo(e, t, s, n) {
  if (n)
    return !!(t === "innerHTML" || t === "textContent" || t in e && li(t) && ne(s));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const i = e.tagName;
    if (i === "IMG" || i === "VIDEO" || i === "CANVAS" || i === "SOURCE")
      return !1;
  }
  return li(t) && de(s) ? !1 : t in e;
}
function Oo(e, t) {
  const s = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!s)
    return !1;
  const n = Fe(t);
  return Array.isArray(s) ? s.some((i) => Fe(i) === n) : Object.keys(s).some((i) => Fe(i) === n);
}
const oi = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return q(t) ? (s) => xs(t, s) : t;
}, rn = /* @__PURE__ */ Symbol("_assign"), Ro = {
  // <select multiple> value need to be deep traversed
  deep: !0,
  created(e, { value: t, modifiers: { number: s } }, n) {
    e._modelValue = t, xr(e, "change", () => {
      const i = Array.prototype.filter.call(e.options, (a) => a.selected).map(
        (a) => s ? wn(Rs(a)) : Rs(a)
      ), r = e.multiple, l = r ? Ot(e._modelValue) ? new Set(i) : i : i[0], o = e._pendingValue = [
        r,
        r ? q(l) ? i.slice() : i : l
      ];
      try {
        e[rn](l);
      } finally {
        jt(() => {
          e._pendingValue === o && (e._pendingValue = void 0);
        });
      }
    }), e[rn] = oi(n);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(e, { value: t, modifiers: { number: s } }) {
    ai(e, t, s);
  },
  beforeUpdate(e, { value: t }, s) {
    e._modelValue = t, e[rn] = oi(s);
  },
  updated(e, { value: t, modifiers: { number: s } }) {
    const n = e._pendingValue;
    e._pendingValue = void 0, (!n || n[0] !== e.multiple || !Po(t, n[1], n[0])) && ai(e, t, s);
  }
};
function Po(e, t, s) {
  if (!s || q(e)) return _t(e, t);
  if (Ot(e)) {
    if (e.size !== t.length) return !1;
    for (const n of t)
      if (!e.has(n)) return !1;
    return !0;
  }
  return !1;
}
function ai(e, t, s = !1) {
  const n = e.multiple, i = q(t);
  if (!(n && !i && !Ot(t))) {
    for (let r = 0, l = e.options.length; r < l; r++) {
      const o = e.options[r], a = Rs(o);
      if (n)
        if (i) {
          const u = typeof a;
          u === "string" || u === "number" ? o.selected = t.some((f) => String(f) === String(a)) : o.selected = Ur(t, a) > -1;
        } else
          o.selected = t.has(a) || s && typeof a == "string" && t.has(wn(a));
      else if (_t(Rs(o), t)) {
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
const Lo = ["ctrl", "shift", "alt", "meta"], Fo = {
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
  exact: (e, t) => Lo.some((s) => e[`${s}Key`] && !t.includes(s))
}, kr = (e, t) => {
  if (!e) return e;
  const s = e._withMods || (e._withMods = {}), n = t.join(".");
  return s[n] || (s[n] = ((i, ...r) => {
    for (let l = 0; l < t.length; l++) {
      const o = Fo[t[l]];
      if (o && o(i, t)) return;
    }
    return e(i, ...r);
  }));
}, No = /* @__PURE__ */ Ae({ patchProp: Ao }, ho);
let ci;
function jo() {
  return ci || (ci = Wl(No));
}
const Do = ((...e) => {
  const t = jo().createApp(...e), { mount: s } = t;
  return t.mount = (n) => {
    const i = Ko(n);
    if (!i) return;
    const r = t._component;
    !ne(r) && !r.render && !r.template && (r.template = i.innerHTML), i.nodeType === 1 && (i.textContent = "");
    const l = s(i, !1, Uo(i));
    return i instanceof Element && (i.removeAttribute("v-cloak"), i.setAttribute("data-v-app", "")), l;
  }, t;
});
function Uo(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Ko(e) {
  return de(e) ? document.querySelector(e) : e;
}
const Ps = () => ({ scale: 1, x: 0, y: 0 });
function Ho() {
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
function ui(e, t, s = !1) {
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
function ln(e, t) {
  const s = e.mode === "single" ? e.images : Cs(e), n = e.mode === "single" ? "currentId" : "rightId", r = s.findIndex((l) => l.id === e[n]) + t;
  r >= 0 && r < s.length && (e[n] = s[r].id);
}
function Vo(e) {
  e.open = !1, e.checked.clear(), e.pinned.clear(), e.unavailable.clear(), e.currentId = null, e.leftId = null, e.rightId = null, e.manualMatches = {}, e.panel = !1, e.mode = "grid", e.scope = "folder", e.promptIds.clear(), e.transforms = { left: Ps(), right: Ps() }, e.records.clear(), e.images = [];
}
function Bo(e, t) {
  e.linked = t, t && (e.transforms.right = { ...e.transforms.left });
}
function Gt(e, t, s) {
  e.transforms[t] = { ...s }, e.linked && (e.transforms[t === "left" ? "right" : "left"] = { ...s });
}
function Wo(e, t, s, n, i) {
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
function Sr(e, t, s, n, i, r) {
  const l = Math.max(1, Math.floor(n / i)), o = Math.floor(s / i) * l, a = e[o]?.id, u = t.findIndex((f) => f.id === a);
  return u < 0 ? s : Math.floor(u / Math.max(1, Math.floor(n / r))) * r + Math.min(s % i, r - 1);
}
function qo(e, t, s, n) {
  return s < t ? s : s + n > t + e ? Math.max(0, s + n - e) : t;
}
class zo {
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
      ui(this.session, n, i === null), this.cursor = i, this.version = r, this.firstCursor = l, this.error = "";
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
      ui(this.session, [
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
const Cr = ["prompt", "workflow"], fi = 500, Go = 5e3, Jo = 1e3, Yo = /* @__PURE__ */ new Set(["seed", "noise_seed", "random_seed"]), Xo = /* @__PURE__ */ new Set(["ckpt_name", "checkpoint_name", "model_name", "unet_name", "diffusion_model_name"]), di = {
  CLIPTextEncode: ["text"],
  CLIPTextEncodeSDXL: ["text_g", "text_l"],
  CLIPTextEncodeSDXLRefiner: ["text"]
};
function pe(e) {
  return e !== null && typeof e == "object" && !Array.isArray(e);
}
function ot(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function Yt(e) {
  return ot(di, e) ? di[e] : void 0;
}
function Qo(e) {
  return typeof e == "string" ? e.trim().length > 0 : typeof e == "number" && Number.isSafeInteger(e);
}
function vn(e) {
  if (!pe(e) || Object.keys(e).length !== 1 || typeof e.__shiba_number__ != "string" || !/^-?(?:0|[1-9]\d*)$/.test(e.__shiba_number__)) return;
  const t = e.__shiba_number__, s = BigInt(t);
  return s > BigInt(Number.MAX_SAFE_INTEGER) || s < BigInt(Number.MIN_SAFE_INTEGER) ? t : void 0;
}
function Zo(e) {
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
  const i = Yt(e)?.includes(t) === !0 && typeof s == "string", r = n ? "reference" : i ? "prompt" : Xo.has(t) && typeof s == "string" ? "model" : t === "lora_name" && typeof s == "string" ? "lora-name" : /lora/i.test(e) && ["strength_model", "strength_clip", "strength", "lora_strength"].includes(t) ? "lora-strength" : "value";
  return { key: t, label: t, value: s, kind: r, promptText: i };
}
function Kt(e, t) {
  if (Object.is(e, t)) return !0;
  if (Array.isArray(e) && Array.isArray(t))
    return e.length === t.length && e.every((s, n) => Kt(s, t[n]));
  if (pe(e) && pe(t)) {
    const s = Object.keys(e);
    return s.length === Object.keys(t).length && s.every((n) => ot(t, n) && Kt(e[n], t[n]));
  }
  return !1;
}
function hi(e, t, s) {
  if (t == null) return { state: "missing", nodes: [] };
  if (!pe(t) || e === "workflow" && !Array.isArray(t.nodes))
    return s.push(`${e}: 保存形式を解析できません。`), { state: "invalid", nodes: [] };
  const n = e === "prompt" ? Object.entries(t) : t.nodes.map((a, u) => [pe(a) && (typeof a.id == "string" || typeof a.id == "number") ? String(a.id) : `不明[${u}]`, a]), i = [];
  let r = n.length > fi;
  r && s.push(`${e}: ノード数が表示上限を超えています。一部のみ比較します。元 JSON は保持しています。`);
  let l = 0;
  const o = /* @__PURE__ */ new Set();
  for (const [a, u] of n.slice(0, fi)) {
    const f = pe(u) ? u[e === "prompt" ? "class_type" : "type"] : void 0;
    if (!pe(u) || typeof f != "string" || !f || o.has(a) || e === "workflow" && !Qo(u.id)) {
      s.push(`${e}: ノード ${a} の形式が不正、または ID が重複しています。`), r = !0;
      continue;
    }
    o.add(a);
    const h = e === "prompt" && pe(u._meta) && typeof u._meta.title == "string" ? u._meta.title : typeof u.title == "string" ? u.title : "", p = [];
    let g = !0;
    if (e === "prompt")
      if (!pe(u.inputs)) g = !1;
      else
        for (const [F, O] of Object.entries(u.inputs)) {
          const M = Array.isArray(O) && O.length === 2 && typeof O[0] == "string" && Number.isInteger(O[1]) && O[1] >= 0 && ot(t, O[0]);
          p.push(ws(f, F, O, M));
        }
    else {
      if (Array.isArray(u.widgets_values))
        u.widgets_values.forEach((F, O) => p.push({ key: `widgets_values[${O}]`, label: `保存値[${O}]（名称不明）`, value: F, kind: "value", promptText: !1 }));
      else if (pe(u.widgets_values))
        for (const [F, O] of Object.entries(u.widgets_values)) {
          const M = ws(f, F, O);
          p.push({ ...M, key: `widgets_values.${F}` });
        }
      else u.widgets_values != null && (g = !1);
      if (pe(u.inputs))
        for (const [F, O] of Object.entries(u.inputs)) p.push(ws(f, F, O));
      else if (Array.isArray(u.inputs))
        for (const [F, O] of u.inputs.entries()) {
          if (!pe(O)) {
            g = !1;
            continue;
          }
          const M = typeof O.name == "string" ? O.name : `入力[${F}]（名称不明）`;
          if (ot(O, "value") && p.push(ws(f, M, O.value)), O.link != null) {
            const C = Array.isArray(t.links) ? t.links.find((H) => Array.isArray(H) ? H[0] === O.link : pe(H) && H.id === O.link) : void 0, I = Array.isArray(C) ? [String(C[1]), C[2]] : pe(C) && ot(C, "origin_id") ? [String(C.origin_id), C.origin_slot] : { link_id: O.link };
            C || (g = !1), p.push({ key: `inputs.${M}`, label: M, value: I, kind: "reference", promptText: !1 });
          }
        }
      else u.inputs != null && (g = !1);
      ot(u, "mode") && p.push({ key: "mode", label: "保存された実行モード", value: u.mode, kind: "value", promptText: !1 }), !ot(u, "widgets_values") && !ot(u, "inputs") && (g = !1);
    }
    const P = p.filter((F) => !Yo.has(F.key.replace(/^(?:widgets_values|inputs)\./, ""))), S = P.slice(0, Math.max(0, Go - l));
    l += S.length, S.length < P.length && (g = !1, s.push(`${e}: 保存項目数が表示上限を超えています。元 JSON は保持しています。`)), S.some((F) => Zo(F.value)) && (g = !1, s.push(`${e}: ノード ${a} の数値がブラウザーの正確な整数精度を超えています。値の一致や正確なコピーを保証できません。`)), g || (r = !0, s.push(`${e}: ノード ${a} (${f}) の一部情報を正確に確認できません。`)), i.push({ key: `${e}:${a}`, id: a, type: f, title: h, source: e, fields: S, complete: g });
  }
  return i.length === 0 ? (s.push(`${e}: 比較できる保存ノードがありません。`), { state: n.length ? "invalid" : "partial", nodes: i }) : { state: r ? "partial" : "ok", nodes: i };
}
function pi(e) {
  const t = Array.isArray(e.warnings) ? e.warnings.filter((o) => typeof o == "string") : [], s = hi("prompt", e.prompt, t), n = hi("workflow", e.workflow, t), i = [...s.nodes, ...n.nodes];
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
function gi(e) {
  return [...new Set(e.nodes.flatMap((t) => t.fields.filter((s) => s.kind === "model" && typeof s.value == "string").map((s) => s.value)))];
}
function Ir(e, t, s, n) {
  const i = [], r = /* @__PURE__ */ new Set(), l = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Set(), a = new Map(t.map((h) => [h.key, h])), u = Object.values(s).filter((h) => h !== null);
  for (const h of Object.keys(s))
    e.some((p) => p.key === h) || (o.add(h), n.push(`${h}: 手動対応の左ノードが現在の画像にありません。対応を選び直してください。`));
  for (const h of e) {
    if (!ot(s, h.key)) continue;
    const p = s[h.key];
    if (p === null) {
      o.add(h.key);
      continue;
    }
    const g = a.get(p);
    if (!g || g.source !== h.source || u.filter((P) => P === p).length > 1) {
      o.add(h.key), n.push(`${h.key}: 手動対応が不正、または右ノードが重複しています。対応を選び直してください。`);
      continue;
    }
    i.push({ leftKey: h.key, rightKey: g.key, reason: "manual" }), r.add(h.key), l.add(g.key);
  }
  function f(h, p, g) {
    i.push({ leftKey: h.key, rightKey: p.key, reason: g }), r.add(h.key), l.add(p.key);
  }
  for (const h of Cr) {
    const p = e.filter((S) => S.source === h), g = t.filter((S) => S.source === h);
    if (p.length === g.length && p.every((S) => g.some((F) => F.id === S.id && F.type === S.type)))
      for (const S of p) {
        const F = g.find((O) => O.id === S.id && O.type === S.type);
        F && !r.has(S.key) && !o.has(S.key) && !l.has(F.key) && f(S, F, "id-type");
      }
    for (const S of p) {
      if (r.has(S.key) || o.has(S.key)) continue;
      const F = g.filter((M) => M.type === S.type && !l.has(M.key)), O = p.filter((M) => M.type === S.type && !r.has(M.key));
      if (F.length === 1 && O.length === 1) f(S, F[0], "type");
      else if (S.title) {
        const M = F.filter((C) => C.title === S.title);
        M.length === 1 && O.filter((C) => C.title === S.title).length === 1 && f(S, M[0], "type-title");
      }
    }
  }
  return { matches: i, blocked: o };
}
function ea(e, t, s = {}) {
  const n = [...e.warnings.map((C) => `左: ${C}`), ...t.warnings.map((C) => `右: ${C}`)], i = [], r = s.manualMatches ?? {};
  let l = e.status !== "ok" || t.status !== "ok", o = 0, a = !1;
  for (const C of Cr)
    e.sources[C] !== t.sources[C] && (l = !0, n.push(`${C}: 左右で保存情報の範囲が異なります。欠落を追加・削除と断定しません。`));
  const { matches: u, blocked: f } = Ir(e.nodes, t.nodes, r, n);
  f.size && (l = !0), u.some((C) => C.reason === "id-type") && n.push("ID・型による自動対応は保存グラフに基づく候補です。別 workflow の同一性や、モデルファイル・コード版の一致を保証しません。");
  const h = new Map(e.nodes.map((C) => [C.key, C])), p = new Map(t.nodes.map((C) => [C.key, C])), g = new Set(u.map((C) => C.leftKey)), P = new Set(u.map((C) => C.rightKey));
  function S(C, I, H, le, z, V, te) {
    if (i.length >= Jo) {
      l = !0, a || n.push("差分数が表示上限を超えています。一部のみ表示します。元 JSON から全保存値を確認できます。"), a = !0;
      return;
    }
    i.push({ id: `${C?.key ?? ""}|${I?.key ?? ""}|${H}|${te}`, kind: te, source: (C ?? I).source, ...C ? { leftNode: C } : {}, ...I ? { rightNode: I } : {}, path: H, label: le, ...C ? { left: z } : {}, ...I ? { right: V } : {} });
  }
  function F(C, I, H, le, z, V, te, W = 0) {
    if (!Kt(z, V))
      if (vn(z) !== void 0 || vn(V) !== void 0) S(C, I, H, le, z, V, te);
      else if (te !== "connection" && W < 64 && Array.isArray(z) && Array.isArray(V))
        for (let K = 0; K < Math.max(z.length, V.length); K++) F(C, I, `${H}[${K}]`, `${le}[${K}]`, z[K], V[K], te, W + 1);
      else if (te !== "connection" && W < 64 && pe(z) && pe(V))
        for (const K of /* @__PURE__ */ new Set([...Object.keys(z), ...Object.keys(V)])) F(C, I, `${H}.${K}`, `${le}.${K}`, z[K], V[K], te, W + 1);
      else S(C, I, H, le, z, V, te);
  }
  for (const C of u) {
    const I = h.get(C.leftKey), H = p.get(C.rightKey);
    I.type !== H.type && S(I, H, "class_type", "ノード型", I.type, H.type, "changed");
    const le = new Map(I.fields.map((V) => [V.key, V])), z = new Map(H.fields.map((V) => [V.key, V]));
    for (const V of /* @__PURE__ */ new Set([...le.keys(), ...z.keys()])) {
      const te = le.get(V), W = z.get(V);
      if (te?.promptText && W?.promptText) {
        o++;
        continue;
      }
      if (!te || !W) {
        l = !0, n.push(`${I.source}: ${I.id} ↔ ${H.id} / ${V}: 片方に保存値がありません。設定の削除とは断定できません。`);
        continue;
      }
      F(I, H, V, te.label, te.value, W.value, te.kind === "reference" || W.kind === "reference" ? "connection" : "changed");
    }
  }
  const O = [], M = [];
  for (const [C, I, H, le, z] of [
    ["left", e.nodes, t.nodes, g, O],
    ["right", t.nodes, e.nodes, P, M]
  ])
    for (const V of I) {
      if (le.has(V.key)) continue;
      const te = H.filter((K) => K.source === V.source && K.type === V.type), W = e.status === "ok" && t.status === "ok" && e.sources[V.source] === "ok" && t.sources[V.source] === "ok";
      te.length === 0 && W && !f.has(V.key) ? S(C === "left" ? V : void 0, C === "right" ? V : void 0, "", C === "left" ? "右で削除（左にのみ保存）" : "右で追加（右にのみ保存）", C === "left" ? V.fields : void 0, C === "right" ? V.fields : void 0, C === "left" ? "removed" : "added") : (l = !0, z.push({ node: V, candidateKeys: te.map((K) => K.key) }));
    }
  return (O.length || M.length) && n.push("対応未確定のノードがあります。候補を確認し、必要に応じて手動で対応付けてください。"), { status: l ? "incomplete" : i.length ? "different" : "same", differences: i, matches: u, unmatchedLeft: O, unmatchedRight: M, warnings: [...new Set(n)], excludedPromptFields: o };
}
function mi(e, t) {
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
          const p = h.key.replace(/^widgets_values\./, ""), g = f.fields.find((P) => P.key.replace(/^widgets_values\./, "") === p && P.promptText);
          if (g && !Kt(h.value, g.value)) return null;
        }
    }
  }
  const n = e.nodes.filter((o) => o.source === s && Yt(o.type)), i = t.nodes.filter((o) => o.source === s && Yt(o.type));
  if (!n.length || n.length !== i.length) return null;
  const { matches: r } = Ir(n, i, {}, []);
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
    const i = vn(s);
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
class ta {
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
const Ye = new ta(), _s = { high: 2, normal: 1, low: 0 };
class sa {
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
const na = new sa(4), Ft = /* @__PURE__ */ new Map(), vi = { high: 2, normal: 1, low: 0 };
function Mr(e, t = "normal") {
  const s = Ye.get(e);
  if (s) return { done: Promise.resolve(s), cancel: () => {
  } };
  let n = Ft.get(e);
  if (n)
    vi[t] > vi[n.priority] && (n.priority = t, n.job?.promote(t));
  else {
    const l = new AbortController(), o = Ye.epoch;
    let a;
    n = { abort: l, users: 0, priority: t, done: new Promise((f) => {
      a = f;
    }) };
    const u = n;
    Ft.set(e, u), u.job = na.add(async () => {
      let f;
      try {
        const h = await fetch(e, {
          signal: l.signal,
          credentials: "same-origin",
          priority: u.priority === "normal" ? "auto" : u.priority
        });
        if (!h.ok) throw new Error("Preview unavailable");
        const p = await h.blob();
        !l.signal.aborted && o === Ye.epoch && (f = p, Ye.set(e, p, o));
      } catch {
      } finally {
        Ft.get(e) === u && Ft.delete(e), a(f);
      }
    }, t), u.job.done.then(() => a(void 0));
  }
  const i = n;
  i.users++;
  let r = !1;
  return {
    done: i.done,
    cancel: () => {
      r || (r = !0, --i.users === 0 && (i.abort.abort(), i.job?.cancel(), Ft.get(e) === i && Ft.delete(e)));
    }
  };
}
const ia = ["src", "alt"], ra = {
  key: 1,
  class: "sg-thumb-placeholder"
}, Pn = /* @__PURE__ */ hs({
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
    rt(
      () => s.url,
      (p) => {
        const g = ++a;
        u(), l.value = !1;
        const P = Ye.get(p) ?? (s.cachedFallbackUrl && Ye.get(s.cachedFallbackUrl));
        if (P) {
          i.value = URL.createObjectURL(P);
          return;
        }
        const S = Mr(p, s.priority);
        o = S.cancel, S.done.then((F) => {
          g === a && (F ? i.value = URL.createObjectURL(F) : l.value = !0);
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
      p.target === r.value && (i.value && URL.revokeObjectURL(i.value), i.value = "", l.value = !0, Ye.delete(s.url), s.cachedFallbackUrl && Ye.delete(s.cachedFallbackUrl));
    }
    return Hs(() => {
      a++, u();
    }), (p, g) => i.value ? (L(), j("img", {
      ref_key: "currentImage",
      ref: r,
      key: i.value,
      src: i.value,
      alt: e.alt,
      decoding: "async",
      onError: h,
      onLoad: f
    }, null, 40, ia)) : e.quiet ? ie("", !0) : (L(), j("span", ra, U(l.value ? "Image unavailable" : "Loading preview…"), 1));
  }
}), la = ["aria-label", "onClick"], oa = { class: "sg-card-tools" }, aa = ["title"], ca = ["aria-label", "checked", "onChange"], ua = ["aria-label", "onClick"], fa = /* @__PURE__ */ hs({
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
    const n = e, i = s, r = /* @__PURE__ */ Y(), l = /* @__PURE__ */ Y(1e3), o = /* @__PURE__ */ Y(600), a = /* @__PURE__ */ Y(n.initialScroll), u = ue(() => n.large ? 284 : 164), f = ue(
      () => Wo(
        n.images.length,
        l.value,
        o.value,
        a.value,
        u.value
      )
    ), h = ue(
      () => n.images.slice(f.value.start, f.value.end)
    );
    let p;
    function g() {
      r.value && (l.value = r.value.clientWidth || 1e3, o.value = r.value.clientHeight || 600);
    }
    function P() {
      i("position", {
        scroll: a.value,
        width: l.value,
        cell: u.value
      });
    }
    function S() {
      a.value = r.value?.scrollTop ?? 0, P(), f.value.end >= n.images.length && n.hasMore && i("more");
    }
    return rt(
      () => [n.images, n.large],
      async ([F, O], [M, C]) => {
        const I = Sr(
          M,
          F,
          a.value,
          l.value,
          C ? 284 : 164,
          O ? 284 : 164
        );
        await jt(), r.value && (r.value.scrollTop = I, a.value = I, P());
      },
      { flush: "pre" }
    ), $n(() => {
      g(), r.value && (r.value.scrollTop = a.value), p = new ResizeObserver(g), r.value && p.observe(r.value);
    }), Hs(() => p?.disconnect()), t({
      top: () => {
        r.value && (r.value.scrollTop = 0, a.value = 0, P());
      }
    }), (F, O) => (L(), j("div", {
      ref_key: "el",
      ref: r,
      class: "sg-grid-scroll",
      "data-testid": "image-grid",
      onScrollPassive: S
    }, [
      x("div", {
        class: "sg-grid-space",
        style: bt({ height: f.value.totalHeight + "px" })
      }, [
        x("div", {
          class: "sg-grid",
          style: bt({
            gridTemplateColumns: `repeat(${f.value.columns}, minmax(0,1fr))`,
            transform: `translateY(${f.value.offset}px)`
          })
        }, [
          (L(!0), j(Z, null, Me(h.value, (M) => (L(), j("article", {
            key: M.id,
            class: Je(["sg-card", { "sg-checked": e.checked.has(M.id) }]),
            style: bt({ height: u.value + "px" })
          }, [
            x("button", {
              class: "sg-thumb-button",
              "data-action": "view",
              "aria-label": "View " + M.name,
              onClick: (C) => i("view", M.id)
            }, [
              $e(Pn, {
                url: e.api.imageURL(M, "thumbnail", e.large ? 512 : 256),
                alt: M.name
              }, null, 8, ["url", "alt"])
            ], 8, la),
            x("div", oa, [
              x("label", {
                title: "Select " + M.name
              }, [
                x("input", {
                  type: "checkbox",
                  "aria-label": "Select " + M.name,
                  checked: e.checked.has(M.id),
                  onChange: (C) => i("check", M.id)
                }, null, 40, ca),
                O[1] || (O[1] = Ie(" Compare", -1))
              ], 8, aa),
              x("button", {
                class: Je(["sg-pin", { "sg-pinned": e.pinned.has(M.id) }]),
                "aria-label": "Pin " + M.name + " as reference",
                onClick: (C) => i("pin", M.id)
              }, U(e.pinned.has(M.id) ? "Pinned" : "Pin"), 11, ua)
            ])
          ], 6))), 128))
        ], 4)
      ], 4),
      e.hasMore ? (L(), j("button", {
        key: 0,
        class: "sg-load",
        onClick: O[0] || (O[0] = (M) => i("more"))
      }, " Load more images ")) : ie("", !0)
    ], 544));
  }
}), da = ["data-side", "data-image"], ha = { class: "sg-pane-caption" }, pa = ["aria-label", "disabled"], ga = {
  key: 0,
  class: "sg-unavailable",
  role: "status"
}, ma = ["src", "alt"], va = {
  key: 2,
  class: "sg-surface-status"
}, ya = ["title"], ba = { class: "sg-zoom-status" }, wa = {
  class: "sg-quality-status",
  role: "status"
}, yi = /* @__PURE__ */ hs({
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
    let g, P = null;
    const S = ue(
      () => Math.min(
        o.value / (u.value.width || n.image?.width || 1024),
        a.value / (u.value.height || n.image?.height || 1024)
      )
    ), F = ue(
      () => (u.value.width || n.image?.width || 1024) * S.value
    ), O = ue(
      () => (u.value.height || n.image?.height || 1024) * S.value
    ), M = ue(() => ({
      width: F.value + "px",
      height: O.value + "px",
      transform: `translate(-50%,-50%) translate(${n.transform.x * F.value * n.transform.scale}px,${n.transform.y * O.value * n.transform.scale}px) scale(${n.transform.scale})`
    }));
    rt(
      () => [n.image?.id, n.image?.revision],
      () => {
        r.value?.removeAttribute("src"), f.value = !1, h.value = !1, p.value = !1, u.value = { width: 0, height: 0 };
      }
    );
    async function C(W) {
      if (W.target !== r.value) return;
      const K = W.target;
      if (K.decode)
        try {
          await K.decode();
        } catch {
          K === r.value && (h.value = !0);
          return;
        }
      K === r.value && (u.value = { width: K.naturalWidth, height: K.naturalHeight }, f.value = !0);
    }
    function I(W) {
      f.value || (p.value = !0, !n.image?.width && W.width && W.height && (u.value = W));
    }
    function H(W) {
      W.target === r.value && (h.value = !0);
    }
    t({ originalScale: ue(() => 1 / S.value) });
    function le(W) {
      const K = n.transform.scale, fe = Math.min(
        32,
        Math.max(0.25, K * Math.exp(-W.deltaY * 15e-4))
      ), De = l.value.getBoundingClientRect(), dt = (W.clientX - De.left - De.width / 2) / F.value, Pt = (W.clientY - De.top - De.height / 2) / O.value;
      i("transform", {
        scale: fe,
        x: n.transform.x + dt * (1 / fe - 1 / K),
        y: n.transform.y + Pt * (1 / fe - 1 / K)
      });
    }
    function z(W) {
      W.button === 0 && (P = { x: W.clientX, y: W.clientY, start: { ...n.transform } }, l.value?.setPointerCapture(W.pointerId));
    }
    function V(W) {
      P && i("transform", {
        ...P.start,
        x: P.start.x + (W.clientX - P.x) / (F.value * P.start.scale),
        y: P.start.y + (W.clientY - P.y) / (O.value * P.start.scale)
      });
    }
    function te() {
      l.value && (o.value = l.value.clientWidth || 640, a.value = l.value.clientHeight || 600);
    }
    return $n(() => {
      te(), g = new ResizeObserver(te), l.value && g.observe(l.value);
    }), Hs(() => {
      r.value?.removeAttribute("src"), g?.disconnect();
    }), (W, K) => (L(), j("section", {
      class: "sg-image-pane",
      "data-side": e.side,
      "data-image": e.image?.id
    }, [
      x("div", ha, [
        x("strong", null, U(e.side === "left" ? "Reference · pinned" : "Image"), 1),
        x("span", null, U(e.image?.name ?? "No candidate"), 1),
        x("button", {
          "aria-label": "Show " + e.side + " original pixels",
          disabled: !f.value,
          onClick: K[0] || (K[0] = (fe) => i("original"))
        }, " 1:1 ", 8, pa)
      ]),
      e.unavailable ? (L(), j("p", ga, " No longer present in this folder. The selected image is kept in place; the displayed image may be cached. ")) : ie("", !0),
      x("div", {
        ref_key: "surface",
        ref: l,
        class: "sg-image-surface",
        onWheel: kr(le, ["prevent"]),
        onPointerdown: z,
        onPointermove: V,
        onPointerup: K[1] || (K[1] = (fe) => /* @__PURE__ */ ge(P) ? P.value = null : P = null),
        onPointercancel: K[2] || (K[2] = (fe) => /* @__PURE__ */ ge(P) ? P.value = null : P = null),
        onLostpointercapture: K[3] || (K[3] = (fe) => /* @__PURE__ */ ge(P) ? P.value = null : P = null),
        onDblclick: K[4] || (K[4] = (fe) => i("transform", { scale: 1, x: 0, y: 0 }))
      }, [
        e.image && !f.value ? (L(), j("div", {
          key: e.image.id + e.image.revision + "preview",
          class: "sg-image-preview",
          style: bt(M.value)
        }, [
          $e(Pn, {
            url: e.api.imageURL(e.image, "thumbnail", 512),
            "cached-fallback-url": e.api.imageURL(e.image, "thumbnail", 256),
            alt: e.image.name + " · preview",
            quiet: "",
            priority: "high",
            onReady: I
          }, null, 8, ["url", "cached-fallback-url", "alt"])
        ], 4)) : ie("", !0),
        e.image && !h.value ? (L(), j("img", {
          class: "sg-original",
          ref_key: "currentImage",
          ref: r,
          key: e.image.id + e.image.revision,
          src: e.api.imageURL(e.image, "original"),
          alt: e.image.name,
          style: bt({ ...M.value, opacity: f.value ? 1 : 0 }),
          fetchpriority: "high",
          loading: "eager",
          draggable: "false",
          decoding: "async",
          onLoad: C,
          onError: H
        }, null, 44, ma)) : ie("", !0),
        e.image ? ie("", !0) : (L(), j("p", va, U(h.value ? "Image unavailable. It may have been moved or overwritten." : "No comparison candidate. Select more images or change the candidate range."), 1))
      ], 544),
      x("div", {
        class: "sg-models",
        title: e.models.join(", ")
      }, [
        x("span", null, U(e.models.length ? "Model: " + e.models.join(" · ") : e.modelStatus), 1),
        x("span", ba, U(Math.round(e.transform.scale * 100)) + "% of fit", 1),
        x("span", wa, U(f.value ? "Original" : h.value ? "Original unavailable" : p.value ? "Preview · Loading original…" : "Loading original…"), 1)
      ], 8, ya)
    ], 8, da));
  }
}), _a = {
  class: "sg-metadata",
  "aria-label": "Saved settings"
}, xa = { class: "sg-panel-heading" }, ka = { key: 0 }, Sa = {
  key: 2,
  role: "status"
}, Ca = { class: "sg-muted" }, Ia = { class: "sg-node-mapping" }, Ma = ["aria-label", "value", "onChange"], Ta = { value: "__auto__" }, $a = ["value"], Aa = { key: 0 }, Ea = ["onClick"], Oa = ["onClick"], Ra = ["onClick"], Pa = { key: 5 }, La = /* @__PURE__ */ hs({
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
    const s = e, n = t, i = /* @__PURE__ */ Y(""), r = ue(
      () => s.compare && s.left && s.right ? ea(s.left, s.right, {
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
    return (f, h) => (L(), j("aside", _a, [
      x("div", xa, [
        x("h2", null, U(e.compare ? "Saved setting differences" : "Saved settings"), 1),
        x("button", {
          "aria-label": "Close settings",
          onClick: h[0] || (h[0] = (p) => n("close"))
        }, "×")
      ]),
      h[14] || (h[14] = x("p", { class: "sg-muted" }, " Saved values only. Prompt text is excluded from identified differences. Unknown widget values keep their saved positions. ", -1)),
      e.loading ? (L(), j("p", ka, "Loading saved metadata…")) : ie("", !0),
      e.left?.status === "invalid" || e.right?.status === "invalid" ? (L(), j("button", {
        key: 1,
        onClick: h[1] || (h[1] = (p) => n("retry"))
      }, " Reload saved settings ")) : ie("", !0),
      i.value ? (L(), j("p", Sa, U(i.value), 1)) : ie("", !0),
      r.value ? (L(), j(Z, { key: 3 }, [
        x("p", {
          class: Je(["sg-result", { "sg-warning": r.value.status === "incomplete" }])
        }, U(r.value.status === "same" ? "No differences in comparable saved settings." : r.value.status === "different" ? r.value.differences.length + " saved differences" : "Incomplete comparison. Missing or ambiguous settings are not equal."), 3),
        x("p", Ca, U(r.value.excludedPromptFields) + " identified prompt fields excluded. ", 1),
        (L(!0), j(Z, null, Me(r.value.warnings, (p, g) => (L(), j("p", {
          key: g,
          class: "sg-warning"
        }, U(p), 1))), 128)),
        x("button", {
          onClick: h[2] || (h[2] = (p) => l(r.value.differences))
        }, " Copy differences (left → right) "),
        x("details", Ia, [
          h[8] || (h[8] = x("summary", null, "Review / change node matching", -1)),
          h[9] || (h[9] = x("p", { class: "sg-muted" }, " One-to-one within the same saved source. Auto matches are candidates, not proof of workflow identity. ", -1)),
          (L(!0), j(Z, null, Me(e.left?.nodes, (p) => (L(), j("label", {
            key: p.key,
            class: "sg-match-row"
          }, [
            x("span", null, U(p.source) + " · " + U(p.id) + " · " + U(p.title || p.type), 1),
            x("select", {
              "aria-label": "Match " + p.key,
              value: e.manualMatches[p.key] === null ? "__none__" : e.manualMatches[p.key] ?? "__auto__",
              onChange: (g) => u(g, p.key)
            }, [
              x("option", Ta, " Auto: " + U(r.value.matches.find((g) => g.leftKey === p.key)?.rightKey ?? "unmatched"), 1),
              h[5] || (h[5] = x("option", { value: "__none__" }, "Leave unmatched", -1)),
              (L(!0), j(Z, null, Me(e.right?.nodes.filter(
                (g) => g.source === p.source
              ), (g) => (L(), j("option", {
                key: g.key,
                value: g.key
              }, U(g.id) + " · " + U(g.title || g.type), 9, $a))), 128))
            ], 40, Ma),
            x("details", null, [
              h[6] || (h[6] = x("summary", null, "Left saved values", -1)),
              x("pre", null, U(ke(nt)(
                p.fields.map((g) => ({ name: g.label, value: g.value }))
              )), 1)
            ]),
            o(p.key) ? (L(), j("details", Aa, [
              h[7] || (h[7] = x("summary", null, "Right candidate saved values", -1)),
              x("pre", null, U(ke(nt)(
                o(p.key)?.fields.map((g) => ({
                  name: g.label,
                  value: g.value
                }))
              )), 1)
            ])) : ie("", !0)
          ]))), 128)),
          (L(!0), j(Z, null, Me(r.value.unmatchedLeft, (p) => (L(), j("p", {
            key: p.node.key,
            class: "sg-warning"
          }, " Unmatched left " + U(p.node.key) + " · candidates: " + U(p.candidateKeys.join(", ") || "none"), 1))), 128)),
          (L(!0), j(Z, null, Me(r.value.unmatchedRight, (p) => (L(), j("p", {
            key: p.node.key,
            class: "sg-warning"
          }, " Unmatched right " + U(p.node.key), 1))), 128))
        ]),
        (L(!0), j(Z, null, Me(r.value.differences, (p) => (L(), j("article", {
          key: p.id,
          class: "sg-difference"
        }, [
          x("strong", null, U(p.leftNode?.title || p.rightNode?.title || p.leftNode?.type || p.rightNode?.type), 1),
          x("small", null, U(p.source) + " · " + U(p.leftNode?.id ?? "—") + " → " + U(p.rightNode?.id ?? "—") + " · " + U(p.kind), 1),
          x("h3", null, U(p.label), 1),
          x("label", null, [
            h[10] || (h[10] = Ie("Left reference ", -1)),
            x("button", {
              onClick: (g) => l(p.left)
            }, "Copy left", 8, Ea)
          ]),
          x("pre", null, U(ke(nt)(p.left)), 1),
          x("label", null, [
            h[11] || (h[11] = Ie("Right image ", -1)),
            x("button", {
              onClick: (g) => l(p.right)
            }, "Copy right", 8, Oa)
          ]),
          x("pre", null, U(ke(nt)(p.right)), 1)
        ]))), 128))
      ], 64)) : e.right ? (L(), j(Z, { key: 4 }, [
        x("p", null, "Status: " + U(e.right.status), 1),
        (L(!0), j(Z, null, Me(e.right.warnings, (p) => (L(), j("p", {
          key: p,
          class: "sg-warning"
        }, U(p), 1))), 128)),
        (L(!0), j(Z, null, Me(e.right.nodes, (p) => (L(), j("details", {
          key: p.key
        }, [
          x("summary", null, U(p.source) + " · " + U(p.id) + " · " + U(p.title || p.type), 1),
          (L(!0), j(Z, null, Me(p.fields, (g) => (L(), j("div", {
            key: g.key,
            class: "sg-field"
          }, [
            x("label", null, [
              Ie(U(g.label) + " ", 1),
              x("button", {
                onClick: (P) => l(g.value)
              }, "Copy value", 8, Ra)
            ]),
            x("pre", null, U(ke(nt)(g.value)), 1)
          ]))), 128))
        ]))), 128))
      ], 64)) : ie("", !0),
      e.right ? (L(), j("details", Pa, [
        h[12] || (h[12] = x("summary", null, "Original saved JSON (may include prompts)", -1)),
        h[13] || (h[13] = x("p", { class: "sg-muted" }, " Copied JSON may contain prompt text. Nothing is sent outside this ComfyUI server. ", -1)),
        e.left && e.compare ? (L(), j("button", {
          key: 0,
          onClick: h[3] || (h[3] = (p) => l(a(e.left)))
        }, " Copy original left JSON")) : ie("", !0),
        x("button", {
          onClick: h[4] || (h[4] = (p) => l(a(e.right)))
        }, " Copy original " + U(e.compare ? "right " : "") + "JSON ", 1),
        x("pre", null, U(ke(nt)(e.right.raw)), 1)
      ])) : ie("", !0)
    ]));
  }
});
function Fa(e, t, s) {
  return t < 0 || t >= e ? [] : [s, 2 * s, 3 * s, -s].map((n) => t + n).filter((n) => n >= 0 && n < e);
}
class Na {
  requests = /* @__PURE__ */ new Map();
  update(t) {
    const s = new Set(t.slice(0, 4));
    for (const [n, i] of this.requests)
      s.has(n) || (i.cancel(), this.requests.delete(n));
    for (const n of s)
      this.requests.has(n) || this.requests.set(n, Mr(n, "low"));
  }
  clear() {
    for (const t of this.requests.values()) t.cancel();
    this.requests.clear();
  }
}
const ja = { class: "sg-header" }, Da = { class: "sg-folder" }, Ua = ["value", "disabled"], Ka = ["value"], Ha = {
  key: 0,
  class: "sg-error",
  role: "alert"
}, Va = { class: "sg-toolbar" }, Ba = { class: "sg-size" }, Wa = ["aria-pressed"], qa = ["aria-pressed"], za = ["disabled"], Ga = {
  key: 1,
  class: "sg-empty"
}, Ja = { class: "sg-grid-footer" }, Ya = { class: "sg-toolbar sg-view-toolbar" }, Xa = { class: "sg-reference-select" }, Qa = ["value"], Za = ["value"], ec = {
  key: 0,
  value: "prompt"
}, tc = ["disabled"], sc = { class: "sg-position" }, nc = ["disabled"], ic = { key: 2 }, rc = ["checked"], lc = ["aria-expanded"], oc = ["aria-pressed"], ac = { class: "sg-view-body" }, cc = {
  key: 0,
  class: "sg-candidate-bar"
}, uc = ["aria-label", "aria-pressed", "onClick"], fc = ["disabled"], dc = {
  key: 1,
  class: "sg-helper",
  role: "status"
}, hc = { class: "sg-view-footer" }, pc = { key: 0 }, gc = /* @__PURE__ */ hs({
  __name: "Gallery",
  props: {
    api: {}
  },
  setup(e) {
    const t = e, s = /* @__PURE__ */ Is(Ho()), n = /* @__PURE__ */ Y([]), i = /* @__PURE__ */ Y(!0), r = /* @__PURE__ */ Y(!1), l = new Na();
    let o = -1, a = "grid", u = 1;
    const f = /* @__PURE__ */ Y(), h = /* @__PURE__ */ Y(), p = /* @__PURE__ */ Y(), g = /* @__PURE__ */ Y(), P = /* @__PURE__ */ Y(), S = /* @__PURE__ */ Y({ scroll: 0, width: 1e3, cell: 284 }), F = /* @__PURE__ */ Y(), O = /* @__PURE__ */ Y(0), M = new zo(t.api, s, () => O.value++), C = /* @__PURE__ */ Y(""), I = /* @__PURE__ */ Y(""), H = /* @__PURE__ */ Y(!1), le = /* @__PURE__ */ Y(!1), z = /* @__PURE__ */ Is(/* @__PURE__ */ new Map()), V = /* @__PURE__ */ new Map();
    let te, W = new AbortController(), K = 0, fe = 0, De;
    const dt = ue(() => (O.value, M.loading)), Pt = ue(() => (O.value, M.error)), et = ue(() => (O.value, M.cursor !== null)), ve = ue(() => s.leftId ? s.records.get(s.leftId) : void 0), ye = ue(() => {
      const _ = s.mode === "single" ? s.currentId : s.rightId;
      return _ ? s.records.get(_) : void 0;
    }), Ue = (_) => _.id + ":" + _.revision, ht = ue(
      () => ve.value ? z.get(Ue(ve.value)) : void 0
    ), Ke = ue(
      () => ye.value ? z.get(Ue(ye.value)) : void 0
    ), Pe = ue(
      () => ht.value ? gi(ht.value) : []
    ), ps = ue(
      () => Ke.value ? gi(Ke.value) : []
    ), gs = ue(() => {
      const _ = /* @__PURE__ */ new Set([...s.pinned, ...s.checked]);
      return s.leftId && _.add(s.leftId), [..._].map((v) => s.records.get(v)).filter((v) => !!v);
    }), pt = ue(
      () => s.mode === "single" ? s.images : Cs(s)
    ), Ce = ue(
      () => pt.value.findIndex(
        (_) => _.id === (s.mode === "single" ? s.currentId : s.rightId)
      )
    ), gt = ue(() => {
      const _ = Math.max(0, Ce.value);
      return pt.value.slice(Math.max(0, _ - 7), _ + 8);
    });
    rt(
      () => [s.mode, Ce.value, gt.value.map(Ue).join(",")],
      () => {
        const _ = Ce.value;
        s.mode === a && o >= 0 && _ !== o ? u = _ < o ? -1 : 1 : s.mode !== a && (u = 1), o = _, a = s.mode, l.update(s.mode === "grid" ? [] : Fa(pt.value.length, _, u).map((v) => t.api.imageURL(pt.value[v], "thumbnail", 512)));
      },
      { flush: "post" }
    ), rt(
      () => s.images,
      (_, v) => {
        s.mode !== "grid" && (S.value.scroll = Sr(
          v,
          _,
          S.value.scroll,
          S.value.width,
          S.value.cell,
          S.value.cell
        ));
      }
    ), rt(
      () => [
        s.mode,
        s.rightId,
        s.currentId,
        r.value,
        gt.value.map((_) => _.id).join(",")
      ],
      async () => {
        await jt();
        const _ = F.value, v = _?.querySelector("[aria-pressed=true]");
        _ && v && (_.scrollLeft = qo(
          _.clientWidth,
          _.scrollLeft,
          v.offsetLeft,
          v.offsetWidth
        ));
      }
    );
    function Ht(_) {
      return _ ? "No identifiable saved model information" : "Loading saved model information…";
    }
    async function He(_, v = "view") {
      if (!_) return;
      const R = Ue(_);
      if (z.has(R)) return z.get(R);
      const J = V.get(R);
      if (J)
        return J.owners.add(v), J.promise;
      const we = K, mt = new AbortController(), Ve = mt.signal, St = t.api.metadata(_, Ve).then(pi).catch(
        (tt) => Ve.aborted ? void 0 : pi({
          status: "invalid",
          prompt: null,
          workflow: null,
          warnings: [tt instanceof Error ? tt.message : "Metadata unavailable"]
        })
      ).then((tt) => {
        if (tt && we === K && !Ve.aborted && (z.set(R, tt), z.size > 200)) {
          const Bt = /* @__PURE__ */ new Set([
            ve.value && Ue(ve.value),
            ye.value && Ue(ye.value),
            R
          ]);
          for (const Wt of z.keys())
            if (!Bt.has(Wt)) {
              z.delete(Wt);
              break;
            }
        }
        return we === K && !Ve.aborted ? tt : void 0;
      }).finally(() => {
        V.get(R)?.promise === St && V.delete(R);
      });
      return V.set(R, { promise: St, abort: mt, owners: /* @__PURE__ */ new Set([v]) }), St;
    }
    function Vt(_, v = /* @__PURE__ */ new Set()) {
      for (const [R, J] of V)
        v.has(R) || (J.owners.delete(_), J.owners.size || (J.abort.abort(), V.delete(R)));
    }
    function c() {
      clearTimeout(te), Vt("view"), Vt("search");
    }
    function d() {
      return (s.mode === "grid" ? [] : s.mode === "compare" ? [ve.value, ye.value] : [ye.value]).filter((_) => !!_);
    }
    function m() {
      clearTimeout(te);
      for (const _ of d()) He(_);
    }
    rt(
      () => [s.mode, ve.value?.id, ve.value?.revision, ye.value?.id, ye.value?.revision],
      () => {
        clearTimeout(te);
        const _ = d();
        Vt("view", new Set(_.map(Ue))), _.length && (te = setTimeout(m, 120)), s.manualMatches = {};
      },
      { flush: "post" }
    ), rt(() => s.panel, (_) => {
      _ && m();
    });
    async function k() {
      if (s.open) return;
      K++, W = new AbortController(), s.open = !0, S.value.scroll = 0, C.value = "", I.value = "", await jt(), f.value?.showModal(), le.value = !0;
      const _ = K;
      try {
        const v = await t.api.folders(W.signal);
        if (_ !== K) return;
        n.value = v.folders;
        const R = v.folders.find((J) => J.id === s.folderId) ?? v.folders[0];
        R ? await M.selectFolder(R.id) : C.value = "No output folders are available.";
      } catch (v) {
        _ === K && (C.value = v instanceof Error ? v.message : "Folders unavailable");
      } finally {
        _ === K && (le.value = !1);
      }
      _ === K && (De = setInterval(() => {
        document.hidden || $();
      }, 5e3));
    }
    function y() {
      l.clear(), K++, fe++, H.value = !1, W.abort(), c(), M.dispose(), clearInterval(De), V.clear(), z.clear(), Ye.clear(), f.value?.close(), Vo(s), I.value = "", jt(() => g.value?.focus());
    }
    async function w(_) {
      c(), l.clear(), S.value.scroll = 0, fe++, H.value = !1, I.value = "", await M.selectFolder(_.target.value);
    }
    async function $() {
      s.open && await M.refresh();
    }
    function A(_) {
      r.value = !1, s.currentId = _, s.mode = "single", s.panel = !1, Gt(s, "right", { scale: 1, x: 0, y: 0 });
    }
    function T(_) {
      s.checked.has(_) ? s.checked.delete(_) : s.checked.add(_);
    }
    function b() {
      Vt("search"), fe++, H.value = !1, I.value = "";
    }
    rt(() => [ve.value?.id, ve.value?.revision], b, {
      flush: "sync"
    });
    function N(_) {
      b(), s.pinned.add(_), s.leftId = _, s.mode = "compare", s.scope = s.checked.size > 1 ? "checked" : "folder", s.rightId = _, s.manualMatches = {}, s.panel = !1, I.value = "", s.transforms = {
        left: { scale: 1, x: 0, y: 0 },
        right: { scale: 1, x: 0, y: 0 }
      };
    }
    function E() {
      const _ = s.images.find((v) => s.checked.has(v.id))?.id ?? s.currentId ?? s.images[0]?.id;
      _ && N(_);
    }
    function D() {
      H.value && b(), Cs(s).some((_) => _.id === s.rightId) || (s.rightId = Cs(s)[0]?.id ?? null);
    }
    function B(_) {
      const v = {
        left: { scale: h.value?.originalScale ?? 1, x: 0, y: 0 },
        right: { scale: p.value?.originalScale ?? 1, x: 0, y: 0 }
      };
      s.linked ? s.transforms = v : s.transforms[_] = v[_];
    }
    function G() {
      Gt(s, "left", { scale: 1, x: 0, y: 0 }), Gt(s, "right", { scale: 1, x: 0, y: 0 });
    }
    function ee() {
      for (const _ of [ve.value, ye.value])
        _ && (z.delete(Ue(_)), He(_));
    }
    function X(_, v) {
      if (v === void 0) delete s.manualMatches[_];
      else {
        if (v !== null)
          for (const [R, J] of Object.entries(s.manualMatches))
            R !== _ && J === v && (s.manualMatches[R] = null);
        s.manualMatches[_] = v;
      }
    }
    async function ce() {
      const _ = ve.value;
      if (!_ || H.value) return;
      const v = ++fe;
      H.value = !0, I.value = "Checking saved text in " + s.images.length + " loaded images…";
      const R = await He(_, "search");
      if (v !== fe) return;
      if (!R || mi(R, R) === null) {
        I.value = "Saved prompt text cannot be identified. Normal comparison remains available.", H.value = !1;
        return;
      }
      const J = s.images.slice();
      let we = 0, mt = 0, Ve = 0;
      const St = /* @__PURE__ */ new Set();
      async function tt() {
        for (; we < J.length && v === fe; ) {
          const Bt = J[we++];
          if (Bt.id === _.id) continue;
          const Wt = await He(Bt, "search");
          if (v !== fe) return;
          const Ln = Wt ? mi(R, Wt) : null;
          Ln === !0 && St.add(Bt.id), Ln === null && mt++, Ve++, I.value = `Checking saved text… ${Ve}/${J.length - 1}`;
        }
      }
      await Promise.all([tt(), tt()]), v === fe && (H.value = !1, s.promptIds = St, s.scope = "prompt", D(), I.value = `${St.size} exact saved-text matches; ${mt} unknown. Checked ${J.length} loaded images${et.value ? " only. Load more in the grid to search further" : ""}. Saved text does not prove the final generated prompt.`, H.value = !1);
    }
    function he(_) {
      if (!s.open) return;
      _.stopPropagation();
      const v = _.target;
      if (_.key === "Escape") {
        _.preventDefault(), s.panel ? s.panel = !1 : s.mode !== "grid" ? s.mode = "grid" : y();
        return;
      }
      ["INPUT", "SELECT", "TEXTAREA"].includes(v.tagName) || s.mode !== "grid" && (_.key === "ArrowLeft" || _.key === "ArrowRight") && (_.preventDefault(), ln(s, _.key === "ArrowLeft" ? -1 : 1));
    }
    const be = () => {
      $();
    };
    return $n(() => {
      t.api.comfy.addEventListener?.("executed", be), document.addEventListener("visibilitychange", be);
    }), Hs(() => {
      K++, fe++, l.clear(), Ye.clear(), clearInterval(De), W.abort(), c(), M.dispose(), t.api.comfy.removeEventListener?.("executed", be), document.removeEventListener("visibilitychange", be);
    }), (_, v) => (L(), j(Z, null, [
      x("button", {
        ref_key: "launcher",
        ref: g,
        "data-action": "open",
        "data-testid": "gallery-launcher",
        class: "sg-launcher",
        "aria-label": "Open Gallery",
        onClick: k
      }, [...v[22] || (v[22] = [
        x("span", { "aria-hidden": "true" }, "▧", -1),
        Ie(" Gallery ", -1)
      ])], 512),
      s.open ? (L(), j("dialog", {
        key: 0,
        ref_key: "dialog",
        ref: f,
        class: Je(["sg-dialog", { "sg-single-view": s.mode === "single" }]),
        "aria-label": "Shiba Gallery",
        onKeydown: he,
        onCancel: v[21] || (v[21] = kr(() => {
        }, ["prevent"]))
      }, [
        x("header", ja, [
          v[25] || (v[25] = x("div", { class: "sg-brand" }, [
            x("span", { class: "sg-mark" }, "▧"),
            x("div", null, [
              x("strong", null, "Gallery"),
              x("small", null, "SHIBA · READ ONLY")
            ])
          ], -1)),
          s.mode !== "grid" ? (L(), j("button", {
            key: 0,
            "data-action": "grid",
            onClick: v[0] || (v[0] = (R) => s.mode = "grid")
          }, " ← Grid")) : ie("", !0),
          x("label", Da, [
            v[23] || (v[23] = Ie("Folder ", -1)),
            x("select", {
              "data-testid": "folder-select",
              "aria-label": "Output folder",
              value: s.folderId,
              disabled: le.value,
              onChange: w
            }, [
              (L(!0), j(Z, null, Me(n.value, (R) => (L(), j("option", {
                key: R.id,
                value: R.id
              }, U(R.name), 9, Ka))), 128))
            ], 40, Ua)
          ]),
          v[26] || (v[26] = x("span", { class: "sg-header-spacer" }, null, -1)),
          x("span", {
            class: Je(["sg-live", { "sg-working": dt.value }])
          }, [
            v[24] || (v[24] = x("i", null, null, -1)),
            Ie(U(dt.value ? "Syncing" : "Auto refresh"), 1)
          ], 2),
          x("button", {
            "data-action": "close",
            class: "sg-close",
            "aria-label": "Close Gallery",
            onClick: y
          }, " Close × ")
        ]),
        C.value || Pt.value ? (L(), j("div", Ha, [
          Ie(U(C.value || Pt.value) + " ", 1),
          x("button", { onClick: $ }, "Retry")
        ])) : ie("", !0),
        s.mode === "grid" ? (L(), j(Z, { key: 1 }, [
          x("div", Va, [
            x("span", null, [
              Ie(U(s.images.length) + U(et.value ? "+" : "") + " images ", 1),
              v[27] || (v[27] = x("small", null, "· newest file modification first", -1))
            ]),
            x("div", Ba, [
              x("button", {
                "aria-pressed": !i.value,
                onClick: v[1] || (v[1] = (R) => i.value = !1)
              }, "Small", 8, Wa),
              x("button", {
                "aria-pressed": i.value,
                onClick: v[2] || (v[2] = (R) => i.value = !0)
              }, "Large", 8, qa)
            ]),
            v[28] || (v[28] = x("span", { class: "sg-header-spacer" }, null, -1)),
            x("span", null, U(s.checked.size) + " selected", 1),
            x("button", {
              class: "sg-primary",
              disabled: s.images.length < 2,
              "data-action": "compare",
              onClick: E
            }, " Compare selected ", 8, za)
          ]),
          s.images.length ? (L(), ks(fa, {
            key: 0,
            ref_key: "grid",
            ref: P,
            images: s.images,
            checked: s.checked,
            pinned: s.pinned,
            large: i.value,
            api: e.api,
            "has-more": et.value,
            "initial-scroll": S.value.scroll,
            onPosition: v[3] || (v[3] = (R) => S.value = R),
            onView: A,
            onPin: N,
            onCheck: T,
            onMore: v[4] || (v[4] = (R) => ke(M).loadMore())
          }, null, 8, ["images", "checked", "pinned", "large", "api", "has-more", "initial-scroll"])) : (L(), j("div", Ga, [
            v[29] || (v[29] = x("span", { class: "sg-empty-icon" }, "▧", -1)),
            x("h2", null, U(dt.value || le.value ? "Opening your output…" : "No images in this folder"), 1),
            v[30] || (v[30] = x("p", null, " Images stay in their original folder. Gallery never deletes or changes them. ", -1))
          ])),
          x("footer", Ja, [
            v[31] || (v[31] = x("span", null, "Click an image to inspect · check images to compare · Pin keeps the left image fixed", -1)),
            x("button", {
              onClick: v[5] || (v[5] = (R) => P.value?.top())
            }, "↑ Newest")
          ])
        ], 64)) : (L(), j(Z, { key: 2 }, [
          x("div", Ya, [
            s.mode === "compare" ? (L(), j(Z, { key: 0 }, [
              x("label", Xa, [
                v[32] || (v[32] = Ie("Reference ", -1)),
                x("select", {
                  "aria-label": "Reference image",
                  value: s.leftId,
                  onChange: v[6] || (v[6] = (R) => N(R.target.value))
                }, [
                  (L(!0), j(Z, null, Me(gs.value, (R) => (L(), j("option", {
                    key: R.id,
                    value: R.id
                  }, U(R.name) + U(s.pinned.has(R.id) ? " · pinned" : " · checked"), 9, Za))), 128))
                ], 40, Qa)
              ]),
              x("label", null, [
                v[35] || (v[35] = Ie("Candidates ", -1)),
                bl(x("select", {
                  "onUpdate:modelValue": v[7] || (v[7] = (R) => s.scope = R),
                  "aria-label": "Candidate range",
                  onChange: D
                }, [
                  v[33] || (v[33] = x("option", { value: "folder" }, "This folder", -1)),
                  v[34] || (v[34] = x("option", { value: "checked" }, "Checked images", -1)),
                  s.scope === "prompt" ? (L(), j("option", ec, " Matching saved text ")) : ie("", !0)
                ], 544), [
                  [Ro, s.scope]
                ])
              ])
            ], 64)) : (L(), j("button", {
              key: 1,
              "data-action": "pin",
              class: "sg-primary",
              onClick: v[8] || (v[8] = (R) => s.currentId && N(s.currentId))
            }, " Pin as reference")),
            x("button", {
              "data-action": "previous",
              "aria-label": "Previous image",
              disabled: Ce.value <= 0,
              onClick: v[9] || (v[9] = (R) => ke(ln)(s, -1))
            }, " ← Previous", 8, tc),
            x("span", sc, U(Ce.value < 0 ? "—" : Ce.value + 1) + " / " + U(pt.value.length) + U(et.value ? "+" : ""), 1),
            x("button", {
              "data-action": "next",
              "aria-label": "Next image",
              disabled: Ce.value < 0 || Ce.value >= pt.value.length - 1,
              onClick: v[10] || (v[10] = (R) => ke(ln)(s, 1))
            }, " Next →", 8, nc),
            v[37] || (v[37] = x("span", { class: "sg-header-spacer" }, null, -1)),
            s.mode === "compare" ? (L(), j("label", ic, [
              x("input", {
                type: "checkbox",
                "aria-label": "Link zoom and pan",
                checked: s.linked,
                onChange: v[11] || (v[11] = (R) => ke(Bo)(s, R.target.checked))
              }, null, 40, rc),
              v[36] || (v[36] = Ie(" Link zoom / pan", -1))
            ])) : ie("", !0),
            s.mode === "single" ? (L(), j("button", {
              key: 3,
              "data-action": "candidates",
              "aria-expanded": r.value,
              onClick: v[12] || (v[12] = (R) => r.value = !r.value)
            }, U(r.value ? "Hide candidates" : "Show candidates"), 9, lc)) : ie("", !0),
            s.mode === "single" && !r.value && et.value ? (L(), j("button", {
              key: 4,
              onClick: v[13] || (v[13] = (R) => ke(M).loadMore())
            }, "Load more")) : ie("", !0),
            x("button", { onClick: G }, "Fit"),
            x("button", {
              "aria-pressed": s.panel,
              "data-action": "settings",
              onClick: v[14] || (v[14] = (R) => s.panel = !s.panel)
            }, U(s.mode === "compare" ? "Differences" : "Settings"), 9, oc)
          ]),
          x("div", ac, [
            x("div", {
              class: Je(["sg-image-pair", { "sg-single": s.mode === "single" }])
            }, [
              s.mode === "compare" ? (L(), ks(yi, {
                key: 0,
                ref_key: "leftPane",
                ref: h,
                image: ve.value,
                unavailable: !!s.leftId && s.unavailable.has(s.leftId),
                api: e.api,
                side: "left",
                transform: s.transforms.left,
                models: Pe.value,
                "model-status": Ht(ht.value),
                onOriginal: v[15] || (v[15] = (R) => B("left")),
                onTransform: v[16] || (v[16] = (R) => ke(Gt)(s, "left", R))
              }, null, 8, ["image", "unavailable", "api", "transform", "models", "model-status"])) : ie("", !0),
              $e(yi, {
                ref_key: "rightPane",
                ref: p,
                image: ye.value,
                unavailable: !!ye.value && s.unavailable.has(ye.value.id),
                api: e.api,
                side: "right",
                transform: s.transforms.right,
                models: ps.value,
                "model-status": Ht(Ke.value),
                onOriginal: v[17] || (v[17] = (R) => B("right")),
                onTransform: v[18] || (v[18] = (R) => ke(Gt)(s, "right", R))
              }, null, 8, ["image", "unavailable", "api", "transform", "models", "model-status"])
            ], 2),
            s.panel ? (L(), ks(La, {
              key: 0,
              left: ht.value,
              right: Ke.value,
              compare: s.mode === "compare",
              "manual-matches": s.manualMatches,
              loading: !Ke.value || s.mode === "compare" && !ht.value,
              onClose: v[19] || (v[19] = (R) => s.panel = !1),
              onMatch: X,
              onRetry: ee
            }, null, 8, ["left", "right", "compare", "manual-matches", "loading"])) : ie("", !0)
          ]),
          s.mode === "compare" || r.value ? (L(), j("div", cc, [
            x("div", {
              ref_key: "candidateRow",
              ref: F,
              class: "sg-candidates",
              "aria-label": "Image candidates"
            }, [
              (L(!0), j(Z, null, Me(gt.value, (R) => (L(), j("button", {
                key: R.id,
                class: Je(["sg-candidate", {
                  "sg-current": R.id === (s.mode === "single" ? s.currentId : s.rightId)
                }]),
                "aria-label": "Choose " + R.name,
                "aria-pressed": R.id === (s.mode === "single" ? s.currentId : s.rightId),
                onClick: (J) => s.mode === "single" ? s.currentId = R.id : s.rightId = R.id
              }, [
                $e(Pn, {
                  url: e.api.imageURL(R, "thumbnail", 256),
                  alt: R.name,
                  priority: "low"
                }, null, 8, ["url", "alt"])
              ], 10, uc))), 128))
            ], 512),
            et.value ? (L(), j("button", {
              key: 0,
              onClick: v[20] || (v[20] = (R) => ke(M).loadMore())
            }, "Load more")) : ie("", !0),
            s.mode === "compare" ? (L(), j("button", {
              key: 1,
              disabled: H.value,
              onClick: ce
            }, U(H.value ? "Checking text…" : "Find matching saved text"), 9, fc)) : ie("", !0)
          ])) : ie("", !0),
          I.value ? (L(), j("p", dc, U(I.value), 1)) : ie("", !0),
          x("footer", hc, [
            v[38] || (v[38] = Ie(" Wheel to zoom · drag to pan · double-click to fit · ← → to navigate ", -1)),
            s.mode === "compare" ? (L(), j("span", pc, "· Linking copies the left view; different sizes use normalized image positions.")) : ie("", !0)
          ])
        ], 64))
      ], 34)) : ie("", !0)
    ], 64));
  }
});
function bi(e, t) {
  const s = new URL(e), n = s.pathname.lastIndexOf("/extensions/");
  if (n < 0)
    throw new Error("Gallery must load from the ComfyUI extensions directory.");
  return s.pathname = s.pathname.slice(0, n) + "/scripts/" + t + ".js", s.search = "", s.hash = "", s.href;
}
class mc {
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
const on = import.meta.url;
async function vc() {
  const [{ app: e }, { api: t }] = await Promise.all([
    import(
      /* @vite-ignore */
      bi(on, "app")
    ),
    import(
      /* @vite-ignore */
      bi(on, "api")
    )
  ]);
  e.registerExtension({
    name: "shiba.gallery",
    setup() {
      if (document.getElementById("shiba-gallery-root")) return;
      const s = document.createElement("link");
      s.rel = "stylesheet", s.href = new URL("./shiba-gallery.css", on).href, s.dataset.shibaGallery = "true", document.head.append(s);
      const n = document.createElement("div");
      n.id = "shiba-gallery-root", document.body.append(n), Do(gc, { api: new mc(t) }).mount(n);
    }
  });
}
vc().catch(
  () => console.error(
    "[Shiba Gallery] Could not register the gallery extension. Check ComfyUI extension loading and proxy paths."
  )
);
