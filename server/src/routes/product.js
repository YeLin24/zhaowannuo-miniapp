// 商品接口
const express = require('express');
const router = express.Router();
const db = require('../../config/db');

// 破价专区 GET /api/special-offers
router.special = express.Router();
router.special.get('/', async (req, res) => {
  try {
    const [products] = await db.query(
      `SELECT id, name, code, price, original_price as originalPrice, image_url as imageUrl,
              stock, tags, is_sold_out as isSoldOut
       FROM products WHERE is_special = 1 ORDER BY created_at DESC`
    );

    const productList = products.map(p => ({
      ...p,
      tags: typeof p.tags === 'string' ? JSON.parse(p.tags) : p.tags,
      price: Number(p.price),
      originalPrice: Number(p.originalPrice)
    }));

    res.json({
      code: 200,
      message: 'OK',
      data: { productList }
    });
  } catch (error) {
    console.error('获取破价商品失败:', error);
    res.status(500).json({ code: 500, message: '获取破价商品失败', data: null });
  }
});

// 新品列表 GET /api/products/new
router.products = express.Router();
router.products.get('/new', async (req, res) => {
  try {
    const [products] = await db.query(
      `SELECT id, name, code, price, image_url as imageUrl, stock, tags, sales,
              is_sold_out as isSoldOut
       FROM products WHERE is_new = 1 ORDER BY created_at DESC`
    );

    const productList = products.map(p => ({
      ...p,
      tags: typeof p.tags === 'string' ? JSON.parse(p.tags) : p.tags,
      price: Number(p.price),
      sales: p.sales || 0
    }));

    res.json({
      code: 200,
      message: 'OK',
      data: { productList }
    });
  } catch (error) {
    console.error('获取新品失败:', error);
    res.status(500).json({ code: 500, message: '获取新品失败', data: null });
  }
});

// 分类商品 GET /api/products?categoryId=xxx
router.products.get('/', async (req, res) => {
  try {
    const { categoryId, page = 1, limit = 20 } = req.query;
    let sql = `SELECT id, name, code, price, image_url as imageUrl, stock, tags, sales,
                      is_sold_out as isSoldOut
               FROM products WHERE 1=1`;
    const params = [];

    if (categoryId) {
      sql += ' AND category_id = ?';
      params.push(categoryId);
    }

    sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), (parseInt(page) - 1) * parseInt(limit));

    const [products] = await db.query(sql, params);

    const productList = products.map(p => ({
      ...p,
      tags: typeof p.tags === 'string' ? JSON.parse(p.tags) : p.tags,
      price: Number(p.price),
      sales: p.sales || 0
    }));

    res.json({
      code: 200,
      message: 'OK',
      data: { productList }
    });
  } catch (error) {
    console.error('获取商品列表失败:', error);
    res.status(500).json({ code: 500, message: '获取商品列表失败', data: null });
  }
});

module.exports = router;
