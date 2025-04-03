const express = require('express');
const router = express.Router();

// GET 요청 시 index 뷰 렌더링
router.get('/', (req, res) => {
  res.render('index', { title: 'Node Express App' });
});

module.exports = router;
