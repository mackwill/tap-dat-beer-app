import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Box, Button } from "@material-ui/core";

export default function UserDetails(props) {
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
      <form onSubmit={handleAccountChangeSubmit}>
        <Box>
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
          <Button variant="contained" type="submit" color="primary">
            Update Info
          </Button>
        </Box>
      </form>
    </div>
  );
}
