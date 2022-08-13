import { reqDetailList, reqAddOrUpdateCart } from '@/api'

//商品详情的数据
let state = {
  //商品详情的数据
  detailInfo: {}
}

let mutations = {
  GETDETAILINFO(state, detailInfo) {
    state.detailInfo = detailInfo
  }
}

let actions = {
  async getDetailInfo({ commit }, skuId) {
    //商品详情请求，需要携带商品ID
    let result = await reqDetailList(skuId)
    if (result.code == 200) {
      commit('GETDETAILINFO', result.data)
    }
  },

  //加入购物车|将来修改商品个数的地方,右侧是载荷对象【两个K,两个V】
  async addOrUpdateCart({ state, commit, dispatch }, { skuId, skuNum }) {
    //底下即为：加入购物车(修改商品个数)的请求,参数顺序不能瞎写
    let result = await reqAddOrUpdateCart(skuId, skuNum)

    if (result.code == 200) {
      //如果加入购物车成功,返回promise即为成功
      return 'ok'
    } else {
      //如果加入购物车失败，返回失败的Promise
      return Promise.reject()
    }
  }
}

let getters = {
  //面包屑的数据
  categoryView(state) {
    //起始状态:state.detailInfo起始状态空对象,空对象.categoryView->undefined
    //当服务器数据回来之后state.detailInfo,并非空对象,获取的即为服务器返回的数据{7个K}
    //当前属性值:服务器的数据有值，用服务器的。服务器数据没有回来至少有一个空对象兜底【不能undefined兜底】
    return state.detailInfo.categoryView || {}
  },
  //商品信息的数据
  skuInfo(state) {
    return state.detailInfo.skuInfo || {}
  },
  //商品销售属性列表的数据
  spuSaleAttrList(state) {
    return state.detailInfo.spuSaleAttrList || []
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}
