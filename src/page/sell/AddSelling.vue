<template>
    <div class="add-selling">
        <van-uploader :after-read="afterRead" />
    </div>
</template>

<script>
  import {reqUpload} from "../../api";

  export default {
    name: "AddSelling",
    data() {
      return {
      }
    },
    methods: {
      async afterRead(file) {
        // 此时可以自行将文件上传至服务器
        console.log(file);
        const result = await reqUpload(file.content,this)
        if(result.code === '200'){
          console.log(result.data);
        }
      }
    }
  }
</script>

<style scoped>

</style>