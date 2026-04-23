import { Button } from "../../../components/ui/button";
import type { Job } from "../types";

type Props = {
  selectedJob: Job | undefined;
  closeModal: () => void;
};

export const DisplayJobModal = (props: Props) => {
  const { selectedJob, closeModal } = props;

  if (!selectedJob) return null;

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
          <div className="font-bold">Description</div>
          <textarea className="w-full h-128">{selectedJob.description_string}</textarea>
        </div>

        <div className="flex justify-between">
          <Button className={'bg-blue-500 text-white'}>Save Job</Button>
          <Button className={'bg-green-700'}>
            <a
              target={'_blank'}
              className="text-white"
              href={`${selectedJob.application_url}`}
            >
              Apply
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};
