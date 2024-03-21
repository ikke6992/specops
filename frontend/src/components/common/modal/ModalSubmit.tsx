const ModalSubmit = (props: {
  name: string;
  valid: boolean;
  handleSubmit: (e: React.MouseEvent) => void;
}) => {
  return (
    <button
      className={`h-11 w-26 px-4 py-2 text-sm font-medium text-white ${
        valid ? "bg-green-500" : "bg-green-200"
      } hover:bg-green-600 border-2 border-green-700 ml-4 rounded-md`}
      disabled={valid ? true : false}
      type="button"
      onClick={(e) => props.handleSubmit(e)}
    >
      {props.name}
    </button>
  );
};

export default ModalSubmit;
