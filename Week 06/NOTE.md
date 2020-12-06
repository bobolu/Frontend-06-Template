#学习笔记

本周进入了重学javaScript相关内容的部分，从语言的通识展开，认识了产生式的一些基础内容、现代语言的分类、编程语言的相关性质。很多编程语言相关的知识普及内容。

后半部分就从javaScript的最小元素原子开始，开启了javaScript数据类型相关内容的学习。

javaScript 7种类型：Number、String、Boolean、Object、Null、Undefined、Symbol

在设计对象的状态和行为时，需遵循“行为改变状态”的原则。

js中的对象只需关注属性和原型两个部分。

Object原型会一直往上层去查找，知道顶层的原型对象，就是原型链的概念。

Object属性可以是String或Symbol。

js用属性来统一抽象对象状态和行为。

Object原型对象Object.prototype上的方法，是可以直接被Object实例直接使用。

js中一些具有特殊行为的对象：
- Function: 具有方法和执行能力的对象。
- Array: 具有元素数量自行计算更新长度的元素集合的对象。
- Object.prototype: 是没有对象的原型，是没法再设置原型的对象。
- Sting: 具有非负索引位查找字符串特性的对象。
- Map: 引用地址为key的对象。
