import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Skill from "./Skill";
import { API_URL } from "../../utils/utils";
import Snackbar from "../utils/SnackBar";
import AddExperience from "./AddExperience";
import SkillChips from "./SkillChips";

const PickableSkills = ({ initialValue }) => {
  const [hasDeleted, sethasDeleted] = useState(false);

  const [skillList, setSkillList] = useState(initialValue);
  const [pickableSkills, setPickableSkills] = useState([
    "PHP",
    "React",
    "Vue",
    "Spring",
    "C#",
    "Git",
    "Linux",
    "Amazon Cloud",
    "Azure",
    "Python",
    "Golang",
    "Laravel",
    "Symfony",
    "Javascript",
    "MySQL",
    "MongoDB",
    "Redis",
  ]);

  useEffect(() => {
    setSkillList(initialValue);
  }, [initialValue]);

  const handleDelete = async (skillId) => {
    await fetch(`${API_URL}/skills/${skillId}`, {
      method: "DELETE",
      credentials: "include",
    });
    setSkillList(skillList.filter((skill) => skill._id !== skillId));
    sethasDeleted(true);
  };

  const handleAdd = (newSkill) => {
    setSkillList([...skillList, newSkill]);
  };

  return (
    <Grid item xs={12} sm={12}>
      {hasDeleted && (
        <Snackbar
          setHasDeleted={sethasDeleted}
          message="Skill has been deleted"
        />
      )}
      <Typography variant="h5" color="textPrimary">
        Skills
      </Typography>
      <Grid container>
        <SkillChips
          setPickableSkills={setPickableSkills}
          pickableSkills={pickableSkills}
          handleAdd={handleAdd}
        />
      </Grid>

      <Box mt={1} />
      {skillList.map((skill, index) => (
        <Skill handleDelete={handleDelete} attributes={skill} key={index} />
      ))}
      <Box mt={1} />
      <AddExperience entityName={"skills"} handleAdd={handleAdd} />
    </Grid>
  );
};

export default PickableSkills;
