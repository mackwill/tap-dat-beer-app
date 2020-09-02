import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    width: 345,
    margin: "0.2em",
  },
  media: {
    height: 140,
  },
});

export default function MediaCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image="images/banner_stout.jpg" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.category.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.category.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
