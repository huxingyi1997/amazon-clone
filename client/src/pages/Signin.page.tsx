import { FC } from "react";

import AuthLayout from "../features/auth/components/AuthLayout";
import SigninFormComponent from "../features/auth/components/SigninForm.component";

const SigninPage: FC = () => {
  return (
    <AuthLayout>
      <SigninFormComponent />
    </AuthLayout>
  );
};

export default SigninPage;
