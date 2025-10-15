// plugin/pages/lightbox-control/index/index.js
import {
  getlistroom,
  getLCinformationInfo,
  refreshLcinformation
} from '../../../api/lightbox.js';
import {
  encrypt
} from '../../../script/common'
import {
  getTenantId
} from '../../../utils/storage'
Page({
  data: {
    empty: false,
    room_list: [],
    lc_list: [],
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
  onLoad() {
    this.getlistroomHandler()
  },
  // 跳转到子页面
  lcControl(e) {
    const {
      item
    } = e.currentTarget.dataset
    wx.navigateTo({
      url: `plugin://yzb-fast-login-plugin/lightbox-control-detail?roomName=${item.name}`,
    })
  },
  getlistroomHandler() {
    getlistroom({
      ...encrypt(getTenantId())
    }).then(res => {
      this.setData({
        empty:true,
        room_list: res.Rooms
      })
      res.Rooms.forEach(item => {
        // if (item.name === "205") {
        this.getRoomLightbox(item)
        // }
      })
      wx.stopPullDownRefresh()
    })
  },
  // 获取房间灯光状态
  getRoomLightbox(item) {
    const roomIndex = this.data.room_list.findIndex(room => room.name === item.name)
    refreshLcinformation({
      roomName: item.name,
      ...encrypt(getTenantId())
    }).then(() => {
      setTimeout(() => {
        getLCinformationInfo({
          roomName: item.name,
          ...encrypt(getTenantId())
        }).then((res) => {
          this.loading = false;
          if (res) {
            // 处理继电器状态
            const relayStatus = (res.light.relayStatus).toString(2).padStart(8, '0').split('').reverse().map(j => parseInt(j));
            this.setData({
              empty: false,
              [`room_list[${roomIndex}].lc`]: res,
              [`room_list[${roomIndex}].lightboxCustromMode`]: res.light.lamp.map((item, index) => {
                return {
                  status: relayStatus[index] || 0,
                  name: this.data.lights[item].name,
                  img: this.data.lights[item].img
                }
              })
            })
          }
        })
      }, 1000);
    })
  },
  onPullDownRefresh() {
    this.getlistroomHandler()
  }
})