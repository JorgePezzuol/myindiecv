import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import { updateEntity, setDelay } from "../../services/CvService";

const PersonalDetail = ({ initialValue }) => {
  const [personalDetails, setPersonalDetails] = useState({ ...initialValue });

  useEffect(() => {
    setPersonalDetails({ ...initialValue });
  }, [initialValue]);

  useEffect(() => {
    const updatePersonalDetails = async (personalDetails) => {
      return updateEntity("personaldetails", personalDetails);
    };
    const timeoutId = setDelay(updatePersonalDetails, personalDetails);
    return () => clearTimeout(timeoutId);
  }, [personalDetails]);

  return (
    <React.Fragment>
      <Grid item xs={12} sm={12}>
        <Typography variant="h5" color="textPrimary">
          Personal Details
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Job Title"
          variant="outlined"
          placeholder="e.g. Web Developer"
          style={{ marginBottom: 20 }}
          size="small"
          fullWidth
          onChange={(e) =>
            setPersonalDetails({
              ...personalDetails,
              jobTitle: e.target.value,
            })
          }
          value={personalDetails.jobTitle}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Email"
          variant="outlined"
          style={{ marginBottom: 20 }}
          size="small"
          fullWidth
          onChange={(e) =>
            setPersonalDetails({
              ...personalDetails,
              mail: e.target.value,
            })
          }
          value={personalDetails.mail}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="First Name"
          variant="outlined"
          style={{ marginBottom: 20 }}
          size="small"
          fullWidth
          onChange={(e) =>
            setPersonalDetails({
              ...personalDetails,
              firstName: e.target.value,
            })
          }
          value={personalDetails.firstName}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Last Name"
          variant="outlined"
          style={{ marginBottom: 20 }}
          size="small"
          fullWidth
          onChange={(e) =>
            setPersonalDetails({
              ...personalDetails,
              lastName: e.target.value,
            })
          }
          value={personalDetails.lastName}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Phone"
          variant="outlined"
          size="small"
          fullWidth
          onChange={(e) =>
            setPersonalDetails({
              ...personalDetails,
              phone: e.target.value,
            })
          }
          value={personalDetails.phone}
        />
      </Grid>
    </React.Fragment>
  );
};

export default PersonalDetail;
