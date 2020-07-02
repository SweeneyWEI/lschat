/* eslint-disable*/
import { get, post, postWithJwt } from "./http";

// =======================> 用户 API

// 登录
export function loginIn(params) {
  return post("lc/login", params);
}

// 注册
export function SignUp(params) {
  return post("lc/register", params);
}

// 获取用户列表
export function getUserList(params) {
  return postWithJwt("lc/ri/friendList", params);
}

//获取群列表
export function getGroupList(params) {
  return postWithJwt("lc/ri/groupList", params);
}

//获取登陆者用户信息
export function getUserInfo(params) {
  return postWithJwt("lc/uo/userInfo", params);
}

