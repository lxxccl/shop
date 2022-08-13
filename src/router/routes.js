export default [
  {
    path: '/center',
    component: () => import('@/pages/Center'),
    meta: { show: true },
    //二级路由配置的地方
    children: [
      //我的订单
      {
        path: 'myorder',
        component: () => import('@/pages/Center/myOrder')
      },
      {
        //团购订单
        path: 'teamorder',
        component: () => import('@/pages/Center/teamOrder')
      },
      {
        path: '/center',
        redirect: '/center/myorder'
      }
    ]
  },
  {
    //支付成功页
    path: '/paysuccess',
    component: () => import('@/pages/PaySuccess'),
    meta: { show: true }
  },
  {
    //订单支付页
    path: '/pay',
    component: () => import('@/pages/Pay'),
    meta: { show: true },
    //路由独享守卫
    beforeEnter: (to, from, next) => {
      if (from.path == '/pay') {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    //订单确认页面
    path: '/trade',
    component: () => import('@/pages/Trade'),
    meta: { show: true },
    //路由独享守卫
    beforeEnter: (to, from, next) => {
      if (from.path == '/shopcart') {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path: '/detail/:skuId?',
    component: () => import('@/pages/Detail'),
    meta: { show: true }
  },
  {
    //购物车
    path: '/shopcart',
    component: () => import('@/pages/ShopCart'),
    meta: { show: true }
  },
  {
    path: '/home',
    component: () => import('@/pages/Home'),
    meta: { show: true }
  },
  {
    name: 'search',
    //在注册路由的时候,如果这里占位，切记务必要传递params
    path: '/search/:keyword?',
    component: () => import('@/pages/Search'),
    meta: { show: true }
  },
  {
    path: '/register',
    component: () => import('@/pages/Register'),
    meta: { show: false }
  },
  {
    path: '/login',
    component: () => import('@/pages/Login'),
    meta: { show: false }
  },
  {
    path: '/',
    redirect: '/home',
    meta: { show: true }
  },
  {
    //加入购物车成功页
    path: '/addcartsuccess',
    component: () => import('@/pages/AddCartSuccess'),
    name: 'AddCartSuccess',
    //路由元信息,控制当前路由是否需要Footer组件
    meta: { show: true }
  }
]
