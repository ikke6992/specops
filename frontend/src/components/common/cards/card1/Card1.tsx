import Card1Dates from "./Card1Dates";
import Card1Label from "./Card1Label";
import Card1Name from "./Card1Name";
import Card1Status from "./Card1Status";

const Card1 = () => {
  return (
    <article className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
      <section>
        <Card1Label />
      </section>
      <section className="mb-4">
        <Card1Name />
      </section>
      <section>
        <Card1Status />
      </section>
      <section>
        <Card1Dates />
      </section>
    </article>
  );
};

export default Card1;
