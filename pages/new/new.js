// 对应示例图4：上新页逻辑
// 真实接口：/api/products/new
// TODO: 确认实际接口字段映射

const api = require('../../services/api')
const app = getApp()

Page({
  data: {
    statusBarHeight: 0,
    safeBottom: 0,
    loading: false,
    hasError: false,
    sectionExpanded: true,
    // 从API获取，禁止写死
    productList: []
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
      this.getTabBar().setData({ selected: 1 })
    }
  },

  async loadData() {
    this.setData({ loading: true, hasError: false })
    wx.showLoading({ title: '加载中...' })
    try {
      // 真实接口：GET /api/products/new
      // 假设返回：{ code: 200, data: { productList: [{id, name, code, tags, sales, stock, price, imageUrl}] } }
      // TODO: 确认实际接口字段映射
      const data = await api.getNewProducts()
      this.setData({
        productList: data.productList || [],
        loading: false
      })
    } catch (err) {
      console.error('[上新页] 加载失败:', err)
      this.setData({ loading: false, hasError: true })
      wx.showToast({ title: '加载失败', icon: 'none' })
    } finally {
      wx.hideLoading()
    }
  },

  toggleSection() {
    this.setData({ sectionExpanded: !this.data.sectionExpanded })
  },

  goDetail(e) {
    const { id } = e.currentTarget.dataset
    // TODO: 跳转商品详情页（二期）
    wx.showToast({ title: '详情页开发中', icon: 'none' })
  },

  async onAddCart(e) {
    const { id } = e.currentTarget.dataset
    try {
      await api.addToCart({ productId: id, quantity: 1 })
      wx.showToast({ title: '已加入购物袋', icon: 'success' })
    } catch (err) {
      wx.showToast({ title: '加入失败', icon: 'none' })
    }
  },

  onPullDownRefresh() {
    this.loadData().then(() => wx.stopPullDownRefresh())
  }
})
