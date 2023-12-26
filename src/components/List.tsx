import Item from "@/components/Item";
import {ITask} from "../../types/tasks";
import {ITag} from "../../types/tags";
import {ITable} from "../../types/table";

interface ListProps {
  itens: ITag[] | ITask[];
  columns: ITable[];
}

const taskColumns = ["name", "description", "status", "due_date", "completed_at", "tags"];

function isTag(item: ITag | ITask): item is ITag {
    return (item as ITag).color !== undefined;
}

const List: React.FC<ListProps> = ({ itens, columns }) => {
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
                    {itens.map((item, index) => (
                        <Item key={item.id} item={item} columns={columns} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default List;
