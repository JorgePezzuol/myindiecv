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
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import DescriptionIcon from "@material-ui/icons/Description";
import CircularProgress from "@material-ui/core/CircularProgress";

import PersonalDetail from "../../components/cv/PersonalDetail";
import ProfessionalSummary from "../../components/cv/ProfessionalSummary";
import EmploymentHistory from "../../components/cv/EmploymentHistory";
import AlertDialogSlide from "../../components/utils/AlertDialogSlide";
import Snackbar from "../../components/utils/SnackBar";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const EditCV = () => {
  const classes = useStyles();
  const [employmentList, setEmploymentList] = useState([]);
  const [employmentIdToBeDeleted, setEmploymentIdToBeDeleted] = useState(0);
  const [hasDeletedEntry, setHasDeletedEntry] = useState(false);

  // fetch all the employement history and then we get the (count())
  // after that render employment experience according to count()
  useEffect(() => {
    setEmploymentList([
      {
        id: 1,
        jobtitle: "asdassd",
        employer: "asdasd",
        startdate: "324324",
        enddate: "3434",
        city: "asdad",
        description: "asdad",
      },
      {
        id: 2,
        jobtitle: "asdassd",
        employer: "asdasd",
        startdate: "324324",
        enddate: "3434",
        city: "asdad",
        description: "asdad",
      },
      {
        id: 3,
        jobtitle: "asdassd",
        employer: "asdasd",
        startdate: "324324",
        enddate: "3434",
        city: "asdad",
        description: "asdad",
      },
    ]);
  }, []);

  const deleteEmployment = (employmentId) => {
    setEmploymentList(
      employmentList.filter((employment) => employment.id !== employmentId)
    );
    setEmploymentIdToBeDeleted(0);
    setHasDeletedEntry(true);
  };

  const addEmployment = async () => {
    setEmploymentList([
      ...employmentList,
      {
        id: Math.floor(Math.random() * 10000) + 1,
        jobtitle: "asdassd",
        employer: "asdasd",
        startdate: "324324",
        enddate: "3434",
        city: "asdad",
        description: "asdad",
      },
    ]);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <SessionAppBar />
      {hasDeletedEntry && <Snackbar setHasDeletedEntry={setHasDeletedEntry} />}
      {employmentIdToBeDeleted > 0 && (
        <AlertDialogSlide
          title={"Delete Entry"}
          contentText={"Are you sure you want to delete this entry?"}
          handleConfirm={() => deleteEmployment(employmentIdToBeDeleted)}
          handleClose={() => setEmploymentIdToBeDeleted(0)}
        />
      )}
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
      <Container maxWidth="md" style={{ marginTop: 30 }}>
        <Grid container spacing={2}>
          <PersonalDetail />
          <Box mt={10} />
          <ProfessionalSummary />
          <Box mt={10} />
          <EmploymentHistory
            employmentList={employmentList}
            addEmployment={addEmployment}
            setEmploymentIdToBeDeleted={setEmploymentIdToBeDeleted}
          />
        </Grid>
        <Fab
          style={{ textTransform: "none" }}
          variant="extended"
          size="large"
          color="primary"
          aria-label="add"
          className={classes.fab}
        >
          <b>Preview & Download</b>
          <Box ml={1}>
            <DescriptionIcon />
          </Box>
        </Fab>
      </Container>
    </React.Fragment>
  );
};

export default EditCV;
