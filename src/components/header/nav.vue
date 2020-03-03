<template>
    <van-nav-bar
    :title="title"
    left-text=""
    left-arrow
    @click-left="onBack"
    />
</template>

<script>
import { NavBar  } from 'vant';
export default {
    name:'headerNav',
    components:{
         [NavBar.name]: NavBar,
    },
    props:{
        title:String,
    },
    methods: {
        onBack() {
          console.log('goback')
          console.log(this.$route)
          if(this.$route.name==='cart'){
            this.$router.replace("/")
          }else {
            this.$router.go(-1)
          }
        },
    }
}
</script>

<style>

</style>
