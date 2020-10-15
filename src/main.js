// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// Vue.config.productionTip = false

//引入css重置样式
import "./assets/css/reset.css"
//公共组件
import "./components"
//过滤器
import "./filters"
//vuex
import store from "./store"

//element-ui
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css"
Vue.use(ElementUI)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
