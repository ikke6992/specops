import { useState } from "react";
import useWindowDimensions from "../../data/utils/windowdimensions";
import Modal from "../common/Modal";
import Card1 from "../common/cards/card1/Card1";

const SupervisorTaskManagement = () => {
  const { width } = useWindowDimensions();
  const [showModal, setShowModal] = useState(false);

  return (
    <main className="h-screen">
      {/* Search & Filter Section */}
      <section
        className="bg-slate-500 flex flex-row justify-center items-center"
        style={{ height: "20%" }}
      >
        <h1 className="text-3xl text-slate-950 font-black uppercase">
          Task Manager
        </h1>
      </section>
      {/* Task List Section */}
      <section
        className="p-8 bg-gray-400 grid md:grid-cols-2 md:grid-rows-2 lg:grid-cols-4 lg:grid-rows-2 gap-5"
        style={{ height: "70%" }}
      >
        {/* Display 8/4 cards dependent on width */}
        {width < 1024 ? (
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
        )}
      </section>
      {/* Navigation + Create Section */}
      <section
        className="bg-zinc-700 grid grid-cols-3 grid-rows-1 p-2"
        style={{ height: "10%" }}
      >
        <div></div>
        <div className="p-2 flex flex-row justify-center items-center">
          <button className="p-3 bg-cyan-600 hover:bg-cyan-300 border-gray-300 border-2 text-white">
            ←
          </button>
          <button className="ml-4 p-3 bg-cyan-600 hover:bg-cyan-300 border-gray-300 border-2 text-white">
            →
          </button>
        </div>
        <button
          className="bg-green-600 hover:bg-green-300 pt-2 pb-2 pl-4 pr-4 border-gray-300  border-2 text-white"
          onClick={(e) => {
            e.preventDefault();
            setShowModal(true);
          }}
        >
          Create Task
        </button>
      </section>
      {showModal && (
        <Modal name="Add Task" onClick={() => setShowModal(false)} />
      )}
    </main>
  );
};

export default SupervisorTaskManagement;
