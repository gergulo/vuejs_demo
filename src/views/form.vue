<style scoped>
</style>
<template>
<div class="g-center common-page" @keyup.enter="save">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="common-form">
    <el-form-item label="活动名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="活动区域" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
        <el-option label="上海" value="shanghai"></el-option>
        <el-option label="北京" value="beijing"></el-option>
        <el-option label="广州" value="guangzhou"></el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="活动时间" required>
        <el-col :span="11">
        <el-form-item prop="date1">
            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
        </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
        <el-form-item prop="date2">
            <el-time-picker type="fixed-time" placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
        </el-form-item>
        </el-col>
    </el-form-item>
    <el-form-item label="最少成团人数" prop="num">
      <el-input-number v-model="ruleForm.num" @change="handleChange" :min="4" :max="20"></el-input-number>
    </el-form-item>
    <el-form-item label="是否租车" prop="delivery">
        <el-switch v-model="ruleForm.delivery"></el-switch>
    </el-form-item>
    <el-form-item label="活动性质" prop="type">
        <el-radio-group v-model="ruleForm.type">
        <el-radio label="聚餐" name="type"></el-radio>
        <el-radio label="登山" name="type"></el-radio>
        <el-radio label="骑行" name="type"></el-radio>
        <el-radio label="综合" name="type"></el-radio>
        </el-radio-group>
    </el-form-item>
    </el-form-item>
        <el-form-item label="特殊资源" prop="resource">
        <el-checkbox-group v-model="ruleForm.resource">
        <el-checkbox label="防晒" name="resource"></el-checkbox>
        <el-checkbox label="药品" name="resource"></el-checkbox>
        </el-checkbox-group>
    </el-form-item>
    <el-form-item label="活动形式" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
    </el-form-item>
    <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>  
</div>
</template>
<script>
  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          num: 4,
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请选择活动性质', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        var vm = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            vm.$message({
            message: '保存成功！',
            type: 'success'
          });
        }else{
          vm.$message({
            message: '表单信息错误！',
            type: 'error'
          });
        }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleChange(){

      }
    }
  }
</script>