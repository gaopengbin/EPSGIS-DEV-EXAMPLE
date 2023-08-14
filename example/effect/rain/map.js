/* 2023-8-14 08:03:58 | 版权所有 山维科技 http://www.sunwaysurvey.com.cn */
// import * as mars3d from "mars3d"

var map; // mars3d.Map三维地图对象
var rainEffect;

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
var mapOptions = {
  scene: {
    center: {
      lat: 31.789209,
      lng: 117.214049,
      alt: 603,
      heading: 10,
      pitch: -11
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

  // 大气层外光圈
  map.scene.skyAtmosphere.hueShift = -0.8;
  map.scene.skyAtmosphere.saturationShift = -0.7;
  map.scene.skyAtmosphere.brightnessShift = -0.33;
  // 雾化效果
  map.scene.fog.density = 0.001;
  map.scene.fog.minimumBrightness = 0.8;

  // 雨效果
  rainEffect = new mars3d.effect.RainEffect({
    speed: 10,
    size: 20,
    direction: 10
  });
  map.addEffect(rainEffect);
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
function onUnmounted() {
  map = null;
}

// 是否开启特效
function setEffect(val) {
  rainEffect.enabled = val;
}

// 粒子速度
function setSpeed(value) {
  rainEffect.speed = value;
}

// 粒子大小
function setSize(value) {
  rainEffect.size = value;
}

// 粒子方向
function setDirection(value) {
  rainEffect.direction = value;
}