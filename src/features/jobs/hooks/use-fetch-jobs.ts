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

  const listData = list ?? []

  const fetchData = useCallback(async () => {
    const BASE_URL = import.meta.env.VITE_JOBDATA_BASE_URL;

    try {
      setIsFetching(true);
      setIsFetched(false);
      setError(null);

      const url = new URL("/jobs", BASE_URL);
      url.searchParams.set("has_remote", "true");
      url.searchParams.set("language", "en");
      url.searchParams.set("region_id", String(region));
      url.searchParams.set("title", title);
      url.searchParams.set("max_age", published);

      const res = await fetch(url.toString());

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
    if (listData.length > 0) {
      localStorage.setItem("list", JSON.stringify(listData));
    }
  }, [listData]);

  return { data: listData, error, isFetching, isFetched, fetchData };
};
