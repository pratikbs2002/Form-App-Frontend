import React, { useEffect, useState } from "react";
import "./UserTable.css";
import { useAuth } from "../../context/AuthProvider";
import { getAllUser } from "../../services/user-service";

export default function UserTable() {
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
    <div className="user-table-outside-container">
      <div className="user-table-inside-container">
        <div className="user-table-container">
          <table className="user-table">
            <thead>
              <tr>
                <th>UserId</th>
                <th>Username</th>
                <th>SchemaName</th>
                <th>Role</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((data, key) => (
                <tr key={key}>
                  <td>{key}</td>
                  {/* <td>{data.id}</td> */}
                  <td>{data.username}</td>
                  <td>{data.schemaName}</td>
                  <td>{data.role}</td>
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
