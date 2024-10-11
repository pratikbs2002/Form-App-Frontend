import React, { useState } from "react";
import { addSchema } from "../../services/schema-service";
import "./SchemaForm.css";
import { Bounce, toast } from "react-toastify";
export default function SchemaForm() {
  const [schemaFormData, setSchemaFormData] = useState({});
  const [res, setRes] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSchemaFormData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    const schemaName = schemaFormData.schemaName.toLowerCase();

    const isValidSchemaName = /^[a-zA-Z_]+$/.test(schemaName);

    if (!isValidSchemaName) {
      toast.error(
        "Please enter a valid schema name with only alphabets and underscores",
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          theme: "dark",
          transition: Bounce,
          pauseOnHover: false,
        }
      );
      return;
    }
    if (schemaFormData.schemaName.length <= 2) {
      toast.error("Please enter a valid schema name (Minimum 3 alphabets)", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        theme: "dark",
        transition: Bounce,
        pauseOnHover: false,
      });
      return;
    }

    const response = await addSchema(schemaFormData.schemaName);
    const data = await response.json();
    console.log(data);
    setRes(data);
  };

  return (
    <div>
      <form noValidate className="form">
        <div className="input-container">
          <label>SchemaName:</label>
          <input type="text" name="schemaName" onChange={handleChange} />
        </div>

        <button
          className="add-schema-button"
          disabled={!schemaFormData.schemaName}
          style={{
            cursor: !schemaFormData.schemaName ? "not-allowed" : "pointer",
          }}
          type="submit"
          onClick={handleAdd}
        >
          Add
        </button>
      </form>
      <div>{JSON.stringify(res)}</div>
    </div>
  );
}
