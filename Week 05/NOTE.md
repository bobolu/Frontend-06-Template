#学习笔记

进入到第 5 周的编程训练，探究了 Vue3.0 的 reactive 的实现原理。涉及 Proxy 的使用，底层库设计的一个特性。

```javascript
let object = { a: 1, b: 2 }

let po = new reactive(object)
// reactive接收一个对象，返回一个响应式数据对象
function reactive(object) {
  // 通过Proxy 将对象变为响应式
  return new Proxy(object, {
    set(obj, prop, val) {
      obj[prop] = val
      console.log(obj, prop, val)
      return obj[prop]
    },
    get(obj, prop) {
      console.log(obj, prop)
      return obj[prop]
    }
  })
}
```

Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。ES6 原生提供 Proxy 构造函数，用来生成 Proxy 实例。

```javascript
var proxy = new Proxy(target, handler)
```

handler 参数也是一个对象，用来定制拦截行为。

Vue 通过 effect 方法，通过 reactive 的 get 方法去获得监听的效果，注册进全局的 usedReactivities 数组。
callbacks 缓存 callback ，用来通过 Object 作为 key 去找到 reactivity 。

reactive 的 get 获得的 prop 是一个对象的时候，给他套一层reactive。

```javascript
let object = { a: { b: 33 }, b: 2 }

let callbacks = new Map()

let reactivities = new Map() // 全局，缓存reactive

let usedReactivities = [] // 调用属性方法存放的数组

let po = new reactive(object)

effect(() => {
  console.log("effect:", po.a.b)
})

function effect(callback) {
  usedReactivities = []
  callback()
  console.log("effect usedReactivities:", usedReactivities)

  for (let reactivity of usedReactivities) {
    if (!callbacks.has(reactivity[0])) {
      callbacks.set(reactivity[0], new Map())
    }
    if (!callbacks.get(reactivity[0]).has(reactivity[1])) {
      callbacks.get(reactivity[0]).set(reactivity[1], [])
    }
    // 上述已排除空的情况
    callbacks.get(reactivity[0]).get(reactivity[1]).push(callback)
  }
}

function reactive(object) {
  if (reactivities.has(object)) {
    return reactivities.get(object)
  }
  let proxy = new Proxy(object, {
    set(obj, prop, val) {
      obj[prop] = val
      if (callbacks.get(obj))
        if (callbacks.get(obj).get(prop))
          for (let callback of callbacks.get(obj).get(prop)) {
            callback()
          }
      return obj[prop]
    },
    get(obj, prop) {
      usedReactivities.push([obj, prop])
      if (typeof obj[prop] === "object") {
        return reactive(obj[prop])
      }
      return obj[prop]
    }
  })

  reactivities.set(object, proxy)

  return proxy
}
```
