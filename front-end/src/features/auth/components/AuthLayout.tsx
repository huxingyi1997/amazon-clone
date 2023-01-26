import { FC, ReactNode } from "react";
import { Grid } from "@mui/material";

import AmazonLogo from "../../../assets/amazon-logo.png";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = (props: AuthLayoutProps) => {
  const { children } = props;

  return (
    <Grid
      sx={{ p: 2 }}
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
    >
      <img src={AmazonLogo} alt="amazon-logo" height="40px" />
      <main>{children}</main>
    </Grid>
  );
};

export default AuthLayout;
