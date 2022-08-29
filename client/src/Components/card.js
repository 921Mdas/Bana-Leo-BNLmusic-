// External Imports
import React from "react";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import { GiWorld } from "react-icons/gi";
import { BsMusicNote, BsCalendarDate, BsPlayCircle } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { GiDrum } from "react-icons/gi";

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
      <GiDrum className="mini_logo_card" />
      <Card.Img variant="top" className="mac_artistPicture" src={picture} />

      <Card.Body className="mac_cardbody">
        <Card.Text className="mac_Bio">
          <span>{name}</span>
          {bio ? ` ${bio.substring(0, 150)} ...` : bio}
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
