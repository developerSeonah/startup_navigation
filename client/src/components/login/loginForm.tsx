'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
/* eslint-disable-next-line no-unused-vars */
import { login } from '@/api/login/loginApi';

export interface MemeberLoginParams {
    id: string; // 아이디
    password: string; // 비밀번호
    device_platform: string; // OS
    device_id: string; // device-token / firebase-token
}

const LoginForm = () => {
  const router = useRouter();
  const [token, setToken] = useState(false);

  useEffect(() => {
    if (token) {
      fetchMemberInfo();
      router.push('/dashboard');
    }
  }, [token]);

  const [formData, setFormData] = useState<MemeberLoginParams>({
    id: '',
    password: '',
    device_platform: '', // api 에서 처리
    device_id: '', // api 에서 처리
  });
  const [errorMsg, setErrorMsg] = useState('');

  const fetchMemberInfo = async () => {
    const response = await fetch('/api/member', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        command: 'api',
        method: 'my.getBiznaviMainUserInfo',
        autoLogin: 'true',
      }),
    });

    const data = await response.json();
    console.log(data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.id === '') {
      setErrorMsg('아이디를 입력해주세요.');
      return;
    }

    if (formData.password === '') {
      setErrorMsg('비밀번호를 입력해주세요.');
      return;
    }

    try {
      const loginRes = await login(formData);
      console.log(loginRes.result);
      if (loginRes.result === true) {
        setToken(true);
      } else {
        setErrorMsg(loginRes.msg);
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    setErrorMsg('');
  }, [formData]);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-1/4 h-fit bg-gray-100 rounded-lg p-6 rounded-xl shadow-lg">
        <form className="w-full h-full" onSubmit={handleLogin}>
          <h2 className="text-2xl font-bold text-center mb-8">로그인</h2>
          <div className="flex items-center gap-2">
            <p className="w-1/4">아이디</p>
            <input
              type="text"
              id="id"
              placeholder="아이디"
              className="border border-gray-300 bg-white block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
              value={formData.id}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-2 mt-2">
            <p className="w-1/4">비밀번호</p>
            <input
              type="password"
              id="password"
              placeholder="비밀번호"
              className="border border-gray-300 bg-white block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          {errorMsg !== '' && (
            <p className="msg">
                {errorMsg}
            </p>
          )}
          <div className="flex justify-center mt-4">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
              로그인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
