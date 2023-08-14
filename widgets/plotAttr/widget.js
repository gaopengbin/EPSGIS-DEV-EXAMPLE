/* 2023-8-14 06:54:41 | 版权所有 山维科技 http://www.sunwaysurvey.com.cn */
"use script" //开发环境建议开启严格模式
;

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
(function (window, mars3d) {
  //创建widget类，需要继承BaseWidget
  var MyWidget = /*#__PURE__*/function (_mars3d$widget$BaseWi) {
    "use strict";

    _inherits(MyWidget, _mars3d$widget$BaseWi);
    var _super = _createSuper(MyWidget);
    function MyWidget() {
      _classCallCheck(this, MyWidget);
      return _super.apply(this, arguments);
    }
    _createClass(MyWidget, [{
      key: "view",
      get:
      //弹窗配置
      function get() {
        return {
          type: "window",
          url: "view.html",
          style: "dark",
          windowOptions: {
            skin: "layer-mars-dialog animation-scale-up",
            width: 250,
            position: {
              top: 10,
              left: 5,
              bottom: 30
            }
          }
        };
      }

      //初始化[仅执行1次]
    }, {
      key: "create",
      value: function create() {}

      //每个窗口创建完成后调用
    }, {
      key: "winCreateOK",
      value: function winCreateOK(opt, result) {
        this.viewWindow = result;
      }
      //激活插件
    }, {
      key: "activate",
      value: function activate() {}
      //释放插件
    }, {
      key: "disable",
      value: function disable() {
        var graphic = this.config.graphic;
        if (graphic && graphic._minPointNum) {
          graphic.stopEditing();
          if (this.config.sendSaveEntity) {
            this.config.sendSaveEntity();
          }
        }
      }
    }, {
      key: "getMinPointNum",
      value: function getMinPointNum() {
        var graphic = this.config.graphic;
        if (graphic && graphic._minPointNum) {
          return graphic._minPointNum;
        }
        return 3;
      }
    }, {
      key: "getMaxPointNum",
      value: function getMaxPointNum() {
        var graphic = this.config.graphic;
        if (graphic && graphic._maxPointNum) {
          return graphic._maxPointNum;
        }
        return 999;
      }
    }, {
      key: "defaultAttrList",
      get: function get() {
        return [{
          name: "id",
          label: "主键",
          type: "label",
          defval: ""
        }, {
          name: "name",
          label: "名称",
          type: "text",
          defval: ""
        }, {
          name: "remark",
          label: "备注",
          type: "textarea",
          defval: ""
        }];
      }
    }, {
      key: "getAttrList",
      value: function getAttrList() {
        return this.config.attrList || this.defaultAttrList;
      }
    }, {
      key: "getLayerName",
      value: function getLayerName() {
        var _graphic$_layer;
        var graphic = this.config.graphic;
        return (graphic === null || graphic === void 0 || (_graphic$_layer = graphic._layer) === null || _graphic$_layer === void 0 ? void 0 : _graphic$_layer.name) || "";
      }
    }, {
      key: "startEditing",
      value: function startEditing(graphic, lonlats) {
        if (graphic) {
          this.config.graphic = graphic;
        }
        if (lonlats) {
          this.config.lonlats = lonlats;
        }
        if (this.viewWindow == null) {
          return;
        }
        graphic = this.config.graphic;
        lonlats = this.config.lonlats;
        var config = _objectSpread(_objectSpread({}, graphic.options), {}, {
          type: graphic.type,
          style: graphic.style
        });
        console.log("开始编辑属性", config);
        this.viewWindow.plotEdit.startEditing(config, lonlats);
      }

      //更新样式
    }, {
      key: "updateStyle2map",
      value: function updateStyle2map(style) {
        console.log("更新style样式", style);
        var graphic = this.config.graphic;
        graphic.style = style;
      }
      //更新坐标
    }, {
      key: "updatePoints2map",
      value: function updatePoints2map(points) {
        console.log("更新坐标", points);
        var graphic = this.config.graphic;
        graphic.positions = points;
      }
      //更新属性
    }, {
      key: "updateAttr2map",
      value: function updateAttr2map(attr) {
        var graphic = this.config.graphic;
        graphic.attr = attr;
      }
    }, {
      key: "centerCurrentEntity",
      value: function centerCurrentEntity() {
        var graphic = this.config.graphic;
        graphic.flyTo();
      }
    }, {
      key: "deleteEntity",
      value: function deleteEntity() {
        var graphic = this.config.graphic;
        if (graphic.stopEditing) {
          graphic.stopEditing();
        }
        graphic.remove();
        this.disableBase();
      }

      //文件处理
    }, {
      key: "getGeoJson",
      value: function getGeoJson() {
        var graphic = this.config.graphic;
        var geojson = graphic.toGeoJSON();
        geojson.properties._layer = graphic._layer.name; //记录分组信息

        return geojson;
      }
    }]);
    return MyWidget;
  }(mars3d.widget.BaseWidget); //注册到widget管理器中。
  mars3d.widget.bindClass(MyWidget);

  //每个widet之间都是直接引入到index.html中，会存在彼此命名冲突，所以闭包处理下。
})(window, mars3d);