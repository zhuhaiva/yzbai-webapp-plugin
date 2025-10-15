const plugin = requirePlugin("yzb-fast-login-plugin")
Page({
  data: {
    items: [],
    currentItem: 0
  },
  onLoad(options) {
    // this.getPage(options)
  },
  getInfo(e) {
    const {
      userInfo
    } = e.detail
    console.log(userInfo)
  },
  getPage(options) {
    const {
      miniProgram
    } = wx.getAccountInfoSync();
    plugin
      .config({
        ...options,
        appId: miniProgram.appId,
        type: 1000,
        wxscene: getApp().scene,
        mtoken: "12b66d18-c9e2-4cf6-8faa-cae90ca32ddf",
        userInfo: {
          nickName: "develop",
        },
        params:{
          roomName:205
        },
        tenantId: "caba6906",
        phone: "13733174682"
      })
      .then(({
        url
      }) => {
        wx.redirectTo({
          url
        });
      });
  }
})