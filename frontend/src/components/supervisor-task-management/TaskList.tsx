import { useContext, useEffect } from "react";
import { TaskContext } from "../../data/contexts/TaskContext";
import useWindowDimensions from "../../data/utils/windowdimensions";
import Card1 from "../common/cards/card1/Card1";
import { cols, rows, size } from "../../data/utils/tasklistsize";

const TaskList = () => {
  const { width, height } = useWindowDimensions();
  const { getTasks, setSize } = useContext(TaskContext);

  useEffect(() => {
    setSize(size(height, width));
  });

  return (
    <section
      className="p-8 bg-gray-400"
      style={{
        height: "70%",
        display: "grid",
        gridTemplateRows: `repeat(${rows(height)}, minmax(0, 1fr))`,
        gridTemplateColumns: `repeat(${cols(width)}, minmax(0, 1fr))`,
        columnGap: "2em",
        rowGap: "2em",
      }}
    >
      {/* Display 8/4 cards dependent on width */}
      {getTasks().map((task) => {
        return <Card1 key={task.id} name={task.name} />;
      })}
      {/* {width < 1024 ? (
            <>
              <Card1 />
              <Card1 />
              <Card1 />
              <Card1 />
            </>
          ) : (
            <>
              <Card1 />
              <Card1 />
              <Card1 />
              <Card1 />
              <Card1 />
              <Card1 />
              <Card1 />
              <Card1 />
            </>
          )} */}
    </section>
  );
};

export default TaskList;
