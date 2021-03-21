import React from "react";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Box from "@material-ui/core/Box";
import { API_URL } from "../../utils/utils";
import { useParams } from "react-router-dom";

const SkillChips = ({ pickableSkills, handleAdd, setPickableSkills }) => {
  const { cvId } = useParams();
  return (
    <React.Fragment>
      {pickableSkills.map((skill, index) => (
        <Box p={1} key={index}>
          <Button
            variant="outlined"
            size="small"
            color="primary"
            endIcon={<AddIcon />}
            onClick={async () => {
              const response = await fetch(`${API_URL}/skills/${cvId}/create`, {
                credentials: "include",
                headers: {
                  "Content-type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                  name: skill,
                }),
              });
              const data = await response.json();
              handleAdd(data);
              setPickableSkills(pickableSkills.filter((s) => s !== skill));
            }}
          >
            {skill}
          </Button>
        </Box>
      ))}
    </React.Fragment>
  );
};

export default SkillChips;
