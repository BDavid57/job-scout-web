import { type PropsWithChildren } from "react";

export function LoaderWithText(props: PropsWithChildren) {
  return (
    <div className={'flex flex-col items-center'}>
      <div className={'text-center text-sm text-muted-foreground mt-4 max-w-prose'}>
        {props.children}
      </div>
    </div>
  )
}
