/* 2023-8-14 06:23:05 | 版权所有 山维科技 http://www.sunwaysurvey.com.cn */
"use script";

//开发环境建议开启严格模式

//对应widget.js中MyWidget实例化后的对象
var thisWidget;
var layers = [];
var layersObj = {};

//当前页面业务
function initWidgetView(_thisWidget) {
  thisWidget = _thisWidget;

  //右键
  bindRightMenuEvnet();

  //初始化树
  var setting = {
    check: {
      enable: true
    },
    data: {
      simpleData: {
        enable: true
      }
    },
    callback: {
      onCheck: treeOverlays_onCheck,
      onRightClick: treeOverlays_OnRightClick,
      onDblClick: treeOverlays_onDblClick,
      onClick: treeOverlays_onClick
    },
    view: {
      addDiyDom: addOpacityRangeDom
    }
  };
  var zNodes = [];
  layers = thisWidget.getLayers();
  for (var i = layers.length - 1; i >= 0; i--) {
    var node = _getNodeConfig(layers[i]);
    if (node) {
      zNodes.push(node);
    }
  }
  $.fn.zTree.init($("#treeOverlays"), setting, zNodes);
}
function _getNodeConfig(layer) {
  if (layer == null || !layer.options || layer.isPrivate) {
    return;
  }
  var item = layer.options;
  if (!item.name || item.name == "未命名") {
    console.log("未命名图层不加入图层管理", layer);
    return;
  }
  var node = {
    id: layer.id,
    pId: layer.pid,
    name: layer.name,
    checked: layer.isAdded && layer.show
  };
  if (layer.hasEmptyGroup) {
    //空数组
    node.icon = "img/folder.png";
    node.open = item.open == null ? true : item.open;
  } else if (layer.hasChildLayer) {
    //有子节点的数组
    node.icon = "img/layerGroup.png";
    node.open = item.open == null ? true : item.open;
  } else {
    node.icon = "img/layer.png";
    if (layer.parent) {
      node._parentId = layer.parent.id;
    }
  }
  //记录图层
  layersObj[node.id] = layer;
  return node;
}
function addNode(item) {
  var treeObj = $.fn.zTree.getZTreeObj("treeOverlays");
  var parentNode;
  if (item.pid && item.pid != -1) {
    parentNode = treeObj.getNodeByParam("id", item.pid, null);
  }
  var node = _getNodeConfig(item);
  if (!node) {
    return;
  }
  treeObj.addNodes(parentNode, 0, [node], true);

  //更新子节点图层
  if (item.hasChildLayer) {
    item.eachLayer(function (childLayer) {
      removeNode(childLayer);
      addNode(childLayer);
    });
  }
}
function removeNode(layer) {
  var treeObj = $.fn.zTree.getZTreeObj("treeOverlays");
  var node = treeObj.getNodeByParam("id", layer.id, null);
  if (node) {
    treeObj.removeNode(node);
  }
}
function updateNode(layer) {
  var treeObj = $.fn.zTree.getZTreeObj("treeOverlays");
  var node = treeObj.getNodeByParam("id", layer.id, null);
  var show = layer.isAdded && layer.show;
  if (node) {
    //更新node
    if (node.checked == show) {
      return;
    }
    node.checkedOld = node.checked;
    node.checked = show;
    treeObj.updateNode(node);
  } else {
    addNode(layer, show);
  }
}

//===================================双击定位图层====================================
function treeOverlays_onClick(e, treeId, treeNode, clickFlag) {
  // if (treeNode == null || treeNode.id == null) {
  //   return
  // }
  // var layer = layersObj[treeNode.id]
  // if (layer) {
  //   thisWidget.checkClickLayer(layer, treeNode.checked)
  // }
}
function treeOverlays_onDblClick(event, treeId, treeNode) {
  if (treeNode == null || treeNode.id == null) {
    return;
  }
  var layer = layersObj[treeNode.id];
  if (layer && layer.show) {
    layer.flyTo();
  }
}

