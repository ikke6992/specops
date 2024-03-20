const NavigateButton = (props: {
  navigate: () => void;
  name: string;
  color: string;
}) => {
  return (
    <button
      className={`w-24 h-12 self-end px-4 py-2 text-sm font-medium text-white bg-${props.color}-500 border-x-4 border-t-4 hover:bg-${props.color}-600 border-${props.color}-700 rounded-t-md`}
      onClick={props.navigate}
    >
      {props.name}
    </button>
  );
};

export default NavigateButton;
