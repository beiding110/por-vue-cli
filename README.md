# por-vue-cli ⚠️停止维护，请使用 [por-vue-cli4](https://github.com/beiding110/por-vue-cli4)

> the new cli with node 10，vue-cli2，webpack2

集成了appjs、常用组件库、element-ui/mint-ui、jquery、babel、sentry、vue-mate-info等；

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

* 拉取项目；
* 是否使用多项目开发，是则取消`.gitignore`中的注释；
* 修改`config/index`中代理配置，包含：dev.proxyTable、build.useSentry；
* 修改`src/config/index`中相关参数（如需要），包含：sentry、cnzz、router等；
* 判断是否使用统一login页面，决定登录页面`src/views/pc/login`，及相关方法`src/views/pc/store`，继续在原位置维护（使用统一登录），或移至子项目文件夹中维护（非统一）；
* 修改`src/views/pc/store`中的上导航相关操作；
* 根据需要配置`src/views/pc/layout`中导航菜单（如本示例中将菜单项进行配置抽离，实际生产中应该是以接口形式获取菜单）；
* 如使用多项目开发，则应在此位置提交git，并将该项目作为base项目，禁止管理员外其他成员提交修改；
* 在以上基础上进行开发；

## 开发命令

``` bash
# 初次启动安装依赖
npm install
yarn install

# 开发模式
npm run dev
yarn dev

# 生产模式打包
npm run build
yarn build

# 生产模式打包并查看包分析
npm run build --report
```

## 整体样式修改

### 通用修改

`logo` src/assets/logo.png

`.ico` public/favicon.ico

`title` src/config/index.js

`其他样式重写及覆盖` src/css/common.scss

`组件库级别修改（如my-btn）` 修改对应组件文件即可（如src/components-sys/my-btn.vue）

### 系统面板

`logo（大）` src/assets/logo.png

`logo（小）` src/assets/logo-small.png

`系统主题色` src/css/var.scss

`面板主题` src/views/pc/layout/index.vue，在style标签中选择引用`common.scss`或`pop.scss`