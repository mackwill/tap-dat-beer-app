import React from "react";
import {
  makeStyles,
  MuiThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { Box, Grid, Avatar } from "@material-ui/core";
import UserDetails from "./UserDetails";
import AccountMenuBar from "./AccountMenuBar";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const rootTheme = createMuiTheme({
  palette: {
    primary: {
      light: "#7e5dc0",
      main: "#005792",
      dark: "#41257b",
      contrastText: "#fff",
    },
    secondary: {
      light: "#637bfe",
      main: "#318fb5",
      dark: "#2a3eb1",
      contrastText: "#fff",
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
  },
  mainBlue: {
    color: rootTheme.palette.secondary.contrastText,
    backgroundColor: rootTheme.palette.secondary.main,
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
    overflow: "auto",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProductDetail(props) {
  const small = useMediaQuery(rootTheme.breakpoints.up("sm"));
  const medium = useMediaQuery(rootTheme.breakpoints.up("md"));
  const large = useMediaQuery(rootTheme.breakpoints.up("lg"));
  const classes = useStyles();

  return (
    <div>
      <MuiThemeProvider theme={rootTheme}>
        <Dialog
          fullScreen
          open={props.open}
          onClose={props.handleClose}
          TransitionComponent={Transition}
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
                <Avatar className={classes.mainBlue}>
                  {props.firstName[0]}
                  {props.lastName[0]}
                </Avatar>
              </ListItem>
              <ListItem>
                <Box width={1} textAlign="center">
                  <Typography variant="h6">
                    {props.firstName} {props.lastName}
                  </Typography>
                </Box>
              </ListItem>
              <ListItem>
                <UserDetails
                  changeAccountDetails={props.changeAccountDetails}
                  first_name={props.firstName}
                  last_name={props.lastName}
                  email={props.email}
                />
              </ListItem>
            </div>
            <ListItem className={`${medium ? classes.desktopUnder : ""}`}>
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
