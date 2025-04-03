const isProduction = process.env.NODE_ENV === 'production';
// const isProduction = true;

const config = {
  url: process.env.NEXT_PUBLIC_LOCAL_URL,
  gwUrl: process.env.NEXT_PUBLIC_GW_TEST_URL,
  apiV1Url: process.env.NEXT_PUBLIC_REAL_API_V1_URL,
  apiGwUrl:  process.env.NEXT_PUBLIC_REAL_GW_API_URL,
  loginUrl: 'https://api.biznavi.co.kr/api/v1/member/m_access',
  testerIdx: '7IQDL4OVK90XKYDB',
  emailReg:
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
  // eslint-disable-next-line no-useless-escape
  idReg: /^[^\uAC00-\uD7A3!@#$%^&*()_+=\[\]{};':"\\|,.<>\/?~`-]+$/,
  imgType: /^jpg$|^jpeg$|^gif$|^png$|^JPG$|^JPEG$|^PNG$|^GIF$/,
  imgTypeCheck: /(.*?)\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/,
  pdfTypeCheck: /(.*?)\.(pdf|PDF)$/,
  checkReg: /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*+-]).{8,16}$/,
  regxMsg: '8~16자 영문, 숫자, 특수문자를 하나 이상 포함해주세요.',
  introSessionKey: 'introViewIp',
  keyToken: process.env.NEXT_PUBLIC_KEY_TOKEN || '',
  gwKeyToken: process.env.NEXT_PUBLIC_GW_KEY_TOKEN || '',
  findbizFreeToken: process.env.NEXT_PUBLIC_FIND_BIZ_FREE_TOKEN,
};

export default config;
