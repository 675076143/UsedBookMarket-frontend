<template>
    <div>
        <headerNav title="Account"/>
        <van-cell-group>
            <van-cell title="Profile"  is-link to="/user/modify" />
            <van-cell title="Balance" :value="'￥'+parseFloat(user.balance).toFixed(2)" is-link to="/user/balance" />
        </van-cell-group>
    </div>
</template>

<script>
import store from '../../../store'
import {reqUser} from "../../../api";
import storageUtils from "../../../utils/storageUtils";
export default {
  async created() {
    const {userID} = storageUtils.getUser();
    const result = await reqUser(userID,this);
    if(result.code==='200'){
      store.commit('setUser',result.data);
      storageUtils.setUser(result.data)
      this.user = result.data;
    }
  },
  data(){
    return{
      user:{}
    }
  }
}
</script>

<style>

</style>
