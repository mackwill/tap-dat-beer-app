import React, { useRef } from "react";
import Dialog from "@material-ui/core/Dialog";
import * as ml5 from "ml5";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
  const videoTag = useRef(null);

  // STEP 1: Load the model!
  function preload() {
    const classifier = ml5.imageClassifier(
      "http://localhost:3002/model/model.json"
    );
    console.log("Running preload()");
  }
  preload();

  // STEP 2.2 classify!
  // function classifyVideo() {
  //   classifier.classify(video, gotResults);
  // }

  // const arr = { Hoegaarden: 0, "Fat Tire": 0, "Palm Bay": 0, Bubbly: 0 };
  // // STEP 3: Get the classification!

  // function gotResults(error, results) {
  //   // Something went wrong!
  //   if (error) {
  //     console.error(error);
  //     return;
  //   }
  //   // Store the label and classify again!

  //   if (results[0].confidence >= 0.9) {
  //     arr[results[0].label]++;
  //   }
  //   if (
  //     arr["Hoegaarden"] > 100 ||
  //     arr["Fat Tire"] > 100 ||
  //     arr["Palm Bay"] > 100
  //   ) {
  //     label = results[0].label;
  //     console.log("result:", results);
  //     console.log(arr);
  //     return;
  //   }
  //   classifyVideo();
  // }

  return <video ref={videoTag}></video>;
}
