<template>
    <JwChat-index :config="config" :taleList="chatList" :toolConfig="this.tool" @enter="sendMsg"
            v-model="messageContent">
    </JwChat-index>
</template>


<script>
  import { mixin } from "../mixins";
  import io from "socket.io-client";
  import { mapGetters } from "vuex";

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
        roomAvatar:"",
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
        }
        /**/
      };
    },
    computed: {
      //项目初始时候元素没有挂载上 加个空判断
      config () {
        const { avatar: img = "", roomName: name = "null" } = this.chatObject || {};
        const dept = 'dept';
        return { img, name, dept }
      },
      ...mapGetters([
        "jwt",
        "chatObject",
        "userInfo"
      ])
    },

    beforeDestroy() {
      this.socket.disconnect();

    },

    created() {
      this.roomName = this.chatObject.roomName;
      this.roomAvatar = this.chatObject.avatar;
      this.roomId = this.chatObject.roomId;
      this.idTag = this.chatObject.idTag;
      this.friendId = this.chatObject.friendId;
      console.log("准备建立长连接...");
      console.log("roomId:" + this.chatObject.roomId + "idTag:" + this.chatObject.idTag);
      let wsUrl = "http://10.50.10.76:5555" + "?jwt=" + this.jwt + "&" + this.chatObject.idTag + "=" + this.chatObject.roomId;
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
        let chatContent = {
          "date": data.sendTime,
          "text": { "text": data.messageContent },
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

        console.log("roomId:" + this.roomId + "idTag:" + this.idTag + "message:" + messageContent);

        this.socket.json.emit("lcMessage", messageContent);
      }
    },
    /**/
    toolEvent(type) {
      console.log("tools", type);
    },
    headerEvent(type) {
      console.log("header", type);
    }
    /**/
  };
</script>

<style lang="scss" scoped>
    @import '../assets/css/the-header.scss';
    @import '../assets/css/chat.scss';
</style>