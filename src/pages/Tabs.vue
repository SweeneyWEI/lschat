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
  import { getUserList,getGroupList,getUserInfo } from "../api/index";
  import { mixin } from "../mixins/index";


  export default {
    name: "tabs",
    components: {},
    mixins: [mixin],
    data() {
      return {
        tabPosition: "bottom",
        userInfo:{
          phone:"",
          email:"",
          userName:"",
          birthday:"",
          userId:"",
          avatar:""
        }
      };
    },
    methods: {
      handleClick(tab, event) {
        let tabName = tab.name;
        this.$store.commit("setTabPage",tabName);
        if (tabName === "friend") {
          getUserList()
            .then(res => {
              if (res.code === 0) {
                //将搜索结果缓存（用户列表）
                this.$store.commit("setUserList", res.result);

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
          this.tabPage = "group";
          getGroupList()
            .then(res => {
              if (res.code === 0) {
                //将搜索结果缓存（群列表）
                this.$store.commit("setGroupList", res.result);

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
          this.tabPage = "selfCenter";
          getUserInfo()
            .then(res => {
              if (res.code === 0) {
                //将搜索结果缓存（个人中心页面）
                this.userInfo.userId = res.result.userId;
                this.userInfo.userName = res.result.name;
                this.userInfo.phone = res.result.phone;
                this.userInfo.email = res.result.email;
                this.userInfo.birthday = res.result.birthday;
                this.userInfo.avatar = res.result.avatar;
                this.$store.commit("setUserInfo", this.userInfo);

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
        this.$router.push({ path: "/" });
      }
    }
  };
</script>
<style lang="scss" scoped>
    @import "../assets/css/tabs.scss";
</style>