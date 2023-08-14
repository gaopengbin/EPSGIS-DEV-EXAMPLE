/* 2023-8-14 08:03:58 | 版权所有 山维科技 http://www.sunwaysurvey.com.cn */
function initTable() {
  $("#showEditor").hide();
  $("#show").change(function () {
    var val = $(this).is(":checked");
    thisLayer.show = val;
  });

  // 亮度
  $("#brightness").slider({
    min: 0,
    max: 3,
    step: 0.01,
    value: 1
  }).on("change", function (e) {
    //修改步长
    if (e && e.value) {
      setLayerOptions("brightness", e.value.newValue);
    }
  });
  // 对比度
  $("#contrast").slider({
    min: 0,
    max: 3,
    step: 0.01,
    value: 1
  }).on("change", function (e) {
    //修改步长
    if (e && e.value) {
      setLayerOptions("contrast", e.value.newValue);
    }
  });
  // 色彩
  $("#hue").slider({
    min: 0,
    max: 3,
    step: 0.01,
    value: 0.1
  }).on("change", function (e) {
    //修改步长
    if (e && e.value) {
      setLayerOptions("hue", e.value.newValue);
    }
  });
  // 饱和度
  $("#saturation").slider({
    min: 0,
    max: 3,
    step: 0.01,
    value: 1
  }).on("change", function (e) {
    //修改步长
    if (e && e.value) {
      setLayerOptions("saturation", e.value.newValue);
    }
  });
  // 饱和度
  $("#gamma").slider({
    min: 0,
    max: 3,
    step: 0.01,
    value: 0.2
  }).on("change", function (e) {
    //修改步长
    if (e && e.value) {
      setLayerOptions("gamma", e.value.newValue);
    }
  });
  // 透明度
  $("#opacity").slider({
    min: 0,
    max: 1,
    step: 0.01,
    value: 1
  }).on("change", function (e) {
    //修改步长
    if (e && e.value) {
      setLayerOptions("opacity", e.value.newValue);
    }
  });
  var layers = map.getLayers();
  for (var i = layers.length - 1; i >= 0; i--) {
    var layer = layers[i];
    if (layer.isPrivate) {
      continue;
    }
    tileLayerList.push({
      key: layer,
      name: "".concat(layer.type, " - ").concat(layer.name || "未命名"),
      isTile: layer.isTile
    });
  }
  selectedFirst();
  addTable();
  if (tileLayerList.lenght) {
    $("#showEditor").show();
  }

  // 添加新的图层，数组中也添加数据
  map.on(mars3d.EventType.addLayer, function (event) {
    var layer = event.layer;
    thisLayer = event.layer;
    if (layer.isPrivate || layer.name === "POI查询") {
      return;
    }
    tileLayerList.push({
      key: layer,
      name: "".concat(layer.type, " - ").concat(layer.name || "未命名"),
      isTile: layer.isTile
    });
    selectedFirst();
    addTable();
  });

  // 删除图层
  map.on(mars3d.EventType.removeLayer, function (event) {
    var layerId = event.layer;
    var idx = tileLayerList.findIndex(function (item) {
      return item.key === layerId;
    });
    tileLayerList.splice(idx, 1);
    addTable();
    if (thisLayer === layerId) {
      thisLayer = null;
    }
    $("#layerName").html(""); // 隐藏编辑面板
    $("#showEditor").hide();
  });
}
function selectedFirst() {
  setTimeout(function () {
    // 选中第一个
    if (tileLayerList.length === 1) {
      var layer = tileLayerList[0];
      if (!layer.isTile) {
        return;
      }
      $("#layerName").html(layer.name); // 获取到的对应图层的信息
      $("#showEditor").show();
      thisLayer = map.getLayerById(layer.key.id);
      $("#show").attr("checked", thisLayer);
    }
  }, 50);
}
function setLayerOptions(attribute, val) {
  if (thisLayer) {
    thisLayer[attribute] = val;
  }
}

// 表格添加一行记录 item - 数据
function addTable() {
  // 增加tr和td表格
  var tbody = document.getElementById("tbPoly");
  tbody.innerHTML = "";
  tileLayerList.forEach(function (item) {
    var tr = document.createElement("tr");
    tr.innerHTML = "\n            <tr>\n              <td>".concat(item.name, "</td>\n              <td>\n                <a class=\"flyTo\" href=\"javascript:void(0)\" title=\"\u98DE\u884C\u5B9A\u4F4D\"><i class=\"fa fa-send-o\"></i></a>&nbsp;&nbsp;\n                <a class=\"remove\" href=\"javascript:void(0)\" title=\"\u5220\u9664\u533A\u57DF\"><i class=\"fa fa-trash\"></i></a>\n              </td>\n            </tr>");
    tbody.appendChild(tr);

    //绑定单击事件 定位
    tr.querySelector(".flyTo").addEventListener("click", function (e) {
      var layer = map.getLayerById(item.key.uuid);
      if (layer) {
        layer.flyTo();
      }
    });

    // 删除压平数据和压平线
    tr.querySelector(".remove").addEventListener("click", function (e) {
      var layer = map.getLayerById(item.key.uuid);
      if (layer) {
        layer.remove(true);
        // formState.layerName = "" // 隐藏编辑面板
      }
    });
  });
}