type PropsType = {
  name: string;
  color: string;
  selected: boolean;
  onClick: () => void;
};

const Tab = ({ name, color, selected, onClick }: PropsType) => {
  return (
    <button
      className={`shrink-0 min-w-24 px-4 py-2 self-end text-sm font-medium text-white hover:bg-${color}-600 ${
        selected
          ? `h-12 border-x-4 border-t-4 bg-${color}-600`
          : `h-11 border-x-2 border-t-2 bg-${color}-500`
      } border-${color}-700 rounded-t-md`}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default Tab;
