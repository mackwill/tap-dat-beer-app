import React, { useState } from "react";

import Dialog from "@material-ui/core/Dialog";

import { makeStyles } from "@material-ui/styles";
import Question from "./Question";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px",
  },
}));

export default function Review(props) {
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

  const nextAndSubmit = (id) => {
    const reviewObject = {
      sweet: questionA,
      sour: questionD,
      hoppy: questionC,
      bitter: questionB,
      rank: questionE,
      beer_id: props.currentBeer.id,
      review: questionF,
    };
    return axios.post("/reviews", reviewObject).then((data) => {
      console.log("Sent a review to db");
      // setNewReview(data.id);
      // setCurrentQuestion((prev) => prev + 1);
    });
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        {currentQuestion === 1 && (
          <Question
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
      </Dialog>
    </div>
  );
}
