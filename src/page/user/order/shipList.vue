<template>
    <div>
        <headerNav title="To be shipped"/>
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh"
                          loading-text="loading..."
                          loosing-text="release to refresh..."
                          pulling-text="pull to refresh...">

        <template v-for="order in orders">
                <van-card v-for="orderSub in order.orderSub" v-if="orderSub.orderSubState==='1'"
                          class="order-sub-item"
                          :price="orderSub.price"
                          :title="orderSub.bookName"
                          :thumb="BASE_IMG_URL+orderSub.image"
                >
                    <div slot="footer">
                        to be shipped...
                    </div>
                </van-card>
        </template>
        </van-pull-refresh>
    </div>
</template>

<script>
  import {reqOrder, reqPayOrder, reqUser} from "../../../api";
  import store from '../../../store';
  import {BASE_IMG_URL} from "../../../utils/constants";
  import storageUtils from "../../../utils/storageUtils";

  export default {
    components:{
    },
    data(){
      return{
        orders:[],
        BASE_IMG_URL,
        isLoading: false
      }
    },
    created() {
      this.initData()
    },
    methods:{
      async initData(){
        const {userID} = store.state.user;
        const result = await reqOrder(userID,1,this);
        if(result.code === "200"){
          this.orders = result.data
          const res = await reqOrder(userID,1,this);
          if(res.code === "200") this.orders = res.data;
          const resUser = await reqUser(userID,this)
          if(resUser.code==='200'){
            this.user = resUser.data
            store.commit('setUser',resUser.data)
            storageUtils.setUser(resUser.data)
          }
        }
      },
      async submitPay(orderID){
        const {userID} = store.state.user;
        const res = await reqPayOrder(orderID,userID,this);
        if(res.code === '200'){
          this.$toast.success(res.message);
          this.initData();
        }else {
          this.$toast.fail(res.message)
        }
      },
      async onRefresh(){
        const {userID} = store.state.user;
        const result = await reqOrder(userID,1,this);
        if(result.code === "200"){
          this.orders = result.data
          this.$toast.success("refreshed")
          this.isLoading = false
        }else {
          this.isLoading = false
          this.$toast.fail(result.message)
        }
      },
    }
  }
</script>

<style lang="less">
.control-pane{
    text-align: right;
}
</style>
