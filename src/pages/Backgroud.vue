<template>

    <div>
        <the-header/>
        <tabs/>
        <div id="showList">
            <ul v-if="tabPage === 'friend' " class="infinite-list">
                <li v-for="(item, index) in this.userList" class="infinite-list-item" :key="item.friendId"
                    @click="goChat(item, index)">
                    <el-badge is-dot>
                        <el-avatar :size="25" :src="item.avatar"/>
                    </el-badge>
                    {{item.name}}
                </li>
            </ul>
            <ul v-else-if="tabPage === 'group' " class="infinite-list">
                <li v-for="(item, index) in this.groupList" class="infinite-list-item" :key="item.groupId"
                    @click="goChat(item, index)">
                    <el-avatar :size="25" :src="item.avatar"/>
                    {{item.groupName}}
                </li>
            </ul>
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
  import { getUserList, scheduleFriendApply, notAllowedApply, messageAlert } from "../api/index";
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
        dotFlag: 0,
        chatObject: {
          friendId: 0,
          roomId: "",
          roomName: "",
          idTag: "",
          avatar: ""
        }
      };
    },
    computed: {
      ...mapGetters([
        "userInfo",
        "friendApplyList",
        "tabPage",
        "userList",
        "groupList",
        "messageDotUsers"
      ])
    },
    //
    // watch: {
    //   messageDotUsers: function() {
    //     this.dotFlag = this.messageDotUsers.length;
    //     console.log("dotFlag ："+this.dotFlag);
    //   }
    // },

    created() {
      this.getUserList();
      this.getNotAllowedApply();
    },
    mounted() {
      let applyTimer = setInterval(this.getUserApply, 3000);
      let messageTimer = setInterval(this.scheduleMessage, 2000);
      this.$store.commit("setApplyTimer", applyTimer);
      this.$store.commit("setMessageTimer", messageTimer);
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
          //判断是否有未读消息
          if (!this.checkMessageDot) {
            this.messageDotUsers.splice(index, 1);
            this.$store.commit("setMessageDotUsers", this.messageDotUsers);
          }
          friendId = item.friendId;
          roomId = item.chatId;
          roomName = item.name;
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
        messageAlert()
          .then(res => {
            if (res.code === 0) {
              //提示消息来临
              if (res.result.length > 0) {
                for (let i = 0; i < res.result.length; i++) {
                  this.messageDotUsers.push(res.result[i].friendId);
                  this.$message.info(res.result[i].userName + "来消息了！");
                }
                this.$store.commit("setMessageDotUsers", this.messageDotUsers);
              }
            } else if (res.code === 2001) {
              this.notify("登录失败", res.result);
              _this.goLogin();
            }
          })
          .catch(failResponse => {
          });
      },

// //判断用户是否有未读消息，展示小红点(true:隐藏，false:展示)
//       checkMessageDot(friendId) {
//         let find = this.messageDotUsers.find(item => item === friendId);
//         console.log("小红点检测:" + find);
//         return find === undefined;
//
//       }
    }
  };
</script>

<style lang="scss" scoped>
    @import '../assets/css/app.scss';
</style>