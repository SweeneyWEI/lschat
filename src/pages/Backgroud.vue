<template>

    <div>
        <the-header/>
        <tabs/>
        <div id="showList">
            <ul v-if="tabPage === 'friend' " class="infinite-list">
                <li v-for="(item, index) in this.userList" class="infinite-list-item" :key="item.friendId"
                    @click="goChat(item, index)">
                    <el-badge :hidden="checkMessageDot(item.friendId)" is-dot>
                        <el-avatar :size="25" :src="item.avatar"/>
                    </el-badge>
                    {{item.name}}
                    <el-dropdown @command="handleCommand" style="float: right;">
                        <span>
                            <i class="el-icon-more" style="font-size: 23px;"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="card">好友信息</el-dropdown-item>
                            <el-dropdown-item command="delete" divided>删除好友</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-divider></el-divider>
                </li>
            </ul>
            <ul v-else-if="tabPage === 'group' " class="infinite-list">
                <li v-for="(item, index) in this.groupList" class="infinite-list-item" :key="item.groupId"
                    @click="goChat(item, index)">
                    <el-avatar :size="25" :src="item.avatar"/>
                    {{item.groupName}}
                    <el-dropdown @command="handleGroupCommand" style="float: right;">
                        <span class="el-dropdown-link">
                            <i class="el-icon-more" style="font-size: 23px;"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="card">群信息</el-dropdown-item>
                            <el-dropdown-item command="delete" divided>删除群</el-dropdown-item>
                            <el-dropdown-item command="addMember" divided>拉好友入群</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-divider></el-divider>
                </li>
            </ul>
        </div>

        <div id="addDialog">
            <el-dialog
                    title="删除好友"
                    :visible.sync="dialogVisible"
                    width="30%">
                <span>
                    <!--<el-image style="width: 100px; height: 100px" :src="this.friendInfo.avatar" :fit="fill"></el-image>-->
                    <br>
                    <label style="display: inline-block;width: 100%;">用户名称: {{this.friendInfo.friendName}}</label>
                    <br>
                    <label style="display: inline-block;width: 100%;">用户手机号: {{this.friendInfo.friendPhone}}</label>
                </span>
                <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="deleteFriend(this.friendInfo.friendId)">删除好友</el-button>
  </span>
            </el-dialog>
        </div>
        <!--<div v-else="tabPage === 'selfCenter' " id="userInfo">-->
        <!--<label style="display: inline-block;width: 100%;">{{this.userName}}</label>-->
        <!--<br>-->
        <!--<label style="display: inline-block;width: 100%;">{{this.phone}}</label>-->
        <!--<br>-->
        <!--<label style="display: inline-block;width: 100%;">{{this.email}}</label>-->
        <!--<br>-->
        <!--<label style="display: inline-block;width: 100%;">{{this.birthday}}</label>-->
        <!--<br>-->
        <!--</div>-->
    </div>
