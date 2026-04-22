import { SelectRegion } from "./components";

type Props = {
  region: number;
  selectRegion: React.Dispatch<React.SetStateAction<number>>
}

export const InputDashboard = (props: Props) => {
  const { region, selectRegion } = props;

  return <div>
    <SelectRegion region={region} selectRegion={selectRegion} />
  </div>
}
