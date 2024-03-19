const NavigateButton = (props: { navigate: () => void; name: string }) => {
  return (
    <button
      className="h-12 w-24 px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 border-b-4 border-blue-700 mr-4"
      onClick={props.navigate}
    >
      {props.name}
    </button>
  );
};

export default NavigateButton;
