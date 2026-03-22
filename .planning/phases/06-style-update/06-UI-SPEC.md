---
status: approved
phase: 6
phase_name: 样式更新 - 一比一复刻设计规范到小程序
created: 2026-03-22
approved: 2026-03-22
design_system: none (微信小程序原生)
---

# UI 设计合同 - Phase 6

## 概述

**Phase:** 6 - 样式更新
**目标:** 一比一复刻 design-spec.md 中的设计规范到微信小程序
**项目类型:** 微信小程序 (WXML, WXSS, JS)
**设计规范来源:** `/home/admin/zhaowannuo-miniapp/design/design-spec.md`

---

## 设计令牌 (Design Tokens)

### 1. 颜色系统

在 `app.wxss` 中定义 CSS 变量：

```css
/* 主色系 */
--color-primary: #000000;           /* 主文字、按钮、选中态 */
--color-bg: #FFFFFF;                 /* 页面背景 */
--color-bg-secondary: #F5F5F5;      /* 次级背景（购物车空状态、我的页面） */

/* 文字颜色 */
--color-text-primary: #000000;      /* 标题、正文 */
--color-text-secondary: #999999;    /* 辅助文字、库存提示 */
--color-text-muted: #CCCCCC;        /* 占位文字、极弱提示 */

/* 边框和分割线 */
--color-border: #EEEEEE;             /* 卡片边框、分割线 */

/* 强调色 */
--color-accent-orange: #FF8C00;      /* 礼盒图标、悬浮按钮 */
--color-vip-bg: #FFF0E0;             /* 会员标签背景 */
--color-vip-text: #FF7B30;           /* 会员等级文字 */
--color-tag-border: #000000;         /* 售后标签边框 */
--color-red: #E53E3E;                /* 搜索图标 */
--color-dark-bg: #000000;            /* 横幅促销区背景 */
```

### 2. 字体系统（精简为4个）

| Token | px值 | rpx值 | 用途 |
|-------|------|-------|------|
| `--font-size-sm` | 12px | 24rpx | 标签、库存、底部说明 |
| `--font-size-base` | 14px | 28rpx | 正文、Tab文字、商品名称 |
| `--font-size-lg` | 18px | 36rpx | 价格、导航标题 |
| `--font-size-xl` | 22px | 44rpx | 品牌名、页面主标题 |

```css
--font-family: -apple-system, "PingFang SC", "Helvetica Neue", "Microsoft YaHei", sans-serif;
--font-weight-regular: 400;
--font-weight-bold: 600;
--line-height-body: 1.5;
--line-height-heading: 1.2;
```

### 3. 间距系统

| Token | px值 | rpx值 | 用途 |
|-------|------|-------|------|
| `--spacing-xs` | 4px | 8rpx | 标签间距 |
| `--spacing-sm` | 8px | 16rpx | 内部间距 |
| `--spacing-md` | 12px | 24rpx | 卡片内边距 |
| `--spacing-lg` | 16px | 32rpx | 页面左右边距 |
| `--spacing-xl` | 20px | 40rpx | 区块间距 |

### 4. 圆角系统

| Token | px值 | rpx值 | 用途 |
|-------|------|-------|------|
| `--radius-sm` | 4px | 8rpx | 小标签 |
| `--radius-md` | 8px | 16rpx | 搜索栏、按钮 |
| `--radius-lg` | 12px | 24rpx | 卡片、区块 |
| `--radius-xl` | 16px | 32rpx | 会员标签 |
| `--radius-full` | 50% | 50% | 圆形按钮、头像 |
| `--radius-pill` | 20-30px | 40-60rpx | 胶囊按钮 |

---

## 组件规范

### 1. 状态栏 (StatusBar)
- 高度：44px → 88rpx
- 背景色跟随页面（白/黑）

### 2. 导航栏 (NavBar)
- 高度：44px → 88rpx
- 左侧：首页图标 or 返回箭头 + 标题
- 右侧：⋯ 菜单按钮 + ⚪ 功能按钮（32×32px → 64rpx，圆角8px → 16rpx）

### 3. 底部Tab栏 (TabBar)
- 高度：83px → 166rpx（含安全区34rpx）
- 5个等宽选项：首页、上新、分类、购物袋、我的
- 选中态：黑色文字 + 图标填充
- 未选中：灰色文字 + 图标线性
- 顶部细线：1rpx #eee

```css
/* TabBar 安全区适配 */
padding-bottom: env(safe-area-inset-bottom);
```

### 4. 商品卡片 - 列表式 (ProductCardList)
- 布局：左图右文
- 圆角：12px → 24rpx
- 左图尺寸：120×150px → 240×300rpx
- 标签样式：白底 + 黑色1px边框 + 黑字，圆角4px → 8rpx，字号10px → 20rpx
- 价格：18px → 36rpx，加粗
- 加号按钮：32×32px → 64×64rpx，圆形，1.5px黑色边框 → 3rpx
- 缺货状态：按钮变灰，图片覆盖半透明标签
- 礼盒图标：橙色圆形36px → 72rpx，白色描边，绝对定位

