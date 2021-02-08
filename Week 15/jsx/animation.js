const TICK = Symbol("tick")
const TICK_HANDLER = Symbol("tick-handler")
const ANIMATIONS = Symbol("animations")

export class Timeline {
  constructor() {
    
    this[ANIMATIONS] = new Set();
  }
  start() {
    let startTime = Date.now()
    this[TICK] = () => {
      // console.log("tick");
      for(let animation of this[ANIMATIONS]){
        animation.receiveTime(Date.now() - startTime)
      }
      requestAnimationFrame(this[TICK]);
    }

    this[TICK]()
  }
  // set rate() {}
  // get rate() {}

  pause() {}
  resume() {}

  reset() {}
  add(animation) {
    this[ANIMATIONS].add(animation)
  }
}

export class Animation {
  constructor(object, property, startValue, endValue, duration, timingFunction) {
    this.object = object;
    this.property = property;
    this.startValue = startValue;
    this.endValue = endValue;
    this.duration = duration;
    this.timingFunction = timingFunction;
  }
  receiveTime(time) {
    console.log(time)
    let range =this.endValue - this.startValue;
    this.object[this.property] = this.startValue + range * time / this.duration
  }
}