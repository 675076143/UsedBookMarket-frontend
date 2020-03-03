<template>
  <div class="cart">
    <headerNav title="Shopping Cart"/>
       <van-cell>
         <template slot="default">
           <span @click="()=>this.editMode=!this.editMode">{{this.editText}}</span>
         </template>
        <template slot="title">
          <van-checkbox v-model="checkedAll" @change="changeCheckAllState" >Select All</van-checkbox>
        </template>
      </van-cell>

    <van-checkbox-group class="card-goods" v-model="checkedGoods" ref="checkboxGroup">
      <van-checkbox :name="item.shoppingCartID" v-for="item in shoppingCart" class="cart-item">
        <van-card
                @click="redirect(item)"
                :price="item.price"
                :desc="item.bookDesc"
                :title="item.bookName"
                :thumb="BASE_IMG_URL+item.image">
        </van-card>
      </van-checkbox>
    </van-checkbox-group>

    <div style="height:50px;"></div>
    <van-submit-bar v-if="editMode"
            :disabled="!checkedGoods.length"
            button-text="Delete"
            @submit="handleDelete"
    >
      <template slot>
        <van-checkbox v-model="checkedAll" >Select All</van-checkbox>
      </template>
    </van-submit-bar>
    <van-submit-bar v-if="!editMode"
      :price="totalPrice"
      :disabled="!checkedGoods.length"
      :button-text="submitBarText"
      label="Total："
      @submit="onSubmit"
    >
    <template slot>
      <van-checkbox v-model="checkedAll" >Select All</van-checkbox>
    </template>
    </van-submit-bar>
  </div>
</template>

<script>
import store from '../../store'
import {reqDeleteBookFromShoppingCart, reqShoppingCart} from "../../api";
import {BASE_IMG_URL} from "../../utils/constants";

export default {
  components: {
  },
  data() {
    return {
      checkedAll:false,
      checkedGoods: [],
      shoppingCart:[],
      BASE_IMG_URL,
      editMode:false
    };
  },
  created() {
    console.log('created')
    this.initShoppingCart()
  },
  computed: {
    editText(){
      return this.editMode?'Finish':'Edit'
    },
    submitBarText() {
      const count = this.checkedGoods.length;
      return 'Submit' + (count ? `(${count})` : '');
    },
    totalPrice() {
      return 100*this.shoppingCart.reduce((total, item) => total + (this.checkedGoods.indexOf(item.shoppingCartID) !== -1 ? parseFloat(item.price): 0), 0);
    },
  },
  methods: {
    async initShoppingCart(){
      const {userID} = store.state.user;
      const result = await reqShoppingCart(userID,this);
      if(result.code === '200'){
        this.shoppingCart = result.data
      }
    },
    async handleDelete(){
      const shoppingCartIdList = this.checkedGoods;
      const request = {data:{shoppingCartIdList}}
      const result = await reqDeleteBookFromShoppingCart(request,this);
      if(result.code === '200'){
        this.$toast.success(result.message);
        this.checkedGoods = [];
        this.initShoppingCart();
      }else {
        this.$toast.fail(result.message)
      }
    },
    changeCheckAllState(){
      this.$refs.checkboxGroup.toggleAll(this.checkedAll)
    },
    redirect(item){
      this.$router.push(`/product/${item.bookID}`)
    },
    onSubmit() {
      const {checkedGoods,shoppingCart} = this;
      const initOrderList = [];
      shoppingCart.map(item=>{
        if(checkedGoods.indexOf(item.shoppingCartID)!==-1){
          initOrderList.push({...item});
        }
      })
      store.commit('setOrderList',initOrderList);
      this.$router.push({
        name:'order',
      })
    }
  }
};
</script>

<style lang="less">
.cart-item{
  border-bottom: 1px solid #f6f6f6;
  padding-left: 10px;
  span{overflow: hidden;}
  .van-card{
    background-color: #fff;
  }
}
</style>
