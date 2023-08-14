/* 2023-8-14 08:03:58 | 版权所有 山维科技 http://www.sunwaysurvey.com.cn */
// import * as mars3d from "mars3d"

var map3d;
var map2d;

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars3d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
function onMounted(mapInstance) {
  map3d = mapInstance; // 记录map
  map3d.camera.percentageChanged = 0.001;
  globalNotify("已知问题提示", "\u4E09\u7EF4\u4E8B\u4EF6\u76EE\u524D\u76D1\u542C\u4E0D\u7075\u654F\uFF0C\u89C6\u89D2\u540C\u6B65\u4E0D\u591F\u5E73\u6ED1\u3002 ");
  creatMap2D();
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
function onUnmounted() {
  unbind3dEvent();
  unbind2dEvent();
  map3d = null;
  map2d.destroy();
  map2d = null;
}
function creatMap2D() {
  showLoading();
  var mapDiv = mars3d.DomUtil.create("div", "", document.body);
  mapDiv.setAttribute("id", "centerDiv2D");
  var map2dDiv = mars3d.DomUtil.create("div", "", mapDiv);
  map2dDiv.setAttribute("id", "map2d");
  map2dDiv.setAttribute("class", "mars2d-container");
  var configUrl = "http://mars2d.cn/config/config.json";
  mars2d.Util.fetchJson({
    url: configUrl
  }).then(function (data) {
    // 构建地图
    map2d = new mars2d.Map("map2d", data.mars2d);
    bind2dEvent(map2d);
    bind3dEvent();
    _map2d_extentChangeHandler();
    viewTo23D(); // 默认

    hideLoading();
  })["catch"](function (error) {
    hideLoading();
    console.log("构建地图错误", error);
    globalMsg(error && error.message, "error");
  });
}

// 二维地图变化事件
function bind2dEvent() {
  map2d.on("drag", _map2d_extentChangeHandler, this);
  map2d.on("zoomend", _map2d_extentChangeHandler, this);
}
function unbind2dEvent() {
  map2d.off("drag", _map2d_extentChangeHandler, this);
  map2d.off("zoomend", _map2d_extentChangeHandler, this);
}
function _map2d_extentChangeHandler(e) {
  var bounds = map2d.getBounds();
  var extent = {
    xmin: bounds.getWest(),
    xmax: bounds.getEast(),
    ymin: bounds.getSouth(),
    ymax: bounds.getNorth()
  };
  console.log("\u4E8C\u7EF4\u5730\u56FE\u53D8\u5316\u4E86\uFF0C\u533A\u57DF\uFF1A ".concat(JSON.stringify(extent), " "));
  unbind3dEvent();
  map3d.camera.setView({
    destination: Cesium.Rectangle.fromDegrees(extent.xmin, extent.ymin, extent.xmax, extent.ymax)
  });
  bind3dEvent();
}

// 三维地图相机移动结束事件
function bind3dEvent() {
  map3d.on(mars3d.EventType.cameraChanged, camera_moveEndHandler, this);
}
function unbind3dEvent() {
  map3d.off(mars3d.EventType.cameraChanged, camera_moveEndHandler, this);
}
function camera_moveEndHandler(e) {
  var point = map3d.getCenter(); // 范围对象
  var level = map3d.level;
  console.log("'\u4E09\u7EF4\u5730\u56FE\u53D8\u5316\u4E86\uFF0C\u4F4D\u7F6E\uFF1A ".concat(point.toString(), ",\u5C42\u7EA7 ").concat(level, " "));
  unbind2dEvent();
  map2d.setView([point.lat, point.lng], level, {
    animate: false
  });
  bind2dEvent();
}
function viewTo3d() {
  var to3dDom = document.getElementById("centerDiv3D");
  var to2dDom = document.getElementById("centerDiv2D");
  to2dDom.style.display = "none";
  to3dDom.style.display = "block";
  to3dDom.style.left = "0";
  to3dDom.style.width = "100%";
}
function viewTo2d() {
  var to3dDom = document.getElementById("centerDiv3D");
  var to2dDom = document.getElementById("centerDiv2D");
  to3dDom.style.display = "none";
  to2dDom.style.display = "block";
  to2dDom.style.width = "100%";
  if (map2d) {
    map2d.invalidateSize(false);
  }
}
function viewTo23D() {
  var to3dDom = document.getElementById("centerDiv3D");
  var to2dDom = document.getElementById("centerDiv2D");
  to3dDom.style.width = "50%";
  to2dDom.style.width = "50%";
  to3dDom.style.left = "50%";
  to3dDom.style.display = "block";
  to2dDom.style.display = "block";
  if (map2d) {
    map2d.invalidateSize(false);
  }
}