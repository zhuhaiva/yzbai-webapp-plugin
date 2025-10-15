// plugin/components/interstitialAd/interstitialAd.js
Component({
  properties: {
    show: {
      type: Boolean,
      default: false
    }
  },
  observers: {
    "show": function (val) {
      if (val) {
        this.openAd()
      }
    }
  },
  data: {

  },
  methods: {
    openAd() {
      // 若在开发者工具中无法预览广告，请切换开发者工具中的基础库版本
      // 在页面中定义插屏广告
      let interstitialAd = null

      // 在页面onLoad回调事件中创建插屏广告实例
      if (wx.createInterstitialAd) {
        interstitialAd = wx.createInterstitialAd({
          adUnitId: 'adunit-b66cf5c2c894b441'
        })
        interstitialAd.onLoad(() => {})
        interstitialAd.onError((err) => {
          console.error('插屏广告加载失败', err)
        })
        interstitialAd.onClose(() => {})
      }

      // 在适合的场景显示插屏广告
      if (interstitialAd) {
        interstitialAd.show().catch((err) => {
          console.error('插屏广告显示失败', err)
        })
      }
    }
  }
})