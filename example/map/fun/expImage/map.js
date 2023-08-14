/* 2023-8-14 08:03:58 | 版权所有 山维科技 http://www.sunwaysurvey.com.cn */
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// import * as mars3d from "mars3d"

var map; // mars3d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
var mapOptions = {
  scene: {
    center: {
      lat: 30.309522,
      lng: 116.275765,
      alt: 69659,
      heading: 0,
      pitch: -45
    }
  },
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
var eventTarget = new mars3d.BaseClass(); // 事件对象，用于抛出事件到面板中

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars3d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
function onMounted(mapInstance) {
  map = mapInstance; // 记录map

  // 三维模型
  var tilesetLayer = new mars3d.layer.TilesetLayer({
    url: "//data.mars3d.cn/3dtiles/qx-simiao/tileset.json",
    position: {
      alt: 80.6
    },
    maximumScreenSpaceError: 1
  });
  map.addLayer(tilesetLayer);

  // 创建DIV数据图层
  var graphicLayer = new mars3d.layer.GraphicLayer();
  map.addLayer(graphicLayer);
  addGraphic_06(graphicLayer);
  addGraphic_08(graphicLayer);
  addGraphic_09(graphicLayer);
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
function onUnmounted() {
  map = null;
}

// 查看场景出图
function showMapImg() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return map.expImage(_objectSpread({
    download: false
  }, options)).then(function (result) {
    return result.image;
  });
}

// 下载场景出图
function downLoad() {
  map.expImage();
}

// 下载场景缩略图
function downLoad2() {
  map.expImage({
    height: 300,
    // 指定 高度 或 宽度(指定1种就行，对应的自动缩放)
    // width: 300, //同时指定后去裁剪中间部分
    download: true
  });
}
function downLoadDiv() {
  var mapDom = map.container;
  var filterNode = document.getElementsByClassName("cesium-viewer-cesiumWidgetContainer");
  function filter(node) {
    return node !== filterNode[0];
  }
  map.expImage({
    download: false
  }).then(function (result) {
    // eslint-disable-next-line no-undef
    domtoimage.toPng(mapDom, {
      filter: filter
    }).then(function (baseUrl) {
      mergeImage(result.image, baseUrl, result.width, result.height).then(function (base64) {
        mars3d.Util.downloadBase64Image("场景出图_含DIV.png", base64); // 下载图片
      });
    })["catch"](function (error) {
      console.error(error);
    });
  });
}

// 合并2张图片
function mergeImage(base1, base2, width, height) {
  return new Promise(function (resolve, reject) {
    var canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext("2d");
    var image = new Image(); // MAP图片
    image.crossOrigin = "Anonymous"; // 支持跨域图片
    image.onload = function () {
      ctx.drawImage(image, 0, 0, width, height);
      var image2 = new Image(); // div图片
      image2.crossOrigin = "Anonymous"; // 支持跨域图片
      image2.onload = function () {
        ctx.drawImage(image2, 0, 0, width, height);

        // 合并后的图片
        var base64 = canvas.toDataURL("image/png");
        resolve(base64);
      };
      image2.src = base2;
    };
    image.src = base1;
  });
}

// 内置扩展的动态文本 DivBoderLabel
function addGraphic_06(graphicLayer) {
  var graphic = new mars3d.graphic.DivBoderLabel({
    position: [116.460722, 31.140888, 781],
    style: {
      text: "山维科技EPSGIS平台",
      font_size: 15,
      font_family: "微软雅黑",
      color: "#ccc",
      boderColor: "#15d1f2"
    }
  });
  graphicLayer.addGraphic(graphic);
}

// 类似popup/toolitp的自定义html
function addGraphic_08(graphicLayer) {
  var graphic = new mars3d.graphic.Popup({
    position: [116.146461, 31.380152, 395.1],
    style: {
      html: "\u8FD9\u91CC\u53EF\u4EE5\u653E\u5165\u4EFB\u610Fhtml\u4EE3\u7801<br /> Popup\u548CTooltip\u4E5F\u662F\u7EE7\u627F\u81EADivGraphic",
      closeButton: false,
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 200000),
      // 按视距距离显示

      // 高亮时的样式
      highlight: {
        type: mars3d.EventType.click,
        className: "mars-popup-highlight"
      }
    }
  });
  graphicLayer.addGraphic(graphic);
}

