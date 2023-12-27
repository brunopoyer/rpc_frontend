import {IFields} from "../../types/fields";
import Select from "react-select";
import {FormEventHandler, Key, useEffect, useState} from "react";
import {Tag} from "../../types/tags";
import {createTag, createTask, updateTag, updateTask} from "../../api";
import {Task} from "../../types/tasks";
import {useRouter} from "next/navigation";
import {tagFields, taskFields} from "@/shared/fields";


interface FormProps {
    method: {
        operation: "create" | "update",
        type: "tag" | "task"
    };
    setShowModal: (show: boolean) => void;
    item?: any;
}
const Form: React.FC<FormProps> = ({method, setShowModal, item}) => {
    const [selectedOptions, setSelectedOptions] = useState<Array<{label: string, value: string}>>();
    const [formData, setFormData] = useState<any>({});
    const fields = method.type === "tag" ? tagFields : taskFields;
    const options: Array<{label: string, value: string}> = [];
    if (method.type === "task") {
        fields.filter((field) => field.name === "tags")
        .forEach((field: IFields) => {
            field.options.then((result: Array<{ label: string, value: string }>) => {
                result.forEach((option: { label: string, value: string }) => {
                    options.push(option);
                });
            });
        });
    }

    useEffect(() => {
        if (item) {
            // Se o item existir, preencha o estado local com os valores do item
            const initialFormData: { [key: string]: string } = {};

            initialFormData.id = item.id;
            fields.forEach((field) => {
                if (field.type === "date") {
                    if (!item[field.name]) {
                        return;
                    }
                    const date = item[field.name].split('/');
                    initialFormData[field.name] = `${date[2]}-${date[1]}-${date[0]}`;
                    return;
                }
                if (field.type === "select") {
                    const tags: Array<{label: string, value: string}> = [];
                    if (!item[field.name]) {
                        return;
                    }
                    if (field.multiple) {
                        item[field.name].forEach((tag: {id: number, name: string}) => {
                            tags.push({label: tag.name, value: tag.id?.toString()});
                        });
                        setSelectedOptions(tags);
                        return;
                    }
                    // lower case the item[field.name] and remove spaces
                    const value = item[field.name].toLowerCase().replace(/\s/g, '');
                    // set the initialFormData[field.name] to the value
                    initialFormData[field.name] = value;
                    return;
                }
                initialFormData[field.name] = item[field.name] || '';
            });
            setFormData(initialFormData);
        }
    }, [fields, item]);

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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSelect = (selectedOptions: any) => {
        setSelectedOptions(selectedOptions);
    }

    const fieldTypes = (field: IFields, index: number) => {
        switch (field.type) {
            case "text":
            case "date":
            case "color":
                return (
                    <input type={field.type} placeholder={field.label} className="input input-bordered w-full"
                           name={field.name} id={field.name}
                           value={formData[field.name] || ""}
                           onChange={handleInputChange}
                           required={field.required}/>
                );
            case "select":
                return (
                    (field.multiple) ?
                        <Select options={options} isMulti required={field.required}
                                instanceId={field.name}
                                id={field.name}
                                closeMenuOnSelect={false}
                                value={selectedOptions}
                                onChange={handleSelect}
                        />
                        :
                        <select name={field.name} className="select select-bordered w-full" required={field.required} id={field.name}
                                value={formData[field.name] || ""}
                                onChange={handleInputChange}>
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
                              id={field.name}
                              value={formData[field.name] || ""}
                              onChange={handleInputChange}
                              required={field.required}/>
                );

        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="hidden" name="id" value={formData.id || ""}/>
            {fields.map((field, index) => (
                    <div key={index} className="form-control">
                        <label className="label" htmlFor={field.name}>
                            <span className="label-text">{field.label}</span>
                        </label>
                        {fieldTypes(field, index)}
                    </div>
                )
            )}
            <div className="form-control mt-6">
                <button className="btn btn-primary" type="submit">Salvar</button>
            </div>
        </form>
    );
}

export default Form;
