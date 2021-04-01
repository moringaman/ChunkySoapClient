import React, {useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { useIsAuthenticated } from '../hooks'
// Helpers
import auth from "../helpers/auth";

function PrivateRoute({ component: Component, ...rest }) {

  const { isAuthenticated } = useIsAuthenticated()

  console.log("PROTECTED ", {...rest})
  return (
    <Route {...rest}
     render={(props) => 
      !isAuthenticated // remove ! to make private
       ? (
      <Component {...props} />
    ) : (
        <Redirect
          to={{
            pathname: "/authenticate",
            state: { from: props.location },
          }} />
      )} />);
}


export default PrivateRoute