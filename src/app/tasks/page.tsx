import {getAllTags, getAllTasks} from "../../../api";
import AddItem from "@/components/AddItem";
import List from "@/components/List";
import {ITable} from "../../../types/table";
import {IFields} from "../../../types/fields";

const taskColumns: ITable[] = [
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

const Tasks = async () => {
    const tasks = await getAllTasks();
    const tags = await getAllTags();
    const taskFields: IFields[] = [
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
            options: tags.map((tag) => {
                return {
                    label: tag.name,
                    value: tag.id?.toString()
                }
            })
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
    return (
        <div className="mx-auto">
            <div className="overflow-x-auto">
                <div className="text-center my-5 flex flex-col gap-4">
                    <h1 className="text-3xl font-bold">Tarefas</h1>
                </div>
                <div className="flex justify-end my-5">
                    <AddItem fields={taskFields} title="Adicionar nova Tag" method={{
                        operation: "create",
                        type: "task"
                    }}/>
                </div>
                <div className="p-10">
                    <List itens={tasks} columns={taskColumns} type="task"/>
                </div>
            </div>
        </div>
    );
}

export default Tasks;
