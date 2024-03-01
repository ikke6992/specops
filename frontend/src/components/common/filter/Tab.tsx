type PropsType = {
  name: string;
  color: string;
  selected: boolean;
  onClick: () => void;
};

const Tab = ({ name, color, selected, onClick }: PropsType) => {
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

export default Tab;
