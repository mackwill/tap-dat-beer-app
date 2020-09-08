import React, { useState } from "react";
import "./styles.css";
import ItemCard from "./ItemCard";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

export default function Banner() {
  const [index, setIndex] = useState(0);

  const theme = useTheme();

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  const items = [
    {
      id: 1,
      image: "images/27th-annual-Great-Canadian-Beer-Festival-2019.jpg",
      url: "#",
    },
    {
      id: 2,
      image: "images/og-summer.jpg",
      url: "#",
    },
    {
      id: 3,
      image: "images/toronto-craft-beer-festival-1885192-3157672-regular.jpg",
      url: "#",
    },
    {
      id: 4,
      image:
        "images/newmarket-craftbeer-food-festival-2003262-3623942-regular.jpg",
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
