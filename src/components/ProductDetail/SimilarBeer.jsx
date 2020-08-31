import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import { getSimilarBeers } from "../../Helpers/SimilarBeer";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  title: {
    color: "#fff",
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
}));

export default function TitlebarGridList(props) {
  const classes = useStyles();
  const tileData = getSimilarBeers(props.currentBeer, props.beers);
  const imgError = (e) => {
    e.target.onerror = null;
    e.target.src = "images/beer_placeholder.png";
  };
  return (
    <div className={classes.root}>
      <GridList cellHeight={"200"} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
          <ListSubheader component="div">
            Similar Beers to {props.currentBeer.name}{" "}
          </ListSubheader>
        </GridListTile>

        {tileData.map((beer) => (
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
    </div>
  );
}
