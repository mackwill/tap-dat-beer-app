import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";

export default function Login(props) {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.close}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Find a beer quickly with our beer classification scanner
        </DialogTitle>
        <DialogContent style={{ textAlign: "center" }}>
          Hold your camera at the beer and stand still for a few second. If we
          have your beer in our database, the beer profile will shortly appear
          <img src="images/scanner.png" />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => props.close()} color="primary">
            Cancel
          </Button>
          <Button onClick={() => props.startScanner()} color="primary">
            Next
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
