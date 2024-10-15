/* eslint-disable no-unused-vars */

import React, { useContext, useEffect, useState } from "react";
import FormEntry from "../../components/forms/FormEntry";
import "./CreatedForms.css";
import Loader from "../../context/Loader";
import { LoaderContext } from "../../context/LoaderContext";
import { MdDelete, MdEdit, MdRemoveRedEye } from "react-icons/md";

export default function CreatedFormsContainer() {
  const [forms, setForms] = useState([]);
  const [sortBy, setSortBy] = useState("default");
  const [viewStyle, setViewStyle] = useState("table");
  const { state, dispatch } = useContext(LoaderContext);
  useEffect(() => {
    const fetchForms = async () => {
      dispatch(true);
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
        createdBy: value.createdBy.slice(38),
      }));
      setForms(formEntries);
        console.log(forms);

      dispatch(false);
    };
    console.log(sortBy);

    fetchForms();
  }, [sortBy]);
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
  console.log(state.loading);

  return (
    <div className="created-forms-container">
      <h1>Created Forms</h1>
      <Loader />
      {!state.loading && (
        <div className="form-view">
          <div>
            <nav className="header">
              <p
                className={viewStyle === "table" ? "active" : ""}
                onClick={() => setViewStyle("table")}
              >
                Table View
              </p>
              <p
                className={viewStyle === "card" ? "active" : ""}
                onClick={() => setViewStyle("card")}
              >
                Card View
              </p>
            </nav>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-by-select"
          >
            <option value="default">Sort By...</option>
            <option value="new">Newest</option>
            <option value="old">Oldest</option>
            <option value="name-asc">Form Name - Ascending</option>
            <option value="name-des">Form Name - Descending</option>
            <option value="form-id">Form ID</option>
          </select>
        </div>
      )}
      <div>{state.loading}</div>
      {!state.loading && forms.length === 0 && <h2>No Form Data Available</h2>}
      {viewStyle === "card" &&
        forms.map((form) => (
          <FormEntry key={form.formId} form={form} onDelete={handleDelete} />
        ))}
      {!state.loading && viewStyle === "table" && (
        <div className="user-table-container">
          <table className="user-table">
            <thead>
              <tr>
                <th>Form ID</th>
                <th>Form Name</th>
                <th>Created By</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {forms.map((form) => (
                <tr key={form.formId}>
                  <td>{form.formId}</td>
                  {/* <td>{data.id}</td> */}
                  <td>{form.title}</td>
                  <td>{form.createdBy}</td>
                  <td>{form.createdAt}</td>
                  <td>
                    <button className="rounded-button">
                      <MdEdit />
                    </button>
                    <button className="rounded-button">
                      <MdRemoveRedEye />
                    </button>
                    <button className="rounded-button-delete">
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
