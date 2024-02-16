# webpack
webpack

name
```
 name: 'admin-app' 配置的名称，用于加载多个配置：
```
externals 排除打包时的依赖项
```
externals:{
    Vue:"vue",
    jquery: 'jQuery'
}
```
entry 指定入口文件
```
entry:"xxxxx.js"
```
watch  webpack依赖图中的所有文件，只要有一个发生了更新，那么代码将被重新编译
```
watch:true
```
output 出口文件
```
    output:{
        filename:"xxxx.js",
        path:path.resolve(__dirname,"xxx")
    }
```
mode
```
    默认值是production
    可选值有：none | development | production；
```
webpack常用loader
```
配置
module:{
    rules:[
        {
            test:"",//正则匹配
            use:[
                {
                    loader:"" ,对应的loader
                    options:" " || {} 会被传入loader中
                }
            ]
        }
    ]
}

常用loader
    file-loader 处理图片
    url-loader 转换为base64的URI。
    vue-loader 处理vue文件
    html-loader 将 HTML 导出为字符串
    style-loader 用于对解析完成的css插入
    css-loader 进行解析.css
    less-loader 解析less.css语法
    scss-loader  解析scss.css语法
    postcss-loader 转换css的 post有很多插件
    tsx-loader 处理ts文件
    
    babel-loader
```

webpack常用plugin
```
    @vue/compiler-sfc  对template进行解析
    clean-webpack-plugin 打包时自动删除dist
    html-webpack-plugin 对HTML进行打包处理生成index.html
    happypack  多线程loader，用于提升构建速度
    webpack-parallel-uglify-plugin 压缩 js
    webpack-merge 合并 webpack 配置
    mini-css-extract-plugin 抽离 css
    optimize-css-assets-webpack-plugin 压缩 css
    add-asset-html-webpack-plugin 将 JavaScript 或 CSS 加到 html-webpack-plugin 生成的 HTML 中
    copy-webpack-plugin 复制功能 
    DefinePlugin在webpack中 编译时创建配置的全局常量
```
webpack-dev-server
``` 
安装
npm i -D webpack-dev-server
热更新HMR 开启hot:true
HMR的原理
    webpack-dev-server会创建两个服务：提供静态资源的服务（express）和Socket服务（net.Socket）;
    express server负责直接提供静态资源的服务（打包后的资源直接被浏览器请求和解析）;

HMR Socket Server，是一个socket的长连接;
    长连接有一个最好的好处是建立连接后双方可以通信（服务器可以直接发送文件到客户端）;
    当服务器监听到对应的模块发生变化时，会生成两个文件.json（manifest文件）和.js文件（update chunk）;
    通过长连接，可以直接将这两个文件主动发送给客户端（浏览器）;
    浏览器拿到两个新的文件后，通过HMR runtime机制，加载这两个文件，并且针对修改的模块进行更新;
    
devServer:{
    mode: 'development',
    entry: {},
    output: {},
    devtool:'#source-map',
    module: {rules: []},
    devServer: {
        contentBase: resolve('./'), // 对外提供的访问内容的路径，只有在提供静态文件访问的情况下才需要使用该配置。
        compress: true, // 配置是否启用 gzip 压缩。boolean 为类型，默认为 false。
        host: 'localhost' || baseDevServer.host,
        inline: true, // 切换dev-server的两种模式，默认情况server使用inline mode(live reload及构建信息的相关代码会被插入到bundle中。)。
        // false:切换到iframe mode(使用iframe mode会在通知栏下方显示构建信息)
        port: baseDevServer.port || 9000,
        quiet: true, // 当启用该配置，除了初始化信息会被写到console中，其他任何信息都不会被写进去。
                    // errors和warnings也不会被写到console中。
        useLocalIp: baseDevServer.useLocalIp || false,
        overlay: { // 在编译过程中有任何错误，可以显示在网页上,在浏览器上全屏显示编译的errors或warnings。默认是关闭的
        warnings: false,
        errors: true
        },
        headers: { // 向所有的请求添加headers
        "X-Custom-Foo": "bar"
        },
        historyApiFallback: true, // 当使用html5 history api,将会在响应404时返回index.html。
        historyApiFallback: { 
        rewrites: [ // 通过传递一个object来对该共呢个做更多的定
            { from: /^\/$/, to: '/views/landing.html' },
            { from: /^\/subpage/, to: '/views/subpage.html' },
            { from: /./, to: '/views/404.html' }
        ],
        disableDotRule: true // 当在路径中使用.符号，需要使用disableDotRule配置。
        },
        https: true, // 默认情况下dev-server使用http协议，通过配置可以支持https
        https: {
        key: fs.readFileSync("/path/to/server.key"),
        cert: fs.readFileSync("/path/to/server.crt"),
        ca: fs.readFileSync("/path/to/ca.pem"),
        },
        open: false, // 第一次构建是否自动用浏览器打开网页，默认是true
        openPage: '/different/page', // 配置项用于打开指定 URL 的网页
        hot: true, // 开启热更新HMR，只能跟新css。js和图片需要手动更新
        hotOnly:true, 启用HMR，当编译失败时，不刷新页面。
        proxy: {
        '/api': {
            target: 'https://api.github.com', // 代理地址
            pathRewrite: {
            '^/api': ''
            },
            // 默认代理服务器，会以我们实际在浏览器请求的主机名【localhost:8080】，作为代理服务器的主机名，
            // 然后代理服务器会带上这个主机名，去请求github，然而 github是不认识 【localhost:8080】
            //  changeOrigin: true 就是以实际代理请求发生过程中的主机名去请求，如：代理服务器的主机名
            changeOrigin: true
        }
    }
    },
    resolve: {
        extensions: ['.js', '.vue', '.json',".ts"], //解析到文件时自动添加扩展明名
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('./src')
        }
    },
    plugins: [
    new webpack.HotModuleReplacementPlugin() // HMR 特性所需要的插件
    ]
}
```
 webpack-cli 后缀

