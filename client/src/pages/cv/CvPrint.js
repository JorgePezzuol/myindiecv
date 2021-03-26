import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import "../../assets/cvpreview.css";
import { fetchCvById } from "../../services/CvService";
import SocialLinksPreview from "../../components/cv/preview/SocialLinksPreview";
import PersonalDetailsPreview from "../../components/cv/preview/PersonalDetailsPreview";
import EmploymentHistoryPreview from "../../components/cv/preview/EmploymentHistoryPreview";
import EducationHistoryPreview from "../../components/cv/preview/EducationHistoryPreview";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 40,
    float: "left",
  },
  bold: {
    fontWeight: 600,
  },
  sectionTitle: {
    fontWeight: 600,
    letterSpacing: "2px",
  },
  subTitle: {
    fontSize: "0.8rem",
    fontWeight: 600,
  },
  normalText: {
    fontSize: "0.8rem",
    fontWeight: "lighter",
  },
  employment: {
    fontSize: "0.8rem",
    fontWeight: 600,
  },
  nameSurname: {
    fontSize: "2rem",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "2px",
  },
}));

const CvPrint = () => {
  const classes = useStyles();

  const { cvId } = useParams();

  const [cv, setCv] = useState(null);
  let progressMap = new Map();
  progressMap.set("A1", "16");
  progressMap.set("A2", "32");
  progressMap.set("B1", "48");
  progressMap.set("B2", "64");
  progressMap.set("C1", "80");
  progressMap.set("C2", "96");

  useEffect(() => {
    const getCvById = async () => {
      const data = await fetchCvById(cvId);
      setCv(data);
    };
    getCvById();
  }, [cvId]);

  return cv !== null ? (
    <Container maxWidth="lg">
      <Grid container sm={12} xs={12}>
        <Grid item sm={12} xs={12}>
          <Box mb={2}>
            <Typography className={classes.nameSurname}>
              {cv.personalDetails.firstName}
            </Typography>
            <Typography className={classes.nameSurname}>
              {cv.personalDetails.lastName}
            </Typography>
            <Typography className={classes.normalText}>
              {cv.personalDetails.jobTitle}
            </Typography>
            <br />
            <Divider />
          </Box>
        </Grid>

        <Grid item sm={3}>
          <PersonalDetailsPreview
            classes={classes}
            personalDetails={cv.personalDetails}
          />
          <SocialLinksPreview
            classes={classes}
            socialLinksList={cv.socialLinksList}
          />
          <Box mb={3}>
            <Typography className={classes.sectionTitle}>
              <u>SK</u>ILLS
            </Typography>
          </Box>
          <Box mb={4}>
            {cv.skillList.map((skill, index) => (
              <Box key={index} mb={1}>
                <Typography key={index} className={classes.normalText}>
                  {skill.name}
                </Typography>
              </Box>
            ))}
          </Box>
          <Box mb={3}>
            <Typography className={classes.sectionTitle}>
              <u>LA</u>NGUAGES
            </Typography>
          </Box>
          <Box mb={3}>
            {cv.languageList.map((language, index) => (
              <Box key={index} mb={1}>
                <Grid container direction="column">
                  <Grid item>
                    <Typography className={classes.normalText}>
                      {language.name}
                    </Typography>
                    <progress
                      value={progressMap.get(language.level)}
                      max="96"
                    ></progress>
                  </Grid>
                </Grid>
              </Box>
            ))}
          </Box>
        </Grid>
        <Grid item sm={1} style={{ maxWidth: "3.33%" }}>
          <Divider orientation="vertical" />
        </Grid>
        <Grid item sm={8}>
          <Box mb={3}>
            <Typography className={classes.sectionTitle}>
              <u>PR</u>OFILE
            </Typography>
          </Box>
          <Box mb={4}>
            <Typography
              className={classes.normalText}
              dangerouslySetInnerHTML={{
                __html: cv.professionalSummary.description,
              }}
            />
          </Box>
          <Box mb={4}>
            <Divider />
          </Box>
          <EmploymentHistoryPreview
            classes={classes}
            employmentList={cv.employmentList}
          />
          <Box mb={4}>
            <Divider />
          </Box>
          <EducationHistoryPreview
            classes={classes}
            educationList={cv.educationList}
          />
        </Grid>
      </Grid>
    </Container>
  ) : (
    <React.Fragment></React.Fragment>
  );
};

export default CvPrint;
