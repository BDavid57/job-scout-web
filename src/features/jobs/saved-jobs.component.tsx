import { JobsTable } from ".";
import { PaginationButtons, usePagination } from "../../shared";
import { useFetchSavedJobs, useEmptyStateContent, useLoadingStateContent } from "./hooks";

export const SavedJobsComponent = () => {
  const { data: jobs, isFetching, isFetched,  refetch } = useFetchSavedJobs();

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

  return (
    <>
      {emptyStateContent}
      {loadingStateContent}

      {isLoadedAndHasData && (
        <>
          <JobsTable 
            jobsList={jobsList}
            savedList
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
