/* 2023-8-14 06:54:40 | 版权所有 山维科技 http://www.sunwaysurvey.com.cn */
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// import * as mars3d from "mars3d"

var map; // mars3d.Map三维地图对象
var mapEx;

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
  map = mapInstance; // 记录map

  // addTestData()

  // 修改已有地图为50%
  var mapOld = document.getElementById("centerDiv3D");
  mapOld.style.width = "50%";

  // 获取原来地图的参数
  var mapOptions2 = map.getCurrentOptions(); // map.getOptions()
  mapOptions2.control.baseLayerPicker = true; // basemaps底图切换按钮
  mapOptions2.control.sceneModePicker = false;

  // 用于双屏同图层，不同配置展示
  for (var i = 0, len = mapOptions2.layers.length; i < len; i++) {
    var item = mapOptions2.layers[i];
    if (item.compare) {
      for (var key in item.compare) {
        item[key] = item.compare[key]; // 存在compare属性时
      }
    }
  }

  console.log("分屏地图配置", mars3d.Util.clone(mapOptions2));
  var mapSplit = new mars3d.control.MapCompare(_objectSpread(_objectSpread({}, mapOptions2), {}, {
    parentContainer: document.body
  }));
  map.addControl(mapSplit);

  // 修改对比地图
  mapSplit.mapEx.basemap = "天地图电子";
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
function onUnmounted() {
  map = null;
}
function addTestData() {
  var groupLayer = new mars3d.layer.GroupLayer({
    name: "组图层"
  });
  var layer = new mars3d.layer.TilesetLayer({
    name: "测试模型2",
    url: "//data.mars3d.cn/3dtiles/bim-daxue/tileset.json",
    position: {
      lng: 116.267315,
      lat: 31.457617,
      alt: 103
    },
    scale: 100,
    maximumScreenSpaceError: 2,
    dynamicScreenSpaceError: true,
    cullWithChildrenBounds: false
  });
  groupLayer.addLayer(layer);
  map.addLayer(groupLayer);
}