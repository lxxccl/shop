import { reqGetCode, reqRegister, reqUserLogin, reqUserInfo, reqUserLogout } from '@/api'

//登陆注册的数据
let state = {
  code: '',
  //身份标识符很重要【存储在vuex】
  token: localStorage.getItem('TOKEN'),
  //用户名
  nickName: ''
}

let mutations = {
  GETCODE(state, code) {
    state.code = code
  },
  SET_TOKEN(state, token) {
    state.token = token
  },
  SET_USERINFO(state, nickName) {
    state.nickName = nickName
  },
  CLEAR(state) {
    //清除仓库相关用户信息
    state.token = ''
    state.nickName = ''
    //本地存储令牌清空
    localStorage.removeItem('TOKEN')
  }
}
let actions = {
  //获取验证码
  async getCode({ commit }, phone) {
    let result = await reqGetCode(phone)
    if (result.code == 200) {
      commit('GETCODE', result.data)
      return 'ok'
    }
  },
  //注册用户的地方
  async registerUser({ commit, state, dispatch }, obj) {
    //注册接口没有返回data,不需要提交mutation
    let result = await reqRegister(obj)
    if (result.code == 200) {
      //注册成功
      return 'ok'
    } else {
      //注册失败
      return Promise.reject(new Error(result.message))
    }
  },
  //用户登录
  async userLogin({ commit }, data) {
    let result = await reqUserLogin(data)
    //登录成功
    if (result.code == 200) {
      commit('SET_TOKEN', result.data.token)
      //以后开发的时候:经常的登录的成功获取token【持久化存储】
      localStorage.setItem('TOKEN', result.data.token)
      return 'ok'
    } else {
      //登录失败
      return Promise.reject(new Error(result.message))
    }
  },
  //获取用户信息
  async getUserInfo({ commit }) {
    let result = await reqUserInfo()
    if (result.code == 200) {
      commit('SET_USERINFO', result.data.nickName)
      return 'ok'
    } else {
      return Promise.reject()
    }
  },
  //退出登录的业务
  async logout({ commit }) {
    //发请求通知服务器销毁当前token【学生证】
    let result = await reqUserLogout()
    if (result.code == 200) {
      commit('CLEAR')
      return 'ok'
    } else {
      return Promise.reject(new Error(result.message))
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
