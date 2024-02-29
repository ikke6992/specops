type TabProps = { name: string; color: string };
const Tab = ({ name, color }: TabProps) => {
  return (
    <button
      className={`px-4 py-2 text-sm font-medium text-white bg-${color}-500 border-b-2 border-${color}-700 hover:bg-${color}-600 focus:outline-none focus:border-${color}-800`}
    >
      {name}
    </button>
  );
};

const FilterTabs = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-4 grid-rows-1">
        <Tab name="All" color="blue" />
        <Tab name="Planned" color="green" />
        <Tab name="Pending" color="yellow" />
        <Tab name="Overdue" color="red" />
      </div>
    </div>
  );
};

export default FilterTabs;
