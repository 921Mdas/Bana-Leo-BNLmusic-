import React, { useState, useRef } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";

//  Boostrap
import { Button, Form } from "react-bootstrap";
import { BiEqualizer } from "react-icons/bi";
import { HiUpload } from "react-icons/hi";
import { FiDisc } from "react-icons/fi";
import { RiMusic2Line } from "react-icons/ri";
import { BsSoundwave } from "react-icons/bs";

const FormInit = {
  file: "",
  genre: "",
  description: "",
  tags: "",
};

const SongSchema = Yup.object({
  file: Yup.string().required("please select an audio file"),
  genre: Yup.string(),
  description: Yup.string(),
  tags: Yup.string(),
});

const UploadForm = ({ sendMusic, playMusic, savedData }) => {
  const FileUpload = useRef(null);
  // const [songstate, setSongState] = useState({
  //   songname: "",
  //   song: "",
  // });

  // const handleChange = e => {
  //   e.preventDefault();
  //   const targetName = e.target.name;
  //   const targetValue = e.target.value;
  //   setSongState({ ...songstate, [targetName]: targetValue });
  // };

  const awsSubmit = async e => {
    console.log(e);
  };

  return (
    <>
      <Formik
        initialValues={FormInit}
        // validationSchema={SongSchema}
        onSubmit={(values, { resetForm }) => {
          const file = FileUpload?.current?.files[0];
          axios.post("/tracks/:id/uploadsongs", file);
        }}
      >
        {({ handleSubmit, handleBlur, handleChange, handleReset, errors }) => (
          <Form className="uploadform">
            <Form.Group>
              <Form.Label htmlFor="file" className="upload_label">
                <p>Click to Upload</p>
                <BsSoundwave className="upload_icon" />
              </Form.Label>
              <Form.Control
                type="file"
                name="file"
                id="file"
                accept="audio/*"
                placeholder="upload here"
                className="dissapear"
                ref={FileUpload}
                onChange={handleChange("file")}
                onBlur={handleBlur("file")}
              />
            </Form.Group>
            <Button className="uploadBtn" onClick={e => handleSubmit(e)}>
              <HiUpload className="upload_icon_btn" />
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );

  // return (
  //   <Form
  //     className="uploadform"
  //     action="/tracks/:id/uploadsongs"
  //     method="POST"
  //     encType="multipart/form-data"
  //   >
  //     <BiEqualizer className="equalizer_icon" />
  //     <Form.Label htmlFor="songname">
  //       <Form.Control
  //         type="text"
  //         name="songname"
  //         id="songname"
  //         placeholder="enter track name"
  //         value={songstate.songname}
  //         onChange={e => handleChange(e)}
  //       />
  //     </Form.Label>
  //     <Form.Label htmlFor="song">
  //       <Form.Control
  //         type="text"
  //         name="song"
  //         id="song"
  //         placeholder="Song url / Aws format"
  //         onChange={e => handleChange(e)}
  //       />
  //     </Form.Label>
  //     <Button className="uploadBtn" onClick={e => handleSubmit(e)}>
  //       <HiUpload className="upload_icon_btn" />
  //     </Button>
  //   </Form>
  //   // <Form
  //   //   className="uploadform"
  //   //   action="/tracks/:id/uploadsongs"
  //   //   method="POST"
  //   //   encType="multipart/form-data"
  //   // >
  //   //   <BiEqualizer className="equalizer_icon" />
  //   //   <Form.Label htmlFor="songname">
  //   //     <Form.Control
  //   //       type="text"
  //   //       name="songname"
  //   //       id="songname"
  //   //       placeholder="enter track name"
  //   //       value={songstate.songname}
  //   //       onChange={e => handleChange(e)}
  //   //     />
  //   //   </Form.Label>
  //   //   <Form.Label htmlFor="song">
  //   //     <Form.Control
  //   //       type="text"
  //   //       name="song"
  //   //       id="song"
  //   //       placeholder="Song url / Aws format"
  //   //       onChange={e => handleChange(e)}
  //   //     />
  //   //   </Form.Label>
  //   //   <Button className="uploadBtn" onClick={e => handleSubmit(e)}>
  //   //     <HiUpload className="upload_icon_btn" />
  //   //   </Button>
  //   // </Form>
  // );
};

export default UploadForm;

// https://httpbin.org/anything  - use this  link to test if the post is working should return data back to you
// axios.post('http://localhost:3001/tracks/:id/uploadsongs', data).then(res => console.log(res)).catch(err =>{
//    console.log(err)
// })
