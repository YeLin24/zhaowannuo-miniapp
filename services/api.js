// services/api.js
// 真实接口封装

// 开发环境使用本地服务
const API_BASE = 'http://localhost:3000/api'

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

function request(options) {
  const { url, method = 'GET', data = {} } = options
  const cacheKey = `${method}:${url}:${JSON.stringify(data)}`

  return new Promise((resolve, reject) => {
    stateManager.setLoading(cacheKey, true)
    wx.setStorageSync('api_states', {
      loading: { ...stateManager.loading, [cacheKey]: true },
      error: stateManager.error
    })

    wx.request({
      url: options.url,
      method: method,
      data: data,
      header: { 'Content-Type': 'application/json' },
      success(res) {
        if (res.statusCode === 200 && res.data.code === 200) {
          stateManager.clear(cacheKey)
          wx.setStorageSync('api_states', { loading: {}, error: {} })
          resolve(res.data.data)
        } else {
          const errorMsg = res.data.message || '请求失败'
          stateManager.setError(cacheKey, errorMsg)
          reject(new Error(errorMsg))
        }
      },
      fail(err) {
        const errorMsg = err.errMsg || '网络错误'
        stateManager.setError(cacheKey, errorMsg)
        reject(new Error(errorMsg))
      }
    })
  })
}

function getApiState(key) {
  const states = wx.getStorageSync('api_states') || { loading: {}, error: {} }
  return { loading: states.loading[key] || false, error: states.error[key] || null }
}

const api = {
  getHomeData() {
    return request({ url: `${API_BASE}/home` })
  },
  getSpecialOffers() {
    return request({ url: `${API_BASE}/special-offers` })
  },
  getCartList() {
    return request({ url: `${API_BASE}/cart` })
  },
  addToCart(data) {
    return request({ url: `${API_BASE}/cart/add`, method: 'POST', data })
  },
  getNewProducts() {
    return request({ url: `${API_BASE}/products/new` })
  },
  getCategoryData() {
    return request({ url: `${API_BASE}/categories` })
  },
  getProductsByCategory(categoryId) {
    return request({ url: `${API_BASE}/products`, data: { categoryId } })
  },
  getUserInfo() {
    return request({ url: `${API_BASE}/user/info` })
  },
  getOrders() {
    return request({ url: `${API_BASE}/orders` })
  }
}

module.exports = { api, getApiState, request }
