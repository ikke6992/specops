import Card1CompleteButton from "./Card1CompleteButton";
import Card1Dates from "./Card1Dates";
import Card1Label from "./Card1Label";
import Card1Name from "./Card1Name";
import Card1Status from "./Card1Status";

type PropsType = {
  name: string;
  dept: string;
  start: string;
  end: string;
  completeTask: () => void;
};
const Card1 = ({ name, dept, start, end, completeTask }: PropsType) => {
  return (
    <a>
      <article className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8 h-fit hover:bg-slate-200 hover:cursor-pointer">
        <div>
          <Card1Label dept={dept} />
          <div className="absolute right-4 top-4">
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
          <Card1Dates start={start} end={end} />
        </div>
      </article>
    </a>
  );
};

export default Card1;
