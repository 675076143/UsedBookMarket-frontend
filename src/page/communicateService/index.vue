<template>
    <div class="communicate-service">
        <van-image
                round
                width="30"
                height="30"
                :src="BASE_IMG_URL+toAvatar"
                class="to-image"
                @click="handleSellerProfile"
        />
        <header-nav title="Communicate Service"/>
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh"
                          loading-text="loading..."
                          loosing-text="release to refresh..."
                          pulling-text="pull to refresh...">
            <van-cell-group>
                <van-cell v-for="item in messages" :border="false">
                    <div v-if="item.from !== from" class="message-item-from">
                        <van-image
                                round
                                width="30"
                                height="30"
                                :src="BASE_IMG_URL+toAvatar"
                        />
                        <span>{{item.message}}</span>
                    </div>
                    <div v-if="item.from === from" class="message-item-from" style="justify-content: flex-end">
                        <span>{{item.message}}</span>
                        <van-image
                                round
                                width="30"
                                height="30"
                                :src="BASE_IMG_URL+fromAvatar"
                        />
                    </div>

                </van-cell>
            </van-cell-group>
        </van-pull-refresh>


        <van-field v-model="message" class="message-input" placeholder="message">
            <van-button slot="button" size="small" type="info" @click="handleSendMsg">send</van-button>
        </van-field>

        <van-popup
                v-model="show"
                position="top"
                :style="{ height: '30%' }"
        >
            <van-cell-group>
                <van-cell title="Average:" >
                    <template slot="title">
                        <span class="custom-title">Average：</span>
                        <van-rate
                                v-model="average"
                                icon="like"
                                void-icon="like-o"
                        />
                    </template>
                </van-cell>
                <van-cell title="History:" v-for="item in sellerRating">
                    <template slot="title">
                        <span class="custom-title">{{item.buyerRatingDesc}}</span>
                        <van-rate
                                v-model="item.buyerRating"
                                icon="like"
                                void-icon="like-o"
                                :size="10"
                                style="margin-left: 10px"
                        />
                    </template>
                </van-cell>
            </van-cell-group>


        </van-popup>
    </div>
</template>

<script>
  import HeaderNav from "../../components/header/nav";
  import store from '../../store'
  import {reqMessages, reqRating, reqSendMessage, reqUser} from "../../api";
  import {BASE_IMG_URL} from "../../utils/constants";

  export default {
    name: "communicateService",
    components: {HeaderNav},
    data(){
      return{
        messages:[],
        from:0,
        fromAvatar:"",
        to:0,
        toAvatar:"",
        message:"",
        BASE_IMG_URL,
        isLoading: false,
        show:false,
        sellerRating:[],
        average:0
      }
    },
    methods:{
      handleSellerProfile(){
        console.log("sellerprofile")
        this.show = true;
      },
      async initSeller(){
        const result = await reqRating(this.to,this);
        if(result.code === '200'){
          this.sellerRating = result.data;
          result.data.map(item=>{
            this.average+=parseInt(item.buyerRating);
          })
        }
      },
      async handleSendMsg(){
        const {from,to,message} = this;
        const result = await reqSendMessage(from,to,message,this);
        if(result.code === '200'){
          this.initData();
        }else {
          this.$toast.fail("something went wrong...")
        }
      },
      async initData(){
        const result = await reqMessages(this.from,this.to,this);
        if(result.code === '200'){
          this.messages = result.data[this.from];
        }
        this.initSeller();
      },
      onRefresh() {
        this.initData();
        this.isLoading = false;
      }
    },
    async created() {
      console.log("params=>",this.$route.params)
      this.from = store.state.user.userID;
      this.fromAvatar = store.state.user.avatar;
      console.log(this.fromAvatar)
      this.to = this.$route.params.to;
      const resTo = await reqUser(this.to,this);
      if(resTo.code === '200'){
        this.toAvatar = resTo.data.avatar;
        console.log(resTo.data)
        console.log(this.toAvatar);
      }
      this.initData();
    }

  }
</script>

<style lang="less" scoped>
.message-item-from{
    display: flex;
    align-items: center;
    span{
        border: 1px solid rgba(0,0,0,0.5);
        border-radius: 5px;
        margin: 0 10px;
        padding: 0 10px;
    }
}
.message-input{
    position: fixed;
    bottom: 0;
    box-shadow: -5px 0 5px rgba(0,0,0,0.6);
}
.to-image{
    position: fixed;
    right: 10px;
    top: 10px;
    z-index: 9999;
}
</style>