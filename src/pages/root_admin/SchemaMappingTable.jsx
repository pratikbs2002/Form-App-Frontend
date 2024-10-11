import React, { useEffect, useState } from "react";
import "./SchemaMappingTable.css";
import { useAuth } from "../../context/AuthProvider";
import { getAllUser } from "../../services/user-service";
import { getAllSchema } from "../../services/schema-service";

export default function SchemaMappingTable() {
  const [schemasData, setschemasData] = useState([]);
  const auth = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllSchema();
        const schemas = await response.json();
        setschemasData(schemas);
        console.log(schemas);
      } catch (error) {
        console.error("Error logging in:", error);
      }
    };

    fetchData();
  }, [auth.authData.password, auth.authData.username]);

  return (
    <div className="schema-mapping-table-outside-container">
      <div className="schema-mapping-table-inside-container">
        <div className="schema-mapping-table-container">
          <table className="schema-mapping-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>UUID Name</th>
                <th>SchemaName</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {schemasData.map((data, key) => (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>{data.uuidName}</td>
                  <td>{data.schemaName}</td>
                  <td>{new Date(data.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
