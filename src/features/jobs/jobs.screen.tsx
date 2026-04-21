import { JobsTable } from "./table";
import { ContainedScreen, PaginationButtons, usePagination } from "../../shared";
import { useEmptyStateContent, useFetchJobs, useLoadingStateContent } from "./hooks";
import { Card, CardContent } from "../../components/ui/card";

export const JobsScreen = () => {
  const { data: jobs, isFetching, isFetched} = useFetchJobs();

  const { data: jobsList, nextPageHandler, previousPageHandler, currentPage, lastPage } = usePagination(jobs, 10)

  const isLoadingFirstTime = !isFetched && isFetching;
  const isLoadedAndHasData = isFetched && jobsList.length > 0;
  const isLoadedAndHasNoData = isFetched && jobsList.length === 0;

  const emptyStateContent = useEmptyStateContent(isLoadedAndHasNoData);
  const loadingStateContent = useLoadingStateContent(isLoadingFirstTime);

  return (
    <ContainedScreen>
      <Card>
        <CardContent>
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
        </CardContent>
      </Card>
    </ContainedScreen>
  );
}
