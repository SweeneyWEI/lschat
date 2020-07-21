/* eslint-disable*/
import { get, post, postWithJwt } from "./http";

// =======================> 用户 API

// 登录
export function loginIn(params) {
  return post("lc/login", params);
}

// 登出
export function logout(params) {
  return postWithJwt("lc/logout", params);
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

//获取聊天记录
export function getChatContentList(params) {
  return postWithJwt("lc/ri/chatContent", params);
}

//获取用户信息
export function getUserInfo(params) {
  return postWithJwt("lc/uo/userInfo", params);
}

//查询用户
export function getQueryUser(params) {
  return postWithJwt("lc/uo/queryUser", params);
}

//加好友申请
export function addFriendApply(params) {
  return postWithJwt("lc/uo/apply/friendRequest",params);
}

//轮询好友申请
export function scheduleFriendApply(params) {
  return postWithJwt("lc/uo/schedule/friendRequest",params);
}

//查询未通过的好友申请
export function notAllowedApply(params) {
  return postWithJwt("lc/uo/query/friendRequest",params);
}

//好友申请通过
export function agreeApply(params) {
  return postWithJwt("lc/uo/agree/friendRequest",params);
}
//消息实时监听
export function messageAlert(params) {
  return postWithJwt("lc/uo/schedule/message",params);
}
//删除好友
export function deleteFriendRequest(params) {
  return postWithJwt("lc/uo/delete/friend",params);
}

//更新好友信息
export function updateUserInfo(params) {
  return postWithJwt("lc/uo/update/userInfo",params);
}

//创建群
export function createGroupRequest(params) {
  return postWithJwt("/lc/go/createGroup",params);
}

