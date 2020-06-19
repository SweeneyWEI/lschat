/* eslint-disable*/
import { get, post } from './http'

// =======================> 用户 API

// 登录
export function loginIn(params) {
  return post("lc/login", params);
}

