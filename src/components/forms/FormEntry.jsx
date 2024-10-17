/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { useNavigate } from "react-router-dom";
import "./FormEntry.css";
import { deleteFormById, getAllForms } from "../../services/form-service";

export default function FormEntry({ form, onDelete, edit }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/editform/${form.id}`); // Update with the actual path to your edit form page
  };
  const handleFill = () => {
    navigate(`/fillform/${form.id}`); // Update with the actual path to your edit form page
  };
  const handlePreview = () => {
    navigate(`/formpreview/${form.id}`); // Redirect to preview
  };

  // const handleDelete = async (formId) => {
  //   await deleteFormById(formId)
  //   const response = await getAllForms();
  //     const data = await response.json();
  //     console.log(data);
  //     if (!data) {
  //       return;
  //     }
  //     // const formEntries = Object.entries(data).map(([key, value]) => ({
  //     //   formId: value.id,
  //     //   title: value.title,
  //     //   createdAt: value.createdAt,
  //     //   // createdBy: value.createdBy.slice(38),
  //     // }));
  //     // setForms(data);
  //   // const updatedForms = forms.filter((form) => form.id !== formId);
  //   // setForms(updatedForms);
  // };

  return (
    <div className="form-entry">
      <h3>Form ID: {form.id}</h3>
      <h4>Form Name: {form.title}</h4>
      <p>Created At: {form.createdAt}</p>
        {edit ? (
          <>
      <div className="button-container">
            <button className="styled-button" onClick={handleEdit}>
              Edit
            </button>
            <button className="styled-button" onClick={handlePreview}>
              Preview
            </button>
            <button className="styled-button" onClick={() => onDelete(form.id)}>
              Delete
            </button>
      </div>
          </>
        ) : (
          <button className="styled-button" onClick={handleFill}>
            Fill
          </button>
        )}
    </div>
  );
}
