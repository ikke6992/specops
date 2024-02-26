const Card1Dates = (props: { start: string, end: string }) => {
  return (
    <p className="mt-2 text-gray-500 flex justify-between">
      <span>START: {props.start}</span>
      <span>END: {props.end}</span>
    </p>
  );
};

export default Card1Dates;
