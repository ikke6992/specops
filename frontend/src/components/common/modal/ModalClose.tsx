import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ModalClose = (props: { close: () => void }) => {
  return (
    <FontAwesomeIcon
      icon={faXmark}
      className="text-red-500 bg-red-300 rounded-md m-1 p-1 w-5 h-5"
      type="button"
      onClick={props.close}
    />
  );
};

export default ModalClose;
