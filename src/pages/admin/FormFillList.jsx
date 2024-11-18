/* eslint-disable no-unused-vars */

import React, { useContext, useEffect, useState } from "react";
import FormEntry from "../../components/forms/FormEntry";
import "./CreatedForms.css";
import Loader from "../../context/Loader";
import { LoaderContext } from "../../context/LoaderProvider";
import {
  MdDelete,
  MdEdit,
  MdRemoveRedEye,
  MdSkipNext,
  MdSkipPrevious,
} from "react-icons/md";
import {
  deleteFormById,
  getAllForms,
  getAllFormsForReportingUser,
} from "../../services/form-service";
import { redirect, useNavigate } from "react-router";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";

export default function FormFillList() {
  const navigate = useNavigate();
  const [forms, setForms] = useState([]);
  const [sortBy, setSortBy] = useState("default");
  const [viewStyle, setViewStyle] = useState("table");
  const { state, dispatch } = useContext(LoaderContext);
  const [pageDetails, setPageDetails] = useState({
    totalElements: 5,
    totalPages: 1,
    isLast: false,
  });

  const [pagination, setPagination] = useState({
    pageNumber: 0,
    pageSize: 5,
  });

  useEffect(() => {
    const fetchForms = async () => {
      dispatch(true);

      let sort = null;
      let sortDir = null;
      if (sortBy === "default") {
        sort = "id";
        sortDir = "asc";
      } else if (sortBy === "new") {
        sort = "createdAt";
        sortDir = "desc";
      } else if (sortBy === "old") {
        sort = "createdAt";
        sortDir = "asc";
      } else if (sortBy === "form-id-asc") {
        sort = "id";
        sortDir = "asc";
      } else if (sortBy === "form-id-desc") {
        sort = "id";
        sortDir = "desc";
      } else if (sortBy === "name-asc") {
        sort = "title";
        sortDir = "asc";
      } else if (sortBy === "name-desc") {
        sort = "title";
        sortDir = "desc";
      } else {
        sort = "id";
        sortDir = "asc";
      }

      const response = await getAllFormsForReportingUser(
        pagination.pageNumber,
        pagination.pageSize,
        sort,
        sortDir,
        localStorage.getItem("id")
      );
      const data = await response.json();
      console.log(data);
      if (!data) {
        return;
      }
      console.log(data);

      setForms(data.content);

      setPageDetails({
        totalElements: data.totalElements,
        totalPages: data.totalPages,
        isLast: data.lastPage,
      });

      dispatch(false);
    };

    fetchForms();
  }, [pagination, sortBy]);

  const handlePageChange = async (a) => {
    if (a === "prev") {
      setPagination((prev) => {
        return { ...prev, pageNumber: prev.pageNumber - 1 };
      });
    } else if (a === "next") {
      setPagination((prev) => {
        return { ...prev, pageNumber: prev.pageNumber + 1 };
      });
    } else if (a === "first") {
      setPagination((prev) => {
        return { ...prev, pageNumber: 0 };
      });
    } else if (a === "last") {
      setPagination((prev) => {
        return { ...prev, pageNumber: pageDetails.totalPages - 1 };
      });
    }
  };

  const handlePageOptionChange = (e) => {
    console.log(e.target.value);
    console.log(pageDetails);

    setPagination({ pageNumber: 0, pageSize: e.target.value });
  };

  // const handleDelete = async (formId) => {
  //   await deleteFormById(formId);
  //   const response = await getAllForms();
  //   const data = await response.json();
  //   console.log(data);
  //   if (!data) {
  //     return;
  //   }

  //   setForms(data.content);
  // };

  return (
    <div className="created-forms-container">
      <h1>Forms List</h1>
      <Loader />
      {!state.loading && (
        <div className="form-view">
          <div>
            <nav className="header">
              <p
                className={viewStyle === "table" ? "active" : ""}
                onClick={() => setViewStyle("table")}
              >
                Table View
              </p>
              <p
                className={viewStyle === "card" ? "active" : ""}
                onClick={() => setViewStyle("card")}
              >
                Card View
              </p>
            </nav>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-by-select"
          >
            <option value="default">Sort By...</option>
            <option value="new">Newest</option>
            <option value="old">Oldest</option>
            <option value="form-id-asc">Form ID - Ascending</option>
            <option value="form-id-desc">Form ID - Descending</option>
            <option value="name-asc">Form Name - Ascending</option>
            <option value="name-desc">Form Name - Descending</option>
          </select>
        </div>
      )}
      <div>{state.loading}</div>
      {!state.loading && forms.length === 0 && <h2>No Forms Are Assigned</h2>}
      {viewStyle === "card" &&
        forms.map((form) => (
          <FormEntry
            key={form.id}
            form={form}
            // onDelete={handleDelete}
            edit={false}
          />
        ))}
      {!state.loading && viewStyle === "table" && (
        <div className="user-table-container">
          <table className="user-table">
            <thead>
              <tr>
                <th>Form Res ID</th>
                <th>Form ID</th>
                <th>Form Name</th>
                <th>Created By</th>
                <th>Created At</th>
                <th>Fill</th>
              </tr>
            </thead>
            <tbody>
              {forms.map((form) => (
                <tr key={form.id}>
                  <td>{form.id}</td>
                  <td>{form.formId}</td>
                  <td>{form.title}</td>
                  <td>{form.createdBy}</td>
                  <td>{form.createdAt}</td>
                  <td>
                    <div className="button-div">
                      <button
                        className="rounded-button"
                        onClick={() => navigate(`/fillform/${form.formId}`)}
                      >
                        <MdEdit />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {pagination.totalElements !== 0 && (
        <div className="pagination-container">
          <div>
            <span>Items per page:</span>
            <select
              value={pagination.pageSize}
              onChange={handlePageOptionChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value={pageDetails.totalElements}>ALL</option>
            </select>
            <span>
              Showing{" "}
              {pageDetails.totalElements === 0
                ? "0"
                : pagination.pageNumber * pagination.pageSize + 1}
              -{pagination.pageNumber * pagination.pageSize + forms.length} of{" "}
              {pageDetails.totalElements} forms
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
              onClick={() => handlePageChange("first")}
              disabled={pagination.pageNumber === 0}
            >
              {/* {"<<"} */}
              <MdSkipPrevious />
            </button>
            <button
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => handlePageChange("prev")}
              disabled={pagination.pageNumber === 0}
            >
              {/* {"<"} */}
              <IoMdArrowDropleft /> <span>Previous</span>
            </button>
            <span>
              {pagination.pageNumber + 1} out of{" "}
              {pageDetails.totalPages === 0 ? "1" : pageDetails.totalPages}
            </span>
            <button
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => handlePageChange("next")}
              disabled={pageDetails.isLast}
            >
              {/* {">"} */}
              <span>Next</span>
              <IoMdArrowDropright />
            </button>
            <button
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => handlePageChange("last")}
              disabled={pageDetails.isLast}
            >
              {/* {">>"} */}
              <MdSkipNext />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
