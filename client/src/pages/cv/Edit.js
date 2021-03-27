import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

import SessionAppBar from "../../components/auth/SessionAppBar";
import CvDataWrapper from "../../components/cv/CvDataWrapper";
import PreviewButton from "../../components/cv/PreviewButton";
import UpdateCvNameDialog from "../../components/cv/UpdateCvNameDialog";
import { fetchCvById } from "../../services/CvService";
import { API_URL } from "../../utils/utils";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  wrapper: {
    marginTop: 30,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#000",
  },
}));

const Edit = () => {
  const classes = useStyles();

  const { cvId } = useParams();
  const [cv, setCv] = useState(null);
  const [isUpdatingCvName, setIsUpdatingCvName] = useState(false);
  const [user, setUser] = useLocalStorage("user", {});

  useEffect(() => {
    const getCvById = async () => {
      const data = await fetchCvById(cvId);
      setCv(data);
    };
    getCvById();
  }, [cvId]);

  const handleChangeName = (name) => {
    setCv({
      ...cv,
      name: name,
    });
  };

  return cv !== null ? (
    <React.Fragment>
      <CssBaseline />
      <SessionAppBar />
      {isUpdatingCvName && (
        <UpdateCvNameDialog
          handleClose={setIsUpdatingCvName}
          handleUpdate={handleChangeName}
          cvId={cvId}
        />
      )}
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography
            variant="h4"
            align="center"
            color="textPrimary"
            gutterBottom
            style={{ cursor: "pointer" }}
            onClick={() => setIsUpdatingCvName(true)}
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
        <Grid container spacing={3}>
          <CvDataWrapper cv={cv} />
        </Grid>
        <PreviewButton
          cvId={cv._id}
          userName={user.firstName.concat(user.lastName).trim().toLowerCase()}
        />
      </Container>
    </React.Fragment>
  ) : (
    <Backdrop className={classes.backdrop} open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Edit;
