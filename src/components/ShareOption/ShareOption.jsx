import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
} from "react-share";
import { EmailIcon, FacebookIcon, TwitterIcon } from "react-share";
import { makeStyles } from "@material-ui/styles";
const userStyles = makeStyles((theme) => ({
  button: {
    width: "100%",
    height: 100,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  text: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    fontSize: "1.2rem",
  },
}));

export default function Login(props) {
  const classes = userStyles();

  return (
    <div>
      <Dialog
        open={props.open}
        aria-labelledby="form-dialog-title"
        onClose={props.close}
      >
        <DialogTitle
          id="form-dialog-title"
          className={classes.text}
          disableTypography
        >
          Share this beer with your friends!
        </DialogTitle>
        <DialogContent className={classes.button}>
          <FacebookShareButton
            quote="Check out the great reviews of beers at Tap Dat Beer App"
            url={"http://www.facebook.com"}
          >
            <FacebookIcon size={60} round={true} />
          </FacebookShareButton>

          <EmailShareButton
            url="tapdatbeerapp.com"
            subject="Check out TapDat Beer App"
            body="Check out the great reviews of beers at Tap Dat Beer App"
            separator=" "
          >
            <EmailIcon size={60} round={true} />
          </EmailShareButton>

          <TwitterShareButton
            title="Check out the great reviews of beers at Tap Dat Beer App"
            via="sent from @TapDatBeerApp"
            url={"http://www.twitter.com"}
          >
            <TwitterIcon size={60} round={true} />
          </TwitterShareButton>
        </DialogContent>
      </Dialog>
    </div>
  );
}
