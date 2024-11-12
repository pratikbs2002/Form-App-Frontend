import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import {
  getUserBySchemaName,
  restoreUser,
  softDeleteUser,
} from "../../services/user-service";
import { LoaderContext } from "../../context/LoaderProvider";
import Loader from "../../context/Loader";
import { getCurrentSchema } from "../../services/schema-service";
import { MdDelete, MdRestore } from "react-icons/md";
import "./UserTable.css";
import Pagination from "../../components/pagination/Pagination";
import usePagination from "../../hooks/usePagination";
import { Bounce, toast } from "react-toastify";

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

  const handleSoftDelete = async (userId) => {
    const response = await softDeleteUser(userId);
    if (response.ok) {
      toast.success("User Deleted successfully", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        theme: "dark",
        transition: Bounce,
        pauseOnHover: false,
      });
      setUserData((prevData) =>
        prevData.map((user) =>
          user.id === userId ? { ...user, deleted: true } : user
        )
      );
    } else {
      console.error("Error soft-deleting user:", await response.text());
    }
  };

  const handleRestoreUser = async (userId) => {
    const response = await restoreUser(userId);
    if (response.ok) {
      toast.success("User restored successfully", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        theme: "dark",
        transition: Bounce,
        pauseOnHover: false,
      });
      setUserData((prevData) =>
        prevData.map((user) =>
          user.id === userId ? { ...user, deleted: false } : user
        )
      );
    } else {
      console.error("Error restoring user:", await response.text());
    }
  };

  return (
    <div className="root-section">
      <div className="root-section-title">User Table</div>
      <div className="root-section-data">
        <div className="user-table-outside-container">
          <div className="user-table-inside-container">
            <div className="user-table-root-container">
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
                  <div className="user-table-container">
                    <table className="user-table">
                      <thead>
                        <tr>
                          <th>UserId</th>
                          <th>Username</th>
                          <th>SchemaName</th>
                          <th>Role</th>
                          <th>Date</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userData.map((data, key) => (
                          <tr key={key}>
                            <td>{key}</td>
                            <td>{data.username}</td>
                            <td>{data.schemaName}</td>
                            <td>{data.role.roleType}</td>
                            <td>{new Date(data.createdAt).toLocaleString()}</td>
                            <td>
                              <span
                                style={{
                                  backgroundColor: data.deleted
                                    ? "#d32f2f"
                                    : "#81c150",
                                  padding: "0.3rem 0.8rem 0.3rem 0.8rem",
                                  borderRadius: "3rem",
                                  fontWeight: "600",
                                  color: data.deleted && "white",
                                }}
                              >
                                {data.deleted ? "Deactivated" : "Active"}
                              </span>
                            </td>
                            <td>
                              <span
                                style={{
                                  cursor: "pointer",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  fontSize: "1.5rem",
                                }}
                              >
                                {!data.deleted && (
                                  <MdDelete
                                    className="delete-icon"
                                    onClick={() => handleSoftDelete(data.id)}
                                  />
                                )}
                                {data.deleted && (
                                  <MdRestore
                                    className="restore-icon"
                                    onClick={() => handleRestoreUser(data.id)}
                                  />
                                )}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
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
