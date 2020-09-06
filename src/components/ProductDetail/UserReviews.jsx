import React from "react";

import { Grid } from "@material-ui/core";
import Review from "../Review/Review";
import BlankReview from "../Review/BlankReview";
import ListSubheader from "@material-ui/core/ListSubheader";

export default function ProductDetail(props) {
  return (
    <>
      <ListSubheader component="div" style={{ backgroundColor: "#f0f0f0" }}>
        Reviews from other users
      </ListSubheader>
      {props.reviews && (
        <Grid container spacing={3} style={{ backgroundColor: "#f0f0f0" }}>
          {props.reviews.length > 0 ? (
            props.reviews.map((review) => {
              return <Review {...review} />;
            })
          ) : (
            <BlankReview text="No reviews for this beer yet. If you have taste this beer, leave a review to help fellow beer lover. The more you review beers, the better your recommendations will be!" />
          )}
        </Grid>
      )}
    </>
  );
}
