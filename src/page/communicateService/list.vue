<template>
    <div class="message">
        <header-nav title="Messages" />
        <van-cell-group class="message-list">
            <van-cell  v-for="item in messageList" is-link @click="()=>{redirect(item.from)}" class="message-item">
                <van-image
                        round
                        width="30"
                        height="30"
                        :src="BASE_IMG_URL+item.avatar"
                        style="margin-right: 10px"
                />
                {{item.message}}
            </van-cell>
        </van-cell-group>
    </div>
</template>

<script>
  import {BASE_IMG_URL} from "../../utils/constants";
  import store from '../../store';
  import {reqMessages, reqUser} from "../../api";
  import HeaderNav from "../../components/header/nav";

  export default {
    name: "messages",
    components: {HeaderNav},
    data(){
      return{
        BASE_IMG_URL,
        to:0,
        messageList:[]
      }
    },
    methods:{
      redirect(to){
        this.$router.push({
          name:"communicateService",
          params:{
            to
          }
        })
      }
    },
    async created() {
      this.to = store.state.user.userID
      // get all message to me
      const result = await reqMessages(null,this.to,this);
      if(result.code === '200'){
        for(let key in result.data){
          const message = result.data[key].pop().message;
          const resAvatar = await reqUser(key,this);
          if(resAvatar.code === '200'){
            const {avatar} = resAvatar.data;
            this.messageList.push({from:key,avatar,message})
          }
        }
      }
    }
  }
</script>

<style scoped>
.message-item>div{
    display: flex;
    align-items: center;
}
</style>