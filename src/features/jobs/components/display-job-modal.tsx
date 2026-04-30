import { memo } from "react";
import { Button } from "../../../components/ui/button";
import type { Job } from "../types";

type Props = {
  selectedJob: Job | null;
  closeModal: () => void;
  confirmMethod: () => void;
  message: string;
};

export const DisplayJobModal = memo((props: Props) => {
  const { selectedJob, closeModal, confirmMethod, message } = props;

  if (!selectedJob) return null;

  const handleConfirm = () => {
    confirmMethod();
    closeModal();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={closeModal}
      />

      <div className="relative z-10 w-full max-w-4xl rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex justify-between">
          <div className="font-semibold mb-4">
            {selectedJob.title}
          </div>
          <Button className={"bg-red-500 text-white"} onClick={closeModal}>Close</Button>
        </div>

        <div className="font-semibold mb-4">
          <div className="font-bold">{message}</div>
        </div>

        <div className="flex justify-between">
          <Button onClick={handleConfirm} className={'bg-blue-500 text-white'}>Confirm</Button>
        </div>
      </div>
    </div>
  );
});
