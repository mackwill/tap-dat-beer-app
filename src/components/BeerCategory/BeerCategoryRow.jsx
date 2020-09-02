import React from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import BeerCategory from "./BeerCategory";
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
  let columns = 2.5;
  const categories = [
    {
      title: "Last Dual",
      image: "images/banner_stout.jpg",
      description: "Lager",
    },
    { title: "Ale", image: "images/banner_stout.jpg", description: "45 Ale" },
    {
      title: "Lager",
      image: "images/banner_stout.jpg",
      description: "29 Lager",
    },
    { title: "Malt", image: "images/banner_stout.jpg", description: "12 Malt" },
  ];
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
            Browse By Categories
          </Typography>
        </Box>

        <Box width={1}>
          <GridList
            className={classes.gridList}
            cols={columns}
            cellHeight={"200"}
            width={1}
          >
            {categories.map((category) => (
              <BeerCategory category={category} />
            ))}
          </GridList>
        </Box>
      </Box>
    </div>
  );
}
