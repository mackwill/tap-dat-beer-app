import React from "react";
import Box from "@material-ui/core/Box";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import GridListTile from "@material-ui/core/GridListTile";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import BeerItemCard from "./BeerItemCard";

import "./Category.css";
import { GridList, Typography, Divider } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#7e5dc0",
      main: "#4e89ae",
      dark: "#41257b",
      contrastText: "#fff",
    },
    secondary: {
      light: "#637bfe",
      main: "#3d5afe",
      dark: "#2a3eb1",
      contrastText: "#fff",
    },
    defaultBackground: {
      main: "#f0f0f0",
    },
  },
});

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.defaultBackground.main,
  },
  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
  },
  title: {
    color: "#fff",
  },
  titleBar: {
    marginTop: "0.5rem",
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
}));

export default function Category(props) {
  let columns = 2.25;

  const theme = useTheme();
  const xsmall = useMediaQuery(theme.breakpoints.up("xs"));
  const betweenXSAndS = useMediaQuery("(min-width: 425px)");
  const small = useMediaQuery(theme.breakpoints.up("sm"));
  const medium = useMediaQuery(theme.breakpoints.up("md"));
  const large = useMediaQuery(theme.breakpoints.up("lg"));

  if (large) {
    columns = 6;
  } else if (medium) {
    columns = 5;
  } else if (small) {
    columns = 4;
  } else if (betweenXSAndS) {
    columns = 3;
  }

  const classes = useStyles();
  return (
    <div>
      <Box component="div" width={0.9} className={classes.root} m={"auto"}>
        <Box width={1} component="h3" mb={"1rem"} mt={"1rem"} textAlign="left">
          <Typography variant="h5" component="h3" mb={2}>
            {props.category}
          </Typography>
        </Box>

        <Box width={1}>
          <GridList
            className={classes.gridList}
            cols={columns}
            cellHeight={"250"}
            width={1}
          >
            {props.beers.map((beer) => (
              <GridListTile
                id={beer.id}
                key={beer.id}
                component="a"
                href="JavaScript:void(0);"
                onClick={() => props.onClick(beer.id)}
              >
                <BeerItemCard {...beer} />
              </GridListTile>
            ))}
          </GridList>

          <Divider />
        </Box>
      </Box>
    </div>
  );
}
