import React from "react";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import LocalDrinkIcon from "@material-ui/icons/LocalDrink";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { getSimilarBeers } from "../../Helpers/SimilarBeer";

export default function TitlebarGridList(props) {
  const similarBeer = getSimilarBeers(props.currentBeer, props.beers);

  const similarBeers = similarBeer.map((elm) => {
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
      <List>
        <ListSubheader component="div">{props.title}</ListSubheader>
        {similarBeers}
      </List>
    </>
  );
}
