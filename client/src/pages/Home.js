import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import cvExImage from "../assets/cv-example.png";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/daily?resume)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontWeight: 800,
  },
}));

export default function Home() {
  const classes = useStyles();
  const { push } = useHistory();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography className={classes.title} align="center" variant="h3">
            Create your CV for free
          </Typography>
          <br />
          <Typography variant="body2" color="textSecondary" align="center">
            In just a few clicks, increase your chances of finding a job. Create
            and download your CV immediately.
          </Typography>
          <br />
          <Button
            size="large"
            type="button"
            variant="contained"
            color="primary"
            onClick={() =>
              push({
                pathname: "/dashboard",
              })
            }
          >
            Create my Cv
          </Button>
          <img src={cvExImage} />
        </div>
      </Grid>
    </Grid>
  );
}
