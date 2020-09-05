import React, { useEffect, useState } from "react";
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
import { Box, Grid } from "@material-ui/core";
import ShareIcon from "@material-ui/icons/Share";
import FavoriteIcon from "@material-ui/icons/Favorite";
import UnderBeer from "./UnderBeer";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import MenuIcon from "@material-ui/icons/Menu";
import Alert from "@material-ui/lab/Alert";

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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProductDetail(props) {
  const [reviewed, setReviewed] = useState(false);
  const classes = useStyles();

  const hasAlreadyReviewed = (reviews, currentId) => {
    const reviewedBeers = reviews.filter(
      (review) => review.user_id === currentId
    );
    console.log("reviewed beers", reviewedBeers.length);
    return reviewedBeers.length > 0;
  };
  const fakeIBU = Math.floor(Math.random() * 100);

  useEffect(() => {
    if (
      props.curerentUser &&
      hasAlreadyReviewed(props.reviews, props.currentUser.id)
    ) {
      setReviewed(true);
    } else {
      setReviewed(false);
    }
    console.log("reviewed: ", reviewed);
  }, [props.currentBeer]);

  const imgError = (e) => {
    e.target.onerror = null;
    e.target.src = "images/beer_placeholder.png";
  };

  return (
    <div>
      <MuiThemeProvider theme={theme}>
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
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Beer Detail
              </Typography>
            </Toolbar>
          </AppBar>

          <List style={{ backgroundColor: "#f0f0f0" }}>
            <ListItem>
              <Box width={1}>
                <Typography align="center" variant="h6">
                  {props.currentBeer.name}
                </Typography>
                <Typography
                  align="center"
                  style={{ opacity: "0.6" }}
                  variant="subtitle1"
                >
                  {props.currentBeer.brewery}
                </Typography>
              </Box>
            </ListItem>
            <ListItem
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                style={{
                  borderRadius: "10px",
                  border: "1px solid #a9a9a9",
                  marginBottom: "1rem",
                }}
                src={props.currentBeer.beer_image}
                onError={imgError}
              />
            </ListItem>

            <Divider />

            <ListItem style={{ margin: "auto" }}>
              <Grid container spacing={1} textAlign="center">
                <Grid container item xs={3} spacing={1}>
                  <Box m={"auto"}>
                    <Typography variant="p">
                      ABV: {props.currentBeer.abv}%
                    </Typography>
                  </Box>
                </Grid>
                <Grid container item xs={3} spacing={1}>
                  <Box m={"auto"}>
                    <Typography variant="p">IBU: {fakeIBU}</Typography>
                  </Box>
                </Grid>
                <Grid container item xs={3} spacing={1}>
                  <Box m={"auto"}>
                    <Typography variant="p">
                      {props.currentBeer.type}
                    </Typography>
                  </Box>
                </Grid>
                <Grid container item xs={3} spacing={1}>
                  <Box m={"auto"}>
                    <Typography variant="p">
                      {props.currentBeer.avg_rank}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </ListItem>

            <Divider />
            <ListItem>
              <Box
                style={{ display: "flex", justifyContent: "space-between" }}
                width={1}
                textAlign="right"
              >
                {props.currentUser && props.reviews && !reviewed && (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={props.openForm}
                  >
                    Review
                  </Button>
                )}
                {props.currentUser && props.reviews && reviewed && (
                  <Alert severity="info">
                    You've alrady reviewed this beer
                  </Alert>
                )}
                <IconButton>
                  <ShareIcon
                    color="secondary"
                    onClick={props.handleShareOptionOpen}
                  />
                </IconButton>
                <IconButton>
                  <FavoriteIcon
                    color="secondary"
                    onClick={props.handleAddToWishlist}
                  />
                </IconButton>
              </Box>
            </ListItem>
            <Divider />

            <ListItem>
              <UnderBeer
                setOpenSB={props.setOpenSB}
                beers={props.beers}
                currentBeer={props.currentBeer}
                reviews={props.reviews}
                currentUser={props.currentUser}
                userNote={props.userNote}
                onClick={props.onClick}
                setUserNote={props.setUserNote}
              />
            </ListItem>
          </List>
        </Dialog>
      </MuiThemeProvider>
    </div>
  );
}