</template>
<script>

  import { mapGetters } from "vuex";
  import TheHeader from "./TheHeader";
  import Tabs from "./Tabs";
  import { getUserList, scheduleFriendApply, notAllowedApply, messageAlert, getUserInfo, deleteFriendRequest } from "../api/index";
  import { mixin } from "../mixins";


  export default {
    name: "backgroud",
    components: {
      TheHeader,
      Tabs
    },
    //mixins 公用方法或组建供引用
    mixins: [mixin],
    data() {
      return {
        applyTimer: "",
        messageUserList: [],
        chatObject: {
          friendId: 0,
          roomId: "",
          roomName: "",
          idTag: "",
          avatar: ""
        },
        friendInfo:{
          friendId:"",
          avatar:"",
          friendName:"",
          friendPhone:"",
          friendEmail:""
        },
        dialogVisible: false
      };
    },
    computed: {
      ...mapGetters([
        "userInfo",
        "friendApplyList",
        "tabPage",
        "userList",
        "groupList",
        "messageDotUsersList"
      ])
    },

    created() {
      this.getUserList();
      this.getNotAllowedApply();
    },
    mounted() {
      this.applyTimer = setInterval(this.getUserApply, 3000);
      let messageTimer = setInterval(this.scheduleMessage, 2000);
      this.$store.commit("setMessageTimer", messageTimer);
    },

    beforeDestroy() {
      clearInterval(this.applyTimer);
    },

    methods: {
      //获取好友列表
      getUserList() {
        let _this = this;
        getUserList()
          .then(res => {
            if (res.code === 0) {
              //将搜索结果渲染出来呈现（用户列表）
              this.$store.commit("setUserList", res.result);
            } else if (res.code === 2001) {
              this.notify("登录失败", res.result);
              _this.goLogin();
            }
          })
          .catch(failResponse => {
          });
      },

      goLogin() {
        this.$router.push({ path: "/" });
      },

      // 打开对话框建立长链接
      goChat(item, index) {
        let roomId;
        let roomName;
        let friendId;
        let idTag = "chatId";
        if (this.tabPage === "friend") {
          friendId = item.friendId;
          roomId = item.chatId;
          roomName = item.name;

          //判断是否有未读消息
          if (this.checkMessageDot(friendId)) {
          } else {
            console.log("判断用户有未读消息");
            let arrayList = this.messageDotUsersList;
            let messageIndex = arrayList.findIndex(userId => userId === friendId);
            arrayList.splice(messageIndex, 1);
            this.$store.commit("setMessageDotUsersList", arrayList);
            console.log("删除");
          }
        } else {
          roomId = item.groupId;
          idTag = "groupId";
          roomName = item.groupName;
        }
        this.chatObject.friendId = friendId;
        this.chatObject.roomId = roomId;
        this.chatObject.roomName = roomName;
        this.chatObject.idTag = idTag;
        this.chatObject.avatar = item.avatar;

        this.$store.commit("setChatObject", this.chatObject);
        this.$router.push({ path: "/chat" });
      },

//轮询好友申请
      getUserApply() {
        console.log(this.tabPage);
        let _this = this;
        scheduleFriendApply()
          .then(res => {
            if (res.code === 0) {
              //将搜索结果渲染出来呈现
              if (res.result.length > 0) {
                for (let i = 0; i < res.result.length; i++) {
                  let friendName = res.result[i].name;
                  this.notify("加好友申请", friendName);
                  this.friendApplyList.push(res.result[i]);
                }
                this.$store.commit("setFriendApplys", this.friendApplyList);
                console.log("更新applyList缓存");
              }
            } else if (res.code === 2001) {
              this.notify("登录失败", res.result);
              _this.goLogin();
            }
          })
          .catch(failResponse => {
          });
      },
      //获取未通过的好友申请
      getNotAllowedApply() {
        let _this = this;
        notAllowedApply()
          .then(res => {
            if (res.code === 0) {
              //将未通过的好友申请依然展示在信息提示处
              if (res.result.length > 0) {
                for (let i = 0; i < res.result.length; i++) {
                  let friendName = res.result[i].name;
                  this.notify("加好友申请", friendName);
                }
                this.$store.commit("setFriendApplys", res.result);
              } else {
                this.$store.commit("setFriendApplys", []);
              }
            } else if (res.code === 2001) {
              this.notify("登录失败", res.result);
              _this.goLogin();
            }
          })
          .catch(failResponse => {
          });
      },
//轮询实时消息
      scheduleMessage() {
        let _this = this;
        messageAlert()
          .then(res => {
            if (res.code === 0) {
              //提示消息来临
              if (res.result.length > 0) {
                for (let i = 0; i < res.result.length; i++) {
                  this.messageUserList.push(res.result[i].friendId);
                  this.$message.info(res.result[i].userName + "来消息了！");
                }
                this.$store.commit("setMessageDotUsersList", this.messageUserList);
                // this.$children[0].$children[0].$forceUpdate();
              }
            } else if (res.code === 2001) {
              this.notify("登录失败", res.result);
              _this.goLogin();
            }
          })
          .catch(failResponse => {
          });
      },

//判断用户是否有未读消息，展示小红点(true:隐藏，false:展示)
      checkMessageDot(friendId) {
        if (this.messageDotUsersList === null || this.messageDotUsersList.length === 0) {
          return true;
        }
        let find = this.messageDotUsersList.find(item => item === friendId);
        console.log("小红点检测:" + find);
        return find === undefined;

      }
    },
//好友操作
    handleCommand(command) {
      if (command === "card") {

//TODO 学生信息卡

      } else if (command === "delete") {
        let params = new URLSearchParams();
        params.append("friendId", friendId);
        getUserInfo(params)
          .then(res => {
            if (res.code === 0) {
              this.friendInfo.friendId = res.result.userId;
              this.friendInfo.friendName = res.result.name;
              this.friendInfo.friendPhone = res.result.phone;
              this.friendInfo.avatar = res.result.avatar;
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
      }
    },
//群操作
    handleGroupCommand(command) {
      //TODO 群操作
    },
//删除好友
    deleteFriend(friendId){
      this.dialogVisible = false;

      let params = new URLSearchParams();
      params.append("friendId", friendId);
      deleteFriendRequest(params)
        .then(res => {
          if (res.code === 0) {
            this.$message.success("好友已删除");
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
  };
</script>

<style lang="scss" scoped>
    @import '../assets/css/app.scss';
</style>