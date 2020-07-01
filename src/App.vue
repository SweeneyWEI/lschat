<template>
    <div id="app">
        <!--<home></home>-->
        <!--<login-in></login-in>-->
        <router-view class="music-content"/>
    </div>
</template>

<script>

  export default {
    name: "app",
    components: {
    }
  };
</script>

<style lang="scss" scoped>
    @import './assets/css/app.scss';
</style>
