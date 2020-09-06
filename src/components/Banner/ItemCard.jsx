import Box from "@material-ui/core/Box";
import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "40vh",
    width: "85vw",
    border: "none",
    justifyContent: "center",
    objectFit: "fill",
    alignContent: "center",
    marginLeft: "5%",
    //marginTop: "5%",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    border: "none",
  },
  content: {
    flex: "1 0 auto",
    backgroundColor: "#f0f0f0",
    objectFit: "fill",
    border: "none",
  },
  cover: {
    width: "100%",
    height: "100%",
    backgroundSize: "cover",
    //objectFit: "fill",
    padding: "0",
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
  media: {
    height: "9rem",
    backgroundSize: "contain",
    objectFit: "contain",
    padding: "0.5rem",
    width: "90%",
    margin: "auto",
    // paddingTop: "100%", // 16:9
  },
}));

export default function MediaControlCard(props) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Box p={"1rem"}>
      <Card className={classes.root}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {props.title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {props.subtitle}
            </Typography>
          </CardContent>
          <div className={classes.controls}></div>
        </div>
        <CardMedia
          className={classes.cover}
          image={props.image}
          title={props.title}
        />
      </Card>
    </Box>
  );
}
