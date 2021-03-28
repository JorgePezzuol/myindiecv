import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const EmploymentHistoryPreview = ({ employmentList, classes }) => {
  return (
    <React.Fragment>
      <Box mb={3}>
        <Typography className={classes.sectionTitle}>
          <u>EM</u>PLOYMENT HISTORY
        </Typography>
      </Box>
      {employmentList.map((employment, index) => (
        <Box key={index} mb={4}>
          <Grid container spacing={3}>
            <Grid item sm={10}>
              <Typography className={classes.employment}>
                {employment.jobTitle}, {employment.employer}
              </Typography>
              <Typography className={classes.normalText}>
                {employment.startDate} - {employment.endDate}
              </Typography>
              <Box mt={2}>
                <Typography
                  className={classes.normalText}
                  dangerouslySetInnerHTML={{
                    __html: employment.description,
                  }}
                />
              </Box>
            </Grid>
            <Grid item sm={2}>
              <Typography className={classes.normalText}>
                {employment.city}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      ))}
    </React.Fragment>
  );
};

export default EmploymentHistoryPreview;
