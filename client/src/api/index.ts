/**
 * DO NOT change anything under ./autogen
 * Customize your API configs HERE
 */

import axios from "axios";
import {
  Configuration,
  AuthApi,
  ProductApi,
  StripeApi,
  UserApi,
} from "./autogen";
import { baseAPI } from "../features/constant";

export const urlGenerator = (rootPath: string) => {
  return `${baseAPI}${rootPath}`;
};

const configGenerator = (url: string) =>
  new Configuration({
    basePath: url,
    baseOptions: {
      // axios 配置在这儿
      withCredentials: true,
    },
  });

// url for different services
// IMPORTANT: remember to add new URL paths to proxy settings in craco.config.js!
// axios config for app size config apis
const url = urlGenerator("");
const appConfig = configGenerator(url);

// axios config for monkey test apis
export const axiosInstance = axios.create({});

axiosInstance.interceptors.request.use((config) => {
  let url = config.url!.replaceAll("+", "%2B");
  config.url = url;
  return config;
});

// global request error hint
axiosInstance.interceptors.response.use(
  function (response) {
    if (response.data.error_msg) {
      const origin = window.location.origin;
      const path = response.config.url?.split("?")[0] || "";
      const pathName = path.replace(origin, "");
      // message.error(`${pathName}: ${response.data.error_msg}`);
      return Promise.reject(response.data.error_msg);
    }
    return response;
  },
  function (error) {
    // if (error?.response?.status === 401) {
    //   if (!error.response?.config?.url.includes("api/v1/auth/login")) {
    //     authApiInterface
    //       .apiV1AuthLoginPost()
    //       .then((res) => {
    //         if (res?.status >= 200 && res?.status < 300) {
    //           window.location.reload();
    //           return Promise.resolve();
    //         }
    //       })
    //       .catch((err) => Promise.reject(err));
    //   }
    // }
    // if (error?.response?.status >= 500) {
    //   message.error("Network error");
    // } else if (error.response?.data?.message) {
    //   message.error(error.response.data?.message);
    // }
    return Promise.reject(error);
  }
);

/**
 * import these API instances in your components to use the API methods
 */
export const authApiInterface = new AuthApi(
  appConfig,
  undefined,
  axiosInstance
);

export const stripeApiInterface = new StripeApi(
  appConfig,
  undefined,
  axiosInstance
);

export const productApiInterface = new ProductApi(
  appConfig,
  undefined,
  axiosInstance
);

export const userApiInterface = new UserApi(
  appConfig,
  undefined,
  axiosInstance
);
