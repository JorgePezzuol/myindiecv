import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import Employement from "./Employement";
import { API_URL } from "../../utils/utils";
import { useParams } from "react-router-dom";

const EmploymentHistory = ({
  employmentList,
  setEmploymentList,
  setEmploymentIdToBeDeleted,
  setIsUpdating,
}) => {
  const { cvId } = useParams();

  return (
    <Grid item xs={12} sm={12}>
      <Typography variant="h5" color="textPrimary">
        Employment History
      </Typography>
      <Typography variant="subtitle2" color="textSecondary" paragraph>
        Include your last 10 years of relevant experience and dates in this
        section. List your most recent position first.
      </Typography>
      {employmentList.map((employment, index) => (
        <Employement
          setEmploymentIdToBeDeleted={setEmploymentIdToBeDeleted}
          employmentInitialValue={employment}
          setIsUpdating={setIsUpdating}
          key={index}
        />
      ))}
      <Box mt={2} />
      <Button
        style={{ textTransform: "none" }}
        startIcon={<AddIcon />}
        color="primary"
        size="small"
        onClick={async () => {
          const response = await fetch(`${API_URL}/employment/${cvId}/create`, {
            credentials: "include",
            method: "POST",
          });
          const data = await response.json();
          setEmploymentList([...employmentList, data]);
        }}
      >
        <b>Add employment</b>
      </Button>
    </Grid>
  );
};

export default EmploymentHistory;
