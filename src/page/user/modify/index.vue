<template>
    <van-cell-group>
        <van-uploader v-model="fileList" :after-read="afterRead" :max-count="1" style="margin: 10px" />
        <van-field label="userName" :value="user.userName" disabled />
        <van-field label="createTime" :value="user.create_time" disabled />
        <van-field label="email" v-model="user.email"  />
        <van-field label="phone" type="tel" v-model="user.phone" />
        <van-field label="balance(￥)" type="number" v-model="user.balance" disabled />
        <van-button type="info" class="submit" @click="()=>{handleSubmit()}">Modify Profile</van-button>
    </van-cell-group>
</template>

<script>
  import  store from '../../../store'
  import {reqModifyProfile, reqUpload} from "../../../api";
  import {BASE_IMG_URL} from "../../../utils/constants";
  import storageUtils from "../../../utils/storageUtils";
  export default {
    name: "edit",
    data(){
      return{
        fileList:[],
        user:store.state.user
      }
    },
    methods:{
      async handleSubmit(){
        const {user} = this
        const {userID,email,phone,balance,avatar} = user;
        const result = await reqModifyProfile(userID,email,phone,balance,avatar,this);
        if(result.code==='200'){
          this.$toast.success(result.message)
          store.commit('setUser',this.user)
          storageUtils.setUser(this.user)
        }else {
          this.$toast.fail(result.message)
        }
      },
      async afterRead(file) {
        file.status = 'uploading';
        file.message = '上传中...';
        const result = await reqUpload({file:file.content},this)
        if(result.code === '200'){
          file.status = 'done';
          file.message = '上传成功';
          this.user.avatar = result.data.fileName;
        }else {
          file.status = 'failed';
          file.message = '上传失败';
        }
      },
    },
    created() {
      const {user} = store.state
      this.fileList = [{url:BASE_IMG_URL+user.avatar}]

    }
  }
</script>

<style scoped>
.submit{
    width: 100%;
}
</style>