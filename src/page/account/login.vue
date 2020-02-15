<template>
    <div class="login">
        <Form class="login-form" ref="formInline" :model="formInline" :rules="ruleInline">
            <h1>Login</h1>
            <FormItem prop="username" class="login-form-item">
                <Input type="text" v-model="formInline.username" placeholder="Username">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="password" class="login-form-item">
                <Input type="password" v-model="formInline.password" placeholder="Password">
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem class="login-form-item">
                <van-button class="login-btn" @click="handleSubmit('formInline')"type="primary">Signin</van-button>
                <van-button class="login-btn" type="warning" to="/register">Register</van-button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
  import {reqLogin} from "../../api";
  import store from "../../store/index"
  import storageUtils from "../../utils/storageUtils";

  export default {
    name: "Login",
    data () {
      return {
        formInline: {
          username: '',
          password: ''
        },
        ruleInline: {
          username: [
            { required: true, message: 'Please fill in the user name', trigger: 'blur' }
          ],
          password: [
            { required: true, message: 'Please fill in the password.', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate(async (valid) => {
          if (valid) {
            //获取数据
            const {username,password} = this.formInline;
            const result = await reqLogin(username,password,this)
            if(result.code==='200'){
              this.$Message.success(result.message)
              store.commit('setUser',result.data)
              storageUtils.setUser(result.data)
              this.$router.push("/user/index")
            }else {
              this.$Message.error(result.message)
            }
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
    .login{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;

        .login-form{
            width: 80%;
            max-width: 350px;
            margin-top: 30px;

            h1{
                text-align: center;
                margin-bottom: 10px;
            }
            .login-form-item{
                height: 49px;
            }
            .login-btn{
                width: 100%;
                height: 49px;
                margin-bottom: 10px;
            }
        }
    }
</style>