// Created using ChatGPT

import LogData from "./LogData";
import LogHead from "./LogHead";

const Log = () => {
  return (
    <table className="table-auto w-full">
      <thead>
        <LogHead />
      </thead>
      <tbody>
        <LogData />
        <LogData />
        <LogData />
      </tbody>
    </table>
  );
};

export default Log;
