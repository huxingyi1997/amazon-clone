import { FC, useEffect } from "react";
import { Navigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../hooks/redux/hooks";
import { verifyJwt } from "../authSlice";

interface PrivateRouteProps {
  page: JSX.Element;
}

const PrivateRoute: FC<PrivateRouteProps> = (props: PrivateRouteProps) => {
  const { page } = props;

  const dispatch = useAppDispatch();

  const { isSuccess, isAuthenticated, jwt } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (!jwt || !jwt.token) return;
    if (!isSuccess) dispatch(verifyJwt(jwt.token));
  }, [jwt?.token, isSuccess]);

  return isAuthenticated ? page : <Navigate replace to="/signin" />;
};

export default PrivateRoute;
