import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Language from "./Language";
import { API_URL } from "../../utils/utils";
import Snackbar from "../utils/SnackBar";
import AddExperience from "./AddExperience";

const LanguageList = ({ initialValue }) => {
  const [hasDeleted, sethasDeleted] = useState(false);

  const [languageList, setLanguageList] = useState(initialValue);

  useEffect(() => {
    setLanguageList(initialValue);
  }, [initialValue]);

  const handleDelete = async (languageId) => {
    await fetch(`${API_URL}/languages/${languageId}`, {
      method: "DELETE",
      credentials: "include",
    });
    setLanguageList(
      languageList.filter((language) => language._id !== languageId)
    );
    sethasDeleted(true);
  };

  const handleAdd = (newLanguage) => {
    setLanguageList([...languageList, newLanguage]);
  };

  return (
    <Grid item xs={12} sm={12}>
      {hasDeleted && (
        <Snackbar setHasDeleted={sethasDeleted} message="Deleted language" />
      )}
      <Typography variant="h5" color="textPrimary">
        Languages
      </Typography>
      <Box mt={1} />
      {languageList.map((language, index) => (
        <Language
          handleDelete={handleDelete}
          attributes={language}
          key={index}
        />
      ))}
      <Box mt={1} />
      <AddExperience entityName={"languages"} handleAdd={handleAdd} />
    </Grid>
  );
};

export default LanguageList;
