# 学习笔记 

第13周的课程，内容主要包括 HTML 和浏览器 API。

## 浏览器 API

### DOM API
浏览器 API 不仅仅是 DOM API

DOM API 分四个部分：

- traversal（访问节点，自动迭代工具，**不推荐使用**）

- Node 节点 API

- Event 事件 API

- Range API（强大，易用性差）


Node 直接节点

- Element 元素节点
  - HTML Element
  - SVG Element
- Document 文档根节点
- CharacterData 字符数据
  - Text 文本节点
  - Comment 注释
  - ProcessingInstruction 处理信息
- DocumentFragment 文档片段
- DocumentType 文档类型



HTML 中常用的 namespace ：HTML、SVG 和 MathML，会产生 Element 子类。



导航类操作 DOM API

- parentNode —— parentElement
- childNodes —— children 
- firstChild —— firstElementChild 
- lastChild —— lastElementChild 
- nextSibling —— nextElementSibling
- previousSibling —— previousElementSibling

修改操作 DOM API

- appendChild
- insertBefore
- removeChild
- replaceChild

高级操作

- compareDocumentPosition 是一个用于比较两个节点中关系的函数
- contains 检查一个节点是否包含另外一个节点的函数
- isEqualnode 检查两个节点是否完全相同
- isSameNode 检查连个节点是否是同一个节点，实际在 JS 中可以用 === 判断
- cloneNode 复制一个节点，如果传入参数 true 则会连同子元素做深拷贝

### 事件 API

事件对象模型

参考：[事件监听器](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)

先捕获后冒泡


### Range API
批量节点、半个节点的操作

```
var range = new Range()
range.setStart(element, 9)
range.setEnd(element, 4)
var range = document.getSelection().getRangeAt(0)

```
- range.setStartBefore
- range.setEndBefore
- range.setStartAfter
- range.setEndAfter
- range.selectNode
- range.selectNodeContents

主要的操作
```
// 取出range的内容，删
var fragment = range.extractContents()
// 插入新节点，加
range.insertNode(document.createTextNode("aaaa"))
```

### CSSOM

对 CSS 文档的抽象

document.styleSheets

Rules: 

- document.styleSheets[0].cssRules
- document.styleSheets[0].insertRule("p { color: pink;}", 0)
- document.styleSheets[0].removeRule(0)

Rule

CSSStyleRule

- selectorText String
- style Key-Value 结构

getComputedStyle

- window.getComputedStyle(elt, pseudoElt);

    - elt 想要获取的元素
    - pseudoElt 可选，伪元素

```
document.styleSheet[0].cssRules.style.color = "blue"
// 示例：获取伪元素的颜色
getComputedStyle(document.querySelector("a"),"::before").color

```
### CSSOM View
Window API
scroll API
layout API
- getClientRects()
- getBoundingClientRect()

### 其他 API 

#### 标准化组织

- khronos
  - WebGL
- ECMA
  - ECMAScript
- WHATWG
  - HTML
- W3C
  - webaudio
  - CG / WG


