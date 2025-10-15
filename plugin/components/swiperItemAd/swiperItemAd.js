// plugin/components/swiperItemAd/swiperItemAd.js
Component({
  data: {
    productList: [{
      "image": "https://www.dzbsaas.cn/footmassage/static/wxImages/c1.jpg",
      "c_image": "https://www.dzbsaas.cn/footmassage/static/wxImages/dzb7.jpg",
      "title": "点钟宝7寸",
      "brief": "适用于全智能化管理的大中型。集团连锁化管理的企业，如：综合经营足浴,保健,桑拿,洗浴.按摩。水疗。棋牌。茶楼等休闲保健。娱乐消费场所",
      "images": [
        "https://www.dzbsaas.cn/footmassage/static/wxImages/dzb7.jpg",
        "https://www.dzbsaas.cn/footmassage/static/wxImages/dzb7-1.jpg",
        "https://www.dzbsaas.cn/footmassage/static/wxImages/dzb7-2.jpg",
        "https://www.dzbsaas.cn/footmassage/static/wxImages/dzb7-3.jpg"
      ]
    },
    {
      "image": "https://www.dzbsaas.cn/footmassage/static/wxImages/c2.jpg",
      "c_image": "https://www.dzbsaas.cn/footmassage/static/wxImages/dzb3.jpg",
      "title": "点钟宝3.2寸",
      "brief": "点钟宝管理系统将目前足浴保健行业的接待流程和钟房排钟管理集成于一体，不但在管理流程上充分适应了客人的消费习惯，更重要的是为管理者提供了更先进的管理思想和管理工具，为足浴、水疗、棋牌室等多功能娱乐服务行业的信息化管理开辟了一个新的纪元。",
      "images": [
        "https://www.dzbsaas.cn/footmassage/static/wxImages/dzb3-5.jpg",
        "https://www.dzbsaas.cn/footmassage/static/wxImages/dzb3.jpg",
        "https://www.dzbsaas.cn/footmassage/static/wxImages/dzb3-1.jpg",
        "https://www.dzbsaas.cn/footmassage/static/wxImages/dzb3-2.jpg",
        "https://www.dzbsaas.cn/footmassage/static/wxImages/dzb3-3.jpg",
        "https://www.dzbsaas.cn/footmassage/static/wxImages/dzb3-4.jpg"
      ]
    },
    {
      "image": "https://www.dzbsaas.cn/footmassage/static/wxImages/c3.jpg",
      "c_image": "https://www.dzbsaas.cn/footmassage/static/wxImages/dzbSaas.jpg",
      "title": "点钟宝Saas",
      "brief": "点钟宝管理系统将目前足浴保健行业的接待流程和钟房排钟管理集成于一体，不但在管理流程上充分适应了客人的消费习惯，更重要的是为管理者提供了更先进的管理思想和管理工具，为足浴、水疗、棋牌室等多功能娱乐服务行业的信息化管理开辟了一个新的纪元。",
      "images": [
        "https://www.dzbsaas.cn/footmassage/static/wxImages/dzbSaas.jpg",
        "https://www.dzbsaas.cn/footmassage/static/wxImages/dzbsaas1.jpg",
        "https://www.dzbsaas.cn/footmassage/static/wxImages/dzbsaas2.png",
        "https://www.dzbsaas.cn/footmassage/static/wxImages/dzbsaas3.png"
      ]
    }
  ],
  },
  methods: {
    changeSwiper(event) {
      this.setData({
        isShowFloatAd: event.detail.current > 0
      });
    }
  }
})