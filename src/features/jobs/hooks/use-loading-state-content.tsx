import { LoaderWithText } from "./components";

export function useLoadingStateContent(isLoading: boolean) {
  if (!isLoading) return null;

  return (
    <div className={'p-16'}>
      <LoaderWithText>
        Please wait, we are loading the jobs ...
      </LoaderWithText>
    </div>
  )
}
