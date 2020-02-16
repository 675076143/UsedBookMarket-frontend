<template>
    <div class="published">
        <van-nav-bar
                title="Sold"
                left-text="back"
                left-arrow
                @click-left="()=>{this.$router.back()}"
        />
        <van-card v-for="item in sold"
                @click="redirect(item)"
                :price="item.price"
                :desc="item.bookDesc"
                :title="item.bookName"
                :thumb="BASE_IMG_URL+item.image">
            <div slot="footer">
                <van-image
                        round
                        width="30"
                        height="30"
                        :src="BASE_IMG_URL+item.buyerAvatar"
                        style="margin-right: 10px"
                />
                <span>{{item.buyerName}} bought your book</span><br/>
                <van-button size="mini" type="info" @click="e=>{handleShipped(e,item.orderSubID)}" v-if="item.orderSubState==='1'">Shipped</van-button>
                <span  v-if="item.orderSubState==='2'">waiting for received...</span>
                <van-button size="mini" type="primary" @click="e=>{handleRating(e,item.orderSubID)}" v-if="item.orderSubState==='3'">Rate</van-button>
            </div>
        </van-card>
        <van-popup v-model="show" position="bottom">
            <h2 style="margin: 10px">Rate Buyer</h2>
            <van-rate
                    v-model="rating"
                    icon="like"
                    void-icon="like-o"
                    style="margin: 10px"
            />
                <van-field
                        v-model="message"
                        rows="2"
                        autosize
                        label="rate text"
                        type="textarea"
                        placeholder="please input rate text"
                        maxlength="50"
                />
                <van-button type="info" style="width: 100%;" @click="modifyBook">Rate</van-button>
        </van-popup>

    </div>
</template>

<script>
  import {
    reqAddSellingBook,
    reqCategories,
    reqDeleteBook,
    reqModifyBook,
    reqPublished, reqShipped,
    reqSold,
    reqUpload, reqUser
  } from "../../api";
  import store from '../../store'
  import {BASE_IMG_URL} from "../../utils/constants";
  import shipList from "../user/order/shipList";

  export default {
    name: "Sold",
    methods:{
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
        rating:0
      }
    },
    async created() {
      this.initPublishedList();
    }
  }
</script>

<style scoped>

</style>