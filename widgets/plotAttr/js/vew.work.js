/* 2023-8-14 06:54:41 | 版权所有 山维科技 http://www.sunwaysurvey.com.cn */
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/* eslint-disable no-var */
var thisWidget;

//当前页面业务
function initWidgetView(_thisWidget) {
  thisWidget = _thisWidget;

  //清除所有标号
  $("#btnDelete").click(function () {
    thisWidget.deleteEntity();
  });
  $("#btnCenter").click(function (e) {
    thisWidget.centerCurrentEntity();
  });
  $("#btn_plot_savefile").click(function () {
    var data = thisWidget.getGeoJson();
    haoutil.file.downloadFile("标绘item.json", JSON.stringify(data));
  });
  plotEdit.initEvent();
  thisWidget.startEditing();
}
var newAttr = {}; // 解决的问题：在updateAttr捕获到内容改变后，会导致仅保留最后一次更改的属性数据

//属性编辑相关
var plotEdit = {
  hasEditSylte: true,
  initEvent: function initEvent() {
    var that = this;
    if (!this.hasEditSylte) {
      $("#attr_style_view").hide();
    }

    //改变高度 - 高程全部设置为
    $("#plot_latlngs_allheight").bind("input propertychange", function () {
      $("#plot_latlngs_addheight").val("");
      var thisval = Number($(this).val()); //高度（米）
      if (isNaN(thisval)) {
        thisval = 1;
      }
      var latlngs = [];
      $(".plot_latlngs").each(function () {
        if ($(this).attr("data-type") == "height") {
          $(this).val(thisval);
          latlngs.push(thisval);
        } else {
          latlngs.push(Number($(this).val())); //经纬度值
        }
      });

      var arrPoint = [];
      for (var i = 0; i < latlngs.length; i += 3) {
        arrPoint.push([latlngs[i], latlngs[i + 1], latlngs[i + 2]]);
      }
      thisWidget.updatePoints2map(arrPoint);
    });

    //改变高度 - 在地表高程偏移
    $("#plot_latlngs_addheight").bind("input propertychange", function () {
      $("#plot_latlngs_allheight").val("");
      var thisval = Number($(this).val()); //高度（米）
      if (isNaN(thisval)) {
        thisval = 1;
      }
      var latlngs = [];
      $(".plot_latlngs").each(function () {
        if ($(this).attr("data-type") == "height") {
          var oldval = Number($(this).attr("oldvalue"));
          $(this).val(oldval + thisval);
          latlngs.push(oldval + thisval);
        } else {
          latlngs.push(Number($(this).val())); //经纬度值
        }
      });

      var arrPoint = [];
      for (var i = 0; i < latlngs.length; i += 3) {
        arrPoint.push([latlngs[i], latlngs[i + 1], latlngs[i + 2]]);
      }
      thisWidget.updatePoints2map(arrPoint);
    });
  },
  _last_attr: null,
  //选中标号，激活属性面板
  startEditing: function startEditing(attr, latlngs) {
    var _this = this;
    if (!window.styleConfig) {
      return;
    }
    if (attr && attr.attr) {
      attr = _objectSpread(_objectSpread({}, attr), attr.attr);
    }
    this._last_attr = attr;
    var config = window.styleConfig[attr.type] || window.styleConfig[attr.styleType] || {};
    config.style = config.style || {};
    function getViewShow(cfg, styleOptions) {
      if (typeof cfg.show === "function") {
        return cfg.show(styleOptions, attr.style, attr.type);
      }
      return true;
    }
    if (latlngs) {
      this._hasHeight = true;
      if (attr.style.clampToGround) {
        this._hasHeight = false;
      } else if (attr.type == "rectangle" || attr.type == "corridor") {
        this._hasHeight = false;
      }
      this.updateLatlngsHtml(latlngs);
    }
    var arrFun = [];
    var parname, inHtml;
    //==============style==================
    if (this.hasEditSylte) {
      parname = "plot_attr_style_";
      inHtml = "<tr><td class=\"nametd\">\u6240\u5728\u56FE\u5C42\uFF1A</td><td>".concat(thisWidget.getLayerName() || "默认图层", "</td></tr>\n      <tr><td class=\"nametd\">\u6807\u53F7\u7C7B\u578B\uFF1A</td><td>").concat(attr.type, "</td></tr>\n      <tr><td class=\"nametd\">\u6837\u5F0F\u7C7B\u578B\uFF1A</td><td>").concat(config.type || "未配置", "</td></tr>");
      var _loop = function _loop() {
        var _attr$style$attrName;
        var edit = config.style[idx];
        if (!getViewShow(edit, attr.style)) {
          return 1; // continue
        }
        var attrName = edit.name;
        var attrVal = (_attr$style$attrName = attr.style[attrName]) !== null && _attr$style$attrName !== void 0 ? _attr$style$attrName : edit.defval;

        //材质时
        if (edit.name === "materialType") {
          attrVal = _this._materialType_selectd || attrVal;
          var _input = _this.getAttrInput(parname, attrName, attrVal, edit);
          if (_input.fun) {
            arrFun.push({
              parname: parname,
              name: attrName,
              value: attrVal,
              edit: edit,
              fun: _input.fun
            });
          }
          inHtml += '<tr  id="' + parname + "tr_" + attrName + '" > <td class="nametd">' + edit.label + "</td>  <td>" + _input.html + "</td>  </tr>";
          var defStyle; //style.js 材质默认值
          edit.data.forEach(function (m) {
            if (m.value === attrVal) {
              defStyle = m.defval || {};
            }
          });
          var materialOptions = attr.style.materialOptions || {};
          var thisMaterialConfig = window.materialConfig[attrVal.split("-")[0]];
          thisMaterialConfig.forEach(function (maItem) {
            var _ref, _ref2, _materialOptions$maIt;
            if (!getViewShow(maItem, materialOptions)) {
              return;
            }
            var parnamemat = "plot_attr_style_mat";
            // 初始化进入默认值的取值顺序 1. 本身属性 2. style中的属性 3. style.js 材质默认值 4. material.js 的默认值
            materialOptions[maItem.name] = (_ref = (_ref2 = (_materialOptions$maIt = materialOptions[maItem.name]) !== null && _materialOptions$maIt !== void 0 ? _materialOptions$maIt : attr.style[maItem.name]) !== null && _ref2 !== void 0 ? _ref2 : defStyle[maItem.name]) !== null && _ref !== void 0 ? _ref : maItem.defval;
            var input = _this.getAttrInput(parnamemat, maItem.name, materialOptions[maItem.name], maItem);
            if (input.fun) {
              arrFun.push({
                parname: parnamemat,
                name: maItem.name,
                value: materialOptions[maItem.name],
                edit: maItem,
                fun: input.fun
              });
            }
            inHtml += '<tr  id="' + parnamemat + "tr_" + maItem.name + '" > <td class="nametd">' + maItem.label + "</td>  <td>" + input.html + "</td>  </tr>";
          });
        } else {
          var _input2 = _this.getAttrInput(parname, attrName, attrVal, edit);
          if (_input2.fun) {
            arrFun.push({
              parname: parname,
              name: attrName,
              value: attrVal,
              edit: edit,
              fun: _input2.fun
            });
          }
          inHtml += '<tr  id="' + parname + "tr_" + attrName + '" > <td class="nametd">' + edit.label + "</td>  <td>" + _input2.html + "</td>  </tr>";
        }
      };
      for (var idx = 0; idx < config.style.length; idx++) {
        if (_loop()) continue;
      }
      $("#talbe_style").html(inHtml);

      //注记属性
      if (attr.style.label) {
        var configLbl = window.styleConfig["label"] || {};
        parname = "plot_attr_stylelabel_";
        inHtml = "";
        for (var _idx = 0; _idx < configLbl.style.length; _idx++) {
          var _attr$style$label$att;
          var edit = configLbl.style[_idx];
          if (!getViewShow(edit, attr.style.label)) {
            continue;
          }
          var attrName = edit.name;
          var attrVal = (_attr$style$label$att = attr.style.label[attrName]) !== null && _attr$style$label$att !== void 0 ? _attr$style$label$att : edit.defval;
          attr.style.label[attrName] = attrVal;
          var input = this.getAttrInput(parname, attrName, attrVal, edit);
          if (input.fun) {
            arrFun.push({
              parname: parname,
              name: attrName,
              value: attrVal,
              edit: edit,
              fun: input.fun
            });
          }
          inHtml += '<tr  id="' + parname + "tr_" + attrName + '" > <td class="nametd">' + edit.label + "</td>  <td>" + input.html + "</td>  </tr>";
        }
        $("#talbe_stylelabel").html(inHtml);
        $("#attr_stylelabel_view").show();
      } else {
        $("#attr_stylelabel_view").hide();
      }
    }
    //==============attr==================
    parname = "plot_attr_attr_";
    inHtml = "";
    attr.attr = attr.attr || {};
    var attrcfg = thisWidget.getAttrList();
    var tempKyes = {};
    for (var _idx2 = 0; _idx2 < attrcfg.length; _idx2++) {
      var _edit = attrcfg[_idx2];
      tempKyes[_edit.name] = true;
    }
    for (var key in attr.attr) {
      var _attrVal = attr.attr[key];
      if (tempKyes[key]) {
        continue;
      }
      if (haoutil.isutil.isString(_attrVal)) {
        attrcfg.push({
          name: key,
          label: key,
          type: "text",
          defval: ""
        });
      } else if (haoutil.isutil.isNumber(_attrVal)) {
        attrcfg.push({
          name: key,
          label: key,
          type: "number",
          defval: 0.0
        });
      } else if (typeof _attrVal === "boolean") {
        attrcfg.push({
          name: key,
          label: key,
          type: "radio",
          defval: false
        });
      }
    }
    for (var _idx3 = 0; _idx3 < attrcfg.length; _idx3++) {
      var _ref3, _attr$attr$_attrName;
      var _edit2 = attrcfg[_idx3];
      if (_edit2.type == "hidden") {
        continue;
      }
      var _attrName = _edit2.name;
      var _attrVal2 = (_ref3 = (_attr$attr$_attrName = attr.attr[_attrName]) !== null && _attr$attr$_attrName !== void 0 ? _attr$attr$_attrName : _edit2.defval) !== null && _ref3 !== void 0 ? _ref3 : "";
      var _input3 = this.getAttrInput(parname, _attrName, _attrVal2, _edit2);
      if (_input3.fun) {
        arrFun.push({
          parname: parname,
          name: _attrName,
          value: _attrVal2,
          edit: _edit2,
          fun: _input3.fun
        });
      }
      inHtml += '<tr  id="' + parname + "tr_" + _attrName + '" > <td class="nametd">' + _edit2.label + "</td>  <td>" + _input3.html + "</td>  </tr>";
    }
    $("#talbe_attr").html(inHtml);

    //执行各方法
    for (var _idx4 = 0; _idx4 < arrFun.length; _idx4++) {
      var item = arrFun[_idx4];
      item.fun(item.parname, item.name, item.value, item.edit);
    }
    window.tab2attr(); //切换面板
  },

  updateLatlngsHtml: function updateLatlngsHtml(latlngs) {
    $("#plot_latlngs_addheight").val("");
    $("#plot_latlngs_allheight").val("");
    $("#view_updateheight").hide();

    //显示坐标信息
    var inHtml = "";
    if (!latlngs || latlngs.length == 0) {
      //
    } else if (latlngs.length == 1) {
      var latlng = latlngs[0];
      var jd = latlng[0];
      var wd = latlng[1];
      var height = latlng.length == 3 ? latlng[2] : 0;
      inHtml += ' <div class="mp_attr" style=" margin-top: 10px;"><table>' + ' <tr> <td class="nametd">经度：</td> <td><input type="number" class="mp_input plot_latlngs" data-type="jd" step="0.000001"  value="' + jd + '"></td></tr>' + '<tr>  <td class="nametd">纬度：</td> <td><input type="number" class="mp_input plot_latlngs" data-type="wd" step="0.000001"  value="' + wd + '"></td></tr>';
      if (this._hasHeight) {
        inHtml += '<tr><td class="nametd">高程：</td> <td><input type="number" class="mp_input plot_latlngs" data-type="height" step="0.1" value="' + height + '" oldvalue="' + height + '"></td></tr>';
      }
      inHtml += " </table> </div>";
    } else {
      if (this._hasHeight) {
        $("#view_updateheight").show();
      }
      var delhtml = "";
      if (latlngs.length > thisWidget.getMinPointNum()) {
        delhtml = '<i class="fa fa-trash-o latlng-del" title="删除点" ></i>';
      }
      for (var idx = 0; idx < latlngs.length; idx++) {
        var _latlng = latlngs[idx];
        var _jd = _latlng[0];
        var _wd = _latlng[1];
        var _height = _latlng.length == 3 ? _latlng[2] : 0;
        var addthml = "";
        if (latlngs.length < thisWidget.getMaxPointNum()) {
          addthml = '<i class="fa  fa-plus-square-o latlng-install" title="插入点" data-index="' + idx + '" ></i>&nbsp;&nbsp;';
        }

        //
        inHtml += '<div><div class="open"><i class="tree_icon">-</i>第' + (idx + 1) + '点 <label style="width:100px;">&nbsp;</label>    ' + addthml + delhtml + ' </div><div class="mp_attr"><table>' + '<tr> <td class="nametd">经度：</td> <td><input  type="number" class="mp_input plot_latlngs" data-type="jd"  step="0.000001" data-index="' + idx + '" value="' + _jd + '"></td>  </tr> ' + '<tr>  <td class="nametd">纬度：</td> <td><input  type="number" class="mp_input plot_latlngs" data-type="wd"  step="0.000001" data-index="' + idx + '" value="' + _wd + '"></td> </tr> ';
        if (this._hasHeight) {
          inHtml += '<tr>  <td class="nametd">高程：</td> <td><input  type="number" step="0.1" class="mp_input plot_latlngs" data-type="height" data-index="' + idx + '" value="' + _height + '" oldvalue="' + _height + '"></td> </tr> ';
        }
        inHtml += " </table> </div> </div>";
      }
    }
    $("#view_latlngs").html(inHtml);
    $("#view_latlngs .open").click(window.changeOpenShowHide);
    var that = this;
    $("#view_latlngs .latlng-del").click(function () {
      $(this).parent().parent().remove();
      var latlngs = [];
      var withHeight = false;
      $(".plot_latlngs").each(function () {
        latlngs.push(Number($(this).val()));
        if ($(this).attr("data-type") === "height") {
          withHeight = true;
        }
      });

      //重新修改界面
      var arr = [];
      if (withHeight) {
        for (var i = 0; i < latlngs.length; i += 3) {
          arr.push([latlngs[i], latlngs[i + 1], latlngs[i + 2]]);
        }
      } else {
        for (var _i = 0; _i < latlngs.length; _i += 2) {
          arr.push([latlngs[_i], latlngs[_i + 1]]);
        }
      }
      that.updateLatlngsHtml(arr);
      thisWidget.updatePoints2map(arr);
    });
    $("#view_latlngs .latlng-install").click(function () {
      var idx = Number($(this).attr("data-index"));
      var latlngs = [];
      var withHeight = false;
      $(".plot_latlngs").each(function () {
        latlngs.push(Number($(this).val() || 0));
        if ($(this).attr("data-type") === "height") {
          withHeight = true;
        }
      });

      //重新修改界面
      var arr = [];
      if (withHeight) {
        for (var i = 0; i < latlngs.length; i += 3) {
          arr.push([latlngs[i], latlngs[i + 1], latlngs[i + 2]]);
        }
      } else {
        for (var _i2 = 0; _i2 < latlngs.length; _i2 += 2) {
          arr.push([latlngs[_i2], latlngs[_i2 + 1]]);
        }
      }
      var pt1 = arr[idx];
      var pt2 = idx == arr.length - 1 ? arr[0] : arr[idx + 1];
      var jd = Number(((pt1[0] + pt2[0]) / 2).toFixed(6));
      var wd = Number(((pt1[1] + pt2[1]) / 2).toFixed(6));
      if (withHeight) {
        var gd = Number(((pt1[2] + pt2[2]) / 2).toFixed(1));
        arr.splice(idx + 1, 0, [jd, wd, gd]);
      } else {
        arr.splice(idx + 1, 0, [jd, wd]);
      }
      that.updateLatlngsHtml(arr);
      thisWidget.updatePoints2map(arr);
    });
    $(".plot_latlngs").bind("input propertychange", function () {
      var latlngs = [];
      var withHeight = false;
      $(".plot_latlngs").each(function () {
        latlngs.push(Number($(this).val()));
        if ($(this).attr("data-type") === "height") {
          withHeight = true;
        }
      });
      var arrPoint = [];
      if (withHeight) {
        for (var i = 0; i < latlngs.length; i += 3) {
          arrPoint.push([latlngs[i], latlngs[i + 1], latlngs[i + 2]]);
        }
      } else {
        for (var _i3 = 0; _i3 < latlngs.length; _i3 += 2) {
          arrPoint.push([latlngs[_i3], latlngs[_i3 + 1]]);
        }
      }
      thisWidget.updatePoints2map(arrPoint);
    });
  },
  // //单击地图空白，释放属性面板
  // stopEditing: function () {
  //     $("#talbe_style").html('');
  //     $("#talbe_attr").html('');
  //     this._last_attr = null;
  // },
  //获取各属性的编辑html和change方法
  getAttrInput: function getAttrInput(parname, attrName, attrVal, edit) {
    if (attrVal == null || attrVal == undefined) {
      attrVal = "";
    }
    var that = this;
    var inHtml = "";
    var fun = null;
    switch (edit.type) {
      default:
      case "label":
        inHtml = attrVal;
        break;
      case "text":
        inHtml = '<input id="' + parname + attrName + '" type="text" value="' + attrVal + '"    class="mp_input" />';
        fun = function fun(parname, attrName, attrVal, edit) {
          $("#" + parname + attrName).on("input propertychange", function (e) {
            var attrVal = $(this).val();
            that.updateAttr(parname, attrName, attrVal, edit);
          });
        };
        break;
      case "textarea":
        attrVal = attrVal.replace(new RegExp("<br />", "gm"), "\n");
        inHtml = '<textarea  id="' + parname + attrName + '"     class="mp_input" style="height:50px;resize: none;" >' + attrVal + "</textarea>";
        fun = function fun(parname, attrName, attrVal, edit) {
          $("#" + parname + attrName).on("input propertychange", function (e) {
            var attrVal = $(this).val();
            if (attrVal.length == 0) {
              attrVal = "";
            }
            attrVal = attrVal.replace(/\n/g, "<br />");
            that.updateAttr(parname, attrName, attrVal, edit);
          });
        };
        break;
      case "number":
        inHtml = '<input id="' + parname + attrName + '" type="number" value="' + (attrVal || 0) + '"    class="mp_input"/>';
        fun = function fun(parname, attrName, attrVal, edit) {
          $("#" + parname + attrName).on("input propertychange", function (e) {
            var attrVal = Number($(this).val());
            that.updateAttr(parname, attrName, attrVal, edit);
          });
        };
        break;
      case "slider":
        if (edit.max !== 1) {
          //同"number"
          inHtml = '<input id="' + parname + attrName + '" type="number" value="' + (attrVal || 0) + '"    class="mp_input"/>';
          fun = function fun(parname, attrName, attrVal, edit) {
            $("#" + parname + attrName).on("input propertychange", function (e) {
              var attrVal = Number($(this).val());
              that.updateAttr(parname, attrName, attrVal, edit);
            });
          };
        } else {
          inHtml = '<input id="' + parname + attrName + '"  type="text" value="' + attrVal * 100 + '"   data-value="' + attrVal + '" />';
          fun = function fun(parname, attrName, attrVal, edit) {
            var _width = $(".mp_tab_card").width() * 0.6 - 30;
            $("#" + parname + attrName).progress(_width); //绑定样式
            $("#" + parname + attrName).change(function () {
              var attrVal = Number($(this).val()) / 100;
              that.updateAttr(parname, attrName, attrVal, edit);
            });
          };
        }
        break;
      case "combobox":
        inHtml = '<select id="' + parname + attrName + '" class="mp_select"    data-value="' + attrVal + '" >';
        for (var jj = 0; jj < edit.data.length; jj++) {
          var temp = edit.data[jj];
          inHtml += '<option value="' + temp.value + '">' + temp.label + "</option>";
        }
        inHtml += "</select>";
        fun = function fun(parname, attrName, attrVal, edit) {
          $("#" + parname + attrName).select(); //绑定样式
          $("#" + parname + attrName).change(function () {
            var attrVal = $(this).attr("data-value");
            var thisSel;
            for (var _jj = 0; _jj < edit.data.length; _jj++) {
              var _temp = edit.data[_jj];
              if (_temp.impact == null) {
                continue;
              }
              if (_temp.value === attrVal) {
                thisSel = _temp;
                continue;
              }
              that.changeViewByAttr(parname, _temp.impact, false);
            }
            if (thisSel) {
              that.changeViewByAttr(parname, thisSel.impact, true);
            }
            if (edit.valType == "number") {
              attrVal = Number(attrVal);
            }
            that.updateAttr(parname, attrName, attrVal, edit);
          });
          var thisSel;
          for (var _jj2 = 0; _jj2 < edit.data.length; _jj2++) {
            var _temp2 = edit.data[_jj2];
            if (_temp2.impact == null) {
              continue;
            }
            if (_temp2.value === attrVal) {
              thisSel = _temp2;
              continue;
            }
            that.changeViewByAttr(parname, _temp2.impact, false);
          }
          if (thisSel) {
            that.changeViewByAttr(parname, thisSel.impact, true);
          }
        };
        break;
      case "radio":
        {
          var _name_key = parname + attrName;
          inHtml = "<div class=\"radio radio-info radio-inline\" id=\"".concat(_name_key, "\"  data-value=\"").concat(attrVal, "\" >\n            <input type=\"radio\" id=\"").concat(_name_key, "_1\" value=\"1\"  name=\"").concat(_name_key, "\" ").concat(attrVal ? 'checked="checked"' : "", ">\n            <label for=\"").concat(_name_key, "_1\"> \u662F</label>\n          </div>\n          <div class=\"radio radio-info radio-inline\">\n            <input type=\"radio\" id=\"").concat(_name_key, "_0\" value=\"0\" name=\"").concat(_name_key, "\" ").concat(attrVal ? "" : 'checked="checked"', "\">\n            <label for=\"").concat(_name_key, "_0\"> \u5426 </label>\n          </div>");
          fun = function fun(parname, attrName, attrVal, edit) {
            $('input:radio[name="' + parname + attrName + '"]').change(function () {
              var attrVal = $(this).val() == "1";
              var isOK = that.updateAttr(parname, attrName, attrVal, edit);
              if (isOK) {
                that.changeViewByAttr(parname, edit.impact, attrVal);
              }
            });
            that.changeViewByAttr(parname, edit.impact, attrVal);
          };
        }
        break;
      case "color":
        inHtml = '<input id="' + parname + attrName + '"  class="mp_input" style="width: 100%;"  value="' + attrVal + '" />';
        fun = function fun(parname, attrName, attrVal, edit) {
          $("#" + parname + attrName).minicolors({
            position: "bottom right",
            control: "saturation",
            change: function change(hex, opacity) {
              that.updateAttr(parname, attrName, hex, edit);
            }
          });
        };
        break;
      case "window":
        inHtml = '<input id="' + parname + attrName + '" type="text" value="' + attrVal + '" readonly   class="mp_input" />';
        fun = function fun(parname, attrName, attrVal, edit) {
          $("#" + parname + attrName).on("click", function (e) {
            thisWidget.showEditAttrWindow({
              data: that._last_attr,
              parname: parname,
              attrName: attrName,
              attrVal: attrVal
            });
          });
          $("#" + parname + attrName).on("input propertychange", function (e) {
            var attrVal = $(this).val();
            that.updateAttr(parname, attrName, attrVal, edit);
          });
        };
        break;
    }
    return {
      html: inHtml,
      fun: fun
    };
  },
  //联动属性控制
  changeViewByAttr: function changeViewByAttr(parname, arrimpact, show) {
    if (arrimpact && arrimpact.length > 0) {
      for (var jj = 0; jj < arrimpact.length; jj++) {
        var attrName = arrimpact[jj];
        if (show) {
          $("#" + parname + "tr_" + attrName).show();
          var attrVal = $("#" + parname + attrName).attr("data-value");
          if (!attrVal) {
            attrVal = $("#" + parname + attrName).val();
          }
          // if (attrVal !== null && attrVal !== undefined) {
          //   this._last_attr.style[attrName] = attrVal;
          // }
        } else {
          // delete this._last_attr.style[attrName];
          $("#" + parname + "tr_" + attrName).hide();
        }
      }
    }
  },
  //属性面板值修改后触发此方法
  updateAttr: function updateAttr(parname, attrName, attrVal, edit) {
    switch (parname) {
      default:
        break;
      case "plot_attr_style_":
        {
          var newStyle = {};
          newStyle[attrName] = attrVal;
          this._last_attr.style[attrName] = attrVal;
          var type = this._last_attr.styleType || this._last_attr.type;
          if ((attrName == "fill" || attrName == "outline") && attrVal === false && (type == "plane" || type == "circle" || type == "ellipse" || type == "cylinder" || type == "ellipsoid" || type == "box" || type == "polylineVolume" || type == "wall" || type == "corridor" || type == "rectangle" || type == "polygon")) {
            var _this$_last_attr$styl;
            if (!((_this$_last_attr$styl = this._last_attr.style["fill"]) !== null && _this$_last_attr$styl !== void 0 ? _this$_last_attr$styl : true) && !this._last_attr.style["outline"]) {
              this._last_attr.style[attrName] = true;
              $("input[name='" + parname + attrName + "']:eq(0)").attr("checked", "checked");
              $("input[name='" + parname + attrName + "']:eq(0)").click();
              haoutil.msg("填充和边框不能同时为否，需要至少开启一个！");
              return false;
            }
          }

          // 材质类型 materialType 改变时的特殊处理
          if (attrName === "materialType") {
            newStyle.materialOptions = {};
            var defStyle; //style.js 材质默认值
            edit.data.forEach(function (m) {
              if (m.value === attrVal) {
                defStyle = m.defval || {};
              }
            });
            this._materialType_selectd = attrVal;
            attrVal = attrVal.split("-")[0];
            window.materialConfig[attrVal].forEach(function (p) {
              var _defStyle$p$name;
              // 更新时的默认值的取值顺序 1. style.js 材质默认值 2. material.json 的默认值
              newStyle.materialOptions[p.name] = (_defStyle$p$name = defStyle[p.name]) !== null && _defStyle$p$name !== void 0 ? _defStyle$p$name : p.defval;
            });
            this._last_attr.style.materialOptions = newStyle.materialOptions;
            newStyle[attrName] = attrVal;
            this._last_attr.style[attrName] = attrVal;
            this.startEditing(this._last_attr);
          } else if (edit.type == "radio") {
            this.startEditing(this._last_attr);
          }
          thisWidget.updateStyle2map(newStyle);
          break;
        }
      case "plot_attr_style_mat":
        {
          var _newStyle = {};
          _newStyle[attrName] = attrVal;
          this._last_attr.style.materialOptions = this._last_attr.style.materialOptions || {};
          this._last_attr.style.materialOptions[attrName] = attrVal;
          this.startEditing(this._last_attr);
          thisWidget.updateStyle2map({
            materialOptions: _newStyle
          });
          break;
        }
      case "plot_attr_stylelabel_":
        {
          var _newStyle2 = {};
          _newStyle2[attrName] = attrVal;
          this._last_attr.style.label = this._last_attr.style.label || {};
          this._last_attr.style.label[attrName] = attrVal;
          if (edit.type == "radio") {
            this.startEditing(this._last_attr);
          }
          thisWidget.updateStyle2map({
            label: _newStyle2
          });
          break;
        }
      case "plot_attr_attr_":
        {
          this._last_attr.attr[attrName] = attrVal;
          newAttr[attrName] = attrVal;
          thisWidget.updateAttr2map(newAttr);
          break;
        }
    }
    return true;
  }
};