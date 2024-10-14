/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import FormEntry from "../../components/forms/FormEntry";
import "./CreatedForms.css";

export default function CreatedFormsContainer() {
  const [forms, setForms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchForms = async () => {
      setIsLoading(true)
      const response = await fetch(
        "https://react-http-3830c-default-rtdb.firebaseio.com/formData.json"
      );
      const data = await response.json();
      console.log(data);
      if (!data) {
        return;
      }
      const formEntries = Object.entries(data).map(([key, value]) => ({
        formId: value.formId,
        title: value.title,
        createdAt: value.createdAt,
      }));
      setForms(formEntries);
      //   console.log(forms);
      setIsLoading(false);
    };

    fetchForms();
  }, []);
  const handleDelete = async (formId) => {
    const updatedForms = forms.filter((form) => form.formId !== formId);
    setForms(updatedForms);

    await fetch(
      `https://react-http-3830c-default-rtdb.firebaseio.com/formData/${formId}.json`,
      {
        method: "DELETE",
      }
    );
  };

  return (
    <div className="created-forms-container">
      <h1>Created Forms</h1>
      {isLoading && <h2>Loading Forms...</h2>}
      {!isLoading && forms.length === 0 && <h2>No Form Data Available</h2>}
      {forms.map((form) => (
        <FormEntry key={form.formId} form={form} onDelete={handleDelete} />
      ))}
    </div>
  );
}
