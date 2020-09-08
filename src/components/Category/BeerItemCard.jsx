import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    textDecoration: "none",
    maxWidth: 365,
    backgroundColor: "#ffffff",
  },
  media: {
    height: "9rem",
    backgroundSize: "contain",
    objectFit: "contain",
    width: "85%",
    margin: "auto",
    borderRadius: "5px",
  },
  header: {
    display: "flex",
    alignItems: "start",
    height: "3rem",
    paddingTop: "0.25rem",
  },
  headerTypography: {
    fontSize: "0.8rem",
    textAlign: "center",
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

export default function BeerItemCard(props) {
  const classes = useStyles();

  const imgError = (e) => {
    e.target.onerror = null;
    e.target.src = "images/beer_placeholder.png";
  };

  const cardHeader = (
    <Typography className={classes.headerTypography} variant="p" component="p">
      {props.name}
    </Typography>
  );

  return (
    <Card className={classes.root} variant="outlined">
      <CardHeader className={classes.header} title={cardHeader} />
      <CardMedia
        className={classes.media}
        src={props.beer_image}
        component="img"
        onError={imgError}
      />
      <CardActions disableSpacing className={classes.footer}>
        <Box width={1} justifyContent={"center"} display={"flex"}>
          <Rating
            className={classes.icon}
            name="read-only"
            size="small"
            value={props.avg_rank}
            precision={0.25}
            readOnly
          />
          <span style={{ fontSize: "0.7em" }}>({props.num_reviews})</span>
        </Box>
      </CardActions>
    </Card>
  );
}
