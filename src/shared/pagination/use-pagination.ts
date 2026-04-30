import { useMemo, useState, useEffect } from "react";

export function usePagination<T>(data: T[] | undefined, itemsPerPage: number = 10) {
  const [currentPage, setCurrentPage] = useState(1);
  const listData = data ?? [];

  const lastPage = Math.max(1, Math.ceil(listData.length / itemsPerPage));

  useEffect(() => {
    if (currentPage > lastPage) {
      setCurrentPage(lastPage);
    }
  }, [currentPage, lastPage]);

  const currentItems = useMemo(() => {
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;

    return listData.slice(begin, end);
  }, [listData, currentPage, itemsPerPage]);

  const nextPageHandler = () =>
    setCurrentPage((page) => Math.min(page + 1, lastPage));

  const previousPageHandler = () =>
    setCurrentPage((page) => Math.max(page - 1, 1));

  return {
    data: currentItems,
    nextPageHandler,
    previousPageHandler,
    currentPage,
    lastPage,
  };
}
