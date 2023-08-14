/* 2023-8-14 07:58:15 | 版权所有 山维科技 http://www.sunwaysurvey.com.cn */
// import * as mars3d from "mars3d"

var map; // mars3d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
var mapOptions = {
  scene: {
    center: {
      lat: 33.591733,
      lng: 119.032381,
      alt: 32,
      heading: 331,
      pitch: -21
    },
    globe: {
      depthTestAgainstTerrain: true
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

  globalNotify("已知问题提示", "(1) 目前为实验示例，镜面效果一般。 (2) 模型越平整效果越好 ");

  // 添加参考三维模型
  var tiles3dLayer = new mars3d.layer.TilesetLayer({
    url: "//data.mars3d.cn/3dtiles/qx-simiao/tileset.json",
    position: {
      alt: 80.6
    },
    maximumScreenSpaceError: 1,
    dynamicScreenSpaceError: true,
    cullWithChildrenBounds: false
  });
  map.addLayer(tiles3dLayer);

  // 倒影效果
  var invertedEffect = new mars3d.effect.InvertedEffect();
  map.addEffect(invertedEffect);
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
function onUnmounted() {
  map = null;
}