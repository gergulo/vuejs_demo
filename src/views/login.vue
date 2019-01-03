<style scoped>
  #app{display: table;width:100%;height:100%}
  .main-title{text-align: center;}
  .des{text-align: center;color:#999;margin-bottom: 2em;}
  .login-form{
    width: 320px;
    height:160px;
    padding: 36px;
    margin:13% auto 0;
    border-radius: 5px;
		text-align: center;
    background-color: #fff;
  }
  .login-page{
    background:#324057;
  }
</style>
<template>
    <div class="g-center login-page" @keyup.enter="login">
      <el-form :model="loginForm" :rules="rules" ref="loginForm" class="login-form">
        <el-form-item prop="username">
          <el-input
            :autofocus="true"
            placeholder="请输入用户名"
            v-model="loginForm.username">
            <template slot="prepend"><i class="el-icon-mobile-phone"></i></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            type="password"
            v-model="loginForm.password">
            <template slot="prepend"><i class="el-icon-info"></i></template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" @click.native="login" type="primary" :loading="isBtnLoading">{{btnText}}</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
import CryptoJS from "crypto-js";
import * as util from '../assets/util.js';
import * as login from "../api/login";

export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 6, max: 16, message: '用户名长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '密码长度在 6 到 16 个字符', trigger: 'blur' }
        ],
      },
      isBtnLoading: false,
    };
  },
  computed: {
    btnText() {
      if (this.isBtnLoading) return '登录中...';
      return '登录';
    }
  },
  methods: {
    login() {
      var vm = this;
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          let password = CryptoJS.enc.Utf8.parse(this.loginForm.password);
          let base64Password = CryptoJS.enc.Base64.stringify(password);
          let params = {username: this.loginForm.username, password: base64Password};
          vm.isBtnLoading = true;
          login.request.r(params).then(res => {
            vm.isBtnLoading = false;
            if(res.data[0]){
              util.session('token', res.data[0]);
              vm.$emit('login', vm.$router.currentRoute.query.from);
            }else{
              vm.$message({
                message: '登录异常！',
                duration: 1500,
                type: 'error'
              });
              return Promise.reject({
                message: '登录异常！'
              });
            }
          }).catch(util.catchError);
        } else {
          vm.$message({
                message: '登录信息有误！',
                duration: 1500,
                type: 'error'
              });
          console.log('登录信息有误！');
          return false;
        }
      });
    }
  },
  created() {
    sessionStorage.clear();
  }
};
</script>
