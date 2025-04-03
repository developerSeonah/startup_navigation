"use client"

import React, { useState, useEffect } from 'react';
import { getMbtiTestQuestion, postMbtiTestResponse } from '@/api/mbtiTest/mbtiTestApi';
import styles from './MainContainer.module.css';

interface Question {
    question_id: number;
    question_text: string;
    category: string;
    weight: number;
}

const MainContainer = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<{ [key: number]: number }>({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                setIsLoading(true);
                const response = await getMbtiTestQuestion();
                console.log('API Response:', response);
                
                if (Array.isArray(response)) {
                    console.log('Questions Data:', response);
                    setQuestions(response);
                } else if (response && response.data) {
                    console.log('Questions Data:', response.data);
                    setQuestions(response.data);
                } else {
                    throw new Error('Invalid response format');
                }
                
                setError(null);
            } catch (err) {
                setError('문제를 불러오는 중 오류가 발생했습니다.');
                console.error('Error fetching questions:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchQuestions();
    }, []);

    const handleAnswer = (score: number) => {
        if (!questions[currentQuestionIndex]) return;
        
        setAnswers(prev => ({
            ...prev,
            [questions[currentQuestionIndex].question_id]: score
        }));
        
        if (currentQuestionIndex === questions.length - 1) {
            setIsCompleted(true);
        } else {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };

    const handleResult = async () => {
        const questionIds = Object.keys(answers).map(Number);
        const scores = Object.values(answers);
        const params = {
            user_id: Number(localStorage.getItem('user_id')),
            question_id: questionIds,
            score: scores
        }
        try {
            const response = await postMbtiTestResponse(params);
            console.log('API Response:', response);
        } catch (err) {
            console.error('Error posting answers:', err);
        }
    };

    if (isLoading) {
        return (
            <div className={styles.container}>
                <div className={styles.loading}>Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.container}>
                <div className={styles.error}>{error}</div>
            </div>
        );
    }

    if (!questions || questions.length === 0) {
        return (
            <div className={styles.container}>
                <div className={styles.error}>문제를 불러올 수 없습니다.</div>
            </div>
        );
    }

    if (isCompleted) {
        return (
            <div className={styles.contailner}>
                <div className={styles.completionContainer}>
                    <h2 className={styles.completionTitle}>모든 질문에 답변하셨습니다!</h2>
                    <button 
                        className={styles.completeButton}
                        onClick={handleResult}
                    >
                        결과 확인하기
                    </button>
                </div>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className={styles.container}>
            <div className={styles.progressBar}>
                <div 
                    className={styles.progress}
                    style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                />
            </div>
            
            <div className={styles.questionContainer}>
                <h2 className={styles.questionNumber}>
                    Question {currentQuestionIndex + 1} of {questions.length}
                </h2>
                <p className={styles.questionText}>{currentQuestion.question_text}</p>
                
                <div className={styles.answerOptions}>
                    <button 
                        className={styles.answerButton}
                        onClick={() => handleAnswer(1)}
                    >
                        전혀 그렇지 않다
                    </button>
                    <button 
                        className={styles.answerButton}
                        onClick={() => handleAnswer(2)}
                    >
                        그렇지 않다
                    </button>
                    <button 
                        className={styles.answerButton}
                        onClick={() => handleAnswer(3)}
                    >
                        보통이다
                    </button>
                    <button 
                        className={styles.answerButton}
                        onClick={() => handleAnswer(4)}
                    >
                        그렇다
                    </button>
                    <button 
                        className={styles.answerButton}
                        onClick={() => handleAnswer(5)}
                    >
                        매우 그렇다
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MainContainer;
