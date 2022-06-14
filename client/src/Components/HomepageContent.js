// state
import React from "react";

// bootstrap
import { Button } from "react-bootstrap";
import Footer from "./Footer";

function HomepageContent() {
  return (
    <>
      <div className="moreContent">
        <div className="explore_history">
          <div className="preview">
            <iframe
              width="600"
              height="315"
              src="https://www.youtube.com/embed/nw0n3BMib1I"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="description">
            <h3>ORIGINE OF AFRO RUMBA</h3>
            <p>
              UN cultural agency adds musical genre and dance to intangible
              heritage list for its cultural value and power in social cohesion.
              Spend less time searching for rumba music online and more time
              enjoying high-quality, handpicked tracks covering every mood and
              genre.
            </p>

            <Button className="primary Discover">
              <a
                href="https://www.aljazeera.com/news/2021/12/15/congolese-rumba-added-unesco-heritage-list"
                target="/"
              >
                Discover
              </a>
            </Button>
          </div>
        </div>
        <div className="concerts">
          <h1>Explore Historic SHOWS</h1>
          <div className="concert-info">
            <div className="concert concert-location1">
              <h1>
                <a
                  href="https://en.wikipedia.org/wiki/Stade_des_Martyrs"
                  target="/"
                >
                  Stade des martyrs
                </a>
              </h1>
            </div>
            <div className="concert concert-location2">
              <h1>
                <a
                  href="https://en.wikipedia.org/wiki/Olympia_(Paris)"
                  target="/"
                >
                  Olympia
                </a>
              </h1>
            </div>
            <div className="concert concert-location3">
              <h1>
                {" "}
                <a href="https://en.wikipedia.org/wiki/Accor_Arena" target="/">
                  Accor Arena
                </a>{" "}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HomepageContent;
