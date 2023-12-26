import React from "react";
import {FaRegEdit} from "react-icons/fa";
import {MdOutlineDeleteForever} from "react-icons/md";
import {ITable} from "../../types/table";

interface ItemProps {
    item: any;
    columns: ITable[];
}

const Item: React.FC<ItemProps> = ({ item, columns }) => {

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
                <MdOutlineDeleteForever cursor="pointer" className="text-red-600" size={25}/>
            </td>
        </tr>
    );
}

export default Item;
