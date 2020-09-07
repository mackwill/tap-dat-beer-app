import React from "react";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextField, Typography, Box } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";

import { makeStyles } from "@material-ui/styles";
const userStyles = makeStyles((theme) => ({
  root: {
    overflowY: "hidden",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const buttonStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    width: "2ren",
  },
  questionButtons: {
    width: "8rem",
    marginTop: ".5rem",
  },
}));

const textStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignContent: "center",
    width: "100% ",
  },
}));

const questionStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    fontSize: "1rem",
    paddingBottom: ".5rem",
  },
}));

const inputProps = {
  step: 300,
};

export default function Question(props) {
  const classes = userStyles();
  const button = buttonStyles();
  const text = textStyles();
  const question = questionStyles();

  const setQuestion = (id) => {
    props.setQuestion(id);
    props.nextQuestion(id);
  };
  const submitReview = () => {
    props.nextAndSubmit();
  };

  const answers = [
    { answer: "not at all", value: 1 },
    { answer: "hardly", value: 2 },
    { answer: "partially", value: 3 },
    { answer: "moderately", value: 4 },
    { answer: "Extremely", value: 5 },
  ];
  const wordButtons = answers.map((elm) => {
    return (
      <Button
        className={button.questionButtons}
        size="medium"
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
        className={button.questionButtons}
        size="medium"
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
          <DialogTitle
            id="form-dialog-title"
            className={question.root}
            disableTypography
          >
            When tasting this beer how {props.question} was it?
          </DialogTitle>
          <div className={classes.root}>{wordButtons}</div>
        </>
      )}
      {!props.finalQuestion && props.ratingQuestion && (
        <>
          <DialogTitle
            id="form-dialog-title"
            className={question.root}
            disableTypography
          >
            {props.question}
          </DialogTitle>
          <div className={classes.root}>{rankButton}</div>
        </>
      )}
      {props.finalQuestion && (
        <>
          <DialogTitle
            id="form-dialog-title"
            className={question.root}
            disableTypography
          >
            {props.question}{" "}
          </DialogTitle>
          <Box
            width={0.8}
            display={"flex"}
            justifyContent={"center"}
            margin={"auto"}
          >
            <TextField
              className={text.root}
              id="outlined-basic"
              multiline
              rowsMax={4}
              variant="outlined"
              aria-label="empty textarea"
              onChange={props.handleQuestionF}
              placeholder="Type here"
            />
          </Box>
        </>
      )}
    </>
  );
}
