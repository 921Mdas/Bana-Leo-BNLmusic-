// External Imports
import React from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { RiErrorWarningLine } from "react-icons/ri";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlinePicture } from "react-icons/ai";
import { BiText } from "react-icons/bi";
import { GrFlag } from "react-icons/gr";
import { GiWorld } from "react-icons/gi";
import { BsCalendar2Date } from "react-icons/bs";
import { BsPersonLinesFill } from "react-icons/bs";
import { IoMusicalNote } from "react-icons/io5";

// Internal Imports
import { NavigateSomewhere } from "../../Context/helper";

const UpdateForm = ({ state, handleOnChange, updateArtistForm }) => {
  let titleState = state.update[0] ? "Edit" : "Enter";

  return (
    <div>
      <Form className="artist-submission">
        <Form.Label htmlFor="name" className="update_form_label">
          <div className="label_text update_label_text">
            <BsPerson className="field_icon" /> <p>{`${titleState} name`}</p>
          </div>
          <Form.Control
            type="text"
            id="name"
            name="name"
            value={state.name}
            onChange={e => handleOnChange(e)}
            className="form_input_ctrl"
          />
        </Form.Label>
        <Form.Label htmlFor="picture" className="update_form_label">
          <div className="label_text update_label_text">
            <GiWorld className="field_icon" />{" "}
            <p>{`${titleState} picture URL`}</p>
          </div>
          <Form.Control
            placeholder="enter URL for picture"
            type="text"
            id="picture"
            name="picture"
            value={state.picture}
            onChange={e => handleOnChange(e)}
            className="form_input_ctrl"
          />
        </Form.Label>
        <Form.Label htmlFor="song" className="update_form_label">
          <div className="label_text update_label_text">
            <AiOutlinePicture className="field_icon" />{" "}
            <p>{`${titleState} Hit Song`} </p>
          </div>
          <Form.Control
            type="text"
            id="song"
            name="song"
            placeholder="Hit song title"
            value={state.song}
            onChange={e => handleOnChange(e)}
            className="form_input_ctrl"
          />
        </Form.Label>
        <div className="update_form_mid_section">
          <Form.Label
            htmlFor="country"
            className="update_form_label mid_sections"
          >
            <div className="label_text update_label_text">
              <IoMusicalNote className="field_icon" />{" "}
              <p>{`${titleState} Country`}</p>
            </div>
            <Form.Control
              type="text"
              id="country"
              name="country"
              placeholder="Country"
              value={state.country}
              onChange={e => handleOnChange(e)}
              className="form_input_ctrl"
            />
          </Form.Label>
          <Form.Label htmlFor="year" className="update_form_label mid_sections">
            <div className="label_text update_label_text">
              <BsCalendar2Date className="field_icon" /> <p>Enter Hit Year</p>
            </div>
            <Form.Control
              type="number"
              id="year"
              name="year"
              value={state.year}
              placeholder="Hit song year of release"
              onChange={e => handleOnChange(e)}
              className="form_input_ctrl"
            />
          </Form.Label>
        </div>
        <Form.Label htmlFor="bio" className="update_form_label">
          <div className="label_text update_label_text">
            <BsPersonLinesFill className="field_icon" />{" "}
            <p>{`${titleState} Bio`}</p>
          </div>
          <Form.Control
            as="textarea"
            rows={3}
            id="bio"
            name="bio"
            value={state.bio}
            placeholder="Quick description"
            onChange={e => handleOnChange(e)}
            className="form_input_ctrl"
          />
        </Form.Label>
      </Form>
      <div className="submission_btns">
        <Link to="/home">
          <Button className="cancel" onClick={() => NavigateSomewhere("/home")}>
            Cancel
          </Button>
        </Link>

        <Button className="submission" onClick={() => updateArtistForm()}>
          Update info
        </Button>
      </div>
    </div>
  );
};

export default UpdateForm;
