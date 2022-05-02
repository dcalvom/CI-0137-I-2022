function Modal({
  title,
  children,
  onClose
}) {
  return (
    <div>
      <div onClick={() => { onClose(); }} className="w-full h-full bg-fondoTransparente fixed top-0 left-0 opacity-90"></div>
      <div className="opacity-100 min-h-[200px] max-h-[400px] max-w-[500px] min-w-[250px] bg-white fixed left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] p-8">
        <button onClick={() => { onClose(); }} className="float-right">X</button>
        <p className="text-center uppercase text-lg mb-4">{title}</p>
        {children}
      </div>
    </div>
  );
}

export default Modal;
