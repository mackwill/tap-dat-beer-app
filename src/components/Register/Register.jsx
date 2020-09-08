import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CustomAlert from "../Alert/CustomAlert";
import axios from "axios";

export default function Register(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errMessage, setErrorMessage] = useState(null);

  const { setLoggedInUser } = props;

  const handleRegisterSubmit = async (e) => {
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

    try {
      const response = await axios.post("/api/register", newUser);
      setLoggedInUser(response.data.user);
      props.handleClose();
    } catch (error) {
      setErrorMessage("That email already exists");
    }
  };

  const registerClose = (e) => {
    props.handleClose(e);
    setErrorMessage(null);
  };
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={() => registerClose()}
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
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              required
              margin="dense"
              id="lastName"
              label="Last Name"
              type="text"
              name="lastName"
              fullWidth
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              required
              margin="dense"
              id="email"
              label="Email"
              type="email"
              name="email"
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              required
              margin="dense"
              id="password"
              label="Password"
              type="password"
              name="password"
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              required
              margin="dense"
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              name="passwordConfirmation"
              fullWidth
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
          </DialogContent>
          <CustomAlert errMessage={errMessage} severity="warning" />
          <DialogActions>
            <Button onClick={() => registerClose()} color="primary">
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
