import { useState } from "react";
import TaskStatus from "../../../models/task/TaskStatus";
import RecordStatus from "../../../models/record/RecordStatus";
import HistoryTabs from "./HistoryTabs";
import TaskTabs from "./TaskTabs";

type PropsType = {
  filter: (status: "all" | TaskStatus | RecordStatus) => void;
  isHistory: boolean;
  isDashboard?: boolean;
};
const FilterTabs = ({ filter, isHistory, isDashboard }: PropsType) => {
  const [selected, setSelected] = useState(0);

  return (
    <div className="">
      <div className="grid grid-flow-col auto-cols-auto grid-rows-1 justify-center">
        {isHistory ? (
          <HistoryTabs
            filter={filter}
            selected={selected}
            setSelected={setSelected}
          />
        ) : isDashboard ? (
          <TaskTabs
            filter={filter}
            selected={selected}
            setSelected={setSelected}
            isDashboard={isDashboard}
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
