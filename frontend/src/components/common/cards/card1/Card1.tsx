import Card1Text from "./text/Card1Text";

const Card1 = () => {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <Card1Text />
      </div>
    </div>
  );
};

export default Card1;
