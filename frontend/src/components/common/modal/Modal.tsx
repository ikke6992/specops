import ModalClose from "./ModalClose";
import ModalHeader from "./ModalHeader";
import ModalSubmit from "./ModalSubmit";

export default function Modal(props: {
  name: string;
  close: () => void;
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
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <ModalHeader name={props.name} />
            {/*body*/}
            <div className="relative p-6 flex-auto">{props.form}</div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <ModalClose close={props.close} />
              <ModalSubmit name={props.name} handleSubmit={handleSubmit} />
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
