<template>
    <div>
        <van-action-sheet v-model="show" :actions="actions" @select="onSelect" description="Choose your school" />
        <van-search
        v-model="value"
        placeholder="keywords"
        show-action
        @search="onSearch"
        >
        <span slot="label" @click="changeSchool">{{school.name}}</span>
        <div slot="action" @click="onSearch">Search</div>
        </van-search>
        <van-sidebar :active-key="activeKey" class="tab" :style="'height:'+fullHeight+'px'">
            <van-sidebar-item v-for="type in types" :title="type.categoryName" :key="type.categoryID" @click="onClick(type)"/>
        </van-sidebar>
        <div class="content" :style="'width:'+fullWidth+'px;height:'+(fullHeight-7)+'px'" >
            <img :src='banner' />
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh"
                              loading-text="loading..."
                              loosing-text="release to refresh..."
                              pulling-text="pull to refresh...">
            <div class="category-div">
                <h4>{{currentType}}</h4>
                <ul >
                    <li v-for="book in bookList">
                      <router-link :to="'/product/:'+book.bookID">
                        <img :src="BASE_IMG_URL+book.image">
                        <span>{{book.bookName}}</span>
                      </router-link>
                    </li>
                    <div style="clear:both"></div>
                </ul>
            </div>
            </van-pull-refresh>
        </div>
        <navigate />
    </div>
</template>

<script>
import { Search } from "vant";
import {reqBooksByCategory, reqCategories, reqProducts} from "../../api";
import  banner from '../../assets/images/banner.jpg'
import {BASE_IMG_URL} from "../../utils/constants";
import store from '../../store'
import storageUtils from "../../utils/storageUtils";
export default {
  name: "userindex",
  components: {
    [Search.name]: Search
  },
  /**
   * 创建页面
   * @returns {Promise<void>}
   */
  async created() {
    console.log('created!')
    //从localStorage中读取学校
    if(storageUtils.getSchool()){
      console.log("getschoo=>",storageUtils.getSchool())
      this.show = false;
      store.commit('setSchool',storageUtils.getSchool());
      this.school = storageUtils.getSchool();
    }
    //获取所有分类信息
    const result = await reqCategories(this)
    if(result.code==='200'){
      for(let item of result.data){
        this.types.push(item)
      }
    }
    //获取所有书籍
    this.getBooks();
  },
  data() {
    return {
      isLoading:false,
      banner,
      BASE_IMG_URL,
      value: "",
      activeKey: "0",
      fullHeight: document.documentElement.clientHeight - 93,
      fullWidth: document.documentElement.clientWidth - 99,
      types:[{
        categoryName:"All",
        categoryID:null
      }],
      currentType:'All',
      bookList:[],
      school:store.state.school,
      show:true,
      actions: [
        { id:1,name: 'UM MACAU' },
        { id:2,name: 'IFT' },
        { id:3,name: 'IPM'},
        { id:4,name: 'MUST'}
      ]
    };
  },
  methods: {
    changeSchool(){
      this.show = true;
    },
    onSelect(item) {
      this.show = false;
      store.commit('setSchool',item);
      storageUtils.setSchool(item);
      this.school = item;
      this.activeKey = "0";
      this.getBooks();
    },
    onSearch() {
      console.log(this.value);
      this.$router.push({
        name:'search',
        params:{keyword:this.value}
      })
    },
    async onClick(key) {
      console.log(key)
      this.activeKey = key.categoryID;
      this.currentType = key.categoryName;
      this.getBooks(key==='All'?null:key.categoryID);
    },
    async onRefresh(){
      //获取所有书籍
      await this.getBooks(this.activeKey);
      this.isLoading = false
    },

    async getBooks(categoryID=null){
      //从localStorage中读取学校
      const schoolID = storageUtils.getSchool().id;
      const result = await reqBooksByCategory(categoryID,schoolID,this);
      if(result.code==='200'){
        this.bookList = result.data
      }
    }

  }
};
</script>

<style lang="less">
.tab {
  float: left;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  min-height: 100%;
  .van-badge {
    padding: 15px 12px 15px 9px;
  }
  .van-badge:not(:last-child)::after {
    height: 199%;
  }
}
.content {
  float: left;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  min-height: 100%;
  margin: 7px 7px 0;
  font-size: 12px;
  img {
    width: 100%;
  }
  .category-div {
    margin: 19px 0px 0;
    h4 {
      font-size: 14px;
      color: #333;
    }
    ul{
        margin-top: 10px;
    }
    li {
      width: 32.8%;
      float: left;
      text-align: center;
      img {
        width: 60px;
        height: 60px;
      }
      span{
          font-size: 12px;
    height: 36px;
    color: #686868;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: box;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-box;
    display: -o-box;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    -moz-line-clamp: 2;
    -ms-line-clamp: 2;
    -o-line-clamp: 2;
    box-orient: vertical;
    -webkit-box-orient: vertical;
    -ms-box-orient: vertical;
    -o-box-orient: vertical;
    word-break: break-all;
    box-align: center;
    -webkit-box-align: center;
    -moz-box-align: center;
    -ms-box-align: center;
    -o-box-align: center;
    box-pack: center;
    -webkit-box-pack: center;
    -moz-box-pack: center;
    -ms-box-pack: center;
    -o-box-pack: center;
    z-index: 2;
    position: relative;
      }
    }
  }
}
</style>
