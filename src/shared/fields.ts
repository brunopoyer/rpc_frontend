import {IFields} from "../../types/fields";
import {ITable} from "../../types/table";
import {getAllTags} from "../../api";

export const tagFields: IFields[] = [
    {
        label: "Nome",
        name: "name",
        type: "text",
        required: true
    },
    {
        label: "Cor",
        name: "color",
        type: "color",
        required: true
    }
];


export const tagColumns: ITable[] = [
    {
        key: "name",
        label: "Nome"
    },
    {
        key: "color",
        label: "Cor"
    }
];


export const taskColumns: ITable[] = [
    {
        key: "name",
        label: "Nome"
    },
    {
        key: "description",
        label: "Descrição"
    },
    {
        key: "status",
        label: "Status"
    },
    {
        key: "due_date",
        label: "Data de Entrega"
    },
    {
        key: "completed_at",
        label: "Data de Conclusão"
    },
    {
        key: "tags",
        label: "Tags",
        type: "object",
    }
];

export const getTagsOptions = async () => {
    const tags = await getAllTags();
    return tags.map((tag) => {
        return {
            label: tag.name,
            value: tag.id
        }
    })
};

export const taskFields: IFields[] = [
    {
        label: "Nome",
        name: "name",
        type: "text",
        required: true
    },
    {
        label: "Descrição",
        name: "description",
        type: "textarea",
        required: true
    },
    {
        label: "Status",
        name: "status",
        type: "select",
        required: true,
        options: [
            {
                label: "A fazer",
                value: "todo"
            },
            {
                label: "Em andamento",
                value: "in_progress"
            },
            {
                label: "Concluído",
                value: "done"
            }
        ]
    },
    {
        label: "Tags",
        name: "tags",
        type: "select",
        required: false,
        multiple: true,
        options: getTagsOptions()
    },
    {
        label: "Data de Entrega",
        name: "due_date",
        type: "date",
        required: true
    },
    {
        label: "Data de Conclusão",
        name: "completed_at",
        type: "date",
        required: false
    },
];

export const statusOptions = [
    {
        label: "A fazer",
        value: "todo"
    },
    {
        label: "Em andamento",
        value: "in_progress"
    },
    {
        label: "Concluído",
        value: "done"
    }
];
