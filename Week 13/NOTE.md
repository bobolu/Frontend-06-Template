学习笔记



计算值：https://developer.mozilla.org/zh-CN/docs/Web/CSS/used_value

应用值：https://developer.mozilla.org/zh-CN/docs/Web/CSS/computed_value

计算出CSS属性：
1. 指定值specified value 取自样式层叠 (选取样式表里权重最高的规则), 继承 (如果属性可以继承则取父元素的值)，或者默认值。
2. 按规范算出 计算值computed value  (例如， span 指定 position: absolute 后display 变为 block)。
3. 计算布局(尺寸比如 auto 或 百分数 换算为像素值 )， 结果即 应用值used value
- tips：这些步骤是在内部完成的，脚本只能使用 window.getComputedStyle 获得最终的应用值。


https://www.w3.org/TR/css3-values/
https://www.w3.org/TR/CSS21/propidx.html



#学号: G20200447060043
#姓名: 陆超
#班期: 6期
#小组: 2组
#作业&总结链接: https://github.com/bobolu/Frontend-06-Template/tree/main/Week%2013