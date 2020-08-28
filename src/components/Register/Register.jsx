import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
// import CustomAlert from "../CustomAlert";

export default function Register(props) {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={props.onSubmit}>
          <DialogTitle id="form-dialog-title">Sign Up!</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="firstName"
              label="First Name"
              type="text"
              name="firstName"
              fullWidth
              onChange={props.onChange}
            />
            <TextField
              margin="dense"
              id="lastName"
              label="Last Name"
              type="text"
              name="lastName"
              fullWidth
              onChange={props.onChange}
            />
            <TextField
              margin="dense"
              id="email"
              label="Email"
              type="email"
              name="email"
              fullWidth
              onChange={props.onChange}
            />
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              name="password"
              fullWidth
              onChange={props.onChange}
            />
            <TextField
              margin="dense"
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              name="passwordConfirmation"
              fullWidth
              onChange={props.onChange}
            />
          </DialogContent>
          {/* <CustomAlert errMessage={props.errMessage} /> */}

          <DialogActions>
            <Button onClick={props.handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Register
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}