import {getAllTags, getAllTasks} from "../../../api";
import AddItem from "@/components/AddItem";
import List from "@/components/List";
import {ITable} from "../../../types/table";
import {IFields} from "../../../types/fields";
import {taskColumns, taskFields} from "@/shared/fields";

const Tasks = async () => {
    const tasks = await getAllTasks();
    const tags = await getAllTags();
    return (
        <div className="mx-auto">
            <div className="overflow-x-auto">
                <div className="text-center my-5 flex flex-col gap-4">
                    <h1 className="text-3xl font-bold">Tarefas</h1>
                </div>
                <div className="flex justify-end my-5">
                    <AddItem fields={taskFields} title="Adicionar nova Tarefa" method={{
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
