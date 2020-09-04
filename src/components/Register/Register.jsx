import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CustomAlert from "../Alert/CustomAlert";
import useApplicationData from "../../hooks/useApplicationData";
import axios from "axios";

export default function Register(props) {
  // console.log("props ", props);
  const [err, setError] = useState(false);
  let errorMsg = "";

  const {
    firstName,
    lastName,
    email,
    password,
    passwordConfirmation,
    changeUserData,
    errMessage,
    setLoggedInUser,
    setErrorMessage,
  } = useApplicationData();

  const handleRegisterChange = (e) => {
    e.persist();
    changeUserData(e);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      setErrorMessage("Passwords do not match");
      return;
    }

    const newUser = {
      firstName,
      lastName,
      email,
      password,
    };
    return axios
      .post("/api/register", newUser)
      .then((res) => {
        setLoggedInUser(res.data.user);
        props.handleClose();
      })
      .catch((err) => {
        setErrorMessage("That email already exists");
      });
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={handleRegisterSubmit}>
          <DialogTitle id="form-dialog-title">Sign Up!</DialogTitle>
          <DialogContent>
            <TextField
              required
              autoFocus
              margin="dense"
              id="firstName"
              label="First Name"
              type="text"
              name="firstName"
              fullWidth
              onChange={handleRegisterChange}
            />
            <TextField
              required
              margin="dense"
              id="lastName"
              label="Last Name"
              type="text"
              name="lastName"
              fullWidth
              onChange={handleRegisterChange}
            />
            <TextField
              required
              margin="dense"
              id="email"
              label="Email"
              type="email"
              name="email"
              fullWidth
              onChange={handleRegisterChange}
            />
            <TextField
              required
              margin="dense"
              id="password"
              label="Password"
              type="password"
              name="password"
              fullWidth
              onChange={handleRegisterChange}
            />
            <TextField
              required
              margin="dense"
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              name="passwordConfirmation"
              fullWidth
              onChange={handleRegisterChange}
            />
          </DialogContent>
          <CustomAlert errMessage={errMessage} severity="warning" />
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
