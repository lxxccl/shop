import Vue from 'vue'
import App from './App.vue'
//路由组件
import router from '@/router'
//三级导航注册为全局组件
import TypeNav from '@/components/TypeNav'
//分页器
import Pagination from '@/components/pagination'
//引入mockServe文件,让咱们模拟接口跑起来
import '@/mock/mockServe.js'
//轮播图样式
import 'swiper/css/swiper.min.css'
//vuex小仓库
import store from '@/store'
//elementUI按需引入
import { Button, Row, Col, MessageBox, Message, Input } from 'element-ui'
//将项目全部请求函数引入进来[分别暴露]
import * as http from '@/api'
//懒加载插件
import VueLazyLoad from 'vue-lazyload'
//引入懒加载的图片
import loadimage from '@/assets/load.gif'
//引入表单验证插件
import '@/plugins/validate.js'
Vue.use(VueLazyLoad, {
  loading: loadimage
})

Vue.config.productionTip = false
//组成为全局组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Pagination.name, Pagination)
//element-ui大多数组件，注册为全局组件Vue.component|Vue.use
Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Input)
//按需引入写法不同的:MessageBox、Message、Loading、Notification
Vue.prototype.$msgbox = MessageBox
//消息提示框
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$message = Message

new Vue({
  //配置全局事件总线
  beforeCreate() {
    //配置全局事件总线
    Vue.prototype.$bus = this
    Vue.prototype.$http = http
  },
  //下面代码作用:给项目添加路由功能,给全部VC实例身上拥有两个属性,$router|$route
  router,
  //下面的代码作用:给项目添加仓库功能,主要的作用是给全部VC拥有一个$store属性
  store,
  render: h => h(App)
}).$mount('#app')
