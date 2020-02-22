<template>
    <div>
        <headerNav title="Edit Address"/>
        <van-form @submit="onSubmit">
            <van-field
                    v-model="address.name"
                    name="name"
                    label="name"
                    placeholder="name"
                    :rules="[{ required: true, message: 'please input name' }]"
            />
            <van-field
                    v-model="address.tel"
                    name="tel"
                    label="tel"
                    placeholder="tel"
                    :rules="[{ required: true, message: 'please input tel' }]"
            />
            <van-field
                    :value="address.area"
                    name="area"
                    label="area"
                    placeholder="area"
                    :rules="[{ required: true, message: 'please input area' }]"
                    disabled
            />
            <van-field
                    v-model="address.address"
                    name="addressDetail"
                    label="address"
                    placeholder="address"
                    :rules="[{ required: true, message: 'please input address' }]"
            />
            <van-cell center title="Set as default address">
                <van-switch v-model="address.isDefault" slot="right-icon" size="24" />
            </van-cell>
            <div style="margin: 16px;">
                <van-button round block type="danger" native-type="submit">
                    Save
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
  import areaList from '../../../data/area';
  import { GetAddressById,SaveAddress,DelAddress } from "../../../api/user.js";
  import {reqAddAddress, reqUpdateAddress} from "../../../api";
  export default {
    data() {
      return {
        areaList,
        showDelete:false,
        info:{},
        address:this.$route.params.address
      }
    },
    created() {
      if(!this.$route.params.address){
        this.$router.push("/user/index")
      }
    },
    methods: {
      async onSubmit(data) {
        console.log(this.address)
        let result;
        const {address} = this;
        if(this.address.addressID){
          result = await reqUpdateAddress(address,this)
        }else {
          result = await reqAddAddress(address,this)
        }
        if(result.code==='200'){
          this.$toast.success(result.message)
          this.$router.push("/user/address")
        }
      },
      onDelete(data) {
        DelAddress(data).then(response=>{
          this.$toast('删除成功');
          this.$router.go(-1);
        })
      },
    },

  }
</script>

<style>
    .van-picker__toolbar{
        font-size: 16px;
    }
</style>
