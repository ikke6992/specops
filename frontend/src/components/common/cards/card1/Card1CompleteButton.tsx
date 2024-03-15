interface Props {
  completeTask: () => void;
}

const Card1CompleteButton = ({ completeTask }: Props) => {
  return (
    <button
      className="bg-green-500 hover:bg-green-600 rounded p-1 no-click"
      onClick={completeTask}
    >
      Complete
    </button>
  );
};

export default Card1CompleteButton;
