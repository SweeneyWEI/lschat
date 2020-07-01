import Vue from "vue";
import Router from "vue-router";
import LoginIn from "../pages/LoginIn";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "login-in",
      component: LoginIn
    },
    {
      path: "/sign-up",
      name: "sign-up",
      component: SignUp
    },
    {
      path: "/home",
      name: 'home',
      component: Home
    },
    // {
    //   path: '/song-list',
    //   name: 'song-list',
    //   component: SongList
    // },
    // {
    //   path: '/my-music',
    //   name: 'my-music',
    //   component: MyMusic
    // },
    // {
    //   path: '/song-list-album/:id',
    //   name: 'song-list-album',
    //   component: SongListAlbum
    // },
    // {
    //   path: '/singer',
    //   name: 'singer',
    //   component: Singer
    // },
    // {
    //   path: '/singer-album/:id',
    //   name: 'singer-album',
    //   component: SingerAlbum
    // },
    // {
    //   path: '/lyric/:id',
    //   name: 'lyric',
    //   component: Lyric
    // },
    // {
    //   path: '/search',
    //   name: 'search',
    //   component: Search
    // },
    // {
    //   path: '/setting',
    //   name: 'setting',
    //   component: Setting
    // }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
