import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const PersonalDetailsPreview = ({ classes, personalDetails }) => {
  return (
    <React.Fragment>
      <Box mb={3}>
        <Typography className={classes.sectionTitle}>
          <u>DE</u>TAILS
        </Typography>
      </Box>
      <Box mb={2}>
        <Typography className={classes.subTitle}>PHONE</Typography>
        <Typography className={classes.normalText}>
          {personalDetails.phone}
        </Typography>
      </Box>
      <Box mb={4}>
        <Typography className={classes.subTitle}>EMAIL</Typography>
        <Typography className={classes.normalText}>
          {personalDetails.mail}
        </Typography>
      </Box>
    </React.Fragment>
  );
};

export default PersonalDetailsPreview;
