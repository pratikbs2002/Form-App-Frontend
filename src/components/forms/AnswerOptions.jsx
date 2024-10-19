/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect } from "react";

import "./AnswerOptions.css";
import { MdClose } from "react-icons/md";
export default function AnswerOptions({
  answerType,
  options,
  handleOptionChange,
  handleOptionRemove,
  addOption,
  setOptions,
  preview,
}) {
  useEffect(() => {
    console.log(options);
  }, [setOptions, options]);

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
                <div className="radio">
                  <p style={{ margin: 0 }}>{index + 1}.</p>
                </div>
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
                    handleOptionRemove && handleOptionRemove(index)
                    const newOptions = options.filter((_, i) => i !== index);
                    // // handleOptionChange(newOptions)
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
