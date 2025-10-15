// plugin/pages/lightbox-control/detail/detail.js
import {
  sendLcinformation,
  getLCinformationInfo,
  refreshLcinformation
} from '../../../api/lightbox.js';
import {
  encrypt
} from '../../../script/common'
import {
  getTenantId
} from '../../../utils/storage'
const url = "https://littleapp.dzbsaas.cn/footmassage/static/assets/images/yzbai"
let interstitialAd = null
Page({
  data: {
    image: {
      refresh: `${url}/refresh.svg`,
      poweroff: `${url}/poweroff.svg`,
      plus: `${url}/plus.svg`,
      minus: `${url}/minus.svg`,
      warning: `${url}/warning.svg`
    },
    roomName: "",
    loading: true,
    synchronized: true,
    form: {
      air: {
        currtemp: 0,
        exhaust: 80,
        mode: 106,
        speed: 141,
        switch: 154,
        temp: 24,
        tos: -5
      },
      light: {
        relayStatus: 0,
        sm: 0
      }
    },
    relayStatus: [0, 0, 0, 0, 0, 0, 0],
    lightboxMode: [{
        name: '明亮',
        cmd: 128
      },
      {
        name: '柔和',
        cmd: 129
      },
      {
        name: '浪漫',
        cmd: 130
      },
      {
        name: '商务',
        cmd: 131
      },
      {
        name: '抒情',
        cmd: 132
      },
      {
        name: '打扫',
        cmd: 133
      }
    ],
    lightboxCustromMode: [],
    lights: [{
        name: "未定义",
        img: "ic_star_24px.svg"
      },
      {
        name: "主灯",
        img: "main.svg"
      },
      {
        name: "灯带",
        img: "tapelishts.svg"
      },
      {
        name: "筒灯",
        img: "flush.svg"
      },
      {
        name: "射灯",
        img: "spotlight.svg"
      },
      {
        name: "壁灯",
        img: "wall.svg"
      },
      {
        name: "打扫",
        img: "clean.svg"
      },
      {
        name: "衣柜",
        img: "armoire.svg"
      },
      {
        name: "氛围",
        img: "atmosphere.svg"
      },
      {
        name: "吊灯",
        img: "ceiling.svg"
      },
      {
        name: "门把手",
        img: "doorhandle.svg"
      },
      {
        name: "门灯",
        img: "floor.svg"
      },
      {
        name: "地灯",
        img: "floor.svg"
      },
      {
        name: "镜灯",
        img: "mirrorlight.svg"
      },
      {
        name: "装饰灯",
        img: "ornament.svg"
      },
      {
        name: "缝灯",
        img: "sew.svg"
      },
      {
        name: "软幕",
        img: "softscreen.svg"
      },
      {
        name: "背景灯",
        img: "spotbackground.svg"
      },
      {
        name: "洗手台",
        img: "wasebasin.svg"
      },
      {
        name: "欢迎灯",
        img: "welcome.svg"
      },
      {
        name: "电视",
        img: "Tv_24.svg"
      },
      {
        name: "投影仪",
        img: "Projector_24.svg"
      },
      {
        name: "洗手间",
        img: "restroom.svg"
      },
      {
        name: "淋浴房",
        img: "bathroom.svg"
      },
      {
        name: "新风",
        img: "Freshair.svg"
      },
      {
        name: "消毒灯",
        img: "disinfection.svg"
      },
      {
        name: "排风",
        img: "AirExhaust.svg"
      },
      {
        name: "窗帘开",
        img: "curtain_open.svg"
      },
      {
        name: "窗帘关",
        img: "curtain_close.svg"
      },
      {
        name: "",
        img: ""
      },
      {
        name: "棋牌灯",
        img: "mahjonglight.svg"
      },
      {
        name: "棋牌桌",
        img: "mahjongtable.svg"
      }
    ]
  },
  onLoad(options) {
    const {
      roomName
    } = options
    wx.setNavigationBarTitle({
      title: `${roomName}房间控制`,
    })
    this.setData({
      roomName
    })
    this.getRoomLightbox()
    // 在页面onLoad回调事件中创建插屏广告实例
    if (wx.createInterstitialAd) {
      interstitialAd = wx.createInterstitialAd({
        adUnitId: 'adunit-dc5877058c0d8681'
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
  },
  // 开关空调
  changeAirSwitch() {
    if (!this.allowOperat()) return;
    const {
      form
    } = this.data
    this.setData({
      ['form.air.switch']: form.air.switch === 154 ? 155 : 154
    })
    this.syncRoomLightbox();
  },
  // 改变空调模式
  changeAirMode() {
    if (!this.allowOperat()) return;
    const {
      form
    } = this.data
    let modeCode = 106;
    switch (form.air.mode) {
      case 106:
        modeCode = 107;
        break;
      case 107:
        modeCode = 108;
        break;
      case 108:
        modeCode = 106;
        break;
    }
    this.setData({
      ['form.air.mode']: modeCode
    })
    this.syncRoomLightbox();
  },
  // 改变空调温度
  changeAirTemp(e) {
    if (!this.allowOperat()) return;
    const {
      type
    } = e.currentTarget.dataset
    const {
      form
    } = this.data
    if (type === 'add') {
      this.setData({
        ['form.air.temp']: form.air.temp < 30 ? form.air.temp + 1 : 30
      })
    } else {
      this.setData({
        ['form.air.temp']: form.air.temp > 16 ? form.air.temp - 1 : 16
      })
    }
    this.syncRoomLightbox();
  },
  changeAirTempSlider(e) {
    if (!this.allowOperat()) return;
    this.setData({
      ['form.air.temp']: e.detail.value
    })
    this.syncRoomLightbox();
  },
  // 改变排风开关
  changeAirExhaust() {
    if (!this.allowOperat()) return;
    const {
      form
    } = this.data
    this.setData({
      ['form.air.exhaust']: form.air.exhaust === 80 ? 81 : 80
    })
    this.syncRoomLightbox();
  },
  // 改变风速
  changeAirSpeed() {
    if (!this.allowOperat()) return;
    const {
      form
    } = this.data
    let speedCode = 138;
    switch (form.air.speed) {
      case 138:
        speedCode = 139;
        break;
      case 139:
        speedCode = 140;
        break;
      case 140:
        speedCode = 141;
        break;
      case 141:
        speedCode = 138;
        break;
    }
    this.setData({
      ['form.air.speed']: speedCode
    })
    this.syncRoomLightbox();
  },
  // 改变灯光主题模式
  changeLightMode(cmd) {
    if (!this.allowOperat()) return;
    this.setData({
      ['form.light.cmd']: cmd
    })
    this.syncRoomLightbox();
  },
  // 改变灯光自定义模式
  changeLightCustromMode(e) {
    if (!this.allowOperat()) return;
    const {
      item
    } = e.currentTarget.dataset
    const index = this.data.lightboxCustromMode.findIndex(i => i.name === item.name);
    item.status = item.status === 1 ? 0 : 1;
    this.setData({
      [`lightboxCustromMode[${index}]`]: item
    })
    this.syncRoomLightbox();
  },
  // 一键开关
  changeAirAllSwitch() {
    if (!this.allowOperat()) return;
    const flag = this.isOpend()
    this.setData({
      ['form.air.switch']: flag ? 155 : 154,
      ['form.air.exhaust']: flag ? 81 : 80,
      ['form.air.cmd']: flag ? 0 : 0,
      ['lightboxCustromMode']: this.data.lightboxCustromMode.map(item => {
        item.status = flag ? 0 : 1
        return item
      })
    })
    this.syncRoomLightbox();
  },
  // 刷新房间灯光状态
  refreshRoomLightbox(cellback) {
    const {
      roomName
    } = this.data
    refreshLcinformation({
      roomName,
      ...encrypt(getTenantId())
    }).then(() => {
      setTimeout(() => {
        cellback && cellback()
      }, 1500);
    })
  },
  // 获取房间灯光状态
  getRoomLightbox(alert = false) {
    const {
      roomName,
      lights
    } = this.data
    this.setData({
      loading: true
    })
    this.refreshRoomLightbox(() => {
      getLCinformationInfo({
        roomName,
        ...encrypt(getTenantId())
      }).then((res) => {
        this.setData({
          loading: false
        })
        if (res) {
          // 处理继电器状态
          const relayStatus = (res.light.relayStatus).toString(2).padStart(8, '0').split('').reverse().map(item => parseInt(item));
          this.setData({
            form: {
              air: {
                switch: res.air[0] || 155,
                mode: res.air[1] || 106,
                speed: res.air[2] || 141,
                currtemp: res.air[3] || 0,
                temp: res.air[4] || 24,
                exhaust: res.air[5] || 81,
              },
              light: {
                cmd: res.light.cmd || 0,
                relayStatus: res.light.relayStatus || 0,
                lamp: res.light.lamp,
                sm: res.light.sm || 0,
              }
            },
            lightboxCustromMode: res.light.lamp.map((item, index) => {
              return {
                status: relayStatus[index] || 0,
                name: lights[item].name,
              }
            }),
            synchronized: true
          })
        } else {
          this.setData({
            synchronized: false
          })
        }
        if (alert) {
          const {
            synchronized
          } = this.data
          wx.showToast({
            icon: "none",
            title: synchronized ? '同步成功' : '同步失败，请检查房间设备是否正常',
          })
        }
      })
    })
  },
  // 同步房间灯光状态
  syncRoomLightbox() {
    const {
      form,
      lightboxCustromMode,
      roomName
    } = this.data
    const data = {
      air: {
        switch: form.air.switch,
        mode: form.air.mode,
        speed: form.air.speed,
        temp: form.air.temp,
        exhaust: form.air.exhaust,
      },
      light: {
        cmd: form.light.cmd,
        tv: 1,
        relay: form.light.lamp.map((item, index) => {
          if (lightboxCustromMode[index].status === 1) {
            return item
          }
          return 0
        }),
        sm: form.light.sm,
      }
    }
    if (data.light.cmd === 0) {
      delete data.light.cmd
    }
    sendLcinformation(encrypt(getTenantId(), {
      roomName
    }), data).then(() => {

    })
  },
  isOpend() {
    const {
      form,
      lightboxCustromMode
    } = this.data
    if (form.air.switch === 154) {
      return true
    }
    if (form.air.exhaust === 80) {
      return true
    }
    if (lightboxCustromMode.some(item => item.status === 1)) {
      return true
    }
    return false
  },
  // 是否允许操作灯控
  allowOperat() {
    if (!this.data.synchronized) {
      wx.showToast({
        icon: "none",
        title: '同步中稍后再试',
      })
      return false;
    }
    if (this.data.loading) {
      wx.showToast({
        icon: "none",
        title: '同步中稍后再试',
      })
      return false;
    }
    return true;
  },
  adLoad() {
    console.log('原生模板广告加载成功')
  },
  adError(err) {
    console.error('原生模板广告加载失败', err)
  },
  adClose() {
    console.log('原生模板广告关闭')
  },
})