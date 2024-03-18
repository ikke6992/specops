import Modal from "../common/modal/Modal";
import Notes from "./fields/Notes";

const TaskComplete = (props: {
  completeTask: () => void;
  close: () => void;
}) => {
  return (<Modal name="confirm" edit={false} close={props.close} deactivate={props.close} submit={props.completeTask} form={<Notes />}/>);
}

export default TaskComplete;