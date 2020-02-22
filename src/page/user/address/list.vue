<template>
    <div>
        <headerNav title="Address"/>
        <van-address-list
                v-model="chosenAddressId"
                :class="isSelect?'':'hideselect'"
                :list="list"
                @add="onAdd"
                @edit="onEdit"
                @select="onSelect"
                @click-item="handleClick"
                default-tag-text="Default"
                add-button-text="Add Address"
        />
        <van-popup
                v-model="show"
               round
               position="bottom"
               :style="{ height: '35%' }">
            <van-field v-model="current.name" disabled label="name" />
            <van-field v-model="current.tel" disabled label="tel"/>
            <van-field v-model="current.area" disabled label="area"/>
            <van-field v-model="current.address" disabled label="address"/>
            <van-button type="danger" style="width: 100%" @click="handleDelete">delete</van-button>
        </van-popup>
    </div>
</template>

<script>

  import { GetAddressList } from "../../../api/user.js";
  import store from '../../../store'
  import {reqAddresses, reqDeleteAddress} from "../../../api";
  export default {
    data() {
      return {
        chosenAddressId: '1',
        isSelect:false,
        list: [],
        current:{},
        show:false
      }
    },

    methods: {
      handleDelete(){
        this.$dialog.confirm({
          title: 'Confirm',
          message: 'Are you sure you want to delete it?',
          confirmButtonText:"Delete",
          cancelButtonText:'Cancel'
        }).then(async () => {
          const request = {data:this.current};
          const result = await reqDeleteAddress(request,this);
          if(result.code==='200'){
            this.$toast.success(result.message)
            this.initData();
          }else {
            this.$toast.fail(result.message)
          }
          this.show = false
        }).catch(() => {
          // on cancel
        });
      },
      handleClick(item,index){
        this.show = true;
        this.current = item;
      },
      onAdd() {
        this.$router.push({
          name:'editAddress',
          params:{address:{
              name:"",
              tel:"",
              area:"Macau",
              address:"",
              isDefault:false,
              userID:store.state.user.userID
            }}
        })
      },

      onEdit(item, index) {
        this.$router.push({
          name:'editAddress',
          params:{address:item}
        })
      },
      onSelect(item,index){
        if(!this.isSelect){
          return;
        }
        this.$emit('selectAddress',item);
        this.$router.go(-1);
      },
      async initData(){
        const {userID} = store.state.user;
        const result = await reqAddresses(userID,this);
        if(result.code ==='200'){
          this.list=result.data.map(item=>{
            const newItem  = item;
            item.isDefault==="1"?newItem.isDefault=true:newItem.isDefault=false;
            return newItem;
          })
        }
      }
    },
    async created(){
      this.initData();
      this.chosenAddressId=this.$route.query.id;
    }
  }
</script>

<style lang="less">
    .hideselect{
        .van-radio__input{
            display: none;
        }
    }
</style>
