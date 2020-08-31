import React from "react";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Box, Grid } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Rating from "@material-ui/lab/Rating";
import Avatar from "@material-ui/core/Avatar";

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

const useStyles = makeStyles({
  root: {
    minWidth: 275,
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
});

export default function BlankReview(props) {
  const classes = useStyles();
  console.log("review: ", props);

  return (
    <Grid item xs={11} md={6} lg={5} style={{ margin: "auto" }}>
      <Box width={0.95} m={"auto"}>
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Typography
              variant="body2"
              component="p"
              style={{ marginTop: "1rem" }}
            >
              Hmm...No reviews for this beer yet. Be the first!
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Grid>
  );
}
