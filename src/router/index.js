import Vue from "vue";
import Router from "vue-router";
import LoginIn from "../pages/LoginIn";
import SignUp from "../pages/SignUp";
import Backgroud from "../pages/Backgroud";
import Chat from "../pages/Chat";

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
      path: "/backgroud",
      name: 'backgroud',
      component: Backgroud
    },

    {
      path: '/chat',
      name: 'chat',
      component: Chat
    },
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
    //   path: '/setting',
    //   name: 'setting',
    //   component: Setting
    // }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
