import { useEffect, useState } from "react";
import { JobsTable, type Job } from ".";
import { PaginationButtons, usePagination } from "../../shared";
import { useFetchSavedJobs, useEmptyStateContent, useLoadingStateContent } from "./hooks";
import { DisplayJobModal } from "./components";
import { jobApi } from "../../lib/api";

export const SavedJobsComponent = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [jobId, setJobId] = useState<number | undefined>(undefined);
  const [triggerDelete, setTriggerDelete] = useState(false);
  
  const { data: jobs, isFetching, isFetched, refetch } = useFetchSavedJobs();

  useEffect(() => {
    const job = jobs?.find(item => item.id === jobId)

    if(job) {
      setSelectedJob(job)
    };
  }, [jobId])

  const { 
      data: jobsList, 
      nextPageHandler, 
      previousPageHandler, 
      currentPage, 
      lastPage 
    } = usePagination(jobs, 10);

  const isLoadingFirstTime = !isFetched && isFetching;
  const isLoadedAndHasData = isFetched && jobsList.length > 0;
  const isLoadedAndHasNoData = isFetched && jobsList.length === 0;

  const emptyStateContent = useEmptyStateContent(isLoadedAndHasNoData);
  const loadingStateContent = useLoadingStateContent(isLoadingFirstTime);

  const handleDelete = () => {
  if (!selectedJob) return;

  jobApi.deleteJob(selectedJob.id).then(() => refetch())
};

  const handleCloseModal = () => {
    setTriggerDelete(false)
  }

  const handleTriggerDelete = () => {
    setTriggerDelete(true)
  }

  const handleSelectJob = (id: number) => {
    setJobId(id)
  }

  return (
    <>
      {triggerDelete && 
        <DisplayJobModal 
          selectedJob={selectedJob}
          closeModal={handleCloseModal}
          confirmMethod={handleDelete}
          message="Are you sure you want to delete this job?"
        />}
      {emptyStateContent}
      {loadingStateContent}

      {isLoadedAndHasData && (
        <>
          <JobsTable 
            jobsList={jobsList}
            savedList
            triggerDeleteMethod={handleTriggerDelete}
            selectJob={handleSelectJob}
          />
          <PaginationButtons 
            previousPageHandler={previousPageHandler} 
            nextPageHandler={nextPageHandler}
            currentPage={currentPage}
            lastPage={lastPage} />
        </>
      )}
    </>
  )
}
