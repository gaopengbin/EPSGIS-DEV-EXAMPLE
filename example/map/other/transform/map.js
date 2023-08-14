/* 2023-8-14 06:23:04 | 版权所有 山维科技 http://www.sunwaysurvey.com.cn */
// import * as mars3d from "mars3d"

var map; // mars3d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
var mapOptions = {
  scene: {
    center: {
      lat: 22.149271,
      lng: 116.950247,
      alt: 1062553.8,
      heading: 359.5,
      pitch: -50.6
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
  map = mapInstance;
  globalNotify("提示", "\u5DF2\u5BF9DIV\u8BBE\u7F6ECSS : transform: scale(2);\u3002");
  var layer = new mars3d.layer.GraphicLayer();
  map.addLayer(layer);
  var point = new mars3d.graphic.PointPrimitive({
    position: [116.337407, 30.977153, 10],
    popup: "这是一个点",
    style: {
      pixelSize: 12,
      color: "#ff0000",
      label: {
        text: "请点击",
        font_size: 14,
        horizontalOrigin: mars3d.Cesium.HorizontalOrigin.LEFT,
        verticalOrigin: mars3d.Cesium.VerticalOrigin.CENTER,
        pixelOffsetX: 16
      }
    }
  });
  layer.addGraphic(point);
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
function onUnmounted() {
  map = null;
}