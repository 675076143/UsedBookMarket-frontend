<template>
  <div class="goods">
     <headerNav title="Book Details"/>
    <van-swipe class="goods-swipe" :autoplay="3000">
<!--      <van-swipe-item v-for="thumb in book.image" :key="BASE_IMG_URL+thumb">-->

        <img :src="BASE_IMG_URL+book.image" >
    </van-swipe>

    <van-cell-group>
      <van-cell>
        <span class="goods-price">{{ '￥'+book.price }}</span>
        <span class="goods-market-price">{{ '￥'+book.price }}</span>
        <div class="goods-title">{{ book.bookName }}</div>
        <div class="goods-subtit">{{book.bookDesc}}</div>
      </van-cell>
    </van-cell-group>
    <div class="goods-info">
        <p class="goods-info-title" >Image&Text Details</p>
        <div v-html="book.detail"></div>
    </div>
      <van-goods-action>
          <van-goods-action-icon icon="manager-o" text="CS" color="#07c160" @click="cs">
              <van-image
                      fit="contain"
                      :src="BASE_IMG_URL+sellerAvatar"
                      slot="icon"
              />
          </van-goods-action-icon>
          <van-goods-action-icon icon="cart-o" text="ShoppingCart" @click="onClickCart"/>
          <van-goods-action-icon :icon="star?'star':'star-o'" text="Star" color="#ff5000" @click="handleStar" />
          <van-goods-action-button type="warning" text="add to cart" @click="handleAddToCart"/>
          <van-goods-action-button type="danger" text="purchase" @click="showSku"/>
      </van-goods-action>
  </div>
</template>

<script>
import skuData from '../../data/sku';
import {reqAddStar, reqAddToCart, reqBookDetails, reqDeleteStar, reqStars, reqUser} from "../../api";
import {BASE_IMG_URL} from "../../utils/constants";
import store from '../../store'

export default {
  components: {
  },
  async created() {
    const id = this.$route.params.id.replace(':',"")
    console.log('id=>',id)
    const result = await reqBookDetails(id,this)
    if(result.code === '200'){
      this.book = result.data;
      // console.log(this.book)
      // isStar?
      const {userID} = store.state.user;
      const resStar = await reqStars(userID,id,this);
      if(resStar.code ==='200'){
        this.star = resStar.data;
      }
      // get seller's avatar
      const resAvatar = await reqUser(result.data.userID,this);
      if(resAvatar.code==='200'){
        console.log(resAvatar)
        this.sellerAvatar = resAvatar.data.avatar;
      }
    }else {
      console.log(result);
    }
  },
  data() {
    this.skuData = skuData;
    return {
      BASE_IMG_URL,
      show:false,
      showTag:false,
      book: {},
      showBase: false,
      showCustom: false,
      showStepper: false,
      closeOnClickOverlay: true,
      star:false,
      sellerAvatar:'admin.jpg'
    };
  },
  methods: {
    cs(){
      const {userID} = store.state.user;
      if(this.book.userID === userID ){
        this.$toast.fail("Why are you talking to yourself?");
      }else {
        this.$router.push({
          name:'communicateService',
          params:{
            to:this.book.userID
          }
        })
      }
    },
    async handleAddToCart(){
      const {userID} = store.state.user;
      const {bookID} = this.book;
      const result = await reqAddToCart(bookID,userID,this);
      if(result.code ==='200'){
        this.$toast.success(result.message)
      }else {
        this.$toast.fail(result.message)
      }
    },
    onClickCart() {
      this.$router.push('/cart');
    },
    async handleStar() {
      const {userID} = store.state.user;
      const {bookID} = this.book;
      let result;
      console.log(this.star);
      if(this.star){// deleteStar
        result = await reqDeleteStar({data:{userID,bookID}},this);
      }else{// star
        result = await reqAddStar(userID,bookID,this);
      }
      if(result.code === '200'){
        this.$toast.success(result.message)
        this.star = !this.star;
      }else {
        this.$toast.fail(result.message);
      }

    },
    showPromotion() {
        this.show=true;
    },
    showSku(){
      const {book} = this;
      const initOrderList = [book];
      this.$router.push({
        name:'order'
      });
      store.commit("setOrderList",initOrderList);
    },
    onClickShowTag(){
        this.showTag=true;
    },
    onBuyClicked(data) {
      this.$toast(JSON.stringify(data));
    },
    onAddCartClicked(data) {
      this.$toast(JSON.stringify(data));
    },

  }
};
</script>

<style lang="less">
.goods {
  padding-bottom: 50px;
  &-swipe {
    img {
      width: 7.5rem;
      height: 7.5rem;
      display: block;
    }
  }
  &-tag{
      font-size: 12px;
        border-top: 1px solid #e5e5e5;
        span{
      margin-right: 10px;
        }
        i{
            color: red;
            margin-right: 3px;
        }
        img{
          width: 12px;
          margin-right: 3px;
          margin-top: 6px;
      }
  }
  &-title {
        line-height: 18px;
    padding-top: 10px;
    margin-bottom: 6px;
    font-size: 14px;
    color: #333;
    font-weight: 700;
    border-top: 1px solid #f0f0f0;
  }
  &-subtit{
      font-size: 13px;
    color: #333;
    line-height: 21px;
  }
  &-price {
    color: #f44;font-size: 20px;
  }
  &-market-price {    
    text-decoration: line-through;
    margin-left: 8px;
    font-size: 13px;
    color: #999;
  }
  &-cell-group {
    margin: 15px 0;
    .van-cell__value {
      color: #999;
    }
  }
  &-info-title{
      height: 44px;line-height: 44px;text-align: center;font-size: 14px;font-weight: 700;margin: 10px;border-top: 1px solid #e5e5e5;
  }
  &-info p{
          margin: 0;
    padding: 0;
    margin-block-end: 0;
    margin-block-start: 0;
    display: grid;
  }
  &-info img{
      width: 100%;
  }
}
</style>