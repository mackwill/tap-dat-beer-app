import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import StarIcon from "@material-ui/icons/Star";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 365,
  },
  media: {
    height: "9rem",
    backgroundSize: "contain",
    objectFit: "contain",
    width: "auto",
    margin: "auto",
    borderRadius: "5px",
    // paddingTop: "100%", // 16:9
  },
  header: {
    display: "flex",
    alignItems: "start",
    height: "3rem",
    paddingTop: "0.25rem",
  },
  headerTypography: {
    fontSize: "0.8rem",
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
      {props.name}
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

  const starRating = <StarIcon fontSize="0.75rem" />;

  return (
    <Card className={classes.root} variant="outlined">
      <CardHeader
        // disableTypography={true}
        className={classes.header}
        title={cardHeader}
        // subheader={cardSubHeader}
      />
      <CardMedia
        className={classes.media}
        // image={props.beer_image}
        // title={props.name}s
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
        </Box>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit></Collapse>
    </Card>
  );
}
