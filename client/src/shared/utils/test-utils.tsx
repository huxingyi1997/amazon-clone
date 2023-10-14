import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import { authReducer } from "../../features/auth/authSlice";
import { ReactElement, ReactNode } from "react";

interface WrapperProps {
  children?: ReactNode;
}

export const reducer = (
  ui: ReactElement,
  {
    preloadedState,
    store = configureStore({ reducer: { auth: authReducer }, preloadedState }),
    ...renderOptions
  }: any = {}
) => {
  const Wrapper = ({ children }: WrapperProps) => {
    return (
      <Provider store={store}>
        <Router>{children}</Router>
      </Provider>
    );
  };
  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

export * from "@testing-library/react";
