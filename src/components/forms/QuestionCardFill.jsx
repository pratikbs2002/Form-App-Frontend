/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useState, useEffect } from "react";
import AnswerOptions from "./AnswerOptions";

import "./QuestionCard.css";
import { MdClose } from "react-icons/md";
import AnswerFill from "./AnswerFill";

export default function QuestionCardFill({
  id,
  index,
  question,
  form,
  setQuestions,
  answerType,
  mainAnswers,
  propOptions,
  requiredProp,
  setAnswerOnChange,
  isFilling,
  onQuestionChange,
  onAnswerTypeChange,
  removeQuestion,
  questionLength,
}) {
  // console.log(question);

  const [options, setOptions] = useState(propOptions ? propOptions : [""]);
  const [toggled, setIsToggled] = useState(requiredProp);
  const [testForm, setTestForm] = useState(form);
  const [answer, setAnswer] = useState([]);

  useEffect(() => {
    setOptions(propOptions);
  }, [propOptions]);

  let answer_type = "Default";
  if (answerType === "short answer") {
    answer_type = "Short Answer";
  } else if (answerType === "long answer") {
    answer_type = "Long Answer";
  } else if (answerType === "mcq") {
    answer_type = "Multiple Choice (MCQ)";
  } else if (answerType === "multiple-select") {
    answer_type = "Multiple Select (MSQ)";
  } else if (answerType === "dropdown") {
    answer_type = "Dropdown";
  }

  useEffect(() => {
    setAnswerOnChange((prev) =>
      prev.map((a) => (a.answer_id === id ? { ...a, answer: answer } : a))
    );
  }, [answer]);

  const handleCheckbox = (o) => {
    if (answer.includes(o)) {
      setAnswer((prev) => prev.filter((a) => a !== o));
    } else {
      setAnswer((prev) => [...prev, o]);
    }
  };

  return (
    <div className="question-div">
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <h2 style={{ marginTop: 0, marginBottom: "10px" }}>
          Question {index + 1}
        </h2>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
        }}
      >
        <h1 style={{ float: "left", marginTop: 0 }}>{question}</h1>
      </div>

      <div>
        {answerType === "mcq" &&
          options.map((o, index) => (
            <div key={`${question} ${o}`} className="option-container">
              <input
                type="radio"
                id={o}
                name={`name_${question}`}
                value={o}
                className="radio"
                onClick={() => setAnswer(o)}
              />
              <label className="option">{o}</label>
              <br />
            </div>
          ))}
        {answerType === "multiple-select" &&
          options.map((o) => {
            return (
              <div key={`${question} ${o}`} className="option-container">
                <input
                  type="checkbox"
                  id={o}
                  name={o}
                  value={o}
                  onClick={() => handleCheckbox(o)}
                  className="radio"
                />
                <label className="option"> {o}</label>
                <br />
              </div>
            );
          })}
        {answerType === "dropdown" && (
          <select
            name={question}
            id={question}
            className="answer-type-select"
            onChange={(e) => setAnswer(e.target.value)}
          >
            <option style={{ display: "none" }}>Select an answer</option>
            {options.map((o) => 
              <option key={`${question} ${o}`} value={o}>{o}</option>
            )}
          </select>
        )}
        {answerType === "short answer" && (
          <input
            placeholder="Short Answer"
            className="answer-input"
            onChange={(e) => setAnswer(e.target.value)}
          />
        )}
        {answerType === "long answer" && (
          <textarea
            placeholder="Long Answer"
            className="answer-textbox"
            onChange={(e) => setAnswer(e.target.value)}
          />
        )}
      </div>

      {/* <AnswerFill
        options={options}
        answerType={answerType}
        handleOptionChange={handleOptionChange}
        addOption={addOption}
        setOptions={setOptions}
        preview={isFilling}
      /> */}
      <div style={{ height: "20px" }}>
        <div className="required-toggle">
          <span>{toggled && "Required*"}</span>
        </div>
      </div>
    </div>
  );
}
