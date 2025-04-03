export const logoutUrl = `/`;

export const isLogin = (): boolean => {
  if (typeof window === 'undefined') {
    return false; // 서버사이드에서는 로그인 상태를 판단할 수 없으므로 false 반환
  }

  const gwtoken = window.localStorage.getItem('gwtoken');
  const token = window.localStorage.getItem('token');

  return !!gwtoken && !!token && gwtoken.trim() !== '' && token.trim() !== '';
};

export const clearStorage = () => {
  window.localStorage.clear();
  window.location.href = logoutUrl;
};
