import React from "react";
import { useEffect, useState, useMemo } from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAuthenticateToken = async () => {
      const res = await authenticateToken();
      setIsLoggedIn(res);
      setIsLoading(false);
    };
    getAuthenticateToken();
  }, []);

  const authenticateToken = async () => {
    const res = await fetch("/authenticateToken", {
      credentials: "include",
    });
    return res.status === 401 ? false : true;
  };

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
