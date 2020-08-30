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

export default function Review(props) {
  const classes = useStyles();
  console.log("review: ", props);

  return (
    <Grid item xs={11} md={6} lg={5} style={{ margin: "auto" }}>
      <Box width={0.95} m={"auto"}>
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
              <Box component="div" display="flex" alignItems="center">
                <Avatar className={classes.mainBlue}>
                  {props.first_name[0]}
                </Avatar>
                <Typography variant="h5" component="h5">
                  {props.first_name}
                </Typography>
              </Box>

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
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </Box>
    </Grid>
  );
}