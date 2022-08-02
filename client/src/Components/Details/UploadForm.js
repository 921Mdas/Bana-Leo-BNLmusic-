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

const UploadForm = ({ sendMusic }) => {
  const FileUpload = useRef(null);
  const [formState, setFormState] = useState({
    file: "",
  });

  const handleChange = e => {
    e.preventDefault();
    const targetName = e.target.name;
    const targetValue = e.target.files[0];

    if (targetName && targetValue) {
      setFormState({ ...formState, [targetName]: targetValue });
    } else {
      console.log("form incomplete");
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", formState.file);
    const fileName = formState.file.name.split(".")[0];
    sendMusic(data, fileName);
  };

  // form that uploads audio files to aws S3 bucket

  return (
    <>
      <Form className="uploadform" action="#">
        <Form.Label htmlFor="file" className="upload_label">
          <p>Click to Upload</p>
          <BsSoundwave className="upload_icon" />
        </Form.Label>
        <Form.Control
          type="file"
          name="file"
          id="file"
          ref={FileUpload}
          onChange={e => handleChange(e)}
          className="dissapear"
        />

        <Button className="uploadBtn" onClick={e => handleSubmit(e)}>
          <HiUpload className="upload_icon_btn" />
        </Button>
      </Form>
    </>
  );
};

export default UploadForm;
