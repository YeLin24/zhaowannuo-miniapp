# Phase 3: 破价专区 + 购物车 - Plan

**Created:** 2026-03-22
**Phase:** 3
**Wave:** 1

---

## Plan Overview

**Objective:** 商品列表页和购物车空状态完整还原

**Requirements Addressed:** SPE-01~08, CART-01~05

---

## Wave 1: 破价专区 + 购物车

### Task 3.1: 破价专区页面

**<read_first>**
- `/home/admin/zhaowannuo-miniapp/pages/special/special.wxml`
- `/home/admin/zhaowannuo-miniapp/pages/special/special.wxss`
- `/home/admin/zhaowannuo-miniapp/pages/special/special.js`
</read_first>

**<objective>**
实现破价专区页面：NavBar + Banner + 商品列表 + 悬浮按钮
</objective>

**<action>**
页面已完整实现:
- NavBar: 返回箭头(左) + 圆角胶囊badge标题"破价专区" + 胶囊按钮(右)
- Banner: 模特图 + "all products"小字 + "所有产品"大字 + "点击进入"按钮
- 商品卡片: 单列布局，圆角12rpx，阴影，左图右文
- 已抢光遮罩: 黑色半透明 + "已抢光"文字
- 商品标签: 不退款/不换款/只换尺码，灰色边框圆角
- 库存显示: "仅剩X件" #999999 + 价格 + 圆形加购按钮
- 悬浮礼物按钮: 同首页
- API调用: getSpecialOffers() + 三态处理
</action>

**<acceptance_criteria>**
- [x] SPE-01: NavBar返回箭头 + 胶囊badge标题 + 胶囊按钮
- [x] SPE-02: 顶部模特banner
- [x] SPE-03: 单列商品卡片
- [x] SPE-04: 已抢光遮罩
- [x] SPE-05: 商品标签组
- [x] SPE-06: 库存 + 价格 + 加购按钮
- [x] SPE-07: 悬浮礼物按钮
- [x] SPE-08: API获取 + 三态处理
</acceptance_criteria>

---

### Task 3.2: 购物车页面

**<read_first>**
- `/home/admin/zhaowannuo-miniapp/pages/cart/cart.wxml`
- `/home/admin/zhaowannuo-miniapp/pages/cart/cart.wxss`
- `/home/admin/zhaowannuo-miniapp/pages/cart/cart.js`
</read_first>

**<objective>**
实现购物车页面：空状态 + 列表态
</objective>

**<action>**
页面已完整实现:
- NavBar: Home图标 + "购物车"文字左对齐，胶囊按钮右
- 页面背景: #F5F5F5 浅灰色
- 空状态: 占位插画 + "空空如也，快去逛逛吧~" + "继续逛逛"按钮(黑色圆角)
- 列表态: 购物车商品列表
- API调用: getCartList() + 三态处理，空数组显示空状态
</action>

**<acceptance_criteria>**
- [x] CART-01: NavBar Home图标 + 购物车文字
- [x] CART-02: 页面背景 #F5F5F5
- [x] CART-03: 空状态样式
- [x] CART-04: 购物车列表
- [x] CART-05: API获取 + 空状态显示
</acceptance_criteria>

---

## Must Haves

- [x] SPE-01: NavBar返回箭头 + 胶囊badge标题
- [x] SPE-02: 顶部模特banner
- [x] SPE-03: 单列商品卡片(圆角12rpx，阴影)
- [x] SPE-04: 已抢光遮罩
- [x] SPE-05: 商品标签组
- [x] SPE-06: 库存 + 价格 + 加购按钮
- [x] SPE-07: 悬浮礼物按钮
- [x] SPE-08: API获取 + 三态处理
- [x] CART-01: NavBar Home图标 + 购物车文字
- [x] CART-02: 页面背景 #F5F5F5
- [x] CART-03: 空状态(插画 + 文字 + 按钮)
- [x] CART-04: 购物车列表
- [x] CART-05: API获取 + 空数组显示空状态

---

## Notes

- 破价专区使用 api.getSpecialOffers() 获取商品列表
- 购物车使用 api.getCartList() 获取购物车数据
- 两页面都支持三态处理 (loading/error/empty)

