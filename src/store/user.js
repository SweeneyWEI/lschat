const user = {
  state: {
    userId: '',
    name: '',
    jwt: ''
  },
  getters: {
    userId: state => {
      let userId = state.userId;
      if (!userId) {
        userId = JSON.parse(window.localStorage.getItem('userId') || null)
      }
      return userId
    },
    name: state => {
      let name = state.name;
      if (!name) {
        name = JSON.parse(window.localStorage.getItem('name') || null)
      }
      return name
    },
    jwt: state => {
      let jwt = state.jwt;
      if (!jwt) {
        jwt = JSON.parse(window.localStorage.getItem('jwt') || null)
      }
      return jwt
    }
  },
  mutations: {
    setUserId: (state, userId) => {
      state.userId = userId;
      window.localStorage.setItem('userId', JSON.stringify(userId));
      console.log("保存userId:"+userId);
    },
    setUsername: (state, name) => {
      state.name = name;
      window.localStorage.setItem('name', JSON.stringify(name));
      console.log("保存username:"+name);
    },
    setJwt: (state, jwt) => {
      state.jwt = jwt;
      window.localStorage.setItem('jwt', JSON.stringify(jwt));
      console.log("保存jwt:"+jwt);
    }
  },
  actions: {}
};

export default user
