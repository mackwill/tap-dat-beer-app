import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CustomAlert from "../Alert/CustomAlert";

export default function Register(props) {
  // console.log("props ", props);
  const [err, setError] = useState(false);
  let errorMsg = "";

  const submitForm = () => {
    if (props.state.password !== props.state.passwordConfirmation) {
      errorMsg = "Password do not match";
      setError(true);
      return;
    } else {
      props.onSubmit();
    }
  };
  const handleChange = async (e) => {
    await props.onChange(e);

    console.log("hererere");
    console.log("passwprd", props.state.password);
    console.log("password confirmation: ", props.state.passwordConfirmation);
    if (props.state.password !== props.state.passwordConfirmation) {
      console.log("here");
      setError(true);
      errorMsg = "Password do not match";
    } else {
      console.log("false yo");
      setError(false);
    }
  };
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={submitForm}>
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
              value={props.state.firstName}
              onChange={props.onChange}
              // onChange={handleChange}
            />
            <TextField
              margin="dense"
              id="lastName"
              label="Last Name"
              type="text"
              name="lastName"
              fullWidth
              value={props.state.lastName}
              onChange={props.onChange}
            />
            <TextField
              margin="dense"
              id="email"
              label="Email"
              type="email"
              name="email"
              fullWidth
              value={props.state.email}
              onChange={props.onChange}
            />
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              name="password"
              fullWidth
              // onChange={props.onChange}
              onChange={handleChange}
              value={props.state.password}
            />
            <TextField
              error={err}
              margin="dense"
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              name="passwordConfirmation"
              fullWidth
              // onChange={props.onChange}
              onChange={handleChange}
              // value={props.state.passwordConfirmation}
              helperText={errorMsg}
            />
          </DialogContent>
          <CustomAlert errMessage={props.errMessage} severity="warning" />
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
