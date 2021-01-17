# 学习笔记：重学 CSS 

## CSS 排版
### 盒（Box）
理清三个概念：标签 Tag 、元素 Element 、盒 Box

#### 盒模型

每个盒有四个边界：
- 内容边界 Content edge
- 内边距边界 Padding Edge
- 边框边界 Border Edge
- 外边框边界 Margin Edge

box-sizing的常见模式：
- content-box，width只包含 content-width
- border-box，width包含 content-width + padding + border-width

### 正常流
#### 正常流排版
- 收集盒和文字进行
- 计算盒和文字在行中的排布
- 计算行的排布

#### 正常流的行级排布
行内排布，vertical-align属性相关
- base-line
- text-top
- text-bottom
- line-top
- line-bottom

#### 正常流的块级排布

一些概念：

Block
- Block Container：里面有BFC的
- Block-level Box：外面有BFC的
- Block Box = Block Container + Block-level Box：里外都有BFC的

Block Container
- Block
- inline-block
- table-cell
- flex-item
- grid-cell
- table-caption

Block-level
- display: block
- display: flex
- display: table
- display: grid
- ......

对应的

inline-level
- display: inline-block
- display: inline-flex
- display: inline-table
- display: inline-grid
- ......

### BFC
BFC：块级格式化上下文
设立 BFC 的情况：
- 浮动元素（元素的 float 不是 none）
- 绝对定位元素（元素的 position 为 absolute 或 fixed）
- 行内块元素（元素的 display 为 inline-block, table-cells, and table captions)
- overflow 计算值(Computed)不为 visible 的块元素

BFC合并的情况

### Flex 排版
1. 盒放入行
2. 计算主轴
3. 计算交叉轴

## CSS 动画与绘制
### 动画

Animation：
- animation-name 时间曲线；
- animation-duration 动画的时长；
- animation-timing-function 动画的时间曲线；
- animation-delay 动画开始前的延迟；
- animation-iteration-count 动画的播放次数；
- animation-direction 动画的方向。

Transition：
- transition-property 要变换的属性；
- transition-duration 变换的时长；
- transition-timing-function 时间曲线；
- transition-delay 延迟。

cubic-bezier 相关内容

```
@keyframes mykf {
0% { top: 0; transition:top ease}
50% { top: 30px;transition:top ease-in }
75% { top: 10px;transition:top ease-out }
100% { top: 0; transition:top linear}
}

/* Apply to 1 property */
/* property name | duration */
transition: margin-right 4s;

/* property name | duration | delay */
transition: margin-right 4s 1s;

/* property name | duration | timing function */
transition: margin-right 4s ease-in-out;

/* property name | duration | timing function | delay */
transition: margin-right 4s ease-in-out 1s;

/* Apply to 2 properties */
transition: margin-right 4s, color 1s;

/* Apply to all changed properties */
transition: all 0.5s ease-out;

/* Global values */
transition: inherit;
transition: initial;
transition: unset;

```

### 颜色
- CMYK 与 RGB ，针对媒介不同，印刷 与 显示相关
- HSL 与 HSV ，可互转， W3C 体系使用 HSL。
HSL：H色相 S饱和度 L亮度
HSV：H色相 S饱和度 V明度

### 绘制

绘制相关属性主要分为三类：
1. 几何图形
   - border
   - box-shadow
   - border-radius
2. 文字
   - font
   - text-decoration
3. 位图
   - background-image

应用技巧：

- data uri + svg
图片可使用 inline svg

