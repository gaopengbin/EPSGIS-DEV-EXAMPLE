
function initMap() {
  // 创建三维地球场景
  const earth = new XE.Earth("earthContainer")
  earth.sceneTree.root = {
    "children": [
      {
        "czmObject": {
          "xbsjType": "Imagery",
          "name": "离线影像",
          "show": true,
          "xbsjImageryProvider": {
            "createTileMapServiceImageryProvider": {
              "url": XE.HTML.cesiumDir + 'Assets/Textures/NaturalEarthII',
              "fileExtension": 'jpg',
            },
            "type": 'createTileMapServiceImageryProvider',
          },
        }
      }
    ]
  }

  // 打印测试信息
  console.log("earth对象构造完成", earth)
  console.log("其中Cesium原生的Cesium.Viewer为", earth.czm.viewer)

  return earth
}

initMap()