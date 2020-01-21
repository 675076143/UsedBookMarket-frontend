<template>
  <div class="goods">
     <headerNav title="Book Details"/>
    <van-swipe class="goods-swipe" :autoplay="3000">
<!--      <van-swipe-item v-for="thumb in book.image" :key="BASE_IMG_URL+thumb">-->

        <img :src="BASE_IMG_URL+book.image" >
      </van-swipe-item>
    </van-swipe>

    <van-cell-group>
      <van-cell>
        <span class="goods-price">{{ formatPrice(book.price) }}</span>
        <span class="goods-market-price">{{ formatPrice(book.price) }}</span>
        <div class="goods-title">{{ book.bookname }}</div>
        <div class="goods-subtit">{{book.bookdesc}}</div>
      </van-cell>
    </van-cell-group>
    <div class="goods-info">
        <p class="goods-info-title" >Image&Text Details</p>
        <div v-html="book.detail"></div>
    </div>
      <van-goods-action>
          <van-goods-action-icon icon="chat-o" text="CS" color="#07c160" />
          <van-goods-action-icon icon="cart-o" text="ShoppingCart" @click="onClickCart"/>
          <van-goods-action-icon icon="star-o" text="Star" color="#ff5000" @click="sorry" />
          <van-goods-action-button type="warning" text="add to cart" @click="showSku"/>
          <van-goods-action-button type="danger" text="purchase" @click="showSku"/>
      </van-goods-action>

    <van-sku
          v-model="showBase"
          :sku="skuData.sku"
          :goods="skuData.goods_info"
          :goods-id="skuData.goods_id"
          :hide-stock="skuData.sku.hide_stock"
          :quota="skuData.quota"
          :quota-used="skuData.quota_used"
          reset-stepper-on-hide
          reset-selected-sku-on-hide
          disable-stepper-input
          :close-on-click-overlay="closeOnClickOverlay"
          :message-config="messageConfig"
          :custom-sku-validator="customSkuValidator"
          @buy-clicked="onBuyClicked"
          @add-cart="onAddCartClicked"
        />
  </div>
</template>

<script>
import skuData from '../../data/sku';
import {reqBookDetails} from "../../api";
import {BASE_IMG_URL} from "../../utils/constants";


export default {
  components: {
  },
  async created() {
    const id = this.$route.params.id.replace(':',"")
    console.log('id=>',id)
    const result = await reqBookDetails(id,this)
    if(result.code === '200'){
      this.book = result.data
      console.log(this.book)
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
      initialSku: {
        s1: '30349',
        s2: '1193'
      },
      customSkuValidator: (component) => {
        return '请选择xxx';
      },
      customStepperConfig: {
        quotaText: '单次限购100件',
        stockFormatter: (stock) => `剩余${stock}间`,
        handleOverLimit: (data) => {
          const { action, limitType, quota } = data;
          if (action === 'minus') {
            this.$toast('至少选择一件商品');
          } else if (action === 'plus') {
            if (limitType === LIMIT_TYPE.QUOTA_LIMIT) {
              this.$toast(`限购${quota}件`);
            } else {
              this.$toast('库存不够了~~');
            }
          }
        }
      },
      messageConfig: {
        uploadImg: (file, img) => {
          return new Promise(resolve => {
            setTimeout(() => resolve(img), 1000);
          });
        },
        uploadMaxSize: 3
      }
    };
  },
  methods: {
    formatPrice(data) {
      return '¥' + (data / 100).toFixed(2);
    },
    onClickCart() {
      this.$router.push('/cart');
    },
    sorry() {
      Toast('暂无后续逻辑~');
    },
    showPromotion() {
        this.show=true;
    },
    showSku(){
        this.showBase=true;
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