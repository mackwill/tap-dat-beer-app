import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Results from "../Search/Results";
import SearchBar from "../Search/SearchBar";
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
  const classes = useStyles();

  const popularSearchesList = props.popularSearch.map((elm) => {
    return (
      <>
        <ListItem button>
          <ListItemAvatar>
            <Avatar className={classes.orange} src={elm.beer_image} />
          </ListItemAvatar>
          <ListItemText primary={elm.name} secondary={elm.brewery} />
        </ListItem>
        <Divider />
      </>
    );
  });

  return (
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
          <List>
            <ListSubheader component="div">Popular Search</ListSubheader>
            {popularSearchesList}
          </List>
        )}
        {props.searchResults && <Results data={props.searchResults} />}
      </Dialog>
    </div>
  );
}
