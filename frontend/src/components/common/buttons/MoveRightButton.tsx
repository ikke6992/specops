const MoveRightButton = (props: { moveRight: () => void }) => {
  return (
    <button
      className="ml-4 p-3 bg-teal-600 hover:bg-teal-700 border-gray-300 border-2 text-white"
      onClick={props.moveRight}
    >
      →
    </button>
  );
};

export default MoveRightButton;
