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
          if(this.$route.name === 'cart'){
            this.$router.push('/')
          }else {
            history.back();
          }
        },
    }
}
</script>

<style>

</style>
