<template>

    <div id="test" style="padding-bottom: 700px">

        <el-tabs :tab-position="tabPosition" @tab-click="handleClick">
            <el-tab-pane label="好友" name="first">好友</el-tab-pane>
            <el-tab-pane label="群" name="second">群</el-tab-pane>
            <el-tab-pane label="个人中心" name="third">个人中心</el-tab-pane>
        </el-tabs>

    </div>
</template>
<script>

  import TheHeader from "./TheHeader";

  export default {
    components: { TheHeader },
    data() {
      return {
        tabPosition: "bottom"
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>