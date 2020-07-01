<template>
    <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
        <el-radio-button label="top">top</el-radio-button>
        <el-radio-button label="right">right</el-radio-button>
        <el-radio-button label="bottom">bottom</el-radio-button>
        <el-radio-button label="left">left</el-radio-button>
    </el-radio-group>

    <el-tabs :tab-position="tabPosition" style="height: 200px;">
        <el-tab-pane label="好友">好友</el-tab-pane>
        <el-tab-pane label="群">群</el-tab-pane>
        <el-tab-pane label="个人中心">个人中心</el-tab-pane>
    </el-tabs>
</template>


<script>

  export default {
    name: 'home',
    data() {
      return {
        //tabPosition="left|right|top|bottom"
        tabPosition: 'bottom'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>

<style lang="scss" scoped>
    @import url("//unpkg.com/element-ui@2.13.2/lib/theme-chalk/index.css");
</style>