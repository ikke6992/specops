import { useState } from "react";

type TabProps = {
  name: string;
  color: string;
  selected: boolean;
  onClick: () => void;
};
const Tab = ({ name, color, selected, onClick }: TabProps) => {
  return (
    <button
      className={`px-4 py-2 text-sm font-medium text-white bg-${color}-500 ${
        selected ? "border-4" : "border-b-2"
      } border-${color}-700 hover:bg-${color}-600 focus:outline-none focus:border-${color}-800`}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

const FilterTabs = () => {
  const [selected, setSelected] = useState(0);

  return (
    <div className="w-full">
      <div className="grid grid-cols-4 grid-rows-1">
        <Tab
          name="All"
          color="blue"
          selected={selected === 0}
          onClick={() => setSelected(0)}
        />
        <Tab
          name="Planned"
          color="green"
          selected={selected === 1}
          onClick={() => setSelected(1)}
        />
        <Tab
          name="Pending"
          color="yellow"
          selected={selected === 2}
          onClick={() => setSelected(2)}
        />
        <Tab
          name="Overdue"
          color="red"
          selected={selected === 3}
          onClick={() => setSelected(3)}
        />
      </div>
    </div>
  );
};

export default FilterTabs;
