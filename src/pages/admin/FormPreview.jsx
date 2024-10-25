/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getFormById } from "../../services/form-service";
import QuestionCardPreview from "../../components/forms/QuestionCardPreview";

function FormPreview() {
  const navigate = useNavigate();
  const [form, setForm] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { formId } = useParams();
  console.log(formId);

  useEffect(() => {
    const formDetails = async () => {
      const response = await getFormById(formId);
      if (response.ok) {
        const data = await response.json();
        setForm(data);
        setIsLoading(false);
        console.log(data);
      }
    };
    formDetails();
    // console.log(form);
  }, [formId]);

  return (
    <>
      <h1>Form Preview</h1>
      <div className="form-container">
        {/* <p>Creating as india_admin</p> */}

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
        {!isLoading &&
          form.questions.map((q, index) => (
            <QuestionCardPreview
              id={q.question_id}
              key={q.question_id}
              index={index}
              form={form}
              question={q.question_text}
              setQuestions={() => {}}
              answerType={q.answerType}
              requiredProp={q.required}
              propOptions={q.options}
              preview={true}
              // questionLength={formQuestions.length}
              // onQuestionChange={handleQuestionChange}
              // onAnswerTypeChange={handleAnswerTypeChange}
              // removeQuestion={removeQuestion}
            />
          ))}
        <div className="button-container">
          <button
            className="styled-button"
            onClick={() => navigate("/createdforms")}
          >
            Back
          </button>
          <button
            className="styled-button"
            onClick={() => {navigate(`/editform/${formId}`)}}
            // disabled={isSubmitting}
          >
            Edit
          </button>
        </div>
      </div>
    </>
  );
}

export default FormPreview;
