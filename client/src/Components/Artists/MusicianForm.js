import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
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

import InputCtrl from "./InputCtrl";
import SubmitBtn from "./SubmitBtn";

const MusicianForm = ({ dispatch, COMMANDS, addArtistForm, state }) => {
  const defaultValues = {
    name: "",
    picture: "",
    song: "",
    country: "",
    year: "",
    bio: "",
  };

  const validation = Yup.object({
    name: Yup.string().required("enter name").max(10, "Too long"),
    picture: Yup.string().required("include picture URL"),
    song: Yup.string(),
    country: Yup.string().required("Nationality ?"),
    year: Yup.string(),
    bio: Yup.string(),
  });

  return (
    <div className="App-header-form">
      <Formik
        initialValues={defaultValues}
        validationSchema={validation}
        onSubmit={async (values, { resetForm }) => {
          console.log(values);
          await dispatch({
            type: COMMANDS.CREATE_NEW_ARTISTS,
            payload: values,
          });
          addArtistForm();
        }}
      >
        {({
          values,
          handleBlur,
          handleSubmit,
          handleChange,
          errors,
          touched,
          isSubmitting,
        }) => (
          <>
            <InputCtrl
              handleChange={handleChange}
              handleBlur={handleBlur}
              placeholder="Enter name *"
              inputName="name"
              Icon={BsPerson}
              InputType="text"
              valueType={values.name}
              errors={errors}
              touched={touched}
            />
            <InputCtrl
              handleChange={handleChange}
              handleBlur={handleBlur}
              placeholder="Enter country"
              inputName="country"
              Icon={GiWorld}
              InputType="text"
              errors={errors}
              touched={touched}
            />
            <InputCtrl
              handleChange={handleChange}
              handleBlur={handleBlur}
              placeholder="Enter picture URL *"
              inputName="picture"
              Icon={AiOutlinePicture}
              InputType="text"
              errors={errors}
              touched={touched}
            />
            <div className="song_details_form">
              <InputCtrl
                handleChange={handleChange}
                handleBlur={handleBlur}
                placeholder="Enter Hit Title"
                inputName="song"
                Icon={IoMusicalNote}
                InputType="text"
                errors={errors}
                touched={touched}
              />
              <InputCtrl
                handleChange={handleChange}
                handleBlur={handleBlur}
                placeholder="Enter Hit Year"
                inputName="year"
                Icon={BsCalendar2Date}
                InputType="number"
                errors={errors}
                touched={touched}
              />
            </div>
            <InputCtrl
              handleChange={handleChange}
              handleBlur={handleBlur}
              placeholder="Enter bio"
              inputName="bio"
              Icon={BsPersonLinesFill}
              InputType="textarea"
              errors={errors}
              touched={touched}
            />
            <SubmitBtn
              handleSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          </>
        )}
      </Formik>
    </div>
  );
};

export default MusicianForm;
