const FunctionButton = (props: { method: () => void; name: string }) => {
  return (
    <button
      className="h-12 w-26 px-4 py-2 text-sm font-medium text-white bg-green-500 hover:bg-green-600 border-b-4 border-green-700 mr-4"
      onClick={props.method}
    >
      {props.name}
    </button>
  );
};

export default FunctionButton;
