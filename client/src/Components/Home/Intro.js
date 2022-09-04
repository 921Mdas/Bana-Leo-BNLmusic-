import React from "react";
import { Fade } from "react-awesome-reveal";

const Intro = () => {
  return (
    <div className="home_headlines">
      <Fade delay={500} triggerOnce={true}>
        <h2 className="intro_title"> EXPLORE</h2>
      </Fade>
      <Fade delay={600} triggerOnce={true}>
        <h2>
          <span className="styledHeadline">Legendary African Jazz hits</span>
        </h2>
      </Fade>
    </div>
  );
};

export default Intro;
