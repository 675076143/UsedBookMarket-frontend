import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:{},
    school:""
  },
  mutations: {
    setUser(state,user){
      state.user = user
    },
    removeUser(state){
      state.user = {};
    },
    setSchool(state,school){
      state.school = school
    }
  },
  actions: {
  },
  modules: {
  }
})
