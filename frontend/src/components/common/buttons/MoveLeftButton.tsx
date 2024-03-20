const MoveLeftButton = (props: { moveLeft: () => void }) => {
  return (
    <button
      className="p-3 bg-teal-600 hover:bg-teal-700 border-gray-300 border-2 text-white"
      onClick={props.moveLeft}
    >
      ←
    </button>
  );
};

export default MoveLeftButton;
