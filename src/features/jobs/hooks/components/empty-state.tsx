type Props = {
  title: string;
  description: string;
}

export function JobsEmptyState(props: Props) {
  return (
    <div className={'flex flex-col items-center'}>
      <div className={'text-md font-medium'}>{props.title}</div>
      <div className={'text-sm text-muted-foreground'}>{props.description}</div>
    </div>
  )
}
