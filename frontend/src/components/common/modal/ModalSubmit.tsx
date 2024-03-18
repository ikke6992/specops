const ModalSubmit = (props: {
  name: string;
  handleSubmit: (e: React.MouseEvent) => void;
}) => {
  return (
    <button
      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 no-click"
      type="button"
      onClick={(e) => props.handleSubmit(e)}
    >
      {props.name}
    </button>
  );
};

export default ModalSubmit;
