import React, { useState } from "react";

import Dialog from "@material-ui/core/Dialog";

import { makeStyles } from "@material-ui/styles";
import Question from "./Question";
import axios from "axios";
import { keys } from "@material-ui/core/styles/createBreakpoints";

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

  const [questions, setQuestions] = useState({
    1:  {
      id: 1,
      value: null,
      question: "You've had your first sip, what level of Sweetness do you taste?",
      key: "sweet"
    },
    2: {
      id: 2,
      value: null,
      question: "You've had another sip, tell me if you taste any bitterness?",
      key: "bitter"
    },
    3: {
      id: 3,
      value: null,
      question: "On your last sip did it taste very hoppy?",
      key: "hoppy"
    },
    4: {
      id: 4,
      value: null,
      question: "On this sip did you taste any sourness?",
      key: "sour"
    },
    5: {
      id: 5,
      value: null,
      question: "Overall I would rate this beer as?",
      key: "rank"
    },
    6: {
      id: 6,
      value: "",
      question: "Great, we have saved your review.  Are there any additional details you would like to share with others interested in trying this beer?",
      key: "review"
    }
  })

  const [currentQuestionId, setCurrentQuestionId] = useState(1);

   const [newReview, setNewReview] = useState(null);


  const currentQuestion = questions[currentQuestionId]

  const setCurrentQuestionValue = (answer) => {
    const updatedQuestions = {
      ...questions,
      [currentQuestionId]: {
        ...currentQuestion,
        value: answer
      }
    }

    setQuestions(updatedQuestions)
  }

  const nextAction = () => {
    if (currentQuestionId > 5) {
      submit()
    } else {
      setCurrentQuestionId((prev) => prev + 1);
    }
  }

  const submit = () => {
    console.log("on submit", questions)
    // questions -> reviewObject

    // const result = {}
    // for (let question in questions) {
    //   result[question.key] = question.value
    // }

    //return result
    
    const result = {}
    for (let key of Object.keys(questions)) {
      result[questions[key].key] = questions[key].value
    }
    
    result.beer_id = props.currentBeer.id
   
    console.log('before going into axios', result);
    


    return axios.post("/reviews", result).then((data) => {
      console.log('inside axios', data);
      setNewReview(data.id);
     //setCurrentQuestion((prev) => prev + 1);
   });
  }




// axios.post("/reviews", reviewObject).then((data) => {
//   console.log('axios data', reviewObject);
//    setNewReview(data.id);
// })
    // const values = Object
    //   .values(questions)
    //   .reduce((result, next) => {
    //     result[next.key] = next.value
    //     return result
    //   }, {})


   


    /*
    const questions = {
      1:  {
        id: 1,
        value: 123,
        question: "You've had your first sip, what level of Sweetness do you taste?",
        key: "sweet"
      },
      2: {
        id: 2,
        value: 234,
        question: "",
        key: "bitter"
      }
    }

    const reviewObject = {
      sweet: 123
    }
    */

  

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        {
          <Question
            question={currentQuestion.question}
            id={currentQuestion.id}
            setQuestion={setCurrentQuestionValue}
            nextQuestion={nextAction}
            finalQuestion={currentQuestionId === 6}
          />
        }
      </Dialog>
    </div>
  );

}