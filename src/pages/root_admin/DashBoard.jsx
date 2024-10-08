import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { getAllUser } from "../../services/user-service";
import SchemaForm from "./SchemaForm";

export default function DashBoard() {
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
        if (response.status === 400) {
          console.log(await response.text());
        }
        if (response.status === 401) {
          console.log(await response.text());
        }
      } catch (error) {
        console.error("Error logging in:", error);
      }
    };

    fetchData();
  }, [auth.authData.password, auth.authData.username]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {userData.map((data, key) => (
        <div key={key} className="container">
          <div className="inside-container">
            <div className="title">UserId</div>
            <div className="title-value">{data.id}</div>
          </div>
          <div className="inside-container">
            <div className="title">Username</div>
            <div className="title-value">{data.username}</div>
          </div>
          <div className="inside-container">
            <div className="title">SchemaName</div>
            <div className="title-value">{data.schemaName}</div>
          </div>
        </div>
      ))}

      <div>
        <SchemaForm />
      </div>
    </div>
  );
}
