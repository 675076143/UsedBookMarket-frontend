<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh"
                      loading-text="loading..."
                      loosing-text="release to refresh..."
                      pulling-text="pull to refresh...">
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
              <van-icon name="todo-list-o" :info="soldNum?soldNum:null" />
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
              <van-icon name="pending-payment" :info="pendingPaymentNum?pendingPaymentNum:null" />
              <div>Pending payment</div>
            </van-col>
          </router-link>
          <router-link  to="/user/ship">
            <van-col span="6">
              <van-icon name="logistics" :info="shippedNum?shippedNum:null">
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
              <van-icon name="chat-o" :info="unreadNum?unreadNum:null"/>
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
        <van-cell title="Logout" is-link @click="handleLogout" />
      </van-cell-group>

    </div>
    <div v-else>
      <van-cell title="login" is-link to="/login" />
    </div>
    <navigate />
    </van-pull-refresh>
  </div>
</template>

<script>
  import {reqLogin, reqMessages, reqOrder, reqSold} from "../../api";
import store from '../../store/index'
import {BASE_IMG_URL} from '../../utils/constants'
import avatar from '../../assets/images/user_48px.png'
import storageUtils from "../../utils/storageUtils";
export default {
  data(){
    return{
      logged:false,
      user:{},
      BASE_IMG_URL,
      avatar,
      unreadNum:0,
      pendingPaymentNum:0,
      shippedNum:0,
      soldNum:0,
      isLoading:false
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
    this.initInfoNum();
  },
  methods:{
    onRefresh(){
      this.initInfoNum();
    },
    handleLogout(){
      this.$dialog.confirm({
        title: 'Logout',
        message: 'Confirm logout?',
        cancelButtonText:'Cancel',
        confirmButtonText:'Confirm'
      }).then(() => {
        // on confirm
        console.log("logout")
        store.commit('removeUser');
        storageUtils.removeUser();
        this.$toast.success("Successful Logout");
        location.reload();
      }).catch(() => {
        // on cancel
      });
    },
    async initInfoNum(){
      const {userID} = store.state.user;
      // get number of unread message
      let result = await reqMessages(null,userID,this,false);
      if(result.code==='200') this.unreadNum = parseInt(result.data);
      // get number of pending payment
      result = await reqOrder(userID,0,this);
      if(result.code ==='200') this.pendingPaymentNum = result.data?result.data.length:0;
      // get number of to be shipped
      result = await reqOrder(userID,1,this);
      if(result.code ==='200') this.shippedNum = result.data?result.data.length:0;
      // get number of sold
      result = await reqSold(userID,this)
      if(result.code ==='200') this.soldNum = result.data?result.data.length:0;
      this.isLoading = false;
    }
  }

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
