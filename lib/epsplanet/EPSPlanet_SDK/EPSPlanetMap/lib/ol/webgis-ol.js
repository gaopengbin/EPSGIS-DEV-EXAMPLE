var Z = (s, i, e) => {
  if (!i.has(s))
    throw TypeError("Cannot " + e);
};
var a = (s, i, e) => (Z(s, i, "read from private field"), e ? e.call(s) : i.get(s)), l = (s, i, e) => {
  if (i.has(s))
    throw TypeError("Cannot add the same private member more than once");
  i instanceof WeakSet ? i.add(s) : i.set(s, e);
}, m = (s, i, e, r) => (Z(s, i, "write to private field"), r ? r.call(s, e) : i.set(s, e), e);
var h = (s, i, e) => (Z(s, i, "access private method"), e);
import { Map as de, View as ve } from "ol";
import ye from "ol/proj/Projection";
import * as f from "ol/layer";
import * as c from "ol/source";
import * as u from "ol/format";
import * as d from "ol/style.js";
import { defaults as we } from "ol/control/defaults";
import be from "ol/style/Style";
import _e from "ol/style/Text";
import $e from "ol/control/Zoom";
import Oe from "ol-ext/control/LayerShop";
import Ce from "ol-ext/control/LayerSwitcher";
import { listen as Ie } from "ol/events";
import { MousePosition as Pe } from "ol/control";
class Se {
  /**
   * 获取样式的函数，主要用于创建需要动态获取属性的样式
   * @param config 相关配置信息
   * @returns
   */
  constructor(i) {
    const e = Object.assign({}, i), r = new be(e);
    return (t) => {
      const n = r.getText();
      return n.setFeature && n.setFeature(t), r;
    };
  }
}
var M, y, V, K;
class Te extends _e {
  constructor(e) {
    super(e);
    /**
     * 获取当前指定的属性值
     * @param {string} template 
     * @returns 
     */
    l(this, V);
    /** 当前样式对应的feature */
    l(this, M, void 0);
    // 原始内容
    l(this, y, void 0);
    m(this, y, e.text);
  }
  /**
   * 设置feature
   * @param {Feature} feature
   */
  setFeature(e) {
    m(this, M, e);
  }
  /**
   * 重写获取文字值的方法
   * 如果text是数组，需要注意写法，应该是一行文字，一行样式，如果没有样式，要写一个空行，如：
   *                  [
                          "张三",
                          "bold 13px Calibri,sans-serif",
                          "\n",
                          "",  这个代表回车的样式
                          "李四",
                          "italic 11px Calibri,sans-serif"
                      ]
   * @returns 
   */
  getText() {
    try {
      let e;
      return Array.isArray(a(this, y)) ? e = a(this, y).map((r) => h(this, V, K).call(this, r)) : e = h(this, V, K).call(this, a(this, y)), e;
    } catch (e) {
      console.error(e);
      return;
    }
  }
}
M = new WeakMap(), y = new WeakMap(), V = new WeakSet(), K = function(e) {
  return e.replace(/\{(.+?)\}/g, (...r) => {
    var t;
    return (t = a(this, M)) == null ? void 0 : t.get(r[1]);
  });
};
const Le = {
  // 地图
  map: de,
  view: ve,
  // 投影
  projection: ye,
  // 默认控件
  defaults: we,
  // 图层
  graticule: f.Graticule,
  group: f.Group,
  heatmap: f.Heatmap,
  image: f.Image,
  layer: f.Layer,
  mapboxvector: f.MapboxVector,
  tile: f.Tile,
  vector: f.Vector,
  vectorimage: f.VectorImage,
  vectortile: f.VectorTile,
  webglpoints: f.WebGLPoints,
  webgltile: f.WebGLTile,
  // 数据源
  "bingmaps-source": c.BingMaps,
  "cartodb-source": c.CartoDB,
  "cluster-source": c.Cluster,
  "datatile-source": c.DataTile,
  "geotiff-source": c.GeoTIFF,
  "iiif-source": c.IIIF,
  // imagesource-source': _Source.Image, 基类 // 防止与图层的配置重复
  "imagearcgisrest-source": c.ImageArcGISRest,
  "imagecanvas-source": c.ImageCanvas,
  "imagemapguide-source": c.ImageMapGuide,
  "imagestatic-source": c.ImageStatic,
  "imagewms-source": c.ImageWMS,
  "osm-source": c.OSM,
  "raster-source": c.Raster,
  // source-source': _Source.Source, 基类
  "stamen-source": c.Stamen,
  // 'tile-source'-source': _Source.Tile, 基类 // 防止与图层的配置重复
  "tilearcgisrest-source": c.TileArcGISRest,
  "tiledebug-source": c.TileDebug,
  "tileimage-source": c.TileImage,
  "tilejson-source": c.TileJSON,
  "tilewms-source": c.TileWMS,
  "urltile-source": c.UrlTile,
  "utfgrid-source": c.UTFGrid,
  "vector-source": c.Vector,
  // 防止与图层的配置重复
  "vectortile-source": c.VectorTile,
  // 防止与图层的配置重复
  "wmts-source": c.WMTS,
  "xyz-source": c.XYZ,
  "zoomify-source": c.Zoomify,
  // 要素格式方式
  esrijson: u.EsriJSON,
  geojson: u.GeoJSON,
  gml: u.GML,
  gpx: u.GPX,
  igc: u.IGC,
  iiifinfo: u.IIIFInfo,
  kml: u.KML,
  mvt: u.MVT,
  ows: u.OWS,
  polyline: u.Polyline,
  topojson: u.TopoJSON,
  wfs: u.WFS,
  wkb: u.WKB,
  wkt: u.WKT,
  wmscapabilities: u.WMSCapabilities,
  wmsgetfeatureinfo: u.WMSGetFeatureInfo,
  wmtscapabilities: u.WMTSCapabilities,
  // 样式
  circle: d.Circle,
  fill: d.Fill,
  icon: d.Icon,
  iconimage: d.IconImage,
  // 'image-style': _Style.Image, 基类 // 防止与图层的配置重复
  regularshape: d.RegularShape,
  stroke: d.Stroke,
  style: d.Style,
  text: d.Text,
  "style-fn": Se,
  "text-fn": Te
}, R = (s, i) => {
  if (s === null || typeof s != "object")
    return s;
  const e = JSON.parse(JSON.stringify(s));
  try {
    if (Array.isArray(e)) {
      for (let t = 0; t < e.length; t++)
        e[t] = R(e[t]);
      return e;
    }
    Object.keys(e).forEach((t) => {
      e[t] = R(e[t], t);
    }), i = e.type || i;
    const r = xe(i);
    if (!r)
      throw new Error(`Cannot find a constructor of type ${i}`);
    return new r(e);
  } catch (r) {
    return console.error(r), e;
  }
}, xe = (s) => {
  if (s)
    return Le[s.toLowerCase()];
};
var g = /* @__PURE__ */ ((s) => (s[s.none = 0] = "none", s[s.funOnly = 1] = "funOnly", s[s.propOnly = 2] = "propOnly", s[s.always = 3] = "always", s))(g || {});
const $ = (s) => (i) => (i.prototype._manifest = je(s), customElements.define(s.tagName, i), i), je = (s) => (s = Object.assign({
  hasConfig: !1,
  mode: g.always
}, s), s), k = (s) => {
  Promise ? Promise.resolve().then(s) : requestAnimationFrame ? requestAnimationFrame(s) : setTimeout(s, 0);
};
var C, I, P, S, E, T, L, F, w, D, X, B, le, H, ce, x, G, j, z, he, A, Y, J, pe, W, Q, q, me, U, ue, b, v, O;
class N extends HTMLElement {
  //组件模式
  constructor() {
    super();
    /**
     * 加载config
     * 当config不存在时，从文件加载config
     */
    l(this, D);
    /**
     * loading状态改变
     */
    l(this, B);
    /**
     * 初始化方法，用于初始化Dom
     */
    l(this, H);
    /**
     * 对象劫持
     * @param {any} value 
     * @returns {any}
     */
    l(this, x);
    /**
     * 延迟执行刷新 防抖 
     * 主要是防止数组的length也会触发刷新
     * @returns 
     */
    l(this, z);
    /**
     * 刷新所有 #labelTag 标签内容
     * {{}}已经被 #labelTag 标签替换
     */
    l(this, A);
    /**
     * 绑定属性
     * @param att 需要绑定的属性 如s-value
     */
    l(this, J);
    /**
     * 获取指定属性值
     * @param {string} origin 需要获取的属性 如a.b
     * @returns 对应属性的值
     */
    l(this, W);
    /**
     * 设置$data中的属性
     * @param key 
     * @param value 
     */
    l(this, q);
    /**
     * 给dom绑定$this，指向当前组件
     */
    l(this, U);
    /**
     * 组件初始化方法，只初始化一次
     * 需要判断所有必要条件添加完成再进行初始化
     */
    l(this, v);
    // 任意的string索引List
    // 一些私有属性
    l(this, C, void 0);
    l(this, I, void 0);
    l(this, P, void 0);
    l(this, S, void 0);
    l(this, E, void 0);
    l(this, T, void 0);
    l(this, L, "w-l");
    // label标签的名称
    l(this, F, !1);
    // 渲染是否完成
    l(this, w, void 0);
    l(this, j, !1);
    /**
     * 组件初始化状态，设置多个用于防抖
     * unInited 未初始化
     * initing 正在初始化
     * inited 已经初始化
     */
    l(this, b, "unInited");
    this.manifest.hasConfig && h(this, D, X).call(this, this.getAttribute("config") || this.getAttribute("configUrl")), m(this, w, this.manifest.mode ?? g.always), k(() => {
      h(this, H, ce).call(this), h(this, v, O).call(this);
    });
  }
  /**
   * 手动启动初始化的方法
   * @param args 初始化的必要参数
   */
  startup(e) {
    this.mapView = e.mapView, this.map = e.map, this.mapConfig = e.mapConfig, this.config = e.config;
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
    return a(this, C);
  }
  set mapConfig(e) {
    !a(this, C) && e && (m(this, C, e), h(this, v, O).call(this));
  }
  /**
   * 组件所在地图的原型，如果组件本身为地图，则指向自身
   */
  get mapView() {
    return a(this, I);
  }
  set mapView(e) {
    !a(this, I) && e && (m(this, I, e), h(this, v, O).call(this));
  }
  /**
    * 当前组件所在地图
    */
  get map() {
    return a(this, P);
  }
  set map(e) {
    !a(this, P) && e && (m(this, P, e), h(this, v, O).call(this));
  }
  /**
    * 当前组件的配置
    */
  get config() {
    return a(this, S);
  }
  set config(e) {
    if (typeof e == "string") {
      h(this, D, X).call(this, e);
      return;
    } else
      typeof e == "object" && !a(this, S) && e && (m(this, S, e), h(this, v, O).call(this));
  }
  /**
   * 加载中
   */
  get loading() {
    return !!a(this, E);
  }
  set loading(e) {
    m(this, E, e), h(this, B, le).call(this);
  }
  /**
   * 用于渲染html的数据
   */
  get $data() {
    return a(this, T);
  }
  set $data(e) {
    (a(this, w) & g.propOnly) == g.propOnly ? (m(this, T, h(this, x, G).call(this, e)), h(this, A, Y).call(this)) : m(this, T, e);
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
C = new WeakMap(), I = new WeakMap(), P = new WeakMap(), S = new WeakMap(), E = new WeakMap(), T = new WeakMap(), L = new WeakMap(), F = new WeakMap(), w = new WeakMap(), D = new WeakSet(), X = async function(e) {
  if (!this.config && e) {
    this.loading = !0;
    const r = await fetch(e);
    this.config = r && r.ok && await r.json() || {}, this.loading = !1;
  }
}, B = new WeakSet(), le = function() {
  this.loading ? this.classList.add("loading") : this.classList.remove("loading");
}, H = new WeakSet(), ce = function() {
  const e = this.manifest.className || this.manifest.tagName;
  if (this.classList.add(e), this.manifest.template) {
    let r = this.manifest.template;
    (a(this, w) & g.propOnly) == g.propOnly && (r = r.replace(/\{\{(.+?)\}\}/g, (...t) => `<${a(this, L)}>${t[1]}</${a(this, L)}>`)), this.innerHTML = r, (a(this, w) & g.funOnly) == g.funOnly && h(this, U, ue).call(this);
  }
  m(this, F, !0);
}, x = new WeakSet(), G = function(e) {
  return typeof e == "object" ? (Object.keys(e).forEach((r) => {
    e[r] = h(this, x, G).call(this, e[r]);
  }), new Proxy(e, {
    set: (r, t, n) => (r[t] = h(this, x, G).call(this, n), h(this, z, he).call(this), !0)
    // get: (obj, p) => {
    //     // 判断是否需要刷新dom
    //     return obj[p];
    // },
  })) : e;
}, j = new WeakMap(), z = new WeakSet(), he = function() {
  a(this, j) || (m(this, j, !0), k(() => {
    h(this, A, Y).call(this), m(this, j, !1);
  }));
}, A = new WeakSet(), Y = function() {
  ["s-value", "s-src"].forEach((t) => {
    h(this, J, pe).call(this, t);
  }), this.querySelectorAll(a(this, L)).forEach((t) => {
    const n = h(this, W, Q).call(this, t.origin);
    String(n) !== t.innerHTML && (t.innerHTML = n);
  });
}, J = new WeakSet(), pe = function(e) {
  this.querySelectorAll(`[${e}]`).forEach((t) => {
    const n = t.getAttribute(e), o = e.replace("s-", ""), p = h(this, W, Q).call(this, n);
    p !== t[o] && (t[o] = p);
  });
}, W = new WeakSet(), Q = function(e) {
  try {
    return e.split(".").reduce((r, t) => r[t], this.$data);
  } catch (r) {
    console.error(r);
    return;
  }
}, q = new WeakSet(), me = function(e, r) {
  let t = this.$data, n = e.split(".");
  for (let o = 0; o < n.length; o++) {
    const p = n[o];
    o == n.length - 1 ? t[p] = r : t = t[p];
  }
}, U = new WeakSet(), ue = function() {
  this.querySelectorAll("*").forEach((r) => {
    r.$this || (r.$this = this, r.$set = (t, n) => {
      h(this, q, me).call(this, t, n);
    });
  });
}, b = new WeakMap(), v = new WeakSet(), O = async function() {
  a(this, F) && (a(this, b) === "initing" || a(this, b) === "inited" || this.isReady() && (m(this, b, "initing"), this.loading = !0, await this.onInit(), this.loading = !1, m(this, b, "inited"), this.afterInit()));
};
class fe extends N {
  constructor() {
    super();
  }
  /**
   * 重写基类的isReady方法
   * 地图只需要加载config就可以初始化了
   * @returns 是否可以开始初始化
   */
  isReady() {
    return !!this.config;
  }
  /**
   * 加载该map的其他组件
   */
  afterInit() {
    this.mapConfig = this.config, this.mapView = this;
    const i = this.mapConfig.widgetManager || "webgis-widget-manager", e = document.createElement(i);
    e.startup({
      mapView: this,
      map: this.map,
      config: this.mapConfig.widgets,
      mapConfig: this.mapConfig
    }), this.childNodes[0] ? this.insertBefore(e, this.childNodes[0]) : this.appendChild(e);
  }
}
var Ne = Object.defineProperty, Me = Object.getOwnPropertyDescriptor, Ve = (s, i, e, r) => {
  for (var t = r > 1 ? void 0 : r ? Me(i, e) : i, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (t = (r ? o(i, e, t) : o(t)) || t);
  return r && t && Ne(i, e, t), t;
};
let ee = class extends fe {
  constructor() {
    super();
  }
  async onInit() {
    const s = R(this.config.map, "map");
    s.setTarget(this), this.map = s;
  }
};
ee = Ve([
  $({
    tagName: "ol-map",
    className: "ol-map",
    hasConfig: !0
  })
], ee);
var Ee = Object.defineProperty, Fe = Object.getOwnPropertyDescriptor, De = (s, i, e, r) => {
  for (var t = r > 1 ? void 0 : r ? Fe(i, e) : i, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (t = (r ? o(i, e, t) : o(t)) || t);
  return r && t && Ee(i, e, t), t;
};
let te = class extends N {
  constructor() {
    super();
  }
  async onInit() {
    let s = new $e({
      target: this
    });
    this.map.addControl(s);
  }
};
te = De([
  $({
    tagName: "ol-zoom-widget",
    className: "ol-zoom-widget"
  })
], te);
var Ae = Object.defineProperty, We = Object.getOwnPropertyDescriptor, Ge = (s, i, e, r) => {
  for (var t = r > 1 ? void 0 : r ? We(i, e) : i, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (t = (r ? o(i, e, t) : o(t)) || t);
  return r && t && Ae(i, e, t), t;
}, _, ae;
let se = (ae = class extends N {
  //记录打开透明度滑条的图层id
  constructor() {
    super();
    l(this, _, []);
  }
  async onInit() {
    let i = new Oe({
      target: this,
      noScroll: !0,
      collapsed: !1,
      trash: !1,
      extent: !0,
      // ol-ext插件的类型写错了
      show_progress: !1,
      // 判断需要展示的图层
      displayInLayerSwitcher: (e) => e.values_.listMode !== "hide"
    });
    i.on("drawlist", (e) => {
      const r = e.li, t = r.getElementsByClassName("ol-layerswitcher-buttons")[0], n = r.getElementsByClassName("layerswitcher-opacity")[0];
      let o = document.createElement("div");
      o.title = "透明度", o.innerHTML = "%";
      const p = e.layer;
      n.style.display = a(this, _).includes(p.ol_uid) ? "block" : "none", o.onclick = () => {
        n.style.display === "block" ? (n.style.display = "none", m(this, _, a(this, _).filter((ge) => ge !== p.ol_uid))) : (n.style.display = "block", a(this, _).push(p.ol_uid));
      }, t.appendChild(o);
    }), this.map.addControl(i);
  }
}, _ = new WeakMap(), ae);
se = Ge([
  $({
    tagName: "ol-layer-list",
    className: "ol-layer-list"
  })
], se);
var Re = Object.defineProperty, Be = Object.getOwnPropertyDescriptor, He = (s, i, e, r) => {
  for (var t = r > 1 ? void 0 : r ? Be(i, e) : i, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (t = (r ? o(i, e, t) : o(t)) || t);
  return r && t && Re(i, e, t), t;
};
let ie = class extends N {
  constructor() {
    super();
  }
  async onInit() {
    let s = new ze({
      target: this
    });
    this.map.addControl(s);
  }
};
ie = He([
  $({
    tagName: "ol-basemap-list",
    className: "ol-basemap-list"
  })
], ie);
class ze extends Ce {
  constructor(i) {
    i = i || {}, i.switcherClass = ((i.switcherClass || "") + " ol-layerswitcher-image").trim(), i.mouseover = i.mouseover !== !1, super(i);
  }
  drawList(i, e) {
    i.style.height = "auto", e.array_.filter((t) => t.values_.isBasemap).forEach((t) => {
      if (this.displayInLayerSwitcher(t)) {
        let n = document.createElement("img");
        n.src = t.values_.thumbnail || "images/thumbnail.png";
        let o = document.createElement("p");
        o.innerHTML = t.get("title") || t.get("name");
        let p = document.createElement("li");
        p.className = "ol-imgcontainer" + (t.getVisible() ? " ol-visible" : ""), p.appendChild(n), p.appendChild(o), p.onclick = () => {
          this.switchLayerVisibility(t, e);
        }, this._setLayerForLI(p, t), this.testLayerVisibility(t) || p.classList.add("ol-layer-hidden"), i.appendChild(p);
      }
    });
  }
  /** Disable overflow
  */
  overflow() {
  }
}
const Je = "<div>{{coordinate}} 比例尺 {{scale}}</div>";
var qe = Object.defineProperty, Ue = Object.getOwnPropertyDescriptor, Ze = (s, i, e, r) => {
  for (var t = r > 1 ? void 0 : r ? Ue(i, e) : i, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (t = (r ? o(i, e, t) : o(t)) || t);
  return r && t && qe(i, e, t), t;
};
let re = class extends N {
  constructor() {
    super();
  }
  async onInit() {
    this.$data = {
      coordinate: "",
      scale: ""
    };
    const s = this.map.getViewport();
    Ie(s, "pointermove", this.handleMouseMove, this), this.map.on("moveend", this.moveEnd.bind(this));
  }
  // 鼠标移动
  handleMouseMove(s) {
    const i = this.map.getEventPixel(s), e = this.map.getCoordinateFromPixelInternal(i);
    e && (this.$data.coordinate = `${e[0].toFixed(3)} ${e[1].toFixed(3)}`);
  }
  // 比例尺变化
  moveEnd() {
    const s = this.getScale();
    (s ?? !1) && (this.$data.scale = `1:${s.toLocaleString()}`);
  }
  /**
   * 获取比例尺
   * @return {number} 比例尺.
   */
  getScale() {
    const s = this.map.getView(), i = 25.4 / 0.28, e = 1e3 / 25.4;
    var r = 1;
    return s.getProjection().getUnits() != "metric" ? r = s.getResolution() * s.getProjection().getMetersPerUnit() * e * i : r = s.getResolution() * e * i, Math.round(r);
  }
};
re = Ze([
  $({
    tagName: "ol-coordinate",
    className: "ol-coordinate",
    template: Je
  })
], re);
const Ke = `<fieldset>\r
    <legend>\r
        数据解析\r
    </legend>\r
    <div>\r
        <button onclick="$this.add(event)">测试加一</button>\r
        结果：{{a}}\r
    </div>\r
\r
    <div>\r
        <button onclick="$this.changeName(event)">测试人名</button>\r
        你是：{{b}}\r
    </div>\r
\r
\r
    <div>\r
        <button onclick="$this.changeValue(event)">测试多重属性</button>\r
        c.d.e : {{c.d.e}}\r
    </div>\r
\r
\r
    <div>\r
        <button onclick="$this.changeArr(event)">测试数组</button>\r
        数组长度：{{f.length}}\r
    </div>\r
</fieldset>\r
\r
\r
<fieldset>\r
    <legend>\r
        事件数据绑定\r
    </legend>\r
    <div>\r
        <input oninput="$this.$data.aa=value">\r
        <br>\r
        结果：{{aa}}\r
    </div>\r
</fieldset>\r
\r
<fieldset>\r
    <legend>\r
        属性绑定 + 直接赋值\r
    </legend>\r
    <div>\r
        <input s-value="bb" oninput="$this.$data.bb=value">\r
        <br>\r
        结果：{{bb}}\r
    </div>\r
</fieldset>\r
\r
<fieldset>\r
    <legend>\r
        属性绑定 + 绑定赋值\r
    </legend>\r
    <div>\r
        <input s-value="cc" oninput="$set('cc',value)">\r
        <!-- <input s-value="cc" oninput="console.log(this)"> -->\r
        <br>\r
        结果：{{cc}}\r
    </div>\r
</fieldset>`;
var Xe = Object.defineProperty, Ye = Object.getOwnPropertyDescriptor, Qe = (s, i, e, r) => {
  for (var t = r > 1 ? void 0 : r ? Ye(i, e) : i, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (t = (r ? o(i, e, t) : o(t)) || t);
  return r && t && Xe(i, e, t), t;
};
let ne = class extends N {
  constructor() {
    super();
  }
  async onInit() {
    this.$data = {
      a: 1,
      b: "张三",
      c: {
        d: {
          e: 1
        }
      },
      f: [1],
      aa: "123",
      bb: "start",
      cc: "121"
    };
  }
  hello(s) {
    console.log(s), this.$data.c.d = "和了了了了了了";
  }
  changeName() {
    this.$data.b = this.$data.b == "张三" ? "李四" : "张三";
  }
  changeValue() {
    this.$data.c.d = {
      // e: parseInt(String(Math.random() * 10))
      e: this.$data.c.d.e + 1
    };
  }
  changeArr() {
    this.$data.f.push(1);
  }
  add() {
    this.$data.a++;
  }
  kill() {
    return "hello";
  }
};
ne = Qe([
  $({
    tagName: "ol-hello-world",
    className: "ol-hello-world",
    template: Ke
    // mode: Mode.none
  })
], ne);
var ke = Object.defineProperty, et = Object.getOwnPropertyDescriptor, tt = (s, i, e, r) => {
  for (var t = r > 1 ? void 0 : r ? et(i, e) : i, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (t = (r ? o(i, e, t) : o(t)) || t);
  return r && t && ke(i, e, t), t;
};
let oe = class extends fe {
  constructor() {
    super();
  }
  async onInit() {
    const s = R(this.config.map, "map");
    s.setTarget(this), s.addControl(new Pe()), this.map = s;
  }
};
oe = tt([
  $({
    tagName: "ol-map-test",
    className: "ol-map-test",
    hasConfig: !0
  })
], oe);
export {
  ie as BasemapList,
  re as Coordinate,
  ne as HelloWorld,
  se as LayerList,
  ee as MapView,
  oe as MapViewTest,
  Se as StyleFn,
  Te as TextFn,
  te as ZoomWidget,
  xe as getConstructor,
  R as getObject
};
//# sourceMappingURL=webgis-ol.js.map
