import React from "react";
import SignInSide from "../pages/SignIn";
import { Route, redirect } from "react-router-dom";

function PrivateRoute({ component: Component, ...rest }: any) {
  const isAuthenticated = localStorage.getItem("token");
  console.log(...rest)
  return (
    <Route
      {...rest}
      render={(props: any) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : 
        <SignInSide/>
        
      }
    />
  );
}

export default PrivateRoute;
