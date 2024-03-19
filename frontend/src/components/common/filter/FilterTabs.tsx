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
    <div className="">
      <div className="w-96 grid grid-flow-col auto-cols-auto grid-rows-1 justify-center">
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
