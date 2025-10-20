// plugin/components/adTemplate/adTemplate.js
Component({
  properties: {
    unitId: {
      type: String,
      default: ""
    }
  },
  data: {

  },
  methods: {
    adLoad() {
      this.triggerEvent('adLoad')
    },
    adError(err) {
      this.triggerEvent('adError', err)
    },
    adClose() {
      this.triggerEvent('adClose')
    },
  }
})