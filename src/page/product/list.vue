<template>
    <div class="product-list">
        <van-nav-bar left-arrow class="product-serach"
                     @click-left="onBack"
        >
            <van-search
                v-model="keyword"
                placeholder="Please enter search keywords"
                show-action
                slot="title"
                @search="onSearch"
        >
            <div slot="action" @click="onSearch">Search</div>
        </van-search>
        </van-nav-bar>
        <div class="filterbar">
            <ul :class="filtersort?'show':''">
                <li :class="filterindex==0?'selected':''" v-on:click="onFilterBar(0)"><span>{{filterindex==11?'lowest price':(filterindex==12?'highest price':'default')}}</span><van-icon name="arrow" class="down" /></li>
                <li :class="filterindex==1?'selected':''" v-on:click="onFilterBar(1)"><span>sales</span></li>
                <li :class="filterindex==2?'selected':''" v-on:click="onFilterBar(2)"><span>new</span></li>
                <li :class="filterindex==3?'selected':''" v-on:click="onFilterBar(3)"><span>filters</span></li>
            </ul>
            <div :class="'item_options '+(filtersort?'show':'')">
                <ul>
                    <li :class="filterindex==10?'selected':''" v-on:click="onFilterBar(10)">default</li>
                    <li :class="filterindex==11?'selected':''"  v-on:click="onFilterBar(11)">lowest price</li>
                    <li :class="filterindex==12?'selected':''" v-on:click="onFilterBar(12)">highest price</li>
                </ul>
            </div>
            <van-popup v-model="filtershow" position="right" class="filterlayer" >
                <div class="filterInner" style="overflow-y: scroll;max-height: 100%;">
                    <van-checkbox-group v-model="categoryID">
                        <van-cell-group>
                            <van-cell
                                    v-for="(item,index) in categories"
                                    clickable
                                    :key="item.categoryID"
                                    :title="item.categoryName"
                                    @click="toggle(index)"
                            >
                                <van-checkbox slot="right-icon" :name="item.categoryID" ref="checkboxes" />
                            </van-cell>
                        </van-cell-group>
                    </van-checkbox-group>
                    <div style="clear: both;"></div>
                    <van-button size="large"  style="height: 40px;margin-bottom: 15px;line-height: 40px;" @click="clear">Clear</van-button>
                    <div style="height:50px;"></div>
                </div>
                <div class="filterlayer_bottom_buttons">
                    <span class="filterlayer_bottom_button cancel" @click="()=>{this.filtershow=!this.filtershow}">Cancel</span>
                    <span class="filterlayer_bottom_button confirm" @click="onSearch">Confirm</span>
                </div>
            </van-popup>
        </div>
        <router-link :to="'/product/:'+item.bookID"  v-for="item in books">
            <van-card
                    :price="item.price"
                    :desc="item.bookDesc"
                    :title="item.bookName"
                    :thumb="BASE_IMG_URL+item.image"
            />
        </router-link>
    </div>
</template>

<script>
  import { Search } from "vant";
import searchtop from "../../components/search/searchtop";
import {reqCategories, reqSearchBooks} from "../../api";
import {BASE_IMG_URL} from "../../utils/constants";

