# xinxin-ui
基于VUE3+TS的UI组件库


## 笔记
* 将实例生成演示文档命令: npm run gen:site -- -c form
* 将package添加到另一个package: pnpm -F xinxin-ui add @xinxin-ui/symbols@*
* 添加全局依赖: pnpm i lodash -W
* 为某一个包安装依赖： pnpm i axios -D --filter @xinxin-ui/typings
* svg转icon组件: npm run build:icons
* 打包ui组件库: pnpm run build:core
* 打包文档网站: pnpm run build:site

## npm发布
* 先登录：npm login
* 到指定目录下执行发布命令: npm publish