import { useCallback, useEffect, useMemo, useState } from "react";

export function usePagination<T>(data: T[], itemsPerPage: number = 10) {
  const [currentPage, setCurrentPage] = useState(1);

  const lastPage = Math.max(1, Math.ceil(data.length / itemsPerPage));

  const currentItems = useMemo(() => {
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;

    return data.slice(begin, end);
  }, [data, currentPage, itemsPerPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  const nextPageHandler = useCallback(() =>
    setCurrentPage((page) => Math.min(page + 1, lastPage)), []);

  const previousPageHandler = useCallback(() =>
    setCurrentPage((page) => Math.max(page - 1, 1)), []);

  return {
    data: currentItems,
    nextPageHandler,
    previousPageHandler,
    currentPage,
    lastPage,
  };
}
