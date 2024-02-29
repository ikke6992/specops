const Card1Label = (props: { dept: string }) => {
  return (
    <p className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
      {props.dept}
    </p>
  );
};

export default Card1Label;
