/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useState } from "react";
import QuestionCard from "../../components/forms/QuestionCard";

import "./FormContainer.css";
import { redirect, useNavigate, useNavigation } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { addCreatedForm } from "../../services/form-service";

export default function FormContainer() {
  const [formTitle, setFormTitle] = useState("");
  const navigate = useNavigate();

  const [formQuestions, setFormQuestions] = useState([
    {
      question_id: 1,
      question_text: "",
      answerType: "default",
      options: [],
      required: false,
    },
  ]);

  console.log(formQuestions);

  function handleQuestionChange(index, value) {
    const newQuestions = [...formQuestions];
    newQuestions[index].question_text = value;
    setFormQuestions(newQuestions);
  }

  function handleAnswerTypeChange(index, value) {
    // console.log(value);
    const newQuestions = [...formQuestions];
    newQuestions[index].answerType = value;
    newQuestions[index].options =
      value === "mcq" || value === "dropdown" || value === "multiple-select"
        ? [""]
        : [];
    setFormQuestions(newQuestions);
  }

  function addQuestion() {
    setFormQuestions([
      ...formQuestions,
      {
        question_id: formQuestions.length + 1,
        question_text: "",
        answerType: "default",
        options: [],
        required: false,
      },
    ]);
  }

  function removeQuestion(index, id) {
    if (formQuestions.length === 1) {
      alert("There should atleast be one question");
      return;
    }

    const newQuestions = formQuestions.filter((q) => q.question_id !== id);
    setFormQuestions(newQuestions);
  }

  async function handleCreate() {
    if (!formTitle) {
      toast.error("Form title cannot be empty.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        theme: "dark",
        transition: Bounce,
        pauseOnHover: false,
      });
      return;
    }

    for (let i = 0; i < formQuestions.length; i++) {
      const { question_text, answerType, options } = formQuestions[i];

      if (!question_text) {
        toast.error(`Question field of question number ${i + 1} cannot be empty.`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          theme: "dark",
          transition: Bounce,
          pauseOnHover: false,
        });
        return;
      }
      if (
        answerType === "mcq" ||
        answerType === "multiple-select" ||
        answerType === "dropdown"
      ) {
        for (let j = 0; j < options.length; j++) {
          console.log(options);

          if (!options[j]) {
            toast.error(`Option field of question number ${i + 1} cannot be empty.`, {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              theme: "dark",
              transition: Bounce,
              pauseOnHover: false,
            });
            return;
          }
        }
      }

      if (answerType === "default") {
        toast.error(`Please select an answer type for question number ${i + 1}.`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          theme: "dark",
          transition: Bounce,
          pauseOnHover: false,
        });
        return;
      }
    }

    const formData = {
      adminId: 1,
      questions: formQuestions,
    };

    const sendRequest = async () => {
      const response = await addCreatedForm(formData);
      console.log(response);

      if (!response.ok) {
        throw new Error("Form Creation failure: Sending form data failed");
      }
      // console.log(formData);
    };
    try {
      await sendRequest();
      toast.success(`Form published successfully!`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        theme: "dark",
        transition: Bounce,
        pauseOnHover: false,
      });
      navigate("/createdforms");
    } catch (error) {
      toast.error(`Error creating the form: Sending form data failed`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        theme: "dark",
        transition: Bounce,
        pauseOnHover: false,
      });
      // return;
    }

    // console.log("Form Published:", JSON.stringify(formData, null, 2));
  }

  return (
    <>
      <h1>Create New Form</h1>
      <div className="form-container">
        <input
          type="text"
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
          placeholder="Form Title"
          className="form-title-input"
        />
        {formQuestions.map((q, index) => (
          <QuestionCard
            id={q.question_id}
            key={q.question_id}
            index={index}
            question={q.question_text}
            setQuestions={setFormQuestions}
            answerType={q.answerType}
            propOptions={q.options}
            questionLength={formQuestions.length}
            onQuestionChange={handleQuestionChange}
            onAnswerTypeChange={handleAnswerTypeChange}
            removeQuestion={removeQuestion}
          />
        ))}
        <div className="button-container">
          <button className="styled-button" onClick={addQuestion}>
            Add Question
          </button>
          <button
            className="styled-button"
            onClick={handleCreate}
          >
            Create
          </button>
        </div>
      </div>
    </>
  );
}
