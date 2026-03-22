# Phase 4: 上新页 + 会员中心 + 分类页 - Plan

**Created:** 2026-03-22
**Phase:** 4
**Wave:** 1

---

## Plan Overview

**Objective:** 剩余3个页面完整还原

**Requirements Addressed:** NEW-01~06, MINE-01~08, CAT-01~08

---

## Wave 1: 上新页 + 会员中心 + 分类页

### Task 4.1: 上新页 (pages/new)

**<read_first>**
- `/home/admin/zhaowannuo-miniapp/pages/new/new.wxml`
- `/home/admin/zhaowannuo-miniapp/pages/new/new.wxss`
- `/home/admin/zhaowannuo-miniapp/pages/new/new.js`
</read_first>

**<objective>**
实现上新页：双列网格
</objective>

**<action>**
页面已完整实现:
- NavBar: Home图标左 + "新品"标题左对齐 + 胶囊右
- 折叠标题区: "直播间的小黄车" + 下划线装饰 + ∨箭头
- Banner: "Central Product Classification" + "产 品 分 类" + "点击进入"按钮
- 双列网格: gap:20rpx, padding:20rpx
- 商品卡片: 图片 + "ZHAOWANNUO"品牌标签 + 标签 + 销售数据 + 价格 + 黑色圆形购物车按钮
- API: getNewProducts() + 三态处理
</action>

**<acceptance_criteria>**
- [x] NEW-01: NavBar Home图标 + "新品"标题 + 胶囊
- [x] NEW-02: 折叠标题区"直播间的小黄车"
- [x] NEW-03: 产品分类banner
- [x] NEW-04: 双列网格 gap:20rpx
- [x] NEW-05: 商品卡片样式
- [x] NEW-06: API获取 + 三态处理
</acceptance_criteria>

---

### Task 4.2: 会员中心 (pages/mine)

**<read_first>**
- `/home/admin/zhaowannuo-miniapp/pages/mine/mine.wxml`
- `/home/admin/zhaowannuo-miniapp/pages/mine/mine.wxss`
- `/home/admin/zhaowannuo-miniapp/pages/mine/mine.js`
</read_first>

**<objective>**
实现会员中心：用户信息 + 须知 + 菜单
</objective>

**<action>**
页面已完整实现:
- NavBar: Home图标左 + "会员中心"居中 + 胶囊右
- 用户信息: ID "21>" + V1普通会员badge (米色#F5F0E8背景, 棕色#8B7355文字) + 圆形头像
- 购物须知: "SHOPPING NOTICE" + "购 物 须 知" + 三栏须知图标
- 功能菜单: 4图标单行 (我的订单/收货人地址/我的优惠券/我的收藏)
- 退出登录: 箭头图标 + 左对齐
- 底部: "🍀 凡科商城提供技术支持" #CCCCCC
- API: getUserInfo() + 三态处理
</action>

**<acceptance_criteria>**
- [x] MINE-01: NavBar Home图标 + "会员中心"居中 + 胶囊
- [x] MINE-02: 用户信息 ID + badge
- [x] MINE-03: 圆形头像
- [x] MINE-04: 购物须知卡片
- [x] MINE-05: 功能菜单 4图标单行
- [x] MINE-06: 退出登录
- [x] MINE-07: 底部技术支持文字
- [x] MINE-08: API获取用户信息
</acceptance_criteria>

---

### Task 4.3: 分类页 (pages/category)

**<read_first>**
- `/home/admin/zhaowannuo-miniapp/pages/category/category.wxml`
- `/home/admin/zhaowannuo-miniapp/pages/category/category.wxss`
- `/home/admin/zhaowannuo-miniapp/pages/category/category.js`
</read_first>

**<objective>**
实现分类页：居中Logo + 搜索 + Tab + 双列
</objective>

**<action>**
页面已完整实现:
- NavBar: Home图标左 + 无标题 + 胶囊右
- 居中Logo: "ZHAOWANNUO®" + "官方旗舰店"
- 搜索框: 圆角 + "🔍 探索更多"
- 横向Tab: 滚动列表，选中项粗体 + 下划线
- Banner: "all products" + "所有产品" + "点击进入"按钮
- 双列网格: 同上新页样式
- 悬浮礼物按钮
- API: getCategoryData() + getProductsByCategory() + Tab切换重新请求
</action>

**<acceptance_criteria>**
- [x] CAT-01: NavBar Home图标 + 无标题 + 胶囊
- [x] CAT-02: 居中Logo "ZHAOWANNUO®" + "官方旗舰店"
- [x] CAT-03: 搜索框
- [x] CAT-04: 横向Tab标签 (选中粗体+下划线)
- [x] CAT-05: Tab下方banner
- [x] CAT-06: 双列商品网格
- [x] CAT-07: 悬浮礼物按钮
- [x] CAT-08: API获取 + Tab切换重新请求
</acceptance_criteria>

---

## Must Haves

上新页:
- [x] NEW-01~06 全部完成

会员中心:
- [x] MINE-01~08 全部完成

分类页:
- [x] CAT-01~08 全部完成

---

## Notes

- 上新页: api.getNewProducts()
- 会员中心: api.getUserInfo()
- 分类页: api.getCategoryData() + api.getProductsByCategory()

