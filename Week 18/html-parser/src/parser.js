const css = require("css");
const EOF = Symbol("EOF");

let currentToken = null;
let currentAttribute = null;
let stack;
let currentTextNode = null;

function emit(token) {
  let top = stack[stack.length - 1];

  if (token.type === "startTag") {
    let element = {
      type: "element",
      children: [],
      attributes: []
    };
    element.tagName = token.tagName;

    for (let p in token) {
      if (p !== "type" && p !== "tagName") {
        element.attributes.push({
          name: p,
          value: token[p]
        });
      }
    }
    computeCSS(element);
    top.children.push(element);
    if (!token.isSelfClosing) {
      stack.push(element);
    }
    currentTextNode = null;
  } else if (token.type === "endTag") {
    if (top.tagName === token.tagName) {
      if (top.tagName === "style") {
        addCSSRules(top.children[0].content);
      }
      // 暂不处理link方式引入外部样式表的情况
      stack.pop();
    } else {
      throw new Error("Tag start end dosn't match!");
    }
    currentTextNode = null;
  } else if (token.type === "text") {
    if (currentTextNode === null) {
      currentTextNode = {
        type: "text",
        content: ""
      };
      top.children.push(currentTextNode);
    }
    currentTextNode.content += token.content;
  }
}
let rules = []; // CSS规则暂存在数组里
function addCSSRules(txt) {
  let ast = css.parse(txt);
  rules.push(...ast.stylesheet.rules);
}
function match(ele, selector) {
  if (!selector || !ele || !ele.attributes) {
    return false;
  }

  if (selector.charAt(0) === "#") {
    let attr = ele.attributes.filter((attr) => attr.name === "id")[0];
    if (attr && attr.value === selector.replace("#", "")) {
      return true;
    }
  } else if (selector.charAt(0) === ".") {
    let attr = ele.attributes.filter((attr) => attr.name === "class")[0];
    if (attr && attr.value === selector.replace(".", "")) {
      return true;
    }
  } else {
    if (ele.tagName === selector) {
      return true;
    }
  }
  return false;
}
function computeCSS(ele) {
  let elements = stack.slice().reverse();
  if (!ele.computedStyle) {
    ele.computedStyle = {};
  }
  for (let rule of rules) {
    let selectorParts = rule.selectors[0].split(" ").reverse();

    if (!match(ele, selectorParts[0])) {
      continue;
    }

    let matched = false;

    let j = 1;
    for (let i = 0; i < elements.length; i++) {
      if (match(elements[i], selectorParts[j])) {
        j++;
      }
    }

    if (j >= selectorParts.length) {
      matched = true;
    }
    if (matched) {
      // 如果匹配到，就要加入
      // console.log("ele", ele, "matched rule", rule);
      let sp = specificity(rule.selectors[0]);
      let computedStyle = ele.computedStyle;
      for (let declar of rule.declarations) {
        if (!computedStyle[declar.property]) {
          computedStyle[declar.property] = {};
        }

        if (!computedStyle[declar.property].specificity) {
          computedStyle[declar.property].value = declar.value;
          computedStyle[declar.property].specificity = sp;
        } else if (
          compare(computedStyle[declar.property].specificity, sp) < 0
        ) {
          computedStyle[declar.property].value = declar.value;
          computedStyle[declar.property].specificity = sp;
        }
      }
    }
  }
}

function specificity(selector) {
  let p = [0, 0, 0, 0];
  let selectorParts = selector.split(" ");
  for (let part of selectorParts) {
    if (part.charAt(0) === "#") {
      p[1] += 1;
    } else if (part.charAt(0) === ".") {
      p[2] += 1;
    } else {
      p[3] += 1;
    }
  }
  return p;
}

function compare(sp1, sp2) {
  if (sp1[0] - sp2[0]) {
    return sp1[0] - sp2[0];
  }
  if (sp1[1] - sp2[1]) {
    return sp1[1] - sp2[1];
  }
  if (sp1[2] - sp2[2]) {
    return sp1[2] - sp2[2];
  }
  return sp1[3] - sp2[3];
}

