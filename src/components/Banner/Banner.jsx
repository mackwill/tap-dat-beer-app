import React, { useRef, useState } from "react";
// import Carousel from "react-elastic-carousel";
import "./styles.css";
import ItemCard from "./ItemCard";
// import { Carousel } from "antd";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";

const contentStyle = {
  height: "300px",
  width: "100%",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

export default function Banner() {
  const [index, setIndex] = useState(0);

  const theme = useTheme();

  const xsmall = useMediaQuery(theme.breakpoints.up("xs"));
  const small = useMediaQuery(theme.breakpoints.up("sm"));
  const medium = useMediaQuery(theme.breakpoints.up("md"));
  const large = useMediaQuery(theme.breakpoints.up("lg"));

  let carouselHeight = "20rem";

  if (large) {
    carouselHeight = "40rem";
  } else if (medium) {
    carouselHeight = "35rem";
  } else if (small) {
    carouselHeight = "30rem";
  }

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  const items = [
    {
      id: 1,
      //title: "OctoberFest 2021 is here!",
      //subtitle: "Celebrate beer in Covid times",
      image: "images/27th-annual.png",
      url: "#",
    },
    {
      id: 2,
      //title: "Discover the new Fall Stouts",
      //subtitle: "Guiness, Dark Horse & PumpStout",
      image: "images/og.png",
      url: "#",
    },
    {
      id: 3,
      //title: "The perfect home brewing kit",
      //subtitle: "Brew you own beer this winter",
      image: "images/toronto.png",
      url: "#",
    },
    {
      id: 4,
      //title: "The perfect home brewing kit",
      //subtitle: "Brew you own beer this winter",
      image: "images/newmarket.png",
      url: "#",
    },
  ];

  return (
    <div>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        {items.map((item) => (
          <Carousel.Item>
            <ItemCard image={item.image}></ItemCard>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

{
  /* <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption> */
}
