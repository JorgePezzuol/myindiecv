import React from "react";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

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
import _ from "lodash";

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
  const location = useLocation();

  const [employmentIdToBeDeleted, setEmploymentIdToBeDeleted] = useState(0);
  const [hasDeletedEntry, setHasDeletedEntry] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  // @@@ FIX THIS => CASE WHEN THE DATABASE IS EMPTY !!!
  const [employmentHistory, setEmploymentHistory] = useState([]);
  const [personalDetails, setPersonalDetails] = useState({
    jobTitle: "",
    mail: "",
    firstName: "",
    lastName: "",
    _id: "",
    cv: "",
    phone: "",
  });
  const [professionalSummary, setProfessionalSummary] = useState(null);
  const API_URL = "http://localhost:5001";

  useEffect(() => {
    const getCvById = async () => {
      const data = await fetchCvById(location.state.cvId);
      setPersonalDetails(data.personalDetails);
      setProfessionalSummary(data.professionalSummary);
    };
    getCvById();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const updatePersonalDetails = async (personalDetails) => {
      setIsUpdating(true);
      const response = await fetch(
        `${API_URL}/personaldetails/${personalDetails._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(personalDetails),
        }
      );
      const data = await response.json();
      setIsUpdating(false);
      return data;
    };
    const timeoutId = setTimeout(
      () => updatePersonalDetails(personalDetails),
      2000
    );
    return () => clearTimeout(timeoutId);
  }, [personalDetails]);

  useEffect(() => {
    const updateProfessionalSummary = async (professionalSummary) => {
      setIsUpdating(true);
      const response = await fetch(
        `${API_URL}/professionalsummary/${professionalSummary._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(professionalSummary),
        }
      );
      const data = await response.json();
      setIsUpdating(false);
      return data;
    };
    const timeoutId = setTimeout(
      () => updateProfessionalSummary(professionalSummary),
      2000
    );
    return () => clearTimeout(timeoutId);
  }, [professionalSummary]);

  const fetchCvById = async (cvId) => {
    const response = await fetch(`${API_URL}/edit/cv/${cvId}`, {
      credentials: "include",
    });
    const data = await response.json();
    return data;
  };

  // fetch all the employement history and then we get the (count())
  // after that render employment experience according to count()
  // const deleteEmployment = (employmentId) => {
  //   setEmploymentList(
  //     employmentList.filter((employment) => employment.id !== employmentId)
  //   );
  //   setEmploymentIdToBeDeleted(0);
  //   setHasDeletedEntry(true);
  // };

  // const addEmployment = async () => {
  //   setEmploymentList([
  //     ...employmentList,
  //     {
  //       id: Math.floor(Math.random() * 10000) + 1,
  //       jobtitle: "asdassd",
  //       employer: "asdasd",
  //       startdate: "324324",
  //       enddate: "3434",
  //       city: "asdad",
  //       description: "asdad",
  //     },
  //   ]);
  // };

  if (!isLoading) {
    return (
      <React.Fragment>
        <CssBaseline />
        <SessionAppBar />
        {hasDeletedEntry && (
          <Snackbar setHasDeletedEntry={setHasDeletedEntry} />
        )}
        {employmentIdToBeDeleted > 0 && (
          <AlertDialogSlide
            title={"Delete Entry"}
            contentText={"Are you sure you want to delete this entry?"}
            //handleConfirm={() => deleteEmployment(employmentIdToBeDeleted)}
            handleConfirm={() => {}}
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
            <React.Fragment>
              <PersonalDetail
                personalDetails={personalDetails}
                setPersonalDetails={setPersonalDetails}
              />
              <Box mt={10} />
              <ProfessionalSummary
                professionalSummary={professionalSummary}
                setProfessionalSummary={setProfessionalSummary}
              />
              <Box mt={10} />
              <EmploymentHistory
                employmentList={[]}
                addEmployment={() => {}}
                setEmploymentIdToBeDeleted={() => {}}
              />
            </React.Fragment>
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
              {isUpdating ? (
                // CHECK THIS ERROR !!!
                <CircularProgress size={25} color="white" fontSize="small" />
              ) : (
                <DescriptionIcon />
              )}
            </Box>
          </Fab>
        </Container>
      </React.Fragment>
    );
  } else {
    return <p>Loading...</p>;
  }
};

export default EditCV;
