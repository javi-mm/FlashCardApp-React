import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./Slider.scss";
import { NextArrow, PrevArrow } from "./CustomArrows.jsx";

const CustomSlider = (props) => {
  const settings = {
    infinite: false,
    speed: 400,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="slider_wrapper">
      <Slider {...settings}>{props.children}</Slider>
    </div>
  );
};

export default CustomSlider;
