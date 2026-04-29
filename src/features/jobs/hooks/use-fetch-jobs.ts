import { useEffect, useState } from "react";
import type { Job } from "../types";

export const useFetchJobs = (
  region: number,
  title: string,
  published: string
) => {
  const cacheKey = `jobs_${region}_${title}_${published}`;
  const BASE_URL = import.meta.env.VITE_JOBDATA_BASE_URL;

  const [list, setList] = useState<Job[]>([]);
  const [error, setError] = useState<unknown>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(cacheKey);

      if (saved) {
        setList(JSON.parse(saved));
        setIsFetched(true);
      } else {
        setList([]);
        setIsFetched(false);
      }
    } catch {
      setList([]);
      setIsFetched(false);
    }
  }, [cacheKey]);

  const fetchData = async () => {
    try {
      setIsFetching(true);
      setError(null);

      const url = `${BASE_URL}?has_remote=true&language=en&region_id=${region}&title=${encodeURIComponent(
        title
      )}&max_age=${published}`;

      const res = await fetch(url.toString());

      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
      }

      const data = await res.json();

      setList(data.results || []);
      setIsFetched(true);

      localStorage.setItem(cacheKey, JSON.stringify(data.results || []));
    } catch (err) {
      setError(err);
      setIsFetched(true);
    } finally {
      setIsFetching(false);
    }
  };

  return {
    data: list,
    error,
    isFetching,
    isFetched,
    fetchData,
  };
};
