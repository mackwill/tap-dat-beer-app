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

  const setQuestion = (id) => {
    props.setQuestion(id);
    props.nextQuestion(id);
  };
  const submitReview = () => {
    props.nextAndSubmit();
  };

  return (
    <div>
      <DialogTitle id="form-dialog-title">{props.question}</DialogTitle>
      {props.finalQuestion && (
        <>
          <TextareaAutosize
            aria-label="empty textarea"
            onChange={props.handleQuestionF}
            placeholder="Empty"
          />
          <Button
            size="large"
            variant="outlined"
            color="primary"
            onClick={() => submitReview()}
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
            onClick={() => setQuestion(1)}
          >
            1
          </Button>
          <Button
            size="large"
            variant="outlined"
            color="primary"
            onClick={() => setQuestion(2)}
          >
            2
          </Button>
          <Button
            size="large"
            variant="outlined"
            color="primary"
            onClick={() => setQuestion(3)}
          >
            3
          </Button>
          <Button
            size="large"
            variant="outlined"
            color="primary"
            onClick={() => setQuestion(4)}
          >
            4
          </Button>
          <Button
            size="large"
            variant="outlined"
            color="primary"
            onClick={() => setQuestion(5)}
          >
            5
          </Button>
        </div>
      )}
    </div>
  );
}
