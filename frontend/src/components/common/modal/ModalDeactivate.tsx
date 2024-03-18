const ModalDeactivate = (props: { deactivate: () => void }) => {
  return (
    <button
      className="bg-red-500 text-white active:bg-red-600 font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 no-click"
      type="button"
      onClick={props.deactivate}
    >
      Deactivate
    </button>
  );
}

export default ModalDeactivate;