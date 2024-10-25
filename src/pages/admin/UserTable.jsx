import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { getUserBySchemaName } from "../../services/user-service";
import { LoaderContext } from "../../context/LoaderProvider";
import Loader from "../../context/Loader";
import { getCurrentSchema } from "../../services/schema-service";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import "./UserTable.css";

export default function UserTable(props) {
  const [userData, setUserData] = useState([]);
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const auth = useAuth();
  const { state, dispatch } = useContext(LoaderContext);

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
        const userResponse = await getUserBySchemaName(
          schemaResult.schemaUUID,
          page,
          size,
          filter
        );

        if (userResponse.status === 200) {
          const users = await userResponse.json();
          setUserData(users.content);
          setUserData(users.content);
          setTotalPages(users.totalPages);
          setTotalElements(users.totalElements);
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
    page,
    size,
    filter,
  ]);

  const handleNextPage = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  return (
    <div className="root-section">
      <div className="root-section-title">User Table</div>
      <div className="root-section-data">
        <div className="user-table-outside-container">
          <div className="user-table-inside-container">
            <div className="user-table-container">
              <div className="filter-container">
                <div className="role-buttons">
                  <button
                    className={`table-role-button ${
                      filter === "all" ? "activetag" : ""
                    }`}
                    onClick={() => setFilter("all")}
                  >
                    ALL
                  </button>
                  <button
                    className={`table-role-button ${
                      filter === "admin" ? "activetag" : ""
                    }`}
                    onClick={() => setFilter("admin")}
                  >
                    Admin
                  </button>
                  <button
                    className={`table-role-button ${
                      filter === "reporting_user" ? "activetag" : ""
                    }`}
                    onClick={() => setFilter("reporting_user")}
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
                      {userData.map((data, key) => (
                        <tr key={key}>
                          <td>{key}</td>
                          <td>{data.username}</td>
                          <td>{data.schemaName}</td>
                          <td>{data.role}</td>
                          <td>{new Date(data.created_at).toLocaleString()}</td>
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
                          userData.length * (page * size + 1)
                        )}{" "}
                        of {totalElements}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexWrap: "nowrap",
                      }}
                    >
                      <button
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        onClick={() => setPage(0)}
                        disabled={page === 0}
                      >
                        <MdSkipPrevious />
                      </button>
                      <button
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        onClick={handlePrevPage}
                        disabled={page === 0}
                      >
                        <IoMdArrowDropleft /> <span>Previous</span>
                      </button>
                      <span>
                        {page + 1} of {totalPages}
                      </span>
                      <button
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        onClick={handleNextPage}
                        disabled={page >= totalPages - 1}
                      >
                        <span>Next</span>
                        <IoMdArrowDropright />
                      </button>
                      <button
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
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
      </div>
    </div>
  );
}
