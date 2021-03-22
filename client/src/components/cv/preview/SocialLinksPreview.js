import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const SocialLinksPreview = ({ classes, socialLinksList }) => {
  return (
    <React.Fragment>
      <Box mb={3}>
        <Typography className={classes.sectionTitle}>
          <u>LI</u>NKS
        </Typography>
      </Box>
      <Box mb={4}>
        {socialLinksList.map((socialLink, index) => (
          <Box key={index} mb={1}>
            <a target="_blank" href={socialLink.link}>
              <Typography className={classes.normalText}>
                {socialLink.label}
              </Typography>
            </a>
          </Box>
        ))}
      </Box>
    </React.Fragment>
  );
};

export default SocialLinksPreview;
