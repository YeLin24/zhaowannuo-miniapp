# ZHAOWANNUO 微信小程序商城

## What This Is

ZHAOWANNUO 品牌官方微信小程序，提供商品浏览、破价专区、购物车、新品上新、会员中心等核心电商功能。纯原生开发（WXML+WXSS+JS），无UI框架，像素级还原设计稿。

## Core Value

用户能流畅浏览商品、进入破价专区下单，视觉体验与设计稿完全一致。

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] 首页：左对齐Logo、探索全部/2026导航、黑色横幅banner、模特图、悬浮礼物按钮
- [ ] 破价专区：胶囊标题、模特banner、单列商品卡片（已抢光遮罩/库存/标签/加购）
- [ ] 购物车：空状态（灰底+插画+继续逛逛按钮），有数据时显示列表
- [ ] 上新页：折叠标题、产品分类banner、双列商品卡片（黑色购物车圆形按钮）
- [ ] 会员中心：用户信息+会员badge、购物须知卡片、单行4图标菜单、退出登录
- [ ] 分类页：居中Logo+"官方旗舰店"、搜索框、横向Tab标签、双列商品网格
- [ ] 自定义TabBar：5栏纯文字（首页/上新/分类/购物袋/我的）
- [ ] 自定义NavBar：Home图标、标题、胶囊按钮（...+圆圈）
- [ ] 全局：API服务封装（loading/error/empty三态）、rpx单位统一

### Out of Scope

- 订单支付流程 — 后端接口待接入
- 商品详情页 — 二期
- 登录/注册 — 二期

## Context

- 技术栈：微信小程序原生（WXML+WXSS+JS），基础库2.30.0+
- 单位：严格rpx（750基准），禁止px
- 无UI框架（Vant/WeUI/ColorUI一律禁止）
- 图片：CSS占位符（#F0F0F0背景+dashed边框+文字说明）
- API：封装在services/api.js，预留真实域名

## Constraints

- **Tech**: 纯原生微信小程序，不引入任何第三方UI库
- **Units**: 全部rpx，不得混用px
- **Images**: 占位符方案，保持正确aspect-ratio
- **Data**: 禁止写死静态数据，必须从API/data绑定

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| 自定义TabBar替代系统tabBar | 需精确控制样式 | — Pending |
| services/api.js统一封装 | 便于后端接口替换 | — Pending |
| 分类页独立于首页 | 图6实为分类页，非首页变体 | — Pending |

---
*Last updated: 2026-03-21 after initialization*
