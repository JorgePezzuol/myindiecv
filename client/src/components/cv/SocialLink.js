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
import AlertDialogSlide from "../../components/utils/AlertDialogSlide";

const SocialLink = ({ attributes, handleDelete }) => {
  const [socialLink, setSocialLink] = useState(attributes);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const updateLink = async (socialLink) => {
      const response = await fetch(`${API_URL}/links/${socialLink._id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(socialLink),
      });
      const data = await response.json();
      return data;
    };
    const timeoutId = setTimeout(() => updateLink(socialLink), 1500);
    return () => clearTimeout(timeoutId);
  }, [socialLink]);

  return (
    <Grid container spacing={2}>
      {isDeleting && (
        <AlertDialogSlide
          title={"Delete Entry"}
          contentText={"Are you sure you want to delete this entry?"}
          handleConfirm={() => handleDelete(socialLink._id)}
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
            <Typography>{socialLink.label}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Label"
                  variant="outlined"
                  size="small"
                  fullWidth
                  onChange={(e) =>
                    setSocialLink({
                      ...socialLink,
                      label: e.target.value,
                    })
                  }
                  value={socialLink.label}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Link"
                  variant="outlined"
                  size="small"
                  fullWidth
                  onChange={(e) =>
                    setSocialLink({
                      ...socialLink,
                      link: e.target.value,
                    })
                  }
                  value={socialLink.link}
                />
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

export default SocialLink;
