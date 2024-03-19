import DeadlineField from "./DeadlineField";
import DepartmentField from "./DepartmentField";
import IntervalField from "./IntervalField";
import NameField from "./NameField";
import TimeframeField from "./TimeframeField";

const FieldCombination = () => {
  return (
    <div className="grid grid-cols-1 gap-y-2 w-fit">
      <div className="grid grid-cols-2 grid-row-1 justify-start items-center">
        <NameField />
      </div>
      <div className="grid grid-cols-2 grid-row-1 justify-start items-center">
        <DepartmentField />
      </div>
      <div className="grid grid-cols-2 grid-row-1 justify-start items-center">
        <TimeframeField />
      </div>
      <div className="grid grid-cols-2 grid-row-1 justify-start items-center">
        <IntervalField />
      </div>
      <div className="grid grid-cols-2 grid-row-1 justify-start items-center">
        <DeadlineField />
      </div>
    </div>
  );
};

export default FieldCombination;
