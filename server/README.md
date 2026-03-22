# ZHAOWANNUO 后端 API 服务

## 快速开始

### 1. 安装依赖

```bash
cd server
npm install
```

### 2. 配置环境

```bash
cp .env.example .env
# 编辑 .env 填写数据库配置
```

### 3. 初始化数据库

```bash
# 登录MySQL
mysql -u root -p

# 执行初始化脚本
source config/init.sql
```

### 4. 启动服务

开发模式:
```bash
npm run dev
```

生产模式:
```bash
npm start
```

或使用 PM2:
```bash
pm2 start ecosystem.config.js --env production
```

## API 接口

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
| POST | /api/cart/update | 更新数量 |
| DELETE | /api/cart/:id | 删除商品 |
| GET | /api/user/info | 用户信息 |
| POST | /api/user/login | 微信登录 |

## 响应格式

```json
{
  "code": 200,
  "message": "OK",
  "data": {}
}
```

## 部署

### 本地部署
```bash
npm start
```

### 服务器部署
1. 上传代码到服务器
2. 安装依赖: `npm install --production`
3. 初始化数据库
4. 启动: `pm2 start ecosystem.config.js --env production`

### Nginx 配置 (可选)
```nginx
server {
  listen 80;
  server_name api.yourdomain.com;

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```

## 目录结构

```
server/
├── config/
│   ├── db.js          # 数据库连接
│   └── init.sql       # 数据库初始化
├── src/
│   ├── app.js         # 入口文件
│   └── routes/        # 路由
│       ├── health.js
│       ├── home.js
│       ├── product.js
│       ├── category.js
│       ├── cart.js
│       └── user.js
├── .env.example       # 环境配置模板
├── ecosystem.config.js # PM2配置
└── package.json
```
