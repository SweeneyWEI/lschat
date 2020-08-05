<template>

    <div>
        <the-header/>
        <tabs/>
        <div id="showList">
            <ul v-if="tabPage === 'friend' " class="infinite-list">
                <li v-for="item in this.userList" class="infinite-list-item" :key="item.friendId"
                    @click="goChat(item)">
                    <el-badge :hidden="checkMessageDot(item.friendId)" is-dot>
                        <el-avatar :size="25" :src="item.avatar"/>
                    </el-badge>
                    {{item.name}}
                    <el-dropdown style="float: right;">
                        <span>
                            <i class="el-icon-more" style="font-size: 23px;"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="handleCommand('card',item.friendId)">好友信息
                            </el-dropdown-item>
                            <el-dropdown-item @click.native="handleCommand('delete',item.friendId)" divided>删除好友
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>

                    <el-divider></el-divider>
                </li>
            </ul>
            <ul v-else-if="tabPage === 'group' " class="infinite-list">
                <li v-for="item in this.groupList" class="infinite-list-item" :key="item.groupId"
                    @click="goChat(item)">
                    <el-avatar :size="25" :src="item.avatar"/>
                    {{item.groupName}}
                    <el-dropdown style="float: right;">
                        <span class="el-dropdown-link">
                            <i class="el-icon-more" style="font-size: 23px;"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-if="item.ownerState === true"
                                              @click.native="handleGroupCommand('updateGname',item.groupId)">修改群名
                            </el-dropdown-item>

                            <el-dropdown-item v-if="item.ownerState === true"
                                              @click.native="handleGroupCommand('kickOne',item.groupId)" divided>踢人
                            </el-dropdown-item>

                            <el-dropdown-item v-if="item.ownerState === true"
                                              @click.native="handleGroupCommand('delete',item.groupId)" divided>解散群
                            </el-dropdown-item>

                            <el-dropdown-item @click.native="handleGroupCommand('quitGroup',item.groupId)" divided>
                                退出群
                            </el-dropdown-item>

                            <el-dropdown-item @click.native="handleGroupCommand('addMember',item.groupId)" divided>
                                拉好友入群
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-divider></el-divider>
                </li>
            </ul>
        </div>

        <div id="deleteGroup">
            <el-dialog
                    title="解散群"
                    :visible.sync="deleteGroupVisible"
                    width="30%">
                <span>确定要解散群吗？</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="deleteGroupVisible = false">取 消</el-button>
                    <el-button type="primary" @click="deleteGroup">确 定</el-button>
                </span>
            </el-dialog>
        </div>

        <div id="deleteFriend">
            <el-dialog
                    title="删除好友"
                    :visible.sync="deleteVisible"
                    width="30%">
                <span>
                    <el-image style="width: 100px; height: 100px" :src="this.friendInfo.avatar"></el-image>
                    <br>
                    <label style="display: inline-block;width: 100%;">用户名称: {{this.friendInfo.friendName}}</label>
                    <br>
                    <label style="display: inline-block;width: 100%;">用户手机号: {{this.friendInfo.friendPhone}}</label>
                </span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="deleteVisible = false">取 消</el-button>
                    <el-button type="primary" @click="deleteFriend">删除好友</el-button>
                </span>
            </el-dialog>
        </div>

        <div id="friendInfo">
            <el-dialog
                    title="好友信息"
                    :visible.sync="userInfoVisible"
                    width="30%">
                <span>
                    <el-image style="width: 100px; height: 100px" :src="this.friendInfo.avatar"></el-image>
                    <br>
                    <label style="display: inline-block;width: 100%;">用户名称: {{this.friendInfo.friendName}}</label>
                    <br>
                    <label style="display: inline-block;width: 100%;">用户手机号: {{this.friendInfo.friendPhone}}</label>
                    <br>
                    <label style="display: inline-block;width: 100%;">用户邮箱: {{this.friendInfo.friendEmail}}</label>
                    <br>
                    <label style="display: inline-block;width: 100%;">用户生日: {{this.friendInfo.birthday}}</label>
                </span>

                <span slot="footer" class="dialog-footer">
                    <el-button @click="userInfoVisible = false">好 的</el-button>
                </span>
            </el-dialog>
        </div>


        <div id="userCenter" v-if="tabPage === 'selfCenter'" class="selfCenter">
            <el-form :inline="true" :model="updateUserInfo">
                <div>
                    <el-upload
                            class="upload-demo"
                            :show-file-list="false"
                            multiple
                            :limit="1"
                            accept="image/jpeg,image/png,image/jpg"
                            :http-request="uploadAvatar"
                            action="string">
                        <el-button size="small">
                            <el-image style="width: 50px; height: 50px" :src="this.userInfo.avatar"></el-image>
                        </el-button>
                    </el-upload>
                </div>
                <div>
                    <el-form-item style="width: 90%;position: fixed;margin-top: 20px" label="昵称">
                        <el-input :placeholder=this.userInfo.userName v-model="updateUserInfo.updateName"
                        ></el-input>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item style="width: 90%;position: fixed;margin-top: 70px" label="手机号">
                        <el-input :placeholder=this.userInfo.phone v-model="updateUserInfo.updatePhone"
                        ></el-input>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item style="width: 90%;position: fixed;margin-top: 120px" label="邮箱">
                        <el-input :placeholder=this.userInfo.email v-model="updateUserInfo.updateEmail"
                        ></el-input>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item style="width: 90%;position: fixed;margin-top: 170px" label="生日">
                        <el-date-picker type="date" :placeholder=this.userInfo.birthday
                                        v-model="updateUserInfo.updateBirthday"
                                        style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </div>
            </el-form>


            <el-button style="position: fixed;width: 100%;;margin-top: 250px" @click.native="updateInfo">修改个人信息
            </el-button>
            <br>
            <el-button style="position: fixed;width: 100%;margin-top: 270px" @click.native="createGroupInit">创建群
            </el-button>
            <br>
            <el-button style="position: fixed;width: 100%;margin-top: 290px" @click.native="goLogout">退出登录</el-button>

        </div>

        <div v-if="showCreateGroup" class="groupInit">
            <el-card class="box-card">
                <el-transfer v-model="createGroupUserIdList" :data="createGroupUserList"
                             :titles="['好友列表','拉群']"></el-transfer>
                <el-button class="el-icon-circle-close" @click.native="quitCreateGroup"></el-button>
                <el-button class="el-icon-circle-check" @click.native="createGroup" style="float: right"></el-button>
            </el-card>
        </div>


        <div v-if="showInviteGroup" class="groupInit">
            <el-card class="box-card">
                <el-transfer v-model="inviteGroupUserIdList" :data="inviteGroupUserList"
                             :titles="['好友列表','拉群']"></el-transfer>
                <el-button class="el-icon-circle-close" @click.native="quitInviteGroup"></el-button>
                <el-button class="el-icon-circle-check" @click.native="inviteGroup" style="float: right"></el-button>
            </el-card>
        </div>

    </div>