//===================================勾选显示隐藏图层====================================
function removeArrayItem(arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == val) {
      arr.splice(i, 1);
      return true;
    }
  }
  return false;
}
function treeOverlays_onCheck(e, treeId, chktreeNode) {
  var treeObj = $.fn.zTree.getZTreeObj(treeId);
  //获得所有改变check状态的节点
  var changedNodes = treeObj.getChangeCheckedNodes();
  removeArrayItem(changedNodes, chktreeNode);
  changedNodes.push(chktreeNode);
  for (var i = 0; i < changedNodes.length; i++) {
    var treeNode = changedNodes[i];
    treeNode.checkedOld = treeNode.checked;
    if (treeNode.check_Child_State == 1) {
      // 0:无子节点被勾选,  1:部分子节点被勾选,  2:全部子节点被勾选, -1:不存在子节点 或 子节点全部设置为 nocheck = true
      continue;
    }
    var layer = layersObj[treeNode.id];
    if (layer == null) {
      continue;
    }

    //显示隐藏透明度设置view
    if (treeNode.checked) {
      $("#slider" + treeNode.tId).css("display", "");
    } else {
      $("#slider" + treeNode.tId).css("display", "none");
    }

    //特殊处理同目录下的单选的互斥的节点，可在config对应图层节点中配置"radio":true即可
    if (layer.options.radio && treeNode.checked) {
      var nodes = treeObj.getNodesByFilter(function (node) {
        var item = layersObj[node.id];
        return item.options.radio && item.pid == layer.pid && node.id != treeNode.id;
      }, false, treeNode.getParentNode());
      for (var nidx = 0; nidx < nodes.length; nidx++) {
        nodes[nidx].checkedOld = false;
        treeObj.checkNode(nodes[nidx], false, true);
        $("#" + nodes[nidx].tId + "_range").hide();
        var layertmp = layersObj[nodes[nidx].id];
        layertmp.show = false;
      }
    }

    //处理图层显示隐藏
    thisWidget.updateLayerShow(layer, treeNode.checked);
  }
  var layerThis = layersObj[chktreeNode.id];
  if (layerThis) {
    thisWidget.checkClickLayer(layerThis, chktreeNode.checked);
  }
}

//===================================透明度设置====================================

//在节点后添加自定义控件
function addOpacityRangeDom(treeId, tNode) {
  //if (tNode.icon == "images/folder.png") return;

  var layer = layersObj[tNode.id];
  if (!layer || !layer.hasOpacity) {
    return;
  }
  var view = $("#" + tNode.tId);
  var silder = '<input id="' + tNode.tId + '_range" style="display:none" />';
  view.append(silder);
  $("#" + tNode.tId + "_range").slider({
    id: "slider" + tNode.tId,
    min: 0,
    max: 100,
    step: 1,
    value: (layer.opacity || 1) * 100
  }).on("change", function (e) {
    var opacity = e.value.newValue / 100;
    var layer = layersObj[tNode.id];
    //设置图层的透明度
    // thisWidget.udpateLayerOpacity(layer, opacity)
    layer.opacity = opacity;
  });
  if (!tNode.checked) {
    $("#slider" + tNode.tId).css("display", "none");
  }
}

//===================================右键菜单====================================
var lastRightClickTreeId;
var lastRightClickTreeNode;
function treeOverlays_OnRightClick(event, treeId, treeNode) {
  if (treeNode == null) {
    return;
  }
  var layer = layersObj[treeNode.id];
  if (!layer || !layer.hasZIndex) {
    return;
  }

  //右击时的节点
  lastRightClickTreeId = treeId;
  lastRightClickTreeNode = treeNode;
  var top = event.clientY;
  var left = event.clientX;
  var maxtop = document.body.offsetHeight - 100;
  var maxleft = document.body.offsetWidth - 100;
  if (top > maxtop) {
    top = maxtop;
  }
  if (left > maxleft) {
    left = maxleft;
  }
  $("#content_layer_manager_rMenu").css({
    top: top + "px",
    left: left + "px"
  }).show();
  $("body").bind("mousedown", onBodyMouseDown);
}
function onBodyMouseDown(event) {
  if (!(event.target.id == "content_layer_manager_rMenu" || $(event.target).parents("#content_layer_manager_rMenu").length > 0)) {
    hideRMenu();
  }
}
function hideRMenu() {
  $("body").unbind("mousedown", onBodyMouseDown);
  $("#content_layer_manager_rMenu").hide();
}
function bindRightMenuEvnet() {
  $("#content_layer_manager_rMenu li").on("click", function () {
    hideRMenu();
    var type = $(this).attr("data-type");
    moveNodeAndLayer(type);
  });
}

