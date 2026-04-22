import { useEffect, useState, useCallback } from "react";
import type { Job } from "../types";

export const useFetchJobs = (
  region: number,
  title: string,
  published: string
) => {
  const [list, setList] = useState<Job[]>([]);
  const [error, setError] = useState<unknown>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isFetched, setIsFetched] = useState(false);

  const fetchData = useCallback(async () => {
    const BASE_URL = import.meta.env.JOBDATA_BASE_URL;

    try {
      setIsFetching(true);
      setIsFetched(false);
      setError(null);

      const res = await fetch(
        `${BASE_URL}&region_id=${region}&title=${title}&max_age=${published}`
      );

      const data = await res.json();

      setList(data.results);
      setIsFetched(true);
    } catch (err) {
      setError(err);
      setIsFetched(true);
    } finally {
      setIsFetching(false);
    }
  }, [region, title, published]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (list.length > 0) {
      localStorage.setItem("list", JSON.stringify(list));
    }
  }, [list]);

  return { data: list, error, isFetching, isFetched, fetchData };
};
