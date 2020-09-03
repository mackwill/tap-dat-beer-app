import React from "react";

import { Grid } from "@material-ui/core";
import Review from "../Review/Review";
import BlankReview from "../Review/BlankReview";
import ListSubheader from "@material-ui/core/ListSubheader";

export default function ProductDetail(props) {
  return (
    <>
      <ListSubheader component="div">Reviews from other users</ListSubheader>
      {props.reviews && (
        <Grid container spacing={3}>
          {props.reviews.length > 0 ? (
            props.reviews.map((review) => {
              return <Review {...review} />;
            })
          ) : (
            <BlankReview />
          )}
        </Grid>
      )}
    </>
  );
}
