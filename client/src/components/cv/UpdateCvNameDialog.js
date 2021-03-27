import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { API_URL } from "../../utils/utils";

const UpdateCvNameDialog = ({ handleClose, handleUpdate, cvId }) => {
  const [cvName, setCvName] = useState("");

  const updateCvName = async () => {
    const response = await fetch(`${API_URL}/cv/${cvId}`, {
      credentials: "include",
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: cvName,
      }),
    });
    await response.json();
    if (response.ok) {
      handleUpdate(cvName);
      handleClose(false);
    }
  };

  return (
    <div>
      <Dialog
        open={true}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Update CV name</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can have multiple CV's, so maybe it is a good idea to give it a
            name.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Cv Name"
            type="text"
            value={cvName}
            onChange={(e) => setCvName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={updateCvName} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UpdateCvNameDialog;
