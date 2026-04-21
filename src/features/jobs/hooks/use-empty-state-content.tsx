import { JobsEmptyState } from "./components";

export function useEmptyStateContent(isEmpty: boolean) {
  if (!isEmpty) return null;

  return (
    <div className={'p-16'}>
      <JobsEmptyState
        title={'You don\'t have any Jobs'}
        description={'Fetch Jobs'}
      />
    </div>
  )
}
