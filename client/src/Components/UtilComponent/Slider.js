// external imports

import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Fade } from "react-awesome-reveal";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BsCalendar2Minus, BsClockHistory } from "react-icons/bs";
import { HiOutlineLocationMarker, HiOutlineTicket } from "react-icons/hi";

// internal imports
import { COUNTER } from "../../Context/helper";

export const SliderComp = ({ settings, data }) => {
  const { concert_01, concert_02, concert_03 } = data;

  return (
    <Slider {...settings} autoplay>
      <SliderItem data={concert_01} />
      <SliderItem data={concert_02} />
      <SliderItem data={concert_03} />
    </Slider>
  );
};

const SliderItem = ({ data }) => {
  const end = 30;
  const [start, setStart] = useState(0);
  const counter = () => {
    if (start < end) {
      setStart(prevcount => prevcount + 1);
    }
  };

  useEffect(() => {
    if (start > 0 && start < end) {
      setTimeout(() => {
        setStart(prevcount => prevcount + 1);
      }, 30);
    }
  }, [start]);

  return (
    <div className="slider_item">
      <div className="image_slider">
        <img src={data.image} />
      </div>
      <div className="concert_info">
        <h1 className="concert_info_title"> {data?.title || "Concert Info"}</h1>
        <h1 className="concert_info_counter">
          <COUNTER end={30} />
        </h1>
        <div className="final_concert_details">
          <span className="concert_info_location">
            {/* <HiOutlineLocationMarker className="concert_icon" />
            <h3>{data?.location || "Location"}</h3> */}
          </span>
          <span className="concert_info_price">
            {/* <HiOutlineTicket className="concert_icon" />
            <h3> {data?.price || "Price"}</h3> */}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SliderComp;
