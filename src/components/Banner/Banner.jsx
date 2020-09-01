import React from "react";
import Carousel from "react-elastic-carousel";
import "./styles.css";
import ItemCard from "./ItemCard";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 768, itemsToShow: 2 },
  { width: 1200, itemsToShow: 3 },
];

export default function Banner() {
  const items = [
    {
      id: 1,
      title: "OctoberFest 2021 is here!",
      subtitle: "Celebrate beer in Covid times",
      image: "images/banner_oktober.jpg",
      url: "#",
    },
    {
      id: 2,
      title: "Discover the new Fall Stouts",
      subtitle: "Guiness, Dark Horse & PumpStout",
      image: "images/banner_stout.jpg",
      url: "#",
    },
    {
      id: 3,
      title: "The perfect home brewing kit",
      subtitle: "Brew you own beer this winter",
      image: "images/banner_brewing_kit.jpg",
      url: "#",
    },
  ];

  return (
    <box p={"1rem"}>
      <div className="App">
        <Carousel breakPoints={breakPoints}>
          {items.map((item) => (
            <ItemCard
              title={item.title}
              image={item.image}
              url={item.url}
              subtitle={item.subtitle}
            />
          ))}
        </Carousel>
      </div>
    </box>
  );
}
