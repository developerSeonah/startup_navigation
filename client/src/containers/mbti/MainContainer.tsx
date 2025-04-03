"use client"

import { useEffect, useState } from 'react';
import React from 'react';
import { getMbtiResult } from '@/api/mbtiResult/mbtiResultApi';
import styles from './MainContainer.module.css';
import { useRouter } from 'next/navigation';

interface DimensionScore {
    R: number;
    S: number;
    C: number;
    O: number;
    I: number;
    T: number;
    G: number;
    M: number;
}

interface MbtiResult {
    mbti_type: string;
    mbti_name: string;
    description: string;
    created_at: string;
}

interface MbtiResponse {
    mbti_type: string;
    dimension_scores: DimensionScore;
    result: MbtiResult[];
}

const MainContainer = () => {
    const router = useRouter();
    const [mbtiResult, setMbtiResult] = useState<MbtiResponse | null>(null);

    useEffect(() => {
        const fetchMbtiResult = async () => {
            try {
                const userId = localStorage.getItem('user_id');
                if (!userId) {
                    console.error('User ID not found');
                    return;
                }
                const result = await getMbtiResult(userId);
                setMbtiResult(result);
            } catch (error) {
                console.error('Failed to fetch MBTI result:', error);
            }
        };
        fetchMbtiResult();
    }, []);

    if (!mbtiResult) {
        return <div className={styles.loading}>Loading...</div>;
    }

    const result = mbtiResult.result[0];

    return (
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.mbtiType}>{result.mbti_type}</h1>
                    <h2 className={styles.mbtiName}>{result.mbti_name}</h2>
                </div>

                <div className={styles.dimensionScores}>
                    <h3>Dimension Scores</h3>
                    <div className={styles.scoreGrid}>
                        {Object.entries(mbtiResult.dimension_scores).map(([dimension, score]) => (
                            <div key={dimension} className={styles.scoreItem}>
                                <span className={styles.dimension}>{dimension}</span>
                                <div className={styles.scoreBar}>
                                    <div 
                                        className={styles.scoreFill}
                                        style={{ width: `${(score + 100) / 2}%` }}
                                    />
                                </div>
                                <span className={styles.scoreValue}>{score}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.description}>
                    <h3>Description</h3>
                    <p>{result.description}</p>
                </div>

                <div className={styles.footer}>
                    <p>Test Date: {new Date(result.created_at).toLocaleDateString()}</p>
                </div>
            </div>
            <div className={styles.buttonContainer}>
                <button onClick={() => router.push('/mbtiTest')}
                    className={styles.backButton}
                >다시 테스트하기</button>
                <button onClick={() => router.push('/dashboard')}
                    className={styles.homeButton}
                >홈으로</button>
            </div>
        </>
    );
};

export default MainContainer;
