import axios from 'axios';
import instance from '../axiosInstances/defaultInstance';
import config from '@/config/apiConfig';
import { isLogin } from '@/utils/member';
export interface MemeberLoginParams {
    id: string; // 아이디
    password: string; // 비밀번호
    device_platform: string; // OS
    device_id: string; // device-token / firebase-token
}

export interface responseObj {
    result: boolean;
    msg: string;
    data: any | null;
}

export const login = async (params: MemeberLoginParams) => {
    let result : responseObj = {
        result: false,
        msg: '',
        data: null,
    };
    
    if(isLogin()){
        result = {
            result: true,
            msg: '이미 로그인 상태입니다.',
            data: null,
        }
    }else{
        if(!params.id || !params.password){
            const validate = new Error('아이디 또는 비밀번호를 입력해주세요.');
            throw validate;
        }

        try{
            const res = await axios.post(config.loginUrl, params);
            console.log("res.data", res.data);

            if(res.data.code === '00' ){
                // 로컬 스토리지 세팅
                window.localStorage.setItem('gwtoken', res.data.result.gwtoken);
                window.localStorage.setItem('token', res.data.result.token);
                window.localStorage.setItem('user_id', res.data.result.idx);
              
                result = {
                    result: true,
                    msg: '로그인 성공',
                    data: res.data.result,
                };

            }else{
                result = {
                    result: false,
                    msg: '가입하지 않은 아이디이거나 잘못된 비밀번호입니다.',
                    data: null,
                };
            }
        }catch(error){
            console.error('Failed to login:', error);
            throw error;
        }
    }

    return result;
}
