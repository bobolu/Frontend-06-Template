# 学习笔记

## JS表达式 ｜ 运算符和表达式

语法：语法树和运算符优先级的关系，运算符的左值和右值的区别

运行时：类型转换和引用类型

### 运算符优先级

运算符的优先级，用于确定一个表达式的计算顺序。在不能确定优先级时，可以通过使用括号显式声明运算符的优先级。
[Expressions_and_Operators]

|  Operator type | Individual operators |
|  ----  | ----  |
| member | . [] |
| call / create instance | () new |
| negation/increment | ! ~ - + ++ -- typeof void delete |
| multiply/divide |	* / % |
| addition/subtraction |	+ - |
| bitwise shift |	<< >> >>> |
| relational |	< <= > >= in instanceof |
| equality |	== != === !== |
| bitwise-and |	& |
| bitwise-xor |	^ |
| bitwise-or |	\| |
| logical-and |	&& |
| logical-or |	\|\| |
| conditional |	?: |
| assignment |	= += -= *= /= %= <<= >>= >>>= &= ^= \|= |
| comma |	, |


Logical（&& ||）和 Conditional（?:）都存在短路逻辑，不能保证结构里面的表达式都被执行。&&前半部分得到false，后半部分不会去执行；||前半部分得到true，后半部分不会去执行。

### 类型转换

类型转换比较复杂，尽量使用三等号去比较，避免不必要的麻烦。
Object的key

JavaScript 7中基本类型的互相转换

|           | Number    | String    | Boolean   | Undefined | Null      | Object    | Symbol    |
|:----------|:----------|:----------|:----------|:----------|:----------|:----------|:----------|
| Number    | -         |           | 0 false   | X         | X         | Boxing    | X         |
| String    |           | -         | "" flase  | X         | X         | Boxing    | X         |
| Boolean   | true 1<br>false 0 |'true'<br>'false' |- | X         | X         | Boxing    | X         |
| Undefined | NaN       |'Undefined' | false    | -         | X         | X         | X         |
| Null      | 0         | 'null'    | false     | X         | -         | X         | X         |
| Object    | valueOf  | valueOf<br>toString |true | X        | X         | -         | X         |
| Symbol    | X         | X         |  X        | X         | X         | Boxing    | -         |

### 运行时相关概念

Grammar （简单语句、声明、组合语句）和 Runtime（Completion Record、 Lexical Environment）

Completion Record 语句完成状态记录
- [[type]]: normal, break, continue, return, or throw
- [[value]]: 基本类型
- [[target]]: label

JS执行粒度（运行时）
- 宏任务
- 微任务（Promise）
- 函数调用（Execution Context）
- 语句/声明（Completion Record）
- 表达式（Reference）
- 直接量/变量/this ......


[Expressions_and_Operators]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Expressions_and_Operators
