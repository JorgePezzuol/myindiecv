import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { API_URL } from "../../utils/utils";
import { useParams } from "react-router-dom";

const AddExperience = ({ entityName, handleAdd }) => {
  const { cvId } = useParams();
  return (
    <Button
      style={{ textTransform: "none" }}
      startIcon={<AddIcon />}
      color="primary"
      size="small"
      onClick={async () => {
        const response = await fetch(
          `${API_URL}/${entityName}/${cvId}/create`,
          {
            credentials: "include",
            method: "POST",
          }
        );
        const data = await response.json();
        handleAdd(data);
      }}
    >
      <b>Add {entityName}</b>
    </Button>
  );
};

export default AddExperience;
