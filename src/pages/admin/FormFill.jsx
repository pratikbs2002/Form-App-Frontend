/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getFormById } from "../../services/form-service";
import QuestionCardFill from "../../components/forms/QuestionCardFill";

function FormFill() {
  const navigate = useNavigate();
  const [form, setForm] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { formId } = useParams();
  // console.log(formId);

  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const formDetails = async () => {
      const response = await getFormById(formId);
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
  }, [formId]);

  const handleSubmitForm = () => {
    const filledForm = {
      formId,
      userId: 50,
      answers,
      locationId: 1,
    };
    console.log("Form Submitted!: " + JSON.stringify(filledForm));
  };

  return (
    <>
      <h1>Form Fill</h1>
      <div className="form-container">
        <input
          type="text"
          value="Form Title will go here"
          // onChange={(e) => setFormTitle(e.target.value)}
          placeholder="Form Title"
          className="form-title-input"
          disabled
        />
        {!isLoading && JSON.stringify(form)}
        {!isLoading && answers && JSON.stringify(answers)}
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
              handleSubmitForm
              // navigate(`/editform/${formId}`);
            }
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default FormFill;
