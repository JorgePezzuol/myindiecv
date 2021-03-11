import React from "react";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import SessionAppBar from "../../components/auth/SessionAppBar";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroBody: {
    padding: theme.spacing(8, 0, 6),
  },
}));

const EditCV = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <SessionAppBar />
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography
            variant="h4"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Untitled
          </Typography>
          <Typography
            variant="p"
            align="center"
            color="textSecondary"
            paragraph
          >
            English
          </Typography>
        </Container>
      </div>
      <Divider />
      <Container style={{ marginTop: 30 }}>
        <form noValidate>
          <Typography variant="h5" color="textPrimary">
            Personal Details
          </Typography>
          <br />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="filled-uncontrolled"
                label="Job Title"
                variant="filled"
                placeholder="e.g. Web Developer"
                style={{ marginBottom: 20 }}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="filled-uncontrolled"
                label="Email"
                variant="filled"
                style={{ marginBottom: 20 }}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="filled-uncontrolled"
                label="First Name"
                variant="filled"
                style={{ marginBottom: 20 }}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="filled-uncontrolled"
                label="Last Name"
                variant="filled"
                style={{ marginBottom: 20 }}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="filled-uncontrolled"
                label="Phone"
                variant="filled"
                size="small"
                fullWidth
              />
            </Grid>
          </Grid>
        </form>
      </Container>
    </React.Fragment>
  );
};

export default EditCV;
