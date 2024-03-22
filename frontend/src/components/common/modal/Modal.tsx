import ModalClose from "./ModalClose";
import ModalHeader from "./ModalHeader";
import ModalSubmit from "./ModalSubmit";

export default function Modal(props: {
  name: string;
  edit: boolean;
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
      <div className="justify-center items-center flex fixed inset-0 z-50 no-click">
        <div className="w-fit no-click">
          {/*content*/}
          <div className="border-0 rounded-lg border-2 shadow-xl relative bg-white no-click">
            {/*header*/}
            <div className="flex justify-between border-b no-click">
              <ModalHeader name={props.name} />
              <ModalClose close={props.close} />
            </div>
            {/*body*/}
            <div className="p-6 w-fit no-click">{props.form}</div>
            {/*footer*/}
            {props.name !== "Share link" && (
              <div className={`flex justify-start py-4 border-t no-click`}>
                <ModalSubmit name={props.name} handleSubmit={handleSubmit} />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black no-click"></div>
    </>
  );
}
