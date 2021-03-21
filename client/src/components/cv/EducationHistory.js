import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Education from "./Education";
import { API_URL } from "../../utils/utils";
import Snackbar from "../../components/utils/SnackBar";
import AddExperience from "../../components/cv/AddExperience";

const EducationHistory = ({ initialValue }) => {
  const [educationList, setEducationList] = useState(initialValue);
  const [hasDeleted, sethasDeleted] = useState(false);

  useEffect(() => {
    setEducationList(initialValue);
  }, [initialValue]);

  const handleDelete = async (educationId) => {
    await fetch(`${API_URL}/education/${educationId}`, {
      method: "DELETE",
      credentials: "include",
    });
    setEducationList(
      educationList.filter((education) => education._id !== educationId)
    );
    sethasDeleted(true);
  };

  const handleAdd = (newEducation) => {
    setEducationList([...educationList, newEducation]);
  };

  return (
    <Grid item xs={12} sm={12}>
      {hasDeleted && (
        <Snackbar setHasDeleted={sethasDeleted} message="Deleted education" />
      )}
      <Typography variant="h5" color="textPrimary">
        Education
      </Typography>
      <Typography variant="subtitle2" color="textSecondary" paragraph>
        If relevant, include your most recent educational achievements and the
        dates here
      </Typography>
      {educationList.map((education, index) => (
        <Education
          handleDelete={handleDelete}
          attributes={education}
          key={index}
        />
      ))}
      <Box mt={1} />
      <AddExperience entityName={"education"} handleAdd={handleAdd} />
    </Grid>
  );
};

export default EducationHistory;
