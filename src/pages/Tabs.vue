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
  import { mixin } from "../mixins/index";


  export default {
    name: "tabs",
    components: {},
    mixins: [mixin],
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
          getUserList()
            .then(res => {
              if (res.code === 0) {
                //TODO 将搜索结果渲染出来呈现（用户列表）


              } else if (res.code === 2001) {
                this.notify("登录失败", res.result);
                this.goLogin();
              } else {
                this.notify("服务异常");

              }
            })
            .catch(failResponse => {
            });
        } else if (tabName === "group") {
          getGroupList()
            .then(res => {
              if (res.code === 0) {
                //TODO 将搜索结果渲染出来呈现（群列表）


              } else if (res.code === 2001) {
                this.notify("登录失败", res.result);
                this.goLogin();
              } else {
                this.notify("服务异常");

              }
            })
            .catch(failResponse => {
            });
        } else if (tabName === "selfCenter") {
          getUserInfo()
            .then(res => {
              if (res.code === 0) {
                //TODO 将搜索结果渲染出来呈现（个人中心页面）


              } else if (res.code === 2001) {
                this.notify("登录失败", res.result);
                this.goLogin();
              } else {
                this.notify("服务异常");

              }
            })
            .catch(failResponse => {
            });
        }
      },
      goLogin() {
        this.$router.push({ path: "/login-in" });
      }
    }
  };
</script>
<style lang="scss" scoped>
    @import "../assets/css/tabs.scss";
</style>