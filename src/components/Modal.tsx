interface ModalProps {
    show: boolean;
    setShow: () => void;
    title: string;
    children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ show, setShow, title,children}) => {
    return (
        <dialog className={`modal ${show ? ' modal-open' : ''}`}>
            <div className="modal-box">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    onClick={() => setShow()}>✕</button>
                </form>
                <h3 className="font-bold text-lg mb-2">{title}</h3>
                {children}
            </div>
        </dialog>
    );
}

export default Modal;
