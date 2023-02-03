import axios from "axios";
import jwt_decode from "jwt-decode";

import { DisplayUser } from "../models/DisplayUser.interface";
import { NewUser } from "../models/NewUser";
import { LoginUser } from "../models/LoginUser.interface";
import { Jwt } from "../models/Jwt";
import { DecodedJwt } from "../models/DecodedJwt.interface";
import { baseAPI } from "../../constant";

const register = async (newUser: NewUser): Promise<DisplayUser | null> => {
  const url = `${baseAPI}/auth/register`;
  const response = await axios.post(url, newUser);

  return response.data;
};

interface LoginData {
  jwt: Jwt;
  user: DisplayUser | null;
}

const login = async (user: LoginUser): Promise<LoginData> => {
  const url = `${baseAPI}/auth/login`;
  const response = await axios.post(url, user);

  if (response.data) {
    localStorage.setItem("jwt", JSON.stringify(response.data));

    const decodedJwt: DecodedJwt = jwt_decode(response.data.token);
    localStorage.setItem("user", JSON.stringify(decodedJwt.user));
    return {
      jwt: response.data,
      user: decodedJwt.user,
    };
  }
  return { jwt: response.data, user: null };
};

const logout = (): void => {
  localStorage.removeItem("user");
  localStorage.removeItem("jwt");
};

const verifyJwt = async (jwt: string): Promise<boolean> => {
  const url = `${baseAPI}/auth/verify-jwt`;
  const response = await axios.post(url, { jwt });

  if (response.data) {
    const jwtExpirationMs = response.data.exp * 1000;
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
