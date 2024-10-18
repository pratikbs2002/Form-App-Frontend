/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

import "./AnswerOptions.css";
import { MdClose } from "react-icons/md";
export default function AnswerOptions({
  answerType,
  options,
  handleOptionChange,
  addOption,
  setOptions,
  preview,
}) {
  return (
    <div>
      {answerType === "mcq" ||
      answerType === "multiple-select" ||
      answerType === "dropdown" ? (
        <>
          {options.map((option, index) => (
            <div key={index} className="option-input-container">
              {answerType === "mcq" && (
                <input type="radio" disabled className="radio" />
              )}
              {answerType === "multiple-select" && (
                <input type="checkbox" disabled className="radio" />
              )}
              {answerType === "dropdown" && (
                <p className="radio">{index + 1}.</p>
              )}
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                // onChange={(e) => console.log(e.target.value)}
                className="option-input"
                placeholder={`Option ${index + 1}`}
                disabled={preview}
              />
              {options.length > 1 && !preview && (
                <span
                  className="remove-link"
                  onClick={() => {
                    const newOptions = options.filter((_, i) => i !== index);
                    setOptions(newOptions);
                  }}
                  style={{
                    marginLeft: "10px",
                    cursor: "pointer",
                    color: "#d9534f",
                  }}
                >
                  <MdClose />
                </span>
              )}
            </div>
          ))}
          {!preview && (
            <button className="styled-button" onClick={addOption}>
              Add Option
            </button>
          )}
        </>
      ) : null}
    </div>
  );
}
