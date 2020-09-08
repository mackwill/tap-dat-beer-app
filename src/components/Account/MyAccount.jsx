import React from "react";
import {
  makeStyles,
  MuiThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { Box, Avatar } from "@material-ui/core";
import UserDetails from "./UserDetails";
import AccountMenuBar from "./AccountMenuBar";
import useMediaQuery from "@material-ui/core/useMediaQuery";

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
      main: "#EC9D00 !important",
      dark: "#a56d00",
      contrastText: "#fff",
    },
  },
  overrides: {
    MuiPaper: {
      root: {
        backgroundColor: "#f0f0f0",
      },
    },
  },
});

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "sticky",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    fontFamily: ["Oswald", "sans-serif"],
  },
  avatar: {
    color: theme.palette.secondary.contrastText,
    backgroundColor: "#EC9D00",
    width: "5rem",
    height: "5rem",
  },
  desktopList: {
    backgroundColor: "#f0f0f0",
    display: "flex",
    justifyContent: "space-between",
    height: "100%",
  },
  mobileList: {
    backgroundColor: "#f0f0f0",
  },
  desktopBeer: {
    display: "flex",
    flexDirection: "column",
    flexGrow: "1",
    padding: "0 3rem",
    justifyContent: "flex-start",
  },
  desktopUnder: {
    alignItems: "flex-start",
    flexGrow: "1",
    overflowY: "auto",
  },
  listItem: {
    justifyContent: "center",
  },
  dialog: {
    backgroundColor: "#f0f0f0",
    container: {
      backgroundColor: "#f0f0f0",
    },
  },
  displayName: {
    fontFamily: ["Oswald", "sans-serif"],
    fontWeight: 400,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProductDetail(props) {
  const medium = useMediaQuery(theme.breakpoints.up("md"));
  const classes = useStyles(theme);

  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <Dialog
          fullScreen
          open={props.open}
          onClose={props.handleClose}
          TransitionComponent={Transition}
          className={classes.dialog}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={props.handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Account Details
              </Typography>
            </Toolbar>
          </AppBar>
          <List
            className={`${medium ? classes.desktopList : classes.mobileList}`}
          >
            <div className={`${medium ? classes.desktopBeer : ""}`}>
              <ListItem style={{ display: "flex", justifyContent: "center" }}>
                <Avatar className={classes.avatar}>
                  {props.firstName[0]}
                  {props.lastName[0]}
                </Avatar>
              </ListItem>
              <ListItem>
                <Box width={1} textAlign="center">
                  <Typography className={classes.displayName} variant="h6">
                    {props.firstName}
                    {` `}
                    {props.lastName}
                  </Typography>
                </Box>
              </ListItem>
              <ListItem className={classes.listItem}>
                <UserDetails
                  changeAccountDetails={props.changeAccountDetails}
                  first_name={props.firstName}
                  last_name={props.lastName}
                  email={props.email}
                />
              </ListItem>
            </div>
            <ListItem
              className={`${medium ? classes.desktopUnder : ""}`}
              style={{ overflow: "auto" }}
            >
              <AccountMenuBar
                onClick={props.handleBeerDetailClick}
                beers={props.beers}
                reviews={props.reviews}
                handleDeleteMyReview={props.handleDeleteMyReview}
                handleEditReviewOpen={props.handleEditReviewOpen}
                handleConfirmDeleteOpen={props.handleConfirmDeleteOpen}
              />
            </ListItem>
          </List>
        </Dialog>
      </MuiThemeProvider>
    </div>
  );
}
