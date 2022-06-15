import React, { useState, useContext, useEffect, useRef } from "react";

//  Boostrap
import { Button, Form } from "react-bootstrap";
import { BiEqualizer } from "react-icons/bi";
import { HiUpload } from "react-icons/hi";

const UploadForm = ({ sendMusic, playMusic, savedData }) => {
  const [songstate, setSongState] = useState({
    songname: "",
    song: "",
  });

  const handleChange = e => {
    e.preventDefault();
    const targetName = e.target.name;
    const targetValue = e.target.value;
    setSongState({ ...songstate, [targetName]: targetValue });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await sendMusic(songstate);
    setSongState({ songname: "", song: "" });
  };

  useEffect(() => {
    if (savedData) {
      playMusic(savedData._id);
    }
  }, []);

  return (
    <Form
      className="uploadform"
      action="/tracks/:id/uploadsongs"
      method="POST"
      encType="multipart/form-data"
    >
      <BiEqualizer className="equalizer_icon" />
      <Form.Label htmlFor="songname">
        <Form.Control
          type="text"
          name="songname"
          id="songname"
          placeholder="enter track name"
          value={songstate.songname}
          onChange={e => handleChange(e)}
        />
      </Form.Label>
      <Form.Label htmlFor="song">
        <Form.Control
          type="text"
          name="song"
          id="song"
          placeholder="Song url / Aws format"
          onChange={e => handleChange(e)}
        />
      </Form.Label>
      <Button className="uploadBtn" onClick={e => handleSubmit(e)}>
        <HiUpload className="upload_icon_btn" />
      </Button>
    </Form>
  );
};

export default UploadForm;

// https://httpbin.org/anything  - use this  link to test if the post is working should return data back to you
// axios.post('http://localhost:3001/tracks/:id/uploadsongs', data).then(res => console.log(res)).catch(err =>{
//    console.log(err)
// })
