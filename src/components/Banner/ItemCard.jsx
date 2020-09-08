import Box from "@material-ui/core/Box";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up("xs")]: {
      display: "flex",
      height: 210,
      width: "100%",
      border: "none",
      //justifyContent: "center",
      //alignContent: "center",
      margin: "auto",
    },
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      height: "52vh",
      width: "90vw",
      border: "none",
      justifyContent: "center",
      alignContent: "center",
      margin: "auto",
    },
    [theme.breakpoints.up("md")]: {
      display: "flex",
      height: "530px",
      width: "89vw",
      border: "none",
      justifyContent: "center",
      alignContent: "center",
      margin: "auto",
    },
    [theme.breakpoints.up("lg")]: {
      display: "flex",
      height: "590px",
      width: "89vw",
      border: "none",
      justifyContent: "center",
      alignContent: "center",
      margin: "auto",
    },
  },
  details: {
    display: "flex",
    flexDirection: "column",
    border: "none",
  },
  content: {
    //flex: "1 0 auto",
    backgroundColor: "#f0f0f0",
    objectFit: "fill",
    border: "none",
  },
  cover: {
    width: "100%",
    height: "100%",
    backgroundSize: "cover",
    //objectFit: "fill",
    //padding: "0",
    border: "none",
    //objectFit: "cover",
  },

  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    objectFit: "fill",
    border: "none",
  },
}));

export default function MediaControlCard(props) {
  const classes = useStyles();

  return (
    <Box p={"1rem"}>
      <Card className={classes.root}>
        <CardMedia className={classes.cover} image={props.image} />
      </Card>
    </Box>
  );
}