– config：指定一个 Webpack 配置文件的路径；

– mode：指定打包环境的mode，取值为development和production，分别对应着开发环境和生产环境；

– json：输mode出 Webpack 打包的结果，可以使用webpack 

--json > stats.json方式将打包结果输出到指定的文件；

–progress：显示 Webpack 打包进度；

–watch, -w：watch 模式打包，监控文件变化之后重新开始打包；

–color, --colors/–no-color, --no-colors：控制台输出的内容是否开启颜色；

–hot：开启 Hot Module Replacement模式，后面会详细介绍；

–profile：会详细的输出每个环节的用时（时间），方便排查打包速度瓶颈。

$ webpack -p//压缩混淆脚本，这个非常非常重要！

$ webpack -d//生成map映射文件，告知哪些模块被最终打包到哪里了其中的 

# babel
babel的原理

Babel编译器的作用就是将我们的源代码，转换成浏览器可以直接识别的另外一段源代码

babel的工作流程

- 解析阶段（Parsing）
- 转换阶段(Transformation)
- 生成阶段(Code Generation)

babel的执行原理
源代码 =>解析Parsing =>转换Transformation =>代码生成Code Generation =>目标源码

 源代码 => 词法分析 =>tokens数组 =>语法分析 =>ast抽象语法树=>遍历ast =>应用插件plugin =>新的ast =>目标源码

babel 
 - @babel/core;babel的核心代码，必须安装；
 - @babel/cli;可以让我们在命令行使用babel；
 - @babel/preset-env;  
 - @babel/plugin-transform-arrow-functions
 - @babel/plugin-transform-block-scoping

```
presets:[]  预设 babel-preset-env es2015 | options | env |react
plugins:[]  插件
```
# vite
 - vite可以直接支持css和css预处理器 less scss的处理
 - vite对TypeScript是原生支持的，它会直接使用ESBuild来完成编译
 - vite对vue的支持 
   - Vue 3 单文件组件支持：@vitejs/plugin-vue
   - Vue 3 JSX 支持：@vitejs/plugin-vue-jsx
 - ESBuild的特点
   - 超快的构建速度，并且不需要缓存;
   - 支持ES6和CommonJS的模块化;
   - 支持ES6的Tree Shaking;
   - 支持Go、JavaScript的API;
   - 支持TypeScript、JSX等语法编译;
   - 支持SourceMap;
   - 支持代码压缩;
   - 支持扩展其他插;

