import React, { useState } from "react";
import { addSchema } from "../../services/schema-service";

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

    const responce = await addSchema(schemaFormData.schemaName);
    const data = await responce.json();
    console.log(data);
    setRes(data);
  };

  return (
    <div>
      <div>Schema Form</div>
      <form noValidate className="form">
        <div className="input-container">
          <label>SchemaName:</label>
          <input type="text" name="schemaName" onChange={handleChange} />
        </div>

        <button
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
