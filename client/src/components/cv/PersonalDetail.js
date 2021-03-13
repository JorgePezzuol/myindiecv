import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

const PersonalDetail = () => {
  return (
    <React.Fragment>
      <Grid item xs={12} sm={12}>
        <Typography variant="h5" color="textPrimary">
          Personal Details
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          id="filled-uncontrolled"
          label="Job Title"
          variant="filled"
          placeholder="e.g. Web Developer"
          style={{ marginBottom: 20 }}
          size="small"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          id="filled-uncontrolled"
          label="Email"
          variant="filled"
          style={{ marginBottom: 20 }}
          size="small"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          id="filled-uncontrolled"
          label="First Name"
          variant="filled"
          style={{ marginBottom: 20 }}
          size="small"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          id="filled-uncontrolled"
          label="Last Name"
          variant="filled"
          style={{ marginBottom: 20 }}
          size="small"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          id="filled-uncontrolled"
          label="Phone"
          variant="filled"
          size="small"
          fullWidth
        />
      </Grid>
    </React.Fragment>
  );
};

export default PersonalDetail;
