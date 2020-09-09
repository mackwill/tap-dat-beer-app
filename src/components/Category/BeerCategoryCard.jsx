import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 365,
    backgroundColor: "#ffffff",
  },
  media: {
    height: "9rem",
    backgroundSize: "contain",
    objectFit: "contain",
    padding: "0.5rem",
    width: "90%",
    margin: "auto",
  },
  header: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    height: "3rem",
    paddingTop: "1.25rem",
  },
  headerTypography: {
    fontSize: "1rem",
    fontFamily: ["Oswald", "sans-serif"],
  },
  subHeaderTypography: {
    fontSize: "0.6rem",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  footer: {
    height: "2rem",
  },
  icon: {
    fontSize: "1rem",
  },
}));

const beerTypes = {
  Ale: "images/category_ale.svg",
  Porter: "images/category_porter.svg",
  Lager: "images/category_lager.svg",
  Malt: "images/category_malt.svg",
  "Flavoured Malt": "images/category_flavoured_malt.svg",
  Stout: "images/category_stout.svg",
};

export default function BeerItemCard(props) {
  const classes = useStyles();

  const imgError = (e) => {
    e.target.onerror = null;
    e.target.src = "images/beer_placeholder.png";
  };

  const cardHeader = (
    <Typography className={classes.headerTypography} variant="p" component="p">
      {props.title}
    </Typography>
  );

  return (
    <Card className={classes.root} variant="outlined">
      <CardHeader className={classes.header} title={cardHeader} />
      <CardMedia
        className={classes.media}
        src={beerTypes[props.title]}
        component="img"
        onError={imgError}
      />
    </Card>
  );
}
