// 对应示例图2：破价专区逻辑
// 真实接口：/api/special-offers
// TODO: 确认实际接口字段映射

const api = require('../../services/api')
const app = getApp()

Page({
  data: {
    statusBarHeight: 0,
    safeBottom: 0,
    loading: false,
    hasError: false,
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

  async loadData() {
    this.setData({ loading: true, hasError: false })
    wx.showLoading({ title: '加载中...' })
    try {
      // 真实接口：GET /api/special-offers
      // 假设返回：{ code: 200, data: { productList: [{id, name, code, tags, stock, price, imageUrl, isSoldOut}] } }
      // TODO: 确认实际接口字段映射
      const data = await api.getSpecialOffers()
      this.setData({
        productList: data.productList || [],
        loading: false
      })
    } catch (err) {
      console.error('[破价专区] 加载失败:', err)
      this.setData({ loading: false, hasError: true })
      wx.showToast({ title: '加载失败', icon: 'none' })
    } finally {
      wx.hideLoading()
    }
  },

  goBack() {
    wx.navigateBack({ delta: 1 })
  },

  goDetail(e) {
    const { id } = e.currentTarget.dataset
    // TODO: 跳转商品详情页（二期）
    wx.showToast({ title: '详情页开发中', icon: 'none' })
  },

  async onAddCart(e) {
    const { id } = e.currentTarget.dataset
    try {
      // 真实接口：POST /api/cart/add
      await api.addToCart({ productId: id, quantity: 1 })
      wx.showToast({ title: '已加入购物袋', icon: 'success' })
    } catch (err) {
      wx.showToast({ title: '加入失败', icon: 'none' })
    }
  },

  onGiftTap() {
    // 礼物按钮点击处理
    wx.showToast({ title: '敬请期待', icon: 'none' })
  },

  onPullDownRefresh() {
    this.loadData().then(() => wx.stopPullDownRefresh())
  }
})
