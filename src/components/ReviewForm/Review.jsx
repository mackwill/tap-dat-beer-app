import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/styles";
import Question from "./Question";
import axios from "axios";
//import useApplicationData from "../../hooks/useApplicationData";

const qStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    //padding: "50px",
    paddingLeft: "15px",
    //overflow-y: "hidden"
  },
}));

export default function Review(props) {
  const qs = qStyles();

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

  const nextAndSubmit = (id) => {
    console.log("in next and submit", id);
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
      open={props.open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      maxWidth={"sm"}
      fullWidth
    >
      {currentQuestion === 1 && (
        <Question
          className={qs.root}
          question="You've had your first sip, what level of Sweetness do you taste?"
          setQuestion={setQuestionA}
          nextQuestion={nextQuestion}
        />
      )}

      {currentQuestion === 2 && (
        <Question
          question="You've had another sip, tell me if you taste any bitterness?"
          setQuestion={setQuestionB}
          nextQuestion={nextQuestion}
        />
      )}
      {currentQuestion === 3 && (
        <Question
          question="On your last sip did it taste very hoppy?"
          setQuestion={setQuestionC}
          nextQuestion={nextQuestion}
        />
      )}
      {currentQuestion === 4 && (
        <Question
          question="On this sip did you taste any sourness?"
          setQuestion={setQuestionD}
          nextQuestion={nextQuestion}
        />
      )}
      {currentQuestion === 5 && (
        <Question
          question="Overall I would rate this beer as?"
          setQuestion={setQuestionE}
          nextQuestion={nextQuestion}
        />
      )}
      {currentQuestion > 5 && (
        <Question
          question="Great, we have saved your review.  Are there any additional details you would like to share with others interested in trying this beer?"
          finalQuestion={true}
          handleQuestionF={handleQuestionF}
          nextAndSubmit={nextAndSubmit}
        />
      )}
      <DialogActions>
        <Button
          edge="end"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
          size="small"
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
