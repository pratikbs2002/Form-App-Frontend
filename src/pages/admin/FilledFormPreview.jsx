/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  getFilledFormById,
  getFormById,
  setQuestionAnswer,
} from "../../services/form-service";
import QuestionCardPreview from "../../components/forms/QuestionCardPreview";
import AnswerCardPreview from "../../components/forms/AnswerCardPreview";

function FilledFormPreview() {
  const navigate = useNavigate();
  const [filledForm, setFilledForm] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { responseId } = useParams();
  // console.log(formId);1

  useEffect(() => {
    const formDetails = async () => {
      const answerResponse = await getFilledFormById(responseId);
      if (answerResponse.ok) {
        const answerData = await answerResponse.json();
        // setForm(data);
        console.log(answerData);
        const questionResponse = await getFormById(answerData.formId);
        if (questionResponse.ok) {
          const questionData = await questionResponse.json();
          setIsLoading(false);
          console.log(questionData);
          const combinedData = setQuestionAnswer(answerData, questionData);
          setFilledForm(combinedData);
        }
      }
    };
    formDetails();
    // console.log(form);
  }, [responseId]);

  return (
    <>
      <h1>Filled Form Preview</h1>
      <div className="form-container">
      {!isLoading && <input
          type="text"
          value={filledForm.title}
          // onChange={(e) => setFormTitle(e.target.value)}
          placeholder="Form Title"
          className="form-title-input"
          disabled
        />}
        {!isLoading &&
          filledForm.answers.map((q, index) => (
            
            <AnswerCardPreview
              id={q.question_id}
              key={q.question_id}
              index={index}
              form={filledForm}
              question={q.question_text}
              setQuestions={() => {}}
              answerType={q.answerType}
              requiredProp={q.required}
              propOptions={q.options}
              answerProp={q.answer}
              preview={true}
              isFilling={true}
              // questionLength={formQuestions.length}
              // onQuestionChange={handleQuestionChange}
              // onAnswerTypeChange={handleAnswerTypeChange}
              // removeQuestion={removeQuestion}
            />
          ))}
        {/* <div className="button-container">
          <button
            className="styled-button"
            onClick={() => navigate("/createdforms")}
          >
            Back
          </button>
          <button
            className="styled-button"
            onClick={() => {
              navigate(`/editform/${formId}`);
            }}
            // disabled={isSubmitting}
          >
            Edit
          </button>
        </div> */}
      </div>
    </>
  );
}

export default FilledFormPreview;
