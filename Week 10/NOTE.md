# 学习笔记

## layout 排版
分行
- 根据主轴尺寸，把元素分进行
- 若设置了 no-wrap ，则强行分配进一行

计算主轴方向
- 找出所有 flex 元素
- 把主轴方向的剩余尺寸按比例分配给这些元素
- 若剩余空间为负数，所有 flex 元素为0，等比压缩剩余元素

计算交叉轴方向
- 根据每一行中最大元素尺寸计算行高
- 根据行高 flex-align 和 item-align ，确定元素具体位置

toy browser 实现 flex 排版算法为例，分主轴和交叉轴，来计算空间布局。

### tips：主要的排版模式
- 正常流
- flex 模式
- grid 模式 [Basic_Concepts_of_Grid_Layout@MDN]
- Houdini 模式 [CSS_Houdini@MDN]

 
## render 渲染
绘制单个元素
- 绘制需要依赖一个图形环境
- 采用 npm 包的 images 库
- 绘制在一个 viewport 上进行
- 与绘制相关的属性： background-color、border、background-image等

绘制 DOM 树
- 递归调用子元素的绘制方法完成 DOM 树的绘制
- 忽略一些不需要绘制的节点
- 实际浏览器中，文字绘制是难点，需要依赖字体库，此处实现忽略了
- 实际浏览器中，还会对一些图层做compositing，此处实现忽略了

为期三周的浏览器工作原理到此完结了，通过 toy browser 的开发过程，加深了对浏览器工作原理的理解。从 URL 请求得到 HTML 代码，解析得到 DOM 树，计算 CSS 属性，根据属性来排版布局，最后绘制渲染完成内容呈现。

[Basic_Concepts_of_Grid_Layout@MDN]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout

[CSS_Houdini@MDN]: https://developer.mozilla.org/zh-CN/docs/Web/Houdini


