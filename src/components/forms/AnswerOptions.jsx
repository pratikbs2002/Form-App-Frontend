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
}) {
  return (
    <div>
      {answerType === "mcq" ||
      answerType === "multiple-select" ||
      answerType === "dropdown" ? (
        <>
          {options.map((option, index) => (
            <div key={index} className="option-input-container">
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="option-input"
                placeholder={`Option ${index + 1}`}
              />
              {index > 0 && (
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
          <button className="styled-button" onClick={addOption}>
            Add Option
          </button>
        </>
      ) : null}
    </div>
  );
}
