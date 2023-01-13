import { FC } from "react";
import AuthLayout from "../features/auth/AuthLayout";
import SigninFormComponent from "../features/auth/SigninForm.component";

const SigninPage: FC = () => {
  return <AuthLayout><SigninFormComponent/></AuthLayout>;
};

export default SigninPage;
