import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/styles";

const buttonStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  text: {
    display: "flex",
    justifyContent: "center",
    fontSize: "1.2rem",
  },
}));

export default function ConfirmDelete(props) {
  const button = buttonStyles();
  console.log("this is in the confirmdelete section", props);

  const editSelect = (event) => {
    props.handleDeleteMyReview(props.reviewId);
    props.close();
  };

  return (
    <div>
      <Dialog
        open={props.open}
        aria-labelledby="form-dialog-title"
        onClose={props.close}
      >
        <DialogTitle
          id="form-dialog-title"
          className={button.text}
          disableTypography
        >
          Are you sure you want to delete this review?
        </DialogTitle>
        <DialogContent className={button.root}>
          <Button
            size="medium"
            variant="contained"
            color="primary"
            onClick={props.close}
            aria-label="close"
          >
            Cancel
          </Button>

          <Button
            size="medium"
            variant="contained"
            color="primary"
            onClick={editSelect}
            aria-label="close"
          >
            Confirm
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
