/* eslint-disable no-undef */
//当前代码来源：https://github.com/muyao1987/web-dist

//在gulpfile中先载入gulp包，因为这个包提供了一些API
const gulp = require("gulp")
const babel = require("gulp-babel")
const plumber = require("gulp-plumber")
const babelCore = require("@babel/core")
const utf8Convert = require("gulp-utf8-convert")
const uglify = require("gulp-uglify")
const header = require("gulp-header")
const htmlmin = require("gulp-htmlmin")
const cheerio = require("gulp-cheerio")
const cssmin = require("gulp-clean-css")
const htmlreplace = require("gulp-html-replace")
const replace = require("gulp-replace")

const fs = require("fs")
const path = require("path")

const BASE_URL = "/test"

//////////////////////////以下参数可以根据实际情况调整/////////////////////
const copyright = "版权所有 山维科技 http://www.sunwaysurvey.com.cn"

//这个时间后修改的文件不处理（增量更新时使用）
let lastTime

//排除不拷贝的文件类型后缀
const noCopyFileType = [".psd", ".doc", ".docx", ".txt", ".md", ".zip", ".rar"]

//排除不拷贝的目录
const noCopyPathDef = [
  ".svn",
  ".git",
  "dist",
  "node_modules",
  ".eslintrc",
  ".editorconfig",
  ".eslintignore",
  ".prettierrc",
  ".vscode",
  "LICENSE",
  "gulpfile.js",
  "package.json",
  "package-lock.json",
  "-src."
]

//定义不做压缩混淆直接拷贝的目录
const noPipePathDef = ["lib"]
// const noPipePathDef = ["lib","example"]
////////////////////自定义设置////////////////////

//需要压缩混淆的根目录
let srcPath = "./"

//生成到的目标目录
let distPath = "dist"

let noPipePath = []
let noCopyPath = ["example-dev", "example-test"]

// lastTime = new Date("2022-08-01 08:00:00")

////////////////////压缩混淆////////////////////

