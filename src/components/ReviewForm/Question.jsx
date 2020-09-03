import React from "react";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextField } from "@material-ui/core";

import { makeStyles } from "@material-ui/styles";
const userStyles = makeStyles((theme) => ({
  root: {
    height: 70,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
}));

const buttonStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignContent: "center",
    left: "40%",
    margin: 20,
    paddingLeft: 20,
    paddingRight: 30,
    paddingBottom: 20,
  },
}));

const inputProps = {
  step: 300,
};

export default function Question(props) {
  const classes = userStyles();
  const button = buttonStyles();

  const setQuestion = (id) => {
    props.setQuestion(id);
    props.nextQuestion(id);
  };
  const submitReview = () => {
    props.nextAndSubmit();
  };

  const answers = [1, 2, 3, 4, 5];
  const buttons = answers.map((elm) => {
    return (
      <Button
        className={classes.root}
        size="large"
        variant="outlined"
        color="primary"
        onClick={() => setQuestion(`${elm}`)}
      >
        {elm}
      </Button>
    );
  });

  return (
    <div>
      <DialogTitle id="form-dialog-title">{props.question}</DialogTitle>
      {props.finalQuestion && (
        <>
          <TextField
            inputProps={{ size: 80 }}
            id="outlined-basic"
            label=""
            variant="outlined"
            aria-label="empty textarea"
            onChange={props.handleQuestionF}
            placeholder="Type here"
          />
          <Button
            className={button.root}
            size="large"
            color="primary"
            onClick={() => submitReview()}
          >
            Submit
          </Button>
        </>
      )}
      {!props.finalQuestion && <div className={classes.root}>{buttons}</div>}
    </div>
  );
}
