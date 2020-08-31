import React from "react";
import BeerCard from "./BeerCard";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import StarBorderIcon from "@material-ui/icons/StarBorder";

import "./Category.css";
import { GridList, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  title: {
    // color: theme.palette.primary.light,
    color: "#fff",
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
}));

export default function Category(props) {
  let first10Beers = [];

  if (props.beers.length > 10) {
    for (let i = 0; i < 10; i++) {
      first10Beers.push(props.beers[i]);
    }
  } else {
    first10Beers = [...props.beers];
  }

  let columns = 2.5;

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

  const imgError = (e) => {
    e.target.onerror = null;
    e.target.src =
      "data:image/png;base64,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";
  };

  const classes = useStyles();
  return (
    <div>
      <Box component="div" width={0.9} className={classes.root} m={"auto"}>
        {/* <h3 className="category_title">Popular >></h3> */}
        <Box width={1} component="h3" mb={"1rem"} mt={"1rem"} textAlign="left">
          <Typography variant="h5" component="h3" mb={2}>
            {props.category}
          </Typography>
        </Box>

        {/* <Grid container spacing={3} justify="space-around"> */}
        <Box width={1}>
          <GridList
            className={classes.gridList}
            cols={columns}
            cellHeight={"200"}
            width={1}
          >
            {/* <Grid item xs={12} sm={4} md={3} lg={3}>
            <BeerCard beer={props.beers[2]} />
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={3}>
            <BeerCard beer={props.beers[3]} />
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={3}>
            <BeerCard beer={props.beers[4]} />
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={3}>
            <BeerCard beer={props.beers[5]} />
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={3}>
            <BeerCard beer={props.beers[6]} />
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={3}>
            <BeerCard beer={props.beers[7]} />
          </Grid> */}

            {first10Beers.map((beer) => (
              <GridListTile
                id={beer.id}
                key={beer.beer_image}
                component="a"
                href="JavaScript:void(0);"
                onClick={() => props.onClick(beer.id)}
              >
                <img id={beer.id} src={beer.beer_image} onError={imgError} />

                <Box id={beer.id}>
                  <GridListTileBar
                    key={beer.id}
                    title={beer.name}
                    classes={{ root: classes.titleBar, title: classes.title }}
                  />
                </Box>
              </GridListTile>
            ))}
          </GridList>
        </Box>

        {/* </Grid> */}
      </Box>
    </div>
  );
}
