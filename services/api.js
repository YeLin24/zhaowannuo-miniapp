// services/api.js
// 真实接口封装，预留域名替换

const API_BASE = 'https://your-domain.com/api' // TODO: 替换为真实域名

/**
 * 封装 wx.request 为 Promise
 * 假设后端统一返回：{ code: 200, data: {...}, message: 'ok' }
 * 如实际字段不同，请调整 resolve/reject 逻辑
 */
function request(options) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: options.url,
      method: options.method || 'GET',
      data: options.data || {},
      header: {
        'Content-Type': 'application/json',
        // TODO: 添加 token 认证头
        // 'Authorization': `Bearer ${wx.getStorageSync('token')}`
      },
      success(res) {
        if (res.statusCode === 200 && res.data.code === 200) {
          resolve(res.data.data)
        } else {
          reject(new Error(res.data.message || '请求失败'))
        }
      },
      fail(err) {
        reject(new Error(err.errMsg || '网络错误'))
      }
    })
  })
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

module.exports = api
