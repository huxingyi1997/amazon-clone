import jwt_decode from "jwt-decode";

import { DecodedJwt } from "../models/DecodedJwt.interface";
import { authApiInterface } from "../../../api";
import {
  ExistingUserDTO,
  LoginVo,
  NewUserDTO,
  UserDetail,
} from "../../../api/autogen";

const register = async (
  newUser: NewUserDTO
): Promise<UserDetail | undefined> => {
  const response = await authApiInterface.authControllerRegister(newUser);

  return response.data.data;
};

interface LoginData {
  jwt?: LoginVo;
  user?: UserDetail;
}

const login = async (user: ExistingUserDTO): Promise<LoginData> => {
  const response = await authApiInterface.authControllerLogin(user);

  const data = response.data.data;
  if (data) {
    localStorage.setItem("jwt", JSON.stringify(data));

    const decodedJwt: DecodedJwt = jwt_decode(data.token);
    localStorage.setItem("user", JSON.stringify(decodedJwt.user));
    return {
      jwt: data,
      user: decodedJwt.user,
    };
  }
  return { jwt: data, user: undefined };
};

const logout = (): void => {
  localStorage.removeItem("user");
  localStorage.removeItem("jwt");
};

const verifyJwt = async (jwt: string): Promise<boolean> => {
  const response = await authApiInterface.authControllerVerifyJwt({ jwt });
  const data = response.data.data;

  if (data) {
    const jwtExpirationMs = data.exp * 1000;
    return jwtExpirationMs > Date.now();
  }

  return false;
};

export const authService = {
  register,
  login,
  logout,
  verifyJwt,
};
