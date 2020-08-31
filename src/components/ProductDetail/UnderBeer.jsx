import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Notes from "./Notes";

import SimilarBeer from "./SimilarBeer";
import UserReviews from "./UserReviews";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Reviews" />
          <Tab label="Similar Beers" />
          {props.currentUser && <Tab label="Personal Notes" />}
          {!props.currentUser && <Tab label="Personal Notes" disabled />}
        </Tabs>
      </AppBar>
      {value === 0 && <UserReviews reviews={props.reviews} />}
      {value === 1 && (
        <SimilarBeer beers={props.beers} currentBeer={props.currentBeer} />
      )}
      {value === 2 && <Notes currentBeer={props.currentBeer} />}
    </div>
  );
}
