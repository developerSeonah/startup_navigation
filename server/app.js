const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

// 1) MySQL 연결 설정
// 실제 환경에 맞춰서 host, port, user, password, database 등을 수정하세요.
const dbConfig = {
  host: 'localhost',
  port: 3307,         // MySQL Workbench에서 확인한 포트
  user: 'root',
  password: '1234',
  database: 'startup_navigation_db', // 사용하고자 하는 데이터베이스명
};

// 2) 커넥션 풀 생성 (권장)
const pool = mysql.createPool(dbConfig);

app.use(cors());
app.use(express.json()); // Add JSON body parser middleware

const mbtiQuestionRouter = require('./api/mbti_questions/index');
app.use('/api/mbti_questions', mbtiQuestionRouter);

// 3) Express 라우트 예시
app.get('/', (req, res) => {
  // 간단한 쿼리 실행 예시
  pool.query('SELECT NOW() AS currentTime', (error, results) => {
    if (error) {
      console.error('Database query error:', error);
      return res.status(500).send('Database error');
    }
    // 쿼리 결과 전송
    res.send(`Current time: ${results[0].currentTime}`);
  });
});

// 4) 서버 실행
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
