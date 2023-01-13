import { FC } from "react";
import AuthLayout from "../features/auth/AuthLayout";
import RegistrationFormComponent from "../features/auth/RegistrationForm.component";

const RegisterPage: FC = () => {
  return (
    <AuthLayout>
      <RegistrationFormComponent />
    </AuthLayout>
  );
};

export default RegisterPage;
