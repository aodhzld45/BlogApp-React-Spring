export default interface SignUpRequestDTO {
    // 회원가입 관련 유저 필드 정의
    email : string;
    password : string;
    nickname : string;
    telNumber : string;
    address : string;
    addressDetail : string;
    agreedPersonal : boolean;
}