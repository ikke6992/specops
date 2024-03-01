import { useState } from "react";
import TaskStatus from "../../../models/task/TaskStatus";
import RecordStatus from "../../../models/record/RecordStatus";
import HistoryTabs from "./HistoryTabs";

type FilterTabsProps = {
  filter: (status: "all" | TaskStatus | RecordStatus) => void;
};
const FilterTabs = ({ filter }: FilterTabsProps) => {
  const [selected, setSelected] = useState(0);

  return (
    <div className="w-full">
      <div className="grid grid-cols-4 grid-rows-1">
        <HistoryTabs
          filter={filter}
          selected={selected}
          setSelected={setSelected}
        />
      </div>
    </div>
  );
};

export default FilterTabs;
