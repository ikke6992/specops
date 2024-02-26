const ModalHeader = (props: { name: string }) => {
  return (
    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
      <h3 className="text-3xl font-semibold">{props.name}</h3>
    </div>
  );
};

export default ModalHeader;
