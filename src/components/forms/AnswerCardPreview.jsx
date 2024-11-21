/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useState, useEffect } from "react";
import AnswerOptions from "./AnswerOptions";

import "./QuestionCard.css";
import { MdClose } from "react-icons/md";

export default function AnswerCardPreview({
  id,
  index,
  question,
  form,
  setQuestions,
  answerType,
  propOptions,
  requiredProp,
  preview,
  answerProp,
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
  console.log(form);
  console.log(typeof answerProp);

  useEffect(() => {
    setOptions(propOptions);
  }, [propOptions]);

  // useEffect(() => {
  //   setTestForm(form);
  // }, [form]);

  // function handleOptionChange(index, value){}

  // function handleOptionChange(index, value) {
  //   setOptions((prevOptions) => {
  //     const newOptions = [...prevOptions];
  //     newOptions[index] = value;
  //     // console.log(index, options);
  //     return newOptions;
  //   });

  //   // setTestForm({
  //   //   ...testForm,
  //   //   questions: testForm.questions.map((q) =>
  //   //     q.question_id === id ? { ...q, options } : q
  //   //   ),
  //   // });
  // }
  // useEffect(() => {
  //   setQuestions({
  //     ...form,
  //     questions: form.questions.map((q) =>
  //       q.question_id === id ? { ...q, options, required: toggled } : q
  //     ),
  //   });
  //   // setQuestions((prev) =>
  //   //   prev?.questions.map((q) => (q.question_id === id ? { ...q, options } : q))
  //   // );
  // }, [options, toggled]);

  // function addOption() {
  //   setOptions([...options, ""]);
  // }
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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p>Anwer Type: {answer_type}</p>
        {/* <p>Required: {toggled ? "Yes" : "No"}</p> */}
      </div>
      <div style={{ display: "flex" }}>
        {/* <h3>Answer: {answerProp}</h3> */}
        {answerProp.length === 0 ? <h2>Not Answered</h2> : <h3>Answer:</h3>}
      </div>
      <div>
        {answerType === "long answer" && (
          <textarea readOnly disabled className="answer-textbox" value={answerProp} />
        )}
        {answerType === "multiple-select" && (
          <>
            {answerProp.map((msq) => (
              <input key={msq} value={msq} className="answer-input" readOnly disabled />
            ))}
          </>
        )}
        {(answerType === "short answer" ||
          answerType === "mcq" ||
          answerType === "dropdown") && (
          <input disabled className="answer-input" readOnly value={answerProp} />
        )}
      </div>
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
