"use client";

import {FaPlusSquare} from "react-icons/fa";
import Modal from "@/components/Modal";
import {FormEventHandler, JSXElementConstructor,
    Key,
    PromiseLikeOfReactNode,
    ReactElement,
    ReactNode,
    ReactPortal,
    useState
} from "react";
import {IFields} from "../../types/fields";
import Form from "@/components/Form";

interface AddItemProps {
    fields: IFields[];
    title: string;
    method: {
        operation: "create" | "update",
        type: "tag" | "task"
    };
}

const AddItem: React.FC<AddItemProps> = ({title, fields, method}) => {
    const [showModal, setShowModal] = useState<boolean>(false);

    return (
        <div onKeyUp={(e) => {
            if (e.key === 'Escape') {
                setShowModal(false);
            }
        }}>
            {method.operation === "create" &&
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    <FaPlusSquare size={25}/>
                    Novo
                </button>
            }
            <Modal show={showModal} setShow={() => setShowModal(false)} title={title}>
                <Form method={method} setShowModal={setShowModal}/>
            </Modal>
        </div>
    );
}
export default AddItem;
