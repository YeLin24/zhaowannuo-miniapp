// 购物车接口
const express = require('express');
const router = express.Router();
const db = require('../../config/db');

// 模拟用户ID (实际应从微信登录获取)
const MOCK_USER_ID = 1;

// GET /api/cart - 获取购物车列表
router.get('/', async (req, res) => {
  try {
    const userId = req.query.userId || MOCK_USER_ID;

    const [items] = await db.query(
      `SELECT c.id, c.quantity, c.sku,
              p.id as productId, p.name, p.price, p.image_url as imageUrl, p.stock
       FROM cart c
       JOIN products p ON c.product_id = p.id
       WHERE c.user_id = ?`,
      [userId]
    );

    const cartList = items.map(item => ({
      id: item.id,
      productId: item.productId,
      name: item.name,
      price: Number(item.price),
      imageUrl: item.imageUrl,
      quantity: item.quantity,
      sku: item.sku,
      stock: item.stock
    }));

    res.json({
      code: 200,
      message: 'OK',
      data: { cartList }
    });
  } catch (error) {
    console.error('获取购物车失败:', error);
    res.status(500).json({ code: 500, message: '获取购物车失败', data: null });
  }
});

// POST /api/cart/add - 加入购物车
router.post('/add', async (req, res) => {
  try {
    const { productId, quantity = 1, sku = '' } = req.body;
    const userId = req.body.userId || MOCK_USER_ID;

    // 检查商品是否存在
    const [products] = await db.query('SELECT id, stock FROM products WHERE id = ?', [productId]);
    if (products.length === 0) {
      return res.status(400).json({ code: 400, message: '商品不存在', data: null });
    }

    // 检查购物车是否已有该商品
    const [existing] = await db.query(
      'SELECT id, quantity FROM cart WHERE user_id = ? AND product_id = ? AND sku = ?',
      [userId, productId, sku]
    );

    if (existing.length > 0) {
      // 更新数量
      await db.query(
        'UPDATE cart SET quantity = quantity + ? WHERE id = ?',
        [quantity, existing[0].id]
      );
    } else {
      // 新增购物车项
      await db.query(
        'INSERT INTO cart (user_id, product_id, quantity, sku) VALUES (?, ?, ?, ?)',
        [userId, productId, quantity, sku]
      );
    }

    res.json({
      code: 200,
      message: '加入购物车成功',
      data: null
    });
  } catch (error) {
    console.error('加入购物车失败:', error);
    res.status(500).json({ code: 500, message: '加入购物车失败', data: null });
  }
});

// POST /api/cart/update - 更新购物车商品数量
router.post('/update', async (req, res) => {
  try {
    const { cartId, quantity } = req.body;

    if (quantity <= 0) {
      // 数量为0则删除
      await db.query('DELETE FROM cart WHERE id = ?', [cartId]);
    } else {
      await db.query('UPDATE cart SET quantity = ? WHERE id = ?', [quantity, cartId]);
    }

    res.json({
      code: 200,
      message: '更新成功',
      data: null
    });
  } catch (error) {
    console.error('更新购物车失败:', error);
    res.status(500).json({ code: 500, message: '更新购物车失败', data: null });
  }
});

// DELETE /api/cart/:id - 删除购物车商品
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM cart WHERE id = ?', [id]);

    res.json({
      code: 200,
      message: '删除成功',
      data: null
    });
  } catch (error) {
    console.error('删除购物车商品失败:', error);
    res.status(500).json({ code: 500, message: '删除购物车商品失败', data: null });
  }
});

module.exports = router;
