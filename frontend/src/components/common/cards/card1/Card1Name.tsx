const Card1Name = (props: { name: string }) => {
  return (
    <h1 className="mt-1 text-lg leading-tight font-medium text-black">
      {props.name}
    </h1>
  );
};

export default Card1Name;
