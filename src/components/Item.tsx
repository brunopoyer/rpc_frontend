"use client";

import React from "react";
import {FaRegEdit} from "react-icons/fa";
import {MdOutlineDeleteForever} from "react-icons/md";
import {ITable} from "../../types/table";
import Modal from "@/components/Modal";
import {deleteTag, deleteTask, getTag, getTask} from "../../api";
import {useRouter} from "next/navigation";
import AddItem from "@/components/AddItem";
import {tagFields} from "@/shared/fields";
import Form from "@/components/Form";
import {it} from "node:test";

interface ItemProps {
    item: any;
    columns: ITable[];
    type: "tag" | "task";
}

const Item: React.FC<ItemProps> = ({ item, columns, type }) => {

    const [showDeleteModal, setShowDeleteModal] = React.useState<boolean>(false);
    const [showEditModal, setShowEditModal] = React.useState<boolean>(false);
    const route = useRouter();
    const [editItem, setEditItem] = React.useState<any>(null);
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

    const handleEdit = async (id: string) => {
        const item = (type === "tag") ? await getTag(parseInt(id)) : await getTask(parseInt(id));
        setEditItem(item);
        setShowEditModal(true);
    }

    const getBadge = (status: string) => {
        switch (status) {
            case "todo":
                return <span className="badge badge-primary badge-outline">A fazer</span>
            case "in_progress":
                return <span className="badge badge-warning badge-outline">Andamento</span>
            case "done":
                return <span className="badge badge-success badge-outline">Feito</span>
            default:
                return <span className="badge badge-primary badge-outline">A fazer</span>
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
                            <div key={`${item.id} ${tag.id}`} style={{backgroundColor: tag.color}} className="badge badge-outline font-bold">
                                {tag.name}
                            </div>
                        ))}
                        </div>
                    </td>
                :
                <td key={index}
                    className={index === columns.length -1 ? 'w-full' : 'w-1/2'}
                >
                    {column.key === "status" ?
                        getBadge(item[column.key])
                    :
                     item[column.key]
                    }
                </td>
            ))}
            <td className="flex gap-5">
                <FaRegEdit cursor="pointer" className="text-yellow-300" size={25} onClick={() => handleEdit(item.id)}/>
                <Modal show={showEditModal} setShow={() => setShowEditModal(false)} title={"Editar"}>
                    <Form method={{
                        operation: "update",
                        type: type
                    }} setShowModal={setShowEditModal}
                    item={editItem}/>
                </Modal>
                <MdOutlineDeleteForever cursor="pointer" className="text-red-600" size={25} onClick={() => setShowDeleteModal(true)}/>
                <Modal show={showDeleteModal} setShow={() => setShowDeleteModal(false)} title={"Excluir"}>
                    <div className="modal-body">
                        <p>Tem certeza que deseja deletar o item abaixo?</p>
                        <h1 className="font-bold text-lg mt-5">{item.name}</h1>
                    </div>
                    <div className="modal-footer flex gap-2 mt-10">
                        <button className="btn btn-error btn-md" onClick={handleDelete}>Confirma</button>
                        <button className="btn btn-primary btn-md" onClick={() => setShowDeleteModal(false)}>Cancelar
                        </button>
                    </div>
                </Modal>
            </td>
        </tr>
    );
}

export default Item;
