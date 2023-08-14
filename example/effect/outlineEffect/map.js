/* 2023-8-14 07:58:15 | 版权所有 山维科技 http://www.sunwaysurvey.com.cn */
// import * as mars3d from "mars3d"

var map; // mars3d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
var mapOptions = {
  scene: {
    center: {
      lat: 31.653633,
      lng: 117.075814,
      alt: 310,
      heading: 33,
      pitch: -29
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

  // 加模型
  var tiles3dLayer = new mars3d.layer.TilesetLayer({
    name: "石化工厂",
    url: "//data.mars3d.cn/3dtiles/max-shihua/tileset.json",
    position: {
      lng: 117.077158,
      lat: 31.659116,
      alt: 24.6
    },
    maximumScreenSpaceError: 1,
    flyTo: true
  });
  map.addLayer(tiles3dLayer);

  // 矢量图层
  var graphicLayer = new mars3d.layer.GraphicLayer();
  map.addLayer(graphicLayer);

  // 加gltf模型
  var graphicModel = new mars3d.graphic.ModelPrimitive({
    name: "汽车",
    position: Cesium.Cartesian3.fromDegrees(117.074035, 31.660459, 40),
    style: {
      url: "//data.mars3d.cn/gltf/mars/qiche.gltf",
      scale: 1,
      minimumPixelSize: 50
    }
  });
  graphicLayer.addGraphic(graphicModel);

  // 加矢量数据
  var graphicBox1 = new mars3d.graphic.BoxPrimitive({
    position: Cesium.Cartesian3.fromDegrees(117.071033, 31.663258, 31.3),
    style: {
      dimensions: new Cesium.Cartesian3(100.0, 100.0, 100.0),
      color: "#ff0000"
    }
  });
  graphicLayer.addGraphic(graphicBox1);
  var graphic1 = new mars3d.graphic.EllipsoidPrimitive({
    position: Cesium.Cartesian3.fromDegrees(117.071423, 31.664305, 30.8),
    style: {
      radii: new Cesium.Cartesian3(50.0, 50.0, 50.0),
      color: "#ff0000"
    }
  });
  graphicLayer.addGraphic(graphic1);
  var graphicBox2 = new mars3d.graphic.BoxPrimitive({
    position: Cesium.Cartesian3.fromDegrees(117.074033, 31.663258, 31.3),
    style: {
      dimensions: new Cesium.Cartesian3(100.0, 100.0, 100.0),
      color: Cesium.Color.GREY
    }
  });
  graphicLayer.addGraphic(graphicBox2);
  var graphic2 = new mars3d.graphic.EllipsoidPrimitive({
    position: Cesium.Cartesian3.fromDegrees(117.074423, 31.664305, 30.8),
    style: {
      radii: new Cesium.Cartesian3(50.0, 50.0, 50.0),
      color: Cesium.Color.GREY
    }
  });
  graphicLayer.addGraphic(graphic2);
  var graphicBox3 = new mars3d.graphic.BoxPrimitive({
    position: Cesium.Cartesian3.fromDegrees(117.076033, 31.663258, 31.3),
    style: {
      dimensions: new Cesium.Cartesian3(100.0, 100.0, 100.0),
      color: "#3388ff"
    }
  });
  graphicLayer.addGraphic(graphicBox3);
  var graphic3 = new mars3d.graphic.EllipsoidPrimitive({
    position: Cesium.Cartesian3.fromDegrees(117.076423, 31.664305, 30.8),
    style: {
      radii: new Cesium.Cartesian3(50.0, 50.0, 50.0),
      color: "#3388ff"
    }
  });
  graphicLayer.addGraphic(graphic3);
  var graphicBox4 = new mars3d.graphic.BoxPrimitive({
    position: Cesium.Cartesian3.fromDegrees(117.078033, 31.663258, 31.3),
    style: {
      dimensions: new Cesium.Cartesian3(100.0, 100.0, 100.0),
      color: "#00ffff"
    }
  });
  graphicLayer.addGraphic(graphicBox4);
  var graphic4 = new mars3d.graphic.EllipsoidPrimitive({
    position: Cesium.Cartesian3.fromDegrees(117.078423, 31.664305, 30.8),
    style: {
      radii: new Cesium.Cartesian3(50.0, 50.0, 50.0),
      color: "#00ffff"
    }
  });
  graphicLayer.addGraphic(graphic4);

  // 添加特效
  var outlineEffect = new mars3d.effect.OutlineEffect({
    color: "#FFFF00",
    width: 4,
    eventType: mars3d.EventType.click
  });
  map.addEffect(outlineEffect);
  setTimeout(function () {
    // 指定高亮Primitive
    outlineEffect.selected = [graphicBox1, graphic1];
  }, 1000);

  // 从模型读取指定构件 加到 特效
  // tiles3dLayer.readyPromise.then(function (e) {
  //   addTileToTargetEffect(tiles3dLayer, outlineEffect)
  // })
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
function onUnmounted() {
  map = null;
}

// 从模型读取指定构件 加到 特效
function addTileToTargetEffect(tiles3dLayer, effect) {
  var listGJ = new mars3d.MarsArray();
  tiles3dLayer.tileset.tileLoad.addEventListener(function (tile) {
    processTileFeatures(tile, function (feature) {
      var attr = mars3d.Util.get3DTileFeatureAttr(feature); // 取属性

      // 根据条件判断，将feature记录
      if (attr.id === "4734ba6f3de83d861c3176a6273cac6d") {
        listGJ.set(feature.featureId, feature.pickId);
        effect.selected = listGJ.values;
      }
    });
  });
  tiles3dLayer.tileset.tileUnload.addEventListener(function (tile) {
    processTileFeatures(tile, function (feature) {
      if (listGJ.contains(feature.featureId)) {
        listGJ.remove(feature.featureId);
        effect.selected = listGJ.values;
      }
    });
  });
}
function processContentFeatures(content, callback) {
  var featuresLength = content.featuresLength;
  for (var i = 0; i < featuresLength; ++i) {
    var feature = content.getFeature(i);
    callback(feature);
  }
}
function processTileFeatures(tile, callback) {
  var content = tile.content;
  var innerContents = content.innerContents;
  if (Cesium.defined(innerContents)) {
    var length = innerContents.length;
    for (var i = 0; i < length; ++i) {
      processContentFeatures(innerContents[i], callback);
    }
  } else {
    processContentFeatures(content, callback);
  }
}