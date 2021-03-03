import React, {useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { useIsAuthenticated } from '../hooks'
// Helpers
import auth from "../helpers/auth";

function PrivateRoute({ component: Component, ...rest }) {

  // const [ isAuthenticated, setIsAuthenticated ] = useState(false)
  // useEffect(() => {
  //     const authenticated = auth.getToken() !== null
  //     setIsAuthenticated(authenticated)
  //     console.log("Athenticated ", authenticated)
  // }, [])

  const { isAuthenticated } = useIsAuthenticated()

  console.log("PROTECTED ", {...rest})
  return (
    <Route {...rest}
     render={(props) => 
      isAuthenticated
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