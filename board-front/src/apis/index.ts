import { SignInRequestDTO, SignUpRequestDTO } from "./request/auth";

const DOMAIN = 'http://localhost:4000';

const API_DOMAIN = `${DOMAIN}/api/v1/`;

const SIGN_IN_URL = () => `${DOMAIN}/api/v1/sign-in`;
const SIGN_UP_URL = () => `${DOMAIN}/api/v1/sign-up`;

export const signInRequest = (requestBody : SignInRequestDTO)  => {

}

export const signUpRequest = (requestBody : SignUpRequestDTO)  => {

}