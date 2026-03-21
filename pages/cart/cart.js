// 对应示例图3：购物车逻辑
// 真实接口：/api/cart
// TODO: 确认实际接口字段映射

const api = require('../../services/api')
const app = getApp()

Page({
  data: {
    statusBarHeight: 0,
    safeBottom: 0,
    loading: false,
    hasError: false,
    // 空数组→空状态，有数据→列表
    cartList: []
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
      this.getTabBar().setData({ selected: 3 })
    }
    // 每次显示时刷新购物车（商品加购后需更新）
    this.loadData()
  },

  async loadData() {
    this.setData({ loading: true, hasError: false })
    wx.showLoading({ title: '加载中...' })
    try {
      // 真实接口：GET /api/cart
      // 假设返回：{ code: 200, data: { cartList: [...] } }
      // TODO: 确认实际接口字段映射（id, productId, name, price, imageUrl, quantity, sku）
      const data = await api.getCartList()
      this.setData({
        cartList: data.cartList || [],
        loading: false
      })
    } catch (err) {
      console.error('[购物车] 加载失败:', err)
      this.setData({ loading: false, hasError: true })
      wx.showToast({ title: '加载失败', icon: 'none' })
    } finally {
      wx.hideLoading()
    }
  },

  // 继续逛逛→跳到首页
  goShopping() {
    wx.switchTab({ url: '/pages/index/index' })
  },

  onPullDownRefresh() {
    this.loadData().then(() => wx.stopPullDownRefresh())
  }
})
