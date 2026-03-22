// 首页接口
const express = require('express');
const router = express.Router();
const db = require('../../config/db');

// GET /api/home - 获取首页数据
router.get('/', async (req, res) => {
  try {
    // 获取Banners
    const [banners] = await db.query(
      'SELECT id, image_url, link_type, link_value FROM banners WHERE is_active = 1 ORDER BY sort_order'
    );

    // 获取分类
    const [categories] = await db.query(
      'SELECT id, name FROM categories ORDER BY sort_order'
    );

    // 获取首页商品(破价商品+新品)
    const [products] = await db.query(
      'SELECT id, name, code, price, original_price as originalPrice, image_url as imageUrl, stock, tags, is_sold_out as isSoldOut FROM products WHERE is_special = 1 OR is_new = 1 ORDER BY created_at DESC LIMIT 20'
    );

    // 处理tags JSON字段
    const productList = products.map(p => ({
      ...p,
      tags: typeof p.tags === 'string' ? JSON.parse(p.tags) : p.tags,
      price: Number(p.price),
      originalPrice: Number(p.originalPrice)
    }));

    res.json({
      code: 200,
      message: 'OK',
      data: {
        bannerList: banners.map(b => ({
          id: b.id,
          imageUrl: b.image_url,
          linkType: b.link_type,
          linkValue: b.link_value
        })),
        categoryList: categories.map(c => ({
          id: c.id,
          name: c.name
        })),
        productList
      }
    });
  } catch (error) {
    console.error('获取首页数据失败:', error);
    res.status(500).json({
      code: 500,
      message: '获取首页数据失败',
      data: null
    });
  }
});

module.exports = router;
