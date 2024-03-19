const FunctionButton = (props: { method: () => void; name: string }) => {
  return (
    <button
      className="h-11 w-26 px-4 py-2 text-sm font-medium text-white bg-green-500 hover:bg-green-600 border-x-2 border-t-2 border-green-700 ml-4 rounded-t-md self-end"
      onClick={props.method}
    >
      {props.name}
    </button>
  );
};

export default FunctionButton;
