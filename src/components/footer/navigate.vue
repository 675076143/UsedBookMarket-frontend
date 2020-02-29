<template>
    <div style="height:50px;">
    <van-tabbar route>
<!--        <van-tabbar-item icon="wap-home" to="/home">首页</van-tabbar-item>-->
        <van-tabbar-item replace icon="wap-nav" to="/category" >Category</van-tabbar-item>
<!--        <van-tabbar-item icon="cart" to="/cart" >ShoppingCart</van-tabbar-item>-->
        <van-tabbar-item replace icon="cart" to="/cart" >ShoppingCart</van-tabbar-item>
        <van-tabbar-item replace icon="contact" to="/user/index">Account</van-tabbar-item>
    </van-tabbar>
    </div>
</template>

<script>
import { Tabbar, TabbarItem } from "vant";
export default {
  name:'navigate',
  components:{
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
  },
  data() {
    return {
      active: 0
    }
  }
}
</script>

