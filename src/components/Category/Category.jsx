import React from "react";
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
    marginTop: "0.5rem",
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
    e.target.src = "images/beer_placeholder.png";
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
            {props.beers.map((beer) => (
              <GridListTile
                id={beer.id}
                key={beer.id}
                component="a"
                href="JavaScript:void(0);"
                onClick={() => props.onClick(beer.id)}
                style={{
                  border: "2px solid black",
                  borderRadius: "10px",
                  marginLeft: "0.2rem",
                  marginRight: "0.2rem",
                }}
              >
                <img
                  style={{ borderRadius: "10px" }}
                  id={beer.id}
                  src={beer.beer_image}
                  onError={imgError}
                />

                <Box id={beer.id}>
                  <GridListTileBar
                    key={`${beer.id}-beer`}
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
