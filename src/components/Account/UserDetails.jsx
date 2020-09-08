import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import "../../index.css";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#71a0be",
      main: "#4e89ae",
      dark: "#365f79",
      contrastText: "#fff",
    },
    secondary: {
      light: "#efb033",
      main: "#EC9D00",
      dark: "#a56d00",
      contrastText: "#fff",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: ["Oswald", "sans-serif"],
  },
}));

export default function UserDetails(props) {
  const classes = useStyles();

  const { first_name, last_name, email, changeAccountDetails } = props;

  const [firstName, setFirstName] = useState(first_name);
  const [lastName, setLastName] = useState(last_name);
  const [formEmail, setFormEmail] = useState(email);

  const handleAccountChangeSubmit = (e) => {
    e.preventDefault();
    changeAccountDetails({ firstName, lastName, email });
  };

  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <form onSubmit={handleAccountChangeSubmit}>
          <Box width={1}>
            <TextField
              required
              autoFocus
              margin="dense"
              id="firstName"
              label="First Name"
              type="text"
              name="firstName"
              value={firstName}
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
              value={lastName}
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
              value={formEmail}
              fullWidth
              onChange={(e) => setFormEmail(e.target.value)}
            />
          </Box>

          <Box width={1} textAlign="right">
            <Button
              className={classes.root}
              variant="contained"
              type="submit"
              color="secondary"
            >
              Update Info
            </Button>
          </Box>
        </form>
      </MuiThemeProvider>
    </div>
  );
}
