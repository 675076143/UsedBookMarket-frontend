<template>
  <div class="card">
    <headerNav title="购物车"/>
       <van-cell  value="编辑商品" class="head">
        <template slot="title">
          <van-checkbox v-model="checkedAll" >全选</van-checkbox>
        </template>
      </van-cell>

    <van-checkbox-group class="card-goods" v-model="checkedGoods">

      <div  v-for="(item,index) in goods"
        :key="index+10" class="card-goods__item">
        <van-checkbox :name="item.id"></van-checkbox>

        <product-card :product='item' :iscard='true' >
          <template slot>
            <van-cell value="修改" >
                <template slot="title">
                    <van-tag type="danger">促销</van-tag>
                    <span class="van-cell-text" >满60元减5元</span>
                </template>
            </van-cell>
          </template>
        </product-card>
      </div>
    </van-checkbox-group>

    <div style="height:50px;"></div>
    <van-submit-bar
      :price="totalPrice"
      :disabled="!checkedGoods.length"
      :button-text="submitBarText"
      @submit="onSubmit"
    >
    <template slot>
      <van-checkbox v-model="checkedAll" >全选</van-checkbox>
    </template>
    </van-submit-bar>
  </div>
</template>

<script>

export default {
  components: {
  },
  data() {
    return {
      checkedAll:true,
      checkedGoods: ['1'],
      goods: [{
        id: '1',
        title: 'The Old Man and The Sea',
        desc: '',
        price: '200.00',
        quantity: 1,
        imageURL: 'http://img10.360buyimg.com/n0/jfs/t1/83851/11/10334/500835/5d8057c8Eb0ec0a59/2d94e84aaeeeda27.jpg',
        imageTag:'比加入时降5元',
      }]
    };
  },
  computed: {
    submitBarText() {
      const count = this.checkedGoods.length;
      return '结算' + (count ? `(${count})` : '');
    },
    totalPrice() {
      return this.goods.reduce((total, item) => total + (this.checkedGoods.indexOf(item.id) !== -1 ? parseFloat(item.price): 0), 0);
    },
  },
  methods: {
    onSubmit() {

      this.$router.push('/order')
    }
  }
};
</script>

<style lang="less">
.card-goods {
  font-size: 12px;
  &__item {
    position: relative;
    .van-checkbox{
      width: 20px;
      height: 20px;
      top: 40px;
      left: 5px;
      z-index: 1;
      position: absolute;
    }
    .additional{
      width: 100%;
        padding-left: 15px;
    box-sizing: border-box;
    }
  }
}
.head{
      padding-left: 5px;
  border-bottom: 1px solid #eee;
}
.card{
  background: #f7f7f7;
  .van-submit-bar__bar {
      border-top: 1px solid #f7f7f7;
      .van-checkbox{
        padding-left: 5px;
      }
  }
  .promotion{
      .van-tag {
          line-height: 12px;
          margin-right: 5px;
      }
      .van-cell__title{

      flex: 4;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      }
    }
    .promotion-group{
      margin-top: 10px;
      box-shadow: 5px 5px 5px #e5e5e5;
    }
}


</style>