### 5. 商品卡片 - 网格式 (ProductCardGrid)
- 两列布局，间距12px → 24rpx
- 圆角：10px → 20rpx，极浅灰色边框
- 商品图：160px高 → 320rpx，背景铺满
- 品牌名居中浅灰小字
- 底部：价格(左) + 深色圆形购物车按钮(右)

### 6. 黑色促销横幅 (PromoBanner)
- 背景：#000000，圆角0（全宽）
- 白色文字居中
- 高度：约40px → 80rpx

### 7. 分类Tab栏 (CategoryTabs)
- 可横滑
- 选中：黑色加粗 + 下划线
- 未选中：灰色常规
- 下划线高度：2rpx

---

## 页面结构规范

### 1. 首页 (Home)

```
┌─────────────────────┐  ← 状态栏 88rpx
├─────────────────────┤  ← 导航栏 88rpx
│  ZHAOWANNUO®       │  ← 品牌标识，44rpx，字号44rpx，加粗
├─────────────────────┤
│  探索全部 ⊕  |  2026 ▼│  ← 功能栏，32rpx
├─────────────────────┤
│  破价专区 · Special │  ← 黑色横幅，80rpx高
│  Offer 点击进入 ›  │
├─────────────────────┤
│  全宽大图1          │  ← 260px → 520rpx
├─────────────────────┤
│  全宽大图2          │  ← 240px → 480rpx
├─────────────────────┤
│  底部Tab栏          │  ← 166rpx（含安全区）
└─────────────────────┘
```

**关键样式:**
- 品牌名：字号44rpx，font-weight: 700
- 促销横幅：背景#000000，白色文字，字号28rpx
- 页面左右边距：32rpx

### 2. 破价专区 (Special Offer)

**商品卡片规范:**
- 卡片内边距：24rpx
- 图片与文字间距：24rpx
- 标签行间距：8rpx
- 价格区域上边距：16rpx

### 3. 购物袋 (Cart)

**空状态:**
- 背景色：#F5F5F5
- 插画区域：居中，灰色系
- 按钮：黑色胶囊按钮，圆角40rpx，字号28rpx

### 4. 上新 (New Arrivals)

**网格布局:**
- 2列网格
- 列间距：24rpx
- 行间距：24rpx
- 卡片圆角：20rpx
- 边框：1rpx #f0f0f0

### 5. 我的 (My Account)

**结构:**
- 顶部用户信息区：背景白色
- 购物须知卡片：背景#F5F5F5，内边距24rpx
- 功能区：4列图标，间距均匀
- 技术支持：底部居中，字号24rpx，灰色

### 6. 分类 (Categories)

**搜索栏:**
- 高度：64rpx
- 圆角：16rpx
- 背景：#F5F5F5
- 搜索图标：红色#E53E3E

---

## 小程序适配要点

### rpx 转换规则
- 设计稿 375px = 750rpx
- 所有尺寸需 ×2 转换为 rpx

### 安全区适配
```css
/* 底部Tab栏 */
padding-bottom: env(safe-area-inset-bottom);

/* 顶部状态栏 */
padding-top: env(safe-area-inset-top);
```

### 图片懒加载
```html
<image lazy-load="{{true}}" />
```

### 下拉刷新
```json
{
  "enablePullDownRefresh": true,
  "backgroundTextStyle": "dark"
}
```

---

## 页面路由

| 页面 | 路径 | 说明 |
|------|------|------|
| 首页 | pages/home/index | Home |
| 破价专区 | pages/special-offer/index | Special Offer |
| 上新 | pages/new-arrivals/index | New Arrivals |
| 分类 | pages/category/index | Categories |
| 购物车 | pages/cart/index | Shopping Bag |
| 我的 | pages/my/index | My Account |

---

## 文件更新清单

### 全局样式
- `app.wxss` - 添加所有 CSS 变量定义

### 页面样式（需更新）
| 页面 | 文件 | 更新内容 |
|------|------|----------|
| 首页 | pages/home/index.wxss | 品牌标识、促销横幅、间距 |
| 破价专区 | pages/special-offer/index.wxss | 商品卡片样式 |
| 购物车 | pages/cart/index.wxss | 空状态背景、按钮样式 |
| 上新 | pages/new-arrivals/index.wxss | 网格布局 |
| 我的 | pages/my/index.wxss | 卡片样式 |
| 分类 | pages/category/index.wxss | 搜索栏、Tab栏 |

---

## 验收标准

### 视觉验收
- [ ] 颜色值与 design-spec.md 完全一致
- [ ] 字号使用正确的 rpx 值
- [ ] 间距符合 8rpx 网格系统
- [ ] 圆角值正确转换
- [ ] 安全区正确适配

### 功能验收
- [ ] 下拉刷新正常工作
- [ ] TabBar 切换正常
- [ ] 页面滚动流畅
- [ ] 图片懒加载生效

### 代码质量
- [ ] CSS 变量统一定义在 app.wxss
- [ ] 无硬编码颜色值
- [ ] 单位统一使用 rpx
