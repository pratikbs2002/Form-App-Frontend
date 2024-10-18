/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useState, useEffect } from "react";
import AnswerOptions from "./AnswerOptions";

import "./QuestionCard.css";
import { MdClose } from "react-icons/md";

export default function QuestionCardPreview({
  id,
  index,
  question,
  form,
  setQuestions,
  answerType,
  propOptions,
  requiredProp,
  preview,
  onQuestionChange,
  onAnswerTypeChange,
  removeQuestion,
  questionLength,
  isFilling,
}) {
  // console.log(question);

  const [options, setOptions] = useState(propOptions ? propOptions : [""]);
  const [toggled, setIsToggled] = useState(requiredProp);
  const [testForm, setTestForm] = useState(form);

  useEffect(() => {
    setOptions(propOptions);
  }, [propOptions]);

  // useEffect(() => {
  //   setTestForm(form);
  // }, [form]);

  // function handleOptionChange(index, value){}

  function handleOptionChange(index, value) {
    setOptions((prevOptions) => {
      const newOptions = [...prevOptions];
      newOptions[index] = value;
      // console.log(index, options);
      return newOptions;
    });

    // setTestForm({
    //   ...testForm,
    //   questions: testForm.questions.map((q) =>
    //     q.question_id === id ? { ...q, options } : q
    //   ),
    // });
  }
  useEffect(() => {
    setQuestions({
      ...form,
      questions: form.questions.map((q) =>
        q.question_id === id ? { ...q, options, required: toggled } : q
      ),
    });
    // setQuestions((prev) =>
    //   prev?.questions.map((q) => (q.question_id === id ? { ...q, options } : q))
    // );
  }, [options, toggled]);

  function addOption() {
    setOptions([...options, ""]);
  }
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

  function handleToggleRequired() {
    setIsToggled((toggled) => !toggled);
    // setQuestions((prev) =>
    //   prev.questions.map((p) =>
    //     p.question_id === id ? { ...p, required: toggled } : p
    //   )
    // );
  }
  console.log(toggled);
  // console.log(testForm.questions[index]);

  return (
    <div className="question-div">
      {/* <div>{JSON.stringify(testForm.questions[index])}</div> */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <h2 style={{ marginTop: 0 }}>Question {index + 1}</h2>
        {questionLength > 1 && (
          <span
            className="remove-link"
            onClick={() => {
              if (
                window.confirm(
                  `Are you sure you want to remove question number ${
                    index + 1
                  }?`
                )
              ) {
                removeQuestion(index, id);
              }
            }}
            style={{ marginLeft: "10px", cursor: "pointer", color: "#d9534f" }}
          >
            <MdClose />
          </span>
        )}
      </div>
      <input
        type="text"
        value={question}
        onChange={(e) => onQuestionChange(index, e.target.value)}
        placeholder="Enter your question"
        className="question-input"
        disabled={preview || isFilling}
      />
      {preview ? (
        <div style={{ display: "flex" }}>
          <p>Anwer Type: {answer_type}</p>
        </div>
      ) : (
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
      )}
      <AnswerOptions
        options={options}
        answerType={answerType}
        handleOptionChange={handleOptionChange}
        addOption={addOption}
        setOptions={setOptions}
        preview={preview}
      />
      <div style={{ height: "20px" }}>
        <div
          className="required-toggle"
          // onClick={handleToggleRequired}
          // disabled={preview}
        >
          {preview ? (
            <span>{toggled && "Required*"}</span>
          ) : (
            <>
              <label className="switch">
                <input
                  type="checkbox"
                  onChange={handleToggleRequired}
                  value={toggled}
                  checked={toggled}
                  disabled={preview}
                  // disabled
                />
                <span className="slider round"></span>
              </label>
              <span className="required-text">Required*</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
