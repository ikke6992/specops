const FunctionButton = (props: { method: () => void; name: string }) => {
  return (
    <button
      className="bg-green-600 hover:bg-green-300 pt-2 pb-2 pl-4 pr-4 border-gray-300  border-2 text-white"
      onClick={props.method}
    >
      {props.name}
    </button>
  );
};

export default FunctionButton;
