<style scoped>
.g-body {
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  height: 100%;
  padding: 110px 0px 10px 270px;
}

.g-statues-bar {
  position: fixed;
  z-index: 90;
  top: 60px;
  left: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  margin-left: 270px;
  background: #fff;
}

.g-statues-bar .bread {
  height: 50px;
  line-height: 50px;
}

.g-side {
  position: fixed;
  z-index: 90;
  top: 0;
  left: 0;
  box-sizing: border-box;
  width: 250px;
  height: 100%;
  padding-top: 60px;
  border-right: 1px solid #dedede;
  overflow-y: auto;
  /* background-color: #293c55 */
}
.g-head {
  position: fixed;
  z-index: 91;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background: #293c55;
}
.g-head .g-title {
    float: left;
    width:250px;
    text-align: center;
    font-size: 1.4em;
    color:#fff;
}
.logo {
  float: left;
  text-align: center;
  width: 270px;
  font-size: 1.4em;
  text-decoration: none;
  color:#fff;
}
.nav {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
}
.usermenu {
  float: right;
  padding: 0 2em;
  color:#fff;
}
.usermenu a {
  text-decoration: none;
  margin: 0 0.2em 0 1em;
  color:inherit;
}
#main {
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
/* .el-menu-item {
  background-color: #293c55
}
.el-submenu {
  background-color: #293c55
}
.el-menu-item:hover {
  background-color: #23527c
}
.el-menu-item:focus  {
  background-color: #23527c
}
.el-menu-item.is-active {
  background-color: #e43c59
}
.el-submenu:hover {
  background-color: #23527c
}
.el-submenu:focus  {
  background-color: #23527c
} */
</style>
<template>
  <div class="g-body">
    <el-row type="flex" class="g-head">
      <div class="g-title">XXX管理系统</div>
      <div class="nav">
        <div class="usermenu" v-if="user.id">
          欢迎您：{{user.nickname}}
          <router-link :to="{path: '/'}"><i class="el-icon-location"></i>首页</router-link>
          <a href="javascript:;" @click="logout"><i class="el-icon-circle-close"></i>退出</a>
        </div>
      </div>
    </el-row>
    <el-menu :default-active="activeMenu" class="g-side" unique-opened router>
      <template v-for="(route, index) in menus" v-if="route.meta.is_menu">
        <template v-if="route.children">
          <el-submenu :key="index" :index="route.name">
            <template slot="title"><i :class="route.icon"></i>{{route.meta.name || route.name}}</template>
            <el-menu-item v-for="(cRoute, cIndex) in route.children" v-if="cRoute.meta.is_menu" :key="cIndex" :index="cRoute.name" :route="cRoute">
              <i :class="cRoute.icon"></i>{{cRoute.meta.name || cRoute.name}}
            </el-menu-item>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :route="route" :index="route.name"><i :class="route.icon"></i>{{route.meta.name || route.name}}</el-menu-item>
        </template>
      </template>
    </el-menu>

    <div class="g-statues-bar p-lr">
      <el-breadcrumb separator="/" class="bread" id="mybread">
        <el-breadcrumb-item v-for="(item,index) in breadcrumbs" :key="index" :to="item">
          {{ item.meta.name || item.name }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <template v-if="$route.path=='/'">
      <dashboard />
    </template>
    <template v-else>
    <router-view id="main"></router-view>
    </template>
    
  </div>
</template>
<script>
import instance from "../api";
import { changePw } from "../api/account";

export default {
  components: {
    dashboard: () => import("../components/dashboard.vue")
  },
  data() {
    return {
      user: {},
      menus: []
    };
  },
  computed: {
    activeMenu: function(){
      return this.$route.name
    },
    breadcrumbs: function(){
      return (this.$route && this.$route.matched) || []
    }
  },
  methods: {
    logout: function() {
      this.$confirm("确定退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      })
        .then(() => {
          this.$emit("logout");
        })
        .catch(() => {});
    }
  },
  created: function() {
    let user = this.$parent.userData;
    if (user) {
      this.user = user;
    } else {
      this.$router.push({ path: "/login" });
    }
    let menus = this.$parent.menuData;
    if (menus) {
      this.menus = menus;
    }
  }
};
</script>
