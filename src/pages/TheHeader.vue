<template>
    <div>
        <div class="the-header">

            <ul class="navbar" ref="change">

                <li>
                    <div class="header-search">
                        <input type="text" placeholder="输入用户name或phone搜索" @keyup.enter="goSearch()" v-model="keywords"
                               @blur.capture="blurList">
                        <div class="search-btn" @click="goSearch()">
                            <el-button type="primary" icon="el-icon-search">搜索</el-button>
                        </div>
                        <div id=searchResult class="search">
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

            <el-dropdown  v-if="this.friendApplyList.length > 0">
                <el-badge v-if="this.friendApplyList.length > 0" :value="this.friendApplyList.length" class="item">
                    <el-button type="primary">
                        好友申请<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                </el-badge>
                <el-dropdown-menu></el-dropdown-menu>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="(item,index) in this.friendApplyList" @click.native="handleApply(item.userId, index)">{{item.name}}</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>

        </div>
        <div id="addDialog">
            <el-dialog
                    title="用户信息简介"
                    :visible.sync="dialogVisible"
                    width="30%">
                <span>
                    <label style="display: inline-block;width: 100%;">用户名称: {{this.friendInfo.friendName}}</label>
                    <br>
                    <label style="display: inline-block;width: 100%;">用户手机号: {{this.friendInfo.friendPhone}}</label>
                </span>
                <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addFriend()">加为好友</el-button>
  </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
  import { mixin } from "../mixins";
  import { getQueryUser, getUserInfo, addFriendApply, agreeApply } from "../api/index";
  import { mapGetters } from "vuex";

  export default {
    name: "the-header",
    mixins: [mixin],
    computed: {
      ...mapGetters([
        //TODO store的数据迁移过来
        "friendApplyList"
      ])
    },
    data() {
      return {
        username: "weixin",
        keywords: "",
        showCode: "",
        userQueryList: [],
        friendInfo: {
          friendId: "",
          friendName: "",
          friendPhone: "",
          friendEmail: ""
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
              //将搜索结果渲染出来呈现（搜索返回的用户列表）
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

      addFriend() {
        this.dialogVisible = false;
        let params = new URLSearchParams();
        params.append("friendId", this.friendInfo.friendId);
        addFriendApply(params)
          .then(res => {
            if (res.code === 0) {
              this.$message({
                message: "好友申请已发送",
                type: "success"
              });
            }else if (res.code === 1) {
              this.$message({
                message: "已经是好友关系，无需重复添加",
                type: "success"
              });
            }
            else {
              this.notify("好友申请发送失败", res.result);
            }
          })
          .catch(failResponse => {
          });
      },

      handleApply(userId, index){

          let params = new URLSearchParams();
          params.append("friendId", userId);
          agreeApply(params)
            .then(res => {
              if (res.code === 0) {
                //TODO 删除已经处理过的请求
                this.friendApplyList.splice(index,1);
                console.log("加好友成功");
                this.$message({
                  message: "你们已经成为好友",
                  type: "success"
                });
              } else if (res.code === 2001) {
                this.notify("登录失败", res.result);
                this.goLogin();
              } else {
                console.log("服务异常");
                this.notify("服务异常");

              }
            })
            .catch(failResponse => {
            });
        },

        goLogin() {
          this.$router.push({ path: "/login-in" });
        }
    }
  };
</script>

<style lang="scss" scoped>
    @import '../assets/css/the-header.scss';
</style>