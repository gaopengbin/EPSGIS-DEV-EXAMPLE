/* 2023-8-14 08:03:58 | 版权所有 山维科技 http://www.sunwaysurvey.com.cn */
/* eslint-disable no-undef */
"use script";

//开发环境建议开启严格模式
$(document).ready(function () {
  var inhtml = "\n            <div class=\"infoview rightbottom\">\n                <input type=\"button\" class=\"btn btn-primary\" value=\"\u5B9A\u4F4D\u81F3\u5C71\u533A\" onclick=\"centerAtTerrain()\" />\n                <input type=\"button\" class=\"btn btn-primary\" value=\"\u5B9A\u4F4D\u81F3\u6A21\u578B\" onclick=\"centerAtModel()\" />\n            </div>  ";
  $("body").append(inhtml);
});
function centerAtTerrain() {
  map.setCameraView({
    lat: 30.859414,
    lng: 116.28709,
    alt: 8617,
    heading: 18,
    pitch: -28
  });
}
var modelTest;
function centerAtModel() {
  map.setCameraView({
    lat: 33.590452,
    lng: 119.032184,
    alt: 185,
    heading: 359,
    pitch: -34
  });

  //三维模型
  if (!modelTest) {
    modelTest = new mars3d.layer.TilesetLayer({
      url: "//data.mars3d.cn/3dtiles/qx-simiao/tileset.json",
      position: {
        alt: 80.6
      },
      maximumScreenSpaceError: 1,
      maximumMemoryUsage: 1024,
      flyTo: true
    });
    map.addLayer(modelTest);
  }
}