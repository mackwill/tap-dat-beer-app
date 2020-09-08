import React from "react";
import { makeStyles, MuiThemeProvider } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";

import List from "@material-ui/core/List";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Review from "../Review/Review";
import { GridList, Grid } from "@material-ui/core";
import theme from "../Styles/Theme";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MyReviews(props) {
  const classes = useStyles();

  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <Dialog
          fullScreen
          open={props.open}
          onClose={props.close}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={props.close}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <List>
            <Grid container spacing={3}>
              {props.reviews &&
                props.reviews.map((review) => {
                  return <Review {...review} myReview={true} />;
                })}
            </Grid>
          </List>
        </Dialog>
      </MuiThemeProvider>
    </div>
  );
}
