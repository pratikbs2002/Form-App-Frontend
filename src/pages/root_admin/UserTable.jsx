import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import {
  getAllUserForRoot,
  getUserBySchemaName,
} from "../../services/user-service";
import { LoaderContext } from "../../context/LoaderProvider";
import Loader from "../../context/Loader";
import { getAllSchema, getCurrentSchema } from "../../services/schema-service";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import "./UserTable.css";

export default function UserTable(props) {
  const [userData, setUserData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const auth = useAuth();
  const { state, dispatch } = useContext(LoaderContext);
  const [schemasData, setSchemasData] = useState([]);
  const [selectedSchema, setSelectedSchema] = useState("root");

  // Fetches schema and user data based on selected schema
  const fetchData = async () => {
    dispatch(true);
    console.log(selectedSchema);

    try {
      if (selectedSchema === "root") {
        const userResponse = await getAllUserForRoot(page, size, filter);

        if (!userResponse.ok) throw new Error("Failed to fetch user data");

        const users = await userResponse.json();
        setUserData(users.content);
        setFilteredData(users.content);
        setTotalPages(users.totalPages);
        setTotalElements(users.totalElements);
      } else {
        const userResponse = await getUserBySchemaName(
          selectedSchema,
          page,
          size,
          filter
        );

        const users = await userResponse.json();

        setUserData(users.content);
        setFilteredData(users.content);
        setTotalPages(users.totalPages);
        setTotalElements(users.totalElements);
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
  }, [props.refresh]);

  useEffect(() => {
    fetchData();
  }, [
    auth.authData.password,
    auth.authData.username,
    props.refresh,
    page,
    size,
    filter,
    selectedSchema,
  ]);

  // Handlers for pagination
  const handleNextPage = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 0) setPage(page - 1);
  };

  // Handler for schema selection change
  const handleChange = (e) => {
    setSelectedSchema(e.target.value);
  };

  return (
    <>
      <div className="user-table-outside-container">
        <div className="user-table-inside-container">
          <div className="user-table-container">
            <div className="user-table-select-input-container">
              <label>Select Schema: </label>
              <div className="user-table-select-container">
                <Loader />
                {!state.loading && (
                  <select
                    onChange={handleChange}
                    name="role"
                    value={selectedSchema}
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
                    {filteredData.map((user, index) => (
                      <tr key={index}>
                        <td>{index}</td>
                        <td>{user.username}</td>
                        <td>{user.schemaName}</td>
                        <td>{user.role}</td>
                        <td>{new Date(user.created_at).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="pagination-container">
                  <div>
                    <span>Items per page:</span>
                    <select
                      value={size}
                      onChange={(e) => setSize(Number(e.target.value))}
                    >
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value={totalElements}>All</option>
                    </select>
                    <span>
                      Showing {page * size + 1}-
                      {Math.min(
                        (page + 1) * size,
                        filteredData.length * (page * size + 1)
                      )}{" "}
                      of {totalElements}
                    </span>
                  </div>
                  <div className="pagination-buttons">
                    <button onClick={() => setPage(0)} disabled={page === 0}>
                      <MdSkipPrevious />
                    </button>
                    <button onClick={handlePrevPage} disabled={page === 0}>
                      <IoMdArrowDropleft /> <span>Previous</span>
                    </button>
                    <span>
                      {page + 1} of {totalPages}
                    </span>
                    <button
                      onClick={handleNextPage}
                      disabled={page >= totalPages - 1}
                    >
                      <span>Next</span>
                      <IoMdArrowDropright />
                    </button>
                    <button
                      onClick={() => setPage(totalPages - 1)}
                      disabled={page >= totalPages - 1}
                    >
                      <MdSkipNext />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
