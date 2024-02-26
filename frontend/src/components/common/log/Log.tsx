// Created using ChatGPT

import LogData from "./LogData";
import LogHead from "./LogHead";

const Log = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900">History Log</h1>
      <table className="table-auto w-full mt-4">
        <thead>
          <LogHead />
        </thead>
        <tbody>
          <LogData />
          <LogData />
          <LogData />
        </tbody>
      </table>
    </div>
  );
};

export default Log;
