import { useState } from "react";

export const useJobFilters = () => {
  const [region, selectRegion] = useState(3);
  const [title, setTitle] = useState("software");
  const [published, setPublished] = useState("3");

  return {
    region,
    selectRegion,
    title,
    setTitle,
    published,
    setPublished,
  };
};
