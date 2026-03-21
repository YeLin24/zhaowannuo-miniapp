// 对应示例图1：首页逻辑
// 真实接口：/api/home
// TODO: 确认实际接口字段映射

const api = require('../../services/api')
const app = getApp()

Page({
  data: {
    statusBarHeight: 0,
    safeBottom: 0,
    loading: false,
    hasError: false,
    // 以下字段从API获取，禁止写死
    bannerList: [],
    productList: []
  },

  onLoad() {
    // 获取状态栏高度
    const { statusBarHeight } = app.globalData
    const systemInfo = wx.getSystemInfoSync()
    this.setData({
      statusBarHeight,
      safeBottom: systemInfo.safeArea
        ? systemInfo.screenHeight - systemInfo.safeArea.bottom
        : 0
    })
    this.loadData()
  },

  onShow() {
    // 更新TabBar选中态
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 0 })
    }
  },

  async loadData() {
    this.setData({ loading: true, hasError: false })
    wx.showLoading({ title: '加载中...' })
    try {
      // 真实接口：GET /api/home
      // 假设返回：{ code: 200, data: { bannerList: [...], productList: [...] } }
      // TODO: 确认实际接口字段映射
      const data = await api.getHomeData()
      this.setData({
        bannerList: data.bannerList || [],
        productList: data.productList || [],
        loading: false
      })
    } catch (err) {
      console.error('[首页] 加载失败:', err)
      this.setData({ loading: false, hasError: true })
      wx.showToast({ title: '加载失败', icon: 'none' })
    } finally {
      wx.hideLoading()
    }
  },

  // 跳转破价专区
  goSpecial() {
    wx.navigateTo({ url: '/pages/special/special' })
  },

  // 悬浮礼物按钮
  onGiftTap() {
    wx.navigateTo({ url: '/pages/special/special' })
  },

  onPullDownRefresh() {
    this.loadData().then(() => wx.stopPullDownRefresh())
  }
})
