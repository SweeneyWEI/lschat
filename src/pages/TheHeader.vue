<template>
    <div class="the-header">

        <ul class="navbar" ref="change">

            <li>
                <div class="header-search">
                    <input type="text" placeholder="搜索音乐" @keyup.enter="goSearch()" v-model="keywords">
                    <div class="search-btn"  @click="goSearch()" >
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-sousuo"></use>
                        </svg>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
  import { mixin } from '../mixins';

  export default {
    name: 'the-header',
    mixins: [mixin],
    data () {
      return {
        keywords: ''
      }
    },

    methods: {
      goSearch () {
        this.$router.push({path: '/search', query: {keywords: this.keywords}});
      }
    }
  }
</script>

<style lang="scss" scoped>
    @import '../assets/css/the-header.scss';
</style>