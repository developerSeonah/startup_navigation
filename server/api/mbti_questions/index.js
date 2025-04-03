const express = require('express');
const router = express.Router();
const pool = require('../../libs/db');

router.get('/', (req, res) => {
    const query = 'SELECT * FROM mbti_questions';
  
    pool.query(query, (error, results) => {
      if (error) {
        console.error('Database query error:', error);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
    });
});

router.post('/', (req, res) => {
    const { user_id, question_id, score } = req.body;

    // 필수 필드 검증
    if (!user_id || !question_id || !score) {
        return res.status(400).json({ error: '필수 필드가 누락되었습니다.' });
    }

    // 배열 길이 검증
    if (question_id.length !== score.length) {
        return res.status(400).json({ error: '질문 ID와 점수의 개수가 일치하지 않습니다.' });
    }

    // 점수 범위 검증 (예: 1-5점)
    for (const s of score) {
        if (s < 1 || s > 5) {
            return res.status(400).json({ error: '점수는 1에서 5 사이여야 합니다.' });
        }
    }

    const values = question_id.map((qid, index) => [user_id, qid, score[index]]);
    const query = `
        INSERT INTO mbti_responses (user_id, question_id, score, created_at)
        VALUES ?
    `;

    pool.query(query, [values], (error, results) => {
        if (error) {
            console.error('데이터베이스 쿼리 오류:', error);
            return res.status(500).json({ error: '데이터베이스 오류가 발생했습니다.' });
        }
        
        res.status(201).json({
            message: '응답이 성공적으로 저장되었습니다.',
            affected_rows: results.affectedRows
        });
    });
});

module.exports = router;