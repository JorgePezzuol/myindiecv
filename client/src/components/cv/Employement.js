import { useState } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import RichTextEditor from "./RichTextEditor";

const NewEmployementExperience = ({
  employment,
  setEmploymentIdToBeDeleted,
}) => {
  const [jobTitle, setJobTitle] = useState("Not specified");
  return (
    <Grid container spacing={2}>
      <Grid item xs={11} sm={11}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>
              {jobTitle}
              <br />
              Mar 2021 - Mar 2021
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {/* <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography> */}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="filled-uncontrolled"
                  label="Job Title"
                  variant="filled"
                  size="small"
                  fullWidth
                  onChange={(e) => setJobTitle(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="filled-uncontrolled"
                  label="Employer"
                  variant="filled"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  id="filled-uncontrolled"
                  label="Start date"
                  variant="filled"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  id="filled-uncontrolled"
                  label="End date"
                  variant="filled"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="filled-uncontrolled"
                  label="City"
                  variant="filled"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Typography>Description</Typography>
                <RichTextEditor />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Grid item xs={1} sm={1} alignItems="center" container>
        <IconButton onClick={() => setEmploymentIdToBeDeleted(employment.id)}>
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default NewEmployementExperience;
