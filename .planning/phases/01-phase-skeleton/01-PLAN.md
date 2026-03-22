# Phase 1: 项目骨架 + 全局基础 - Plan

**Created:** 2026-03-22
**Phase:** 1
**Wave:** 1

---

## Plan Overview

**Objective:** 创建微信小程序基础架构，包括 app.json 配置、全局样式、API 服务封装、自定义 TabBar 和 NavBar 组件。

**Requirements Addressed:** BASE-01, BASE-02, BASE-03, BASE-04, BASE-05

---

## Wave 1: 基础骨架

### Task 1.1: 配置 app.json

**<read_first>**
- `/home/admin/zhaowannuo-miniapp/app.json` - 查看现有配置
</read_first>

**<objective>**
配置页面路由、窗口样式、自定义 tabBar
</objective>

**<action>**
更新 `app.json`:
- 保持现有 5 个页面路由: `pages/index/index`, `pages/special/special`, `pages/cart/cart`, `pages/new/new`, `pages/mine/mine`, `pages/category/category`
- 窗口配置: navigationBarTitleText: "ZHAOWANNUO", backgroundColor: "#FFFFFF", enablePullDownRefresh: false
- 添加 `"custom": true` 启用自定义 tabBar
- 如有需要配置页面级 json 的 usingComponents
</action>

**<acceptance_criteria>**
- `app.json` 包含所有 6 个页面路由
- `app.json` 包含 `"custom": true` 配置
- 窗口样式配置正确
</acceptance_criteria>

---

### Task 1.2: 配置 app.js 全局初始化

**<read_first>**
- `/home/admin/zhaowannuo-miniapp/app.js` - 查看现有代码
</read_first>

**<objective>**
配置小程序全局生命周期和状态
</objective>

**<action>**
更新 `app.js`:
- 保留 `App({})` 全局实例
- 如有需要添加全局数据 `globalData: {}`
- 不需要额外的全局逻辑
</action>

**<acceptance_criteria>**
- `app.js` 包含有效的 `App({})` 定义
- 无语法错误
</acceptance_criteria>

---

### Task 1.3: 配置 app.wxss 全局样式

**<read_first>**
- `/home/admin/zhaowannuo-miniapp/app.wxss` - 查看现有样式
</read_first>

**<objective>**
设置全局样式重置、CSS 变量、主题色
</objective>

**<action>**
更新 `app.wxss`:
- 添加页面通用样式: `page { background-color: #FFFFFF; }`
- 购物车页面特殊背景: 后续在 `pages/cart/cart.wxss` 单独处理
- 使用 rpx 单位（750 基准），禁止使用 px
- 可选: 定义 CSS 变量预留主题色
</action>

**<acceptance_criteria>**
- `app.wxss` 存在且包含页面基础样式
- 使用 rpx 单位，无 px 单位
</acceptance_criteria>

---

### Task 1.4: 创建 services/api.js

**<read_first>**
- `/home/admin/zhaowannuo-miniapp/services/api.js` - 查看现有代码（如有）
</read_first>

**<objective>**
封装所有 API 接口，Promise 化，包含三态处理
</objective>

**<action>**
创建/更新 `services/api.js`:
- 封装以下接口方法:
  - `getHomeData()` - 首页数据
  - `getSpecialList()` - 破价商品列表
  - `getNewList()` - 新品列表
  - `getCategoryList(category)` - 分类商品
  - `getCartList()` - 购物车数据
  - `getUserInfo()` - 用户信息
  - `addToCart(productId)` - 加入购物车
- 每个方法返回 Promise
- 添加 loading/error/empty 三态处理结构
- 预留真实域名配置位置（当前使用占位符 URL）
</action>

**<acceptance_criteria>**
- `services/api.js` 文件存在
- 包含所有上述 API 方法
- 方法返回 Promise
- 包含三态处理结构（loading/error/empty）
</acceptance_criteria>

---

### Task 1.5: 创建自定义 TabBar 组件

**<read_first>**
- `/home/admin/zhaowannuo-miniapp/custom-tab-bar/` - 查看现有组件
- `/home/admin/zhaowannuo-miniapp/app.json` - 确认 custom: true
</read_first>

