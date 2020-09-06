import React, { useRef, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import * as ml5 from "ml5";

export default function Scanner(props) {
  const containerRef = React.useRef(null);
  const webcamRef = React.useRef(null);
  const [classifier, setClassifier] = useState(null);
  const beersId = { noBeer: 0 };
  const [btnText, setBtnText] = useState("Start Scanning");
  props.beers.forEach((elm) => (beersId[elm.id] = 0));
  let track;

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
    setBtnText("Scanning...");
  };
  let counter = 0;
  const resultsReady = (error, results) => {
    if (error) {
      console.log("error", error);
    }
    if (results[0].confidence >= 0.9) {
      beersId[results[0].label]++;
    }
    if (Object.values(beersId).some((elm) => elm > 30)) {
      props.openBeer(Number(results[0].label));
      closeScanner();

      return;
    }
    if (counter > 100) {
      setBtnText("Sorry we couldn't find the beer that matches");

      setTimeout(() => {
        closeScanner();
      }, 2000);
      return;
    }
    counter++;
    requestAnimationFrame(scanBeer);
  };
  const closeScanner = () => {
    const track = webcamRef.current.srcObject.getTracks()[0];
    track.stop();
    setBtnText("Start Scanning");
    props.handleClose();
  };

  return (
    <div ref={containerRef}>
      <Dialog
        open={props.open}
        onClose={closeScanner}
        aria-labelledby="form-dialog-title"
      >
        <video
          style={{ objectFit: "fill" }}
          width={containerRef.current?.clientWidth}
          height="480"
          autoPlay
          ref={webcamRef}
        ></video>
        {classifier && <Button onClick={() => scanBeer()}>{btnText}</Button>}
      </Dialog>
    </div>
  );
}
