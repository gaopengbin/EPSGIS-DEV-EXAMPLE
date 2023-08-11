var bt = Object.defineProperty;
var xt = (n, e, t) => e in n ? bt(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var g = (n, e, t) => (xt(n, typeof e != "symbol" ? e + "" : e, t), t), G = (n, e, t) => {
  if (!e.has(n))
    throw TypeError("Cannot " + t);
};
var r = (n, e, t) => (G(n, e, "read from private field"), t ? t.call(n) : e.get(n)), l = (n, e, t) => {
  if (e.has(n))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(n) : e.set(n, t);
}, c = (n, e, t, i) => (G(n, e, "write to private field"), i ? i.call(n, t) : e.set(n, t), t);
var d = (n, e, t) => (G(n, e, "access private method"), t);
class X {
  /**
   * 加载js文件
   * @param src 需要加载的js的地址
   * @param isModule 是否是ES6
   * @returns 
   */
  static loadScript(e, t = !1) {
    return new Promise((i) => {
      if (e === "") {
        i(!1);
        return;
      }
      const s = document.createElement("script");
      s.type = "text/javascript", s.async = !1, s.onload = () => {
        s.remove(), i(!0);
      }, s.onerror = () => {
        s.remove(), i(!1);
      }, t && (s.type = "module"), s.src = e, document.head.append ? document.head.append(s) : document.getElementsByTagName("head")[0].appendChild(s);
    });
  }
  /**
   * 加载css文件
   * @param href 
   * @returns 
   */
  static loadCSS(e) {
    return new Promise((t) => {
      if (e === "") {
        t(!1);
        return;
      }
      const i = document.createElement("link");
      i.rel = "stylesheet", i.href = e, i.onload = () => {
        t(!0);
      }, i.onerror = () => {
        t(!1);
      }, document.head.append ? document.head.append(i) : document.getElementsByTagName("head")[0].appendChild(i);
    });
  }
  /**
   * 加载json
   * @param url 
   * @returns 
   */
  static async loadJSON(e) {
    return await (await fetch(e)).json();
  }
}
const vt = async () => {
  const n = window.isDebug;
  let e = "configs/setting.json";
  n && (e = "configs/debug.json");
  const t = await X.loadJSON(e);
  let i = [];
  t.include.forEach((s) => {
    t.modules[s].forEach((a) => {
      switch (a.type) {
        case "css":
          i.push(X.loadCSS(a.url));
          break;
        case "js":
          i.push(X.loadScript(a.url));
          break;
        case "module":
          i.push(X.loadScript(a.url, !0));
          break;
      }
    });
  }), await Promise.all(i);
};
var T;
class St extends HTMLElement {
  constructor() {
    super();
    /**
     * 原始属性
     */
    l(this, T, void 0);
    c(this, T, this.innerHTML.trim());
  }
  get origin() {
    return r(this, T);
  }
}
T = new WeakMap();
customElements.define("w-l", St);
var w = /* @__PURE__ */ ((n) => (n[n.none = 0] = "none", n[n.funOnly = 1] = "funOnly", n[n.propOnly = 2] = "propOnly", n[n.always = 3] = "always", n))(w || {});
const ct = (n) => (e) => (e.prototype._manifest = zt(n), customElements.define(n.tagName, e), e), zt = (n) => (n = Object.assign({
  hasConfig: !1,
  mode: w.always
}, n), n), rt = (n) => {
  Promise ? Promise.resolve().then(n) : requestAnimationFrame ? requestAnimationFrame(n) : setTimeout(n, 0);
};
var E, P, C, I, A, N, O, D, x, j, K, W, pt, q, gt, L, Y, M, U, mt, R, Q, H, ft, V, Z, F, ut, k, wt, v, y, z;
class dt extends HTMLElement {
  //组件模式
  constructor() {
    super();
    /**
     * 加载config
     * 当config不存在时，从文件加载config
     */
    l(this, j);
    /**
     * loading状态改变
     */
    l(this, W);
    /**
     * 初始化方法，用于初始化Dom
     */
    l(this, q);
    /**
     * 对象劫持
     * @param {any} value 
     * @returns {any}
     */
    l(this, L);
    /**
     * 延迟执行刷新 防抖 
     * 主要是防止数组的length也会触发刷新
     * @returns 
     */
    l(this, U);
    /**
     * 刷新所有 #labelTag 标签内容
     * {{}}已经被 #labelTag 标签替换
     */
    l(this, R);
    /**
     * 绑定属性
     * @param att 需要绑定的属性 如s-value
     */
    l(this, H);
    /**
     * 获取指定属性值
     * @param {string} origin 需要获取的属性 如a.b
     * @returns 对应属性的值
     */
    l(this, V);
    /**
     * 设置$data中的属性
     * @param key 
     * @param value 
     */
    l(this, F);
    /**
     * 给dom绑定$this，指向当前组件
     */
    l(this, k);
    /**
     * 组件初始化方法，只初始化一次
     * 需要判断所有必要条件添加完成再进行初始化
     */
    l(this, y);
    // 任意的string索引List
    // 一些私有属性
    l(this, E, void 0);
    l(this, P, void 0);
    l(this, C, void 0);
    l(this, I, void 0);
    l(this, A, void 0);
    l(this, N, void 0);
    l(this, O, "w-l");
    // label标签的名称
    l(this, D, !1);
    // 渲染是否完成
    l(this, x, void 0);
    l(this, M, !1);
    /**
     * 组件初始化状态，设置多个用于防抖
     * unInited 未初始化
     * initing 正在初始化
     * inited 已经初始化
     */
    l(this, v, "unInited");
    this.manifest.hasConfig && d(this, j, K).call(this, this.getAttribute("config") || this.getAttribute("configUrl")), c(this, x, this.manifest.mode ?? w.always), rt(() => {
      d(this, q, gt).call(this), d(this, y, z).call(this);
    });
  }
  /**
   * 手动启动初始化的方法
   * @param args 初始化的必要参数
   */
  startup(t) {
    this.mapView = t.mapView, this.map = t.map, this.mapConfig = t.mapConfig, this.config = t.config;
  }
  /**
   * 组件的创建参数
   */
  get manifest() {
    return this._manifest;
  }
  /**
   * 当前组件所在地图的配置 类似于之前的appConfig
   */
  get mapConfig() {
    return r(this, E);
  }
  set mapConfig(t) {
    !r(this, E) && t && (c(this, E, t), d(this, y, z).call(this));
  }
  /**
   * 组件所在地图的原型，如果组件本身为地图，则指向自身
   */
  get mapView() {
    return r(this, P);
  }
  set mapView(t) {
    !r(this, P) && t && (c(this, P, t), d(this, y, z).call(this));
  }
  /**
    * 当前组件所在地图
    */
  get map() {
    return r(this, C);
  }
  set map(t) {
    !r(this, C) && t && (c(this, C, t), d(this, y, z).call(this));
  }
  /**
    * 当前组件的配置
    */
  get config() {
    return r(this, I);
  }
  set config(t) {
    if (typeof t == "string") {
      d(this, j, K).call(this, t);
      return;
    } else
      typeof t == "object" && !r(this, I) && t && (c(this, I, t), d(this, y, z).call(this));
  }
  /**
   * 加载中
   */
  get loading() {
    return !!r(this, A);
  }
  set loading(t) {
    c(this, A, t), d(this, W, pt).call(this);
  }
  /**
   * 用于渲染html的数据
   */
  get $data() {
    return r(this, N);
  }
  set $data(t) {
    (r(this, x) & w.propOnly) == w.propOnly ? (c(this, N, d(this, L, Y).call(this, t)), d(this, R, Q).call(this)) : c(this, N, t);
  }
  /**
   * 是否可以开始初始化，该方法可以被重写
   * @returns 是否可以开始初始化
   */
  isReady() {
    return !!(this.map && this.mapView && this.mapConfig && (this.config || !this.manifest.hasConfig));
  }
  /**
   * 组件初始化方法
   */
  async onInit() {
  }
  /**
   * 初始化完成之后调用的方法，该方法可以被重写
   */
  afterInit() {
  }
  /**
   * 当组件被打开
   */
  onOpen() {
  }
  /**
   * 当组件被关闭
   */
  onClose() {
  }
}
E = new WeakMap(), P = new WeakMap(), C = new WeakMap(), I = new WeakMap(), A = new WeakMap(), N = new WeakMap(), O = new WeakMap(), D = new WeakMap(), x = new WeakMap(), j = new WeakSet(), K = async function(t) {
  if (!this.config && t) {
    this.loading = !0;
    const i = await fetch(t);
    this.config = i && i.ok && await i.json() || {}, this.loading = !1;
  }
}, W = new WeakSet(), pt = function() {
  this.loading ? this.classList.add("loading") : this.classList.remove("loading");
}, q = new WeakSet(), gt = function() {
  const t = this.manifest.className || this.manifest.tagName;
  if (this.classList.add(t), this.manifest.template) {
    let i = this.manifest.template;
    (r(this, x) & w.propOnly) == w.propOnly && (i = i.replace(/\{\{(.+?)\}\}/g, (...s) => `<${r(this, O)}>${s[1]}</${r(this, O)}>`)), this.innerHTML = i, (r(this, x) & w.funOnly) == w.funOnly && d(this, k, wt).call(this);
  }
  c(this, D, !0);
}, L = new WeakSet(), Y = function(t) {
  return typeof t == "object" ? (Object.keys(t).forEach((i) => {
    t[i] = d(this, L, Y).call(this, t[i]);
  }), new Proxy(t, {
    set: (i, s, o) => (i[s] = d(this, L, Y).call(this, o), d(this, U, mt).call(this), !0)
    // get: (obj, p) => {
    //     // 判断是否需要刷新dom
    //     return obj[p];
    // },
  })) : t;
}, M = new WeakMap(), U = new WeakSet(), mt = function() {
  r(this, M) || (c(this, M, !0), rt(() => {
    d(this, R, Q).call(this), c(this, M, !1);
  }));
}, R = new WeakSet(), Q = function() {
  ["s-value", "s-src"].forEach((s) => {
    d(this, H, ft).call(this, s);
  }), this.querySelectorAll(r(this, O)).forEach((s) => {
    const o = d(this, V, Z).call(this, s.origin);
    String(o) !== s.innerHTML && (s.innerHTML = o);
  });
}, H = new WeakSet(), ft = function(t) {
  this.querySelectorAll(`[${t}]`).forEach((s) => {
    const o = s.getAttribute(t), a = t.replace("s-", ""), h = d(this, V, Z).call(this, o);
    h !== s[a] && (s[a] = h);
  });
}, V = new WeakSet(), Z = function(t) {
  try {
    return t.split(".").reduce((i, s) => i[s], this.$data);
  } catch (i) {
    console.error(i);
    return;
  }
}, F = new WeakSet(), ut = function(t, i) {
  let s = this.$data, o = t.split(".");
  for (let a = 0; a < o.length; a++) {
    const h = o[a];
    a == o.length - 1 ? s[h] = i : s = s[h];
  }
}, k = new WeakSet(), wt = function() {
  this.querySelectorAll("*").forEach((i) => {
    i.$this || (i.$this = this, i.$set = (s, o) => {
      d(this, F, ut).call(this, s, o);
    });
  });
}, v = new WeakMap(), y = new WeakSet(), z = async function() {
  r(this, D) && (r(this, v) === "initing" || r(this, v) === "inited" || this.isReady() && (c(this, v, "initing"), this.loading = !0, await this.onInit(), this.loading = !1, c(this, v, "inited"), this.afterInit()));
};
const Et = (n) => {
  let e = {};
  return [
    "left",
    "top",
    "right",
    "bottom",
    "width",
    "height",
    "margin",
    "margin-left",
    "margin-top",
    "margin-right",
    "margin-bottom",
    "padding",
    "padding-left",
    "padding-top",
    "padding-right",
    "padding-bottom",
    "z-index"
  ].forEach((i) => {
    typeof n[i] == "number" ? e[i] = n[i] + "px" : typeof n[i] < "u" && (e[i] = n[i]);
  }), e;
}, tt = (n) => {
  let e = "";
  for (const t in n)
    n.hasOwnProperty(t) && (e += `${t}:${n[t]};`);
  return e;
};
var Pt = Object.defineProperty, Ct = Object.getOwnPropertyDescriptor, It = (n, e, t, i) => {
  for (var s = i > 1 ? void 0 : i ? Ct(e, t) : e, o = n.length - 1, a; o >= 0; o--)
    (a = n[o]) && (s = (i ? a(e, t, s) : a(s)) || s);
  return i && s && Pt(e, t, s), s;
}, J, yt, ht;
let ot = (ht = class extends dt {
  constructor() {
    super();
    /**
     * 添加参数默认值
     * @param {WidgetConfig} widgetConfig 
     * @returns {WidgetConfig}
     */
    l(this, J);
  }
  async onInit() {
    this.config.forEach((e) => {
      this.addWidget(e);
    });
  }
  /**
   * 添加widget到当前dom
   * @param {WidgetConfig}_config 
   */
  addWidget(e) {
    e = d(this, J, yt).call(this, e);
    try {
      if (e.inPanel) {
        const t = this.createIcon(e);
        this.appendChild(t);
      } else {
        const t = this.createWidget(e);
        this.appendChild(t);
      }
    } catch (t) {
      console.error(t);
    }
  }
  /**
   * 创建一个widget图标
   * @param {WidgetConfig} _config 
   * @returns {BaseWidget}
   */
  createIcon(e) {
    const t = document.createElement("webgis-widget-icon");
    t.startup({
      mapView: this.mapView,
      map: this.map,
      config: e,
      mapConfig: this.mapConfig
    });
    const { width: i, height: s, ...o } = e.position, a = tt(o);
    return t.setAttribute("style", a), t.title = e.label || e.tagName, t;
  }
  /**
   * 创建一个widget
   * @param {WidgetConfig}_config 
   * @returns {BaseWidget}
   */
  createWidget(e) {
    if (!e.tagName)
      throw new Error("tagName不能为空");
    const t = document.createElement(e.tagName);
    if (!t.startup)
      throw new Error(`没有找到tagName为${e.tagName}的组件`);
    t.startup({
      mapView: this.mapView,
      map: this.map,
      config: e.config,
      mapConfig: this.mapConfig
    });
    const i = e.position, s = tt(i);
    return t.setAttribute("style", s), t.style.zIndex = t.style.zIndex || "1", t;
  }
}, J = new WeakSet(), yt = function(e) {
  return e = Object.assign({
    label: "",
    tagName: "",
    position: {},
    inPanel: !1,
    icon: "",
    config: {}
  }, e), e.position = Object.assign({
    left: "auto",
    right: "auto",
    bottom: "auto",
    top: "auto"
    /** 不需要设置默认宽高 */
    // width: 'auto',
    // height: 'auto',
    // 'z-index': 1
  }, Et(e.position)), e;
}, ht);
ot = It([
  ct({
    tagName: "webgis-widget-manager",
    className: "webgis-widget-manager",
    hasConfig: !0
  })
], ot);
const Nt = `<div>\r
    <!-- 图标 -->\r
    <div class="widget-icon" onclick="$this.iconClick(event)">\r
        <img s-src="icon">\r
    </div>\r
    <!-- 组件 -->\r
    <div class="widget-panel">\r
        <!-- 标题 -->\r
        <div class="widget-header">\r
            <div class="widget-label"></div>\r
            <div class="close-btn" onclick="$this.closeWidget()"></div>\r
        </div>\r
        <!-- 内容 -->\r
        <div class="widget-content"></div>\r
    </div>\r
</div>`;
class u {
  static getPosition(e, t) {
    var i = this.getBoundingClientRect(e);
    if (i = { x: i.left, y: i.top, w: i.right - i.left, h: i.bottom - i.top }, t) {
      var s = this.docScroll(e.ownerDocument);
      i.x += s.x, i.y += s.y;
    }
    return i;
  }
  static getBoundingClientRect(e) {
    var t = { x: 0, y: 0, width: 0, height: 0, top: 0, right: 0, bottom: 0, left: 0 }, i;
    try {
      i = e.getBoundingClientRect();
    } catch {
      return t;
    }
    return typeof i.left > "u" ? t : i;
  }
  static docScroll(e) {
    var t = e.parentWindow || e.defaultView;
    return "pageXOffset" in t ? { x: t.pageXOffset, y: t.pageYOffset } : e.documentElement ? { x: e.documentElement.scrollLeft, y: e.documentElement.scrollTop } : { x: 0, y: 0 };
  }
  static getPadBorderExtents(e) {
    let t = window.getComputedStyle(e);
    return {
      l: parseInt(t.paddingLeft) + parseInt(t.borderLeft),
      t: parseInt(t.paddingTop) + parseInt(t.borderTop),
      r: parseInt(t.paddingRight) + parseInt(t.borderRight),
      b: parseInt(t.paddingBottom) + parseInt(t.borderBottom),
      w: parseInt(t.paddingLeft) + parseInt(t.borderLeft) + parseInt(t.paddingRight) + parseInt(t.borderRight),
      h: parseInt(t.paddingTop) + parseInt(t.borderTop) + parseInt(t.paddingBottom) + parseInt(t.borderBottom)
    };
  }
  static getMarginExtents(e) {
    let t = window.getComputedStyle(e);
    return {
      l: parseInt(t.marginLeft),
      t: parseInt(t.marginTop),
      r: parseInt(t.marginRight),
      b: parseInt(t.marginBottom),
      w: parseInt(t.marginLeft) + parseInt(t.marginRight),
      h: parseInt(t.marginTop) + parseInt(t.marginBottom)
    };
  }
}
class Ot {
  constructor(e, t) {
    // 拖拽控件的dom节点
    g(this, "domNode");
    // 拖拽控件的容器 
    g(this, "container");
    // 最小尺寸
    g(this, "minSize", {
      w: 20,
      h: 20
    });
    // 切换此小部件是否关心maxHeight和maxWidth
    g(this, "constrainMax", !1);
    // 最大尺寸
    g(this, "maxSize", {
      w: 0,
      h: 0
    });
    // 是否固定宽高比
    g(this, "fixedAspect", !1);
    // 开始的尺寸
    g(this, "startSize");
    // 是否允许修改 x y 尺寸
    g(this, "_resizeX", !0);
    g(this, "_resizeY", !0);
    // 鼠标起始点
    g(this, "startPoint", { x: 0, y: 0 });
    // domNode的起始位置
    g(this, "startPosition");
    g(this, "_isSizing", !1);
    this.container = e, t && (this.minSize = t.minSize || this.minSize, this.maxSize = t.maxSize || this.maxSize, this.constrainMax = t.constrainMax || this.constrainMax, this.fixedAspect = t.fixedAspect || this.fixedAspect), this.init();
  }
  init() {
    this.domNode = document.createElement("div"), this.domNode.className = "resize-handle", this.container.appendChild(this.domNode), this.domNode.addEventListener("mousedown", (e) => this._beginSizing(e));
  }
  _beginSizing(e) {
    if (e.preventDefault(), this._isSizing)
      return;
    this.startPoint = { x: e.clientX, y: e.clientY };
    let t = u.getPosition(this.container, !0);
    this.startPosition = { l: t.x, t: t.y };
    let i = u.getPadBorderExtents(this.container), s = u.getMarginExtents(this.container);
    this.startSize = {
      w: this.container.offsetWidth,
      h: this.container.offsetHeight,
      //ResizeHelper.resize expects a bounding box of the
      //border box, so let's keep track of padding/border
      //width/height as well
      pbw: i.w,
      pbh: i.h,
      mw: s.w,
      mh: s.h
    }, this._isSizing = !0, this._endSizing = this._endSizing.bind(this), this._updateSizing = this._updateSizing.bind(this), document.addEventListener("mouseup", this._endSizing), document.addEventListener("mousemove", this._updateSizing), e.stopPropagation();
  }
  _updateSizing(e) {
    var t, i, s, o;
    if (e.preventDefault(), this._isSizing) {
      let a = this._getNewCoords(e, this.startPosition), h = a.w, m = a.h;
      h >= 0 && (h = Math.max(h - ((t = this.startSize) == null ? void 0 : t.pbw) - ((i = this.startSize) == null ? void 0 : i.mw), 0)), m >= 0 && (m = Math.max(m - ((s = this.startSize) == null ? void 0 : s.pbh) - ((o = this.startSize) == null ? void 0 : o.mh), 0)), this.container.style.width = h + "px", this.container.style.height = m + "px";
    }
  }
  _endSizing(e) {
    e.preventDefault(), this._isSizing = !1, document.removeEventListener("mouseup", this._endSizing), document.removeEventListener("mousemove", this._updateSizing);
  }
  _getNewCoords(e, t) {
    var m, B, et, it, st, nt;
    try {
      if (!e.clientX || !e.clientY)
        return !1;
    } catch {
      return !1;
    }
    var i = ((m = this.startPoint) == null ? void 0 : m.x) - e.clientX, s = ((B = this.startPoint) == null ? void 0 : B.y) - e.clientY, o = ((et = this.startSize) == null ? void 0 : et.w) - (this._resizeX ? i : 0), a = ((it = this.startSize) == null ? void 0 : it.h) - (this._resizeY ? s : 0), h = this._checkConstraints(o, a);
    return t = t || this.startPosition, t && this._resizeX && (h.l = t.l + i, h.w != o && (h.l += o - h.w), h.t = t.t), h.w += (st = this.startSize) == null ? void 0 : st.pbw, h.h += (nt = this.startSize) == null ? void 0 : nt.pbh, h;
  }
  // 检查尺寸是否超出最大值和最小值
  _checkConstraints(e, t) {
    var m, B;
    if (this.minSize) {
      var i = this.minSize;
      e < i.w && (e = i.w), t < i.h && (t = i.h);
    }
    if (this.constrainMax && this.maxSize) {
      var s = this.maxSize;
      e > s.w && (e = s.w), t > s.h && (t = s.h);
    }
    if (this.fixedAspect) {
      var o = (m = this.startSize) == null ? void 0 : m.w, a = (B = this.startSize) == null ? void 0 : B.h, h = o * t - a * e;
      h < 0 ? e = t * o / a : h > 0 && (t = e * a / o);
    }
    return { w: e, h: t };
  }
}
var Lt = Object.defineProperty, Mt = Object.getOwnPropertyDescriptor, _t = (n, e, t, i) => {
  for (var s = i > 1 ? void 0 : i ? Mt(e, t) : e, o = n.length - 1, a; o >= 0; o--)
    (a = n[o]) && (s = (i ? a(e, t, s) : a(s)) || s);
  return i && s && Lt(e, t, s), s;
}, p, b, _, $, f, S, lt;
let at = (lt = class extends dt {
  // 观察器
  constructor() {
    super();
    l(this, p, null);
    l(this, b, null);
    l(this, _, !1);
    g(this, "group", "default");
    // 所在组，同组互斥
    // 鼠标起始点
    l(this, $, { x: 0, y: 0 });
    // panel的起始位置
    l(this, f, {
      x: 0,
      y: 0,
      w: 0,
      h: 0
    });
    l(this, S, void 0);
    c(this, S, new ResizeObserver(this.resize.bind(this)));
  }
  async onInit() {
    this.$data = {
      icon: `${this.config.icon || "icons/default.png"}`
    }, this.group = this.config.group || "default", this.config.position = Object.assign({
      width: "300px",
      height: "300px"
    }, this.config.position);
  }
  // 初始化Panel
  initPanel() {
    c(this, b, this.createWidget(this.config)), c(this, p, this.getElementsByClassName("widget-panel")[0]);
    const { width: e, height: t } = this.config.position, i = tt({
      width: e,
      height: t
    });
    r(this, p).setAttribute("style", i);
    let s = r(this, p).getElementsByClassName("widget-label")[0];
    s.innerHTML = this.title, r(this, p).getElementsByClassName("widget-content")[0].appendChild(r(this, b)), r(this, p).getElementsByClassName("widget-header")[0].addEventListener("mousedown", this.onMouseDown.bind(this)), new Ot(r(this, p));
    const h = this.getPanelXY();
    this.setPosition(h.left, h.top);
  }
  // 根据图标所在位置计算panel的初始位置
  // 最终的位置只要left 和 top
  getPanelXY() {
    var m;
    let e = ((m = this.config.panel) == null ? void 0 : m.position) || {};
    const t = u.getPosition(this.parentElement, !0), i = this.getElementsByClassName("widget-icon")[0], s = u.getPosition(i, !0), o = u.getPosition(r(this, p), !0);
    let a, h;
    return e.left ?? !1 ? a = parseInt(e.left) : e.right ?? !1 ? a = t.w - o.w - parseInt(e.right) : s.x > t.w / 2 ? a = s.x - o.w - 5 : a = s.x + s.w + 5, e.top ?? !1 ? h = parseInt(e.top) : e.bottom ?? !1 ? h = t.w - o.h - parseInt(e.bottom) : h = s.y, {
      left: a,
      top: h
    };
  }
  iconClick() {
    r(this, _) ? this.closeWidget() : this.openWidget();
  }
  openWidget() {
    var e;
    this.closeOthers(), this.classList.add("webgis-widget-icon-open"), r(this, b) || this.initPanel(), (e = r(this, b)) == null || e.onOpen(), c(this, _, !0), r(this, S).observe(this.parentElement);
  }
  closeWidget() {
    var e;
    this.classList.remove("webgis-widget-icon-open"), r(this, S).unobserve(this.parentElement), (e = r(this, b)) == null || e.onClose(), c(this, _, !1);
  }
  // 关闭其他同组的widget
  closeOthers() {
    var t;
    const e = (t = this.parentNode) == null ? void 0 : t.querySelectorAll("webgis-widget-icon");
    e == null || e.forEach((i) => {
      this.group == i.group && i.closeWidget();
    });
  }
  /**
   * 创建一个widget
   * @param {WidgetConfig}_config 
   * @returns {BaseWidget}
   */
  createWidget(e) {
    if (!e.tagName)
      throw new Error("tagName不能为空");
    const t = document.createElement(e.tagName);
    if (!t.startup)
      throw new Error(`没有找到tagName为${e.tagName}的组件`);
    return t.startup({
      mapView: this.mapView,
      map: this.map,
      config: e.config,
      mapConfig: this.mapConfig
    }), t;
  }
  // 销毁
  destroy() {
    r(this, S).disconnect(), this.remove();
  }
  // 重置位置
  resize() {
    c(this, f, u.getPosition(r(this, p), !0)), this.setPosition(r(this, f).x, r(this, f).y);
  }
  onMouseDown(e) {
    e.preventDefault(), r(this, p).classList.add("panel-dragging"), c(this, $, { x: e.clientX, y: e.clientY }), c(this, f, u.getPosition(r(this, p), !0)), this.onMouseMove = this.onMouseMove.bind(this), this.onMouseUp = this.onMouseUp.bind(this), document.addEventListener("mousemove", this.onMouseMove), document.addEventListener("mouseup", this.onMouseUp);
  }
  onMouseMove(e) {
    e.preventDefault();
    let t = r(this, $).x - e.clientX, i = r(this, $).y - e.clientY, s = r(this, f).x - t, o = r(this, f).y - i;
    this.setPosition(s, o);
  }
  setPosition(e, t) {
    let i = this.checkConstraints(e, t), s = u.getPosition(this, !0);
    r(this, p).style.left = i.x - s.x + "px", r(this, p).style.top = i.y - s.y + "px";
  }
  onMouseUp(e) {
    e.preventDefault(), r(this, p).classList.remove("panel-dragging"), document.removeEventListener("mousemove", this.onMouseMove), document.removeEventListener("mouseup", this.onMouseUp);
  }
  // 检查约束条件
  checkConstraints(e, t) {
    const i = u.getPosition(this.parentElement, !0), s = i.x, o = i.w - r(this, f).w, a = i.y, h = i.h - r(this, f).h;
    return e = Math.max(s, Math.min(o, e)), t = Math.max(a, Math.min(h, t)), { x: e, y: t };
  }
}, p = new WeakMap(), b = new WeakMap(), _ = new WeakMap(), $ = new WeakMap(), f = new WeakMap(), S = new WeakMap(), lt);
at = _t([
  ct({
    tagName: "webgis-widget-icon",
    className: "webgis-widget-icon",
    template: Nt,
    hasConfig: !0
  })
], at);
vt().then(() => {
  console.log("初始化完成");
});
export {
  St as BaseLabel,
  at as WidgetIcon,
  ot as WidgetManager
};
//# sourceMappingURL=main.js.map
