'use client';

import MainComponent from '@/components/dashboard/MainComponent';
import React,{ useEffect, useState } from 'react';
import { getMbtiResult } from '@/api/mbtiResult/mbtiResultApi';

export default function Dashboard() {
    const [mbtiResult, setMbtiResult] = useState(null);

    useEffect(() => {
        getMbtiResult(localStorage.getItem('user_id') || '').then((result) => {
            setMbtiResult(result);
        });
    }, []);

    return <MainComponent mbtiResult={mbtiResult} />;
}
