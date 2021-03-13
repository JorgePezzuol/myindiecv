import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import RichTextEditor from "./RichTextEditor";

// https://blog.logrocket.com/building-rich-text-editors-in-react-using-draft-js-and-react-draft-wysiwyg/

const ProfessionalSummary = () => {
  return (
    <React.Fragment>
      <Grid item xs={12} sm={12}>
        <Typography variant="h5" color="textPrimary">
          Professional Summay
        </Typography>
        <Typography variant="subtitle2" color="textSecondary" paragraph>
          Include 2-3 clear sentences about your overall experience
        </Typography>
        <RichTextEditor />
      </Grid>
    </React.Fragment>
  );
};

export default ProfessionalSummary;
