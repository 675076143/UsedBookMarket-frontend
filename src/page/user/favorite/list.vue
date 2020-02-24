<template>
<div>
    <headerNav title="Stars"/>
    <van-pull-refresh
            v-model="isLoading"
            pulling-text="pull to refresh"
            loosing-text="loose to refresh"
            success-text="refresh success"
            loading-text="loading..."
            @refresh="onRefresh"
    >
        <router-link v-for="star in stars" :to="'/product/:'+star.bookID" :disabled="star.orderSubID">
            <van-card
                      :price="star.price"
                      :desc="star.bookDesc"
                      :title="star.bookName"
                      :thumb="BASE_IMG_URL+star.image"
                      :style="star.orderSubID?'opacity: 0.5':''"
            >
                <div slot="footer">
                    <van-button size="mini" type="danger" @click="()=>{handleDelete(star.bookID)}">Delete</van-button>
                </div>
            </van-card>
            <h1 class="invalid" v-if="star.orderSubID">Invalid</h1>
        </router-link>


    </van-pull-refresh>
</div>
</template>

<script>
import { GetFavorite ,DelFavorite} from "../../../api/user.js";
import store from '../../../store';
import {reqAddStar, reqDeleteStar, reqStars} from "../../../api";
import {BASE_IMG_URL} from "../../../utils/constants";

export default {
    data(){
        return{
          BASE_IMG_URL,
          isLoading:false,
          stars:[]
        }
    },
  created() {
      this.initData();
  },
  methods:{
      async initData(){
        const {userID} = store.state.user;
        const result = await reqStars(userID,null,this);
        if(result.code ==='200'){
          this.stars = result.data;
        }else{
          this.stars = []
        }
        this.isLoading = false;
      },
      onRefresh(){
        this.isLoading = true;
        this.initData();
      },
      async handleDelete(bookID){
        const {userID} = store.state.user;
        const result = await reqDeleteStar({data:{userID,bookID}},this);
        if(result.code === '200'){
          this.$toast.success(result.message)
        }else {
          this.$toast.fail(result.message);
        }
        this.initData();
      }
    },
}
</script>

<style lang="less">
.invalid{
    position: relative;
    top: -150px;
    left: 100px;
    transform: rotate(-30deg);
}
.van-swipe-cell{
    &__left,
    &__right {
      color: #FFFFFF;
      font-size: 15px;
      width: 65px;
      height: 100px;
      display: inline-block;
      text-align: center;
      line-height: 100px;
      background-color: #F44;
    }
}
</style>
