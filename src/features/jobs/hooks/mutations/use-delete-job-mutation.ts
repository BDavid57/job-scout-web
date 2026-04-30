import { useMutation, useQueryClient } from "@tanstack/react-query";
import { jobApi } from "../../../../lib/api";

export const useDeleteJobMutation = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => jobApi.deleteJob(id),

    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: ["saved-jobs"] });
    },
  });
};
