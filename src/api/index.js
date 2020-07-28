/* eslint-disable*/
import { get, post, postFormData, postWithJwt } from "./http";

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

//更新群名
export function updateGNameRequest(params) {
  return postWithJwt("/lc/go/updateGroupName",params);
}

//删除群
export function deleteGroupRequest(params) {
  return postWithJwt("/lc/go/deleteGroup",params);
}

//退出群
export function quitGroupRequest(params) {
  return postWithJwt("/lc/go/quitGroup",params);
}

//群拉人
export function groupInviteRequest(params) {
  return postWithJwt("/lc/go/addGroupMember",params);
}

//群详细信息
export function getGroupInfoList(params) {
  return postWithJwt("/lc/ri/groupInfo",params);
}

//查询好友列表除去群成员
export function getFriendsNotInGroupList(params) {
  return postWithJwt("/lc/ri/groupAbsent/friend",params);
}

//上传头像
export function uploadAvatarRequest(params) {
  return postFormData("lc/uo/upload/picture",params);
}

