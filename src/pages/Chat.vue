<template>
    <div>
        <el-page-header v-if="" @back="goBack(-1)" v-bind:content="username">
        </el-page-header>

    </div>
</template>

<script>
  import { mixin } from "../mixins";

  export default {
    name: "chat",
    mixins: [mixin],

    data() {
      return{
        username:""
      }
    },

    methods: {

      goBack(index) {
        this.$router.go(index);
      }
    }
  };
</script>

<style lang="scss" scoped>
    @import '../assets/css/the-header.scss';
</style>