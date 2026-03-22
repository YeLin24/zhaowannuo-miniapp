// 健康检查接口
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    code: 200,
    message: 'OK',
    data: {
      status: 'healthy',
      timestamp: new Date().toISOString()
    }
  });
});

module.exports = router;
