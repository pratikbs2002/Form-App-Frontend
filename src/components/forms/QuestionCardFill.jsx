/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useState, useEffect } from "react";
import "./QuestionCard.css";

export default function QuestionCardFill({
  id,
  index,
  question,
  setQuestions,
  answerType,
  mainAnswers,
  propOptions,
  requiredProp,
  setAnswerOnChange,
}) {
  const [options, setOptions] = useState(propOptions ? propOptions : [""]);
  const [toggled, setIsToggled] = useState(requiredProp);

  useEffect(() => {
    setOptions(propOptions);
  }, [propOptions]);

  const setAnswer = (selectedOption) => {
    setAnswerOnChange((prev) =>
      prev.map((a) =>
        a.answer_id === id ? { ...a, answer: selectedOption } : a
      )
    );
  };

  const handleCheckbox = (option) => {
    const currentAnswer = mainAnswers[index]?.answer || [];
    const updatedAnswer = currentAnswer.includes(option)
      ? currentAnswer.filter((a) => a !== option)
      : [...currentAnswer, option];

    setAnswerOnChange((prev) =>
      prev.map((a) =>
        a.answer_id === id ? { ...a, answer: updatedAnswer } : a
      )
    );
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
          options.map((o, optionIndex) => (
            <div key={`${question} ${o}`} className="option-container">
              <input
                type="radio"
                id={o}
                name={`name_${question}`}
                value={o}
                checked={mainAnswers[index]?.answer === o}
                className="radio"
                onChange={() => setAnswer(o)}
              />
              <label className="option">{o}</label>
              <br />
            </div>
          ))}

        {answerType === "multiple-select" &&
          options.map((o) => (
            <div key={`${question} ${o}`} className="option-container">
              <input
                type="checkbox"
                id={o}
                name={o}
                value={o}
                checked={mainAnswers[index]?.answer?.includes(o)}
                onChange={() => handleCheckbox(o)}
                className="radio"
              />
              <label className="option"> {o}</label>
              <br />
            </div>
          ))}

        {answerType === "dropdown" && (
          <select
            name={question}
            id={question}
            className="answer-type-select"
            value={mainAnswers[index]?.answer || ""}
            onChange={(e) => setAnswer(e.target.value)}
          >
            <option style={{ display: "none" }}>Select an answer</option>
            {options.map((o) => (
              <option key={`${question} ${o}`} value={o}>
                {o}
              </option>
            ))}
          </select>
        )}

        {answerType === "short answer" && (
          <input
            placeholder="Short Answer"
            className="answer-input"
            value={mainAnswers[index]?.answer || ""}
            onChange={(e) => setAnswer(e.target.value)}
          />
        )}

        {answerType === "long answer" && (
          <textarea
            placeholder="Long Answer"
            className="answer-textbox"
            value={mainAnswers[index]?.answer || ""}
            onChange={(e) => setAnswer(e.target.value)}
          />
        )}
      </div>

      <div style={{ height: "20px" }}>
        <div className="required-toggle">
          <span>{toggled && "Required*"}</span>
        </div>
      </div>
    </div>
  );
}
