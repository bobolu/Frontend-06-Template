# 20周学习笔记

本周课程作为训练营最后一期内容，涉及持续集成和发布系统发布前检查的相关内容。

客户端持续集成的两个概念：daily build 和 BVT（构建验证测试 build verification test）

前端的持续集成，快节奏，短周期，一般采用较轻的检查方式：代码风格和校验常见代码模式。利用无头浏览器把 DOM 树生成，配合规则校验能够完成 BVT （构建验证测试 build verification test）的任务。

## 1.Git Hooks 确认检查时机

参考文档：
https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks

基本用法：
```
git init
git status
git add .
git commit -a -m "提交相关信息"
git log

// 进入 .git/hooks 目录，新建 pre-commit 文件，chmod 修改权限，
// #!/usr/bin/env node 使用 node 来执行脚本
// let process = require("process"); //引入 precess 模块，加入修改逻辑，即可有条件的拦截
// process.exitCode = 1; // 如果不符合规则，则拦截, commit 不成功

```


## 2.ESLint 轻量级的代码检查方案

参考文档：
https://eslint.org/


基本用法：
```

npm install eslint --save-dev

npx eslint --init

npx eslint yourfile.js
```

lint 和 hooks 结合，如果 eslint 有 error 报错则无法 commit:
```
#!/usr/bin/env node
const process = require("process");
const child_process = require("child_process");
const { ESLint } = require("eslint");

function exec(name) {
  return new Promise(function (resolve) {
    child_process.exec(name, resolve);
  });
}

(async function main() {
  // 1. Create an instance with the `fix` option.
  const eslint = new ESLint({ fix: false });

  // 2. Lint files. This doesn't modify target files.
  await exec('git stash push -k')
  const results = await eslint.lintFiles(["index.js"]);
  await exec('git stash pop')

  // 3. Modify the files with the fixed code.
  // await ESLint.outputFixes(results);

  // 4. Format the results.
  const formatter = await eslint.loadFormatter("stylish");
  const resultText = formatter.format(results);

  // 5. Output it.
  console.log(resultText);

  for(let result of results) {
    if(result.errorCount) { // 如果有错误，则推出
      process.exitCode = 1; 
    }
  }
})().catch((error) => {
  process.exitCode = 1;
  console.error(error);
});

```
## 3.利用无头浏览器 DOM 树生成，做规则校验和检查

### chrome无头浏览器模式

参考文档：
http://developers.google.com/web/updates/2017/04/headless-chrome

基本用法：
```
// 添加快捷方式
alias chrome="/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome"

// --dump-dom 页面dom树打印， > 输出到文件
chrome --headless --dump-dom about:blank > tmp.txt

// 可以用 Node 的 child_process 子进程去掉用

// Puppeteer 可以更方便的去使用 headless-chrome 进行自动化调试等任务

```

### Puppeteer
Puppeteer 是一个由 Chrome 团队开发的 Node 库，可用于自动化进行浏览器测试。它隐藏了 DevTools 协议的复杂性，并可以处理诸如启动 Chrome 调试实例、数据抓取等任务。
查看 Puppeteer 的文档，了解完整 API 的更多信息。

参考文档：
https://npmjs.com/package/puppeteer

基本用法：
```
const puppeteer = require('puppeteer');

(async () => {
    /* 1.新建一个无头浏览器的实例 */
  const browser = await puppeteer.launch({
      headless: false
  });
  /* 2.新建一个页面 */
  const page = await browser.newPage();
  /* 3.到达某个页面 */
  await page.goto('http://localhost:8888');
  /* 4.在页面停顿3s */
  await page.waitForTimeout(3000)
  /* 5.截图 */
  await page.screenshot({path: 'example.png'});
  /* 6.获取dom */
  const a = await page.$('a');
  console.log(await a.asElement().boxModel());
  /* 7.获取图片 */
  const imgs = await page.$$('a');
  console.log(imgs);
  /* 8.关闭浏览器 */
  await browser.close();

})();
```

参考资料
1. Git-Hooks: https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks
2. eslint: https://eslint.org/
3. headless-chrome: https://developers.google.com/web/updates/2017/04/headless-chrome
4. puppeteer: https://npmjs.com/package/puppeteer
