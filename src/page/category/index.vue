<template>
    <div>
        <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        >
        <div slot="action" @click="onSearch">搜索</div>
        </van-search>
        <van-badge-group :active-key="activeKey" class="tab" :style="'height:'+fullHeight+'px'">
            <van-badge v-for="type in types" :title="type" :key="type" @click="onClick(type)"/>
        </van-badge-group>
        <div class="content" :style="'width:'+fullWidth+'px;height:'+(fullHeight-7)+'px'" >
            <img :src='banner' />
            <div class="category-div">
                <h4>{{currentType}}</h4>
                <ul >
                    <li v-for="book in bookList">
                      <router-link to="/search?keyword=xxxx">
                        <img :src="book.bookImg">
                        <span>{{book.bookName}}</span>
                      </router-link>
                    </li>
                    <div style="clear:both"></div>
                </ul>
            </div>
        </div>
        <navigate />
    </div>
</template>

<script>
import { Search } from "vant";
import {reqBooksByCategory, reqCategories, reqProducts} from "../../api";
import  banner from '../../assets/images/banner.jpg'

export default {
  name: "userindex",
  components: {
    [Search.name]: Search
  },
  async created() {
    console.log('created!')
    const result = await reqCategories(this)
    if(result.code==='200'){
      for(let item of result.data){
        this.types.push(item)
      }
    }
    const resultBooks = await reqBooksByCategory(null,this)
    if(resultBooks.code==='200'){
      this.bookList = resultBooks.data
    }
  },
  data() {
    return {
      banner,
      value: "",
      activeKey: 0,
      fullHeight: document.documentElement.clientHeight - 93,
      fullWidth: document.documentElement.clientWidth - 99,
      types:['All'],
      currentType:'All',
      bookList:[]
    };
  },
  methods: {
    onSearch() {
      console.log(this.value);
    },
    async onClick(key) {
      this.activeKey = key;
      this.currentType = key;
      let result;
      if (key==='All'){
        result = await reqBooksByCategory(null,this)
      }else {
        result = await reqBooksByCategory(key,this)
      }
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
