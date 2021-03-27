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

const Education = ({ attributes, handleDelete }) => {
  const [education, setEducation] = useState(attributes);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const updateEducation = async (education) => {
      const response = await fetch(`${API_URL}/education/${education._id}`, {
        credentials: "include",
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(education),
      });
      const data = await response.json();
      return data;
    };
    const timeoutId = setTimeout(() => updateEducation(education), 1500);
    return () => clearTimeout(timeoutId);
  }, [education]);

  return (
    <Grid container spacing={2}>
      {isDeleting && (
        <AlertDialogSlide
          title={"Delete Entry"}
          contentText={"Are you sure you want to delete this entry?"}
          handleConfirm={() => handleDelete(education._id)}
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
              {education.school} - {education.degree}
              <br />
              {new Date(education.startDate).toLocaleDateString()} -{" "}
              {new Date(education.endDate).toLocaleDateString()}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="School"
                  variant="outlined"
                  size="small"
                  fullWidth
                  onChange={(e) =>
                    setEducation({
                      ...education,
                      school: e.target.value,
                    })
                  }
                  value={education.school}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Degree"
                  variant="outlined"
                  size="small"
                  fullWidth
                  onChange={(e) =>
                    setEducation({
                      ...education,
                      degree: e.target.value,
                    })
                  }
                  value={education.degree}
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
                    setEducation({
                      ...education,
                      startDate: e.target.value,
                    })
                  }
                  value={education.startDate}
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
                    setEducation({
                      ...education,
                      endDate: e.target.value,
                    })
                  }
                  value={education.endDate}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="City"
                  variant="outlined"
                  size="small"
                  fullWidth
                  onChange={(e) =>
                    setEducation({
                      ...education,
                      city: e.target.value,
                    })
                  }
                  value={education.city}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Typography>Description</Typography>
                <RichTextEditor object={education} setObject={setEducation} />
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

export default Education;
