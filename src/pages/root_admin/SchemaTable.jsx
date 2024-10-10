import React, { useEffect, useState } from "react";
import "./SchemaTable.css";
import { useAuth } from "../../context/AuthProvider";
import { getAllUser } from "../../services/user-service";

export default function SchemaTable() {
  const [userData, setUserData] = useState([]);
  const auth = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllUser();
        if (response.status === 200) {
          const users = await response.json();
          setUserData(users);
          console.log(users);
        }
        if (response.status === 400 || response.status === 401) {
          console.log(await response.text());
        }
      } catch (error) {
        console.error("Error logging in:", error);
      }
    };

    fetchData();
  }, [auth.authData.password, auth.authData.username]);

  return (
    <div className="schema-table-outside-container">
      <div className="schema-table-inside-container">
        <div className="schema-table-container">
          <table className="schema-table">
            <thead>
              <tr>
                <th>UserId</th>
                <th>Username</th>
                <th>SchemaName</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((data, key) => (
                <tr key={key}>
                  <td>{data.id}</td>
                  <td>{data.username}</td>
                  <td>{data.schemaName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
