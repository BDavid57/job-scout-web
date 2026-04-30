import { useState } from "react";

export const useJobFilters = () => {
  const [region, selectRegion] = useState(3);
  const [title, setTitle] = useState("react");
  const [published, setPublished] = useState("5");

  return {
    region,
    selectRegion,
    title,
    setTitle,
    published,
    setPublished,
  };
};
