import React from "react";
import { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { API_URL } from "../../utils/utils";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#000",
  },
}));

const PrivateRoute = ({ component: Component, ...rest }) => {
  const classes = useStyles();
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
    const res = await fetch(`${API_URL}/authenticateToken`, {
      credentials: "include",
    });
    return res.status === 401 ? false : true;
  };

  return isLoading ? (
    <Backdrop className={classes.backdrop} open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
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
