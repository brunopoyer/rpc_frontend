"use client";

import React from "react";
import {FaRegEdit} from "react-icons/fa";
import {MdOutlineDeleteForever} from "react-icons/md";
import {ITable} from "../../types/table";
import Modal from "@/components/Modal";
import {deleteTag, deleteTask} from "../../api";
import {useRouter} from "next/navigation";

interface ItemProps {
    item: any;
    columns: ITable[];
    type: "tag" | "task";
}

const Item: React.FC<ItemProps> = ({ item, columns, type }) => {

    const [showDeleteModal, setShowDeleteModal] = React.useState<boolean>(false);
    const route = useRouter();

    const handleDelete = async () => {
        if (type === "tag") {
            await deleteTag(item.id);
            route.refresh();
        }
        if (type === "task") {
            await deleteTask(item.id);
            route.refresh();
        }
    }

    return (
        <tr key={item.id}>
            <td>{item.id}</td>
            {columns.map((column, index) => (
                (column.type === "object" && item[column.key].length > 0) ?
                    <td key={index}
                        className={index === columns.length -1 ? 'w-full' : 'w-1/2'}
                    >
                        <div className="flex gap-2">
                        {item[column.key].map((tag: any) => (
                            <div key={`${item.id} ${tag.id}`} className="badge badge-primary badge-outline">
                                {tag.name}
                            </div>
                        ))}
                        </div>
                    </td>
                :
                <td key={index}
                    className={index === columns.length -1 ? 'w-full' : 'w-1/2'}
                >
                    {item[column.key]}
                </td>
            ))}
            <td className="flex gap-5">
                <FaRegEdit cursor="pointer" className="text-yellow-300" size={25} />
                <MdOutlineDeleteForever cursor="pointer" className="text-red-600" size={25} onClick={() => setShowDeleteModal(true)}/>
                <Modal show={showDeleteModal} setShow={() => setShowDeleteModal(false)} title={"Delete Item"}>
                    <div className="modal-body">
                        <p>Are you sure you want to delete this item?</p>
                        <h1 className="font-bold text-lg mt-5">{item.name}</h1>
                    </div>
                    <div className="modal-footer flex gap-2 mt-10">
                        <button className="btn btn-error btn-md" onClick={handleDelete}>Delete</button>
                        <button className="btn btn-primary btn-md" onClick={() => setShowDeleteModal(false)}>Cancel
                        </button>
                    </div>
                </Modal>
            </td>
        </tr>
    );
}

export default Item;
