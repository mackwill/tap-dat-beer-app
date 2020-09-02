import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Results from "../Search/Results";
import Review from "../Review/Review";
import { List, ListItem, Grid } from "@material-ui/core";

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
  console.log('Account Menu Bar: ', props)
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="My Wishlist" />
          <Tab label="My Reviews" />
        </Tabs>
      </AppBar>
      <List>
        {value === 0 && (
          <ListItem>
            <Results
              onClick={props.onClick}
              searchResults={props.beers}
              title="Wishlisted Beers"
            />
          </ListItem>
        )}

        {value === 1 && props.reviews && (
          <Grid container spacing={3}>
            {props.reviews.map((review) => {
              return <Review {...review} myReview={true} myReviews={true} handleDeleteMyReview={props.handleDeleteMyReview} />;
            })}
          </Grid>
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
