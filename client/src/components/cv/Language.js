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

const Language = ({ attributes, handleDelete }) => {
  const [language, setLanguage] = useState(attributes);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const updateLanguage = async (language) => {
      const response = await fetch(`${API_URL}/languages/${language._id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(language),
      });
      const data = await response.json();
      return data;
    };
    const timeoutId = setTimeout(() => updateLanguage(language), 1500);
    return () => clearTimeout(timeoutId);
  }, [language]);

  return (
    <Grid container spacing={2}>
      {isDeleting && (
        <AlertDialogSlide
          title={"Delete Entry"}
          contentText={"Are you sure you want to delete this entry?"}
          handleConfirm={() => handleDelete(language._id)}
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
              {language.name} - {language.level}
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
                    setLanguage({
                      ...language,
                      name: e.target.value,
                    })
                  }
                  value={language.name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl size="small" fullWidth variant="outlined">
                  <InputLabel htmlFor="outlined-age-native-simple">
                    Level
                  </InputLabel>
                  <Select
                    native
                    value={language.level}
                    onChange={(e) =>
                      setLanguage({
                        ...language,
                        level: e.target.value,
                      })
                    }
                    label="Level"
                  >
                    <option value={"C2"}>C2</option>
                    <option value={"C1"}>C1</option>
                    <option value={"B2"}>B2</option>
                    <option value={"B1"}>B1</option>
                    <option value={"A2"}>A2</option>
                    <option value={"A1"}>A1</option>
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

export default Language;
