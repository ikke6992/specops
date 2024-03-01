import { useState } from "react";
import TaskStatus from "../../../models/task/TaskStatus";
import RecordStatus from "../../../models/record/RecordStatus";
import HistoryTabs from "./HistoryTabs";
import TaskTabs from "./TaskTabs";

type PropsType = {
  filter: (status: "all" | TaskStatus | RecordStatus) => void;
  isHistory: boolean;
};
const FilterTabs = ({ filter, isHistory }: PropsType) => {
  const [selected, setSelected] = useState(0);

  return (
    <div className="w-full">
      <div className="grid grid-cols-4 grid-rows-1">
        {isHistory ? (
          <HistoryTabs
            filter={filter}
            selected={selected}
            setSelected={setSelected}
          />
        ) : (
          <TaskTabs
            filter={filter}
            selected={selected}
            setSelected={setSelected}
          />
        )}
      </div>
    </div>
  );
};

export default FilterTabs;
