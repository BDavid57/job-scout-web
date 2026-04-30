import { useQuery } from "@tanstack/react-query";
import { jobApi } from "../../../lib/api";
import type { Job } from "../types";

export const useFetchPostedJobs = (
  region: number,
  title: string,
  published: string
) => {
  return useQuery<Job[]>({
    queryKey: ["posted-jobs", region, title, published],

    queryFn: () =>
      jobApi.getPostedJobs({
        region,
        title,
        published,
      }),

    enabled: true, // 👈 replaces manual "fetchData" trigger

    staleTime: 1000 * 60 * 5, // 5 min cache
  });
};
