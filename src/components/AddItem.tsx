"use client";

import {FaPlusSquare} from "react-icons/fa";
import Modal from "@/components/Modal";
import {FormEventHandler, Key, useState} from "react";
import {IFields} from "../../types/fields";
import {createTag, createTask, updateTag, updateTask} from "../../api";
import {Tag} from "../../types/tags";
import {useRouter} from "next/navigation";
import {Task} from "../../types/tasks";

interface AddItemProps {
    fields: IFields[];
    title: string;
    method: {
        operation: "create" | "update",
        type: "tag" | "task"
    }
}

const AddItem: React.FC<AddItemProps> = ({title, fields, method}) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const sendData = async (data: any) => {
        switch (method.type) {
            case "tag":
                const tag = new Tag(data.name, data.color, data.id);
                if (method.operation === "create") {
                    return await createTag(tag);
                }
                if (method.operation === "update") {
                    return await updateTag(tag);
                }
                break;
            case "task":
                const tags: Array<{id: number}> = [];
                fields.forEach((field) => {
                    if (field.name === "tags") {
                        field.value.forEach((tag: number) => {
                            tags.push({id: tag});
                        });
                        field.value = [];
                    }
                });
                const task = new Task(data.name, data.description, data.due_date, tags, data.completed_at, data.id, data.status);
                if (method.operation === "create") {
                    return await createTask(task);
                }
                if (method.operation === "update") {
                    return await updateTask(task);
                }
                break;
        }
    }
    const router = useRouter();
    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        e.currentTarget.reset();
        await sendData(data).then(() => {
            setShowModal(false);
            router.refresh();
        });
    }

    const handleChange = (e: any, field: IFields ) => {
        field.value = [...e.target.options].filter(({selected}) => selected).map(({value}) => value);
    }

    const fieldTypes = (field: IFields) => {
        switch (field.type) {
            case "text":
            case "date":
            case "color":
                return (
                    <input type={field.type} placeholder={field.label} className="input input-bordered w-full"
                           name={field.name}
                           required={field.required}/>
                );
            case "select":
                return (
                    <select name={field.name} className="select select-bordered w-full" required={field.required}
                            multiple={field.multiple}
                            onChange={(e) => handleChange(e, field)}
                            value={field.value}
                    >
                        <option value="" disabled>{field.label}</option>
                        {field.options?.map((option: {
                            value: string | undefined;
                            label: string;
                        }, index: Key | null | undefined) => (
                            <option key={index} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                );
            case "textarea":
                return (
                    <textarea name={field.name} placeholder={field.label} className="textarea textarea-bordered w-full"
                              required={field.required}/>
                );

        }
    };

    return (
        <div onKeyUp={(e) => {
            if (e.key === 'Escape') {
                setShowModal(false);
            }
        }}>
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                <FaPlusSquare size={25}/>
                Novo
            </button>
            <Modal show={showModal} setShow={() => setShowModal(false)} title={title}>
                <form onSubmit={handleSubmit}>
                    {fields.map((field, index) => (
                        <div key={index} className="form-control">
                            <label className="label">
                                <span className="label-text">{field.label}</span>
                            </label>
                            {fieldTypes(field)}
        </div>
    )
)}
    <div className="form-control mt-6">
        <button className="btn btn-primary" type="submit">Salvar</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
export default AddItem;
