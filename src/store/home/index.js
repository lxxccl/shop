//购物车的数据
import { reqCategory, reqBannerList, reqFloorList } from '@/api'
let state = {
  //商品分类的数据,仓库里面数据起始数值不要瞎写【服务器返回的是啥】
  categoryList: [],
  bannerList: [],
  floorList: []
}
let mutations = {
  GETCATEGORY(state, categoryList) {
    state.categoryList = categoryList
  },
  GETBANNERLIST(state, bannerList) {
    state.bannerList = bannerList
  },
  GETFLOORLIST(state, floorList) {
    state.floorList = floorList
  }
}
let actions = {
  //   getMenuAction:(context) =>{
  //     context.commit('SET_MENU_LIST',['承保2','核保2'])
  // }
  // }
  async categoryList({ commit }) {
    //获取服务器的数据,存储在vuex仓库中
    let result = await reqCategory()

    if ((result.code = 200)) {
      commit('GETCATEGORY', result.data)
    }
  },
  //获取banner图的action
  async getBannerList({ commit }) {
    //获取首页数据
    let result = await reqBannerList()
    if (result.code == 200) {
      commit('GETBANNERLIST', result.data)
    }
  },
  //获取floor图的action
  async getFloorList({ commit }) {
    //获取首页数据
    let result = await reqFloorList()
    if (result.code == 200) {
      commit('GETFLOORLIST', result.data)
    }
  }
}
let getters = {}
export default {
  state,
  mutations,
  actions,
  getters
}
