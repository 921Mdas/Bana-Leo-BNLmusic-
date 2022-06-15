import React from "react";
import { Link } from "react-router-dom";

// Bootstrap
import { Button, Card } from "react-bootstrap";

// icons
import { RiCopyrightLine } from "react-icons/ri";
import { GiWorld } from "react-icons/gi";
import {
  BsMusicNote,
  BsCalendarDate,
  BsFilePerson,
  BsPlayCircle,
} from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";

const CardArtist = ({
  name,
  country,
  song,
  bio,
  picture,
  year,
  copyright,
  _id,
  handleDeleteArtist,
  handleUpdateArtist,
  playMusic,
  FIRST_PAGE,
  SECOND_PAGE,
  currentPage,
  setCurrentPage,
}) => {
  return (
    <Card className="card">
      <div className="imageFiller"></div>
      <Card.Img variant="top" className="artistPicture" src={picture} />

      <Card.Body>
        <Card.Title className="artistName" style={{ fontWeight: "bold" }}>
          <BsFilePerson /> {name}
        </Card.Title>
        <div className="cardDetails">
          <Card.Subtitle className="cardSubtitle">
            <GiWorld className="icon" /> <span>{country}</span>
          </Card.Subtitle>
          <Card.Subtitle className="cardSubtitle">
            <BsMusicNote className="icon" /> <span> {song}</span>
          </Card.Subtitle>
          <Card.Subtitle className="cardSubtitle">
            <BsCalendarDate className="icon" /> <span>{year}</span>
          </Card.Subtitle>
        </div>
        <Card.Text className="Bio">
          {bio ? ` ${bio.substring(0, 100)} ...` : bio}
        </Card.Text>
        <div className="actions">
          <Button
            variant="light"
            className="playlist"
            onClick={() => playMusic(_id)}
          >
            <Link to="/bio/:id">
              <BsPlayCircle />
            </Link>
          </Button>

          <Button
            variant="secondary"
            className="updateBtn"
            onClick={() => handleUpdateArtist(_id)}
          >
            <FiEdit />
          </Button>
          <Button
            variant="danger"
            className="deleteBtn"
            onClick={() => handleDeleteArtist(_id)}
          >
            <AiFillDelete />
          </Button>
        </div>
        {copyright ? <RiCopyrightLine className="copyrightIcon" /> : ""}
      </Card.Body>
    </Card>
  );
};

export default CardArtist;
