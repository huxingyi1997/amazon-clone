import { UserDetail } from "../../../api/autogen";

export interface DecodedJwt {
  user: UserDetail;
  exp: number;
  iat: number;
}
