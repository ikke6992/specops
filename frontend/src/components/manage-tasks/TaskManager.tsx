import TaskList from "./TaskList";
import { useContext} from "react";
import { TaskContext, TaskProvider } from "../../contexts/TaskContext";
import Layout from "../common/layout/Layout";

const Content = () => {
  const { search, filter } =
    useContext(TaskContext);

  const SearchBar = () => {
    return (
      <h1 className="text-3xl text-slate-950 font-black uppercase">
        Task Dashboard
      </h1>
    );
  };

  const Navigation = () => {
    return (
      <div className="flex justify-center">
        <p className="text-white font-semibold text-xs">
          Itvitae - Java Groep 53
        </p>
      </div>
    );
  };

  return (
    <>
      <Layout
        search={search}
        searchBar={<SearchBar />}
        content={<TaskList />}
        navigation={<Navigation />}
        filter={filter}
        isHistory={false}
      />
    </>
  );
};

const TaskManager = () => {
  return (
    <TaskProvider>
      <Content />
    </TaskProvider>
  );
};

export default TaskManager;
