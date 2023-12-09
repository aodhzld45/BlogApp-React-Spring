import { ResponseCode } from "types/enum";

export default interface ReponseDto {
    code : ResponseCode;
    message : string;
}