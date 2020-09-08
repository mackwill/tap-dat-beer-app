import React from "react";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Box, Grid } from "@material-ui/core";

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

const useStyles = makeStyles({
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
});

export default function BlankReview(props) {
  const classes = useStyles();
  console.log("review: ", props);

  return (
    <Grid item xs={12} md={12} lg={12} style={{ margin: "auto" }}>
      <Box m={"auto"}>
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Box width={1} display={"flex"} justifyContent={"center"}>
              <Typography
                variant="body2"
                component="p"
                style={{ marginTop: "1rem" }}
              >
                {props.text}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Grid>
  );
}
