import React, { useRef, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import * as ml5 from "ml5";

export default function Scanner(props) {
  const containerRef = React.useRef(null);
  const webcamRef = React.useRef(null);
  const [classifier, setClassifier] = useState(null);
  const beersId = {};
  props.beers.forEach((elm) => (beersId[elm.id] = 0));

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
    console.log("results Top:", results[0].label);
    if (error) {
      console.log("error", error);
    }
    if (results[0].confidence >= 0.9) {
      beersId[results[0].label]++;
    }
    if (Object.values(beersId).some((elm) => elm > 30)) {
      props.openBeer(Number(results[0].label) + 3);
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
