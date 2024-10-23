import React, { useContext, useEffect, useState } from "react";
// import "./UserTable.css";
import { useAuth } from "../../context/AuthProvider";
import { getAllUser, getUserBySchemaName } from "../../services/user-service";
import { LoaderContext } from "../../context/LoaderProvider";
import Loader from "../../context/Loader";
import { getCurrentSchema } from "../../services/schema-service";

export default function UserTable(props) {
  const [userData, setUserData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const auth = useAuth();
  const { state, dispatch } = useContext(LoaderContext);
  const [schemaData, setschemasData] = useState({});

  useEffect(() => {
    dispatch(true);
    const fetchData = async () => {
      try {
        const schemaResponse = await getCurrentSchema();
        if (!schemaResponse.ok) {
          const errorText = await schemaResponse.text();
          console.error(errorText);
          return;
        }

        const schemaResult = await schemaResponse.json();
        setschemasData(schemaResult);
        console.log(schemaResult);

        const userResponse = await getUserBySchemaName(schemaResult.schemaUUID);
        if (userResponse.status === 200) {
          const users = await userResponse.json();
          setUserData(users);
          setFilteredData(users);
          console.log(users);
        } else {
          console.log(await userResponse.text());
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        dispatch(false);
      }
    };

    fetchData();
  }, [
    auth.authData.password,
    auth.authData.username,
    props.load,
    props.refresh,
  ]);

  useEffect(() => {
    let filteredUsers;
    if (filter === "ALL") {
      filteredUsers = userData;
    } else if (filter === "Admin") {
      filteredUsers = userData.filter((user) => user.role === "admin");
    } else if (filter === "Reporting User") {
      filteredUsers = userData.filter((user) => user.role === "reporting_user");
    }
    setFilteredData(filteredUsers);
  }, [filter, userData]);

  return (
    <div className="root-section">
      <div className="root-section-title">User Table</div>
      <div className="root-section-data">
        <div className="user-table-outside-container">
          <div className="user-table-inside-container">
            <div className="user-table-container">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  width: "100%",
                  padding: "1rem 0rem",
                  boxSizing: "border-box",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#f6f6f6",
                    padding: "0.2rem",
                    borderRadius: "2px",
                  }}
                >
                  <button
                    className={`table-role-button ${
                      filter === "ALL" ? "activetag" : ""
                    }`}
                    onClick={() => setFilter("ALL")}
                  >
                    ALL
                  </button>
                  <button
                    className={`table-role-button ${
                      filter === "Admin" ? "activetag" : ""
                    }`}
                    onClick={() => setFilter("Admin")}
                  >
                    Admin
                  </button>
                  <button
                    className={`table-role-button ${
                      filter === "Reporting User" ? "activetag" : ""
                    }`}
                    onClick={() => setFilter("Reporting User")}
                  >
                    Reporting User
                  </button>
                </div>
              </div>
              <Loader />
              {!state.loading && (
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
                    {filteredData.map((data, key) => (
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
