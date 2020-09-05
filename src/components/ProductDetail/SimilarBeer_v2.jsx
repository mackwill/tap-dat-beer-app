import React from "react";
import List from "@material-ui/core/List";
import Results from "../Search/Results";

export default function SimilarBeers(props) {
  return (
    <Results
      onClick={props.onClick}
      searchResults={props.similarBeers}
      title="Similar Beers"
    />
  );
}
