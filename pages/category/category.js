// 对应示例图6：分类页逻辑
// 真实接口：/api/categories，/api/products?categoryId=xxx
// TODO: 确认实际接口字段映射

const api = require('../../services/api')
const app = getApp()

Page({
  data: {
    statusBarHeight: 0,
    safeBottom: 0,
    loading: false,
    hasError: false,
    // Tab列表（从API获取，初始值对应图6展示）
    // 禁止写死，必须从API获取后渲染
    tabs: [],
    activeTab: '',
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
    this.loadCategoryData()
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 2 })
    }
  },

  async loadCategoryData() {
    this.setData({ loading: true, hasError: false })
    wx.showLoading({ title: '加载中...' })
    try {
      // 真实接口：GET /api/categories
      // 假设返回：{ code: 200, data: { tabs: [{id, name}], productList: [...] } }
      // TODO: 确认实际接口字段映射
      const data = await api.getCategoryData()
      const tabs = data.tabs || []
      const activeTab = tabs.length > 0 ? tabs[0].id : ''
      this.setData({
        tabs,
        activeTab,
        productList: data.productList || [],
        loading: false
      })
    } catch (err) {
      console.error('[分类页] 加载失败:', err)
      this.setData({ loading: false, hasError: true })
      wx.showToast({ title: '加载失败', icon: 'none' })
    } finally {
      wx.hideLoading()
    }
  },

  async loadProducts() {
    this.setData({ loading: true, hasError: false })
    try {
      // 真实接口：GET /api/products?categoryId=xxx
      const data = await api.getProductsByCategory(this.data.activeTab)
      this.setData({
        productList: data.productList || [],
        loading: false
      })
    } catch (err) {
      console.error('[分类页] 商品加载失败:', err)
      this.setData({ loading: false, hasError: true })
    }
  },

  onTabChange(e) {
    const { id } = e.currentTarget.dataset
    if (id === this.data.activeTab) return
    this.setData({ activeTab: id })
    this.loadProducts()
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

  onGiftTap() {
    wx.showToast({ title: '敬请期待', icon: 'none' })
  },

  onPullDownRefresh() {
    this.loadCategoryData().then(() => wx.stopPullDownRefresh())
  }
})
