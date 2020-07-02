import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import {Message, Notification} from "element-ui";
import "./assets/js/iconfont.js";

Vue.config.productionTip = false;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

Vue.use(ElementUI);

new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
