
/**
* @Author   hubary
* @Email    hubary@qq.com
* @描述
**/

/**
 * 绕过生产模式drop_console在页面控制台打印document.lastModified
 */
exports.consoleLastModified = function consoleLastModified() {
  var print = console;
  if (print && print.log) {
    print.log(
      "%cdocument lastModified:",
      "color:#fff;background-color:green;border-radius:3px;font-size:4px;padding:2px 5px",
      document.lastModified
    );
  }
}
