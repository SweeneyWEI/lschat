const user = {
  state: {
    jwt: '',
    friendApplyList: [],
    userList:'',
    groupList:'',
    tabPage:'',
    userInfo:{
      phone:"",
      email:"",
      userName:"",
      birthday:"",
      userId:""
    }
  },
  getters: {

    jwt: state => {
      let jwt = state.jwt;
      if (!jwt) {
        jwt = JSON.parse(window.localStorage.getItem('jwt') || null)
      }
      return jwt
    },

    tabPage: state => {
      let tabPage = state.tabPage;
      if (!tabPage) {
        tabPage = JSON.parse(window.localStorage.getItem('tabPage') || null)
      }
      return tabPage
    },

    userInfo: state => {
      let userInfo = state.userInfo;
      if (!userInfo) {
        userInfo = JSON.parse(window.localStorage.getItem('userInfo') || null)
      }
      return userInfo
    },
    friendApplyList: state => {
      let friendApplyList = state.friendApplyList;
      if (!friendApplyList.length) {
        friendApplyList = JSON.parse(window.sessionStorage.getItem('friendApplyList') || null)
      }
      return friendApplyList
    },
    userList: state => {
      let userList = state.userList;
      if (!userList.length) {
        userList = JSON.parse(window.sessionStorage.getItem('userList') || null)
      }
      return userList
    },
    groupList: state => {
      let groupList = state.groupList;
      if (!groupList.length) {
        groupList = JSON.parse(window.sessionStorage.getItem('groupList') || null)
      }
      return groupList
    },

  },
  mutations: {
//缓存jwt
    setJwt: (state, jwt) => {
      state.jwt = jwt;
      window.localStorage.setItem('jwt', JSON.stringify(jwt));
    },
    //缓存当前所在tag
    setTabPage: (state, tabPage) => {
      state.tabPage = tabPage;
      window.localStorage.setItem('tabPage', JSON.stringify(tabPage));
    },
//缓存用户信息
    setUserInfo: (state, userInfo) =>{
      state.userInfo = userInfo;
      window.localStorage.setItem('userInfo', JSON.stringify(userInfo));

    },
    //缓存好友申请
    setFriendApplys: (state, friendApplyList) => {
      state.friendApplyList = friendApplyList;
      window.sessionStorage.setItem('friendApplyList', JSON.stringify(friendApplyList));
    },
    //缓存好友列表
    setUserList: (state, userList) => {
      state.userList = userList;
      window.sessionStorage.setItem('userList', JSON.stringify(userList));
    },
    //缓存群列表
    setGroupList: (state, groupList) => {
      state.groupList = groupList;
      window.sessionStorage.setItem('groupList', JSON.stringify(groupList));
    },
  },
  actions: {}
};

export default user
