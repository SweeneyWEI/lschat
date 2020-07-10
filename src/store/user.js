const user = {
  state: {
    userId: '',
    userName: '',
    jwt: '',
    phone:'',
    email:'',
    birthday:'',
    friendApplyList: []
  },
  getters: {
    userId: state => {
      let userId = state.userId;
      if (!userId) {
        userId = JSON.parse(window.localStorage.getItem('userId') || null)
      }
      return userId
    },
    userName: state => {
      let userName = state.userName;
      if (!userName) {
        userName = JSON.parse(window.localStorage.getItem('userName') || null)
      }
      return userName
    },
    jwt: state => {
      let jwt = state.jwt;
      if (!jwt) {
        jwt = JSON.parse(window.localStorage.getItem('jwt') || null)
      }
      return jwt
    },
    phone: state => {
      let phone = state.phone;
      if (!phone) {
        phone = JSON.parse(window.localStorage.getItem('phone') || null)
      }
      return phone
    },
    email: state => {
      let email = state.email;
      if (!email) {
        email = JSON.parse(window.localStorage.getItem('email') || null)
      }
      return email
    },
    birthday: state => {
      let birthday = state.birthday;
      if (!birthday) {
        birthday = JSON.parse(window.localStorage.getItem('birthday') || null)
      }
      return birthday
    },
    friendApplyList: state => {
      let friendApplyList = state.friendApplyList;
      if (!friendApplyList.length) {
        friendApplyList = JSON.parse(window.sessionStorage.getItem('friendApplyList') || null)
      }
      return friendApplyList
    },
  },
  mutations: {
    setUserId: (state, userId) => {
      state.userId = userId;
      window.localStorage.setItem('userId', JSON.stringify(userId));
      console.log("保存userId:"+userId);
    },
    setUsername: (state, userName) => {
      state.userName = userName;
      window.localStorage.setItem('userName', JSON.stringify(userName));
      console.log("保存username:"+userName);
    },
    setJwt: (state, jwt) => {
      state.jwt = jwt;
      window.localStorage.setItem('jwt', JSON.stringify(jwt));
      console.log("保存jwt:"+jwt);
    },
    setPhone: (state, phone) =>{
      state.phone = phone;
      window.localStorage.setItem('phone', JSON.stringify(phone));
      console.log("保存phone:"+phone);

    },
    setEmail: (state, email) =>{
      state.email = email;
      window.localStorage.setItem('email', JSON.stringify(email));
      console.log("保存email:"+email);

    },
    setBirthday: (state, birthday) =>{
      state.birthday = birthday;
      window.localStorage.setItem('birthday', JSON.stringify(birthday));
      console.log("保存birthday:"+birthday);

    },
    setFriendApplys: (state, friendApplyList) => {
      state.friendApplyList = friendApplyList;
      window.sessionStorage.setItem('friendApplyList', JSON.stringify(friendApplyList));
      console.log("friendApplyList:"+friendApplyList);
    },
  },
  actions: {}
};

export default user
