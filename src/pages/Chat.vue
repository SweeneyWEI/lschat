<template>
    <JwChat-index :config="config" :taleList="chatList" :toolConfig="this.tool" @enter="sendMsg"
                  v-model="messageContent" scrollType="scroll">
        <JwChat-rightbox :config="rightConfig" @click="rightClick"></JwChat-rightbox>
    </JwChat-index>
</template>


<script>
  import { mixin } from "../mixins";
  import io from "socket.io-client";
  import { mapGetters } from "vuex";
  import { getChatContentList, getGroupInfoList, getGroupContentList } from "../api/index";

  const options = {
    reconnection: true,      //当连接终止后，是否允许Socket.io自动进行重连
    reconnectionDelay: 1000,  //为Socket.io的重连设置一个时间间隔，内部会在多次重连尝试时采用该值的指数值间隔，用来避免性能损耗（500 > 1000 > 2000 > 4000 > 8000）
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 10,  //设置一个重连的最大尝试次数，超过这个值后Socket.io会使用所有允许的其他连接方式尝试重连，直到最终失败
    transports: ["websocket", "polling"]
  }; //Options object to pass into SocketIO


  export default {
    name: "chat",
    mixins: [mixin],

    data() {
      return {
        friendId: "",
        roomAvatar: "",
        messageContent: " ",//保持空格，否则报null错
        roomName: "",
        roomId: "",
        idTag: "",
        socket: "",
        /**/
        chatList: [],
        tool: {
          // show: ["file", "history", "img"],
          show: ["history", "img"],
          callback: this.toolEvent,
          showEmoji: true
        },
        pageIndex: 0,

        rightConfig: {
          listTip: "小可爱",
          tip: "空空如也",
          notice: "接着奏乐，接着舞～",
          list: []
        }
        /**/
      };
    },
    computed: {
      //项目初始时候元素没有挂载上 加个空判断
      config() {
        const { avatar: img = "", roomName: name = "null" } = this.chatObject || {};
        const dept = "dept";
        let historyConfig = {
          tip: "加载更多",
          callback: this.loadChatContent
        };
        return { img, name, dept, historyConfig };
      },
      ...mapGetters([
        "jwt",
        "chatObject",
        "userInfo"
      ])
    },

    beforeDestroy() {
      this.socket.disconnect();
      this.pageIndex = 0;
    },

    created() {
      this.roomName = this.chatObject.roomName;
      this.roomAvatar = this.chatObject.avatar;
      this.roomId = this.chatObject.roomId;
      this.idTag = this.chatObject.idTag;
      this.friendId = this.chatObject.friendId;

      this.loadChatContent();

      if (this.idTag === "groupId") {
        this.rightConfig.listTip = "members";
        this.rightConfig.tip = "群公告";
        this.rightConfig.notice = "【公告】让我们一起摇摆～ ";
        this.loadGroupMembers();
      }

      console.log("准备建立长连接...");
      console.log("roomId:" + this.chatObject.roomId + "idTag:" + this.chatObject.idTag);
      let wsUrl = "http://localhost:5555" + "?jwt=" + this.jwt + "&" + this.chatObject.idTag + "=" + this.chatObject.roomId;
      this.socket = io.connect(wsUrl, options);
    },

    mounted() {

      this.socket.on("connect", data => {
        console.log("connected");
      });

      this.socket.on("connect_error", data => {
        console.log("connect_error:" + data);
      });

      this.socket.on("connecting", data => {
        console.log("connecting...");
      });

      this.socket.on("reconnecting", data => {
        console.log("reconnecting...");
      });

      this.socket.on("disconnect", data => {
        console.log("disconnect...");
      });

      this.socket.on("ping", data => {
        console.log("ping...");
      });

      this.socket.on("pong", data => {
        console.log("pong...");
      });

      this.socket.on("lcMessage", data => {

        let mine = false;
        if (data.userId === this.userInfo.userId) {
          mine = true;
        }

        let messageContent;
        //如果是图片
        if (data.messageContent.match(".jpg")) {
          messageContent = "<img data-src='" + data.messageContent + "'/>";
        } else {
          messageContent = data.messageContent;
        }
        let chatContent = {
          "date": data.sendTime,
          "text": { "text": messageContent },
          "mine": mine,
          "name": data.userName,
          "img": data.avatar
        };
        this.chatList.push(chatContent);
        /**/
      });
    },

    methods: {
      goBack(index) {
        this.socket.disconnect();
        this.$router.go(index);
      },
      sendMsg() {
        let messageContent;
        if (this.idTag === "chatId") {
          messageContent = {
            friendId: this.friendId,
            chatId: this.roomId,
            messageContent: this.messageContent
          };
        } else {
          messageContent = {
            groupId: this.roomId,
            messageContent: this.messageContent
          };
        }
        this.socket.emit("lcMessage", messageContent);
      },
      /**
       * 加载聊天记录
       */
      loadChatContent() {

        let params = new URLSearchParams();

        if (this.idTag === "groupId") {
          params.append("groupId", this.roomId);
          params.append("pageIndex", this.pageIndex);
          getGroupContentList(params)
            .then(res => {
              this.initChatContent(res);
            })
            .catch(failResponse => {
            });
        }

        if (this.idTag === "chatId") {
          params.append("chatId", this.roomId);
          params.append("pageIndex", this.pageIndex);
          getChatContentList(params)
            .then(res => {
              this.initChatContent(res);
            })
            .catch(failResponse => {
            });
        }
      },
/**
 * 组装聊天记录
 */
      initChatContent(res) {
        if (res.code === 0) {
          this.chatList = [];
          for (let i = 0; i < res.result.length; i++) {

            let content = res.result[i];

            let mine = false;
            if (content.fromUser === this.userInfo.userId) {
              mine = true;
            }
            let contentMessage;
            //对图片的处理
            if (content.content.match(".jpg")) {
              contentMessage = "<img data-src='" + content.content + "'/>";
            } else {
              contentMessage = content.content;
            }

            let chatContent = {
              "date": content.receiveTime,
              "text": { "text": contentMessage },
              "mine": mine,
              "name": content.fromUserName,
              "img": content.fromUserAvatar
            };
            this.chatList.push(chatContent);
            this.pageIndex += 1;
          }

        } else if (res.code === 2001) {
          this.notify("登录失败", res.result);
          this.goLogin();
        } else {
          this.notify("服务异常");
        }
      },

/**
 * 工具栏操作
 */
      toolEvent(type) {
        let _this = this;
        if (type === "img") {
          let input = document.createElement("input");
          input.id = "chatImg";
          input.type = "file";
          input.multiple = "multiple";
          input.click();
          input.onchange = function() {
            let file = input.files[0];
            let reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = function() {           //读取完毕会自动触发，读取结果保存在result中
              _this.messageContent = this.result;
              _this.sendMsg();
              _this.messageContent = " ";
            };
          };
        }
      },
      headerEvent(type) {
        console.log("header", type);
      },

      rightClick(type) {
        console.log("right userId:", type);
      },
      /**
       * 加载群成员信息
       */
      loadGroupMembers() {
        let params = new URLSearchParams();
        params.append("groupId", this.roomId);
        getGroupInfoList(params)
          .then(res => {
            if (res.code === 0) {
              for (let i = 0; i < res.result.groupMembers.length; i++) {

                let content = res.result.groupMembers[i];
                let userName = content.userName;
                let userId = content.userId;

                if (content.role === 1) {
                  userName = userName + "(群主)";
                }
                let groupMember = {
                  "name": userName,
                  "img": content.avatar
                };
                this.rightConfig.list.push(groupMember);
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
      goLogin() {
        this.$router.push({ path: "/" });
      }
    }

  };
</script>

<style lang="scss" scoped>
    @import "../assets/css/the-header.scss";
    @import "../assets/css/chat.scss";
</style>