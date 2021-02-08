import { Component } from "./framework.js";
export class Carousel extends Component {
  constructor() {
    super();
    this.attributes = Object.create(null);
  }
  setAttribute(name, value) {
    this.attributes[name] = value;
  }
  mountTo(parent) {
    parent.appendChild(this.render());
  }
  render() {
    console.log("window.innerWidth:",window.innerWidth)

    this.root = document.createElement("div");
    this.root.classList.add("carousel");
    for (let item of this.attributes.src) {
      let child = document.createElement("div");
      child.style.backgroundImage = `url('${item}')`;
      this.root.appendChild(child);
    }

    let position = 0;
    // 手动切换轮播
    this.root.addEventListener("mousedown", (event) => {
      console.log(event)
      let startX = event.clientX;
      let children = this.root.children;
      let evw = event.view.innerWidth;

      let move = (event) => {
        let x = event.clientX - startX;

        let current = position - Math.round((x - x % evw) / evw)
        for(let offset of [-1,0,1]) {
          let pos = current + offset;
          pos = (pos + children.length) % children.length
          children[pos].style.transition = "none";
          children[pos].style.transform = `translateX(${ - evw * pos + offset * evw + x }px)`;      
        }
      };
      let up = (event) => {
        let x = event.clientX - startX;
        position = position - Math.round(x / evw);

        for(let offset of [0, - Math.sign(Math.round(x / evw) - x + evw / 2 * Math.sign(x))]) {
          let pos = position + offset;
          pos = (pos + children.length) % children.length
          children[pos].style.transition = "";
          children[pos].style.transform = `translateX(${ - evw * pos + offset * evw }px)`;      
        }
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
      };

      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    });
    // 自动定时轮播
    // let currentIndex = 0;
    // setInterval(()=> {
    //   let children  = this.root.children;
    //   let nextIndex = (currentIndex + 1) % children.length;

    //   let current = children[currentIndex]
    //   let next = children[nextIndex]

    //   next.style.transition = 'none'
    //   next.style.transform = `translateX(${100 - nextIndex * 100}%)`

    //   setTimeout(()=>{
    //     next.style.transition = ''
    //     current.style.transform = `translateX(${-100 - nextIndex * 100}%)`
    //     next.style.transform = `translateX(${- nextIndex * 100}%)`
    //     currentIndex = nextIndex;
    //   },10)
    // },3000)
    return this.root;
  }
}