import React from "react";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import "./Pagination.css";
export default function Pagination({
  page,
  size,
  totalPages,
  totalElements,
  setPage,
  setSize,
}) {
  const handleNextPage = () => page < totalPages - 1 && setPage(page + 1);
  const handlePrevPage = () => page > 0 && setPage(page - 1);

  return (
    <div className="pagination-container">
      <div>
        <span>Items per page:</span>
        <select value={size} onChange={(e) => setSize(Number(e.target.value))}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value={totalElements}>All</option>
        </select>
        <span>
          Showing {page * size + 1}-{Math.min((page + 1) * size, totalElements)}{" "}
          of {totalElements}
        </span>
      </div>
      <div className="pagination-buttons">
        <button
          className="pagination-button"
          onClick={() => setPage(0)}
          disabled={page === 0}
        >
          <MdSkipPrevious />
        </button>
        <button
          className="pagination-button"
          onClick={handlePrevPage}
          disabled={page === 0}
        >
          <IoMdArrowDropleft /> <span>Previous</span>
        </button>
        <span>
          {page + 1} of {totalPages}
        </span>
        <button
          className="pagination-button"
          onClick={handleNextPage}
          disabled={page >= totalPages - 1}
        >
          <span>Next</span> <IoMdArrowDropright />
        </button>
        <button
          className="pagination-button"
          onClick={() => setPage(totalPages - 1)}
          disabled={page >= totalPages - 1}
        >
          <MdSkipNext />
        </button>
      </div>
    </div>
  );
}
