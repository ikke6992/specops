import Card1CompleteButton from "./Card1CompleteButton";
import Card1CheckOff from "./Card1CompleteButton";
import Card1Dates from "./Card1Dates";
import Card1Label from "./Card1Label";
import Card1Name from "./Card1Name";
import Card1Status from "./Card1Status";

type PropsType = { name: string; completeTask: () => void };
const Card1 = ({ name, completeTask }: PropsType) => {
  return (
    <article className="container mx-auto max-w-sm bg-white rounded-xl shadow-md overflow-hidden p-8 h-fit hover:bg-slate-200 hover:cursor-pointer">
      <a>
        <div className="flex justify-between">
          <div>
            <Card1Label />
          </div>
          <div>
            <Card1CompleteButton completeTask={completeTask} />
          </div>
        </div>
        <div className="mb-4">
          <Card1Name name={name} />
        </div>
        <div>
          <Card1Status />
        </div>
        <div>
          <Card1Dates />
        </div>
      </a>
    </article>
  );
};

export default Card1;
