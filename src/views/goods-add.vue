<style scoped>
</style>
<template>
<div class="g-center common-page" @keyup.enter="save">
  <el-form class="common-form" label-width="100px">
    <el-form-item label="药品名称" prop="name">
      <el-input :autofocus="true" placeholder="请输入药品名称" v-model="name"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click.native="save" type="primary" :loading="isBtnLoading">{{btnText}}</el-button>
    </el-form-item>
    </el-form>
  </div>
</template>

<script>
import * as util from '../assets/util.js';
import * as goods from "../api/goods";

export default {
  data() {
    return {
      name: '',
      isBtnLoading: false
    };
  },
  computed: {
    btnText() {
      if (this.isBtnLoading) return '保存中...';
      return '保存';
    }
  },
  methods: {
    save() {
      var vm = this;
      if (!vm.name) {
        vm.$message.error('请填写药品名称！！！');
        return;
      }
      let id = Math.floor(Math.random()*10000+1);
      let params = {id:id, name: vm.name};
      vm.isBtnLoading = true;
      goods.add.r(params).then(res => {
        vm.isBtnLoading = false;
        if(res.data){
          vm.$message({
            message: '保存成功！',
            type: 'success'
          });
        }else{
          vm.$message({
            message: '保存失败！',
            type: 'error'
          });
        }
      }).catch(util.catchError);
    }
  }
};
</script>
