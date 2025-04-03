const express = require('express');
const router = express.Router();
const pool = require('../../libs/db');

// MBTI dimension pairs
const DIMENSION_PAIRS = {
    'R/S': ['R', 'S'],
    'C/O': ['C', 'O'],
    'I/T': ['I', 'T'],
    'G/M': ['G', 'M']
};

// Calculate weighted score for a dimension
const calculateDimensionScore = (responses, dimension) => {
    // 해당 dimension에 대한 응답만 필터링
    const dimensionResponses = responses.filter(response => response.category === dimension);
    
    // 응답이 없는 경우 0 반환
    if (dimensionResponses.length === 0) {
        return 0;
    }

    // 가중치가 적용된 점수 합계 계산
    const weightedSum = dimensionResponses.reduce((sum, response) => {
        return sum + (response.score * response.weight);
    }, 0);

    // 가중치 합계 계산
    const totalWeight = dimensionResponses.reduce((sum, response) => {
        return sum + response.weight;
    }, 0);

    // 가중치 합계가 0인 경우 0 반환
    if (totalWeight === 0) {
        return 0;
    }

    // 최종 점수 계산 (가중치가 적용된 평균)
    return Math.round((weightedSum / totalWeight) * 100) - 100;
};

// Determine MBTI type based on dimension scores
const determineMBTIType = (dimensionScores) => {
    let mbtiType = '';

    // Compare scores for each dimension pair
    Object.entries(DIMENSION_PAIRS).forEach(([pair, [type1, type2]]) => {
        const score1 = dimensionScores[type1] || 0;
        const score2 = dimensionScores[type2] || 0;
        
        // Add the type with higher score to MBTI type
        mbtiType += score1 >= score2 ? type1 : type2;
    });

    return mbtiType;
};

router.get('/', (req, res) => {
    const userId = req.query.user_id;

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    const query = `
        SELECT r.user_id, r.question_id, r.score, q.category, q.weight
        FROM mbti_responses r
        JOIN mbti_questions q ON r.question_id = q.question_id
        WHERE r.user_id = ?
    `;

    pool.query(query, [userId], (error, results) => {
        if (error) {
            console.error('Database query error:', error);
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'No responses found for this user' });
        }

        // Calculate scores for each dimension
        const dimensionScores = {};
        Object.values(DIMENSION_PAIRS).flat().forEach(dimension => {
            dimensionScores[dimension] = calculateDimensionScore(results, dimension);
        });

        // Determine MBTI type
        const mbtiType = determineMBTIType(dimensionScores);

        const query = `
            SELECT * FROM mbti_results
            WHERE mbti_type = ?
        `;

        pool.query(query, [mbtiType], (error, results) => {
            if (error) {
                console.error('Database query error:', error);
                return res.status(500).json({ error: 'Database error' });
            }

            res.json({
                mbti_type: mbtiType,
                dimension_scores: dimensionScores,
                result: results
            });
        });
    });
});

module.exports = router;