vite的完全配置
```
//vite.config.js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
export default defineConfig({
  //项目根目录
  root: process.cwd(),
  //项目部署的基础路径
  base: "/",
  //环境配置 'development'|'production'
  mode: "development",
  //全局常量替换 Record<string, string>
  define: {
    "": "",
    user: "users",
  },
  //插件
  plugins: [vue()],
  //静态资源服务的文件夹
  publicDir: "public",
  //存储缓存文件的目录
  cacheDir: "node_modules/.vite",
  resolve: {
    //别名
    alias: {
      "@": path.resolve(__dirname, "/src"),
      comps: path.resolve(__dirname, "/src/components"),
    },
    dedupe: [],
    //解决程序包中package.json配置中的exports 字段
    conditions: [],
    //解析package.json中字段的优先级
    mainFields: ["module", "jsnext:main", "jsnext"],
    //导入时想要省略的扩展名列表
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"],
    //使Vite通过原始文件路径而不是真正的文件路径确定文件身份
    preserveSymlinks: false,
  },
  css: {
    //配置 CSS modules 的行为。选项将被传递给 postcss-modules。
    modules: {},
    // PostCSS 配置（格式同 postcss.config.js）
    // postcss-load-config 的插件配置
    postcss: {},
    //指定传递给 CSS 预处理器的选项
    preprocessorOptions: {
      scss: {
        additionalData: `$injectedColor: orange;`,
      },
    },
    //开发过程中是否启sourcemap
    devSourcemap: false,
  },
  json: {
    //是否支持从 .json 文件中进行按名导入
    namedExports: true,
    //若设置为 true，导入的 JSON 会被转换为 export default JSON.parse("...") 会比转译成对象字面量性能更好，
    stringify: false,
  },
  //继承自 esbuild 转换选项。最常见的用例是自定义 JSX
  esbuild: {
    jsxFactory: "h",
    jsxFragment: "Fragment",
    jsxInject: `import React from 'react'`,
  },
  //静态资源处理  字符串|正则表达式
  assetsInclude: ["**/*.gltf"],
  //调整控制台输出的级别 'info' | 'warn' | 'error' | 'silent'
  logLevel: "info",
  //设为 false 可以避免 Vite 清屏而错过在终端中打印某些关键信息
  clearScreen: true,
  //加载 .env 文件的目录
  envDir: "",
  //envPrefix开头的环境变量会通过import.meta.env暴露客户端源码
  envPrefix: "VITE_",
  //设置'spa' | 'mpa' | 'custom'应用操作
  appType: "spa",
  //服务
  server: {
    //服务器主机名
    host: "localhost",
    //端口号
    port: "5173",
    //设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口
    strictPort: true,
    //https.createServer()配置项
    https: "",
    //服务器启动时自动在浏览器中打开应用程序。
    open: "/docs/index.html",
    //自定义代理规则
    proxy: {
      // 字符串简写写法
      "/foo": "http://localhost:4567",
      // 选项写法
      "/api": {
        target: "http://jsonplaceholder.typicode.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      // 正则表达式写法
      "^/fallback/.*": {
        target: "http://jsonplaceholder.typicode.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/fallback/, ""),
      },
      // 使用 proxy 实例
      "/api": {
        target: "http://jsonplaceholder.typicode.com",
        changeOrigin: true,
        configure: (proxy, options) => {
          // proxy 是 'http-proxy' 的实例
        },
      },
      // Proxying websockets or socket.io
      "/socket.io": {
        target: "ws://localhost:3000",
        ws: true,
      },
    },
    //开发服务器配置 CORS
    cors: {},
    //指定服务器响应的 header ,类型OutgoingHttpHeaders
    header: {},
    //禁用或配置 HMR 连接
    hmr: {},
    //传递给 chokidar 的文件系统监视器选项
    watch: {},
    //中间件模式创建 Vite 服务器,'ssr' | 'html'
    middlewareMode: "ssr",
    //HTTP请求中预留此文件夹，用于代理 Vite 作为子文件夹时使用。
    base: "",
    fs: {
      //限制为工作区 root 路径以外的文件的访问
      strict: true,
      //限制哪些文件可以通过 /@fs/ 路径提供服务
      allow: [
        // 搜索工作区的根目录
        searchForWorkspaceRoot(process.cwd()),
        // 自定义规则
        "/path/to/custom/allow",
      ],
      //限制Vite开发服务器提供敏感文件的黑名单
      deny: [".env", ".env.*", "*.{pem,crt}"],
    },
    //定义开发调试阶段生成资产的url
    origin: "http://127.0.0.1:8080",
  },
  //构建
  build: {
    //浏览器兼容性  "esnext"|"modules"
    target: "modules",
    //否自动注入 module preload 的 polyfill
    polyfillModulePreload: true,
    //输出路径
    outDir: "dist",
    //生成静态资源的存放路径
    assetsDir: "assets",
    //小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项
    assetsInlineLimit: 4096,
    //启用/禁用 CSS 代码拆分
    cssCodeSplit: true,
    //不同的浏览器target设置CSS的压缩
    cssTarget: "",
    //构建后是否生成 source map 文件
    //boolean | 'inline' | 'hidden'
    sourcemap: false,
    //自定义底层的 Rollup 打包配置
    rollupOptions: {
      //要打包的文件路径
      input: "src/main.js",
      //文件输出位置
      output: {
        //打包生产文件路径
        file: "dist/index.js",
        //打包输出格式
        // "amd", "cjs", "system", "es", "iife" or "umd
        format: "cjs",
        //包的全部变量名称
        name: "bundleName",
        //声明全局变量
        globals: {
          jquery: "$",
        },
      },
      //插件
      plugins: [],
      //不需打包的文件
      external: ["lodash"],
    },
    //@rollup/plugin-commonjs 插件的选项
    commonjsOptions: {},
    //@rollup/plugin-dynamic-import-vars 选项
    dynamicImportVarsOptions: {},
    //构建的库
    lib: {
      entry: path.resolve(__dirname, "lib/main.js"),
      //暴露的全局变量
      name: "mylib",
      //'es' | 'cjs' | 'umd' | 'iife'
      formats: "es",
      //输出的包文件名
      fileName: "my-lib",
    },
    //当设置为 true，构建后将会生成 manifest.json 文件
    manifest: false,
    //当设置为 true，构建后将会生成SSR的manifest.json 文件
    ssrManifest: false,
    //生成面向 SSR 的构建
    ssr: "undefined",
    //设置为 false 可以禁用最小化混淆，
    //boolean | 'terser' | 'esbuild'
    minify: "esbuild",
    //传递给 Terser 的更多 minify 选项。
    terserOptions: {},
    //设置为 false 来禁用将构建后的文件写入磁盘
    write: true,
    //默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录。
    emptyOutDir: true,
    //启用/禁用 gzip 压缩大小报告
    reportCompressedSize: true,
    //触发警告的 chunk 大小（以 kbs 为单位）
    chunkSizeWarningLimit: 500,
    //设置为 {} 则会启用 rollup 的监听器
    watch: null,
  },
  //开发服务器
  preview: {
    //开发服务器主机名
    host: "localhost",
    //开发服务器端口号
    port: "5173",
    //设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口
    strictPort: true,
    //https.createServer()配置项
    https: "",
    //服务器启动时自动在浏览器中打开应用程序。
    open: "/docs/index.html",
    //开发服务器，自定义代理规则
    proxy: {
      // 字符串简写写法
      "/foo": "http://localhost:4567",
      // 选项写法
      "/api": {
        target: "http://jsonplaceholder.typicode.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      // 正则表达式写法
      "^/fallback/.*": {
        target: "http://jsonplaceholder.typicode.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/fallback/, ""),
      },
      // 使用 proxy 实例
      "/api": {
        target: "http://jsonplaceholder.typicode.com",
        changeOrigin: true,
        configure: (proxy, options) => {
          // proxy 是 'http-proxy' 的实例
        },
      },
      // Proxying websockets or socket.io
      "/socket.io": {
        target: "ws://localhost:3000",
        ws: true,
      },
    },
    //开发服务器配置 CORS
    cors: {},
  },
  //依赖优化选项
  optimizeDeps: {
    //检测需要预构建的依赖项
    entries: [],
    //预构建中强制排除的依赖项
    exclude: ["jquery"],
    //默认情况下，不在 node_modules 中的，链接的包不会被预构建。使用此选项可强制预构建链接的包。
    include: [],
    //部署扫描和优化过程中传递给EsBuild
    esbuildOptions: {},
    //设置为 true 可以强制依赖预构建，而忽略之前已经缓存过的、已经优化过的依赖
    force: true,
  },
  //SSR 选项
  ssr: {
    //列出的是要为 SSR 强制外部化的依赖
    external: [],
    //列出的是防止被 SSR 外部化依赖项。
    noExternal: [],
    //SSR 服务器的构建目标
    target: "node",
    //SSR 服务器的构建语法格式 'esm' | 'cjs'
    format: "esm",
  },
  worker: {
    //worker 打包时的输出类型 'es' | 'iife'
    format: "iife",
    // worker 打包的 Vite 插件
    plugins: [],
    //打包 worker 的 Rollup 配置项
    rollupOptions: {},
  },
});

```
