import React from "react";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";

import { Grid } from "@material-ui/core";
import Review from "../Review/Review";
import BlankReview from "../Review/BlankReview";
import Typography from "@material-ui/core/Typography";
import ListSubheader from "@material-ui/core/ListSubheader";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#7e5dc0",
      main: "#5e35b1",
      dark: "#41257b",
      contrastText: "#fff",
    },
    secondary: {
      light: "#637bfe",
      main: "#3d5afe",
      dark: "#2a3eb1",
      contrastText: "#fff",
    },
  },
});

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
