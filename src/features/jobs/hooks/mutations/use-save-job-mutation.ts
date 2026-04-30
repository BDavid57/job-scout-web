import { useMutation, useQueryClient } from "@tanstack/react-query";
import { jobApi } from "../../../../lib/api";
import type { Job } from "../../types";

export const useSaveJobMutation = () => {
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: (job: Job) => jobApi.saveJob(job),

    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["saved-jobs"] });
    },
  });

   return {
    saveJob: (job: Job, options: any) => mutation.mutate(job, options),
    isSaving: mutation.isPending,
    error: mutation.error,
  };
};
