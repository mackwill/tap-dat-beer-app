import React, { useState, useEffect } from "react";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Box, Grid, IconButton } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Rating from "@material-ui/lab/Rating";
import Avatar from "@material-ui/core/Avatar";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ConfirmDelete from "../../components/MyReviews/ConfirmDelete";
import LocalDrinkIcon from "@material-ui/icons/LocalDrink";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
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
const useStyles = makeStyles(() => ({
  root: {
    minWidth: 275,
    backgroundColor: "#ffffff",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  mainBlue: {
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.secondary.main,
    marginRight: "0.5rem",
  },
  iconBlue: {
    color: theme.palette.secondary.main,
  },
}));
export default function Review(props) {
  console.log("props: ", props);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const handleConfirmDeleteOpen = (e) => {
    setConfirmDeleteOpen(true);
  };

  const handleConfirmDeleteClose = (e) => {
    setConfirmDeleteOpen(false);
  };

  const classes = useStyles();

  return (
    <Grid item xs={12} md={12} lg={6}>
      <Box m={"auto"}>
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Box
              component="div"
              display="flex"
              alignItems="center"
              width={1}
              mb={0.5}
              justifyContent="space-between"
            >
              {!props.myReviews && props.first_name && (
                <Box component="div" display="flex" alignItems="center">
                  <Avatar className={classes.mainBlue}>
                    {props.first_name[0]}
                  </Avatar>
                  <Typography variant="h5" component="h5">
                    {props.first_name}
                  </Typography>
                </Box>
              )}
              {props.beer_name && (
                <Box component="div" display="flex" alignItems="center">
                  <ListItemAvatar>
                    <Avatar src={props.beer_image}>
                      <LocalDrinkIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <Typography variant="p" component="p">
                    {props.beer_name}
                  </Typography>
                </Box>
              )}
              <Box textAlign="right">
                <Rating
                  name="read-only"
                  value={props.rank / 2}
                  precision={0.25}
                  readOnly
                />
              </Box>
            </Box>
            <Divider />
            <Grid
              container
              spacing={1}
              textAlign="center"
              style={{ paddingTop: "0.5rem", paddingBottom: "0.5rem" }}
            >
              <Grid container item xs={6} spacing={1}>
                <Box m={"auto"}>
                  <Typography variant="p">Sweet: {props.sweet}/5</Typography>
                </Box>
              </Grid>
              <Grid container item xs={6} spacing={1}>
                <Box m={"auto"}>
                  <Typography variant="p">Sour: {props.sour}/5</Typography>
                </Box>
              </Grid>
              <Grid container item xs={6} spacing={1}>
                <Box m={"auto"}>
                  <Typography variant="p">Bitter: {props.bitter}/5</Typography>
                </Box>
              </Grid>
              <Grid container item xs={6} spacing={1}>
                <Box m={"auto"}>
                  <Typography variant="p">Hoppy: {props.hoppy}/5</Typography>
                </Box>
              </Grid>
            </Grid>
            <Divider />
            <Typography
              variant="body2"
              component="p"
              style={{ marginTop: "1rem" }}
            >
              {props.review}
            </Typography>
          </CardContent>
          {!props.myReviews && (
            <CardActions
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Typography style={{ opacity: "0.7" }} variant="p">
                {new Intl.DateTimeFormat("en-US").format(
                  new Date(props.creation_date)
                )}
              </Typography>
            </CardActions>
          )}
          {props.myReviews && (
            <CardActions
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div>
                <IconButton>
                  <EditIcon
                    className={classes.iconBlue}
                    onClick={() => props.handleEditReviewOpen(props.id)}
                  />
                </IconButton>
                <IconButton>
                  <DeleteIcon
                    className={classes.iconBlue}
                    onClick={handleConfirmDeleteOpen}
                  />
                </IconButton>
              </div>
              <Typography
                style={{ opacity: "0.7", justifyContent: "flex-end" }}
                variant="p"
              >
                {new Intl.DateTimeFormat("en-US").format(
                  new Date(props.creation_date)
                )}
              </Typography>
            </CardActions>
          )}
        </Card>
      </Box>
      {confirmDeleteOpen && (
        <ConfirmDelete
          open={confirmDeleteOpen}
          close={handleConfirmDeleteClose}
          reviewId={props.id}
          handleDeleteMyReview={props.handleDeleteMyReview}
        />
      )}
    </Grid>
  );
}
