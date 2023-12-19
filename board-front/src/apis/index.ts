import axios from "axios";
import { SignInRequestDTO, SignUpRequestDTO } from "./request/auth";
import { SignInReqonseDTO, SignUpReqonseDTO } from "./response/auth";
import { ResponseDto } from "./response";

const DOMAIN = 'http://localhost:4000';

const API_DOMAIN = `${DOMAIN}/api/v1/`;

const SIGN_IN_URL = () => `${DOMAIN}/api/v1/auth/sign-in`;
const SIGN_UP_URL = () => `${DOMAIN}/api/v1/auth/sign-up`;

// 비동기 async
// 로그인 API 
export const signInRequest = async (requestBody : SignInRequestDTO)  => {
    // await 응답이 올 때까지 기다림
    const result = await axios.post(SIGN_IN_URL(), requestBody)
        .then(response => {
            const responseBody: SignInReqonseDTO = response.data;
            return responseBody;
        })
        .catch(error => {
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}

// 회원가입 API
export const signUpRequest = async (requestBody : SignUpRequestDTO)  => {
    const result = await axios.post(SIGN_UP_URL(), requestBody)
        .then(response => {
            const responseBody: SignUpReqonseDTO = response.data;
            return responseBody;
        })
        .catch(error => {
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
        return result;

}