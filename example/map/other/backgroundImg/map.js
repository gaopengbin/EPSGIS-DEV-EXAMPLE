/* 2023-8-14 08:03:58 | 版权所有 山维科技 http://www.sunwaysurvey.com.cn */
// import * as mars3d from "mars3d"

var map; // mars3d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
var mapOptions = {
  scene: {
    center: {
      lat: 36.873519,
      lng: 106.863496,
      alt: 19999205,
      heading: 354,
      pitch: -89
    },
    orderIndependentTranslucency: false,
    contextOptions: {
      webgl: {
        alpha: true
      }
    },
    // 允许透明，只能Map初始化传入 [关键代码]
    showMoon: false,
    showSkyBox: false,
    showSkyAtmosphere: false,
    fog: false,
    globe: {
      baseColor: "rgba(0,0,0,0)",
      showGroundAtmosphere: false,
      enableLighting: false
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
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
function onUnmounted() {
  map = null;
}
function show() {
  map.container.style.backgroundImage = "none";
}
function show1() {
  map.container.style.backgroundImage = "url(/img/tietu/backGroundImg.jpg)";
}
function show2() {
  map.container.style.backgroundImage = "url(//data.mars3d.cn/file/img/world/world.jpg)";
}
function show3() {
  map.container.style.backgroundImage = "url(/img/tietu/bg4.jpg)";
}