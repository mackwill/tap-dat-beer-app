import React from "react";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextareaAutosize } from "@material-ui/core";

import { makeStyles } from "@material-ui/styles";
const userStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    height: 200,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
    paddingLeft: 20,
    paddingRight: 30,
  },
}));

export default function Question(props) {
  const classes = userStyles();


  const setQuestionAndNext = (value) => {
    props.setQuestion(value)
    props.nextQuestion();
  };

  return (
    <div>
      <DialogTitle id="form-dialog-title">{props.question}</DialogTitle>
      {props.finalQuestion && (
        <>
          <TextareaAutosize onChange={(e) => props.setQuestion(e.target.value)} aria-label="empty textarea" placeholder="review-area" />
          <Button
            size="large"
            variant="outlined"
            color="primary"
            onClick={() => props.nextQuestion()}
          >
            Submit
          </Button>
        </>
      )}
      {!props.finalQuestion && (
        <div className={classes.root}>
          <Button
            size="large"
            variant="outlined"
            color="primary"
            onClick={() => setQuestionAndNext(1)}
          >
            1
          </Button>
          <Button
            size="large"
            variant="outlined"
            color="primary"
            onClick={() => setQuestionAndNext(2)}
          >
            2
          </Button>
          <Button
            size="large"
            variant="outlined"
            color="primary"
            onClick={() => setQuestionAndNext(3)}
          >
            3
          </Button>
          <Button
            size="large"
            variant="outlined"
            color="primary"
            onClick={() => setQuestionAndNext(4)}
          >
            4
          </Button>
          <Button
            size="large"
            variant="outlined"
            color="primary"
            onClick={() => setQuestionAndNext(5)}
          >
            5
          </Button>
        </div>
      )}
    </div>
  );
}
