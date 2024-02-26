// Created using ChatGPT

import { useEffect, useState } from "react";
import useWindowDimensions from "../../../utils/windowdimensions";
import LogData from "./LogData";
import LogHead from "./LogHead";

const Log = () => {
  const { height } = useWindowDimensions();
  const [size, setSize] = useState(0);

  useEffect(() => {
    const updateSize = () => {
      const newSize = Math.floor((height * 0.7) / 100);
      setSize(newSize);
    };
    updateSize();
  });

  return (
    <table className="table-auto w-full">
      <thead>
        <LogHead />
      </thead>
      <tbody>
        {[...Array(size)].map((_, i) => (
          <LogData key={i} />
        ))}
      </tbody>
    </table>
  );
};

export default Log;
