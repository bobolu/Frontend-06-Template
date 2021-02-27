# 学习笔记

`npm` 从5.2版本之后就自带了 `npx` 包运行器，npm 生态系统越来越倾向于本地安装项目的开发依赖，而不是全局安装。

```

// 不推荐
npm install --global webpack
webpack ...

// 推荐
npm i -D webpack
npx webpack ...

```

**Webpack**
- entry 入口文件
- output 输出文件和路径
- loader module的rules数组，配置让Webpack能够去处理js之外的文件
- plugins 拓展处理更多的任务
- mode 不同模式分别配置，主要分development开发模式和production生产模式

**Babel**

> Babel is a JavaScript compiler

将新版本的js编译成老版本的js，让我们使用愉快的用最新的JavaScript来写代码。

babel plugins 和 babel presets，presets 是 plugins 的集合，通过 presets 预设的方案解放了开发者极大的配置 babel 的工作量。
