# Requirements: ZHAOWANNUO 微信小程序商城

**Defined:** 2026-03-21
**Core Value:** 用户能流畅浏览商品并进入破价专区，视觉与设计稿像素级一致

## v1 Requirements

### 全局基础

- [ ] **BASE-01**: app.json 配置页面路由、窗口样式、自定义tabBar
- [ ] **BASE-02**: app.wxss 全局样式重置、CSS变量（颜色/字体）
- [ ] **BASE-03**: services/api.js 封装所有接口，预留真实域名，Promise化
- [ ] **BASE-04**: 自定义TabBar组件（5栏纯文字，选中黑色，未选中#999999）
- [ ] **BASE-05**: 自定义NavBar组件（Home图标+标题+胶囊按钮）

### 首页 (pages/index)

- [ ] **IDX-01**: 顶部NavBar（Home图标左、胶囊右，无标题文字）
- [ ] **IDX-02**: 品牌Logo "ZHAOWANNUO®" 左对齐，font-weight:700，黑色
- [ ] **IDX-03**: 次级导航行："探索全部⊕"（左）+"2026∨"（右）
- [ ] **IDX-04**: 黑色横幅banner，单行文字"破价专区 · Special Offer 点击进入 >"，可点击跳转破价专区
- [ ] **IDX-05**: 全宽模特图区域（占位符，底部文字"ZHAOWANNUO | 所有产品"）
- [ ] **IDX-06**: 右下角橙色渐变悬浮礼物按钮（直径96rpx）
- [ ] **IDX-07**: 从API获取首页数据（bannerList/productList），含loading/error/empty三态

### 破价专区 (pages/special)

- [ ] **SPE-01**: NavBar返回箭头（左）+胶囊（右），"破价专区"为圆角胶囊badge标题
- [ ] **SPE-02**: 顶部模特banner（"all products"小字+"所有产品"大字+"点击进入"按钮）
- [ ] **SPE-03**: 单列商品卡片（圆角12rpx，阴影，左图右文布局）
- [ ] **SPE-04**: 已抢光商品显示黑色半透明遮罩+"已抢光"文字
- [ ] **SPE-05**: 商品标签组（不退款/不换款/只换尺码，灰色边框圆角）
- [ ] **SPE-06**: 库存文字（"仅剩X件"，#999999）+ 价格 + 圆形加购按钮
- [ ] **SPE-07**: 悬浮礼物按钮（同首页）
- [ ] **SPE-08**: 从API获取破价商品列表，含三态处理

### 购物车 (pages/cart)

- [ ] **CART-01**: NavBar（Home图标+购物车文字左对齐，胶囊右）
- [ ] **CART-02**: 页面背景#F5F5F5（浅灰）
- [ ] **CART-03**: 空状态：占位插画（200×200rpx）+提示文字+继续逛逛按钮（黑色圆角）
- [ ] **CART-04**: 有数据时显示购物车列表（数据从API获取）
- [ ] **CART-05**: 从API获取购物车数据，空数组显示空状态

### 上新页 (pages/new)

- [ ] **NEW-01**: NavBar（Home图标左，"新品"左对齐标题，胶囊右）
- [ ] **NEW-02**: 折叠标题区"直播间的小黄车"（粗体左对齐）+下划线装饰+"∨"箭头
- [ ] **NEW-03**: 产品分类banner（"Central Product Classification"小字+"产品分类"字间距大字+"点击进入"按钮）
- [ ] **NEW-04**: 双列商品网格（gap:20rpx，padding:20rpx）
- [ ] **NEW-05**: 商品卡片：图片区（含底部"ZHAOWANNUO"灰色文字）+商品名+标签+销售数据+价格+黑色圆形购物车按钮
- [ ] **NEW-06**: 从API获取新品列表，含三态处理

### 会员中心 (pages/mine)

- [ ] **MINE-01**: NavBar（Home图标左，"会员中心"居中，胶囊右）
- [ ] **MINE-02**: 用户信息区：左侧ID"21>"（粗体）+"V1 普通会员"badge（米色#F5F0E8背景，棕色#8B7355文字）
- [ ] **MINE-03**: 右侧圆形头像（直径120rpx，占位符）
- [ ] **MINE-04**: 购物须知卡片（浅背景圆角）："SHOPPING NOTICE"大标题+字间距+"购物须知"黑色按钮+三栏须知图标
- [ ] **MINE-05**: 功能菜单卡片（白色圆角）：4个图标单行（我的订单/收货人地址/我的优惠券/我的收藏）
- [ ] **MINE-06**: 退出登录项（箭头图标，左对齐）
- [ ] **MINE-07**: 底部"🍀 凡科商城提供技术支持"（#CCCCCC）
- [ ] **MINE-08**: 从API获取用户信息

### 分类页 (pages/category)

- [ ] **CAT-01**: NavBar（Home图标左，无标题，胶囊右）
- [ ] **CAT-02**: 居中Logo "ZHAOWANNUO®"+"官方旗舰店"副标题
- [ ] **CAT-03**: 搜索框（圆角，"🔍 探索更多"，全宽）
- [ ] **CAT-04**: 横向滚动Tab标签（小程序专属/早期特价/外套/内搭/裤子/套装），选中项粗体+下划线
- [ ] **CAT-05**: Tab下方banner（同上新页"所有产品"样式）
- [ ] **CAT-06**: 双列商品网格（同上新页样式）
- [ ] **CAT-07**: 悬浮礼物按钮
- [ ] **CAT-08**: 从API获取分类商品，Tab切换重新请求

## v2 Requirements

### 商品详情页
- 商品详情展示、尺码选择、加入购物车

### 订单流程
- 下单、支付、订单列表

### 登录注册
- 微信授权登录

## Out of Scope

| Feature | Reason |
|---------|--------|
| 支付功能 | 后端接口待接入，二期 |
| 商品搜索结果页 | 二期 |
| 地址管理页 | 二期 |
| 优惠券列表页 | 二期 |
| 收藏列表页 | 二期 |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| BASE-01~05 | Phase 1 | Pending |
| IDX-01~07 | Phase 2 | Pending |
| SPE-01~08 | Phase 3 | Pending |
| CART-01~05 | Phase 3 | Pending |
| NEW-01~06 | Phase 4 | Pending |
| MINE-01~08 | Phase 4 | Pending |
| CAT-01~08 | Phase 4 | Pending |

**Coverage:**
- v1 requirements: 43 total
- Mapped to phases: 43
- Unmapped: 0 ✓

---
*Requirements defined: 2026-03-21*
