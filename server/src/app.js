// ZHAOWANNUO 后端 API 服务入口
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors({
  origin: '*', // 生产环境应限制具体域名
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 静态文件
app.use('/uploads', express.static('uploads'));

// 路由
const healthRouter = require('./routes/health');
const homeRouter = require('./routes/home');
const productRouter = require('./routes/product');
const cartRouter = require('./routes/cart');
const userRouter = require('./routes/user');
const categoryRouter = require('./routes/category');

app.use('/api/health', healthRouter);
app.use('/api/home', homeRouter);
app.use('/api/special-offers', productRouter.special);
app.use('/api/products', productRouter.products);
app.use('/api/categories', categoryRouter);
app.use('/api/cart', cartRouter);
app.use('/api/user', userRouter);

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    code: 500,
    message: err.message || 'Internal Server Error',
    data: null
  });
});

// 404 处理
app.use((req, res) => {
  res.status(404).json({
    code: 404,
    message: 'Not Found',
    data: null
  });
});

// 启动服务
app.listen(PORT, () => {
  console.log(`ZHAOWANNUO API 服务运行在 http://localhost:${PORT}`);
  console.log(`健康检查: http://localhost:${PORT}/api/health`);
});

module.exports = app;
