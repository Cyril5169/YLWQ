// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'//引入element样式表
// import Viewer from 'n'
// import 'viewerjs/dist/viewer.css'

// import vueDirectiveImagePreviewer from 'vue-directive-image-previewer'
// import 'vue-directive-image-previewer/dist/assets/style.css'

// import preview from 'vue-photo-preview'
// import 'vue-photo-preview/dist/skin.css'

import App from './App'
import router from './router'
import Axios from 'axios'
import VDistpicker from 'v-distpicker'

//展示图片的那个插件
// import Viewer from 'v-viewer'
// import 'viewerjs/dist/viewer.css'

import store from './store'

Vue.config.productionTip = false

// Axios.defaults.baseURL = 'http://119.23.17.111:8081';//原服务器
Axios.defaults.baseURL = 'http://14.29.221.4:10250';//玉兰服务器
Vue.prototype.$axios = Axios
Vue.component('v-distpicker', VDistpicker)
Vue.use(ElementUI);
// Vue.use(Element, { size: 'small', zIndex: 3000 });

// Vue.use(Viewer, {
//   defaultOptions: {
//       zIndex: 9999
//   }
// })
// Vue.use(vueDirectiveImagePreviewer)
// Vue.use(preview)

//引入全局变量
Vue.prototype.Global = {
  baseUrl: baseUrl,//订单url
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
