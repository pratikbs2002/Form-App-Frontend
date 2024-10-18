import React, { useContext, useState } from "react";
import "./UserForm.css";
import { Bounce, toast } from "react-toastify";
import { addAdmin } from "../../services/user-service";
import { LoaderContext } from "../../context/LoaderProvider";
export default function UserForm() {
  const [userFormData, setUserFormData] = useState({
    username: "",
    password: "admin",
    role: "",
  });
  const [res, setRes] = useState({});
  const { state, dispatch } = useContext(LoaderContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserFormData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    const response = await addAdmin(userFormData);
    const data = await response.json();
    console.log(data);
    setRes(data);
  };
  return (
    <div className="root-section">
      <div className="root-section-title">ADD Admin Form</div>
      <div className="root-section-data">
        <div>
          {!state.loading && (
            <form noValidate className="form">
              <div className="input-container">
                <label>Username:</label>
                <input
                  type="text"
                  name="username"
                  value={userFormData.username}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Select Role of User: </label>
                <select
                  style={{ padding: "10px", backgroundColor: "transparent" }}
                  value={userFormData.role}
                  onChange={handleChange}
                >
                  <option
                    style={{ backgroundColor: "transparent", color: "black" }}
                    value="adminUser"
                  >
                    Admin User
                  </option>
                  <option
                    style={{ backgroundColor: "transparent", color: "black" }}
                    value="reportingUser"
                  >
                    Reporting User
                  </option>
                </select>
              </div>

              <button
                className="add-schema-button"
                disabled={!userFormData.username}
                style={{
                  cursor: !userFormData.username ? "not-allowed" : "pointer",
                }}
                type="submit"
                onClick={handleAdd}
              >
                Add
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
