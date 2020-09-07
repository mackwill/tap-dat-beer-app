import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/styles";
import Question from "./Question";
import axios from "axios";

const qStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    overflowY: "hidden",
  },
}));

const dStyles = makeStyles((theme) => ({
  root: {
    margin: "32px",
    position: "relative",
    overflow: "none",
  },
  container: {
    height: "30rem",
  },
  close: {
    display: "flex",
    justifyContent: "flex-end",
    alignContent: "flex-end",
  },
  submit: {
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignContent: "center",
    paddingLeft: "35%",
  },
}));

const dialogStyle = makeStyles((theme) => ({
  desktop: {
    height: "20rem",
  },
  mobile: {},
}));

export default function Review(props) {
  const qs = qStyles();
  const ds = dStyles();
  const dialogStyles = dialogStyle();

  const [questionA, setQuestionA] = useState(null);
  const [questionB, setQuestionB] = useState(null);
  const [questionC, setQuestionC] = useState(null);
  const [questionD, setQuestionD] = useState(null);
  const [questionE, setQuestionE] = useState(null);
  const [questionF, setQuestionF] = useState(null);
  const [newReview, setNewReview] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(1);

  const nextQuestion = () => {
    setCurrentQuestion((prev) => prev + 1);
  };

  const handleQuestionF = (e) => {
    setQuestionF(e.target.value);
  };

  const handleClose = () => {
    setQuestionA(null);
    setQuestionB(null);
    setQuestionC(null);
    setQuestionD(null);
    setQuestionE(null);
    setQuestionF(null);
    setNewReview(null);
    setCurrentQuestion(1);
    props.close();
  };

  const nextAndSubmit = () => {
    console.log("in next and submit");
    const reviewObject = {
      sweet: questionA,
      sour: questionD,
      hoppy: questionC,
      bitter: questionB,
      rank: questionE,
      beer_id: props.currentBeer.id,
      review: questionF,
    };
    props.addReviewById(reviewObject);
    handleClose();
  };

  return (
    <Dialog
      className={dialogStyles.root}
      open={props.open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      height
      PaperProps={{
        style: {
          minHeight: "1rem",
        },
      }}
      fullWidth
    >
      {currentQuestion === 1 && (
        <Question
          className={qs.root}
          question="sweet"
          setQuestion={setQuestionA}
          nextQuestion={nextQuestion}
        />
      )}

      {currentQuestion === 2 && (
        <Question
          question="bitter"
          setQuestion={setQuestionB}
          nextQuestion={nextQuestion}
        />
      )}
      {currentQuestion === 3 && (
        <Question
          question="hoppy"
          setQuestion={setQuestionC}
          nextQuestion={nextQuestion}
        />
      )}
      {currentQuestion === 4 && (
        <Question
          question="sour"
          setQuestion={setQuestionD}
          nextQuestion={nextQuestion}
        />
      )}
      {currentQuestion === 5 && (
        <Question
          question="Overall I would rate this beer as?"
          ratingQuestion={true}
          setQuestion={setQuestionE}
          nextQuestion={nextQuestion}
        />
      )}
      {currentQuestion > 5 && (
        <Question
          question="Are there any last thoughts you would like to share?"
          finalQuestion={true}
          handleQuestionF={handleQuestionF}
          nextAndSubmit={nextAndSubmit}
        />
      )}
      <DialogActions className={ds.submit}>
        <Button
          edge="end"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
          size="large"
        >
          close
        </Button>
        {currentQuestion > 5 && (
          <Button
            size="large"
            color="primary"
            variant="contained"
            onClick={nextAndSubmit}
          >
            Submit
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
