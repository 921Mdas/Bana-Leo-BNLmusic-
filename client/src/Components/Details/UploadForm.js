// External Imports
import React, { useState, useRef } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import { BiEqualizer } from "react-icons/bi";
import { HiUpload } from "react-icons/hi";
import { FiDisc } from "react-icons/fi";
import { RiMusic2Line } from "react-icons/ri";
import { BsSoundwave, BsCloudCheckFill } from "react-icons/bs";

//  Internal Imports
import { Load } from "../../Context/helper";

const UploadForm = ({ sendMusic }) => {
  const FileUpload = useRef(null);
  const [formState, setFormState] = useState({
    file: "",
  });
  const [isUploaded, setIsUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isprogress, setIsProgress] = useState(0);
  const fileName = formState?.file?.name?.split(".")[0];
  const handleChange = e => {
    e.preventDefault();
    const targetName = e.target.name;
    const targetValue = e.target.files[0];

    if (targetName && targetValue) {
      setFormState({ ...formState, [targetName]: targetValue });
      setIsUploaded(true);
      setIsProgress(0);
    } else {
      console.log("form incomplete");
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", formState.file);
    setIsLoading(true);
    const progress = await sendMusic(data, fileName);
    console.log("onsubmit", progress);
    setIsProgress(progress);
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
        <ProgressBar now={isprogress} className="pg_bar" variant="warning" />
      </Form>
    </>
  );
};

export default UploadForm;
