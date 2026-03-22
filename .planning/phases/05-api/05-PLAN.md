# Phase 5: 后端API服务 - Plan

**Created:** 2026-03-22
**Phase:** 5
**Wave:** 1

---

## Plan Overview

**Objective:** 为微信小程序搭建后端 API 服务，实现数据接口和业务逻辑

**Requirements Addressed:** API-01 ~ API-08

**前端已有 API 需求:**
- getHomeData() - 首页数据
- getSpecialOffers() - 破价商品列表
- getCartList() - 购物车数据
- addToCart() - 加入购物车
- getNewProducts() - 新品列表
- getCategoryData() - 分类数据
- getProductsByCategory() - 分类商品
- getUserInfo() - 用户信息

---

## Wave 1: 后端基础架构

### Task 5.1: 技术栈选型和项目初始化

**<read_first>**
- 无现有后端代码（新建项目）
</read_first>

**<objective>**
选择后端技术栈并初始化项目
</objective>

**<action>**
选择技术栈并初始化:
- **推荐方案**: Node.js + Express + MySQL
- 创建项目目录 `server/` 或使用独立后端仓库
- 初始化 package.json，安装依赖: express, mysql2, cors, dotenv
- 创建基础项目结构
</action>

**<acceptance_criteria>**
- 技术栈确定并记录
- 项目结构创建完成
- 基础依赖安装完成
</acceptance_criteria>

---

### Task 5.2: 数据库设计和初始化

**<objective>**
设计并创建数据库表结构
</objective>

**<action>**
设计数据库:
- users 表: id, openid, nickname, avatar, level, level_name, created_at
- products 表: id, name, code, price, image_url, stock, tags, category_id, is_sold_out, created_at
- categories 表: id, name, sort_order
- cart 表: id, user_id, product_id, quantity, sku, created_at
- banners 表: id, image_url, link_type, link_value, sort_order
- 创建数据库初始化 SQL 脚本
- 导入基础测试数据
</action>

**<acceptance_criteria>**
- 数据库连接配置完成
- 所有表创建完成
- 基础数据导入
</acceptance_criteria>

---

### Task 5.3: 基础框架搭建

**<objective>**
搭建 Express 基础框架
</objective>

**<action>**
创建基础框架:
- server.js/app.js 主入口
- 配置 Express 中间件 (cors, json, static)
- 配置路由目录结构
- 添加错误处理中间件
- 创建 /api/health 健康检查接口
</action>

**<acceptance_criteria>**
- 服务可启动
- 健康检查接口返回正常
- CORS 配置正确（允许小程序域名）
</acceptance_criteria>

---

## Wave 2: API 接口实现

### Task 5.4: 首页和Banner接口

**<objective>**
实现首页相关 API
</objective>

**<action>**
实现接口:
- GET /api/home - 返回首页数据 (bannerList, categoryList, productList)
- GET /api/banners - Banner 列表
- 编写 Controller 和 Route
</action>

**<acceptance_criteria>**
- /api/home 返回正确数据结构
- 接口响应符合前端预期格式
</acceptance_criteria>

---

### Task 5.5: 商品和分类接口

**<objective>**
实现商品列表和分类 API
</objective>

**<action>**
实现接口:
- GET /api/special-offers - 破价商品列表
- GET /api/products/new - 新品列表
- GET /api/categories - 分类列表
- GET /api/products?categoryId=xxx - 按分类获取商品
- 编写对应的 Controller 和 Route
</action>

**<acceptance_criteria>**
- 所有商品接口返回正确数据
- 分类筛选功能正常
</acceptance_criteria>

---

### Task 5.6: 购物车接口

**<objective>**
实现购物车相关 API
</objective>

**<action>**
实现接口:
- GET /api/cart - 获取用户购物车列表
- POST /api/cart/add - 加入购物车
- POST /api/cart/update - 更新购物车商品数量
- DELETE /api/cart/:id - 删除购物车商品
- 编写对应的 Controller 和 Route
</action>

**<acceptance_criteria>**
- 购物车增删改查功能正常
- 接口返回正确格式
</acceptance_criteria>

---

### Task 5.7: 用户接口

**<objective>**
实现用户相关 API
</objective>

**<action>**
实现接口:
- GET /api/user/info - 获取用户信息
- POST /api/user/login - 微信登录 (小程序授权)
- 编写对应的 Controller 和 Route
</action>

**<acceptance_criteria>**
- 用户信息获取正常
- 微信登录流程完成
</acceptance_criteria>

---

## Wave 3: 部署配置

### Task 5.8: 部署和配置

**<objective>**
配置生产环境部署
</objective>

**<action>**
配置部署:
- 创建 .env 配置文件模板
- 配置 PM2 进程管理
- 创建部署脚本 (可选)
- 记录部署文档
</action>

**<acceptance_criteria>**
- .env.example 创建完成
- PM2 配置完成
- 服务可正常部署
</acceptance_criteria>

---

## Must Haves

- [ ] Task 5.1: 技术栈选型和项目初始化
- [ ] Task 5.2: 数据库设计和初始化
- [ ] Task 5.3: 基础框架搭建
- [ ] Task 5.4: 首页和Banner接口
- [ ] Task 5.5: 商品和分类接口
- [ ] Task 5.6: 购物车接口
- [ ] Task 5.7: 用户接口
- [ ] Task 5.8: 部署和配置

---

## 技术选型

| 组件 | 推荐 |
|------|------|
| 语言 | Node.js |
| 框架 | Express |
| 数据库 | MySQL |
| 进程管理 | PM2 |
| 部署 | 腾讯云/阿里云服务器 |

---

## API 接口清单

| Method | Endpoint | 说明 |
|--------|----------|------|
| GET | /api/health | 健康检查 |
| GET | /api/home | 首页数据 |
| GET | /api/special-offers | 破价商品 |
| GET | /api/products/new | 新品列表 |
| GET | /api/categories | 分类列表 |
| GET | /api/products | 分类商品 |
| GET | /api/cart | 购物车列表 |
| POST | /api/cart/add | 加入购物车 |
| GET | /api/user/info | 用户信息 |
| POST | /api/user/login | 微信登录 |

