type PropsType = {
  name: string;
  color: string;
  selected: boolean;
  onClick: () => void;
};

const Tab = ({ name, color, selected, onClick }: PropsType) => {
  return (
    <button
      className={`shrink-0 min-w-24 h-12 px-4 py-2 text-sm font-medium text-white hover:bg-${color}-600 ${
        selected ? `border-4 bg-${color}-600` : `border-b-4 bg-${color}-500`
      } border-${color}-700 rounded-t-md`}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default Tab;
