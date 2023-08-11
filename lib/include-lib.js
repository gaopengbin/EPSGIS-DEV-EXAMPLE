/* eslint-disable */

/**
 * 第3方公共类库配置文件
 *
 * @copyright 火星科技 mars3d.cn
 * @author 木遥 2021-11-26
 */
window.configLibs = {
  /// ///////////////////////3D及其插件////////////////////////
  'EPSPlanetSDK': [
    "epsplanet/EPSPlanet_SDK/XbsjEarth/XbsjEarth.js",
    "epsplanet/EPSPlanet_SDK/XbsjEarth/thirdParty/rxjs/6.5.2/rxjs.umd.min.js",
    "epsplanet/EPSPlanet_SDK/XbsjCesium/Cesium.js",
    "epsplanet/EPSPlanet_SDK/XbsjCesium/XbsjCesium.js",
    "epsplanet/EPSPlanet_SDK/XbsjCesium/Widgets/Widgets.css",
  ],
  ////////////////////////// UI界面相关库////////////////////////
  'jquery': [
    "jquery/jquery-3.6.0.min.js",
  ],
  'layer': [
    "layer/theme/default/layer.css",
    "layer/theme/retina/retina.css",
    "layer/theme/mars/layer.css",
    "layer/layer.js"
  ],
  'jquery.scrollTo': [
    "jquery/scrollTo/jquery.scrollTo.min.js",
  ],
  'jquery.minicolors': [
    "jquery/minicolors/jquery.minicolors.css",
    "jquery/minicolors/jquery.minicolors.min.js",
  ],
  'jquery.range': [
    "jquery/range/range.css",
    "jquery/range/range.js",
  ],
  'ztree': [
    "jquery/ztree/css/zTreeStyle/zTreeStyle.css",
    "jquery/ztree/css/mars/ztree-mars.css",
    "jquery/ztree/js/jquery.ztree.all.min.js",
  ],
  'jstree': [
    "jstree/themes/default-dark/style.css",
    "jstree/jstree.min.js",
  ],
  'jquery.mCustomScrollbar': [
    "jquery/mCustomScrollbar/jquery.mCustomScrollbar.css",
    "jquery/mCustomScrollbar/jquery.mCustomScrollbar.js",
  ],
  'jedate': [
    "jquery/jedate/skin/jedate.css",
    "jquery/jedate/jedate.js",
  ],
  'lazyload': [
    "jquery/lazyload/jquery.lazyload.min.js",
  ],
  'bootstrap': [
    "bootstrap/css/bootstrap.css",
    "bootstrap/js/bootstrap.bundle.min.js",
  ],
  'bootstrap-table': [
    "bootstrap/bootstrap-table/bootstrap-table.css",
    "bootstrap/bootstrap-table/bootstrap-table.min.js",
    "bootstrap/bootstrap-table/locale/bootstrap-table-zh-CN.js"
  ],
  'bootstrap-select': [
    "bootstrap/bootstrap-select/bootstrap-select.css",
    "bootstrap/bootstrap-select/bootstrap-select.min.js",
    "bootstrap/bootstrap-select/i18n/defaults-zh_CN.js",

  ],
  'bootstrap-checkbox': [
    "bootstrap/bootstrap-checkbox/awesome-bootstrap-checkbox.css",
  ],
  'bootstrap-slider': [
    "bootstrap/bootstrap-slider/bootstrap-slider.min.css",
    "bootstrap/bootstrap-slider/bootstrap-slider.min.js",
  ],
  'nprogress': [
    "nprogress/nprogress.css",
    "nprogress/nprogress.min.js",
  ],
  'toastr': [
    "toastr/toastr.css",
    "toastr/toastr.js",
  ],
  'formvalidation': [
    "formvalidation/formValidation.css",
    "formvalidation/formValidation.min.js",
    "formvalidation/framework/bootstrap.min.js",
    "formvalidation/language/zh_CN.min.js",
  ],
  'admui': [
    "admui/css/index.css",
    "admui/js/global/core.js", //核心
    "admui/js/global/configs/site-configs.js",
    "admui/js/global/components.js",
  ],
  'admui-frame': [
    "admui/css/site.css",
    "admui/js/app.js",
  ],
  'admin-lte': [
    "fonts/font-awesome/css/font-awesome.min.css",
    "admin-lte/css/AdminLTE.min.css",
    "admin-lte/css/skins/skin-blue.min.css",
    "admin-lte/js/adminlte.min.js"
  ],
  'highlight': [
    "highlight/styles/foundation.css",
    "highlight/highlight.pack.js"
  ],

  'animate': [
    "animate/animate.css",
  ],
  'font-awesome': [
    "fonts/font-awesome/css/font-awesome.min.css",
  ],
  'font-marsgis': [
    "fonts/marsgis/iconfont.css",
  ],
  'web-icons': [
    "fonts/web-icons/web-icons.css",
  ],

  ////////////////////////// 其他库////////////////////////
  'haoutil': [
    "hao/haoutil.js"
  ],
  'localforage': [
    "localforage/localforage.min.js"
  ],
}


  //内部处理方法
  ; (function () {
    var r = new RegExp('(^|(.*?\\/))(include-lib.js)(\\?|$)'),
      s = document.getElementsByTagName('script'),
      targetScript
    for (var i = 0; i < s.length; i++) {
      var src = s[i].getAttribute('src')
      if (src) {
        var m = src.match(r)
        if (m) {
          targetScript = s[i]
          break
        }
      }
    }

    // cssExpr 用于判断资源是否是css
    var cssExpr = new RegExp('\\.css')

    function inputLibs(list, baseUrl) {
      if (list == null || list.length === 0) {
        return
      }
      for (var i = 0, len = list.length; i < len; i++) {
        var url = list[i]
        if (!url.startsWith("http") && !url.startsWith("//:")) {
          url = baseUrl + url
        }

        if (cssExpr.test(url)) {
          var css = '<link rel="stylesheet" href="' + url + '">'
          document.writeln(css)
        } else {
          var script = '<script type="text/javascript" src="' + url + '"><' + '/script>'
          document.writeln(script)
        }
      }
    }

    //加载类库资源文件
    function load() {
      var arrInclude = (targetScript.getAttribute('include') || '').split(',')
      var libpath = targetScript.getAttribute('libpath') || ''
      if (libpath.lastIndexOf('/') !== libpath.length - 1) {
        libpath += '/'
      }

      var keys = {}
      for (var i = 0, len = arrInclude.length; i < len; i++) {
        var key = arrInclude[i]

        if (keys[key]) {
          //规避重复引入lib
          continue
        }
        keys[key] = true

        inputLibs(configLibs[key], libpath)
      }
    }

    load()
  })()
