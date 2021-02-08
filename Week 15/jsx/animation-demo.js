// import { Component, createElement } from "./framework.js";
import { ease, easeIn } from "./ease.js";
import { Timeline, Animation } from "./animation.js";

// let imgs = [
//   "https://static001.geekbang.org/resource/image/65/9a/6590fb3f37a385b8d88b8679529e9c9a.jpg",
//   "https://static001.geekbang.org/static/university/img/banner-bg-content@2x.38f12e0f.png",
//   "https://static001.geekbang.org/resource/image/7a/30/7a9547384cffa039f063db1fc7669a30.jpg",
//   "https://static001.geekbang.org/resource/image/6a/9b/6aec0a09381a2f74014ec604ef99c19b.png",
//   "https://static001.geekbang.org/resource/image/cb/cb/cbb6d198ccfb95af4906eeb0581333cb.png"
// ];
// let a = <Carousel src={imgs}></Carousel>;

// a.mountTo(document.body);

let tl = new Timeline()
tl.start();

tl.add(new Animation(document.querySelector("#el").style,"transform",0,500,2000,0,easeIn,v=>`translateX(${v}px)`))

document.querySelector("#el2").style.transition = 'transform ease-in 2s'
document.querySelector("#el2").style.transform = 'translate(500px)'

document.querySelector("#pause-btn").addEventListener("click", ()=> tl.pause());

document.querySelector("#resume-btn").addEventListener("click", ()=> tl.resume());
document.querySelector("#reset-btn").addEventListener("click", ()=> tl.reset());
// window.tl = tl;
// window.animation = new Animation({set a(v) {console.log(v)}},"a",0,100,1000,null);
// // tl.add(new Animation({set a(v){console.log(v)}},"a",0,100,1000,null));
// tl.start()
