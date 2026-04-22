const regionMap = {
  1: "Africa",
  2: "Asia/Pacific",
  3: "Europe",
  4: "Middle East",
  5: "North America",
  6: "South America",
} as const;

type Props = {
  region: number;
  selectRegion: React.Dispatch<React.SetStateAction<number>>
}

export const SelectRegion = (props: Props) => {
  const { region, selectRegion } = props;
  
  return <select
    value={region}
    onChange={(e) => {
      const regionId = Number(e.target.value);
      selectRegion(regionId);
    }}
  >
    {Object.entries(regionMap).map(([id, name]) => (
      <option key={id} value={id}>
        {name}
      </option>
    ))}
  </select>
}
