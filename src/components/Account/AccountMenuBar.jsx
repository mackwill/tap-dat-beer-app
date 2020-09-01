import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Results from "../Search/Results";

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
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="My Wishlist" />
          <Tab label="My Reviews" />
        </Tabs>
      </AppBar>

      {value === 0 && (
        <Results
          onClick={props.onClick}
          searchResults={props.beers}
          title="Wishlisted Beers"
        />
      )}
      {/* {value === 0 && <UserReviews reviews={props.reviews} />}
      {value === 1 && (
        <SimilarBeer beers={props.beers} currentBeer={props.currentBeer} />
      )}
      {value === 2 && <Notes currentBeer={props.currentBeer} />} */}
    </div>
  );
}
