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
import Slide from "@material-ui/core/Slide";
import { Box, Grid } from "@material-ui/core";
import ShareIcon from "@material-ui/icons/Share";
import FavoriteIcon from "@material-ui/icons/Favorite";
import UnderBeer from "./UnderBeer";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Alert from "@material-ui/lab/Alert";
import useMediaQuery from "@material-ui/core/useMediaQuery";
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "sticky",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  desktopList: {
    backgroundColor: "#f0f0f0",
    display: "flex",
    height: "100%",
  },
  mobileList: {
    backgroundColor: "#f0f0f0",
  },
  desktopBeer: {
    display: "flex",
    flexDirection: "column",
    padding: "0 3rem",
    justifyContent: "flex-start",
  },
  desktopUnder: {
    alignItems: "flex-start",
    flexGrow: "1",
    overflowY: "auto",
    overflowX: "hidden",
  },
  gridContainer: {
    justifyContent: "center",
    marginTop: "0.2rem",
    marginBottom: "0.2rem",
  },
  breweryLink: {
    "&:hover": {
      textDecoration: "solid",
    },
  },
  reviewButtonSection: {
    height: "2rem",
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
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      tablet: 640,
      md: 960,
      laptop: 1025,
      lg: 1280,
      xl: 1920,
    },
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProductDetail(props) {
  const medium = useMediaQuery(theme.breakpoints.up("md"));
  const laptop = useMediaQuery(theme.breakpoints.up("laptop"));

  const [reviewed, setReviewed] = useState(false);
  const classes = useStyles();

  const hasAlreadyReviewed = () => {
    const reviewedBeers = props.reviews.filter(
      (review) => review.user_id === props.currentUser.id
    );
    return reviewedBeers.length > 0;
  };
  const fakeIBU = Math.floor(Math.random() * 100);

  useEffect(() => {
    if (props.currentUser) {
      const hasReviewed = hasAlreadyReviewed();
      setReviewed(hasReviewed);
    } else {
      setReviewed(false);
    }
  }, [props.currentBeer, props.reviews]);

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

          <List
            className={`${medium ? classes.desktopList : classes.mobileList}`}
          >
            <div className={`${laptop ? classes.desktopBeer : ""}`}>
              <ListItem>
                <Box width={1}>
                  <Typography align="center" variant="h6">
                    {props.currentBeer.name}
                  </Typography>
                  <Box display={"flex"} justifyContent={"center"}>
                    <Typography
                      align="center"
                      style={{ opacity: "0.6", color: "inherit" }}
                      variant="subtitle1"
                      component="a"
                      onClick={() =>
                        props.searchByBrewery(props.currentBeer.brewery)
                      }
                    >
                      {props.currentBeer.brewery}
                    </Typography>
                  </Box>
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
                    minWidth: "350px",
                  }}
                  src={props.currentBeer.beer_image}
                  onError={imgError}
                />
              </ListItem>

              <ListItem>
                <Box display="block" width={0.9} margin={"auto"}>
                  <Divider />

                  <Grid container spacing={2} className={classes.gridContainer}>
                    <Grid container item xs={3} spacing={1} textAlign="center">
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
                          {props.currentBeer.avg_rank
                            ? props.currentBeer.avg_rank
                            : "--"}
                          /5
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                  <Divider />
                </Box>
                <Divider />
              </ListItem>

              <ListItem>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  width={1}
                  textAlign="right"
                  alignItems={"center"}
                >
                  <IconButton>
                    <FavoriteIcon
                      color="secondary"
                      onClick={props.handleAddToWishlist}
                    />
                  </IconButton>
                  {!props.currentUser ||
                    (!reviewed && (
                      <Button
                        className={classes.reviewButtonSection}
                        variant="contained"
                        color="secondary"
                        onClick={props.openForm}
                      >
                        Review
                      </Button>
                    ))}
                  {!props.currentUser && (
                    <Alert severity="warning">
                      <a
                        href="javascript:void(0)"
                        onClick={() => props.setRegisterOpen(true)}
                      >
                        Register
                      </a>{" "}
                      to leave a review
                    </Alert>
                  )}
                  {reviewed && (
                    <Alert severity="warning">Reviewed by you</Alert>
                  )}
                  <IconButton>
                    <ShareIcon
                      color="secondary"
                      onClick={props.handleShareOptionOpen}
                    />
                  </IconButton>
                </Box>
                <Divider />
              </ListItem>
            </div>
            <ListItem className={`${medium ? classes.desktopUnder : ""}`}>
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
