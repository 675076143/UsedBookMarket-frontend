<template>
    <van-cell-group>
        <div class="balance-header">
            <span>balance(￥)</span>
            <h1>{{parseFloat(user.balance).toFixed(2)}}</h1>
        </div>
        <van-cell title="recharge"  icon="add-square" @click="showPopup" is-link/>
        <van-cell title="withdrawal" icon="card" is-link/>
        <van-popup
                class="pop"
                v-model="show"
                closeable
                close-icon="close"
                position="bottom"
                :style="{ height: '30%' }">
            <span>recharge amount</span>
            <van-field class="rechargeValue" v-model="rechargeValue" type="number" placeholder="￥" />
            <van-button type="info" class="submit" @click="handleRecharge">recharge</van-button>
        </van-popup>
    </van-cell-group>
</template>

<script>
  import store from "../../../store";
  import {reqModifyProfile} from "../../../api";
  import storageUtils from "../../../utils/storageUtils";

  export default {
    name: "index",
    data(){
      return{
        user:store.state.user,
        show:false,
        rechargeValue:0
      }
    },
    methods:{
      showPopup(){
        this.show = true;
      },
      async handleRecharge(){
        this.user.balance = parseFloat(this.rechargeValue)+parseFloat(this.user.balance);
        const {user} = this
        const {userID,email,phone,balance,avatar} = user;
        const result = await reqModifyProfile(userID,email,phone,balance,avatar,this);
        if(result.code==='200'){
          this.$toast.success('recharge success')
          store.commit('setUser',this.user)
          storageUtils.setUser(this.user)
          this.show = false
        }else {
          this.$toast.fail(result.message)
          this.show = false
        }
      }
    }
  }
</script>

<style lang="less" scoped>
.balance-header{
    padding: 20px;
    background-color: rgb(25,137,250);
    color: white;
    span{
        color: lightgray !important;
    }
    h1{
        margin-top: 20px;
    }
}
.pop{
    padding: 10px;
    .rechargeValue{
        font-size: x-large;
        margin: 20px 0;
    }
    .submit{
        width: 100%;
    }
}
</style>