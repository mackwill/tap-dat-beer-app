import React from "react";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextField } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";

import { makeStyles } from "@material-ui/styles";
const userStyles = makeStyles((theme) => ({
  root: {
    height: 90,
    //width: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    fontSize: "small",
    margin: 5,
  },
}));

const buttonStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignContent: "center",
    left: "30%",
    width: "min-content",
    margin: 20,
    //fontSize: "10%",
    // paddingLeft: 20,
    //paddingRight: 30,
    //paddingBottom: 0,
  },
}));

const textStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignContent: "center",
    left: "5%",
    //right: "10%",
    //margin: 20,
    // paddingLeft: 20,
    paddingRight: "10%",
    //paddingBottom: 20,
  },
}));

const inputProps = {
  step: 300,
};

export default function Question(props) {
  const classes = userStyles();
  const button = buttonStyles();
  const text = textStyles();

  const setQuestion = (id) => {
    props.setQuestion(id);
    props.nextQuestion(id);
  };
  const submitReview = () => {
    props.nextAndSubmit();
  };

  const answers = [
    { answer: "not", value: 1 },
    { answer: "faintly", value: 2 },
    { answer: "somewhat", value: 3 },
    { answer: "fairly", value: 4 },
    { answer: "very", value: 5 },
  ];
  const wordButtons = answers.map((elm) => {
    return (
      <Button
        className={classes.root}
        size="small"
        variant="contained"
        color="primary"
        onClick={() => setQuestion(`${elm.value}`)}
      >
        {elm.answer}
      </Button>
    );
  });
  const rankButton = [1, 2, 3, 4, 5].map((elm) => {
    return (
      <Button
        className={classes.root}
        size="small"
        variant="contained"
        color="primary"
        onClick={() => setQuestion(`${elm}`)}
      >
        {elm}
      </Button>
    );
  });

  return (
    <>
      {!props.finalQuestion && !props.ratingQuestion && (
        <>
          <DialogTitle style={{ textAlign: "center" }} id="form-dialog-title">
            This beer was:
          </DialogTitle>
          <div className={classes.root}>{wordButtons}</div>
          <DialogTitle style={{ textAlign: "center" }} id="form-dialog-title">
            {props.question}
          </DialogTitle>
        </>
      )}
      {!props.finalQuestion && props.ratingQuestion && (
        <>
          <DialogTitle id="form-dialog-title">{props.question}</DialogTitle>
          <div className={classes.root}>{rankButton}</div>
        </>
      )}
      {props.finalQuestion && (
        <>
          <DialogTitle id="form-dialog-title">{props.question}</DialogTitle>
          <TextField
            className={text.root}
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
            variant="contained"
            onClick={() => submitReview()}
          >
            Submit
          </Button>
        </>
      )}
    </>
  );
}
