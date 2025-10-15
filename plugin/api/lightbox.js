import request from "../script/request";

// 获取房间信息
export function getlistroom(data) {
  return request({
    url: "littleapp/boss/listroom.do",
    method: "get",
    data
  });
}

// 智能设备
export function getLCinformation(data) {
  return request({
    url: "littleapp/boss/lcinformation.do",
    method: "get",
    data
  });
}

// 获取智能设备
export function getLCinformationInfo(data) {
  return request({
    url: "littleapp/boss/lcinformation_get.do",
    method: "get",
    loading:false,
    data
  });
}

// 刷新智能设备
export function refreshLcinformation(data) {
  return request({
    url: "littleapp/boss/lcinformation_refresh.do",
    method: "get",
    loading:false,
    data
  });
}

// 控制智能设备
export function sendLcinformation(params, data) {
  return request({
    url: `littleapp/boss/lcinformation_send.do`,
    method: "post",
    data,
    params
  });
}