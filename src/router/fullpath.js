import Abstract from '../views/common/abstract.vue';

export default [{
  path: '/',
  name: '首页',
  component: (resolve) => require(['../views/index.vue'], resolve),
  children: 
  [
    {
      path: '/accounts',
      name: '用户管理',
      icon: 'el-icon-setting',
      meta: {
        is_menu: true,
      },
      component: (resolve) => require(['../views/accounts.vue'], resolve)
    },
    {
      path: '/goods',
      name: '商品管理',
      icon: 'el-icon-goods',
      meta: {
        is_menu: true,
      },
      component: Abstract,
      children: 
      [
        {
          path: 'list',
          name: '药品管理',
          icon: 'el-icon-star-on',
          meta: {
            is_menu: true,
          },
          component: (resolve) => require(['../views/goods-list.vue'], resolve),
        },
        {
          path: 'add',
          name: '添加药品',
          meta: {
            is_menu: false,
          },
          component: (resolve) => require(['../views/goods-add.vue'], resolve),
        },
      ]
    },
    {
      path: '/demo',
      name: '开发指引',
      icon: 'el-icon-menu',
      meta: {
        is_menu: true,
      },
      component: Abstract,
      children: 
      [
        {
          path: 'form',
          name: '表单',
          icon: 'el-icon-date',
          meta: {
            is_menu: true,
          },
          component: (resolve) => require(['../views/form.vue'], resolve),
        },
        {
          path: 'table',
          name: '表格',
          icon: 'el-icon-date',
          meta: {
            is_menu: true,
          },
          component: (resolve) => require(['../views/table.vue'], resolve),
        },
        {
          path: 'charts',
          name: '图表',
          icon: 'el-icon-date',
          meta: {
            is_menu: true,
          },
          component: (resolve) => require(['../views/charts.vue'], resolve),
        },
        {
          path: 'richeditor',
          name: '富文本编辑器',
          icon: 'el-icon-date',
          meta: {
            is_menu: true,
          },
          component: (resolve) => require(['../views/richeditor.vue'], resolve),
        },
        
      ]
    }
  ]
}];