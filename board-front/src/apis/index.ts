import axios from "axios";
import { SignInRequestDTO, SignUpRequestDTO } from "./request/auth";
import { SignInReqonseDTO } from "./response/auth";
import { ResponseDto } from "./response";

const DOMAIN = 'http://localhost:4000';

const API_DOMAIN = `${DOMAIN}/api/v1/`;

const SIGN_IN_URL = () => `${DOMAIN}/api/v1/auth/sign-in`;
const SIGN_UP_URL = () => `${DOMAIN}/api/v1/auth/sign-up`;

// 비동기 async
export const signInRequest = async (requestBody : SignInRequestDTO)  => {
    // await 응답이 올 때까지 기다림
    const reuslt = await axios.post(SIGN_IN_URL(), requestBody)
        .then(response => {
            const responseBody: SignInReqonseDTO = response.data;
            return responseBody;
        })
        .catch(error => {
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return reuslt;
}

export const signUpRequest = async (requestBody : SignUpRequestDTO)  => {

}