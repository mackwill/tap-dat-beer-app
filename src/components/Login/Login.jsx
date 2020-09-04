import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

import CustomAlert from "../Alert/CustomAlert";
import useApplicationData from "../../hooks/useApplicationData";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    // email,
    // password,
    errMessage,
    changeUserData,
    setLoginOpen,
    submitLoginData,
    setErrorMessage,
  } = props;

  const handleLoginChange = (e) => {
    e.persist();
    changeUserData(e);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    Promise.resolve(submitLoginData(email, password))
      .then(() => props.handleClose())
      .catch((err) => console.log("Nothing: ", err));
  };

  const loginClose = (e) => {
    props.handleClose(e);
    setErrorMessage(null);
  };
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={() => loginClose()}
        aria-labelledby="form-dialog-title"
      >
        {/* <form onSubmit={onSubmit}> */}
        <form onSubmit={handleLoginSubmit}>
          <DialogTitle id="form-dialog-title">
            Login To Your Account!
          </DialogTitle>
          <DialogContent>
            <TextField
              required
              autoFocus
              margin="dense"
              id="name"
              label="Email"
              type="email"
              name="email"
              fullWidth
              onChange={(event) => setEmail(event.target.value)}
            />

            <TextField
              required
              margin="dense"
              id="name"
              label="Password"
              type="password"
              name="password"
              fullWidth
              onChange={(event) => setPassword(event.target.value)}
            />
          </DialogContent>
          <CustomAlert errMessage={errMessage} severity={"warning"} />

          <DialogActions>
            <Button onClick={() => loginClose()} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Login
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
