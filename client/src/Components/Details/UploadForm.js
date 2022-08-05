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
import { BsSoundwave, BsCloudCheckFill } from "react-icons/bs";
import { Load } from "../../Context/helper";

const UploadForm = ({ sendMusic }) => {
  const FileUpload = useRef(null);
  const [formState, setFormState] = useState({
    file: "",
  });
  const [isUploaded, setIsUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileName = formState?.file?.name?.split(".")[0];
  const handleChange = e => {
    e.preventDefault();
    const targetName = e.target.name;
    const targetValue = e.target.files[0];

    if (targetName && targetValue) {
      setFormState({ ...formState, [targetName]: targetValue });
      setIsUploaded(true);
    } else {
      console.log("form incomplete");
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", formState.file);
    setIsLoading(true);
    await sendMusic(data, fileName);
    setIsLoading(false);
    setIsUploaded(false);
  };

  // form that uploads audio files to aws S3 bucket
  return (
    <>
      <Form className="uploadform" action="#">
        <Form.Label htmlFor="file" className="upload_label">
          <p>
            Click to Upload{" "}
            <span>{fileName && isUploaded ? fileName : ""}</span>
          </p>{" "}
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

        <Button
          className={`uploadBtn ${isUploaded ? "" : "disabled_btn"}`}
          disabled={isUploaded ? false : true}
          onClick={e => handleSubmit(e)}
        >
          {isUploaded ? (
            <BsCloudCheckFill className="upload_success" color="white" />
          ) : (
            <HiUpload className="upload_icon_btn" />
          )}
        </Button>
      </Form>
    </>
  );
};

export default UploadForm;
