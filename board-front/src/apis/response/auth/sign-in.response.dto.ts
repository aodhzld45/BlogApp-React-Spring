import ReponseDto from "../response-dto";

export default interface SignInReqonseDTO extends ReponseDto {
    token : string;
    expirationTime : number;

}
