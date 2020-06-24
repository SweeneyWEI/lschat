<template>
  <div id="app">
    <login-in></login-in>
    <router-view class="music-content"/>
  </div>
</template>

<script>
import LoginIn from "./pages/LoginIn";
export default {
  name: "app",
  components: {
    LoginIn
  }
};
</script>

<style  lang="scss" scoped>
    @import './assets/css/app.scss';
</style>
