import { ease, easeIn } from "./ease.js";
import { Timeline, Animation } from "./animation.js";

let tl = new Timeline()
tl.start();

tl.add(new Animation(document.querySelector("#el").style,"transform",0,500,2000,0,easeIn,v=>`translateX(${v}px)`))

document.querySelector("#el2").style.transition = 'transform ease-in 2s'
document.querySelector("#el2").style.transform = 'translate(500px)'

document.querySelector("#pause-btn").addEventListener("click", ()=> tl.pause());
document.querySelector("#resume-btn").addEventListener("click", ()=> tl.resume());
// document.querySelector("#reset-btn").addEventListener("click", ()=> tl.reset());