<template>
    <div class="published">
        <van-nav-bar
                title="Sold"
                left-text="back"
                left-arrow
                @click-left="()=>{this.$router.back()}"
        />
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-card v-for="item in sold"
                      @click="redirect(item)"
                      :price="item.price"
                      :desc="item.bookDesc"
                      :title="item.bookName"
                      :thumb="BASE_IMG_URL+item.image">
                <div slot="footer" @click.stop>
                    <van-image
                            round
                            width="30"
                            height="30"
                            :src="BASE_IMG_URL+item.buyerAvatar"
                            style="margin-right: 10px"
                            @click="showBuyerInfo(item)"
                    />
                    <span>{{item.buyerName}} {{item.orderSubState==="2"||item.orderSubState==="1"?"bought":"received"}} your book</span><br/>
                    <van-button size="mini" type="info" @click="e=>{handleShipped(e,item.orderSubID)}" v-if="item.orderSubState==='1'">Shipped</van-button>
                    <span  v-if="item.orderSubState==='2'">waiting for received...</span>
                    <div v-if="item.buyerRating">
                        Re:
                        <van-rate v-if="item.buyerRating"
                                  v-model="item.buyerRating"
                                  icon="like"
                                  void-icon="like-o"
                                  style="margin: 10px"
                                  color="#ee0a24"
                        />
                        <p v-if="item.buyerRatingDesc" style="margin-right: 10px">{{item.buyerRatingDesc}}</p>
                    </div>
                    <van-button size="mini" type="primary" @click="e=>{handleRating(e,item.orderSubID)}" v-if="item.orderSubState==='3'&&!item.sellerRating">Rate</van-button>
                    <div v-if="item.sellerRating">
                        To:
                        <van-rate v-if="item.sellerRating"
                                  v-model="item.sellerRating"
                                  icon="like"
                                  void-icon="like-o"
                                  style="margin: 10px"
                        />
                        <p v-if="item.sellerRatingDesc" style="margin-right: 10px">{{item.sellerRatingDesc}}</p>
                    </div>
                </div>
            </van-card>
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
        <van-popup
                v-model="isShowBuyerInfo"
                round
                position="bottom"
                :style="{ height: '30%' }"
        >
            <van-field v-model="buyer.name" label="name" />
            <van-field v-model="buyer.tel" label="tel" />
            <van-field v-model="buyer.area" label="area" />
            <van-field v-model="buyer.address" label="address" />
        </van-popup>
    </div>
</template>

<script>
  import {
    reqAddSellingBook,
    reqCategories,
    reqDeleteBook,
    reqModifyBook,
    reqPublished, reqSellerRating, reqShipped,
    reqSold,
    reqUpload, reqUser
  } from "../../api";
  import store from '../../store'
  import {BASE_IMG_URL} from "../../utils/constants";
  import shipList from "../user/order/shipList";

  export default {
    name: "Sold",
    methods:{
      showBuyerInfo(item){
        const {name,tel,area,address} = item;
        this.buyer =  {name,tel,area,address};
        this.isShowBuyerInfo=true;
      },
      redirect(item){
        this.$router.push(`/product/${item.bookID}`)
      },
      async initPublishedList(){
        const {userID} = store.state.user;
        const result = await reqSold(userID,this)
        if(result.code==='200'){
          this.sold = [];
          result.data.map(async item=>{
            const resBuyer = await reqUser(item.buyerID,this);
            if(resBuyer.code === '200'){
              const {userName: buyerName,avatar: buyerAvatar} = resBuyer.data;
              this.sold.push({...item,buyerName,buyerAvatar})
            }
          });
        }
      },
      async handleShipped(e,orderSubID){
        e.stopPropagation();
        this.$dialog.confirm({
          title: 'Shipped?',
          confirmButtonText:'Confirm',
          cancelButtonText:'Cancel'
        }).then(async () => {
          // on confirm
          const result = await reqShipped(orderSubID,this);
          if(result.code === '200'){
            this.$toast.success("successful shipped!");
            this.initPublishedList();
          }
        }).catch(() => {
          // on cancel
        });
        // console.log('shipList')
      },
      handleRating(e,orderSubID){
        e.stopPropagation();
        this.show = true;
        this.orderSubID = orderSubID;
      },
      async handleSendRate(){
        const {rating,ratingDesc,orderSubID} = this;
        if (ratingDesc === "")return ;
        const result = await reqSellerRating(orderSubID,rating,ratingDesc,this);
        if(result.code === '200'){
          this.show = false;
          this.$toast.success("successful rate!");
          this.initPublishedList();
        }

      },
      onRefresh() {
        this.initPublishedList();
        this.isLoading = false;
      }
    },
    data(){
      return{
        sold:[],
        BASE_IMG_URL,
        show:false,
        currentBook:{},
        categories: [],
        fileList: [],
        rating:5,
        orderSubID:0,
        ratingDesc:"",
        isLoading:false,
        isShowBuyerInfo:false,
        buyer:{}
      }
    },
    async created() {
      this.initPublishedList();
    }
  }
</script>

<style scoped>
</style>