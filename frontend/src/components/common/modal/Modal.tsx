import { isAdmin } from "../../../services/api-client";
import ModalClose from "./ModalClose";
import ModalDeactivate from "./ModalDeactivate";
import ModalHeader from "./ModalHeader";
import ModalSubmit from "./ModalSubmit";

export default function Modal(props: {
  name: string;
  edit: boolean;
  close: () => void;
  deactivate: () => void;
  submit: () => void;
  form: React.ReactNode;
}) {
  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    props.submit();
    props.close();
  };

  return (
    <>
      <div className="justify-center items-center flex fixed inset-0 z-50">
        <div className="w-fit">
          {/*content*/}
          <div className="border-0 rounded-lg border-2 shadow-xl relative bg-white">
            {/*header*/}
            <div className="flex justify-between border-b">
              <ModalHeader name={props.name} />
              <ModalClose close={props.close} />
            </div>
            {/*body*/}
            <div className="p-6 w-fit">{props.form}</div>
            {/*footer*/}
            <div className={`flex justify-start py-4 border-t`}>
              <ModalSubmit name={props.name} handleSubmit={handleSubmit} />
              {props.edit && isAdmin() && (
                <ModalDeactivate deactivate={props.deactivate} />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
