const OpenHistoryButton = (props: { onClick: () => void }) => {
  return (
    <button
      className="bg-blue-600 hover:bg-blue-300 pt-2 pb-2 pl-4 pr-4 border-gray-300  border-2 text-white"
      onClick={props.onClick}
    >
      Open History
    </button>
  );
};

export default OpenHistoryButton;
