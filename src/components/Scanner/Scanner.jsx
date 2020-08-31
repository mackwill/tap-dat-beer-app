import React from "react";
import Dialog from "@material-ui/core/Dialog";

import P5Wrapper from "react-p5-wrapper";
import * as ml5 from "ml5";

import sketch from "../../Scanner/sketch.js";

import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
  return (
    <Dialog
      fullScreen
      open={props.open}
      // onClose={props.close}
      TransitionComponent={Transition}
    >
      <P5Wrapper sketch={sketch}></P5Wrapper>;
    </Dialog>
  );
}
