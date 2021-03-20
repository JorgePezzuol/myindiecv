import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import SessionAppBar from "../../components/auth/SessionAppBar";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";
import DescriptionIcon from "@material-ui/icons/Description";
import CircularProgress from "@material-ui/core/CircularProgress";

import PersonalDetail from "../../components/cv/PersonalDetail";
import ProfessionalSummary from "../../components/cv/ProfessionalSummary";
import EmploymentHistory from "../../components/cv/EmploymentHistory";
import EducationHistory from "../../components/cv/EducationHistory";
import { fetchCvById, updateEntity, setDelay } from "../../services/CvService";

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

const Edit = () => {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const [employmentList, setEmploymentList] = useState([]);
  const [educationList, setEducationList] = useState([]);
  const [professionalSummary, setProfessionalSummary] = useState(null);
  const [personalDetails, setPersonalDetails] = useState({
    jobTitle: "",
    mail: "",
    firstName: "",
    lastName: "",
    _id: "",
    cv: "",
    phone: "",
  });

  const { cvId } = useParams();

  useEffect(() => {
    const getCvById = async () => {
      const data = await fetchCvById(cvId);
      setPersonalDetails(data.personalDetails);
      setProfessionalSummary(data.professionalSummary);
      setEmploymentList(data.employmentList);
      setEducationList(data.educationList);
    };
    getCvById();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setIsUpdating(true);
    const updatePersonalDetails = async (personalDetails) => {
      return updateEntity("personaldetails", personalDetails);
    };
    const timeoutId = setDelay(updatePersonalDetails, personalDetails);
    setIsUpdating(false);
    return () => clearTimeout(timeoutId);
  }, [personalDetails]);

  useEffect(() => {
    const updateProfessionalSummary = async (professionalSummary) => {
      return updateEntity("professionalsummary", professionalSummary);
    };
    const timeoutId = setDelay(updateProfessionalSummary, professionalSummary);
    return () => clearTimeout(timeoutId);
  }, [professionalSummary]);

  if (!isLoading) {
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
              <ProfessionalSummary
                professionalSummary={professionalSummary}
                setProfessionalSummary={setProfessionalSummary}
              />
              <EmploymentHistory
                employmentList={employmentList}
                setEmploymentList={setEmploymentList}
                setIsUpdating={setIsUpdating}
              />
              <EducationHistory
                educationList={educationList}
                setEducationList={setEducationList}
                setIsUpdating={setIsUpdating}
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
            <strong>Preview & Download</strong>
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

export default Edit;
