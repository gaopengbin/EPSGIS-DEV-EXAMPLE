/* 2023-8-14 06:23:04 | 版权所有 山维科技 http://www.sunwaysurvey.com.cn */
// import * as mars3d from "mars3d"

var map; // mars3d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
var mapOptions = {
  scene: {
    center: {
      lat: 26.520735,
      lng: 99.609792,
      alt: 23891502.7,
      heading: 93.3,
      pitch: -80.8,
      roll: 266.7
    },
    clock: {
      multiplier: 200 // 速度
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

  // 按shift键+鼠标左键 拖拽 地球到合适区域，通过下面代码获取视角参数，拷贝到mapOptions的center参数中。
  var center = JSON.stringify(map.getCameraView({
    simplify: false
  }));
  console.log("center视角为：", center);
  startRotate();
  getGeojsonStart();
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
function onUnmounted() {
  map = null;
}
var previousTime;
function startRotate() {
  stopRotate();
  previousTime = map.clock.currentTime.secondsOfDay;
  map.on(mars3d.EventType.clockTick, map_onClockTick);
}
function stopRotate() {
  map.off(mars3d.EventType.clockTick, map_onClockTick);
}
// 地球旋转
function map_onClockTick() {
  var spinRate = 1;
  var currentTime = map.clock.currentTime.secondsOfDay;
  var delta = (currentTime - previousTime) / 1000;
  previousTime = currentTime;
  map.scene.camera.rotate(Cesium.Cartesian3.UNIT_Z, -spinRate * delta);
}

// 加载 演示数据
function getGeojsonStart() {
  startRotate();
  // 获取演示数据并加载
  mars3d.Util.fetchJson({
    url: "//data.mars3d.cn/file/geojson/areas/100000_full.json"
  }).then(function (json) {
    addDemoGraphics(json);
  })["catch"](function (error) {
    console.log("加载JSON出错", error);
  });
}
function addDemoGraphics(geojson) {
  var center = Cesium.Cartesian3.fromDegrees(117.203932, 31.856794, 31.8);
  // 公司位置 矢量对象标记
  var lightCone = new mars3d.graphic.LightCone({
    position: center,
    style: {
      color: "rgba(0,255,255,0.9)",
      radius: 80000,
      // 底部半径
      height: 1000000 // 椎体高度
    },

    show: true
  });
  map.graphicLayer.addGraphic(lightCone);
  var arr = mars3d.Util.geoJsonToGraphics(geojson); // 解析geojson
  var lineMaterial = mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.LineFlow, {
    image: "img/textures/line-color-yellow.png",
    color: new Cesium.Color(255 / 255, 201 / 255, 38 / 255, 0.5),
    speed: 9
  });
  for (var i = 0; i < arr.length; i++) {
    var item = arr[i].attr;
    if (item.name) {
      var thisPoint = Cesium.Cartesian3.fromDegrees(item.center[0], item.center[1]);
      var positions = mars3d.PolyUtil.getLinkedPointList(center, thisPoint, 40000, 100); // 计算曲线点
      var graphic = new mars3d.graphic.PolylinePrimitive({
        positions: positions,
        style: {
          width: 2,
          material: lineMaterial // 动画线材质
        },

        attr: item
      });
      graphic.bindTooltip("\u5408\u80A5 - ".concat(item.name));
      map.graphicLayer.addGraphic(graphic);
    }
  }
}