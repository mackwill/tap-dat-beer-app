import React from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

import { Paper, Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: 0,
      width: "100%",
      height: "15rem",
    },
  },
}));

export default function Banner() {
  const classes = useStyles();
  return (
    <Box className={classes.root} width={1} p={0} borderBottom={1}>
      <Container>Banner Here!</Container>
    </Box>
  );
}
