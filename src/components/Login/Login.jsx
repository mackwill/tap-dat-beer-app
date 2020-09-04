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
  const {
    email,
    password,
    errMessage,
    changeUserData,
    setLoginOpen,
    submitLoginData,
  } = useApplicationData();

  const handleLoginChange = (e) => {
    e.persist();
    changeUserData(e);
  };

  // const handleLoginClose = (e) => {
  //   // setLoginOpen(false);
  //   setOpen(false);
  //   changeUserData(e, true);
  // };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    Promise.resolve(submitLoginData(email, password))
      .then(() => props.handleClose())
      .catch((err) => console.log("Nothing: ", err));
  };
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
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
              onChange={handleLoginChange}
            />

            <TextField
              required
              margin="dense"
              id="name"
              label="Password"
              type="password"
              name="password"
              fullWidth
              onChange={handleLoginChange}
            />
          </DialogContent>
          {/* <CustomAlert errMessage={errMessage} severity={"warning"} /> */}
          <CustomAlert errMessage={errMessage} severity={"warning"} />

          <DialogActions>
            <Button onClick={props.handleClose} color="primary">
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
