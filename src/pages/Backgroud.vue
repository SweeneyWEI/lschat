<template>

    <div>
        <the-header/>
        <tabs/>
    </div>
</template>
<script>

  import TheHeader from "./TheHeader";
  import Tabs from "./Tabs"
  import { getUserList } from "../api/index";


  export default {
    name: "backgroud",
    components: {
      TheHeader ,
      Tabs
    },

    created () {
      this.getUserList();
    },

    methods: {
      //获取好友列表
      getUserList() {
        let _this = this;
        getUserList()
          .then(res => {
            if (res.code === 0) {
              //TODO 将搜索结果渲染出来呈现


            } else if (res.code === 2001) {
              this.notify("登录失败",res.result);
              _this.goLogin();
            }
          })
          .catch(failResponse => {
          });
      },
      goLogin () {
        this.$router.push({path: '/login-in'})
      },
    }
  };
</script>