import {
  setStorageConfig
} from "./utils/storage";
/**
 * config
 *  type = 1000 智能灯控
 *  type = 1001 智能灯控指定房间
 * 
 */
module.exports = {
  config(options) {
    return new Promise(async (resolve, reject) => {
      const {
        mtoken,
        type = 1000,
        scene = 1000,
        userInfo = null,
        tenantId,
        phone,
        params = {}
      } = options;
      if (!mtoken) {
        reject("请传入mtoken");
      }
      if (!tenantId) {
        reject("请传入tenantId");
      }
      if (!phone) {
        reject("请传入phone");
      }
      setStorageConfig({
        mtoken,
        type,
        scene,
        userInfo,
        tenantId,
        phone,
      });
      if (type === 1000) {
        resolve({
          url: "plugin://yzb-fast-login-plugin/lightbox-control",
        });
      } else if (type === 1001) {
        const {
          roomName
        } = params
        if (!roomName) {
          reject("请传入房间号");
        } else {
          resolve({
            url: `plugin://yzb-fast-login-plugin/lightbox-control-detail?roomName=${roomName}`,
          });
        }
      }
    });
  },
  getURL(options) {
    const {
      id,
      scene: teaTableId,
      time = Date.now(),
    } = this.getScanCodeParams(options);
    return {
      url: `plugin://yzb-plugin/scanorder?id=${id}&teaTableId=${teaTableId}&time=${time}`,
    };
  },
  getScanCodeParams(options) {
    if (options.q) {
      const url = decodeURIComponent(options.q);
      return getRequest(url);
    } else if (options.scene) {
      return {
        id: options.id || "",
        scene: decodeURIComponent(options.scene),
        time: options.time,
      };
    }
    return options;
  },
};