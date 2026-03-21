# Roadmap: ZHAOWANNUO 微信小程序商城

**Created:** 2026-03-21
**Phases:** 4 | **Requirements:** 43 | Coverage: 100% ✓

---

## Phase 1: 项目骨架 + 全局基础

**Goal:** 小程序可运行，路由配置完整，全局样式/组件就绪

**Requirements:** BASE-01, BASE-02, BASE-03, BASE-04, BASE-05

**Tasks:**
1. 创建 app.json（页面路由、窗口配置、自定义tabBar）
2. 创建 app.js（全局初始化）
3. 创建 app.wxss（全局重置样式、CSS变量）
4. 创建 services/api.js（Promise封装所有接口）
5. 创建 components/tab-bar（自定义TabBar组件）
6. 创建 components/nav-bar（自定义NavBar组件）

**Success Criteria:**
- 小程序能在开发者工具中运行
- TabBar 5个tab可切换，选中态正确
- NavBar在各页面显示正确

---

## Phase 2: 首页

**Goal:** 首页完整还原，数据从API加载

**Requirements:** IDX-01~07

**Tasks:**
1. pages/index/index.json（引用组件）
2. pages/index/index.wxml（结构：navBar+logo+次级导航+banner+模特图+悬浮按钮）
3. pages/index/index.wxss（样式：精确颜色值、rpx单位）
4. pages/index/index.js（调用API、三态处理）

**Success Criteria:**
- Logo左对齐，字重700
- Banner纯黑背景，单行文字居中
- 悬浮橙色礼物按钮右下角定位
- 页面数据从API返回（不写死）

---

## Phase 3: 破价专区 + 购物车

**Goal:** 商品列表页和购物车空状态完整还原

**Requirements:** SPE-01~08, CART-01~05

**Tasks:**
1. pages/special（wxml+wxss+js）：单列商品卡片
2. pages/cart（wxml+wxss+js）：空状态 + 列表态

**Success Criteria:**
- 商品卡片：左图右文，圆角，阴影
- 已抢光遮罩正确显示
- 购物车空状态背景#F5F5F5，按钮圆角
- 所有数据从API获取

---

## Phase 4: 上新页 + 会员中心 + 分类页

**Goal:** 剩余3个页面完整还原

**Requirements:** NEW-01~06, MINE-01~08, CAT-01~08

**Tasks:**
1. pages/new（wxml+wxss+js）：双列网格
2. pages/mine（wxml+wxss+js）：会员信息+须知+菜单
3. pages/category（wxml+wxss+js）：居中Logo+搜索+Tab+双列

**Success Criteria:**
- 双列网格间距正确（gap:20rpx）
- 会员中心菜单4图标单行排列
- 分类Tab切换正确高亮
- 所有数据从API获取
