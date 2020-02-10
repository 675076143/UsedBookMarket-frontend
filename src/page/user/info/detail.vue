<template>
    <div>
        <headerNav title="账号管理"/>
        <van-cell-group>
            <van-cell title="修改个人信息"  is-link to="/user/modify" />
            <van-cell title="balance" :value="'￥'+parseFloat(user.balance).toFixed(2)" is-link to="/user/balance" />
<!--            <van-cell title="修改登录密码"  is-link />-->
<!--            <van-cell title="修改绑定手机"  is-link />-->
<!--            <van-cell title="关联账号"  is-link />-->
<!--            <van-cell title="切换账号"  is-link to="/login" />-->
        </van-cell-group>
    </div>
</template>

<script>
import store from '../../../store'
export default {
  data(){
    return{
      user:store.state.user
    }
  }
}
</script>

<style>

</style>
