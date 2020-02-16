<template>
    <div>
        <headerNav title="Complete"/>
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh"
                          loading-text="loading..."
                          loosing-text="release to refresh..."
                          pulling-text="pull to refresh...">

            <template v-for="order in orders">
                <van-card v-for="orderSub in order.orderSub" v-if="orderSub.orderSubState==='3'"
                          class="order-sub-item"
                          :price="orderSub.price"
                          :title="orderSub.bookName"
                          :thumb="BASE_IMG_URL+orderSub.image"
                >
                    <div slot="footer">
                        <div v-if="orderSub.sellerRating">
                            Merchant Reply:
                            <van-rate v-if="orderSub.sellerRating"
                                      v-model="orderSub.sellerRating"
                                      icon="like"
                                      void-icon="like-o"
                                      style="margin: 10px"
                            />
                            <p v-if="orderSub.sellerRatingDesc" style="margin-right: 10px">{{orderSub.sellerRatingDesc}}</p>

                        </div>
                        <div v-if="orderSub.buyerRating">
                            To:
                            <van-rate v-if="orderSub.buyerRating"
                                      v-model="orderSub.buyerRating"
                                      icon="like"
                                      void-icon="like-o"
                                      style="margin: 10px"
                                      color="#ee0a24"
                            />
                            <p v-if="orderSub.buyerRatingDesc" style="margin-right: 10px">{{orderSub.buyerRatingDesc}}</p>
                        </div>
                        <van-button size="mini" type="primary" @click="e=>{handleRating(e,orderSub.orderSubID)}" v-if="orderSub.orderSubState==='3'&&!orderSub.buyerRating">Rate</van-button>
                    </div>
                </van-card>
            </template>
        </van-pull-refresh>
        <van-popup v-model="show" position="bottom">
            <h2 style="margin: 10px">Rate Buyer</h2>
            <van-rate
                    v-model="rating"
                    icon="like"
                    void-icon="like-o"
                    style="margin: 10px"
            />
            <van-field
                    required
                    v-model="ratingDesc"
                    rows="2"
                    autosize
                    label="rate text"
                    type="textarea"
                    placeholder="please input rate text"
                    maxlength="50"
            />
            <van-button type="info" style="width: 100%;" @click="handleSendRate">Rate</van-button>
        </van-popup>
    </div>
</template>

<script>
  import {reqBuyerRating, reqOrder, reqPayOrder, reqReceived, reqSellerRating, reqUser} from "../../../api";
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
        isLoading: false,
        orderSubID:0,
        rating:5,
        ratingDesc:"",
        show:false
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
      async handleReceipt(orderSubID){
        const result = await reqReceived(orderSubID,this);
        if(result.code === '200'){
          this.$toast.success("successful received!")
          this.initData();
        }
      },
      handleRating(e,orderSubID){
        e.stopPropagation();
        this.show = true;
        this.orderSubID = orderSubID;
      },
      async handleSendRate(){
        const {rating,ratingDesc,orderSubID} = this;
        if (ratingDesc === "")return ;
        const result = await reqBuyerRating(orderSubID,rating,ratingDesc,this);
        if(result.code === '200'){
          this.show = false;
          this.$toast.success("successful rate!");
          this.initPublishedList();
        }

      }
    }
  }
</script>

<style lang="less">
    .control-pane{
        text-align: right;
    }
</style>
