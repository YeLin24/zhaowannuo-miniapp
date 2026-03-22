# Phase 2: 首页 - Plan

**Created:** 2026-03-22
**Phase:** 2
**Wave:** 1

---

## Plan Overview

**Objective:** 首页完整还原，数据从API加载

**Requirements Addressed:** IDX-01, IDX-02, IDX-03, IDX-04, IDX-05, IDX-06, IDX-07

---

## Wave 1: 首页实现

### Task 2.1: 配置 index.json

**<read_first>**
- `/home/admin/zhaowannuo-miniapp/pages/index/index.json`
</read_first>

**<objective>**
配置页面组件引用
</objective>

**<action>**
保持现有配置: navigationStyle: custom, usingComponents: {}
</action>

**<acceptance_criteria>**
- index.json 存在且配置正确
</acceptance_criteria>

---

### Task 2.2: 创建 index.wxml 结构

**<read_first>**
- `/home/admin/zhaowannuo-miniapp/pages/index/index.wxml`
</read_first>

**<objective>**
实现页面结构：NavBar + Logo + 次级导航 + Banner + 模特图 + 悬浮按钮
</objective>

**<action>**
页面结构已完整实现:
- NavBar: Home图标(左) + 胶囊按钮(右)
- Brand Logo: "ZHAOWANNUO®" 左对齐
- Sub Nav: "探索全部⊕" + "2026∨"
- Banner: 黑色背景，可点击跳转破价专区
- Model Section: 模特图 + "ZHAOWANNUO | 所有产品" 标签
- Float Gift: 橙色渐变悬浮按钮
</action>

**<acceptance_criteria>**
- 所有 UI 元素已实现
</acceptance_criteria>

---

### Task 2.3: 创建 index.wxss 样式

**<read_first>**
- `/home/admin/zhaowannuo-miniapp/pages/index/index.wxss`
</read_first>

**<objective>**
实现精确样式：颜色值、rpx单位
</objective>

**<action>**
样式已完整实现:
- NavBar: 白色背景，Home图标CSS绘制，胶囊按钮样式
- Logo: font-weight: 700, font-size: 44rpx
- Sub Nav: #333333, 两端对齐
- Banner: #000000 纯黑背景, 400rpx高度
- Model: 全宽, 渐变标签
- Float Gift: 橙色渐变 #FF6B35→#FF8C42, 96rpx直径, fixed定位右下角
</action>

**<acceptance_criteria>**
- 使用 rpx 单位，无 px
- 颜色值符合设计稿
</acceptance_criteria>

---

### Task 2.4: 创建 index.js 逻辑

**<read_first>**
- `/home/admin/zhaowannuo-miniapp/pages/index/index.js`
</read_first>

**<objective>**
实现 API 调用和三态处理
</objective>

**<action>**
逻辑已完整实现:
- onLoad: 获取状态栏高度
- onShow: 更新TabBar选中态
- loadData: 调用 api.getHomeData()，三态处理 (loading/error/empty)
- goSpecial: 跳转破价专区
- onGiftTap: 悬浮按钮点击跳转
</action>

**<acceptance_criteria>**
- 数据从 API 获取，不写死
- 三态处理正确
</acceptance_criteria>

---

## Must Haves

- [x] NavBar: Home图标左、胶囊右，无标题文字
- [x] Logo: "ZHAOWANNUO®" 左对齐，font-weight:700
- [x] 次级导航: "探索全部⊕" + "2026∨"
- [x] Banner: 黑色背景，可点击跳转
- [x] 模特图: 全宽，底部标签
- [x] 悬浮按钮: 橙色渐变，右下角
- [x] API: 获取数据 + 三态处理

---

## Notes

- 首页使用自定义 NavBar 替代系统导航栏
- 数据通过 services/api.js 的 getHomeData() 获取
- 悬浮按钮和Banner都可跳转到破价专区

