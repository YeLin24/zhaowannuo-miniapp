App({
  onLaunch() {
    // 获取系统信息，供各页面使用
    const systemInfo = wx.getSystemInfoSync()
    this.globalData = {
      statusBarHeight: systemInfo.statusBarHeight,
      navBarHeight: systemInfo.statusBarHeight + 44,
      screenWidth: systemInfo.screenWidth,
      screenHeight: systemInfo.screenHeight,
      userInfo: null
    }
  },
  globalData: {
    statusBarHeight: 0,
    navBarHeight: 0,
    screenWidth: 375,
    screenHeight: 812,
    userInfo: null
  }
})
