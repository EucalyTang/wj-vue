/* eslint-disable no-undef */
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vant from 'vant'
import 'vant/lib/index.css'
import moment from 'moment'

// 设置反向代理，前端请求默认发送到 http://localhost:8091/api
var axios = require('axios')
//axios.defaults.baseURL = 'http://bang.t.v3x.cn/api'
axios.defaults.baseURL = 'http://localhost:8091/api'
axios.defaults.withCredentials = true
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
Vue.prototype.$axios = axios
//Vue.prototype.HOST="/api"
Vue.config.productionTip = false

Vue.prototype.$moment = moment //赋值使用
moment.locale('zh-cn') //需要汉化

Vue.use(ElementUI)
Vue.use(Vant)

router.beforeEach((to, from, next) => {
  //console.log(store)
  if (store.state.user.username && to.path.startsWith('/admin')) {
    axios.get('/authentication').then((resp) => {
      initAdminMenu(router, store)
    })
  }
  if (to.meta.requireAuth) {
    if (store.state.user.username) {
      axios.get('/authentication').then((resp) => {
        if (resp) next()
      })
    } else {
      next({
        path: 'login',
        query: { redirect: to.fullPath },
      })
    }
  } else {
    next()
  }
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    next()
  }
})

const initAdminMenu = (router, store) => {
  if (store.state.adminMenus.length > 0) {
    return
  }
  axios.get('/menu').then((resp) => {
    if (resp && resp.status === 200) {
      var fmtRoutes = formatRoutes(resp.data.data)
      router.addRoutes(fmtRoutes)
      store.commit('initAdminMenu', fmtRoutes)
    }
  })
}

const formatRoutes = (routes) => {
  let fmtRoutes = []
  routes.forEach((route) => {
    if (route.children) {
      route.children = formatRoutes(route.children)
    }

    let fmtRoute = {
      path: route.path,
      component: (resolve) => {
        require(['./components/admin/' + route.component + '.vue'], resolve)
      },
      name: route.name,
      nameZh: route.nameZh,
      iconCls: route.iconCls,
      children: route.children,
    }
    fmtRoutes.push(fmtRoute)
  })
  return fmtRoutes
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: (h) => h(App),
  router,
  store,
  components: {
    App,
  },
  template: '<App/>',
})
