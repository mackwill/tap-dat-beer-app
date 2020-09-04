import React, { useState, useEffect, useRef, useCallback } from "react";
import Dialog from "@material-ui/core/Dialog";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import LocalDrinkIcon from "@material-ui/icons/LocalDrink";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

import Results from "../Search/Results";
import SearchBar from "../Search/SearchBar";
import axios from "axios";
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
  const [searchResults, setSearchResults] = useState([]);
  const [popularSearch, setPopularSearch] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const classes = useStyles();

  const onChangeSearch = (e) => {
    props.setSearchQuery(e.target.value);
  };

  useEffect(() => {
    console.log("is this being called");
    return axios
      .get("/api/search/analytics")
      .then((data) => setPopularSearch(data.data.finalData))
      .catch((e) => null);
  }, []);

  useEffect(() => {
    setPageNumber(1);
    axios
      .get(`/api/search?q=${encodeURI(props.searchQuery)}&page=1&limit=10`)
      .then((data) => {
        setSearchResults(data.data.results);
        if (data.data.next) {
          setPageNumber(data.data.next.page);
        } else {
          setPageNumber(null);
        }
      })
      .catch((e) => console.log("Error on search query:", e));
  }, [props.searchQuery]);

  const loadMore = () => {
    if (!pageNumber) return;
    axios
      .get(
        `/api/search?q=${encodeURI(
          props.searchQuery
        )}&page=${pageNumber}&limit=10`
      )
      .then((data) => {
        if (data.data.next) {
          setPageNumber(data.data.next.page);
        } else {
          setPageNumber(null);
        }
        const newResults = [...searchResults, ...data.data.results];
        setSearchResults(newResults);
      });
  };

  const close = () => {
    props.close();
    setSearchResults([]);
  };

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
                onClick={close}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                <div className={classes.search}>
                  <SearchBar
                    onChangeSearch={onChangeSearch}
                    searchQuery={props.searchQuery}
                  />
                </div>
              </Typography>
            </Toolbar>
          </AppBar>
          {searchResults.length === 0 && (
            <Results
              onClick={props.onClick}
              searchResults={popularSearch}
              title="Popular Search"
            />
          )}

          {searchResults.length > 0 && (
            <Results
              onClick={props.onClick}
              searchResults={searchResults}
              title="Search Result"
              loadMore={loadMore}
              pageNumber={pageNumber}
            />
          )}
        </Dialog>
      </div>
    </MuiThemeProvider>
  );
}
