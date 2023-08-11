/* 2023-8-11 09:34:00 | 版权所有 山维科技 http://www.sunwaysurvey.com.cn */
function isShowLayer(e,t){e.show=t}function bindTooltip(e,t){t?e.bindTooltip(function(e){var t=getAttrForEvent(e);return t["类型"]=null==(e=e.graphic)?void 0:e.type,t["来源"]="我是layer上绑定的Toolip",t["备注"]="我支持鼠标移入交互",mars3d.Util.getTemplateHtml({title:"矢量图层",template:"all",attr:t})},{pointerEvents:!0}):e.unbindTooltip()}function bindRinghtMenu(e,t){t?bindLayerContextMenu(layery):e.unbindContextMenu(!0)}function bindLayerPopup(){graphicLayer.bindPopup(function(e){var t=getAttrForEvent(e);return t["类型"]=null==(e=e.graphic)?void 0:e.type,t["来源"]="我是layer上绑定的Popup",t["备注"]="我支持鼠标交互",mars3d.Util.getTemplateHtml({title:"矢量图层",template:"all",attr:t})},{pointerEvents:!0})}function getAttrForEvent(e){var t;return null!=e&&null!=(t=e.graphic)&&t.attr?e.graphic.attr:e.czmObject&&null!=(e=t=(t=e.czmObject._attr||e.czmObject.properties||e.czmObject.attribute)&&t.type&&t.attr?t.attr:t)?e:{}}function bindLayerContextMenu(){graphicLayer.bindContextMenu([{text:"删除对象",icon:"fa fa-trash-o",show:function(e){e=e.graphic;return!(!e||e.isDestroy)},callback:function(e){e=e.graphic;e&&graphicLayer.removeGraphic(e)}},{text:"计算长度",icon:"fa fa-medium",show:function(e){e=e.graphic;return!!e&&("polyline"===e.type||"polylineP"===e.type||"curve"===e.type||"curveP"===e.type||"polylineVolume"===e.type||"polylineVolumeP"===e.type||"corridor"===e.type||"corridorP"===e.type||"wall"===e.type||"wallP"===e.type)},callback:function(e){e=e.graphic,e=mars3d.MeasureUtil.formatDistance(e.distance);$alert("该对象的长度为:"+e)}},{text:"计算周长",icon:"fa fa-medium",show:function(e){e=e.graphic;return!!e&&("circle"===e.type||"circleP"===e.type||"rectangle"===e.type||"rectangleP"===e.type||"polygon"===e.type||"polygonP"===e.type)},callback:function(e){e=e.graphic,e=mars3d.MeasureUtil.formatDistance(e.distance);$alert("该对象的周长为:"+e)}},{text:"计算面积",icon:"fa fa-reorder",show:function(e){e=e.graphic;return!!e&&("circle"===e.type||"circleP"===e.type||"rectangle"===e.type||"rectangleP"===e.type||"polygon"===e.type||"polygonP"===e.type||"scrollWall"===e.type||"water"===e.type)},callback:function(e){e=e.graphic,e=mars3d.MeasureUtil.formatArea(e.area);$alert("该对象的面积为:"+e)}}])}function drawFile(){var e,t=this.files[0],n=t.name,n=n.substring(n.lastIndexOf(".")+1,n.length).toLowerCase();"json"==n||"geojson"==n?((e=new FileReader).readAsText(t,"UTF-8"),e.onloadend=function(e){var t=JSON.parse(this.result);"graphic"==t.type&&t.data?(graphicLayer.addGraphic(t.data),graphicLayer.flyTo()):(t=simplifyGeoJSON(t),graphicLayer.loadGeoJSON(t,{flyTo:!0})),clearSelectFile()}):"kml"==n?((e=new FileReader).readAsText(t,"UTF-8"),e.onloadend=function(e){var t=this.result;kgUtil.toGeoJSON(t).then(function(e){e=simplifyGeoJSON(e),console.log("kml2geojson",e),graphicLayer.loadGeoJSON(e,{flyTo:!0}),clearSelectFile()}),clearSelectFile()}):"kmz"==n?kgUtil.toGeoJSON(t).then(function(e){e=simplifyGeoJSON(e),console.log("kmz2geojson",e),graphicLayer.loadGeoJSON(e,{flyTo:!0}),clearSelectFile()}):(window.layer.msg("暂不支持 "+n+" 文件类型的数据！"),clearSelectFile())}function clearSelectFile(){window.addEventListener?document.getElementById("input_draw_file").value="":document.getElementById("input_draw_file").outerHTML+=""}function simplifyGeoJSON(e){try{e=turf.simplify(e,{tolerance:1e-6,highQuality:!0,mutate:!0})}catch(e){}return e}function initGraphicManager(e){e.bindPopup('<table style="width: auto;">\n            <tr>\n              <th scope="col" colspan="2" style="text-align:center;font-size:15px;">我是graphic上绑定的Popup </th>\n            </tr>\n            <tr>\n              <td>提示：</td>\n              <td>这只是测试信息，可以任意html</td>\n            </tr>\n          </table>').openPopup(),e.bindContextMenu([{text:"删除对象[graphic绑定的]",icon:"fa fa-trash-o",callback:function(e){e=e.graphic;e&&e.remove()}}]),e.startFlicker&&e.startFlicker({time:20,maxAlpha:.5,color:Cesium.Color.YELLOW,onEnd:function(){}})}