import React from "react";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import LocalDrinkIcon from "@material-ui/icons/LocalDrink";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { makeStyles } from "@material-ui/core/styles";
import "../../index.css";
import { Typography, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: ["Oswald", "sans-serif"],
    // fontWeight: "300",
  },
  secondary: {
    fontFamily: ["Oswald", "sans-serif"],
    fontWeight: "300",
    opacity: "70%",
  },
}));

export default function TitlebarGridList(props) {
  const classes = useStyles();

  const primary = (name) => {
    return (
      <Box>
        <Typography className={classes.root} variant="p">
          {name}
        </Typography>
      </Box>
    );
  };

  const secondary = (name) => {
    return (
      <Box>
        <Typography className={classes.secondary} variant="p">
          {name}
        </Typography>
      </Box>
    );
  };
  const searchresultsList = props.searchResults.map((elm) => {
    return (
      <>
        <ListItem button onClick={() => props.onClick(elm.id)}>
          <ListItemAvatar>
            <Avatar src={elm.beer_image}>
              <LocalDrinkIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            className={classes.root}
            primary={primary(elm.name)}
            secondary={secondary(elm.brewery)}
          />
        </ListItem>
        <Divider />
      </>
    );
  });

  return (
    <>
      <List style={{ paddingTop: "0" }}>
        <ListSubheader component="div" style={{ backgroundColor: "#f0f0f0" }}>
          {props.title}
        </ListSubheader>
        {searchresultsList}
        {props.pageNumber && (
          <ListItem button onClick={props.loadMore}>
            <ListItemText className={classes.root} primary="Load more" />
          </ListItem>
        )}
      </List>
    </>
  );
}
