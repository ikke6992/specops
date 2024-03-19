const NavigateButton = (props: {
  navigate: () => void;
  name: string;
  color: string;
  active: boolean;
}) => {
  return (
    <button
      className={`h-12 w-24 self-end px-4 py-2 text-sm font-medium text-white bg-${
        props.color
      }-${props.active ? "600 border-x-4 border-t-4" : "500 border-x-2 border-t-2"} hover:bg-${
        props.color
      }-600 border-${props.color}-700 rounded-t-md`}
      onClick={props.navigate}
    >
      {props.name}
    </button>
  );
};

export default NavigateButton;
