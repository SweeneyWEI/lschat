import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI, { Main } from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
import {Message, Notification} from "element-ui";
// import VueRouter from "vue-router";

Vue.config.productionTip = false;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

Vue.use(ElementUI);
//
// Vue.use(VueRouter);
//
// const routers = new VueRouter({
//   routers: router
// });

new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});


let Ctor = Vue.extend(Main);
new Ctor().$mount('#app');