//移动节点及图层位置
function moveNodeAndLayer(type) {
  var treeObj = $.fn.zTree.getZTreeObj(lastRightClickTreeId);

  //获得当前节点的所有同级节点
  var childNodes;
  var parent = lastRightClickTreeNode.getParentNode();
  if (parent == null) {
    childNodes = treeObj.getNodes();
  } else {
    childNodes = parent.children;
  }
  var thisNode = lastRightClickTreeNode;
  var thisLayer = layersObj[thisNode.id];
  switch (type) {
    default:
      break;
    case "up":
      //图层上移一层
      {
        var moveNode = thisNode.getPreNode();
        if (moveNode) {
          treeObj.moveNode(moveNode, thisNode, "prev");
          var moveLayer = layersObj[moveNode.id];
          exchangeLayer(thisLayer, moveLayer);
        }
      }
      break;
    case "top":
      //图层置于顶层
      {
        if (thisNode.getIndex() == 0) {
          return;
        }
        while (thisNode.getIndex() > 0) {
          //冒泡交换
          var _moveNode = thisNode.getPreNode();
          if (_moveNode) {
            treeObj.moveNode(_moveNode, thisNode, "prev");
            var _moveLayer = layersObj[_moveNode.id];
            exchangeLayer(thisLayer, _moveLayer);
          }
        }
      }
      break;
    case "down":
      //图层下移一层
      {
        var _moveNode2 = thisNode.getNextNode();
        if (_moveNode2) {
          treeObj.moveNode(_moveNode2, thisNode, "next");
          var _moveLayer2 = layersObj[_moveNode2.id];
          exchangeLayer(thisLayer, _moveLayer2);
        }
      }
      break;
    case "bottom":
      //图层置于底层
      {
        if (thisNode.getIndex() == childNodes.length - 1) {
          return;
        }
        while (thisNode.getIndex() < childNodes.length - 1) {
          //冒泡交换
          var _moveNode3 = thisNode.getNextNode();
          if (_moveNode3) {
            treeObj.moveNode(_moveNode3, thisNode, "next");
            var _moveLayer3 = layersObj[_moveNode3.id];
            exchangeLayer(thisLayer, _moveLayer3);
          }
        }
      }
      break;
  }

  //按order重新排序
  layers.sort(function (a, b) {
    return a.zIndex - b.zIndex;
  });
}

/**
 * 交换相邻的图层 ： layer1 待移动图层 ，layer2 移动目标图层
 */
function exchangeLayer(layer1, layer2) {
  if (layer1 == null || layer2 == null) {
    return;
  }
  var or = layer1.zIndex;
  layer1.zIndex = layer2.zIndex; //向上移动
  layer2.zIndex = or; //向下移动

  console.log("".concat(layer1.name, ":").concat(layer1.zIndex, ",  ").concat(layer2.name, ":").concat(layer2.zIndex));

  // //向上移动
  // thisWidget.udpateLayerZIndex(layer1, layer1.zIndex)
  // //向下移动
  // thisWidget.udpateLayerZIndex(layer2, layer2.zIndex)
}

//===================================其他====================================

//地图图层添加移除监听，自动勾选
function updateCheckd(name, checked) {
  var treeObj = $.fn.zTree.getZTreeObj("treeOverlays");
  var nodes = treeObj.getNodesByParam("name", name, null);
  if (nodes && nodes.length > 0) {
    treeObj.checkNode(nodes[0], checked, false);
  } else {
    console.log("未在图层树上找到图层“" + name + "”，无法自动勾选处理");
  }
}