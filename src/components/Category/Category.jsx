import React from "react";
import Box from "@material-ui/core/Box";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import GridListTile from "@material-ui/core/GridListTile";
import "../../index.css";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import BeerItemCard from "./BeerItemCard";

import "./Category.css";
import { GridList, Typography, Divider } from "@material-ui/core";
import theme from "../Styles/Theme";

const useStyles = makeStyles(() => ({
  root: {
    fontFamily: ["Oswald", "sans-serif"],
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
  beerItemCard: {
    "&:hover": {
      textDecoration: "none",
    },
  },
  titleBar: {
    marginTop: "0.5rem",
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  typography: {
    fontFamily: "Oswald",
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
    columns = 2.75;
  }

  const classes = useStyles();
  return (
    <div>
      <Box component="div" width={0.9} className={classes.root} m={"auto"}>
        <Box
          width={1}
          component="h3"
          mb={"1rem"}
          mt={"1rem"}
          textAlign="center"
        >
          {/* <ThemeProvider theme={theme}> */}
          <Typography
            variant="h5"
            component="h3"
            mb={2}
            className={classes.typography}
          >
            {props.category}
          </Typography>
          {/* </ThemeProvider> */}
          <Box mt={"1rem"}>
            <Divider />
          </Box>
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
                className={classes.beerItemCard}
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
