// services/api.js
// 真实接口封装，预留域名替换

// 开发环境使用本地服务，生产环境替换为真实域名
const API_BASE = 'http://localhost:3000/api' // TODO: 上线时替换为真实域名

// 三态管理
const stateManager = {
  loading: new Map(),
  error: new Map(),

  setLoading(key, value) {
    this.loading.set(key, value)
    wx.setStorageSync(`api_loading_${key}`, value)
  },
  getLoading(key) {
    return this.loading.get(key) || wx.getStorageSync(`api_loading_${key}`)
  },
  setError(key, value) {
    this.error.set(key, value)
    wx.setStorageSync(`api_error_${key}`, value)
  },
  getError(key) {
    return this.error.get(key) || wx.getStorageSync(`api_error_${key}`)
  },
  clear(key) {
    this.loading.delete(key)
    this.error.delete(key)
    wx.removeStorageSync(`api_loading_${key}`)
    wx.removeStorageSync(`api_error_${key}`)
  }
}

/**
 * 封装 wx.request 为 Promise，带三态处理
 * 假设后端统一返回：{ code: 200, data: {...}, message: 'ok' }
 * 如实际字段不同，请调整 resolve/reject 逻辑
 */
function request(options) {
  const { url, method = 'GET', data = {} } = options
  const cacheKey = `${method}:${url}:${JSON.stringify(data)}`

  return new Promise((resolve, reject) => {
    // 设置 loading 状态
    stateManager.setLoading(cacheKey, true)
    wx.setStorageSync('api_states', {
      loading: { ...stateManager.loading, [cacheKey]: true },
      error: stateManager.error
    })

    wx.request({
      url: options.url,
      method: method,
      data: data,
      header: {
        'Content-Type': 'application/json',
        // TODO: 添加 token 认证头
        // 'Authorization': `Bearer ${wx.getStorageSync('token')}`
      },
      success(res) {
        if (res.statusCode === 200 && res.data.code === 200) {
          stateManager.clear(cacheKey)
          wx.setStorageSync('api_states', { loading: {}, error: {} })
          resolve(res.data.data)
        } else {
          const errorMsg = res.data.message || '请求失败'
          stateManager.setError(cacheKey, errorMsg)
          wx.setStorageSync('api_states', {
            loading: {},
            error: { [cacheKey]: errorMsg }
          })
          reject(new Error(errorMsg))
        }
      },
      fail(err) {
        const errorMsg = err.errMsg || '网络错误'
        stateManager.setError(cacheKey, errorMsg)
        wx.setStorageSync('api_states', {
          loading: {},
          error: { [cacheKey]: errorMsg }
        })
        reject(new Error(errorMsg))
      }
    })
  })
}

// 获取三态的辅助方法
function getApiState(key) {
  const states = wx.getStorageSync('api_states') || { loading: {}, error: {} }
  return {
    loading: states.loading[key] || false,
    error: states.error[key] || null
  }
}

const api = {
  // ========== 首页 ==========
  // 真实接口：GET /api/home
  // 返回字段：{ bannerList: [...], categoryList: [...], productList: [...] }
  getHomeData() {
    return request({ url: `${API_BASE}/home` })
  },

  // ========== 破价专区 ==========
  // 真实接口：GET /api/special-offers
  // 返回字段：{ productList: [{id, name, code, tags, stock, price, imageUrl, isSoldOut}] }
  getSpecialOffers() {
    return request({ url: `${API_BASE}/special-offers` })
  },

  // ========== 购物车 ==========
  // 真实接口：GET /api/cart
  // 返回字段：{ cartList: [{id, productId, name, price, imageUrl, quantity, sku}] }
  getCartList() {
    return request({ url: `${API_BASE}/cart` })
  },

  // 加入购物车
  // 真实接口：POST /api/cart/add
  addToCart(data) {
    return request({
      url: `${API_BASE}/cart/add`,
      method: 'POST',
      data
    })
  },

  // ========== 上新页 ==========
  // 真实接口：GET /api/products/new
  // 返回字段：{ productList: [{id, name, code, tags, sales, stock, price, imageUrl}] }
  getNewProducts(params) {
    return request({ url: `${API_BASE}/products/new`, data: params })
  },

  // ========== 分类页 ==========
  // 真实接口：GET /api/categories
  // 返回字段：{ tabs: [{id, name}], productList: [...] }
  getCategoryData() {
    return request({ url: `${API_BASE}/categories` })
  },

  // 按分类获取商品
  // 真实接口：GET /api/products?categoryId=xxx
  getProductsByCategory(categoryId) {
    return request({ url: `${API_BASE}/products`, data: { categoryId } })
  },

  // ========== 用户信息 ==========
  // 真实接口：GET /api/user/info
  // 返回字段：{ id, level, levelName, avatarUrl }
  getUserInfo() {
    return request({ url: `${API_BASE}/user/info` })
  },

  // ========== 订单 ==========
  // 真实接口：GET /api/orders
  getOrders() {
    return request({ url: `${API_BASE}/orders` })
  }
}

module.exports = {
  api,
  getApiState,
  request
}
