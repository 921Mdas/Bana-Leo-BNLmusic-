import React from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { Placeholder } from "react-bootstrap";

const InputCtrl = ({
  placeholder,
  handleChange,
  handleBlur,
  inputName,
  Icon,
  InputType,
  // valueType,
  errors,
  touched,
  defaultVal,
  handleChangingForm,
}) => {
  return (
    <div className="input_ctrl">
      <label htmlFor={inputName} className="label_text">
        <Icon className="field_icon" /> {placeholder}
      </label>
      <div>
        {InputType === "textarea" ? (
          <textarea
            type={InputType}
            name={inputName}
            id={inputName}
            rows="4"
            cols="50"
            style={{ resize: "none" }}
            onChange={handleChange}
            onBlur={handleBlur}
            className="artist_input_field"
            value={defaultVal}
            // onChange={e => handleChangingForm(e)}

            // values={valueType}
          />
        ) : (
          <input
            type={InputType}
            name={inputName}
            id={inputName}
            onChange={handleChange}
            onBlur={handleBlur}
            className="artist_input_field"
            value={defaultVal}
            // onChange={e => handleChangingForm(e)}

            // values={valueType}
          />
        )}
      </div>

      <div>
        {errors[inputName] && touched[inputName] && (
          <div className="artist_input_textmessage">
            <RiErrorWarningLine
              color="rgb(214, 54, 107)"
              className="warning_icon"
            />
            <p>{errors[inputName]}</p>
          </div>
        )}
        {!errors[inputName] && touched[inputName] && (
          <AiOutlineCheckCircle
            color="green"
            className="artist_message_icon_success"
          />
        )}
      </div>
    </div>
  );
};

export default InputCtrl;
