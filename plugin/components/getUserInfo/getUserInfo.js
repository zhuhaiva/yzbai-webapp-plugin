// plugin/components/hello-component.js
Component({
  properties: {
    version: {
      type: String,
      value: "release"
    }
  },
  data: {
    args: {
      withCredentials: true,
      lang: 'zh_CN'
    }
  },
  methods: {
    loginSuccess: function (res) {
      this.triggerEvent('onSuccess', res.detail)
    },
    loginFail: function (res) {
      console.log(res);
    }
  }
});