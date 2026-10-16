const B = globalThis,
  G =
    B.ShadowRoot &&
    (B.ShadyCSS === void 0 || B.ShadyCSS.nativeShadow) &&
    "adoptedStyleSheets" in Document.prototype &&
    "replace" in CSSStyleSheet.prototype,
  X = /* @__PURE__ */ Symbol(),
  mo = /* @__PURE__ */ new WeakMap();
let Co = class {
  constructor(o, e, r) {
    if (((this._$cssResult$ = !0), r !== X))
      throw Error(
        "CSSResult is not constructable. Use `unsafeCSS` or `css` instead.",
      );
    ((this.cssText = o), (this.t = e));
  }
  get styleSheet() {
    let o = this.o;
    const e = this.t;
    if (G && o === void 0) {
      const r = e !== void 0 && e.length === 1;
      (r && (o = mo.get(e)),
        o === void 0 &&
          ((this.o = o = new CSSStyleSheet()).replaceSync(this.cssText),
          r && mo.set(e, o)));
    }
    return o;
  }
  toString() {
    return this.cssText;
  }
};
const p = (i) => new Co(typeof i == "string" ? i : i + "", void 0, X),
  h = (i, ...o) => {
    const e =
      i.length === 1
        ? i[0]
        : o.reduce(
            (r, t, s) =>
              r +
              ((a) => {
                if (a._$cssResult$ === !0) return a.cssText;
                if (typeof a == "number") return a;
                throw Error(
                  "Value passed to 'css' function must be a 'css' function result: " +
                    a +
                    ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.",
                );
              })(t) +
              i[s + 1],
            i[0],
          );
    return new Co(e, i, X);
  },
  Ko = (i, o) => {
    if (G)
      i.adoptedStyleSheets = o.map((e) =>
        e instanceof CSSStyleSheet ? e : e.styleSheet,
      );
    else
      for (const e of o) {
        const r = document.createElement("style"),
          t = B.litNonce;
        (t !== void 0 && r.setAttribute("nonce", t),
          (r.textContent = e.cssText),
          i.appendChild(r));
      }
  },
  ho = G
    ? (i) => i
    : (i) =>
        i instanceof CSSStyleSheet
          ? ((o) => {
              let e = "";
              for (const r of o.cssRules) e += r.cssText;
              return p(e);
            })(i)
          : i;
const {
    is: Jo,
    defineProperty: Zo,
    getOwnPropertyDescriptor: Go,
    getOwnPropertyNames: Xo,
    getOwnPropertySymbols: Yo,
    getPrototypeOf: oe,
  } = Object,
  j = globalThis,
  vo = j.trustedTypes,
  ee = vo ? vo.emptyScript : "",
  re = j.reactiveElementPolyfillSupport,
  M = (i, o) => i,
  L = {
    toAttribute(i, o) {
      switch (o) {
        case Boolean:
          i = i ? ee : null;
          break;
        case Object:
        case Array:
          i = i == null ? i : JSON.stringify(i);
      }
      return i;
    },
    fromAttribute(i, o) {
      let e = i;
      switch (o) {
        case Boolean:
          e = i !== null;
          break;
        case Number:
          e = i === null ? null : Number(i);
          break;
        case Object:
        case Array:
          try {
            e = JSON.parse(i);
          } catch {
            e = null;
          }
      }
      return e;
    },
  },
  Y = (i, o) => !Jo(i, o),
  po = {
    attribute: !0,
    type: String,
    converter: L,
    reflect: !1,
    useDefault: !1,
    hasChanged: Y,
  };
((Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata")),
  (j.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap()));
let E = class extends HTMLElement {
  static addInitializer(o) {
    (this._$Ei(), (this.l ??= []).push(o));
  }
  static get observedAttributes() {
    return (this.finalize(), this._$Eh && [...this._$Eh.keys()]);
  }
  static createProperty(o, e = po) {
    if (
      (e.state && (e.attribute = !1),
      this._$Ei(),
      this.prototype.hasOwnProperty(o) && ((e = Object.create(e)).wrapped = !0),
      this.elementProperties.set(o, e),
      !e.noAccessor)
    ) {
      const r = /* @__PURE__ */ Symbol(),
        t = this.getPropertyDescriptor(o, r, e);
      t !== void 0 && Zo(this.prototype, o, t);
    }
  }
  static getPropertyDescriptor(o, e, r) {
    const { get: t, set: s } = Go(this.prototype, o) ?? {
      get() {
        return this[e];
      },
      set(a) {
        this[e] = a;
      },
    };
    return {
      get: t,
      set(a) {
        const d = t?.call(this);
        (s?.call(this, a), this.requestUpdate(o, d, r));
      },
      configurable: !0,
      enumerable: !0,
    };
  }
  static getPropertyOptions(o) {
    return this.elementProperties.get(o) ?? po;
  }
  static _$Ei() {
    if (this.hasOwnProperty(M("elementProperties"))) return;
    const o = oe(this);
    (o.finalize(),
      o.l !== void 0 && (this.l = [...o.l]),
      (this.elementProperties = new Map(o.elementProperties)));
  }
  static finalize() {
    if (this.hasOwnProperty(M("finalized"))) return;
    if (
      ((this.finalized = !0), this._$Ei(), this.hasOwnProperty(M("properties")))
    ) {
      const e = this.properties,
        r = [...Xo(e), ...Yo(e)];
      for (const t of r) this.createProperty(t, e[t]);
    }
    const o = this[Symbol.metadata];
    if (o !== null) {
      const e = litPropertyMetadata.get(o);
      if (e !== void 0)
        for (const [r, t] of e) this.elementProperties.set(r, t);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, r] of this.elementProperties) {
      const t = this._$Eu(e, r);
      t !== void 0 && this._$Eh.set(t, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(o) {
    const e = [];
    if (Array.isArray(o)) {
      const r = new Set(o.flat(1 / 0).reverse());
      for (const t of r) e.unshift(ho(t));
    } else o !== void 0 && e.push(ho(o));
    return e;
  }
  static _$Eu(o, e) {
    const r = e.attribute;
    return r === !1
      ? void 0
      : typeof r == "string"
        ? r
        : typeof o == "string"
          ? o.toLowerCase()
          : void 0;
  }
  constructor() {
    (super(),
      (this._$Ep = void 0),
      (this.isUpdatePending = !1),
      (this.hasUpdated = !1),
      (this._$Em = null),
      this._$Ev());
  }
  _$Ev() {
    ((this._$ES = new Promise((o) => (this.enableUpdating = o))),
      (this._$AL = /* @__PURE__ */ new Map()),
      this._$E_(),
      this.requestUpdate(),
      this.constructor.l?.forEach((o) => o(this)));
  }
  addController(o) {
    ((this._$EO ??= /* @__PURE__ */ new Set()).add(o),
      this.renderRoot !== void 0 && this.isConnected && o.hostConnected?.());
  }
  removeController(o) {
    this._$EO?.delete(o);
  }
  _$E_() {
    const o = /* @__PURE__ */ new Map(),
      e = this.constructor.elementProperties;
    for (const r of e.keys())
      this.hasOwnProperty(r) && (o.set(r, this[r]), delete this[r]);
    o.size > 0 && (this._$Ep = o);
  }
  createRenderRoot() {
    const o =
      this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return (Ko(o, this.constructor.elementStyles), o);
  }
  connectedCallback() {
    ((this.renderRoot ??= this.createRenderRoot()),
      this.enableUpdating(!0),
      this._$EO?.forEach((o) => o.hostConnected?.()));
  }
  enableUpdating(o) {}
  disconnectedCallback() {
    this._$EO?.forEach((o) => o.hostDisconnected?.());
  }
  attributeChangedCallback(o, e, r) {
    this._$AK(o, r);
  }
  _$ET(o, e) {
    const r = this.constructor.elementProperties.get(o),
      t = this.constructor._$Eu(o, r);
    if (t !== void 0 && r.reflect === !0) {
      const s = (
        r.converter?.toAttribute !== void 0 ? r.converter : L
      ).toAttribute(e, r.type);
      ((this._$Em = o),
        s == null ? this.removeAttribute(t) : this.setAttribute(t, s),
        (this._$Em = null));
    }
  }
  _$AK(o, e) {
    const r = this.constructor,
      t = r._$Eh.get(o);
    if (t !== void 0 && this._$Em !== t) {
      const s = r.getPropertyOptions(t),
        a =
          typeof s.converter == "function"
            ? { fromAttribute: s.converter }
            : s.converter?.fromAttribute !== void 0
              ? s.converter
              : L;
      this._$Em = t;
      const d = a.fromAttribute(e, s.type);
      ((this[t] = d ?? this._$Ej?.get(t) ?? d), (this._$Em = null));
    }
  }
  requestUpdate(o, e, r, t = !1, s) {
    if (o !== void 0) {
      const a = this.constructor;
      if (
        (t === !1 && (s = this[o]),
        (r ??= a.getPropertyOptions(o)),
        !(
          (r.hasChanged ?? Y)(s, e) ||
          (r.useDefault &&
            r.reflect &&
            s === this._$Ej?.get(o) &&
            !this.hasAttribute(a._$Eu(o, r)))
        ))
      )
        return;
      this.C(o, e, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(o, e, { useDefault: r, reflect: t, wrapped: s }, a) {
    (r &&
      !(this._$Ej ??= /* @__PURE__ */ new Map()).has(o) &&
      (this._$Ej.set(o, a ?? e ?? this[o]), s !== !0 || a !== void 0)) ||
      (this._$AL.has(o) ||
        (this.hasUpdated || r || (e = void 0), this._$AL.set(o, e)),
      t === !0 &&
        this._$Em !== o &&
        (this._$Eq ??= /* @__PURE__ */ new Set()).add(o));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const o = this.scheduleUpdate();
    return (o != null && (await o), !this.isUpdatePending);
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (((this.renderRoot ??= this.createRenderRoot()), this._$Ep)) {
        for (const [t, s] of this._$Ep) this[t] = s;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0)
        for (const [t, s] of r) {
          const { wrapped: a } = s,
            d = this[t];
          a !== !0 ||
            this._$AL.has(t) ||
            d === void 0 ||
            this.C(t, void 0, s, d);
        }
    }
    let o = !1;
    const e = this._$AL;
    try {
      ((o = this.shouldUpdate(e)),
        o
          ? (this.willUpdate(e),
            this._$EO?.forEach((r) => r.hostUpdate?.()),
            this.update(e))
          : this._$EM());
    } catch (r) {
      throw ((o = !1), this._$EM(), r);
    }
    o && this._$AE(e);
  }
  willUpdate(o) {}
  _$AE(o) {
    (this._$EO?.forEach((e) => e.hostUpdated?.()),
      this.hasUpdated || ((this.hasUpdated = !0), this.firstUpdated(o)),
      this.updated(o));
  }
  _$EM() {
    ((this._$AL = /* @__PURE__ */ new Map()), (this.isUpdatePending = !1));
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(o) {
    return !0;
  }
  update(o) {
    ((this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e]))),
      this._$EM());
  }
  updated(o) {}
  firstUpdated(o) {}
};
((E.elementStyles = []),
  (E.shadowRootOptions = { mode: "open" }),
  (E[M("elementProperties")] = /* @__PURE__ */ new Map()),
  (E[M("finalized")] = /* @__PURE__ */ new Map()),
  re?.({ ReactiveElement: E }),
  (j.reactiveElementVersions ??= []).push("2.1.2"));
const oo = globalThis,
  uo = (i) => i,
  D = oo.trustedTypes,
  fo = D ? D.createPolicy("lit-html", { createHTML: (i) => i }) : void 0,
  zo = "$lit$",
  w = `lit$${Math.random().toFixed(9).slice(2)}$`,
  Eo = "?" + w,
  te = `<${Eo}>`,
  S = document,
  T = () => S.createComment(""),
  N = (i) => i === null || (typeof i != "object" && typeof i != "function"),
  eo = Array.isArray,
  ie = (i) => eo(i) || typeof i?.[Symbol.iterator] == "function",
  Q = `[ 	
\f\r]`,
  P = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
  bo = /-->/g,
  yo = />/g,
  $ = RegExp(
    `>|${Q}(?:([^\\s"'>=/]+)(${Q}*=${Q}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,
    "g",
  ),
  wo = /'/g,
  ko = /"/g,
  Uo = /^(?:script|style|textarea|title)$/i,
  se =
    (i) =>
    (o, ...e) => ({ _$litType$: i, strings: o, values: e }),
  v = se(1),
  k = /* @__PURE__ */ Symbol.for("lit-noChange"),
  g = /* @__PURE__ */ Symbol.for("lit-nothing"),
  $o = /* @__PURE__ */ new WeakMap(),
  A = S.createTreeWalker(S, 129);
function Ho(i, o) {
  if (!eo(i) || !i.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return fo !== void 0 ? fo.createHTML(o) : o;
}
const ae = (i, o) => {
  const e = i.length - 1,
    r = [];
  let t,
    s = o === 2 ? "<svg>" : o === 3 ? "<math>" : "",
    a = P;
  for (let d = 0; d < e; d++) {
    const n = i[d];
    let l,
      m,
      c = -1,
      f = 0;
    for (; f < n.length && ((a.lastIndex = f), (m = a.exec(n)), m !== null);)
      ((f = a.lastIndex),
        a === P
          ? m[1] === "!--"
            ? (a = bo)
            : m[1] !== void 0
              ? (a = yo)
              : m[2] !== void 0
                ? (Uo.test(m[2]) && (t = RegExp("</" + m[2], "g")), (a = $))
                : m[3] !== void 0 && (a = $)
          : a === $
            ? m[0] === ">"
              ? ((a = t ?? P), (c = -1))
              : m[1] === void 0
                ? (c = -2)
                : ((c = a.lastIndex - m[2].length),
                  (l = m[1]),
                  (a = m[3] === void 0 ? $ : m[3] === '"' ? ko : wo))
            : a === ko || a === wo
              ? (a = $)
              : a === bo || a === yo
                ? (a = P)
                : ((a = $), (t = void 0)));
    const y = a === $ && i[d + 1].startsWith("/>") ? " " : "";
    s +=
      a === P
        ? n + te
        : c >= 0
          ? (r.push(l), n.slice(0, c) + zo + n.slice(c) + w + y)
          : n + w + (c === -2 ? d : y);
  }
  return [
    Ho(
      i,
      s + (i[e] || "<?>") + (o === 2 ? "</svg>" : o === 3 ? "</math>" : ""),
    ),
    r,
  ];
};
let W = class Po {
  constructor({ strings: o, _$litType$: e }, r) {
    let t;
    this.parts = [];
    let s = 0,
      a = 0;
    const d = o.length - 1,
      n = this.parts,
      [l, m] = ae(o, e);
    if (
      ((this.el = Po.createElement(l, r)),
      (A.currentNode = this.el.content),
      e === 2 || e === 3)
    ) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (t = A.nextNode()) !== null && n.length < d;) {
      if (t.nodeType === 1) {
        if (t.hasAttributes())
          for (const c of t.getAttributeNames())
            if (c.endsWith(zo)) {
              const f = m[a++],
                y = t.getAttribute(c).split(w),
                R = /([.?@])?(.*)/.exec(f);
              (n.push({
                type: 1,
                index: s,
                name: R[2],
                strings: y,
                ctor:
                  R[1] === "." ? de : R[1] === "?" ? le : R[1] === "@" ? ce : I,
              }),
                t.removeAttribute(c));
            } else
              c.startsWith(w) &&
                (n.push({ type: 6, index: s }), t.removeAttribute(c));
        if (Uo.test(t.tagName)) {
          const c = t.textContent.split(w),
            f = c.length - 1;
          if (f > 0) {
            t.textContent = D ? D.emptyScript : "";
            for (let y = 0; y < f; y++)
              (t.append(c[y], T()),
                A.nextNode(),
                n.push({ type: 2, index: ++s }));
            t.append(c[f], T());
          }
        }
      } else if (t.nodeType === 8)
        if (t.data === Eo) n.push({ type: 2, index: s });
        else {
          let c = -1;
          for (; (c = t.data.indexOf(w, c + 1)) !== -1;)
            (n.push({ type: 7, index: s }), (c += w.length - 1));
        }
      s++;
    }
  }
  static createElement(o, e) {
    const r = S.createElement("template");
    return ((r.innerHTML = o), r);
  }
};
function U(i, o, e = i, r) {
  if (o === k) return o;
  let t = r !== void 0 ? e._$Co?.[r] : e._$Cl;
  const s = N(o) ? void 0 : o._$litDirective$;
  return (
    t?.constructor !== s &&
      (t?._$AO?.(!1),
      s === void 0 ? (t = void 0) : ((t = new s(i)), t._$AT(i, e, r)),
      r !== void 0 ? ((e._$Co ??= [])[r] = t) : (e._$Cl = t)),
    t !== void 0 && (o = U(i, t._$AS(i, o.values), t, r)),
    o
  );
}
let ne = class {
    constructor(o, e) {
      ((this._$AV = []),
        (this._$AN = void 0),
        (this._$AD = o),
        (this._$AM = e));
    }
    get parentNode() {
      return this._$AM.parentNode;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    u(o) {
      const {
          el: { content: e },
          parts: r,
        } = this._$AD,
        t = (o?.creationScope ?? S).importNode(e, !0);
      A.currentNode = t;
      let s = A.nextNode(),
        a = 0,
        d = 0,
        n = r[0];
      for (; n !== void 0;) {
        if (a === n.index) {
          let l;
          (n.type === 2
            ? (l = new ro(s, s.nextSibling, this, o))
            : n.type === 1
              ? (l = new n.ctor(s, n.name, n.strings, this, o))
              : n.type === 6 && (l = new ge(s, this, o)),
            this._$AV.push(l),
            (n = r[++d]));
        }
        a !== n?.index && ((s = A.nextNode()), a++);
      }
      return ((A.currentNode = S), t);
    }
    p(o) {
      let e = 0;
      for (const r of this._$AV)
        (r !== void 0 &&
          (r.strings !== void 0
            ? (r._$AI(o, r, e), (e += r.strings.length - 2))
            : r._$AI(o[e])),
          e++);
    }
  },
  ro = class Oo {
    get _$AU() {
      return this._$AM?._$AU ?? this._$Cv;
    }
    constructor(o, e, r, t) {
      ((this.type = 2),
        (this._$AH = g),
        (this._$AN = void 0),
        (this._$AA = o),
        (this._$AB = e),
        (this._$AM = r),
        (this.options = t),
        (this._$Cv = t?.isConnected ?? !0));
    }
    get parentNode() {
      let o = this._$AA.parentNode;
      const e = this._$AM;
      return (e !== void 0 && o?.nodeType === 11 && (o = e.parentNode), o);
    }
    get startNode() {
      return this._$AA;
    }
    get endNode() {
      return this._$AB;
    }
    _$AI(o, e = this) {
      ((o = U(this, o, e)),
        N(o)
          ? o === g || o == null || o === ""
            ? (this._$AH !== g && this._$AR(), (this._$AH = g))
            : o !== this._$AH && o !== k && this._(o)
          : o._$litType$ !== void 0
            ? this.$(o)
            : o.nodeType !== void 0
              ? this.T(o)
              : ie(o)
                ? this.k(o)
                : this._(o));
    }
    O(o) {
      return this._$AA.parentNode.insertBefore(o, this._$AB);
    }
    T(o) {
      this._$AH !== o && (this._$AR(), (this._$AH = this.O(o)));
    }
    _(o) {
      (this._$AH !== g && N(this._$AH)
        ? (this._$AA.nextSibling.data = o)
        : this.T(S.createTextNode(o)),
        (this._$AH = o));
    }
    $(o) {
      const { values: e, _$litType$: r } = o,
        t =
          typeof r == "number"
            ? this._$AC(o)
            : (r.el === void 0 &&
                (r.el = W.createElement(Ho(r.h, r.h[0]), this.options)),
              r);
      if (this._$AH?._$AD === t) this._$AH.p(e);
      else {
        const s = new ne(t, this),
          a = s.u(this.options);
        (s.p(e), this.T(a), (this._$AH = s));
      }
    }
    _$AC(o) {
      let e = $o.get(o.strings);
      return (e === void 0 && $o.set(o.strings, (e = new W(o))), e);
    }
    k(o) {
      eo(this._$AH) || ((this._$AH = []), this._$AR());
      const e = this._$AH;
      let r,
        t = 0;
      for (const s of o)
        (t === e.length
          ? e.push((r = new Oo(this.O(T()), this.O(T()), this, this.options)))
          : (r = e[t]),
          r._$AI(s),
          t++);
      t < e.length && (this._$AR(r && r._$AB.nextSibling, t), (e.length = t));
    }
    _$AR(o = this._$AA.nextSibling, e) {
      for (this._$AP?.(!1, !0, e); o !== this._$AB;) {
        const r = uo(o).nextSibling;
        (uo(o).remove(), (o = r));
      }
    }
    setConnected(o) {
      this._$AM === void 0 && ((this._$Cv = o), this._$AP?.(o));
    }
  },
  I = class {
    get tagName() {
      return this.element.tagName;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    constructor(o, e, r, t, s) {
      ((this.type = 1),
        (this._$AH = g),
        (this._$AN = void 0),
        (this.element = o),
        (this.name = e),
        (this._$AM = t),
        (this.options = s),
        r.length > 2 || r[0] !== "" || r[1] !== ""
          ? ((this._$AH = Array(r.length - 1).fill(new String())),
            (this.strings = r))
          : (this._$AH = g));
    }
    _$AI(o, e = this, r, t) {
      const s = this.strings;
      let a = !1;
      if (s === void 0)
        ((o = U(this, o, e, 0)),
          (a = !N(o) || (o !== this._$AH && o !== k)),
          a && (this._$AH = o));
      else {
        const d = o;
        let n, l;
        for (o = s[0], n = 0; n < s.length - 1; n++)
          ((l = U(this, d[r + n], e, n)),
            l === k && (l = this._$AH[n]),
            (a ||= !N(l) || l !== this._$AH[n]),
            l === g ? (o = g) : o !== g && (o += (l ?? "") + s[n + 1]),
            (this._$AH[n] = l));
      }
      a && !t && this.j(o);
    }
    j(o) {
      o === g
        ? this.element.removeAttribute(this.name)
        : this.element.setAttribute(this.name, o ?? "");
    }
  };
class de extends I {
  constructor() {
    (super(...arguments), (this.type = 3));
  }
  j(o) {
    this.element[this.name] = o === g ? void 0 : o;
  }
}
class le extends I {
  constructor() {
    (super(...arguments), (this.type = 4));
  }
  j(o) {
    this.element.toggleAttribute(this.name, !!o && o !== g);
  }
}
let ce = class extends I {
    constructor(o, e, r, t, s) {
      (super(o, e, r, t, s), (this.type = 5));
    }
    _$AI(o, e = this) {
      if ((o = U(this, o, e, 0) ?? g) === k) return;
      const r = this._$AH,
        t =
          (o === g && r !== g) ||
          o.capture !== r.capture ||
          o.once !== r.once ||
          o.passive !== r.passive,
        s = o !== g && (r === g || t);
      (t && this.element.removeEventListener(this.name, this, r),
        s && this.element.addEventListener(this.name, this, o),
        (this._$AH = o));
    }
    handleEvent(o) {
      typeof this._$AH == "function"
        ? this._$AH.call(this.options?.host ?? this.element, o)
        : this._$AH.handleEvent(o);
    }
  },
  ge = class {
    constructor(o, e, r) {
      ((this.element = o),
        (this.type = 6),
        (this._$AN = void 0),
        (this._$AM = e),
        (this.options = r));
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(o) {
      U(this, o);
    }
  };
const me = oo.litHtmlPolyfillSupport;
(me?.(W, ro), (oo.litHtmlVersions ??= []).push("3.3.3"));
const he = (i, o, e) => {
  const r = e?.renderBefore ?? o;
  let t = r._$litPart$;
  if (t === void 0) {
    const s = e?.renderBefore ?? null;
    r._$litPart$ = t = new ro(o.insertBefore(T(), s), s, void 0, e ?? {});
  }
  return (t._$AI(i), t);
};
const to = globalThis;
let u = class extends E {
  constructor() {
    (super(...arguments),
      (this.renderOptions = { host: this }),
      (this._$Do = void 0));
  }
  createRenderRoot() {
    const o = super.createRenderRoot();
    return ((this.renderOptions.renderBefore ??= o.firstChild), o);
  }
  update(o) {
    const e = this.render();
    (this.hasUpdated || (this.renderOptions.isConnected = this.isConnected),
      super.update(o),
      (this._$Do = he(e, this.renderRoot, this.renderOptions)));
  }
  connectedCallback() {
    (super.connectedCallback(), this._$Do?.setConnected(!0));
  }
  disconnectedCallback() {
    (super.disconnectedCallback(), this._$Do?.setConnected(!1));
  }
  render() {
    return k;
  }
};
((u._$litElement$ = !0),
  (u.finalized = !0),
  to.litElementHydrateSupport?.({ LitElement: u }));
const ve = to.litElementPolyfillSupport;
ve?.({ LitElement: u });
(to.litElementVersions ??= []).push("4.2.2");
const Mo = { ATTRIBUTE: 1, CHILD: 2 },
  To =
    (i) =>
    (...o) => ({ _$litDirective$: i, values: o });
let No = class {
  constructor(o) {}
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(o, e, r) {
    ((this._$Ct = o), (this._$AM = e), (this._$Ci = r));
  }
  _$AS(o, e) {
    return this.update(o, e);
  }
  update(o, e) {
    return this.render(...e);
  }
};
let K = class extends No {
  constructor(o) {
    if ((super(o), (this.it = g), o.type !== Mo.CHILD))
      throw Error(
        this.constructor.directiveName +
          "() can only be used in child bindings",
      );
  }
  render(o) {
    if (o === g || o == null) return ((this._t = void 0), (this.it = o));
    if (o === k) return o;
    if (typeof o != "string")
      throw Error(
        this.constructor.directiveName + "() called with a non-string value",
      );
    if (o === this.it) return this._t;
    this.it = o;
    const e = [o];
    return (
      (e.raw = e),
      (this._t = {
        _$litType$: this.constructor.resultType,
        strings: e,
        values: [],
      })
    );
  }
};
((K.directiveName = "unsafeHTML"), (K.resultType = 1));
const xo = To(K);
const pe = To(
    class extends No {
      constructor(i) {
        if (
          (super(i),
          i.type !== Mo.ATTRIBUTE ||
            i.name !== "class" ||
            i.strings?.length > 2)
        )
          throw Error(
            "`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.",
          );
      }
      render(i) {
        return (
          " " +
          Object.keys(i)
            .filter((o) => i[o])
            .join(" ") +
          " "
        );
      }
      update(i, [o]) {
        if (this.st === void 0) {
          ((this.st = /* @__PURE__ */ new Set()),
            i.strings !== void 0 &&
              (this.nt = new Set(
                i.strings
                  .join(" ")
                  .split(/\s/)
                  .filter((r) => r !== ""),
              )));
          for (const r in o) o[r] && !this.nt?.has(r) && this.st.add(r);
          return this.render(o);
        }
        const e = i.element.classList;
        for (const r of this.st) r in o || (e.remove(r), this.st.delete(r));
        for (const r in o) {
          const t = !!o[r];
          t === this.st.has(r) ||
            this.nt?.has(r) ||
            (t ? (e.add(r), this.st.add(r)) : (e.remove(r), this.st.delete(r)));
        }
        return k;
      }
    },
  ),
  Ro = h`:root,:host{--ogds-color-black-transparent-5:#00000003;--ogds-color-black-transparent-10:#0000001a;--ogds-color-black-transparent-20:#0003;--ogds-color-black-transparent-30:#0000004d;--ogds-color-black-transparent-40:#0006;--ogds-color-black-transparent-50:#00000080;--ogds-color-black-transparent-60:#0009;--ogds-color-black-transparent-70:#000000b3;--ogds-color-black-transparent-80:#000c;--ogds-color-black-transparent-90:#000000e6;--ogds-color-blue-cool-5:#e7f2f5;--ogds-color-blue-cool-10:#dae9ee;--ogds-color-blue-cool-20:#adcfdc;--ogds-color-blue-cool-30:#82b4c9;--ogds-color-blue-cool-40:#6499af;--ogds-color-blue-cool-50:#3a7d95;--ogds-color-blue-cool-60:#2e6276;--ogds-color-blue-cool-70:#224a58;--ogds-color-blue-cool-80:#14333d;--ogds-color-blue-cool-90:#0f191c;--ogds-color-blue-cool-vivid-5:#e1f3f8;--ogds-color-blue-cool-vivid-10:#c3ebfa;--ogds-color-blue-cool-vivid-20:#97d4ea;--ogds-color-blue-cool-vivid-30:#59b9de;--ogds-color-blue-cool-vivid-40:#28a0cb;--ogds-color-blue-cool-vivid-50:#0d7ea2;--ogds-color-blue-cool-vivid-60:#07648d;--ogds-color-blue-cool-vivid-70:#074b69;--ogds-color-blue-cool-vivid-80:#002d3f;--ogds-color-blue-warm-5:#ecf1f7;--ogds-color-blue-warm-10:#e1e7f1;--ogds-color-blue-warm-20:#bbcae4;--ogds-color-blue-warm-30:#98afd2;--ogds-color-blue-warm-40:#7292c7;--ogds-color-blue-warm-50:#4a77b4;--ogds-color-blue-warm-60:#345d96;--ogds-color-blue-warm-70:#2f4668;--ogds-color-blue-warm-80:#252f3e;--ogds-color-blue-warm-90:#13171f;--ogds-color-blue-warm-vivid-5:#edf5ff;--ogds-color-blue-warm-vivid-10:#d4e5ff;--ogds-color-blue-warm-vivid-20:#adcdff;--ogds-color-blue-warm-vivid-30:#81aefc;--ogds-color-blue-warm-vivid-40:#5994f6;--ogds-color-blue-warm-vivid-50:#2672de;--ogds-color-blue-warm-vivid-60:#0050d8;--ogds-color-blue-warm-vivid-70:#1a4480;--ogds-color-blue-warm-vivid-80:#162e51;--ogds-color-blue-5:#eff6fb;--ogds-color-blue-10:#d9e8f6;--ogds-color-blue-20:#aacdec;--ogds-color-blue-30:#73b3e7;--ogds-color-blue-40:#4f97d1;--ogds-color-blue-50:#2378c3;--ogds-color-blue-60:#2c608a;--ogds-color-blue-70:#274863;--ogds-color-blue-80:#1f303e;--ogds-color-blue-90:#11181d;--ogds-color-blue-vivid-5:#e8f5ff;--ogds-color-blue-vivid-10:#cfe8ff;--ogds-color-blue-vivid-20:#a1d3ff;--ogds-color-blue-vivid-30:#58b4ff;--ogds-color-blue-vivid-40:#2491ff;--ogds-color-blue-vivid-50:#0076d6;--ogds-color-blue-vivid-60:#005ea2;--ogds-color-blue-vivid-70:#0b4778;--ogds-color-blue-vivid-80:#112f4e;--ogds-color-cyan-5:#e7f6f8;--ogds-color-cyan-10:#ccecf2;--ogds-color-cyan-20:#99deea;--ogds-color-cyan-30:#5dc0d1;--ogds-color-cyan-40:#449dac;--ogds-color-cyan-50:#168092;--ogds-color-cyan-60:#2a646d;--ogds-color-cyan-70:#2c4a4e;--ogds-color-cyan-80:#203133;--ogds-color-cyan-90:#111819;--ogds-color-cyan-vivid-5:#e5faff;--ogds-color-cyan-vivid-10:#a8f2ff;--ogds-color-cyan-vivid-20:#52daf2;--ogds-color-cyan-vivid-30:#00bde3;--ogds-color-cyan-vivid-40:#009ec1;--ogds-color-cyan-vivid-50:#0081a1;--ogds-color-cyan-vivid-60:#00687d;--ogds-color-cyan-vivid-70:#0e4f5c;--ogds-color-cyan-vivid-80:#093b44;--ogds-color-transparent:#0000;--ogds-color-black:#000;--ogds-color-white:#fff;--ogds-color-gold-5:#f5f0e6;--ogds-color-gold-10:#f1e5cd;--ogds-color-gold-20:#dec69a;--ogds-color-gold-30:#c7a97b;--ogds-color-gold-40:#ad8b65;--ogds-color-gold-50:#8e704f;--ogds-color-gold-60:#6b5947;--ogds-color-gold-70:#4d4438;--ogds-color-gold-80:#322d26;--ogds-color-gold-90:#191714;--ogds-color-gold-vivid-5:#fef0c8;--ogds-color-gold-vivid-10:#ffe396;--ogds-color-gold-vivid-20:#ffbe2e;--ogds-color-gold-vivid-30:#e5a000;--ogds-color-gold-vivid-40:#c2850c;--ogds-color-gold-vivid-50:#936f38;--ogds-color-gold-vivid-60:#7a591a;--ogds-color-gold-vivid-70:#5c410a;--ogds-color-gold-vivid-80:#3b2b15;--ogds-color-gray-cool-1:#fbfcfd;--ogds-color-gray-cool-2:#f7f9fa;--ogds-color-gray-cool-3:#f5f6f7;--ogds-color-gray-cool-4:#f1f3f6;--ogds-color-gray-cool-5:#edeff0;--ogds-color-gray-cool-10:#dfe1e2;--ogds-color-gray-cool-20:#c6cace;--ogds-color-gray-cool-30:#a9aeb1;--ogds-color-gray-cool-40:#8d9297;--ogds-color-gray-cool-50:#71767a;--ogds-color-gray-cool-60:#565c65;--ogds-color-gray-cool-70:#3d4551;--ogds-color-gray-cool-80:#2d2e2f;--ogds-color-gray-cool-90:#1c1d1f;--ogds-color-gray-warm-1:#fcfcfb;--ogds-color-gray-warm-2:#f9f9f7;--ogds-color-gray-warm-3:#f6f6f2;--ogds-color-gray-warm-4:#f5f5f0;--ogds-color-gray-warm-5:#f0f0ec;--ogds-color-gray-warm-10:#e6e6e2;--ogds-color-gray-warm-20:#cac9c0;--ogds-color-gray-warm-30:#afaea2;--ogds-color-gray-warm-40:#929285;--ogds-color-gray-warm-50:#76766a;--ogds-color-gray-warm-60:#5d5d52;--ogds-color-gray-warm-70:#454540;--ogds-color-gray-warm-80:#2e2e2a;--ogds-color-gray-warm-90:#171716;--ogds-color-gray-1:#fcfcfc;--ogds-color-gray-2:#f9f9f9;--ogds-color-gray-3:#f6f6f6;--ogds-color-gray-4:#f3f3f3;--ogds-color-gray-5:#f0f0f0;--ogds-color-gray-10:#e6e6e6;--ogds-color-gray-20:#c9c9c9;--ogds-color-gray-30:#adadad;--ogds-color-gray-40:#919191;--ogds-color-gray-50:#757575;--ogds-color-gray-60:#5c5c5c;--ogds-color-gray-70:#454545;--ogds-color-gray-80:#2e2e2e;--ogds-color-gray-90:#1b1b1b;--ogds-color-gray-100:#000;--ogds-color-green-cool-5:#ecf3ec;--ogds-color-green-cool-10:#dbebde;--ogds-color-green-cool-20:#b4d0b9;--ogds-color-green-cool-30:#86b98e;--ogds-color-green-cool-40:#5e9f69;--ogds-color-green-cool-50:#4d8055;--ogds-color-green-cool-60:#446443;--ogds-color-green-cool-70:#37493b;--ogds-color-green-cool-80:#28312a;--ogds-color-green-cool-90:#1a1f1a;--ogds-color-green-cool-vivid-5:#e3f5e1;--ogds-color-green-cool-vivid-10:#b7f5bd;--ogds-color-green-cool-vivid-20:#70e17b;--ogds-color-green-cool-vivid-30:#21c834;--ogds-color-green-cool-vivid-40:#00a91c;--ogds-color-green-cool-vivid-50:#008817;--ogds-color-green-cool-vivid-60:#216e1f;--ogds-color-green-cool-vivid-70:#154c21;--ogds-color-green-cool-vivid-80:#19311e;--ogds-color-green-warm-5:#f1f4d7;--ogds-color-green-warm-10:#e7eab7;--ogds-color-green-warm-20:#cbd17a;--ogds-color-green-warm-30:#a6b557;--ogds-color-green-warm-40:#8a984b;--ogds-color-green-warm-50:#6f7a41;--ogds-color-green-warm-60:#5a5f38;--ogds-color-green-warm-70:#45472f;--ogds-color-green-warm-80:#2d2f21;--ogds-color-green-warm-90:#171712;--ogds-color-green-warm-vivid-5:#f5fbc1;--ogds-color-green-warm-vivid-10:#e7f434;--ogds-color-green-warm-vivid-20:#c5d30a;--ogds-color-green-warm-vivid-30:#a3b72c;--ogds-color-green-warm-vivid-40:#7e9c1d;--ogds-color-green-warm-vivid-50:#6a7d00;--ogds-color-green-warm-vivid-60:#5a6613;--ogds-color-green-warm-vivid-70:#4b4e10;--ogds-color-green-warm-vivid-80:#38380b;--ogds-color-green-5:#eaf4dd;--ogds-color-green-10:#dfeacd;--ogds-color-green-20:#b8d293;--ogds-color-green-30:#9bb672;--ogds-color-green-40:#7d9b4e;--ogds-color-green-50:#607f35;--ogds-color-green-60:#4c6424;--ogds-color-green-70:#3c4a29;--ogds-color-green-80:#293021;--ogds-color-green-90:#161814;--ogds-color-green-vivid-5:#ddf9c7;--ogds-color-green-vivid-10:#c5ee93;--ogds-color-green-vivid-20:#98d035;--ogds-color-green-vivid-30:#7fb135;--ogds-color-green-vivid-40:#719f2a;--ogds-color-green-vivid-50:#538200;--ogds-color-green-vivid-60:#466c04;--ogds-color-green-vivid-70:#2f4a0b;--ogds-color-green-vivid-80:#243413;--ogds-color-indigo-cool-5:#eef0f9;--ogds-color-indigo-cool-10:#e1e6f9;--ogds-color-indigo-cool-20:#bbc8f5;--ogds-color-indigo-cool-30:#96abee;--ogds-color-indigo-cool-40:#6b8ee8;--ogds-color-indigo-cool-50:#496fd8;--ogds-color-indigo-cool-60:#3f57a6;--ogds-color-indigo-cool-70:#374274;--ogds-color-indigo-cool-80:#292d42;--ogds-color-indigo-cool-90:#151622;--ogds-color-indigo-cool-vivid-5:#edf0ff;--ogds-color-indigo-cool-vivid-10:#dee5ff;--ogds-color-indigo-cool-vivid-20:#b8c8ff;--ogds-color-indigo-cool-vivid-30:#94adff;--ogds-color-indigo-cool-vivid-40:#628ef4;--ogds-color-indigo-cool-vivid-50:#4866ff;--ogds-color-indigo-cool-vivid-60:#3e4ded;--ogds-color-indigo-cool-vivid-70:#222fbf;--ogds-color-indigo-cool-vivid-80:#1b2b85;--ogds-color-indigo-warm-5:#f1eff7;--ogds-color-indigo-warm-10:#e7e3fa;--ogds-color-indigo-warm-20:#cbc4f2;--ogds-color-indigo-warm-30:#afa5e8;--ogds-color-indigo-warm-40:#9287d8;--ogds-color-indigo-warm-50:#7665d1;--ogds-color-indigo-warm-60:#5e519e;--ogds-color-indigo-warm-70:#453c7b;--ogds-color-indigo-warm-80:#2e2c40;--ogds-color-indigo-warm-90:#18161d;--ogds-color-indigo-warm-vivid-5:#f5f2ff;--ogds-color-indigo-warm-vivid-10:#e4deff;--ogds-color-indigo-warm-vivid-20:#cfc4fd;--ogds-color-indigo-warm-vivid-30:#b69fff;--ogds-color-indigo-warm-vivid-40:#967efb;--ogds-color-indigo-warm-vivid-50:#745fe9;--ogds-color-indigo-warm-vivid-60:#5942d2;--ogds-color-indigo-warm-vivid-70:#3d2c9d;--ogds-color-indigo-warm-vivid-80:#261f5b;--ogds-color-indigo-5:#efeff8;--ogds-color-indigo-10:#e5e4fa;--ogds-color-indigo-20:#c5c5f3;--ogds-color-indigo-30:#a5a8eb;--ogds-color-indigo-40:#8889db;--ogds-color-indigo-50:#676cc8;--ogds-color-indigo-60:#4d52af;--ogds-color-indigo-70:#3d4076;--ogds-color-indigo-80:#2b2c40;--ogds-color-indigo-90:#16171f;--ogds-color-indigo-vivid-5:#f0f0ff;--ogds-color-indigo-vivid-10:#e0e0ff;--ogds-color-indigo-vivid-20:#ccceff;--ogds-color-indigo-vivid-30:#a3a7fa;--ogds-color-indigo-vivid-40:#8289ff;--ogds-color-indigo-vivid-50:#656bd7;--ogds-color-indigo-vivid-60:#4a50c4;--ogds-color-indigo-vivid-70:#3333a3;--ogds-color-indigo-vivid-80:#212463;--ogds-color-magenta-5:#f9f0f2;--ogds-color-magenta-10:#f6e1e8;--ogds-color-magenta-20:#f0bbcc;--ogds-color-magenta-30:#e895b3;--ogds-color-magenta-40:#e0699f;--ogds-color-magenta-50:#c84281;--ogds-color-magenta-60:#8b4566;--ogds-color-magenta-70:#66364b;--ogds-color-magenta-80:#402731;--ogds-color-magenta-90:#1b1617;--ogds-color-magenta-vivid-5:#fff2f5;--ogds-color-magenta-vivid-10:#ffddea;--ogds-color-magenta-vivid-20:#ffb4cf;--ogds-color-magenta-vivid-30:#ff87b2;--ogds-color-magenta-vivid-40:#fd4496;--ogds-color-magenta-vivid-50:#d72d79;--ogds-color-magenta-vivid-60:#ab2165;--ogds-color-magenta-vivid-70:#731f44;--ogds-color-magenta-vivid-80:#4f172e;--ogds-color-mint-cool-5:#e0f7f6;--ogds-color-mint-cool-10:#c4eeeb;--ogds-color-mint-cool-20:#9bd4cf;--ogds-color-mint-cool-30:#6fbab3;--ogds-color-mint-cool-40:#4f9e99;--ogds-color-mint-cool-50:#40807e;--ogds-color-mint-cool-60:#376462;--ogds-color-mint-cool-70:#2a4b45;--ogds-color-mint-cool-80:#203131;--ogds-color-mint-cool-90:#111818;--ogds-color-mint-cool-vivid-5:#d5fbf3;--ogds-color-mint-cool-vivid-10:#7efbe1;--ogds-color-mint-cool-vivid-20:#29e1cb;--ogds-color-mint-cool-vivid-30:#1dc2ae;--ogds-color-mint-cool-vivid-40:#00a398;--ogds-color-mint-cool-vivid-50:#008480;--ogds-color-mint-cool-vivid-60:#0f6460;--ogds-color-mint-cool-vivid-70:#0b4b3f;--ogds-color-mint-cool-vivid-80:#123131;--ogds-color-mint-5:#dbf6ed;--ogds-color-mint-10:#c7efe2;--ogds-color-mint-20:#92d9bb;--ogds-color-mint-30:#5abf95;--ogds-color-mint-40:#34a37e;--ogds-color-mint-50:#2e8367;--ogds-color-mint-60:#286846;--ogds-color-mint-70:#204e34;--ogds-color-mint-80:#193324;--ogds-color-mint-90:#0d1a12;--ogds-color-mint-vivid-5:#c9fbeb;--ogds-color-mint-vivid-10:#83fcd4;--ogds-color-mint-vivid-20:#0ceda6;--ogds-color-mint-vivid-30:#04c585;--ogds-color-mint-vivid-40:#00a871;--ogds-color-mint-vivid-50:#008659;--ogds-color-mint-vivid-60:#146947;--ogds-color-mint-vivid-70:#0c4e29;--ogds-color-mint-vivid-80:#0d351e;--ogds-color-orange-warm-5:#faeee5;--ogds-color-orange-warm-10:#fbe0d0;--ogds-color-orange-warm-20:#f7bca2;--ogds-color-orange-warm-30:#f3966d;--ogds-color-orange-warm-40:#e17141;--ogds-color-orange-warm-50:#bd5727;--ogds-color-orange-warm-60:#914734;--ogds-color-orange-warm-70:#633a32;--ogds-color-orange-warm-80:#3d2925;--ogds-color-orange-warm-90:#1c1615;--ogds-color-orange-warm-vivid-5:#fff3ea;--ogds-color-orange-warm-vivid-10:#ffe2d1;--ogds-color-orange-warm-vivid-20:#fbbaa7;--ogds-color-orange-warm-vivid-30:#fc906d;--ogds-color-orange-warm-vivid-40:#ff580a;--ogds-color-orange-warm-vivid-50:#cf4900;--ogds-color-orange-warm-vivid-60:#a72f10;--ogds-color-orange-warm-vivid-70:#782312;--ogds-color-orange-warm-vivid-80:#3d231d;--ogds-color-orange-5:#f6efe9;--ogds-color-orange-10:#f2e4d4;--ogds-color-orange-20:#f3bf90;--ogds-color-orange-30:#f09860;--ogds-color-orange-40:#dd7533;--ogds-color-orange-50:#a86437;--ogds-color-orange-60:#775540;--ogds-color-orange-70:#524236;--ogds-color-orange-80:#332d27;--ogds-color-orange-90:#1b1614;--ogds-color-orange-vivid-5:#fef2e4;--ogds-color-orange-vivid-10:#fce2c5;--ogds-color-orange-vivid-20:#ffbc78;--ogds-color-orange-vivid-30:#fa9441;--ogds-color-orange-vivid-40:#e66f0e;--ogds-color-orange-vivid-50:#c05600;--ogds-color-orange-vivid-60:#8c471c;--ogds-color-orange-vivid-70:#5f3617;--ogds-color-orange-vivid-80:#352313;--ogds-color-red-cool-5:#f8eff1;--ogds-color-red-cool-10:#f3e1e4;--ogds-color-red-cool-20:#ecbec6;--ogds-color-red-cool-30:#e09aa6;--ogds-color-red-cool-40:#e16b80;--ogds-color-red-cool-50:#cd425b;--ogds-color-red-cool-60:#9e394b;--ogds-color-red-cool-70:#68363f;--ogds-color-red-cool-80:#40282c;--ogds-color-red-cool-90:#1e1517;--ogds-color-red-cool-vivid-5:#fff2f5;--ogds-color-red-cool-vivid-10:#f8dfe2;--ogds-color-red-cool-vivid-20:#f8b9c5;--ogds-color-red-cool-vivid-30:#fd8ba0;--ogds-color-red-cool-vivid-40:#f45d79;--ogds-color-red-cool-vivid-50:#e41d3d;--ogds-color-red-cool-vivid-60:#b21d38;--ogds-color-red-cool-vivid-70:#822133;--ogds-color-red-cool-vivid-80:#4f1c24;--ogds-color-red-warm-5:#f6efea;--ogds-color-red-warm-10:#f4e3db;--ogds-color-red-warm-20:#ecc0a7;--ogds-color-red-warm-30:#dca081;--ogds-color-red-warm-40:#d27a56;--ogds-color-red-warm-50:#c3512c;--ogds-color-red-warm-60:#805039;--ogds-color-red-warm-70:#524236;--ogds-color-red-warm-80:#332d29;--ogds-color-red-warm-90:#1f1c18;--ogds-color-red-warm-vivid-5:#fff5ee;--ogds-color-red-warm-vivid-10:#fce1d4;--ogds-color-red-warm-vivid-20:#f6bd9c;--ogds-color-red-warm-vivid-30:#f39268;--ogds-color-red-warm-vivid-40:#ef5e25;--ogds-color-red-warm-vivid-50:#d54309;--ogds-color-red-warm-vivid-60:#9c3d10;--ogds-color-red-warm-vivid-70:#63340f;--ogds-color-red-warm-vivid-80:#3e2a1e;--ogds-color-red-5:#f9eeee;--ogds-color-red-10:#f8e1de;--ogds-color-red-20:#f7bbb1;--ogds-color-red-30:#f2938c;--ogds-color-red-40:#e9695f;--ogds-color-red-50:#d83933;--ogds-color-red-60:#a23737;--ogds-color-red-70:#6f3331;--ogds-color-red-80:#3e2927;--ogds-color-red-90:#1b1616;--ogds-color-red-vivid-5:#fff3f2;--ogds-color-red-vivid-10:#fde0db;--ogds-color-red-vivid-20:#fdb8ae;--ogds-color-red-vivid-30:#ff8d7b;--ogds-color-red-vivid-40:#fb5a47;--ogds-color-red-vivid-50:#e52207;--ogds-color-red-vivid-60:#b50909;--ogds-color-red-vivid-70:#8b0a03;--ogds-color-red-vivid-80:#5c1111;--ogds-color-violet-warm-5:#f8f0f9;--ogds-color-violet-warm-10:#f6dff8;--ogds-color-violet-warm-20:#e2bee4;--ogds-color-violet-warm-30:#d29ad8;--ogds-color-violet-warm-40:#bf77c8;--ogds-color-violet-warm-50:#b04abd;--ogds-color-violet-warm-60:#864381;--ogds-color-violet-warm-70:#5c395a;--ogds-color-violet-warm-80:#382936;--ogds-color-violet-warm-90:#1b151b;--ogds-color-violet-warm-vivid-5:#fef2ff;--ogds-color-violet-warm-vivid-10:#fbdcff;--ogds-color-violet-warm-vivid-20:#f4b2ff;--ogds-color-violet-warm-vivid-30:#ee83ff;--ogds-color-violet-warm-vivid-40:#d85bef;--ogds-color-violet-warm-vivid-50:#be32d0;--ogds-color-violet-warm-vivid-60:#93348c;--ogds-color-violet-warm-vivid-70:#711e6c;--ogds-color-violet-warm-vivid-80:#481441;--ogds-color-violet-5:#f4f1f9;--ogds-color-violet-10:#ebe3f9;--ogds-color-violet-20:#d0c3e9;--ogds-color-violet-30:#b8a2e3;--ogds-color-violet-40:#9d84d2;--ogds-color-violet-50:#8168b3;--ogds-color-violet-60:#665190;--ogds-color-violet-70:#4c3d69;--ogds-color-violet-80:#312b3f;--ogds-color-violet-90:#18161d;--ogds-color-violet-vivid-5:#f7f2ff;--ogds-color-violet-vivid-10:#ede3ff;--ogds-color-violet-vivid-20:#d5bfff;--ogds-color-violet-vivid-30:#c39deb;--ogds-color-violet-vivid-40:#ad79e9;--ogds-color-violet-vivid-50:#9355dc;--ogds-color-violet-vivid-60:#783cb9;--ogds-color-violet-vivid-70:#54278f;--ogds-color-violet-vivid-80:#39215e;--ogds-color-white-transparent-5:#ffffff03;--ogds-color-white-transparent-10:#ffffff1a;--ogds-color-white-transparent-20:#fff3;--ogds-color-white-transparent-30:#ffffff4d;--ogds-color-white-transparent-40:#fff6;--ogds-color-white-transparent-50:#ffffff80;--ogds-color-white-transparent-60:#fff9;--ogds-color-white-transparent-70:#ffffffb3;--ogds-color-white-transparent-80:#fffc;--ogds-color-white-transparent-90:#ffffffe6;--ogds-color-yellow-5:#faf3d1;--ogds-color-yellow-10:#f5e6af;--ogds-color-yellow-20:#e6c74c;--ogds-color-yellow-30:#c9ab48;--ogds-color-yellow-40:#a88f48;--ogds-color-yellow-50:#8a7237;--ogds-color-yellow-60:#6b5a39;--ogds-color-yellow-70:#504332;--ogds-color-yellow-80:#332d27;--ogds-color-yellow-90:#1a1614;--ogds-color-yellow-vivid-5:#fff5c2;--ogds-color-yellow-vivid-10:#fee685;--ogds-color-yellow-vivid-20:#face00;--ogds-color-yellow-vivid-30:#ddaa01;--ogds-color-yellow-vivid-40:#b38c00;--ogds-color-yellow-vivid-50:#947100;--ogds-color-yellow-vivid-60:#776017;--ogds-color-yellow-vivid-70:#5c4809;--ogds-color-yellow-vivid-80:#422d19}`,
  Bo = h`:root,:host{--ogds-column-gap-0:0px;--ogds-column-gap-1:.5rem;--ogds-column-gap-2:1rem;--ogds-column-gap-3:1.5rem;--ogds-column-gap-4:2rem;--ogds-column-gap-5:2.5rem;--ogds-column-gap-6:3rem;--ogds-column-gap-2px:2px;--ogds-column-gap-05:.25rem;--ogds-grid-base:8px;--ogds-input-width-2xs:5ex;--ogds-input-width-xs:9ex;--ogds-input-width-sm:13ex;--ogds-input-width-md:20ex;--ogds-input-width-lg:30ex;--ogds-input-width-xl:40ex;--ogds-input-width-2xl:50ex;--ogds-spacing-1:.5rem;--ogds-spacing-2:1rem;--ogds-spacing-3:1.5rem;--ogds-spacing-4:2rem;--ogds-spacing-5:2.5rem;--ogds-spacing-6:3rem;--ogds-spacing-7:3.5rem;--ogds-spacing-8:4rem;--ogds-spacing-9:4.5rem;--ogds-spacing-10:5rem;--ogds-spacing-15:7.5rem;--ogds-spacing-105:.75rem;--ogds-spacing-205:1.25rem;--ogds-spacing-05:.25rem;--ogds-spacing-neg-05:-.25rem;--ogds-spacing-neg-1:-.5rem;--ogds-spacing-neg-105:-.75rem;--ogds-spacing-neg-2:-1rem;--ogds-spacing-neg-205:-1.25rem;--ogds-spacing-neg-3:-1.5rem;--ogds-spacing-neg-4:-2rem;--ogds-spacing-neg-5:-2.5rem;--ogds-spacing-neg-6:-3rem;--ogds-spacing-neg-7:-3.5rem;--ogds-spacing-neg-8:-4rem;--ogds-spacing-neg-9:-4.5rem;--ogds-spacing-neg-10:-5rem;--ogds-spacing-neg-15:-7.5rem;--ogds-site-margins-mobile-width:1rem;--ogds-site-margins-width:2rem;--ogds-size-touch-target:3rem}`,
  ue = h`:root,:host{--ogds-breakpoint-card:10rem;--ogds-breakpoint-card-lg:15rem;--ogds-breakpoint-mobile:20rem;--ogds-breakpoint-mobile-lg:30rem;--ogds-breakpoint-tablet:40rem;--ogds-breakpoint-tablet-lg:55rem;--ogds-breakpoint-desktop:64rem;--ogds-breakpoint-desktop-lg:75rem;--ogds-breakpoint-widescreen:87.5rem}`,
  fe = h`:host{--ogds-banner-background-color:var(--ogds-color-base-lightest,#f0f0f0);--ogds-banner-button-close-background-color:var(--ogds-color-base-lighter,#dfe1e2);--ogds-banner-focus-outline-color:var(--ogds-color-blue-vivid-40,#2491ff);--ogds-banner-font-family:system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif;--ogds-banner-font-size-xs:.75rem;--ogds-banner-font-size-sm:.875rem;--ogds-banner-font-size-base:.94rem;--ogds-banner-icon-gov-color:var(--ogds-color-blue-50,#2378c3);--ogds-banner-icon-https-color:var(--ogds-color-green-vivid-40,#719f2a);--ogds-banner-line-height-sm:1.2;--ogds-banner-line-height-base:1.6;--ogds-banner-link-color:var(--ogds-color-blue-vivid-60,#005ea2);--ogds-banner-link-hover-color:var(--ogds-color-blue-warm-vivid-70,#1a4480);--ogds-banner-max-width:var(--ogds-breakpoint-desktop);--ogds-banner-text-color:var(--ogds-color-base-darkest,#1b1b1b);--ogds-icon-lock:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='52' height='64' viewBox='0 0 52 64' class='usa-banner__lock-image' role='img' aria-labelledby='banner-lock-description-default' focusable='false'%3E%3Ctitle id='banner-lock-title-default'%3ELock%3C/title%3E%3Cdesc id='banner-lock-description-default'%3ELocked padlock icon%3C/desc%3E%3Cpath fill='%23000000' fill-rule='evenodd' d='M26 0c10.493 0 19 8.507 19 19v9h3a4 4 0 0 1 4 4v28a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V32a4 4 0 0 1 4-4h3v-9C7 8.507 15.507 0 26 0zm0 8c-5.979 0-10.843 4.77-10.996 10.712L15 19v9h22v-9c0-6.075-4.925-11-11-11z'%3E%3C/path%3E%3C/svg%3E\")}*{box-sizing:border-box}section{background-color:var(--ogds-banner-background-color);box-sizing:border-box;font-family:var(--ogds-banner-font-family);font-size:var(--ogds-banner-font-size-xs);text-align:start}section *,section :before,section :after{box-sizing:border-box}@media(min-width:40em){section{font-size:var(--ogds-banner-font-size-xs);padding-block-end:0}}section .usa-accordion{font-family:inherit}section .grid-row{grid-template-columns:repeat(auto-fit,minmax(min(100%,calc(var(--ogds-breakpoint-tablet) / 2)),1fr));display:grid}@media(min-width:40em){section .grid-row{gap:var(--ogds-spacing-2)}}@media(min-width:64em){section .grid-row{gap:calc(var(--ogds-spacing-05) / 2)}}.grid-col-auto{flex:0 auto}.grid-col-fill{flex:1 1 0;width:auto;min-width:1px;max-width:100%}@media(min-width:40em){.tablet\\:grid-col-auto{flex:0 auto;width:auto;max-width:100%}}section .tablet\\:grid-col-6{gap:var(--ogds-spacing-1);flex:none;width:100%}header,.content{color:var(--ogds-banner-text-color)}.content{font-size:var(--ogds-banner-font-size-base);line-height:var(--ogds-banner-line-height-base);max-width:var(--ogds-banner-max-width);padding-block-start:var(--ogds-spacing-05);padding-block-end:var(--ogds-spacing-2);padding-inline:var(--ogds-spacing-1);width:100%;margin-inline:auto;overflow:hidden}@media(min-width:40em){.content{padding-block:var(--ogds-spacing-3)}}@media(min-width:64em){.content{padding-inline:var(--ogds-spacing-4)}}.content p:first-child{margin:0}.inner{max-width:var(--ogds-banner-max-width);flex-wrap:nowrap;align-items:flex-start;margin-inline:auto;padding-inline-start:var(--ogds-spacing-2);padding-inline-end:var(--ogds-spacing-05);display:flex}@media(min-width:40em){.inner{align-items:center}}@media(min-width:64em){.inner{padding-inline:var(--ogds-spacing-4)}}header{font-size:var(--ogds-banner-font-size-xs);min-height:var(--ogds-size-touch-target);padding-block:var(--ogds-spacing-1);font-weight:400;position:relative}@media(min-width:40em){header{min-height:0;padding-block:var(--ogds-spacing-05)}}.header-text{font-size:var(--ogds-banner-font-size-xs);line-height:var(--ogds-banner-line-height-sm);margin-block:0}.header-flag{float:left;width:var(--ogds-spacing-2);margin-inline-end:var(--ogds-spacing-1);padding-block-start:0}.header-action{color:var(--ogds-banner-link-color);cursor:pointer;font:inherit;line-height:var(--ogds-banner-line-height-sm);background:0 0;border:none;margin-block:2px 0;padding:0;text-decoration:underline}.header-action:hover{color:var(--ogds-banner-link-hover-color)}.header-action:after{content:\"\";height:1rem;-webkit-mask-image:var(--ogds-icon-expand-more);mask-image:var(--ogds-icon-expand-more);vertical-align:middle;background-color:currentColor;width:1rem;display:inline-block;-webkit-mask-position:50%;mask-position:50%;-webkit-mask-size:1rem 1rem;mask-size:1rem 1rem;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat}.expanded .header-action{display:none}@media(min-width:40em){.header-action{display:none}}@media(forced-colors:active){.header-action{color:linktext}.header-action:after{background-color:buttontext}}header.expanded{padding-inline-end:calc(var(--ogds-size-touch-target) + var(--ogds-spacing-1))}@media(min-width:40em){header.expanded{font-size:var(--ogds-banner-font-size-sm);min-height:0;padding-inline-end:0;font-weight:400;display:block}}header.expanded .inner{margin-inline-start:0}@media(min-width:40em){header.expanded .inner{margin-inline-start:auto}}header.expanded .header-action{display:none}button{color:var(--ogds-banner-link-color);cursor:pointer;font:inherit;font-size:var(--ogds-banner-font-size-xs);height:auto;line-height:var(--ogds-banner-line-height-sm);outline:inherit;background:0 0;border:none;width:auto;padding:0;padding-block-start:0;padding-inline-start:0;text-decoration:none;display:block;position:absolute;top:0;bottom:0;left:0}button:hover{color:var(--ogds-banner-link-hover-color)}@media(max-width:39.99em){button{width:100%}button:enabled:focus{outline-offset:-.25rem}}button:not([disabled]):focus{outline:var(--ogds-spacing-05) solid var(--ogds-banner-focus-outline-color)}@media(min-width:40em){button{margin-inline-start:var(--ogds-spacing-1);display:inline;position:relative;top:auto;bottom:auto;left:auto}button:after{content:\"\";height:1rem;-webkit-mask-image:var(--ogds-icon-expand-more);mask-image:var(--ogds-icon-expand-more);background-color:currentColor;width:1rem;margin-block:0;display:inline-block;position:absolute;top:0;right:-18px;-webkit-mask-position:50%;mask-position:50%;-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat}button:hover{text-decoration:none}}@media(forced-colors:active){button:after,button:hover:after{background-color:buttontext}}button[aria-expanded=false],button[aria-expanded=false]:hover,button[aria-expanded=true],button[aria-expanded=true]:hover{background-image:none}@media(forced-colors:active){button[aria-expanded=false]:before,button[aria-expanded=false]:hover:before,button[aria-expanded=true]:before,button[aria-expanded=true]:hover:before{content:none}}@media(max-width:39.99em){button[aria-expanded=true]:before{background-color:var(--ogds-banner-button-close-background-color);content:\"\";height:var(--ogds-size-touch-target);width:var(--ogds-size-touch-target);display:block;position:absolute;top:0;bottom:0;right:0}button[aria-expanded=true]:after{background-color:var(--ogds-banner-link-color);content:\"\";height:var(--ogds-size-touch-target);-webkit-mask-image:var(--ogds-icon-close);mask-image:var(--ogds-icon-close);width:var(--ogds-size-touch-target);display:block;position:absolute;top:0;bottom:0;right:0;-webkit-mask-position:50%;mask-position:50%;-webkit-mask-size:1.5rem 1.5rem;mask-size:1.5rem 1.5rem;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat}}@media(min-width:40em){button[aria-expanded=true]{height:auto;padding:0;position:relative}button[aria-expanded=true]:after,button[aria-expanded=true]:hover:after{-webkit-mask-image:var(--ogds-icon-expand-less);mask-image:var(--ogds-icon-expand-less);position:absolute}}@media(forced-colors:active){button[aria-expanded=true]:after,button[aria-expanded=true]:hover:after{background-color:buttontext}}.button-text{text-decoration:underline;position:absolute;left:-999em;right:auto}@media(min-width:40em){.button-text{display:inline;position:static;left:auto;right:auto}}@media(forced-colors:active){.button-text{color:linktext}}.guidance{max-width:62ex;align-items:flex-start;padding-block-start:var(--ogds-spacing-2);display:flex}@media(max-width:39.99em){.guidance{padding-inline-end:.75rem}}@media(min-width:40em){.guidance{padding-block-start:0;padding-inline-end:var(--ogds-spacing-1)}}.icon{width:var(--ogds-spacing-5)}.icon-lock,::slotted(.usa-banner__icon-lock){height:1.5ex;-webkit-mask-image:var(--ogds-icon-lock);mask-image:var(--ogds-icon-lock);background-color:currentColor;background-position:50%;background-repeat:no-repeat;background-size:cover;width:1.21875ex;display:inline-block;-webkit-mask-position:50%;mask-position:50%;-webkit-mask-size:cover;mask-size:cover;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat}.icon-gov,.icon-https{padding-inline-start:calc(var(--ogds-spacing-5) + var(--ogds-spacing-1));position:relative}:is(.icon-gov,.icon-https):before{content:\"\";height:var(--ogds-spacing-5);width:var(--ogds-spacing-5);display:inline-block;position:absolute;top:0;left:0;-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat}.icon-gov:before{background-color:var(--ogds-banner-icon-gov-color);-webkit-mask-image:var(--ogds-icon-gov);mask-image:var(--ogds-icon-gov)}.icon-https:before{background-color:var(--ogds-banner-icon-https-color);-webkit-mask-image:var(--ogds-icon-https);mask-image:var(--ogds-icon-https)}`,
  be =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAsBAMAAAAncaPMAAAAAXNSR0IArs4c6QAAABtQTFRF////4EAg2z8g2z8f2z4f2j4fHjSyHjOxHTOxQEYPwgAAAIdJREFUeNrNkUENxDAMBEOhFJaCKZiCKZhCKBj2ebV3rdR71+pIq+Qxj1GyqjJ3U8VlHkc07hFm0awBYe91juq6MSI0yhSAEgkzJ4TMKiXyzFw3pgR9lmIBJlqj2AmBedf+IycExmlKZVzvZEJ4A0oBrjBl/m6PCy95B3fFAN6YuQPxhbcB4QMkEj04wQXD5wAAAABJRU5ErkJggg==",
  ye =
    "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='64'%20height='64'%20viewBox='0%200%2064%2064'%3e%3ctitle%3eicon-dot-gov%3c/title%3e%3cpath%20fill='%232378C3'%20fill-rule='evenodd'%20d='m32%200c17.7%200%2032%2014.3%2032%2032s-14.3%2032-32%2032-32-14.3-32-32%2014.3-32%2032-32zm0%201.2c-17%200-30.8%2013.8-30.8%2030.8s13.8%2030.8%2030.8%2030.8%2030.8-13.8%2030.8-30.8-13.8-30.8-30.8-30.8zm11.4%2038.9c.5%200%20.9.4.9.8v1.6h-24.6v-1.6c0-.5.4-.8.9-.8zm-17.1-12.3v9.8h1.6v-9.8h3.3v9.8h1.6v-9.8h3.3v9.8h1.6v-9.8h3.3v9.8h.8c.5%200%20.9.4.9.8v.8h-21.4v-.8c0-.5.4-.8.9-.8h.8v-9.8zm5.7-8.2%2012.3%204.9v1.6h-1.6c0%20.5-.4.8-.9.8h-19.6c-.5%200-.9-.4-.9-.8h-1.6v-1.6s12.3-4.9%2012.3-4.9z'/%3e%3c/svg%3e",
  we =
    "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='64'%20height='64'%20viewBox='0%200%2064%2064'%3e%3ctitle%3eicon-https%3c/title%3e%3cpath%20fill='%23719F2A'%20fill-rule='evenodd'%20d='M32%200c17.673%200%2032%2014.327%2032%2032%200%2017.673-14.327%2032-32%2032C14.327%2064%200%2049.673%200%2032%200%2014.327%2014.327%200%2032%200zm0%201.208C14.994%201.208%201.208%2014.994%201.208%2032S14.994%2062.792%2032%2062.792%2062.792%2049.006%2062.792%2032%2049.006%201.208%2032%201.208zm0%2018.886a7.245%207.245%200%200%201%207.245%207.245v3.103h.52c.86%200%201.557.698%201.557%201.558v9.322c0%20.86-.697%201.558-1.557%201.558h-15.53c-.86%200-1.557-.697-1.557-1.558V32c0-.86.697-1.558%201.557-1.558h.52V27.34A7.245%207.245%200%200%201%2032%2020.094zm0%203.103a4.142%204.142%200%200%200-4.142%204.142v3.103h8.284V27.34A4.142%204.142%200%200%200%2032%2023.197z'/%3e%3c/svg%3e",
  Lo =
    "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%3e%3cpath%20d='M19%206.41%2017.59%205%2012%2010.59%206.41%205%205%206.41%2010.59%2012%205%2017.59%206.41%2019%2012%2013.41%2017.59%2019%2019%2017.59%2013.41%2012z'/%3e%3c/svg%3e",
  io =
    "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%3e%3cpath%20d='M16.59%208.59%2012%2013.17%207.41%208.59%206%2010l6%206%206-6z'/%3e%3c/svg%3e",
  so =
    "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%3e%3cpath%20d='m12%208-6%206%201.41%201.41L12%2010.83l4.59%204.58L18%2014z'/%3e%3c/svg%3e",
  C = (i, o) => {
    !customElements || customElements.get(i) || customElements.define(i, o);
  },
  _o = {
    en: {
      banner: {
        label: "Official website of the United States government",
        text: "An official website of the United States government",
        action: "Here’s how you know",
      },
      domain: {
        heading: "Official websites use",
        text1: "A",
        text2:
          "website belongs to an official government organization in the United States.",
      },
      https: {
        heading1: "Secure",
        heading2: "websites use HTTPS",
        text1: "A <strong>lock</strong>",
        text2:
          "or <strong>https://</strong> means you’ve safely connected to the",
        text3:
          " website. Share sensitive information only on official, secure websites.",
      },
    },
    es: {
      banner: {
        label: "Un sitio oficial del gobierno de Estados Unidos",
        text: "Un sitio oficial del gobierno de Estados Unidos",
        action: "Así es como usted puede verificarlo",
      },
      domain: {
        heading: "Los sitios web oficiales usan",
        text1: "Un sitio web",
        text2:
          "pertenece a una organización oficial del gobierno de Estados Unidos.",
      },
      https: {
        heading1: "Los sitios web seguros",
        heading2: "usan HTTPS",
        text1: "Un <strong>candado</strong>",
        text2:
          "o <strong>https://</strong> significa que usted se conectó de forma segura a un sitio web",
        text3:
          ". Comparta información sensible solo en sitios web oficiales y seguros.",
      },
    },
  },
  J = class extends u {
    toggle() {
      this.isOpen = !this.isOpen;
      const o = this.shadowRoot?.querySelector(".content");
      o && o.toggleAttribute("hidden");
    }
    constructor() {
      (super(),
        (this.flagSrc = be),
        (this.lang = "en"),
        (this.isOpen = !1),
        (this.tld = "gov"));
    }
    // Get English or Spanish strings. Default to English if an unknown `lang` is passed.
    // Ex: <usa-banner lang="zy"></usa-banner>
    get _bannerText() {
      return _o[this.lang] || _o.en;
    }
    // Get the action text and use for both mobile & desktop buttons.
    get _actionText() {
      return this.querySelector('[slot="banner-action"]')?.textContent;
    }
    domainTemplate(o) {
      const { domain: e } = this._bannerText;
      return v`
      <div class="icon-gov">
        <p>
          <strong>
            <slot name="domain-heading"> ${e.heading} .${o} </slot>
          </strong>
          <br />
          <slot name="domain-text">
            ${e.text1} <strong>.${o}</strong> ${e.text2}
          </slot>
        </p>
      </div>
    `;
    }
    lockIcon() {
      return v`
      <span
        class="icon-lock"
        role="img"
        aria-label="Locked padlock icon"
      ></span>
    `;
    }
    httpsTemplate(o) {
      const { https: e } = this._bannerText;
      return v`
      <div class="icon-https">
        <p>
          <strong>
            <slot name="https-heading">
              ${e.heading1} .${o} ${e.heading2}
            </slot> </strong
          ><br />
          <slot name="https-text">
            ${xo(e.text1)} (${this.lockIcon()})
            ${xo(e.text2)} .${o}${e.text3}
          </slot>
        </p>
      </div>
    `;
    }
    render() {
      const o = { expanded: this.isOpen },
        e = this.tld === "mil" ? "mil" : "gov",
        { banner: r } = this._bannerText;
      return v`
      <section aria-label=${this.label || r.label}>
        <div class="usa-accordion">
          <header class="${pe(o)}">
            <div class="inner">
              <div class="grid-col-auto">
                <img
                  aria-hidden="true"
                  class="header-flag"
                  src=${this.flagSrc}
                  alt=""
                />
              </div>
              <div
                class="grid-col-fill tablet:grid-col-auto"
                aria-hidden="true"
              >
                <p class="header-text">
                  <slot name="banner-text">${r.text}</slot>
                </p>
                <!-- 
                  Since the header-action text below is underlined, the slot and p 
                  need to be on the same line to avoid one extra space of underline 
                  before the expand icon.
                -->
                <!-- prettier-ignore -->
                <p class="header-action"><slot name="banner-action">${r.action}</slot></p>
              </div>
              <button
                type="button"
                class="usa-accordion__button"
                aria-expanded="${this.isOpen}"
                aria-controls="gov-banner-default"
                @click="${this.toggle}"
              >
                <span class="button-text">
                  ${this._actionText || r.action}
                </span>
              </button>
            </div>
          </header>
          <div class="content usa-accordion__content" hidden>
            <div class="grid-row grid-gap-lg">
              <div class="guidance tablet:grid-col-6">
                ${this.domainTemplate(e)}
              </div>
              <div class="guidance tablet:grid-col-6">
                ${this.httpsTemplate(e)}
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
    }
  };
((J.properties = {
  flagSrc: { type: String },
  lang: { type: String, reflect: !0 },
  isOpen: { state: !0 },
  label: { type: String },
  tld: { type: String, reflect: !0 },
}),
  (J.styles = [
    h`
      :host {
        /** Icons */
        --ogds-icon-close: url("${p(Lo)}");
        --ogds-icon-expand-less: url("${p(so)}");
        --ogds-icon-expand-more: url("${p(io)}");
        --ogds-icon-gov: url("${p(ye)}");
        --ogds-icon-https: url("${p(we)}");
      }
    `,
    ue,
    Ro,
    Bo,
    fe,
  ]));
let ke = J;
C("ogds-banner", ke);
const $e = {
    attribute: !0,
    type: String,
    converter: L,
    reflect: !1,
    hasChanged: Y,
  },
  xe = (i = $e, o, e) => {
    const { kind: r, metadata: t } = e;
    let s = globalThis.litPropertyMetadata.get(t);
    if (
      (s === void 0 &&
        globalThis.litPropertyMetadata.set(t, (s = /* @__PURE__ */ new Map())),
      r === "setter" && ((i = Object.create(i)).wrapped = !0),
      s.set(e.name, i),
      r === "accessor")
    ) {
      const { name: a } = e;
      return {
        set(d) {
          const n = o.get.call(this);
          (o.set.call(this, d), this.requestUpdate(a, n, i, !0, d));
        },
        init(d) {
          return (d !== void 0 && this.C(a, void 0, i, d), d);
        },
      };
    }
    if (r === "setter") {
      const { name: a } = e;
      return function (d) {
        const n = this[a];
        (o.call(this, d), this.requestUpdate(a, n, i, !0, d));
      };
    }
    throw Error("Unsupported decorator location: " + r);
  };
function b(i) {
  return (o, e) =>
    typeof e == "object"
      ? xe(i, o, e)
      : ((r, t, s) => {
          const a = t.hasOwnProperty(s);
          return (
            t.constructor.createProperty(s, r),
            a ? Object.getOwnPropertyDescriptor(t, s) : void 0
          );
        })(i, o, e);
}
function V(i) {
  return b({ ...i, state: !0, attribute: !1 });
}
const Do = /* @__PURE__ */ Symbol.for(""),
  _e = (i) => {
    if (i?.r === Do) return i?._$litStatic$;
  },
  z = (i, ...o) => ({
    _$litStatic$: o.reduce(
      (e, r, t) =>
        e +
        ((s) => {
          if (s._$litStatic$ !== void 0) return s._$litStatic$;
          throw Error(`Value passed to 'literal' function must be a 'literal' result: ${s}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`);
        })(r) +
        i[t + 1],
      i[0],
    ),
    r: Do,
  }),
  Ao = /* @__PURE__ */ new Map(),
  Ae =
    (i) =>
    (o, ...e) => {
      const r = e.length;
      let t, s;
      const a = [],
        d = [];
      let n,
        l = 0,
        m = !1;
      for (; l < r;) {
        for (n = o[l]; l < r && ((s = e[l]), (t = _e(s)) !== void 0);)
          ((n += t + o[++l]), (m = !0));
        (l !== r && d.push(s), a.push(n), l++);
      }
      if ((l === r && a.push(o[r]), m)) {
        const c = a.join("$$lit$$");
        ((o = Ao.get(c)) === void 0 && ((a.raw = a), Ao.set(c, (o = a))),
          (e = d));
      }
      return i(o, ...e);
    },
  Se = Ae(v),
  Ce = h`@layer ogds.components{.ogds-accordion,ogds-accordion{--ogds-accordion-border:.25rem solid var(--ogds-theme-color-base-lightest);--ogds-accordion-content-padding:1rem 1.25rem .75rem ;--ogds-accordion-icon-closed:var(--icon-chevron-pointing-down);--ogds-accordion-icon-open:var(--icon-chevron-pointing-up);--accordion-icon:var(--ogds-accordion-icon-closed)}:is(.ogds-accordion,ogds-accordion).plus{--ogds-accordion-icon-closed:var(--icon-plus);--ogds-accordion-icon-open:var(--icon-minus)}:is(.ogds-accordion,ogds-accordion) details{color:var(--ogds-theme-color-base-ink);margin-block:.5rem}:is(.ogds-accordion,ogds-accordion) details[open]{--accordion-icon:var(--ogds-accordion-icon-open)}:is(.ogds-accordion,ogds-accordion) summary{background-color:var(--ogds-theme-color-base-lightest);padding:1rem 1.25rem;font-weight:700}:is(.ogds-accordion,ogds-accordion) summary:hover{background-color:var(--ogds-color-gray-10)}:is(.ogds-accordion,ogds-accordion) summary:focus{outline:.25rem solid #2491ff}:is(.ogds-accordion,ogds-accordion).with-icon summary{align-items:center;display:flex}:is(.ogds-accordion,ogds-accordion).with-icon summary::marker{display:none}:is(.ogds-accordion,ogds-accordion).with-icon summary::-webkit-details-marker{display:none}:is(.ogds-accordion,ogds-accordion).with-icon summary:before{content:\"\";height:1.25rem;-webkit-mask-image:var(--accordion-icon);mask-image:var(--accordion-icon);background-color:currentColor;flex-shrink:0;width:1.5rem;display:block;-webkit-mask-position:50%;mask-position:50%;-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat}:is(.ogds-accordion,ogds-accordion).with-icon.right summary:before{order:2;margin-inline-start:auto}@supports selector(::details-content){:is(.ogds-accordion,ogds-accordion) details[open]::details-content{padding:var(--ogds-accordion-content-padding)}:is(.ogds-accordion,ogds-accordion).bordered details[open]::details-content{border-block-end:var(--ogds-accordion-border);border-inline-end:var(--ogds-accordion-border);border-inline-start:var(--ogds-accordion-border)}}@supports not selector(::details-content){:is(.ogds-accordion,ogds-accordion) .details-content{padding:var(--ogds-accordion-content-padding)}:is(.ogds-accordion,ogds-accordion).bordered .details-content{border-block-end:var(--ogds-accordion-border);border-inline-end:var(--ogds-accordion-border);border-inline-start:var(--ogds-accordion-border)}}}`,
  ze =
    "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%3e%3cpath%20d='M19%2013h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'/%3e%3c/svg%3e",
  Ee =
    "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%3e%3cpath%20d='M19%2013H5v-2h14v2z'/%3e%3c/svg%3e",
  Ue = h`:root,:host{--ogds-font-family-system:-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";--ogds-font-family-georgia:Georgia, Cambria, \"Times New Roman\", Times, serif;--ogds-font-family-helvetica:\"Helvetica Neue\", Helvetica, Roboto, Arial, sans-serif;--ogds-font-family-monospace:\"Bitstream Vera Sans Mono\", \"Consolas\", \"Courier\", monospace;--ogds-font-size-1:.75rem;--ogds-font-size-2:.8125rem;--ogds-font-size-3:.875rem;--ogds-font-size-4:.9375rem;--ogds-font-size-5:1rem;--ogds-font-size-6:1.0625rem;--ogds-font-size-7:1.125rem;--ogds-font-size-8:1.25rem;--ogds-font-size-9:1.375rem;--ogds-font-size-10:1.5rem;--ogds-font-size-11:1.75rem;--ogds-font-size-12:2rem;--ogds-font-size-13:2.25rem;--ogds-font-size-14:2.5rem;--ogds-font-size-15:3rem;--ogds-font-size-16:3.5rem;--ogds-font-size-17:4rem;--ogds-font-size-18:5rem;--ogds-font-size-19:7.5rem;--ogds-font-size-20:8.75rem;--ogds-font-size-micro:.625rem;--ogds-line-height-1:1;--ogds-line-height-2:1.2;--ogds-line-height-3:1.35;--ogds-line-height-4:1.5;--ogds-line-height-5:1.62;--ogds-line-height-6:1.75;--ogds-measure-smaller:44ex;--ogds-measure-small:60ex;--ogds-measure-base:64ex;--ogds-measure-large:68ex;--ogds-measure-larger:72ex;--ogds-measure-largest:88ex}`,
  He = h`:root,:host{--ogds-theme-color-base-lightest:#f0f0f0;--ogds-theme-color-base-lighter:#dfe1e2;--ogds-theme-color-base-light:#a9aeb1;--ogds-theme-color-base:#71767a;--ogds-theme-color-base-dark:#565c65;--ogds-theme-color-base-darker:#3d4551;--ogds-theme-color-base-darkest:#1b1b1b;--ogds-theme-color-base-ink:#1b1b1b;--ogds-theme-color-primary-lighter:#d9e8f6;--ogds-theme-color-primary-light:#73b3e7;--ogds-theme-color-primary:#005ea2;--ogds-theme-color-primary-vivid:#0050d8;--ogds-theme-color-primary-dark:#1a4480;--ogds-theme-color-primary-darker:#162e51;--ogds-theme-color-secondary-lighter:#f3e1e4;--ogds-theme-color-secondary-light:#f2938c;--ogds-theme-color-secondary:#d83933;--ogds-theme-color-secondary-vivid:#e41d3d;--ogds-theme-color-secondary-dark:#b50909;--ogds-theme-color-secondary-darker:#8b0a03;--ogds-theme-color-accent-warm-lighter:#f2e4d4;--ogds-theme-color-accent-warm-light:#ffbc78;--ogds-theme-color-accent-warm:#fa9441;--ogds-theme-color-accent-warm-dark:#c05600;--ogds-theme-color-accent-warm-darker:#775540;--ogds-theme-color-accent-cool-lighter:#e1f3f8;--ogds-theme-color-accent-cool-light:#97d4ea;--ogds-theme-color-accent-cool:#00bde3;--ogds-theme-color-accent-cool-dark:#28a0cb;--ogds-theme-color-accent-cool-darker:#07648d;--ogds-theme-color-error-lighter:#f4e3db;--ogds-theme-color-error-light:#f39268;--ogds-theme-color-error:#d54309;--ogds-theme-color-error-dark:#b50909;--ogds-theme-color-error-darker:#6f3331;--ogds-theme-color-warning-lighter:#faf3d1;--ogds-theme-color-warning-light:#fee685;--ogds-theme-color-warning:#ffbe2e;--ogds-theme-color-warning-dark:#e5a000;--ogds-theme-color-warning-darker:#936f38;--ogds-theme-color-success-lighter:#ecf3ec;--ogds-theme-color-success-light:#70e17b;--ogds-theme-color-success:#00a91c;--ogds-theme-color-success-dark:#008817;--ogds-theme-color-success-darker:#216e1f;--ogds-theme-color-info-lighter:#e7f6f8;--ogds-theme-color-info-light:#99deea;--ogds-theme-color-info:#00bde3;--ogds-theme-color-info-dark:#009ec1;--ogds-theme-color-info-darker:#2e6276;--ogds-theme-color-disabled-lighter:#c9c9c9;--ogds-theme-color-disabled-light:#919191;--ogds-theme-color-disabled:#757575;--ogds-theme-color-disabled-dark:#454545;--ogds-theme-color-disabled-darker:#1b1b1b;--ogds-theme-color-emergency:#9c3d10;--ogds-theme-color-emergency-dark:#332d29;--ogds-theme-body-background-color:#fff;--ogds-theme-text-color:#1b1b1b;--ogds-theme-text-reverse-color:#fff;--ogds-theme-link-color:#005ea2;--ogds-theme-link-visited-color:#54278f;--ogds-theme-link-hover-color:#1a4480;--ogds-theme-link-active-color:#162e51;--ogds-theme-link-reverse-color:#dfe1e2;--ogds-theme-link-reverse-hover-color:#f0f0f0;--ogds-theme-link-reverse-active-color:#fff;--ogds-theme-focus-color:#2491ff}`,
  Pe = h`:root,:host{--ogds-theme-button-border-radius:.25rem;--ogds-theme-button-fill-color:#005ea2;--ogds-theme-button-font-family:-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";--ogds-theme-button-icon-gap:.5rem;--ogds-theme-button-small-width:3rem;--ogds-theme-button-stroke-color:#005ea2;--ogds-theme-button-stroke-width:2px;--ogds-theme-button-text-color:#fff}`,
  Oe = h`:root,:host{--ogds-theme-border-radius-sm:2px;--ogds-theme-border-radius-md:.25rem;--ogds-theme-border-radius-lg:.5rem;--ogds-theme-column-gap-sm:2px;--ogds-theme-column-gap-md:1rem;--ogds-theme-column-gap-lg:1.5rem;--ogds-theme-column-gap-mobile:1rem;--ogds-theme-column-gap-desktop:2rem;--ogds-theme-grid-container-max-width:64rem;--ogds-theme-site-margins-breakpoint:64rem;--ogds-theme-site-margins-width:2rem;--ogds-theme-site-margins-mobile-width:1rem}`,
  Me = h`:root,:host{--ogds-theme-type-scale-3xs:.8125rem;--ogds-theme-type-scale-2xs:.875rem;--ogds-theme-type-scale-xs:.9375rem;--ogds-theme-type-scale-sm:1rem;--ogds-theme-type-scale-md:1.0625rem;--ogds-theme-type-scale-lg:1.375rem;--ogds-theme-type-scale-xl:2rem;--ogds-theme-type-scale-2xl:2.5rem;--ogds-theme-type-scale-3xl:3rem;--ogds-theme-body-font-size:1rem;--ogds-theme-body-line-height:1.62;--ogds-theme-heading-line-height:1.2;--ogds-theme-display-font-size:3rem;--ogds-theme-h1-font-size:2.5rem;--ogds-theme-h2-font-size:2rem;--ogds-theme-h3-font-size:1.375rem;--ogds-theme-h4-font-size:1rem;--ogds-theme-h5-font-size:.9375rem;--ogds-theme-h6-font-size:.8125rem;--ogds-theme-lead-font-size:1.375rem;--ogds-theme-lead-line-height:1.75}`,
  Z = new CSSStyleSheet();
Z.replaceSync(
  [Ro, Bo, Ue, He, Pe, Oe, Me].map((i) => i.cssText).join(`
`),
);
function H() {
  document.adoptedStyleSheets.includes(Z) ||
    (document.adoptedStyleSheets = [...document.adoptedStyleSheets, Z]);
}
var Te = Object.defineProperty,
  jo = (i, o, e, r) => {
    for (var t = void 0, s = i.length - 1, a; s >= 0; s--)
      (a = i[s]) && (t = a(o, e, t) || t);
    return (t && Te(o, e, t), t);
  },
  x;
const ao =
  ((x = class extends u {
    constructor() {
      (super(...arguments),
        (this.useListSemantics = !1),
        (this.headingLevel = 0));
    }
    createRenderRoot() {
      return this;
    }
    connectedCallback() {
      (super.connectedCallback(),
        H(),
        x._sheet ||
          ((x._sheet = new CSSStyleSheet()),
          x._sheet.replaceSync(
            `ogds-accordion, .ogds-accordion {
          --icon-chevron-pointing-down: url("${io}");
          --icon-chevron-pointing-up: url("${so}");
          --icon-plus: url("${ze}");
          --icon-minus: url("${Ee}");
        }
` + Ce.cssText,
          ),
          (document.adoptedStyleSheets = [
            ...document.adoptedStyleSheets,
            x._sheet,
          ])),
        (this.detailsChildren = this.getDetailsChildren()),
        (this.childRoles = new Map(
          Array.from(this.detailsChildren ?? []).map((i) => [
            i,
            /* @__PURE__ */ new Set(),
          ]),
        )));
    }
    firstUpdated() {
      if (this.useListSemantics && this.headingLevel !== 0) {
        console.warn(
          "<ogds-accordion>: use-list-semantics and heading-level are mutually exclusive. Screen readers cannot reliably announce both list position and heading level on the same element. Remove one attribute.",
        );
        return;
      }
      (this.addListSemantics(),
        this.addHeadingSemantics(),
        this.applyChildRoles());
    }
    getDetailsChildren() {
      const i = this.getElementsByTagName("details");
      if (i.length > 0) return i;
      console.error(
        "<ogds-accordion>: This component expects to have at least one details element as a child",
      );
    }
    addListSemantics() {
      this.useListSemantics &&
        this.detailsChildren &&
        (Array.from(this.detailsChildren).forEach((i) =>
          this.childRoles.get(i)?.add("listitem"),
        ),
        this.setAttribute("role", "list"));
    }
    addHeadingSemantics() {
      const i = this.headingLevel;
      i !== 0 &&
        this.detailsChildren &&
        Array.from(this.detailsChildren).forEach((o) => {
          const e = o.querySelector("summary");
          e &&
            (e.setAttribute("role", "heading"),
            e.setAttribute("aria-level", String(i)));
        });
    }
    applyChildRoles() {
      this.childRoles.forEach((i, o) => {
        i.size > 0 && o.setAttribute("role", Array.from(i).join(" "));
      });
    }
    render() {
      return g;
    }
  }),
  (x._sheet = null),
  x);
jo(
  [b({ type: Boolean, attribute: "use-list-semantics" })],
  ao.prototype,
  "useListSemantics",
);
jo(
  [b({ type: Number, attribute: "heading-level" })],
  ao.prototype,
  "headingLevel",
);
let Ne = ao;
C("ogds-accordion", Ne);
const Re = h`@layer ogds.components{ogds-accordion-toggle::part(button){appearance:none;background-color:var(--ogds-theme-button-fill-color);border-radius:var(--ogds-theme-button-border-radius);border-color:#0000;border-width:var(--ogds-theme-button-stroke-width);color:var(--ogds-theme-button-text-color);cursor:pointer;font-family:var(--ogds-theme-button-font-family);font-size:var(--ogds-theme-type-scale-md);padding:var(--ogds-spacing-105) var(--ogds-spacing-205);font-weight:700}:is():hover{background-color:color-mix(in srgb,var(--ogds-theme-button-fill-color),black 20%)}:is():focus{outline-offset:.25rem;outline:.25rem solid #2491ff}}`;
var Be = Object.defineProperty,
  Io = (i, o, e, r) => {
    for (var t = void 0, s = i.length - 1, a; s >= 0; s--)
      (a = i[s]) && (t = a(o, e, t) || t);
    return (t && Be(o, e, t), t);
  },
  _;
const no =
  ((_ = class extends u {
    constructor() {
      (super(...arguments),
        (this.controls = ""),
        (this._anyOpen = !1),
        (this._observer = null));
    }
    connectedCallback() {
      if (
        (super.connectedCallback(),
        H(),
        _._sheet ||
          ((_._sheet = new CSSStyleSheet()),
          _._sheet.replaceSync(Re.cssText),
          (document.adoptedStyleSheets = [
            ...document.adoptedStyleSheets,
            _._sheet,
          ])),
        this.controls == "")
      ) {
        console.error(
          "<ogds-accordion-toggle>: Component must have a controls attribute with the IDof an <ogds-accordion> component",
        );
        return;
      }
      ((this._anyOpen = this.checkOpen()),
        (this._observer = new MutationObserver(() => {
          this._anyOpen = this.checkOpen();
        })));
      const i = document.getElementById(this.controls);
      i &&
        this._observer.observe(i, {
          subtree: !0,
          attributeFilter: ["open"],
        });
    }
    disconnectedCallback() {
      (super.disconnectedCallback(),
        this._observer?.disconnect(),
        (this._observer = null));
    }
    checkOpen() {
      return !!document
        .getElementById(this.controls)
        ?.querySelector("details[open]");
    }
    toggleAll() {
      const i = document.getElementById(this.controls);
      if (!i) {
        console.error(
          "<ogds-accordion-toggle>: Unable to get an accordion component with the ID specfied in the controls attribute",
        );
        return;
      }
      const o = Array.from(i.getElementsByTagName("details")),
        e = o.some((r) => r.hasAttribute("open"));
      (e
        ? o.forEach((r) => r.toggleAttribute("open", !1))
        : o.forEach((r) => r.toggleAttribute("open", !0)),
        (this._anyOpen = !e));
    }
    render() {
      return v`
      <button @click="${this.toggleAll}" part="button">
        <slot name="expand-label" ?hidden="${this._anyOpen}">Expand All</slot>
        <slot name="collapse-label" ?hidden="${!this._anyOpen}"
          >Collapse All</slot
        >
      </button>
    `;
    }
  }),
  (_._sheet = null),
  _);
Io([b({ type: String, attribute: "controls" })], no.prototype, "controls");
Io([V()], no.prototype, "_anyOpen");
let Le = no;
C("ogds-accordion-toggle", Le);
const De = h`:host{--ogds-header-divider-color:var(--ogds-color-base-lighter,#dfe1e2);--ogds-header-drawer-width:min(90vw, 21rem);--ogds-header-font-family:system-ui, sans-serif;--ogds-header-icon-close-size:1.5rem;--ogds-header-icon-menu-size:1.25rem;--ogds-header-menu-btn-background-color:var(--ogds-theme-color-primary,#005ea2);--ogds-header-menu-btn-background-color-hover:var(--ogds-theme-color-primary-dark,#1a4480);--ogds-header-menu-btn-color:var(--ogds-color-white,#fff);--ogds-header-nav-background-color:var(--ogds-color-white,#fff);--ogds-header-overlay-color:#000000b3;--ogds-header-row-gap:var(--ogds-spacing-2,1rem);--_ogds-header-max-width-or-100pct:var(--ogds-header-max-width,100%);--_ogds-header-gutter:max(var(--ogds-header-padding-inline,0), calc((100% - min(100%, var(--_ogds-header-max-width-or-100pct)))/2) );font-family:var(--ogds-header-font-family);display:block}*,:before,:after{box-sizing:border-box}.content{row-gap:var(--ogds-header-row-gap);flex-direction:column;display:flex}.navbar-row{background-color:var(--ogds-header-navbar-background-color,transparent);display:flex}.navbar-row-inner{box-sizing:content-box;align-items:center;gap:var(--ogds-spacing-2,1rem);max-width:var(--ogds-header-max-width,none);padding-block:var(--ogds-spacing-3,1.5rem);padding-inline:var(--ogds-header-padding-inline,0);justify-content:space-between;width:100%;margin-inline:auto;display:flex}.info-row{background-color:var(--ogds-header-info-background-color,transparent);border-block:1px solid var(--ogds-header-divider-color)}.info-row-inner{box-sizing:content-box;font-size:var(--ogds-theme-type-scale-2xs,.875rem);max-width:var(--ogds-header-max-width,none);padding-block:var(--ogds-spacing-05,.25rem);padding-inline:var(--ogds-header-padding-inline,0);width:100%;margin-inline:auto}.nav-secondary{gap:var(--ogds-spacing-1,.5rem);flex:none;display:flex}.primary-row{background-color:var(--ogds-header-nav-primary-row-background-color,transparent);border-block-start:1px solid var(--ogds-header-nav-primary-row-divider-color,var(--ogds-header-divider-color));display:flex}.primary-row-inner{box-sizing:content-box;align-items:center;gap:var(--ogds-spacing-2,1rem);max-width:var(--ogds-header-max-width,none);padding-inline:var(--ogds-header-padding-inline,0);justify-content:space-between;width:100%;margin-inline:auto;display:flex}.notifications{align-items:center;margin-inline-start:auto;display:flex}.menu-btn{background-color:var(--ogds-header-menu-btn-background-color);color:var(--ogds-header-menu-btn-color);cursor:pointer;font:inherit;align-items:center;gap:var(--ogds-spacing-1,.5rem);height:var(--ogds-size-touch-target,2.5rem);padding-inline:var(--ogds-spacing-2,1rem);border:none;flex:none;font-weight:700;display:none}.menu-btn:hover{background-color:var(--ogds-header-menu-btn-background-color-hover)}.menu-btn.with-icon:before{content:\"\";height:var(--ogds-header-icon-menu-size);-webkit-mask-image:var(--ogds-header-icon-menu);mask-image:var(--ogds-header-icon-menu);width:var(--ogds-header-icon-menu-size);background-color:currentColor;display:inline-block;-webkit-mask-position:50%;mask-position:50%;-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat}.nav-close{color:inherit;cursor:pointer;height:var(--ogds-size-touch-target,2.5rem);width:var(--ogds-size-touch-target,2.5rem);background:0 0;border:none;flex:none;align-self:flex-end}.nav-close:before{content:\"\";height:var(--ogds-header-icon-close-size);-webkit-mask-image:var(--ogds-header-icon-close);mask-image:var(--ogds-header-icon-close);width:var(--ogds-header-icon-close-size);background-color:currentColor;margin-inline:auto;display:block;-webkit-mask-position:50%;mask-position:50%;-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat}.nav{background-color:var(--ogds-header-nav-background-color);color:inherit;max-width:none;height:100%;max-height:none;padding:var(--ogds-spacing-2,1rem);width:var(--ogds-header-drawer-width);border:none;margin:0;position:fixed;inset-block:0;inset-inline:auto 0;translate:100%}.nav.no-transition{transition:none}.nav::backdrop{background:var(--ogds-header-overlay-color)}.nav[open]{flex-direction:column;display:flex;translate:0}@media(prefers-reduced-motion:no-preference){.nav{transition:translate .3s ease-in-out,display .3s ease-in-out allow-discrete,overlay .3s ease-in-out allow-discrete}@starting-style{.nav[open]{translate:100%}}}.nav-primary{display:block}.nav>.nav-secondary{background-color:var(--ogds-header-nav-secondary-background-color,transparent);flex-direction:column}.nav-primary-row{border-block-start:1px solid var(--ogds-header-nav-primary-row-divider-color,var(--ogds-header-divider-color));margin-block-start:var(--ogds-spacing-2,1rem);padding-block-start:var(--ogds-spacing-2,1rem)}@media not (min-width:64rem){.menu-btn{display:inline-flex}.navbar-row-inner{padding-inline-end:var(--ogds-header-menu-btn-padding-inline-end,var(--ogds-header-padding-inline,0))}.nav-close{display:block}}@media(min-width:64rem){.navbar-row:has(>.nav-secondary) .navbar-row-inner{max-width:none;padding-inline:0;flex:auto;width:auto;margin-inline:0;padding-inline-start:var(--_ogds-header-gutter)}.navbar-row>.nav-secondary{background-color:var(--ogds-header-nav-secondary-background-color,var(--ogds-header-navbar-background-color,transparent));flex-direction:column;justify-content:center;align-self:stretch;align-items:flex-end;padding-inline-end:var(--_ogds-header-gutter)}.primary-row>.nav-secondary{background-color:var(--ogds-header-nav-secondary-background-color,var(--ogds-header-nav-primary-row-background-color,transparent));align-self:stretch;align-items:center;padding-inline-start:var(--_ogds-header-gutter)}.primary-row:has(>.nav-secondary) .primary-row-inner{max-width:none;padding-inline:0;flex:auto;width:auto;margin-inline:0;padding-inline-end:var(--_ogds-header-gutter)}}[hidden]{display:none}`,
  je =
    "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%3e%3cpath%20d='M3%2018h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z'/%3e%3c/svg%3e";
var Ie = Object.defineProperty,
  lo = (i, o, e, r) => {
    for (var t = void 0, s = i.length - 1, a; s >= 0; s--)
      (a = i[s]) && (t = a(o, e, t) || t);
    return (t && Ie(o, e, t), t);
  };
const Ve = "(width >= 64rem)",
  qe = h`
  :host {
    --ogds-header-icon-close: url("${p(Lo)}");
    --ogds-header-icon-menu: url("${p(je)}");
  }
`,
  Vo = class extends u {
    constructor() {
      (super(...arguments),
        (this.variant = "extended"),
        (this.icon = !1),
        (this._isDesktopMode = !0),
        (this._desktopQuery = null),
        (this._onViewportChange = () => {
          const o = this._desktopQuery?.matches ?? !0;
          (o &&
            !this._isDesktopMode &&
            (this._navDialog?.close(),
            this._menuBtn?.setAttribute("aria-expanded", "false")),
            (this._isDesktopMode = o));
        }));
    }
    connectedCallback() {
      (super.connectedCallback(),
        H(),
        this.hasAttribute("role") || this.setAttribute("role", "banner"),
        typeof matchMedia == "function" &&
          ((this._desktopQuery = matchMedia(Ve)),
          (this._isDesktopMode = this._desktopQuery.matches),
          this._desktopQuery.addEventListener(
            "change",
            this._onViewportChange,
          )));
    }
    disconnectedCallback() {
      (super.disconnectedCallback(),
        this._desktopQuery?.removeEventListener(
          "change",
          this._onViewportChange,
        ));
    }
    /** @ignore */
    get _navDialog() {
      return this.renderRoot.querySelector("dialog");
    }
    /** @ignore */
    get _menuBtn() {
      return this.renderRoot.querySelector(".menu-btn");
    }
    /** @ignore */
    _onMenuBtnClick() {
      this._navDialog?.open ||
        (this._navDialog?.showModal(),
        this._menuBtn?.setAttribute("aria-expanded", "true"));
    }
    /** @ignore */
    _onCloseBtnClick() {
      this._navDialog?.close();
    }
    /** @ignore */
    _onDialogClose() {
      this._menuBtn?.setAttribute("aria-expanded", "false");
    }
    /**
     * @ignore
     */
    _onDialogClick(o) {
      o.target === this._navDialog && this._navDialog?.close();
    }
    /** @ignore */
    _onOptionalSlotChange(o) {
      const e = o.target,
        r = e.closest("[data-hide-when-empty]");
      r && (r.hidden = e.assignedNodes({ flatten: !0 }).length === 0);
    }
    /** @ignore */
    _renderNavSecondary() {
      return v`
      <nav
        class="nav-secondary"
        part="nav-secondary"
        data-hide-when-empty
        hidden
        aria-label="Secondary navigation"
      >
        <slot
          name="nav-secondary"
          @slotchange=${this._onOptionalSlotChange}
        ></slot>
      </nav>
    `;
    }
    /** @ignore */
    _renderPrimaryContent() {
      return v`
      <div class="nav-primary"><slot name="nav-primary"></slot></div>
      <div
        class="notifications"
        part="notifications"
        data-hide-when-empty
        hidden
      >
        <slot
          name="notifications"
          @slotchange=${this._onOptionalSlotChange}
        ></slot>
      </div>
    `;
    }
    render() {
      const o = this._isDesktopMode,
        e = this.variant === "extended";
      return v`
      <div class="content">
        <div class="navbar-row" part="navbar">
          <div class="navbar-row-inner" part="navbar-inner">
            <div class="logo" part="logo"><slot name="logo"></slot></div>
            <button
              type="button"
              class="menu-btn ${this.icon ? "with-icon" : ""}"
              part="menu-btn"
              aria-controls="nav"
              aria-expanded="false"
              @click=${this._onMenuBtnClick}
            >
              Menu
            </button>
          </div>
          ${o && e ? this._renderNavSecondary() : g}
        </div>

        <div class="info-row" part="info" data-hide-when-empty hidden>
          <div class="info-row-inner" part="info-inner">
            <slot name="info" @slotchange=${this._onOptionalSlotChange}></slot>
          </div>
        </div>

        ${
          o
            ? v`
                <div class="primary-row" part="nav-primary-row">
                  ${e ? g : this._renderNavSecondary()}
                  <div class="primary-row-inner" part="nav-primary-row-inner">
                    ${this._renderPrimaryContent()}
                  </div>
                </div>
              `
            : v`
                <dialog
                  id="nav"
                  class="nav"
                  aria-label="Header navigation"
                  @close=${this._onDialogClose}
                  @click=${this._onDialogClick}
                >
                  <button
                    type="button"
                    class="nav-close"
                    part="nav-close"
                    aria-label="Close menu"
                    @click=${this._onCloseBtnClick}
                  ></button>
                  ${this._renderNavSecondary()}
                  <div class="nav-primary-row" part="nav-primary-row">
                    ${this._renderPrimaryContent()}
                  </div>
                </dialog>
              `
        }
      </div>
    `;
    }
  };
Vo.styles = [qe, De];
let q = Vo;
lo([b({ reflect: !0 })], q.prototype, "variant");
lo([b({ type: Boolean, reflect: !0 })], q.prototype, "icon");
lo([V()], q.prototype, "_isDesktopMode");
C("ogds-header", q);
const Fe = h`@layer ogds.components{.ogds-primary-nav,ogds-primary-nav{--ogds-primary-nav-current-indicator-color:var(--ogds-theme-color-primary,#005ea2);--ogds-primary-nav-focus-outline-color:var(--ogds-theme-focus-color,#2491ff);--ogds-primary-nav-font-family:system-ui, sans-serif;--ogds-primary-nav-font-size:var(--ogds-theme-type-scale-md,1.0625rem);--ogds-primary-nav-icon-size:1.25rem;--ogds-primary-nav-link-color:var(--ogds-theme-text-color,#1b1b1b);--ogds-primary-nav-link-hover-background-color:var(--ogds-theme-color-base-lightest,#f0f0f0);--ogds-primary-nav-link-hover-color:var(--ogds-theme-color-primary,#005ea2);--ogds-primary-nav-submenu-background-color:var(--ogds-theme-color-primary-darker,#162e51);--ogds-primary-nav-submenu-divider-color:var(--ogds-theme-color-base-lighter,#dfe1e2);--ogds-primary-nav-submenu-link-color:var(--ogds-theme-text-reverse-color,#fff);box-sizing:border-box;font-family:var(--ogds-primary-nav-font-family);font-size:var(--ogds-primary-nav-font-size);display:block}:is(.ogds-primary-nav,ogds-primary-nav) :before,:is(.ogds-primary-nav,ogds-primary-nav) *,:is(.ogds-primary-nav,ogds-primary-nav) :after{box-sizing:border-box}:is(.ogds-primary-nav,ogds-primary-nav) ul{margin:0;padding:0;list-style:none}:is(.ogds-primary-nav,ogds-primary-nav)>ul{flex-direction:column;display:flex}:is(.ogds-primary-nav,ogds-primary-nav) li{padding:var(--ogds-spacing-105,.75rem) var(--ogds-spacing-2,1rem);position:relative}:is(.ogds-primary-nav,ogds-primary-nav)>ul>li:first-child a,:is(.ogds-primary-nav,ogds-primary-nav)>ul>li:first-child>details>summary{padding-inline-start:0}:is(.ogds-primary-nav,ogds-primary-nav) a,:is(.ogds-primary-nav,ogds-primary-nav) summary{color:var(--ogds-primary-nav-link-color);cursor:pointer;justify-content:space-between;align-items:center;gap:.5rem;font-weight:700;text-decoration:none;display:flex}:is(:is(.ogds-primary-nav,ogds-primary-nav) a,:is(.ogds-primary-nav,ogds-primary-nav) summary):focus-visible{outline:.25rem solid var(--ogds-primary-nav-focus-outline-color)}:is(.ogds-primary-nav,ogds-primary-nav)>ul>li>a:hover,:is(.ogds-primary-nav,ogds-primary-nav)>ul>li>a[aria-current=page],:is(.ogds-primary-nav,ogds-primary-nav)>ul>li>details:not([open])>summary:hover,:is(.ogds-primary-nav,ogds-primary-nav)>ul>li>details>summary[aria-current=page]{position:relative}:is(:is(.ogds-primary-nav,ogds-primary-nav)>ul>li>a:hover,:is(.ogds-primary-nav,ogds-primary-nav)>ul>li>a[aria-current=page],:is(.ogds-primary-nav,ogds-primary-nav)>ul>li>details:not([open])>summary:hover,:is(.ogds-primary-nav,ogds-primary-nav)>ul>li>details>summary[aria-current=page]):before{background-color:var(--ogds-primary-nav-current-indicator-color);content:\"\";bottom:-.5rem;height:.25rem;position:absolute;inset-inline:0}:is(.ogds-primary-nav,ogds-primary-nav) summary{list-style:none}:is(.ogds-primary-nav,ogds-primary-nav) summary::-webkit-details-marker{display:none}:is(.ogds-primary-nav,ogds-primary-nav) summary:after{content:\"\";height:var(--ogds-primary-nav-icon-size);-webkit-mask-image:var(--ogds-primary-nav-icon-chevron-down);mask-image:var(--ogds-primary-nav-icon-chevron-down);width:var(--ogds-primary-nav-icon-size);background-color:currentColor;flex-shrink:0;-webkit-mask-position:50%;mask-position:50%;-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat}:is(.ogds-primary-nav,ogds-primary-nav) details[open]>summary:after{-webkit-mask-image:var(--ogds-primary-nav-icon-chevron-up);mask-image:var(--ogds-primary-nav-icon-chevron-up)}:is(.ogds-primary-nav,ogds-primary-nav) details>ul{padding-block:var(--ogds-spacing-1,.5rem);background-color:#0000}:is(.ogds-primary-nav,ogds-primary-nav) details>ul>li{border-block-start:1px solid var(--ogds-primary-nav-submenu-divider-color)}:is(.ogds-primary-nav,ogds-primary-nav) details>ul a{color:var(--ogds-primary-nav-link-color);padding-inline-start:var(--ogds-spacing-4,2rem);font-weight:400}:is(.ogds-primary-nav,ogds-primary-nav) details>ul a:hover{text-decoration:underline}:is(.ogds-primary-nav,ogds-primary-nav) details>ul a:focus-visible{outline-offset:-.25rem}:is(.ogds-primary-nav,ogds-primary-nav) details>ul>li:has(>a:hover){background-color:var(--ogds-primary-nav-link-hover-background-color)}@media(min-width:64rem){:is(.ogds-primary-nav,ogds-primary-nav)>ul{flex-direction:row;align-items:stretch}:is(.ogds-primary-nav,ogds-primary-nav) li{padding-block:var(--ogds-spacing-1,.5rem)}:is(.ogds-primary-nav,ogds-primary-nav)>ul>li{display:flex}:is(.ogds-primary-nav,ogds-primary-nav)>ul>li>a:hover,:is(.ogds-primary-nav,ogds-primary-nav)>ul>li>details:not([open])>summary:hover{color:var(--ogds-primary-nav-link-hover-color);background-color:#0000}:is(.ogds-primary-nav,ogds-primary-nav)>ul>li:has(>details[open]){background-color:var(--ogds-primary-nav-submenu-background-color)}:is(.ogds-primary-nav,ogds-primary-nav) details[open]>summary{color:var(--ogds-primary-nav-submenu-link-color)}:is(.ogds-primary-nav,ogds-primary-nav) details>ul{background-color:var(--ogds-primary-nav-submenu-background-color);inset-inline-start:0;inline-size:15rem;position:absolute;top:100%}:is(.ogds-primary-nav,ogds-primary-nav) details>ul>li{border-block-start:none}:is(.ogds-primary-nav,ogds-primary-nav) details>ul>li:has(>a:hover){background-color:#0000}:is(.ogds-primary-nav,ogds-primary-nav) details>ul a{color:var(--ogds-primary-nav-submenu-link-color);padding-inline-start:0}}}:is(.ogds-primary-nav,ogds-primary-nav) summary{display:flex}`;
let Qe = 0;
const qo = class O extends u {
  constructor() {
    (super(...arguments),
      (this._instanceName = `ogds-primary-nav-${++Qe}`),
      (this._submenus = []),
      (this._onDocumentClick = (o) => {
        const e = o.target;
        this._submenus.forEach((r) => {
          r.open && e && !r.contains(e) && (r.open = !1);
        });
      }),
      (this._onKeydown = (o) => {
        if (o.key !== "Escape") return;
        const e = this._submenus.filter((s) => s.open);
        if (e.length === 0) return;
        const r = document.activeElement,
          t = e.find((s) => r instanceof Node && s.contains(r)) ?? e[0];
        ((t.open = !1),
          t.querySelector(":scope > summary")?.focus(),
          o.stopPropagation());
      }));
  }
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    if ((super.connectedCallback(), H(), !O._stylesheet)) {
      const o = `${`ogds-primary-nav, .ogds-primary-nav {
        --ogds-primary-nav-icon-chevron-down: url("${io}");
        --ogds-primary-nav-icon-chevron-up: url("${so}");
      }`}
${Fe.cssText}`;
      ((O._stylesheet = new CSSStyleSheet()),
        O._stylesheet.replaceSync(o),
        (document.adoptedStyleSheets = [
          ...document.adoptedStyleSheets,
          O._stylesheet,
        ]));
    }
    (this.hasAttribute("role") || this.setAttribute("role", "navigation"),
      !this.hasAttribute("aria-label") &&
        !this.hasAttribute("aria-labelledby") &&
        this.setAttribute("aria-label", "Primary navigation"),
      (this._submenus = Array.from(
        this.querySelectorAll(":scope > ul > li > details"),
      )),
      this._submenus.forEach((o) => {
        o.hasAttribute("name") || o.setAttribute("name", this._instanceName);
      }),
      document.addEventListener("click", this._onDocumentClick),
      this.addEventListener("keydown", this._onKeydown));
  }
  disconnectedCallback() {
    (super.disconnectedCallback(),
      document.removeEventListener("click", this._onDocumentClick),
      this.removeEventListener("keydown", this._onKeydown));
  }
  render() {
    return g;
  }
};
qo._stylesheet = null;
let We = qo;
C("ogds-primary-nav", We);
const Ke = h`:host{display:block}.header{flex-direction:column;gap:.5rem;margin-block-end:1.5rem;display:flex}.counter{color:var(--ogds-color-gray-90,#1b1b1b);margin:0;padding-block-start:1rem;font-family:Source Sans Pro Web,Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;font-size:2.125rem;font-weight:700;line-height:1}::slotted(*){margin-block:0}.steps{border-block-end:1px solid var(--ogds-task-list-border-color,var(--ogds-color-gray-50,#757575));margin:0;padding:0;list-style:none}`;
var Je = Object.defineProperty,
  co = (i, o, e, r) => {
    for (var t = void 0, s = i.length - 1, a; s >= 0; s--)
      (a = i[s]) && (t = a(o, e, t) || t);
    return (t && Je(o, e, t), t);
  };
const So = {
    1: z`h1`,
    2: z`h2`,
    3: z`h3`,
    4: z`h4`,
    5: z`h5`,
    6: z`h6`,
  },
  Fo = class extends u {
    constructor() {
      (super(...arguments),
        (this.baseHeadingLevel = 2),
        (this._completedCount = 0),
        (this._totalCount = 0));
    }
    connectedCallback() {
      (super.connectedCallback(), H());
    }
    // this will fire once when the component mounts, which is ok for our usage.
    // in a world where we needed to worry about the statuses changing dynamically
    // we would need a mutationObserver
    _onSlotChange(o) {
      const e = o.target
        .assignedElements({ flatten: !0 })
        .filter((r) => r.tagName.toLowerCase() === "ogds-task-list-step");
      ((this._totalCount = e.length),
        (this._completedCount = e.filter(
          (r) => r.status === "completed",
        ).length));
    }
    render() {
      const o = So[this.baseHeadingLevel] ?? So[2];
      return v`
      <section aria-labelledby="counter">
        <div class="header">
          ${Se`<${o} class="counter" id="counter">
            ${this._completedCount}
            <slot name="counter-separator">of</slot>
            ${this._totalCount}
            <slot name="counter-label">tasks completed</slot>
          </${o}>`}
          <slot name="instruction"></slot>
        </div>
        <ul class="steps" role="list">
          <slot @slotchange=${this._onSlotChange}></slot>
        </ul>
      </section>
    `;
    }
  };
Fo.styles = p(Ke);
let F = Fo;
co(
  [b({ type: Number, attribute: "base-heading-level" })],
  F.prototype,
  "baseHeadingLevel",
);
co([V()], F.prototype, "_completedCount");
co([V()], F.prototype, "_totalCount");
C("ogds-task-list", F);
const Ze =
    "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%3e%3cpath%20d='M12%202C6.48%202%202%206.48%202%2012s4.48%2010%2010%2010%2010-4.48%2010-10S17.52%202%2012%202zm-2%2015-5-5%201.41-1.41L10%2014.17l7.59-7.59L19%208l-9%209z'/%3e%3c/svg%3e",
  Ge =
    "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%3e%3cpath%20d='m12%204-1.41%201.41L16.17%2011H4v2h12.17l-5.58%205.59L12%2020l8-8z'/%3e%3c/svg%3e",
  Xe = h`:host{--ogds-task-list-step-gap:.625rem;border-top:1px solid var(--ogds-task-list-step-border-color,var(--ogds-color-gray-50,#757575));gap:var(--ogds-task-list-step-gap);flex-direction:column;padding:1.25rem 1rem;display:flex}.title{font-family:Source Sans Pro Web,Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;font-size:var(--ogds-font-size-8);font-weight:700;line-height:normal}.title:is(a){color:var(--ogds-color-blue-vivid-60,#005ea2);text-underline-offset:2px;align-self:flex-start;align-items:center;gap:.5rem;text-decoration:underline;display:inline-flex}.title:is(a):hover{color:var(--ogds-color-blue-vivid-70,#0b4778)}.title:is(span){color:var(--ogds-color-gray-90,#1b1b1b);display:block}.arrow{height:2rem;-webkit-mask-image:var(--ogds-icon-arrow-forward);mask-image:var(--ogds-icon-arrow-forward);background-color:currentColor;flex-shrink:0;width:2rem;display:inline-block;-webkit-mask-position:50%;mask-position:50%;-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat}.ogds-tag.badge{border-radius:1.5rem;align-items:center;gap:.625rem;width:fit-content;padding:.375rem .75rem;font-family:Source Sans Pro Web,Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;font-size:1.1875rem;line-height:1;display:inline-flex}:host([status=not-started]) .ogds-tag.badge{background-color:var(--ogds-color-blue-5,#eff6fb);color:var(--ogds-color-blue-80,#1f303e)}:host([status=in-progress]) .ogds-tag.badge{background-color:var(--ogds-color-blue-10,#d9e8f6);color:var(--ogds-color-blue-80,#1f303e)}:host([status=completed]) .ogds-tag.badge{background-color:var(--ogds-color-mint-5,#dbf6ed);color:var(--ogds-color-mint-70,#204e34)}:host([status=cannot-start-yet]) .ogds-tag.badge{background-color:var(--ogds-color-gray-10,#e6e6e6);color:var(--ogds-color-gray-90,#1b1b1b)}.badge-icon{height:1.25rem;-webkit-mask-image:var(--ogds-icon-check-circle);mask-image:var(--ogds-icon-check-circle);background-color:currentColor;flex-shrink:0;width:1.25rem;display:inline-block;-webkit-mask-position:50%;mask-position:50%;-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat}.blocked-message{color:var(--ogds-color-gray-90,#1b1b1b);margin:0;font-family:Source Sans Pro Web,Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;font-size:1.0625rem;line-height:1.5}::slotted(*){margin-block:0}::slotted(:not([slot=title])){font-family:Source Sans Pro Web,Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;font-size:1.0625rem;line-height:1.5}::slotted(dl){flex-direction:column;padding:0;display:flex}`;
var Ye = Object.defineProperty,
  Qo = (i, o, e, r) => {
    for (var t = void 0, s = i.length - 1, a; s >= 0; s--)
      (a = i[s]) && (t = a(o, e, t) || t);
    return (t && Ye(o, e, t), t);
  };
const Wo = class extends u {
  constructor() {
    (super(...arguments), (this.status = "not-started"), (this.url = ""));
  }
  connectedCallback() {
    (super.connectedCallback(),
      H(),
      this.hasAttribute("role") || this.setAttribute("role", "listitem"));
  }
  get _badgeLabel() {
    return {
      completed: "Completed",
      "in-progress": "In progress",
      "not-started": "Not started",
      "cannot-start-yet": "Cannot start yet",
    }[this.status];
  }
  render() {
    const o = this.status === "cannot-start-yet",
      e = this.status === "completed";
    return v`
      ${
        o
          ? v`<span class="title" aria-describedby="blocked-message"
              ><slot name="title"></slot
            ></span>`
          : v`<a class="title" href=${this.url} aria-describedby="badge">
              <slot name="title"></slot
              ><span class="arrow" aria-hidden="true"></span>
            </a>`
      }
      <span class="ogds-tag badge" id="badge">
        ${e ? v`<span class="badge-icon" aria-hidden="true"></span>` : g}
        <slot name="status-label">${this._badgeLabel}</slot>
      </span>
      <slot name="alert"></slot>
      <slot name="description"></slot>
      <slot name="saved-data"></slot>
      ${
        o
          ? v`<p class="blocked-message" id="blocked-message">
              <slot name="blocked-message"
                >Not available until previous tasks are complete.</slot
              >
            </p>`
          : g
      }
    `;
  }
};
Wo.styles = [
  h`
      :host {
        --ogds-icon-check-circle: url("${p(Ze)}");
        --ogds-icon-arrow-forward: url("${p(Ge)}");
      }
    `,
  Xe,
];
let go = Wo;
Qo([b({ reflect: !0 })], go.prototype, "status");
Qo([b()], go.prototype, "url");
C("ogds-task-list-step", go);
