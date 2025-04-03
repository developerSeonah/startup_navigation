import instance from "../axiosInstances/defaultInstance";

interface postMbtiTestResponseProps {
    user_id: string;
    question_id: number[];
    score: number[];
}

export const getMbtiTestQuestion = async () => {
    const response = await instance.get("/api/mbti_questions");
    return response.data;
};

export const postMbtiTestResponse = async (params: postMbtiTestResponseProps) => {
    const response = await instance.post("/api/mbti_questions", params);
    return response.data;
};
