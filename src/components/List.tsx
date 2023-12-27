import Item from "@/components/Item";
import {ITask} from "../../types/tasks";
import {ITag} from "../../types/tags";
import {ITable} from "../../types/table";

interface ListProps {
  itens: ITag[] | ITask[];
  columns: ITable[];
  type: "tag" | "task";
}

const taskColumns = ["name", "description", "status", "due_date", "completed_at", "tags"];

function isTag(item: ITag | ITask): item is ITag {
    return (item as ITag).color !== undefined;
}

const List: React.FC<ListProps> = ({ itens, columns, type }) => {
    const sortItens = itens.sort((a, b) => {
        if (isTag(a)) {
            return a.name.localeCompare(b.name);
        }
        return a.name.localeCompare(b.name);
    });
    return (
        <div>
            <table className="table table-zebra">
                {/* head */}
                <thead>
                <tr>
                    <th>#</th>
                    {columns.map((column, index) => (
                        <th key={index}>{column.label}</th>
                    ))}
                    <th>Ações</th>
                </tr>
                </thead>
                <tbody>
                    {sortItens.map((item, index) => (
                        <Item key={item.id} item={item} columns={columns} type={type} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default List;
