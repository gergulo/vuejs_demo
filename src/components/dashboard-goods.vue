<style>

</style>

<template>
  <div>
    <h4>药品信息</h4>
    <p>共有 <strong>{{list.length}}</strong> 种药品。</p>
  </div>
</template>

<script>
import * as goods from '../api/goods';

export default {
  data() {
    return {
      list: []
    }
  },
  methods: {
    fetchData: function(){
      let vm = this;
      //查询分级任务运行时间
      goods.request.r().then((res) => {
        vm.list = res.data;
      })
    }
  },
  created() {
    this.fetchData();
  }
};
</script>
