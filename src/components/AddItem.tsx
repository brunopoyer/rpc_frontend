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
import {createTag, createTask, updateTag, updateTask} from "../../api";
import {Tag} from "../../types/tags";
import {useRouter} from "next/navigation";
import {Task} from "../../types/tasks";
import Select from "react-select";

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
    const [selectedOptions, setSelectedOptions] = useState<Array<{label: string, value: string}>>();
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
                const tags: Array<{ id: number }> = [];
                selectedOptions?.forEach((option) => {
                    tags.push({id: parseInt(option.value)});
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

    const handleSelect = (selectedOptions: any) => {
        setSelectedOptions(selectedOptions);
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
                    (field.multiple) ?
                        <Select options={field.options} isMulti required={field.required}
                                instanceId={field.name}
                                closeMenuOnSelect={false}
                                value={selectedOptions}
                                onChange={handleSelect}
                        />
                        :
                        <select name={field.name} className="select select-bordered w-full" required={field.required}>
                            <option value="">Selecione uma opção</option>
                            {field.options.map((option: {
                                value: string | undefined;
                                label: string | undefined;
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
