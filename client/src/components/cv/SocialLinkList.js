import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import SocialLink from "./SocialLink";
import { API_URL } from "../../utils/utils";
import Snackbar from "../utils/SnackBar";
import AddExperience from "./AddExperience";

const SocialLinkList = ({ initialValue }) => {
  const [hasDeleted, sethasDeleted] = useState(false);

  const [linksList, setLinksList] = useState(initialValue);

  useEffect(() => {
    setLinksList(initialValue);
  }, [initialValue]);

  const handleDelete = async (linkId) => {
    await fetch(`${API_URL}/links/${linkId}`, {
      method: "DELETE",
      credentials: "include",
    });
    setLinksList(linksList.filter((link) => link._id !== linkId));
    sethasDeleted(true);
  };

  const handleAdd = (newLink) => {
    setLinksList([...linksList, newLink]);
  };

  return (
    <Grid item xs={12} sm={12}>
      {hasDeleted && (
        <Snackbar setHasDeleted={sethasDeleted} message="Deleted link" />
      )}
      <Typography variant="h5" color="textPrimary">
        Websites & Social Links
      </Typography>
      <Typography variant="subtitle2" color="textSecondary" paragraph>
        You can add links to websites you want hiring managers to see! Perhaps
        it will be a link to your portfolio, Linkedin profile, or personal
        website
      </Typography>
      {linksList.map((socialLink, index) => (
        <SocialLink
          handleDelete={handleDelete}
          attributes={socialLink}
          key={index}
        />
      ))}
      <Box mt={1} />
      <AddExperience entityName={"links"} handleAdd={handleAdd} />
    </Grid>
  );
};

export default SocialLinkList;
