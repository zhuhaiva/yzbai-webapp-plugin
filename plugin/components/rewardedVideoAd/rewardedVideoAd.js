// plugin/components/rewardedVideoAd/RewardedVideoAd.js
Component({
  properties:{
    show:{
      type:Boolean,
      default:false
    }
  },
  observers:{
    "show":function(val){
      if(val){
        this.openAd()
      }
    }
  },
  data: {

  },
  methods: {
    openAd:function() {
      // 若在开发者工具中无法预览广告，请切换开发者工具中的基础库版本
      // 在页面中定义激励视频广告
      let videoAd = null

      // 在页面onLoad回调事件中创建激励视频广告实例
      if (wx.createRewardedVideoAd) {
        videoAd = wx.createRewardedVideoAd({
          adUnitId: 'adunit-88e995fe5a074a9d'
        })
        videoAd.onLoad(() => {})
        videoAd.onError((err) => {
          console.error('激励视频光告加载失败', err)
        })
        videoAd.onClose((res) => {
          if (res && res.isEnded) {
            // 正常播放结束，可以下发游戏奖励
            this.triggerEvent('close', {
              type: "success"
            })
            console.log('正常播放结束，可以下发游戏奖励')
          } else {
            // 播放中途退出，不下发游戏奖励
            this.triggerEvent('close', {
              type: "error"
            })
            console.log('播放中途退出，不下发游戏奖励')
          }
        })
      }

      // 用户触发广告后，显示激励视频广告
      if (videoAd) {
        videoAd.show().catch(() => {
          // 失败重试
          videoAd.load()
            .then(() => videoAd.show())
            .catch(err => {
              console.error('激励视频 广告显示失败', err)
            })
        })
      }
    }
  }
})