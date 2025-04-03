"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
    
const MainComponent = ({ mbtiResult }: { mbtiResult: any }) => {
    const router = useRouter();

    console.log(mbtiResult);
    
    return (
        <div className="w-full h-screen grid grid-cols-4 gap-6 p-6 bg-gray-50">  
            <div className="col-span-1">
                <div className="w-full h-full bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">나의 정보</h2>
                </div>
            </div>
            <div className="col-span-1">
                <div className="w-full h-full bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">MBTI 테스트 하러가기</h2>
                    <div className="w-full h-full flex justify-center items-center">
                        <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg cursor-pointer font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-md"
                            onClick={() => {
                                router.push('/mbtiTest');
                            }}
                        >MBTI 테스트 하러가기</button>
                    </div>
                </div>
            </div>
            <div className="col-span-1">
                <div className="w-full h-full bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                    <h2 className="text-2xl font-bold text-center mb-8 text-indigo-800">MBTI 성향</h2>
                    <div className="w-full flex flex-col justify-center items-center space-y-4">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg">
                            <p className="text-3xl font-extrabold text-white">{mbtiResult.mbti_type}</p>
                        </div>
                        <div className="text-center space-y-2">
                            <p className="text-xl font-semibold text-indigo-700">"{mbtiResult.result[0].mbti_name}"</p>
                            <p className="text-sm text-gray-600 leading-relaxed">{mbtiResult.result[0].description}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-span-1">
                <div className="w-full h-full bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">맞춤 창업 업종</h2>
                </div>
            </div>
            <div className="col-span-1">
                <div className="w-full h-full bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">사업 유형 추천</h2>
                </div>
            </div>
            <div className="col-span-3">
                <div className="w-full h-full bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">맞춤 창업 TO DO LIST</h2>
                </div>
            </div>
        </div>
    );
};

export default MainComponent;
