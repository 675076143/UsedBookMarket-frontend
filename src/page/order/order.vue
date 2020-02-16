<template>
  <div class="order">
     <headerNav title="confirm order"/>
     <van-cell
      center
      :border="false"
      class="contact-card"
      is-link
      to="/user/address?id=2"
    >
      <template v-if="type === 'add'">
        <strong>choose address</strong>
      </template>
      <template v-else>
        <strong>Sheng 138****6520</strong>
        <div>XXXXXXXXXXXXXXXXXX</div>
      </template>
    </van-cell>
      <van-card v-for="item in initOrderList"
              style="background-color:#fff;"
              :price="item.price"
              :desc="item.bookDesc"
              :title="item.bookName"
              :thumb="BASE_IMG_URL+item.image"
      />

    <div style="height:15px;"></div>
    <van-cell-group class="total">
        <van-cell title="total price" :value="totalPrice" />
<!--        <van-cell title="运费" value="+ 0.00" />-->
<!--        <van-cell title="折扣" value="- 5.00" />-->
        <van-cell title="final price" :value="totalPrice" style="font-weight: 700;" />
    </van-cell-group>

    <div style="height:50px;"></div>
    <van-submit-bar
      :price="totalPrice*100"
      button-text="submit"
      label='final price：'
      @submit="onSubmit"
    />

  </div>
</template>

<script>
import {BASE_IMG_URL} from "../../utils/constants";
import {reqPayOrder, reqSubmitOrder} from "../../api";
import store from '../../store';

export default {
  data() {
    return {
      type: "add1",
      initOrderList: this.$route.params.initOrderList,
      BASE_IMG_URL
    };
  },
  created() {
    if(!this.$route.params.initOrderList) this.$router.push("/");
  },
  methods: {
    async onSubmit() {
      const bookList = [];
      this.initOrderList.map(item=>bookList.push(parseInt(item.bookID)));
      const {userID} = store.state.user;
      const result = await reqSubmitOrder(bookList,userID,this);
      if(result.code === '200'){
        this.$dialog.confirm({
          title:result.message,
          message:'pay it now?',
        }).then(async ()=>{
          const res = await reqPayOrder(result.data.orderID,userID,this);
          if(res.code === '200'){
            this.$toast.success(res.message)
            this.$router.push("/user/ship");
          }else {
            this.$toast.fail(res.message)
          }
        }).catch(()=>{
          this.$router.push("/user/order");
        })
      }else {
        this.$toast.fail(result.message)
      }
    },
  },
  computed:{
    totalPrice(){
      return this.initOrderList.reduce((total,item)=>total+parseFloat(item.price),0)
    }
  },
  activated(){
    //根据key名获取传递回来的参数，data就是map
    this.$on('selectAddress', function(data){
        //赋值给首页的附近医院数据模型
        console.log(1);
    }.bind(this));
},
};
</script>

<style lang="less">
.order {
  font-size: 14px;
  background: #f7f7f7;
  .contact-card::before {
    content: "";
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    position: absolute;
    background: -webkit-repeating-linear-gradient(
      135deg,
      #ff6c6c 0,
      #ff6c6c 20%,
      transparent 0,
      transparent 25%,
      #3283fa 0,
      #3283fa 45%,
      transparent 0,
      transparent 50%
    );
    background: repeating-linear-gradient(
      -45deg,
      #ff6c6c 0,
      #ff6c6c 20%,
      transparent 0,
      transparent 25%,
      #3283fa 0,
      #3283fa 45%,
      transparent 0,
      transparent 50%
    );
    background-size: 80px;
  }
  .total {
    .van-cell__value {
      color: red;
    }
  }

  .van-submit-bar__bar {
    border-top: 1px solid #f7f7f7;
  }
  .additional {
    .van-cell {
      padding: 0 15px;
      font-size: 12px;
    }
    .van-cell__title {
      flex: 11;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .van-tag {
      line-height: 12px;
      margin-right: 5px;
    }

    .price {
      color: #e93b3d;
      font-size: 10px;
      span {
        font-size: 16px;
      }
    }
  }
}
</style>
