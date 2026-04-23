import { JobsTable } from "./table";
import { PaginationButtons, usePagination } from "../../shared";
import { useEmptyStateContent, useFetchJobs, useJobFilters, useLoadingStateContent } from "./hooks";
import { InputDashboard } from "./input-dashboard";

export const JobsScreen = () => {
  const filters = useJobFilters()

  const { 
    data: jobs, 
    isFetching, 
    isFetched, 
    fetchData
  } = useFetchJobs(filters.region, filters.title, filters.published);
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
      <InputDashboard 
        {...filters}
        fetchData={fetchData}
      />
      <>
        {emptyStateContent}
        {loadingStateContent}

        {isLoadedAndHasData && (
          <>
            <JobsTable 
              jobsList={jobsList}
            />
            <PaginationButtons 
              previousPageHandler={previousPageHandler} 
              nextPageHandler={nextPageHandler}
              currentPage={currentPage}
              lastPage={lastPage} />
          </>
        )}
      </>
    </>
  );
}
