// @__NO_SIDE_EFFECTS__
function xs(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const ce = {}, Ft = [], jt = () => {
}, Ci = () => !1, Dn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Un = (e) => e.startsWith("onUpdate:"), Oe = Object.assign, Ii = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Rr = Object.prototype.hasOwnProperty, se = (e, t) => Rr.call(e, t), q = Array.isArray, xt = (e) => bn(e) === "[object Map]", Ut = (e) => bn(e) === "[object Set]", Us = (e) => bn(e) === "[object Date]", ie = (e) => typeof e == "function", he = (e) => typeof e == "string", Ge = (e) => typeof e == "symbol", ue = (e) => e !== null && typeof e == "object", Mi = (e) => (ue(e) || ie(e)) && ie(e.then) && ie(e.catch), Ti = Object.prototype.toString, bn = (e) => Ti.call(e), Pr = (e) => bn(e).slice(8, -1), $i = (e) => bn(e) === "[object Object]", ks = (e) => he(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, ln = /* @__PURE__ */ xs(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Hn = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((n) => t[n] || (t[n] = e(n)));
}, Lr = /-\w/g, We = /* @__PURE__ */ Hn((e) => e.replace(Lr, (t) => t.slice(1).toUpperCase())), Fr = /\B([A-Z])/g, Ht = /* @__PURE__ */ Hn(
  (e) => e.replace(Fr, "-$1").toLowerCase()
), Ai = /* @__PURE__ */ Hn((e) => e.charAt(0).toUpperCase() + e.slice(1)), Xn = /* @__PURE__ */ Hn((e) => e ? `on${Ai(e)}` : ""), et = (e, t) => !Object.is(e, t), Mn = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, Ei = (e, t, n, s = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: s,
    value: n
  });
}, Ss = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let Hs;
const Kn = () => Hs || (Hs = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function kt(e) {
  if (q(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], i = he(s) ? Ur(s) : kt(s);
      if (i)
        for (const r in i)
          t[r] = i[r];
    }
    return t;
  } else if (he(e) || ue(e))
    return e;
}
const Nr = /;(?![^(]*\))/g, jr = /:([^]+)/, Dr = /"(?:[^"\\]|\\[^])*"|'(?:[^'\\]|\\[^])*'|\\[^]|\/\*[^]*?\*\//g;
function Ur(e) {
  const t = {};
  return e.replace(Dr, (n) => n.startsWith("/*") ? "" : n).split(Nr).forEach((n) => {
    if (n) {
      const s = n.split(jr);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function tt(e) {
  let t = "";
  if (he(e))
    t = e;
  else if (q(e))
    for (let n = 0; n < e.length; n++) {
      const s = tt(e[n]);
      s && (t += s + " ");
    }
  else if (ue(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Hr = "itemscope,allowfullscreen,disablepictureinpicture,disableremoteplayback,formnovalidate,ismap,nomodule,novalidate,playsinline,readonly", Kr = /* @__PURE__ */ xs(Hr);
function Oi(e) {
  return !!e || e === "";
}
function Vr(e, t, n) {
  if (e.length !== t.length) return !1;
  let s = !0;
  for (let i = 0; s && i < e.length; i++)
    s = Ct(e[i], t[i], n);
  return s;
}
function Ks(e, t, n) {
  if (e.size !== t.size) return !1;
  const s = Array.from(t), i = new Uint8Array(s.length);
  for (const r of e) {
    let l = -1;
    for (let o = 0; o < s.length; o++)
      if (!i[o] && Ct(r, s[o], n)) {
        l = o;
        break;
      }
    if (l < 0) return !1;
    i[l] = 1;
  }
  return !0;
}
function Br(e, t, n) {
  let s = xt(e), i = xt(t);
  if (s || i || (s = Ut(e), i = Ut(t), s || i))
    return s && i ? Ks(e, t, n) : !1;
  const r = Object.keys(e).length, l = Object.keys(t).length;
  if (r !== l)
    return !1;
  for (const o in e) {
    const a = e.hasOwnProperty(o), u = t.hasOwnProperty(o);
    if (a && !u || !a && u || !Ct(e[o], t[o], n))
      return !1;
  }
  return String(e) === String(t);
}
function Vs(e, t, n, s) {
  n || (n = [/* @__PURE__ */ new Map(), /* @__PURE__ */ new Map()]);
  const [i, r] = n;
  if (i.has(e) || r.has(t))
    return i.get(e) === t && r.get(t) === e;
  i.set(e, t), r.set(t, e);
  const l = s(e, t, n);
  return i.delete(e), r.delete(t), l;
}
function Ct(e, t, n) {
  if (e === t) return !0;
  let s = Us(e), i = Us(t);
  return s || i ? s && i ? e.getTime() === t.getTime() : !1 : (s = Ge(e), i = Ge(t), s || i ? e === t : (s = q(e), i = q(t), s || i ? s && i ? Vs(e, t, n, Vr) : !1 : (s = ue(e), i = ue(t), s || i ? !s || !i ? !1 : Vs(e, t, n, Br) : String(e) === String(t))));
}
function qr(e, t) {
  return e.findIndex((n) => Ct(n, t));
}
const Ri = (e) => !!(e && e.__v_isRef === !0), D = (e) => he(e) ? e : e == null ? "" : q(e) || ue(e) && (e.toString === Ti || !ie(e.toString)) ? Ri(e) ? D(e.value) : JSON.stringify(e, Pi, 2) : String(e), Pi = (e, t) => Ri(t) ? Pi(e, t.value) : xt(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [s, i], r) => (n[Qn(s, r) + " =>"] = i, n),
    {}
  )
} : Ut(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => Qn(n))
} : Ge(t) ? Qn(t) : ue(t) && !q(t) && !$i(t) ? String(t) : t, Qn = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    Ge(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
let xe;
class Wr {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !t && xe && (xe.active ? (this.parent = xe, this.index = (xe.scopes || (xe.scopes = [])).push(
      this
    ) - 1) : (this._active = !1, this._warnOnRun = !1));
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let t, n;
      if (this.scopes) {
        const s = this.scopes.slice();
        for (t = 0, n = s.length; t < n; t++)
          s[t].pause();
      }
      for (t = 0, n = this.effects.length; t < n; t++)
        this.effects[t].pause();
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let t, n;
      if (this.scopes) {
        const i = this.scopes.slice();
        for (t = 0, n = i.length; t < n; t++)
          i[t].resume();
      }
      const s = this.effects.slice();
      for (t = 0, n = s.length; t < n; t++)
        s[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const n = xe;
      try {
        return xe = this, t();
      } finally {
        xe = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = xe, xe = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (xe === this)
        xe = this.prevScope;
      else {
        let t = xe;
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
      let n, s;
      for (n = 0, s = this.effects.length; n < s; n++)
        this.effects[n].stop();
      for (this.effects.length = 0, n = 0, s = this.cleanups.length; n < s; n++)
        this.cleanups[n]();
      if (this.cleanups.length = 0, this.scopes) {
        const i = this.scopes.slice();
        for (n = 0, s = i.length; n < s; n++)
          i[n].stop(!0);
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
function zr() {
  return xe;
}
let oe;
const Zn = /* @__PURE__ */ new WeakSet();
class Li {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, xe && (xe.active ? xe.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Zn.has(this) && (Zn.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Ni(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Bs(this), ji(this);
    const t = oe, n = ze;
    oe = this, ze = !0;
    try {
      return this.fn();
    } finally {
      Di(this), oe = t, ze = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        Ms(t);
      this.deps = this.depsTail = void 0, Bs(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Zn.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    ds(this) && this.run();
  }
  get dirty() {
    return ds(this);
  }
}
let Fi = 0, on, an;
function Ni(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = an, an = e;
    return;
  }
  e.next = on, on = e;
}
function Cs() {
  Fi++;
}
function Is() {
  if (--Fi > 0)
    return;
  if (an) {
    let t = an;
    for (an = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; on; ) {
    let t = on;
    for (on = void 0; t; ) {
      const n = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1)
        try {
          t.trigger();
        } catch (s) {
          e || (e = s);
        }
      t = n;
    }
  }
  if (e) throw e;
}
function ji(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Di(e) {
  let t, n = e.depsTail, s = n;
  for (; s; ) {
    const i = s.prevDep;
    s.version === -1 ? (s === n && (n = i), Ms(s), Gr(s)) : t = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = i;
  }
  e.deps = t, e.depsTail = n;
}
function ds(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Ui(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Ui(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === hn) || (e.globalVersion = hn, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !ds(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = oe, s = ze;
  oe = e, ze = !0;
  try {
    ji(e);
    const i = e.fn(e._value);
    (t.version === 0 || et(i, e._value)) && (e.flags |= 128, e._value = i, t.version++);
  } catch (i) {
    throw t.version++, i;
  } finally {
    oe = n, ze = s, Di(e), e.flags &= -3;
  }
}
function Ms(e, t = !1) {
  const { dep: n, prevSub: s, nextSub: i } = e;
  if (s && (s.nextSub = i, e.prevSub = void 0), i && (i.prevSub = s, e.nextSub = void 0), n.subs === e && (n.subs = s, !s && n.computed)) {
    n.computed.flags &= -5;
    for (let r = n.computed.deps; r; r = r.nextDep)
      Ms(r, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function Gr(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let ze = !0;
const Hi = [];
function gt() {
  Hi.push(ze), ze = !1;
}
function mt() {
  const e = Hi.pop();
  ze = e === void 0 ? !0 : e;
}
function Bs(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = oe;
    oe = void 0;
    try {
      t();
    } finally {
      oe = n;
    }
  }
}
let hn = 0;
class Jr {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Ts {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!oe || !ze || oe === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== oe)
      n = this.activeLink = new Jr(oe, this), oe.deps ? (n.prevDep = oe.depsTail, oe.depsTail.nextDep = n, oe.depsTail = n) : oe.deps = oe.depsTail = n, Ki(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const s = n.nextDep;
      s.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = s), n.prevDep = oe.depsTail, n.nextDep = void 0, oe.depsTail.nextDep = n, oe.depsTail = n, oe.deps === n && (oe.deps = s);
    }
    return n;
  }
  trigger(t) {
    this.version++, hn++, this.notify(t);
  }
  notify(t) {
    Cs();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      Is();
    }
  }
}
function Ki(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let s = t.deps; s; s = s.nextDep)
        Ki(s);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const hs = /* @__PURE__ */ new WeakMap(), Dt = /* @__PURE__ */ Symbol(
  ""
), ps = /* @__PURE__ */ Symbol(
  ""
), pn = /* @__PURE__ */ Symbol(
  ""
);
function Se(e, t, n) {
  if (ze && oe) {
    let s = hs.get(e);
    s || hs.set(e, s = /* @__PURE__ */ new Map());
    let i = s.get(n);
    i || (s.set(n, i = new Ts()), i.map = s, i.key = n), i.track();
  }
}
function ft(e, t, n, s, i, r) {
  const l = hs.get(e);
  if (!l) {
    hn++;
    return;
  }
  const o = (a) => {
    a && a.trigger();
  };
  if (Cs(), t === "clear")
    l.forEach(o);
  else {
    const a = q(e), u = a && ks(n);
    if (a && n === "length") {
      const f = Number(s);
      l.forEach((h, p) => {
        (p === "length" || p === pn || !Ge(p) && p >= f) && o(h);
      });
    } else
      switch ((n !== void 0 || l.has(void 0)) && o(l.get(n)), u && o(l.get(pn)), t) {
        case "add":
          a ? u && o(l.get("length")) : (o(l.get(Dt)), xt(e) && o(l.get(ps)));
          break;
        case "delete":
          a || (o(l.get(Dt)), xt(e) && o(l.get(ps)));
          break;
        case "set":
          xt(e) && o(l.get(Dt));
          break;
      }
  }
  Is();
}
function Kt(e) {
  const t = /* @__PURE__ */ Z(e);
  return t === e || (Se(t, "iterate", pn), /* @__PURE__ */ Ue(e)) ? t : /* @__PURE__ */ st(e) ? /* @__PURE__ */ St(e) ? t.map((n) => It(He(n))) : t.map(It) : t.map(He);
}
function Vn(e) {
  return Se(e = /* @__PURE__ */ Z(e), "iterate", pn), e;
}
function Xe(e, t) {
  return /* @__PURE__ */ st(e) ? It(/* @__PURE__ */ St(e) ? He(t) : t) : He(t);
}
const Yr = {
  __proto__: null,
  [Symbol.iterator]() {
    return es(this, Symbol.iterator, (e) => Xe(this, e));
  },
  concat(...e) {
    return Kt(this).concat(
      ...e.map((t) => q(t) ? Kt(t) : t)
    );
  },
  entries() {
    return es(this, "entries", (e) => (e[1] = Xe(this, e[1]), e));
  },
  every(e, t) {
    return lt(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return lt(
      this,
      "filter",
      e,
      t,
      (n) => n.map((s) => Xe(this, s)),
      arguments
    );
  },
  find(e, t) {
    return lt(
      this,
      "find",
      e,
      t,
      (n) => Xe(this, n),
      arguments
    );
  },
  findIndex(e, t) {
    return lt(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return lt(
      this,
      "findLast",
      e,
      t,
      (n) => Xe(this, n),
      arguments
    );
  },
  findLastIndex(e, t) {
    return lt(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return lt(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return ts(this, "includes", e);
  },
  indexOf(...e) {
    return ts(this, "indexOf", e);
  },
  join(e) {
    return Kt(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return ts(this, "lastIndexOf", e);
  },
  map(e, t) {
    return lt(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Zt(this, "pop");
  },
  push(...e) {
    return Zt(this, "push", e);
  },
  reduce(e, ...t) {
    return Ws(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return Ws(this, "reduceRight", e, t);
  },
  shift() {
    return Zt(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return lt(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Zt(this, "splice", e);
  },
  toReversed() {
    return Kt(this).toReversed();
  },
  toSorted(e) {
    return Kt(this).toSorted(e);
  },
  toSpliced(...e) {
    return Kt(this).toSpliced(...e);
  },
  unshift(...e) {
    return Zt(this, "unshift", e);
  },
  values() {
    return es(this, "values", (e) => Xe(this, e));
  }
};
function es(e, t, n) {
  const s = Vn(e), i = s[t], r = i.call(s);
  if (s !== e && !/* @__PURE__ */ Ue(e)) {
    if (r[Symbol.toStringTag] === "Array Iterator") {
      const l = Object.create(Object.getPrototypeOf(r));
      return l.next = () => qs(r.next(), n), i !== Vi[t] && Object.defineProperties(l, {
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
    r._next = r.next, r.next = () => qs(r._next(), n);
  }
  return r;
}
function qs(e, t) {
  return e.done || (e.value = t(e.value)), e;
}
const Vi = Array.prototype;
function lt(e, t, n, s, i, r) {
  const l = Vn(e), o = l !== e && !/* @__PURE__ */ Ue(e), a = l[t];
  if (a !== Vi[t]) {
    const h = a.apply(e, r);
    return o ? He(h) : h;
  }
  let u = n;
  l !== e && (o ? u = function(h, p) {
    return n.call(this, Xe(e, h), p, e);
  } : n.length > 2 && (u = function(h, p) {
    return n.call(this, h, p, e);
  }));
  const f = a.call(l, u, s);
  return o && i ? i(f) : f;
}
function Ws(e, t, n, s) {
  const i = Vn(e), r = i !== e && !/* @__PURE__ */ Ue(e);
  let l = n, o = !1;
  i !== e && (r ? (o = s.length === 0, l = function(u, f, h) {
    return o && (o = !1, u = Xe(e, u)), n.call(this, u, Xe(e, f), h, e);
  }) : n.length > 3 && (l = function(u, f, h) {
    return n.call(this, u, f, h, e);
  }));
  const a = i[t](l, ...s);
  return o ? Xe(e, a) : a;
}
function ts(e, t, n) {
  const s = /* @__PURE__ */ Z(e);
  Se(s, "iterate", pn);
  const i = s[t](...n);
  return (i === -1 || i === !1) && /* @__PURE__ */ Es(n[0]) ? (n[0] = /* @__PURE__ */ Z(n[0]), s[t](...n)) : i;
}
function Zt(e, t, n = []) {
  gt(), Cs();
  const s = (/* @__PURE__ */ Z(e))[t].apply(e, n);
  return Is(), mt(), s;
}
const Xr = /* @__PURE__ */ xs("__proto__,__v_isRef,__isVue"), Bi = /* @__PURE__ */ new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Ge)
);
function Qr(e) {
  Ge(e) || (e = String(e));
  const t = /* @__PURE__ */ Z(this);
  return Se(t, "has", e), t.hasOwnProperty(e);
}
class qi {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, s) {
    if (n === "__v_skip") return t.__v_skip;
    const i = this._isReadonly, r = this._isShallow;
    if (n === "__v_isReactive")
      return !i;
    if (n === "__v_isReadonly")
      return i;
    if (n === "__v_isShallow")
      return r;
    if (n === "__v_raw")
      return s === (i ? r ? al : Ji : r ? Gi : zi).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(s) ? t : void 0;
    const l = q(t);
    if (!i) {
      let a;
      if (l && (a = Yr[n]))
        return a;
      if (n === "hasOwnProperty")
        return Qr;
    }
    const o = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ Ee(t) ? t : s
    );
    if ((Ge(n) ? Bi.has(n) : Xr(n)) || (i || Se(t, "get", n), r))
      return o;
    if (/* @__PURE__ */ Ee(o)) {
      const a = l && ks(n) ? o : o.value;
      return i && ue(a) ? /* @__PURE__ */ ms(a) : a;
    }
    return ue(o) ? i ? /* @__PURE__ */ ms(o) : /* @__PURE__ */ An(o) : o;
  }
}
class Wi extends qi {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, i) {
    let r = t[n];
    const l = q(t) && ks(n);
    if (!this._isShallow) {
      const u = /* @__PURE__ */ st(r);
      if (!/* @__PURE__ */ Ue(s) && !/* @__PURE__ */ st(s) && (r = /* @__PURE__ */ Z(r), s = /* @__PURE__ */ Z(s)), !l && /* @__PURE__ */ Ee(r) && !/* @__PURE__ */ Ee(s))
        return u || (r.value = s), !0;
    }
    const o = l ? Number(n) < t.length : se(t, n), a = Reflect.set(
      t,
      n,
      s,
      /* @__PURE__ */ Ee(t) ? t : i
    );
    return t === /* @__PURE__ */ Z(i) && a && (o ? et(s, r) && ft(t, "set", n, s) : ft(t, "add", n, s)), a;
  }
  deleteProperty(t, n) {
    const s = se(t, n);
    t[n];
    const i = Reflect.deleteProperty(t, n);
    return i && s && ft(t, "delete", n, void 0), i;
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return (!Ge(n) || !Bi.has(n)) && Se(t, "has", n), s;
  }
  ownKeys(t) {
    return Se(
      t,
      "iterate",
      q(t) ? "length" : Dt
    ), Reflect.ownKeys(t);
  }
}
class Zr extends qi {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return !0;
  }
  deleteProperty(t, n) {
    return !0;
  }
}
const el = /* @__PURE__ */ new Wi(), tl = /* @__PURE__ */ new Zr(), nl = /* @__PURE__ */ new Wi(!0);
const gs = (e) => e, wn = (e) => Reflect.getPrototypeOf(e);
function sl(e, t, n) {
  return function(...s) {
    const i = this.__v_raw, r = /* @__PURE__ */ Z(i), l = xt(r), o = e === "entries" || e === Symbol.iterator && l, a = e === "keys" && l, u = i[e](...s), f = n ? gs : t ? It : He;
    return !t && Se(
      r,
      "iterate",
      a ? ps : Dt
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
function xn(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function il(e, t) {
  const n = {
    get(i) {
      const r = this.__v_raw, l = /* @__PURE__ */ Z(r), o = /* @__PURE__ */ Z(i);
      e || (et(i, o) && Se(l, "get", i), Se(l, "get", o));
      const { has: a } = wn(l), u = t ? gs : e ? It : He;
      if (a.call(l, i))
        return u(r.get(i));
      if (a.call(l, o))
        return u(r.get(o));
      r !== l && r.get(i);
    },
    get size() {
      const i = this.__v_raw;
      return !e && Se(/* @__PURE__ */ Z(i), "iterate", Dt), i.size;
    },
    has(i) {
      const r = this.__v_raw, l = /* @__PURE__ */ Z(r), o = /* @__PURE__ */ Z(i);
      return e || (et(i, o) && Se(l, "has", i), Se(l, "has", o)), i === o ? r.has(i) : r.has(i) || r.has(o);
    },
    forEach(i, r) {
      const l = this, o = l.__v_raw, a = /* @__PURE__ */ Z(o), u = t ? gs : e ? It : He;
      return !e && Se(a, "iterate", Dt), o.forEach((f, h) => i.call(r, u(f), u(h), l));
    }
  };
  return Oe(
    n,
    e ? {
      add: xn("add"),
      set: xn("set"),
      delete: xn("delete"),
      clear: xn("clear")
    } : {
      add(i) {
        const r = /* @__PURE__ */ Z(this), l = wn(r), o = /* @__PURE__ */ Z(i), a = !t && !/* @__PURE__ */ Ue(i) && !/* @__PURE__ */ st(i) ? o : i;
        return l.has.call(r, a) || et(i, a) && l.has.call(r, i) || et(o, a) && l.has.call(r, o) || (r.add(a), ft(r, "add", a, a)), this;
      },
      set(i, r) {
        !t && !/* @__PURE__ */ Ue(r) && !/* @__PURE__ */ st(r) && (r = /* @__PURE__ */ Z(r));
        const l = /* @__PURE__ */ Z(this), { has: o, get: a } = wn(l);
        let u = o.call(l, i);
        u || (i = /* @__PURE__ */ Z(i), u = o.call(l, i));
        const f = a.call(l, i);
        return l.set(i, r), u ? et(r, f) && ft(l, "set", i, r) : ft(l, "add", i, r), this;
      },
      delete(i) {
        const r = /* @__PURE__ */ Z(this), { has: l, get: o } = wn(r);
        let a = l.call(r, i);
        a || (i = /* @__PURE__ */ Z(i), a = l.call(r, i)), o && o.call(r, i);
        const u = r.delete(i);
        return a && ft(r, "delete", i, void 0), u;
      },
      clear() {
        const i = /* @__PURE__ */ Z(this), r = i.size !== 0, l = i.clear();
        return r && ft(
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
    n[i] = sl(i, e, t);
  }), n;
}
function $s(e, t) {
  const n = il(e, t);
  return (s, i, r) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_isShallow" ? t : i === "__v_raw" ? s : Reflect.get(
    se(n, i) && i in s ? n : s,
    i,
    r
  );
}
const rl = {
  get: /* @__PURE__ */ $s(!1, !1)
}, ll = {
  get: /* @__PURE__ */ $s(!1, !0)
}, ol = {
  get: /* @__PURE__ */ $s(!0, !1)
};
const zi = /* @__PURE__ */ new WeakMap(), Gi = /* @__PURE__ */ new WeakMap(), Ji = /* @__PURE__ */ new WeakMap(), al = /* @__PURE__ */ new WeakMap();
function cl(e) {
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
function An(e) {
  return /* @__PURE__ */ st(e) ? e : As(
    e,
    !1,
    el,
    rl,
    zi
  );
}
// @__NO_SIDE_EFFECTS__
function ul(e) {
  return As(
    e,
    !1,
    nl,
    ll,
    Gi
  );
}
// @__NO_SIDE_EFFECTS__
function ms(e) {
  return As(
    e,
    !0,
    tl,
    ol,
    Ji
  );
}
function As(e, t, n, s, i) {
  if (!ue(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e))
    return e;
  const r = i.get(e);
  if (r)
    return r;
  const l = cl(Pr(e));
  if (l === 0)
    return e;
  const o = new Proxy(
    e,
    l === 2 ? s : n
  );
  return i.set(e, o), o;
}
// @__NO_SIDE_EFFECTS__
function St(e) {
  return /* @__PURE__ */ st(e) ? /* @__PURE__ */ St(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function st(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Ue(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function Es(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function Z(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ Z(t) : e;
}
function fl(e) {
  return !se(e, "__v_skip") && Object.isExtensible(e) && Ei(e, "__v_skip", !0), e;
}
const He = (e) => ue(e) ? /* @__PURE__ */ An(e) : e, It = (e) => ue(e) ? /* @__PURE__ */ ms(e) : e;
// @__NO_SIDE_EFFECTS__
function Ee(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function Y(e) {
  return dl(e, !1);
}
function dl(e, t) {
  return /* @__PURE__ */ Ee(e) ? e : new hl(e, t);
}
class hl {
  constructor(t, n) {
    this.dep = new Ts(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : /* @__PURE__ */ Z(t), this._value = n ? t : He(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, s = this.__v_isShallow || /* @__PURE__ */ Ue(t) || /* @__PURE__ */ st(t);
    t = s ? t : /* @__PURE__ */ Z(t), et(t, n) && (this._rawValue = t, this._value = s ? t : He(t), this.dep.trigger());
  }
}
function $e(e) {
  return /* @__PURE__ */ Ee(e) ? e.value : e;
}
const pl = {
  get: (e, t, n) => t === "__v_raw" ? e : $e(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const i = e[t];
    return /* @__PURE__ */ Ee(i) && !/* @__PURE__ */ Ee(n) ? (i.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function Yi(e) {
  return /* @__PURE__ */ St(e) ? e : new Proxy(e, pl);
}
class gl {
  constructor(t, n, s) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new Ts(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = hn - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = s;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    oe !== this)
      return Ni(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return Ui(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function ml(e, t, n = !1) {
  let s, i;
  return ie(e) ? s = e : (s = e.get, i = e.set), new gl(s, i, n);
}
const kn = {}, En = /* @__PURE__ */ new WeakMap();
let Lt;
function yl(e, t = !1, n = Lt) {
  if (n) {
    let s = En.get(n);
    s || En.set(n, s = []), s.push(e);
  }
}
function vl(e, t, n = ce) {
  const { immediate: s, deep: i, once: r, scheduler: l, augmentJob: o, call: a } = n, u = (M) => i ? M : /* @__PURE__ */ Ue(M) || i === !1 || i === 0 ? dt(M, 1) : dt(M);
  let f, h, p, g, F = !1, C = !1;
  if (/* @__PURE__ */ Ee(e) ? (h = () => e.value, F = /* @__PURE__ */ Ue(e)) : /* @__PURE__ */ St(e) ? (h = () => u(e), F = !0) : q(e) ? (C = !0, F = e.some((M) => /* @__PURE__ */ St(M) || /* @__PURE__ */ Ue(M)), h = () => e.map((M) => {
    if (/* @__PURE__ */ Ee(M))
      return M.value;
    if (/* @__PURE__ */ St(M))
      return u(M);
    if (ie(M))
      return a ? a(M, 2) : M();
  })) : ie(e) ? t ? h = a ? () => a(e, 2) : e : h = () => {
    if (p) {
      gt();
      try {
        p();
      } finally {
        mt();
      }
    }
    const M = Lt;
    Lt = f;
    try {
      return a ? a(e, 3, [g]) : e(g);
    } finally {
      Lt = M;
    }
  } : h = jt, t && i) {
    const M = h, K = i === !0 ? 1 / 0 : i;
    h = () => dt(M(), K);
  }
  const P = zr(), R = () => {
    f.stop(), P && P.active && Ii(P.effects, f);
  };
  if (r && t) {
    const M = t;
    t = (...K) => {
      try {
        return M(...K);
      } finally {
        R();
      }
    };
  }
  let O = C ? new Array(e.length).fill(kn) : kn;
  const k = (M) => {
    if (!(!(f.flags & 1) || !f.dirty && !M))
      if (t) {
        const K = f.run();
        if (M || i || F || (C ? K.some((G, z) => et(G, O[z])) : et(K, O))) {
          const G = Lt;
          gt();
          try {
            p && p(), Lt = f;
            const z = [
              K,
              // pass undefined as the old value when it's changed for the first time
              O === kn ? void 0 : C && O[0] === kn ? [] : O,
              g
            ];
            O = K, a ? a(t, 3, z) : (
              // @ts-expect-error
              t(...z)
            );
          } finally {
            Lt = G, mt();
          }
        }
      } else
        f.run();
  };
  return o && o(k), f = new Li(h), f.scheduler = l ? () => l(k, !1) : k, g = (M) => yl(M, !1, f), p = f.onStop = () => {
    const M = En.get(f);
    if (M) {
      if (a)
        a(M, 4);
      else
        for (const K of M) K();
      En.delete(f);
    }
  }, t ? s ? k(!0) : O = f.run() : l ? l(k.bind(null, !0), !0) : f.run(), R.pause = f.pause.bind(f), R.resume = f.resume.bind(f), R.stop = R, R;
}
function dt(e, t = 1 / 0, n) {
  if (t <= 0 || !ue(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, /* @__PURE__ */ Ee(e))
    dt(e.value, t, n);
  else if (q(e))
    for (let s = 0; s < e.length; s++)
      dt(e[s], t, n);
  else if (Ut(e) || xt(e))
    e.forEach((s) => {
      dt(s, t, n);
    });
  else if ($i(e)) {
    for (const s in e)
      dt(e[s], t, n);
    for (const s of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, s) && dt(e[s], t, n);
  }
  return e;
}
function _n(e, t, n, s) {
  try {
    return s ? e(...s) : e();
  } catch (i) {
    Bn(i, t, n);
  }
}
function it(e, t, n, s) {
  if (ie(e)) {
    const i = _n(e, t, n, s);
    return i && Mi(i) && i.catch((r) => {
      Bn(r, t, n, void 0, !0);
    }), i;
  }
  if (q(e)) {
    const i = [];
    for (let r = 0; r < e.length; r++)
      i.push(it(e[r], t, n, s));
    return i;
  }
}
function Bn(e, t, n, s = !0, i = !1) {
  const r = t ? t.vnode : null, { errorHandler: l, throwUnhandledErrorInProduction: o } = t && t.appContext.config || ce;
  if (t) {
    let a = t.parent;
    const u = t.proxy, f = `https://vuejs.org/error-reference/#runtime-${n}`;
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
      gt(), _n(l, null, 10, [
        e,
        u,
        f
      ]), mt();
      return;
    }
  }
  bl(e, n, r, s, o);
}
function bl(e, t, n, s = !0, i = !1) {
  if (i)
    throw e;
  console.error(e);
}
const Ae = [];
let Be = -1;
const Qe = [];
let wt = null, Bt = 0;
const Xi = /* @__PURE__ */ Promise.resolve();
let On = null;
function Nt(e) {
  const t = On || Xi;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function _l(e) {
  let t = Be + 1, n = Ae.length;
  for (; t < n; ) {
    const s = t + n >>> 1, i = Ae[s], r = gn(i);
    r < e || r === e && i.flags & 2 ? t = s + 1 : n = s;
  }
  return t;
}
function Os(e) {
  if (!(e.flags & 1)) {
    const t = gn(e), n = Ae[Ae.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= gn(n) ? Ae.push(e) : Ae.splice(_l(t), 0, e), e.flags |= 1, Qi();
  }
}
function Qi() {
  On || (On = Xi.then(tr));
}
function wl(e) {
  if (!q(e))
    wt && e.id === -1 ? wt.splice(Bt + 1, 0, e) : e.flags & 1 || (Qe.push(e), e.flags |= 1);
  else
    for (let t = 0; t < e.length; t++)
      Qe.push(e[t]);
  Qi();
}
function Zi(e, t, n, s = Be + 1) {
  for (; s < Ae.length; s++) {
    const i = Ae[s];
    if (i && i.flags & 2) {
      if (e && i.id !== e.uid || t !== void 0 && !(i.id >= t))
        continue;
      Ae.splice(s, 1), s = e ? s - 1 : Be, i.flags & 4 && (i.flags &= -2), i(), i.flags & 4 || (i.flags &= -2);
    }
  }
}
function er(e, t, n = 0) {
  if (Qe.length) {
    let s = Qe, i = 0;
    if (t) {
      s = [];
      for (let l = 0; l < Qe.length; l++) {
        const o = Qe[l];
        (o.i !== void 0 ? !o.i || o.i.uid < n : t.has(o)) ? Qe[i++] = o : s.push(o);
      }
    }
    const r = [...new Set(s)].sort((l, o) => gn(l) - gn(o));
    if (Qe.length = i, wt) {
      for (let l = 0; l < r.length; l++)
        wt.push(r[l]);
      return;
    }
    for (wt = r, Bt = 0; Bt < wt.length; Bt++) {
      const l = wt[Bt];
      l.flags & 4 && (l.flags &= -2), l.flags & 8 || l(), l.flags &= -2;
    }
    wt = null, Bt = 0;
  }
}
let ns = !1;
function xl(e, t) {
  if (ns) {
    e();
    return;
  }
  const n = t === void 0 ? void 0 : new Set(Qe);
  e(), ns = !0;
  try {
    Zi(void 0, t), er(void 0, n, t);
  } finally {
    ns = !1;
  }
}
const gn = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function tr(e) {
  try {
    for (Be = 0; Be < Ae.length; Be++) {
      const t = Ae[Be];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), _n(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; Be < Ae.length; Be++) {
      const t = Ae[Be];
      t && (t.flags &= -2);
    }
    Be = -1, Ae.length = 0, er(), On = null, (Ae.length || Qe.length) && tr();
  }
}
let Ce = null, nr = null;
function Rn(e) {
  const t = Ce;
  return Ce = e, nr = e && e.type.__scopeId || null, t;
}
function Ve(e, t = Ce, n) {
  if (!t || e._n)
    return e;
  const s = (...i) => {
    s._d && ei(-1);
    const r = Rn(t), l = ht.length;
    let o;
    try {
      o = e(...i);
    } finally {
      for (let a = ht.length; a > l; a--) Fs();
      Rn(r), s._d && ei(1);
    }
    return o;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
function kl(e, t) {
  if (Ce === null)
    return e;
  const n = Yn(Ce), s = e.dirs || (e.dirs = []);
  for (let i = 0; i < t.length; i++) {
    let [r, l, o, a = ce] = t[i];
    r && (ie(r) && (r = {
      mounted: r,
      updated: r
    }), r.deep && dt(l), s.push({
      dir: r,
      instance: n,
      value: l,
      oldValue: void 0,
      arg: o,
      modifiers: a
    }));
  }
  return e;
}
function Rt(e, t, n, s) {
  let i = e;
  if (s === "beforeMount")
    e._mount = e;
  else if (s === "beforeUpdate") {
    const o = t && t._mount;
    o && (o._latest = e, e._mount = o);
  } else if (s === "mounted") {
    const o = e._latest;
    e._mount = e._latest = void 0, o && (i = o, o._mount = void 0);
  }
  const r = i.dirs, l = t && t.dirs;
  for (let o = 0; o < r.length; o++) {
    let a = r[o];
    l ? a.oldValue = l[o].value : s === "mounted" && a.oldValue !== void 0 && (a = Oe({}, a, { oldValue: void 0 }));
    let u = a.dir[s];
    u && (gt(), it(u, n, 8, [
      e.el,
      a,
      i,
      t
    ]), mt());
  }
}
function Sl(e, t, n = !1) {
  const s = oo();
  if (s || Wt) {
    let i = Wt ? Wt._context.provides : s ? s.parent == null || s.ce ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : void 0;
    if (i && e in i)
      return i[e];
    if (arguments.length > 1)
      return n && ie(t) ? t.call(s && s.proxy) : t;
  }
}
const Cl = /* @__PURE__ */ Symbol.for("v-scx"), Il = () => Sl(Cl);
function qe(e, t, n) {
  return Ml(e, t, n);
}
function Ml(e, t, n = ce) {
  const { immediate: s, deep: i, flush: r, once: l } = n, o = Oe({}, n), a = t && s || !t && r !== "post";
  let u;
  if (vn) {
    if (r === "sync") {
      const g = Il();
      u = g.__watcherHandles || (g.__watcherHandles = []);
    } else if (!a) {
      const g = () => {
      };
      return g.stop = jt, g.resume = jt, g.pause = jt, g;
    }
  }
  const f = Mt;
  o.call = (g, F, C) => it(g, f, F, C);
  let h = !1;
  r === "post" ? o.scheduler = (g) => {
    g.i = f, Te(g, f && f.suspense);
  } : r !== "sync" && (h = !0, o.scheduler = (g, F) => {
    F ? g() : Os(g);
  }), o.augmentJob = (g) => {
    t && (g.flags |= 4), h && (g.flags |= 2, f && (g.id = f.uid, g.i = f));
  };
  const p = vl(e, t, o);
  return vn && (u ? u.push(p) : a && p()), p;
}
const Tl = /* @__PURE__ */ Symbol("_vte"), qn = (e) => e.__isTeleport, ss = /* @__PURE__ */ Symbol("_leaveCb");
function $l(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const n of e)
      if (n.type !== Ke) {
        t = n;
        break;
      }
  }
  return t;
}
function sr(e) {
  if (!ir(e))
    return qn(e.type) && e.children ? $l(e.children) : e;
  if (e.component)
    return e.component.subTree;
  const { shapeFlag: t, children: n } = e;
  if (n) {
    if (t & 16)
      return n[0];
    if (t & 32 && ie(n.default))
      return n.default();
  }
}
function cn(e, t) {
  if (e.shapeFlag & 6 && e.component) {
    e.transition = t;
    const n = e.component.subTree;
    cn(
      qn(n.type) && sr(n) || n,
      t
    );
  } else if (e.shapeFlag & 128) {
    const n = e.suspense;
    if (n) {
      const s = n.isHydrating ? n.pendingBranch : n.activeBranch;
      s && cn(s, t.clone(s));
    } else
      e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback);
  } else if (e.transition = t, e.type === X && q(e.children)) {
    const n = ar(e.children, !1);
    n && cn(n, t);
  }
}
function ys(e) {
  if (e.component)
    return ys(e.component.subTree);
  if (e.type === X) {
    const t = q(e.children) && ar(e.children, !1);
    return t ? ys(t) : void 0;
  }
  if (e.type !== Ke)
    return e;
}
// @__NO_SIDE_EFFECTS__
function Jt(e, t) {
  return ie(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    Oe({ name: e.name }, t, { setup: e })
  ) : e;
}
function Al(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function zs(e, t) {
  let n;
  return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
const Pn = /* @__PURE__ */ new WeakMap();
function un(e, t, n, s, i = !1) {
  if (q(e)) {
    e.forEach(
      (C, P) => un(
        C,
        t && (q(t) ? t[P] : t),
        n,
        s,
        i
      )
    );
    return;
  }
  if (qt(s) && !i) {
    s.shapeFlag & 512 && s.type.__asyncResolved && s.component.subTree.component && un(e, t, n, s.component.subTree);
    return;
  }
  const r = s.shapeFlag & 4 ? Yn(s.component) : s.el, l = i ? null : r, { i: o, r: a } = e, u = t && t.r, f = o.refs === ce ? o.refs = {} : o.refs, h = o.setupState, p = /* @__PURE__ */ Z(h), g = h === ce ? Ci : (C) => zs(f, C) ? !1 : se(p, C), F = (C, P) => !(P && zs(f, P));
  if (u != null && u !== a) {
    if (Gs(t), he(u))
      f[u] = null, g(u) && (h[u] = null);
    else if (/* @__PURE__ */ Ee(u)) {
      const C = t;
      F(u, C.k) && (u.value = null), C.k && (f[C.k] = null);
    }
  }
  if (ie(a))
    _n(a, o, 12, [l, f]);
  else {
    const C = he(a), P = /* @__PURE__ */ Ee(a);
    if (C || P) {
      const R = () => {
        if (e.f) {
          const O = C ? g(a) ? h[a] : f[a] : F() || !e.k ? a.value : f[e.k];
          if (i)
            q(O) && Ii(O, r);
          else if (q(O))
            O.includes(r) || O.push(r);
          else if (C)
            f[a] = [r], g(a) && (h[a] = f[a]);
          else {
            const k = [r];
            F(a, e.k) && (a.value = k), e.k && (f[e.k] = k);
          }
        } else C ? (f[a] = l, g(a) && (h[a] = l)) : P && (F(a, e.k) && (a.value = l), e.k && (f[e.k] = l));
      };
      if (l) {
        const O = () => {
          R(), Pn.delete(e);
        };
        O.id = -1, Pn.set(e, O), Te(O, n);
      } else
        Gs(e), R();
    }
  }
}
function Gs(e) {
  const t = Pn.get(e);
  t && (t.flags |= 8, Pn.delete(e));
}
Kn().requestIdleCallback;
Kn().cancelIdleCallback;
const qt = (e) => !!e.type.__asyncLoader, ir = (e) => e.type.__isKeepAlive;
function El(e, t, n = Mt, s = !1) {
  if (n) {
    const i = n[e] || (n[e] = []), r = t.__weh || (t.__weh = (...l) => {
      gt();
      const o = Ns(n), a = it(t, n, e, l);
      return o(), mt(), a;
    });
    return s ? i.unshift(r) : i.push(r), r;
  }
}
const rr = (e) => (t, n = Mt) => {
  (!vn || e === "sp") && El(e, (...s) => t(...s), n);
}, Rs = rr("m"), Wn = rr(
  "bum"
), Ol = /* @__PURE__ */ Symbol.for("v-ndc");
function Ne(e, t, n, s) {
  let i;
  const r = n, l = q(e);
  if (l || he(e)) {
    const o = l && /* @__PURE__ */ St(e);
    let a = !1, u = !1;
    o && (a = !/* @__PURE__ */ Ue(e), u = /* @__PURE__ */ st(e), e = Vn(e)), i = new Array(e.length);
    for (let f = 0, h = e.length; f < h; f++)
      i[f] = t(
        a ? u ? It(He(e[f])) : He(e[f]) : e[f],
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
  else if (ue(e))
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
function Js(e, t, n, s, i, r) {
  if (n == null && (n = {}), Ce.ce || Ce.parent && qt(Ce.parent) && Ce.parent.ce) {
    const u = r != null && n.key == null ? Oe({}, n, { key: r }) : n, f = Object.keys(u).length > 0;
    return t !== "default" && (u.name = t), L(), pt(
      X,
      null,
      [Ie("slot", u, s)],
      f ? -2 : 64
    );
  }
  let l = e[t];
  l && l._c && (l._d = !1);
  const o = ht.length;
  L();
  let a;
  try {
    const u = l && lr(l(n)), f = n.key || r || // slot content array of a dynamic conditional slot may have a branch
    // key attached in the `createSlots` helper, respect that
    u && u.key;
    a = pt(
      X,
      {
        key: (f && !Ge(f) ? f : `_${t}`) + // #7256 force differentiate fallback content from actual content
        (!u && s ? "_fb" : "")
      },
      u || (s ? s() : []),
      u && e._ === 1 ? 64 : -2
    );
  } catch (u) {
    for (let f = ht.length; f > o; f--) Fs();
    throw u;
  } finally {
    l && l._c && (l._d = !0);
  }
  return a.scopeId && (a.slotScopeIds = [a.scopeId + "-s"]), a;
}
function lr(e) {
  return e.some((t) => Jn(t) ? !(t.type === Ke || t.type === X && !lr(t.children)) : !0) ? e : null;
}
const vs = (e) => e ? kr(e) ? Yn(e) : vs(e.parent) : null, fn = (
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
    $parent: (e) => vs(e.parent),
    $root: (e) => vs(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => e.type,
    $forceUpdate: (e) => e.f || (e.f = () => {
      Os(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Nt.bind(e.proxy)),
    $watch: (e) => jt
  })
), is = (e, t) => e !== ce && !e.__isScriptSetup && se(e, t), Rl = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: s, data: i, props: r, accessCache: l, type: o, appContext: a } = e;
    if (t[0] !== "$") {
      const p = l[t];
      if (p !== void 0)
        switch (p) {
          case 1:
            return s[t];
          case 2:
            return i[t];
          case 4:
            return n[t];
          case 3:
            return r[t];
        }
      else {
        if (is(s, t))
          return l[t] = 1, s[t];
        if (se(r, t))
          return l[t] = 3, r[t];
        if (n !== ce && se(n, t))
          return l[t] = 4, n[t];
        l[t] = 0;
      }
    }
    const u = fn[t];
    let f, h;
    if (u)
      return t === "$attrs" && Se(e.attrs, "get", ""), u(e);
    if (
      // css module (injected by vue-loader)
      (f = o.__cssModules) && (f = f[t])
    )
      return f;
    if (n !== ce && se(n, t))
      return l[t] = 4, n[t];
    if (
      // global properties
      h = a.config.globalProperties, se(h, t)
    )
      return h[t];
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: i, ctx: r } = e;
    return is(i, t) ? (i[t] = n, !0) : se(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (r[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: i, props: r, type: l }
  }, o) {
    let a;
    return !!(n[o] || is(t, o) || se(r, o) || se(s, o) || se(fn, o) || se(i.config.globalProperties, o) || (a = l.__cssModules) && a[o]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : se(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function or() {
  return {
    app: null,
    config: {
      isNativeTag: Ci,
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
let Pl = 0;
function Ll(e, t) {
  return function(s, i = null) {
    ie(s) || (s = Oe({}, s)), i != null && !ue(i) && (i = null);
    const r = or(), l = /* @__PURE__ */ new WeakSet(), o = [];
    let a = !1;
    const u = r.app = {
      _uid: Pl++,
      _component: s,
      _props: i,
      _container: null,
      _context: r,
      _instance: null,
      version: po,
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
          const g = u._ceVNode || Ie(s, i);
          return g.appContext = r, p === !0 ? p = "svg" : p === !1 && (p = void 0), e(g, f, p), a = !0, u._container = f, f.__vue_app__ = u, Yn(g.component);
        }
      },
      onUnmount(f) {
        o.push(f);
      },
      unmount() {
        a && (it(
          o,
          u._instance,
          16
        ), e(null, u._container), delete u._container.__vue_app__);
      },
      provide(f, h) {
        return r.provides[f] = h, u;
      },
      runWithContext(f) {
        const h = Wt;
        Wt = u;
        try {
          return f();
        } finally {
          Wt = h;
        }
      }
    };
    return u;
  };
}
let Wt = null;
const Fl = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${We(t)}Modifiers`] || e[`${Ht(t)}Modifiers`];
function Nl(e, t, ...n) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || ce;
  let i = n;
  const r = t.startsWith("update:"), l = r && Fl(s, t.slice(7));
  l && (l.trim && (i = n.map((f) => he(f) ? f.trim() : f)), l.number && (i = i.map(Ss)));
  let o, a = s[o = Xn(t)] || // also try camelCase event handler (#2249)
  s[o = Xn(We(t))];
  !a && r && (a = s[o = Xn(Ht(t))]), a && it(
    a,
    e,
    6,
    i
  );
  const u = s[o + "Once"];
  if (u) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[o])
      return;
    e.emitted[o] = !0, it(
      u,
      e,
      6,
      i
    );
  }
}
function jl(e, t, n = !1) {
  const s = t.emitsCache, i = s.get(e);
  if (i !== void 0)
    return i;
  const r = e.emits;
  let l = {};
  return r ? (q(r) ? r.forEach((o) => l[o] = null) : Oe(l, r), ue(e) && s.set(e, l), l) : (ue(e) && s.set(e, null), null);
}
function zn(e, t) {
  return !e || !Dn(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), se(e, t[0].toLowerCase() + t.slice(1)) || se(e, Ht(t)) || se(e, t));
}
function Ys(e) {
  const {
    type: t,
    vnode: n,
    proxy: s,
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
    ctx: F,
    inheritAttrs: C
  } = e, P = Rn(e);
  let R, O;
  try {
    if (n.shapeFlag & 4) {
      const M = i || s, K = M;
      R = Ze(
        u.call(
          K,
          M,
          f,
          h,
          g,
          p,
          F
        )
      ), O = o;
    } else {
      const M = t;
      R = Ze(
        M.length > 1 ? M(
          h,
          { attrs: o, slots: l, emit: a }
        ) : M(
          h,
          null
        )
      ), O = t.props ? o : Dl(o);
    }
  } catch (M) {
    ht.length = 0, Bn(M, e, 1), R = Ie(Ke);
  }
  let k = R;
  if (O && C !== !1) {
    const M = Object.keys(O), { shapeFlag: K } = k;
    M.length && K & 7 && (r && M.some(Un) && (O = Ul(
      O,
      r
    )), k = zt(k, O, !1, !0));
  }
  if (n.dirs && (k = zt(k, null, !1, !0), k.dirs = k.dirs ? k.dirs.concat(n.dirs) : n.dirs), n.transition) {
    const M = qn(k.type) && sr(k) || k;
    cn(M, n.transition);
  }
  return R = k, Rn(P), R;
}
function ar(e, t = !0) {
  let n;
  for (let s = 0; s < e.length; s++) {
    const i = e[s];
    if (Jn(i)) {
      if (i.type !== Ke || i.children === "v-if") {
        if (n)
          return;
        n = i;
      }
    } else
      return;
  }
  return n;
}
const Dl = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || Dn(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Ul = (e, t) => {
  const n = {};
  for (const s in e)
    (!Un(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
  return n;
};
function Hl(e, t, n) {
  const { props: s, children: i, component: r } = e, { props: l, children: o, patchFlag: a } = t, u = r.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && a >= 0) {
    if (a & 1024)
      return !0;
    if (a & 16)
      return s ? Xs(s, l, u) : !!l;
    if (a & 8) {
      const f = t.dynamicProps;
      for (let h = 0; h < f.length; h++) {
        const p = f[h];
        if (cr(l, s, p) && !zn(u, p))
          return !0;
      }
    }
  } else
    return (i || o) && (!o || !o.$stable) ? !0 : s === l ? !1 : s ? l ? Xs(s, l, u) : !0 : !!l;
  return !1;
}
function Xs(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length)
    return !0;
  for (let i = 0; i < s.length; i++) {
    const r = s[i];
    if (!se(e, r) || cr(t, e, r) && !zn(n, r))
      return !0;
  }
  return !1;
}
function cr(e, t, n) {
  const s = e[n], i = t[n];
  return n === "style" && ue(s) && ue(i) ? !Ct(s, i) : s !== i;
}
function Kl({ vnode: e, parent: t, suspense: n }, s) {
  for (; t; ) {
    const i = t.subTree;
    if (i.suspense && i.suspense.activeBranch === e && (i.suspense.vnode.el = i.el = s, e = i), i === e)
      (e = t.vnode).el = s, t = t.parent;
    else
      break;
  }
  n && n.activeBranch === e && (n.vnode.el = s);
}
const ur = {}, fr = () => Object.create(ur), dr = (e) => Object.getPrototypeOf(e) === ur;
function Vl(e, t, n, s = !1) {
  const i = {}, r = fr();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), hr(e, t, i, r);
  for (const l in e.propsOptions[0])
    l in i || (i[l] = void 0);
  n ? e.props = s ? i : /* @__PURE__ */ ul(i) : e.type.props ? e.props = i : e.props = r, e.attrs = r;
}
function Bl(e, t, n, s) {
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
    (s || l > 0) && !(l & 16)
  ) {
    if (l & 8) {
      const f = e.vnode.dynamicProps;
      for (let h = 0; h < f.length; h++) {
        let p = f[h];
        if (zn(e.emitsOptions, p))
          continue;
        const g = t[p];
        if (a)
          if (se(r, p))
            g !== r[p] && (r[p] = g, u = !0);
          else {
            const F = We(p);
            i[F] = bs(
              a,
              o,
              F,
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
    hr(e, t, i, r) && (u = !0);
    let f;
    for (const h in o)
      (!t || // for camelCase
      !se(t, h) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((f = Ht(h)) === h || !se(t, f))) && (a ? n && // for camelCase
      (n[h] !== void 0 || // for kebab-case
      n[f] !== void 0) && (i[h] = bs(
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
  u && ft(e.attrs, "set", "");
}
function hr(e, t, n, s) {
  const [i, r] = e.propsOptions;
  let l = !1, o;
  if (t)
    for (let a in t) {
      if (ln(a))
        continue;
      const u = t[a];
      let f;
      i && se(i, f = We(a)) ? !r || !r.includes(f) ? n[f] = u : (o || (o = {}))[f] = u : zn(e.emitsOptions, a) || (!(a in s) || u !== s[a]) && (s[a] = u, l = !0);
    }
  if (r) {
    const a = /* @__PURE__ */ Z(n), u = o || ce;
    for (let f = 0; f < r.length; f++) {
      const h = r[f];
      n[h] = bs(
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
function bs(e, t, n, s, i, r) {
  const l = e[n];
  if (l != null) {
    const o = se(l, "default");
    if (o && s === void 0) {
      const a = l.default;
      if (l.type !== Function && !l.skipFactory && ie(a)) {
        const { propsDefaults: u } = i;
        if (n in u)
          s = u[n];
        else {
          const f = Ns(i);
          s = u[n] = a.call(
            null,
            t
          ), f();
        }
      } else
        s = a;
      i.ce && i.ce._setProp(n, s);
    }
    l[
      0
      /* shouldCast */
    ] && (r && !o ? s = !1 : l[
      1
      /* shouldCastTrue */
    ] && (s === "" || s === Ht(n)) && (s = !0));
  }
  return s;
}
function ql(e, t, n = !1) {
  const s = t.propsCache, i = s.get(e);
  if (i)
    return i;
  const r = e.props, l = {}, o = [];
  if (!r)
    return ue(e) && s.set(e, Ft), Ft;
  if (q(r))
    for (let u = 0; u < r.length; u++) {
      const f = We(r[u]);
      Qs(f) && (l[f] = ce);
    }
  else if (r)
    for (const u in r) {
      const f = We(u);
      if (Qs(f)) {
        const h = r[u], p = l[f] = q(h) || ie(h) ? { type: h } : Oe({}, h), g = p.type;
        let F = !1, C = !0;
        if (q(g))
          for (let P = 0; P < g.length; ++P) {
            const R = g[P], O = ie(R) && R.name;
            if (O === "Boolean") {
              F = !0;
              break;
            } else O === "String" && (C = !1);
          }
        else
          F = ie(g) && g.name === "Boolean";
        p[
          0
          /* shouldCast */
        ] = F, p[
          1
          /* shouldCastTrue */
        ] = C, (F || se(p, "default")) && o.push(f);
      }
    }
  const a = [l, o];
  return ue(e) && s.set(e, a), a;
}
function Qs(e) {
  return e[0] !== "$" && !ln(e);
}
const Ps = (e) => e === "_" || e === "_ctx" || e === "$stable", Ls = (e) => q(e) ? e.map(Ze) : [Ze(e)], Wl = (e, t, n) => {
  if (t._n)
    return t;
  const s = Ve((...i) => Ls(t(...i)), n);
  return s._c = !1, s;
}, pr = (e, t, n) => {
  const s = e._ctx;
  for (const i in e) {
    if (Ps(i)) continue;
    const r = e[i];
    if (ie(r))
      t[i] = Wl(i, r, s);
    else if (r != null) {
      const l = Ls(r);
      t[i] = () => l;
    }
  }
}, gr = (e, t) => {
  const n = Ls(t);
  e.slots.default = () => n;
}, mr = (e, t, n) => {
  for (const s in t)
    (n || !Ps(s)) && (e[s] = t[s]);
}, zl = (e, t, n) => {
  const s = e.slots = fr();
  if (e.vnode.shapeFlag & 32) {
    const i = t._;
    i ? (mr(s, t, n), n && Ei(s, "_", i, !0)) : pr(t, s);
  } else t && gr(e, t);
}, Gl = (e, t, n) => {
  const { vnode: s, slots: i } = e;
  let r = !0, l = ce;
  if (s.shapeFlag & 32) {
    const o = t._;
    o ? n && o === 1 ? r = !1 : mr(i, t, n) : (r = !t.$stable, pr(t, i)), l = t;
  } else t && (gr(e, t), l = { default: 1 });
  if (r)
    for (const o in i)
      !Ps(o) && l[o] == null && delete i[o];
}, Te = eo;
function Jl(e) {
  return Yl(e);
}
function Yl(e, t) {
  const n = Kn();
  n.__VUE__ = !0;
  const {
    insert: s,
    remove: i,
    patchProp: r,
    createElement: l,
    createText: o,
    createComment: a,
    setText: u,
    setElementText: f,
    parentNode: h,
    nextSibling: p,
    setScopeId: g = jt,
    insertStaticContent: F
  } = e, C = (c, d, m, x = null, v = null, _ = null, A = void 0, T = null, $ = !!d.dynamicChildren) => {
    if (c === d)
      return;
    c && !en(c, d) && (x = ve(c), ye(c, v, _, !0), c = null), d.patchFlag === -2 && ($ = !1, d.dynamicChildren = null), d.dynamicChildren && c && c.dynamicChildren && c.dynamicChildren.hasOnce && (d.dynamicChildren === Ft && (d.dynamicChildren = []), d.dynamicChildren.hasOnce = !0);
    const { type: b, ref: N, shapeFlag: E } = d;
    switch (b) {
      case Gn:
        P(c, d, m, x);
        break;
      case Ke:
        R(c, d, m, x);
        break;
      case ls:
        c == null && O(d, m, x, A);
        break;
      case X:
        _e(
          c,
          d,
          m,
          x,
          v,
          _,
          A,
          T,
          $
        );
        break;
      default:
        E & 1 ? K(
          c,
          d,
          m,
          x,
          v,
          _,
          A,
          T,
          $
        ) : E & 6 ? Re(
          c,
          d,
          m,
          x,
          v,
          _,
          A,
          T,
          $
        ) : (E & 64 || E & 128) && b.process(
          c,
          d,
          m,
          x,
          v,
          _,
          A,
          T,
          $,
          Je
        );
    }
    N != null && v ? un(N, c && c.ref, _, d || c, !d) : N == null && c && c.ref != null && un(c.ref, null, _, c, !0);
  }, P = (c, d, m, x) => {
    if (c == null)
      s(
        d.el = o(d.children),
        m,
        x
      );
    else {
      const v = d.el = c.el;
      d.children !== c.children && u(v, d.children);
    }
  }, R = (c, d, m, x) => {
    c == null ? s(
      d.el = a(d.children || ""),
      m,
      x
    ) : d.el = c.el;
  }, O = (c, d, m, x) => {
    [c.el, c.anchor] = F(
      c.children,
      d,
      m,
      x,
      c.el,
      c.anchor
    );
  }, k = ({ el: c, anchor: d }, m, x) => {
    let v;
    for (; c && c !== d; )
      v = p(c), s(c, m, x), c = v;
    s(d, m, x);
  }, M = ({ el: c, anchor: d }) => {
    let m;
    for (; c && c !== d; )
      m = p(c), i(c), c = m;
    i(d);
  }, K = (c, d, m, x, v, _, A, T, $) => {
    if (d.type === "svg" ? A = "svg" : d.type === "math" && (A = "mathml"), c == null)
      G(
        d,
        m,
        x,
        v,
        _,
        A,
        T,
        $
      );
    else {
      const b = c.el && c.el._isVueCE ? c.el : null;
      try {
        b && b._beginPatch(), J(
          c,
          d,
          v,
          _,
          A,
          T,
          $
        );
      } finally {
        b && b._endPatch();
      }
    }
  }, G = (c, d, m, x, v, _, A, T) => {
    let $, b;
    const { props: N, shapeFlag: E, transition: H, dirs: V } = c;
    if ($ = c.el = l(
      c.type,
      _,
      N && N.is,
      N
    ), E & 8 ? f($, c.children) : E & 16 && U(
      c.children,
      $,
      null,
      x,
      v,
      rs(c, _),
      A,
      T
    ), V && Rt(c, null, x, "created"), z($, c, c.scopeId, A, x), N) {
      for (const ee in N)
        ee !== "value" && !ln(ee) && r($, ee, null, N[ee], _, x);
      "value" in N && r($, "value", null, N.value, _), (b = N.onVnodeBeforeMount) && Ye(b, x, c);
    }
    V && Rt(c, null, x, "beforeMount");
    const W = Xl(v, H);
    W ? H.beforeEnter($) : H && !H.persisted && ($[Zl] = !0), s($, d, m), ((b = N && N.onVnodeMounted) || W || V) && Te(() => {
      b && Ye(b, x, c), W && H.enter($), V && Rt(c, null, x, "mounted");
    }, v);
  }, z = (c, d, m, x, v) => {
    if (m && g(c, m), x)
      for (let _ = 0; _ < x.length; _++)
        g(c, x[_]);
    if (v) {
      let _ = v.subTree;
      if (d === _ || br(_.type) && (_.ssContent === d || _.ssFallback === d)) {
        const A = v.vnode;
        z(
          c,
          A,
          A.scopeId,
          A.slotScopeIds,
          v.parent
        );
      }
    }
  }, U = (c, d, m, x, v, _, A, T, $ = 0) => {
    for (let b = $; b < c.length; b++) {
      const N = c[b] = T ? ct(c[b]) : Ze(c[b]);
      C(
        null,
        N,
        d,
        m,
        x,
        v,
        _,
        A,
        T
      );
    }
  }, J = (c, d, m, x, v, _, A) => {
    const T = d.el = c.el;
    let { patchFlag: $, dynamicChildren: b, dirs: N } = d;
    $ |= c.patchFlag & 16;
    const E = c.props || ce, H = d.props || ce;
    let V;
    if (m && Pt(m, !1), (V = H.onVnodeBeforeUpdate) && Ye(V, m, d, c), N && Rt(d, c, m, "beforeUpdate"), m && Pt(m, !0), // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    b && (!c.dynamicChildren || c.dynamicChildren.length !== b.length) && ($ = 0, A = !1, b = null), (E.innerHTML && H.innerHTML == null || E.textContent && H.textContent == null) && f(T, ""), b ? ae(
      c.dynamicChildren,
      b,
      T,
      m,
      x,
      rs(d, v),
      _
    ) : A || me(
      c,
      d,
      T,
      null,
      m,
      x,
      rs(d, v),
      _,
      !1
    ), $ > 0) {
      if ($ & 16)
        re(T, E, H, m, v);
      else if ($ & 2 && E.class !== H.class && r(T, "class", null, H.class, v), $ & 4 && r(T, "style", E.style, H.style, v), $ & 8) {
        const W = d.dynamicProps;
        for (let ee = 0; ee < W.length; ee++) {
          const Q = W[ee], fe = E[Q], pe = H[Q];
          (pe !== fe || Q === "value") && r(T, Q, fe, pe, v, m);
        }
      }
      $ & 1 && c.children !== d.children && f(T, d.children);
    } else !A && b == null && re(T, E, H, m, v);
    ((V = H.onVnodeUpdated) || N) && Te(() => {
      V && Ye(V, m, d, c), N && Rt(d, c, m, "updated");
    }, x);
  }, ae = (c, d, m, x, v, _, A) => {
    for (let T = 0; T < d.length; T++) {
      const $ = c[T], b = d[T], N = $.el || dn($), E = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        N && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        ($.type === X || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !en($, b) || // - In the case of a component, it could contain anything.
        $.shapeFlag & 198) ? h(N) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          m
        )
      );
      C(
        $,
        b,
        E,
        null,
        x,
        v,
        _,
        A,
        !0
      );
    }
  }, re = (c, d, m, x, v) => {
    if (d !== m) {
      if (d !== ce)
        for (const _ in d)
          !ln(_) && !(_ in m) && r(
            c,
            _,
            d[_],
            null,
            v,
            x
          );
      for (const _ in m) {
        if (ln(_)) continue;
        const A = m[_], T = d[_];
        A !== T && _ !== "value" && r(c, _, T, A, v, x);
      }
      "value" in m && r(c, "value", d.value, m.value, v);
    }
  }, _e = (c, d, m, x, v, _, A, T, $) => {
    const b = d.el = c ? c.el : o(""), N = d.anchor = c ? c.anchor : o("");
    let { patchFlag: E, dynamicChildren: H, slotScopeIds: V } = d;
    V && (T = T ? T.concat(V) : V), c == null ? (s(b, m, x), s(N, m, x), U(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      d.children || [],
      m,
      N,
      v,
      _,
      A,
      T,
      $
    )) : E > 0 && E & 64 && H && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    c.dynamicChildren && c.dynamicChildren.length === H.length ? (ae(
      c.dynamicChildren,
      H,
      m,
      v,
      _,
      A,
      T
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (d.key != null || v && d === v.subTree) && yr(
      c,
      d,
      !0
      /* shallow */
    )) : me(
      c,
      d,
      m,
      N,
      v,
      _,
      A,
      T,
      $
    );
  }, Re = (c, d, m, x, v, _, A, T, $) => {
    d.slotScopeIds = T, c == null ? d.shapeFlag & 512 ? v.ctx.activate(
      d,
      m,
      x,
      A,
      $
    ) : yt(
      d,
      m,
      x,
      v,
      _,
      A,
      $
    ) : Tt(c, d, $);
  }, yt = (c, d, m, x, v, _, A) => {
    const T = c.component = lo(
      c,
      x,
      v
    );
    if (ir(c) && (T.ctx.renderer = Je), ao(T, !1, A), T.asyncDep) {
      if (v && v.registerDep(
        T,
        $t,
        A,
        _
      ), !c.el) {
        const $ = T.subTree = Ie(Ke);
        R(null, $, d, m), c.placeholder = $.el;
      }
    } else
      $t(
        T,
        c,
        d,
        m,
        v,
        _,
        A
      );
  }, Tt = (c, d, m) => {
    const x = d.component = c.component;
    if (Hl(c, d, m))
      if (x.asyncDep && !x.asyncResolved) {
        d.el = c.el, d.placeholder = c.placeholder, Pe(x, d, m);
        return;
      } else
        x.next = d, x.update();
    else
      d.el = c.el, d.placeholder = c.placeholder, x.vnode = d;
  }, $t = (c, d, m, x, v, _, A) => {
    const T = () => {
      if (c.isMounted) {
        let { next: E, bu: H, u: V, parent: W, vnode: ee } = c;
        {
          const Me = vr(c);
          if (Me) {
            E && (E.el = ee.el, Pe(c, E, A)), Me.asyncDep.then(() => {
              const w = () => {
                c.job.flags & 8 || (v && v.pendingBranch ? Te(w, v) : b());
              };
              w.flags = 48, Te(w, v);
            });
            return;
          }
        }
        let Q = E, fe;
        Pt(c, !1), E ? (E.el = ee.el, Pe(c, E, A)) : E = ee, H && Mn(H), (fe = E.props && E.props.onVnodeBeforeUpdate) && Ye(fe, W, E, ee), Pt(c, !0);
        const pe = Ys(c), Fe = c.subTree;
        c.subTree = pe, C(
          Fe,
          pe,
          // parent may have changed if it's in a teleport. a root that is a
          // pending async component only has its placeholder comment
          h(
            Fe.el || dn(Fe)
          ),
          // anchor may have changed if it's in a fragment
          ve(Fe),
          c,
          v,
          _
        ), E.el = pe.el, Q === null && Kl(c, pe.el), V && Te(V, v), (fe = E.props && E.props.onVnodeUpdated) && Te(
          () => Ye(fe, W, E, ee),
          v
        );
      } else {
        let E;
        const { el: H, props: V } = d, { bm: W, m: ee, parent: Q, root: fe, type: pe } = c, Fe = qt(d);
        Pt(c, !1), W && Mn(W), !Fe && (E = V && V.onVnodeBeforeMount) && Ye(E, Q, d), Pt(c, !0);
        {
          fe.ce && fe.ce._hasShadowRoot() && fe.ce._injectChildStyle(
            pe,
            c.parent ? c.parent.type : void 0
          );
          const Me = c.subTree = Ys(c);
          C(
            null,
            Me,
            m,
            x,
            c,
            v,
            _
          ), d.el = Me.el;
        }
        if (ee && Te(ee, v), !Fe && (E = V && V.onVnodeMounted)) {
          const Me = d;
          Te(
            () => Ye(E, Q, Me),
            v
          );
        }
        (d.shapeFlag & 256 || Q && qt(Q.vnode) && Q.vnode.shapeFlag & 256) && c.a && Te(c.a, v), c.isMounted = !0, d = m = x = null;
      }
    };
    c.scope.on();
    const $ = c.effect = new Li(T);
    c.scope.off();
    const b = c.update = $.run.bind($), N = c.job = $.runIfDirty.bind($);
    N.i = c, N.id = c.uid, $.scheduler = () => Os(N), Pt(c, !0), b();
  }, Pe = (c, d, m) => {
    d.component = c;
    const x = c.vnode.props;
    c.vnode = d, c.next = null, Bl(c, d.props, x, m), Gl(c, d.children, m), gt(), Zi(c), mt();
  }, me = (c, d, m, x, v, _, A, T, $ = !1) => {
    const b = c && c.children, N = c ? c.shapeFlag : 0, E = d.children, { patchFlag: H, shapeFlag: V } = d;
    if (H > 0) {
      if (H & 128) {
        Le(
          b,
          E,
          m,
          x,
          v,
          _,
          A,
          T,
          $
        );
        return;
      } else if (H & 256) {
        we(
          b,
          E,
          m,
          x,
          v,
          _,
          A,
          T,
          $
        );
        return;
      }
    }
    V & 8 ? (N & 16 && ke(b, v, _), E !== b && f(m, E)) : N & 16 ? V & 16 ? Le(
      b,
      E,
      m,
      x,
      v,
      _,
      A,
      T,
      $
    ) : ke(b, v, _, !0) : (N & 8 && f(m, ""), V & 16 && U(
      E,
      m,
      x,
      v,
      _,
      A,
      T,
      $
    ));
  }, we = (c, d, m, x, v, _, A, T, $) => {
    c = c || Ft, d = d || Ft;
    const b = c.length, N = d.length, E = Math.min(b, N);
    let H;
    for (H = 0; H < E; H++) {
      const V = d[H] = $ ? ct(d[H]) : Ze(d[H]);
      C(
        c[H],
        V,
        m,
        null,
        v,
        _,
        A,
        T,
        $
      );
    }
    b > N ? ke(
      c,
      v,
      _,
      !0,
      !1,
      E
    ) : U(
      d,
      m,
      x,
      v,
      _,
      A,
      T,
      $,
      E
    );
  }, Le = (c, d, m, x, v, _, A, T, $) => {
    let b = 0;
    const N = d.length;
    let E = c.length - 1, H = N - 1;
    for (; b <= E && b <= H; ) {
      const V = c[b], W = d[b] = $ ? ct(d[b]) : Ze(d[b]);
      if (en(V, W))
        C(
          V,
          W,
          m,
          null,
          v,
          _,
          A,
          T,
          $
        );
      else
        break;
      b++;
    }
    for (; b <= E && b <= H; ) {
      const V = c[E], W = d[H] = $ ? ct(d[H]) : Ze(d[H]);
      if (en(V, W))
        C(
          V,
          W,
          m,
          null,
          v,
          _,
          A,
          T,
          $
        );
      else
        break;
      E--, H--;
    }
    if (b > E) {
      if (b <= H) {
        const V = H + 1, W = V < N ? d[V].el : x;
        for (; b <= H; )
          C(
            null,
            d[b] = $ ? ct(d[b]) : Ze(d[b]),
            m,
            W,
            v,
            _,
            A,
            T,
            $
          ), b++;
      }
    } else if (b > H)
      for (; b <= E; )
        ye(c[b], v, _, !0), b++;
    else {
      const V = b, W = b, ee = /* @__PURE__ */ new Map();
      for (b = W; b <= H; b++) {
        const I = d[b] = $ ? ct(d[b]) : Ze(d[b]);
        I.key != null && ee.set(I.key, b);
      }
      let Q, fe = 0;
      const pe = H - W + 1;
      let Fe = !1, Me = 0;
      const w = new Array(pe);
      for (b = 0; b < pe; b++) w[b] = 0;
      for (b = V; b <= E; b++) {
        const I = c[b];
        if (fe >= pe) {
          ye(I, v, _, !0);
          continue;
        }
        let te;
        if (I.key != null)
          te = ee.get(I.key);
        else
          for (Q = W; Q <= H; Q++)
            if (w[Q - W] === 0 && en(I, d[Q])) {
              te = Q;
              break;
            }
        te === void 0 ? ye(I, v, _, !0) : (w[te - W] = b + 1, te >= Me ? Me = te : Fe = !0, C(
          I,
          d[te],
          m,
          null,
          v,
          _,
          A,
          T,
          $
        ), fe++);
      }
      const y = Fe ? Ql(w) : Ft;
      for (Q = y.length - 1, b = pe - 1; b >= 0; b--) {
        const I = W + b, te = d[I], bt = d[I + 1], _t = I + 1 < N ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          bt.el || dn(bt)
        ) : x;
        w[b] === 0 ? C(
          null,
          te,
          m,
          _t,
          v,
          _,
          A,
          T,
          $
        ) : Fe && (Q < 0 || b !== y[Q] ? De(te, m, _t, 2) : Q--);
      }
    }
  }, De = (c, d, m, x, v = null) => {
    const { el: _, type: A, transition: T, children: $, shapeFlag: b } = c;
    if (b & 6) {
      De(c.component.subTree, d, m, x);
      return;
    }
    if (b & 128) {
      c.suspense.move(d, m, x);
      return;
    }
    if (b & 64) {
      A.move(c, d, m, Je);
      return;
    }
    if (A === X) {
      s(_, d, m);
      for (let E = 0; E < $.length; E++)
        De($[E], d, m, x);
      s(c.anchor, d, m);
      return;
    }
    if (A === ls) {
      k(c, d, m);
      return;
    }
    if (x !== 2 && b & 1 && T)
      if (x === 0)
        T.persisted && !_[ss] ? s(_, d, m) : (T.beforeEnter(_), s(_, d, m), Te(() => T.enter(_), v));
      else {
        const { leave: E, delayLeave: H, afterLeave: V } = T, W = () => {
          c.ctx.isUnmounted ? i(_) : s(_, d, m);
        }, ee = () => {
          const Q = _._isLeaving || !!_[ss];
          _._isLeaving && _[ss](
            !0
            /* cancelled */
          ), T.persisted && !Q ? W() : E(_, () => {
            W(), V && V();
          });
        };
        H ? H(_, W, ee) : ee();
      }
    else
      s(_, d, m);
  }, ye = (c, d, m, x = !1, v = !1) => {
    const {
      type: _,
      props: A,
      ref: T,
      children: $,
      dynamicChildren: b,
      shapeFlag: N,
      patchFlag: E,
      dirs: H,
      cacheIndex: V,
      memo: W
    } = c;
    if ((E === -2 || b && b.hasOnce) && (v = !1), T != null && (gt(), un(T, null, m, c, !0), mt()), V != null && (!c.ctx || c.ctx === d) && (d.renderCache[V] = void 0), N & 256 && d.ctx.deactivate(c))
      return;
    const ee = N & 1 && H, Q = !qt(c);
    let fe;
    if (Q && (fe = A && A.onVnodeBeforeUnmount) && Ye(fe, d, c), N & 6)
      At(c.component, m, x);
    else {
      if (N & 128) {
        c.suspense.unmount(m, x);
        return;
      }
      ee && Rt(c, null, d, "beforeUnmount"), N & 64 ? c.type.remove(
        c,
        d,
        m,
        Je,
        x
      ) : b && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !b.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (_ !== X || E > 0 && E & 64) ? ke(
        b,
        d,
        m,
        !1,
        !0
      ) : (_ === X && E & 384 || !v && N & 16) && ke($, d, m), x && B(c);
    }
    const pe = W != null && V == null;
    (Q && (fe = A && A.onVnodeUnmounted) || ee || pe) && Te(() => {
      fe && Ye(fe, d, c), ee && Rt(c, null, d, "unmounted"), pe && (c.el = null);
    }, m);
  }, B = (c) => {
    const { type: d, el: m, anchor: x, transition: v } = c, _ = d === X;
    if (_ && !v) {
      le(m, x);
      return;
    }
    if (d === ls) {
      M(c), v && !v.persisted && v.afterLeave && v.afterLeave();
      return;
    }
    const A = _ ? ys(c) : c, T = () => {
      _ ? h(m) && le(m, x) : i(m), v && !v.persisted && v.afterLeave && v.afterLeave();
    };
    if (A && A.shapeFlag & 1 && v && !v.persisted) {
      const { leave: $, delayLeave: b } = v, N = A.el, E = () => $(N, T);
      b ? b(N, T, E) : E();
    } else
      T();
  }, le = (c, d) => {
    let m;
    for (; c !== d; )
      m = p(c), i(c), c = m;
    i(d);
  }, At = (c, d, m) => {
    const { bum: x, scope: v, job: _, subTree: A, um: T, m: $, a: b } = c;
    Zs($), Zs(b), x && Mn(x), v.stop(), _ ? (_.flags |= 8, ye(A, c, d, m)) : A && (A.transition = c.vnode.transition, ye(A, c, d, m)), T && Te(T, d);
    const N = () => {
      c.isUnmounted = !0;
    };
    N.flags = 16, Te(N, d);
  }, ke = (c, d, m, x = !1, v = !1, _ = 0) => {
    for (let A = _; A < c.length; A++)
      ye(c[A], d, m, x, v);
  }, ve = (c) => {
    if (c.shapeFlag & 6)
      return ve(c.component.subTree);
    if (c.shapeFlag & 128)
      return c.suspense.next();
    const d = p(c.anchor || c.el), m = d && d[Tl];
    return m ? p(m) : d;
  }, vt = (c, d, m) => {
    const x = c && d._vnode ? void 0 : c && c.component ? c.component.uid : ro();
    xl(() => {
      c == null ? d._vnode && ye(d._vnode, null, null, !0) : C(
        d._vnode || null,
        c,
        d,
        null,
        null,
        null,
        m
      ), d._vnode = c;
    }, x);
  }, Je = {
    p: C,
    um: ye,
    m: De,
    r: B,
    mt: yt,
    mc: U,
    pc: me,
    pbc: ae,
    n: ve,
    o: e
  };
  return {
    render: vt,
    hydrate: void 0,
    createApp: Ll(vt)
  };
}
function rs({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Pt({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Xl(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function yr(e, t, n = !1) {
  const s = e.children, i = t.children;
  if (q(s) && q(i))
    for (let r = 0; r < s.length; r++) {
      const l = s[r];
      let o = i[r];
      o.shapeFlag & 1 && !o.dynamicChildren && ((o.patchFlag <= 0 || o.patchFlag === 32) && (o = i[r] = ct(i[r]), o.el = l.el), !n && o.patchFlag !== -2 && yr(l, o)), o.type === Gn && (o.patchFlag === -1 && (o = i[r] = ct(o)), o.el = l.el), o.type === Ke && !o.el && (o.el = l.el);
    }
}
function Ql(e) {
  const t = e.slice(), n = [0];
  let s, i, r, l, o;
  const a = e.length;
  for (s = 0; s < a; s++) {
    const u = e[s];
    if (u !== 0) {
      if (i = n[n.length - 1], e[i] < u) {
        t[s] = i, n.push(s);
        continue;
      }
      for (r = 0, l = n.length - 1; r < l; )
        o = r + l >> 1, e[n[o]] < u ? r = o + 1 : l = o;
      u < e[n[r]] && (r > 0 && (t[s] = n[r - 1]), n[r] = s);
    }
  }
  for (r = n.length, l = n[r - 1]; r-- > 0; )
    n[r] = l, l = t[l];
  return n;
}
function vr(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : vr(t);
}
function Zs(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function dn(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  if (t)
    return dn(t.subTree);
  const n = e.suspense;
  return n && n.activeBranch ? dn(n.activeBranch) : null;
}
const br = (e) => e.__isSuspense, Zl = /* @__PURE__ */ Symbol("_deferredEnter");
function eo(e, t) {
  t && t.pendingBranch ? q(e) ? t.effects.push(...e) : t.effects.push(e) : wl(e);
}
const X = /* @__PURE__ */ Symbol.for("v-fgt"), Gn = /* @__PURE__ */ Symbol.for("v-txt"), Ke = /* @__PURE__ */ Symbol.for("v-cmt"), ls = /* @__PURE__ */ Symbol.for("v-stc"), ht = [];
let je = null;
function L(e = !1) {
  ht.push(je = e ? null : []);
}
function Fs() {
  ht.pop(), je = ht[ht.length - 1] || null;
}
let mn = 1;
function ei(e, t = !1) {
  mn += e, e < 0 && je && t && (je.hasOnce = !0);
}
function _r(e) {
  return e.dynamicChildren = mn > 0 ? je || Ft : null, Fs(), mn > 0 && je && je.push(e), e;
}
function j(e, t, n, s, i, r) {
  return _r(
    S(
      e,
      t,
      n,
      s,
      i,
      r,
      !0
    )
  );
}
function pt(e, t, n, s, i) {
  return _r(
    Ie(
      e,
      t,
      n,
      s,
      i,
      !0
    )
  );
}
function Jn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function en(e, t) {
  return e.type === t.type && e.key === t.key;
}
const wr = ({ key: e }) => e ?? null, Tn = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? he(e) || /* @__PURE__ */ Ee(e) || ie(e) ? { i: Ce, r: e, k: t, f: !!n } : e : null);
function S(e, t = null, n = null, s = 0, i = null, r = e === X ? 0 : 1, l = !1, o = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && wr(t),
    ref: t && Tn(t),
    scopeId: nr,
    slotScopeIds: null,
    children: n,
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
    patchFlag: s,
    dynamicProps: i,
    dynamicChildren: null,
    appContext: null,
    ctx: Ce
  };
  return o ? (Ln(a, n), r & 128 && e.normalize(a)) : n && (a.shapeFlag |= he(n) ? 8 : 16), mn > 0 && // avoid a block node from tracking itself
  !l && // has current parent block
  je && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || r & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && je.push(a), a;
}
const Ie = to;
function to(e, t = null, n = null, s = 0, i = null, r = !1) {
  if ((!e || e === Ol) && (e = Ke), Jn(e)) {
    const o = zt(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Ln(o, n), mn > 0 && !r && je && (o.shapeFlag & 6 ? je[je.indexOf(e)] = o : je.push(o)), o.patchFlag = -2, o;
  }
  if (ho(e) && (e = e.__vccOpts), t) {
    t = no(t);
    let { class: o, style: a } = t;
    o && !he(o) && (t.class = tt(o)), ue(a) && (/* @__PURE__ */ Es(a) && !q(a) && (a = Oe({}, a)), t.style = kt(a));
  }
  const l = he(e) ? 1 : br(e) ? 128 : qn(e) ? 64 : ue(e) ? 4 : ie(e) ? 2 : 0;
  return S(
    e,
    t,
    n,
    s,
    i,
    l,
    r,
    !0
  );
}
function no(e) {
  return e ? /* @__PURE__ */ Es(e) ? Oe({}, e) : dr(e) ? Oe({}, e[Cr] || e) : e : null;
}
function zt(e, t, n = !1, s = !1) {
  const { props: i, ref: r, patchFlag: l, children: o, transition: a } = e, u = t ? so(i || {}, t) : i, f = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: u,
    key: u && wr(u),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && r ? q(r) ? r.concat(Tn(t)) : [r, Tn(t)] : Tn(t)
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
    ssContent: e.ssContent && zt(e.ssContent),
    ssFallback: e.ssFallback && zt(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce,
    cacheIndex: e.cacheIndex
  };
  return a && s && cn(
    f,
    a.clone(f)
  ), f;
}
function ge(e = " ", t = 0) {
  return Ie(Gn, null, e, t);
}
function ne(e = "", t = !1) {
  return t ? (L(), pt(Ke, null, e)) : Ie(Ke, null, e);
}
function Ze(e) {
  return e == null || typeof e == "boolean" ? Ie(Ke) : q(e) ? Ie(
    X,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : Jn(e) ? ct(e) : Ie(Gn, null, String(e));
}
function ct(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : zt(e);
}
function Ln(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (q(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const i = t.default;
      i && (i._c && (i._d = !1), Ln(e, i()), i._c && (i._d = !0));
      return;
    } else {
      n = 32;
      const i = t._;
      !i && !dr(t) ? t._ctx = Ce : i === 3 && Ce && (Ce.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else if (ie(t)) {
    if (s & 65) {
      Ln(e, { default: t });
      return;
    }
    t = { default: t, _ctx: Ce }, n = 32;
  } else
    t = String(t), s & 64 ? (n = 16, t = [ge(t)]) : n = 8;
  e.children = t, e.shapeFlag |= n;
}
function so(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const i in s)
      if (i === "class")
        t.class !== s.class && (t.class = tt([t.class, s.class]));
      else if (i === "style")
        t.style = kt([t.style, s.style]);
      else if (Dn(i)) {
        const r = t[i], l = s[i];
        l && r !== l && !(q(r) && r.includes(l)) ? t[i] = r ? [].concat(r, l) : l : l == null && r == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !Un(i) && (t[i] = l);
      } else i !== "" && (t[i] = s[i]);
  }
  return t;
}
function Ye(e, t, n, s = null) {
  it(e, t, 7, [
    n,
    s
  ]);
}
const io = /* @__PURE__ */ or();
let xr = 0;
function ro() {
  return xr;
}
function lo(e, t, n) {
  const s = e.type, i = (t ? t.appContext : e.appContext) || io, r = {
    uid: xr++,
    vnode: e,
    type: s,
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
    scope: new Wr(
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
    propsOptions: ql(s, i),
    emitsOptions: jl(s, i),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: ce,
    // inheritAttrs
    inheritAttrs: s.inheritAttrs,
    // state
    ctx: ce,
    data: ce,
    props: ce,
    attrs: ce,
    slots: ce,
    refs: ce,
    setupState: ce,
    setupContext: null,
    // suspense related
    suspense: n,
    suspenseId: n ? n.pendingId : 0,
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
  return r.ctx = { _: r }, r.root = t ? t.root : r, r.emit = Nl.bind(null, r), e.ce && e.ce(r), r;
}
let Mt = null;
const oo = () => Mt || Ce;
let Fn, yn;
{
  const e = Kn(), t = (n, s) => {
    let i;
    return (i = e[n]) || (i = e[n] = []), i.push(s), (r) => {
      i.length > 1 ? i.forEach((l) => l(r)) : i[0](r);
    };
  };
  Fn = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Mt = n
  ), yn = t(
    "__VUE_SSR_SETTERS__",
    (n) => vn = n
  );
}
const Ns = (e) => {
  const t = Mt;
  return Fn(e), e.scope.on(), () => {
    e.scope.off(), Fn(t);
  };
}, ti = () => {
  Mt && Mt.scope.off(), Fn(null);
};
function kr(e) {
  return e.vnode.shapeFlag & 4;
}
let vn = !1;
function ao(e, t = !1, n = !1) {
  t && yn(t);
  const { props: s, children: i } = e.vnode, r = kr(e);
  Vl(e, s, r, t), zl(e, i, n || t);
  const l = r ? co(e, t) : void 0;
  return t && yn(!1), l;
}
function co(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Rl);
  const { setup: s } = n;
  if (s) {
    gt();
    const i = e.setupContext = s.length > 1 ? fo(e) : null, r = Ns(e), l = _n(
      s,
      e,
      0,
      [
        e.props,
        i
      ]
    ), o = Mi(l);
    if (mt(), r(), (o || e.sp) && !qt(e) && Al(e), o) {
      if (l.then(ti, ti), t)
        return l.then((a) => {
          yn(!0);
          try {
            ni(e, a, t);
          } finally {
            yn(!1);
          }
        }).catch((a) => {
          Bn(a, e, 0, void 0, !0), e.ssrRender = (u, f) => f("<!---->");
        });
      e.asyncDep = l;
    } else
      ni(e, l);
  } else
    Sr(e);
}
function ni(e, t, n) {
  ie(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : ue(t) && (e.setupState = Yi(t)), Sr(e);
}
function Sr(e, t, n) {
  const s = e.type;
  e.render || (e.render = s.render || jt);
}
const Cr = /* @__PURE__ */ Symbol(), uo = {
  get(e, t) {
    return Se(e, "get", ""), t === Cr ? e : e[t];
  }
};
function fo(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, uo),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Yn(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Yi(fl(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in fn)
        return fn[n](e);
    },
    has(t, n) {
      return n in t || n in fn;
    }
  })) : e.proxy;
}
function ho(e) {
  return ie(e) && "__vccOpts" in e;
}
const de = (e, t) => /* @__PURE__ */ ml(e, t, vn), po = "3.5.45";
let _s;
const si = typeof window < "u" && window.trustedTypes;
if (si)
  try {
    _s = /* @__PURE__ */ si.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const Ir = _s ? (e) => _s.createHTML(e) : (e) => e, go = "http://www.w3.org/2000/svg", mo = "http://www.w3.org/1998/Math/MathML", at = typeof document < "u" ? document : null, ii = at && /* @__PURE__ */ at.createElement("template"), yo = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, s) => {
    const i = t === "svg" ? at.createElementNS(go, e) : t === "mathml" ? at.createElementNS(mo, e) : n ? at.createElement(e, { is: n }) : at.createElement(e);
    return e === "select" && s && s.multiple != null && i.setAttribute("multiple", s.multiple), i;
  },
  createText: (e) => at.createTextNode(e),
  createComment: (e) => at.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => at.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, s, i, r) {
    const l = n ? n.previousSibling : t.lastChild;
    if (i && (i === r || i.nextSibling))
      for (; t.insertBefore(i.cloneNode(!0), n), !(i === r || !(i = i.nextSibling)); )
        ;
    else {
      ii.innerHTML = Ir(
        s === "svg" ? `<svg>${e}</svg>` : s === "mathml" ? `<math>${e}</math>` : e
      );
      const o = ii.content;
      if (s === "svg" || s === "mathml") {
        const a = o.firstChild;
        for (; a.firstChild; )
          o.appendChild(a.firstChild);
        o.removeChild(a);
      }
      t.insertBefore(o, n);
    }
    return [
      // first
      l ? l.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
}, vo = /* @__PURE__ */ Symbol("_vtc");
function bo(e, t, n) {
  const s = e[vo];
  s && (t = (t ? [t, ...s] : [...s]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const ri = /* @__PURE__ */ Symbol("_vod"), _o = /* @__PURE__ */ Symbol("_vsh"), wo = /* @__PURE__ */ Symbol(""), xo = /(?:^|;)\s*display\s*:/;
function ko(e, t, n) {
  const s = e.style, i = he(n);
  let r = !1;
  if (n && !i) {
    if (t)
      if (he(t))
        for (const l of t.split(";")) {
          const o = l.slice(0, l.indexOf(":")).trim();
          n[o] == null && sn(s, o, "");
        }
      else
        for (const l in t)
          n[l] == null && sn(s, l, "");
    for (const l in n) {
      l === "display" && (r = !0);
      const o = n[l];
      o != null ? Co(
        e,
        l,
        !he(t) && t ? t[l] : void 0,
        o
      ) || sn(s, l, o) : sn(s, l, "");
    }
  } else if (i) {
    if (t !== n) {
      const l = s[wo];
      l && (n += ";" + l), s.cssText = n, r = xo.test(n);
    }
  } else t && e.removeAttribute("style");
  ri in e && ((!i || t !== n) && (e[ri] = r ? s.display : ""), e[_o] && (s.display = "none"));
}
const Sn = /\s*!important$/;
function sn(e, t, n) {
  if (q(n))
    n.forEach((s) => sn(e, t, s));
  else if (n == null && (n = ""), t.startsWith("--"))
    Sn.test(n) ? e.setProperty(t, n.replace(Sn, ""), "important") : e.setProperty(t, n);
  else {
    const s = So(e, t);
    Sn.test(n) ? e.setProperty(
      Ht(s),
      n.replace(Sn, ""),
      "important"
    ) : e[s] = n;
  }
}
const li = ["Webkit", "Moz", "ms"], os = {};
function So(e, t) {
  const n = os[t];
  if (n)
    return n;
  let s = We(t);
  if (s !== "filter" && s in e)
    return os[t] = s;
  s = Ai(s);
  for (let i = 0; i < li.length; i++) {
    const r = li[i] + s;
    if (r in e)
      return os[t] = r;
  }
  return t;
}
function Co(e, t, n, s) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && he(s) && n === s;
}
const oi = "http://www.w3.org/1999/xlink";
function ai(e, t, n, s, i, r = Kr(t)) {
  s && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(oi, t.slice(6, t.length)) : e.setAttributeNS(oi, t, n) : n == null || r && !Oi(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    r ? "" : Ge(n) ? String(n) : n
  );
}
function ci(e, t, n, s, i) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? Ir(n) : n);
    return;
  }
  const r = e.tagName;
  if (t === "value" && r !== "PROGRESS" && // custom elements may use _value internally
  !r.includes("-")) {
    const o = r === "OPTION" ? e.getAttribute("value") || "" : e.value, a = n == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(n);
    (o !== a || !("_value" in e)) && (e.value = a), n == null && e.removeAttribute(t), e._value = n;
    return;
  }
  let l = !1;
  if (n === "" || n == null) {
    const o = typeof e[t];
    o === "boolean" ? n = Oi(n) : n == null && o === "string" ? (n = "", l = !0) : o === "number" && (n = 0, l = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  l && e.removeAttribute(i || t);
}
function Mr(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function Io(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
const ui = /* @__PURE__ */ Symbol("_vei");
function Mo(e, t, n, s, i = null) {
  const r = e[ui] || (e[ui] = {}), l = r[t];
  if (s && l)
    l.value = s;
  else {
    const [o, a] = Ao(t);
    if (s) {
      const u = r[t] = Ro(
        s,
        i
      );
      Mr(e, o, u, a);
    } else l && (Io(e, o, l, a), r[t] = void 0);
  }
}
const To = /(Once|Passive|Capture)$/, $o = /^on:?(?:Once|Passive|Capture)$/;
function Ao(e) {
  let t, n;
  for (; (n = e.match(To)) && !$o.test(e); )
    t || (t = {}), e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = !0;
  return [e[2] === ":" ? e.slice(3) : Ht(e.slice(2)), t];
}
let as = 0;
const Eo = /* @__PURE__ */ Promise.resolve(), Oo = () => as || (Eo.then(() => as = 0), as = Date.now());
function Ro(e, t) {
  const n = (s) => {
    if (!s._vts)
      s._vts = Date.now();
    else if (s._vts <= n.attached)
      return;
    const i = n.value;
    if (q(i)) {
      const r = s.stopImmediatePropagation;
      s.stopImmediatePropagation = () => {
        r.call(s), s._stopped = !0;
      };
      const l = i.slice(), o = [s];
      for (let a = 0; a < l.length && !s._stopped; a++) {
        const u = l[a];
        u && it(
          u,
          t,
          5,
          o
        );
      }
    } else
      it(
        i,
        t,
        5,
        [s]
      );
  };
  return n.value = e, n.attached = Oo(), n;
}
const fi = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Po = (e, t, n, s, i, r) => {
  const l = i === "svg";
  t === "class" ? bo(e, s, l) : t === "style" ? ko(e, n, s) : Dn(t) ? Un(t) || Mo(e, t, n, s, r) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Lo(e, t, s, l)) ? (ci(e, t, s), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && ai(e, t, s, l, r, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (Fo(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !he(s))) ? ci(e, We(t), s, r, t) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), ai(e, t, s, l));
};
function Lo(e, t, n, s) {
  if (s)
    return !!(t === "innerHTML" || t === "textContent" || t in e && fi(t) && ie(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const i = e.tagName;
    if (i === "IMG" || i === "VIDEO" || i === "CANVAS" || i === "SOURCE")
      return !1;
  }
  return fi(t) && he(n) ? !1 : t in e;
}
function Fo(e, t) {
  const n = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!n)
    return !1;
  const s = We(t);
  return Array.isArray(n) ? n.some((i) => We(i) === s) : Object.keys(n).some((i) => We(i) === s);
}
const di = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return q(t) ? (n) => Mn(t, n) : t;
}, cs = /* @__PURE__ */ Symbol("_assign"), No = {
  // <select multiple> value need to be deep traversed
  deep: !0,
  created(e, { value: t, modifiers: { number: n } }, s) {
    e._modelValue = t, Mr(e, "change", () => {
      const i = Array.prototype.filter.call(e.options, (a) => a.selected).map(
        (a) => n ? Ss(Nn(a)) : Nn(a)
      ), r = e.multiple, l = r ? Ut(e._modelValue) ? new Set(i) : i : i[0], o = e._pendingValue = [
        r,
        r ? q(l) ? i.slice() : i : l
      ];
      try {
        e[cs](l);
      } finally {
        Nt(() => {
          e._pendingValue === o && (e._pendingValue = void 0);
        });
      }
    }), e[cs] = di(s);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(e, { value: t, modifiers: { number: n } }) {
    hi(e, t, n);
  },
  beforeUpdate(e, { value: t }, n) {
    e._modelValue = t, e[cs] = di(n);
  },
  updated(e, { value: t, modifiers: { number: n } }) {
    const s = e._pendingValue;
    e._pendingValue = void 0, (!s || s[0] !== e.multiple || !jo(t, s[1], s[0])) && hi(e, t, n);
  }
};
function jo(e, t, n) {
  if (!n || q(e)) return Ct(e, t);
  if (Ut(e)) {
    if (e.size !== t.length) return !1;
    for (const s of t)
      if (!e.has(s)) return !1;
    return !0;
  }
  return !1;
}
function hi(e, t, n = !1) {
  const s = e.multiple, i = q(t);
  if (!(s && !i && !Ut(t))) {
    for (let r = 0, l = e.options.length; r < l; r++) {
      const o = e.options[r], a = Nn(o);
      if (s)
        if (i) {
          const u = typeof a;
          u === "string" || u === "number" ? o.selected = t.some((f) => String(f) === String(a)) : o.selected = qr(t, a) > -1;
        } else
          o.selected = t.has(a) || n && typeof a == "string" && t.has(Ss(a));
      else if (Ct(Nn(o), t)) {
        e.selectedIndex !== r && (e.selectedIndex = r);
        return;
      }
    }
    !s && e.selectedIndex !== -1 && (e.selectedIndex = -1);
  }
}
function Nn(e) {
  return "_value" in e ? e._value : e.value;
}
const Do = ["ctrl", "shift", "alt", "meta"], Uo = {
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
  exact: (e, t) => Do.some((n) => e[`${n}Key`] && !t.includes(n))
}, Tr = (e, t) => {
  if (!e) return e;
  const n = e._withMods || (e._withMods = {}), s = t.join(".");
  return n[s] || (n[s] = ((i, ...r) => {
    for (let l = 0; l < t.length; l++) {
      const o = Uo[t[l]];
      if (o && o(i, t)) return;
    }
    return e(i, ...r);
  }));
}, Ho = /* @__PURE__ */ Oe({ patchProp: Po }, yo);
let pi;
function Ko() {
  return pi || (pi = Jl(Ho));
}
const Vo = ((...e) => {
  const t = Ko().createApp(...e), { mount: n } = t;
  return t.mount = (s) => {
    const i = qo(s);
    if (!i) return;
    const r = t._component;
    !ie(r) && !r.render && !r.template && (r.template = i.innerHTML), i.nodeType === 1 && (i.textContent = "");
    const l = n(i, !1, Bo(i));
    return i instanceof Element && (i.removeAttribute("v-cloak"), i.setAttribute("data-v-app", "")), l;
  }, t;
});
function Bo(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function qo(e) {
  return he(e) ? document.querySelector(e) : e;
}
const jn = () => ({ scale: 1, x: 0, y: 0 });
function Wo() {
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
    transforms: { left: jn(), right: jn() }
  };
}
function gi(e, t, n = !1) {
  const s = /* @__PURE__ */ new Set([
    ...t.map((r) => r.id),
    ...e.checked,
    ...e.pinned,
    e.currentId,
    e.leftId,
    e.rightId
  ]);
  for (const r of [...e.images, ...t])
    s.has(r.id) && e.records.set(r.id, r);
  for (const r of e.records.keys()) s.has(r) || e.records.delete(r);
  const i = new Set(t.map((r) => r.id));
  for (const r of e.records.keys())
    i.has(r) ? e.unavailable.delete(r) : n && e.unavailable.add(r);
  for (const r of e.unavailable) s.has(r) || e.unavailable.delete(r);
  e.images = t;
}
function $n(e) {
  return e.images.filter(
    (t) => t.id === e.leftId || e.scope === "folder" || (e.scope === "checked" ? e.checked : e.promptIds).has(t.id)
  );
}
function us(e, t) {
  const n = e.mode === "single" ? e.images : $n(e), s = e.mode === "single" ? "currentId" : "rightId", r = n.findIndex((l) => l.id === e[s]) + t;
  r >= 0 && r < n.length && (e[s] = n[r].id);
}
function zo(e) {
  e.open = !1, e.checked.clear(), e.pinned.clear(), e.unavailable.clear(), e.currentId = null, e.leftId = null, e.rightId = null, e.manualMatches = {}, e.panel = !1, e.mode = "grid", e.scope = "folder", e.promptIds.clear(), e.transforms = { left: jn(), right: jn() }, e.records.clear(), e.images = [];
}
function Go(e, t) {
  e.linked = t, t && (e.transforms.right = { ...e.transforms.left });
}
function tn(e, t, n) {
  e.transforms[t] = { ...n }, e.linked && (e.transforms[t === "left" ? "right" : "left"] = { ...n });
}
function Jo(e, t, n, s, i) {
  const r = Math.max(1, Math.floor(t / i)), l = Math.max(0, Math.floor(s / i) - 2), o = Math.min(
    Math.ceil(e / r),
    Math.ceil((s + n) / i) + 2
  );
  return {
    columns: r,
    start: l * r,
    end: Math.min(e, o * r),
    offset: l * i,
    totalHeight: Math.ceil(e / r) * i
  };
}
function $r(e, t, n, s, i, r) {
  const l = Math.max(1, Math.floor(s / i)), o = Math.floor(n / i) * l, a = e[o]?.id, u = t.findIndex((f) => f.id === a);
  return u < 0 ? n : Math.floor(u / Math.max(1, Math.floor(s / r))) * r + Math.min(n % i, r - 1);
}
function Yo(e, t, n, s) {
  return n < t ? n : n + s > t + e ? Math.max(0, n + s - e) : t;
}
class Xo {
  constructor(t, n, s = () => {
  }) {
    this.api = t, this.session = n, this.changed = s;
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
      const n = Math.max(1, this.session.images.length), s = [];
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
        i === null && (l = o.next_cursor), s.push(...o.images), i = o.next_cursor, r = o.version;
      } while (i && s.length < n);
      gi(this.session, s, i === null), this.cursor = i, this.version = r, this.firstCursor = l, this.error = "";
    } catch (n) {
      t === this.epoch && !this.abort.signal.aborted && (this.error = n instanceof Error ? n.message : "Could not load images");
    } finally {
      t === this.epoch && (this.working = !1, this.loading = !1, this.changed());
    }
  }
  async loadMore() {
    if (this.working || !this.cursor) return;
    this.working = !0, this.loading = !0, this.changed();
    const t = this.epoch;
    try {
      const n = await this.api.images(
        this.session.folderId,
        this.cursor,
        this.abort.signal
      );
      if (t !== this.epoch) return;
      const s = new Set(this.session.images.map((i) => i.id));
      gi(this.session, [
        ...this.session.images,
        ...n.images.filter((i) => !s.has(i.id))
      ]), this.cursor = n.next_cursor, this.error = "";
    } catch (n) {
      t === this.epoch && !this.abort.signal.aborted && (this.error = n instanceof Error ? n.message : "Could not load more images");
    } finally {
      t === this.epoch && (this.working = !1, this.loading = !1, this.changed());
    }
  }
  dispose() {
    this.epoch++, this.abort.abort();
  }
}
const Ar = ["prompt", "workflow"], mi = 500, Qo = 5e3, Zo = 1e3, ea = /* @__PURE__ */ new Set(["seed", "noise_seed", "random_seed"]), ta = /* @__PURE__ */ new Set(["ckpt_name", "checkpoint_name", "model_name", "unet_name", "diffusion_model_name"]), yi = {
  CLIPTextEncode: ["text"],
  CLIPTextEncodeSDXL: ["text_g", "text_l"],
  CLIPTextEncodeSDXLRefiner: ["text"]
};
function be(e) {
  return e !== null && typeof e == "object" && !Array.isArray(e);
}
function ut(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function rn(e) {
  return ut(yi, e) ? yi[e] : void 0;
}
function na(e) {
  return typeof e == "string" ? e.trim().length > 0 : typeof e == "number" && Number.isSafeInteger(e);
}
function ws(e) {
  if (!be(e) || Object.keys(e).length !== 1 || typeof e.__shiba_number__ != "string" || !/^-?(?:0|[1-9]\d*)$/.test(e.__shiba_number__)) return;
  const t = e.__shiba_number__, n = BigInt(t);
  return n > BigInt(Number.MAX_SAFE_INTEGER) || n < BigInt(Number.MIN_SAFE_INTEGER) ? t : void 0;
}
function sa(e) {
  const t = [e];
  for (; t.length; ) {
    const n = t.pop();
    if (typeof n == "number" && (!Number.isFinite(n) || Number.isInteger(n) && !Number.isSafeInteger(n))) return !0;
    if (Array.isArray(n)) for (const s of n) t.push(s);
    else if (be(n)) for (const s of Object.values(n)) t.push(s);
  }
  return !1;
}
function Cn(e, t, n, s = !1) {
  const i = rn(e)?.includes(t) === !0 && typeof n == "string", r = s ? "reference" : i ? "prompt" : ta.has(t) && typeof n == "string" ? "model" : t === "lora_name" && typeof n == "string" ? "lora-name" : /lora/i.test(e) && ["strength_model", "strength_clip", "strength", "lora_strength"].includes(t) ? "lora-strength" : "value";
  return { key: t, label: t, value: n, kind: r, promptText: i };
}
function Gt(e, t) {
  if (Object.is(e, t)) return !0;
  if (Array.isArray(e) && Array.isArray(t))
    return e.length === t.length && e.every((n, s) => Gt(n, t[s]));
  if (be(e) && be(t)) {
    const n = Object.keys(e);
    return n.length === Object.keys(t).length && n.every((s) => ut(t, s) && Gt(e[s], t[s]));
  }
  return !1;
}
function vi(e, t, n) {
  if (t == null) return { state: "missing", nodes: [] };
  if (!be(t) || e === "workflow" && !Array.isArray(t.nodes))
    return n.push(`${e}: 保存形式を解析できません。`), { state: "invalid", nodes: [] };
  const s = e === "prompt" ? Object.entries(t) : t.nodes.map((a, u) => [be(a) && (typeof a.id == "string" || typeof a.id == "number") ? String(a.id) : `不明[${u}]`, a]), i = [];
  let r = s.length > mi;
  r && n.push(`${e}: ノード数が表示上限を超えています。一部のみ比較します。元 JSON は保持しています。`);
  let l = 0;
  const o = /* @__PURE__ */ new Set();
  for (const [a, u] of s.slice(0, mi)) {
    const f = be(u) ? u[e === "prompt" ? "class_type" : "type"] : void 0;
    if (!be(u) || typeof f != "string" || !f || o.has(a) || e === "workflow" && !na(u.id)) {
      n.push(`${e}: ノード ${a} の形式が不正、または ID が重複しています。`), r = !0;
      continue;
    }
    o.add(a);
    const h = e === "prompt" && be(u._meta) && typeof u._meta.title == "string" ? u._meta.title : typeof u.title == "string" ? u.title : "", p = [];
    let g = !0;
    if (e === "prompt")
      if (!be(u.inputs)) g = !1;
      else
        for (const [P, R] of Object.entries(u.inputs)) {
          const O = Array.isArray(R) && R.length === 2 && typeof R[0] == "string" && Number.isInteger(R[1]) && R[1] >= 0 && ut(t, R[0]);
          p.push(Cn(f, P, R, O));
        }
    else {
      if (Array.isArray(u.widgets_values))
        u.widgets_values.forEach((P, R) => p.push({ key: `widgets_values[${R}]`, label: `保存値[${R}]（名称不明）`, value: P, kind: "value", promptText: !1 }));
      else if (be(u.widgets_values))
        for (const [P, R] of Object.entries(u.widgets_values)) {
          const O = Cn(f, P, R);
          p.push({ ...O, key: `widgets_values.${P}` });
        }
      else u.widgets_values != null && (g = !1);
      if (be(u.inputs))
        for (const [P, R] of Object.entries(u.inputs)) p.push(Cn(f, P, R));
      else if (Array.isArray(u.inputs))
        for (const [P, R] of u.inputs.entries()) {
          if (!be(R)) {
            g = !1;
            continue;
          }
          const O = typeof R.name == "string" ? R.name : `入力[${P}]（名称不明）`;
          if (ut(R, "value") && p.push(Cn(f, O, R.value)), R.link != null) {
            const k = Array.isArray(t.links) ? t.links.find((K) => Array.isArray(K) ? K[0] === R.link : be(K) && K.id === R.link) : void 0, M = Array.isArray(k) ? [String(k[1]), k[2]] : be(k) && ut(k, "origin_id") ? [String(k.origin_id), k.origin_slot] : { link_id: R.link };
            k || (g = !1), p.push({ key: `inputs.${O}`, label: O, value: M, kind: "reference", promptText: !1 });
          }
        }
      else u.inputs != null && (g = !1);
      ut(u, "mode") && p.push({ key: "mode", label: "保存された実行モード", value: u.mode, kind: "value", promptText: !1 }), !ut(u, "widgets_values") && !ut(u, "inputs") && (g = !1);
    }
    const F = p.filter((P) => !ea.has(P.key.replace(/^(?:widgets_values|inputs)\./, ""))), C = F.slice(0, Math.max(0, Qo - l));
    l += C.length, C.length < F.length && (g = !1, n.push(`${e}: 保存項目数が表示上限を超えています。元 JSON は保持しています。`)), C.some((P) => sa(P.value)) && (g = !1, n.push(`${e}: ノード ${a} の数値がブラウザーの正確な整数精度を超えています。値の一致や正確なコピーを保証できません。`)), g || (r = !0, n.push(`${e}: ノード ${a} (${f}) の一部情報を正確に確認できません。`)), i.push({ key: `${e}:${a}`, id: a, type: f, title: h, source: e, fields: C, complete: g });
  }
  return i.length === 0 ? (n.push(`${e}: 比較できる保存ノードがありません。`), { state: s.length ? "invalid" : "partial", nodes: i }) : { state: r ? "partial" : "ok", nodes: i };
}
function bi(e) {
  const t = Array.isArray(e.warnings) ? e.warnings.filter((o) => typeof o == "string") : [], n = vi("prompt", e.prompt, t), s = vi("workflow", e.workflow, t), i = [...n.nodes, ...s.nodes];
  for (const o of n.nodes) {
    const a = s.nodes.find((u) => u.id === o.id && u.type === o.type);
    if (a)
      for (const u of o.fields) {
        const f = a.fields.find((h) => h.key === u.key || h.key === `widgets_values.${u.key}`);
        f && !Gt(u.value, f.value) && t.push(`ノード ${o.id} / ${u.label}: prompt と workflow の保存値が異なります。情報源を分けて表示します。`);
      }
  }
  const r = [n.state, s.state];
  let l = r.every((o) => o === "missing") ? "missing" : i.length === 0 && r.includes("invalid") ? "invalid" : r.includes("invalid") || r.includes("partial") ? "partial" : "ok";
  return ["invalid", "unsupported"].includes(e.status) ? l = i.length ? "partial" : "invalid" : e.status === "partial" && (l = "partial"), l === "missing" && t.push("設定情報なし。保存された生成条件の一致は確認できません。"), l === "invalid" && t.push("保存データを解析できません。画像の比較は継続できます。"), { status: l, nodes: i, warnings: [...new Set(t)], raw: { prompt: e.prompt, workflow: e.workflow }, rawText: { prompt: typeof e.raw_prompt == "string" ? e.raw_prompt : null, workflow: typeof e.raw_workflow == "string" ? e.raw_workflow : null }, sources: { prompt: n.state, workflow: s.state } };
}
function _i(e) {
  return [...new Set(e.nodes.flatMap((t) => t.fields.filter((n) => n.kind === "model" && typeof n.value == "string").map((n) => n.value)))];
}
function Er(e, t, n, s) {
  const i = [], r = /* @__PURE__ */ new Set(), l = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Set(), a = new Map(t.map((h) => [h.key, h])), u = Object.values(n).filter((h) => h !== null);
  for (const h of Object.keys(n))
    e.some((p) => p.key === h) || (o.add(h), s.push(`${h}: 手動対応の左ノードが現在の画像にありません。対応を選び直してください。`));
  for (const h of e) {
    if (!ut(n, h.key)) continue;
    const p = n[h.key];
    if (p === null) {
      o.add(h.key);
      continue;
    }
    const g = a.get(p);
    if (!g || g.source !== h.source || u.filter((F) => F === p).length > 1) {
      o.add(h.key), s.push(`${h.key}: 手動対応が不正、または右ノードが重複しています。対応を選び直してください。`);
      continue;
    }
    i.push({ leftKey: h.key, rightKey: g.key, reason: "manual" }), r.add(h.key), l.add(g.key);
  }
  function f(h, p, g) {
    i.push({ leftKey: h.key, rightKey: p.key, reason: g }), r.add(h.key), l.add(p.key);
  }
  for (const h of Ar) {
    const p = e.filter((C) => C.source === h), g = t.filter((C) => C.source === h);
    if (p.length === g.length && p.every((C) => g.some((P) => P.id === C.id && P.type === C.type)))
      for (const C of p) {
        const P = g.find((R) => R.id === C.id && R.type === C.type);
        P && !r.has(C.key) && !o.has(C.key) && !l.has(P.key) && f(C, P, "id-type");
      }
    for (const C of p) {
      if (r.has(C.key) || o.has(C.key)) continue;
      const P = g.filter((O) => O.type === C.type && !l.has(O.key)), R = p.filter((O) => O.type === C.type && !r.has(O.key));
      if (P.length === 1 && R.length === 1) f(C, P[0], "type");
      else if (C.title) {
        const O = P.filter((k) => k.title === C.title);
        O.length === 1 && R.filter((k) => k.title === C.title).length === 1 && f(C, O[0], "type-title");
      }
    }
  }
  return { matches: i, blocked: o };
}
function ia(e, t, n = {}) {
  const s = [...e.warnings.map((k) => `左: ${k}`), ...t.warnings.map((k) => `右: ${k}`)], i = [], r = n.manualMatches ?? {};
  let l = e.status !== "ok" || t.status !== "ok", o = 0, a = !1;
  for (const k of Ar)
    e.sources[k] !== t.sources[k] && (l = !0, s.push(`${k}: 左右で保存情報の範囲が異なります。欠落を追加・削除と断定しません。`));
  const { matches: u, blocked: f } = Er(e.nodes, t.nodes, r, s);
  f.size && (l = !0), u.some((k) => k.reason === "id-type") && s.push("ID・型による自動対応は保存グラフに基づく候補です。別 workflow の同一性や、モデルファイル・コード版の一致を保証しません。");
  const h = new Map(e.nodes.map((k) => [k.key, k])), p = new Map(t.nodes.map((k) => [k.key, k])), g = new Set(u.map((k) => k.leftKey)), F = new Set(u.map((k) => k.rightKey));
  function C(k, M, K, G, z, U, J) {
    if (i.length >= Zo) {
      l = !0, a || s.push("差分数が表示上限を超えています。一部のみ表示します。元 JSON から全保存値を確認できます。"), a = !0;
      return;
    }
    i.push({ id: `${k?.key ?? ""}|${M?.key ?? ""}|${K}|${J}`, kind: J, source: (k ?? M).source, ...k ? { leftNode: k } : {}, ...M ? { rightNode: M } : {}, path: K, label: G, ...k ? { left: z } : {}, ...M ? { right: U } : {} });
  }
  function P(k, M, K, G, z, U, J, ae = 0) {
    if (!Gt(z, U))
      if (ws(z) !== void 0 || ws(U) !== void 0) C(k, M, K, G, z, U, J);
      else if (J !== "connection" && ae < 64 && Array.isArray(z) && Array.isArray(U))
        for (let re = 0; re < Math.max(z.length, U.length); re++) P(k, M, `${K}[${re}]`, `${G}[${re}]`, z[re], U[re], J, ae + 1);
      else if (J !== "connection" && ae < 64 && be(z) && be(U))
        for (const re of /* @__PURE__ */ new Set([...Object.keys(z), ...Object.keys(U)])) P(k, M, `${K}.${re}`, `${G}.${re}`, z[re], U[re], J, ae + 1);
      else C(k, M, K, G, z, U, J);
  }
  for (const k of u) {
    const M = h.get(k.leftKey), K = p.get(k.rightKey);
    M.type !== K.type && C(M, K, "class_type", "ノード型", M.type, K.type, "changed");
    const G = new Map(M.fields.map((U) => [U.key, U])), z = new Map(K.fields.map((U) => [U.key, U]));
    for (const U of /* @__PURE__ */ new Set([...G.keys(), ...z.keys()])) {
      const J = G.get(U), ae = z.get(U);
      if (J?.promptText && ae?.promptText) {
        o++;
        continue;
      }
      if (!J || !ae) {
        l = !0, s.push(`${M.source}: ${M.id} ↔ ${K.id} / ${U}: 片方に保存値がありません。設定の削除とは断定できません。`);
        continue;
      }
      P(M, K, U, J.label, J.value, ae.value, J.kind === "reference" || ae.kind === "reference" ? "connection" : "changed");
    }
  }
  const R = [], O = [];
  for (const [k, M, K, G, z] of [
    ["left", e.nodes, t.nodes, g, R],
    ["right", t.nodes, e.nodes, F, O]
  ])
    for (const U of M) {
      if (G.has(U.key)) continue;
      const J = K.filter((re) => re.source === U.source && re.type === U.type), ae = e.status === "ok" && t.status === "ok" && e.sources[U.source] === "ok" && t.sources[U.source] === "ok";
      J.length === 0 && ae && !f.has(U.key) ? C(k === "left" ? U : void 0, k === "right" ? U : void 0, "", k === "left" ? "右で削除（左にのみ保存）" : "右で追加（右にのみ保存）", k === "left" ? U.fields : void 0, k === "right" ? U.fields : void 0, k === "left" ? "removed" : "added") : (l = !0, z.push({ node: U, candidateKeys: J.map((re) => re.key) }));
    }
  return (R.length || O.length) && s.push("対応未確定のノードがあります。候補を確認し、必要に応じて手動で対応付けてください。"), { status: l ? "incomplete" : i.length ? "different" : "same", differences: i, matches: u, unmatchedLeft: R, unmatchedRight: O, warnings: [...new Set(s)], excludedPromptFields: o };
}
function wi(e, t) {
  if (e.status !== "ok" || t.status !== "ok") return null;
  const n = e.sources.prompt === "ok" && t.sources.prompt === "ok" ? "prompt" : "workflow";
  if (e.sources[n] !== "ok" || t.sources[n] !== "ok") return null;
  for (const o of [e, t]) {
    const a = o.nodes.filter((u) => u.source === n);
    if (a.some((u) => !rn(u.type) && u.fields.some((f) => /^(?:widgets_values\.)?(?:text|prompt|positive|negative)$/.test(f.key) && typeof f.value == "string"))) return null;
    for (const u of a) {
      const f = o.nodes.find((h) => h.source !== n && h.id === u.id && h.type === u.type);
      if (f)
        for (const h of u.fields.filter((p) => p.promptText)) {
          const p = h.key.replace(/^widgets_values\./, ""), g = f.fields.find((F) => F.key.replace(/^widgets_values\./, "") === p && F.promptText);
          if (g && !Gt(h.value, g.value)) return null;
        }
    }
  }
  const s = e.nodes.filter((o) => o.source === n && rn(o.type)), i = t.nodes.filter((o) => o.source === n && rn(o.type));
  if (!s.length || s.length !== i.length) return null;
  const { matches: r } = Er(s, i, {}, []);
  if (r.length !== s.length) return null;
  for (const o of r) {
    const a = s.find((f) => f.key === o.leftKey), u = i.find((f) => f.key === o.rightKey);
    if (a.type !== u.type) return null;
    for (const f of rn(a.type)) {
      const h = a.fields.find((g) => g.key === f || g.key === `widgets_values.${f}`), p = u.fields.find((g) => g.key === f || g.key === `widgets_values.${f}`);
      if (!h?.promptText || !p?.promptText) return null;
      if (h.value !== p.value) return !1;
    }
  }
  const l = (o) => o.nodes.filter((a) => a.source === n).flatMap((a) => a.fields.filter((u) => /^(?:inputs\.)?(?:positive|negative)$/.test(u.key) && u.kind === "reference").map((u) => ({ node: a.key, input: u.key, reference: u.value })));
  return Gt(l(e), l(t)) ? !0 : null;
}
function ot(e) {
  if (e === void 0) return "保存情報なし";
  if (typeof e == "string") return e;
  function t(n, s) {
    if (s > 128) throw new Error("Metadata nesting limit");
    const i = ws(n);
    if (i !== void 0) return i;
    const r = "  ".repeat(s + 1), l = "  ".repeat(s);
    if (Array.isArray(n)) return n.length ? `[
${n.map((o) => r + t(o, s + 1)).join(`,
`)}
${l}]` : "[]";
    if (be(n)) {
      const o = Object.entries(n).filter(([, a]) => a !== void 0);
      return o.length ? `{
${o.map(([a, u]) => `${r}${JSON.stringify(a)}: ${t(u, s + 1)}`).join(`,
`)}
${l}}` : "{}";
    }
    return typeof n == "number" && !Number.isFinite(n) ? String(n) : JSON.stringify(n) ?? "null";
  }
  try {
    return t(e, 0);
  } catch {
    return "表示できない値";
  }
}
class ra {
  constructor(t = 128, n = 32 * 1024 * 1024) {
    this.maxEntries = t, this.maxBytes = n;
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
    const n = this.blobs.get(t);
    return n && (this.blobs.delete(t), this.blobs.set(t, n)), n;
  }
  set(t, n, s = this.generation) {
    if (s === this.generation && (this.delete(t), !(n.size > this.maxBytes)))
      for (this.blobs.set(t, n), this.bytes += n.size; this.blobs.size > this.maxEntries || this.bytes > this.maxBytes; ) {
        const i = this.blobs.keys().next().value;
        if (i === void 0) break;
        this.delete(i);
      }
  }
  delete(t) {
    const n = this.blobs.get(t);
    n && (this.bytes -= n.size, this.blobs.delete(t));
  }
  clear() {
    this.generation++, this.blobs.clear(), this.bytes = 0;
  }
}
const nt = new ra(), In = { high: 2, normal: 1, low: 0 };
class la {
  constructor(t = 4) {
    this.limit = t;
  }
  limit;
  active = 0;
  jobs = [];
  add(t, n = "normal") {
    let s;
    const i = new Promise((l) => s = l), r = { run: t, resolve: s, cancelled: !1, started: !1, priority: n };
    return this.jobs.push(r), this.drain(), {
      done: i,
      promote: (l) => {
        In[l] > In[r.priority] && (r.priority = l, this.drain());
      },
      cancel: () => {
        r.cancelled = !0, r.started || (this.jobs = this.jobs.filter((l) => l !== r), s());
      }
    };
  }
  drain() {
    for (this.jobs.sort((t, n) => In[n.priority] - In[t.priority]); this.active < this.limit && this.jobs.length && !(this.jobs[0].priority === "low" && this.active >= Math.max(1, this.limit - 1)); ) {
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
const oa = new la(4), Vt = /* @__PURE__ */ new Map(), xi = { high: 2, normal: 1, low: 0 };
function Or(e, t = "normal") {
  const n = nt.get(e);
  if (n) return { done: Promise.resolve(n), cancel: () => {
  } };
  let s = Vt.get(e);
  if (s)
    xi[t] > xi[s.priority] && (s.priority = t, s.job?.promote(t));
  else {
    const l = new AbortController(), o = nt.epoch;
    let a;
    s = { abort: l, users: 0, priority: t, done: new Promise((f) => {
      a = f;
    }) };
    const u = s;
    Vt.set(e, u), u.job = oa.add(async () => {
      let f;
      try {
        const h = await fetch(e, {
          signal: l.signal,
          credentials: "same-origin",
          priority: u.priority === "normal" ? "auto" : u.priority
        });
        if (!h.ok) throw new Error("Preview unavailable");
        const p = await h.blob();
        !l.signal.aborted && o === nt.epoch && (f = p, nt.set(e, p, o));
      } catch {
      } finally {
        Vt.get(e) === u && Vt.delete(e), a(f);
      }
    }, t), u.job.done.then(() => a(void 0));
  }
  const i = s;
  i.users++;
  let r = !1;
  return {
    done: i.done,
    cancel: () => {
      r || (r = !0, --i.users === 0 && (i.abort.abort(), i.job?.cancel(), Vt.get(e) === i && Vt.delete(e)));
    }
  };
}
const aa = ["src", "alt"], ca = {
  key: 1,
  class: "sg-thumb-placeholder"
}, js = /* @__PURE__ */ Jt({
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
    const n = e, s = t, i = /* @__PURE__ */ Y(""), r = /* @__PURE__ */ Y(), l = /* @__PURE__ */ Y(!1);
    let o, a = 0;
    function u() {
      o?.(), i.value && URL.revokeObjectURL(i.value), i.value = "";
    }
    qe(
      () => n.url,
      (p) => {
        const g = ++a;
        u(), l.value = !1;
        const F = nt.get(p) ?? (n.cachedFallbackUrl && nt.get(n.cachedFallbackUrl));
        if (F) {
          i.value = URL.createObjectURL(F);
          return;
        }
        const C = Or(p, n.priority);
        o = C.cancel, C.done.then((P) => {
          g === a && (P ? i.value = URL.createObjectURL(P) : l.value = !0);
        });
      },
      { immediate: !0 }
    );
    function f(p) {
      if (p.target !== r.value) return;
      const g = p.target;
      s("ready", { width: g.naturalWidth, height: g.naturalHeight });
    }
    function h(p) {
      p.target === r.value && (i.value && URL.revokeObjectURL(i.value), i.value = "", l.value = !0, nt.delete(n.url), n.cachedFallbackUrl && nt.delete(n.cachedFallbackUrl));
    }
    return Wn(() => {
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
    }, null, 40, aa)) : e.quiet ? ne("", !0) : (L(), j("span", ca, D(l.value ? "Image unavailable" : "Loading preview…"), 1));
  }
}), ua = ["aria-label", "onClick"], fa = { class: "sg-card-tools" }, da = ["title"], ha = ["aria-label", "checked", "onChange"], pa = ["aria-label", "onClick"], ga = /* @__PURE__ */ Jt({
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
  setup(e, { expose: t, emit: n }) {
    const s = e, i = n, r = /* @__PURE__ */ Y(), l = /* @__PURE__ */ Y(1e3), o = /* @__PURE__ */ Y(600), a = /* @__PURE__ */ Y(s.initialScroll), u = de(() => s.large ? 284 : 164), f = de(
      () => Jo(
        s.images.length,
        l.value,
        o.value,
        a.value,
        u.value
      )
    ), h = de(
      () => s.images.slice(f.value.start, f.value.end)
    );
    let p;
    function g() {
      r.value && (l.value = r.value.clientWidth || 1e3, o.value = r.value.clientHeight || 600);
    }
    function F() {
      i("position", {
        scroll: a.value,
        width: l.value,
        cell: u.value
      });
    }
    function C() {
      a.value = r.value?.scrollTop ?? 0, F(), f.value.end >= s.images.length && s.hasMore && i("more");
    }
    return qe(
      () => [s.images, s.large],
      async ([P, R], [O, k]) => {
        const M = $r(
          O,
          P,
          a.value,
          l.value,
          k ? 284 : 164,
          R ? 284 : 164
        );
        await Nt(), r.value && (r.value.scrollTop = M, a.value = M, F());
      },
      { flush: "pre" }
    ), Rs(() => {
      g(), r.value && (r.value.scrollTop = a.value), p = new ResizeObserver(g), r.value && p.observe(r.value);
    }), Wn(() => p?.disconnect()), t({
      top: () => {
        r.value && (r.value.scrollTop = 0, a.value = 0, F());
      }
    }), (P, R) => (L(), j("div", {
      ref_key: "el",
      ref: r,
      class: "sg-grid-scroll",
      "data-testid": "image-grid",
      onScrollPassive: C
    }, [
      S("div", {
        class: "sg-grid-space",
        style: kt({ height: f.value.totalHeight + "px" })
      }, [
        S("div", {
          class: "sg-grid",
          style: kt({
            gridTemplateColumns: `repeat(${f.value.columns}, minmax(0,1fr))`,
            transform: `translateY(${f.value.offset}px)`
          })
        }, [
          (L(!0), j(X, null, Ne(h.value, (O) => (L(), j("article", {
            key: O.id,
            class: tt(["sg-card", { "sg-checked": e.checked.has(O.id) }]),
            style: kt({ height: u.value + "px" })
          }, [
            S("button", {
              class: "sg-thumb-button",
              "data-action": "view",
              "aria-label": "View " + O.name,
              onClick: (k) => i("view", O.id)
            }, [
              Ie(js, {
                url: e.api.imageURL(O, "thumbnail", e.large ? 512 : 256),
                alt: O.name
              }, null, 8, ["url", "alt"])
            ], 8, ua),
            S("div", fa, [
              S("label", {
                title: "Select " + O.name
              }, [
                S("input", {
                  type: "checkbox",
                  "aria-label": "Select " + O.name,
                  checked: e.checked.has(O.id),
                  onChange: (k) => i("check", O.id)
                }, null, 40, ha),
                R[1] || (R[1] = ge(" Compare", -1))
              ], 8, da),
              S("button", {
                class: tt(["sg-pin", { "sg-pinned": e.pinned.has(O.id) }]),
                "aria-label": "Pin " + O.name + " as reference",
                onClick: (k) => i("pin", O.id)
              }, D(e.pinned.has(O.id) ? "Pinned" : "Pin"), 11, pa)
            ])
          ], 6))), 128))
        ], 4)
      ], 4),
      e.hasMore ? (L(), j("button", {
        key: 0,
        class: "sg-load",
        onClick: R[0] || (R[0] = (O) => i("more"))
      }, " Load more images ")) : ne("", !0)
    ], 544));
  }
}), ma = ["data-side", "data-image"], ya = { class: "sg-pane-caption" }, va = ["aria-label", "disabled"], ba = {
  key: 0,
  class: "sg-unavailable",
  role: "status"
}, _a = ["src", "alt"], wa = {
  key: 2,
  class: "sg-surface-status"
}, xa = ["title"], ka = { class: "sg-zoom-status" }, Sa = {
  class: "sg-quality-status",
  role: "status"
}, ki = /* @__PURE__ */ Jt({
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
  setup(e, { expose: t, emit: n }) {
    const s = e, i = n, r = /* @__PURE__ */ Y(), l = /* @__PURE__ */ Y(), o = /* @__PURE__ */ Y(640), a = /* @__PURE__ */ Y(600), u = /* @__PURE__ */ Y({ width: 0, height: 0 }), f = /* @__PURE__ */ Y(!1), h = /* @__PURE__ */ Y(!1), p = /* @__PURE__ */ Y(!1);
    let g, F = null, C = null, P = null, R = null, O = null;
    function k(B, le) {
      return B.scale === le.scale && B.x === le.x && B.y === le.y;
    }
    function M() {
      R !== null && cancelAnimationFrame(R), R = null, O = null, C = null, P = null, F = null;
    }
    function K() {
      R !== null && cancelAnimationFrame(R), R = null, O = null;
      const B = C;
      C = null, B && (P = B, i("transform", B));
    }
    function G(B) {
      C = B, R === null && (R = requestAnimationFrame(K));
    }
    function z() {
      return C ?? P ?? s.transform;
    }
    qe(
      () => s.transform,
      (B) => {
        P && k(B, P) ? P = null : M();
      },
      { deep: !0, flush: "sync" }
    );
    const U = de(
      () => Math.min(
        o.value / (u.value.width || s.image?.width || 1024),
        a.value / (u.value.height || s.image?.height || 1024)
      )
    ), J = de(
      () => (u.value.width || s.image?.width || 1024) * U.value
    ), ae = de(
      () => (u.value.height || s.image?.height || 1024) * U.value
    ), re = de(() => ({
      width: J.value + "px",
      height: ae.value + "px",
      transform: `translate(-50%,-50%) translate(${s.transform.x * J.value * s.transform.scale}px,${s.transform.y * ae.value * s.transform.scale}px) scale(${s.transform.scale})`
    }));
    qe(
      [() => s.image?.id, () => s.image?.revision],
      () => {
        M(), r.value?.removeAttribute("src"), f.value = !1, h.value = !1, p.value = !1, u.value = { width: 0, height: 0 };
      }
    );
    async function _e(B) {
      if (B.target !== r.value) return;
      const le = B.target;
      if (le.decode)
        try {
          await le.decode();
        } catch {
          le === r.value && (h.value = !0);
          return;
        }
      le === r.value && (u.value = { width: le.naturalWidth, height: le.naturalHeight }, f.value = !0);
    }
    function Re(B) {
      f.value || (p.value = !0, !s.image?.width && B.width && B.height && (u.value = B));
    }
    function yt(B) {
      B.target === r.value && (h.value = !0);
    }
    t({ originalScale: de(() => 1 / U.value) });
    function Tt(B) {
      const le = z(), At = le.scale, ke = Math.min(
        32,
        Math.max(0.25, At * Math.exp(-B.deltaY * 15e-4))
      ), ve = O ??= l.value.getBoundingClientRect(), vt = (B.clientX - ve.left - ve.width / 2) / J.value, Je = (B.clientY - ve.top - ve.height / 2) / ae.value;
      G({
        scale: ke,
        x: le.x + vt * (1 / ke - 1 / At),
        y: le.y + Je * (1 / ke - 1 / At)
      });
    }
    function $t(B) {
      B.button !== 0 || F || (F = { x: B.clientX, y: B.clientY, pointerId: B.pointerId }, l.value?.setPointerCapture(B.pointerId));
    }
    function Pe(B) {
      if (!F || F.pointerId !== B.pointerId) return;
      const le = z();
      G({
        ...le,
        x: le.x + (B.clientX - F.x) / (J.value * le.scale),
        y: le.y + (B.clientY - F.y) / (ae.value * le.scale)
      }), F.x = B.clientX, F.y = B.clientY;
    }
    function me(B) {
      !F || F.pointerId !== B.pointerId || (Pe(B), F = null, K());
    }
    function we(B) {
      !F || F.pointerId !== B.pointerId || (F = null, K());
    }
    function Le() {
      M(), i("transform", { scale: 1, x: 0, y: 0 });
    }
    function De() {
      M(), i("original");
    }
    function ye() {
      l.value && (o.value = l.value.clientWidth || 640, a.value = l.value.clientHeight || 600);
    }
    return Rs(() => {
      ye(), g = new ResizeObserver(ye), l.value && g.observe(l.value);
    }), Wn(() => {
      M(), r.value?.removeAttribute("src"), g?.disconnect();
    }), (B, le) => (L(), j("section", {
      class: "sg-image-pane",
      "data-side": e.side,
      "data-image": e.image?.id
    }, [
      S("div", ya, [
        S("strong", null, D(e.side === "left" ? "Reference · pinned" : "Image"), 1),
        S("span", null, D(e.image?.name ?? "No candidate"), 1),
        S("button", {
          "aria-label": "Show " + e.side + " original pixels",
          disabled: !f.value,
          onClick: De
        }, " 1:1 ", 8, va)
      ]),
      e.unavailable ? (L(), j("p", ba, " No longer present in this folder. The selected image is kept in place; the displayed image may be cached. ")) : ne("", !0),
      S("div", {
        ref_key: "surface",
        ref: l,
        class: "sg-image-surface",
        onWheel: Tr(Tt, ["prevent"]),
        onPointerdown: $t,
        onPointermove: Pe,
        onPointerup: me,
        onPointercancel: we,
        onLostpointercapture: we,
        onDblclick: Le
      }, [
        e.image && !f.value ? (L(), j("div", {
          key: e.image.id + e.image.revision + "preview",
          class: "sg-image-preview",
          style: kt(re.value)
        }, [
          Ie(js, {
            url: e.api.imageURL(e.image, "thumbnail", 512),
            "cached-fallback-url": e.api.imageURL(e.image, "thumbnail", 256),
            alt: e.image.name + " · preview",
            quiet: "",
            priority: "high",
            onReady: Re
          }, null, 8, ["url", "cached-fallback-url", "alt"])
        ], 4)) : ne("", !0),
        e.image && !h.value ? (L(), j("img", {
          class: "sg-original",
          ref_key: "currentImage",
          ref: r,
          key: e.image.id + e.image.revision,
          src: e.api.imageURL(e.image, "original"),
          alt: e.image.name,
          style: kt({ ...re.value, opacity: f.value ? 1 : 0 }),
          fetchpriority: "high",
          loading: "eager",
          draggable: "false",
          decoding: "async",
          onLoad: _e,
          onError: yt
        }, null, 44, _a)) : ne("", !0),
        e.image ? ne("", !0) : (L(), j("p", wa, D(h.value ? "Image unavailable. It may have been moved or overwritten." : "No comparison candidate. Select more images or change the candidate range."), 1))
      ], 544),
      S("div", {
        class: "sg-models",
        title: e.models.join(", ")
      }, [
        S("span", null, D(e.models.length ? "Model: " + e.models.join(" · ") : e.modelStatus), 1),
        S("span", ka, D(Math.round(e.transform.scale * 100)) + "% of fit", 1),
        S("span", Sa, D(f.value ? "Original" : h.value ? "Original unavailable" : p.value ? "Preview · Loading original…" : "Loading original…"), 1)
      ], 8, xa)
    ], 8, ma));
  }
}), nn = /* @__PURE__ */ Jt({
  __name: "LazyDetails",
  setup(e) {
    const t = /* @__PURE__ */ Y(!1);
    function n(s) {
      t.value = s.currentTarget.open;
    }
    return (s, i) => (L(), j("details", { onToggle: n }, [
      S("summary", null, [
        Js(s.$slots, "summary")
      ]),
      t.value ? Js(s.$slots, "default", {}, void 0, void 0, 0) : ne("", !0)
    ], 32));
  }
}), Ca = {
  class: "sg-metadata",
  "aria-label": "Saved settings"
}, Ia = { class: "sg-panel-heading" }, Ma = { key: 0 }, Ta = {
  key: 2,
  role: "status"
}, $a = { class: "sg-muted" }, Aa = ["aria-label", "value", "onChange"], Ea = { value: "__auto__" }, Oa = ["value"], Ra = ["onClick"], Pa = ["onClick"], La = ["onClick"], Fa = /* @__PURE__ */ Jt({
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
    const n = e, s = t, i = /* @__PURE__ */ Y(""), r = de(
      () => n.compare && n.left && n.right ? ia(n.left, n.right, {
        manualMatches: n.manualMatches
      }) : null
    );
    async function l(f) {
      try {
        await navigator.clipboard.writeText(
          typeof f == "string" ? f : ot(f)
        ), i.value = "Copied";
      } catch {
        i.value = "Clipboard unavailable. Select the displayed text to copy.";
      }
    }
    function o(f) {
      const h = n.manualMatches[f], p = h === void 0 ? r.value?.matches.find((g) => g.leftKey === f)?.rightKey : h;
      return n.right?.nodes.find((g) => g.key === p);
    }
    function a(f) {
      return `{
  "prompt": ` + (f.rawText.prompt ?? ot(f.raw.prompt)) + `,
  "workflow": ` + (f.rawText.workflow ?? ot(f.raw.workflow)) + `
}`;
    }
    function u(f, h) {
      const p = f.target.value;
      s(
        "match",
        h,
        p === "__auto__" ? void 0 : p === "__none__" ? null : p
      );
    }
    return (f, h) => (L(), j("aside", Ca, [
      S("div", Ia, [
        S("h2", null, D(e.compare ? "Saved setting differences" : "Saved settings"), 1),
        S("button", {
          "aria-label": "Close settings",
          onClick: h[0] || (h[0] = (p) => s("close"))
        }, "×")
      ]),
      h[14] || (h[14] = S("p", { class: "sg-muted" }, " Saved values only. Prompt text is excluded from identified differences. Unknown widget values keep their saved positions. ", -1)),
      e.loading ? (L(), j("p", Ma, "Loading saved metadata…")) : ne("", !0),
      e.left?.status === "invalid" || e.right?.status === "invalid" ? (L(), j("button", {
        key: 1,
        onClick: h[1] || (h[1] = (p) => s("retry"))
      }, " Reload saved settings ")) : ne("", !0),
      i.value ? (L(), j("p", Ta, D(i.value), 1)) : ne("", !0),
      r.value ? (L(), j(X, { key: 3 }, [
        S("p", {
          class: tt(["sg-result", { "sg-warning": r.value.status === "incomplete" }])
        }, D(r.value.status === "same" ? "No differences in comparable saved settings." : r.value.status === "different" ? r.value.differences.length + " saved differences" : "Incomplete comparison. Missing or ambiguous settings are not equal."), 3),
        S("p", $a, D(r.value.excludedPromptFields) + " identified prompt fields excluded. ", 1),
        (L(!0), j(X, null, Ne(r.value.warnings, (p, g) => (L(), j("p", {
          key: g,
          class: "sg-warning"
        }, D(p), 1))), 128)),
        S("button", {
          onClick: h[2] || (h[2] = (p) => l(r.value.differences))
        }, " Copy differences (left → right) "),
        Ie(nn, { class: "sg-node-mapping" }, {
          summary: Ve(() => [...h[5] || (h[5] = [
            ge("Review / change node matching", -1)
          ])]),
          default: Ve(() => [
            h[9] || (h[9] = S("p", { class: "sg-muted" }, " One-to-one within the same saved source. Auto matches are candidates, not proof of workflow identity. ", -1)),
            (L(!0), j(X, null, Ne(e.left?.nodes, (p) => (L(), j("label", {
              key: p.key,
              class: "sg-match-row"
            }, [
              S("span", null, D(p.source) + " · " + D(p.id) + " · " + D(p.title || p.type), 1),
              S("select", {
                "aria-label": "Match " + p.key,
                value: e.manualMatches[p.key] === null ? "__none__" : e.manualMatches[p.key] ?? "__auto__",
                onChange: (g) => u(g, p.key)
              }, [
                S("option", Ea, " Auto: " + D(r.value.matches.find((g) => g.leftKey === p.key)?.rightKey ?? "unmatched"), 1),
                h[6] || (h[6] = S("option", { value: "__none__" }, "Leave unmatched", -1)),
                (L(!0), j(X, null, Ne(e.right?.nodes.filter(
                  (g) => g.source === p.source
                ), (g) => (L(), j("option", {
                  key: g.key,
                  value: g.key
                }, D(g.id) + " · " + D(g.title || g.type), 9, Oa))), 128))
              ], 40, Aa),
              Ie(nn, null, {
                summary: Ve(() => [...h[7] || (h[7] = [
                  ge("Left saved values", -1)
                ])]),
                default: Ve(() => [
                  S("pre", null, D($e(ot)(
                    p.fields.map((g) => ({ name: g.label, value: g.value }))
                  )), 1)
                ]),
                _: 2
              }, 1024),
              o(p.key) ? (L(), pt(nn, { key: 0 }, {
                summary: Ve(() => [...h[8] || (h[8] = [
                  ge("Right candidate saved values", -1)
                ])]),
                default: Ve(() => [
                  S("pre", null, D($e(ot)(
                    o(p.key)?.fields.map((g) => ({
                      name: g.label,
                      value: g.value
                    }))
                  )), 1)
                ]),
                _: 2
              }, 1024)) : ne("", !0)
            ]))), 128)),
            (L(!0), j(X, null, Ne(r.value.unmatchedLeft, (p) => (L(), j("p", {
              key: p.node.key,
              class: "sg-warning"
            }, " Unmatched left " + D(p.node.key) + " · candidates: " + D(p.candidateKeys.join(", ") || "none"), 1))), 128)),
            (L(!0), j(X, null, Ne(r.value.unmatchedRight, (p) => (L(), j("p", {
              key: p.node.key,
              class: "sg-warning"
            }, " Unmatched right " + D(p.node.key), 1))), 128))
          ]),
          _: 1
        }),
        (L(!0), j(X, null, Ne(r.value.differences, (p) => (L(), j("article", {
          key: p.id,
          class: "sg-difference"
        }, [
          S("strong", null, D(p.leftNode?.title || p.rightNode?.title || p.leftNode?.type || p.rightNode?.type), 1),
          S("small", null, D(p.source) + " · " + D(p.leftNode?.id ?? "—") + " → " + D(p.rightNode?.id ?? "—") + " · " + D(p.kind), 1),
          S("h3", null, D(p.label), 1),
          S("label", null, [
            h[10] || (h[10] = ge("Left reference ", -1)),
            S("button", {
              onClick: (g) => l(p.left)
            }, "Copy left", 8, Ra)
          ]),
          S("pre", null, D($e(ot)(p.left)), 1),
          S("label", null, [
            h[11] || (h[11] = ge("Right image ", -1)),
            S("button", {
              onClick: (g) => l(p.right)
            }, "Copy right", 8, Pa)
          ]),
          S("pre", null, D($e(ot)(p.right)), 1)
        ]))), 128))
      ], 64)) : e.right ? (L(), j(X, { key: 4 }, [
        S("p", null, "Status: " + D(e.right.status), 1),
        (L(!0), j(X, null, Ne(e.right.warnings, (p) => (L(), j("p", {
          key: p,
          class: "sg-warning"
        }, D(p), 1))), 128)),
        (L(!0), j(X, null, Ne(e.right.nodes, (p) => (L(), pt(nn, {
          key: p.key
        }, {
          summary: Ve(() => [
            ge(D(p.source) + " · " + D(p.id) + " · " + D(p.title || p.type), 1)
          ]),
          default: Ve(() => [
            (L(!0), j(X, null, Ne(p.fields, (g) => (L(), j("div", {
              key: g.key,
              class: "sg-field"
            }, [
              S("label", null, [
                ge(D(g.label) + " ", 1),
                S("button", {
                  onClick: (F) => l(g.value)
                }, "Copy value", 8, La)
              ]),
              S("pre", null, D($e(ot)(g.value)), 1)
            ]))), 128))
          ]),
          _: 2
        }, 1024))), 128))
      ], 64)) : ne("", !0),
      e.right ? (L(), pt(nn, { key: 5 }, {
        summary: Ve(() => [...h[12] || (h[12] = [
          ge("Original saved JSON (may include prompts)", -1)
        ])]),
        default: Ve(() => [
          h[13] || (h[13] = S("p", { class: "sg-muted" }, " Copied JSON may contain prompt text. Nothing is sent outside this ComfyUI server. ", -1)),
          e.left && e.compare ? (L(), j("button", {
            key: 0,
            onClick: h[3] || (h[3] = (p) => l(a(e.left)))
          }, " Copy original left JSON")) : ne("", !0),
          S("button", {
            onClick: h[4] || (h[4] = (p) => l(a(e.right)))
          }, " Copy original " + D(e.compare ? "right " : "") + "JSON ", 1),
          S("pre", null, D($e(ot)(e.right.raw)), 1)
        ]),
        _: 1
      })) : ne("", !0)
    ]));
  }
});
function Na(e, t, n) {
  return t < 0 || t >= e ? [] : [n, 2 * n, 3 * n, -n].map((s) => t + s).filter((s) => s >= 0 && s < e);
}
class ja {
  requests = /* @__PURE__ */ new Map();
  update(t) {
    const n = new Set(t.slice(0, 4));
    for (const [s, i] of this.requests)
      n.has(s) || (i.cancel(), this.requests.delete(s));
    for (const s of n)
      this.requests.has(s) || this.requests.set(s, Or(s, "low"));
  }
  clear() {
    for (const t of this.requests.values()) t.cancel();
    this.requests.clear();
  }
}
const Da = { class: "sg-header" }, Ua = { class: "sg-folder" }, Ha = ["value", "disabled"], Ka = ["value"], Va = {
  key: 0,
  class: "sg-error",
  role: "alert"
}, Ba = { class: "sg-toolbar" }, qa = { class: "sg-size" }, Wa = ["aria-pressed"], za = ["aria-pressed"], Ga = ["disabled"], Ja = {
  key: 1,
  class: "sg-empty"
}, Ya = { class: "sg-grid-footer" }, Xa = { class: "sg-toolbar sg-view-toolbar" }, Qa = { class: "sg-reference-select" }, Za = ["value"], ec = ["value"], tc = {
  key: 0,
  value: "prompt"
}, nc = ["disabled"], sc = { class: "sg-position" }, ic = ["disabled"], rc = { key: 2 }, lc = ["checked"], oc = ["aria-expanded"], ac = ["aria-pressed"], cc = ["aria-label"], uc = {
  key: 0,
  class: "sg-candidate-bar"
}, fc = ["aria-label", "aria-pressed", "onClick"], dc = ["disabled"], hc = {
  key: 1,
  class: "sg-helper",
  role: "status"
}, pc = { class: "sg-view-footer" }, gc = { key: 0 }, mc = /* @__PURE__ */ Jt({
  __name: "Gallery",
  props: {
    api: {}
  },
  setup(e) {
    const t = e, n = /* @__PURE__ */ An(Wo()), s = /* @__PURE__ */ Y([]), i = /* @__PURE__ */ Y(!0), r = /* @__PURE__ */ Y(!1), l = new ja();
    let o = -1, a = "grid", u = 1;
    const f = /* @__PURE__ */ Y(), h = /* @__PURE__ */ Y(), p = /* @__PURE__ */ Y(), g = /* @__PURE__ */ Y(), F = /* @__PURE__ */ Y(), C = /* @__PURE__ */ Y(), P = /* @__PURE__ */ Y({ scroll: 0, width: 1e3, cell: 284 }), R = /* @__PURE__ */ Y(), O = /* @__PURE__ */ Y(0), k = new Xo(t.api, n, () => O.value++), M = /* @__PURE__ */ Y(""), K = /* @__PURE__ */ Y(""), G = /* @__PURE__ */ Y(!1), z = /* @__PURE__ */ Y(!1), U = /* @__PURE__ */ An(/* @__PURE__ */ new Map()), J = /* @__PURE__ */ new Map();
    let ae, re = new AbortController(), _e = 0, Re = 0, yt;
    const Tt = de(() => (O.value, k.loading)), $t = de(() => (O.value, k.error)), Pe = de(() => (O.value, k.cursor !== null)), me = de(() => n.leftId ? n.records.get(n.leftId) : void 0), we = de(() => {
      const w = n.mode === "single" ? n.currentId : n.rightId;
      return w ? n.records.get(w) : void 0;
    }), Le = (w) => w.id + ":" + w.revision, De = de(
      () => me.value ? U.get(Le(me.value)) : void 0
    ), ye = de(
      () => we.value ? U.get(Le(we.value)) : void 0
    ), B = de(
      () => De.value ? _i(De.value) : []
    ), le = de(
      () => ye.value ? _i(ye.value) : []
    ), At = de(() => {
      const w = /* @__PURE__ */ new Set([...n.pinned, ...n.checked]);
      return n.leftId && w.add(n.leftId), [...w].map((y) => n.records.get(y)).filter((y) => !!y);
    }), ke = de(
      () => n.mode === "single" ? n.images : $n(n)
    ), ve = de(
      () => ke.value.findIndex(
        (w) => w.id === (n.mode === "single" ? n.currentId : n.rightId)
      )
    ), vt = de(() => {
      const w = Math.max(0, ve.value);
      return ke.value.slice(Math.max(0, w - 7), w + 8);
    });
    qe(
      () => [n.mode, ve.value, vt.value.map(Le).join(",")],
      () => {
        const w = ve.value;
        n.mode === a && o >= 0 && w !== o ? u = w < o ? -1 : 1 : n.mode !== a && (u = 1), o = w, a = n.mode, l.update(n.mode === "grid" ? [] : Na(ke.value.length, w, u).map((y) => t.api.imageURL(ke.value[y], "thumbnail", 512)));
      },
      { flush: "post" }
    ), qe(
      () => n.images,
      (w, y) => {
        n.mode !== "grid" && (P.value.scroll = $r(
          y,
          w,
          P.value.scroll,
          P.value.width,
          P.value.cell,
          P.value.cell
        ));
      }
    ), qe(
      () => [
        n.mode,
        n.rightId,
        n.currentId,
        r.value,
        vt.value.map((w) => w.id).join(",")
      ],
      async () => {
        await Nt();
        const w = R.value, y = w?.querySelector("[aria-pressed=true]");
        w && y && (w.scrollLeft = Yo(
          w.clientWidth,
          w.scrollLeft,
          y.offsetLeft,
          y.offsetWidth
        ));
      }
    ), qe(
      () => n.mode,
      async (w) => {
        const y = _e;
        await Nt();
        const I = f.value;
        if (!n.open || y !== _e || w !== n.mode || !I || I.contains(document.activeElement)) return;
        ((w === "grid" ? I.querySelector("[data-action=view]") : h.value) ?? I.querySelector("[data-action=close]"))?.focus({ preventScroll: !0 });
      }
    );
    function Je(w) {
      return w ? "No identifiable saved model information" : "Loading saved model information…";
    }
    async function Yt(w, y = "view") {
      if (!w) return;
      const I = Le(w);
      if (U.has(I)) return U.get(I);
      const te = J.get(I);
      if (te)
        return te.owners.add(y), te.promise;
      const bt = _e, _t = new AbortController(), Et = _t.signal, Ot = t.api.metadata(w, Et).then(bi).catch(
        (rt) => Et.aborted ? void 0 : bi({
          status: "invalid",
          prompt: null,
          workflow: null,
          warnings: [rt instanceof Error ? rt.message : "Metadata unavailable"]
        })
      ).then((rt) => {
        if (rt && bt === _e && !Et.aborted && (U.set(I, rt), U.size > 200)) {
          const Xt = /* @__PURE__ */ new Set([
            me.value && Le(me.value),
            we.value && Le(we.value),
            I
          ]);
          for (const Qt of U.keys())
            if (!Xt.has(Qt)) {
              U.delete(Qt);
              break;
            }
        }
        return bt === _e && !Et.aborted ? rt : void 0;
      }).finally(() => {
        J.get(I)?.promise === Ot && J.delete(I);
      });
      return J.set(I, { promise: Ot, abort: _t, owners: /* @__PURE__ */ new Set([y]) }), Ot;
    }
    function c(w, y = /* @__PURE__ */ new Set()) {
      for (const [I, te] of J)
        y.has(I) || (te.owners.delete(w), te.owners.size || (te.abort.abort(), J.delete(I)));
    }
    function d() {
      clearTimeout(ae), c("view"), c("search");
    }
    function m() {
      return (n.mode === "grid" ? [] : n.mode === "compare" ? [me.value, we.value] : [we.value]).filter((w) => !!w);
    }
    function x() {
      clearTimeout(ae);
      for (const w of m()) Yt(w);
    }
    qe(
      () => [n.mode, me.value?.id, me.value?.revision, we.value?.id, we.value?.revision],
      () => {
        clearTimeout(ae);
        const w = m();
        c("view", new Set(w.map(Le))), w.length && (ae = setTimeout(x, 120)), n.manualMatches = {};
      },
      { flush: "post" }
    ), qe(() => n.panel, (w) => {
      w && x();
    });
    async function v() {
      if (n.open) return;
      _e++, re = new AbortController(), n.open = !0, P.value.scroll = 0, M.value = "", K.value = "", await Nt(), f.value?.showModal(), z.value = !0;
      const w = _e;
      try {
        const y = await t.api.folders(re.signal);
        if (w !== _e) return;
        s.value = y.folders;
        const I = y.folders.find((te) => te.id === n.folderId) ?? y.folders[0];
        I ? await k.selectFolder(I.id) : M.value = "No output folders are available.";
      } catch (y) {
        w === _e && (M.value = y instanceof Error ? y.message : "Folders unavailable");
      } finally {
        w === _e && (z.value = !1);
      }
      w === _e && (yt = setInterval(() => {
        document.hidden || T();
      }, 5e3));
    }
    function _() {
      l.clear(), _e++, Re++, G.value = !1, re.abort(), d(), k.dispose(), clearInterval(yt), J.clear(), U.clear(), nt.clear(), f.value?.close(), zo(n), K.value = "", Nt(() => F.value?.focus());
    }
    async function A(w) {
      d(), l.clear(), P.value.scroll = 0, Re++, G.value = !1, K.value = "", await k.selectFolder(w.target.value);
    }
    async function T() {
      n.open && await k.refresh();
    }
    function $(w) {
      r.value = !1, n.currentId = w, n.mode = "single", n.panel = !1, tn(n, "right", { scale: 1, x: 0, y: 0 });
    }
    function b(w) {
      n.checked.has(w) ? n.checked.delete(w) : n.checked.add(w);
    }
    function N() {
      c("search"), Re++, G.value = !1, K.value = "";
    }
    qe(() => [me.value?.id, me.value?.revision], N, {
      flush: "sync"
    });
    function E(w) {
      N(), n.pinned.add(w), n.leftId = w, n.mode = "compare", n.scope = n.checked.size > 1 ? "checked" : "folder", n.rightId = w, n.manualMatches = {}, n.panel = !1, K.value = "", n.transforms = {
        left: { scale: 1, x: 0, y: 0 },
        right: { scale: 1, x: 0, y: 0 }
      };
    }
    function H() {
      const w = n.images.find((y) => n.checked.has(y.id))?.id ?? n.currentId ?? n.images[0]?.id;
      w && E(w);
    }
    function V() {
      G.value && N(), $n(n).some((w) => w.id === n.rightId) || (n.rightId = $n(n)[0]?.id ?? null);
    }
    function W(w) {
      const y = {
        left: { scale: p.value?.originalScale ?? 1, x: 0, y: 0 },
        right: { scale: g.value?.originalScale ?? 1, x: 0, y: 0 }
      };
      n.linked ? n.transforms = y : n.transforms[w] = y[w];
    }
    function ee() {
      tn(n, "left", { scale: 1, x: 0, y: 0 }), tn(n, "right", { scale: 1, x: 0, y: 0 });
    }
    function Q() {
      for (const w of [me.value, we.value])
        w && (U.delete(Le(w)), Yt(w));
    }
    function fe(w, y) {
      if (y === void 0) delete n.manualMatches[w];
      else {
        if (y !== null)
          for (const [I, te] of Object.entries(n.manualMatches))
            I !== w && te === y && (n.manualMatches[I] = null);
        n.manualMatches[w] = y;
      }
    }
    async function pe() {
      const w = me.value;
      if (!w || G.value) return;
      const y = ++Re;
      G.value = !0, K.value = "Checking saved text in " + n.images.length + " loaded images…";
      const I = await Yt(w, "search");
      if (y !== Re) return;
      if (!I || wi(I, I) === null) {
        K.value = "Saved prompt text cannot be identified. Normal comparison remains available.", G.value = !1;
        return;
      }
      const te = n.images.slice();
      let bt = 0, _t = 0, Et = 0;
      const Ot = /* @__PURE__ */ new Set();
      async function rt() {
        for (; bt < te.length && y === Re; ) {
          const Xt = te[bt++];
          if (Xt.id === w.id) continue;
          const Qt = await Yt(Xt, "search");
          if (y !== Re) return;
          const Ds = Qt ? wi(I, Qt) : null;
          Ds === !0 && Ot.add(Xt.id), Ds === null && _t++, Et++, K.value = `Checking saved text… ${Et}/${te.length - 1}`;
        }
      }
      await Promise.all([rt(), rt()]), y === Re && (G.value = !1, n.promptIds = Ot, n.scope = "prompt", V(), K.value = `${Ot.size} exact saved-text matches; ${_t} unknown. Checked ${te.length} loaded images${Pe.value ? " only. Load more in the grid to search further" : ""}. Saved text does not prove the final generated prompt.`, G.value = !1);
    }
    function Fe(w) {
      if (!n.open) return;
      w.stopPropagation();
      const y = w.target;
      if (w.key === "Escape") {
        w.preventDefault(), n.panel ? n.panel = !1 : n.mode !== "grid" ? n.mode = "grid" : _();
        return;
      }
      ["INPUT", "SELECT", "TEXTAREA"].includes(y.tagName) || n.mode !== "grid" && (w.key === "ArrowLeft" || w.key === "ArrowRight") && (w.preventDefault(), us(n, w.key === "ArrowLeft" ? -1 : 1));
    }
    const Me = () => {
      T();
    };
    return Rs(() => {
      t.api.comfy.addEventListener?.("executed", Me), document.addEventListener("visibilitychange", Me);
    }), Wn(() => {
      _e++, Re++, l.clear(), nt.clear(), clearInterval(yt), re.abort(), d(), k.dispose(), t.api.comfy.removeEventListener?.("executed", Me), document.removeEventListener("visibilitychange", Me);
    }), (w, y) => (L(), j(X, null, [
      S("button", {
        ref_key: "launcher",
        ref: F,
        "data-action": "open",
        "data-testid": "gallery-launcher",
        class: "sg-launcher",
        "aria-label": "Open Gallery",
        onClick: v
      }, [...y[22] || (y[22] = [
        S("span", { "aria-hidden": "true" }, "▧", -1),
        ge(" Gallery ", -1)
      ])], 512),
      n.open ? (L(), j("dialog", {
        key: 0,
        ref_key: "dialog",
        ref: f,
        class: tt(["sg-dialog", { "sg-single-view": n.mode === "single" }]),
        "aria-label": "Shiba Gallery",
        onKeydown: Fe,
        onCancel: y[21] || (y[21] = Tr(() => {
        }, ["prevent"]))
      }, [
        S("header", Da, [
          y[25] || (y[25] = S("div", { class: "sg-brand" }, [
            S("span", { class: "sg-mark" }, "▧"),
            S("div", null, [
              S("strong", null, "Gallery"),
              S("small", null, "SHIBA · READ ONLY")
            ])
          ], -1)),
          n.mode !== "grid" ? (L(), j("button", {
            key: 0,
            "data-action": "grid",
            onClick: y[0] || (y[0] = (I) => n.mode = "grid")
          }, " ← Grid")) : ne("", !0),
          S("label", Ua, [
            y[23] || (y[23] = ge("Folder ", -1)),
            S("select", {
              "data-testid": "folder-select",
              "aria-label": "Output folder",
              value: n.folderId,
              disabled: z.value,
              onChange: A
            }, [
              (L(!0), j(X, null, Ne(s.value, (I) => (L(), j("option", {
                key: I.id,
                value: I.id
              }, D(I.name), 9, Ka))), 128))
            ], 40, Ha)
          ]),
          y[26] || (y[26] = S("span", { class: "sg-header-spacer" }, null, -1)),
          S("span", {
            class: tt(["sg-live", { "sg-working": Tt.value }])
          }, [
            y[24] || (y[24] = S("i", null, null, -1)),
            ge(D(Tt.value ? "Syncing" : "Auto refresh"), 1)
          ], 2),
          S("button", {
            "data-action": "close",
            class: "sg-close",
            "aria-label": "Close Gallery",
            onClick: _
          }, " Close × ")
        ]),
        M.value || $t.value ? (L(), j("div", Va, [
          ge(D(M.value || $t.value) + " ", 1),
          S("button", { onClick: T }, "Retry")
        ])) : ne("", !0),
        n.mode === "grid" ? (L(), j(X, { key: 1 }, [
          S("div", Ba, [
            S("span", null, [
              ge(D(n.images.length) + D(Pe.value ? "+" : "") + " images ", 1),
              y[27] || (y[27] = S("small", null, "· newest file modification first", -1))
            ]),
            S("div", qa, [
              S("button", {
                "aria-pressed": !i.value,
                onClick: y[1] || (y[1] = (I) => i.value = !1)
              }, "Small", 8, Wa),
              S("button", {
                "aria-pressed": i.value,
                onClick: y[2] || (y[2] = (I) => i.value = !0)
              }, "Large", 8, za)
            ]),
            y[28] || (y[28] = S("span", { class: "sg-header-spacer" }, null, -1)),
            S("span", null, D(n.checked.size) + " selected", 1),
            S("button", {
              class: "sg-primary",
              disabled: n.images.length < 2,
              "data-action": "compare",
              onClick: H
            }, " Compare selected ", 8, Ga)
          ]),
          n.images.length ? (L(), pt(ga, {
            key: 0,
            ref_key: "grid",
            ref: C,
            images: n.images,
            checked: n.checked,
            pinned: n.pinned,
            large: i.value,
            api: e.api,
            "has-more": Pe.value,
            "initial-scroll": P.value.scroll,
            onPosition: y[3] || (y[3] = (I) => P.value = I),
            onView: $,
            onPin: E,
            onCheck: b,
            onMore: y[4] || (y[4] = (I) => $e(k).loadMore())
          }, null, 8, ["images", "checked", "pinned", "large", "api", "has-more", "initial-scroll"])) : (L(), j("div", Ja, [
            y[29] || (y[29] = S("span", { class: "sg-empty-icon" }, "▧", -1)),
            S("h2", null, D(Tt.value || z.value ? "Opening your output…" : "No images in this folder"), 1),
            y[30] || (y[30] = S("p", null, " Images stay in their original folder. Gallery never deletes or changes them. ", -1))
          ])),
          S("footer", Ya, [
            y[31] || (y[31] = S("span", null, "Click an image to inspect · check images to compare · Pin keeps the left image fixed", -1)),
            S("button", {
              onClick: y[5] || (y[5] = (I) => C.value?.top())
            }, "↑ Newest")
          ])
        ], 64)) : (L(), j(X, { key: 2 }, [
          S("div", Xa, [
            n.mode === "compare" ? (L(), j(X, { key: 0 }, [
              S("label", Qa, [
                y[32] || (y[32] = ge("Reference ", -1)),
                S("select", {
                  "aria-label": "Reference image",
                  value: n.leftId,
                  onChange: y[6] || (y[6] = (I) => E(I.target.value))
                }, [
                  (L(!0), j(X, null, Ne(At.value, (I) => (L(), j("option", {
                    key: I.id,
                    value: I.id
                  }, D(I.name) + D(n.pinned.has(I.id) ? " · pinned" : " · checked"), 9, ec))), 128))
                ], 40, Za)
              ]),
              S("label", null, [
                y[35] || (y[35] = ge("Candidates ", -1)),
                kl(S("select", {
                  "onUpdate:modelValue": y[7] || (y[7] = (I) => n.scope = I),
                  "aria-label": "Candidate range",
                  onChange: V
                }, [
                  y[33] || (y[33] = S("option", { value: "folder" }, "This folder", -1)),
                  y[34] || (y[34] = S("option", { value: "checked" }, "Checked images", -1)),
                  n.scope === "prompt" ? (L(), j("option", tc, " Matching saved text ")) : ne("", !0)
                ], 544), [
                  [No, n.scope]
                ])
              ])
            ], 64)) : (L(), j("button", {
              key: 1,
              "data-action": "pin",
              class: "sg-primary",
              onClick: y[8] || (y[8] = (I) => n.currentId && E(n.currentId))
            }, " Pin as reference")),
            S("button", {
              "data-action": "previous",
              "aria-label": "Previous image",
              disabled: ve.value <= 0,
              onClick: y[9] || (y[9] = (I) => $e(us)(n, -1))
            }, " ← Previous", 8, nc),
            S("span", sc, D(ve.value < 0 ? "—" : ve.value + 1) + " / " + D(ke.value.length) + D(Pe.value ? "+" : ""), 1),
            S("button", {
              "data-action": "next",
              "aria-label": "Next image",
              disabled: ve.value < 0 || ve.value >= ke.value.length - 1,
              onClick: y[10] || (y[10] = (I) => $e(us)(n, 1))
            }, " Next →", 8, ic),
            y[37] || (y[37] = S("span", { class: "sg-header-spacer" }, null, -1)),
            n.mode === "compare" ? (L(), j("label", rc, [
              S("input", {
                type: "checkbox",
                "aria-label": "Link zoom and pan",
                checked: n.linked,
                onChange: y[11] || (y[11] = (I) => $e(Go)(n, I.target.checked))
              }, null, 40, lc),
              y[36] || (y[36] = ge(" Link zoom / pan", -1))
            ])) : ne("", !0),
            n.mode === "single" ? (L(), j("button", {
              key: 3,
              "data-action": "candidates",
              "aria-expanded": r.value,
              onClick: y[12] || (y[12] = (I) => r.value = !r.value)
            }, D(r.value ? "Hide candidates" : "Show candidates"), 9, oc)) : ne("", !0),
            n.mode === "single" && !r.value && Pe.value ? (L(), j("button", {
              key: 4,
              onClick: y[13] || (y[13] = (I) => $e(k).loadMore())
            }, "Load more")) : ne("", !0),
            S("button", { onClick: ee }, "Fit"),
            S("button", {
              "aria-pressed": n.panel,
              "data-action": "settings",
              onClick: y[14] || (y[14] = (I) => n.panel = !n.panel)
            }, D(n.mode === "compare" ? "Differences" : "Settings"), 9, ac)
          ]),
          S("div", {
            ref_key: "viewer",
            ref: h,
            class: "sg-view-body",
            role: "region",
            "aria-label": n.mode === "compare" ? "Image comparison" : "Image viewer",
            tabindex: "-1"
          }, [
            S("div", {
              class: tt(["sg-image-pair", { "sg-single": n.mode === "single" }])
            }, [
              n.mode === "compare" ? (L(), pt(ki, {
                key: 0,
                ref_key: "leftPane",
                ref: p,
                image: me.value,
                unavailable: !!n.leftId && n.unavailable.has(n.leftId),
                api: e.api,
                side: "left",
                transform: n.transforms.left,
                models: B.value,
                "model-status": Je(De.value),
                onOriginal: y[15] || (y[15] = (I) => W("left")),
                onTransform: y[16] || (y[16] = (I) => $e(tn)(n, "left", I))
              }, null, 8, ["image", "unavailable", "api", "transform", "models", "model-status"])) : ne("", !0),
              Ie(ki, {
                ref_key: "rightPane",
                ref: g,
                image: we.value,
                unavailable: !!we.value && n.unavailable.has(we.value.id),
                api: e.api,
                side: "right",
                transform: n.transforms.right,
                models: le.value,
                "model-status": Je(ye.value),
                onOriginal: y[17] || (y[17] = (I) => W("right")),
                onTransform: y[18] || (y[18] = (I) => $e(tn)(n, "right", I))
              }, null, 8, ["image", "unavailable", "api", "transform", "models", "model-status"])
            ], 2),
            n.panel ? (L(), pt(Fa, {
              key: 0,
              left: De.value,
              right: ye.value,
              compare: n.mode === "compare",
              "manual-matches": n.manualMatches,
              loading: !ye.value || n.mode === "compare" && !De.value,
              onClose: y[19] || (y[19] = (I) => n.panel = !1),
              onMatch: fe,
              onRetry: Q
            }, null, 8, ["left", "right", "compare", "manual-matches", "loading"])) : ne("", !0)
          ], 8, cc),
          n.mode === "compare" || r.value ? (L(), j("div", uc, [
            S("div", {
              ref_key: "candidateRow",
              ref: R,
              class: "sg-candidates",
              "aria-label": "Image candidates"
            }, [
              (L(!0), j(X, null, Ne(vt.value, (I) => (L(), j("button", {
                key: I.id,
                class: tt(["sg-candidate", {
                  "sg-current": I.id === (n.mode === "single" ? n.currentId : n.rightId)
                }]),
                "aria-label": "Choose " + I.name,
                "aria-pressed": I.id === (n.mode === "single" ? n.currentId : n.rightId),
                onClick: (te) => n.mode === "single" ? n.currentId = I.id : n.rightId = I.id
              }, [
                Ie(js, {
                  url: e.api.imageURL(I, "thumbnail", 256),
                  alt: I.name,
                  priority: "low"
                }, null, 8, ["url", "alt"])
              ], 10, fc))), 128))
            ], 512),
            Pe.value ? (L(), j("button", {
              key: 0,
              onClick: y[20] || (y[20] = (I) => $e(k).loadMore())
            }, "Load more")) : ne("", !0),
            n.mode === "compare" ? (L(), j("button", {
              key: 1,
              disabled: G.value,
              onClick: pe
            }, D(G.value ? "Checking text…" : "Find matching saved text"), 9, dc)) : ne("", !0)
          ])) : ne("", !0),
          K.value ? (L(), j("p", hc, D(K.value), 1)) : ne("", !0),
          S("footer", pc, [
            y[38] || (y[38] = ge(" Wheel to zoom · drag to pan · double-click to fit · ← → to navigate ", -1)),
            n.mode === "compare" ? (L(), j("span", gc, "· Linking copies the left view; different sizes use normalized image positions.")) : ne("", !0)
          ])
        ], 64))
      ], 34)) : ne("", !0)
    ], 64));
  }
});
function Si(e, t) {
  const n = new URL(e), s = n.pathname.lastIndexOf("/extensions/");
  if (s < 0)
    throw new Error("Gallery must load from the ComfyUI extensions directory.");
  return n.pathname = n.pathname.slice(0, s) + "/scripts/" + t + ".js", n.search = "", n.hash = "", n.href;
}
class yc {
  constructor(t) {
    this.comfy = t;
  }
  comfy;
  async get(t, n, s = "auto") {
    const i = await fetch(this.comfy.apiURL("/shiba-gallery" + t), {
      signal: n,
      credentials: "same-origin",
      priority: s
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
  images(t, n = null, s) {
    const i = new URLSearchParams({ folder_id: t, limit: "60" });
    return n && i.set("cursor", n), this.get("/images?" + i, s);
  }
  metadata(t, n) {
    return this.get(
      "/image/" + encodeURIComponent(t.id) + "/metadata?" + new URLSearchParams({ revision: t.revision }),
      n,
      "low"
    );
  }
  imageURL(t, n, s) {
    const i = new URLSearchParams({ revision: t.revision });
    return s && i.set("size", String(s)), this.comfy.apiURL(
      "/shiba-gallery/image/" + encodeURIComponent(t.id) + "/" + n + "?" + i
    );
  }
}
const fs = import.meta.url;
async function vc() {
  const [{ app: e }, { api: t }] = await Promise.all([
    import(
      /* @vite-ignore */
      Si(fs, "app")
    ),
    import(
      /* @vite-ignore */
      Si(fs, "api")
    )
  ]);
  e.registerExtension({
    name: "shiba.gallery",
    setup() {
      if (document.getElementById("shiba-gallery-root")) return;
      const n = document.createElement("link");
      n.rel = "stylesheet", n.href = new URL("./shiba-gallery.css", fs).href, n.dataset.shibaGallery = "true", document.head.append(n);
      const s = document.createElement("div");
      s.id = "shiba-gallery-root", document.body.append(s), Vo(mc, { api: new yc(t) }).mount(s);
    }
  });
}
vc().catch(
  () => console.error(
    "[Shiba Gallery] Could not register the gallery extension. Check ComfyUI extension loading and proxy paths."
  )
);
