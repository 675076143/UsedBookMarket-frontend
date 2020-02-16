<template>
    <div class="published">
        <van-nav-bar
                title="Published"
                left-text="back"
                left-arrow
                @click-left="()=>{this.$router.back()}"
        />
        <van-swipe-cell v-for="item in published">
            <van-card
                      @click="redirect(item)"
                      :price="item.price"
                      :desc="item.bookDesc"
                      :title="item.bookName"
                      :thumb="BASE_IMG_URL+item.image">
            </van-card>
            <van-button
                    slot="right"
                    square
                    text="Modify"
                    type="info"
                    style="height: 100%"
                    @click="showPopup(item)"
            />
            <van-button
                    slot="right"
                    square
                    text="Delete"
                    type="danger"
                    style="height: 100%"
                    @click="deleteBook(item.bookID)"
            />
        </van-swipe-cell>
        <van-popup v-model="show" position="bottom">
            <van-uploader v-model="fileList" :after-read="afterRead" :max-count="1" style="margin: 10px" />
            <van-cell-group>
                <van-field v-model="currentBook.bookName" type="text" label="名称" />
                <van-field
                        v-model="currentBook.bookDesc"
                        rows="8"
                        autosize
                        label="描述"
                        type="textarea"
                        placeholder="Old and new degree, starting channel, transfer reason"
                />
                <van-field v-model="currentBook.price" type="number" label="price" />

                <van-dropdown-menu direction="up">
                    <van-dropdown-item v-model="currentBook.categoryID" :options="categories" />
                </van-dropdown-menu>
                <van-button type="info" style="width: 100%;" @click="modifyBook">Modify Book</van-button>
            </van-cell-group>
        </van-popup>

    </div>
</template>

<script>
  import {reqAddSellingBook, reqCategories, reqDeleteBook, reqModifyBook, reqPublished, reqUpload} from "../../api";
  import store from '../../store'
  import {BASE_IMG_URL} from "../../utils/constants";

  export default {
    name: "Published",
    methods:{
      redirect(item){
        this.$router.push(`/product/${item.bookID}`)
      },
      async initPublishedList(){
        const {userID} = store.state.user;
        const result = await reqPublished(userID,this)
        if(result.code==='200'){
          this.published = result.data
        }
      },
      showPopup(item) {
        this.show = true;
        this.currentBook = item;
        this.fileList = [{url:BASE_IMG_URL+item.image}]
      },
      async afterRead(file) {
        file.status = 'uploading';
        file.message = '上传中...';
        const result = await reqUpload({file:file.content},this)
        if(result.code === '200'){
          file.status = 'done';
          file.message = '上传成功';
          this.currentBook.image = result.data.fileName;
        }else {
          file.status = 'failed';
          file.message = '上传失败';
        }
      },
      async modifyBook(){
        const result = await reqModifyBook(this.currentBook,this);
        if(result.code==='200'){
          this.$toast.success(result.message);
          this.show = false;
        }else {
          this.$toast.fail(result.message)
        }
      },
      async deleteBook(bookID){
        const request = {data:{bookID}};
        const result = await reqDeleteBook(request,this);
        if(result.code==='200'){
          this.$toast.success(result.message);
          this.initPublishedList();
        }else {
          this.$toast.fail(result.message)
        }
      }
    },
    data(){
      return{
        published:[],
        BASE_IMG_URL,
        show:false,
        currentBook:{},
        categories: [],
        fileList: [],
      }
    },
    async created() {
      this.initPublishedList();
      const resultCategories = await reqCategories(this)
      if (resultCategories.code === '200') {
        for (let item of resultCategories.data) {
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