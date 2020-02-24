<template>
  <div>
    <div class="user-profile">
      <div class="user-profile-avatar">
        <router-link  to="/user/info">
          <img :src="logged?BASE_IMG_URL+user.avatar:avatar" alt="Avatar">
        </router-link>
      </div>
      <div class="user-profile-username">
        <router-link  to="/user/info">
          <span class="m-nick">{{user.userName}}</span>
        </router-link>
      </div>
    </div>
    <a href=""></a>
    <div v-if="logged">
      <van-cell-group class="user-group">
        <van-cell title="Sell" />

        <van-row class="user-links">
          <router-link  to="/addSelling">
            <van-col span="6">
              <van-icon name="add-o" />
              <div>Selling books</div>
            </van-col>
          </router-link>
          <router-link  to="/published">
            <van-col span="6">
              <van-icon name="balance-list-o" />
              <div>published</div>
            </van-col>
          </router-link>
          <router-link  to="/sold">
            <van-col span="6">
              <van-icon name="todo-list-o" />
              <div>sold</div>
            </van-col>
          </router-link>
        </van-row>
      </van-cell-group>
      <van-cell-group class="user-group">
        <van-cell title="Orders"/>
        <van-row class="user-links">
          <router-link to="/user/payment">
            <van-col span="6">
              <van-icon name="pending-payment">
                <van-info :info="UnPayTotal"  />
              </van-icon>
              <div>Pending payment</div>
            </van-col>
          </router-link>
          <router-link  to="/user/ship">
            <van-col span="6">
              <van-icon name="logistics">
              </van-icon>
              <div>To be shipped</div>
            </van-col>
          </router-link>
          <router-link  to="/user/receive">
            <van-col span="6">
              <van-icon name="records">
              </van-icon>
              <div>To be received</div>
            </van-col>
          </router-link>
          <router-link  to="/user/completed">
            <van-col span="6">
              <van-icon name="point-gift">
              </van-icon>
              <div>Completed</div>
            </van-col>
          </router-link>
          <!--        <router-link  to="/user/aftersale">-->
          <!--          <van-col span="6">-->
          <!--            <van-icon name="after-sale" >-->
          <!--              <van-info :info="data.AfterSaleTotal"   />-->
          <!--            </van-icon>-->
          <!--            <div>After sale</div>-->
          <!--          </van-col>-->
          <!--        </router-link>-->
        </van-row>
      </van-cell-group>
      <van-cell-group class="user-group">
        <van-cell title="My service" />
        <van-row class="user-links">
          <router-link  to="/user/messages">
            <van-col span="6">
              <van-icon name="chat-o" />
              <div>Message</div>
            </van-col>
          </router-link>
          <router-link  to="/user/address">
            <van-col span="6" >
              <van-icon name="location"/>
              <div>Address</div>
            </van-col>
          </router-link>
          <router-link  to="/user/favorite">
            <van-col span="6">
              <van-icon name="like-o" />
              <div>Stars</div>
            </van-col>
          </router-link>
        </van-row>
      </van-cell-group>
      <van-cell-group>
        <van-cell title="Switch account" is-link to="/login" />
      </van-cell-group>

    </div>
    <div v-else>
      <van-cell title="login" is-link to="/login" />
    </div>


    <navigate />
  </div>
</template>

<script>
import {reqLogin} from "../../api";
import store from '../../store/index'
import {BASE_IMG_URL} from '../../utils/constants'
import avatar from '../../assets/images/user_48px.png'
export default {
  data(){
    return{
      logged:false,
      user:{},
      BASE_IMG_URL,
      avatar
    }
  },
  components: {
  },
  created() {
    console.log('created');
    //If there is no user information, display the visitor page and login registration operation
    console.log(store.state.user)
    if(!store.state.user.userID){
      this.logged = false
      console.log('store中没有user信息')
      // this.$router.push('/login')
      this.Avatar=avatar
      this.user.userName = 'Guest'
    }else {//With user information, it means that you have logged in
      this.logged = true
      console.log(store.state.user)
      this.user = store.state.user
    }
  },

};
</script>

<style lang="less">
.user {
  &-profile {
        text-align: center;
        display: block;
    width: 100%;
    height: 141px;
    background-color: #f1f5fa;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    img{
          width: 100%;
    }
    &-avatar{
          padding-top: 23px;
    padding-bottom: 5px;

      img{

      width: 65px;
      height: 65px;
      border-radius: 50%;
      overflow: hidden;
      }
    }
    &-username{
      font-size: 20px;
    }
  }
  &-group {
    margin-bottom: .3rem;

    .van-cell__value{
      color: #999;
      font-size: 12px;
    }
  }
  &-links {
    padding: 15px 0;
    font-size: 12px;
    text-align: center;
    background-color: #fff;
    .van-icon {
      position: relative;
      width: 24px;
      font-size: 24px;
    }
  }
}
</style>
