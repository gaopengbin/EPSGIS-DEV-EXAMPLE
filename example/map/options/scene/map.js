/* 2023-8-14 08:03:58 | 版权所有 山维科技 http://www.sunwaysurvey.com.cn */
// import * as mars3d from "mars3d"

var map;

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
var mapOptions = {
  scene: {
    center: {
      lat: 20.772952,
      lng: 82.609338,
      alt: 22604251,
      heading: 0,
      pitch: -90
    }
  }
};

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars3d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
function onMounted(mapInstance) {
  map = mapInstance; // 记录map

  // 2也可以通过下面方法获取center参数
  var center = map.getCameraView();
  console.log("center参数为", JSON.stringify(center));

  // 可以通过centerAt切换视角
  map.setCameraView(center);
}

// 视图切换
function sceneMode(name) {
  var value = Number(name);
  setSceneOptions("sceneMode", value);
}
function setSceneOptions(name, value) {
  var options = {};
  options[name] = value;
  console.log("更新了地图参数", options);
  map.setSceneOptions(options);
}
function setSceneGlobeOptions(name, value) {
  var options = {
    globe: {}
  };
  options.globe[name] = value;
  console.log("更新了地图参数", options);
  map.setSceneOptions(options);
}
function setSceneCameraControllerOptions(name, value) {
  var options = {
    cameraController: {}
  };
  options.cameraController[name] = value;
  console.log("更新了地图参数", options);
  map.setSceneOptions(options);
  if (name === "constrainedAxis" && value === true) {
    map.camera.constrainedAxis = Cesium.Cartesian3.UNIT_Z;
  }
}

// 是否显示底图
function showBaseMap(val) {
  if (val === "1") {
    map.basemap = 2021;
  } else {
    map.basemap = undefined;
  }
}