/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { useNavigate } from "react-router-dom";
import "./FormEntry.css";

export default function FormEntry({ form, onDelete }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/editform/${form.formId}`); // Update with the actual path to your edit form page
  };

  const handlePreview = () => {
    navigate(`/formpreview/${form.formId}`); // Redirect to preview
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this form?")) {
      onDelete(form.formId); // Call delete handler passed from parent
    }
  };

  return (
    <div className="form-entry">
      <h3>Form ID: {form.id}</h3>
      <h4>Form Name: {form.title}</h4>
      <p>Created At: {form.createdAt}</p>
      <div className="button-container">
        <button className="styled-button" onClick={handleEdit}>
          Edit
        </button>
        <button className="styled-button" onClick={handlePreview}>
          Preview
        </button>
        <button className="styled-button" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}
