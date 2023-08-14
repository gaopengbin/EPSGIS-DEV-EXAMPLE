/* 2023-8-14 06:23:04 | 版权所有 山维科技 http://www.sunwaysurvey.com.cn */
// import * as mars3d from "mars3d"

var map; // mars3d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
var mapOptions = {
  layers: [{
    type: "geojson",
    name: "示例数据",
    url: "//data.mars3d.cn/file/geojson/mars3d-draw.json",
    popup: "{type} {name}",
    show: true
  }, {
    type: "3dtiles",
    name: "测试模型",
    url: "//data.mars3d.cn/3dtiles/bim-daxue/tileset.json",
    position: {
      lng: 116.313536,
      lat: 31.217297,
      alt: 80
    },
    scale: 100,
    popup: "all",
    show: true
  }]
};

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars3d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
function onMounted(mapInstance) {
  map = mapInstance;
  map.on(mars3d.EventType.load, function (event) {
    console.log("\u5730\u56FE\u6240\u6709\u56FE\u5C42\u52A0\u8F7D\u5B8C\u6210");
  });
  map.on(mars3d.EventType.keyup, function (e) {
    console.log("按下了键盘", e);
  });

  // on绑定事件
  map.on(mars3d.EventType.cameraChanged, this.map_cameraChangedHandler, this);
  map.on(mars3d.EventType.click, this.map_clickHandler, this);
  map.on(mars3d.EventType.dblClick, this.map_dblClickHandler, this);

  // off移除事件
  // map.off(mars3d.EventType.cameraChanged, this.map_cameraChangedHandler, this)
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
function onUnmounted() {
  map = null;
}
var clickTimeId; // 双击会触发两次单击事件的解决
function map_clickHandler(event) {
  clearTimeout(clickTimeId);
  clickTimeId = setTimeout(function () {
    console.log("鼠标单击", event);
  }, 250);
}
function map_dblClickHandler(event) {
  clearTimeout(clickTimeId);
  console.log("鼠标双击地图", event);
}
function map_cameraChangedHandler(event) {
  console.log("相机位置完成", event);
}