const fileList = []
gulp.task("build", (done) => {
  // console.log('--------代码编译开始--------');

  console.log("开始处理目录：" + srcPath)
  console.log("生成至目录：" + distPath)

  travel(srcPath)

  fileList.forEach((t) => {
    let srcFile = t.pathname
    const outFilePath = distPath
    // console.log('读取：' + srcFile + '\n输出：' + outFilePath + '\n');

    let stat = fs.statSync(srcFile)
    if (lastTime != null && stat.mtime < lastTime) {
      return
    }

    let bannerData = { date: stat.mtime.format("yyyy-M-d HH:mm:ss") }
    let banner = "/* <%= date %> | " + copyright + " */\n"
    let bannerHtml = "<!-- <%= date %> | " + copyright + " -->\n"
    switch (t.fileType) {
      case ".js":
        gulp
          .src(srcFile, {
            base: srcPath
          })
          .pipe(
            plumber({
              errorHandler: function (err) {
                throwOnlyCopy(srcPath, srcFile, outFilePath, err)
              }
            })
          )
          .pipe(
            utf8Convert({
              encNotMatchHandle: function (file) {
                throwOnlyCopy(srcPath, srcFile, outFilePath, " 编码可能不是utf-8，避免乱码请检查！")
              }
            })
          )
          .pipe(
            babel({
              presets: ["@babel/preset-env"],
              sourceType: "script",
              compact: false
            })
          )
          // js压缩混淆
          // .pipe(
          //   uglify().on("error", function () {
          //     this.emit("end")
          //     throwOnlyCopy(srcPath, srcFile, outFilePath, err)
          //   })
          // )
          .pipe(header(banner, bannerData))
          .pipe(gulp.dest(outFilePath))
        break
      case ".html":
        // 处理htmljs css的引用路径
        if (srcFile.indexOf('example') !== -1) {
          let relativePathJS = path.relative(srcFile, 'js/common.js')
          let relativePathCSS = path.relative(srcFile, 'css/style.css')
          // console.log('relativePath', srcPath, srcFile, relativePathJS);
          // relativePathJS = relativePathJS.slice(3)
          // relativePathCSS = relativePathCSS.slice(3)
          // 反斜杠转换为正斜杠
          relativePathJS = relativePathJS.replace(/\\/g, '/')
          relativePathCSS = relativePathCSS.replace(/\\/g, '/')
          gulp
            .src(srcFile, {
              base: srcPath
            })
            .pipe(
              replace(
                '/js/common.js',
                relativePathJS,
              )
            )
            .pipe(
              replace(
                '/lib/',
                './lib/',
              )
            )
            .pipe(
              replace(
                '/css/style.css',
                relativePathCSS,
              )
            )
            .pipe(
              plumber({
                errorHandler: function (err) {
                  throwOnlyCopy(srcPath, srcFile, outFilePath, err)
                }
              })
            )
            .pipe(
              utf8Convert({
                encNotMatchHandle: function (file) {
                  throwOnlyCopy(srcPath, srcFile, outFilePath, " 编码可能不是utf-8，避免乱码请检查！")
                }
              })
            )
            // .pipe(
            //   cheerio({
            //     run: function ($, file) {
            //       $("script").each(function () {
            //         // html内联js编译
            //         const script = $(this)
            //         try {
            //           if (!script.attr("src")) {
            //             const scriptHtml = script.html()
            //             const result = babelCore.transformSync(scriptHtml, {
            //               presets: ["@babel/preset-env"],
            //               sourceType: "script",
            //               compact: false
            //             })
            //             script.text(result.code)
            //           }
            //         } catch (err) {
            //           console.log("转换html出错了", err)
            //           throwOnlyCopy(srcPath, srcFile, outFilePath, "html内联js编译错误！")
            //         }
            //       })
            //     }
            //   })
            // )
            .pipe(header(bannerHtml, bannerData))
            .pipe(gulp.dest(outFilePath))
        } else {
          gulp
            .src(srcFile, {
              base: srcPath
            })
            .pipe(
              plumber({
                errorHandler: function (err) {
                  throwOnlyCopy(srcPath, srcFile, outFilePath, err)
                }
              })
            )
            .pipe(
              utf8Convert({
                encNotMatchHandle: function (file) {
                  throwOnlyCopy(srcPath, srcFile, outFilePath, " 编码可能不是utf-8，避免乱码请检查！")
                }
              })
            )
            .pipe(
              cheerio({
                run: function ($, file) {
                  $("script").each(function () {
                    // html内联js编译
                    const script = $(this)
                    try {
                      if (!script.attr("src")) {
                        const scriptHtml = script.html()
                        const result = babelCore.transformSync(scriptHtml, {
                          presets: ["@babel/preset-env"],
                          sourceType: "script",
                          compact: false
                        })
                        script.text(result.code)
                      }
                    } catch (err) {
                      console.log("转换html出错了", err)
                      throwOnlyCopy(srcPath, srcFile, outFilePath, "html内联js编译错误！")
                    }
                  })
                }
              })
            )
            .pipe(
              htmlmin({
                collapseWhitespace: true, //清除空格，压缩html，作用比较大，引起的改变压缩量也特别大
                collapseBooleanAttributes: true, //省略布尔属性的值，比如：<input checked="checked"/>,那么设置这个属性后，就会变成 <input checked/>
                removeComments: true, //清除html中注释
                removeEmptyAttributes: true, //清除所有的空属性
                removeScriptTypeAttributes: true, //清除所有script标签中的type="text/javascript"属性
                removeStyleLinkTypeAttributes: true, //清楚所有Link标签上的type属性
                minifyJS: true, //压缩html中的javascript代码
                minifyCSS: true //压缩html中的css代码
              })
            )
            .pipe(header(bannerHtml, bannerData))
            .pipe(gulp.dest(outFilePath))
        }
        break
      case ".css":
        gulp
          .src(srcFile, {
            base: srcPath
          })
          .pipe(
            plumber({
              errorHandler: function (err) {
                throwOnlyCopy(srcPath, srcFile, outFilePath, err)
              }
            })
          )
          .pipe(
            utf8Convert({
              encNotMatchHandle: function (file) {
                throwOnlyCopy(srcPath, srcFile, outFilePath, " 编码可能不是utf-8，避免乱码请检查！")
              }
            })
          )
          .pipe(
            cssmin({
              advanced: false, //类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
              compatibility: "ie8", //保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
              keepSpecialComments: "*" //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
            })
          )
          .pipe(header(banner, bannerData))
          .pipe(gulp.dest(outFilePath))
        break
      default:
        gulp
          .src(srcFile, {
            base: srcPath
          })
          .pipe(gulp.dest(outFilePath))
        break
    }
  })
  done()

  // console.log('--------代码编译完成--------');
})

//遍历目录获取文件列表
function travel(dir) {
  fs.readdirSync(dir).forEach(function (file) {
    let pathname = path.join(dir, file)
    if (fs.statSync(pathname).isDirectory()) {
      //排除不拷贝的目录，文件不会生成到目标目录中
      if (noCopyPathDef.some((t) => pathname.indexOf(t) !== -1)) {
        return
      }
      if (noCopyPath.some((t) => pathname.indexOf(t) !== -1)) {
        return
      }

      travel(pathname)
    } else {
      let fileType = path.parse(pathname).ext
      // console.log(pathname);

      //排除不拷贝的文件，文件不会生成到目标目录中
      if (noCopyPathDef.some((t) => pathname.indexOf(t) !== -1)) {
        return
      }
      if (noCopyPath.some((t) => pathname.indexOf(t) !== -1)) {
        return
      }
      if (noCopyFileType.indexOf(fileType) !== -1) {
        return
      }

      //不做压缩处理,直接原样拷贝过去
      if (
        noPipePath.some((t) => pathname.indexOf("\\Cesium\\") !== -1) || //不对Cesium目录压缩
        noPipePathDef.some((t) => pathname.indexOf(t) !== -1) ||
        noPipePath.some((t) => pathname.indexOf(t) !== -1)
      ) {
        fileType = ""
      }

      fileList.push({
        pathname,
        fileType
      })
    }
  })
}

// 抛出错误信息，直接copy文件
function throwOnlyCopy(srcPath, pathname, outFilePath, message) {
  console.log(`[转换出错了] ${pathname}`, message)
  if (pathname && outFilePath) {
    gulp
      .src(pathname, {
        base: srcPath
      })
      .pipe(gulp.dest(outFilePath))
  }
}

// eslint-disable-next-line no-extend-native
Date.prototype.format = function (fmt) {
  let o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
    "H+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds() //毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length))
    }
  }
  return fmt
}
