import md5 from '../utils/md5.js';
import {
  getStorageConfig
} from "../utils/storage";
/**
 * 生成签名
 * @param {*} tenantId 
 */
function encrypt(tenantId, params) {
  const data = getStorageConfig('userInfo')
  if (data) {
    const arr = {
      tenantId,
      name: data.userInfo.nickName?data.userInfo.nickName:'guest',
      password: '123456789',
      mtoken: data.mtoken,
      timeStamp: new Date().getTime()
    };
    var sign = md5(arr.tenantId + arr.password + arr.name + arr.timeStamp);
    return {
      ...arr,
      sign,
      ...params
    }
  }
}
module.exports = {
  encrypt
}