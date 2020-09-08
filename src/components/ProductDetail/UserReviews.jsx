import React from "react";
import { Grid } from "@material-ui/core";
import ListSubheader from "@material-ui/core/ListSubheader";
import { makeStyles } from "@material-ui/core/styles";

import Review from "../Review/Review";
import BlankReview from "../Review/BlankReview";

const useStyles = makeStyles((theme) => ({
  greyBackground: {
    backgroundColor: "#f0f0f0",
  },
}));

export default function ProductDetail(props) {
  const classes = useStyles();

  return (
    <>
      <ListSubheader component="div" className={classes.greyBackground}>
        Reviews from other users
      </ListSubheader>
      {props.reviews && (
        <Grid container spacing={3} className={classes.greyBackground}>
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
