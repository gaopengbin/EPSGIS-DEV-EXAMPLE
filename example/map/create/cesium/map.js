/* 2023-8-14 08:03:58 | 版权所有 山维科技 http://www.sunwaysurvey.com.cn */
// import * as mars3d from "mars3d"

function initMap() {
  // 构造地球（可以使用原生Cesium或第3方SDK方式去构造Viewer）
  var viewer = new Cesium.Viewer("Container1", {
    animation: false,
    timeline: false,
    baseLayerPicker: false,
    // 是否显示图层选择控件
    imageryProvider: new Cesium.TileMapServiceImageryProvider({
      url: Cesium.buildModuleUrl("Assets/Textures/NaturalEarthII")
    })
  });
  console.log("Cesium原生Cesium构造完成", viewer); // 打印测试信息

  // mars3d.Map也可以直接传入外部已经构造好的viewer, 支持config.json所有参数
  var map = new XE.Earth('Container2');

  // console.log("mars3d的Map主对象构造完成", map) // 打印测试信息
}

initMap();