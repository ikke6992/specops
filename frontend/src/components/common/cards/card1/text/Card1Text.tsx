import Card1Label from "./Card1Label";
import Card1Name from "./Card1Name";

const Card1Text = () => {
  return (
    <div className="p-8 w-full">
      <Card1Label />
      <Card1Name />
      <p className="mt-2 text-gray-500 flex justify-between">
        <span>Start Date 01-01-2023</span>
        <span>→</span>
        <span>Deadline 01-01-2023</span>
      </p>
    </div>
  );
};

export default Card1Text;
