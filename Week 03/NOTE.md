学习笔记
AST 抽象语法树
语法分析算法：LL算法和LR算法

四则运算

词法定义

TokenNumber:.0123456789的组合
Operater:+-*/之一
Whitespace:空格
LineTerminator:终结符

语法定义

<Expression> ::=
<AdditiveExpression><EOF>

<AdditiveExpression> ::=
  <MultiplicativeExpression>
  |<AdditiveExpression><+><MultiplicativeExpression>
  |<AdditiveExpression><-><MultiplicativeExpression>

  <MultiplicativeExpression> ::=
    <Number>
    |<MultiplicativeExpression><*><Number>
    |<MultiplicativeExpression></><Number>

LL语法分析
<AdditiveExpression> ::=
  <MultiplicativeExpression>
  |<AdditiveExpression><+><MultiplicativeExpression>
  |<AdditiveExpression><-><MultiplicativeExpression>

yield、GeneratorFunction
ES6语法，Generator函数，原生具有Iterator接口，会返回一个遍历器对象，`function`关键字与函数名之间有一个星号，函数体内部使用`yield`表达式，定义不同的内部状态。