export default {
  async created() {
    const result = await reqCategories(this);
    if(result.code === '200'){
      this.categories = result.data;
    }
    console.log(this.$route.params.keyword)
    this.keyword = this.$route.params.keyword;
    const resBooks = await reqSearchBooks(this.$route.params.keyword,this.result,null,null,this);
    if(resBooks.code === '200'){
      this.books = resBooks.data;
    }else {
      this.books = [];
    }
  },
  components: {
    searchtop,
    [Search.name]: Search
  },
  data() {
    return {
      keyword: "",
      filterindex: 0,
      filtersort: false,
      filtershow: false,
      categories:[],
      list: ['a', 'b'],
      categoryID: [],
      BASE_IMG_URL,
      books:[],
      order:null,
      sort:null,
    };
  },
  methods: {
    clear(){
      this.categoryID = []
    },
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
    onFilterBar(value) {
      console.log(value)
      if (value == 0) {
        this.filtersort = !this.filtersort;
      } else if (value == 3) {
        this.filtershow = !this.filtershow;
      } else {
        this.filtersort = false;
        this.filterindex = value;
      }
      if(value === 10){
        this.order = null
        this.onSearch();
      }else if(value === 11){
        this.order = 'price';
        this.sort = 'asc';
        this.onSearch();
      }else if(value === 12){
        this.order = 'price';
        this.sort = 'desc';
        this.onSearch();
      }
    },
    showProduct(product){
        this.$router.push('/product/'+product.id);
    },
    onBack() {
      history.back();
    },
    async onSearch(){
      console.log('categoryID=>',this.categoryID);
      const {keyword,categoryID,order,sort} = this;
      const result = await reqSearchBooks(keyword,categoryID,order,sort,this);
      if(result.code === '200'){
        this.books = result.data;
      }else {
        this.books = [];
      }
      this.filtershow = false;
    }
  }
};
</script>

<style lang="less">
.product-list{
    .additional .price{
        position: absolute;
        bottom: 6px;
        height: 34px;
    }
}
.filterbar {
  font-size: 14px;
  position: relative;
  ul {
    width: 100%;
    height: 40px;
  }
  li {
    color: #999;
    width: 25%;
    float: left;
    text-align: center;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #eee;
    i {
      font-size: 12px;
      margin-left: 2px;
    }
    .down {
      -webkit-transform: rotate(90deg);
      transform: rotate(90deg);
    }
  }
  .selected {
    color: #e93b3d;
  }
  .show {
    .down {
      -webkit-transform: rotate(-90deg);
      transform: rotate(-90deg);
    }
  }
  .item_options {
    width: 100%;
    position: absolute;
    top: 41px;
    background: #fff;
    display: none;
    z-index: 1;
    li {
      width: 100%;
      text-align: left;
      padding-left: 10px;
    }
  }

  .item_options.show {
    display: block;
  }
  .filterlayer {
    width: 85%;
    height: 100%;
    background-color: #f7f7f7;
    &_bottom {
      &_buttons {
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        z-index: 10;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;

        .cancel {
          color: #333;
          background-color: #fff;
          box-shadow: 0 -1px 2px 0 rgba(0, 0, 0, 0.07);
        }
        .confirm {
          color: #fff;
          background-color: #e93b3d;
        }
      }
      &_button {
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        font-size: 16px;
        height: 49px;
        line-height: 49px;
        text-align: center;
      }
    }
    ul {
      height: auto;
      background: #fff;
      margin-bottom: 15px;
    }
    li {
      width: 100%;
      text-align: left;
        height: auto;
        line-height: initial;
      .van-cell{
        font-size: 16px;
      }
      .big {
        height: 25px;
        max-width: 250px;
        overflow: hidden;
        font-size: 16px;
        color: #333;
        text-overflow: ellipsis;
        margin-left: 10px;
      }
    }
    .filterInner{
        overflow-y: scroll;
        max-height: 100%;
        .van-button{
            height: 40px;
            margin-bottom: 15px;
            line-height: 40px;
        }
    }
    .tags_selection {
      font-size: 14px;
      text-align: center;
      background-color: #fff;
      position: relative;
      margin: 0;
      padding: 10px 0 0 10px;
      .option {
        box-sizing: border-box;
        float: left;
        width: 33.33%;
        padding-right: 10px;
        height: 30px;
        line-height: 30px;
        margin-bottom: 10px;
        a {
          position: relative;
          display: block;
          padding: 0 5px;
          color: #666;
          background-color: #f7f7f7;
          border-radius: 4px;
          overflow: hidden;
          text-overflow: ellipsis;
            height: 30px;
        }
      }
    }
  }
}
</style>
