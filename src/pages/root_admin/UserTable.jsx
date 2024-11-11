import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import {
  getAllUserForRoot,
  getUserBySchemaName,
} from "../../services/user-service";
import { LoaderContext } from "../../context/LoaderProvider";
import Loader from "../../context/Loader";
import { getAllSchema } from "../../services/schema-service";
import "./UserTable.css";
import Pagination from "../../components/pagination/Pagination";
import usePagination from "../../hooks/usePagination";

export default function UserTable(props) {
  const auth = useAuth();
  const { state, dispatch } = useContext(LoaderContext);
  const [userData, setUserData] = useState([]);
  const [schemasData, setSchemasData] = useState([]);
  const [selectedSchema, setSelectedSchema] = useState("root");
  const [filter, setFilter] = useState("all");

  const {
    page,
    size,
    totalPages,
    totalElements,
    setPage,
    setSize,
    setTotalPages,
    setTotalElements,
  } = usePagination();

  // Fetches schema and user data based on selected schema
  const fetchData = async () => {
    dispatch(true);
    try {
      let userResponse;
      if (selectedSchema === "root") {
        userResponse = await getAllUserForRoot(page, size, filter);
      } else {
        userResponse = await getUserBySchemaName(
          selectedSchema,
          page,
          size,
          filter
        );
      }

      if (!userResponse.ok) {
        throw new Error(`Error: ${userResponse.status}`);
      }

      if (userResponse.status === 204) {
        console.log("No content available");
        setUserData([]);
        setTotalPages(0);
        setTotalElements(0);
        setPage(0);
        return;
      }

      const users = await userResponse.json();

      if (users.content && users.content.length > 0) {
        setUserData(users.content);
        setTotalPages(users.totalPages);
        setTotalElements(users.totalElements);
      } else {
        setUserData([]);
        setTotalPages(0);
        setTotalElements(0);
        setPage(0);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    } finally {
      dispatch(false);
    }
  };

  // Fetches all schemas
  const fetchAllSchemas = async () => {
    dispatch(true);
    try {
      const response = await getAllSchema();
      if (!response.ok) throw new Error("Failed to fetch schemas");

      const schemas = await response.json();
      setSchemasData(schemas);
    } catch (error) {
      console.error("Error fetching schemas:", error.message);
    } finally {
      dispatch(false);
    }
  };

  useEffect(() => {
    fetchAllSchemas();
  }, [props.load]);

  useEffect(() => {
    fetchData();
  }, [
    auth.authData.password,
    auth.authData.username,
    props.load,
    page,
    size,
    filter,
    selectedSchema,
  ]);

  // Handler for schema selection change
  const handleChange = (e) => {
    setSelectedSchema(e.target.value);
    setFilter("all");
  };

  return (
    <>
      <div className="user-table-outside-container">
        <div className="user-table-inside-container">
          <div className="user-table-container">
            <div className="user-table-select-input-container">
              <label>Select Schema: </label>
              <div className="user-table-select-container">
                {!state.loading && (
                  <select
                    onChange={handleChange}
                    name="role"
                    value={selectedSchema}
                    aria-label="Select Schema"
                  >
                    <option value="root">All</option>
                    {schemasData.map((schema, key) => (
                      <option key={key} value={schema.uuidName}>
                        {schema.schemaName} : {schema.uuidName}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
            <div className="filter-container">
              <div className="role-buttons">
                <button
                  className={`table-role-button ${
                    filter === "all" ? "activetag" : ""
                  }`}
                  onClick={() => {
                    setPage(0);
                    setFilter("all");
                  }}
                >
                  ALL
                </button>
                <button
                  className={`table-role-button ${
                    filter === "admin" ? "activetag" : ""
                  }`}
                  onClick={() => {
                    setPage(0);
                    setFilter("admin");
                  }}
                >
                  Admin
                </button>
                <button
                  className={`table-role-button ${
                    filter === "reporting_user" ? "activetag" : ""
                  }`}
                  onClick={() => {
                    setPage(0);
                    setFilter("reporting_user");
                  }}
                >
                  Reporting User
                </button>
              </div>
            </div>
            <Loader />
            {!state.loading && (
              <>
                {userData.length > 0 ? (
                  <>
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
                        {userData.map((user, index) => (
                          <tr key={index}>
                            <td>{index}</td>
                            <td>{user.username}</td>
                            <td>{user.schemaName}</td>
                            <td>{user.role.roleType}</td>
                            <td>{new Date(user.createdAt).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <Pagination
                      page={page}
                      size={size}
                      totalPages={totalPages}
                      totalElements={totalElements}
                      setPage={setPage}
                      setSize={setSize}
                    />
                  </>
                ) : (
                  <div>No users found</div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
