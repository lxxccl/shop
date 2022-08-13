//购物车小仓库
import { reqShopCart, reqDeleteCart, reqUpdateChecked } from '@/api'
//规范:利用vuex存储数据
import { SET_USERID } from '@/utils/USER_ID'
//购物车的数据
let state = {
  shopCartInfo: [],
  USER_ID: SET_USERID()
}

let mutations = {
  GETSHOPCART(state, payload) {
    state.shopCartInfo = payload
  }
}

let actions = {
  //获取购物车列表
  //获取用户购物车的数据
  async getShopCart({ commit }) {
    let result = await reqShopCart()
    if (result.code == 200) {
      console.log(result)
      commit('GETSHOPCART', result.data)
    }
  },
  //删除某一个商品的数据
  async deleteCartById({ commit }, skuId) {
    let result = await reqDeleteCart(skuId)
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject()
    }
  },
  //修改某一个商品勾选状态
  async changeChecked({ commit, state, dispatch }, { skuId, isChecked }) {
    let result = await reqUpdateChecked(skuId, isChecked)
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject()
    }
  },
  //删除所有勾选的商品
  deleteAllCart({ state, dispatch }) {
    let arr = []
    //获取仓库里面购物车的数据
    state.shopCartInfo[0].cartInfoList.forEach(item => {
      //商品的勾选状态是勾选的,发请求一个一个删除
      if (item.isChecked == 1) {
        let promise = dispatch('deleteCartById', item.skuId)
        arr.push(promise)
      }
    })
    //promise.all可以去判断arr中的promise是否都成功，如果有一个失败则返回失败结果
    return Promise.all(arr)
  },
  //修改全部商品的勾选的状态
  allUpdateChecked({ commit, state, dispatch }, isChecked) {
    let arr = []
    //获取购物车商品的个数,进行遍历
    state.shopCartInfo[0].cartInfoList.forEach(item => {
      //调用修改某一个商品的action【四次】
      let ps = dispatch('changeChecked', { skuId: item.skuId, isChecked })
      arr.push(ps)
    })
    //Promise.all():参数需要的是一个数组【数组里面需要promise】
    //Promise.all()执行一次,返回的是一个Promise对象,Promise对象状态：成功、失败取决于什么?
    //成功、还是失败取决于数组里面的promise状态:四个都成功、返回成功Promise、只要有一个失败、返回Promise失败状态！！！
    return Promise.all(arr)
  }
}

let getters = {
  //计算数组里面第一个元素：对象
  CartInfo(state) {
    return state.shopCartInfo[0] || {}
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}
