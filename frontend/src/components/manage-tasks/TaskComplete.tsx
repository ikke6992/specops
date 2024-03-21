import { useContext } from "react";
import Modal from "../common/modal/Modal";
import Notes from "./fields/Notes";
import {
  ConfirmationContext,
  ConfirmationProvider,
} from "../../contexts/ConfirmationContext";

const Content = (props: {
  completeTask: (notes: string) => void;
  close: () => void;
}) => {
  const { notes } = useContext(ConfirmationContext);

  return (
    <Modal
      name="confirm"
      edit={false}
      close={props.close}
      submit={() => props.completeTask(notes)}
      form={<Notes />}
    />
  );
};

const TaskComplete = (props: {
  completeTask: (notes: string) => void;
  close: () => void;
}) => {
  return (
    <ConfirmationProvider>
      <Content completeTask={props.completeTask} close={props.close} />
    </ConfirmationProvider>
  );
};

export default TaskComplete;
