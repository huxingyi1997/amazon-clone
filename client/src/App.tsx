import React, { FC } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { CircularProgress } from "@mui/material";

import "./App.css";
import { store } from "./store";

const wrapComponent = (Component: React.LazyExoticComponent<any>): FC<any> => {
  return () => {
    return (
      <React.Suspense
        fallback={
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CircularProgress sx={{ alignSelf: "center" }} color="primary" />
          </div>
        }
      >
        <Component />
      </React.Suspense>
    );
  };
};
/* lazy loaded page components */
const HomePage = wrapComponent(React.lazy(() => import("./pages/Home.page")));
const CartPage = wrapComponent(React.lazy(() => import("./pages/Cart.page")));
const RegisterPage = wrapComponent(
  React.lazy(() => import("./pages/Register.page"))
);
const SigninPage = wrapComponent(
  React.lazy(() => import("./pages/Signin.page"))
);
const PrivateRoute = React.lazy(
  () => import("./features/auth/components/PrivateRoute")
);

const App: FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PrivateRoute page={<HomePage />} />} />
        <Route path="/cart" element={<PrivateRoute page={<CartPage />} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

type CypressWindow = Window &
  typeof globalThis & { Cypress: any; store: any; appReady: boolean };

const thisWindow = window as CypressWindow;

if (thisWindow.Cypress) {
  console.log("CYPRESS WINDOW");
  thisWindow.appReady = true;
  thisWindow.store = store;
}

export default App;
