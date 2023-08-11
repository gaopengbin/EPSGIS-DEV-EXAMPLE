/* 2023-8-11 09:34:00 | 版权所有 山维科技 http://www.sunwaysurvey.com.cn */
var exConfig,openTimer,containExamples=!1,thumbLocation=getThumbLocation();function exampleData(e){return e.forEach(function(a,e){var t=0;a.id="ex_"+e,a.children&&a.children.forEach(function(n,e){n.count=n.children?n.children.length:0,t+=n.count,n.id=a.id+"_"+e,n.children&&n.children.forEach(function(e,i){e.hidden&&(t--,n.count--),e.id=e.id+"_"+i,e.fullName="".concat(a.name,"  -  ").concat(n.name,"  -  ").concat(e.name)})}),a.count=t}),e}function sidebarScrollFix(){$("ul#sidebar-menu>li").hover(function(e){var i,n;$("body").hasClass("sidebar-collapse")&&($(this).children("a").children(".sidebar-title-bar").css({top:$(this).offset().top-$(window).scrollTop()+"px",width:"233px"}),n=$(this).offset().top-$(window).scrollTop(),$(".sidebar-menu").height()-n<=(i=$(this).height()+$(this).children("ul").height())&&$(".sidebar-menu").css({height:i+$(window).height()+"px"}),i=n+$(this).height(),$(this).children("ul").css({top:i+"px"}),i=$(this).children("ul"),Math.abs($(window).height()-n-$(this).height())<(n=i.height()))&&(i.css({height:n}),i.addClass("scroll-list"))},function(e){$("body").hasClass("sidebar-collapse")&&($(this).children("ul").removeClass("scroll-list"),$(this).children("ul").css({height:"auto"}))}),$(".main-sidebar").on("scroll",function(e){e.stopPropagation()}),$(window).on("resize",function(){$(".sidebar-menu").css({height:"100%"})})}function createSideBarMenuItem(e,i){if(e)return containExamples=i,i=$("<li id='bar_"+e.id+"' onclick=selectMenu('"+e.id+"') class='treeview '></li>"),(e.children?(createSideBarMenuTitle(e,!0).appendTo(i),createSideBarSecondMenu(e.children)):createSideBarMenuTitle(e,!1)).appendTo(i),i}function createSideBarSecondMenu(e){var a=$("<ul class='treeview-menu second-menu '></ul>");return e.forEach(function(e,i){var n=$("<li class='menuTitle ' id='bar_"+e.id+"' ></li>");n.appendTo(a),(containExamples&&e.children?(createSideBarMenuSecondTitle(e,!0).appendTo(n),createSideBarThirdMenu(e.children)):createSideBarMenuSecondTitle(e,!1)).appendTo(n)}),a}function fileName2Id(e){return(e||"").replace(".html","")}function id2FileName(e){return e+".html"}function createSideBarThirdMenu(e){for(var i=$("<ul class='treeview-menu third-menu'></ul>"),n=e&&e.length?e.length:0,a=0;a<n;a++){var t=e[a],r=fileName2Id(t.main),l=$("<li class='menuTitle' id='bar_"+r+"' ></li>");l.appendTo(i),""!=r&&t.name&&createSideBarMenuThirdTitle(r,t,!1).appendTo(l)}return i}function createSideBarMenuTitle(e,i){var n=e.id||"",a="",t=e.icon,t=(t&&(a="<i class='fa "+t+" iconName'></i>"),""),t=-1!=location.href.indexOf(window.editorUrl)?"../index.html#"+n:"#"+n,n=$("<a  href='"+t+"' >"+a+"<span class='firstMenuTitle'>"+e.name+"("+e.count+")</span></a>");return i&&n.append(createCollapsedIcon()),n}function createSideBarMenuSecondTitle(e,i){var n=e.id||"",a="",t=e.icon,t=(t&&(a="<i class='fa "+t+"'></i>"),""),t=-1!=location.href.indexOf(window.editorUrl)?"../index.html#"+n:"#"+n,n=$("<a href='"+t+"' id='bar_"+e.id+"'>"+a+"<span class='secondMenuTitle'>"+e.name+"("+e.count+")</span></a>");return i&&n.append(createCollapsedIcon()),n}function createSideBarMenuThirdTitle(e,i,n){e=e||"";var a="",t=i.icon,t=(t&&(a="<i class='fa "+t+"'></i>"),$("<a href='#' id='bar_"+e+"'>"+a+"<span class='thirdMenuTitle'>"+i.name+"</span></a>"));return n&&t.append(createCollapsedIcon()),t}function createCollapsedIcon(){return $("<span class='pull-right-container'> <i class='fa fa-angle-left pull-right'></i> </span>")}function selectMenu(e,i){e=_getTarget(e,i);1!==i&&(_selectTarget(e.parent().parent().parent().parent()),_selectTarget(e.parent().parent()),_selectTarget(e.parent()),_selectTarget(e.find("ul")))}function _getTarget(e,i){var n;return i?(1===i&&($("section#sidebar li.active").removeClass("active"),(n=$("section#sidebar li#bar_"+e)).children("ul").show()),2===i&&($("section#sidebar li.active ul.active li").removeClass("active"),n=$("section#sidebar li.treeview").children("ul").children("li#bar_"+e))):($("section#sidebar #ul").addClass("active"),$("section#sidebar li.active").removeClass("active"),n=$("section#sidebar li#bar_"+e)),n&&n.addClass("active"),n}function _selectTarget(e){var i;!e||e.length<1||((i=e.attr("class"))&&-1<i.indexOf("treeview-menu")&&-1===i.indexOf("menu-open")&&(e.addClass("menu-open"),e.css("display","block")),i&&-1<i.indexOf("treeview")&&e.addClass("active"))}function initPage(){var a=$("ul#sidebar-menu"),t=$("#charts-list");exConfig.forEach(function(e,i){var n=0;e.children&&e.children.forEach(function(e,i){e.count=e.children?e.children.length:0,n+=e.count}),e.count=n,a.append(createSideBarMenuItem(e,containExamples)),t.append(createGalleryItem(e))}),resizeCharts(),initSelect(),sidebarScrollFix()}function initSelect(){-1!==window.location.hash.indexOf("#")&&scroll()}function createGalleryItem(e){var i;if(e)return i=$("<li class='category' id='"+e.id+"'></li>"),e.name&&createGalleryItemTitle(e).appendTo(i),e.children&&createSubGalleryItem(e.children).appendTo(i),i}function createSubGalleryItem(a){var t=$("<div class='category-content'></div>");return a.forEach(function(e,i){var n=$("<div class='box box-default color-palette-box' id='"+a.id+"'></div>");createSubGalleryItemTitle(e).appendTo(n),e.children&&createGalleryCharts(e.children).appendTo(n),n.appendTo(t)}),t}function createGalleryItemTitle(e){return $("<h4 class='category-title' id='"+e.id+"'><i class='fa "+e.icon+"'></i>&nbsp;&nbsp;"+e.name+" ("+e.count+")</h4>")}function createSubGalleryItemTitle(e){var i=e.details?"<div class='box-title-details'>说明：".concat(e.details,"</div>"):"";return $("<div class='box-header'><h3 class='box-title' id='"+e.id+"'>&nbsp;&nbsp;&nbsp;&nbsp;"+e.name+" ("+e.count+")</h4></h3>"+i+"</div>")}function createGalleryCharts(e){for(var i=$("<div class='box-body'></div>"),n=e&&e.length?e.length:0,a=0;a<n;a++){var t=e[a];!t.hidden&&t.main&&(t=createGalleryChart(t))&&t.appendTo(i)}return i}function getEditorURL(e){var i=window.editorUrl+"?id="+e.main;return"localhost"!==location.hostname&&"127.0.0.1"!==location.hostname||(i=window.editorUrl+"?id="+e.main),window.autoShowCode&&(i+="&code=true&"),e.params&&(i+="&"+e.params+"&name="+e.fullName),i}function createGalleryChart(e){var i=getEditorURL(e),n=e.name,a=n+" - "+(e.main||""),t=$("<div class='col-xlg-2 col-lg-3 col-md-4 col-sm-6 col-xs-12'></div>"),r=$('<div class="chart"></div>'),i=$("<a class='chart-link' target='_blank' href='"+i+"'></a>"),l="<h6 class='chart-title'  title='"+a+"' >"+n+"</h6>",c="config/thumbnail/"+(e.thumbnail||e.main+".jpg"),c=$("<img class='chart-area' src='"+c+"' style='display: inline'>"),o=getPluginNameByLibs(e.libs);return o&&(l="<h5 class='chart-title' title='"+(a+="\n该功能属于独立"+o+"插件功能，在额外的js中。")+"'  >"+n+"<span style='color:rgba(0, 147, 255, 0.7)'>["+o+"插件]</span></h5>"),e.hasPannel&&(l+='  <div class="icon-html5">'.concat(window.hasPannelIcon,"</div>")),t.attr("title",a),$(l).appendTo(i),c.appendTo(i),i.appendTo(r),r.appendTo(t),t}function getPluginNameByLibs(e){if(e)for(var i=0;i<e.length;i++){var n=e[i];if(n.startsWith("mars3d-"))return n}return!1}function imgerrorfun(){var e=event.srcElement;e.src="img/mapicon.jpg",e.onerror=null}function openExampleView(e,i){var n=document.documentElement.clientWidth-230+"px",a=document.documentElement.clientHeight-60+"px",i=layer.open({type:2,title:i,fix:!0,maxmin:!0,shadeClose:!0,offset:["60px","230px"],area:[n,a],content:e,skin:"layer-mars-dialog animation-scale-up",success:function(e){}});$("#layui-layer"+i+" .layui-layer-title").css({background:"rgba(30, 36, 50, 1)","border-color":"rgba(32, 160, 255, 1)"})}function getThumbLocation(){var e=window.location.toString();return e.substr(0,e.lastIndexOf("/"))}function resizeCharts(){var e=$("#charts-list .chart .chart-area");e[0]&&e[0].offsetWidth?e.height(.8*e[0].offsetWidth):e.height(208),window.onresize=function(){resizeCharts()}}function scroll(){}function bindEvents(){$("ul#sidebar-menu>li.treeview>ul>li").parent("ul").siblings("a").click(function(e){$(this).siblings("ul").is(":visible")&&$(this).siblings("ul").children("li").hasClass("active")&&e.stopPropagation(),window.location=e.currentTarget.href}),window.addEventListener("hashchange",function(){scroll()})}$(document).ready(function(){bindEvents(),setTimeout(function(){$("img.chart-thumb").lazyload()},1e3),$.ajax({type:"get",dataType:"json",url:"config/example.json",success:function(e){exConfig=exampleData(e),haoutil.storage.add("example-config",JSON.stringify(exConfig)),initPage()},error:function(e){console.log("加载JSON出错",e),haoutil.alert(null==e?void 0:e.message,"出错了")}})});var animationSpeed=500;$(window).on("scroll",function(){var e;$("ul.sidebar-menu>li").hasClass("active")&&(e=$("ul.sidebar-menu>li").parent("ul"),openTimer&&clearTimeout(openTimer),openTimer=setTimeout(function(){e.children("li.active").children("ul").slideDown(animationSpeed,function(){e.children("li.active").children("ul").css("display","block")})},100)),$("ul.sidebar-menu>li").not("li.active").children("ul").css("display","none")});