/* 2023-8-14 06:23:04 | 版权所有 山维科技 http://www.sunwaysurvey.com.cn */
/* eslint-disable no-undef */
"use script";

//开发环境建议开启严格模式
$(document).ready(function () {
  var inhtml = "\n      <div class=\"infoview rightbottom\" style=\"min-width: 200px\">\n      <table class=\"mp_table\">\n        <tr>\n          <td class=\"nametd\">\u603B\u957F\u5EA6</td>\n          <td id=\"td_alllength\"></td>\n        </tr>\n        <tr>\n          <td class=\"nametd\">\u5DF2\u6F2B\u6E38\u957F\u5EA6</td>\n          <td id=\"td_length\"></td>\n        </tr>\n        <tr>\n          <td class=\"nametd\">\u603B\u65F6\u957F</td>\n          <td id=\"td_alltimes\"></td>\n        </tr>\n        <tr>\n          <td class=\"nametd\">\u5DF2\u6F2B\u6E38\u65F6\u95F4</td>\n          <td id=\"td_times\"></td>\n        </tr>\n\n        <tr>\n          <td class=\"nametd\">\u7ECF\u5EA6</td>\n          <td id=\"td_jd\"></td>\n        </tr>\n        <tr>\n          <td class=\"nametd\">\u7ECF\u5EA6</td>\n          <td id=\"td_wd\"></td>\n        </tr>\n        <tr>\n          <td class=\"nametd\">\u6F2B\u6E38\u9AD8\u7A0B</td>\n          <td id=\"td_gd\"></td>\n        </tr>\n\n        <tr>\n          <td colspan=\"2\" style=\"width: 100%; text-align: center\">\n            <div class=\"progress\">\n              <div class=\"progress-bar progress-bar-success\" role=\"progressbar\" aria-valuenow=\"0\" aria-valuemin=\"0\" aria-valuemax=\"100\">0%</div>\n            </div>\n          </td>\n        </tr>\n      </table>\n    </div> ";
  $("body").append(inhtml);
});

//面板显示相关信息
eventTarget.on("roamLineChange", function (roamLineData) {
  var _roamLineData$point, _roamLineData$point2, _roamLineData$point3;
  //显示基本信息，名称、总长、总时间
  var val = Math.ceil(roamLineData.second * 100 / roamLineData.second_all);
  if (val < 1) {
    val = 1;
  }
  if (val > 100) {
    val = 100;
  }
  $("#td_alltimes").html(mars3d.Util.formatTime(roamLineData.second_all));
  $("#td_alllength").html(mars3d.MeasureUtil.formatDistance(roamLineData.distance_all));
  $(".progress-bar").css("width", val + "%").attr("aria-valuenow", val).html(val + "%");
  $("#td_jd").html((_roamLineData$point = roamLineData.point) === null || _roamLineData$point === void 0 ? void 0 : _roamLineData$point.lng);
  $("#td_wd").html((_roamLineData$point2 = roamLineData.point) === null || _roamLineData$point2 === void 0 ? void 0 : _roamLineData$point2.lat);
  $("#td_gd").html(mars3d.MeasureUtil.formatDistance((_roamLineData$point3 = roamLineData.point) === null || _roamLineData$point3 === void 0 ? void 0 : _roamLineData$point3.alt));
  $("#td_times").html(mars3d.Util.formatTime(roamLineData.second));
  $("#td_length").html(mars3d.MeasureUtil.formatDistance(roamLineData.distance) || "0米");
});