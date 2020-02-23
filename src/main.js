import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import "@/assets/css/tailwind.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import LoadScript from "vue-plugin-load-script";
import VideoEmbed from "v-video-embed";

Vue.use(LoadScript);
Vue.use(VideoEmbed);
Vue.loadScript("/js/custom.js");
Vue.loadScript("/js/pdfobject.js");
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
