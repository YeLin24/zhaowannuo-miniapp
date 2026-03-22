# Phase 1: 项目骨架 + 全局基础 - Context

**Gathered:** 2026-03-22
**Status:** Ready for planning

<domain>
## Phase Boundary

创建微信小程序基础架构：app.json 配置、全局样式、API 服务封装、自定义 TabBar 和 NavBar 组件。5 个页面路由可切换，TabBar 和 NavBar 显示正确。

</domain>

<decisions>
## Implementation Decisions

### TabBar 样式
- **D-01:** 5 栏纯文字布局：首页、上新、分类、购物袋、我的
- **D-02:** 未选中颜色 `#999999`，选中颜色 `#000000` 黑色
- **D-03:** 白色背景 `#FFFFFF`，无边框
- **D-04:** 自定义 TabBar 组件替代系统 tabBar（精确控制样式）

### NavBar 样式
- **D-05:** 左侧 Home 图标（房子轮廓线稿）
- **D-06:** 右侧微信小程序标准胶囊按钮
- **D-07:** 白色背景，透明/白色内容区
- **D-08:** 自定义 NavBar 组件，各页面引用

### 全局样式
- **D-09:** 页面背景默认白色 `#FFFFFF`，购物车页面 `#F5F5F5`
- **D-10:** 字体使用系统默认
- **D-11:** 单位严格使用 `rpx`（750 基准），禁止 `px`
- **D-12:** CSS 变量定义主题色（预留）

### API 服务封装
- **D-13:** services/api.js 统一封装所有接口
- **D-14:** Promise 化接口调用
- **D-15:** 包含 loading/error/empty 三态处理
- **D-16:** 预留真实域名配置位置

### 悬浮礼物按钮
- **D-17:** 橙色渐变礼物图标，圆形
- **D-18:** 定位：页面右下角（fixed 定位）
- **D-19:** 出现在首页、破价专区、分类页

### Claude's Discretion
- 具体代码组织方式（文件命名、目录结构）
- 组件内部实现细节
- 动画效果（如 TabBar 切换过渡）

</decisions>

<canonical_refs>
## Canonical References

### 项目需求
- `.planning/PROJECT.md` — 项目愿景、技术栈、约束条件
- `.planning/REQUIREMENTS.md` — BASE-01~05 全局基础需求定义
- `.planning/ROADMAP.md` — Phase 1 任务列表和成功标准

### 设计参考
- `/home/admin/商城示例图片/` — 6 张设计稿截图，1:1 复刻视觉

</canonical_refs>

<code_context>
## Existing Code Insights

### 已有文件结构
- `app.json` — 已配置页面路由、窗口样式、tabBar
- `app.js` — 全局入口
- `app.wxss` — 全局样式
- `services/api.js` — API 服务封装
- `custom-tab-bar/` — 自定义 TabBar 组件目录
- `pages/index/` — 首页
- `pages/special/` — 破价专区
- `pages/cart/` — 购物车
- `pages/new/` — 新品
- `pages/mine/` — 我的
- `pages/category/` — 分类

### 集成点
- 各页面需要在 json 中配置 `usingComponents` 引用自定义 NavBar
- TabBar 需要在 app.json 中配置 `"custom": true`

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-phase-skeleton*
*Context gathered: 2026-03-22*
