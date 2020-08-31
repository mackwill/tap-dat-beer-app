import p5 from "p5";
export default function sketch(p) {
  let video;
  let classifier;
  let arr = { Hoegaarden: 0, "Fat Tire": 0, "Palm Bay": 0, Bubbly: 0 };
  let modelURL = "./model/";
  let label = "waiting...";

  // STEP 1: Load the model!
  p.preload = () => {
    classifier = ml5.imageClassifier(modelURL + "model.json");
  };

  p.setup = () => {
    createCanvas(640, 520);
    // Create the video
    video = createCapture(VIDEO);
    video.hide();

    // STEP 2.1: Start classifying
    classifyVideo();
  };

  // STEP 2.2 classify!
  p.classifyVideo = () => {
    classifier.classify(video, gotResults);
  };

  p.draw = () => {
    background(0);

    // Draw the video
    image(video, 0, 0);

    noFill();
    rect(150, 75, 300, 350);
    stroke(255);
    // STEP 4: Draw the label
    textSize(32);
    textAlign(CENTER, CENTER);
    fill(255);
    text(label, width / 2, height - 16);
  };

  // STEP 3: Get the classification!
  p.gotResults = (error, results) => {
    // Something went wrong!
    if (error) {
      console.error(error);
      return;
    }
    // Store the label and classify again!

    if (results[0].confidence >= 0.9) {
      arr[results[0].label]++;
    }
    if (
      arr["Hoegaarden"] > 100 ||
      arr["Fat Tire"] > 100 ||
      arr["Palm Bay"] > 100
    ) {
      label = results[0].label;
      console.log("result:", results);
      console.log(arr);
      return;
    }
    classifyVideo();
  };
}
