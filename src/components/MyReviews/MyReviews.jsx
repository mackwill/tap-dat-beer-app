import React from "react";
import {
  fade,
  makeStyles,
  MuiThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Review from "../Review/Review";
import { Grid } from "@material-ui/core";

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
      light: "#71a0be",
      main: "#4e89ae",
      dark: "#365f79",
      contrastText: "#fff",
    },
    secondary: {
      light: "#efb033",
      main: "#EC9D00",
      dark: "#a56d00",
      contrastText: "#fff",
    },
  },
});

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
