"use client";

import {createTag, getAllTags} from "../../../api";
import AddItem from "@/components/AddItem";
import List from "@/components/List";
import {ITable} from "../../../types/table";
import {IFields} from "../../../types/fields";
import {tagColumns, tagFields} from "@/shared/fields";
import {useEffect, useState} from "react";
import {ITag} from "../../../types/tags";

const Tags = () => {
    const [tags, setTags] = useState<ITag[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [refresh, setRefresh] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            const fetchedTags = await getAllTags();
            setTags(fetchedTags);
            setLoading(false);
        };
        fetchData();
    }, [refresh]);

    const handleItemChange = () => {
        setRefresh(!refresh);
    }

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
                    }} onItemChange={handleItemChange}/>
                </div>
                {loading ? (
                    <div className="flex justify-center mt-50">
                        <span className="loading loading-ring loading-lg"></span>
                    </div>
                ) : (
                    <List itens={tags} columns={tagColumns} type="tag" onItemChange={handleItemChange}/>
                )}
            </div>
        </div>
    );
}

export default Tags;
