import { useState } from "react";

export default function usePagination(defaultSize = 5) {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(defaultSize);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const resetPagination = () => setPage(0);

  return {
    page,
    size,
    totalPages,
    totalElements,
    setPage,
    setSize,
    setTotalPages,
    setTotalElements,
    resetPagination,
  };
}
