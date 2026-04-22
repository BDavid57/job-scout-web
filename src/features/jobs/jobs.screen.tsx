import { JobsTable } from "./table";
import { PaginationButtons, usePagination } from "../../shared";
import { useEmptyStateContent, useFetchJobs, useLoadingStateContent } from "./hooks";
import { useState } from "react";
import { InputDashboard } from "./input-dashboard";

export const JobsScreen = () => {
  const [region, setRegion] = useState(3);
  const [title, setTitle] = useState("software");
  const [published, setPublished] = useState("3");

  const { data: jobs, isFetching, isFetched, fetchData} = useFetchJobs(region, title, published);
  const { data: jobsList, nextPageHandler, previousPageHandler, currentPage, lastPage } = usePagination(jobs, 10)

  const isLoadingFirstTime = !isFetched && isFetching;
  const isLoadedAndHasData = isFetched && jobsList.length > 0;
  const isLoadedAndHasNoData = isFetched && jobsList.length === 0;

  const emptyStateContent = useEmptyStateContent(isLoadedAndHasNoData);
  const loadingStateContent = useLoadingStateContent(isLoadingFirstTime);

  return (
    <>
      <InputDashboard 
        region={region} 
        selectRegion={setRegion}
        title={title}
        setTitle={setTitle}
        published={published}
        setPublished={setPublished}
        fetchData={fetchData}
      />
      <>
        {emptyStateContent}
        {loadingStateContent}

        {isLoadedAndHasData && (
          <>
            <JobsTable jobsList={jobsList} />
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