function dealdata(c) {
  if (c === "<") {
    return tagOpen;
  } else if (c === EOF) {
    emit({
      type: "EOF"
    });
    return;
  } else {
    emit({
      type: "text",
      content: c
    });
    return dealdata;
  }
}
function tagOpen(c) {
  if (c === "/") {
    return endTagOpen;
  } else if (c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: "startTag",
      tagName: ""
    };
    return tagName(c);
  } else {
    emit({
      type: "text",
      content: c
    });
    return dealdata;
  }
}
function endTagOpen(c) {
  if (c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: "endTag",
      tagName: ""
    };
    return tagName(c);
  } else if (c === ">") {
  } else if (c === EOF) {
  } else {
  }
}
function tagName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if (c === "/") {
    return selfClosingStartTag;
  } else if (c.match(/^[a-zA-Z]$/)) {
    currentToken.tagName += c; // .toLowerCase()
    return tagName;
  } else if (c === ">") {
    emit(currentToken);
    return dealdata;
  } else {
    return tagName;
  }
}

function beforeAttributeName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if (c === ">" || c === "/" || c === EOF) {
    return afterAttributeName(c);
  } else if (c === "=") {
  } else {
    currentAttribute = {
      name: "",
      value: ""
    };
    return attributeName(c);
  }
}
function afterAttributeName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return afterAttributeName;
  } else if (c === "/") {
    return selfClosingStartTag;
  } else if (c === "=") {
    return beforeAttributeValue;
  } else if (c === ">") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return dealdata;
  } else if (c === EOF) {
  } else {
    // https://html.spec.whatwg.org/multipage/parsing.html#after-attribute-name-state
    // Start a new attribute in the current tag token. Set that attribute name and value to the empty string. Reconsume in the attribute name state.
    currentToken[currentAttribute.name] = currentAttribute.value;
    currentAttribute = {
      name: "",
      value: ""
    };
    return attributeName(c);
  }
}
// https://html.spec.whatwg.org/multipage/parsing.html#attribute-name-state
function attributeName(c) {
  if (c.match(/^[\t\n\f ]$/) || c === "/" || c === ">" || c === EOF) {
    return afterAttributeName(c);
  } else if (c === "=") {
    return beforeAttributeValue;
  } else if (c === "\u0000") {
  } else if (c === '"' || c === "'" || c === "<") {
  } else {
    currentAttribute.name += c;
    return attributeName;
  }
}
function beforeAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/) || c === "/" || c === ">" || c === EOF) {
    return beforeAttributeValue;
  } else if (c === '"') {
    return doubleQuotedAttributeValue;
  } else if (c === "'") {
    return singleQuotedAttributeValue;
  } else if (c === ">") {
  } else {
    return unquotedAttributeValue(c);
  }
}
//
function doubleQuotedAttributeValue(c) {
  if (c === '"') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return afterQuotedAttributeValue;
  } else if (c === "\u0000") {
  } else if (c === EOF) {
  } else {
    currentAttribute.value += c;
    return doubleQuotedAttributeValue;
  }
}
//
function singleQuotedAttributeValue(c) {
  if (c === "'") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return afterQuotedAttributeValue;
  } else if (c === "\u0000") {
  } else if (c === EOF) {
  } else {
    currentAttribute.value += c;
    return singleQuotedAttributeValue;
  }
}
//
function afterQuotedAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if (c === "/") {
    return selfClosingStartTag;
  } else if (c === ">") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return dealdata;
  } else if (c === EOF) {
  } else {
    // currentAttribute.value += c;
    // return doubleQuotedAttributeValue;
    // error 处理
    throw new Error("unexpected charater '" + c + "\'");
  }
}
//
function unquotedAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return beforeAttributeName;
  } else if (c === "/") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return selfClosingStartTag;
  } else if (c === ">") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return dealdata;
  } else if (c === "\u0000") {
  } else if (c === '"' || c === "'" || c === "<" || c === "=" || c === "`") {
  } else if (c === EOF) {
  } else {
    currentAttribute.value += c;
    return unquotedAttributeValue;
  }
}
//
function selfClosingStartTag(c) {
  if (c === ">") {
    currentToken.isSelfClosing = true;
    emit(currentToken);
    return dealdata;
  } else if (c === EOF) {
  } else {
  }
}
//
export function parseHTML(html) {
  stack = [{ type: "document", children: [] }];
  currentToken = null;
  currentAttribute = null;
  currentTextNode = null;
  rules = [];
  let state = dealdata;
  for (let c of html) {
    state = state(c);
  }
  state = state(EOF);
  return stack[0];
}
