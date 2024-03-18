const NavigateButton = (props: { navigate: () => void; name: string }) => {
  return (
    <button
      className="bg-blue-600 hover:bg-blue-700 pt-2 pb-2 pl-4 pr-4 border-gray-300  border-2 text-white"
      onClick={props.navigate}
    >
      {props.name}
    </button>
  );
};

export default NavigateButton;
