import Vue from "Vue";
import HelloWorld from "./HelloWorld.vue";

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  render: (h) => h(HelloWorld)
});
