import React, { useState, useEffect, Fragment } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import axios from "axios";
// import CustomAlert from "../CustomAlert";



export default function EditReview(props) {
  console.log("props in Edit REview ", props.review);
  
  const [state, setState] = useState({
    bitter: null,
    sour: null,
    hoppy: null,
    rank: props.review?.sweet,
    review: props.review?.review,
    id: props.review?.id,
  })

    function handleChange(e) {
      setState(() => ({
        
        bitter: e.target.value,
        
      }));
    }

  const editAndSubmit = (props) => {
    const reviewEdit = {
      sweet: props.review.sweet,
      sour: props.review.sour,
      hoppy: props.review.hoppy,
      bitter: props.review.bitter,
      rank: props.review.sweet,
      review: props.review.review,
      id: props.review.id,
    };
    return axios.put("/api/reviews/", reviewEdit).then((data) => {
      console.log("Sent a review to db", reviewEdit);
      props.close()
    });
    
  };


  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.close}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={props.onSubmit}>
          <DialogTitle id="form-dialog-title">
            Update Your Review
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="sweet"
              label="Current Sweetness:"
              type="number"
              name="sweet"
              value={props.review?.sweet}
              fullWidth
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              id="bitter"
              label="Current Bitterness:"
              type="number"
              name="bitter"
              value={props.review?.bitter}
              fullWidth
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              id="hoppy"
              label="Current Hoppiness"
              type="number"
              name="hoppy"
              value={props.review?.hoppy}
              fullWidth
              onChange={props.onChange}
            />
            <TextField
              margin="dense"
              id="sour"
              label="Current Sourness"
              type="number"
              name="sour"
              value={props.review?.sour}
              fullWidth
              //onChange={props.onChange}
            />
            <TextField
              margin="dense"
              id="rank"
              label="Current Rank"
              type="number"
              name="rank"
              value={props.review?.rank}
              fullWidth
              //onChange={props.onChange}
            />
            <TextField
              margin="dense"
              id="review"
              label="Review:"
              type="text"
              name="review"
              value={props.review?.review}
              fullWidth
              //onChange={props.onChange}
            />
          </DialogContent>
          {/* <CustomAlert errMessage={props.errMessage} /> */}

          <DialogActions>
            <Button onClick={props.close} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary"   >
              Update
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

//onClick={() => editAndSubmit()}