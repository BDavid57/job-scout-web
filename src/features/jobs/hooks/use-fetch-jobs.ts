import { useEffect, useState } from "react";
import type { Job } from "../types";

export const useFetchJobs = () => {
  const [list, setList] = useState<Job[]>(() => {
    const saved = localStorage.getItem("list");
    return saved ? JSON.parse(saved) : [];
  });
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isFetched, setIsFetched] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (list.length > 0) return;

      try {
        setIsFetching(true)
        setIsFetched(false)
        const res = await fetch("http://localhost:3000/jobs");
        const data = await res.json();
        setIsFetching(false)

        setList(data.results); // take first 10 just as example
        setIsFetched(true)
      } catch (err) {
        setError(error)
        console.error("Fetch failed:", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (list.length > 0) {
      localStorage.setItem("list", JSON.stringify(list));
    }
  }, [list]);

  return {data: list, error, isFetching, isFetched}
}
