import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

import SessionAppBar from "../../components/auth/SessionAppBar";
import CvDataWrapper from "../../components/cv/CvDataWrapper";
import PreviewButton from "../../components/cv/PreviewButton";
import { fetchCvById } from "../../services/CvService";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  wrapper: {
    marginTop: 30,
  },
}));

const Edit = () => {
  const classes = useStyles();
  const { cvId } = useParams();

  const [cv, setCv] = useState(null);

  useEffect(() => {
    const getCvById = async () => {
      const data = await fetchCvById(cvId);
      setCv(data);
    };
    getCvById();
  }, [cvId]);

  return cv !== null ? (
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
            {cv.name}
          </Typography>
          <Typography
            variant="subtitle2"
            align="center"
            color="textSecondary"
            paragraph
          >
            English
          </Typography>
        </Container>
      </div>
      <Divider />
      <Container maxWidth="md" className={classes.wrapper}>
        <Grid container spacing={4}>
          <CvDataWrapper cv={cv} />
        </Grid>
        <PreviewButton />
      </Container>
    </React.Fragment>
  ) : (
    <p>Loading...</p>
  );
};

export default Edit;
