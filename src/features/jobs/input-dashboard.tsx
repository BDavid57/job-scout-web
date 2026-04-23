import { memo } from "react";
import { Button } from "../../components/ui/button";
import { AppInput, SelectRegion } from "./components";

type Props = {
  region: number;
  selectRegion: React.Dispatch<React.SetStateAction<number>>
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>
  published: string;
  setPublished: React.Dispatch<React.SetStateAction<string>>
  fetchData: () => void
}

export const InputDashboard = memo((props: Props) => {
  const { region, selectRegion, title, setTitle, published, setPublished, fetchData } = props;

  return (
    <div className={"flex justify-between"}>
      <div className={"flex space-x-12 mb-8"}>
        <SelectRegion region={region} selectRegion={selectRegion} />
        <AppInput 
          value={title} 
          onChange={setTitle} 
          placeholder="ex: software" 
          label={"Title"}
        />
        <AppInput 
          value={published} 
          onChange={setPublished} 
          placeholder="days since posted"
          label={"Days"}
        />
      </div>
      <Button className={"bg-green-700 text-white mt-4"} onClick={fetchData}>Fetch Jobs</Button>
    </div>
  )
})
