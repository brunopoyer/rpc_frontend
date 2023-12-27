import {createTag, getAllTags} from "../../../api";
import AddItem from "@/components/AddItem";
import List from "@/components/List";
import {ITable} from "../../../types/table";
import {IFields} from "../../../types/fields";
import {tagColumns, tagFields} from "@/shared/fields";

const Tags = async () => {
    const tags = await getAllTags();

    return (
        <div className="max-w-5xl mx-auto">
            <div className="overflow-x-auto">
                <div className="text-center my-5 flex flex-col gap-4">
                    <h1 className="text-3xl font-bold">Tags</h1>
                </div>
                <div className="flex justify-end my-5">
                    <AddItem fields={tagFields} title="Adicionar nova Tag" method={{
                        operation: "create",
                        type: "tag"
                    }}/>
                </div>
                <List itens={tags} columns={tagColumns} type="tag"/>
            </div>
        </div>
    );
}

export default Tags;
