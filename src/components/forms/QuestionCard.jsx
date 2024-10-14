/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useState, useEffect } from "react";
import AnswerOptions from "./AnswerOptions";

import "./QuestionCard.css";

export default function QuestionCard({
  id,
  index,
  question,
  setQuestions,
  answerType,
  propOptions,
  onQuestionChange,
  onAnswerTypeChange,
  removeQuestion,
}) {
  // const [singleQuestion, setSingleQuestion] = useState(tempQ);
  const [options, setOptions] = useState(
    // propOptions != [""] ? propOptions : [""]
    [""]
  );
  const [toggled, setIsToggled] = useState(false);

  function handleOptionChange(i, value) {
    const newOptions = [...options];
    newOptions[i] = value;
    setOptions(newOptions);

    // setSingleQuestion((prev) => ({ ...prev, options: newOptions }));
    setQuestions((prev) =>
      prev.map((p) => (p.id === id ? { ...p, options: newOptions } : p))
    );
  }

  function addOption() {
    setOptions([...options, ""]);
  }

  // useEffect(()=>{

  // },[])
  function handleToggleRequired() {
    setIsToggled((toggled) => !toggled);
    setQuestions((prev) =>
      prev.map((p) => (p.id === id ? { ...p, required: toggled } : p))
    );
  }
  // console.log(toggled);

  return (
    <div className="question-div">
      <h4>Question {index + 1}</h4>
      <input
        type="text"
        value={question}
        onChange={(e) => onQuestionChange(index, e.target.value)}
        placeholder="Enter your question"
        className="question-input"
      />
      <select
        value={answerType}
        onChange={(e) => onAnswerTypeChange(index, e.target.value)}
        className="answer-type-select"
      >
        <option value="default">Select an answer type</option>
        <option value="short answer">Short Answer</option>
        <option value="long answer">Long Answer</option>
        <option value="mcq">Multiple Choice (MCQ)</option>
        <option value="multiple-select">Multiple Select</option>
        <option value="dropdown">Dropdown</option>
      </select>
      <AnswerOptions
        options={options}
        answerType={answerType}
        handleOptionChange={handleOptionChange}
        addOption={addOption}
        setOptions={setOptions}
      />
      <span
        className="remove-link"
        onClick={() => {
          if (
            window.confirm(
              `Are you sure you want to remove question number ${index + 1}?`
            )
          ) {
            removeQuestion(index, id);
          }
        }}
        style={{ marginLeft: "10px", cursor: "pointer", color: "#d9534f" }}
      >
        Remove
      </span>
      <div className="required-toggle" onClick={handleToggleRequired}>
        <label className="switch">
          <input type="checkbox" onChange={handleToggleRequired} />
          <span className="slider round"></span>
        </label>
        <span className="required-text">Required*</span>
      </div>
    </div>
  );
}
