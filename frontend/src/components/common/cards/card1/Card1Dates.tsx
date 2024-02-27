const Card1Dates = (props: { start: string; end: string }) => {
  const formatDate = (date: string) => {
    const parts = date.split("-");
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];
    return `${day}/${month}/${year}`;
  };

  return (
    <p className="mt-2 text-gray-500 flex justify-between">
      <span>START: {formatDate(props.start)}</span>
      <span>END: {formatDate(props.end)}</span>
    </p>
  );
};

export default Card1Dates;
