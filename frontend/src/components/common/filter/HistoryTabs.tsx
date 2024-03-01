import RecordStatus from "../../../models/record/RecordStatus";
import Tab from "./Tab";

type PropsType = {
  filter: (status: RecordStatus | "all") => void;
  selected: number;
  setSelected: (selected: number) => void;
};
const HistoryTabs = ({ filter, selected, setSelected }: PropsType) => {
  return (
    <>
      <Tab
        name="All"
        color="blue"
        selected={selected === 0}
        onClick={() => {
          filter("all");
          setSelected(0);
        }}
      />
      <Tab
        name="Planned"
        color="green"
        selected={selected === 1}
        onClick={() => {
          filter("on time");
          setSelected(1);
        }}
      />
      <Tab
        name="Pending"
        color="red"
        selected={selected === 2}
        onClick={() => {
          filter("too late");
          setSelected(2);
        }}
      />
    </>
  );
};

export default HistoryTabs;
