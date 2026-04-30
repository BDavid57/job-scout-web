import { useQuery } from "@tanstack/react-query";
import { jobApi } from "../../../lib/api";
import type { Job } from "../types";

export const useFetchSavedJobs = () => {
  return useQuery<Job[]>({
    queryKey: ["saved-jobs"],

    queryFn: () => jobApi.getSavedJobs(),

    enabled: true, // 👈 replaces manual "fetchData" trigger

    staleTime: 1000 * 60 * 5, // 5 min cache
  });
};
