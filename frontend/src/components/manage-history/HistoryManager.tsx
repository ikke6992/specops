import { useNavigate } from "react-router-dom";
import MoveLeftButton from "../common/buttons/MoveLeftButton";
import MoveRightButton from "../common/buttons/MoveRightButton";
import NavigateButton from "../common/buttons/NavigateButton";
import Layout from "../common/layout/Layout";
import Log from "../common/log/Log";

const Content = () => {
  const navigate = useNavigate();

  const SearchBar = () => {
    return (
      <h1 className="text-3xl text-slate-950 font-black uppercase">
        History Manager
      </h1>
    );
  };

  const Navigation = () => {
    return (
      <>
        {/* Go to history */}
        <NavigateButton
          name="Open Task Manager"
          navigate={() => {
            navigate("/tasks");
          }}
        />
        {/* Browse through tasks */}
        <div className="p-2 flex flex-row justify-center items-center">
          <MoveLeftButton moveLeft={() => {}} />
          <MoveRightButton moveRight={() => {}} />
        </div>
        <div></div>
      </>
    );
  };

  return (
    <>
      <Layout
        searchBar={<SearchBar />}
        content={<Log />}
        navigation={<Navigation />}
      />
    </>
  );
};

const HistoryManager = () => {
  return <Content />;
};

export default HistoryManager;
