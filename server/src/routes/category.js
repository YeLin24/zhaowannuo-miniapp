// 分类接口
const express = require('express');
const router = express.Router();
const db = require('../../config/db');

// GET /api/categories - 获取分类列表
router.get('/', async (req, res) => {
  try {
    const [categories] = await db.query(
      'SELECT id, name FROM categories ORDER BY sort_order'
    );

    // 添加默认"全部"选项
    const tabs = [
      { id: 0, name: '全部' },
      ...categories.map(c => ({ id: c.id, name: c.name }))
    ];

    res.json({
      code: 200,
      message: 'OK',
      data: { tabs }
    });
  } catch (error) {
    console.error('获取分类列表失败:', error);
    res.status(500).json({ code: 500, message: '获取分类列表失败', data: null });
  }
});

module.exports = router;
