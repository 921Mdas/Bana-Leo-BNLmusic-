// External Imports
import React from "react";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import { GiWorld } from "react-icons/gi";
import { BsMusicNote, BsCalendarDate, BsPlayCircle } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";

const CardArtist = ({
  name,
  country,
  song,
  bio,
  picture,
  year,
  _id,
  handleDeleteArtist,
  handleUpdateArtist,
  playMusic,
}) => {
  return (
    <Card className="mac_card">
      <Card.Img variant="top" className="mac_artistPicture" src={picture} />

      <Card.Body className="mac_cardbody">
        <Card.Title className="mac_artistName" style={{ fontWeight: "bold" }}>
          {name}
        </Card.Title>
        <Card.Text className="mac_Bio">
          {bio ? ` ${bio.substring(0, 110)} ...` : bio}
          <div className="artist_sub_details">
            <Card.Subtitle className="mac_cardSubtitle">
              <GiWorld className="mac_icon" /> <span>{country}</span>
            </Card.Subtitle>
            <Card.Subtitle className="mac_cardSubtitle">
              <BsMusicNote className="mac_icon" /> <span> {song}</span>
            </Card.Subtitle>
            <Card.Subtitle className="mac_cardSubtitle">
              <BsCalendarDate className="mac_icon" /> <span>{year}</span>
            </Card.Subtitle>
          </div>
        </Card.Text>

        <div className="mac_actions">
          <Button variant="transparent" onClick={() => playMusic(_id)}>
            <Link to="/bio/:id">
              <BsPlayCircle className=" play_list_icon" />
            </Link>
          </Button>
          <Button
            variant="transparent"
            className="updateBtn "
            onClick={() => handleUpdateArtist(_id)}
          >
            <FiEdit color="white" className="card_btn_icon" />
          </Button>
          <Button
            variant="transparent"
            className="deleteBtn "
            onClick={() => handleDeleteArtist(_id)}
          >
            <AiFillDelete color="white" className="card_btn_icon" />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardArtist;
