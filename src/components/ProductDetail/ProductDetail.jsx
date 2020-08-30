import React from "react";
import {
  makeStyles,
  MuiThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
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
import { Box, Grid } from "@material-ui/core";
import Review from "../Review/Review";

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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProductDetail(props) {
  const classes = useStyles();

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
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Beer Detail
              </Typography>
            </Toolbar>
          </AppBar>
          <List>
            <ListItem style={{ display: "flex", justifyContent: "center" }}>
              <img src={props.currentBeer.beer_image} />
            </ListItem>
            <ListItem>
              <Box width={1} textAlign="center">
                <Typography variant="h6">{props.currentBeer.name}</Typography>
              </Box>
            </ListItem>
            <ListItem>
              <Box width={1} textAlign="center">
                <Typography variant="p">{props.currentBeer.brewery}</Typography>
              </Box>
            </ListItem>
            <ListItem style={{ width: "60%", margin: "auto" }}>
              <Grid container spacing={1} textAlign="center">
                <Grid container item xs={6} spacing={1}>
                  <Box m={"auto"}>
                    <Typography variant="p">
                      ABV: {props.currentBeer.abv}
                    </Typography>
                  </Box>
                </Grid>
                <Grid container item xs={6} spacing={1}>
                  <Box m={"auto"}>
                    <Typography variant="p">IBU: --</Typography>
                  </Box>
                </Grid>
                <Grid container item xs={6} spacing={1}>
                  <Box m={"auto"}>
                    <Typography variant="p">
                      Type: {props.currentBeer.type}
                    </Typography>
                  </Box>
                </Grid>
                <Grid container item xs={6} spacing={1}>
                  <Box m={"auto"}>
                    <Typography variant="p">Rating: --</Typography>
                  </Box>
                </Grid>
              </Grid>
            </ListItem>
            <Divider />
            <ListItem button>
              <Typography variant="h4" component="h4">
                Reviews:
              </Typography>
            </ListItem>
            <Grid container spacing={3}>
              {props.reviews &&
                props.reviews.map((review) => {
                  return <Review {...review} />;
                })}
            </Grid>
          </List>
          <Button variant="contained" color="primary">
            Review
          </Button>
        </Dialog>
      </MuiThemeProvider>
    </div>
  );
}
