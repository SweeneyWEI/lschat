<template>
  <div id="app">
    <login-in></login-in>
    <router-view class="music-content"/>
  </div>
</template>

<script>
import LoginIn from "./pages/LoginIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
export default {
  name: "app",
  components: {
    Home,
    LoginIn,
    SignUp
  }
};
</script>

<style  lang="scss" scoped>
    @import './assets/css/app.scss';
</style>
