<style scoped>
  .common-form{
      margin: 0;
  }
</style>
<template>
  <div>
    <div v-loading="loading">
      <!-- 操作 -->
      <div class="operation">
        <el-button size="small" type="primary" v-has="[goods.request]" @click="fetchData">查询</el-button>
        <el-button size="small" type="primary" v-has="[goods.add]" @click="addGoods">新增</el-button>
        <el-button size="small" v-if="$_has([goods.request]) && canReset">重置</el-button>
        <el-button size="small" type="info" @click="requestNotAllowed">尝试发起越权请求</el-button>
      </div>
      <!-- list -->
      <el-table :data="list" v-loading="loading" stripe style="width: 100%">
        <el-table-column prop="id" label="商品编号">
        </el-table-column>
        <el-table-column prop="name" label="商品名称">
        </el-table-column>
        <el-table-column label="操作" width="350" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="info" v-has="[goods.edit]" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" v-has="[goods.remove]" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="修改药品" :visible.sync="dialogFormVisible">
        <el-form class="common-form" :model="selectRow">
          <el-form-item label="药品名称">
            <el-input
              :autofocus="true"
              placeholder="请输入药品名称"
              v-model="selectRow.name">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="width:100%" @click.native="save" type="primary" :loading="isBtnLoading">{{btnText}}</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
  </div>
</template>

<script>
import * as goods from "../api/goods";

let myMixin = {
  data: function() {
    return { goods, }
  }
}

export default {
  mixins: [myMixin],
  data() {
    return {
      list: [],
      loading: false,
      canReset: false,
      isBtnLoading: false,
      dialogFormVisible: false,
      selectRow: {},
    };
  },
  computed: {
    btnText() {
      if (this.isBtnLoading) return '保存中...';
      return '保存';
    }
  },
  methods: {
    fetchData: function() {
      let vm = this;
      vm.loading = true;
      goods.request.r(vm.queryParam).then(res => {
        vm.list = res.data;
        vm.loading = false;
      });
    },
    requestNotAllowed: function(){
      goods.notAllowed.r();
    },
    addGoods: function() {
      this.$router.push({ path: 'add'});
    },
    handleEdit(index, row) {
      let vm = this;
      vm.selectRow = row;
      vm.dialogFormVisible = true;
    },
    handleDelete(index, row) {
      let vm = this;
      vm.selectRow = row;
      let params = {id:vm.selectRow.id, name: vm.selectRow.name};
      goods.remove.r(params).then(res => {
        this.$message({
            message: '删除成功！',
            type: 'success'
          });
        vm.fetchData();
      });
    },
    save() {
      var vm = this;
      if (!vm.selectRow.name) {
        vm.$message.error('请填写药品名称！！！');
        return;
      }
      let params = {id:vm.selectRow.id, name: vm.selectRow.name};
      vm.isBtnLoading = true;
      goods.edit.r(params).then(res => {
        vm.isBtnLoading = false;
        if(res.data){
          vm.dialogFormVisible = false;
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
  },
  created() {
    this.fetchData();
  }
};
</script>
