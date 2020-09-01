import React, { useRef, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import * as ml5 from "ml5";

export default function Scanner(props) {
  const containerRef = React.useRef(null);
  const webcamRef = React.useRef(null);
  const [classifier, setClassifier] = useState(null);
  const beerLabel = { "Fat Tire": 0, "Palm Bay": 0, Hoegaarden: 0, Bubbly: 0 };
  ///i see you working vincent

  useEffect(() => {
    if (props.open) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (webcamRef.current && stream) webcamRef.current.srcObject = stream;
          ml5
            .imageClassifier("model/model.json", webcamRef.current)
            .then((model) => setClassifier(model))
            .catch((e) => console.log(e));
        })
        .catch((e) => console.log(e));
    }
  }, [props.open]);

  const scanBeer = () => {
    classifier.classify(resultsReady);
  };

  const resultsReady = (error, results) => {
    if (error) {
      console.log("error", error);
    }
    if (results[0].confidence >= 0.9) {
      beerLabel[results[0].label]++;
    }
    if (
      beerLabel["Fat Tire"] > 100 ||
      beerLabel["Palm Bay"] > 100 ||
      beerLabel["Hoegaarden"] > 100
    ) {
      console.log("result:", results[0].label);
      const id = 5;
      props.openBeer(id);
      props.handleClose();

      return;
    }
    requestAnimationFrame(scanBeer);
  };

  return (
    <div ref={containerRef}>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <video
          width={containerRef.current?.clientWidth}
          height="480"
          autoPlay
          ref={webcamRef}
        ></video>
        {classifier && <Button onClick={() => scanBeer()}>Click</Button>}
      </Dialog>
    </div>
  );
}
