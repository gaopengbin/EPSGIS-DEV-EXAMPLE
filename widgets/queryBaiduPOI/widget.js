/* 2023-8-14 08:03:59 | 版权所有 山维科技 http://www.sunwaysurvey.com.cn */
"use script" //开发环境建议开启严格模式
;

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
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
      key: "resources",
      get:
      //外部资源配置
      function get() {
        return ["view.css"];
      }

      //弹窗配置
    }, {
      key: "view",
      get: function get() {
        return {
          type: "append",
          url: "view.html",
          parent: "body"
        };
      }

      //初始化[仅执行1次]
    }, {
      key: "create",
      value: function create() {
        this.storageName = "mars3d_queryBaiduPOI";
        this.pageSize = 6;
        this.allpage = 0;
        this.thispage = 0;

        //创建矢量数据图层
        this.graphicLayer = new mars3d.layer.GraphicLayer({
          name: this.config.name,
          pid: 99 //图层管理 中使用，父节点id
        });
        //鼠标单击后的信息面板弹窗
        this.graphicLayer.bindPopup(function (event) {
          var _event$graphic;
          var item = (_event$graphic = event.graphic) === null || _event$graphic === void 0 ? void 0 : _event$graphic.attr;
          if (!item) {
            return;
          }
          var name;
          if (item.detailUrl) {
            name = '<a href="' + item.detailUrl + '"  target="_black" style="color: #ffffff; ">' + item.name + "</a>";
          } else {
            name = item.name;
          }
          var inHtml = '<div class="mars-popup-titile">' + name + '</div><div class="mars-popup-content" >';
          var phone = $.trim(item.tel);
          if (phone != "") {
            inHtml += "<div><label>电话</label>" + phone + "</div>";
          }
          var dz = $.trim(item.address);
          if (dz != "") {
            inHtml += "<div><label>地址</label>" + dz + "</div>";
          }
          if (item.type) {
            var fl = $.trim(item.type);
            if (fl != "") {
              inHtml += "<div><label>类别</label>" + fl + "</div>";
            }
          }
          inHtml += "</div>";
          return inHtml;
        });

        //查询控制器
        this._queryPoi = new mars3d.query.BaiduPOI({
          // city: '合肥市',
        });
      }
      //每个窗口创建完成后调用
    }, {
      key: "winCreateOK",
      value: function winCreateOK(opt, result) {
        var _this = this;
        if (opt.type != "append") {
          return;
        }
        var that = this;
        var img = $("#map-querybar img");
        img.each(function (index, item) {
          $(item).attr("src", _this.path + $(item).attr("src"));
        });
        if (this.config.position) {
          $("#map-querybar").css(this.config.position);
        }
        if (this.config.style) {
          $("#map-querybar").css(this.config.style);
        }

        // 搜索框
        $("#txt_querypoi").click(function () {
          // 文本框内容为空
          if ($.trim($(this).val()).length === 0) {
            that.hideAllQueryBarView();
            that.showHistoryList(); // 显示历史记录
          }
        });

        var timetik = 0;

        // 搜索框绑定文本框值发生变化,隐藏默认搜索信息栏,显示匹配结果列表
        $("#txt_querypoi").bind("input propertychange", function () {
          clearTimeout(timetik);
          timetik = setTimeout(function () {
            _this.hideAllQueryBarView();
            _this.clearLayers();
            var queryVal = $.trim($("#txt_querypoi").val());
            if (queryVal.length == 0) {
              // 文本框内容为空,显示历史记录
              _this.showHistoryList();
            } else {
              _this.autoTipList(queryVal, true);
            }
          }, 500);
        });

        // 点击搜索查询按钮
        $("#btn_querypoi").click(function () {
          clearTimeout(timetik);
          _this.hideAllQueryBarView();
          var queryVal = $.trim($("#txt_querypoi").val());
          _this.strartQueryPOI(queryVal, true);
        });
        //绑定回车键
        $("#txt_querypoi").bind("keydown", function (event) {
          if (event.keyCode == "13") {
            $("#btn_querypoi").click();
          }
        });

        // 返回查询结果面板界面
        $("#querybar_detail_back").click(function () {
          _this.hideAllQueryBarView();
          $("#querybar_resultlist_view").show();
        });
      }
      //打开激活
    }, {
      key: "activate",
      value: function activate() {
        var _this$map$controls$lo;
        this.map.addLayer(this.graphicLayer);

        // 下侧状态栏提示
        var locationBar = (_this$map$controls$lo = this.map.controls.locationBar) === null || _this$map$controls$lo === void 0 ? void 0 : _this$map$controls$lo.container;
        if (locationBar) {
          this.queryAddressDOM = mars3d.DomUtil.create("div", "mars3d-locationbar-content mars3d-locationbar-autohide", this.map.controls.locationBar.container);
          this.queryAddressDOM.style.marginRight = "50px";
        }

        //单击地图事件
        this.map.on(mars3d.EventType.clickMap, this.onMapClick, this);
        this.map.on(mars3d.EventType.cameraChanged, this.onMapCameraChanged, this);
        this.onMapCameraChanged();
      }
      //关闭释放
    }, {
      key: "disable",
      value: function disable() {
        this.map.removeLayer(this.graphicLayer);

        //释放单击地图事件
        this.map.off(mars3d.EventType.clickMap, this.onMapClick, this);
        this.map.off(mars3d.EventType.cameraChanged, this.onMapCameraChanged, this);
        if (this.queryAddressDOM) {
          mars3d.DomUtil.remove(this.queryAddressDOM);
          delete this.queryAddressDOM;
        }
        this.hideAllQueryBarView();
        this.clearLayers();
      }
    }, {
      key: "onMapClick",
      value: function onMapClick(event) {
        // 点击地图区域,隐藏所有弹出框
        if ($.trim($("#txt_querypoi").val()).length == 0) {
          this.hideAllQueryBarView();
          $("#txt_querypoi").blur();
        }
      }
    }, {
      key: "onMapCameraChanged",
      value: function onMapCameraChanged(event) {
        var _this2 = this;
        var radius = this.map.camera.positionCartographic.height; //单位：米
        if (radius > 100000) {
          this.address = null;
          this.queryAddressDOM.innerHTML = "";
          return;
        }
        this._queryPoi.getAddress({
          location: this.map.getCenter(),
          success: function success(result) {
            // console.log("地址", result);
            _this2.address = result;
            _this2.queryAddressDOM.innerHTML = "地址：" + result.address;
          }
        });
      }
    }, {
      key: "hideAllQueryBarView",
      value: function hideAllQueryBarView() {
        $("#querybar_histroy_view").hide();
        $("#querybar_autotip_view").hide();
        $("#querybar_resultlist_view").hide();
      }

      // 点击面板条目,自动填充搜索框,并展示搜索结果面板
    }, {
      key: "autoSearch",
      value: function autoSearch(name) {
        $("#txt_querypoi").val(name);
        $("#btn_querypoi").trigger("click");
      }

      //===================与后台交互========================

      //显示智能提示搜索结果
    }, {
      key: "autoTipList",
      value: function autoTipList(text, queryEx) {
        var _this$address;
        //输入经纬度数字时
        if (this.isLonLat(text)) {
          return;
        }

        //查询外部widget
        if (this.hasExWidget() && queryEx) {
          this.autoExTipList(text);
          return;
        }
        //查询外部widget

        //搜索提示
        this._queryPoi.autoTip({
          text: text,
          city: (_this$address = this.address) === null || _this$address === void 0 ? void 0 : _this$address.city,
          location: this.map.getCenter(),
          success: function success(result) {
            var inhtml = "";
            var pois = result.list;
            for (var index = 0; index < pois.length; index++) {
              var name = pois[index].name;
              // var num = pois[index].num;
              // if (num > 0) continue;

              inhtml += "<li><i class='fa fa-search'></i><a href=\"javascript:queryBaiduPOIWidget.autoSearch('" + name + "');\">" + name + "</a></li>";
            }
            if (inhtml.length > 0) {
              $("#querybar_ul_autotip").html(inhtml);
              $("#querybar_autotip_view").show();
            }
          }
        });
      }

      // 根据输入框内容，查询显示列表
    }, {
      key: "strartQueryPOI",
      value: function strartQueryPOI(text, queryEx) {
        var _this$address2;
        if (text.length == 0) {
          toastr.warning("请输入搜索关键字！");
          return;
        }

        // TODO:根据文本框输入内容,从数据库模糊查询到所有匹配结果（分页显示）
        this.addHistory(text);
        this.hideAllQueryBarView();

        //输入经纬度数字时
        if (this.isLonLat(text)) {
          this.centerAtLonLat(text);
          return;
        }

        //查询外部widget
        if (this.hasExWidget() && queryEx) {
          var qylist = this.queryExPOI(text);
          return;
        }
        //查询外部widget

        this.thispage = 1;
        this.queryText = text;
        this.query_city = (_this$address2 = this.address) === null || _this$address2 === void 0 ? void 0 : _this$address2.city;
        // this.query_location = this.map.getCenter()
        // this.query_radius = this.map.camera.positionCartographic.height //单位：米

        this.queryTextByServer();
      }
    }, {
      key: "queryTextByServer",
      value: function queryTextByServer() {
        var _this3 = this;
        //查询获取数据
        this._queryPoi.queryText({
          text: this.queryText,
          count: this.pageSize,
          page: this.thispage - 1,
          city: this.query_city,
          // location: this.query_location,
          // radius: this.query_radius,
          success: function success(result) {
            if (!_this3.isActivate) {
              return;
            }
            _this3.showPOIPage(result.list, result.allcount);
          }
        });
      }

      //===================显示查询结果处理========================
    }, {
      key: "showPOIPage",
      value: function showPOIPage(data, counts) {
        // count -- 显示搜索结果的数量；data -- 结果的属性，如地址电话等

        if (counts < data.length) {
          counts = data.length;
        }
        this.allpage = Math.ceil(counts / this.pageSize);
        var inhtml = "";
        if (counts == 0) {
          inhtml += '<div class="querybar-page"><div class="querybar-fl">没有找到"<strong>' + this.queryText + '</strong>"相关结果</div></div>';
        } else {
          this.objResultData = this.objResultData || {};
          for (var index = 0; index < data.length; index++) {
            var item = data[index];
            var startIdx = (this.thispage - 1) * this.pageSize;
            item.index = startIdx + (index + 1);
            var _id = index;
            inhtml += "<div class=\"querybar-site\" onclick=\"queryGaodePOIWidget.showDetail('".concat(_id, "')\">\n            <div class=\"querybar-sitejj\">\n              <h3>").concat(item.index, "\u3001").concat(item.name, "\n              <a id=\"btnShowDetail\" href=\"").concat(item.detailUrl, "\" target=\"_blank\" class=\"querybar-more\">\u66F4\u591A&gt;</a> </h3>\n              <p> ").concat(item.address || "", "</p>\n            </div>\n          </div> ");
            this.objResultData[_id] = item;
          }

          //分页信息
          var _fyhtml;
          if (this.allpage > 1) {
            _fyhtml = '<div class="querybar-ye querybar-fr">' + this.thispage + "/" + this.allpage + '页  <a href="javascript:queryBaiduPOIWidget.showFirstPage()">首页</a> <a href="javascript:queryBaiduPOIWidget.showPretPage()">&lt;</a>  <a href="javascript:queryBaiduPOIWidget.showNextPage()">&gt;</a> </div>';
          } else {
            _fyhtml = "";
          }

          //底部信息
          inhtml += '<div class="querybar-page"><div class="querybar-fl">找到<strong>' + counts + "</strong>条结果</div>" + _fyhtml + "</div>";
        }
        $("#querybar_resultlist_view").html(inhtml);
        $("#querybar_resultlist_view").show();
        this.showPOIArr(data);
        if (counts == 1) {
          this.showDetail("0");
        }
      }
    }, {
      key: "showFirstPage",
      value: function showFirstPage() {
        this.thispage = 1;
        this.queryTextByServer();
      }
    }, {
      key: "showNextPage",
      value: function showNextPage() {
        this.thispage = this.thispage + 1;
        if (this.thispage > this.allpage) {
          this.thispage = this.allpage;
          toastr.warning("当前已是最后一页了");
          return;
        }
        this.queryTextByServer();
      }
    }, {
      key: "showPretPage",
      value: function showPretPage() {
        this.thispage = this.thispage - 1;
        if (this.thispage < 1) {
          this.thispage = 1;
          toastr.warning("当前已是第一页了");
          return;
        }
        this.queryTextByServer();
      }
      //点击单个结果,显示详细
    }, {
      key: "showDetail",
      value: function showDetail(id) {
        var item = this.objResultData[id];
        this.flyTo(item);
      }
    }, {
      key: "clearLayers",
      value: function clearLayers() {
        this.graphicLayer.closePopup();
        this.graphicLayer.clear();
      }
    }, {
      key: "showPOIArr",
      value: function showPOIArr(arr) {
        var _this4 = this;
        this.clearLayers();
        arr.forEach(function (item) {
          var jd = Number(item.lng);
          var wd = Number(item.lat);
          if (isNaN(jd) || isNaN(wd)) {
            return;
          }
          item.lng = jd;
          item.lat = wd;

          //添加实体
          var graphic = new mars3d.graphic.PointEntity({
            position: Cesium.Cartesian3.fromDegrees(jd, wd),
            style: {
              pixelSize: 10,
              color: "#3388ff",
              outline: true,
              outlineColor: "#ffffff",
              outlineWidth: 2,
              scaleByDistance: new Cesium.NearFarScalar(1000, 1, 1000000, 0.1),
              clampToGround: true,
              //贴地
              visibleDepth: false,
              //是否被遮挡
              label: {
                text: item.name,
                font_size: 20,
                color: "rgb(240,255,255)",
                outline: true,
                outlineWidth: 2,
                outlineColor: Cesium.Color.BLACK,
                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                pixelOffsetY: -10,
                //偏移量
                distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 200000),
                clampToGround: true,
                //贴地
                visibleDepth: false //是否被遮挡
              }
            },

            attr: item
          });
          _this4.graphicLayer.addGraphic(graphic);
          item._graphic = graphic;
        });
        if (arr.length > 1) {
          this.graphicLayer.flyTo();
        }
      }
    }, {
      key: "flyTo",
      value: function flyTo(item) {
        var _this5 = this;
        var graphic = item._graphic;
        if (graphic == null) {
          window.toastr.warning(item.name + " 无经纬度坐标信息！");
          return;
        }
        this.map.flyToGraphic(graphic, {
          radius: 2000
        });
        setTimeout(function () {
          _this5.graphicLayer.openPopup(graphic);
        }, 3000);
      }

      //===================坐标定位处理========================
    }, {
      key: "isLonLat",
      value: function isLonLat(text) {
        var reg = /^-?((0|1?[0-7]?[0-9]?)(([.][0-9]*)?)|180(([.][0]*)?)),-?((0|[1-8]?[0-9]?)(([.][0-9]*)?)|90(([.][0]*)?))$/; /*定义验证表达式*/
        return reg.test(text); /*进行验证*/
      }
    }, {
      key: "centerAtLonLat",
      value: function centerAtLonLat(text) {
        var arr = text.split(",");
        if (arr.length != 2) {
          return;
        }
        var jd = Number(arr[0]);
        var wd = Number(arr[1]);
        if (isNaN(jd) || isNaN(wd)) {
          return;
        }

        //添加实体
        var graphic = new mars3d.graphic.PointEntity({
          position: Cesium.Cartesian3.fromDegrees(jd, wd),
          style: {
            color: "#3388ff",
            pixelSize: 10,
            outline: true,
            outlineColor: "#ffffff",
            outlineWidth: 2,
            scaleByDistance: new Cesium.NearFarScalar(1000, 1, 1000000, 0.1),
            clampToGround: true,
            //贴地
            visibleDepth: false //是否被遮挡
          }
        });

        this.graphicLayer.addGraphic(graphic);
        graphic.bindPopup("<div class=\"mars-popup-titile\">\u5750\u6807\u5B9A\u4F4D</div>\n              <div class=\"mars-popup-content\" >\n                <div><label>\u7ECF\u5EA6</label> ".concat(jd, "</div>\n                <div><label>\u7EAC\u5EA6</label>").concat(wd, "</div>\n              </div>"));
        graphic.openHighlight();
        graphic.flyTo({
          radius: 1000,
          //点数据：radius控制视距距离
          scale: 1.5,
          //线面数据：scale控制边界的放大比例
          complete: function complete() {
            graphic.openPopup();
          }
        });
      }

      //===================历史记录相关========================
    }, {
      key: "showHistoryList",
      value: function showHistoryList() {
        var _this6 = this;
        $("#querybar_histroy_view").hide();
        localforage.getItem(this.storageName).then(function (laststorage) {
          if (laststorage == null) {
            return;
          }
          _this6.arrHistory = eval(laststorage);
          if (_this6.arrHistory == null || _this6.arrHistory.length == 0) {
            return;
          }
          var inhtml = "";
          for (var index = _this6.arrHistory.length - 1; index >= 0; index--) {
            var item = _this6.arrHistory[index];
            inhtml += "<li><a href=\"javascript:queryBaiduPOIWidget.autoSearch('" + item + "');\">" + item + "</a></li>";
          }
          // <i class='fa fa-history'/>
          $("#querybar_ul_history").html(inhtml);
          $("#querybar_histroy_view").show();
        });
      }
    }, {
      key: "clearHistory",
      value: function clearHistory() {
        this.arrHistory = [];
        localforage.removeItem(this.storageName);
        $("#querybar_ul_history").html("");
        $("#querybar_histroy_view").hide();
      }

      //记录历史值
    }, {
      key: "addHistory",
      value: function addHistory(data) {
        var _this7 = this;
        this.arrHistory = [];
        localforage.getItem(this.storageName).then(function (laststorage) {
          if (laststorage != null) {
            _this7.arrHistory = eval(laststorage);
          }
          //先删除之前相同记录
          haoutil.array.remove(_this7.arrHistory, data);
          _this7.arrHistory.push(data);
          if (_this7.arrHistory.length > 10) {
            _this7.arrHistory.splice(0, 1);
          }
          localforage.setItem(_this7.storageName, _this7.arrHistory);
        });
      }

      //======================查询非百度poi，联合查询处理=================
      //外部widget是否存在或启用
    }, {
      key: "hasExWidget",
      value: function hasExWidget() {
        if (window["queryBarWidget"] == null) {
          return false;
        } else {
          this.exWidget = window.queryBarWidget;
          return true;
        }
      }
    }, {
      key: "autoExTipList",
      value: function autoExTipList(text) {
        var _this8 = this;
        this.exWidget.autoTipList(text, function () {
          _this8.autoTipList(text, false);
        });
      }
      //调用外部widget进行查询
    }, {
      key: "queryExPOI",
      value: function queryExPOI(text) {
        var _this9 = this;
        var layer = this.graphicLayer;
        this.exWidget.strartQueryPOI(text, layer, function () {
          _this9.strartQueryPOI(text, false);
        });
      }
    }]);
    return MyWidget;
  }(mars3d.widget.BaseWidget); //注册到widget管理器中。
  window.queryBaiduPOIWidget = mars3d.widget.bindClass(MyWidget);

  //每个widet之间都是直接引入到index.html中，会存在彼此命名冲突，所以闭包处理下。
})(window, mars3d);