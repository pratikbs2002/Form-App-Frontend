import React, { useContext, useEffect, useState } from "react";
import "./UserTable.css";
import { useAuth } from "../../context/AuthProvider";
import { getAllUser } from "../../services/user-service";
import { LoaderContext } from "../../context/LoaderProvider";
import Loader from "../../context/Loader";

export default function UserTable(props) {
  const [userData, setUserData] = useState([]);
  const auth = useAuth();
  const { state, dispatch } = useContext(LoaderContext);

  useEffect(() => {
    dispatch(true);
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
      dispatch(false);
    };

    fetchData();
  }, [auth.authData.password, auth.authData.username, props.load]);

  return (
    <div className="user-table-outside-container">
      <div className="user-table-inside-container">
        <div className="user-table-container">
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
          )}
        </div>
      </div>
    </div>
  );
}
