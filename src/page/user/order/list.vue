<template>
    <div>
        <headerNav title="Pending payment"/>
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh"
                          loading-text="loading..."
                          loosing-text="release to refresh..."
                          pulling-text="pull to refresh...">

        <div class="order" v-for="order in orders">
            <div style="padding: 10px">
                <h4>Order No. {{order.orderID}}</h4>
                <van-card v-for="orderSub in order.orderSub"
                          class="order-sub-item"
                          :price="orderSub.price"
                          :title="orderSub.bookName"
                          :thumb="BASE_IMG_URL+orderSub.image"
                >
                </van-card>
                <p style="color: indianred;text-align: right">total: ￥{{order.totalPrice}}</p>
                <div class="control-pane">
                    <van-button type="primary" @click="()=>{submitPay(order.orderID)}" size="small">Pay it now</van-button>
                    <van-button type="danger" size="small">Cancel Order</van-button>
                </div>
            </div>
        </div>
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
        const result = await reqOrder(userID,0,this);
        if(result.code === "200"){
          this.orders = result.data
          const res = await reqOrder(userID,0,this);
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
        const result = await reqOrder(userID,0,this);
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
