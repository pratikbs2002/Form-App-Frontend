/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useState } from "react";
import QuestionCard from "../../components/forms/QuestionCard";

import "./FormContainer.css";
import { redirect, useNavigate, useNavigation } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

export default function FormContainer() {
  const [formTitle, setFormTitle] = useState("");
  const navigate = useNavigate();
  // const navigation = useNavigation();
  // const isSubmitting = navigation.state === "submitting";

  const [formQuestions, setFormQuestions] = useState([
    {
      id: 1,
      question: "",
      answerType: "default",
      options: [],
      required: false,
    },
  ]);
  console.log(formQuestions);

  function handleQuestionChange(index, value) {
    const newQuestions = [...formQuestions];
    newQuestions[index].question = value;
    setFormQuestions(newQuestions);
  }

  function handleAnswerTypeChange(index, value) {
    console.log(value);
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
        id: formQuestions.length + 1,
        question: "",
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

    const newQuestions = formQuestions.filter((q) => q.id !== id);
    setFormQuestions(newQuestions);
  }

  async function handlePublish() {
    if (!formTitle) {
      alert("Form title cannot be empty.");
      return;
    }

    for (let i = 0; i < formQuestions.length; i++) {
      const { question, answerType, options } = formQuestions[i];

      if (!question) {
        alert(`Question field of question number ${i + 1} cannot be empty.`);
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
            alert(`Option field of question number ${i + 1} cannot be empty.`);
            return;
          }
        }
      }

      if (answerType === "default") {
        alert(`Please select an answer type for question number ${i + 1}.`);
        return;
      }
    }
    const formId = "200" + Math.floor(Math.random() * 10000000000);
    console.log(formId);

    const currentDate = new Date();
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    const formattedDate = currentDate.toLocaleString("en-GB", options);

    // const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const createdAt = `${formattedDate}`;

    const formData = {
      title: formTitle,
      formId,
      questions: formQuestions,
      createdAt,
    };

    const sendRequest = async () => {
      const response = await fetch(
        "https://react-http-3830c-default-rtdb.firebaseio.com/formData.json",
        {
          method: "POST",
          body: JSON.stringify(formData, null, 2),
        }
      );

      if (!response.ok) {
        throw new Error("Form Creation failure: Sending form data failed");
      }
    };
    try {
      await sendRequest();
      toast.success(
        `Form published successfully! \nForm generated ID: ${formId}`,
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          theme: "dark",
          transition: Bounce,
          pauseOnHover: false,
        }
      );
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

    console.log("Form Published:", JSON.stringify(formData, null, 2));
  }

  return (
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
          id={q.id}
          key={q.id}
          index={index}
          question={q.question}
          setQuestions={setFormQuestions}
          answerType={q.answerType}
          propOptions={q.options}
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
          onClick={handlePublish}
          // disabled={isSubmitting}
        >
          Publish
        </button>
      </div>
    </div>
  );
}
