import React from "react";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextField } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { makeStyles } from "@material-ui/styles";
const userStyles = makeStyles((theme) => ({
  root: {
    height: 40,
    //width: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    fontSize: "small",
  },
}));

const buttonStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
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

  const handleChange = (event) => {
    props.setQuestion(event.target.value);
  };

  return (
    <>
      {!props.finalQuestion && !props.ratingQuestion && (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <DialogTitle
              style={{ padding: "1em", fontSize: "3vw" }}
              id="form-dialog-title"
            >
              This beer was:
            </DialogTitle>

            <FormControl className={classes.formControl}>
              <Select
                required={true}
                style={{ width: "150px", padding: "1em", fontSize: "3vw" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={props.answer}
                onChange={handleChange}
              >
                {answers.map((elm) => {
                  return <MenuItem value={elm.value}>{elm.answer}</MenuItem>;
                })}
              </Select>
            </FormControl>

            <DialogTitle
              style={{ padding: "1em", fontSize: "3vw" }}
              id="form-dialog-title"
            >
              {props.question}
            </DialogTitle>
          </div>
          <DialogActions>
            <Button
              size="large"
              color="primary"
              variant="contained"
              onClick={() => props.nextQuestion()}
            >
              Next
            </Button>
            <Button
              edge="end"
              color="inherit"
              onClick={props.handleClose}
              aria-label="close"
              size="large"
            >
              X
            </Button>
          </DialogActions>
        </>
      )}
      {!props.finalQuestion && props.ratingQuestion && (
        <>
          <DialogTitle id="form-dialog-title">{props.question}</DialogTitle>
          <div className={classes.root}>
            {[1, 2, 3, 4, 5].map((elm) => {
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
            })}
          </div>
          <DialogActions>
            <Button
              edge="end"
              color="inherit"
              onClick={props.handleClose}
              aria-label="close"
              size="large"
            >
              X
            </Button>
          </DialogActions>
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
          <DialogActions>
            <Button
              size="large"
              color="primary"
              variant="contained"
              onClick={() => submitReview()}
            >
              Submit
            </Button>
            <Button
              edge="end"
              color="inherit"
              onClick={props.handleClose}
              aria-label="close"
              size="large"
            >
              X
            </Button>
          </DialogActions>
        </>
      )}
    </>
  );
}
