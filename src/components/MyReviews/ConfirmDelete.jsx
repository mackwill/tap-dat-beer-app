import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
} from "react-share";
import { EmailIcon, FacebookIcon, TwitterIcon } from "react-share";
import { makeStyles } from "@material-ui/styles";

//import Button from "components/Button";
import Button from "@material-ui/core/Button";

export default function ConfirmDelete(props) {
  const editSelect = (event) => {
    props.handleDeleteMyReview(props.id);
    props.close();
  };

  return (
    <div>
      <Dialog
        open={props.open}
        aria-labelledby="form-dialog-title"
        onClose={props.close}
      >
        <DialogTitle id="form-dialog-title">
          Are you sure you want to delete this review?
        </DialogTitle>
        <DialogContent>
          <IconButton
            edge="start"
            color="inherit"
            onClick={props.close}
            aria-label="close"
          >
            {" "}
            Cancel
          </IconButton>

          <IconButton
            edge="start"
            color="inherit"
            onClick={editSelect}
            aria-label="close"
          >
            {" "}
            Confirm
          </IconButton>
        </DialogContent>
      </Dialog>
    </div>
  );
}
