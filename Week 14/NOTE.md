# 学习笔记

第 14 周的课程，从组件的角度区分了一些概念， state、config、attributes 和 property ，
在实际工作学习中没有细思过的概念。

## 组件基础知识

对象：Properties、Methods、Inherit
组件：Properties、Childern、Inherit、Attribute、Config & State、Event、Lifecycle、Children

区分 attributes 和 property ，有重合和不同的地方

**如何设计组件状态**
- Property：不可以被 Markup（标记语言）设置，可以被 JS 设置和改变，有可能会根据用于输入而改变
- Attribute：可以被 Markup 设置，可以被 JS 设置和改变，有可能会根据用户输入而改变
- State：只会根据用户输入而改变
- Config：JS 去配置（一般是全局的，由构造函数传入，不会被修改）

**Lifecycle 生命周期**
组件生命周期，从 create（创建）到 destroyed（销毁），中间会有挂载、卸载、响应去更新等。

**Children 自组件**
- Content 型 Children ，组件树
- Template 型 Children ，模版语法


#### JSX 语法和打造Framwork

事无巨细一步一步地带领打造 createELement 的 Framwork 。使用 @babel/plugin-transform-react-jsx 库来解析 JSX，使用 Webpack 配置进行打包。

#### Carousel 轮播图组件

跟上节奏，完成了定时轮播和手动切换的轮播图。确实是比预想的要复杂很多，需要沉下心去涉及到计算的部分。当然，实际应用还得完善和拓展，增加可配置项目（模式切换、duration）等。
