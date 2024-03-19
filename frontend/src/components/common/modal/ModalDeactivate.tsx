const ModalDeactivate = (props: { deactivate: () => void }) => {
  return (
    <button
      className="h-11 w-26 px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 border-2 border-red-700 ml-4 rounded-md"
      type="button"
      onClick={props.deactivate}
    >
      Deactivate
    </button>
  );
}

export default ModalDeactivate;