import { useState, useEffect } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import RichTextEditor from "./RichTextEditor";
import { API_URL } from "../../utils/utils";
import AlertDialogSlide from "../../components/utils/AlertDialogSlide";

const Employment = ({ attributes, handleDelete }) => {
  const [employment, setEmployment] = useState(attributes);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const updateEmployment = async (employment) => {
      const response = await fetch(`${API_URL}/employment/${employment._id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(employment),
      });
      const data = await response.json();
      return data;
    };
    const timeoutId = setTimeout(() => updateEmployment(employment), 1500);
    return () => clearTimeout(timeoutId);
  }, [employment]);

  return (
    <Grid container spacing={2}>
      {isDeleting && (
        <AlertDialogSlide
          title={"Delete Entry"}
          contentText={"Are you sure you want to delete this entry?"}
          handleConfirm={() => handleDelete(employment._id)}
          handleClose={() => setIsDeleting(false)}
        />
      )}
      <Grid item xs={11} sm={11}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>
              {employment.jobTitle}
              <br />
              {new Date(employment.startDate).toLocaleDateString()} -{" "}
              {new Date(employment.endDate).toLocaleDateString()}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Job Title"
                  variant="outlined"
                  size="small"
                  fullWidth
                  onChange={(e) =>
                    setEmployment({
                      ...employment,
                      jobTitle: e.target.value,
                    })
                  }
                  value={employment.jobTitle}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Employer"
                  variant="outlined"
                  size="small"
                  fullWidth
                  onChange={(e) =>
                    setEmployment({
                      ...employment,
                      employer: e.target.value,
                    })
                  }
                  value={employment.employer}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  id="date"
                  variant="outlined"
                  label="Start"
                  type="date"
                  size="small"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) =>
                    setEmployment({
                      ...employment,
                      startDate: e.target.value,
                    })
                  }
                  value={employment.startDate}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  id="date"
                  variant="outlined"
                  label="End"
                  type="date"
                  size="small"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) =>
                    setEmployment({
                      ...employment,
                      endDate: e.target.value,
                    })
                  }
                  value={employment.endDate}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="City"
                  variant="outlined"
                  size="small"
                  fullWidth
                  onChange={(e) =>
                    setEmployment({
                      ...employment,
                      city: e.target.value,
                    })
                  }
                  value={employment.city}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Typography>Description</Typography>
                <RichTextEditor object={employment} setObject={setEmployment} />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Grid item xs={1} sm={1} alignItems="center" container>
        <IconButton onClick={() => setIsDeleting(true)}>
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Employment;