// 倾斜指向左下角的面板样式
function addGraphic_09(graphicLayer) {
  var graphic = new mars3d.graphic.DivGraphic({
    position: [116.138686, 31.101009, 1230],
    style: {
      html: "<div class=\"marsTiltPanel marsTiltPanel-theme-red\">\n          <div class=\"marsTiltPanel-wrap\">\n              <div class=\"area\">\n                  <div class=\"arrow-lt\"></div>\n                  <div class=\"b-t\"></div>\n                  <div class=\"b-r\"></div>\n                  <div class=\"b-b\"></div>\n                  <div class=\"b-l\"></div>\n                  <div class=\"arrow-rb\"></div>\n                  <div class=\"label-wrap\">\n                      <div class=\"title\">\u706B\u661F\u6C34\u5382</div>\n                      <div class=\"label-content\">\n                          <div class=\"data-li\">\n                              <div class=\"data-label\">\u5B9E\u65F6\u6D41\u91CF\uFF1A</div>\n                              <div class=\"data-value\"><span id=\"lablLiuliang\" class=\"label-num\">39</span><span class=\"label-unit\">m\xB3/s</span>\n                              </div>\n                          </div>\n                          <div class=\"data-li\">\n                              <div class=\"data-label\">\u6C34\u6C60\u6DB2\u4F4D\uFF1A</div>\n                              <div class=\"data-value\"><span id=\"lablYeWei\"  class=\"label-num\">10.22</span><span class=\"label-unit\">m</span>\n                              </div>\n                          </div>\n                          <div class=\"data-li\">\n                              <div class=\"data-label\">\u6C34\u6CF5\u72B6\u6001\uFF1A</div>\n                              <div class=\"data-value\">\n                                <span id=\"lablSBZT1\"  class=\"label-tag data-value-status-1\" title=\"\u4E2D\u95F4\u72B6\u6001\">1\u53F7</span>\n                                <span id=\"lablSBZT2\"  class=\"label-tag data-value-status-0\" title=\"\u5173\u95ED\u72B6\u6001\">2\u53F7</span>\n                                </div>\n                          </div>\n                          <div class=\"data-li\">\n                              <div class=\"data-label\">\u51FA\u6C34\u9600\u95E8\uFF1A</div>\n                              <div class=\"data-value\">\n                                <span id=\"lablCSFM1\"   class=\"label-tag data-value-status-1\" title=\"\u4E2D\u95F4\u72B6\u6001\">1\u53F7</span>\n                                <span id=\"lablCSFM2\"   class=\"label-tag data-value-status-2\" title=\"\u6253\u5F00\u72B6\u6001\">2\u53F7</span>\n                              </div>\n                          </div>\n                      </div>\n                  </div>\n              </div>\n              <div class=\"b-t-l\"></div>\n              <div class=\"b-b-r\"></div>\n          </div>\n          <div class=\"arrow\" ></div>\n      </div>",
      horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 200000),
      // 按视距距离显示
      scaleByDistance: new Cesium.NearFarScalar(1000, 1.0, 200000, 0.2),
      clampToGround: true
    },
    attr: {
      remark: "示例9"
    },
    pointerEvents: false // false时不允许拾取和触发任意鼠标事件，但可以穿透div缩放地球
  });

  graphicLayer.addGraphic(graphic);

  // 刷新局部DOM,不影响面板的其他控件操作
  // [建议读取到后端接口数据后主动去修改DOM，比下面演示的实时刷新效率高些]
  graphic.on(mars3d.EventType.postRender, function (event) {
    var container = event.container; // popup对应的DOM

    var lablLiuliang = container.querySelector("#lablLiuliang");
    if (lablLiuliang) {
      lablLiuliang.innerHTML = (Math.random() * 100).toFixed(0); // 测试的随机数
    }

    var lablYeWei = container.querySelector("#lablYeWei");
    if (lablYeWei) {
      lablYeWei.innerHTML = mars3d.Util.formatDate(new Date(), "ss.S"); // 测试的随机数
    }
  });
}