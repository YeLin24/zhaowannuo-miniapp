Component({
  properties: {
    title: {
      type: String,
      value: ''
    }
  },
  data: {
    statusBarHeight: 0,
    navBarHeight: 44
  },
  lifetimes: {
    attached() {
      const app = getApp()
      this.setData({
        statusBarHeight: app.globalData.statusBarHeight || 0,
        navBarHeight: app.globalData.navBarHeight || 44
      })
    }
  },
  methods: {
    onHomeTap() {
      wx.switchTab({
        url: '/pages/index/index'
      })
    }
  }
})
