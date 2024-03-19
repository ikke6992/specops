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
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white">
            {/*header*/}
            <div className="flex justify-between">
              <ModalHeader name={props.name} />
              <ModalClose close={props.close} />
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">{props.form}</div>
            {/*footer*/}
            <div className="flex items-center p-6 border-t border-solid border-blueGray-200 rounded-b">
              {props.edit && <ModalDeactivate deactivate={props.deactivate} />}
              <ModalSubmit name={props.name} handleSubmit={handleSubmit} />
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
