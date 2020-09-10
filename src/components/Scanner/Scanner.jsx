import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import axios from "axios";
import * as ml5 from "ml5";
import { isMobile } from "react-device-detect";

export default function Scanner(props) {
  const containerRef = React.useRef(null);
  const webcamRef = React.useRef(null);
  const [classifier, setClassifier] = useState(null);
  const beersId = { noBeer: 0 };
  const [btnText, setBtnText] = useState("Start Scanning");
  const [beers, setBeers] = useState([]);

  useEffect(() => {
    if (props.open) {
      axios.get("/api/beers").then((data) => setBeers(data.data.data));
    }
  }, [props.open]);

  beers.forEach((elm) => (beersId[elm.id] = 0));

  // useEffect(() => {
  //   if (props.open) {
  //     navigator.mediaDevices
  //       .getUserMedia({ video: true })
  //       .then((stream) => {
  //         if (webcamRef.current && stream) webcamRef.current.srcObject = stream;
  //         ml5
  //           .imageClassifier("model/model.json", webcamRef.current)
  //           .then((model) => setClassifier(model));
  //       })
  //       .catch((e) => console.log("Error opening scanner: ", e));
  //   }
  // }, [props.open]);

  useEffect(() => {
    if (props.open) {
      isMobile
        ? navigator.mediaDevices
            .getUserMedia({ video: { facingMode: { exact: "environment" } } })
            .then((stream) => {
              if (webcamRef.current && stream)
                webcamRef.current.srcObject = stream;
              ml5
                .imageClassifier("model/model.json", webcamRef.current)
                .then((model) => setClassifier(model));
            })
            .catch((e) => console.log("Error opening scanner: ", e))
        : navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((stream) => {
              if (webcamRef.current && stream)
                webcamRef.current.srcObject = stream;
              ml5
                .imageClassifier("model/model.json", webcamRef.current)
                .then((model) => setClassifier(model));
            })
            .catch((e) => console.log("Error opening scanner: ", e));
    }
  }, [props.open]);

  const scanBeer = () => {
    classifier.classify(resultsReady);
    setBtnText("Scanning...");
  };
  let counter = 0;
  const resultsReady = (error, results) => {
    if (error) {
      return;
    }
    if (results[0].confidence >= 0.9) {
      beersId[results[0].label]++;
    }
    if (Object.values(beersId).some((elm) => elm > 30)) {
      props.openBeer(Number(results[0].label));
      closeScanner();

      return;
    }
    if (counter > 300) {
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
          style={{ width: "100%", height: "auto" }}
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
