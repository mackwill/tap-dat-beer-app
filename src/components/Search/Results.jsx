import React from "react";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";

import ListItemAvatar from "@material-ui/core/ListItemAvatar";

export default function TitlebarGridList(props) {
  const searchresultsList = props.searchResults.map((elm) => {
    return (
      <>
        <ListItem button onClick={() => props.onClick(elm.id)}>
          <ListItemAvatar>
            <Avatar src={elm.beer_image} />
          </ListItemAvatar>
          <ListItemText primary={elm.name} secondary={elm.brewery} />
        </ListItem>
        <Divider />
      </>
    );
  });

  return (
    <>
      <List>
        <ListSubheader component="div">{props.title}</ListSubheader>
        {searchresultsList}
      </List>
    </>
  );
}
