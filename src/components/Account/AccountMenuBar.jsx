import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Results from "../Search/Results";
import Review from "../Review/Review";
import { List, ListItem, Grid } from "@material-ui/core";
import ListSubheader from "@material-ui/core/ListSubheader";

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
  console.log("Account Menu Bar: ", props);
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
          <Results
            onClick={props.onClick}
            searchResults={props.beers}
            title="Wishlisted Beers"
          />
        )}

        {value === 1 && props.reviews && (
          <>
            <ListSubheader
              component="div"
              style={{ backgroundColor: "#f0f0f0" }}
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
      </List>

      {/* {value === 0 && <UserReviews reviews={props.reviews} />}
      {value === 1 && (
        <SimilarBeer beers={props.beers} currentBeer={props.currentBeer} />
      )}
      {value === 2 && <Notes currentBeer={props.currentBeer} />} */}
    </div>
  );
}
