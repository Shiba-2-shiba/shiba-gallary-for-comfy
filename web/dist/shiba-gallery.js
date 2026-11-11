// @__NO_SIDE_EFFECTS__
function $s(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const ae = {}, jt = [], Ut = () => {
}, Oi = () => !1, Wn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), zn = (e) => e.startsWith("onUpdate:"), Ee = Object.assign, Ei = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Ur = Object.prototype.hasOwnProperty, se = (e, t) => Ur.call(e, t), q = Array.isArray, Mt = (e) => xn(e) === "[object Map]", Kt = (e) => xn(e) === "[object Set]", zs = (e) => xn(e) === "[object Date]", ie = (e) => typeof e == "function", he = (e) => typeof e == "string", Ze = (e) => typeof e == "symbol", ce = (e) => e !== null && typeof e == "object", Ri = (e) => (ce(e) || ie(e)) && ie(e.then) && ie(e.catch), Pi = Object.prototype.toString, xn = (e) => Pi.call(e), Hr = (e) => xn(e).slice(8, -1), Li = (e) => xn(e) === "[object Object]", As = (e) => he(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, cn = /* @__PURE__ */ $s(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Gn = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((n) => t[n] || (t[n] = e(n)));
}, Kr = /-\w/g, Xe = /* @__PURE__ */ Gn((e) => e.replace(Kr, (t) => t.slice(1).toUpperCase())), Vr = /\B([A-Z])/g, Vt = /* @__PURE__ */ Gn(
  (e) => e.replace(Vr, "-$1").toLowerCase()
), Fi = /* @__PURE__ */ Gn((e) => e.charAt(0).toUpperCase() + e.slice(1)), is = /* @__PURE__ */ Gn((e) => e ? `on${Fi(e)}` : ""), at = (e, t) => !Object.is(e, t), Pn = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, Ni = (e, t, n, s = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: s,
    value: n
  });
}, Os = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let Gs;
const Jn = () => Gs || (Gs = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Tt(e) {
  if (q(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], i = he(s) ? zr(s) : Tt(s);
      if (i)
        for (const r in i)
          t[r] = i[r];
    }
    return t;
  } else if (he(e) || ce(e))
    return e;
}
const Br = /;(?![^(]*\))/g, qr = /:([^]+)/, Wr = /"(?:[^"\\]|\\[^])*"|'(?:[^'\\]|\\[^])*'|\\[^]|\/\*[^]*?\*\//g;
function zr(e) {
  const t = {};
  return e.replace(Wr, (n) => n.startsWith("/*") ? "" : n).split(Br).forEach((n) => {
    if (n) {
      const s = n.split(qr);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function ct(e) {
  let t = "";
  if (he(e))
    t = e;
  else if (q(e))
    for (let n = 0; n < e.length; n++) {
      const s = ct(e[n]);
      s && (t += s + " ");
    }
  else if (ce(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Gr = "itemscope,allowfullscreen,disablepictureinpicture,disableremoteplayback,formnovalidate,ismap,nomodule,novalidate,playsinline,readonly", Jr = /* @__PURE__ */ $s(Gr);
function ji(e) {
  return !!e || e === "";
}
function Yr(e, t, n) {
  if (e.length !== t.length) return !1;
  let s = !0;
  for (let i = 0; s && i < e.length; i++)
    s = At(e[i], t[i], n);
  return s;
}
function Js(e, t, n) {
  if (e.size !== t.size) return !1;
  const s = Array.from(t), i = new Uint8Array(s.length);
  for (const r of e) {
    let l = -1;
    for (let o = 0; o < s.length; o++)
      if (!i[o] && At(r, s[o], n)) {
        l = o;
        break;
      }
    if (l < 0) return !1;
    i[l] = 1;
  }
  return !0;
}
function Xr(e, t, n) {
  let s = Mt(e), i = Mt(t);
  if (s || i || (s = Kt(e), i = Kt(t), s || i))
    return s && i ? Js(e, t, n) : !1;
  const r = Object.keys(e).length, l = Object.keys(t).length;
  if (r !== l)
    return !1;
  for (const o in e) {
    const a = e.hasOwnProperty(o), u = t.hasOwnProperty(o);
    if (a && !u || !a && u || !At(e[o], t[o], n))
      return !1;
  }
  return String(e) === String(t);
}
function Ys(e, t, n, s) {
  n || (n = [/* @__PURE__ */ new Map(), /* @__PURE__ */ new Map()]);
  const [i, r] = n;
  if (i.has(e) || r.has(t))
    return i.get(e) === t && r.get(t) === e;
  i.set(e, t), r.set(t, e);
  const l = s(e, t, n);
  return i.delete(e), r.delete(t), l;
}
function At(e, t, n) {
  if (e === t) return !0;
  let s = zs(e), i = zs(t);
  return s || i ? s && i ? e.getTime() === t.getTime() : !1 : (s = Ze(e), i = Ze(t), s || i ? e === t : (s = q(e), i = q(t), s || i ? s && i ? Ys(e, t, n, Yr) : !1 : (s = ce(e), i = ce(t), s || i ? !s || !i ? !1 : Ys(e, t, n, Xr) : String(e) === String(t))));
}
function Qr(e, t) {
  return e.findIndex((n) => At(n, t));
}
const Di = (e) => !!(e && e.__v_isRef === !0), D = (e) => he(e) ? e : e == null ? "" : q(e) || ce(e) && (e.toString === Pi || !ie(e.toString)) ? Di(e) ? D(e.value) : JSON.stringify(e, Ui, 2) : String(e), Ui = (e, t) => Di(t) ? Ui(e, t.value) : Mt(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [s, i], r) => (n[rs(s, r) + " =>"] = i, n),
    {}
  )
} : Kt(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => rs(n))
} : Ze(t) ? rs(t) : ce(t) && !q(t) && !Li(t) ? String(t) : t, rs = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    Ze(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
let _e;
class Zr {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !t && _e && (_e.active ? (this.parent = _e, this.index = (_e.scopes || (_e.scopes = [])).push(
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
      const n = _e;
      try {
        return _e = this, t();
      } finally {
        _e = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = _e, _e = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (_e === this)
        _e = this.prevScope;
      else {
        let t = _e;
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
function el() {
  return _e;
}
let re;
const ls = /* @__PURE__ */ new WeakSet();
class Hi {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, _e && (_e.active ? _e.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, ls.has(this) && (ls.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Vi(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Xs(this), Bi(this);
    const t = re, n = Qe;
    re = this, Qe = !0;
    try {
      return this.fn();
    } finally {
      qi(this), re = t, Qe = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        Ps(t);
      this.deps = this.depsTail = void 0, Xs(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? ls.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    bs(this) && this.run();
  }
  get dirty() {
    return bs(this);
  }
}
let Ki = 0, un, fn;
function Vi(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = fn, fn = e;
    return;
  }
  e.next = un, un = e;
}
function Es() {
  Ki++;
}
function Rs() {
  if (--Ki > 0)
    return;
  if (fn) {
    let t = fn;
    for (fn = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; un; ) {
    let t = un;
    for (un = void 0; t; ) {
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
function Bi(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function qi(e) {
  let t, n = e.depsTail, s = n;
  for (; s; ) {
    const i = s.prevDep;
    s.version === -1 ? (s === n && (n = i), Ps(s), tl(s)) : t = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = i;
  }
  e.deps = t, e.depsTail = n;
}
function bs(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Wi(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Wi(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === mn) || (e.globalVersion = mn, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !bs(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = re, s = Qe;
  re = e, Qe = !0;
  try {
    Bi(e);
    const i = e.fn(e._value);
    (t.version === 0 || at(i, e._value)) && (e.flags |= 128, e._value = i, t.version++);
  } catch (i) {
    throw t.version++, i;
  } finally {
    re = n, Qe = s, qi(e), e.flags &= -3;
  }
}
function Ps(e, t = !1) {
  const { dep: n, prevSub: s, nextSub: i } = e;
  if (s && (s.nextSub = i, e.prevSub = void 0), i && (i.prevSub = s, e.nextSub = void 0), n.subs === e && (n.subs = s, !s && n.computed)) {
    n.computed.flags &= -5;
    for (let r = n.computed.deps; r; r = r.nextDep)
      Ps(r, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function tl(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let Qe = !0;
const zi = [];
function kt() {
  zi.push(Qe), Qe = !1;
}
function St() {
  const e = zi.pop();
  Qe = e === void 0 ? !0 : e;
}
function Xs(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = re;
    re = void 0;
    try {
      t();
    } finally {
      re = n;
    }
  }
}
let mn = 0;
class nl {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Ls {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!re || !Qe || re === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== re)
      n = this.activeLink = new nl(re, this), re.deps ? (n.prevDep = re.depsTail, re.depsTail.nextDep = n, re.depsTail = n) : re.deps = re.depsTail = n, Gi(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const s = n.nextDep;
      s.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = s), n.prevDep = re.depsTail, n.nextDep = void 0, re.depsTail.nextDep = n, re.depsTail = n, re.deps === n && (re.deps = s);
    }
    return n;
  }
  trigger(t) {
    this.version++, mn++, this.notify(t);
  }
  notify(t) {
    Es();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      Rs();
    }
  }
}
function Gi(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let s = t.deps; s; s = s.nextDep)
        Gi(s);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const ws = /* @__PURE__ */ new WeakMap(), Ht = /* @__PURE__ */ Symbol(
  ""
), _s = /* @__PURE__ */ Symbol(
  ""
), vn = /* @__PURE__ */ Symbol(
  ""
);
function ke(e, t, n) {
  if (Qe && re) {
    let s = ws.get(e);
    s || ws.set(e, s = /* @__PURE__ */ new Map());
    let i = s.get(n);
    i || (s.set(n, i = new Ls()), i.map = s, i.key = n), i.track();
  }
}
function bt(e, t, n, s, i, r) {
  const l = ws.get(e);
  if (!l) {
    mn++;
    return;
  }
  const o = (a) => {
    a && a.trigger();
  };
  if (Es(), t === "clear")
    l.forEach(o);
  else {
    const a = q(e), u = a && As(n);
    if (a && n === "length") {
      const f = Number(s);
      l.forEach((h, p) => {
        (p === "length" || p === vn || !Ze(p) && p >= f) && o(h);
      });
    } else
      switch ((n !== void 0 || l.has(void 0)) && o(l.get(n)), u && o(l.get(vn)), t) {
        case "add":
          a ? u && o(l.get("length")) : (o(l.get(Ht)), Mt(e) && o(l.get(_s)));
          break;
        case "delete":
          a || (o(l.get(Ht)), Mt(e) && o(l.get(_s)));
          break;
        case "set":
          Mt(e) && o(l.get(Ht));
          break;
      }
  }
  Rs();
}
function Bt(e) {
  const t = /* @__PURE__ */ Z(e);
  return t === e || (ke(t, "iterate", vn), /* @__PURE__ */ Ve(e)) ? t : /* @__PURE__ */ ft(e) ? /* @__PURE__ */ $t(e) ? t.map((n) => Ot(Be(n))) : t.map(Ot) : t.map(Be);
}
function Yn(e) {
  return ke(e = /* @__PURE__ */ Z(e), "iterate", vn), e;
}
function rt(e, t) {
  return /* @__PURE__ */ ft(e) ? Ot(/* @__PURE__ */ $t(e) ? Be(t) : t) : Be(t);
}
const sl = {
  __proto__: null,
  [Symbol.iterator]() {
    return os(this, Symbol.iterator, (e) => rt(this, e));
  },
  concat(...e) {
    return Bt(this).concat(
      ...e.map((t) => q(t) ? Bt(t) : t)
    );
  },
  entries() {
    return os(this, "entries", (e) => (e[1] = rt(this, e[1]), e));
  },
  every(e, t) {
    return pt(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return pt(
      this,
      "filter",
      e,
      t,
      (n) => n.map((s) => rt(this, s)),
      arguments
    );
  },
  find(e, t) {
    return pt(
      this,
      "find",
      e,
      t,
      (n) => rt(this, n),
      arguments
    );
  },
  findIndex(e, t) {
    return pt(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return pt(
      this,
      "findLast",
      e,
      t,
      (n) => rt(this, n),
      arguments
    );
  },
  findLastIndex(e, t) {
    return pt(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return pt(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return as(this, "includes", e);
  },
  indexOf(...e) {
    return as(this, "indexOf", e);
  },
  join(e) {
    return Bt(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return as(this, "lastIndexOf", e);
  },
  map(e, t) {
    return pt(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return sn(this, "pop");
  },
  push(...e) {
    return sn(this, "push", e);
  },
  reduce(e, ...t) {
    return Zs(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return Zs(this, "reduceRight", e, t);
  },
  shift() {
    return sn(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return pt(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return sn(this, "splice", e);
  },
  toReversed() {
    return Bt(this).toReversed();
  },
  toSorted(e) {
    return Bt(this).toSorted(e);
  },
  toSpliced(...e) {
    return Bt(this).toSpliced(...e);
  },
  unshift(...e) {
    return sn(this, "unshift", e);
  },
  values() {
    return os(this, "values", (e) => rt(this, e));
  }
};
function os(e, t, n) {
  const s = Yn(e), i = s[t], r = i.call(s);
  if (s !== e && !/* @__PURE__ */ Ve(e)) {
    if (r[Symbol.toStringTag] === "Array Iterator") {
      const l = Object.create(Object.getPrototypeOf(r));
      return l.next = () => Qs(r.next(), n), i !== Ji[t] && Object.defineProperties(l, {
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
    r._next = r.next, r.next = () => Qs(r._next(), n);
  }
  return r;
}
function Qs(e, t) {
  return e.done || (e.value = t(e.value)), e;
}
const Ji = Array.prototype;
function pt(e, t, n, s, i, r) {
  const l = Yn(e), o = l !== e && !/* @__PURE__ */ Ve(e), a = l[t];
  if (a !== Ji[t]) {
    const h = a.apply(e, r);
    return o ? Be(h) : h;
  }
  let u = n;
  l !== e && (o ? u = function(h, p) {
    return n.call(this, rt(e, h), p, e);
  } : n.length > 2 && (u = function(h, p) {
    return n.call(this, h, p, e);
  }));
  const f = a.call(l, u, s);
  return o && i ? i(f) : f;
}
function Zs(e, t, n, s) {
  const i = Yn(e), r = i !== e && !/* @__PURE__ */ Ve(e);
  let l = n, o = !1;
  i !== e && (r ? (o = s.length === 0, l = function(u, f, h) {
    return o && (o = !1, u = rt(e, u)), n.call(this, u, rt(e, f), h, e);
  }) : n.length > 3 && (l = function(u, f, h) {
    return n.call(this, u, f, h, e);
  }));
  const a = i[t](l, ...s);
  return o ? rt(e, a) : a;
}
function as(e, t, n) {
  const s = /* @__PURE__ */ Z(e);
  ke(s, "iterate", vn);
  const i = s[t](...n);
  return (i === -1 || i === !1) && /* @__PURE__ */ js(n[0]) ? (n[0] = /* @__PURE__ */ Z(n[0]), s[t](...n)) : i;
}
function sn(e, t, n = []) {
  kt(), Es();
  const s = (/* @__PURE__ */ Z(e))[t].apply(e, n);
  return Rs(), St(), s;
}
const il = /* @__PURE__ */ $s("__proto__,__v_isRef,__isVue"), Yi = /* @__PURE__ */ new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Ze)
);
function rl(e) {
  Ze(e) || (e = String(e));
  const t = /* @__PURE__ */ Z(this);
  return ke(t, "has", e), t.hasOwnProperty(e);
}
class Xi {
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
      return s === (i ? r ? gl : tr : r ? er : Zi).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(s) ? t : void 0;
    const l = q(t);
    if (!i) {
      let a;
      if (l && (a = sl[n]))
        return a;
      if (n === "hasOwnProperty")
        return rl;
    }
    const o = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ $e(t) ? t : s
    );
    if ((Ze(n) ? Yi.has(n) : il(n)) || (i || ke(t, "get", n), r))
      return o;
    if (/* @__PURE__ */ $e(o)) {
      const a = l && As(n) ? o : o.value;
      return i && ce(a) ? /* @__PURE__ */ ks(a) : a;
    }
    return ce(o) ? i ? /* @__PURE__ */ ks(o) : /* @__PURE__ */ Nn(o) : o;
  }
}
class Qi extends Xi {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, i) {
    let r = t[n];
    const l = q(t) && As(n);
    if (!this._isShallow) {
      const u = /* @__PURE__ */ ft(r);
      if (!/* @__PURE__ */ Ve(s) && !/* @__PURE__ */ ft(s) && (r = /* @__PURE__ */ Z(r), s = /* @__PURE__ */ Z(s)), !l && /* @__PURE__ */ $e(r) && !/* @__PURE__ */ $e(s))
        return u || (r.value = s), !0;
    }
    const o = l ? Number(n) < t.length : se(t, n), a = Reflect.set(
      t,
      n,
      s,
      /* @__PURE__ */ $e(t) ? t : i
    );
    return t === /* @__PURE__ */ Z(i) && a && (o ? at(s, r) && bt(t, "set", n, s) : bt(t, "add", n, s)), a;
  }
  deleteProperty(t, n) {
    const s = se(t, n);
    t[n];
    const i = Reflect.deleteProperty(t, n);
    return i && s && bt(t, "delete", n, void 0), i;
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return (!Ze(n) || !Yi.has(n)) && ke(t, "has", n), s;
  }
  ownKeys(t) {
    return ke(
      t,
      "iterate",
      q(t) ? "length" : Ht
    ), Reflect.ownKeys(t);
  }
}
class ll extends Xi {
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
const ol = /* @__PURE__ */ new Qi(), al = /* @__PURE__ */ new ll(), cl = /* @__PURE__ */ new Qi(!0);
const xs = (e) => e, Mn = (e) => Reflect.getPrototypeOf(e);
function ul(e, t, n) {
  return function(...s) {
    const i = this.__v_raw, r = /* @__PURE__ */ Z(i), l = Mt(r), o = e === "entries" || e === Symbol.iterator && l, a = e === "keys" && l, u = i[e](...s), f = n ? xs : t ? Ot : Be;
    return !t && ke(
      r,
      "iterate",
      a ? _s : Ht
    ), Ee(
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
function Tn(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function fl(e, t) {
  const n = {
    get(i) {
      const r = this.__v_raw, l = /* @__PURE__ */ Z(r), o = /* @__PURE__ */ Z(i);
      e || (at(i, o) && ke(l, "get", i), ke(l, "get", o));
      const { has: a } = Mn(l), u = t ? xs : e ? Ot : Be;
      if (a.call(l, i))
        return u(r.get(i));
      if (a.call(l, o))
        return u(r.get(o));
      r !== l && r.get(i);
    },
    get size() {
      const i = this.__v_raw;
      return !e && ke(/* @__PURE__ */ Z(i), "iterate", Ht), i.size;
    },
    has(i) {
      const r = this.__v_raw, l = /* @__PURE__ */ Z(r), o = /* @__PURE__ */ Z(i);
      return e || (at(i, o) && ke(l, "has", i), ke(l, "has", o)), i === o ? r.has(i) : r.has(i) || r.has(o);
    },
    forEach(i, r) {
      const l = this, o = l.__v_raw, a = /* @__PURE__ */ Z(o), u = t ? xs : e ? Ot : Be;
      return !e && ke(a, "iterate", Ht), o.forEach((f, h) => i.call(r, u(f), u(h), l));
    }
  };
  return Ee(
    n,
    e ? {
      add: Tn("add"),
      set: Tn("set"),
      delete: Tn("delete"),
      clear: Tn("clear")
    } : {
      add(i) {
        const r = /* @__PURE__ */ Z(this), l = Mn(r), o = /* @__PURE__ */ Z(i), a = !t && !/* @__PURE__ */ Ve(i) && !/* @__PURE__ */ ft(i) ? o : i;
        return l.has.call(r, a) || at(i, a) && l.has.call(r, i) || at(o, a) && l.has.call(r, o) || (r.add(a), bt(r, "add", a, a)), this;
      },
      set(i, r) {
        !t && !/* @__PURE__ */ Ve(r) && !/* @__PURE__ */ ft(r) && (r = /* @__PURE__ */ Z(r));
        const l = /* @__PURE__ */ Z(this), { has: o, get: a } = Mn(l);
        let u = o.call(l, i);
        u || (i = /* @__PURE__ */ Z(i), u = o.call(l, i));
        const f = a.call(l, i);
        return l.set(i, r), u ? at(r, f) && bt(l, "set", i, r) : bt(l, "add", i, r), this;
      },
      delete(i) {
        const r = /* @__PURE__ */ Z(this), { has: l, get: o } = Mn(r);
        let a = l.call(r, i);
        a || (i = /* @__PURE__ */ Z(i), a = l.call(r, i)), o && o.call(r, i);
        const u = r.delete(i);
        return a && bt(r, "delete", i, void 0), u;
      },
      clear() {
        const i = /* @__PURE__ */ Z(this), r = i.size !== 0, l = i.clear();
        return r && bt(
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
    n[i] = ul(i, e, t);
  }), n;
}
function Fs(e, t) {
  const n = fl(e, t);
  return (s, i, r) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_isShallow" ? t : i === "__v_raw" ? s : Reflect.get(
    se(n, i) && i in s ? n : s,
    i,
    r
  );
}
const dl = {
  get: /* @__PURE__ */ Fs(!1, !1)
}, hl = {
  get: /* @__PURE__ */ Fs(!1, !0)
}, pl = {
  get: /* @__PURE__ */ Fs(!0, !1)
};
const Zi = /* @__PURE__ */ new WeakMap(), er = /* @__PURE__ */ new WeakMap(), tr = /* @__PURE__ */ new WeakMap(), gl = /* @__PURE__ */ new WeakMap();
function ml(e) {
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
function Nn(e) {
  return /* @__PURE__ */ ft(e) ? e : Ns(
    e,
    !1,
    ol,
    dl,
    Zi
  );
}
// @__NO_SIDE_EFFECTS__
function vl(e) {
  return Ns(
    e,
    !1,
    cl,
    hl,
    er
  );
}
// @__NO_SIDE_EFFECTS__
function ks(e) {
  return Ns(
    e,
    !0,
    al,
    pl,
    tr
  );
}
function Ns(e, t, n, s, i) {
  if (!ce(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e))
    return e;
  const r = i.get(e);
  if (r)
    return r;
  const l = ml(Hr(e));
  if (l === 0)
    return e;
  const o = new Proxy(
    e,
    l === 2 ? s : n
  );
  return i.set(e, o), o;
}
// @__NO_SIDE_EFFECTS__
function $t(e) {
  return /* @__PURE__ */ ft(e) ? /* @__PURE__ */ $t(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function ft(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Ve(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function js(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function Z(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ Z(t) : e;
}
function yl(e) {
  return !se(e, "__v_skip") && Object.isExtensible(e) && Ni(e, "__v_skip", !0), e;
}
const Be = (e) => ce(e) ? /* @__PURE__ */ Nn(e) : e, Ot = (e) => ce(e) ? /* @__PURE__ */ ks(e) : e;
// @__NO_SIDE_EFFECTS__
function $e(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function z(e) {
  return bl(e, !1);
}
function bl(e, t) {
  return /* @__PURE__ */ $e(e) ? e : new wl(e, t);
}
class wl {
  constructor(t, n) {
    this.dep = new Ls(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : /* @__PURE__ */ Z(t), this._value = n ? t : Be(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, s = this.__v_isShallow || /* @__PURE__ */ Ve(t) || /* @__PURE__ */ ft(t);
    t = s ? t : /* @__PURE__ */ Z(t), at(t, n) && (this._rawValue = t, this._value = s ? t : Be(t), this.dep.trigger());
  }
}
function Ye(e) {
  return /* @__PURE__ */ $e(e) ? e.value : e;
}
const _l = {
  get: (e, t, n) => t === "__v_raw" ? e : Ye(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const i = e[t];
    return /* @__PURE__ */ $e(i) && !/* @__PURE__ */ $e(n) ? (i.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function nr(e) {
  return /* @__PURE__ */ $t(e) ? e : new Proxy(e, _l);
}
class xl {
  constructor(t, n, s) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new Ls(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = mn - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = s;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    re !== this)
      return Vi(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return Wi(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function kl(e, t, n = !1) {
  let s, i;
  return ie(e) ? s = e : (s = e.get, i = e.set), new xl(s, i, n);
}
const $n = {}, jn = /* @__PURE__ */ new WeakMap();
let Nt;
function Sl(e, t = !1, n = Nt) {
  if (n) {
    let s = jn.get(n);
    s || jn.set(n, s = []), s.push(e);
  }
}
function Cl(e, t, n = ae) {
  const { immediate: s, deep: i, once: r, scheduler: l, augmentJob: o, call: a } = n, u = (A) => i ? A : /* @__PURE__ */ Ve(A) || i === !1 || i === 0 ? wt(A, 1) : wt(A);
  let f, h, p, m, U = !1, I = !1;
  if (/* @__PURE__ */ $e(e) ? (h = () => e.value, U = /* @__PURE__ */ Ve(e)) : /* @__PURE__ */ $t(e) ? (h = () => u(e), U = !0) : q(e) ? (I = !0, U = e.some((A) => /* @__PURE__ */ $t(A) || /* @__PURE__ */ Ve(A)), h = () => e.map((A) => {
    if (/* @__PURE__ */ $e(A))
      return A.value;
    if (/* @__PURE__ */ $t(A))
      return u(A);
    if (ie(A))
      return a ? a(A, 2) : A();
  })) : ie(e) ? t ? h = a ? () => a(e, 2) : e : h = () => {
    if (p) {
      kt();
      try {
        p();
      } finally {
        St();
      }
    }
    const A = Nt;
    Nt = f;
    try {
      return a ? a(e, 3, [m]) : e(m);
    } finally {
      Nt = A;
    }
  } : h = Ut, t && i) {
    const A = h, H = i === !0 ? 1 / 0 : i;
    h = () => wt(A(), H);
  }
  const L = el(), R = () => {
    f.stop(), L && L.active && Ei(L.effects, f);
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
  let S = I ? new Array(e.length).fill($n) : $n;
  const C = (A) => {
    if (!(!(f.flags & 1) || !f.dirty && !A))
      if (t) {
        const H = f.run();
        if (A || i || U || (I ? H.some((le, J) => at(le, S[J])) : at(H, S))) {
          const le = Nt;
          kt();
          try {
            p && p(), Nt = f;
            const J = [
              H,
              // pass undefined as the old value when it's changed for the first time
              S === $n ? void 0 : I && S[0] === $n ? [] : S,
              m
            ];
            S = H, a ? a(t, 3, J) : (
              // @ts-expect-error
              t(...J)
            );
          } finally {
            Nt = le, St();
          }
        }
      } else
        f.run();
  };
  return o && o(C), f = new Hi(h), f.scheduler = l ? () => l(C, !1) : C, m = (A) => Sl(A, !1, f), p = f.onStop = () => {
    const A = jn.get(f);
    if (A) {
      if (a)
        a(A, 4);
      else
        for (const H of A) H();
      jn.delete(f);
    }
  }, t ? s ? C(!0) : S = f.run() : l ? l(C.bind(null, !0), !0) : f.run(), R.pause = f.pause.bind(f), R.resume = f.resume.bind(f), R.stop = R, R;
}
function wt(e, t = 1 / 0, n) {
  if (t <= 0 || !ce(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, /* @__PURE__ */ $e(e))
    wt(e.value, t, n);
  else if (q(e))
    for (let s = 0; s < e.length; s++)
      wt(e[s], t, n);
  else if (Kt(e) || Mt(e))
    e.forEach((s) => {
      wt(s, t, n);
    });
  else if (Li(e)) {
    for (const s in e)
      wt(e[s], t, n);
    for (const s of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, s) && wt(e[s], t, n);
  }
  return e;
}
function kn(e, t, n, s) {
  try {
    return s ? e(...s) : e();
  } catch (i) {
    Xn(i, t, n);
  }
}
function dt(e, t, n, s) {
  if (ie(e)) {
    const i = kn(e, t, n, s);
    return i && Ri(i) && i.catch((r) => {
      Xn(r, t, n, void 0, !0);
    }), i;
  }
  if (q(e)) {
    const i = [];
    for (let r = 0; r < e.length; r++)
      i.push(dt(e[r], t, n, s));
    return i;
  }
}
function Xn(e, t, n, s = !0, i = !1) {
  const r = t ? t.vnode : null, { errorHandler: l, throwUnhandledErrorInProduction: o } = t && t.appContext.config || ae;
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
      kt(), kn(l, null, 10, [
        e,
        u,
        f
      ]), St();
      return;
    }
  }
  Il(e, n, r, s, o);
}
function Il(e, t, n, s = !0, i = !1) {
  if (i)
    throw e;
  console.error(e);
}
const Te = [];
let Je = -1;
const lt = [];
let It = null, Wt = 0;
const sr = /* @__PURE__ */ Promise.resolve();
let Dn = null;
function Dt(e) {
  const t = Dn || sr;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Ml(e) {
  let t = Je + 1, n = Te.length;
  for (; t < n; ) {
    const s = t + n >>> 1, i = Te[s], r = yn(i);
    r < e || r === e && i.flags & 2 ? t = s + 1 : n = s;
  }
  return t;
}
function Ds(e) {
  if (!(e.flags & 1)) {
    const t = yn(e), n = Te[Te.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= yn(n) ? Te.push(e) : Te.splice(Ml(t), 0, e), e.flags |= 1, ir();
  }
}
function ir() {
  Dn || (Dn = sr.then(or));
}
function Tl(e) {
  if (!q(e))
    It && e.id === -1 ? It.splice(Wt + 1, 0, e) : e.flags & 1 || (lt.push(e), e.flags |= 1);
  else
    for (let t = 0; t < e.length; t++)
      lt.push(e[t]);
  ir();
}
function rr(e, t, n, s = Je + 1) {
  for (; s < Te.length; s++) {
    const i = Te[s];
    if (i && i.flags & 2) {
      if (e && i.id !== e.uid || t !== void 0 && !(i.id >= t))
        continue;
      Te.splice(s, 1), s = e ? s - 1 : Je, i.flags & 4 && (i.flags &= -2), i(), i.flags & 4 || (i.flags &= -2);
    }
  }
}
function lr(e, t, n = 0) {
  if (lt.length) {
    let s = lt, i = 0;
    if (t) {
      s = [];
      for (let l = 0; l < lt.length; l++) {
        const o = lt[l];
        (o.i !== void 0 ? !o.i || o.i.uid < n : t.has(o)) ? lt[i++] = o : s.push(o);
      }
    }
    const r = [...new Set(s)].sort((l, o) => yn(l) - yn(o));
    if (lt.length = i, It) {
      for (let l = 0; l < r.length; l++)
        It.push(r[l]);
      return;
    }
    for (It = r, Wt = 0; Wt < It.length; Wt++) {
      const l = It[Wt];
      l.flags & 4 && (l.flags &= -2), l.flags & 8 || l(), l.flags &= -2;
    }
    It = null, Wt = 0;
  }
}
let cs = !1;
function $l(e, t) {
  if (cs) {
    e();
    return;
  }
  const n = t === void 0 ? void 0 : new Set(lt);
  e(), cs = !0;
  try {
    rr(void 0, t), lr(void 0, n, t);
  } finally {
    cs = !1;
  }
}
const yn = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function or(e) {
  try {
    for (Je = 0; Je < Te.length; Je++) {
      const t = Te[Je];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), kn(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; Je < Te.length; Je++) {
      const t = Te[Je];
      t && (t.flags &= -2);
    }
    Je = -1, Te.length = 0, lr(), Dn = null, (Te.length || lt.length) && or();
  }
}
let Se = null, ar = null;
function Un(e) {
  const t = Se;
  return Se = e, ar = e && e.type.__scopeId || null, t;
}
function Ge(e, t = Se, n) {
  if (!t || e._n)
    return e;
  const s = (...i) => {
    s._d && oi(-1);
    const r = Un(t), l = _t.length;
    let o;
    try {
      o = e(...i);
    } finally {
      for (let a = _t.length; a > l; a--) Vs();
      Un(r), s._d && oi(1);
    }
    return o;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
function Al(e, t) {
  if (Se === null)
    return e;
  const n = ss(Se), s = e.dirs || (e.dirs = []);
  for (let i = 0; i < t.length; i++) {
    let [r, l, o, a = ae] = t[i];
    r && (ie(r) && (r = {
      mounted: r,
      updated: r
    }), r.deep && wt(l), s.push({
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
function Lt(e, t, n, s) {
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
    l ? a.oldValue = l[o].value : s === "mounted" && a.oldValue !== void 0 && (a = Ee({}, a, { oldValue: void 0 }));
    let u = a.dir[s];
    u && (kt(), dt(u, n, 8, [
      e.el,
      a,
      i,
      t
    ]), St());
  }
}
function Ol(e, t, n = !1) {
  const s = go();
  if (s || Gt) {
    let i = Gt ? Gt._context.provides : s ? s.parent == null || s.ce ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : void 0;
    if (i && e in i)
      return i[e];
    if (arguments.length > 1)
      return n && ie(t) ? t.call(s && s.proxy) : t;
  }
}
const El = /* @__PURE__ */ Symbol.for("v-scx"), Rl = () => Ol(El);
function Ke(e, t, n) {
  return Pl(e, t, n);
}
function Pl(e, t, n = ae) {
  const { immediate: s, deep: i, flush: r, once: l } = n, o = Ee({}, n), a = t && s || !t && r !== "post";
  let u;
  if (_n) {
    if (r === "sync") {
      const m = Rl();
      u = m.__watcherHandles || (m.__watcherHandles = []);
    } else if (!a) {
      const m = () => {
      };
      return m.stop = Ut, m.resume = Ut, m.pause = Ut, m;
    }
  }
  const f = Et;
  o.call = (m, U, I) => dt(m, f, U, I);
  let h = !1;
  r === "post" ? o.scheduler = (m) => {
    m.i = f, Me(m, f && f.suspense);
  } : r !== "sync" && (h = !0, o.scheduler = (m, U) => {
    U ? m() : Ds(m);
  }), o.augmentJob = (m) => {
    t && (m.flags |= 4), h && (m.flags |= 2, f && (m.id = f.uid, m.i = f));
  };
  const p = Cl(e, t, o);
  return _n && (u ? u.push(p) : a && p()), p;
}
const Ll = /* @__PURE__ */ Symbol("_vte"), Qn = (e) => e.__isTeleport, us = /* @__PURE__ */ Symbol("_leaveCb");
function Fl(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const n of e)
      if (n.type !== qe) {
        t = n;
        break;
      }
  }
  return t;
}
function cr(e) {
  if (!ur(e))
    return Qn(e.type) && e.children ? Fl(e.children) : e;
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
function dn(e, t) {
  if (e.shapeFlag & 6 && e.component) {
    e.transition = t;
    const n = e.component.subTree;
    dn(
      Qn(n.type) && cr(n) || n,
      t
    );
  } else if (e.shapeFlag & 128) {
    const n = e.suspense;
    if (n) {
      const s = n.isHydrating ? n.pendingBranch : n.activeBranch;
      s && dn(s, t.clone(s));
    } else
      e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback);
  } else if (e.transition = t, e.type === Y && q(e.children)) {
    const n = pr(e.children, !1);
    n && dn(n, t);
  }
}
function Ss(e) {
  if (e.component)
    return Ss(e.component.subTree);
  if (e.type === Y) {
    const t = q(e.children) && pr(e.children, !1);
    return t ? Ss(t) : void 0;
  }
  if (e.type !== qe)
    return e;
}
// @__NO_SIDE_EFFECTS__
function Xt(e, t) {
  return ie(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    Ee({ name: e.name }, t, { setup: e })
  ) : e;
}
function Nl(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function ei(e, t) {
  let n;
  return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
const Hn = /* @__PURE__ */ new WeakMap();
function hn(e, t, n, s, i = !1) {
  if (q(e)) {
    e.forEach(
      (I, L) => hn(
        I,
        t && (q(t) ? t[L] : t),
        n,
        s,
        i
      )
    );
    return;
  }
  if (zt(s) && !i) {
    s.shapeFlag & 512 && s.type.__asyncResolved && s.component.subTree.component && hn(e, t, n, s.component.subTree);
    return;
  }
  const r = s.shapeFlag & 4 ? ss(s.component) : s.el, l = i ? null : r, { i: o, r: a } = e, u = t && t.r, f = o.refs === ae ? o.refs = {} : o.refs, h = o.setupState, p = /* @__PURE__ */ Z(h), m = h === ae ? Oi : (I) => ei(f, I) ? !1 : se(p, I), U = (I, L) => !(L && ei(f, L));
  if (u != null && u !== a) {
    if (ti(t), he(u))
      f[u] = null, m(u) && (h[u] = null);
    else if (/* @__PURE__ */ $e(u)) {
      const I = t;
      U(u, I.k) && (u.value = null), I.k && (f[I.k] = null);
    }
  }
  if (ie(a))
    kn(a, o, 12, [l, f]);
  else {
    const I = he(a), L = /* @__PURE__ */ $e(a);
    if (I || L) {
      const R = () => {
        if (e.f) {
          const S = I ? m(a) ? h[a] : f[a] : U() || !e.k ? a.value : f[e.k];
          if (i)
            q(S) && Ei(S, r);
          else if (q(S))
            S.includes(r) || S.push(r);
          else if (I)
            f[a] = [r], m(a) && (h[a] = f[a]);
          else {
            const C = [r];
            U(a, e.k) && (a.value = C), e.k && (f[e.k] = C);
          }
        } else I ? (f[a] = l, m(a) && (h[a] = l)) : L && (U(a, e.k) && (a.value = l), e.k && (f[e.k] = l));
      };
      if (l) {
        const S = () => {
          R(), Hn.delete(e);
        };
        S.id = -1, Hn.set(e, S), Me(S, n);
      } else
        ti(e), R();
    }
  }
}
function ti(e) {
  const t = Hn.get(e);
  t && (t.flags |= 8, Hn.delete(e));
}
Jn().requestIdleCallback;
Jn().cancelIdleCallback;
const zt = (e) => !!e.type.__asyncLoader, ur = (e) => e.type.__isKeepAlive;
function jl(e, t, n = Et, s = !1) {
  if (n) {
    const i = n[e] || (n[e] = []), r = t.__weh || (t.__weh = (...l) => {
      kt();
      const o = Bs(n), a = dt(t, n, e, l);
      return o(), St(), a;
    });
    return s ? i.unshift(r) : i.push(r), r;
  }
}
const fr = (e) => (t, n = Et) => {
  (!_n || e === "sp") && jl(e, (...s) => t(...s), n);
}, Us = fr("m"), Zn = fr(
  "bum"
), Dl = /* @__PURE__ */ Symbol.for("v-ndc");
function Le(e, t, n, s) {
  let i;
  const r = n, l = q(e);
  if (l || he(e)) {
    const o = l && /* @__PURE__ */ $t(e);
    let a = !1, u = !1;
    o && (a = !/* @__PURE__ */ Ve(e), u = /* @__PURE__ */ ft(e), e = Yn(e)), i = new Array(e.length);
    for (let f = 0, h = e.length; f < h; f++)
      i[f] = t(
        a ? u ? Ot(Be(e[f])) : Be(e[f]) : e[f],
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
function ni(e, t, n, s, i, r) {
  if (n == null && (n = {}), Se.ce || Se.parent && zt(Se.parent) && Se.parent.ce) {
    const u = r != null && n.key == null ? Ee({}, n, { key: r }) : n, f = Object.keys(u).length > 0;
    return t !== "default" && (u.name = t), P(), xt(
      Y,
      null,
      [Ce("slot", u, s)],
      f ? -2 : 64
    );
  }
  let l = e[t];
  l && l._c && (l._d = !1);
  const o = _t.length;
  P();
  let a;
  try {
    const u = l && dr(l(n)), f = n.key || r || // slot content array of a dynamic conditional slot may have a branch
    // key attached in the `createSlots` helper, respect that
    u && u.key;
    a = xt(
      Y,
      {
        key: (f && !Ze(f) ? f : `_${t}`) + // #7256 force differentiate fallback content from actual content
        (!u && s ? "_fb" : "")
      },
      u || (s ? s() : []),
      u && e._ === 1 ? 64 : -2
    );
  } catch (u) {
    for (let f = _t.length; f > o; f--) Vs();
    throw u;
  } finally {
    l && l._c && (l._d = !0);
  }
  return a.scopeId && (a.slotScopeIds = [a.scopeId + "-s"]), a;
}
function dr(e) {
  return e.some((t) => ns(t) ? !(t.type === qe || t.type === Y && !dr(t.children)) : !0) ? e : null;
}
const Cs = (e) => e ? $r(e) ? ss(e) : Cs(e.parent) : null, pn = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Ee(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Cs(e.parent),
    $root: (e) => Cs(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => e.type,
    $forceUpdate: (e) => e.f || (e.f = () => {
      Ds(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Dt.bind(e.proxy)),
    $watch: (e) => Ut
  })
), fs = (e, t) => e !== ae && !e.__isScriptSetup && se(e, t), Ul = {
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
        if (fs(s, t))
          return l[t] = 1, s[t];
        if (se(r, t))
          return l[t] = 3, r[t];
        if (n !== ae && se(n, t))
          return l[t] = 4, n[t];
        l[t] = 0;
      }
    }
    const u = pn[t];
    let f, h;
    if (u)
      return t === "$attrs" && ke(e.attrs, "get", ""), u(e);
    if (
      // css module (injected by vue-loader)
      (f = o.__cssModules) && (f = f[t])
    )
      return f;
    if (n !== ae && se(n, t))
      return l[t] = 4, n[t];
    if (
      // global properties
      h = a.config.globalProperties, se(h, t)
    )
      return h[t];
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: i, ctx: r } = e;
    return fs(i, t) ? (i[t] = n, !0) : se(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (r[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: i, props: r, type: l }
  }, o) {
    let a;
    return !!(n[o] || fs(t, o) || se(r, o) || se(s, o) || se(pn, o) || se(i.config.globalProperties, o) || (a = l.__cssModules) && a[o]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : se(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function hr() {
  return {
    app: null,
    config: {
      isNativeTag: Oi,
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
let Hl = 0;
function Kl(e, t) {
  return function(s, i = null) {
    ie(s) || (s = Ee({}, s)), i != null && !ce(i) && (i = null);
    const r = hr(), l = /* @__PURE__ */ new WeakSet(), o = [];
    let a = !1;
    const u = r.app = {
      _uid: Hl++,
      _component: s,
      _props: i,
      _container: null,
      _context: r,
      _instance: null,
      version: _o,
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
          const m = u._ceVNode || Ce(s, i);
          return m.appContext = r, p === !0 ? p = "svg" : p === !1 && (p = void 0), e(m, f, p), a = !0, u._container = f, f.__vue_app__ = u, ss(m.component);
        }
      },
      onUnmount(f) {
        o.push(f);
      },
      unmount() {
        a && (dt(
          o,
          u._instance,
          16
        ), e(null, u._container), delete u._container.__vue_app__);
      },
      provide(f, h) {
        return r.provides[f] = h, u;
      },
      runWithContext(f) {
        const h = Gt;
        Gt = u;
        try {
          return f();
        } finally {
          Gt = h;
        }
      }
    };
    return u;
  };
}
let Gt = null;
const Vl = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Xe(t)}Modifiers`] || e[`${Vt(t)}Modifiers`];
function Bl(e, t, ...n) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || ae;
  let i = n;
  const r = t.startsWith("update:"), l = r && Vl(s, t.slice(7));
  l && (l.trim && (i = n.map((f) => he(f) ? f.trim() : f)), l.number && (i = i.map(Os)));
  let o, a = s[o = is(t)] || // also try camelCase event handler (#2249)
  s[o = is(Xe(t))];
  !a && r && (a = s[o = is(Vt(t))]), a && dt(
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
    e.emitted[o] = !0, dt(
      u,
      e,
      6,
      i
    );
  }
}
function ql(e, t, n = !1) {
  const s = t.emitsCache, i = s.get(e);
  if (i !== void 0)
    return i;
  const r = e.emits;
  let l = {};
  return r ? (q(r) ? r.forEach((o) => l[o] = null) : Ee(l, r), ce(e) && s.set(e, l), l) : (ce(e) && s.set(e, null), null);
}
function es(e, t) {
  return !e || !Wn(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), se(e, t[0].toLowerCase() + t.slice(1)) || se(e, Vt(t)) || se(e, t));
}
function si(e) {
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
    setupState: m,
    ctx: U,
    inheritAttrs: I
  } = e, L = Un(e);
  let R, S;
  try {
    if (n.shapeFlag & 4) {
      const A = i || s, H = A;
      R = ot(
        u.call(
          H,
          A,
          f,
          h,
          m,
          p,
          U
        )
      ), S = o;
    } else {
      const A = t;
      R = ot(
        A.length > 1 ? A(
          h,
          { attrs: o, slots: l, emit: a }
        ) : A(
          h,
          null
        )
      ), S = t.props ? o : Wl(o);
    }
  } catch (A) {
    _t.length = 0, Xn(A, e, 1), R = Ce(qe);
  }
  let C = R;
  if (S && I !== !1) {
    const A = Object.keys(S), { shapeFlag: H } = C;
    A.length && H & 7 && (r && A.some(zn) && (S = zl(
      S,
      r
    )), C = Jt(C, S, !1, !0));
  }
  if (n.dirs && (C = Jt(C, null, !1, !0), C.dirs = C.dirs ? C.dirs.concat(n.dirs) : n.dirs), n.transition) {
    const A = Qn(C.type) && cr(C) || C;
    dn(A, n.transition);
  }
  return R = C, Un(L), R;
}
function pr(e, t = !0) {
  let n;
  for (let s = 0; s < e.length; s++) {
    const i = e[s];
    if (ns(i)) {
      if (i.type !== qe || i.children === "v-if") {
        if (n)
          return;
        n = i;
      }
    } else
      return;
  }
  return n;
}
const Wl = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || Wn(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, zl = (e, t) => {
  const n = {};
  for (const s in e)
    (!zn(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
  return n;
};
function Gl(e, t, n) {
  const { props: s, children: i, component: r } = e, { props: l, children: o, patchFlag: a } = t, u = r.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && a >= 0) {
    if (a & 1024)
      return !0;
    if (a & 16)
      return s ? ii(s, l, u) : !!l;
    if (a & 8) {
      const f = t.dynamicProps;
      for (let h = 0; h < f.length; h++) {
        const p = f[h];
        if (gr(l, s, p) && !es(u, p))
          return !0;
      }
    }
  } else
    return (i || o) && (!o || !o.$stable) ? !0 : s === l ? !1 : s ? l ? ii(s, l, u) : !0 : !!l;
  return !1;
}
function ii(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length)
    return !0;
  for (let i = 0; i < s.length; i++) {
    const r = s[i];
    if (!se(e, r) || gr(t, e, r) && !es(n, r))
      return !0;
  }
  return !1;
}
function gr(e, t, n) {
  const s = e[n], i = t[n];
  return n === "style" && ce(s) && ce(i) ? !At(s, i) : s !== i;
}
function Jl({ vnode: e, parent: t, suspense: n }, s) {
  for (; t; ) {
    const i = t.subTree;
    if (i.suspense && i.suspense.activeBranch === e && (i.suspense.vnode.el = i.el = s, e = i), i === e)
      (e = t.vnode).el = s, t = t.parent;
    else
      break;
  }
  n && n.activeBranch === e && (n.vnode.el = s);
}
const mr = {}, vr = () => Object.create(mr), yr = (e) => Object.getPrototypeOf(e) === mr;
function Yl(e, t, n, s = !1) {
  const i = {}, r = vr();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), br(e, t, i, r);
  for (const l in e.propsOptions[0])
    l in i || (i[l] = void 0);
  n ? e.props = s ? i : /* @__PURE__ */ vl(i) : e.type.props ? e.props = i : e.props = r, e.attrs = r;
}
function Xl(e, t, n, s) {
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
        if (es(e.emitsOptions, p))
          continue;
        const m = t[p];
        if (a)
          if (se(r, p))
            m !== r[p] && (r[p] = m, u = !0);
          else {
            const U = Xe(p);
            i[U] = Is(
              a,
              o,
              U,
              m,
              e,
              !1
            );
          }
        else
          m !== r[p] && (r[p] = m, u = !0);
      }
    }
  } else {
    br(e, t, i, r) && (u = !0);
    let f;
    for (const h in o)
      (!t || // for camelCase
      !se(t, h) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((f = Vt(h)) === h || !se(t, f))) && (a ? n && // for camelCase
      (n[h] !== void 0 || // for kebab-case
      n[f] !== void 0) && (i[h] = Is(
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
  u && bt(e.attrs, "set", "");
}
function br(e, t, n, s) {
  const [i, r] = e.propsOptions;
  let l = !1, o;
  if (t)
    for (let a in t) {
      if (cn(a))
        continue;
      const u = t[a];
      let f;
      i && se(i, f = Xe(a)) ? !r || !r.includes(f) ? n[f] = u : (o || (o = {}))[f] = u : es(e.emitsOptions, a) || (!(a in s) || u !== s[a]) && (s[a] = u, l = !0);
    }
  if (r) {
    const a = /* @__PURE__ */ Z(n), u = o || ae;
    for (let f = 0; f < r.length; f++) {
      const h = r[f];
      n[h] = Is(
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
function Is(e, t, n, s, i, r) {
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
          const f = Bs(i);
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
    ] && (s === "" || s === Vt(n)) && (s = !0));
  }
  return s;
}
function Ql(e, t, n = !1) {
  const s = t.propsCache, i = s.get(e);
  if (i)
    return i;
  const r = e.props, l = {}, o = [];
  if (!r)
    return ce(e) && s.set(e, jt), jt;
  if (q(r))
    for (let u = 0; u < r.length; u++) {
      const f = Xe(r[u]);
      ri(f) && (l[f] = ae);
    }
  else if (r)
    for (const u in r) {
      const f = Xe(u);
      if (ri(f)) {
        const h = r[u], p = l[f] = q(h) || ie(h) ? { type: h } : Ee({}, h), m = p.type;
        let U = !1, I = !0;
        if (q(m))
          for (let L = 0; L < m.length; ++L) {
            const R = m[L], S = ie(R) && R.name;
            if (S === "Boolean") {
              U = !0;
              break;
            } else S === "String" && (I = !1);
          }
        else
          U = ie(m) && m.name === "Boolean";
        p[
          0
          /* shouldCast */
        ] = U, p[
          1
          /* shouldCastTrue */
        ] = I, (U || se(p, "default")) && o.push(f);
      }
    }
  const a = [l, o];
  return ce(e) && s.set(e, a), a;
}
function ri(e) {
  return e[0] !== "$" && !cn(e);
}
const Hs = (e) => e === "_" || e === "_ctx" || e === "$stable", Ks = (e) => q(e) ? e.map(ot) : [ot(e)], Zl = (e, t, n) => {
  if (t._n)
    return t;
  const s = Ge((...i) => Ks(t(...i)), n);
  return s._c = !1, s;
}, wr = (e, t, n) => {
  const s = e._ctx;
  for (const i in e) {
    if (Hs(i)) continue;
    const r = e[i];
    if (ie(r))
      t[i] = Zl(i, r, s);
    else if (r != null) {
      const l = Ks(r);
      t[i] = () => l;
    }
  }
}, _r = (e, t) => {
  const n = Ks(t);
  e.slots.default = () => n;
}, xr = (e, t, n) => {
  for (const s in t)
    (n || !Hs(s)) && (e[s] = t[s]);
}, eo = (e, t, n) => {
  const s = e.slots = vr();
  if (e.vnode.shapeFlag & 32) {
    const i = t._;
    i ? (xr(s, t, n), n && Ni(s, "_", i, !0)) : wr(t, s);
  } else t && _r(e, t);
}, to = (e, t, n) => {
  const { vnode: s, slots: i } = e;
  let r = !0, l = ae;
  if (s.shapeFlag & 32) {
    const o = t._;
    o ? n && o === 1 ? r = !1 : xr(i, t, n) : (r = !t.$stable, wr(t, i)), l = t;
  } else t && (_r(e, t), l = { default: 1 });
  if (r)
    for (const o in i)
      !Hs(o) && l[o] == null && delete i[o];
}, Me = oo;
function no(e) {
  return so(e);
}
function so(e, t) {
  const n = Jn();
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
    setScopeId: m = Ut,
    insertStaticContent: U
  } = e, I = (c, d, g, x = null, y = null, w = null, T = void 0, $ = null, M = !!d.dynamicChildren) => {
    if (c === d)
      return;
    c && !rn(c, d) && (x = De(c), Ae(c, y, w, !0), c = null), d.patchFlag === -2 && (M = !1, d.dynamicChildren = null), d.dynamicChildren && c && c.dynamicChildren && c.dynamicChildren.hasOnce && (d.dynamicChildren === jt && (d.dynamicChildren = []), d.dynamicChildren.hasOnce = !0);
    const { type: _, ref: j, shapeFlag: O } = d;
    switch (_) {
      case ts:
        L(c, d, g, x);
        break;
      case qe:
        R(c, d, g, x);
        break;
      case hs:
        c == null && S(d, g, x, T);
        break;
      case Y:
        et(
          c,
          d,
          g,
          x,
          y,
          w,
          T,
          $,
          M
        );
        break;
      default:
        O & 1 ? H(
          c,
          d,
          g,
          x,
          y,
          w,
          T,
          $,
          M
        ) : O & 6 ? tt(
          c,
          d,
          g,
          x,
          y,
          w,
          T,
          $,
          M
        ) : (O & 64 || O & 128) && _.process(
          c,
          d,
          g,
          x,
          y,
          w,
          T,
          $,
          M,
          V
        );
    }
    j != null && y ? hn(j, c && c.ref, w, d || c, !d) : j == null && c && c.ref != null && hn(c.ref, null, w, c, !0);
  }, L = (c, d, g, x) => {
    if (c == null)
      s(
        d.el = o(d.children),
        g,
        x
      );
    else {
      const y = d.el = c.el;
      d.children !== c.children && u(y, d.children);
    }
  }, R = (c, d, g, x) => {
    c == null ? s(
      d.el = a(d.children || ""),
      g,
      x
    ) : d.el = c.el;
  }, S = (c, d, g, x) => {
    [c.el, c.anchor] = U(
      c.children,
      d,
      g,
      x,
      c.el,
      c.anchor
    );
  }, C = ({ el: c, anchor: d }, g, x) => {
    let y;
    for (; c && c !== d; )
      y = p(c), s(c, g, x), c = y;
    s(d, g, x);
  }, A = ({ el: c, anchor: d }) => {
    let g;
    for (; c && c !== d; )
      g = p(c), i(c), c = g;
    i(d);
  }, H = (c, d, g, x, y, w, T, $, M) => {
    if (d.type === "svg" ? T = "svg" : d.type === "math" && (T = "mathml"), c == null)
      le(
        d,
        g,
        x,
        y,
        w,
        T,
        $,
        M
      );
    else {
      const _ = c.el && c.el._isVueCE ? c.el : null;
      try {
        _ && _._beginPatch(), ee(
          c,
          d,
          y,
          w,
          T,
          $,
          M
        );
      } finally {
        _ && _._endPatch();
      }
    }
  }, le = (c, d, g, x, y, w, T, $) => {
    let M, _;
    const { props: j, shapeFlag: O, transition: K, dirs: B } = c;
    if (M = c.el = l(
      c.type,
      w,
      j && j.is,
      j
    ), O & 8 ? f(M, c.children) : O & 16 && N(
      c.children,
      M,
      null,
      x,
      y,
      ds(c, w),
      T,
      $
    ), B && Lt(c, null, x, "created"), J(M, c, c.scopeId, T, x), j) {
      for (const te in j)
        te !== "value" && !cn(te) && r(M, te, null, j[te], w, x);
      "value" in j && r(M, "value", null, j.value, w), (_ = j.onVnodeBeforeMount) && it(_, x, c);
    }
    B && Lt(c, null, x, "beforeMount");
    const W = io(y, K);
    W ? K.beforeEnter(M) : K && !K.persisted && (M[lo] = !0), s(M, d, g), ((_ = j && j.onVnodeMounted) || W || B) && Me(() => {
      _ && it(_, x, c), W && K.enter(M), B && Lt(c, null, x, "mounted");
    }, y);
  }, J = (c, d, g, x, y) => {
    if (g && m(c, g), x)
      for (let w = 0; w < x.length; w++)
        m(c, x[w]);
    if (y) {
      let w = y.subTree;
      if (d === w || Cr(w.type) && (w.ssContent === d || w.ssFallback === d)) {
        const T = y.vnode;
        J(
          c,
          T,
          T.scopeId,
          T.slotScopeIds,
          y.parent
        );
      }
    }
  }, N = (c, d, g, x, y, w, T, $, M = 0) => {
    for (let _ = M; _ < c.length; _++) {
      const j = c[_] = $ ? vt(c[_]) : ot(c[_]);
      I(
        null,
        j,
        d,
        g,
        x,
        y,
        w,
        T,
        $
      );
    }
  }, ee = (c, d, g, x, y, w, T) => {
    const $ = d.el = c.el;
    let { patchFlag: M, dynamicChildren: _, dirs: j } = d;
    M |= c.patchFlag & 16;
    const O = c.props || ae, K = d.props || ae;
    let B;
    if (g && Ft(g, !1), (B = K.onVnodeBeforeUpdate) && it(B, g, d, c), j && Lt(d, c, g, "beforeUpdate"), g && Ft(g, !0), // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    _ && (!c.dynamicChildren || c.dynamicChildren.length !== _.length) && (M = 0, T = !1, _ = null), (O.innerHTML && K.innerHTML == null || O.textContent && K.textContent == null) && f($, ""), _ ? Q(
      c.dynamicChildren,
      _,
      $,
      g,
      x,
      ds(d, y),
      w
    ) : T || fe(
      c,
      d,
      $,
      null,
      g,
      x,
      ds(d, y),
      w,
      !1
    ), M > 0) {
      if (M & 16)
        G($, O, K, g, y);
      else if (M & 2 && O.class !== K.class && r($, "class", null, K.class, y), M & 4 && r($, "style", O.style, K.style, y), M & 8) {
        const W = d.dynamicProps;
        for (let te = 0; te < W.length; te++) {
          const X = W[te], oe = O[X], pe = K[X];
          (pe !== oe || X === "value") && r($, X, oe, pe, y, g);
        }
      }
      M & 1 && c.children !== d.children && f($, d.children);
    } else !T && _ == null && G($, O, K, g, y);
    ((B = K.onVnodeUpdated) || j) && Me(() => {
      B && it(B, g, d, c), j && Lt(d, c, g, "updated");
    }, x);
  }, Q = (c, d, g, x, y, w, T) => {
    for (let $ = 0; $ < d.length; $++) {
      const M = c[$], _ = d[$], j = M.el || gn(M), O = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        j && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (M.type === Y || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !rn(M, _) || // - In the case of a component, it could contain anything.
        M.shapeFlag & 198) ? h(j) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          g
        )
      );
      I(
        M,
        _,
        O,
        null,
        x,
        y,
        w,
        T,
        !0
      );
    }
  }, G = (c, d, g, x, y) => {
    if (d !== g) {
      if (d !== ae)
        for (const w in d)
          !cn(w) && !(w in g) && r(
            c,
            w,
            d[w],
            null,
            y,
            x
          );
      for (const w in g) {
        if (cn(w)) continue;
        const T = g[w], $ = d[w];
        T !== $ && w !== "value" && r(c, w, $, T, y, x);
      }
      "value" in g && r(c, "value", d.value, g.value, y);
    }
  }, et = (c, d, g, x, y, w, T, $, M) => {
    const _ = d.el = c ? c.el : o(""), j = d.anchor = c ? c.anchor : o("");
    let { patchFlag: O, dynamicChildren: K, slotScopeIds: B } = d;
    B && ($ = $ ? $.concat(B) : B), c == null ? (s(_, g, x), s(j, g, x), N(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      d.children || [],
      g,
      j,
      y,
      w,
      T,
      $,
      M
    )) : O > 0 && O & 64 && K && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    c.dynamicChildren && c.dynamicChildren.length === K.length ? (Q(
      c.dynamicChildren,
      K,
      g,
      y,
      w,
      T,
      $
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (d.key != null || y && d === y.subTree) && kr(
      c,
      d,
      !0
      /* shallow */
    )) : fe(
      c,
      d,
      g,
      j,
      y,
      w,
      T,
      $,
      M
    );
  }, tt = (c, d, g, x, y, w, T, $, M) => {
    d.slotScopeIds = $, c == null ? d.shapeFlag & 512 ? y.ctx.activate(
      d,
      g,
      x,
      T,
      M
    ) : me(
      d,
      g,
      x,
      y,
      w,
      T,
      M
    ) : Ne(c, d, M);
  }, me = (c, d, g, x, y, w, T) => {
    const $ = c.component = po(
      c,
      x,
      y
    );
    if (ur(c) && ($.ctx.renderer = V), mo($, !1, T), $.asyncDep) {
      if (y && y.registerDep(
        $,
        nt,
        T,
        w
      ), !c.el) {
        const M = $.subTree = Ce(qe);
        R(null, M, d, g), c.placeholder = M.el;
      }
    } else
      nt(
        $,
        c,
        d,
        g,
        y,
        w,
        T
      );
  }, Ne = (c, d, g) => {
    const x = d.component = c.component;
    if (Gl(c, d, g))
      if (x.asyncDep && !x.asyncResolved) {
        d.el = c.el, d.placeholder = c.placeholder, We(x, d, g);
        return;
      } else
        x.next = d, x.update();
    else
      d.el = c.el, d.placeholder = c.placeholder, x.vnode = d;
  }, nt = (c, d, g, x, y, w, T) => {
    const $ = () => {
      if (c.isMounted) {
        let { next: O, bu: K, u: B, parent: W, vnode: te } = c;
        {
          const Pe = Sr(c);
          if (Pe) {
            O && (O.el = te.el, We(c, O, T)), Pe.asyncDep.then(() => {
              const Ue = () => {
                c.job.flags & 8 || (y && y.pendingBranch ? Me(Ue, y) : _());
              };
              Ue.flags = 48, Me(Ue, y);
            });
            return;
          }
        }
        let X = O, oe;
        Ft(c, !1), O ? (O.el = te.el, We(c, O, T)) : O = te, K && Pn(K), (oe = O.props && O.props.onVnodeBeforeUpdate) && it(oe, W, O, te), Ft(c, !0);
        const pe = si(c), Oe = c.subTree;
        c.subTree = pe, I(
          Oe,
          pe,
          // parent may have changed if it's in a teleport. a root that is a
          // pending async component only has its placeholder comment
          h(
            Oe.el || gn(Oe)
          ),
          // anchor may have changed if it's in a fragment
          De(Oe),
          c,
          y,
          w
        ), O.el = pe.el, X === null && Jl(c, pe.el), B && Me(B, y), (oe = O.props && O.props.onVnodeUpdated) && Me(
          () => it(oe, W, O, te),
          y
        );
      } else {
        let O;
        const { el: K, props: B } = d, { bm: W, m: te, parent: X, root: oe, type: pe } = c, Oe = zt(d);
        Ft(c, !1), W && Pn(W), !Oe && (O = B && B.onVnodeBeforeMount) && it(O, X, d), Ft(c, !0);
        {
          oe.ce && oe.ce._hasShadowRoot() && oe.ce._injectChildStyle(
            pe,
            c.parent ? c.parent.type : void 0
          );
          const Pe = c.subTree = si(c);
          I(
            null,
            Pe,
            g,
            x,
            c,
            y,
            w
          ), d.el = Pe.el;
        }
        if (te && Me(te, y), !Oe && (O = B && B.onVnodeMounted)) {
          const Pe = d;
          Me(
            () => it(O, X, Pe),
            y
          );
        }
        (d.shapeFlag & 256 || X && zt(X.vnode) && X.vnode.shapeFlag & 256) && c.a && Me(c.a, y), c.isMounted = !0, d = g = x = null;
      }
    };
    c.scope.on();
    const M = c.effect = new Hi($);
    c.scope.off();
    const _ = c.update = M.run.bind(M), j = c.job = M.runIfDirty.bind(M);
    j.i = c, j.id = c.uid, M.scheduler = () => Ds(j), Ft(c, !0), _();
  }, We = (c, d, g) => {
    d.component = c;
    const x = c.vnode.props;
    c.vnode = d, c.next = null, Xl(c, d.props, x, g), to(c, d.children, g), kt(), rr(c), St();
  }, fe = (c, d, g, x, y, w, T, $, M = !1) => {
    const _ = c && c.children, j = c ? c.shapeFlag : 0, O = d.children, { patchFlag: K, shapeFlag: B } = d;
    if (K > 0) {
      if (K & 128) {
        Ct(
          _,
          O,
          g,
          x,
          y,
          w,
          T,
          $,
          M
        );
        return;
      } else if (K & 256) {
        Re(
          _,
          O,
          g,
          x,
          y,
          w,
          T,
          $,
          M
        );
        return;
      }
    }
    B & 8 ? (j & 16 && xe(_, y, w), O !== _ && f(g, O)) : j & 16 ? B & 16 ? Ct(
      _,
      O,
      g,
      x,
      y,
      w,
      T,
      $,
      M
    ) : xe(_, y, w, !0) : (j & 8 && f(g, ""), B & 16 && N(
      O,
      g,
      x,
      y,
      w,
      T,
      $,
      M
    ));
  }, Re = (c, d, g, x, y, w, T, $, M) => {
    c = c || jt, d = d || jt;
    const _ = c.length, j = d.length, O = Math.min(_, j);
    let K;
    for (K = 0; K < O; K++) {
      const B = d[K] = M ? vt(d[K]) : ot(d[K]);
      I(
        c[K],
        B,
        g,
        null,
        y,
        w,
        T,
        $,
        M
      );
    }
    _ > j ? xe(
      c,
      y,
      w,
      !0,
      !1,
      O
    ) : N(
      d,
      g,
      x,
      y,
      w,
      T,
      $,
      M,
      O
    );
  }, Ct = (c, d, g, x, y, w, T, $, M) => {
    let _ = 0;
    const j = d.length;
    let O = c.length - 1, K = j - 1;
    for (; _ <= O && _ <= K; ) {
      const B = c[_], W = d[_] = M ? vt(d[_]) : ot(d[_]);
      if (rn(B, W))
        I(
          B,
          W,
          g,
          null,
          y,
          w,
          T,
          $,
          M
        );
      else
        break;
      _++;
    }
    for (; _ <= O && _ <= K; ) {
      const B = c[O], W = d[K] = M ? vt(d[K]) : ot(d[K]);
      if (rn(B, W))
        I(
          B,
          W,
          g,
          null,
          y,
          w,
          T,
          $,
          M
        );
      else
        break;
      O--, K--;
    }
    if (_ > O) {
      if (_ <= K) {
        const B = K + 1, W = B < j ? d[B].el : x;
        for (; _ <= K; )
          I(
            null,
            d[_] = M ? vt(d[_]) : ot(d[_]),
            g,
            W,
            y,
            w,
            T,
            $,
            M
          ), _++;
      }
    } else if (_ > K)
      for (; _ <= O; )
        Ae(c[_], y, w, !0), _++;
    else {
      const B = _, W = _, te = /* @__PURE__ */ new Map();
      for (_ = W; _ <= K; _++) {
        const Ie = d[_] = M ? vt(d[_]) : ot(d[_]);
        Ie.key != null && te.set(Ie.key, _);
      }
      let X, oe = 0;
      const pe = K - W + 1;
      let Oe = !1, Pe = 0;
      const Ue = new Array(pe);
      for (_ = 0; _ < pe; _++) Ue[_] = 0;
      for (_ = B; _ <= O; _++) {
        const Ie = c[_];
        if (oe >= pe) {
          Ae(Ie, y, w, !0);
          continue;
        }
        let He;
        if (Ie.key != null)
          He = te.get(Ie.key);
        else
          for (X = W; X <= K; X++)
            if (Ue[X - W] === 0 && rn(Ie, d[X])) {
              He = X;
              break;
            }
        He === void 0 ? Ae(Ie, y, w, !0) : (Ue[He - W] = _ + 1, He >= Pe ? Pe = He : Oe = !0, I(
          Ie,
          d[He],
          g,
          null,
          y,
          w,
          T,
          $,
          M
        ), oe++);
      }
      const Qt = Oe ? ro(Ue) : jt;
      for (X = Qt.length - 1, _ = pe - 1; _ >= 0; _--) {
        const Ie = W + _, He = d[Ie], Sn = d[Ie + 1], Cn = Ie + 1 < j ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          Sn.el || gn(Sn)
        ) : x;
        Ue[_] === 0 ? I(
          null,
          He,
          g,
          Cn,
          y,
          w,
          T,
          $,
          M
        ) : Oe && (X < 0 || _ !== Qt[X] ? st(He, g, Cn, 2) : X--);
      }
    }
  }, st = (c, d, g, x, y = null) => {
    const { el: w, type: T, transition: $, children: M, shapeFlag: _ } = c;
    if (_ & 6) {
      st(c.component.subTree, d, g, x);
      return;
    }
    if (_ & 128) {
      c.suspense.move(d, g, x);
      return;
    }
    if (_ & 64) {
      T.move(c, d, g, V);
      return;
    }
    if (T === Y) {
      s(w, d, g);
      for (let O = 0; O < M.length; O++)
        st(M[O], d, g, x);
      s(c.anchor, d, g);
      return;
    }
    if (T === hs) {
      C(c, d, g);
      return;
    }
    if (x !== 2 && _ & 1 && $)
      if (x === 0)
        $.persisted && !w[us] ? s(w, d, g) : ($.beforeEnter(w), s(w, d, g), Me(() => $.enter(w), y));
      else {
        const { leave: O, delayLeave: K, afterLeave: B } = $, W = () => {
          c.ctx.isUnmounted ? i(w) : s(w, d, g);
        }, te = () => {
          const X = w._isLeaving || !!w[us];
          w._isLeaving && w[us](
            !0
            /* cancelled */
          ), $.persisted && !X ? W() : O(w, () => {
            W(), B && B();
          });
        };
        K ? K(w, W, te) : te();
      }
    else
      s(w, d, g);
  }, Ae = (c, d, g, x = !1, y = !1) => {
    const {
      type: w,
      props: T,
      ref: $,
      children: M,
      dynamicChildren: _,
      shapeFlag: j,
      patchFlag: O,
      dirs: K,
      cacheIndex: B,
      memo: W
    } = c;
    if ((O === -2 || _ && _.hasOnce) && (y = !1), $ != null && (kt(), hn($, null, g, c, !0), St()), B != null && (!c.ctx || c.ctx === d) && (d.renderCache[B] = void 0), j & 256 && d.ctx.deactivate(c))
      return;
    const te = j & 1 && K, X = !zt(c);
    let oe;
    if (X && (oe = T && T.onVnodeBeforeUnmount) && it(oe, d, c), j & 6)
      we(c.component, g, x);
    else {
      if (j & 128) {
        c.suspense.unmount(g, x);
        return;
      }
      te && Lt(c, null, d, "beforeUnmount"), j & 64 ? c.type.remove(
        c,
        d,
        g,
        V,
        x
      ) : _ && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !_.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (w !== Y || O > 0 && O & 64) ? xe(
        _,
        d,
        g,
        !1,
        !0
      ) : (w === Y && O & 384 || !y && j & 16) && xe(M, d, g), x && je(c);
    }
    const pe = W != null && B == null;
    (X && (oe = T && T.onVnodeUnmounted) || te || pe) && Me(() => {
      oe && it(oe, d, c), te && Lt(c, null, d, "unmounted"), pe && (c.el = null);
    }, g);
  }, je = (c) => {
    const { type: d, el: g, anchor: x, transition: y } = c, w = d === Y;
    if (w && !y) {
      ve(g, x);
      return;
    }
    if (d === hs) {
      A(c), y && !y.persisted && y.afterLeave && y.afterLeave();
      return;
    }
    const T = w ? Ss(c) : c, $ = () => {
      w ? h(g) && ve(g, x) : i(g), y && !y.persisted && y.afterLeave && y.afterLeave();
    };
    if (T && T.shapeFlag & 1 && y && !y.persisted) {
      const { leave: M, delayLeave: _ } = y, j = T.el, O = () => M(j, $);
      _ ? _(j, $, O) : O();
    } else
      $();
  }, ve = (c, d) => {
    let g;
    for (; c !== d; )
      g = p(c), i(c), c = g;
    i(d);
  }, we = (c, d, g) => {
    const { bum: x, scope: y, job: w, subTree: T, um: $, m: M, a: _ } = c;
    li(M), li(_), x && Pn(x), y.stop(), w ? (w.flags |= 8, Ae(T, c, d, g)) : T && (T.transition = c.vnode.transition, Ae(T, c, d, g)), $ && Me($, d);
    const j = () => {
      c.isUnmounted = !0;
    };
    j.flags = 16, Me(j, d);
  }, xe = (c, d, g, x = !1, y = !1, w = 0) => {
    for (let T = w; T < c.length; T++)
      Ae(c[T], d, g, x, y);
  }, De = (c) => {
    if (c.shapeFlag & 6)
      return De(c.component.subTree);
    if (c.shapeFlag & 128)
      return c.suspense.next();
    const d = p(c.anchor || c.el), g = d && d[Ll];
    return g ? p(g) : d;
  }, ze = (c, d, g) => {
    const x = c && d._vnode ? void 0 : c && c.component ? c.component.uid : ho();
    $l(() => {
      c == null ? d._vnode && Ae(d._vnode, null, null, !0) : I(
        d._vnode || null,
        c,
        d,
        null,
        null,
        null,
        g
      ), d._vnode = c;
    }, x);
  }, V = {
    p: I,
    um: Ae,
    m: st,
    r: je,
    mt: me,
    mc: N,
    pc: fe,
    pbc: Q,
    n: De,
    o: e
  };
  return {
    render: ze,
    hydrate: void 0,
    createApp: Kl(ze)
  };
}
function ds({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Ft({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function io(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function kr(e, t, n = !1) {
  const s = e.children, i = t.children;
  if (q(s) && q(i))
    for (let r = 0; r < s.length; r++) {
      const l = s[r];
      let o = i[r];
      o.shapeFlag & 1 && !o.dynamicChildren && ((o.patchFlag <= 0 || o.patchFlag === 32) && (o = i[r] = vt(i[r]), o.el = l.el), !n && o.patchFlag !== -2 && kr(l, o)), o.type === ts && (o.patchFlag === -1 && (o = i[r] = vt(o)), o.el = l.el), o.type === qe && !o.el && (o.el = l.el);
    }
}
function ro(e) {
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
function Sr(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Sr(t);
}
function li(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function gn(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  if (t)
    return gn(t.subTree);
  const n = e.suspense;
  return n && n.activeBranch ? gn(n.activeBranch) : null;
}
const Cr = (e) => e.__isSuspense, lo = /* @__PURE__ */ Symbol("_deferredEnter");
function oo(e, t) {
  t && t.pendingBranch ? q(e) ? t.effects.push(...e) : t.effects.push(e) : Tl(e);
}
const Y = /* @__PURE__ */ Symbol.for("v-fgt"), ts = /* @__PURE__ */ Symbol.for("v-txt"), qe = /* @__PURE__ */ Symbol.for("v-cmt"), hs = /* @__PURE__ */ Symbol.for("v-stc"), _t = [];
let Fe = null;
function P(e = !1) {
  _t.push(Fe = e ? null : []);
}
function Vs() {
  _t.pop(), Fe = _t[_t.length - 1] || null;
}
let bn = 1;
function oi(e, t = !1) {
  bn += e, e < 0 && Fe && t && (Fe.hasOnce = !0);
}
function Ir(e) {
  return e.dynamicChildren = bn > 0 ? Fe || jt : null, Vs(), bn > 0 && Fe && Fe.push(e), e;
}
function F(e, t, n, s, i, r) {
  return Ir(
    k(
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
function xt(e, t, n, s, i) {
  return Ir(
    Ce(
      e,
      t,
      n,
      s,
      i,
      !0
    )
  );
}
function ns(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function rn(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Mr = ({ key: e }) => e ?? null, Ln = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? he(e) || /* @__PURE__ */ $e(e) || ie(e) ? { i: Se, r: e, k: t, f: !!n } : e : null);
function k(e, t = null, n = null, s = 0, i = null, r = e === Y ? 0 : 1, l = !1, o = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Mr(t),
    ref: t && Ln(t),
    scopeId: ar,
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
    ctx: Se
  };
  return o ? (Kn(a, n), r & 128 && e.normalize(a)) : n && (a.shapeFlag |= he(n) ? 8 : 16), bn > 0 && // avoid a block node from tracking itself
  !l && // has current parent block
  Fe && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || r & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && Fe.push(a), a;
}
const Ce = ao;
function ao(e, t = null, n = null, s = 0, i = null, r = !1) {
  if ((!e || e === Dl) && (e = qe), ns(e)) {
    const o = Jt(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Kn(o, n), bn > 0 && !r && Fe && (o.shapeFlag & 6 ? Fe[Fe.indexOf(e)] = o : Fe.push(o)), o.patchFlag = -2, o;
  }
  if (wo(e) && (e = e.__vccOpts), t) {
    t = co(t);
    let { class: o, style: a } = t;
    o && !he(o) && (t.class = ct(o)), ce(a) && (/* @__PURE__ */ js(a) && !q(a) && (a = Ee({}, a)), t.style = Tt(a));
  }
  const l = he(e) ? 1 : Cr(e) ? 128 : Qn(e) ? 64 : ce(e) ? 4 : ie(e) ? 2 : 0;
  return k(
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
function co(e) {
  return e ? /* @__PURE__ */ js(e) ? Ee({}, e) : yr(e) ? Ee({}, e[Or] || e) : e : null;
}
function Jt(e, t, n = !1, s = !1) {
  const { props: i, ref: r, patchFlag: l, children: o, transition: a } = e, u = t ? uo(i || {}, t) : i, f = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: u,
    key: u && Mr(u),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && r ? q(r) ? r.concat(Ln(t)) : [r, Ln(t)] : Ln(t)
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
    ssContent: e.ssContent && Jt(e.ssContent),
    ssFallback: e.ssFallback && Jt(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce,
    cacheIndex: e.cacheIndex
  };
  return a && s && dn(
    f,
    a.clone(f)
  ), f;
}
function ge(e = " ", t = 0) {
  return Ce(ts, null, e, t);
}
function ne(e = "", t = !1) {
  return t ? (P(), xt(qe, null, e)) : Ce(qe, null, e);
}
function ot(e) {
  return e == null || typeof e == "boolean" ? Ce(qe) : q(e) ? Ce(
    Y,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : ns(e) ? vt(e) : Ce(ts, null, String(e));
}
function vt(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Jt(e);
}
function Kn(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (q(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const i = t.default;
      i && (i._c && (i._d = !1), Kn(e, i()), i._c && (i._d = !0));
      return;
    } else {
      n = 32;
      const i = t._;
      !i && !yr(t) ? t._ctx = Se : i === 3 && Se && (Se.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else if (ie(t)) {
    if (s & 65) {
      Kn(e, { default: t });
      return;
    }
    t = { default: t, _ctx: Se }, n = 32;
  } else
    t = String(t), s & 64 ? (n = 16, t = [ge(t)]) : n = 8;
  e.children = t, e.shapeFlag |= n;
}
function uo(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const i in s)
      if (i === "class")
        t.class !== s.class && (t.class = ct([t.class, s.class]));
      else if (i === "style")
        t.style = Tt([t.style, s.style]);
      else if (Wn(i)) {
        const r = t[i], l = s[i];
        l && r !== l && !(q(r) && r.includes(l)) ? t[i] = r ? [].concat(r, l) : l : l == null && r == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !zn(i) && (t[i] = l);
      } else i !== "" && (t[i] = s[i]);
  }
  return t;
}
function it(e, t, n, s = null) {
  dt(e, t, 7, [
    n,
    s
  ]);
}
const fo = /* @__PURE__ */ hr();
let Tr = 0;
function ho() {
  return Tr;
}
function po(e, t, n) {
  const s = e.type, i = (t ? t.appContext : e.appContext) || fo, r = {
    uid: Tr++,
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
    scope: new Zr(
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
    propsOptions: Ql(s, i),
    emitsOptions: ql(s, i),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: ae,
    // inheritAttrs
    inheritAttrs: s.inheritAttrs,
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
  return r.ctx = { _: r }, r.root = t ? t.root : r, r.emit = Bl.bind(null, r), e.ce && e.ce(r), r;
}
let Et = null;
const go = () => Et || Se;
let Vn, wn;
{
  const e = Jn(), t = (n, s) => {
    let i;
    return (i = e[n]) || (i = e[n] = []), i.push(s), (r) => {
      i.length > 1 ? i.forEach((l) => l(r)) : i[0](r);
    };
  };
  Vn = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Et = n
  ), wn = t(
    "__VUE_SSR_SETTERS__",
    (n) => _n = n
  );
}
const Bs = (e) => {
  const t = Et;
  return Vn(e), e.scope.on(), () => {
    e.scope.off(), Vn(t);
  };
}, ai = () => {
  Et && Et.scope.off(), Vn(null);
};
function $r(e) {
  return e.vnode.shapeFlag & 4;
}
let _n = !1;
function mo(e, t = !1, n = !1) {
  t && wn(t);
  const { props: s, children: i } = e.vnode, r = $r(e);
  Yl(e, s, r, t), eo(e, i, n || t);
  const l = r ? vo(e, t) : void 0;
  return t && wn(!1), l;
}
function vo(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Ul);
  const { setup: s } = n;
  if (s) {
    kt();
    const i = e.setupContext = s.length > 1 ? bo(e) : null, r = Bs(e), l = kn(
      s,
      e,
      0,
      [
        e.props,
        i
      ]
    ), o = Ri(l);
    if (St(), r(), (o || e.sp) && !zt(e) && Nl(e), o) {
      if (l.then(ai, ai), t)
        return l.then((a) => {
          wn(!0);
          try {
            ci(e, a, t);
          } finally {
            wn(!1);
          }
        }).catch((a) => {
          Xn(a, e, 0, void 0, !0), e.ssrRender = (u, f) => f("<!---->");
        });
      e.asyncDep = l;
    } else
      ci(e, l);
  } else
    Ar(e);
}
function ci(e, t, n) {
  ie(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : ce(t) && (e.setupState = nr(t)), Ar(e);
}
function Ar(e, t, n) {
  const s = e.type;
  e.render || (e.render = s.render || Ut);
}
const Or = /* @__PURE__ */ Symbol(), yo = {
  get(e, t) {
    return ke(e, "get", ""), t === Or ? e : e[t];
  }
};
function bo(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, yo),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function ss(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(nr(yl(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in pn)
        return pn[n](e);
    },
    has(t, n) {
      return n in t || n in pn;
    }
  })) : e.proxy;
}
function wo(e) {
  return ie(e) && "__vccOpts" in e;
}
const ue = (e, t) => /* @__PURE__ */ kl(e, t, _n), _o = "3.5.45";
let Ms;
const ui = typeof window < "u" && window.trustedTypes;
if (ui)
  try {
    Ms = /* @__PURE__ */ ui.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const Er = Ms ? (e) => Ms.createHTML(e) : (e) => e, xo = "http://www.w3.org/2000/svg", ko = "http://www.w3.org/1998/Math/MathML", mt = typeof document < "u" ? document : null, fi = mt && /* @__PURE__ */ mt.createElement("template"), So = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, s) => {
    const i = t === "svg" ? mt.createElementNS(xo, e) : t === "mathml" ? mt.createElementNS(ko, e) : n ? mt.createElement(e, { is: n }) : mt.createElement(e);
    return e === "select" && s && s.multiple != null && i.setAttribute("multiple", s.multiple), i;
  },
  createText: (e) => mt.createTextNode(e),
  createComment: (e) => mt.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => mt.querySelector(e),
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
      fi.innerHTML = Er(
        s === "svg" ? `<svg>${e}</svg>` : s === "mathml" ? `<math>${e}</math>` : e
      );
      const o = fi.content;
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
}, Co = /* @__PURE__ */ Symbol("_vtc");
function Io(e, t, n) {
  const s = e[Co];
  s && (t = (t ? [t, ...s] : [...s]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const di = /* @__PURE__ */ Symbol("_vod"), Mo = /* @__PURE__ */ Symbol("_vsh"), To = /* @__PURE__ */ Symbol(""), $o = /(?:^|;)\s*display\s*:/;
function Ao(e, t, n) {
  const s = e.style, i = he(n);
  let r = !1;
  if (n && !i) {
    if (t)
      if (he(t))
        for (const l of t.split(";")) {
          const o = l.slice(0, l.indexOf(":")).trim();
          n[o] == null && on(s, o, "");
        }
      else
        for (const l in t)
          n[l] == null && on(s, l, "");
    for (const l in n) {
      l === "display" && (r = !0);
      const o = n[l];
      o != null ? Eo(
        e,
        l,
        !he(t) && t ? t[l] : void 0,
        o
      ) || on(s, l, o) : on(s, l, "");
    }
  } else if (i) {
    if (t !== n) {
      const l = s[To];
      l && (n += ";" + l), s.cssText = n, r = $o.test(n);
    }
  } else t && e.removeAttribute("style");
  di in e && ((!i || t !== n) && (e[di] = r ? s.display : ""), e[Mo] && (s.display = "none"));
}
const An = /\s*!important$/;
function on(e, t, n) {
  if (q(n))
    n.forEach((s) => on(e, t, s));
  else if (n == null && (n = ""), t.startsWith("--"))
    An.test(n) ? e.setProperty(t, n.replace(An, ""), "important") : e.setProperty(t, n);
  else {
    const s = Oo(e, t);
    An.test(n) ? e.setProperty(
      Vt(s),
      n.replace(An, ""),
      "important"
    ) : e[s] = n;
  }
}
const hi = ["Webkit", "Moz", "ms"], ps = {};
function Oo(e, t) {
  const n = ps[t];
  if (n)
    return n;
  let s = Xe(t);
  if (s !== "filter" && s in e)
    return ps[t] = s;
  s = Fi(s);
  for (let i = 0; i < hi.length; i++) {
    const r = hi[i] + s;
    if (r in e)
      return ps[t] = r;
  }
  return t;
}
function Eo(e, t, n, s) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && he(s) && n === s;
}
const pi = "http://www.w3.org/1999/xlink";
function gi(e, t, n, s, i, r = Jr(t)) {
  s && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(pi, t.slice(6, t.length)) : e.setAttributeNS(pi, t, n) : n == null || r && !ji(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    r ? "" : Ze(n) ? String(n) : n
  );
}
function mi(e, t, n, s, i) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? Er(n) : n);
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
    o === "boolean" ? n = ji(n) : n == null && o === "string" ? (n = "", l = !0) : o === "number" && (n = 0, l = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  l && e.removeAttribute(i || t);
}
function Rr(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function Ro(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
const vi = /* @__PURE__ */ Symbol("_vei");
function Po(e, t, n, s, i = null) {
  const r = e[vi] || (e[vi] = {}), l = r[t];
  if (s && l)
    l.value = s;
  else {
    const [o, a] = No(t);
    if (s) {
      const u = r[t] = Uo(
        s,
        i
      );
      Rr(e, o, u, a);
    } else l && (Ro(e, o, l, a), r[t] = void 0);
  }
}
const Lo = /(Once|Passive|Capture)$/, Fo = /^on:?(?:Once|Passive|Capture)$/;
function No(e) {
  let t, n;
  for (; (n = e.match(Lo)) && !Fo.test(e); )
    t || (t = {}), e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = !0;
  return [e[2] === ":" ? e.slice(3) : Vt(e.slice(2)), t];
}
let gs = 0;
const jo = /* @__PURE__ */ Promise.resolve(), Do = () => gs || (jo.then(() => gs = 0), gs = Date.now());
function Uo(e, t) {
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
        u && dt(
          u,
          t,
          5,
          o
        );
      }
    } else
      dt(
        i,
        t,
        5,
        [s]
      );
  };
  return n.value = e, n.attached = Do(), n;
}
const yi = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Ho = (e, t, n, s, i, r) => {
  const l = i === "svg";
  t === "class" ? Io(e, s, l) : t === "style" ? Ao(e, n, s) : Wn(t) ? zn(t) || Po(e, t, n, s, r) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Ko(e, t, s, l)) ? (mi(e, t, s), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && gi(e, t, s, l, r, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (Vo(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !he(s))) ? mi(e, Xe(t), s, r, t) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), gi(e, t, s, l));
};
function Ko(e, t, n, s) {
  if (s)
    return !!(t === "innerHTML" || t === "textContent" || t in e && yi(t) && ie(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const i = e.tagName;
    if (i === "IMG" || i === "VIDEO" || i === "CANVAS" || i === "SOURCE")
      return !1;
  }
  return yi(t) && he(n) ? !1 : t in e;
}
function Vo(e, t) {
  const n = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!n)
    return !1;
  const s = Xe(t);
  return Array.isArray(n) ? n.some((i) => Xe(i) === s) : Object.keys(n).some((i) => Xe(i) === s);
}
const bi = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return q(t) ? (n) => Pn(t, n) : t;
}, ms = /* @__PURE__ */ Symbol("_assign"), Bo = {
  // <select multiple> value need to be deep traversed
  deep: !0,
  created(e, { value: t, modifiers: { number: n } }, s) {
    e._modelValue = t, Rr(e, "change", () => {
      const i = Array.prototype.filter.call(e.options, (a) => a.selected).map(
        (a) => n ? Os(Bn(a)) : Bn(a)
      ), r = e.multiple, l = r ? Kt(e._modelValue) ? new Set(i) : i : i[0], o = e._pendingValue = [
        r,
        r ? q(l) ? i.slice() : i : l
      ];
      try {
        e[ms](l);
      } finally {
        Dt(() => {
          e._pendingValue === o && (e._pendingValue = void 0);
        });
      }
    }), e[ms] = bi(s);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(e, { value: t, modifiers: { number: n } }) {
    wi(e, t, n);
  },
  beforeUpdate(e, { value: t }, n) {
    e._modelValue = t, e[ms] = bi(n);
  },
  updated(e, { value: t, modifiers: { number: n } }) {
    const s = e._pendingValue;
    e._pendingValue = void 0, (!s || s[0] !== e.multiple || !qo(t, s[1], s[0])) && wi(e, t, n);
  }
};
function qo(e, t, n) {
  if (!n || q(e)) return At(e, t);
  if (Kt(e)) {
    if (e.size !== t.length) return !1;
    for (const s of t)
      if (!e.has(s)) return !1;
    return !0;
  }
  return !1;
}
function wi(e, t, n = !1) {
  const s = e.multiple, i = q(t);
  if (!(s && !i && !Kt(t))) {
    for (let r = 0, l = e.options.length; r < l; r++) {
      const o = e.options[r], a = Bn(o);
      if (s)
        if (i) {
          const u = typeof a;
          u === "string" || u === "number" ? o.selected = t.some((f) => String(f) === String(a)) : o.selected = Qr(t, a) > -1;
        } else
          o.selected = t.has(a) || n && typeof a == "string" && t.has(Os(a));
      else if (At(Bn(o), t)) {
        e.selectedIndex !== r && (e.selectedIndex = r);
        return;
      }
    }
    !s && e.selectedIndex !== -1 && (e.selectedIndex = -1);
  }
}
function Bn(e) {
  return "_value" in e ? e._value : e.value;
}
const Wo = ["ctrl", "shift", "alt", "meta"], zo = {
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
  exact: (e, t) => Wo.some((n) => e[`${n}Key`] && !t.includes(n))
}, Pr = (e, t) => {
  if (!e) return e;
  const n = e._withMods || (e._withMods = {}), s = t.join(".");
  return n[s] || (n[s] = ((i, ...r) => {
    for (let l = 0; l < t.length; l++) {
      const o = zo[t[l]];
      if (o && o(i, t)) return;
    }
    return e(i, ...r);
  }));
}, Go = /* @__PURE__ */ Ee({ patchProp: Ho }, So);
let _i;
function Jo() {
  return _i || (_i = no(Go));
}
const Yo = ((...e) => {
  const t = Jo().createApp(...e), { mount: n } = t;
  return t.mount = (s) => {
    const i = Qo(s);
    if (!i) return;
    const r = t._component;
    !ie(r) && !r.render && !r.template && (r.template = i.innerHTML), i.nodeType === 1 && (i.textContent = "");
    const l = n(i, !1, Xo(i));
    return i instanceof Element && (i.removeAttribute("v-cloak"), i.setAttribute("data-v-app", "")), l;
  }, t;
});
function Xo(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Qo(e) {
  return he(e) ? document.querySelector(e) : e;
}
const qn = () => ({ scale: 1, x: 0, y: 0 });
function Zo() {
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
    transforms: { left: qn(), right: qn() }
  };
}
function vs(e, t, n = !1) {
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
function Fn(e) {
  return e.images.filter(
    (t) => t.id === e.leftId || e.scope === "folder" || (e.scope === "checked" ? e.checked : e.promptIds).has(t.id)
  );
}
function ea(e, t) {
  const n = e.mode === "single" ? e.images : Fn(e), s = e.mode === "single" ? "currentId" : "rightId", r = n.findIndex((l) => l.id === e[s]) + t;
  r >= 0 && r < n.length && (e[s] = n[r].id);
}
function ta(e) {
  e.open = !1, e.checked.clear(), e.pinned.clear(), e.unavailable.clear(), e.currentId = null, e.leftId = null, e.rightId = null, e.manualMatches = {}, e.panel = !1, e.mode = "grid", e.scope = "folder", e.promptIds.clear(), e.transforms = { left: qn(), right: qn() }, e.records.clear(), e.images = [];
}
function na(e, t) {
  e.linked = t, t && (e.transforms.right = { ...e.transforms.left });
}
function On(e, t, n) {
  e.transforms[t] = { ...n }, e.linked && (e.transforms[t === "left" ? "right" : "left"] = { ...n });
}
function sa(e, t, n, s, i) {
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
function Lr(e, t, n, s, i, r) {
  const l = Math.max(1, Math.floor(s / i)), o = Math.floor(n / i) * l, a = e[o]?.id, u = t.findIndex((f) => f.id === a);
  return u < 0 ? n : Math.floor(u / Math.max(1, Math.floor(s / r))) * r + Math.min(n % i, r - 1);
}
function ia(e, t, n, s) {
  return n < t ? n : n + s > t + e ? Math.max(0, n + s - e) : t;
}
class ra {
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
  resetFolder(t) {
    this.abort.abort(), this.abort = new AbortController(), this.epoch++, this.working = !1, this.session.folderId = t, this.session.images = [], this.session.records.clear(), this.session.checked.clear(), this.session.pinned.clear(), this.session.unavailable.clear(), this.session.currentId = null, this.session.leftId = null, this.session.rightId = null, this.session.mode = "grid", this.session.panel = !1, this.session.manualMatches = {}, this.session.scope = "folder", this.session.promptIds.clear(), this.cursor = null, this.version = "", this.firstCursor = null, this.error = "", this.loading = !1;
  }
  async selectFolder(t) {
    this.resetFolder(t), await this.refresh();
  }
  adoptBootstrap(t, n) {
    this.resetFolder(t), vs(this.session, n.images, n.next_cursor === null), this.cursor = this.firstCursor = n.next_cursor, this.version = n.version, this.changed();
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
      vs(this.session, s, i === null), this.cursor = i, this.version = r, this.firstCursor = l, this.error = "";
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
      vs(this.session, [
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
const Fr = ["prompt", "workflow"], xi = 500, la = 5e3, oa = 1e3, aa = /* @__PURE__ */ new Set(["seed", "noise_seed", "random_seed"]), ca = /* @__PURE__ */ new Set(["ckpt_name", "checkpoint_name", "model_name", "unet_name", "diffusion_model_name"]), ki = {
  CLIPTextEncode: ["text"],
  CLIPTextEncodeSDXL: ["text_g", "text_l"],
  CLIPTextEncodeSDXLRefiner: ["text"]
};
function be(e) {
  return e !== null && typeof e == "object" && !Array.isArray(e);
}
function yt(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function an(e) {
  return yt(ki, e) ? ki[e] : void 0;
}
function ua(e) {
  return typeof e == "string" ? e.trim().length > 0 : typeof e == "number" && Number.isSafeInteger(e);
}
function Ts(e) {
  if (!be(e) || Object.keys(e).length !== 1 || typeof e.__shiba_number__ != "string" || !/^-?(?:0|[1-9]\d*)$/.test(e.__shiba_number__)) return;
  const t = e.__shiba_number__, n = BigInt(t);
  return n > BigInt(Number.MAX_SAFE_INTEGER) || n < BigInt(Number.MIN_SAFE_INTEGER) ? t : void 0;
}
function fa(e) {
  const t = [e];
  for (; t.length; ) {
    const n = t.pop();
    if (typeof n == "number" && (!Number.isFinite(n) || Number.isInteger(n) && !Number.isSafeInteger(n))) return !0;
    if (Array.isArray(n)) for (const s of n) t.push(s);
    else if (be(n)) for (const s of Object.values(n)) t.push(s);
  }
  return !1;
}
function En(e, t, n, s = !1) {
  const i = an(e)?.includes(t) === !0 && typeof n == "string", r = s ? "reference" : i ? "prompt" : ca.has(t) && typeof n == "string" ? "model" : t === "lora_name" && typeof n == "string" ? "lora-name" : /lora/i.test(e) && ["strength_model", "strength_clip", "strength", "lora_strength"].includes(t) ? "lora-strength" : "value";
  return { key: t, label: t, value: n, kind: r, promptText: i };
}
function Yt(e, t) {
  if (Object.is(e, t)) return !0;
  if (Array.isArray(e) && Array.isArray(t))
    return e.length === t.length && e.every((n, s) => Yt(n, t[s]));
  if (be(e) && be(t)) {
    const n = Object.keys(e);
    return n.length === Object.keys(t).length && n.every((s) => yt(t, s) && Yt(e[s], t[s]));
  }
  return !1;
}
function Si(e, t, n) {
  if (t == null) return { state: "missing", nodes: [] };
  if (!be(t) || e === "workflow" && !Array.isArray(t.nodes))
    return n.push(`${e}: 保存形式を解析できません。`), { state: "invalid", nodes: [] };
  const s = e === "prompt" ? Object.entries(t) : t.nodes.map((a, u) => [be(a) && (typeof a.id == "string" || typeof a.id == "number") ? String(a.id) : `不明[${u}]`, a]), i = [];
  let r = s.length > xi;
  r && n.push(`${e}: ノード数が表示上限を超えています。一部のみ比較します。元 JSON は保持しています。`);
  let l = 0;
  const o = /* @__PURE__ */ new Set();
  for (const [a, u] of s.slice(0, xi)) {
    const f = be(u) ? u[e === "prompt" ? "class_type" : "type"] : void 0;
    if (!be(u) || typeof f != "string" || !f || o.has(a) || e === "workflow" && !ua(u.id)) {
      n.push(`${e}: ノード ${a} の形式が不正、または ID が重複しています。`), r = !0;
      continue;
    }
    o.add(a);
    const h = e === "prompt" && be(u._meta) && typeof u._meta.title == "string" ? u._meta.title : typeof u.title == "string" ? u.title : "", p = [];
    let m = !0;
    if (e === "prompt")
      if (!be(u.inputs)) m = !1;
      else
        for (const [L, R] of Object.entries(u.inputs)) {
          const S = Array.isArray(R) && R.length === 2 && typeof R[0] == "string" && Number.isInteger(R[1]) && R[1] >= 0 && yt(t, R[0]);
          p.push(En(f, L, R, S));
        }
    else {
      if (Array.isArray(u.widgets_values))
        u.widgets_values.forEach((L, R) => p.push({ key: `widgets_values[${R}]`, label: `保存値[${R}]（名称不明）`, value: L, kind: "value", promptText: !1 }));
      else if (be(u.widgets_values))
        for (const [L, R] of Object.entries(u.widgets_values)) {
          const S = En(f, L, R);
          p.push({ ...S, key: `widgets_values.${L}` });
        }
      else u.widgets_values != null && (m = !1);
      if (be(u.inputs))
        for (const [L, R] of Object.entries(u.inputs)) p.push(En(f, L, R));
      else if (Array.isArray(u.inputs))
        for (const [L, R] of u.inputs.entries()) {
          if (!be(R)) {
            m = !1;
            continue;
          }
          const S = typeof R.name == "string" ? R.name : `入力[${L}]（名称不明）`;
          if (yt(R, "value") && p.push(En(f, S, R.value)), R.link != null) {
            const C = Array.isArray(t.links) ? t.links.find((H) => Array.isArray(H) ? H[0] === R.link : be(H) && H.id === R.link) : void 0, A = Array.isArray(C) ? [String(C[1]), C[2]] : be(C) && yt(C, "origin_id") ? [String(C.origin_id), C.origin_slot] : { link_id: R.link };
            C || (m = !1), p.push({ key: `inputs.${S}`, label: S, value: A, kind: "reference", promptText: !1 });
          }
        }
      else u.inputs != null && (m = !1);
      yt(u, "mode") && p.push({ key: "mode", label: "保存された実行モード", value: u.mode, kind: "value", promptText: !1 }), !yt(u, "widgets_values") && !yt(u, "inputs") && (m = !1);
    }
    const U = p.filter((L) => !aa.has(L.key.replace(/^(?:widgets_values|inputs)\./, ""))), I = U.slice(0, Math.max(0, la - l));
    l += I.length, I.length < U.length && (m = !1, n.push(`${e}: 保存項目数が表示上限を超えています。元 JSON は保持しています。`)), I.some((L) => fa(L.value)) && (m = !1, n.push(`${e}: ノード ${a} の数値がブラウザーの正確な整数精度を超えています。値の一致や正確なコピーを保証できません。`)), m || (r = !0, n.push(`${e}: ノード ${a} (${f}) の一部情報を正確に確認できません。`)), i.push({ key: `${e}:${a}`, id: a, type: f, title: h, source: e, fields: I, complete: m });
  }
  return i.length === 0 ? (n.push(`${e}: 比較できる保存ノードがありません。`), { state: s.length ? "invalid" : "partial", nodes: i }) : { state: r ? "partial" : "ok", nodes: i };
}
function Ci(e) {
  const t = Array.isArray(e.warnings) ? e.warnings.filter((o) => typeof o == "string") : [], n = Si("prompt", e.prompt, t), s = Si("workflow", e.workflow, t), i = [...n.nodes, ...s.nodes];
  for (const o of n.nodes) {
    const a = s.nodes.find((u) => u.id === o.id && u.type === o.type);
    if (a)
      for (const u of o.fields) {
        const f = a.fields.find((h) => h.key === u.key || h.key === `widgets_values.${u.key}`);
        f && !Yt(u.value, f.value) && t.push(`ノード ${o.id} / ${u.label}: prompt と workflow の保存値が異なります。情報源を分けて表示します。`);
      }
  }
  const r = [n.state, s.state];
  let l = r.every((o) => o === "missing") ? "missing" : i.length === 0 && r.includes("invalid") ? "invalid" : r.includes("invalid") || r.includes("partial") ? "partial" : "ok";
  return ["invalid", "unsupported"].includes(e.status) ? l = i.length ? "partial" : "invalid" : e.status === "partial" && (l = "partial"), l === "missing" && t.push("設定情報なし。保存された生成条件の一致は確認できません。"), l === "invalid" && t.push("保存データを解析できません。画像の比較は継続できます。"), { status: l, nodes: i, warnings: [...new Set(t)], raw: { prompt: e.prompt, workflow: e.workflow }, rawText: { prompt: typeof e.raw_prompt == "string" ? e.raw_prompt : null, workflow: typeof e.raw_workflow == "string" ? e.raw_workflow : null }, sources: { prompt: n.state, workflow: s.state } };
}
function Ii(e) {
  return [...new Set(e.nodes.flatMap((t) => t.fields.filter((n) => n.kind === "model" && typeof n.value == "string").map((n) => n.value)))];
}
function Nr(e, t, n, s) {
  const i = [], r = /* @__PURE__ */ new Set(), l = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Set(), a = new Map(t.map((h) => [h.key, h])), u = Object.values(n).filter((h) => h !== null);
  for (const h of Object.keys(n))
    e.some((p) => p.key === h) || (o.add(h), s.push(`${h}: 手動対応の左ノードが現在の画像にありません。対応を選び直してください。`));
  for (const h of e) {
    if (!yt(n, h.key)) continue;
    const p = n[h.key];
    if (p === null) {
      o.add(h.key);
      continue;
    }
    const m = a.get(p);
    if (!m || m.source !== h.source || u.filter((U) => U === p).length > 1) {
      o.add(h.key), s.push(`${h.key}: 手動対応が不正、または右ノードが重複しています。対応を選び直してください。`);
      continue;
    }
    i.push({ leftKey: h.key, rightKey: m.key, reason: "manual" }), r.add(h.key), l.add(m.key);
  }
  function f(h, p, m) {
    i.push({ leftKey: h.key, rightKey: p.key, reason: m }), r.add(h.key), l.add(p.key);
  }
  for (const h of Fr) {
    const p = e.filter((I) => I.source === h), m = t.filter((I) => I.source === h);
    if (p.length === m.length && p.every((I) => m.some((L) => L.id === I.id && L.type === I.type)))
      for (const I of p) {
        const L = m.find((R) => R.id === I.id && R.type === I.type);
        L && !r.has(I.key) && !o.has(I.key) && !l.has(L.key) && f(I, L, "id-type");
      }
    for (const I of p) {
      if (r.has(I.key) || o.has(I.key)) continue;
      const L = m.filter((S) => S.type === I.type && !l.has(S.key)), R = p.filter((S) => S.type === I.type && !r.has(S.key));
      if (L.length === 1 && R.length === 1) f(I, L[0], "type");
      else if (I.title) {
        const S = L.filter((C) => C.title === I.title);
        S.length === 1 && R.filter((C) => C.title === I.title).length === 1 && f(I, S[0], "type-title");
      }
    }
  }
  return { matches: i, blocked: o };
}
function da(e, t, n = {}) {
  const s = [...e.warnings.map((C) => `左: ${C}`), ...t.warnings.map((C) => `右: ${C}`)], i = [], r = n.manualMatches ?? {};
  let l = e.status !== "ok" || t.status !== "ok", o = 0, a = !1;
  for (const C of Fr)
    e.sources[C] !== t.sources[C] && (l = !0, s.push(`${C}: 左右で保存情報の範囲が異なります。欠落を追加・削除と断定しません。`));
  const { matches: u, blocked: f } = Nr(e.nodes, t.nodes, r, s);
  f.size && (l = !0), u.some((C) => C.reason === "id-type") && s.push("ID・型による自動対応は保存グラフに基づく候補です。別 workflow の同一性や、モデルファイル・コード版の一致を保証しません。");
  const h = new Map(e.nodes.map((C) => [C.key, C])), p = new Map(t.nodes.map((C) => [C.key, C])), m = new Set(u.map((C) => C.leftKey)), U = new Set(u.map((C) => C.rightKey));
  function I(C, A, H, le, J, N, ee) {
    if (i.length >= oa) {
      l = !0, a || s.push("差分数が表示上限を超えています。一部のみ表示します。元 JSON から全保存値を確認できます。"), a = !0;
      return;
    }
    i.push({ id: `${C?.key ?? ""}|${A?.key ?? ""}|${H}|${ee}`, kind: ee, source: (C ?? A).source, ...C ? { leftNode: C } : {}, ...A ? { rightNode: A } : {}, path: H, label: le, ...C ? { left: J } : {}, ...A ? { right: N } : {} });
  }
  function L(C, A, H, le, J, N, ee, Q = 0) {
    if (!Yt(J, N))
      if (Ts(J) !== void 0 || Ts(N) !== void 0) I(C, A, H, le, J, N, ee);
      else if (ee !== "connection" && Q < 64 && Array.isArray(J) && Array.isArray(N))
        for (let G = 0; G < Math.max(J.length, N.length); G++) L(C, A, `${H}[${G}]`, `${le}[${G}]`, J[G], N[G], ee, Q + 1);
      else if (ee !== "connection" && Q < 64 && be(J) && be(N))
        for (const G of /* @__PURE__ */ new Set([...Object.keys(J), ...Object.keys(N)])) L(C, A, `${H}.${G}`, `${le}.${G}`, J[G], N[G], ee, Q + 1);
      else I(C, A, H, le, J, N, ee);
  }
  for (const C of u) {
    const A = h.get(C.leftKey), H = p.get(C.rightKey);
    A.type !== H.type && I(A, H, "class_type", "ノード型", A.type, H.type, "changed");
    const le = new Map(A.fields.map((N) => [N.key, N])), J = new Map(H.fields.map((N) => [N.key, N]));
    for (const N of /* @__PURE__ */ new Set([...le.keys(), ...J.keys()])) {
      const ee = le.get(N), Q = J.get(N);
      if (ee?.promptText && Q?.promptText) {
        o++;
        continue;
      }
      if (!ee || !Q) {
        l = !0, s.push(`${A.source}: ${A.id} ↔ ${H.id} / ${N}: 片方に保存値がありません。設定の削除とは断定できません。`);
        continue;
      }
      L(A, H, N, ee.label, ee.value, Q.value, ee.kind === "reference" || Q.kind === "reference" ? "connection" : "changed");
    }
  }
  const R = [], S = [];
  for (const [C, A, H, le, J] of [
    ["left", e.nodes, t.nodes, m, R],
    ["right", t.nodes, e.nodes, U, S]
  ])
    for (const N of A) {
      if (le.has(N.key)) continue;
      const ee = H.filter((G) => G.source === N.source && G.type === N.type), Q = e.status === "ok" && t.status === "ok" && e.sources[N.source] === "ok" && t.sources[N.source] === "ok";
      ee.length === 0 && Q && !f.has(N.key) ? I(C === "left" ? N : void 0, C === "right" ? N : void 0, "", C === "left" ? "右で削除（左にのみ保存）" : "右で追加（右にのみ保存）", C === "left" ? N.fields : void 0, C === "right" ? N.fields : void 0, C === "left" ? "removed" : "added") : (l = !0, J.push({ node: N, candidateKeys: ee.map((G) => G.key) }));
    }
  return (R.length || S.length) && s.push("対応未確定のノードがあります。候補を確認し、必要に応じて手動で対応付けてください。"), { status: l ? "incomplete" : i.length ? "different" : "same", differences: i, matches: u, unmatchedLeft: R, unmatchedRight: S, warnings: [...new Set(s)], excludedPromptFields: o };
}
function Mi(e, t) {
  if (e.status !== "ok" || t.status !== "ok") return null;
  const n = e.sources.prompt === "ok" && t.sources.prompt === "ok" ? "prompt" : "workflow";
  if (e.sources[n] !== "ok" || t.sources[n] !== "ok") return null;
  for (const o of [e, t]) {
    const a = o.nodes.filter((u) => u.source === n);
    if (a.some((u) => !an(u.type) && u.fields.some((f) => /^(?:widgets_values\.)?(?:text|prompt|positive|negative)$/.test(f.key) && typeof f.value == "string"))) return null;
    for (const u of a) {
      const f = o.nodes.find((h) => h.source !== n && h.id === u.id && h.type === u.type);
      if (f)
        for (const h of u.fields.filter((p) => p.promptText)) {
          const p = h.key.replace(/^widgets_values\./, ""), m = f.fields.find((U) => U.key.replace(/^widgets_values\./, "") === p && U.promptText);
          if (m && !Yt(h.value, m.value)) return null;
        }
    }
  }
  const s = e.nodes.filter((o) => o.source === n && an(o.type)), i = t.nodes.filter((o) => o.source === n && an(o.type));
  if (!s.length || s.length !== i.length) return null;
  const { matches: r } = Nr(s, i, {}, []);
  if (r.length !== s.length) return null;
  for (const o of r) {
    const a = s.find((f) => f.key === o.leftKey), u = i.find((f) => f.key === o.rightKey);
    if (a.type !== u.type) return null;
    for (const f of an(a.type)) {
      const h = a.fields.find((m) => m.key === f || m.key === `widgets_values.${f}`), p = u.fields.find((m) => m.key === f || m.key === `widgets_values.${f}`);
      if (!h?.promptText || !p?.promptText) return null;
      if (h.value !== p.value) return !1;
    }
  }
  const l = (o) => o.nodes.filter((a) => a.source === n).flatMap((a) => a.fields.filter((u) => /^(?:inputs\.)?(?:positive|negative)$/.test(u.key) && u.kind === "reference").map((u) => ({ node: a.key, input: u.key, reference: u.value })));
  return Yt(l(e), l(t)) ? !0 : null;
}
function gt(e) {
  if (e === void 0) return "保存情報なし";
  if (typeof e == "string") return e;
  function t(n, s) {
    if (s > 128) throw new Error("Metadata nesting limit");
    const i = Ts(n);
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
class ha {
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
const ut = new ha(), Rn = { high: 2, normal: 1, low: 0 };
class pa {
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
        Rn[l] > Rn[r.priority] && (r.priority = l, this.drain());
      },
      cancel: () => {
        r.cancelled = !0, r.started || (this.jobs = this.jobs.filter((l) => l !== r), s());
      }
    };
  }
  drain() {
    for (this.jobs.sort((t, n) => Rn[n.priority] - Rn[t.priority]); this.active < this.limit && this.jobs.length && !(this.jobs[0].priority === "low" && this.active >= Math.max(1, this.limit - 1)); ) {
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
const ga = new pa(4), qt = /* @__PURE__ */ new Map(), Ti = { high: 2, normal: 1, low: 0 };
function jr(e, t = "normal") {
  const n = ut.get(e);
  if (n) return { done: Promise.resolve(n), cancel: () => {
  } };
  let s = qt.get(e);
  if (s)
    Ti[t] > Ti[s.priority] && (s.priority = t, s.job?.promote(t));
  else {
    const l = new AbortController(), o = ut.epoch;
    let a;
    s = { abort: l, users: 0, priority: t, done: new Promise((f) => {
      a = f;
    }) };
    const u = s;
    qt.set(e, u), u.job = ga.add(async () => {
      let f;
      try {
        const h = await fetch(e, {
          signal: l.signal,
          credentials: "same-origin",
          priority: u.priority === "normal" ? "auto" : u.priority
        });
        if (!h.ok) throw new Error("Preview unavailable");
        const p = await h.blob();
        !l.signal.aborted && o === ut.epoch && (f = p, ut.set(e, p, o));
      } catch {
      } finally {
        qt.get(e) === u && qt.delete(e), a(f);
      }
    }, t), u.job.done.then(() => a(void 0));
  }
  const i = s;
  i.users++;
  let r = !1;
  return {
    done: i.done,
    cancel: () => {
      r || (r = !0, --i.users === 0 && (i.abort.abort(), i.job?.cancel(), qt.get(e) === i && qt.delete(e)));
    }
  };
}
const ma = ["src", "alt"], va = {
  key: 1,
  class: "sg-thumb-placeholder"
}, qs = /* @__PURE__ */ Xt({
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
    const n = e, s = t, i = /* @__PURE__ */ z(""), r = /* @__PURE__ */ z(), l = /* @__PURE__ */ z(!1);
    let o, a = 0;
    function u() {
      o?.(), i.value && URL.revokeObjectURL(i.value), i.value = "";
    }
    Ke(
      () => n.url,
      (p) => {
        const m = ++a;
        u(), l.value = !1;
        const U = ut.get(p) ?? (n.cachedFallbackUrl && ut.get(n.cachedFallbackUrl));
        if (U) {
          i.value = URL.createObjectURL(U);
          return;
        }
        const I = jr(p, n.priority);
        o = I.cancel, I.done.then((L) => {
          m === a && (L ? i.value = URL.createObjectURL(L) : l.value = !0);
        });
      },
      { immediate: !0 }
    );
    function f(p) {
      if (p.target !== r.value) return;
      const m = p.target;
      s("ready", { width: m.naturalWidth, height: m.naturalHeight });
    }
    function h(p) {
      p.target === r.value && (i.value && URL.revokeObjectURL(i.value), i.value = "", l.value = !0, ut.delete(n.url), n.cachedFallbackUrl && ut.delete(n.cachedFallbackUrl));
    }
    return Zn(() => {
      a++, u();
    }), (p, m) => i.value ? (P(), F("img", {
      ref_key: "currentImage",
      ref: r,
      key: i.value,
      src: i.value,
      alt: e.alt,
      decoding: "async",
      onError: h,
      onLoad: f
    }, null, 40, ma)) : e.quiet ? ne("", !0) : (P(), F("span", va, D(l.value ? "Image unavailable" : "Loading preview…"), 1));
  }
}), ya = ["aria-label", "onClick"], ba = { class: "sg-card-tools" }, wa = ["title"], _a = ["aria-label", "checked", "onChange"], xa = ["aria-label", "onClick"], ka = /* @__PURE__ */ Xt({
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
    const s = e, i = n, r = /* @__PURE__ */ z(), l = /* @__PURE__ */ z(1e3), o = /* @__PURE__ */ z(600), a = /* @__PURE__ */ z(s.initialScroll), u = ue(() => s.large ? 284 : 164), f = ue(
      () => sa(
        s.images.length,
        l.value,
        o.value,
        a.value,
        u.value
      )
    ), h = ue(
      () => s.images.slice(f.value.start, f.value.end)
    );
    let p;
    function m() {
      r.value && (l.value = r.value.clientWidth || 1e3, o.value = r.value.clientHeight || 600);
    }
    function U() {
      i("position", {
        scroll: a.value,
        width: l.value,
        cell: u.value
      });
    }
    function I() {
      a.value = r.value?.scrollTop ?? 0, U(), f.value.end >= s.images.length && s.hasMore && i("more");
    }
    return Ke(
      () => [s.images, s.large],
      async ([L, R], [S, C]) => {
        const A = Lr(
          S,
          L,
          a.value,
          l.value,
          C ? 284 : 164,
          R ? 284 : 164
        );
        await Dt(), r.value && (r.value.scrollTop = A, a.value = A, U());
      },
      { flush: "pre" }
    ), Us(() => {
      m(), r.value && (r.value.scrollTop = a.value), p = new ResizeObserver(m), r.value && p.observe(r.value);
    }), Zn(() => p?.disconnect()), t({
      top: () => {
        r.value && (r.value.scrollTop = 0, a.value = 0, U());
      }
    }), (L, R) => (P(), F("div", {
      ref_key: "el",
      ref: r,
      class: "sg-grid-scroll",
      "data-testid": "image-grid",
      onScrollPassive: I
    }, [
      k("div", {
        class: "sg-grid-space",
        style: Tt({ height: f.value.totalHeight + "px" })
      }, [
        k("div", {
          class: "sg-grid",
          style: Tt({
            gridTemplateColumns: `repeat(${f.value.columns}, minmax(0,1fr))`,
            transform: `translateY(${f.value.offset}px)`
          })
        }, [
          (P(!0), F(Y, null, Le(h.value, (S) => (P(), F("article", {
            key: S.id,
            class: ct(["sg-card", { "sg-checked": e.checked.has(S.id) }]),
            style: Tt({ height: u.value + "px" })
          }, [
            k("button", {
              class: "sg-thumb-button",
              "data-action": "view",
              "aria-label": "View " + S.name,
              onClick: (C) => i("view", S.id)
            }, [
              Ce(qs, {
                url: e.api.imageURL(S, "thumbnail", e.large ? 512 : 256),
                alt: S.name
              }, null, 8, ["url", "alt"])
            ], 8, ya),
            k("div", ba, [
              k("label", {
                title: "Select " + S.name
              }, [
                k("input", {
                  type: "checkbox",
                  "aria-label": "Select " + S.name,
                  checked: e.checked.has(S.id),
                  onChange: (C) => i("check", S.id)
                }, null, 40, _a),
                R[1] || (R[1] = ge(" Compare", -1))
              ], 8, wa),
              k("button", {
                class: ct(["sg-pin", { "sg-pinned": e.pinned.has(S.id) }]),
                "aria-label": "Pin " + S.name + " as reference",
                onClick: (C) => i("pin", S.id)
              }, D(e.pinned.has(S.id) ? "Pinned" : "Pin"), 11, xa)
            ])
          ], 6))), 128))
        ], 4)
      ], 4),
      e.hasMore ? (P(), F("button", {
        key: 0,
        class: "sg-load",
        onClick: R[0] || (R[0] = (S) => i("more"))
      }, " Load more images ")) : ne("", !0)
    ], 544));
  }
}), Sa = ["data-side", "data-image"], Ca = { class: "sg-pane-caption" }, Ia = ["aria-label", "disabled"], Ma = ["href", "download", "aria-label"], Ta = {
  key: 0,
  class: "sg-unavailable",
  role: "status"
}, $a = ["src", "alt"], Aa = {
  key: 2,
  class: "sg-surface-status"
}, Oa = ["title"], Ea = { class: "sg-zoom-status" }, Ra = {
  class: "sg-quality-status",
  role: "status"
}, $i = /* @__PURE__ */ Xt({
  __name: "ImagePane",
  props: {
    image: {},
    api: {},
    side: {},
    transform: {},
    models: {},
    modelStatus: {},
    unavailable: { type: Boolean },
    deferHeavy: { type: Boolean }
  },
  emits: ["transform", "original", "originalReady"],
  setup(e, { expose: t, emit: n }) {
    const s = e, i = n, r = /* @__PURE__ */ z(), l = /* @__PURE__ */ z(), o = /* @__PURE__ */ z(640), a = /* @__PURE__ */ z(600), u = /* @__PURE__ */ z({ width: 0, height: 0 }), f = /* @__PURE__ */ z(!1), h = /* @__PURE__ */ z("display"), p = ue(() => s.image && (h.value === "original" || !s.deferHeavy) ? s.api.imageURL(s.image, h.value) : void 0);
    let m = 0, U = !1;
    const I = /* @__PURE__ */ z(!1), L = /* @__PURE__ */ z(!1);
    let R, S = null, C = null, A = null, H = null, le = null;
    function J(V, de) {
      return V.scale === de.scale && V.x === de.x && V.y === de.y;
    }
    function N() {
      H !== null && cancelAnimationFrame(H), H = null, le = null, C = null, A = null, S = null;
    }
    function ee() {
      H !== null && cancelAnimationFrame(H), H = null, le = null;
      const V = C;
      C = null, V && (A = V, i("transform", V));
    }
    function Q(V) {
      C = V, H === null && (H = requestAnimationFrame(ee));
    }
    function G() {
      return C ?? A ?? s.transform;
    }
    Ke(
      () => s.transform,
      (V) => {
        A && J(V, A) ? A = null : N();
      },
      { deep: !0, flush: "sync" }
    );
    const et = ue(
      () => Math.min(
        o.value / (u.value.width || s.image?.width || 1024),
        a.value / (u.value.height || s.image?.height || 1024)
      )
    ), tt = ue(
      () => (u.value.width || s.image?.width || 1024) * et.value
    ), me = ue(
      () => (u.value.height || s.image?.height || 1024) * et.value
    ), Ne = ue(() => ({
      width: tt.value + "px",
      height: me.value + "px",
      transform: `translate(-50%,-50%) translate(${s.transform.x * tt.value * s.transform.scale}px,${s.transform.y * me.value * s.transform.scale}px) scale(${s.transform.scale})`
    }));
    Ke(
      [() => s.image?.id, () => s.image?.revision],
      () => {
        N(), r.value?.removeAttribute("src"), f.value = !1, I.value = !1, L.value = !1, u.value = { width: 0, height: 0 }, h.value = "display", U = !1;
      }
    ), Ke(p, () => {
      m++, r.value?.removeAttribute("src"), f.value = !1, I.value = !1;
    }, { flush: "sync" });
    function nt() {
      !s.image || h.value === "original" && f.value || (h.value = "original", U = !0);
    }
    async function We(V) {
      const de = m;
      if (V.target !== r.value) return;
      const c = V.target;
      if (c.decode)
        try {
          await c.decode();
        } catch {
          de === m && c === r.value && (I.value = !0);
          return;
        }
      if (!(de !== m || c !== r.value)) {
        if (h.value === "original" || !s.image?.width || !s.image?.height)
          u.value = { width: c.naturalWidth, height: c.naturalHeight };
        else {
          const { width: d, height: g } = s.image, x = Math.abs(g * c.naturalHeight - d * c.naturalWidth) <= Math.max(d, g), y = Math.abs(d * c.naturalHeight - g * c.naturalWidth) <= Math.max(d, g);
          x && !y && (u.value = { width: g, height: d });
        }
        f.value = !0, h.value === "original" && U && (U = !1, i("originalReady"));
      }
    }
    function fe(V) {
      f.value || (L.value = !0, !s.image?.width && V.width && V.height && (u.value = V));
    }
    function Re(V) {
      V.target === r.value && (I.value = !0);
    }
    function Ct() {
      U = !1;
    }
    t({ originalScale: ue(() => 1 / et.value), requestOriginal: nt, cancelOriginalScale: Ct });
    function st(V) {
      U = !1;
      const de = G(), c = de.scale, d = Math.min(
        32,
        Math.max(0.25, c * Math.exp(-V.deltaY * 15e-4))
      ), g = le ??= l.value.getBoundingClientRect(), x = (V.clientX - g.left - g.width / 2) / tt.value, y = (V.clientY - g.top - g.height / 2) / me.value;
      Q({
        scale: d,
        x: de.x + x * (1 / d - 1 / c),
        y: de.y + y * (1 / d - 1 / c)
      });
    }
    function Ae(V) {
      V.button !== 0 || S || (U = !1, S = { x: V.clientX, y: V.clientY, pointerId: V.pointerId }, l.value?.setPointerCapture(V.pointerId));
    }
    function je(V) {
      if (!S || S.pointerId !== V.pointerId) return;
      const de = G();
      Q({
        ...de,
        x: de.x + (V.clientX - S.x) / (tt.value * de.scale),
        y: de.y + (V.clientY - S.y) / (me.value * de.scale)
      }), S.x = V.clientX, S.y = V.clientY;
    }
    function ve(V) {
      !S || S.pointerId !== V.pointerId || (je(V), S = null, ee());
    }
    function we(V) {
      !S || S.pointerId !== V.pointerId || (S = null, ee());
    }
    function xe() {
      U = !1, N(), i("transform", { scale: 1, x: 0, y: 0 });
    }
    function De() {
      N(), nt(), i("original");
    }
    function ze() {
      l.value && (o.value = l.value.clientWidth || 640, a.value = l.value.clientHeight || 600);
    }
    return Us(() => {
      ze(), R = new ResizeObserver(ze), l.value && R.observe(l.value);
    }), Zn(() => {
      m++, N(), r.value?.removeAttribute("src"), R?.disconnect();
    }), (V, de) => (P(), F("section", {
      class: "sg-image-pane",
      "data-side": e.side,
      "data-image": e.image?.id
    }, [
      k("div", Ca, [
        k("strong", null, D(e.side === "left" ? "Reference · pinned" : "Image"), 1),
        k("span", null, D(e.image?.name ?? "No candidate"), 1),
        k("button", {
          "aria-label": "Show " + e.side + " original pixels",
          disabled: !e.image,
          onClick: De
        }, " 1:1 ", 8, Ia),
        e.image ? (P(), F("a", {
          key: 0,
          href: e.api.imageURL(e.image, "download"),
          download: e.image.name,
          "aria-label": "Download " + e.side + " original image"
        }, "Download original", 8, Ma)) : ne("", !0)
      ]),
      e.unavailable ? (P(), F("p", Ta, " No longer present in this folder. The selected image is kept in place; the displayed image may be cached. ")) : ne("", !0),
      k("div", {
        ref_key: "surface",
        ref: l,
        class: "sg-image-surface",
        onWheel: Pr(st, ["prevent"]),
        onPointerdown: Ae,
        onPointermove: je,
        onPointerup: ve,
        onPointercancel: we,
        onLostpointercapture: we,
        onDblclick: xe
      }, [
        e.image && !f.value ? (P(), F("div", {
          key: e.image.id + e.image.revision + "preview",
          class: "sg-image-preview",
          style: Tt(Ne.value)
        }, [
          Ce(qs, {
            url: e.api.imageURL(e.image, "thumbnail", 512),
            "cached-fallback-url": e.api.imageURL(e.image, "thumbnail", 256),
            alt: e.image.name + " · preview",
            quiet: "",
            priority: "high",
            onReady: fe
          }, null, 8, ["url", "cached-fallback-url", "alt"])
        ], 4)) : ne("", !0),
        e.image && p.value && !I.value ? (P(), F("img", {
          class: "sg-original",
          ref_key: "currentImage",
          ref: r,
          key: e.image.id + e.image.revision + h.value,
          src: p.value,
          alt: e.image.name,
          style: Tt({ ...Ne.value, opacity: f.value ? 1 : 0 }),
          fetchpriority: "high",
          loading: "eager",
          draggable: "false",
          decoding: "async",
          onLoad: We,
          onError: Re
        }, null, 44, $a)) : ne("", !0),
        e.image ? ne("", !0) : (P(), F("p", Aa, D(I.value ? "Image unavailable. It may have been moved or overwritten." : "No comparison candidate. Select more images or change the candidate range."), 1))
      ], 544),
      k("div", {
        class: "sg-models",
        title: e.models.join(", ")
      }, [
        k("span", null, D(e.models.length ? "Model: " + e.models.join(" · ") : e.modelStatus), 1),
        k("span", Ea, D(Math.round(e.transform.scale * 100)) + "% of fit", 1),
        k("span", Ra, D(f.value ? h.value === "original" ? "Original" : "High quality WebP" : I.value ? h.value === "original" ? "Original unavailable" : "High quality WebP unavailable" : h.value === "original" ? "Preview · Loading original…" : e.deferHeavy ? "Preview · Waiting for navigation…" : "Preview · Loading high quality WebP…"), 1)
      ], 8, Oa)
    ], 8, Sa));
  }
}), ln = /* @__PURE__ */ Xt({
  __name: "LazyDetails",
  setup(e) {
    const t = /* @__PURE__ */ z(!1);
    function n(s) {
      t.value = s.currentTarget.open;
    }
    return (s, i) => (P(), F("details", { onToggle: n }, [
      k("summary", null, [
        ni(s.$slots, "summary")
      ]),
      t.value ? ni(s.$slots, "default", {}, void 0, void 0, 0) : ne("", !0)
    ], 32));
  }
}), Pa = {
  class: "sg-metadata",
  "aria-label": "Saved settings"
}, La = { class: "sg-panel-heading" }, Fa = { key: 0 }, Na = {
  key: 2,
  role: "status"
}, ja = { class: "sg-muted" }, Da = ["aria-label", "value", "onChange"], Ua = { value: "__auto__" }, Ha = ["value"], Ka = ["onClick"], Va = ["onClick"], Ba = ["onClick"], qa = /* @__PURE__ */ Xt({
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
    const n = e, s = t, i = /* @__PURE__ */ z(""), r = ue(
      () => n.compare && n.left && n.right ? da(n.left, n.right, {
        manualMatches: n.manualMatches
      }) : null
    );
    async function l(f) {
      try {
        await navigator.clipboard.writeText(
          typeof f == "string" ? f : gt(f)
        ), i.value = "Copied";
      } catch {
        i.value = "Clipboard unavailable. Select the displayed text to copy.";
      }
    }
    function o(f) {
      const h = n.manualMatches[f], p = h === void 0 ? r.value?.matches.find((m) => m.leftKey === f)?.rightKey : h;
      return n.right?.nodes.find((m) => m.key === p);
    }
    function a(f) {
      return `{
  "prompt": ` + (f.rawText.prompt ?? gt(f.raw.prompt)) + `,
  "workflow": ` + (f.rawText.workflow ?? gt(f.raw.workflow)) + `
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
    return (f, h) => (P(), F("aside", Pa, [
      k("div", La, [
        k("h2", null, D(e.compare ? "Saved setting differences" : "Saved settings"), 1),
        k("button", {
          "aria-label": "Close settings",
          onClick: h[0] || (h[0] = (p) => s("close"))
        }, "×")
      ]),
      h[14] || (h[14] = k("p", { class: "sg-muted" }, " Saved values only. Prompt text is excluded from identified differences. Unknown widget values keep their saved positions. ", -1)),
      e.loading ? (P(), F("p", Fa, "Loading saved metadata…")) : ne("", !0),
      e.left?.status === "invalid" || e.right?.status === "invalid" ? (P(), F("button", {
        key: 1,
        onClick: h[1] || (h[1] = (p) => s("retry"))
      }, " Reload saved settings ")) : ne("", !0),
      i.value ? (P(), F("p", Na, D(i.value), 1)) : ne("", !0),
      r.value ? (P(), F(Y, { key: 3 }, [
        k("p", {
          class: ct(["sg-result", { "sg-warning": r.value.status === "incomplete" }])
        }, D(r.value.status === "same" ? "No differences in comparable saved settings." : r.value.status === "different" ? r.value.differences.length + " saved differences" : "Incomplete comparison. Missing or ambiguous settings are not equal."), 3),
        k("p", ja, D(r.value.excludedPromptFields) + " identified prompt fields excluded. ", 1),
        (P(!0), F(Y, null, Le(r.value.warnings, (p, m) => (P(), F("p", {
          key: m,
          class: "sg-warning"
        }, D(p), 1))), 128)),
        k("button", {
          onClick: h[2] || (h[2] = (p) => l(r.value.differences))
        }, " Copy differences (left → right) "),
        Ce(ln, { class: "sg-node-mapping" }, {
          summary: Ge(() => [...h[5] || (h[5] = [
            ge("Review / change node matching", -1)
          ])]),
          default: Ge(() => [
            h[9] || (h[9] = k("p", { class: "sg-muted" }, " One-to-one within the same saved source. Auto matches are candidates, not proof of workflow identity. ", -1)),
            (P(!0), F(Y, null, Le(e.left?.nodes, (p) => (P(), F("label", {
              key: p.key,
              class: "sg-match-row"
            }, [
              k("span", null, D(p.source) + " · " + D(p.id) + " · " + D(p.title || p.type), 1),
              k("select", {
                "aria-label": "Match " + p.key,
                value: e.manualMatches[p.key] === null ? "__none__" : e.manualMatches[p.key] ?? "__auto__",
                onChange: (m) => u(m, p.key)
              }, [
                k("option", Ua, " Auto: " + D(r.value.matches.find((m) => m.leftKey === p.key)?.rightKey ?? "unmatched"), 1),
                h[6] || (h[6] = k("option", { value: "__none__" }, "Leave unmatched", -1)),
                (P(!0), F(Y, null, Le(e.right?.nodes.filter(
                  (m) => m.source === p.source
                ), (m) => (P(), F("option", {
                  key: m.key,
                  value: m.key
                }, D(m.id) + " · " + D(m.title || m.type), 9, Ha))), 128))
              ], 40, Da),
              Ce(ln, null, {
                summary: Ge(() => [...h[7] || (h[7] = [
                  ge("Left saved values", -1)
                ])]),
                default: Ge(() => [
                  k("pre", null, D(Ye(gt)(
                    p.fields.map((m) => ({ name: m.label, value: m.value }))
                  )), 1)
                ]),
                _: 2
              }, 1024),
              o(p.key) ? (P(), xt(ln, { key: 0 }, {
                summary: Ge(() => [...h[8] || (h[8] = [
                  ge("Right candidate saved values", -1)
                ])]),
                default: Ge(() => [
                  k("pre", null, D(Ye(gt)(
                    o(p.key)?.fields.map((m) => ({
                      name: m.label,
                      value: m.value
                    }))
                  )), 1)
                ]),
                _: 2
              }, 1024)) : ne("", !0)
            ]))), 128)),
            (P(!0), F(Y, null, Le(r.value.unmatchedLeft, (p) => (P(), F("p", {
              key: p.node.key,
              class: "sg-warning"
            }, " Unmatched left " + D(p.node.key) + " · candidates: " + D(p.candidateKeys.join(", ") || "none"), 1))), 128)),
            (P(!0), F(Y, null, Le(r.value.unmatchedRight, (p) => (P(), F("p", {
              key: p.node.key,
              class: "sg-warning"
            }, " Unmatched right " + D(p.node.key), 1))), 128))
          ]),
          _: 1
        }),
        (P(!0), F(Y, null, Le(r.value.differences, (p) => (P(), F("article", {
          key: p.id,
          class: "sg-difference"
        }, [
          k("strong", null, D(p.leftNode?.title || p.rightNode?.title || p.leftNode?.type || p.rightNode?.type), 1),
          k("small", null, D(p.source) + " · " + D(p.leftNode?.id ?? "—") + " → " + D(p.rightNode?.id ?? "—") + " · " + D(p.kind), 1),
          k("h3", null, D(p.label), 1),
          k("label", null, [
            h[10] || (h[10] = ge("Left reference ", -1)),
            k("button", {
              onClick: (m) => l(p.left)
            }, "Copy left", 8, Ka)
          ]),
          k("pre", null, D(Ye(gt)(p.left)), 1),
          k("label", null, [
            h[11] || (h[11] = ge("Right image ", -1)),
            k("button", {
              onClick: (m) => l(p.right)
            }, "Copy right", 8, Va)
          ]),
          k("pre", null, D(Ye(gt)(p.right)), 1)
        ]))), 128))
      ], 64)) : e.right ? (P(), F(Y, { key: 4 }, [
        k("p", null, "Status: " + D(e.right.status), 1),
        (P(!0), F(Y, null, Le(e.right.warnings, (p) => (P(), F("p", {
          key: p,
          class: "sg-warning"
        }, D(p), 1))), 128)),
        (P(!0), F(Y, null, Le(e.right.nodes, (p) => (P(), xt(ln, {
          key: p.key
        }, {
          summary: Ge(() => [
            ge(D(p.source) + " · " + D(p.id) + " · " + D(p.title || p.type), 1)
          ]),
          default: Ge(() => [
            (P(!0), F(Y, null, Le(p.fields, (m) => (P(), F("div", {
              key: m.key,
              class: "sg-field"
            }, [
              k("label", null, [
                ge(D(m.label) + " ", 1),
                k("button", {
                  onClick: (U) => l(m.value)
                }, "Copy value", 8, Ba)
              ]),
              k("pre", null, D(Ye(gt)(m.value)), 1)
            ]))), 128))
          ]),
          _: 2
        }, 1024))), 128))
      ], 64)) : ne("", !0),
      e.right ? (P(), xt(ln, { key: 5 }, {
        summary: Ge(() => [...h[12] || (h[12] = [
          ge("Original saved JSON (may include prompts)", -1)
        ])]),
        default: Ge(() => [
          h[13] || (h[13] = k("p", { class: "sg-muted" }, " Copied JSON may contain prompt text. Nothing is sent outside this ComfyUI server. ", -1)),
          e.left && e.compare ? (P(), F("button", {
            key: 0,
            onClick: h[3] || (h[3] = (p) => l(a(e.left)))
          }, " Copy original left JSON")) : ne("", !0),
          k("button", {
            onClick: h[4] || (h[4] = (p) => l(a(e.right)))
          }, " Copy original " + D(e.compare ? "right " : "") + "JSON ", 1),
          k("pre", null, D(Ye(gt)(e.right.raw)), 1)
        ]),
        _: 1
      })) : ne("", !0)
    ]));
  }
});
function Wa(e, t, n) {
  return t < 0 || t >= e ? [] : [n, 2 * n, 3 * n, -n].map((s) => t + s).filter((s) => s >= 0 && s < e);
}
class za {
  requests = /* @__PURE__ */ new Map();
  update(t) {
    const n = new Set(t.slice(0, 4));
    for (const [s, i] of this.requests)
      n.has(s) || (i.cancel(), this.requests.delete(s));
    for (const s of n)
      this.requests.has(s) || this.requests.set(s, jr(s, "low"));
  }
  clear() {
    for (const t of this.requests.values()) t.cancel();
    this.requests.clear();
  }
}
const Ga = { class: "sg-header" }, Ja = { class: "sg-folder" }, Ya = ["value", "disabled"], Xa = ["value"], Qa = {
  key: 0,
  class: "sg-error",
  role: "alert"
}, Za = { class: "sg-toolbar" }, ec = { class: "sg-size" }, tc = ["aria-pressed"], nc = ["aria-pressed"], sc = ["disabled"], ic = {
  key: 1,
  class: "sg-empty"
}, rc = { class: "sg-grid-footer" }, lc = { class: "sg-toolbar sg-view-toolbar" }, oc = { class: "sg-reference-select" }, ac = ["value"], cc = ["value"], uc = {
  key: 0,
  value: "prompt"
}, fc = ["disabled"], dc = { class: "sg-position" }, hc = ["disabled"], pc = { key: 2 }, gc = ["checked"], mc = ["aria-expanded"], vc = ["aria-pressed"], yc = ["aria-label"], bc = {
  key: 0,
  class: "sg-candidate-bar"
}, wc = ["aria-label", "aria-pressed", "onClick"], _c = ["disabled"], xc = {
  key: 1,
  class: "sg-helper",
  role: "status"
}, kc = { class: "sg-view-footer" }, Sc = { key: 0 }, Cc = 250, Ic = /* @__PURE__ */ Xt({
  __name: "Gallery",
  props: {
    api: {}
  },
  setup(e) {
    const t = e, n = /* @__PURE__ */ Nn(Zo()), s = /* @__PURE__ */ z([]), i = /* @__PURE__ */ z(!0), r = /* @__PURE__ */ z(!1), l = /* @__PURE__ */ z(!1);
    let o;
    function a() {
      clearTimeout(o), l.value = !1;
    }
    function u(b) {
      const v = n.mode === "single" ? n.currentId : n.rightId;
      ea(n, b), v !== (n.mode === "single" ? n.currentId : n.rightId) && (clearTimeout(o), l.value = !0, o = setTimeout(() => {
        l.value = !1;
      }, Cc));
    }
    function f(b) {
      a(), n.mode === "single" ? n.currentId = b : n.rightId = b;
    }
    const h = new za();
    let p = -1, m = "grid", U = 1;
    const I = /* @__PURE__ */ z(), L = /* @__PURE__ */ z(), R = /* @__PURE__ */ z(), S = /* @__PURE__ */ z(), C = /* @__PURE__ */ z(), A = /* @__PURE__ */ z(), H = /* @__PURE__ */ z({ scroll: 0, width: 1e3, cell: 284 }), le = /* @__PURE__ */ z(), J = /* @__PURE__ */ z(0), N = new ra(t.api, n, () => J.value++), ee = /* @__PURE__ */ z(""), Q = /* @__PURE__ */ z(""), G = /* @__PURE__ */ z(!1), et = /* @__PURE__ */ z(!1);
    let tt = !1;
    const me = /* @__PURE__ */ Nn(/* @__PURE__ */ new Map()), Ne = /* @__PURE__ */ new Map();
    let nt, We = new AbortController(), fe = 0, Re = 0, Ct;
    const st = ue(() => (J.value, N.loading)), Ae = ue(() => (J.value, N.error)), je = ue(() => (J.value, N.cursor !== null)), ve = ue(() => n.leftId ? n.records.get(n.leftId) : void 0), we = ue(() => {
      const b = n.mode === "single" ? n.currentId : n.rightId;
      return b ? n.records.get(b) : void 0;
    }), xe = (b) => b.id + ":" + b.revision, De = ue(
      () => ve.value ? me.get(xe(ve.value)) : void 0
    ), ze = ue(
      () => we.value ? me.get(xe(we.value)) : void 0
    ), V = ue(
      () => De.value ? Ii(De.value) : []
    ), de = ue(
      () => ze.value ? Ii(ze.value) : []
    ), c = ue(() => {
      const b = /* @__PURE__ */ new Set([...n.pinned, ...n.checked]);
      return n.leftId && b.add(n.leftId), [...b].map((v) => n.records.get(v)).filter((v) => !!v);
    }), d = ue(
      () => n.mode === "single" ? n.images : Fn(n)
    ), g = ue(
      () => d.value.findIndex(
        (b) => b.id === (n.mode === "single" ? n.currentId : n.rightId)
      )
    ), x = ue(() => {
      const b = Math.max(0, g.value);
      return d.value.slice(Math.max(0, b - 7), b + 8);
    });
    Ke(
      () => [n.mode, g.value, x.value.map(xe).join(",")],
      () => {
        const b = g.value;
        n.mode === m && p >= 0 && b !== p ? U = b < p ? -1 : 1 : n.mode !== m && (U = 1), p = b, m = n.mode, h.update(n.mode === "grid" ? [] : Wa(d.value.length, b, U).map((v) => t.api.imageURL(d.value[v], "thumbnail", 512)));
      },
      { flush: "post" }
    ), Ke(
      () => n.images,
      (b, v) => {
        n.mode !== "grid" && (H.value.scroll = Lr(
          v,
          b,
          H.value.scroll,
          H.value.width,
          H.value.cell,
          H.value.cell
        ));
      }
    ), Ke(
      () => [
        n.mode,
        n.rightId,
        n.currentId,
        r.value,
        x.value.map((b) => b.id).join(",")
      ],
      async () => {
        await Dt();
        const b = le.value, v = b?.querySelector("[aria-pressed=true]");
        b && v && (b.scrollLeft = ia(
          b.clientWidth,
          b.scrollLeft,
          v.offsetLeft,
          v.offsetWidth
        ));
      }
    ), Ke(
      () => n.mode,
      async (b) => {
        b === "grid" && a();
        const v = fe;
        await Dt();
        const E = I.value;
        if (!n.open || v !== fe || b !== n.mode || !E || E.contains(document.activeElement)) return;
        ((b === "grid" ? E.querySelector("[data-action=view]") : L.value) ?? E.querySelector("[data-action=close]"))?.focus({ preventScroll: !0 });
      }
    );
    function y(b) {
      return b ? "No identifiable saved model information" : "Loading saved model information…";
    }
    async function w(b, v = "view") {
      if (!b) return;
      const E = xe(b);
      if (me.has(E)) return me.get(E);
      const ye = Ne.get(E);
      if (ye)
        return ye.owners.add(v), ye.promise;
      const Zt = fe, en = new AbortController(), Rt = en.signal, Pt = t.api.metadata(b, Rt).then(Ci).catch(
        (ht) => Rt.aborted ? void 0 : Ci({
          status: "invalid",
          prompt: null,
          workflow: null,
          warnings: [ht instanceof Error ? ht.message : "Metadata unavailable"]
        })
      ).then((ht) => {
        if (ht && Zt === fe && !Rt.aborted && (me.set(E, ht), me.size > 200)) {
          const tn = /* @__PURE__ */ new Set([
            ve.value && xe(ve.value),
            we.value && xe(we.value),
            E
          ]);
          for (const nn of me.keys())
            if (!tn.has(nn)) {
              me.delete(nn);
              break;
            }
        }
        return Zt === fe && !Rt.aborted ? ht : void 0;
      }).finally(() => {
        Ne.get(E)?.promise === Pt && Ne.delete(E);
      });
      return Ne.set(E, { promise: Pt, abort: en, owners: /* @__PURE__ */ new Set([v]) }), Pt;
    }
    function T(b, v = /* @__PURE__ */ new Set()) {
      for (const [E, ye] of Ne)
        v.has(E) || (ye.owners.delete(b), ye.owners.size || (ye.abort.abort(), Ne.delete(E)));
    }
    function $() {
      clearTimeout(nt), T("view"), T("search");
    }
    function M() {
      return (n.mode === "grid" ? [] : n.mode === "compare" ? [ve.value, we.value] : [we.value]).filter((b) => !!b);
    }
    function _() {
      clearTimeout(nt);
      for (const b of M()) w(b);
    }
    Ke(
      () => [n.mode, ve.value?.id, ve.value?.revision, we.value?.id, we.value?.revision, l.value],
      () => {
        clearTimeout(nt);
        const b = M();
        T("view", new Set(b.map(xe)));
        const v = b.filter((E) => !l.value || n.mode === "compare" && E.id === ve.value?.id);
        v.length && (nt = setTimeout(() => {
          for (const E of v) w(E);
        }, 0)), n.manualMatches = {};
      },
      { flush: "post" }
    ), Ke(() => n.panel, (b) => {
      b && _();
    });
    async function j() {
      if (n.open) return;
      fe++, tt = !1, We = new AbortController(), n.open = !0, H.value.scroll = 0, ee.value = "", Q.value = "", await Dt(), I.value?.showModal(), et.value = !0;
      const b = fe;
      try {
        const v = await t.api.bootstrap(n.folderId, We.signal);
        if (b !== fe) return;
        s.value = [v.folder], N.adoptBootstrap(v.folder.id, v.page), tt = !0, t.api.folders(We.signal).then((E) => {
          b === fe && (s.value = E.folders.some((ye) => ye.id === n.folderId) ? E.folders : [v.folder, ...E.folders]);
        }).catch(() => {
          b === fe && (Q.value = "Folder discovery unavailable. The selected folder remains usable.");
        });
      } catch (v) {
        b === fe && (ee.value = v instanceof Error ? v.message : "Folders unavailable");
      } finally {
        b === fe && (et.value = !1);
      }
      b === fe && (Ct = setInterval(() => {
        document.hidden || B();
      }, 5e3));
    }
    function O() {
      a(), h.clear(), fe++, Re++, G.value = !1, We.abort(), $(), N.dispose(), clearInterval(Ct), Ne.clear(), me.clear(), ut.clear(), I.value?.close(), ta(n), Q.value = "", Dt(() => C.value?.focus());
    }
    async function K(b) {
      a(), $(), h.clear(), H.value.scroll = 0, Re++, G.value = !1, Q.value = "", await N.selectFolder(b.target.value);
    }
    async function B() {
      n.open && (tt ? await N.refresh() : (O(), await j()));
    }
    function W(b) {
      a(), r.value = !1, n.currentId = b, n.mode = "single", n.panel = !1, On(n, "right", { scale: 1, x: 0, y: 0 });
    }
    function te(b) {
      n.checked.has(b) ? n.checked.delete(b) : n.checked.add(b);
    }
    function X() {
      T("search"), Re++, G.value = !1, Q.value = "";
    }
    Ke(() => [ve.value?.id, ve.value?.revision], X, {
      flush: "sync"
    });
    function oe(b) {
      a(), X(), n.pinned.add(b), n.leftId = b, n.mode = "compare", n.scope = n.checked.size > 1 ? "checked" : "folder", n.rightId = b, n.manualMatches = {}, n.panel = !1, Q.value = "", n.transforms = {
        left: { scale: 1, x: 0, y: 0 },
        right: { scale: 1, x: 0, y: 0 }
      };
    }
    function pe() {
      const b = n.images.find((v) => n.checked.has(v.id))?.id ?? n.currentId ?? n.images[0]?.id;
      b && oe(b);
    }
    function Oe() {
      G.value && X(), Fn(n).some((b) => b.id === n.rightId) || (n.rightId = Fn(n)[0]?.id ?? null);
    }
    function Pe(b) {
      n.linked ? (R.value?.requestOriginal(), S.value?.requestOriginal()) : (b === "left" ? R.value : S.value)?.requestOriginal();
      const v = {
        left: { scale: R.value?.originalScale ?? 1, x: 0, y: 0 },
        right: { scale: S.value?.originalScale ?? 1, x: 0, y: 0 }
      };
      n.linked ? n.transforms = v : n.transforms[b] = v[b];
    }
    function Ue(b) {
      const v = b === "left" ? R.value : S.value;
      n.transforms[b] = { scale: v?.originalScale ?? 1, x: 0, y: 0 };
    }
    function Qt(b, v) {
      (n.linked || b === "left") && R.value?.cancelOriginalScale(), (n.linked || b === "right") && S.value?.cancelOriginalScale(), On(n, b, v);
    }
    function Ie() {
      R.value?.cancelOriginalScale(), S.value?.cancelOriginalScale(), On(n, "left", { scale: 1, x: 0, y: 0 }), On(n, "right", { scale: 1, x: 0, y: 0 });
    }
    function He() {
      for (const b of [ve.value, we.value])
        b && (me.delete(xe(b)), w(b));
    }
    function Sn(b, v) {
      if (v === void 0) delete n.manualMatches[b];
      else {
        if (v !== null)
          for (const [E, ye] of Object.entries(n.manualMatches))
            E !== b && ye === v && (n.manualMatches[E] = null);
        n.manualMatches[b] = v;
      }
    }
    async function Cn() {
      const b = ve.value;
      if (!b || G.value) return;
      const v = ++Re;
      G.value = !0, Q.value = "Checking saved text in " + n.images.length + " loaded images…";
      const E = await w(b, "search");
      if (v !== Re) return;
      if (!E || Mi(E, E) === null) {
        Q.value = "Saved prompt text cannot be identified. Normal comparison remains available.", G.value = !1;
        return;
      }
      const ye = n.images.slice();
      let Zt = 0, en = 0, Rt = 0;
      const Pt = /* @__PURE__ */ new Set();
      async function ht() {
        for (; Zt < ye.length && v === Re; ) {
          const tn = ye[Zt++];
          if (tn.id === b.id) continue;
          const nn = await w(tn, "search");
          if (v !== Re) return;
          const Ws = nn ? Mi(E, nn) : null;
          Ws === !0 && Pt.add(tn.id), Ws === null && en++, Rt++, Q.value = `Checking saved text… ${Rt}/${ye.length - 1}`;
        }
      }
      await Promise.all([ht(), ht()]), v === Re && (G.value = !1, n.promptIds = Pt, n.scope = "prompt", Oe(), Q.value = `${Pt.size} exact saved-text matches; ${en} unknown. Checked ${ye.length} loaded images${je.value ? " only. Load more in the grid to search further" : ""}. Saved text does not prove the final generated prompt.`, G.value = !1);
    }
    function Dr(b) {
      if (!n.open) return;
      b.stopPropagation();
      const v = b.target;
      if (b.key === "Escape") {
        b.preventDefault(), n.panel ? n.panel = !1 : n.mode !== "grid" ? n.mode = "grid" : O();
        return;
      }
      ["INPUT", "SELECT", "TEXTAREA"].includes(v.tagName) || n.mode !== "grid" && (b.key === "ArrowLeft" || b.key === "ArrowRight") && (b.preventDefault(), u(b.key === "ArrowLeft" ? -1 : 1));
    }
    const In = () => {
      B();
    };
    return Us(() => {
      t.api.comfy.addEventListener?.("executed", In), document.addEventListener("visibilitychange", In);
    }), Zn(() => {
      a(), fe++, Re++, h.clear(), ut.clear(), clearInterval(Ct), We.abort(), $(), N.dispose(), t.api.comfy.removeEventListener?.("executed", In), document.removeEventListener("visibilitychange", In);
    }), (b, v) => (P(), F(Y, null, [
      k("button", {
        ref_key: "launcher",
        ref: C,
        "data-action": "open",
        "data-testid": "gallery-launcher",
        class: "sg-launcher",
        "aria-label": "Open Gallery",
        onClick: j
      }, [...v[24] || (v[24] = [
        k("span", { "aria-hidden": "true" }, "▧", -1),
        ge(" Gallery ", -1)
      ])], 512),
      n.open ? (P(), F("dialog", {
        key: 0,
        ref_key: "dialog",
        ref: I,
        class: ct(["sg-dialog", { "sg-single-view": n.mode === "single" }]),
        "aria-label": "Shiba Gallery",
        onKeydown: Dr,
        onCancel: v[23] || (v[23] = Pr(() => {
        }, ["prevent"]))
      }, [
        k("header", Ga, [
          v[27] || (v[27] = k("div", { class: "sg-brand" }, [
            k("span", { class: "sg-mark" }, "▧"),
            k("div", null, [
              k("strong", null, "Gallery"),
              k("small", null, "SHIBA · READ ONLY")
            ])
          ], -1)),
          n.mode !== "grid" ? (P(), F("button", {
            key: 0,
            "data-action": "grid",
            onClick: v[0] || (v[0] = (E) => n.mode = "grid")
          }, " ← Grid")) : ne("", !0),
          k("label", Ja, [
            v[25] || (v[25] = ge("Folder ", -1)),
            k("select", {
              "data-testid": "folder-select",
              "aria-label": "Output folder",
              value: n.folderId,
              disabled: et.value,
              onChange: K
            }, [
              (P(!0), F(Y, null, Le(s.value, (E) => (P(), F("option", {
                key: E.id,
                value: E.id
              }, D(E.name), 9, Xa))), 128))
            ], 40, Ya)
          ]),
          v[28] || (v[28] = k("span", { class: "sg-header-spacer" }, null, -1)),
          k("span", {
            class: ct(["sg-live", { "sg-working": st.value }])
          }, [
            v[26] || (v[26] = k("i", null, null, -1)),
            ge(D(st.value ? "Syncing" : "Auto refresh"), 1)
          ], 2),
          k("button", {
            "data-action": "close",
            class: "sg-close",
            "aria-label": "Close Gallery",
            onClick: O
          }, " Close × ")
        ]),
        ee.value || Ae.value ? (P(), F("div", Qa, [
          ge(D(ee.value || Ae.value) + " ", 1),
          k("button", { onClick: B }, "Retry")
        ])) : ne("", !0),
        n.mode === "grid" ? (P(), F(Y, { key: 1 }, [
          k("div", Za, [
            k("span", null, [
              ge(D(n.images.length) + D(je.value ? "+" : "") + " images ", 1),
              v[29] || (v[29] = k("small", null, "· newest file modification first", -1))
            ]),
            k("div", ec, [
              k("button", {
                "aria-pressed": !i.value,
                onClick: v[1] || (v[1] = (E) => i.value = !1)
              }, "Small", 8, tc),
              k("button", {
                "aria-pressed": i.value,
                onClick: v[2] || (v[2] = (E) => i.value = !0)
              }, "Large", 8, nc)
            ]),
            v[30] || (v[30] = k("span", { class: "sg-header-spacer" }, null, -1)),
            k("span", null, D(n.checked.size) + " selected", 1),
            k("button", {
              class: "sg-primary",
              disabled: n.images.length < 2,
              "data-action": "compare",
              onClick: pe
            }, " Compare selected ", 8, sc)
          ]),
          n.images.length ? (P(), xt(ka, {
            key: 0,
            ref_key: "grid",
            ref: A,
            images: n.images,
            checked: n.checked,
            pinned: n.pinned,
            large: i.value,
            api: e.api,
            "has-more": je.value,
            "initial-scroll": H.value.scroll,
            onPosition: v[3] || (v[3] = (E) => H.value = E),
            onView: W,
            onPin: oe,
            onCheck: te,
            onMore: v[4] || (v[4] = (E) => Ye(N).loadMore())
          }, null, 8, ["images", "checked", "pinned", "large", "api", "has-more", "initial-scroll"])) : (P(), F("div", ic, [
            v[31] || (v[31] = k("span", { class: "sg-empty-icon" }, "▧", -1)),
            k("h2", null, D(st.value || et.value ? "Opening your output…" : "No images in this folder"), 1),
            v[32] || (v[32] = k("p", null, " Images stay in their original folder. Gallery never deletes or changes them. ", -1))
          ])),
          k("footer", rc, [
            v[33] || (v[33] = k("span", null, "Click an image to inspect · check images to compare · Pin keeps the left image fixed", -1)),
            k("button", {
              onClick: v[5] || (v[5] = (E) => A.value?.top())
            }, "↑ Newest")
          ])
        ], 64)) : (P(), F(Y, { key: 2 }, [
          k("div", lc, [
            n.mode === "compare" ? (P(), F(Y, { key: 0 }, [
              k("label", oc, [
                v[34] || (v[34] = ge("Reference ", -1)),
                k("select", {
                  "aria-label": "Reference image",
                  value: n.leftId,
                  onChange: v[6] || (v[6] = (E) => oe(E.target.value))
                }, [
                  (P(!0), F(Y, null, Le(c.value, (E) => (P(), F("option", {
                    key: E.id,
                    value: E.id
                  }, D(E.name) + D(n.pinned.has(E.id) ? " · pinned" : " · checked"), 9, cc))), 128))
                ], 40, ac)
              ]),
              k("label", null, [
                v[37] || (v[37] = ge("Candidates ", -1)),
                Al(k("select", {
                  "onUpdate:modelValue": v[7] || (v[7] = (E) => n.scope = E),
                  "aria-label": "Candidate range",
                  onChange: Oe
                }, [
                  v[35] || (v[35] = k("option", { value: "folder" }, "This folder", -1)),
                  v[36] || (v[36] = k("option", { value: "checked" }, "Checked images", -1)),
                  n.scope === "prompt" ? (P(), F("option", uc, " Matching saved text ")) : ne("", !0)
                ], 544), [
                  [Bo, n.scope]
                ])
              ])
            ], 64)) : (P(), F("button", {
              key: 1,
              "data-action": "pin",
              class: "sg-primary",
              onClick: v[8] || (v[8] = (E) => n.currentId && oe(n.currentId))
            }, " Pin as reference")),
            k("button", {
              "data-action": "previous",
              "aria-label": "Previous image",
              disabled: g.value <= 0,
              onClick: v[9] || (v[9] = (E) => u(-1))
            }, " ← Previous", 8, fc),
            k("span", dc, D(g.value < 0 ? "—" : g.value + 1) + " / " + D(d.value.length) + D(je.value ? "+" : ""), 1),
            k("button", {
              "data-action": "next",
              "aria-label": "Next image",
              disabled: g.value < 0 || g.value >= d.value.length - 1,
              onClick: v[10] || (v[10] = (E) => u(1))
            }, " Next →", 8, hc),
            v[39] || (v[39] = k("span", { class: "sg-header-spacer" }, null, -1)),
            n.mode === "compare" ? (P(), F("label", pc, [
              k("input", {
                type: "checkbox",
                "aria-label": "Link zoom and pan",
                checked: n.linked,
                onChange: v[11] || (v[11] = (E) => Ye(na)(n, E.target.checked))
              }, null, 40, gc),
              v[38] || (v[38] = ge(" Link zoom / pan", -1))
            ])) : ne("", !0),
            n.mode === "single" ? (P(), F("button", {
              key: 3,
              "data-action": "candidates",
              "aria-expanded": r.value,
              onClick: v[12] || (v[12] = (E) => r.value = !r.value)
            }, D(r.value ? "Hide candidates" : "Show candidates"), 9, mc)) : ne("", !0),
            n.mode === "single" && !r.value && je.value ? (P(), F("button", {
              key: 4,
              onClick: v[13] || (v[13] = (E) => Ye(N).loadMore())
            }, "Load more")) : ne("", !0),
            k("button", { onClick: Ie }, "Fit"),
            k("button", {
              "aria-pressed": n.panel,
              "data-action": "settings",
              onClick: v[14] || (v[14] = (E) => n.panel = !n.panel)
            }, D(n.mode === "compare" ? "Differences" : "Settings"), 9, vc)
          ]),
          k("div", {
            ref_key: "viewer",
            ref: L,
            class: "sg-view-body",
            role: "region",
            "aria-label": n.mode === "compare" ? "Image comparison" : "Image viewer",
            tabindex: "-1"
          }, [
            k("div", {
              class: ct(["sg-image-pair", { "sg-single": n.mode === "single" }])
            }, [
              n.mode === "compare" ? (P(), xt($i, {
                key: 0,
                ref_key: "leftPane",
                ref: R,
                image: ve.value,
                unavailable: !!n.leftId && n.unavailable.has(n.leftId),
                api: e.api,
                side: "left",
                transform: n.transforms.left,
                models: V.value,
                "model-status": y(De.value),
                onOriginal: v[15] || (v[15] = (E) => Pe("left")),
                onOriginalReady: v[16] || (v[16] = (E) => Ue("left")),
                onTransform: v[17] || (v[17] = (E) => Qt("left", E))
              }, null, 8, ["image", "unavailable", "api", "transform", "models", "model-status"])) : ne("", !0),
              Ce($i, {
                ref_key: "rightPane",
                ref: S,
                image: we.value,
                "defer-heavy": l.value,
                unavailable: !!we.value && n.unavailable.has(we.value.id),
                api: e.api,
                side: "right",
                transform: n.transforms.right,
                models: de.value,
                "model-status": y(ze.value),
                onOriginal: v[18] || (v[18] = (E) => Pe("right")),
                onOriginalReady: v[19] || (v[19] = (E) => Ue("right")),
                onTransform: v[20] || (v[20] = (E) => Qt("right", E))
              }, null, 8, ["image", "defer-heavy", "unavailable", "api", "transform", "models", "model-status"])
            ], 2),
            n.panel ? (P(), xt(qa, {
              key: 0,
              left: De.value,
              right: ze.value,
              compare: n.mode === "compare",
              "manual-matches": n.manualMatches,
              loading: !ze.value || n.mode === "compare" && !De.value,
              onClose: v[21] || (v[21] = (E) => n.panel = !1),
              onMatch: Sn,
              onRetry: He
            }, null, 8, ["left", "right", "compare", "manual-matches", "loading"])) : ne("", !0)
          ], 8, yc),
          n.mode === "compare" || r.value ? (P(), F("div", bc, [
            k("div", {
              ref_key: "candidateRow",
              ref: le,
              class: "sg-candidates",
              "aria-label": "Image candidates"
            }, [
              (P(!0), F(Y, null, Le(x.value, (E) => (P(), F("button", {
                key: E.id,
                class: ct(["sg-candidate", {
                  "sg-current": E.id === (n.mode === "single" ? n.currentId : n.rightId)
                }]),
                "aria-label": "Choose " + E.name,
                "aria-pressed": E.id === (n.mode === "single" ? n.currentId : n.rightId),
                onClick: (ye) => f(E.id)
              }, [
                Ce(qs, {
                  url: e.api.imageURL(E, "thumbnail", 256),
                  alt: E.name,
                  priority: "low"
                }, null, 8, ["url", "alt"])
              ], 10, wc))), 128))
            ], 512),
            je.value ? (P(), F("button", {
              key: 0,
              onClick: v[22] || (v[22] = (E) => Ye(N).loadMore())
            }, "Load more")) : ne("", !0),
            n.mode === "compare" ? (P(), F("button", {
              key: 1,
              disabled: G.value,
              onClick: Cn
            }, D(G.value ? "Checking text…" : "Find matching saved text"), 9, _c)) : ne("", !0)
          ])) : ne("", !0),
          Q.value ? (P(), F("p", xc, D(Q.value), 1)) : ne("", !0),
          k("footer", kc, [
            v[40] || (v[40] = ge(" Wheel to zoom · drag to pan · double-click to fit · ← → to navigate ", -1)),
            n.mode === "compare" ? (P(), F("span", Sc, "· Linking copies the left view; different sizes use normalized image positions.")) : ne("", !0)
          ])
        ], 64))
      ], 34)) : ne("", !0)
    ], 64));
  }
});
function Ai(e, t) {
  const n = new URL(e), s = n.pathname.lastIndexOf("/extensions/");
  if (s < 0)
    throw new Error("Gallery must load from the ComfyUI extensions directory.");
  return n.pathname = n.pathname.slice(0, s) + "/scripts/" + t + ".js", n.search = "", n.hash = "", n.href;
}
class Mc {
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
  bootstrap(t = "", n) {
    const s = new URLSearchParams({ limit: "60" });
    return t && s.set("folder_id", t), this.get("/bootstrap?" + s, n, "high");
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
const ys = import.meta.url;
async function Tc() {
  const [{ app: e }, { api: t }] = await Promise.all([
    import(
      /* @vite-ignore */
      Ai(ys, "app")
    ),
    import(
      /* @vite-ignore */
      Ai(ys, "api")
    )
  ]);
  e.registerExtension({
    name: "shiba.gallery",
    setup() {
      if (document.getElementById("shiba-gallery-root")) return;
      const n = document.createElement("link");
      n.rel = "stylesheet", n.href = new URL("./shiba-gallery.css", ys).href, n.dataset.shibaGallery = "true", document.head.append(n);
      const s = document.createElement("div");
      s.id = "shiba-gallery-root", document.body.append(s), Yo(Ic, { api: new Mc(t) }).mount(s);
    }
  });
}
Tc().catch(
  () => console.error(
    "[Shiba Gallery] Could not register the gallery extension. Check ComfyUI extension loading and proxy paths."
  )
);
