import React from "react";
import {
  makeStyles,
  MuiThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { Box, Grid } from "@material-ui/core";
import Review from "../Review/Review";
import ShareIcon from "@material-ui/icons/Share";
import BlankReview from "../Review/BlankReview";
import FavoriteIcon from "@material-ui/icons/Favorite";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#7e5dc0",
      main: "#5e35b1",
      dark: "#41257b",
      contrastText: "#fff",
    },
    secondary: {
      light: "#637bfe",
      main: "#3d5afe",
      dark: "#2a3eb1",
      contrastText: "#fff",
    },
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProductDetail(props) {
  const classes = useStyles();

  const imgError = (e) => {
    e.target.onerror = null;
    e.target.src =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAXVBMVEX///+8vcCHiovp6erX2NmDhoe5ur22t7jb3N3NzdDDxMbs7OySlZamqKn09PW+v8Lj4+Tz8/TS0tR+gYLHyMuMj5DExsaeoKGrra68vr6WmJnS09Pe39+xs7Opq6wg1GovAAAFl0lEQVR4nO2d7XbbIAxAS7CpgRaw4yZp4+z9H3NAsn7YInXPfGZL0/27/eAePiSB4j48MAzDMAzDMAzDMAzDMB+4KWsPaVGkUVOMXXtYy9EqAaHatQe2GLpgqNce2GLAglFx7YEtRSgahrWHthB9QVCIfu2hLYRXhX2o/NpDWwg3VJCiqgY6MbEBDZu1h7UgBlylZu1hLQf9iA9uw7QR1x7YYsCLlNIy7VSODZM57NYe2HJIr7qmGUV+L9ce1oK4GBqs1aM5pBMNHx6sUkHa0RwqQvVhyr2j4ejAIZN3J2JOI6X1I0NKOU08TK2UY0NCR2ks8o2VYRwt6JT4sUJUPWBIpTpMeKWtHMaGVKrDhxwOo+G0hKITEJ1SnZWT/FvRMYwBv5K2mxjSCflBqUZOkjZKIb+BkjZSIb/LhpMqkVDI10JJKad1MJ2QH93kJGkTlGr8VO3KMDUUaw9sMZQwcpq0EXqZaZVIaen0wo3MdaJUIqWlgCGVm5oAJ22EQn6VkjZ5BgypXAnrnLRN0lJCz9xGqAFISwkFxLThgLSUUEBUOaWBHi+IBESnUkoDG9KogW1OaYC0lEzIl1dDaBsSCflDKWmLhsPag1uEqpS0kQn5sf7toLvEBI2QHwP+WUJpqaAS8r0A7xIzJK69nSgmbYLGtXd7J2kTgkJAjAFfBDilIXLtHQOhD3BKQ6QGbq5pKbxISVx7d9ekrdD4ReHaOx6ippC0CRohPx4xpbRU0Aj50RB8ACZj6Lwo3CVmPP6Q36o7SRuJGjgGfPAB+I8h/pCfjpihmLRRCPlNTtrKhvhDfnc1hJM2EiFf5+dRWxCkEPJjOPRAx9c7+ANiXJ5ei9Kv1yhU+WW320Zce4B/y0c+qpQHL/aRh4s/qYwSOoZ9oFkB+WnqzFVQmcZaO5hCjWjQ5qY3weQX568v7ki8ijdBHSt8W909bZCGjNukVTYKFn6v/q6IsuX79hTTzBDE+Qjlrks0C5aKw8+K+LZibp9J1b2EH9bGhue1B/xTXB53nwSLdcVXsE3i9eYp5GN0xhQiLBRTgpZ+ZFFoUQBAFjHc+xQW7xEnk4hrmeZL/OsuLH8VY2SIqy8jTVxqSJy/SLFtxHy65EVa/HTLxBBXX0Yy9HkK552kSA3zNpyRz6A1NNmwdNnNhluHDdlw+7AhG24fNvzfDPPXTDtcL/pzDaOa8LqRuKrfxPeGad583wWLTy5z1zAvSpQT94mSYZLrzwF/mxBgmFdlaeLc+XCsH//1IP+KT4YqfYvOm7jjoP/orH491vt9XaM1rNKOA1elDYdLlKvrXQadYdxvbXG7yeb1+e1DDqVhnDj4X8L58e1lJIfREGQ4XHZ7wI2AoWur19NLWQ65YXV5/k4OsWFrw68ZchgNw+G4e2qqqmqe5/mhM7zsd8QNH2s2ZMOtw4ZsuH3YkA23Dxuy4fZhQzbcPmzIhtuHDdlw+7AhG24fNvwfDev9Ze1B/4ifGNb1fr87ng64ur5mGia5l9PrGWFj1LeGyW3/9HhA+72Be4Z1Xe9ejocK16ocAxvGiaufjpdzgBalw7VSJ4ZJ7u30OoA7ztmmMwLX1yM+G6aerqPScEdbK5ve5zZTZD3C74bBnA4NvP7a0JnUz4ezC/oxztupLe0sJ4cvchgN9WGAj0onKz2Rw2gI4Gzoeg+5ETB0dtDX4+QOeA2bXoGrEr9hiuCubcsf3sFtKLW5/dKZfzPDhluFDdlw+7AhG24fNmTD7cOGbLh92JANtw8b0jD05A3FQN7QkDcUPXlD4QN1Q6H03A+0YjX8AcgM2zt/laQgiO3PWbrZLzI3wR5XK0bC9nPe1LKdUj3O5hoXOvPNu2j6V9OB/TVYcDZUujf5BfgrwpteV2i/9TXBTVl7SAzDMAzDMAzDMAzDMJviN3dsYGJrwD70AAAAAElFTkSuQmCC";
  };

  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <Dialog
          fullScreen
          open={props.open}
          onClose={props.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={props.handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Beer Detail
              </Typography>
            </Toolbar>
          </AppBar>
          <List>
            <ListItem style={{ display: "flex", justifyContent: "center" }}>
              <img src={props.currentBeer.beer_image} onError={imgError} />
            </ListItem>
            <ListItem>
              <Box width={1} textAlign="center">
                <Typography variant="h6">{props.currentBeer.name}</Typography>
              </Box>
            </ListItem>
            <ListItem>
              <Box width={1} textAlign="center">
                <Typography variant="p">{props.currentBeer.brewery}</Typography>
              </Box>
            </ListItem>
            <ListItem style={{ width: "60%", margin: "auto" }}>
              <Grid container spacing={1} textAlign="center">
                <Grid container item xs={6} spacing={1}>
                  <Box m={"auto"}>
                    <Typography variant="p">
                      ABV: {props.currentBeer.abv}
                    </Typography>
                  </Box>
                </Grid>
                <Grid container item xs={6} spacing={1}>
                  <Box m={"auto"}>
                    <Typography variant="p">IBU: --</Typography>
                  </Box>
                </Grid>
                <Grid container item xs={6} spacing={1}>
                  <Box m={"auto"}>
                    <Typography variant="p">
                      Type: {props.currentBeer.type}
                    </Typography>
                  </Box>
                </Grid>
                <Grid container item xs={6} spacing={1}>
                  <Box m={"auto"}>
                    <Typography variant="p">Rating: --</Typography>
                  </Box>
                </Grid>
              </Grid>
            </ListItem>
            <Divider />
            <ListItem>
              <Box width={1} textAlign="right">
                <Button variant="contained" color="primary">
                  Review
                </Button>
                <IconButton>
                  <ShareIcon
                    color="secondary"
                    onClick={() => console.log("here")}
                  />
                </IconButton>
                <IconButton>
                  <FavoriteIcon
                    color="secondary"
                    onClick={() => console.log("here")}
                  />
                </IconButton>
              </Box>
            </ListItem>
            <ListItem>
              <Typography variant="h4" component="h4">
                Reviews:
              </Typography>
            </ListItem>
            <Grid container spacing={3}>
              {props.reviews.length > 0 ? (
                props.reviews.map((review) => {
                  return <Review {...review} />;
                })
              ) : (
                <BlankReview />
              )}
            </Grid>
          </List>
        </Dialog>
      </MuiThemeProvider>
    </div>
  );
}
