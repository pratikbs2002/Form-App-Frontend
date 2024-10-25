import React, { useContext, useEffect, useState } from "react";
import "./SchemaMappingTable.css";
import { useAuth } from "../../context/AuthProvider";
import { getPageableAllSchema } from "../../services/schema-service";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { LoaderContext } from "../../context/LoaderProvider";

export default function SchemaMappingTable(props) {
  const [schemasData, setschemasData] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const { state, dispatch } = useContext(LoaderContext);
  const auth = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPageableAllSchema(page, size);
        if (!response.ok) throw new Error("Failed to fetch schema data");
        const schemas = await response.json();
        setschemasData(schemas.content);
        setTotalPages(schemas.totalPages);
        setTotalElements(schemas.totalElements);
      } catch (error) {
        console.error("Error logging in:", error);
      } finally {
        dispatch(false);
      }
    };
    dispatch(true);
    fetchData();
  }, [auth.authData.password, auth.authData.username, props.load, page, size]);

  // Handlers for pagination
  const handleNextPage = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 0) setPage(page - 1);
  };

  return (
    <div className="schema-mapping-table-outside-container">
      <div className="schema-mapping-table-inside-container">
        <div className="schema-mapping-table-container">
          {!state.loading && (
            <>
              <table className="schema-mapping-table">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>UUID Name</th>
                    <th>SchemaName</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {schemasData.map((data, key) => (
                    <tr key={key}>
                      <td>{key + 1}</td>
                      <td>{data.uuidName}</td>
                      <td>{data.schemaName}</td>
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
                      schemasData.length * (page * size + 1)
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
  );
}
