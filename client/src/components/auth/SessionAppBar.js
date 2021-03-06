import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { API_URL } from "../../utils/utils";
import useLocalStorage from "../../hooks/useLocalStorage";

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
}));

const SessionAppBar = () => {
  const classes = useStyles();
  const { push } = useHistory();
  const [user, setUser] = useLocalStorage("user", {});

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await fetch(`${API_URL}/users/logout`, {
      credentials: "include",
    });
    push({
      pathname: "/login",
    });
  };

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      className={classes.appBar}
    >
      <Toolbar className={classes.toolbar}>
        <Typography
          variant="h6"
          color="inherit"
          noWrap
          className={classes.toolbarTitle}
        >
          CV Maker
        </Typography>
        <nav>
          <Button
            color="textPrimary"
            onClick={(e) => {
              e.preventDefault();
              push("/dashboard");
            }}
            className={classes.link}
          >
            Dashboard
          </Button>
        </nav>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          {user.firstName} {user.lastName}
          <KeyboardArrowDownIcon />
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {/* <MenuItem onClick={handleClose}>Buy my a coffee</MenuItem> */}
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default SessionAppBar;
