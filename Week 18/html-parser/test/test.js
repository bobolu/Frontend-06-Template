var assert = require("assert");

import { parseHTML } from "../src/parser";

describe("parse html testing", function () {
  // 空标签
  it("<a></a>", function () {
    let tree = parseHTML("<a></a>");
    // console.log(tree);
    assert.equal(tree.children[0].tagName, "a");
    assert.equal(tree.children[0].children.length, 0);
  });
  // 标签带文本
  it("<a>123txt</a>", function () {
    let tree = parseHTML("<a>123txt</a>");
    // console.log(tree);
    assert.equal(tree.children[0].tagName, "a");
    assert.equal(tree.children[0].children.length, 1);
  });

  // 属性值单引号
  it("<a id='fs01'></a>", function () {
    let tree = parseHTML("<a id='fs01'></a>");
    // console.log(tree);
    assert.equal(tree.children.length, 1);
    assert.equal(tree.children[0].children.length, 0);
  });

  // 属性值双引号
  it('<a id="fs01"></a>', function () {
    let tree = parseHTML('<a id="fs01"></a>');
    // console.log(tree);
    assert.equal(tree.children.length, 1);
    assert.equal(tree.children[0].children.length, 0);
  });

  // 属性无值
  it("<a id></a>", function () {
    let tree = parseHTML("<a id></a>");
    // console.log(tree);
    assert.equal(tree.children.length, 1);
    assert.equal(tree.children[0].children.length, 0);
  });

  // 属性带值、文本
  it("<a id='id001'>name</a>", function () {
    let tree = parseHTML("<a id='id001'>name</a>");
    // console.log(tree);
    assert.equal(tree.children.length, 1);
    assert.equal(tree.children[0].children.length, 1);
  });

  // 属性值无引号，值后空格
  it("<a id=toto />", function () {
    let tree = parseHTML("<a id=toto />");
    assert.equal(tree.children[0].tagName, "a");
    assert.equal(tree.children[0].children.length, 0);
  });

  // 属性值无引号
  it("<a id=tpp>name</a>", function () {
    let tree = parseHTML("<a id=tpp>name</a>");
    // console.log(tree);
    assert.equal(tree.children.length, 1);
    assert.equal(tree.children[0].children.length, 1);
  });

  // 自闭合标签
  it("<a/>", function () {
    let tree = parseHTML("<a/>");
    // console.log(tree);
    assert.equal(tree.children[0].tagName, "a");
    assert.equal(tree.children[0].children.length, 0);
  });

  // 2个属性带值
  it('<a id="id002" type="code2info"></a>', function () {
    let tree = parseHTML('<a id="i02" dtype="code2info"></a>');
    // console.log(tree);
    assert.equal(tree.children[0].tagName, "a");
    assert.equal(tree.children[0].attributes.length, 2);
  });

  // 自闭和标签属性值无引号
  it("<a id=tpp>name</a>", function () {
    let tree = parseHTML("<a id=tpp/>");
    // console.log(tree);
    assert.equal(tree.children.length, 1);
    assert.equal(tree.children[0].children.length, 0);
  });

  // 内联样式style
  it('<a style="color:red;" />', function () {
    let tree = parseHTML("<a style='color:red;' />");
    assert.equal(tree.children[0].tagName, "a");
    assert.equal(tree.children[0].children.length, 0);
  });
  // 内联样式style
  it('<a class="navlink" id="about" style="color:red;" />', function () {
    let tree = parseHTML(
      '<a class="navlink title" id="about" style="color:red;font-size:16px;">title</a>'
    );
    assert.equal(tree.children[0].tagName, "a");
    assert.equal(tree.children[0].children.length, 1);
  });

  // <>处理成文本
  it("<>", function () {
    let tree = parseHTML("<>");
    assert.equal(tree.children.length, 1);
    assert.equal(tree.children[0].type, "text");
  });
  // 属性值为空
  it("<a tp=''/>", function () {
    let tree = parseHTML("<a tp=''/>");
    assert.equal(tree.children.length, 1);
    assert.equal(tree.children[0].children.length, 0);
  });

  // 242-249 afterAttributeName = 后面的空格
  it("<a id='co1' nbility= \"tr\" ></a>", function () {
    let tree = parseHTML("<a id='co1' nbility= \"tr\" ></a>");
    assert.equal(tree.children.length, 1);
    assert.equal(tree.children[0].children.length, 0);
  });

  // html
  it('<html lang="zh-CN"> <head> <title>test html</title> <style> * { margin: 0; padding: 0; } .testp { font-size:16px; } </style> </head> <body> <div><img class="cscs" /></div> <div><img id="cs" /></div> <p class="testp">this is a p </p> </body> </html>', function () {
    let tree = parseHTML(
      '<html lang="zh-CN"> <head> <title>test html</title> <style> * { margin: 0; padding: 0; } .testp { font-size:16px; } </style> </head> <body> <div><img class="cscs" /></div> <div><img id="cs" /></div> <p class="testp">this is a p </p> </body> </html>'
    );
    // console.log(JSON.stringify(tree));
    assert.equal(tree.children.length, 1);
    assert.equal(tree.children[0].children.length, 5);
  });
  // 
  it('<html lang="zh-CN"> <head> <title>test html</title> <style> * { margin: 0; padding: 0; } .testp { font-size:16px; } </style> </head> <body> <div><img class="cscs" /></div> <div><img id="cs" /></div> <p class="testp">this is a p </p> </body> </html>', function () {
    let tree = parseHTML(
      '<html lang="zh-CN"> <head> <title>test html</title> <style> #container { margin: 0; padding: 0; display: flex; width: 500px; height: 300px; background-color: rgb(255,255,255); } #container #myid { width: 200px; height: 100px; background-color: rgb(255,0,0); } #container .c1 { flex: 1; background-color: rgb(0,255,0); } .c1 { flex: 1; background-color: purple; } </style> </head> <body> <div id="container"> <div id="myid"></div> <div class="c1"></div> </div> </body> </html>'
    );
    // console.log(tree);
    assert.equal(tree.children.length, 1);
    assert.equal(tree.children[0].children.length, 5);
  });
  //compare(sp1, sp2) // css优先级相关[0,0,0,0]
  it('<html lang="zh-CN"> <head> <title>test html</title> <style> * { margin: 0; padding: 0; } .testp { font-size:16px; } </style> </head> <body> <div><img class="cscs" /></div> <div><img id="cs" /></div> <p class="testp">this is a p </p> </body> </html>', function () {
    let tree = parseHTML(
      '<html lang="zh-CN"> <head> <title>test html</title> <style> #container { margin: 0; padding: 0; display: flex; width: 500px; height: 300px; background-color: rgb(255,255,255); } #container #myid { width: 200px; height: 100px; background-color: rgb(255,0,0); } #container .c1 { flex: 1; background-color: rgb(0,255,0); } .c1 { flex: 1; background-color: purple;} div#testsp span { font-size:22px;background-color: blue;} </style> </head> <body> <div id="container"> <div id="myid"></div> <div id="testsp" class="c1" style="font-size:12px;"><span>tsp</span></div> </div> </body> </html>'
    );
    // console.log(tree);
    assert.equal(tree.children.length, 1);
    assert.equal(tree.children[0].children.length, 5);
  });


  // https://html.spec.whatwg.org/multipage/parsing.html#after-attribute-name-state
  it("<a nbility id/>", function () {
    let tree = parseHTML(
      "<a nbility id />"
    );
    assert.equal(tree.children.length, 1);
    assert.equal(tree.children[0].children.length, 0);
  });


  // 至此，行覆盖率92.31%，Funcs覆盖率100%，Branch覆盖率80.23%，Stmts覆盖率92.42%
});
