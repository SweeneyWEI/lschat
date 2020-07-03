<template>
    <div class="the-header">

        <ul class="navbar" ref="change">

            <li>
                <div class="header-search">
                    <input type="text" placeholder="输入用户name或phone搜索" @keyup.enter="goSearch()" v-model="keywords"
                           @blur.capture="blurList">
                    <div class="search-btn" @click="goSearch()">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-sousuo"></use>
                        </svg>
                    </div>
                    <div id = searchResult class="search">
                        <ul>
                            <li v-if="showCode" v-for="(item,index) in userQueryList" :key="index"
                                @click="selectItem(item.userId)">
                                {{item.name}}
                            </li>
                        </ul>
                    </div>
                </div>
            </li>
        </ul>
    </div>
    <el-dialog
            title="用户信息简介"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addFriend()">加为好友</el-button>
  </span>
    </el-dialog>
</template>

<script>
  import { mixin } from "../mixins";
  import { getQueryUser, getUserInfo, addFriendApply } from "../api/index";

  export default {
    name: "the-header",
    mixins: [mixin],
    data() {
      return {
        username: "weixin",
        keywords: "",
        showCode: "",
        userQueryList: [],
        friendInfo:{
          friendId:"",
          friendName:"",
          friendPhone:"",
          friendEmail:""
        },
        dialogVisible: false
      };
    },

    methods: {
      goSearch() {
        let params = new URLSearchParams();
        params.append("phoneOrName", this.keywords);
        getQueryUser(params)
          .then(res => {
            if (res.code === 0) {

              //TODO 将搜索结果渲染出来呈现（搜索返回的用户列表）
              this.userQueryList = res.result;
              if (this.userQueryList.length <= 0) {
                this.showCode = false;
              } else {
                this.showCode = true;
              }

            } else if (res.code === 2001) {
              this.notify("登录失败", res.result);
              this.goLogin();
            } else {
              this.notify("服务异常");
            }
          })
          .catch(failResponse => {
          });
      },

      selectItem(friendId) {
        this.showCode = false;
        let params = new URLSearchParams();
        params.append("friendId", friendId);
        getUserInfo(params)
          .then(res => {
            if (res.code === 0) {
              console.log("userInfo :", res.result);
              this.friendInfo.friendId = res.result.userId;
              this.friendInfo.friendName = res.result.name;
              this.friendInfo.friendPhone = res.result.phone;
              this.friendInfo.friendEmail = res.result.email;
              //将弹窗弹出
              this.dialogVisible = true;

            } else if (res.code === 2001) {
              this.notify("登录失败", res.result);
              this.goLogin();
            } else {
              this.notify("服务异常");
            }
          })
          .catch(failResponse => {
          });
      },

      blurList() {
        setTimeout(() => {
            this.showCode = false;
          },
          200);
      },
      goBack(index) {
        this.$router.go(index);
      },

      addFriend(){
        this.dialogVisible = false;
        let params = new URLSearchParams();
        params.append("friendId", friendId);
        addFriendApply(params)
          .then(res => {
            if (res.code === 0) {
              this.$message({
                message: "好友申请已发送",
                type: "success"
              });
            } else {
              this.notify("好友申请发送失败",res.result);
            }
          })
          .catch(failResponse => {
          });
      }
    }
  };
</script>

<style lang="scss" scoped>
    @import '../assets/css/the-header.scss';
</style>