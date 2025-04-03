import axios from 'axios';

import config from '@/config/apiConfig';


const instance = axios.create({
  baseURL: config.url || 'http://localhost:3000',  // 기본값 추가
  timeout: 6 * 1000 * 10 * 10 * 2, // 20분
});

instance.interceptors.request.use((api) => {
  if (typeof window !== 'undefined') {
    api.headers['x-token'] = localStorage.getItem(config.keyToken) || '';
    api.headers['gwtoken'] = localStorage.getItem(config.gwKeyToken) || '';
  }
  return api;
}, (error) => {
  return Promise.reject(error);
});

export default instance;
