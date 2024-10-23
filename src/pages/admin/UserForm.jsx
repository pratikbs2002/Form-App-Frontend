import React, { useContext, useState } from "react";
import "./UserForm.css";
import { Bounce, toast } from "react-toastify";
import { addAdmin } from "../../services/user-service";
import { LoaderContext } from "../../context/LoaderProvider";

export default function UserForm(props) {
  const { refresh, setRefresh } = props;
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
    dispatch(true);

    try {
      const response = await addAdmin(userFormData);
      if (response.ok) {
        const data = await response.json();
        setRes(data);

        toast.success("User added successfully!", {
          transition: Bounce,
        });
        setRefresh(!refresh);
      } else {
        toast.error("Failed to add admin. Please try again.", {
          transition: Bounce,
        });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", {
        transition: Bounce,
      });
    } finally {
      dispatch(false);
    }
  };

  return (
    <div className="root-section">
      <div className="root-section-title">User Form</div>
      <div className="root-section-data">
        <div>
          {!state.loading && (
            <form noValidate className="userform-form">
              <div className="userform-form-inside-container">
                <div className="userform-text-input-container">
                  <label>Username:</label>
                  <div className="userform-text-container">
                    <input
                      type="text"
                      name="username"
                      value={userFormData.username}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="userform-select-input-container">
                  <label>Select Role of User: </label>
                  <div className="userform-select-container">
                    <select
                      value={userFormData.role}
                      onChange={handleChange}
                      name="role"
                    >
                      <option value="" disabled>
                        -- select role --
                      </option>
                      <option value="admin">Admin User</option>
                      <option value="reporting_user">Reporting User</option>
                    </select>
                  </div>
                </div>

                <button
                  className="add-user-button"
                  disabled={!userFormData.username}
                  style={{
                    cursor: !userFormData.username ? "not-allowed" : "pointer",
                  }}
                  type="submit"
                  onClick={handleAdd}
                >
                  Add
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
