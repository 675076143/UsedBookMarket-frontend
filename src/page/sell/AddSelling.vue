<template>
    <div class="add-selling">
        <div class="demo-upload-list" v-for="item in uploadList">
            <template v-if="item.status === 'finished'">
                <img :src="item.url">
                <div class="demo-upload-list-cover">
                    <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                    <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                </div>
            </template>
            <template v-else>
                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
            </template>
        </div>
        <Upload
                ref="upload"
                :show-upload-list="false"
                :default-file-list="defaultList"
                :on-success="handleSuccess"
                :format="['jpg','jpeg','png']"
                :max-size="2048"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :before-upload="handleBeforeUpload"
                multiple
                type="drag"
                :action="BASE_URL+'/api/upload/uploadImg.php'"
                style="display: inline-block;width:150px; height: 150px">
            <div style="width: 150px;height:150px;line-height: 150px;">
                <Icon type="ios-camera" size="20"></Icon>
            </div>
        </Upload>
        <Modal title="View Image" v-model="visible">
            <img :src="'' + imgName" v-if="visible" style="width: 100%">
        </Modal>
        <van-dropdown-menu>
            <van-dropdown-item v-model="category" :options="categories" />
        </van-dropdown-menu>
        <van-button type="primary">Add Selling Book</van-button>
    </div>
</template>

<script>
  import {reqCategories, reqUpload} from "../../api";
  import {BASE_IMG_URL, BASE_URL} from "../../utils/constants";


  export default {
    name: "AddSelling",
    data () {
      return {
        BASE_URL,
        BASE_IMG_URL,
        defaultList: [],
        imgName: '',
        visible: false,
        uploadList: [],
        category: 1,
        categories: [],
      }
    },
    methods: {
      handleView (name) {
        this.imgName = BASE_URL+name;
        this.visible = true;
      },
      handleRemove (file) {
        const fileList = this.$refs.upload.fileList;
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
      },
      handleSuccess (res, file) {
        file.url = BASE_URL+res.data.url
        file.name = res.data.fileName
      },
      handleFormatError (file) {
        this.$Notice.warning({
          title: 'The file format is incorrect',
          desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
        });
      },
      handleMaxSize (file) {
        this.$Notice.warning({
          title: 'Exceeding file size limit',
          desc: 'File  ' + file.name + ' is too large, no more than 2M.'
        });
      },
      handleBeforeUpload () {
        const check = this.uploadList.length < 1;
        if (!check) {
          this.$Notice.warning({
            title: 'Up to one pictures can be uploaded.'
          });
        }
        return check;
      }
    },
    async created() {
      const result = await reqCategories(this)
      if(result.code === '200'){
        for (let item of result.data){
          const category = {
            text:item.categoryName,
            value:item.categoryID
          }
          this.categories.push(category)
        }
      }
    },
    mounted () {
      this.uploadList = this.$refs.upload.fileList;
    }
  }
</script>

<style scoped>
    .add-selling{
        background-color: #f6f6f6;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .demo-upload-list{
        display: inline-block;
        width: 150px;
        height: 150px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>