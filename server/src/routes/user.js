// 用户接口
const express = require('express');
const router = express.Router();
const db = require('../../config/db');

// 模拟用户ID (实际应从微信登录获取)
const MOCK_USER_ID = 1;

// GET /api/user/info - 获取用户信息
router.get('/info', async (req, res) => {
  try {
    const userId = req.query.userId || MOCK_USER_ID;

    const [users] = await db.query(
      'SELECT id, nickname, avatar, level, level_name FROM users WHERE id = ?',
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json({ code: 404, message: '用户不存在', data: null });
    }

    const user = users[0];
    res.json({
      code: 200,
      message: 'OK',
      data: {
        id: user.id,
        nickname: user.nickname,
        avatar: user.avatar,
        level: user.level,
        levelName: user.level_name
      }
    });
  } catch (error) {
    console.error('获取用户信息失败:', error);
    res.status(500).json({ code: 500, message: '获取用户信息失败', data: null });
  }
});

// POST /api/user/login - 微信登录
router.post('/login', async (req, res) => {
  try {
    const { code, userInfo } = req.body;

    // 实际项目中应该:
    // 1. 用code换取微信openid: https://api.weixin.qq.com/sns/jscode2session
    // 2. 根据openid查询或创建用户

    // 这里模拟登录逻辑
    const openid = `mock_openid_${code || 'default'}`;

    // 查找或创建用户
    let [users] = await db.query('SELECT id, nickname, avatar, level, level_name FROM users WHERE openid = ?', [openid]);

    if (users.length === 0) {
      // 创建新用户
      const nickname = userInfo?.nickName || '新用户';
      const avatar = userInfo?.avatarUrl || '';

      const result = await db.query(
        'INSERT INTO users (openid, nickname, avatar, level, level_name) VALUES (?, ?, ?, ?, ?)',
        [openid, nickname, avatar, 1, '普通会员']
      );

      users = [{
        id: result.insertId,
        nickname,
        avatar,
        level: 1,
        level_name: '普通会员'
      }];
    }

    const user = users[0];
    res.json({
      code: 200,
      message: '登录成功',
      data: {
        id: user.id,
        nickname: user.nickname,
        avatar: user.avatar,
        level: user.level,
        levelName: user.level_name,
        token: `mock_token_${user.id}` // 实际应生成JWT
      }
    });
  } catch (error) {
    console.error('登录失败:', error);
    res.status(500).json({ code: 500, message: '登录失败', data: null });
  }
});

module.exports = router;