</template>
<script>

  import { mapGetters } from "vuex";
  import TheHeader from "./TheHeader";
  import Tabs from "./Tabs";
  import {
    getUserList,
    scheduleFriendApply,
    notAllowedApply,
    messageAlert,
    getUserInfo,
    deleteFriendRequest,
    logout,
    updateUserInfo,
    createGroupRequest,
    updateGNameRequest,
    deleteGroupRequest,
    quitGroupRequest,
    groupInviteRequest,
    getFriendsNotInGroupList,
    uploadAvatarRequest
  } from "../api/index";
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
        messageTimer: "",
        applyTimer: "",
        messageUserList: [],
        chatObject: {
          friendId: 0,
          roomId: "",
          roomName: "",
          idTag: "",
          avatar: ""
        },
        friendInfo: {
          friendId: "",
          avatar: "",
          friendName: "",
          friendPhone: "",
          friendEmail: "",
          birthday: ""
        },
        updateUserInfo: {
          userId: "",
          updateName: "",
          updateBirthday: "",
          updatePhone: "",
          updateEmail: ""
        },
        deleteVisible: false,
        userInfoVisible: false,
        deleteGroupVisible: false,
        deleteGroupId: "",
        createGroupUserList: [],
        createGroupUserIdList: [],
        inviteGroupUserList: [],
        inviteGroupUserIdList: [],
        showCreateGroup: false,
        showInviteGroup: false,
        inviteGroupId: ""
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
      this.messageTimer = setInterval(this.scheduleMessage, 3000);
    },

    beforeDestroy() {
      clearInterval(this.applyTimer);
    },

    methods: {
      /**
       * 获取好友列表
       */
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

      /**
       * 打开对话框建立长链接
       */
      goChat(item) {
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

      /**
       * 轮询好友申请
       */
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
      /**
       * 获取未通过的好友申请
       */
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
      /**
       * 轮询实时消息
       */
      scheduleMessage() {
        let _this = this;
        messageAlert()
          .then(res => {
            if (res.code === 0) {
              //提示消息来临
              if (res.result.length > 0) {
                for (let i = 0; i < res.result.length; i++) {
                  let msgContent;
                  if (res.result[i].content.match("http")) {
                    msgContent = "[图片]";
                  } else {
                    msgContent = res.result[i].content;
                  }
                  if (this.messageUserList.indexOf(res.result[i].friendId) > -1) {
                    //已存在用户未读消息提醒，不添加
                  } else {
                    this.messageUserList.push(res.result[i].friendId);
                    this.$store.commit("setMessageDotUsersList", this.messageUserList);
                  }
                  this.$message.info(res.result[i].userName + ":" + msgContent);
                }
              }
            } else if (res.code === 2001) {
              clearInterval(this.messageTimer);
              _this.goLogin();
            }
          })
          .catch(failResponse => {
          });
      },
      /**
       * 判断用户是否有未读消息，展示小红点(true:隐藏，false:展示)
       * @param friendId
       * @returns {boolean}
       */
      checkMessageDot(friendId) {
        if (this.messageDotUsersList === null || this.messageDotUsersList.length === 0) {
          return true;
        }
        let find = this.messageDotUsersList.find(item => item === friendId);
        console.log("小红点检测:" + find);
        return find === undefined;

      },
      /**
       * 好友操作
       * @param command
       * @param friendId
       */
      handleCommand(command, friendId) {

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
              this.friendInfo.birthday = res.result.birthday;

            } else if (res.code === 2001) {
              this.notify("登录失败", res.result);
              this.goLogin();
            } else {
              this.notify("服务异常");
            }
          })
          .catch(failResponse => {
          });

        if (command === "card") {
          this.userInfoVisible = true;
        } else if (command === "delete") {
          //将弹窗弹出
          this.deleteVisible = true;
        }
      },
      /**
       * 群操作
       * @param command
       * @param groupId
       */
      handleGroupCommand(command, groupId) {
        switch (command) {
          case "updateGname":
            this.updateGroupName(groupId);
            break;
          case "kickOne":
            break;
          case "delete":
            this.deleteGroupVisible = true;
            this.deleteGroupId = groupId;
            break;
          case "addMember":
            this.inviteGroupInit(groupId);
            break;
          case "quitGroup":
            this.quitGroup(groupId);
            break;
        }
      },
      /**
       * 退群
       * @param groupId
       */
      quitGroup(groupId) {
        let params = new URLSearchParams();
        params.append("groupId", groupId);
        quitGroupRequest(params)
          .then(res => {
            if (res.code === 0) {
              this.$message.success("已退群");
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

      /**
       * 拉人入群初始化数据
       * @param groupId
       */
      inviteGroupInit(groupId) {
        this.inviteGroupUserList = [];
        this.inviteGroupId = groupId;
        let params = new URLSearchParams();
        params.append("groupId", groupId);

        getFriendsNotInGroupList(params)
          .then(res => {
            if (res.result.length > 0) {

              //请求接口获取好友列表除去该群已经存在的
              for (let i = 0; i < res.result.length; i++) {
                this.inviteGroupUserList.push({
                  key: res.result[i].friendId,
                  label: res.result[i].name
                });
              }
              this.showInviteGroup = true;
            }
          });

      },
      /**
       * 退出拉人入群操作
       */
      quitInviteGroup() {
        setTimeout(() => {
            this.showInviteGroup = false;
          },
          200);
      },
      /**
       * 拉人入群
       */
      inviteGroup() {
        let inviteGroup = {
          "groupId": this.inviteGroupId,
          "userIdList": this.inviteGroupUserIdList
        };
        groupInviteRequest(inviteGroup)
          .then(res => {
            if (res.code === 0) {
              this.$message.success("已入群");
            } else if (res.code === 2001) {
              this.notify("登录失败", res.result);
              this.goLogin();
            } else {
              this.notify("服务异常");
            }
            this.showInviteGroup = false;
          })
          .catch(failResponse => {
          });
      },
      /**
       * 更新群name
       * @param groupId
       */
      updateGroupName(groupId) {
        this.$prompt("请输入新的群名称", "更改群名", {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
          // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          // inputErrorMessage: '邮箱格式不正确'
        }).then(({ value }) => {

          let params = new URLSearchParams();
          params.append("groupId", groupId);
          params.append("groupName", value);

          updateGNameRequest(params)
            .then(res => {
              if (res.code === 0) {
                this.$message.success("群名修改成功");
              } else if (res.code === 2001) {
                this.notify("登录失败", res.result);
                this.goLogin();
              } else {
                this.notify("服务异常");
              }
            });
        }).catch(() => {
          this.$message.info("取消输入");
        });
      },

      /**
       * 删除好友
       */
      deleteFriend() {
        this.deleteVisible = false;
        let friendId = this.friendInfo.friendId;

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
      },

      goLogout() {
        logout()
          .then(res => {
            if (res.code === 0) {
              this.goLogin();
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
      /**
       * 更新用户信息
       */
      updateInfo() {
        let d = this.updateUserInfo.updateBirthday;
        console.log("datetime:" + d);
        let datetime = "";
        if (d !== "") {
          datetime = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
        }

        let updateInfo = {
          "userId": this.userInfo.userId,
          "name": this.updateUserInfo.updateName,
          "phone": this.updateUserInfo.updatePhone,
          "email": this.updateUserInfo.updateEmail,
          "birthday": datetime
        };
        updateUserInfo(updateInfo)
          .then(res => {
            if (res.code === 0) {
              this.userInfo.userName = res.result.name;
              this.userInfo.phone = res.result.phone;
              this.userInfo.email = res.result.email;
              this.userInfo.birthday = res.result.birthday;

              this.$store.commit("setUserInfo", this.userInfo);
              this.$message.success("用户信息已更新");
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

      /**
       * 创建群
       */
      createGroup() {
        createGroupRequest(this.createGroupUserIdList)
          .then(res => {
            if (res.code === 0) {
              this.$message.success("用户群创建成功");
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
        this.showCreateGroup = false;
      },
      /**
       * 创建群初始化数据
       */
      createGroupInit() {
        this.createGroupUserList = [];
        for (let i = 0; i < this.userList.length; i++) {
          this.createGroupUserList.push({
            key: this.userList[i].friendId,
            label: this.userList[i].name
          });
        }
        this.showCreateGroup = true;
      },
      quitCreateGroup() {
        setTimeout(() => {
            this.showCreateGroup = false;
          },
          200);
      },

      /**
       * 删除群
       */
      deleteGroup() {
        let params = new URLSearchParams();
        params.append("groupId", this.deleteGroupId);
        deleteGroupRequest(params)
          .then(res => {
            if (res.code === 0) {
              this.deleteGroupVisible = false;
              this.$message.success("群已解散");
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
      /**
       * 更换头像
       * @param params
       */
      uploadAvatar(params) {
        let formData = new FormData();
        formData.append("file", params.file);
        uploadAvatarRequest(formData)
          .then(res => {
            if (res.code === 0) {
              this.userInfo.avatar = res.result.avatar;
              this.$store.commit("setUserInfo", this.userInfo);
            }
          });
      }
    }
  };
</script>

<style lang="scss" scoped>
    @import "../assets/css/app.scss";
</style>