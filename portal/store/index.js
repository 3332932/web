import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    data: null,
    token: '',
    messageSum: 0,
    userImage:'',
    projectId:'' //用于出发项目切换时的 websocket
  },
  mutations: {
    setUser (state, val) {
      state.data = val
    },
    setToken (state, val) {
      state.token = val
    },
    updateMessageSum (state, val){
      state.messageSum = val
    },
    updateUserImage (state, val){
      state.userImage = val
    },
    updateProjectId (state, val){
      state.projectId = val
    }
  }
})

export default store