// services/api.js
// Mock 数据 - 本地开发使用

// Mock 数据
const mockData = {
  home: {
    bannerList: [
      { id: 1, imageUrl: '/images/banner1.jpg', linkType: 'page', linkValue: 'pages/special/special' },
      { id: 2, imageUrl: '/images/banner2.jpg', linkType: 'page', linkValue: 'pages/new/new' }
    ],
    categoryList: [
      { id: 1, name: '小程序专属' },
      { id: 2, name: '早期特价' },
      { id: 3, name: '外套' },
      { id: 4, name: '内搭' },
      { id: 5, name: '裤子' },
      { id: 6, name: '套装' }
    ],
    productList: [
      { id: 1, name: '休闲牛仔外套', code: 'JC001', price: 299, originalPrice: 599, imageUrl: '', stock: 50, tags: ['不退款', '不换款'], isSoldOut: 0 },
      { id: 2, name: '简约黑色T恤', code: 'TS001', price: 89, originalPrice: 199, imageUrl: '', stock: 100, tags: ['不退款'], isSoldOut: 0 },
      { id: 3, name: '纯棉休闲裤', code: 'PK001', price: 159, originalPrice: 399, imageUrl: '', stock: 30, tags: ['不退款', '只换尺码'], isSoldOut: 1 }
    ]
  },
  specialOffers: {
    productList: [
      { id: 1, name: '休闲牛仔外套', code: 'JC001', price: 299, originalPrice: 599, imageUrl: '', stock: 50, tags: ['不退款', '不换款'], isSoldOut: 0 },
      { id: 2, name: '简约黑色T恤', code: 'TS001', price: 89, originalPrice: 199, imageUrl: '', stock: 100, tags: ['不退款'], isSoldOut: 0 },
      { id: 3, name: '纯棉休闲裤', code: 'PK001', price: 159, originalPrice: 399, imageUrl: '', stock: 30, tags: ['不退款', '只换尺码'], isSoldOut: 1 }
    ]
  },
  categories: {
    tabs: [
      { id: 0, name: '全部' },
      { id: 1, name: '小程序专属' },
      { id: 2, name: '早期特价' },
      { id: 3, name: '外套' },
      { id: 4, name: '内搭' },
      { id: 5, name: '裤子' },
      { id: 6, name: '套装' }
    ]
  },
  newProducts: {
    productList: [
      { id: 1, name: '休闲牛仔外套', code: 'JC001', price: 299, originalPrice: 599, imageUrl: '', stock: 50, tags: ['不退款', '不换款'], sales: 128, isSoldOut: 0 },
      { id: 2, name: '简约黑色T恤', code: 'TS001', price: 89, originalPrice: 199, imageUrl: '', stock: 100, tags: ['不退款'], sales: 256, isSoldOut: 0 },
      { id: 3, name: '纯棉休闲裤', code: 'PK001', price: 159, originalPrice: 399, imageUrl: '', stock: 30, tags: ['不退款', '只换尺码'], sales: 89, isSoldOut: 1 }
    ]
  },
  cart: {
    cartList: []
  },
  user: {
    id: 1,
    level: 1,
    levelName: '普通会员',
    avatarUrl: ''
  }
}

// 模拟异步请求
function mockRequest(data, delay = 300) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, delay)
  })
}

const api = {
  getHomeData() {
    return mockRequest(mockData.home)
  },
  getSpecialOffers() {
    return mockRequest(mockData.specialOffers)
  },
  getCartList() {
    return mockRequest(mockData.cart)
  },
  addToCart(data) {
    return mockRequest({ success: true })
  },
  getNewProducts() {
    return mockRequest(mockData.newProducts)
  },
  getCategoryData() {
    return mockRequest(mockData.categories)
  },
  getProductsByCategory(categoryId) {
    return mockRequest(mockData.newProducts)
  },
  getUserInfo() {
    return mockRequest(mockData.user)
  },
  getOrders() {
    return mockRequest({ orderList: [] })
  }
}

module.exports = {
  api,
  getApiState: () => ({ loading: false, error: null }),
  request: mockRequest
}
