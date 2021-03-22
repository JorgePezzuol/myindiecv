import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const EducationHistoryPreview = ({ classes, educationList }) => {
  return (
    <React.Fragment>
      <Box mb={3}>
        <Typography className={classes.sectionTitle}>
          <u>ED</u>UCATION
        </Typography>
      </Box>
      {educationList.map((education, index) => (
        <Grid container spacing={4} key={index}>
          <Grid item sm={10}>
            <Typography className={classes.employment}>
              {education.degree} - {education.school}
            </Typography>
            <Typography className={classes.normalText}>
              {education.startDate} - {education.endDate}
            </Typography>
            <Box mt={2}>
              <Typography
                className={classes.normalText}
                dangerouslySetInnerHTML={{
                  __html: education.description,
                }}
              />
            </Box>
          </Grid>
          <Grid item sm={2}>
            <Typography className={classes.normalText}>
              {education.city}
            </Typography>
          </Grid>
        </Grid>
      ))}
    </React.Fragment>
  );
};

export default EducationHistoryPreview;
