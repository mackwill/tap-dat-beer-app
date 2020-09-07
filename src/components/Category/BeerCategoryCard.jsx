import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";

import Collapse from "@material-ui/core/Collapse";

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
    // paddingTop: "100%", // 16:9
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
  "Ale":
    "https://oiygp3l4k8i1mg345xogudk6-wpengine.netdna-ssl.com/wp-content/uploads/2019/03/Bitmap.svg",
  "Porter":
    "https://oiygp3l4k8i1mg345xogudk6-wpengine.netdna-ssl.com/wp-content/uploads/2019/03/Bitmap4.svg",
  "Lager":
    "https://oiygp3l4k8i1mg345xogudk6-wpengine.netdna-ssl.com/wp-content/uploads/2019/03/Bitmap1.svg",
  "Malt":
    "https://oiygp3l4k8i1mg345xogudk6-wpengine.netdna-ssl.com/wp-content/uploads/2019/03/Bitmap2.svg",
  "Flavoured Malt":
    "https://oiygp3l4k8i1mg345xogudk6-wpengine.netdna-ssl.com/wp-content/uploads/2019/03/Bitmap2.svg",
  "Stout":
    "https://oiygp3l4k8i1mg345xogudk6-wpengine.netdna-ssl.com/wp-content/uploads/2019/03/Bitmap4.svg",
};

export default function BeerItemCard(props) {
  console.log("props: ", props);
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const imgError = (e) => {
    e.target.onerror = null;
    e.target.src = "images/beer_placeholder.png";
  };

  const cardHeader = (
    <Typography className={classes.headerTypography} variant="p" component="p">
      {props.title}
    </Typography>
  );

  const cardSubHeader = (
    <Typography
      className={classes.subHeaderTypography}
      variant="p"
      component="p"
    >
      {props.brewery}
    </Typography>
  );

  return (
    <Card className={classes.root} variant="outlined">
      <CardHeader className={classes.header} title={cardHeader} />
      <CardMedia
        className={classes.media}
        // image={props.beer_image}
        // title={props.name}s
        src={beerTypes[props.title]}
        component="img"
        onError={imgError}
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit></Collapse>
    </Card>
  );
}
