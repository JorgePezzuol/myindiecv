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
import { API_URL } from "../../utils/utils";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import AlertDialogSlide from "../../components/utils/AlertDialogSlide";

const Skill = ({ attributes, handleDelete }) => {
  const [skill, setSkill] = useState(attributes);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const updateSkill = async (skill) => {
      const response = await fetch(`${API_URL}/skills/${skill._id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(skill),
      });
      const data = await response.json();
      return data;
    };
    const timeoutId = setTimeout(() => updateSkill(skill), 1500);
    return () => clearTimeout(timeoutId);
  }, [skill]);

  return (
    <Grid container spacing={2}>
      {isDeleting && (
        <AlertDialogSlide
          title={"Delete Entry"}
          contentText={"Are you sure you want to delete this entry?"}
          handleConfirm={() => handleDelete(skill._id)}
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
              {skill.name} - {skill.level}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Name"
                  variant="outlined"
                  size="small"
                  fullWidth
                  onChange={(e) =>
                    setSkill({
                      ...skill,
                      name: e.target.value,
                    })
                  }
                  value={skill.name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl size="small" fullWidth variant="outlined">
                  <InputLabel>Level</InputLabel>
                  <Select
                    native
                    value={skill.level}
                    onChange={(e) =>
                      setSkill({
                        ...skill,
                        level: e.target.value,
                      })
                    }
                    label="Level"
                  >
                    <option value={"Novice"}>Novice</option>
                    <option value={"Beginner"}>Beginner</option>
                    <option value={"Skillful"}>Skillful</option>
                    <option value={"Experienced"}>Experienced</option>
                    <option value={"Expert"}>Expert</option>
                  </Select>
                </FormControl>
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

export default Skill;
