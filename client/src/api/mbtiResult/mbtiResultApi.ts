import instance from "../axiosInstances/defaultInstance"

export const getMbtiResult = async (userId: string) => {
    const response = await instance.get('/api/mbti_result', {
        params: {
            user_id: userId
        }
    });
    return response.data;
}



