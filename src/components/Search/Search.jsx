import React from "react";
import Dialog from "@material-ui/core/Dialog";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

import Results from "../Search/Results";
import SearchBar from "../Search/SearchBar";
import {
  makeStyles,
  MuiThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
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

export default function FullScreenDialog(props) {
  const classes = useStyles();

  return (
    <MuiThemeProvider theme={theme}>
      <div>
        <Dialog
          fullScreen
          open={props.open}
          // onClose={props.close}
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
              <Typography variant="h6" className={classes.title}>
                <div className={classes.search}>
                  <SearchBar
                    onChangeSearch={props.onChangeSearch}
                    searchQuery={props.searchQuery}
                  />
                </div>
              </Typography>
            </Toolbar>
          </AppBar>
          {!props.searchResults && (
            <Results
              onClick={props.onClick}
              searchResults={props.popularSearch}
              title="Popular Search"
            />
          )}

          {props.searchResults && (
            <Results
              onClick={props.onClick}
              searchResults={props.searchResults}
              title="Search Result"
            />
          )}
        </Dialog>
      </div>
    </MuiThemeProvider>
  );
}
