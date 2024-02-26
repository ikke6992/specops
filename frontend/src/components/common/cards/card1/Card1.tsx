import Card1Dates from "./Card1Dates";
import Card1Label from "./Card1Label";
import Card1Name from "./Card1Name";
import Card1Status from "./Card1Status";

type PropsType = { name: string, dept: string, start: string, end: string };
const Card1 = ({ name, dept, start, end }: PropsType) => {
  return (
    <a>
      <article className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8 h-fit hover:bg-slate-200 hover:cursor-pointer">
        <section>
          <Card1Label dept={dept} />
        </section>
        <section className="mb-4">
          <Card1Name name={name} />
        </section>
        <section>
          <Card1Status />
        </section>
        <section>
          <Card1Dates start={start} end={end} />
        </section>
      </article>
    </a>
  );
};

export default Card1;
