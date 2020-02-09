<template>
    <div class="add-selling">
        <van-cell-group>
            <van-field v-model="bookName" type="text" label="名称" />
            <van-field
                    v-model="bookDesc"
                    rows="8"
                    autosize
                    label="描述"
                    type="textarea"
                    placeholder="品牌型号，新旧程度，入手渠道，转手原因"
            />
            <van-field v-model="price" type="number" label="价格" />
            <van-uploader v-model="fileList" :after-read="afterRead" :max-count="1" />
            <van-dropdown-menu>
                <van-dropdown-item v-model="categoryID" :options="categories" />
            </van-dropdown-menu>
            <van-button type="primary" style="width: 100%;" @click="addSellingBook">Add Selling Book</van-button>
        </van-cell-group>
    </div>
</template>

<script>
  import {reqAddSellingBook, reqCategories, reqUpload} from "../../api";
import store from '../../store'
  export default {
    name: "AddSelling",
    data () {
      return {
        price:0,
        bookName:'',
        bookDesc:'',
        categoryID: '1',
        categories: [],
        fileList: [],
        image:''
      }
    },
    methods: {
      async afterRead(file) {
        file.status = 'uploading';
        file.message = '上传中...';
        const result = await reqUpload({file:file.content},this)
        if(result.code === '200'){
          file.status = 'done';
          file.message = '上传成功';
          this.image = result.data.fileName;
        }else {
          file.status = 'failed';
          file.message = '上传失败';
        }
      },
      async addSellingBook(){
        console.log(this.image)
        const {bookName,bookDesc,price,categoryID,image} = this;
        const {userID} = store.state.user
        this.$toast.loading('发布中')
        const result = await reqAddSellingBook({
          bookName,bookDesc,price,image,categoryID,userID
        },this);
        if(result.code==='200'){
          this.$toast.success('发布成功')
        }else {
          this.$toast.fail('发布失败')
        }
      }
    },
    async created() {
      const result = await reqCategories(this)
      if (result.code === '200') {
        for (let item of result.data) {
          const category = {
            text: item.categoryName,
            value: item.categoryID
          }
          this.categories.push(category)
        }
      }
    }
  }
</script>

<style scoped>
</style>