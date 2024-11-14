import React, { useContext, useEffect, useState } from "react";
import "./SchemaMappingTable.css";
import { useAuth } from "../../context/AuthProvider";
import { getPageableAllSchema } from "../../services/schema-service";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { LoaderContext } from "../../context/LoaderProvider";
import Pagination from "../../components/pagination/Pagination";
import usePagination from "../../hooks/usePagination";

export default function SchemaMappingTable(props) {
  const auth = useAuth();
  const { state, dispatch } = useContext(LoaderContext);
  const [schemasData, setschemasData] = useState([]);

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
  );
}
