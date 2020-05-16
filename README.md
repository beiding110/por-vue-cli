# por-vue-cli

> the new cli with node 10

集成了appjs、常用组件库、element-ui/mint-ui、jquery、babel、sentry等；

常用配置修改；

[前端工程化文档参考](https://beiding110.github.io/por-fee-doc/#/)

## 文件结构

各个文件夹详细内容及规则参考 `src文件夹` 下各级文件夹内 `README` 文件

``` bash

|-build         构建相关内容
|-config        前端工程相关配置
|-src           源代码
    |-api               请求头前缀配置
    |-assets            图片等媒体文件
    |-components        vue_components组件库（勿改）
    |-components-sys    项目独有全局引用组件库
    |-config            前端项目配置
    |-css               全局样式
    |-js                全局方法
    |-layout            全局布局
    |-mixins            全局mixin
    |-router            自动化路由配置文件
    |-store             自动化store配置文件
    |-views             所有页面及功能
    |-App.vue           入口页面
    |-main.js           入口文件、加载组件、样式、初始化配置等
|-static        不打包编译的静态文件
...

```

## 开发过程

``` bash
# 初次启动安装依赖
npm install
yarn init

# 开发模式
npm run dev
yarn dev

# 生产模式打包
npm run build
yarn build

# 生产模式打包并查看包分析
npm run build --report
```
