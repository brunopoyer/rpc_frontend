"use client";

import {getAllTags, getAllTasks} from "../../../api";
import AddItem from "@/components/AddItem";
import List from "@/components/List";
import {taskColumns, taskFields} from "@/shared/fields";
import React, {useEffect, useState} from "react";
import {Filter} from "@/components/Filter";
import {ITask} from "../../../types/tasks";
import {ITag} from "../../../types/tags";

const Tasks = () => {
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [tags, setTags] = useState<ITag[]>([]);
    const [filteredTasks, setFilteredTasks] = useState<ITask[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [refresh, setRefresh] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            const fetchedTasks = await getAllTasks();
            const fetchedTags = await getAllTags();
            setTasks(fetchedTasks);
            setTags(fetchedTags);
            setFilteredTasks(fetchedTasks);
            setLoading(false);
        };
        fetchData();
    }, [refresh]);
    const handleFilter = (filters: any) => {
        let filtered = tasks;
        if (filters.name) {
            filtered = filtered.filter(task => task.name.includes(filters.name) || task.description.includes(filters.name));
        }
        if (filters.tag) {
            filtered = filtered.filter(task => task.tags.some(tag => tag.id === parseInt(filters.tag)));
        }
        if (filters.status) {
            filtered = filtered.filter(task => task.status === filters.status);
        }
        if (filters.date && filters.startDate && filters.endDate) {
            const startDate = new Date(filters.startDate);
            const endDate = new Date(filters.endDate);
            if (filters.date === 'due_date') {
                filtered = filtered.filter(task => {
                    const taskDate = new Date(task.due_date.split('/').reverse().join('-'));
                    return taskDate >= startDate && taskDate <= endDate;
                });
            } else if (filters.date === 'completed_at') {
                filtered = filtered.filter(task => {
                    if (!task.completed_at) {
                        return false;
                    }
                    const taskDate = new Date(task.due_date.split('/').reverse().join('-'));
                    return taskDate >= startDate && taskDate <= endDate;
                });
            }
        }
        setFilteredTasks(filtered);
    }

    const handleItemChange = () => {
        setRefresh(!refresh);
    }

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
                    }} onItemChange={handleItemChange}
                    />
                </div>
                <div className="flex justify-center ml-10">
                    <Filter tags={tags} onFilter={handleFilter}/>
                </div>
                <div className="p-10">
                    {loading ? (
                        <div className="flex justify-center mt-50">
                            <span className="loading loading-ring loading-lg"></span>
                        </div>
                    ) : (
                        <List itens={filteredTasks} columns={taskColumns} type="task" onItemChange={handleItemChange}/>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Tasks;
