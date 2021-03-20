import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import RichTextEditor from "./RichTextEditor";
import { updateEntity, setDelay } from "../../services/CvService";

// https://blog.logrocket.com/building-rich-text-editors-in-react-using-draft-js-and-react-draft-wysiwyg/

const ProfessionalSummary = ({ initialValue }) => {
  const [professionalSummary, setProfessionalSummary] = useState({
    ...initialValue,
  });

  useEffect(() => {
    setProfessionalSummary({ ...initialValue });
  }, [initialValue]);

  useEffect(() => {
    const updateProfessionalSummary = async (professionalSummary) => {
      return updateEntity("professionalsummary", professionalSummary);
    };
    const timeoutId = setDelay(updateProfessionalSummary, professionalSummary);
    return () => clearTimeout(timeoutId);
  }, [professionalSummary]);

  return (
    <React.Fragment>
      <Grid item xs={12} sm={12}>
        <Typography variant="h5" color="textPrimary">
          Professional Summay
        </Typography>
        <Typography variant="subtitle2" color="textSecondary" paragraph>
          Include 2-3 clear sentences about your overall experience
        </Typography>
        {professionalSummary ? (
          <RichTextEditor
            object={professionalSummary}
            setObject={setProfessionalSummary}
          />
        ) : (
          <p>Loading...</p>
        )}
      </Grid>
    </React.Fragment>
  );
};

export default ProfessionalSummary;
