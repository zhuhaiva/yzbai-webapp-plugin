const plugin = requirePlugin("yzb-fast-login-plugin")
Page({
  data: {
    items: [],
    currentItem: 0,
    interstitialAdShow:false,
    rewardedVideoAdShow: false
  },
  onLoad(options) {
    // this.getPage(options)
  },
  getInfo(e) {
    const {
      userInfo
    } = e.detail
  },
  getPage(e) {
    const {
      type = 1000
    } = e.currentTarget.dataset
    const {
      miniProgram
    } = wx.getAccountInfoSync();
    console.log(e, type)
    plugin
      .config({
        appId: miniProgram.appId,
        type: Number(type),
        wxscene: getApp().scene,
        mtoken: "12b66d18-c9e2-4cf6-8faa-cae90ca32ddf",
        userInfo: {
          nickName: "develop",
        },
        params: {
          roomName: 205
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
  },
  // 打开插屏广告
  openIntersTitialAd() {
    this.setData({
      interstitialAdShow: true
    })
  },
  // 打开激励广告
  openRewardedVideoAd() {
    this.setData({
      rewardedVideoAdShow: true
    })
  },
  // 激励广告结果
  rewardedVideoClose(e) {
    wx.showModal({
      title:"激励广告状态",
      content:e.detail.type==="success"?"完成激励任务":"未完成激励任务"
    })
  }
})