// 对应示例图5：会员中心逻辑
// 真实接口：/api/user/info
// TODO: 确认实际接口字段映射

const { api } = require('../../services/api')
const app = getApp()

Page({
  data: {
    statusBarHeight: 0,
    safeBottom: 0,
    loading: false,
    // 从API获取，禁止写死
    userInfo: {
      id: '',
      level: 1,
      levelName: '普通会员',
      avatarUrl: ''
    }
  },

  onLoad() {
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
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 4 })
    }
  },

  async loadData() {
    this.setData({ loading: true })
    wx.showLoading({ title: '加载中...' })
    try {
      // 真实接口：GET /api/user/info
      // 假设返回：{ code: 200, data: { id, level, levelName, avatarUrl } }
      // TODO: 确认实际接口字段映射
      const data = await api.getUserInfo()
      this.setData({
        userInfo: data || this.data.userInfo,
        loading: false
      })
      // 同步到全局
      app.globalData.userInfo = data
    } catch (err) {
      console.error('[会员中心] 加载失败:', err)
      this.setData({ loading: false })
    } finally {
      wx.hideLoading()
    }
  },

  goOrders() {
    // TODO: 跳转我的订单页（二期）
    wx.showToast({ title: '订单页开发中', icon: 'none' })
  },

  goAddress() {
    wx.showToast({ title: '地址管理开发中', icon: 'none' })
  },

  goCoupon() {
    wx.showToast({ title: '优惠券页开发中', icon: 'none' })
  },

  goFavorite() {
    wx.showToast({ title: '收藏页开发中', icon: 'none' })
  },

  onLogout() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      confirmColor: '#000000',
      success(res) {
        if (res.confirm) {
          // TODO: 清除登录态，跳转登录页
          wx.clearStorageSync()
          wx.showToast({ title: '已退出', icon: 'success' })
        }
      }
    })
  }
})
