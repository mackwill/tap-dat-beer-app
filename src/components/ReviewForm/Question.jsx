import React from "react";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextareaAutosize, Box, withWidth } from "@material-ui/core";
import { TextField } from '@material-ui/core';
import { positions } from '@material-ui/system';
import { sizing } from '@material-ui/system';

import { makeStyles } from "@material-ui/styles";
const userStyles = makeStyles((theme) => ({
  root: {
    //width: 300,
    height: 70,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
   // margin: 40,
    //paddingLeft: 20,
    //paddingRight: 30,
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
    paddingBottom: 20
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

  return (
    <div>
      <DialogTitle id="form-dialog-title">{props.question}</DialogTitle>
      {props.finalQuestion && (
        <>
          <TextField
          inputProps={{size: 80}}
          id="outlined-basic" label="" variant="outlined"
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
      {!props.finalQuestion && (
        <div className={classes.root} >
          <Button
          className={classes.root}
            size="large"
            variant="outlined"
            color="primary"
            onClick={() => setQuestion(1)}
          >
            1
          </Button>
          <Button
          className={classes.root}
            size="large"
            variant="outlined"
            color="primary"
            onClick={() => setQuestion(2)}
          >
            2
          </Button>
          <Button
          className={classes.root}
            size="large"
            variant="outlined"
            color="primary"
            onClick={() => setQuestion(3)}
          >
            3
          </Button>
          <Button
          className={classes.root}
            size="large"
            variant="outlined"
            color="primary"
            onClick={() => setQuestion(4)}
          >
            4
          </Button>
          <Button
          className={classes.root}
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
