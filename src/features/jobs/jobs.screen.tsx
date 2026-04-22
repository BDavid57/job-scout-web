import { JobsTable } from "./table";
import { PaginationButtons, usePagination } from "../../shared";
import { useEmptyStateContent, useFetchJobs, useLoadingStateContent } from "./hooks";
import { useState } from "react";
import { InputDashboard } from "./input-dashboard";

export const JobsScreen = () => {
  const [region, setRegion] = useState(3);

  const { data: jobs, isFetching, isFetched} = useFetchJobs();
  const { data: jobsList, nextPageHandler, previousPageHandler, currentPage, lastPage } = usePagination(jobs, 10)

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
          <InputDashboard region={region} selectRegion={setRegion} />
          <JobsTable jobsList={jobsList} />
          <PaginationButtons 
            previousPageHandler={previousPageHandler} 
            nextPageHandler={nextPageHandler}
            currentPage={currentPage}
            lastPage={lastPage} />
        </>
      )}
    </>
  );
}
