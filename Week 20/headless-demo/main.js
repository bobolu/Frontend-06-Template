const puppeteer = require('puppeteer');

(async () => {
    /* 1.新建一个无头浏览器的实例 */
  const browser = await puppeteer.launch();
  /* 2.新建一个页面 */
  const page = await browser.newPage();
  /* 3.到达某个页面 */
  await page.goto('http://127.0.0.1:5500/Week%2016/jsx/dist/main.html');
  /* 4.在页面停顿3s */
  await page.waitForTimeout(3000)
  /* 5.截图 */
  // await page.screenshot({path: 'example.png'});
  /* 6.获取dom */
  const divs = await page.$('div');
  console.log(await divs.asElement().boxModel());
  /* 7.获取图片 */
  const imgs = await page.$$('div');
  console.log(imgs);
  /* 8.关闭浏览器 */
  await browser.close();

})();