const Card1Dates = (props: { end: string }) => {
  const formatDate = (date: string) => {
    const parts = date.split("-");
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="mt-2 text-gray-500 flex justify-between">
      <span>DEADLINE: {formatDate(props.end)}</span>
    </div>
  );
};

export default Card1Dates;
