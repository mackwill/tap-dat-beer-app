import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles({
  root: {
    maxWidth: 250,
    height: "25rem",
  },
});

export default function BeerCard(props) {
  const classes = useStyles();
  console.log("props.beer", props.beer);

  return (
    <Box>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={props.beer.name}
            height="225vh"
            image={props.beer.beer_image}
            title={props.beer.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="h2">
              {props.beer.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Rating: 7/10
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Review
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
