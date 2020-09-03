import React, { useState } from "react";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import Results from "../Search/Results";

export default function TitlebarGridList(props) {
  return (
    <List>
      <Results
        onClick={props.onClick}
        searchResults={props.similarBeer}
        title="Similar Beers"
      />
    </List>
  );
}
