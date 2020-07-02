<template>

    <div id="tabs" class="tabs">
        <el-tabs :tab-position="tabPosition" @tab-click="handleClick">
            <el-tab-pane label="好友" name="friend"></el-tab-pane>
            <el-tab-pane label="群" name="group"></el-tab-pane>
            <el-tab-pane label="个人中心" name="selfCenter"></el-tab-pane>
        </el-tabs>

    </div>
</template>
<script>
  import { getUserList } from "../api/index";
  import { getGroupList } from "../api/index";
  import { getUserInfo } from "../api/index";



  export default {
    data() {
      return {
        tabPosition: "bottom"
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
        let tabName = tab.name;

        if (tabName === "friend") {
          getUserList();
        }else if (tabName === "group") {
          getGroupList();
        }else if (tabName === "selfCenter") {
          getUserInfo();
        }

      }
    }
  };
</script>
<style lang="scss" scoped>
    @import "../assets/css/tabs.scss";
</style>