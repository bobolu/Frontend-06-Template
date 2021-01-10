# 学习笔记
## CSS 语法研究
css语法规则文档：
1. CSS2.1

https://www.w3.org/TR/CSS21/grammar.html#q25.0
2. CSS3
https://www.w3.org/TR/css-syntax-3

## CSS @规则的研究

1. @charset: https://www.w3.org/TR/css-syntax-3/ 编码
2. @import: https://www.w3.org/TR/css-cascade-4/ 导入样式文件
3. @media https://www.w3.org/TR/css3-conditional/ 媒体查询
4. @page https://www.w3.org/TR/css-page-3/ 打印设置
5. @counter-style: https://www.w3.org/TR/css-counter-styles-3 自定义列表样式
6. @keyframs https://www.w3.org/TR/css-animations-1/ 关键帧动画
7. @fontface: https://www.w3.org/TR/css-fonts-3/ 引入自定义字体
8. @supports: https://www.w3.org/TR/css3-conditional/ 检查是否支持每个特性
9. @namespace: https://www.w3.org/TR/css-namespaces-3/ 命名空间定义

## CSS 规则的结构

### CSS 规则
- CSS 选择器
- 声明
  - Key
  - Value


## 选择器语法
### 简单选择器
- \* 通配选择器
- div svg｜a 标签选择器
- .cls 类选择器
- #id ID选择器
- [attr=value] 属性选择器
- :hover 伪类
- ::before 伪元素

### 复合选择器
  - <简单选择器><简单选择器><简单选择器>
  - *或者div必须写在最前面

### 复杂选择器
  - <复合选择器>\<sp\><复合选择器>
  - <复合选择器>">"<复合选择器>
  - <复合选择器>"~"<复合选择器>
  - <复合选择器>"+"<复合选择器>
  - <复合选择器>"||"<复合选择器>


## 选择器优先级

参考：
https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Cascade_and_inheritance#%E4%BC%98%E5%85%88%E7%BA%A7_2

一个选择器的优先级可以说是由四个部分相加 (分量)，可以认为是个十百千 — 四位数的四个位数：

千位： 如果声明在 style 的属性（内联样式）则该位得一分。这样的声明没有选择器，所以它得分总是1000。
百位： 选择器中包含ID选择器则该位得一分。
十位： 选择器中包含类选择器、属性选择器或者伪类则该位得一分。
个位：选择器中包含元素、伪元素选择器则该位得一分。
注: 通用选择器 (*)，组合符 (+, >, ~, ' ')，和否定伪类 (:not) 不会影响优先级。


【1】
div#a.b .c[id=x] 0 1 3 1

div 计 [0,0,0,1]
#a1 计 [0,1,0,0]
.b, .c 计 [0,0,2,0]
[id=x] 计 [0,0,1,0]
div#a.b .c[id=x] 总计 [0,1,3,1]

【2】
#a:not(#b) 0 2 0 0
#a, #b 计 [0,2,0,0]
:not 计 [0,0,0,0]
#a:not(#b) 总计 [0,2,0,0]

【3】
*.a 0 0 1 0
* 计 [0,0,0,0]
.a 计 [0,0,1,0]
*.a 总计 [0,0,1,0]

【4】
div.a 0 0 1 1
div 计 [0,0,0,1]
.a 计 [0,0,1,0]
div.a 总计 [0,0,1,1]

## 伪类

## 伪元素


### 第 9 节思考题：
为什么 first-letter 可以设置 float 之类的，而 first-line 不行呢？

::first-letter: 本质是将第一个字用一个<::first-line>将第一行括起来，字数确定，固定宽高
::first-line: 本质是将第一行文字用一个<::first-line>将第一行括起来，浏览器宽高会改变，字数不确定，宽高无法确定，设置float渲染性能开销太大。

