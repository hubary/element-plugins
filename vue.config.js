const path = require('path');
const PACKAGE = require('./package.json');
module.exports = {
  // 将 examples 目录添加为新的页面
  pages: {
    index: {
      // page 的入口
      entry: 'examples/main.js',
      // 模板来源
      template: 'examples/index.html',
      // 输出文件名
      filename: 'index.html',
      title: PACKAGE.name.split('/')[1],
    },
  },
  lintOnSave: false, // 暂时关闭
  productionSourceMap: false,
  devServer: {
    port: 3000,
    open: true,
    hot: true,
    host: '0.0.0.0',
  },
  // css: {
  //   extract: true, // 是否使用css分离插件 ExtractTextPlugin
  //   sourceMap: false, // 开启 CSS source maps?
  //   loaderOptions: {
  //     // sass: {
  //     //   javascriptEnabled: true, //less 配置
  //     // },
  //     scss: {
  //       javascriptEnabled: true, //less 配置
  //       additionalData: `@import "~bpmn-design-vue/packages/styles/variables.scss";`,
  //     },
  //   }, // css预设器配置项
  //   requireModuleExtension: false, // 启用 CSS modules for all css / pre-processor files.
  // },
  //警告 webpack 的性能提示
  configureWebpack: {
    name: PACKAGE.name,
    resolve: {
      alias: {
        '@packages': path.resolve(__dirname, './packages'),
        '@examples': path.resolve(__dirname, './examples'),
        '@': path.resolve(__dirname, './'),
      },
    },
    performance: {
      hints: 'warning',
      //入口起点的最大体积 整数类型（以字节为单位）
      maxEntrypointSize: 50000000,
      //生成文件的最大体积 整数类型（以字节为单位 300k）
      maxAssetSize: 30000000,
      //只给出 js 文件的性能提示
      assetFilter: function(assetFilename) {
        return assetFilename.endsWith('.js');
      },
    },
  },
  chainWebpack: (config) => {
    config.when(process.env.NODE_ENV !== 'development', (config) => {
      config.optimization.minimizer('terser').tap((args) => {
        // remove console.*
        args[0].terserOptions.compress.drop_console = true;
        // remove debugger
        args[0].terserOptions.compress.drop_debugger = true;
        // remove console.log
        args[0].terserOptions.compress.pure_funcs = ['console.log'];
        args[0].terserOptions.output = {
          comments: false,
        };
        return args;
      });
    });
    config.module
      .rule('js')
      .include.add('/packages')
      .end()
      .use('babel')
      .loader('babel-loader')
      .tap((options) => {
        // 修改它的选项...
        return options;
      });
  },
};
