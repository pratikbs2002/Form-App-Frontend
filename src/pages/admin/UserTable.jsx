import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { getUserBySchemaName } from "../../services/user-service";
import { LoaderContext } from "../../context/LoaderProvider";
import Loader from "../../context/Loader";
import { getCurrentSchema } from "../../services/schema-service";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import "./UserTable.css";
import Pagination from "../../components/pagination/Pagination";
import usePagination from "../../hooks/usePagination";

export default function UserTable(props) {
  const [userData, setUserData] = useState([]);
  const [filter, setFilter] = useState("all");
  const auth = useAuth();
  const { state, dispatch } = useContext(LoaderContext);

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
                          <td>{data.role.roleType}</td>
                          <td>{new Date(data.created_at).toLocaleString()}</td>
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
