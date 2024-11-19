/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  getFilledFormById,
  getFormById,
  saveForm,
  submitForm,
} from "../../services/form-service";
import QuestionCardFill from "../../components/forms/QuestionCardFill";
import { Bounce, toast } from "react-toastify";

function FormFill() {
  const navigate = useNavigate();
  const [form, setForm] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { formId: formResponseId } = useParams();
  const [submittedAnswers, setSubmittedAnswers] = useState([]);
  // console.log(formId);

  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const formDetails = async () => {
      const fillFormRes = await getFilledFormById(formResponseId);
      const fillFormData = await fillFormRes.json();
      console.log(fillFormData);
      
      const response = await getFormById(fillFormData.formId);
      if (response.ok) {
        const data = await response.json();
        setForm(data);
        setIsLoading(false);
        // console.log(data.questions.length);
        setAnswers(
          data.questions.map((q) => ({ answer_id: q.question_id, answer: "" }))
        );
        // if (!isLoading) {
        //   for (let i = 0; i < data.question.length; i++) {
        //     setAnswers((prev) => [...prev, { answer: "" }]);
        //     console.log(answers);
        //   }
        // }
      }
    };
    formDetails();
    // console.log(form);
  }, [formResponseId]);

  const handleSubmitForm = async () => {
    for (let i = 0; i < answers.length; i++) {
      const { answer, answer_id } = answers[i];
      const [{ required }] = form.questions.filter(
        (q) => q.question_id === answer_id
      );
      console.log(required);

      // const answer = answers[i].answer;
      if (required) {
        if (answer.length === 0) {
          toast.error(`Please fill all the required fields`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            theme: "dark",
            transition: Bounce,
            pauseOnHover: false,
          });
          return;
        }
        // } else {
        //   toast.success(`Form submitted successfully!`, {
        //     position: "top-center",
        //     autoClose: 3000,
        //     hideProgressBar: false,
        //     theme: "dark",
        //     transition: Bounce,
        //     pauseOnHover: false,
        //   });
        //   // navigate('/fillform')
      }
    }
    const filledForm = {
      fillFormId: form.id,
      userId: localStorage.getItem("id"),
      // userId: 3,
      answers,
      // locationId: 1,
      isSubmitted: true,
    };
    setSubmittedAnswers(JSON.stringify(answers));
    console.log("Form Submitted!: " + JSON.stringify(filledForm));

    const sendRequest = async () => {
      const response = await submitForm(filledForm);
      console.log(response);

      if (!response.ok) {
        // console.log(JSON.stringify(response));
        const message = await response.text();
        console.log(message);

        throw new Error("Form Submission failure: Sending data failed");
      }
      // console.log(formData);
    };
    try {
      await sendRequest();
      toast.success(`Form submitted successfully!`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        theme: "dark",
        transition: Bounce,
        pauseOnHover: false,
      });
      navigate("/fillform");
    } catch (error) {
      toast.error(`Error submitting the form: Sending data failed`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        theme: "dark",
        transition: Bounce,
        pauseOnHover: false,
      });
      // return;
    }
  };

  const handleSaveForm = async () => {
    const filledForm = {
      fillFormId: form.id,
      userId: localStorage.getItem("id") ,
      // userId: 3,
      answers,
      // locationId: 1,
      // isSubmitted: true,
    };
    // setSubmittedAnswers(JSON.stringify(answers));
    console.log("Form Saved!: " + JSON.stringify(filledForm));

    const sendRequest = async () => {
      const response = await saveForm(filledForm);
      console.log(response);

      if (!response.ok) {
        // console.log(JSON.stringify(response));
        const message = await response.text();
        console.log(message);

        throw new Error("Form Saving failure: Saving data failed");
      }
      // console.log(formData);
    };
    try {
      await sendRequest();
      toast.success(`Form saved successfully!`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        theme: "dark",
        transition: Bounce,
        pauseOnHover: false,
      });
      navigate("/fillform");
    } catch (error) {
      toast.error(`Error submitting the form: Sending data failed`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        theme: "dark",
        transition: Bounce,
        pauseOnHover: false,
      });
      // return;
    }
  };

  return (
    <>
      <h1>Form Fill</h1>
      <div className="form-container">
        {!isLoading && (
          <input
            type="text"
            value={form.title}
            // onChange={(e) => setFormTitle(e.target.value)}
            placeholder="Form Title"
            className="form-title-input"
            disabled
          />
        )}
        {/* {!isLoading && JSON.stringify(form)} */}
        {/* {!isLoading && answers && JSON.stringify(answers)} */}
        {!isLoading &&
          form.questions.map((q, index) => (
            <QuestionCardFill
              id={q.question_id}
              key={q.question_id}
              index={index}
              form={form}
              question={q.question_text}
              answerType={q.answerType}
              requiredProp={q.required}
              propOptions={q.options}
              isFilling={true}
              mainAnswers={answers}
              setAnswerOnChange={setAnswers}
            />
          ))}
        <div className="button-container">
          <button
            className="styled-button"
            onClick={() => navigate("/fillform")}
          >
            Back
          </button>
          <button
            className="styled-button"
            onClick={
              handleSaveForm
              // navigate(`/editform/${formId}`);
            }
          >
            Save
          </button>
          <button
            className="styled-button"
            onClick={
              handleSubmitForm
              // navigate(`/editform/${formId}`);
            }
          >
            Submit
          </button>
        </div>
        {/* <p>{submittedAnswers}</p> */}
      </div>
    </>
  );
}

export default FormFill;
