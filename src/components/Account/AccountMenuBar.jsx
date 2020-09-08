import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Results from "../Search/Results";
import Review from "../Review/Review";
import { List, Grid } from "@material-ui/core";
import ListSubheader from "@material-ui/core/ListSubheader";
import BlankReview from "../Review/BlankReview";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function AccountMenuBar(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root} style={{ backgroundColor: "#f0f0f0" }}>
      <AppBar style={{ borderRadius: "5px" }} position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="My Wishlist" />
          <Tab label="My Reviews" />
        </Tabs>
      </AppBar>
      <List>
        {value === 0 && (
          <>
            {props.beers.length === 0 && (
              <BlankReview text="You haven't added any beers to your wishlist." />
            )}
            {props.beers.length > 0 && (
              <Results
                onClick={props.onClick}
                searchResults={props.beers}
                title="Wishlisted Beers"
              />
            )}
          </>
        )}

        {value === 1 && props.reviews && (
          <>
            {props.reviews.length === 0 && (
              <BlankReview text="You haven't left any review yet." />
            )}
            {props.reviews.length > 0 && (
              <>
                <ListSubheader
                  component="div"
                  style={{ backgroundColor: "#f0f0f0", position: "static" }}
                >
                  Reviews I have left
                </ListSubheader>
                <Grid container spacing={3}>
                  {props.reviews.map((review) => {
                    return (
                      <Review
                        {...review}
                        myReview={true}
                        myReviews={true}
                        handleDeleteMyReview={props.handleDeleteMyReview}
                        handleEditReviewOpen={props.handleEditReviewOpen}
                        handleConfirmDeleteOpen={props.handleConfirmDeleteOpen}
                      />
                    );
                  })}
                </Grid>
              </>
            )}
          </>
        )}
      </List>
    </div>
  );
}
