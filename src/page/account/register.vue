<template>
    <div>
      <headerNav title="register"/>
        <h1 style="margin:20px">Register</h1>
        <div>
            <van-cell-group>
                <van-field
                        placeholder="please input username" v-model="userName"
                />
                <van-field
                        type="password"
                        placeholder="please input password" v-model="password"
                />
                <van-field
                        type="password"
                        placeholder="please confirm password" v-model="passwordConfirm"
                />
            </van-cell-group>
            <div style="margin: 10px;">
                <van-button size="large" type="primary" style="height: 45px;line-height:45px;" @click="register">Register</van-button>
            </div>
        </div>
    </div>
</template>

<script>
import {reqRegister} from "../../api";

export default {
    data(){
      return{
        userName:"",
        password:"",
        passwordConfirm:""
      }
    },
  methods:{
      async register(){
        const result = await  reqRegister(this.userName,this.password,this)
        if(result.code ==='200'){
          this.$toast.success('register success')
          this.$router.push("/login")
        }else {
          this.$toast.fail(result.message)
        }
      }
  }
}
</script>

<style>

</style>