**<objective>**
创建 5 栏纯文字 TabBar，选中黑色，未选中 #999999
</objective>

**<action>**
更新/创建 `custom-tab-bar/` 组件:
- `index.js`: `Component({})`，接收 `selected` 属性
- `index.json`: `"component": true`
- `index.wxml`:
  ```
  <view class="tab-bar">
    <view class="tab-item" wx:for="{{list}}" wx:key="index" bindtap="switchTab" data-index="{{index}}">
      <text class="{{selected === index ? 'active' : ''}}">{{item.text}}</text>
    </view>
  </view>
  ```
- `index.wxss`:
  - 5 个 tab 等宽分布 (20% each)
  - 文字内容: 首页、上新、分类、购物袋、我的
  - 未选中颜色: #999999
  - 选中颜色: #000000 (黑色)
  - 背景: #FFFFFF，无边框
  - 字体大小、间距根据设计稿调整
</action>

**<acceptance_criteria>**
- `custom-tab-bar/index.js` 存在且为 Component
- `custom-tab-bar/index.wxml` 包含 5 个 tab 文字
- `custom-tab-bar/index.wxss` 定义选中/未选中颜色 (#000000 / #999999)
- TabBar 可切换，选中态正确
</acceptance_criteria>

---

### Task 1.6: 创建自定义 NavBar 组件

**<read_first>**
- `/home/admin/zhaowannuo-miniapp/components/` - 查看现有目录结构
</read_first>

**<objective>**
创建 NavBar 组件：左侧 Home 图标、右侧胶囊按钮、白色背景
</objective>

**<action>**
创建 `components/nav-bar/` 组件:
- `nav-bar.js`: `Component({})`，接收 `title` 属性（可选）
- `nav-bar.json`: `"component": true`
- `nav-bar.wxml`:
  ```
  <view class="nav-bar">
    <view class="left">
      <image class="home-icon" src="/images/home.png" />
    </view>
    <view class="title" wx:if="{{title}}">{{title}}</view>
    <view class="right">
      <!-- 胶囊按钮区域，使用小程序自带胶囊 -->
    </view>
  </view>
  ```
- `nav-bar.wxss`:
  - 整体高度: 小程序状态栏 + 44px
  - Home 图标: 房子轮廓线稿（可用 icon 或 svg）
  - 右侧胶囊按钮: 使用小程序 ` capsule` 位置
  - 背景: #FFFFFF
- 或者使用小程序自定义导航栏通用方案: 留出顶部安全区域
</action>

**<acceptance_criteria>**
- `components/nav-bar/` 目录存在
- 包含 js/json/wxml/wxss 四个文件
- NavBar 组件可被各页面引用
</acceptance_criteria>

---

### Task 1.7: 验证小程序可运行

**<read_first>**
- `/home/admin/zhaowannuo-miniapp/app.json`
- `/home/admin/zhaowannuo-miniapp/custom-tab-bar/index.js`
</read_first>

**<objective>**
验证小程序能在开发者工具中运行
</objective>

**<action>**
执行验证:
1. 检查 `app.json` 配置无错误
2. 检查所有组件文件完整
3. TabBar 5 个 tab 可切换
4. 尝试在微信开发者工具中预览（可选）
</action>

**<acceptance_criteria>**
- 无配置错误
- TabBar 5 个 tab 显示正确
- 页面可切换
</acceptance_criteria>

---

## Must Haves

- [ ] app.json 包含所有页面路由和自定义 tabBar 配置
- [ ] app.js 全局初始化正确
- [ ] app.wxss 包含全局样式（rpx 单位）
- [ ] services/api.js 封装所有 API 接口
- [ ] custom-tab-bar 组件：5 栏纯文字，选中黑色 #000000，未选中 #999999
- [ ] components/nav-bar 组件：Home 图标 + 胶囊按钮
- [ ] 小程序可运行，TabBar 和 NavBar 显示正确

---

## Notes

- Phase 1 是纯前端骨架，不涉及真实 API 调用
- API 服务使用占位符，等待后端接口就绪
- NavBar 组件各页面按需引入，标题文字由页面控制
- TabBar 选中态通过 `selected` 属性控制

