var Tt = Object.defineProperty;
var Ht = (o, t, e) => t in o ? Tt(o, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : o[t] = e;
var E = (o, t, e) => (Ht(o, typeof t != "symbol" ? t + "" : t, e), e), ht = (o, t, e) => {
  if (!t.has(o))
    throw TypeError("Cannot " + e);
};
var s = (o, t, e) => (ht(o, t, "read from private field"), e ? e.call(o) : t.get(o)), a = (o, t, e) => {
  if (t.has(o))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(o) : t.set(o, e);
}, l = (o, t, e, i) => (ht(o, t, "write to private field"), i ? i.call(o, e) : t.set(o, e), e), ft = (o, t, e, i) => ({
  set _(n) {
    l(o, t, n, e);
  },
  get _() {
    return s(o, t, i);
  }
}), h = (o, t, e) => (ht(o, t, "access private method"), e);
import { Feature as jt } from "ol";
import { transform as vt } from "ol/proj";
import { unByKey as Bt } from "ol/Observable.js";
import Ft from "ol/source/Vector";
import xt from "ol/layer/Vector";
import { Polygon as zt } from "ol/geom";
function m(o) {
  return o * 180 / Math.PI;
}
function C(o) {
  return o * Math.PI / 180;
}
function Gt(o) {
  const t = 90.7142857142857, e = 1e3 / 25.4;
  return o * e * t;
}
var k, f, b, S, N, M, P, G, Mt, q, Et, K, bt;
class qt {
  // 同步工具使用的投影
  constructor(t, e, i) {
    /**
     * 地图变更事件
     * @returns 
     */
    a(this, G);
    // 移除
    a(this, q);
    // 移除全部
    a(this, K);
    a(this, k, void 0);
    a(this, f, void 0);
    //地图
    a(this, b, !1);
    // 是否正在更新，正在更新的不需要触发视图更改事件
    a(this, S, null);
    E(this, "enable", !0);
    // #toLonLat: any;
    // #fromLonLat: any;
    a(this, N, void 0);
    // 更新其他地图的方法
    a(this, M, void 0);
    // 当前map的投影
    a(this, P, "EPSG:4326");
    // graphic对象，用于添加或删除graphic
    E(this, "graphics", {
      // 添加 直接结构参数
      add: ({ geometry: t, symbol: e }) => {
        console.log(t), console.log(e);
        let i = new jt({
          // geometry: new Polygon([[
          //     [117, 45],
          //     [118, 45],
          //     [118, 46],
          //     [117, 45],
          //     [117, 45]
          // ]]).transform(this.#syncPrj, this.#mapPrj)
          geometry: new zt(t).transform(s(this, P), s(this, M)),
          symbol: e
        });
        const n = new Ft(), c = new xt({
          source: n,
          style: {
            "fill-color": "rgba(255, 255, 255, 0.2)",
            "stroke-color": "#ffcc33",
            "stroke-width": 2,
            "circle-radius": 7,
            "circle-fill-color": "#ffcc33"
          }
        });
        s(this, f).addLayer(c), n.addFeature(i);
      },
      remove: h(this, q, Et),
      removeAll: h(this, K, bt)
    });
    l(this, k, e), l(this, f, t), l(this, N, i), l(this, S, t.getView().on("propertychange", () => h(this, G, Mt).call(this))), l(this, M, s(this, f).getView().getProjection());
  }
  // id不可更改
  get id() {
    return s(this, k);
  }
  /**
   * 获取当前位置信息
   */
  get syncInfo() {
    const t = s(this, f).getView();
    if (!t)
      return;
    const e = t.getCenter();
    if (e == null)
      return;
    let i = t.getResolution() || 1;
    const n = t.getProjection().getMetersPerUnit() ?? 1;
    i = i * n;
    const c = vt(e, s(this, M), s(this, P)), r = m(t.getRotation());
    return {
      resolution: i,
      // 当每单位米数为1时的地图分辨率
      rotation: r,
      // 旋转
      tilt: null,
      //倾斜角度 ol没有该参数
      longitude: c[0],
      // 中心经度
      latitude: c[1]
      // 中心纬度
    };
  }
  /**
   * 更新地图
   */
  update(t) {
    if (!t)
      return;
    l(this, b, !0);
    const e = s(this, f).getView();
    let i = e.getProjection().getMetersPerUnit() ?? 1;
    const n = vt([t.longitude, t.latitude], s(this, P), s(this, M));
    e.setCenter(n);
    const c = t.resolution / i, r = e.getResolution() || 1;
    Math.abs(c - r) / r > 0.01 && e.setResolution(c);
    const g = C(t.rotation);
    Math.abs(g - e.getRotation()) > 0.01 && e.setRotation(g), l(this, b, !1);
  }
  // 销毁对象
  destroy() {
    Bt(s(this, S)), l(this, S, null);
  }
}
k = new WeakMap(), f = new WeakMap(), b = new WeakMap(), S = new WeakMap(), N = new WeakMap(), M = new WeakMap(), P = new WeakMap(), G = new WeakSet(), Mt = function() {
  !this.enable || s(this, b) || s(this, N).call(this, this);
}, q = new WeakSet(), Et = function(t) {
  console.log(t);
}, K = new WeakSet(), bt = function() {
};
var U, d, V, A, R, L, W, J, St, Q, Pt, X, Vt, Y, Rt, T, ut, Z, Wt, $, Ot, I, Dt, H, dt, tt, _t, et, yt;
class Kt {
  // 记录视角的角度
  // #dataSource: (window as any).Cesium.GeoJsonDataSource;
  constructor(t, e, i) {
    /**
     * 获取 2d 位置信息
     * @returns 
     */
    a(this, J);
    /**
     * 获取 2.5d 位置信息
     * @returns 
     */
    a(this, Q);
    /**
     * 获取 3d 位置信息
     * @returns 
     */
    a(this, X);
    /**
     * 获取画布给定像素的3D位置
     * @param scene 
     * @param pixel 
     * @returns 
     */
    a(this, Y);
    /**
     * 获取屏幕中心点的3D位置
     * @param scene 
     * @returns 
     */
    a(this, T);
    /**
     * 更新2D地图
     * @param syncInfo 
     */
    a(this, Z);
    /**
     * 更新2.5D地图
     * @param syncInfo 
     */
    a(this, $);
    /**
     * 更新三维地图
     * @param syncInfo 
     */
    a(this, I);
    /**
     * 检查基础相机状态是否已更改，如果更改则并同步
     * 检查完成后需要记录相机状态
     * @param {boolean=} opt_dontSync 不要同步视图,只需要记录当前状态
     */
    a(this, H);
    /**
     * 根据分辨率和纬度值计算摄像机和中心点之间的距离
     * @param resolution 
     * @param latitude 弧度制
     * @param scene 
     * @param metersPerUnit 
     * @returns 
     */
    a(this, tt);
    /**
     * 根据距离（相机到位置）和纬度值计算分辨率
     * @param distance 
     * @param latitude 弧度制
     * @param scene 
     * @param metersPerUnit 
     * @returns 
     */
    a(this, et);
    a(this, U, void 0);
    a(this, d, void 0);
    //地图
    a(this, V, []);
    E(this, "enable", !0);
    a(this, A, void 0);
    a(this, R, !1);
    // 可以开始渲染
    a(this, L, void 0);
    // 更新其他地图的方法
    a(this, W, 0);
    l(this, U, e), l(this, d, t), l(this, L, i);
    let n = t.scene.preRender.addEventListener(() => {
      s(this, R) && h(this, H, dt).call(this);
    }), c = t.camera.moveStart.addEventListener(() => {
      l(this, R, this.enable);
    }), r = t.camera.moveEnd.addEventListener(() => {
      l(this, R, !1);
    });
    l(this, V, [
      n,
      c,
      r
    ]);
  }
  // id不可更改
  get id() {
    return s(this, U);
  }
  // /**
  //  * 更新其他地图，该方法需要被重写
  //  */
  // updateOthersMap(sync: any) {
  //     console.log(sync);
  // }
  /**
   * 获取当前位置信息
   */
  get syncInfo() {
    if (s(this, d).scene.mode === window.Cesium.SceneMode.SCENE3D)
      return h(this, X, Vt).call(this);
    if (s(this, d).scene.mode === window.Cesium.SceneMode.SCENE2D)
      return h(this, J, St).call(this);
    if (s(this, d).scene.mode === window.Cesium.SceneMode.COLUMBUS_VIEW)
      return h(this, Q, Pt).call(this);
  }
  /**
   * 更新地图
   */
  update(t) {
    if (t) {
      switch (s(this, d).scene.mode) {
        case window.Cesium.SceneMode.SCENE3D:
          h(this, I, Dt).call(this, t);
          break;
        case window.Cesium.SceneMode.SCENE2D:
          h(this, Z, Wt).call(this, t);
          break;
        case window.Cesium.SceneMode.COLUMBUS_VIEW:
          h(this, $, Ot).call(this, t);
          break;
      }
      h(this, H, dt).call(this, !0);
    }
  }
  // 销毁对象
  destroy() {
    s(this, V).forEach((t) => {
      t();
    }), l(this, V, []);
  }
}
U = new WeakMap(), d = new WeakMap(), V = new WeakMap(), A = new WeakMap(), R = new WeakMap(), L = new WeakMap(), W = new WeakMap(), J = new WeakSet(), St = function() {
  const t = s(this, d).scene, e = t.canvas, i = t.camera.positionCartographic, n = (i == null ? void 0 : i.latitude) || 0, c = (i == null ? void 0 : i.longitude) || 0;
  return {
    resolution: i.height / e.clientWidth,
    // 当每单位米数为1时的地图分辨率
    rotation: 0,
    // 旋转
    tilt: 0,
    //倾斜角度
    longitude: m(c),
    // 中心经度 角度制
    latitude: m(n)
    // 中心纬度 角度制
  };
}, Q = new WeakSet(), Pt = function() {
  const t = s(this, d).scene, e = t.canvas, i = h(this, T, ut).call(this, t);
  let n;
  i ? n = window.Cesium.Cartographic.fromCartesian(i) : n = t.camera.positionCartographic;
  let c = t.camera.positionCartographic.height;
  c = c / Math.sin(Math.abs(t.camera.pitch));
  const r = (n == null ? void 0 : n.latitude) || 0, g = (n == null ? void 0 : n.longitude) || 0, u = c / e.clientWidth, p = t.camera.pitch + window.Cesium.Math.PI_OVER_TWO;
  return {
    resolution: u,
    // 当每单位米数为1时的地图分辨率
    rotation: -m(t.camera.heading),
    // 旋转
    tilt: m(p),
    //倾斜角度
    longitude: m(g),
    // 中心经度 角度制
    latitude: m(r)
    // 中心纬度 角度制
  };
}, X = new WeakSet(), Vt = function() {
  const t = s(this, d).scene, e = window.Cesium.Ellipsoid.WGS84, i = h(this, T, ut).call(this, t);
  let n, c, r = i;
  if (r) {
    const ct = t.camera.up, y = t.camera.right, lt = new window.Cesium.Cartesian3(-r.y, r.x, 0), wt = window.Cesium.Cartesian3.angleBetween(y, lt);
    n = window.Cesium.Cartesian3.cross(r, ct, new window.Cesium.Cartesian3()).z < 0 ? wt : -wt;
    const Lt = t.camera.position, pt = new window.Cesium.Cartesian3();
    e.geocentricSurfaceNormal(r, pt);
    const z = new window.Cesium.Cartesian3();
    window.Cesium.Cartesian3.subtract(Lt, r, z), window.Cesium.Cartesian3.normalize(z, z);
    const Ct = Math.acos(window.Cesium.Cartesian3.dot(pt, z));
    c = isNaN(Ct) ? 0 : Ct;
  } else {
    const ct = t.globe, y = t.camera.positionCartographic.clone(), lt = ct.getHeight(y);
    y.height = lt || 0, r = window.Cesium.Ellipsoid.WGS84.cartographicToCartesian(y), n = t.camera.heading, c = t.camera.pitch + window.Cesium.Math.PI_OVER_TWO;
  }
  const g = window.Cesium.Cartesian3.distance(r, t.camera.position), u = e.cartesianToCartographic(r), p = (u == null ? void 0 : u.latitude) || 0, rt = (u == null ? void 0 : u.longitude) || 0, At = h(this, et, yt).call(this, g, p, t);
  return l(this, W, c), {
    resolution: At,
    // 当每单位米数为1时的地图分辨率
    rotation: m(n),
    // 旋转
    tilt: m(c),
    //倾斜角度
    longitude: m(rt),
    // 中心经度 角度制
    latitude: m(p)
    // 中心纬度 角度制
  };
}, Y = new WeakSet(), Rt = function(t, e) {
  const i = t.camera.getPickRay(e);
  return t.globe.pick(i, t) || t.camera.pickEllipsoid(e);
}, T = new WeakSet(), ut = function(t) {
  const e = t.canvas, i = new window.Cesium.Cartesian2(
    e.clientWidth / 2,
    e.clientHeight / 2
  );
  return h(this, Y, Rt).call(this, t, i);
}, Z = new WeakSet(), Wt = function(t) {
  const e = s(this, d).scene, i = e.canvas, n = t.resolution * i.clientWidth;
  e.camera.setView({
    destination: window.Cesium.Cartesian3.fromDegrees(t.longitude, t.latitude, n)
  });
}, $ = new WeakSet(), Ot = function(t) {
  const e = s(this, d).scene, i = e.canvas, n = t.tilt === null ? e.camera.pitch : C(t.tilt - 90);
  let c = Math.abs(n);
  const r = t.resolution * i.clientWidth / Math.sin(c), g = -C(t.rotation), u = window.Cesium.Cartesian3.fromDegrees(t.longitude, t.latitude, r);
  e.camera.setView({
    destination: u,
    orientation: {
      heading: g,
      // 朝向
      pitch: n,
      // 俯仰
      roll: void 0
    }
  }), e.camera.moveDown(r * Math.cos(c));
}, I = new WeakSet(), Dt = function(t) {
  const e = s(this, d).scene, i = new window.Cesium.Cartographic(C(t.longitude), C(t.latitude));
  if (e.globe) {
    const p = e.globe.getHeight(i);
    i.height = p || 0;
  }
  const n = window.Cesium.Ellipsoid.WGS84.cartographicToCartesian(i), c = -C(t.rotation), r = t.tilt === null ? s(this, W) - window.Cesium.Math.PI_OVER_TWO : C(t.tilt - 90), g = {
    pitch: r,
    heading: c,
    // 朝向
    roll: void 0
    // 翻滚
  };
  e.camera.setView({
    destination: n,
    orientation: g
  });
  const u = h(this, tt, _t).call(this, t.resolution, C(t.latitude), e);
  l(this, W, r + window.Cesium.Math.PI_OVER_TWO), e.camera.moveBackward(u);
}, H = new WeakSet(), dt = function(t = !1) {
  const e = s(this, A), i = s(this, d).camera.viewMatrix;
  (!e || !window.Cesium.Matrix4.equalsEpsilon(e, i, 1e-5)) && (l(this, A, i.clone()), t !== !0 && s(this, L).call(this, this));
}, tt = new WeakSet(), _t = function(t, e, i) {
  const n = i.canvas;
  let r = i.camera.frustum.fovy;
  console.assert(!isNaN(r));
  const g = t * n.clientHeight, u = Math.cos(Math.abs(e));
  return g * u / 2 / Math.tan(r / 2);
}, et = new WeakSet(), yt = function(t, e, i) {
  const n = i.canvas;
  let r = i.camera.frustum.fovy || 1;
  console.assert(!isNaN(r));
  const g = 2 * t * Math.tan(r / 2), u = Math.cos(Math.abs(e));
  return g / u / n.clientHeight;
};
var j, O, it, v, D, B, st, kt, F, gt, x, mt;
class Jt {
  // 更新其他地图的方法
  constructor(t, e, i) {
    /**
     * 地图变更事件
     * @returns 
     */
    a(this, st);
    /**
     * 判断是否为SceneView
     */
    a(this, F);
    /**
     * 移除监听
     */
    a(this, x);
    a(this, j, void 0);
    a(this, O, void 0);
    //地图
    a(this, it, !1);
    // 是否正在更新，正在更新的不需要触发视图更改事件
    a(this, v, null);
    a(this, D, null);
    E(this, "enable", !0);
    a(this, B, void 0);
    l(this, j, e), l(this, O, t), l(this, B, i), l(this, D, t.watch("interacting,animation", (n) => {
      !n || s(this, v) || l(this, v, t.watch("viewpoint", () => {
        h(this, st, kt).call(this);
      }));
    }));
  }
  // id不可更改
  get id() {
    return s(this, j);
  }
  /**
   * 获取当前位置信息
   */
  get syncInfo() {
    const t = s(this, O);
    let e, i = null;
    h(this, F, gt).call(this, t) ? (e = -t.camera.heading, i = t.camera.tilt) : e = t.rotation;
    const n = t.center.longitude || 0, c = t.center.latitude || 0;
    return {
      resolution: t.resolution,
      // 当每单位米数为1时的地图分辨率
      rotation: e,
      // 旋转
      tilt: i,
      //倾斜角度 2d没有该参数
      longitude: n,
      // 中心经度
      latitude: c
      // 中心纬度
    };
  }
  /**
   * 更新地图
   */
  async update(t) {
    if (!t)
      return;
    h(this, x, mt).call(this);
    const e = s(this, O), i = {
      type: "point",
      // autocasts as new Point()
      longitude: t.longitude,
      latitude: t.latitude
    };
    e.center = i, e.scale = Gt(t.resolution), h(this, F, gt).call(this, e) ? (e.camera.heading = -t.rotation, e.camera.tilt = t.tilt ?? e.camera.tilt) : e.rotation = t.rotation;
  }
  // 销毁对象
  destroy() {
    var t;
    h(this, x, mt).call(this), (t = s(this, D)) == null || t.remove(), l(this, D, null);
  }
}
j = new WeakMap(), O = new WeakMap(), it = new WeakMap(), v = new WeakMap(), D = new WeakMap(), B = new WeakMap(), st = new WeakSet(), kt = function() {
  !this.enable || s(this, it) || s(this, B).call(this, this);
}, F = new WeakSet(), gt = function(t) {
  return t.type === "3d";
}, x = new WeakSet(), mt = function() {
  var t;
  s(this, v) && ((t = s(this, v)) == null || t.remove(), l(this, v, null));
};
var w, nt, _, at, Nt, ot, Ut;
class se {
  constructor(t, e) {
    /**
     * 更新除发出事件的所有其他的地图
     */
    a(this, at);
    /**
     * 获取地图同步器的构造函数
     * @param map 
     * @returns 
     */
    a(this, ot);
    // [x: string]: any; // 任意的string索引List
    a(this, w, []);
    a(this, nt, 1);
    //是否启用同步
    a(this, _, !1);
    E(this, "graphics", {
      add: (t) => {
        s(this, w).forEach((e) => {
          var i;
          (i = e == null ? void 0 : e.graphics) == null || i.add(t);
        });
      },
      remove: (t) => {
        s(this, w).forEach((e) => {
          var i;
          (i = e == null ? void 0 : e.graphics) == null || i.remove(t);
        });
      },
      removeAll: () => {
        s(this, w).forEach((t) => {
          var e;
          (e = t == null ? void 0 : t.graphics) == null || e.removeAll();
        });
      }
    });
    this.enable = (e == null ? void 0 : e.enable) ?? !0, t.forEach((i) => {
      this.addMap(i);
    });
  }
  set enable(t) {
    s(this, _) !== t && l(this, _, t);
  }
  get enable() {
    return s(this, _);
  }
  // 添加地图
  addMap(t) {
    const e = h(this, ot, Ut).call(this, t), i = ft(this, nt)._++, n = new e(t, i, h(this, at, Nt).bind(this));
    s(this, w).push(n);
  }
  // 删除地图
  removeMap(t) {
    this.enable && (t.enableSynchronizer = !1);
  }
  // 高亮
  highlight(t) {
    s(this, w).forEach((e) => {
      e == null || e.highlight(t);
    });
  }
  // 移除高亮
  unhighlight(t) {
    s(this, w).forEach((e) => {
      e == null || e.unhighlight(t);
    });
  }
  unHighlightAll(t) {
    s(this, w).forEach((e) => {
      e == null || e.unhighlight(t);
    });
  }
  // 移除全部高亮
}
w = new WeakMap(), nt = new WeakMap(), _ = new WeakMap(), at = new WeakSet(), Nt = function(t) {
  if (!this.enable)
    return;
  const e = t.syncInfo;
  if (!e)
    return;
  s(this, w).filter((n) => n.id !== t.id).forEach((n) => {
    n == null || n.update(e);
  });
}, ot = new WeakSet(), Ut = function(t) {
  var e;
  if (t.ol_uid)
    return qt;
  if (t.cesiumWidget)
    return Kt;
  if ((e = t.map) != null && e.basemap)
    return Jt;
  throw new Error("cannot get map type");
};
export {
  se as Synchronizer
};
//# sourceMappingURL=sync.js.map
