/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  addCreatedForm,
  editFormById,
  getFormById,
} from "../../services/form-service";
import QuestionCardPreview from "../../components/forms/QuestionCardPreview";
import { Bounce, toast } from "react-toastify";

function FormEdit() {
  const navigate = useNavigate();
  const [form, setForm] = useState();
  const { formId } = useParams();
  const [hasData, setHasData] = useState(false);
  console.log(form);

  useEffect(() => {
    const formDetails = async () => {
      const response = await getFormById(formId);
      if (!response.ok) {
        toast.error("Error fetching form details", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          theme: "dark",
          transition: Bounce,
          pauseOnHover: false,
        });
      }
      const data = await response.json();
      setForm(data);
      setHasData(true);
      console.log(data);
    };
    formDetails();
    // console.log(form);
  }, [formId]);

  function addQuestion() {
    setForm({
      ...form,
      questions: [
        ...form.questions,
        {
          question_id: form.questions.length + 1,
          question_text: "",
          answerType: "default",
          options: [],
          required: false,
        },
      ],
    });
    // setFormQuestions([
    //   ...formQuestions,
    // {
    //   question_id: formQuestions.length + 1,
    //   question_text: "",
    //   answerType: "default",
    //   options: [],
    //   required: false,
    // },
    // ]);
    // console.log(formQuestions);
  }

  function handleQuestionChange(index, value) {
    // console.log(form);
    // console.log(value);
    // console.log(index);

    const newQuestions = form.questions.map((q, i) =>
      i === index ? { ...q, question_text: value } : q
    );
    setForm({ ...form, questions: newQuestions });
  }
  console.log(form);

  function handleAnswerTypeChange(index, value) {
    // console.log(value);
    const newQuestions = [...form.questions];
    newQuestions[index].answerType = value;
    newQuestions[index].options =
      value === "mcq" || value === "dropdown" || value === "multiple-select"
        ? [""]
        : [];
    setForm({ ...form, questions: newQuestions });
    // setFormQuestions(newQuestions);
  }

  function removeQuestion(index, id) {
    if (form.questions.length === 1) {
      alert("There should atleast be one question");
      return;
    }

    const newQuestions = form.questions.filter((q) => q.question_id !== id);
    setForm({ ...form, questions: newQuestions });
    // setFormQuestions(newQuestions);
  }

  const handleSaveEditForm = async () => {

////////////////////To be edited once formTitle is passes in API
    // if (!formTitle) {
    //   toast.error("Form title cannot be empty.", {
    //     position: "top-center",
    //     autoClose: 3000,
    //     hideProgressBar: false,
    //     theme: "dark",
    //     transition: Bounce,
    //     pauseOnHover: false,
    //   });
    //   // alert("Form title cannot be empty.");
    //   return;
    // }
////////////////////////////////////////////////////////////////////

    for (let i = 0; i < form.questions.length; i++) {
      const { question_text, answerType, options } = form.questions[i];

      if (!question_text) {
        toast.error(`Question field of question number ${i + 1} cannot be empty.`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          theme: "dark",
          transition: Bounce,
          pauseOnHover: false,
        });
        // alert(`Question field of question number ${i + 1} cannot be empty.`);
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
            // alert(`Option field of question number ${i + 1} cannot be empty.`);
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
        // alert(`Please select an answer type for question number ${i + 1}.`);
        return;
      }
    }


    const sendRequest = async () => {
      const response = await editFormById(form, form.id);
      if (!response.ok) {
        throw new Error("Form Creation failure: Sending form data failed");
      }
    };
    try {
      await sendRequest();
      toast.success(`Form ${form.id} edited successfully!`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        theme: "dark",
        transition: Bounce,
        pauseOnHover: false,
      });
      navigate("/createdforms");
    } catch (error) {
      toast.error(`Error editing the form: Could not save the changes`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        theme: "dark",
        transition: Bounce,
        pauseOnHover: false,
      });
    }
  };

  return (
    <>
      <div>
        {/* {hasData ? "true" : "false"}
        {hasData ? JSON.stringify(form) : "false"} */}
        <h1>{`Edit Form`}</h1>
      </div>
      <div className="form-container">
        {/* <p>Creating as india_admin</p> */}
        <input
          type="text"
          value="Form Title will go here"
          onChange={(e) => {}}
          placeholder="Form Title"
          className="form-title-input"
          // disabled
        />
        
        {form?.questions.map((q, index) => (
            
            <QuestionCardPreview
              id={q.question_id}
              key={q.question_id}
              index={index}
              question={q.question_text}
              form = {form}
              setQuestions={setForm}
              answerType={q.answerType}
              requiredProp={q.required}
              propOptions={q.options}
              preview={false}
              questionLength={form.questions.length}
              onQuestionChange={handleQuestionChange}
              onAnswerTypeChange={handleAnswerTypeChange}
              removeQuestion={removeQuestion}
            />
        ))}
        <div className="button-container">
          <button
            className="styled-button"
            onClick={() => navigate("/createdforms")}
          >
            Back
          </button>
          <button className="styled-button" onClick={addQuestion}>
            Add Question
          </button>
          <button
            className="styled-button"
            onClick={handleSaveEditForm}
            // disabled={isSubmitting}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}

export default FormEdit;
