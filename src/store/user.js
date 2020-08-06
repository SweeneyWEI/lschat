const user = {
  state: {
    jwt: "",
    friendApplyList: [],
    userList:[],
    groupList:[],
    tabPage:"",
    userInfo:{
      phone:"",
      email:"",
      userName:"",
      birthday:"",
      userId:"",
      avatar:""
    },
    chatObject: {
      friendId:"",
      roomId: "",
      roomName: "",
      idTag: "",
      avatar:""
    },
    messageDotUsersList:[]
  },
  getters: {

    jwt: state => {
      let jwt = state.jwt;
      if (!jwt) {
        jwt = JSON.parse(window.sessionStorage.getItem("jwt") || null)
      }
      return jwt
    },

    tabPage: state => {
      let tabPage = state.tabPage;
      if (!tabPage) {
        tabPage = JSON.parse(window.sessionStorage.getItem("tabPage") || null)
      }
      return tabPage
    },

    userInfo: state => {
      let userInfo = state.userInfo;
      if (!userInfo) {
        userInfo = JSON.parse(window.sessionStorage.getItem("userInfo") || null)
      }
      return userInfo
    },

    chatObject: state => {
      let chatObject = state.chatObject;
      if (!chatObject) {
        chatObject = JSON.parse(window.sessionStorage.getItem("chatObject") || null)
      }
      return chatObject
    },
    friendApplyList: state => {
      let friendApplyList = state.friendApplyList;
      if (!friendApplyList.length) {
        friendApplyList = JSON.parse(window.sessionStorage.getItem("friendApplyList") || null)
      }
      return friendApplyList
    },
    userList: state => {
      let userList = state.userList;
      if (!userList.length) {
        userList = JSON.parse(window.sessionStorage.getItem("userList") || null)
      }
      return userList
    },
    groupList: state => {
      let groupList = state.groupList;
      if (!groupList.length) {
        groupList = JSON.parse(window.sessionStorage.getItem("groupList") || null)
      }
      return groupList
    },
    messageDotUsersList: state => {
      let messageDotUsersList = state.messageDotUsersList;
      if (!messageDotUsersList.length) {
        messageDotUsersList = JSON.parse(window.sessionStorage.getItem("messageDotUsersList") || null)
      }
      return messageDotUsersList
    },

  },
  mutations: {
    //好友申请定时器
    setApplyTimer: (state, applyTimer) => {
      state.applyTimer = applyTimer;
      window.sessionStorage.setItem("applyTimer", JSON.stringify(applyTimer));
    },
    //消息定时器
    setMessageTimer: (state, messageTimer) => {
      state.messageTimer = messageTimer;
      window.sessionStorage.setItem("messageTimer", JSON.stringify(messageTimer));
    },
//缓存jwt
    setJwt: (state, jwt) => {
      state.jwt = jwt;
      window.sessionStorage.setItem("jwt", JSON.stringify(jwt));
    },
    //缓存当前所在tag
    setTabPage: (state, tabPage) => {
      state.tabPage = tabPage;
      window.sessionStorage.setItem("tabPage", JSON.stringify(tabPage));
    },
//缓存用户信息
    setUserInfo: (state, userInfo) =>{
      state.userInfo = userInfo;
      window.sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
    },
    //缓存ws入参参数
    setChatObject: (state, chatObject) =>{
      state.chatObject = chatObject;
      window.sessionStorage.setItem("chatObject", JSON.stringify(chatObject));
    },
    //缓存好友申请
    setFriendApplys: (state, friendApplyList) => {
      state.friendApplyList = friendApplyList;
      window.sessionStorage.setItem("friendApplyList", JSON.stringify(friendApplyList));
    },
    //缓存好友列表
    setUserList: (state, userList) => {
      state.userList = userList;
      window.sessionStorage.setItem("userList", JSON.stringify(userList));
    },
    //缓存群列表
    setGroupList: (state, groupList) => {
      state.groupList = groupList;
      window.sessionStorage.setItem("groupList", JSON.stringify(groupList));
    },
    //缓存新来消息用户
    setMessageDotUsersList: (state, messageDotUsersList) => {
      state.messageDotUsersList = messageDotUsersList;
      window.sessionStorage.setItem("messageDotUsersList", JSON.stringify(messageDotUsersList));
    },
  },
  actions: {}
};

export default user
