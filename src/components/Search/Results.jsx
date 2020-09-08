import React from "react";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import LocalDrinkIcon from "@material-ui/icons/LocalDrink";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { MuiThemeProvider } from "@material-ui/core/styles";

import theme from "../Styles/Theme";

export default function TitlebarGridList(props) {
  const searchresultsList = props.searchResults.map((elm) => {
    return (
      <>
        <ListItem button onClick={() => props.onClick(elm.id)}>
          <ListItemAvatar>
            <Avatar src={elm.beer_image}>
              <LocalDrinkIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={elm.name} secondary={elm.brewery} />
        </ListItem>
        <Divider />
      </>
    );
  });

  return (
    <>
      <MuiThemeProvider theme={theme}>
        <List style={{ paddingTop: "0" }}>
          <ListSubheader
            component="div"
            style={{ backgroundColor: theme.palette.defaultBackground }}
          >
            {props.title}
          </ListSubheader>
          {searchresultsList}
          {props.pageNumber && (
            <ListItem button onClick={props.loadMore}>
              <ListItemText primary="Load more" />
            </ListItem>
          )}
        </List>
      </MuiThemeProvider>
    </>
  );
}
