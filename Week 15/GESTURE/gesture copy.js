let element = document.documentElement;

let isListeningMouse = false;

element.addEventListener("mousedown", (event) => {
  console.log("event.button:", event.button);
  let context = Object.create(null);
  contexts.set("mouse" + (1 << event.button), context);

  start(event, context);

  let mousemove = (event) => {
    // event.buttons = 0b11111
    let button = 1;
    while (button <= event.buttons) {
      if (button & event.buttons) {
        // order of buttons property is not same
        // 右键和中间的顺序是相反的
        let key;
        if (button === 2) {
          key = 4;
        } else if (button === 4) {
          key = 2;
        } else {
          key = button;
        }
        let context = contexts.get("mouse" + key);
        move(event, context);
      }

      button = button << 1;
    }
  };
  let mouseup = (event) => {
    let context = contexts.get("mouse" + (1 << event.button));
    end(event, context);
    contexts.delete("mouse" + (1 << event.button));

    if (event.buttons === 0) {
      document.removeEventListener("mousemove", mousemove);
      document.removeEventListener("mouseup", mouseup);
      isListeningMouse = false;
    }
  };
  // capture
  // once
  // passive 能不能 preventDefault

  if (!isListeningMouse) {
    document.addEventListener("mousemove", mousemove);
    document.addEventListener("mouseup", mouseup);
    isListeningMouse = true;
  }
});

let contexts = new Map();
element.addEventListener("touchstart", (event) => {
  for (let touch of event.changedTouches) {
    let context = Object.create(null);
    contexts.set(touch.identifier, context);
    start(touch, context);
  }
});
element.addEventListener("touchmove", (event) => {
  for (let touch of event.changedTouches) {
    let context = contexts.get(touch.identifier);
    move(touch, context);
  }
});
element.addEventListener("touchend", (event) => {
  for (let touch of event.changedTouches) {
    let context = contexts.get(touch.identifier);
    end(touch, context);
    contexts.delete(touch.identifier);
  }
});
element.addEventListener("touchcancel", (event) => {
  for (let touch of event.changedTouches) {
    let context = contexts.get(touch.identifier);
    cancel(touch, context);
    contexts.delete(touch.identifier);
  }
});

let start = (point, context) => {
  context.startX = point.clientX;
  context.startY = point.clientY;
  context.points = [
    {
      t: Date.now(),
      x: point.clientX,
      y: point.clientY,
    },
  ];

  context.isTap = true;
  context.isPan = false;
  context.isPress = false;

  context.handler = setTimeout(() => {
    context.isTap = false;
    context.isPan = false;
    context.isPress = true;
    context.handler = null; // 静默
    console.log("press start");
  }, 500);
};

let move = (point, context) => {
  let dx = point.clientX - context.startX,
    dy = point.clientY - context.startY;
  if (!context.isPan && dx ** 2 + dy ** 2 > 100) {
    context.isTap = false;
    context.isPan = true;
    context.isPress = false;
    console.log("pan start");
    clearTimeout(context.handler);
  }
  if (context.isPan) {
    console.log(dx, dy);
    console.log("pan");
  }
  context.points = context.points.filter((point) => Date.now() - point.t < 500);
  context.points.push({
    t: Date.now(),
    x: point.clientX,
    y: point.clientY,
  });
};

let end = (point, context) => {
  if (context.isTap) {
    // console.log("tap");
    dispatch("tap", {});
    clearTimeout(context.handler);
  }
  if (context.isPan) {
    console.log("pan end");
  }
  if (context.isPress) {
    console.log("press end");
  }
  context.points = context.points.filter((point) => Date.now() - point.t < 500);

  let d, v;
  if (!context.points.length) {
    v = 0;
  } else {
    d = Math.sqrt(
      (point.clientX - context.points[0].x) ** 2 +
        (point.clientY - context.points[0].y) ** 2
    );
    v = d / (Date.now() - context.points[0].t);
  }
  if (v > 1.5) {
    console.log("flick");
    context.isFlick = true;
  } else {
    context.isFlick = false;
  }
  //   console.log('v:',v);
};

let cancel = (point, context) => {
  clearTimeout(context.handler);
  console.log("cancel:", point.clientX, point.clientY);
};

// listen
// recognize
// dispatch

// new Listener(new Recognizer(dispatch))

export function dispatch(type, properties) {
  let event = new Event(type);
  for (let item in properties) {
    event[item] = properties[item];
  }
  element.dispatchEvent(event);
}



export class Listener {
    constructor (element, recognizer) {

    }
}

export class Recognizer {
    constructor (element) {

    }
}

export function enableGesture() {

}