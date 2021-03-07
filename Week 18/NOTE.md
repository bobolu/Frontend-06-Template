# 学习笔记
第18周的学习，继续工具链相关的内容学习，涉及单元测试工具的实践。

组件或库高度复用，测试的收益高，尽量使用单元测试

## mocha
当前较流行的单元测试库之一

```
import { add, mul } from "../index";
<!-- 测试用例 -->
describe("add function testing", function () {
  it("1+2 should be 3", function () {
    assert.equal(add(1, 2), 3);
  });

  it("-5+2 should be -3", function () {
    assert.equal(add(-5, 2), -3);
  });

  it("-5*2 should be -10", function () {
    assert.equal(mul(-5, 2), -10);
  });
});

```

## nyc
code coverage 得到单元测试中重要的几个指标。
- Lines 覆盖率
- Funcs 覆盖率
- Stmts
- Branch


经各种测试案例，结合代码逻辑判断，nyc提供的为覆盖行信息，不断去完善测试用例，最终行覆盖率92.31%，Funcs覆盖率100%，Branch覆盖率80.23%，Stmts覆盖率92.42%。





