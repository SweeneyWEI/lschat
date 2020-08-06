<template>
    <div>
        <div class="the-header">

            <ul class="navbar" ref="change">

                <li>
                    <div class="header-search">
                        <input type="text" placeholder="输入用户name或phone搜索" @keyup.enter="goSearch()" v-model="keywords"
                               @blur.capture="blurList">
                        <div class="search-btn" @click="goSearch">
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
            <div>
                <el-dropdown v-if="this.applySize>0">
                    <el-badge v-bind:value="this.applySize" class="item">
                        <el-button type="primary">
                            <i class="el-icon-user"></i>
                        </el-button>
                    </el-badge>
                    <el-dropdown-menu></el-dropdown-menu>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for="(item,index) in this.friendApplyList" :key="item.userId"
                                          @click.native="handleApply(item.userId, index)">{{item.name}}
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
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
    <el-button type="primary" @click="addFriend">加好友</el-button>
  </span>
            </el-dialog>
        </div>

        <div id="agreeDialog">
            <el-dialog
                    title="用户信息简介"
                    :visible.sync="agreeDialogVisible"
                    width="30%">
                <span>
                    <label style="display: inline-block;width: 100%;">用户名称: {{this.friendInfo.friendName}}</label>
                    <br>
                    <label style="display: inline-block;width: 100%;">用户手机号: {{this.friendInfo.friendPhone}}</label>
                </span>
                <span slot="footer" class="dialog-footer">
    <el-button @click="agreeDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="agreeFriendApply">加为好友</el-button>
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
        "friendApplyList"
      ])
    },

    watch: {
      friendApplyList: function() {
        this.applySize = this.friendApplyList.length;
      }
    },

    data() {
      return {
        applySize: 0,
        username: "",
        keywords: "",
        showCode: "",
        userQueryList: [],
        friendInfo: {
          friendId: "",
          friendName: "",
          friendPhone: "",
          friendEmail: ""
        },
        dialogVisible: false,
        agreeDialogVisible: false,
        applyFriendId:"",
        applyIndex:0
      };
    },

    methods: {
      /**
       * 搜索用户
       */
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
        this.queryUserInfo(params);
        //将弹窗弹出
        this.dialogVisible = true;
      },
      /**
       * 查询用户信息
       * @param params
       */
      queryUserInfo(params){
        getUserInfo(params)
          .then(res => {
            if (res.code === 0) {
              this.friendInfo.friendId = res.result.userId;
              this.friendInfo.friendName = res.result.name;
              this.friendInfo.friendPhone = res.result.phone;
              this.friendInfo.friendEmail = res.result.email;

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
      /**
       * 好友申请
       */
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
            } else if (res.code === 1) {
              this.$message({
                message: "已经是好友关系，无需重复添加",
                type: "success"
              });
            } else {
              this.notify("好友申请发送失败", res.result);
            }
          })
          .catch(failResponse => {
          });
      },
      /**
       * 处理好友请求
       */
      handleApply(userId, index) {

        this.applyFriendId = userId;
        this.applyIndex = index;

        let params = new URLSearchParams();
        params.append("friendId", userId);
        //查询用户信息
        this.queryUserInfo(params);
        //将弹窗弹出
        this.agreeDialogVisible = true;
      },
      /**
       * 同意加好友申请
       */
      agreeFriendApply(){
        let userId = this.applyFriendId;
        let index = this.applyIndex;
        let params = new URLSearchParams();
        params.append("friendId", userId);

        agreeApply(params)
          .then(res => {
            if (res.code === 0) {
              this.agreeDialogVisible = false;
              //删除已经处理过的请求
              let applyList = this.friendApplyList;
              //使用splice删除数据是，在v-for组件下，需要指定:key，否则splice不生效
              applyList.splice(index, 1);
              this.$store.commit("setFriendApplys", applyList);
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
        this.$router.push({ path: "/" });
      }

    }
  };
</script>

<style lang="scss" scoped>
    @import "../assets/css/the-header.scss";
</style>