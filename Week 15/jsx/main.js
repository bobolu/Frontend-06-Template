import { Component, createElement } from "./framework.js";
import { Carousel } from "./carousel.js";
import { Timeline, Animation } from "./animation.js";

let imgs = [
  "https://static001.geekbang.org/resource/image/65/9a/6590fb3f37a385b8d88b8679529e9c9a.jpg",
  "https://static001.geekbang.org/static/university/img/banner-bg-content@2x.38f12e0f.png",
  "https://static001.geekbang.org/resource/image/7a/30/7a9547384cffa039f063db1fc7669a30.jpg",
  "https://static001.geekbang.org/resource/image/6a/9b/6aec0a09381a2f74014ec604ef99c19b.png",
  "https://static001.geekbang.org/resource/image/cb/cb/cbb6d198ccfb95af4906eeb0581333cb.png"
];
let a = <Carousel src={imgs}></Carousel>;

a.mountTo(document.body);

let tl = new Timeline()
tl.add(new Animation({},"a",0,100,1000,null));
tl.start()