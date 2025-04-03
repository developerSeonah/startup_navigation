import axios from 'axios';

import config from '@/config/apiConfig';

const instanceGroupware = axios.create({
  baseURL: `${config.apiGwUrl}`,
  timeout: 6 * 1000 * 10 * 10 * 2, // 20분
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
  },
});

instanceGroupware.interceptors.request.use((api) => {
  if (typeof window !== 'undefined') {
    api.headers['x-token'] = localStorage.getItem(config.keyToken) || '';
    api.headers['gwtoken'] = localStorage.getItem(config.gwKeyToken) || '';
  }
  return api;
}, (error) => {
  return Promise.reject(error);
});

export default instanceGroupware;
