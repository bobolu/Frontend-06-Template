import { Component, createElement } from "./framework.js";
import { Carousel } from "./Carousel.js";
import { Timeline, Animation } from "./animation.js";

let imgs = [
  {title:"t1", url:"https://www.baidu.com", img:"https://static001.geekbang.org/resource/image/65/9a/6590fb3f37a385b8d88b8679529e9c9a.jpg"},
  {title:"t2", url:"https://www.taobao.com", img:"https://static001.geekbang.org/static/university/img/banner-bg-content@2x.38f12e0f.png"},
  {title:"t3", url:"https://www.qq.com", img:"https://static001.geekbang.org/resource/image/7a/30/7a9547384cffa039f063db1fc7669a30.jpg"},
  {title:"t4", url:"https://www.alipay.com", img:"https://static001.geekbang.org/resource/image/6a/9b/6aec0a09381a2f74014ec604ef99c19b.png"},
  {title:"t5", url:"https://www.51job.com", img:"https://static001.geekbang.org/resource/image/cb/cb/cbb6d198ccfb95af4906eeb0581333cb.png"}
];

let a = <Carousel src={imgs} 
  onChange={event => console.log(event.detail.position) }
  onClick={event => window.location.href = event.detail.data.url }></Carousel>;

a.mountTo(document.body);

// let tl = new Timeline()
// window.tl = tl;
// window.animation = new Animation({set a(v) {console.log(v)}},"a",0,100,1000,null);
// // tl.add(new Animation({set a(v){console.log(v)}},"a",0,100,1000,null));
// tl.start()

// 
// Button组件测试
// 
// import { Component, createElement } from "./framework.js";
// import { Carousel } from "./carousel.js";
// import { Button } from "./Button.js";
// // let a = <Button>ss2s</Button>
// // a.mountTo(document.body);

// 
// List组件测试
// 
// import { Component, createElement } from "./framework.js";
// import { Carousel } from "./carousel.js";
// import { Button } from "./Button.js";
// import { List } from "./List.js";
// let a = <List data={imgs}>
// {
//   (item) => <div>
//       <img src={item.img}></img>
//       <a href={item.url}>{item.title}</a>
//     </div>
// }
// </List>
// a.mountTo(document.body);