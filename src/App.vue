<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import './assets/style/common.css';
import storageUtils from "./utils/storageUtils";
import  store from './store/index'
export default {
  name: 'app',
  created() {
    //从localStorage中读取用户信息
    if(storageUtils.getUser()){
      store.commit('setUser',storageUtils.getUser())
      console.log('store中保存user信息')
      console.log(store.state.user)
    }
  },
}
</script>