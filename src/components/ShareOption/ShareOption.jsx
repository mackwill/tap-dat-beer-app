import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton
} from "react-share";

import {
  EmailIcon,
  FacebookIcon,
  TwitterIcon
} from "react-share";

import { makeStyles } from "@material-ui/styles";
const userStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    height: 100,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
}));

export default function Login(props) {
  // const handleOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const classes = userStyles();

  return (
    <div>
      <Dialog
        open={props.open}
        aria-labelledby="form-dialog-title"
        onClose={props.close}
        >
          <DialogTitle id="form-dialog-title">
            Share this beer with your friends!
          </DialogTitle>
          <DialogContent className={classes.root}>

            <FacebookShareButton quote="Check out the great reviews of beers at TapDatBeerApp" url={'http://www.facebook.com'} ><FacebookIcon size={60} round={true} /> </FacebookShareButton>

            <EmailShareButton subject="Check out TapDat Beer App"
              body="Check out the great reviews of beers at TapDatBeerApp" > <EmailIcon size={60} round={true} /> </EmailShareButton>

            <TwitterShareButton title="Check out the great reviews of beers at TapDatBeerApp" via="sent from @TapDatBeerApp" url={"http://www.twitter.com"} > <TwitterIcon size={60} round={true} /> </TwitterShareButton>
            
          </DialogContent>
      </Dialog>
    </div>
  );
}
